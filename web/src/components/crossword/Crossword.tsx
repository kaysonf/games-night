import React, {FC, useReducer} from "react";
import {WordProp} from "./Word";
import {CellProps} from "./Cell";
import {createGameState, findMaxDimensionsOfCrossword, updateGameStateReducer,} from "./CrosswordUtil";
import {Grid} from "./Grid";

interface CrossWordProp {
    words: WordProp[];
}

export interface CrosswordGameState {
    cells: CellProps[][];
    words: WordProp[];
    wordsLeftToGuess: number;
}


const setupGameState = (words: WordProp[]): CrosswordGameState => {
    const {maxRow, maxCol} = findMaxDimensionsOfCrossword(words);

    return createGameState(maxRow, maxCol, words);
}


export const Crossword: FC<CrossWordProp> = (props) => {
    const {words} = props;
    const [gameState, updateGameState] = useReducer(updateGameStateReducer, setupGameState(words))

    if (gameState.wordsLeftToGuess === 0) {
        alert('you won!');
    }

    return (
        <div>
            <Grid gameState={gameState}
                  onCellChange={updateGameState}/>
        </div>
    )
}
