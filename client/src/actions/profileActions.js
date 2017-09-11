import superagent from 'superagent';
import profileConstants from '../constants/profileConstants';

export function setTotalCapital(payload) {
	return {
		type: profileConstants.SET_TOTAL_CAPITAL,
		payload
	};
}

