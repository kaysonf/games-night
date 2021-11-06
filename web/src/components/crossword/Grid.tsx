import React, {FC} from 'react';
import {PureCell} from "./Cell";
import {CrosswordGameState} from "./Crossword";

export const Grid: FC<{gameState: CrosswordGameState, onCellChange: Function}> = (props) => {
    const {gameState, onCellChange} = props;
    return (
            <table>
                <tbody>
                {gameState.cells
                    .map((_, r) =>

                        <tr key={r}>
                            {gameState.cells[r].map((_, c) => (

                                <td key={c}>
                                    {gameState.cells[r][c] ?
                                        <PureCell key={`${r}_${c}`}
                                                  {...gameState.cells[r][c]}
                                                  onCellChange={onCellChange}
                                        />
                                        : null}
                                </td>

                            ))}
                        </tr>
                    )}
                </tbody>
            </table>
    );
}
Grid.defaultProps = {
    onCellChange: (f: Function) => f
}