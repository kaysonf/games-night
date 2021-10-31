import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {PureCell} from "../components/crossword/Cell";

export default {
    title: 'Cell',
    component: PureCell
} as ComponentMeta<typeof PureCell>;

const Template: ComponentStory<typeof PureCell> = (args) => <PureCell {...args} />;

export const BaseCell = Template.bind({});

BaseCell.args = {
    character: 'a',
}