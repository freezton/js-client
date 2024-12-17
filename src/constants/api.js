export const API_URI = 'http://localhost:8080/api'
export const SOCKETS_URI = 'http://localhost:8080'

export const API = {
    SIGN_UP_URI: API_URI + `/auth/signup`,
    SIGN_IN_URI: API_URI + `/auth/signin`,
    LOGOUT_URI: API_URI + `/auth/revoke`,
    REFRESH_URI: API_URI + `/auth/refresh`,

    GET_ALL_NOTES: API_URI + '/notes',
    GET_NOTE: API_URI + '/notes', // /:id
    CREATE_NOTE: API_URI + '/notes', 
    UPDATE_NOTE: API_URI + '/notes', // /:id
    DELETE_NOTE: API_URI + '/notes', // /:id

    UPLOAD_IMAGE: API_URI + '/images',
    GET_IMAGE: API_URI + '/images', // /:id
    GET_ALL_IMAGES: API_URI + '/images',
    DELETE_IMAGE: API_URI + '/images',

    POST_METHOD: 'POST',
    DELETE_METHOD: 'DELETE',
    PUT_METHOD: 'PUT',
};