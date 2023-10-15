//variabel for alle spørsmålene til valgomaten kan oppdateres dynmaisk
const questions = [
    {
        question: 'Jeg støtter økt satsing på kollektivtransport',
        enig: { MDG: 2, A: 2, H: 0, SP: 0, R: 0, SV: 2, FrP: 0, KrF: 0, V: 2 },
        uenig: { H: 2, MDG: 0, A: 0, SP: 2, R: 2, SV: 0, FrP: 2, KrF: 2, V: 0 }
    },
    {
        question: 'Jeg mener Norge bør bli medlem av EU',
        enig: { MDG: 1, A: 2, H: 0, SP: 0, R: 0, SV: 2, FrP: 0, KrF: 0, V: 2 },
        uenig: { H: 2, MDG: 0, A: 0, SP: 2, R: 2, SV: 0, FrP: 2, KrF: 2, V: 0 }
    },
    {
        question: 'Jeg støtter økt skatt på høyinntektsgrupper',
        enig: { MDG: 2, A: 2, H: 0, SP: 0, R: 0, SV: 2, FrP: 0, KrF: 0, V: 2 },
        uenig: { H: 2, MDG: 0, A: 0, SP: 2, R: 2, SV: 0, FrP: 2, KrF: 2, V: 0 }
    },
    {
        question: 'Jeg mener Norge bør forby oljeboring i Arktis',
        enig: { MDG: 2, A: 2, H: 0, SP: 0, R: 0, SV: 2, FrP: 0, KrF: 0, V: 2  },
        uenig: { H: 2, MDG: 0, A: 0, SP: 2, R: 2, SV: 0, FrP: 2, KrF: 2, V: 0 }
    },
    {
        question: 'Jeg er enig i økt offentlig eierskap i viktige næringer',
        enig: { MDG: 2, A: 2, H: 0, SP: 0, R: 0, SV: 2, FrP: 0, KrF: 0, V: 2 },
        uenig: { H: 2, MDG: 0, A: 0, SP: 2, R: 2, SV: 0, FrP: 2, KrF: 2, V: 0 }
    },
    {
        question: 'Jeg er enig i ingen fraværsgrense',
        enig: { MDG: 2, A: 0, H: 0, SP: 0, R: 0, SV: 0, FrP: 0, KrF: 0, V: 0 },
        uenig: { H: 2, MDG: 0, A: 1, SP: 1, R: 1, SV: 1, FrP: 1, KrF: 1, V: 1 }
    },
    {
        question: 'Jeg er enig bybane over Bryggen',
        enig: { MDG: 0, A: 2, H: 1, SP: 1, R: 1, SV: 1, FrP: 0, KrF: 0, V: 0 },
        uenig: { H: 2, MDG: 2, A: 0, SP: 0, R: 0, SV: 0, FrP: 2, KrF: 1, V: 1 }
    },
    {
        question: 'Jeg er enig i gratis skolemat',
        enig: { MDG: 1, A: 0, H: 2, SP: 1, R: 1, SV: 1, FrP: 0, KrF: 0, V: 0 },
        uenig: { H: 0, MDG: 0, A: 1, SP: 1, R: 0, SV: 1, FrP: 2, KrF: 1, V: 1 }
    },
    {
        question: 'Jeg er enig i å få lengre friminutt',
        enig: { MDG: 1, A: 0, H: 2, SP: 1, R: 1, SV: 1, FrP: 0, KrF: 0, V: 0 },
        uenig: { H: 1, MDG: 2, A: 0, SP: 0, R: 0, SV: 0, FrP: 2, KrF: 1, V: 1 }
    }
];

// Initialisering av variabelen som holder oversikt over partienes poengsum.
let partyScores = {
    MDG: 0,
    A: 0,
    H: 0,
    SP: 0,
    R: 0,
    SV: 0,
    FrP: 0,
    KrF: 0,
    V: 0
};

// Henting av HTML-elementer via bruk av ID.
const questionT = document.getElementById('question');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
const btnReset = document.getElementById('btnReset');
const inputForm = document.getElementById('valgomatForm');
const resultBox = document.getElementById('result');
const progressBar = document.getElementById('progress');

// Lyttere for knapper for å navigere gjennom spørsmålene.
btnNext.addEventListener('click', nextQuestion);
btnPrev.addEventListener('click', prevQuestion);

// Initialisering av indeks for nåværende spørsmål og innstilling av verdien til en fremgangslinje.
let qidx = 0;
progressBar.value = 10;
questionT.innerHTML = questions[qidx].question;

// Funksjon for å håndtere neste spørsmål.
function nextQuestion() {
    // Sjekker om en radioknapp er valgt.
    let radioChecked = document.querySelector('input[name="answer"]:checked');
    if (radioChecked) {
        calculateResult(qidx, radioChecked.value);
        qidx++;
        if (qidx < questions.length) {
            radioChecked.checked = false;
            questionT.innerHTML = questions[qidx].question;
            progressBar.value += 10;
        } else {
            // Når alle spørsmål er besvart, vis resultatene og tilbakestill knappen vises.
            progressBar.value += 10;
            inputForm.style.display = 'none';
            showResult();
            btnReset.style.display = 'block'; // Vis tilbakestillknappen
        }
    }
}

// Funksjon for å gå tilbake til forrige spørsmål.
function prevQuestion() {
    if (qidx > 0) {
        qidx--;
        questionT.innerHTML = questions[qidx].question;
        updateProgressBar(); // Oppdater fremgangslinjen når du går tilbake til forrige spørsmål
        clearSelection(); // Fjern valget for radioknappen
    }
}

// Funksjon for å fjerne valget for radioknappen.
function clearSelection() {
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });
}

// Funksjon for å beregne resultatet basert på svarene.
function calculateResult(qidx, chosen) {
    let partyChoices = questions[qidx][chosen];

    for (let party in partyChoices) {
        partyScores[party] += partyChoices[party];
    }
}

// Funksjon for å vise resultatet etter å ha besvart alle spørsmålene.
function showResult() {
    // Opprett en rangering av partier basert på poengsum
    let partyRanking = [];
    for (let party in partyScores) {
        partyRanking.push({ party: party, score: partyScores[party] });
    }

    // Sorter partiene i synkende rekkefølge basert på poengsum
    partyRanking.sort((a, b) => b.score - a.score);

    // Bygg resultat-HTML
    let resultHTML = "Ditt resultat: Partier rangert etter poengsum:<br>";
    partyRanking.forEach((item, index) => {
        resultHTML += `${index + 1}. ${item.party}: ${item.score} partipoeng<br>`;
    });

    resultBox.innerHTML = resultHTML;
    btnReset.style.display = "flex";
}

// Lytter for tilbakestillknappen
btnReset.addEventListener('click', reset);

// Funksjon for å tilbakestille spørreskjemaet og laste siden på nytt.
function reset() {
    window.location.reload();
}