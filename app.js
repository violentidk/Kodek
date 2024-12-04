function submitAnswers() {
    // Kogume kõik valikud
    const answers = {};
    const questions = document.querySelectorAll('.question-container');
    
    questions.forEach(function(question) {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            const questionName = selectedOption.name;
            const answerValue = selectedOption.value;
            answers[questionName] = answerValue;
        }
    });

    // Saada vastused serverile
    fetch('/check-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
    .then(response => response.json())
    .then(data => {
        const resultText = `Sa vastasid ${data.score} / ${data.total} küsimusele õigesti.`;
        document.getElementById('result').textContent = resultText;
    })
    .catch(error => {
        console.error('Viga vastuste saatmisel:', error);
    });
}
