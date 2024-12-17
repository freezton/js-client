import axios from 'axios';

import { API } from '../constants/api';

export const refresh = async () => {
	try {
		const res = await axios.post(API.REFRESH_URI);
		return res;
	} catch {
		console.error('Problem while refreshing token');
		return null;
	}
};