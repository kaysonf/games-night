import React, {FC} from "react";
import {WordProp, Direction} from "./Word";
import {Cell} from "./Cell";

interface CrossWordProp {
    words: WordProp[];
    onCellChange: Function;
}

const createIter = (n: number) => [...Array(n)]

const findMaxDimensions = (words: WordProp[]): {maxRow: number, maxCol: number} => {
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

const createWordMap = (maxRow: number, maxCol: number) => createIter(maxRow).map(_ => [...createIter(maxCol)]);

const createAnswers = (maxRow: number, maxCol: number, words: WordProp[]): string[][] => {

    const wordMap = createWordMap(maxRow, maxCol);

    words.forEach((wordProp: WordProp) => {
        const word = wordProp.word.split('');

        word.forEach((c, i) => {
          if (wordProp.direction === Direction.Across)
              wordMap[wordProp.startRow][wordProp.startCol + i] = c;
          else
              wordMap[wordProp.startRow + i][wordProp.startCol] = c;
        })
    });

    return wordMap;
}

export const Crossword: FC<CrossWordProp> = ({words, onCellChange = (f: Function) => f}) => {

    const {maxRow: totalRows, maxCol: totalCols} = findMaxDimensions(words);

    const answerWordMap = createAnswers(totalRows, totalCols, words);
    const guessWordMap = createWordMap(totalRows, totalRows);

    return (
        <div>
            <table>
                <tbody>
                {createIter(totalRows)
                    .map((_, r) =>

                        <tr key={r}>
                            {createIter(totalCols).map((_, c) => (

                                <td key={c}>
                                    {answerWordMap[r][c] && answerWordMap[r][c].match(/[a-z]/i) ?
                                        <Cell key={`${r}_${c}`}
                                          row={r}
                                          col={c}
                                          character={answerWordMap[r][c]}
                                        />
                                        : null}
                                </td>

                            ))}
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    )
}
