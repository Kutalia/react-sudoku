// zero based index is supplied and returned
function getRowIndex(index) {
    return Math.floor(index / 9);
}

function getColumnIndex(index) {
    return index % 9;
}

// checks if there is same element in the appropriate row of the given element
function checkRow(index, sudoku) {
    const rowIndex = getRowIndex(index);
    const firstIndexInRow = rowIndex * 9;
    let indexInCurrentLoop;

    for (let i = 0; i < 9; i++) {
        indexInCurrentLoop = firstIndexInRow + i; // next element index in the row of the current loop
        if (index === indexInCurrentLoop || sudoku[indexInCurrentLoop] !== sudoku[index]) {
            continue;
        }
        return false;
    }
    // we're all safe, no same numbers
    return true;
}

function checkColumn(index, sudoku) {
    const columnIndex = getColumnIndex(index);
    const firstIndexInColumn = columnIndex;
    let indexInCurrentLoop;

    for (let i = 0; i < 9; i++) {
        indexInCurrentLoop = firstIndexInColumn + i * 9; // next element index in the column of the current loop
        if (index === indexInCurrentLoop || sudoku[indexInCurrentLoop] !== sudoku[index]) {
            continue;
        }
        return false;
    }

    return true;
}

function checkSquare(index, sudoku) {
    const columnIndex = index % 9;
    const squaresRowIndex = Math.floor(index / 27);
    const squaresColumnIndex = Math.floor(columnIndex / 3);

    const firstIndexInSquare = squaresRowIndex * 27 + squaresColumnIndex * 3;

    let minIndexInCurrentLoop, indexInCurrentLoop;

    for (let i = 0; i < 3; i++) { // checking 3 rows in the square
        minIndexInCurrentLoop = firstIndexInSquare + i * 9; // next row
        for (let j = 0; j < 3; j++) {  // 3 columns in each
            indexInCurrentLoop = minIndexInCurrentLoop + j; // next column
            if (index === indexInCurrentLoop || sudoku[indexInCurrentLoop] !== sudoku[index]) {
                continue;
            }
            return false;
        }
    }

    return true;
}

function addToSudoku(index, num, sudoku) {
    sudoku[index] = num;
    return sudoku;
}

function sudokuToString(sudoku) {
    let str = String(sudoku);
    // remove trailing commas
    while (str.indexOf(',,') !== -1) {
        str = str.replace(',,', '');
    }
    if (str.charAt(str.length - 1) === ',') {
        str = str.slice(0, str.length - 1);
    }
    return str;
}

function addToBacktracker(sudoku) {
    let sudokuStr = sudokuToString(sudoku);

    for (let i = 0; i < backtracker.length; i++) {
        const sequence = backtracker[i];
        // bigger sequences are not needed if substrings of it are guaranteed to fail as well
        if (sequence.indexOf(sudokuStr) !== -1) {
            backtracker.splice(i, 1);
            i--; // thanks to javascript mutating splice we have to considerate new backtracker length as well
        }
    }

    backtracker.push(sudokuStr);
}

function checkInBacktracker(sudoku) {
    let sudokuStr = sudokuToString(sudoku);

    for (let i = 0; i < backtracker.length; i++) {
        const sequence = backtracker[i];
        // the minimum guaranteed failing sudoku sequence
        if (sequence.indexOf(sudokuStr) !== -1) {
            return false;
        }
    }

    return true;
}

let backtracker = [], unsolvableSequence, randNum, sudoku = new Array(81).fill(null), index, possibleValues;

function generateNewSudokuElement() {
    index = sudoku.indexOf(null), possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    do {
        // can't generate a new number, all tried
        if (possibleValues.length === 0) {
            sudoku.splice(index, 1, null);
            unsolvableSequence = [...sudoku];
            addToBacktracker(unsolvableSequence);
            sudoku.splice(index - 1, 1, null);
            return null;
        }

        randNum = possibleValues[Math.floor(Math.random() * possibleValues.length)];
        sudoku = addToSudoku(index, randNum, sudoku);
        possibleValues.splice(possibleValues.indexOf(randNum), 1);
    } while (!(checkRow(index, sudoku) && checkColumn(index, sudoku) && checkSquare(index, sudoku))
        || !checkInBacktracker(sudoku));
}

function generateSolvedSudoku() {
    while (sudoku.indexOf(null) !== -1) {
        generateNewSudokuElement();
    }
    return sudoku;
}

export function getSquareIndices(squareIndex) {
    const squaresRowIndex = Math.floor(squareIndex / 3);
    const squaresColumnIndex = squareIndex % 3;

    let squareIndices = [];

    const firstIndexInSquare = squaresRowIndex * 27 + squaresColumnIndex * 3;

    let minIndexInCurrentLoop, indexInCurrentLoop;

    for (let i = 0; i < 3; i++) { // checking 3 rows in the square
        minIndexInCurrentLoop = firstIndexInSquare + i * 9; // next row
        for (let j = 0; j < 3; j++) {  // 3 columns in each
            indexInCurrentLoop = minIndexInCurrentLoop + j; // next column
            squareIndices.push(indexInCurrentLoop);
        }
    }

    return squareIndices;
}

export const difficultyLevels = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
};

const prefilledCellsInSquareByDifficulty = {
    [difficultyLevels.EASY]: [3, 4, 5],
    [difficultyLevels.MEDIUM]: [3, 4],
    [difficultyLevels.HARD]: [1, 2, 3]
};

export const defaultState = {
    sudoku: [],
    prefilledCells: [],
    failedCells: [],
    modal: true
};

export function generateSudoku(difficulty) {
    let sudoku = generateSolvedSudoku();
    const possibleFilledCellsInSquare = prefilledCellsInSquareByDifficulty[difficulty];
    let i = 0, squareIndices, maxFilledCellsInSquare, filledCellsBySquare = new Array(9), allFilledCells = [];

    for (; i < 9; i++) { // since there are 9 squares on the whole table
        filledCellsBySquare[i] = [];
        squareIndices = getSquareIndices(i);
        maxFilledCellsInSquare = possibleFilledCellsInSquare[Math.floor(Math.random() * possibleFilledCellsInSquare.length)];
        for (let j = 0; j < maxFilledCellsInSquare; j++) {
            do {
                randNum = squareIndices[Math.floor(Math.random() * 9)];
            } while (filledCellsBySquare[i].indexOf(randNum) !== -1);
            filledCellsBySquare[i].push(randNum); // remember indices of cells that should be prefilled
        }
    }

    i = 0;
    for (; i < filledCellsBySquare.length; i++) {
        allFilledCells = [...allFilledCells, ...filledCellsBySquare[i]];
    }

    i = 0;
    for (; i < 81; i++) {
        if (allFilledCells.indexOf(i) === -1) {
            sudoku[i] = null;
        }
    }

    return {
        sudoku,
        prefilledCells: allFilledCells
    };
}

export function checkCell(value, index, sudokuState) {
    const sudoku = [...sudokuState]; // avoid mutations
    sudoku[index] = value;
    return checkSquare(index, sudoku) && checkRow(index, sudoku) && checkColumn(index, sudoku);
}
