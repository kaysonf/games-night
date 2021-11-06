import {CellProps} from "./Cell";
import {Direction, WordProp} from "./WordHints";
import {CrosswordGameState} from "./Crossword";


export const createGameState = (width: number, height: number, words: WordProp[]): CrosswordGameState => {
    const stateMap = createCellPropsMap(height, width, words);

    return {
        cells: stateMap,
        words,
        wordsLeftToGuess: words.length
    }
}

export const updateGameStateReducer = (prev: CrosswordGameState, cell: CellProps): CrosswordGameState => {
    const { row, col, character, wordId } = cell;
    // change character display
    prev.cells[row][col].character = character;

    wordId.forEach(id => {
        const affectedWord = prev.words.find(word => word.id === id);

        if (!affectedWord) throw Error(`${id} does not exist`);

        const affectedCells = getCellsForWord(affectedWord);

        const correctGuessesForWord = affectedCells.filter(([row, col]) => {
            const { character: guess, answer } = prev.cells[row][col];
            return guess === answer;
        })


        // entire word guessed correctly
        if (correctGuessesForWord.length === affectedWord.word.length) {
            // set win for affected cells
            affectedCells.forEach(([row, col]) => {
                prev.cells[row][col].disabled = true;
            })

            prev.wordsLeftToGuess -= 1;
            const idx = prev.words.findIndex(word => word === affectedWord)
            prev.words[idx] = {...affectedWord, found: true};
        }

    })

    return {
        ...prev
    }
}

const createCellPropsMap = (maxRow: number, maxCol: number, words: WordProp[]): CellProps[][] => {

    const stateMap: CellProps[][] = create2DMap(maxRow, maxCol);

    words.forEach((wordProp: WordProp) => {
        const word = wordProp.word.split('');

        word.forEach((c, i) => {
            createCellInMap(stateMap, c, wordProp, i);
        })
    });

    return stateMap;
}

const getCellsForWord = (wordProp: WordProp): number[][] => {
    const word = wordProp.word.split('');

    const iter: number[][] = [];

    word.forEach((c, i) => {
        let row = wordProp.startRow;
        let col = wordProp.startCol;

        if (wordProp.direction === Direction.Across)
            col += i;
        else
            row += i

        iter.push([row, col]);
    })

    return iter;
}

const createCellInMap = (stateMap: CellProps[][], char: string, word: WordProp, offset: number) => {
    const answer = char;
    let wordId = [word.id];
    let row = word.startRow;
    let col = word.startCol;

    if (word.direction === Direction.Across) {
        col += offset;
    } else {
        row += offset;
    }


    if (stateMap[row][col]) wordId = [...stateMap[row][col].wordId,...wordId];

    stateMap[row][col] = {
        character: '',
        answer,
        wordId,
        row,
        col
    };
}

const create2DMap = (width: number, height: number) => [...Array(height)].map(_ => [...Array(width)]);

export const findMaxDimensionsOfCrossword = (words: WordProp[]): { maxRow: number, maxCol: number } => {
    return words.reduce((prev, word) => {
        let maxRow: number, maxCol: number;

        if (word.direction === Direction.Across) {
            maxRow = Math.max(prev.maxRow, 1);
            maxCol = Math.max(prev.maxCol, word.startCol + word.word.length);
        } else {
            maxRow = Math.max(prev.maxRow, word.startRow + word.word.length);
            maxCol = Math.max(prev.maxCol, 1);
        }

        return {maxRow, maxCol};

    }, {maxRow: 0, maxCol: 0})
}