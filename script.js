import { words } from './words.js';
import { TranslationService } from './translationService.js';

class FlashCardApp {
    constructor() {
        this.cards = words;
        this.currentIndex = 0;
        this.isFlipped = false;
        this.isLoading = false;
        
        // DOM elements
        this.flashcard = document.getElementById('flashcard');
        this.cardFront = document.querySelector('.card-front');
        this.cardBack = document.querySelector('.card-back');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.currentCardSpan = document.getElementById('currentCard');
        this.totalCardsSpan = document.getElementById('totalCards');
        this.frontLangSelect = document.getElementById('frontLang');
        this.backLangSelect = document.getElementById('backLang');
        
        // Set initial selected values
        this.frontLangSelect.value = 'spanish';
        this.backLangSelect.value = 'english';
        
        this.initializeEventListeners();
        this.updateCard();
        this.updateProgress();
    }
    
    initializeEventListeners() {
        this.flashcard.addEventListener('click', () => this.flipCard());
        this.flipBtn.addEventListener('click', () => this.flipCard());
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        
        // Language selection handlers with immediate update
        this.frontLangSelect.addEventListener('change', () => {
            const selectedLang = this.frontLangSelect.value;
            if (selectedLang === this.backLangSelect.value) {
                this.backLangSelect.value = selectedLang === 'english' ? 'spanish' : 'english';
            }
            this.updateCard();
        });
        
        this.backLangSelect.addEventListener('change', () => {
            const selectedLang = this.backLangSelect.value;
            if (selectedLang === this.frontLangSelect.value) {
                this.frontLangSelect.value = selectedLang === 'english' ? 'spanish' : 'english';
            }
            this.updateCard();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousCard();
            if (e.key === 'ArrowRight') this.nextCard();
            if (e.key === ' ') {
                e.preventDefault();
                this.flipCard();
            }
        });
    }
    
    flipCard() {
        if (this.isLoading) return;
        this.isFlipped = !this.isFlipped;
        this.flashcard.classList.toggle('flipped');
    }
    
    previousCard() {
        if (this.isLoading) return;
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCard();
            this.updateProgress();
        }
    }
    
    nextCard() {
        if (this.isLoading) return;
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCard();
            this.updateProgress();
        }
    }
    
    async updateCard() {
        const currentCard = this.cards[this.currentIndex];
        if (currentCard) {
            const frontLang = this.frontLangSelect.value;
            const backLang = this.backLangSelect.value;
            
            this.cardFront.textContent = currentCard[frontLang];
            
            // If we don't have the translation in our static data, use OpenRouter
            if (!currentCard[backLang]) {
                try {
                    this.isLoading = true;
                    this.cardBack.textContent = 'Loading translation...';
                    const translation = await TranslationService.translate(
                        currentCard[frontLang],
                        frontLang,
                        backLang
                    );
                    currentCard[backLang] = translation;
                    this.cardBack.textContent = translation;
                } catch (error) {
                    this.cardBack.textContent = 'Translation failed. Please try again.';
                    console.error('Translation error:', error);
                } finally {
                    this.isLoading = false;
                }
            } else {
                this.cardBack.textContent = currentCard[backLang];
            }
            
            // Reset flip state when changing cards
            this.isFlipped = false;
            this.flashcard.classList.remove('flipped');
        }
    }
    
    updateProgress() {
        this.currentCardSpan.textContent = this.currentIndex + 1;
        this.totalCardsSpan.textContent = this.cards.length;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlashCardApp();
});
