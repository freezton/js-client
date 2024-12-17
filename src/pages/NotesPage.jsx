import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { logout } from "../api/logout";
import NoteApi from "../api/noteApi";
import Header from "../components/Header";
import Modal from "../components/Modal";
import NoteEditor from "../components/NoteEditor";
import NoteList from "../components/NoteList";
import { useAuth } from "../context/authContext";
import { API } from "../constants/api";
import { connectionSocket } from "../api/connectionSocket";
import { SOCKET_MESSAGES } from "../constants/socketMessages";
import { fetchAuthorized } from "../api/fetchAuthorized";
import { data } from "react-router-dom";

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;

	background-image: url("/bg.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex: 1;
	overflow: hidden;
`;

export const Divider = styled.div`
	width: 3px;
	cursor: col-resize;
	background-color: rgba(0, 0, 0, 0);
	z-index: 1;
`;

const NotesPage = () => {
	const [notes, setNotes] = useState([]); // set notes list
	const [images, setImages] = useState([]); // set notes list
	const [activeNote, setActiveNote] = useState(null); // active note
	const [isModalOpen, setIsModalOpen] = useState(false); // new note title input window
	const [newNoteTitle, setNewNoteTitle] = useState(""); // new note title handler
	const [listWidth, setListWidth] = useState(15); // noteList size
	const [isHeaderVisible, setIsHeaderVisible] = useState(true); // new note title input window
	const [isNoteListVisible, setIsNoteListVisible] = useState(true); // hide note list

	const [selectedImage, setSelectedImage] = useState(null);
	const { contextLogout } = useAuth(); // for logout

	const handleDragDivider = e => {
		const listWrapper = document.querySelector(".content-wrapper");
		if (!listWrapper) {
			console.error("no content wrapper");
			return;
		}
		const textareaLeft = listWrapper.getBoundingClientRect().left;
		const editorWidth = listWrapper.offsetWidth;

		const newWidth = ((e.clientX - textareaLeft) / editorWidth) * 100;
		if (newWidth > 10 && newWidth < 80) {
			setListWidth(newWidth);
		}
	};

	const stopDrag = () => {
		window.removeEventListener("mouseup", stopDrag);
		document.body.style.userSelect = "";
		window.removeEventListener("mousemove", handleDragDivider);
	};

	const startDrag = () => {
		window.addEventListener("mouseup", stopDrag);
		document.body.style.userSelect = "none";
		window.addEventListener("mousemove", handleDragDivider);
	};

	connectionSocket.on(SOCKET_MESSAGES.RECEIVED_ALL_NOTES, data => {
		// console.log(data);
		setNotes(data);
	});

	connectionSocket.on(SOCKET_MESSAGES.RECEIVED_NOTE, data => {
		setSelectedImage(null);
		setActiveNote(data);
	});

	connectionSocket.on(SOCKET_MESSAGES.UPDATED_NOTE, data => {
		const { content } = data;
		// debounce()
		// console.log(activeNote);
		// console.log(data);
		setActiveNote(prevActiveNote => {
			if (prevActiveNote && prevActiveNote.id === data.id) {
				// setActiveNote(prev => ({ ...prev, content }));
				return { ...prevActiveNote, content };
			}
			return prevActiveNote;
		});
		// setNotes(prevNotes =>
		// 	prevNotes.map(note =>
		// 		note.id === id ? { ...note, content } : note
		// 	)
		// );
	});

	useEffect(() => {
		async function fetchData() {
			const userId = localStorage.getItem("userId");
			console.log("Emitting GET_ALL_NOTES event with userId:", userId);
			await fetchAuthorized(SOCKET_MESSAGES.GET_ALL_NOTES, userId);
			if (connectionSocket.connected) {
				console.log("Socket connected");
			} else {
				console.log("Socket not connected");
			}
			// if (!res) {
			// await logout();
			// contextLogout();
			// return;
			// }
			// setNotes(res.data);

			// const imgRes = await NoteApi.getAllImages();
			// if (!imgRes) {
			// 	// await logout();
			// 	// contextLogout();
			// 	// return;
			// }
			// setImages(imgRes.data);
		}
		fetchData();

		// KEYBOARD SHORTCUTS
		const handleKeyDown = e => {
			const key = e.key;
			if (e.ctrlKey && (key === "b" || key === "и")) {
				setIsNoteListVisible(prev => !prev);
				setIsHeaderVisible(prev => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [contextLogout]);

	const handleTabPress = e => {
		if (e.key === "Tab") {
			e.preventDefault();
			const textarea = e.target;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const newValue =
				textarea.value.substring(0, start) +
				"\t" +
				textarea.value.substring(end);
			textarea.value = newValue;
			textarea.selectionStart = textarea.selectionEnd = start + 1;
		}
	};

	const handleSelectNote = async id => {
		const userId = localStorage.getItem("userId");
		await fetchAuthorized(SOCKET_MESSAGES.GET_NOTE, userId, id);
	};

	const handleUpdateNote = async (id, title, content) => {
		const userId = localStorage.getItem("userId");
		// console.log(id);
		await fetchAuthorized(
			SOCKET_MESSAGES.UPDATE_NOTE,
			userId,
			id,
			title,
			content
		);
		// await fetchAuthorized(
		// 	SOCKET_MESSAGES.UPDATE_NOTE,
		// 	userId,
		// 	id,
		// 	title,
		// 	content
		// );
		// debouncedUpdateNote(userId, id, title, content);
	};

	const debouncedUpdateNote = useCallback(
		debounce(async (userId, id, title, content) => {
			// console.log('Sending update for note:', id, title, content);
			await fetchAuthorized(
				SOCKET_MESSAGES.UPDATE_NOTE,
				userId,
				id,
				title,
				content
			);
		}, 1000),
		[]
	);

	const handleCreateNote = async () => {
		if (!newNoteTitle.trim()) return;
		const newNote = await NoteApi.createNote(newNoteTitle);
		if (!newNote) {
			await logout();
			contextLogout();
		}
		setNotes(prev => [...prev, newNote]);
		setNewNoteTitle("");
		setIsModalOpen(false);
	};

	const updateImageList = async id => {
		setImages(prev => [...prev, id]);
	};

	const handleDeleteNote = async id => {
		await NoteApi.deleteNoteById(id);
		setNotes(prev => prev.filter(note => note.id !== id));
		if (activeNote?.id === id) setActiveNote(null);
	};

	const handleDeleteImage = async id => {
		await NoteApi.deleteImageById(id);
		setImages(prev => prev.filter(image => image !== id));
		if (activeNote?.id === id) setActiveNote(null);
	};

	const handleSelectAttachment = imageId => {
		const selectedImage1 = images.find(image => image === imageId);
		if (selectedImage1) {
			const newImageUrl = `![img](${API.GET_IMAGE}/${selectedImage1})`;
			setSelectedImage(newImageUrl);
			setActiveNote(prevNote => ({
				...prevNote,
				content: newImageUrl,
			}));
		}
	};

	return (
		<PageWrapper>
			{isHeaderVisible && <Header onCreateNote={() => setIsModalOpen(true)} />}
			<ContentWrapper className="content-wrapper">
				{isNoteListVisible && (
					<NoteList
						notes={notes}
						attachments={images}
						onSelectNote={note => handleSelectNote(note.id)}
						onDeleteNote={handleDeleteNote}
						onDeleteAttachment={handleDeleteImage}
						onSelectAttachment={handleSelectAttachment}
						width={listWidth}
					/>
				)}
				<Divider onMouseDown={startDrag} />
				<NoteEditor
					width={listWidth}
					note={activeNote}
					onUpdate={handleUpdateNote}
					onKeyDown={handleTabPress}
					updateImageList={updateImageList}
					imageUrl={selectedImage}
				/>
			</ContentWrapper>
			{isModalOpen && (
				<Modal
					title="Create a New Note"
					inputValue={newNoteTitle}
					onInputChange={e => setNewNoteTitle(e.target.value)}
					onConfirm={handleCreateNote}
					onCancel={() => {
						setIsModalOpen(false);
						setNewNoteTitle("");
					}}
				/>
			)}
		</PageWrapper>
	);
};

export default NotesPage;
