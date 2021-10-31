import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Direction, Word} from "../components/crossword/Word";

export default {
    title: 'Word',
    component: Word
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = (args) => <Word {...args}/>;

export const AcrossWord = Template.bind({});

AcrossWord.args = {
    startRow: 1,
    startCol: 1,
    word: 'fish',
    direction: Direction.Across,
}