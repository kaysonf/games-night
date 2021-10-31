import React, {ComponentProps, FC, useReducer, useState} from "react";


export interface Position {
    row: number;
    col: number;
}

interface CellProps extends Position{
    character: string;
}

const useCell = (defaultCell: string = '') => {
    const [cellValue, updateCell] = useState(defaultCell);
    return [cellValue, updateCell];
}

const _nextChar = (c: string): string => {
    if (c === 'z') return ' ';
    if (c === ' ') return 'a';
    return String.fromCharCode(((c.charCodeAt(0) + 1 - 97) % 26) + 97)
}

export const Cell: FC<CellProps> = (props: CellProps) => {
    const [char, nextChar] = useReducer((char: string) => _nextChar(char), props.character)

    return (
        <button onClick={() => nextChar()}>
            {char}
        </button>
    )
}