import { io } from "socket.io-client";

import { SOCKETS_URI } from "../constants/api";

export const connectionSocket = io(SOCKETS_URI, {
	withCredentials: true,
	transports: ['websocket'],
	pingTimeout: 60000,
    pingInterval: 25000,
    cookie: true
});
