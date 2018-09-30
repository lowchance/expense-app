import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import toJSON from 'enzyme-to-json';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test('should render ExpenseListFilters correctly', () => {
	expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({
		filters: altFilters,
	});
	expect(toJSON(wrapper)).toMatchSnapshot();
});


test('should handle text change', () => {
	const value = 'test';
	const event = {
		target: { value },
	};
	wrapper.find('input').simulate('change', event);
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});


test('should handle sort by date', () => {
	wrapper.setProps({
		filters: altFilters,
	});
	const value = 'date';
	const event = {
		target: { value }
	};
	wrapper.find('select').simulate('change', event);
	expect(sortByDate).toHaveBeenCalled();
});


test('should handle sort by date', () => {
	const value = 'amount';
	const event = {
		target: { value }
	};
	wrapper.find('select').simulate('change', event);
	expect(sortByAmount).toHaveBeenCalled();
});


test('should handle date changes', () => {
	const startDate = moment(0);
	const endDate = moment(0).add(4, 'months');
	wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus changes', () => {
	const calendarFocused = 'endDate';
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
