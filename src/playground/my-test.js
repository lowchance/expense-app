import { createStore } from 'redux';
import React from 'react';

const todos = (state = { text: '' }, action) => {
	switch (action.type) {
	case 'ADD_TODO':
		return state.concat(action.text);
	default:
		return state;
	}
};

const store = createStore(todos, ['Use Redux']);

function addTodo(text) {
	return {
		type: 'ADD_TODO',
		text,
	}
}

store.dispatch(addTodo('Read the docs'));
store.dispatch(addTodo('Read about the middleware'));

console.log(store.getState());
