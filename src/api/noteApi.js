import axios from "axios";
import { API } from "../constants/api";
import { SOCKET_MESSAGES } from "../constants/socketMessages"
import { connectionSocket } from './connectionSocket';

const message = 'Failed to complete the api request!';

class NoteApi {

	async getAllNotes(userId) {
		try {
			connectionSocket.emit(SOCKET_MESSAGES.GET_ALL_NOTES, userId);
		} catch {
			throw new Error(message);
		}
	}

	async getNoteById(noteId) {
		try {
			const res = await axios.get(`${API.GET_NOTE}/${noteId}`);
			return res.data;
		} catch {
			console.error("Error fetching single note:");
			return false;
		}
	}

	async deleteNoteById(noteId) {
		try {
			const res = await axios.delete(`${API.GET_NOTE}/${noteId}`);
			return res.data;
		} catch {
			console.error("Error deleting single note:");
			return false;
		}
	}

	async updateNote(noteId, title, content) {
		try {
			const res = await axios.put(`${API.UPDATE_NOTE}/${noteId}`, {
				note: JSON.stringify({ title, content }),
			});
			return res;
		} catch {
			console.error("Error updating single note:");
			return false;
		}
	}

	async createNote(title, content) {
		try {
			const res = await axios.post(`${API.CREATE_NOTE}`, {
				note: JSON.stringify({ title, content }),
			});
			return res.data;
		} catch {
			console.error("Error creating single note:");
			return false;
		}
	}

	async uploadImage(file) {
		const formData = new FormData();
		console.log(file);
		formData.append("file", file);

		const res = await axios.post(`${API.UPLOAD_IMAGE}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (res.status === 404) {
			console.error("Error while uploading image");
			return;
		}
		
		console.log(res.data.imageUrl);
		return res.data.imageUrl;
	}

	async getAllImages() {
		try {
			const res = await axios.get(API.GET_ALL_IMAGES);
			return res;
		} catch {
			console.error("Error fetching images:");
			return false;
		}
	}

	async deleteImageById(imageId) {
		try {
			const res = await axios.delete(`${API.DELETE_IMAGE}/${imageId}`);
			return res.data;
		} catch {
			console.error("Error deleting single image:");
			return false;
		}
	}
}

const api = new NoteApi();

export default api;
