import stockConstants from '../constants/stockConstants';

import _ from 'lodash';

const initialState = {
	stocks: [],
	isFetching: false,
	error: null
};

export default (state = initialState, action = {}) => {
	// maybe switch to Object.assign instead
	let updated = _.merge({}, state);

	switch (action.type) {
		case stockConstants.GET_STOCKS_REQUEST:
			updated.isFetching = true;

			return updated;

		case stockConstants.GET_STOCKS_SUCCESS:
			updated.stocks = action.payload;
			updated.isFetching = false;
			return updated;

		case stockConstants.GET_STOCKS_FAILURE:
			updated.stocks = [];
			updated.isFetching = false;
			updated.error = action.payload;

			return updated;

		default:
			return updated;
	}
};
