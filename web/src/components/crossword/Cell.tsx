import React, {FC, memo} from "react";

export interface Position {
    row: number;
    col: number;
}

export interface CellProps extends Position {
    character: string;
    wordId: number[]; // TODO: move out of cell props
    answer: string; // TODO: move out of cell props
    onCellChange?: Function;
    disabled?: boolean;
}
const BLANK = ' ';
const NEXT = 1;
const ASCII_a = 'a'.charCodeAt(0); // 97
const NUMBER_OF_ALPHABETS = 26;

const _nextChar = (character: string): string => {

    if (character === 'z') return BLANK;
    if (!character || character === BLANK) return 'a';

    return String.fromCharCode(
        ((character.charCodeAt(0) + NEXT - ASCII_a) % NUMBER_OF_ALPHABETS) + ASCII_a);
}

const Cell: FC<CellProps> = (props) => {

    const emitCellChange = (msg: CellProps): void => {
        props.onCellChange!(msg);
    }

    return (
        <button disabled={props.disabled} onClick={() => {
            emitCellChange({
                ...props,
                character: _nextChar(props.character),
            });
        }}>
            {props.character}
        </button>
    )
}
Cell.defaultProps = {
    character: BLANK,
    disabled: false,
    onCellChange: (f: Function) => f
}
export const PureCell = memo(Cell);