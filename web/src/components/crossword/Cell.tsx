import React, {FC, memo} from "react";


export interface Position {
    row: number;
    col: number;
}

interface CellProps extends Position {
    character: string;
    onCellChange: Function;
    disabled?: boolean;
}

const BLANK = ' ';
const NEXT = 1;
const ASCII_a = 'a'.charCodeAt(0); // 97
const NUMBER_OF_ALPHABETS = 26;

const _nextChar = (c: string): string => {
    if (c === 'z') return BLANK;
    if (!c || c === BLANK) return 'a';
    return String.fromCharCode(
        ((c.charCodeAt(0) + NEXT - ASCII_a) % NUMBER_OF_ALPHABETS) + ASCII_a);
}

const Cell: FC<CellProps> = (
    {
        row,
        col,
        character = BLANK,
        disabled= false,
        onCellChange = (f: Function) => f
    }
) => {

    return (
        <button disabled={disabled} onClick={() => {
            onCellChange({r: row, c: col, s: _nextChar(character)});
        }}>
            {character}
        </button>
    )
}

export const PureCell = memo(Cell);