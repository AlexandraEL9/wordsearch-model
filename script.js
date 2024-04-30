window.onload = function () {
    for (let node of document.querySelectorAll("td")) {
        if (node.textContent != "") continue;
        let randomLetters = Math.round(65 + Math.random() * 25)
        node.textContent = String.fromCharCode(randomLetters)
    }
}
var correctAnswers = ['game', 'caar', 'ddaaay', 'foood']; // Define correct answers here

var score1 = 0;
var selectedLetters = [];

document.querySelectorAll('.white1').forEach(function (td) {
    td.addEventListener('click', function () {
        if (!td.classList.contains('yellow')) {
            if (td.classList.contains('gainsboro')) {
                td.classList.remove('gainsboro');
                var index = selectedLetters.indexOf(td.getAttribute('data-letter'));
                if (index !== -1) {
                    selectedLetters.splice(index, 1);
                }
            } else {
                td.classList.add('gainsboro');
                selectedLetters.push(td.getAttribute('data-letter'));
            }
        }
    });
});

function check1() {
    var correctLetters = document.querySelectorAll('.yellow');
    correctLetters.forEach(function (letter) {
        letter.classList.remove('gainsboro');
    });

    document.querySelectorAll('.gainsboro').forEach(function (cell) {
        cell.classList.remove('gainsboro');
    });

    var sortedSelectedLetters = selectedLetters.slice().sort().join('');

    correctAnswers.forEach(function (answer) {
        var sortedAnswer = answer.split('').sort().join('');
        if (sortedSelectedLetters === sortedAnswer) {
            selectedLetters.forEach(function (letter) {
                document.querySelector('[data-letter="' + letter + '"]').classList.add('yellow');
            });
            score1++;
            document.getElementById('score').innerText = 'Score: ' + score1;
            // Disable clicking on correct answer cells
            document.querySelectorAll('.yellow').forEach(function (cell) {
                cell.classList.add('disabled');
            });

            // Mark the word in the word list as found
            document.getElementById('word' + (correctAnswers.indexOf(answer) + 1)).classList.add('word-found');
        }
    });
    // Clear the selected letters
    selectedLetters = [];

    // Check if all correct answers have been found
    if (score1 === correctAnswers.length) {
        alert('Congratulations! You won!');
        var disableGame1 = document.getElementById("disable_click1");
        disableGame1.style.pointerEvents = "none";
    }
}