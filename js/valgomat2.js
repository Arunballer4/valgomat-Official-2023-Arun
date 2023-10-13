//variabel for alle spørsmålene til valgomaten
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

const questionT = document.getElementById('question');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
const btnReset = document.getElementById('btnReset');
const inputForm = document.getElementById('valgomatForm');
const resultBox = document.getElementById('result');
const progressBar = document.getElementById('progress');

btnNext.addEventListener('click', nextQuestion);
btnPrev.addEventListener('click', prevQuestion);

let qidx = 0;
progressBar.value = 10
questionT.innerHTML = questions[qidx].question;

function nextQuestion() {
    let radioChecked = document.querySelector('input[name="answer"]:checked');
    if (radioChecked) {
        calculateResult(qidx, radioChecked.value);
        qidx++;
        if (qidx < questions.length) {
            radioChecked.checked = false;
            questionT.innerHTML = questions[qidx].question;
            progressBar.value += 10
        } else {
            progressBar.value += 10
            inputForm.style.display = 'none';
            showResult();
            btnReset.style.display = 'block'; // Show the Reset button
        }
    }
}

function prevQuestion() {
    if (qidx > 0) {
        qidx--;
        questionT.innerHTML = questions[qidx].question;
        updateProgressBar(); // Update the progress bar when going back to the previous question
        clearSelection(); // Clear the radio button selection
    }
}

// Add this function to clear the radio button selection
function clearSelection() {
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });
}

function calculateResult(qidx, chosen) {
    let partyChoices = questions[qidx][chosen];

    for (let party in partyChoices) {
        partyScores[party] += partyChoices[party];
    }
}

function showResult() {
    // Opprett et array av partier basert på poengsum
    let partyRanking = [];
    for (let party in partyScores) {
        partyRanking.push({ party: party, score: partyScores[party] });
    }

    // Sorter partiene i synkende rekkefølge basert på poengsum
    partyRanking.sort((a, b) => b.score - a.score);

    // Bygg resultat-HTML
    let resultHTML = "ditt resultat: Partier rangert etter poengsum:<br>";
    partyRanking.forEach((item, index) => {
        resultHTML += `${index + 1}. ${item.party}: ${item.score} parti poeng <br>`;
    });

    resultBox.innerHTML = resultHTML;
    btnReset.style.display = "flex";
}

btnReset.addEventListener('click', reset)
function reset() {
    window.location.reload();
}
