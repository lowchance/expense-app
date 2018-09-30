import { createStore } from 'redux';

// Action Generators - functions that return action objects


const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy,
});

const setCount = ({ count = 0 } = {}) => ({
	type: 'SET',
	count,
});

const resetCount = () => ({
	type: 'RESET',
});

const store = createStore((state = { count: 0 }, action) => {
	switch (action.type) {
	case 'INCREMENT':
		const incrementBy = action.incrementBy;
		return {
			count: state.count + incrementBy,
		};
	case 'DECREMENT':
		const decrementBy = action.decrementBy;
		return {
			count: state.count - decrementBy,
		};
	case 'RESET':
		return {
			count: 0,
		};
	case 'SET':
		return {
			count: action.count,
		};
	default:
		return state;
	}
});

const unsubscribe = store.subscribe( () => {
	console.log(store.getState());
});


store.dispatch(incrementCount({ incrementBy: 5 }));

// store.dispatch({
// 	type: 'INCREMENT',
// 	incrementBy: 5,
// });

// unsubscribe();

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));
