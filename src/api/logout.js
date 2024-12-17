import axios from 'axios';

import { API } from '../constants/api';

export const logout = async () => {
    try {
        await axios.delete(API.LOGOUT_URI);
        return true;
    } catch {
		return false;
    }
};