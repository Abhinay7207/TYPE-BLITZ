// Word pools for different difficulty levels
const EASY_WORDS = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

const MEDIUM_WORDS = [
    "through", "between", "important", "children", "example", "thought", "system", "program",
    "question", "government", "number", "without", "different", "world", "school", "still",
    "should", "never", "country", "found", "answer", "school", "around", "small", "however",
    "house", "during", "learn", "point", "large", "study", "every", "place", "mother",
    "world", "information", "family", "student", "group", "problem", "against", "business",
    "issue", "level", "member", "power", "whether", "national", "ability", "already",
    "although", "always", "become", "before", "believe", "benefit", "better", "beyond",
    "building", "certain", "change", "community", "company", "consider", "continue", "control",
    "create", "decide", "develop", "difference", "difficult", "discover", "discuss", "during",
    "education", "effect", "effort", "enough", "environment", "especially", "establish", "everyone"
];

const HARD_WORDS = [
    "accommodate", "acknowledge", "acquaintance", "algorithm", "anonymous", "appropriate",
    "architecture", "arrangement", "assessment", "assumption", "atmosphere", "availability",
    "beneficial", "bureaucracy", "characteristic", "collaboration", "commitment", "communication",
    "competitive", "comprehensive", "concentration", "consequence", "consideration", "contemporary",
    "contribution", "controversial", "conventional", "coordination", "corporation", "correspondence",
    "demonstration", "description", "determination", "development", "differentiate", "disappointment",
    "discrimination", "distribution", "documentation", "effectiveness", "embarrassment", "encouragement",
    "entertainment", "environment", "establishment", "exaggeration", "examination", "explanation",
    "extraordinary", "fundamental", "government", "identification", "implementation", "independence",
    "infrastructure", "intelligence", "interpretation", "investigation", "knowledge", "maintenance"
];

const PUNCTUATION = [",", ".", "!", "?", ";", ":", "-"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export type Difficulty = 'easy' | 'medium' | 'hard';
export type CaseMode = 'lower' | 'upper' | 'mixed';

function getWordPool(difficulty: Difficulty): string[] {
    switch (difficulty) {
        case 'easy':
            return EASY_WORDS;
        case 'medium':
            return MEDIUM_WORDS;
        case 'hard':
            return HARD_WORDS;
    }
}

function applyCase(word: string, caseMode: CaseMode): string {
    switch (caseMode) {
        case 'lower':
            return word.toLowerCase();
        case 'upper':
            return word.toUpperCase();
        case 'mixed':
            // Randomly capitalize some letters
            return word.split('').map(char =>
                Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
            ).join('');
    }
}

export function generateText(
    difficulty: Difficulty,
    caseMode: CaseMode,
    wordCount: number = 50
): string {
    const wordPool = getWordPool(difficulty);
    const words: string[] = [];

    for (let i = 0; i < wordCount; i++) {
        const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        let word = applyCase(randomWord, caseMode);

        // Add punctuation for hard mode (20% chance)
        if (difficulty === 'hard' && Math.random() > 0.8) {
            const punct = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
            word += punct;
        }

        // Add numbers for hard mode (10% chance)
        if (difficulty === 'hard' && Math.random() > 0.9) {
            const num = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
            word += num;
        }

        words.push(word);
    }

    return words.join(' ');
}
