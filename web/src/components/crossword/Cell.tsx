import React, {ComponentProps, FC, useState} from "react";


export interface Position {
    row: number;
    col: number;
}

interface CellProps extends Position{
    character?: string;
}

const useCell = (defaultCell: string = '') => {
    const [cellValue, updateCell] = useState(defaultCell);
    return [cellValue, updateCell];
}

export const Cell: FC<CellProps> = (props: CellProps) => {

    return (
        <button>
            {props.character || ''}
        </button>
    )
}