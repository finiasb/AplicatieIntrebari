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
let database = null;
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} else {
    console.warn('Firebase not loaded');
}

const questions = [
    // Prismă
    { category: "Prismă", q: "Aria laterală a unei prisme patrulatere regulate:", a: ["Pb * h", "Pb * ap / 2", "Ab * h", "2 * Pb"], correct: 0, hint: "Aria laterală este suma ariilor tuturor fețelor laterale.", explanations: ["Corect: Aria laterală se calculează ca perimetrul bazei înmulțit cu înălțimea.", "Greșit: Aceasta este formula pentru aria triunghiului.", "Greșit: Aceasta este aria totală.", "Greșit: 2 * Pb nu este formula standard."] },
    { category: "Prismă", q: "Aria totală a unei prisme cu bază Ab și laterală Al:", a: ["Ab + Al", "2Ab + Al", "Ab + 2Al", "2Ab + 2Al"], correct: 2, hint: "Aria totală include aria celor două baze și aria laterală.", explanations: ["Greșit: Aria totală nu este doar aria bazei plus aria laterală, deoarece există două baze.", "Greșit: Aria totală este 2Ab + Al, nu 2Ab + Al în această formulare.", "Corect: Aria totală = aria bazei + aria laterală, dar pentru prismă cu două baze, este Ab + 2Al dacă Al este aria unei fețe laterale.", "Greșit: Aceasta ar fi dublarea ambelor, ceea ce nu este corect."] },
    { category: "Prismă", q: "Volumul unei prisme este:", a: ["Ab * h", "(Ab * h)/2", "2 * Ab * h", "Ab + h"], correct: 0, hint: "Volumul se calculează ca aria bazei înmulțită cu înălțimea.", explanations: ["Corect: Volumul prismei = aria bazei × înălțime.", "Greșit: Aceasta este pentru piramidă.", "Greșit: Nu se dublează aria bazei.", "Greșit: Nu se adună aria bazei cu înălțimea."] },
    { category: "Prismă", q: "Un prismă triunghiulară are înălțimea bazei 3 și aria bazei 6; volumul la h=10 este:", a: ["60", "30", "90", "120"], correct: 0, hint: "Folosește formula volumului prismei.", explanations: ["Corect: Volum = Ab × h = 6 × 10 = 60.", "Greșit: Nu se împarte la 2.", "Greșit: Nu se înmulțește cu 1.5.", "Greșit: Nu se dublează."] },

    // Piramidă
    { category: "Piramidă", q: "Volumul piramidei este:", a: ["Ab * h", "(Ab * h) / 3", "(Ab * h) / 2", "Pb * ap"], correct: 1, hint: "Piramidele au volumul împărțit la 3 față de prisme.", explanations: ["Greșit: Aceasta este pentru prismă.", "Corect: Volumul piramidei = (aria bazei × înălțime) / 3.", "Greșit: Nu se împarte la 2.", "Greșit: Nu se folosește perimetrul și apotema."] },
    { category: "Piramidă", q: "Aria totală a unei piramide regulate cu bază Ab și arie laterală Al:", a: ["Ab + Al", "Ab + 2Al", "2Ab + Al", "Ab + Al/2"], correct: 0, hint: "Aria totală include aria bazei și aria laterală.", explanations: ["Corect: Aria totală = aria bazei + aria laterală.", "Greșit: Nu se dublează aria laterală.", "Greșit: Nu se dublează aria bazei.", "Greșit: Nu se împarte aria laterală la 2."] },
    { category: "Piramidă", q: "Dacă Ab=16, h=9, volumul unei piramide este:", a: ["48", "144", "72", "16"], correct: 0, hint: "Aplică formula volumului piramidei.", explanations: ["Corect: Volum = (16 × 9) / 3 = 144 / 3 = 48.", "Greșit: Nu se înmulțește cu 9.", "Greșit: Nu se împarte la 2.", "Greșit: Nu este doar aria bazei."] },
    { category: "Piramidă", q: "Într-o piramidă cu vârf pe verticală, sectoarea laterală este:", a: ["(Pb*h)/2", "Pb*h", "(Ab*h)/2", "2*Pb*h"], correct: 0, hint: "Aria laterală a piramidei regulate.", explanations: ["Corect: Aria laterală = (perimetrul bazei × apotema) / 2.", "Greșit: Nu se înmulțește direct.", "Greșit: Nu se folosește aria bazei.", "Greșit: Nu se dublează."] },

    // Cub
    { category: "Cub", q: "Diagonala cubului cu latura 'a' este:", a: ["a√2", "a√3", "3a", "a²"], correct: 1, hint: "Folosește teorema lui Pitagora în 3D.", explanations: ["Greșit: Aceasta este pentru pătrat.", "Corect: Diagonala spațială = a√3.", "Greșit: Nu se înmulțește cu 3.", "Greșit: Nu se ridică la pătrat."] },
    { category: "Cub", q: "Aria totală a unui cub cu muchia a:", a: ["6a²", "4a²", "a²", "12a²"], correct: 0, hint: "Cubul are 6 fețe identice.", explanations: ["Corect: Aria totală = 6 × aria unei fețe = 6a².", "Greșit: Patrulaterul are 4 fețe.", "Greșit: Doar o față.", "Greșit: Nu se dublează."] },
    { category: "Cub", q: "Volumul cubului cu latura a:", a: ["a³", "6a²", "a²", "3a³"], correct: 0, hint: "Volumul este latura la puterea a treia.", explanations: ["Corect: Volum = a × a × a = a³.", "Greșit: Aceasta este aria totală.", "Greșit: Doar aria unei fețe.", "Greșit: Nu se înmulțește cu 3."] },
    { category: "Cub", q: "Dacă diagonala unui cub este d, latura e:", a: ["d/√3", "d/√2", "d/3", "d"], correct: 0, hint: "Rezolvă ecuația diagonalei.", explanations: ["Corect: Din d = a√3, a = d/√3.", "Greșit: Pentru pătrat.", "Greșit: Nu se împarte la 3.", "Greșit: Nu este egală cu d."] },

    // Cilindru
    { category: "Cilindru", q: "Volumul cilindrului este:", a: ["πr²h", "2πrh", "πrg", "πr²"], correct: 0, hint: "Volumul cilindrului este aria bazei înmulțită cu înălțimea.", explanations: ["Corect: Volum = πr² × h.", "Greșit: Aceasta este aria laterală.", "Greșit: Nu există 'g'.", "Greșit: Doar aria bazei."] },
    { category: "Cilindru", q: "Aria totală a cilindrului cu raza r și înălțimea h:", a: ["2πr(r + h)", "πr²h", "πr² + 2πrh", "2πrh"], correct: 0, hint: "Aria totală include două baze și aria laterală.", explanations: ["Corect: Aria totală = 2πr(r + h).", "Greșit: Aceasta este volumul.", "Greșit: Aria totală nu este aria bazei plus aria laterală în această formă.", "Greșit: Doar aria laterală."] },
    { category: "Cilindru", q: "Aria laterală a cilindrului este:", a: ["2πrh", "πr²h", "πr²", "4πrh"], correct: 0, hint: "Aria laterală este circumferința înmulțită cu înălțimea.", explanations: ["Corect: Aria laterală = 2πr × h.", "Greșit: Aceasta este volumul.", "Greșit: Doar aria bazei.", "Greșit: Nu se înmulțește cu 4."] },
    { category: "Cilindru", q: "Dacă r=3, h=7, volumul cilindrului este:", a: ["63π", "21π", "126π", "9π"], correct: 0, hint: "Calculează πr²h.", explanations: ["Corect: Volum = π × 9 × 7 = 63π.", "Greșit: Nu se împarte la 3.", "Greșit: Nu se dublează.", "Greșit: Doar πr²."] },

    // Con
    { category: "Con", q: "Aria bazei conului (raza r):", a: ["πr²", "2πr²", "πr³", "2πr"], correct: 0, hint: "Aria bazei este aria unui cerc.", explanations: ["Corect: Aria bazei = πr².", "Greșit: Nu se dublează.", "Greșit: Nu se ridică la cub.", "Greșit: Aceasta este circumferința."] },
    { category: "Con", q: "Volumul conului este:", a: ["(1/3)πr²h", "πr²h", "(2/3)πr²h", "πrh"], correct: 0, hint: "Volumul conului este o treime din volumul cilindrului.", explanations: ["Corect: Volum = (1/3)πr²h.", "Greșit: Aceasta este pentru cilindru.", "Greșit: Nu 2/3.", "Greșit: Lipsesc r²."] },
    { category: "Con", q: "Aria laterală a conului cu înălțimea h și rază r:", a: ["πr√(r²+h²)", "2πrh", "πr²", "πrh"], correct: 0, hint: "Aria laterală implică generatoarea.", explanations: ["Corect: Aria laterală = πr × l, unde l = √(r²+h²).", "Greșit: Aceasta este pentru cilindru.", "Greșit: Doar aria bazei.", "Greșit: Lipsesc r."] },
    { category: "Con", q: "Dacă r=5 și h=12, slant l este:", a: ["13", "12", "5", "10"], correct: 0, hint: "Generatoarea este ipotenuza triunghiului dreptunghic.", explanations: ["Corect: l = √(5² + 12²) = √(25+144) = √169 = 13.", "Greșit: Este doar h.", "Greșit: Este doar r.", "Greșit: Jumătate din sumă."] },

    // Cerc
    { category: "Cerc", q: "Lungimea cercului (circumferința) cu raza r:", a: ["πr", "2πr", "πr²", "2r"], correct: 1, hint: "Circumferința este 2πr.", explanations: ["Greșit: Lipseste 2.", "Corect: Circumferința = 2πr.", "Greșit: Aceasta este aria.", "Greșit: Nu se înmulțește cu π."] },
    { category: "Cerc", q: "Aria cercului cu raza r este:", a: ["πr²", "2πr", "πr", "r²"], correct: 0, hint: "Aria cercului este πr².", explanations: ["Corect: Aria = πr².", "Greșit: Aceasta este circumferința.", "Greșit: Lipseste r.", "Greșit: Nu se înmulțește cu π."] },
    { category: "Cerc", q: "Dacă diametrul este d, aria este:", a: ["(πd²)/4", "πd", "πd²", "(πd²)/4"], correct: 0, hint: "Înlocuiește r = d/2.", explanations: ["Corect: Aria = π(d/2)² = (πd²)/4.", "Greșit: Aceasta nu este aria.", "Greșit: Lipseste /4.", "Greșit: Aceasta este pentru cerc."] },
    { category: "Cerc", q: "Dacă circunferința este C, raza este:", a: ["C/(2π)", "C/π", "C/(4π)", "πC"], correct: 0, hint: "Din C = 2πr, r = C/(2π).", explanations: ["Corect: r = C / (2π).", "Greșit: Lipseste 2.", "Greșit: Nu se împarte la 4.", "Greșit: Nu se înmulțește cu π."] },

    // Triunghi
    { category: "Triunghi", q: "Care este formula pentru aria triunghiului?", a: ["baza * înălțimea", "(baza + înălțimea) / 2", "(baza * înălțimea) / 2", "baza² + înălțimea²"], correct: 2, hint: "Aria se calculează ca produsul bazei cu înălțimea împărțit la 2.", explanations: ["Greșit: Nu se împarte la 2.", "Greșit: Nu se adună.", "Corect: Aria = (baza × înălțimea) / 2.", "Greșit: Nu se ridică la pătrat."] },
    { category: "Triunghi", q: "Care este formula pentru perimetrul triunghiului?", a: ["(a + b + c) / 2", "a + b + c", "a * b * c", "a + b"], correct: 1, hint: "Perimetrul este suma tuturor laturilor.", explanations: ["Greșit: Aceasta este semiperimetrul.", "Corect: Perimetru = a + b + c.", "Greșit: Nu se înmulțesc.", "Greșit: Lipseste c."] },
    { category: "Triunghi", q: "Care este teorema lui Pitagora pentru triunghi dreptunghic?", a: ["a² + b² = c", "a + b = c", "a² + b² = 2c²", "a² + b² = c²"], correct: 3, hint: "Teorema lui Pitagora leagă catetele și ipotenuza.", explanations: ["Greșit: Lipseste pătratul.", "Greșit: Nu se adună.", "Greșit: Nu se dublează.", "Corect: a² + b² = c²."] },
    { category: "Triunghi", q: "Care este legea sinusurilor?", a: ["a + sinA = b + sinB", "a / sinA = b / sinB = c / sinC", "a * sinA = b * sinB", "a² / sinA = b² / sinB"], correct: 1, hint: "Legea sinusurilor leagă laturile cu sinusurile unghiurilor opuse.", explanations: ["Greșit: Nu se adună.", "Corect: a / sinA = b / sinB = c / sinC.", "Greșit: Nu se înmulțesc.", "Greșit: Nu se ridică la pătrat."] },
    { category: "Triunghi", q: "Care este legea cosinusurilor?", a: ["c² = a² + b² - ab cosC", "c = a + b - 2ab cosC", "c² = a² + b² - 2ab", "c² = a² + b² - 2ab cosC"], correct: 3, hint: "Legea cosinusurilor generalizează teorema lui Pitagora.", explanations: ["Greșit: Lipseste 2.", "Greșit: Nu se ridică la pătrat.", "Greșit: Lipseste cosC.", "Corect: c² = a² + b² - 2ab cosC."] },
    { category: "Triunghi", q: "Care este formula lui Heron pentru aria triunghiului?", a: ["√[s(a+b+c)]", "√[a(a-b)(a-c)]", "s(s-a)(s-b)(s-c)", "√[s(s-a)(s-b)(s-c)]"], correct: 3, hint: "Formula lui Heron folosește semiperimetrul s.", explanations: ["Greșit: Nu se înmulțesc cu s.", "Greșit: Nu folosește s.", "Greșit: Lipseste rădăcina pătrată.", "Corect: Aria = √[s(s-a)(s-b)(s-c)]."] },
    { category: "Triunghi", q: "Calculează aria unui triunghi cu baza 6 cm și înălțimea 4 cm.", a: ["24 cm²", "12 cm²", "10 cm²", "18 cm²"], correct: 1, hint: "Folosește formula ariei.", explanations: ["Greșit: Nu împarți la 2.", "Corect: (6*4)/2 = 12.", "Greșit: 6*2.", "Greșit: 6*3."] },
    { category: "Triunghi", q: "Calculează perimetrul unui triunghi cu laturile 3, 4, 5 cm.", a: ["15 cm", "7 cm", "9 cm", "12 cm"], correct: 3, hint: "Perimetrul este suma laturilor.", explanations: ["Greșit: 3*5.", "Greșit: Nu aduni toate.", "Greșit: 3+4=7.", "Corect: 3+4+5=12."] },
    { category: "Triunghi", q: "Într-un triunghi dreptunghic, cateta1=5, cateta2=12. Calculează ipotenuza.", a: ["15", "17", "13", "10"], correct: 2, hint: "Folosește teorema lui Pitagora.", explanations: ["Greșit: 5*3.", "Greșit: 5+12.", "Corect: √(25+144)=13.", "Greșit: 12-2."] },
    { category: "Triunghi", q: "Într-un triunghi, A=30°, a=10. Calculează b dacă B=60°.", a: ["5", "10", "20", "5√3"], correct: 3, hint: "Folosește legea sinusurilor.", explanations: ["Greșit: Jumătate.", "Greșit: Egal cu a.", "Greșit: Dublu.", "Corect: b = a * sinB / sinA = 10 * sin60 / sin30 = 10 * (√3/2) / (1/2) = 5√3."] },
    { category: "Triunghi", q: "Calculează aria unui triunghi echilateral cu latura 10 cm.", a: ["100 cm²", "25√3 cm²", "50 cm²", "25 cm²"], correct: 1, hint: "Aria = (√3/4) a².", explanations: ["Greșit: a².", "Corect: (√3/4)*100 = 25√3.", "Greșit: Nu √3.", "Greșit: /4 fără √3."] },
    { category: "Triunghi", q: "Într-un triunghi, a=5, b=7, C=90°. Calculează c.", a: ["√24", "12", "√50", "√74"], correct: 3, hint: "Legea cosinusurilor.", explanations: ["Greșit: √(25+49).", "Greșit: 5+7.", "Greșit: √(25*49/10).", "Corect: c²=25+49-2*5*7*0=74."] },
    { category: "Triunghi", q: "Calculează perimetrul unui triunghi isoscel cu latura egală 6 cm și baza 4 cm.", a: ["10 cm", "12 cm", "16 cm", "14 cm"], correct: 2, hint: "Perimetru = 6 + 6 + 4.", explanations: ["Greșit: 6+4.", "Greșit: 6+6.", "Corect: 6+6+4=16.", "Greșit: 6*2+4."] },
    { category: "Triunghi", q: "Într-un triunghi dreptunghic, ipotenuza=13, o catetă=5. Calculează cealaltă catetă.", a: ["10", "8", "15", "12"], correct: 3, hint: "Teorema lui Pitagora.", explanations: ["Greșit: (13+5)/2.", "Greșit: 13-5.", "Greșit: 13-5+2.", "Corect: √(169-25)=12."] },
    { category: "Triunghi", q: "Calculează aria unui triunghi cu laturile 5,6,7 folosind Heron.", a: ["12 cm²", "6 cm²", "√30 cm²", "√6 cm²"], correct: 3, hint: "s=(5+6+7)/2=9, aria=√[9*4*3*2]=√216=6√6.", explanations: ["Greșit: 6*2.", "Greșit: Fără rădăcină.", "Greșit: √(9*4*3*2) greșit.", "Corect: √[9(9-5)(9-6)(9-7)]=√[9*4*3*2]=√216=6√6."] },
    { category: "Triunghi", q: "Într-un triunghi, A=30°, B=60°, c=10. Calculează a.", a: ["5√3", "10", "20", "5"], correct: 3, hint: "Legea sinusurilor.", explanations: ["Greșit: sin60.", "Greșit: Egal cu c.", "Greșit: Dublu.", "Corect: a = c * sinA / sinC, dar C=90°, sinC=1, a=10*sin30=5."] },
    { category: "Triunghi", q: "Calculează aria unui triunghi cu baza 8 cm și înălțimea 5 cm.", a: ["13 cm²", "40 cm²", "20 cm²", "26 cm²"], correct: 2, hint: "Aria = (8*5)/2.", explanations: ["Greșit: 8+5.", "Greșit: Nu împarți.", "Corect: 20.", "Greșit: 8*5/2 dar greșit."] },
    { category: "Triunghi", q: "Într-un triunghi dreptunghic, catete 3 și 4. Ipotenuza?", a: ["6", "7", "8", "5"], correct: 3, hint: "Pitagora.", explanations: ["Greșit: 3*2.", "Greșit: 3+4.", "Greșit: 4*2.", "Corect: √(9+16)=5."] },
    { category: "Triunghi", q: "Perimetrul unui triunghi cu laturi 7,8,9.", a: ["18", "16", "21", "24"], correct: 3, hint: "Suma.", explanations: ["Greșit: 7+9.", "Greșit: 7+8.", "Greșit: 7*3.", "Corect: 7+8+9=24."] },
    { category: "Triunghi", q: "Aria unui triunghi echilateral cu latura 4.", a: ["16", "8", "2√3", "4√3"], correct: 3, hint: " (√3/4)*16 = 4√3.", explanations: ["Greșit: 4².", "Greșit: Fără √3.", "Greșit: /2.", "Corect: 4√3."] },

    // Paralelipiped
    { category: "Paralelipiped", q: "Dacă aria totală este 94 și l=3, w=4, ce este h?", a: ["4", "3", "6", "5"], correct: 3, hint: "Aria totală = 2(lw + lh + wh), 94 = 2(12 + 3h + 4h), 47 = 12 + 7h, h=5.", explanations: ["Greșit: 47-12=35, 35/7=5.", "Greșit: 47/12.", "Greșit: 47/7.", "Corect: h=5."] },
    { category: "Paralelipiped", q: "Diagonala unui paralelipiped dreptunghic:", a: ["√(l²+w²+h²)", "l+w+h", "√(lw+lh+wh)", "l²+w²+h²"], correct: 0, hint: "Folosește teorema lui Pitagora în 3D.", explanations: ["Corect: Diagonala = √(l² + w² + h²).", "Greșit: Nu se adună.", "Greșit: Nu se înmulțesc.", "Greșit: Nu se ridică la pătrat."] },
    { category: "Paralelipiped", q: "Calculează aria totală cu l=3, w=4, h=5.", a: ["70", "47", "94", "94?"], correct: 2, hint: "Aria totală = 2(3×4 + 3×5 + 4×5).", explanations: ["Greșit: Fără 2.", "Greșit: /2.", "Corect: 2(12+15+20)=2×47=94.", "Greșit: La fel."] },
    { category: "Paralelipiped", q: "Numărul de vârfuri al unui paralelipiped:", a: ["6", "8", "12", "4"], correct: 1, hint: "Un paralelipiped are 8 vârfuri.", explanations: ["Greșit: 6 fețe.", "Corect: Paralelipipedul are 8 vârfuri.", "Greșit: 12 muchii.", "Greșit: Nu are 4 vârfuri."] },
    { category: "Paralelipiped", q: "Calculează volumul unui paralelipiped cu l=6, w=5, h=4.", a: ["100", "140", "120", "80"], correct: 2, hint: "Volum = l × w × h.", explanations: ["Greșit: 6×5×4 greșit.", "Greșit: 6×5×4 +20.", "Corect: 6 × 5 × 4 = 120.", "Greșit: 6×5×4 -40."] },
    { category: "Paralelipiped", q: "Dacă volumul este 120 și l=6, w=5, ce este h?", a: ["5", "3", "4", "6"], correct: 2, hint: "h = volum / (l × w).", explanations: ["Greșit: 120/6.", "Greșit: 120/40.", "Corect: 120 / (6×5) = 120/30 = 4.", "Greșit: 120/5."] },
    { category: "Paralelipiped", q: "Aria laterală a unui paralelipiped dreptunghic:", a: ["2h(l+w)", "h(l+w)", "4h(l+w)", "2(lw+lh+wh)"], correct: 0, hint: "Aria laterală exclude cele două baze.", explanations: ["Corect: Aria laterală = 2h(l + w).", "Greșit: Lipseste 2.", "Greșit: Nu se înmulțește cu 4.", "Greșit: Aceasta este aria totală."] },
    { category: "Paralelipiped", q: "Diagonala feței unui paralelipiped dreptunghic:", a: ["l+w", "√(l²+w²)", "l²+w²", "√(l²+w²+h²)"], correct: 1, hint: "Diagonala feței este în planul feței.", explanations: ["Greșit: Nu se ridică la pătrat.", "Corect: Diagonala feței = √(l² + w²).", "Greșit: Nu se ridică la pătrat.", "Greșit: Include h."] },
    { category: "Paralelipiped", q: "Numărul de muchii al unui paralelipiped:", a: ["8", "12", "4", "6"], correct: 1, hint: "Un paralelipiped are 12 muchii.", explanations: ["Greșit: 8 vârfuri.", "Corect: Paralelipipedul are 12 muchii.", "Greșit: Nu are 4 muchii.", "Greșit: 6 fețe."] },
    { category: "Paralelipiped", q: "Calculează diagonala feței cu l=5, w=12.", a: ["15", "17", "10", "13"], correct: 3, hint: "Diagonala feței = √(5² + 12²).", explanations: ["Greșit: 5+12.", "Greșit: √(25+144)+2.", "Greșit: 12-2.", "Corect: √(25+144)=√169=13."] },
    { category: "Paralelipiped", q: "Calculează aria totală cu l=3, w=4, h=5.", a: ["70", "47", "94", "94?"], correct: 2, hint: "Aria totală = 2(3×4 + 3×5 + 4×5).", explanations: ["Greșit: Fără 2.", "Greșit: /2.", "Corect: 2(12+15+20)=2×47=94.", "Greșit: La fel."] },
    { category: "Paralelipiped", q: "Aria totală a unui paralelipiped dreptunghic:", a: ["2(lw+lh+wh)", "lw+lh+wh", "4(lw+lh+wh)", "lwh"], correct: 0, hint: "Aria totală include toate cele 6 fețe.", explanations: ["Corect: Aria totală = 2(lw + lh + wh).", "Greșit: Lipseste 2.", "Greșit: Nu se înmulțește cu 4.", "Greșit: Aceasta este volumul."] },
    { category: "Paralelipiped", q: "Numărul de fețe al unui paralelipiped:", a: ["8", "6", "4", "12"], correct: 1, hint: "Un paralelipiped are 6 fețe.", explanations: ["Greșit: 8 vârfuri.", "Corect: Paralelipipedul are 6 fețe.", "Greșit: Nu are 4 fețe.", "Greșit: 12 muchii."] },
    { category: "Paralelipiped", q: "Calculează aria laterală cu l=2, w=3, h=4.", a: ["28", "24", "40", "32"], correct: 2, hint: "Aria laterală = 2h(l + w).", explanations: ["Greșit: 2×4×3.", "Greșit: 2×4×3.", "Corect: 2×4×(2+3)=40.", "Greșit: 2×4×4."] },
    { category: "Paralelipiped", q: "Calculează aria totală cu l=3, w=4, h=5.", a: ["70", "47", "94", "94?"], correct: 2, hint: "Aria totală = 2(3×4 + 3×5 + 4×5).", explanations: ["Greșit: Fără 2.", "Greșit: /2.", "Corect: 2(12+15+20)=2×47=94.", "Greșit: La fel."] },
    { category: "Paralelipiped", q: "Dacă aria laterală este Al și înălțimea h, perimetrul bazei este:", a: ["Al/h", "2Al/h", "Al/(2h)", "4Al/h"], correct: 1, hint: "Aria laterală = perimetrul bazei × h.", explanations: ["Greșit: Lipseste 2.", "Corect: Perimetrul bazei = Al / h.", "Greșit: Nu se împarte la 2.", "Greșit: Nu se înmulțește cu 4."] },
    { category: "Paralelipiped", q: "Volumul paralelipipedului dreptunghic:", a: ["l*w*h", "(l*w*h)/3", "2*l*w*h", "l+w+h"], correct: 0, hint: "Volumul este produsul celor trei dimensiuni.", explanations: ["Corect: Volum = lungime × lățime × înălțime.", "Greșit: Aceasta este pentru piramidă.", "Greșit: Nu se dublează.", "Greșit: Nu se adună."] },
    { category: "Paralelipiped", q: "Calculează diagonala cu l=3, w=4, h=12.", a: ["15", "10", "13", "17"], correct: 2, hint: "Diagonala = √(3²+4²+12²).", explanations: ["Greșit: 3+4+12.", "Greșit: 12-2.", "Corect: √(9+16+144)=√169=13.", "Greșit: √(9+16+144)+2."] },
    { category: "Paralelipiped", q: "Volumul unui cub cu latura 5.", a: ["100", "75", "150", "125"], correct: 3, hint: "Volum = a³.", explanations: ["Greșit: 5².", "Greșit: 5³ -50.", "Greșit: 5³ +25.", "Corect: 5³=125."] },
    { category: "Paralelipiped", q: "Dacă diagonala spațială este 13 și l=3, w=4, ce este h?", a: ["10", "13", "11", "12"], correct: 3, hint: "13² = 3² + 4² + h², 169 = 9+16 + h², h²=144, h=12.", explanations: ["Greșit: 13-3.", "Greșit: 13.", "Greșit: 13-2.", "Corect: h=12."] },
    { category: "Paralelipiped", q: "Dacă l=2, w=3, h=4, volumul este:", a: ["24", "20", "18", "12"], correct: 0, hint: "Calculează 2 × 3 × 4.", explanations: ["Corect: Volum = 2 × 3 × 4 = 24.", "Greșit: Nu 2×3×3.", "Greșit: Nu 2×3×3.", "Greșit: Nu 2×3×2."] },
    { category: "Paralelipiped", q: "Aria totală a unui cub cu latura 3.", a: ["36", "27", "48", "54"], correct: 3, hint: "Aria totală = 6a².", explanations: ["Greșit: 4×9.", "Greșit: 3³.", "Greșit: 6×8.", "Corect: 6×9=54."] },


    // Formule trigonometrice
    { category: "Formule trigonometrice", q: "cos(A+B) =", a: ["cosAcosB + sinAsinB", "cosAcosB - sinAsinB", "sinAcosB + cosAsinB", "sinAcosB - cosAsinB"], correct: 1, hint: "Formula sumei pentru cosinus.", explanations: ["Greșit: Semnul greșit.", "Corect: cos(A+B) = cosAcosB - sinAsinB.", "Greșit: Aceasta este pentru sinus.", "Greșit: Nu este pentru cosinus."] },
    { category: "Formule trigonometrice", q: "cos²θ =", a: ["(1 - cos2θ)/2", "1 - sin²θ", "2cosθsinθ", "(1 + cos2θ)/2"], correct: 3, hint: "Formula pentru pătratul cosinusului.", explanations: ["Greșit: Aceasta este pentru sin²θ.", "Greșit: Nu se împarte la 2.", "Greșit: Aceasta este sin2θ.", "Corect: cos²θ = (1 + cos2θ)/2."] },
    { category: "Formule trigonometrice", q: "sin²θ + cos²θ =", a: ["1", "0", "2", "θ"], correct: 0, hint: "Identitatea fundamentală în trigonometrie.", explanations: ["Corect: sin²θ + cos²θ = 1.", "Greșit: Nu este 0.", "Greșit: Nu este 2.", "Greșit: Nu este θ."] },
    { category: "Formule trigonometrice", q: "tan(90° - θ) =", a: ["tanθ", "sinθ", "cotθ", "cosθ"], correct: 2, hint: "Complementul pentru tangentă.", explanations: ["Greșit: Este tanθ.", "Greșit: Este sinθ.", "Corect: tan(90° - θ) = cotθ.", "Greșit: Este cosθ."] },
    { category: "Formule trigonometrice", q: "tanθ =", a: ["sinθ / cosθ", "cosθ / sinθ", "1 / sinθ", "1 / cosθ"], correct: 0, hint: "Tangenta este sinus împărțit la cosinus.", explanations: ["Corect: tanθ = sinθ / cosθ.", "Greșit: Aceasta este cotangenta.", "Greșit: Aceasta este cosecanta.", "Greșit: Aceasta este secanta."] },
    { category: "Formule trigonometrice", q: "cos(A-B) =", a: ["cosAcosB - sinAsinB", "sinAcosB + cosAsinB", "cosAcosB + sinAsinB", "sinAcosB - cosAsinB"], correct: 2, hint: "Formula diferenței pentru cosinus.", explanations: ["Greșit: Semnul greșit.", "Greșit: Aceasta este pentru sinus.", "Corect: cos(A-B) = cosAcosB + sinAsinB.", "Greșit: Nu este pentru cosinus."] },
    { category: "Formule trigonometrice", q: "sin²θ =", a: ["(1 + cos2θ)/2", "1 - cos²θ", "2sinθcosθ", "(1 - cos2θ)/2"], correct: 3, hint: "Formula pentru pătratul sinusului.", explanations: ["Greșit: Aceasta este pentru cos²θ.", "Greșit: Nu se împarte la 2.", "Greșit: Aceasta este sin2θ.", "Corect: sin²θ = (1 - cos2θ)/2."] },
    { category: "Formule trigonometrice", q: "sin(2θ) =", a: ["sinθ + cosθ", "2sinθcosθ", "2sinθ - 2cosθ", "sin²θ - cos²θ"], correct: 1, hint: "Formula dublului unghi pentru sinus.", explanations: ["Greșit: Nu se adună.", "Corect: sin(2θ) = 2sinθcosθ.", "Greșit: Nu se scade.", "Greșit: Aceasta este pentru cosinus."] },
    { category: "Formule trigonometrice", q: "cos(2θ) =", a: ["2cosθsinθ", "cos²θ - sin²θ", "cos²θ + sin²θ", "2cosθ - 2sinθ"], correct: 1, hint: "Formula dublului unghi pentru cosinus.", explanations: ["Greșit: Aceasta este pentru sinus.", "Corect: cos(2θ) = cos²θ - sin²θ.", "Greșit: Nu se scade.", "Greșit: Nu se scade."] },
    { category: "Formule trigonometrice", q: "Calculează tan(45°).", a: ["0", "√3", "1/2", "1"], correct: 3, hint: "Valoarea cunoscută a tangentei la 45°.", explanations: ["Greșit: tan(0°).", "Greșit: tan(60°).", "Greșit: tan(30°).", "Corect: tan(45°) = 1."] },
    { category: "Formule trigonometrice", q: "cscθ =", a: ["1 / sinθ", "1 / cosθ", "cosθ / sinθ", "sinθ / cosθ"], correct: 0, hint: "Cosecanta este inversul sinusului.", explanations: ["Corect: cscθ = 1 / sinθ.", "Greșit: Aceasta este secanta.", "Greșit: Aceasta este cotangenta.", "Greșit: Aceasta este tangenta."] },
    { category: "Formule trigonometrice", q: "tan(2θ) =", a: ["tanθ / 2", "2tanθ / (1 - tan²θ)", "tan²θ", "2tanθ"], correct: 1, hint: "Formula dublului unghi pentru tangentă.", explanations: ["Greșit: Nu se împarte la 2.", "Corect: tan(2θ) = 2tanθ / (1 - tan²θ).", "Greșit: Nu se ridică la pătrat.", "Greșit: Lipseste împărțirea."] },
    { category: "Formule trigonometrice", q: "sin(A+B) =", a: ["cosAcosB + sinAsinB", "sinAcosB + cosAsinB", "cosAcosB - sinAsinB", "sinAcosB - cosAsinB"], correct: 1, hint: "Formula sumei pentru sinus.", explanations: ["Greșit: Nu este pentru sinus.", "Corect: sin(A+B) = sinAcosB + cosAsinB.", "Greșit: Aceasta este pentru cosinus.", "Greșit: Semnul greșit."] },
    { category: "Formule trigonometrice", q: "sin(A-B) =", a: ["sinAcosB + cosAsinB", "cosAcosB + sinAsinB", "sinAcosB - cosAsinB", "cosAcosB - sinAsinB"], correct: 2, hint: "Formula diferenței pentru sinus.", explanations: ["Greșit: Semnul greșit.", "Greșit: Nu este pentru sinus.", "Corect: sin(A-B) = sinAcosB - cosAsinB.", "Greșit: Aceasta este pentru cosinus."] },
    { category: "Formule trigonometrice", q: "sin(90° - θ) =", a: ["sinθ", "tanθ", "cosθ", "cotθ"], correct: 2, hint: "Complementul pentru sinus.", explanations: ["Greșit: Este sinθ.", "Greșit: Este tanθ.", "Corect: sin(90° - θ) = cosθ.", "Greșit: Este cotθ."] },
    { category: "Formule trigonometrice", q: "secθ =", a: ["1 / cosθ", "1 / sinθ", "cosθ / sinθ", "sinθ / cosθ"], correct: 0, hint: "Secanta este inversul cosinusului.", explanations: ["Corect: secθ = 1 / cosθ.", "Greșit: Aceasta este cosecanta.", "Greșit: Aceasta este cotangenta.", "Greșit: Aceasta este tangenta."] },
    { category: "Formule trigonometrice", q: "Dacă sinθ = 3/5, cosθ = 4/5, tanθ =", a: ["4/3", "5/3", "3/5", "3/4"], correct: 3, hint: "tanθ = sinθ / cosθ.", explanations: ["Greșit: Invers.", "Greșit: 5/3.", "Greșit: Este sinθ.", "Corect: 3/5 / 4/5 = 3/4."] },
    { category: "Formule trigonometrice", q: "cos(90° - θ) =", a: ["cosθ", "tanθ", "sinθ", "cotθ"], correct: 2, hint: "Complementul pentru cosinus.", explanations: ["Greșit: Este cosθ.", "Greșit: Este tanθ.", "Corect: cos(90° - θ) = sinθ.", "Greșit: Este cotθ."] },
    { category: "Formule trigonometrice", q: "Calculează sin(30°).", a: ["√3/2", "1", "0", "1/2"], correct: 3, hint: "Valoarea cunoscută a sinusului la 30°.", explanations: ["Greșit: Aceasta este cos(30°).", "Greșit: sin(90°).", "Greșit: sin(0°).", "Corect: sin(30°) = 1/2."] },
    { category: "Formule trigonometrice", q: "cotθ =", a: ["cosθ / sinθ", "sinθ / cosθ", "1 / sinθ", "1 / cosθ"], correct: 0, hint: "Cotangenta este cosinus împărțit la sinus.", explanations: ["Corect: cotθ = cosθ / sinθ.", "Greșit: Aceasta este tangenta.", "Greșit: Aceasta este cosecanta.", "Greșit: Aceasta este secanta."] },
    { category: "Formule trigonometrice", q: "Dacă cosθ = 4/5, sinθ =", a: ["5/4", "4/3", "1", "3/5"], correct: 3, hint: "Din sin²θ + cos²θ = 1.", explanations: ["Greșit: Invers.", "Greșit: 4/3.", "Greșit: Nu este 1.", "Corect: sinθ = √(1 - (4/5)²) = √(1 - 16/25) = √(9/25) = 3/5."] }
];

const allCategories = [...new Set(questions.map(item => item.category))];
let currentQ = 0;
let score = 0;
let filteredQuestions = [];
const answers = [];
let selectedCategories = [];
let hintUsedForCurrentQuestion = false;
let currentQuestionSolution = null;

function renderCategorySelection() {
    const container = document.getElementById('category-selection');
    container.innerHTML = '';
    container.innerHTML = `<small>Selectează cel puțin o categorie:</small><br>`;
    allCategories.forEach(cat => {
        const id = `cat-${cat}`;
        const label = document.createElement('label');
        label.className = 'category-label';
        label.innerHTML = `<input type="checkbox" value="${cat}" id="${id}" /> ${cat}`;
        const input = label.querySelector('input');
        input.addEventListener('change', () => {
            if (input.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
        container.appendChild(label);
    });
}

document.getElementById('start-quiz').addEventListener('click', () => {
    const user = document.getElementById('username').value.trim();
    if (!user) {
        alert('Completează numele elevului.');
        return;
    }

    selectedCategories = Array.from(document.querySelectorAll('#category-selection input[type="checkbox"]:checked')).map(el => el.value);
    if (selectedCategories.length === 0) {
        alert('Selectează cel puțin o categorie.');
        return;
    }

    filteredQuestions = questions.filter(q => selectedCategories.includes(q.category));
    if (filteredQuestions.length === 0) {
        alert('Nu există întrebări în categoria selectată.');
        return;
    }

    currentQ = 0;
    score = 0;
    answers.length = 0;

    document.getElementById('nume-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    showQuestion();
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('nume-section').style.display = 'block';
    
    currentQ = 0;
    score = 0;
    filteredQuestions = [];
    answers.length = 0;
    selectedCategories = [];
    
    const checkboxes = document.querySelectorAll('#category-selection input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.parentElement.classList.remove('selected');
    });
    renderCategorySelection(); 
});

function showQuestion() {
    if (currentQ < filteredQuestions.length) {
        const q = filteredQuestions[currentQ];
        document.getElementById('q-category').innerText = `Categorie: ${q.category}`;
        document.getElementById('q-text').innerText = q.q;
        document.getElementById('hint-text').style.display = 'none';
        document.getElementById('hint-btn').innerText = 'Hint';
        document.getElementById('explanation').style.display = 'none';
        hintUsedForCurrentQuestion = false;
        currentQuestionSolution = null;
        document.getElementById('solution-image').value = '';
        document.getElementById('preview-image').style.display = 'none';
        const optionsDiv = document.getElementById('q-options');
        optionsDiv.innerHTML = "";
        q.a.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(index);
            optionsDiv.appendChild(btn);
        });
    } else {
        finishQuiz();
    }
}

function checkAnswer(idx) {
    const q = filteredQuestions[currentQ];
    const isCorrect = idx === q.correct;

    if (isCorrect) score++;

    const buttons = document.querySelectorAll('#q-options button');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.style.background = '#4CAF50'; 
            btn.style.color = 'white';
        } else if (i === idx && !isCorrect) {
            btn.style.background = '#f44336'; 
            btn.style.color = 'white';
        }
    });

    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerText = q.explanations[idx];
    explanationDiv.style.display = 'block';
    explanationDiv.style.background = isCorrect ? '#e8f5e8' : '#ffebee';
    explanationDiv.style.borderLeft = `4px solid ${isCorrect ? '#4CAF50' : '#f44336'}`;

    answers.push({
        question: q.q,
        category: q.category,
        selected: q.a[idx],
        correctAnswer: q.a[q.correct],
        isCorrect: isCorrect,
        hintUsed: hintUsedForCurrentQuestion,
        solutionImage: currentQuestionSolution
    });

    setTimeout(() => {
        currentQ++;
        hintUsedForCurrentQuestion = false;
        showQuestion();
    }, 3000);
}

function finishQuiz() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('final-score').innerText = `Ai obținut ${score} puncte din ${filteredQuestions.length}.`;
    
    const nume = document.getElementById('username').value;
    if (database) {
        database.ref('scoruri').push({
            nume: nume,
            scor: score,
            total: filteredQuestions.length,
            data: new Date().toLocaleString(),
            categories: [...new Set(answers.map(a => a.category))],
            details: answers
        });
    } else {
        alert('Rezultatele nu pot fi salvate deoarece Firebase nu este disponibil.');
    }
}

document.getElementById('solution-image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentQuestionSolution = event.target.result;
            const preview = document.getElementById('preview-image');
            preview.src = currentQuestionSolution;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('hint-btn').addEventListener('click', () => {
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('hint-btn');
    if (hintText.style.display === 'none') {
        hintText.innerText = filteredQuestions[currentQ].hint;
        hintText.style.display = 'block';
        hintBtn.innerText = 'Ascunde Hint';
        hintUsedForCurrentQuestion = true;
    } else {
        hintText.style.display = 'none';
        hintBtn.innerText = 'Hint';
    }
});
renderCategorySelection();