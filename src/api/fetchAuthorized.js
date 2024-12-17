import { SOCKET_MESSAGES } from '../constants/socketMessages';

import { connectionSocket } from './connectionSocket';
import { refresh } from './refreshTokens';

export const fetchAuthorized = async (message, ...data) => {
    try {
        connectionSocket.emit(message, ...data);
        const result = await new Promise((_, reject) => {
            connectionSocket.off(SOCKET_MESSAGES.AUTH_ERROR);
            connectionSocket.on(SOCKET_MESSAGES.AUTH_ERROR, (errorMessage) => reject(errorMessage));
        });
        return result;
    } catch (e) {
        // console.log(e.message);
        try {
            connectionSocket.disconnect();
            await refresh();
            connectionSocket.connect();
            connectionSocket.emit(message, ...data);
            const result = await new Promise((_, reject) => {
                connectionSocket.off(SOCKET_MESSAGES.AUTH_ERROR);
                connectionSocket.on(SOCKET_MESSAGES.AUTH_ERROR, (errorMessage) => reject(errorMessage));
            });
            return result;
        } catch {
            throw new Error('Access denied');
        }
    } finally {
        connectionSocket.off(SOCKET_MESSAGES.AUTH_ERROR);
    }
};