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

const listaElevi = document.getElementById('lista-elevi');
const listaDetalii = document.getElementById('lista-detalii');
const detailTitle = document.getElementById('detail-title');
const tabelDetalii = document.getElementById('tabel-detalii');
const studentButtons = document.getElementById('student-buttons');
const studentTable = document.getElementById('student-table');

const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('student');

database.ref('scoruri').on('value', (snapshot) => {
    const date = snapshot.val();
    if (!date) return;

    const records = [];
    for (let id in date) {
        records.push({ id, ...date[id] });
    }

    records.reverse();

    if (studentName) {
        showStudentTable(records, studentName);
    } else {
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
            window.open(`/profesor/index.html?student=${encodeURIComponent(name)}`, '_blank');
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
        hideDetails();
    } else {
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
            `<button onclick="document.getElementById('modal-image').src='${item.solutionImage}'; document.getElementById('image-modal').style.display='flex';" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Vezi</button>`
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

    tabelDetalii.style.display = 'table';
}