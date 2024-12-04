const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serveeri HTML, CSS ja JS faile kaustast public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Küsimuste õiged vastused
const correctAnswers = {
    q1: "prootonid ja neutronid",
    q2: "Erineva arvu prootonite ja neutronitega aatomid",
    q3: "Kovalentne side",
    q4: "Kaks või enam aatomit, mis on omavahel seotud",
    q5: "Aatom, millel on kas positiivne või negatiivne laeng"
};

// Kontrolli vastuseid
app.post('/check-answers', (req, res) => {
    const answers = req.body; // Saame vastused kliendilt
    let score = 0;

    // Kontrolli iga vastuse õigsust
    for (let question in answers) {
        if (correctAnswers[question] === answers[question]) {
            score++;
        }
    }

    res.json({ score: score, total: Object.keys(correctAnswers).length });
});

// Käivita server
app.listen(PORT, () => {
    console.log(`Server kuulab porti ${PORT}`);
});
