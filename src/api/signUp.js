import axios from 'axios';

import { API } from '../constants/api';

export const signUp = async (login, password) => {
    try {
        await axios.post(API.SIGN_UP_URI, {
            login,
            password,
        });
        return true;
    } catch {
        return false;
    }
};