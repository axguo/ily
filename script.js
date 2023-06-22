

const wordLengths = {
    '5': ['daily', 'drily', 'gaily', 'icily'],
    '6': [
        'airily', 'bodily',
        'busily', 'cozily',
        'cagily', 'civily',
        'eerily', 'easily',
        'foxily', 'hazily',
        'holily', 'lazily',
        'mazily', 'punily'
    ],
    '7': [
        'angrily', 'bawdily', 'bonnily', 'balmily',
        'baggily', 'beamily', 'cannily', 'crazily',
        'dirtily', 'dingily', 'dizzily', 'dowdily',
        'dandily', 'duskily', 'fussily', 'fishily',
        'funnily', 'fierily', 'foggily', 'fairily',
        'giddily', 'gaudily', 'grimily', 'godlily',
        'hastily', 'handily', 'heavily', 'happily',
        'huskily', 'huffily', 'hardily', 'headily',
        'jerkily', 'jollily', 'jantily', 'lustily',
        'loftily', 'luckily', 'lousily', 'mistily',
        'merrily', 'murkily', 'moodily', 'messily',
        'mangily', 'moonily', 'muddily', 'milkily',
        'nastily', 'noisily', 'nervily', 'nuttily',
        'needily', 'pettily', 'pithily', 'privily',
        'perkily', 'happily', 'happily', 'luckily',
        'luckily'
    ],
    '8': [
        'bloodily', 'breezily', 'clammily', 'clumsily',
        'cheerily', 'craftily', 'chirpily', 'chattily',
        'cheekily', 'creakily', 'crustily', 'comelily',
        'cloudily', 'chuffily', 'drowsily', 'daintily',
        'dreamily', 'drearily', 'drippily', 'flabbily',
        'faultily', 'friskily', 'flashily', 'frostily',
        'filthily', 'flimsily', 'frothily', 'frumpily',
        'grumpily', 'guiltily', 'gloomily', 'greasily',
        'glossily', 'greedily', 'grubbily', 'glassily',
        'grungily', 'hungrily', 'heartily', 'homelily',
        'jauntily', 'livelily', 'mightily',
        'pluckily', 'prettily', 'patchily', 'prissily',
        'plaguily'
    ],
    '9': [
        'cursorily', 'cleanlily',
        'doughtily', 'disrulily',
        'flightily', 'grouchily',
        'healthily', 'haughtily',
        'lengthily', 'naughtily',
        'primarily'
    ],
    '10': [
        'almightily', 'contrarily',
        'culinarily', 'dilatorily',
        'friendlily', 'impolarily',
        'militarily', 'minatorily',
        'ordinarily', 'obituarily'
    ],
    '11': [
        'arbitrarily', 'accessarily',
        'accessorily', 'customarily',
        'decretorily', 'exemplarily',
        'foolhardily', 'momentarily',
        'mandatorily', 'mercenarily',
        'necessarily'
    ],
    '12': [
        'elementarily',
        'hereditarily',
        'melancholily',
        'obligatorily',
        'peremptorily'
    ],
    '13': [
        'anniversarily',
        'accustomarily',
        'declaratorily',
        'extemporarily',
        'fragmentarily',
        'involuntarily',
        'perfunctorily'
    ],
    '15': [
        'contradictorily',
        'conventionalily',
        'discretionarily',
        'extraordinarily'
    ]
}

const paragraphElement = document.getElementById("paragraph");
let paragraph = "";
const words = [];


for (let i = 0; i < 20; i++) {
    const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    if (!words.includes(randomAdverb)) { words.push(randomAdverb); }
}

paragraphElement.textContent = words.join(".");


let currentWordIndex = 0;
let currentLetterIndex = 0;
let replacementWord = "";

function findNewWord(length, current) {
    let tries = 10;
    while (tries > 0) {
        const randomWordIndex = Math.floor(Math.random() * wordLengths[length].length);
        if (!words.includes(randomWordIndex)) {
            return wordLengths[length][randomWordIndex];
        }   
    }
    return current;
}

// Swap out a random letter every second except for the last three letters (ily)
function updateParagraph() {
    const word = words[currentWordIndex];
    const length = word.length;

    // Determine the maximum index to swap letters until the last three positions
    const maxIndex = Math.max(0, length - 3);

    if (currentLetterIndex < maxIndex) {
        if (currentLetterIndex === 0) {
            // Select a random word from wordLengths of the same length as the current word
            replacementWord = findNewWord(length, word);
        }

        // Get the corresponding replacement letter from the replacement word
        const replacementLetter = replacementWord[currentLetterIndex];

        // Replace the letter in the word
        const updatedWord =
            word.substring(0, currentLetterIndex) +
            replacementLetter +
            word.substring(currentLetterIndex + 1);

        words[currentWordIndex] = updatedWord;
        paragraph = words.join(". ");
        paragraphElement.textContent = paragraph;

        currentLetterIndex++;
        setTimeout(updateParagraph, 100);
    } else {
        currentWordIndex = Math.floor(Math.random() * words.length);
        currentLetterIndex = 0;
        setTimeout(updateParagraph, Math.random() * 2000 + 100);
    }
};

updateParagraph();