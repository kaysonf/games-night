import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Cell} from "../components/crossword/Cell";

export default {
    title: 'Cell',
    component: Cell
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const BaseCell = Template.bind({});

BaseCell.args = {
    character: 'a'
}