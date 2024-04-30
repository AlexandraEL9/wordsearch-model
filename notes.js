// When the window loads, populate empty <td> elements with random letters
window.onload = function () {
    for (let node of document.querySelectorAll("td")) {
        if (node.textContent != "") continue; // If the <td> already contains text, skip it
        let randomLetters = Math.round(65 + Math.random() * 25); // Generate a random uppercase letter code
        node.textContent = String.fromCharCode(randomLetters); // Set the content of the <td> to a random letter
    }
}

// Define the correct answers
var correctAnswers = ['game', 'caar', 'ddaaay', 'foood'];

// Initialize variables
var score1 = 0; // Player's score
var selectedLetters = []; // Array to store selected letters

// Add event listeners to clickable letters
document.querySelectorAll('.white1').forEach(function (td) {
    td.addEventListener('click', function () {
        if (!td.classList.contains('yellow')) { // If the letter is not already selected
            if (td.classList.contains('gainsboro')) { // If the letter is currently selected
                td.classList.remove('gainsboro'); // Deselect the letter
                var index = selectedLetters.indexOf(td.getAttribute('data-letter')); // Get the index of the letter in the selected letters array
                if (index !== -1) {
                    selectedLetters.splice(index, 1); // Remove the letter from the selected letters array
                }
            } else {
                td.classList.add('gainsboro'); // Select the letter
                selectedLetters.push(td.getAttribute('data-letter')); // Add the letter to the selected letters array
            }
        }
    });
});

// Function to check selected letters against correct answers
function check1() {
    // Remove selected styling from correct letters
    var correctLetters = document.querySelectorAll('.yellow');
    correctLetters.forEach(function (letter) {
        letter.classList.remove('gainsboro');
    });

    // Remove selected styling from all letters
    document.querySelectorAll('.gainsboro').forEach(function (cell) {
        cell.classList.remove('gainsboro');
    });

    // Sort and join selected letters into a string
    var sortedSelectedLetters = selectedLetters.slice().sort().join('');

    // Iterate through each correct answer
    correctAnswers.forEach(function (answer) {
        var sortedAnswer = answer.split('').sort().join(''); // Sort the letters of the correct answer
        if (sortedSelectedLetters === sortedAnswer) { // If selected letters match a correct answer
            selectedLetters.forEach(function (letter) {
                document.querySelector('[data-letter="' + letter + '"]').classList.add('yellow'); // Highlight selected letters
            });
            score1++; // Increment the score
            document.getElementById('score').innerText = 'Score: ' + score1; // Update the score display

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
        disableGame1.style.pointerEvents = "none"; // Disable further clicking on the grid
    }
}
