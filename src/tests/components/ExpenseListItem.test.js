import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test('should render ExpenseListItem with fixture data', () => {
	const myExpense = expenses[0];
	const wrapper = shallow(<ExpenseListItem key={myExpense.id} {...myExpense} />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
