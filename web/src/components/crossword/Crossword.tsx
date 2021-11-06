import React, {FC, useReducer} from "react";
import {WordHints, WordProp} from "./WordHints";
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
        <div style={{display: 'flex'}}>

            <div style={{flex: 0.25}}>
                <Grid  gameState={gameState}
                       onCellChange={updateGameState}/>
            </div>

            <div style={{flex: 0.25}}>
                <WordHints words={gameState.words}/>
            </div>

        </div>
    )
}
