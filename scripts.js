const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; // Track the number of matched pairs
const totalPairs = cards.length / 2; // Total pairs to match

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    secondCard = this;
    checkForMatch(); 
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;

    // Check if all pairs are matched
    if (matchedPairs === totalPairs) {
        showWinMessage();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle cards on page load
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// Function to show a congratulatory message
function showWinMessage() {
    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.innerText = "Congratulations! You've matched all pairs!";
    document.body.appendChild(winMessage);

    // Style the message
    winMessage.style.position = 'fixed';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.style.backgroundColor = 'black';
    winMessage.style.color = '#fff';
    winMessage.style.padding = '20px';
    winMessage.style.fontSize = '24px';
    winMessage.style.borderRadius = '10px';
    winMessage.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
    winMessage.style.zIndex = '1000'; // Ensure message appears on top
}

// Reset button functionality
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    location.reload();
});

cards.forEach(card => card.addEventListener('click', flipCard));
