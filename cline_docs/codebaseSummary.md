# Codebase Summary

## Key Components and Their Interactions

### FlashCardApp (script.js)
- Main application class
- Handles UI interactions and state management
- Manages card navigation and display
- Handles language switching
- Implements keyboard controls

### Data Management (words.js)
- Stores static translations
- Provides multi-language support
- Contains predefined word pairs

### UI Components (index.html, styles.css)
- Responsive card layout
- Language selection controls
- Navigation buttons
- Card flip animations

## Data Flow
1. User selects languages for front and back of cards
2. Application loads translations from static data
3. User navigates through cards using buttons or keyboard
4. Cards display translations based on selected languages
5. UI updates reflect current card and progress

## Features
- Static translations management
- Intuitive navigation controls
- Keyboard shortcuts
- Language switching
- Progress tracking
- Card flip animations

## Recent Significant Changes
- Removed OpenRouter integration for simpler architecture
- Streamlined translation management to use static data
- Enhanced error handling for missing translations
- Improved performance with simplified codebase

## User Experience
- Immediate language switching
- Smooth card transitions
- Clear navigation controls
- Keyboard shortcuts for efficiency
- Visual progress tracking
