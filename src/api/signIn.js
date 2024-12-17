import axios from 'axios';

import { API } from '../constants/api';

export const signIn = async (login, password) => {
    try {
        const userResponse = await axios.post(API.SIGN_IN_URI, {
            login,
            password,
        });
        console.log(userResponse);
        return userResponse.data;
    } catch {
        return {
            login: undefined,
        };
    }
};