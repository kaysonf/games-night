import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Crossword} from "../components/crossword/Crossword";
import {Direction} from "../components/crossword/Word";


export default {
    title: 'Crossword',
    component: Crossword
} as ComponentMeta<typeof Crossword>;

const Template: ComponentStory<typeof Crossword> = (args) => <Crossword {...args} />;

export const BaseCrossword = Template.bind({});

BaseCrossword.args = {
    words: [
        {
            startCol: 0,
            startRow: 0,
            word: 'chicken',
            direction: Direction.Across
        }
    ],
    wordMap: [
        'chicken'.split(''),
        '  fish'.split(''),
    ]
}