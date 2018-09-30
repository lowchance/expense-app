import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses when id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1',
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const id = 'my id';
	const description = 'my description';
	const note = 'my note';
	const amount = 1;
	const createdAt = moment();
	const expense = {
		id,
		description,
		note,
		amount,
		createdAt,
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
	const id = '2';
	const description = 'my description';
	const note = 'my note';
	const amount = 1;
	const createdAt = moment();
	const updates = {
		id,
		description,
		note,
		amount,
		createdAt,
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: updates.id,
		updates,
	};
	const state = expensesReducer(expenses, action);
	expect(state[1]).toEqual(updates);
});

test('should not edit an expense if no id matches', () => {
	const id = '-1';
	const description = 'my description';
	const note = 'my note';
	const amount = 1;
	const createdAt = moment();
	const updates = {
		id,
		description,
		note,
		amount,
		createdAt,
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: updates.id,
		updates,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
