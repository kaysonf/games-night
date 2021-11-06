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
            id: 1,
            startCol: 0,
            startRow: 0,
            word: 'chicken',
            direction: Direction.Across
        },
        {
            id: 2,
            startCol: 0,
            startRow: 0,
            word: 'cuck',
            direction: Direction.Down
        },
        {
            id: 3,
            startCol: 5,
            startRow: 0,
            word: 'england',
            direction: Direction.Down
        }
    ]
}