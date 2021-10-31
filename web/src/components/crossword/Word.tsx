import React, {FC} from 'react';
import {PureCell, Position} from "./Cell";

export enum Direction {
    Across = 'across',
    Down = 'down'
}

export interface WordProp {
    direction: Direction;
    startRow: number;
    startCol: number;
    word: string;
}

export const Word: FC<WordProp> = (props) => {
    const characters = props.word.split('');

    const getPos = (index: number): Position => {
        const row = props.direction === Direction.Across ? props.startRow : props.startRow + index;
        const col = props.direction === Direction.Down ? props.startCol : props.startCol + index;
        return {row, col}
    }

    return (
        <div className={'container'}>
            {characters
                .map((c, i) => (
                    <PureCell {...getPos(i)} character={c}/>)
                )
            }
        </div>
    )
}