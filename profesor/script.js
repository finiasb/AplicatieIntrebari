// Configurarea TA de la Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2hpvwgJTrEnr-oRRLy9Uf82Ta16OGBtc",
    authDomain: "scoala-1c1e9.firebaseapp.com",
    projectId: "scoala-1c1e9",
    storageBucket: "scoala-1c1e9.firebasestorage.app",
    messagingSenderId: "650085750607",
    appId: "1:650085750607:web:cb8310463e98a85680173a",
    measurementId: "G-01HV2DWBR7",
    databaseURL: "https://scoala-1c1e9-default-rtdb.europe-west1.firebasedatabase.app"
    };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Determine base path for links
const basePath = window.location.hostname.includes('firebaseapp.com') ? '' : '/AplicatieIntrebari';

const listaElevi = document.getElementById('lista-elevi');
const listaDetalii = document.getElementById('lista-detalii');
const detailTitle = document.getElementById('detail-title');
const tabelDetalii = document.getElementById('tabel-detalii');
const studentButtons = document.getElementById('student-buttons');
const studentTable = document.getElementById('student-table');
const tabelScoruri = document.getElementById('tabel-scoruri');

const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('student');

// Citire date în timp real
database.ref('scoruri').on('value', (snapshot) => {
    const date = snapshot.val();
    if (!date) return;

    const records = [];
    for (let id in date) {
        records.push({ id, ...date[id] });
    }

    // afișare de sus în jos (cele mai noi la început)
    records.reverse();

    if (studentName) {
        // Afișează tabelul pentru elevul specific
        showStudentTable(records, studentName);
    } else {
        // Afișează butoanele pentru toți elevii
        showStudentButtons(records);
    }
});

function showStudentButtons(records) {
    studentButtons.innerHTML = '';
    studentTable.style.display = 'none';
    studentButtons.style.display = 'block';

    const uniqueStudents = [...new Set(records.map(r => r.nume))];

    uniqueStudents.forEach(name => {
        const button = document.createElement('button');
        button.className = 'student-button';
        button.textContent = name;
        button.addEventListener('click', () => {
            window.open(`${basePath}/profesor/index.html?student=${encodeURIComponent(name)}`, '_blank');
        });
        studentButtons.appendChild(button);
    });
}

let currentSelectedRecord = null;

function showStudentTable(records, name) {
    studentButtons.style.display = 'none';
    studentTable.style.display = 'block';
    listaElevi.innerHTML = '';
    listaDetalii.innerHTML = '';
    detailTitle.style.display = 'none';
    tabelDetalii.style.display = 'none';
    currentSelectedRecord = null;

    // Add back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Înapoi la lista elevilor';
    backButton.className = 'student-button back-button';
    backButton.style.marginBottom = '20px';
    backButton.addEventListener('click', () => {
        window.location.href = `${basePath}/profesor`;
    });
    // Remove existing back button if any
    const existingBack = studentTable.querySelector('.back-button');
    if (existingBack) existingBack.remove();
    studentTable.insertBefore(backButton, tabelScoruri);

    const studentRecords = records.filter(r => r.nume === name);

    studentRecords.forEach(r => {
        const categories = r.categories ? r.categories.join(', ') : (r.details ? [...new Set(r.details.map(d => d.category))].join(', ') : 'N/A');
        const totalQuestions = (r.details && r.details.length) || r.total;
        const tr = document.createElement('tr');
        tr.className = 'clickable-row';
        tr.innerHTML = `
            <td>${r.nume}</td>
            <td><b>${r.scor} / ${totalQuestions}</b></td>
            <td>${categories}</td>
            <td>${r.data}</td>
        `;
        tr.addEventListener('click', () => toggleDetail(r, tr));
        listaElevi.appendChild(tr);
    });
}

function toggleDetail(record, rowElement) {
    if (currentSelectedRecord && currentSelectedRecord.id === record.id) {
        // Dacă același rând, ascunde detaliile
        hideDetails();
    } else {
        // Altfel, arată detaliile pentru acest rând
        showDetail(record);
        currentSelectedRecord = record;
    }
}

function hideDetails() {
    detailTitle.style.display = 'none';
    tabelDetalii.style.display = 'none';
    currentSelectedRecord = null;
}

function showDetail(record) {
    const details = record.details || [];
    listaDetalii.innerHTML = '';

    if (details.length === 0) {
        detailTitle.textContent = `Detalii pentru ${record.nume}: niciun detaliu disponibil`;
        detailTitle.style.display = 'block';
        tabelDetalii.style.display = 'none';
        return;
    }

    detailTitle.textContent = `Detalii pentru ${record.nume} (${record.scor}/${record.total}, ${record.data})`;
    detailTitle.style.display = 'block';

    details.forEach((item, index) => {
        const row = document.createElement('tr');
        const imageButton = item.solutionImage ? 
            `<button onclick="document.getElementById('image-modal').style.display='flex'; document.getElementById('modal-image').src='${item.solutionImage}';" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Vezi</button>` 
            : '❌';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.question}</td>
            <td>${item.category}</td>
            <td>${item.selected}</td>
            <td>${item.correctAnswer}</td>
            <td>${item.isCorrect ? '✅' : '❌'}</td>
            <td>${item.hintUsed ? '✅' : '❌'}</td>
            <td>${imageButton}</td>
        `;
        listaDetalii.appendChild(row);
    });

    tabelDetalii.style.display = 'block';
}