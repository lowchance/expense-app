import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should set up remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc',
	});
});

test('should set up edit expense action object', () => {
	const action = editExpense('abc123', { note: 'New note value' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'abc123',
		updates: { note: 'New note value' },
	});
});

test('should setup add expense action object with provided values', () => {
	const expenseData = {
		description: 'Rent',
		amount: 109500,
		createdAt: 1000,
		note: 'This was last months rent',
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String),
		}
	});
});

test('tests the default values for the add expense action object', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: '',
			note: '',
			amount: 0,
			createdAt: 0,
			id: expect.any(String),
		},
	});
});
