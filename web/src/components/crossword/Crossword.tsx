import React, {FC} from "react";
import {WordProp} from "./Word";
import {Cell} from "./Cell";

interface CrossWordProp {
    words: WordProp[];
    wordMap: string[][];
    onCellChange: Function;
}

const createIter = (n: number) => [...Array(n)]

export const Crossword: FC<CrossWordProp> = ({words, wordMap, onCellChange = (f: Function) => f}) => {

    const totalRows = wordMap.length;

    const totalCols = wordMap.reduce((maxLength: number, wordCol: string[]) => {
        return Math.max(maxLength, wordCol.length);
    }, 0);

    return (
        <div>
            <table>
                <tbody>
                {createIter(totalRows)
                    .map((_, r) =>

                        <tr key={r}>
                            {createIter(totalCols).map((_, c) => (

                                <td key={c}>
                                    <Cell key={`${r}_${c}`}
                                          row={r}
                                          col={c}
                                          character={wordMap[r][c]}
                                    />
                                </td>

                            ))}
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    )
}
