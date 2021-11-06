import React, {FC} from 'react';

export enum Direction {
    Across = 'across',
    Down = 'down'
}

export interface WordProp {
    id: number,
    direction: Direction;
    startRow: number;
    startCol: number;
    word: string;
    found: boolean;
}

const Word: FC<{wordProp: WordProp}> = ({wordProp}) => {
    return (
        <li>
            <div style={{textDecoration:  wordProp.found ? 'line-through': ''}}>
                {wordProp.id} {wordProp.word}
            </div>
        </li>
    )
}

export const WordHints: FC<{words: WordProp[]}> = ({words}) => {
    const wordsAcross = words.filter(word => word.direction === Direction.Across).sort((word1, word2) => word1.id - word2.id);
    const wordsDown = words.filter(word => word.direction === Direction.Down).sort((word1, word2) => word1.id - word2.id);
    return (
        <div>
            <h5>Across</h5>
                <ul>
                    {wordsAcross.map(word => <Word key={word.word} wordProp={word}/>)}
                </ul>
            <h5>Down</h5>
                <ul>
                    {wordsDown.map(word => <Word key={word.word} wordProp={word}/>)}
                </ul>
        </div>
    );
};

