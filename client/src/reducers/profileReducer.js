import profileConstants from '../constants/profileConstants';
import _ from 'lodash';

const initialState = {
	totalCapital: 0
};

export default (state = initialState, action = {}) => {
	let updated = _.merge({}, state);

	switch (action.type) {
		case profileConstants.SET_TOTAL_CAPITAL:
			updated.totalCapital = action.payload;

			return updated;

		default:
			return updated;
	}
};
