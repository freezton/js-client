import React, { useState } from "react";
import styled from "styled-components";
import { FaTrashCan } from "react-icons/fa6";

const ListWrapper = styled.div`
	width: ${props => props.width}%;
	margin: 2px 2px 2px 0;
	border-radius: 0 10px 10px 0;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(20px);
	padding: 0px;
	overflow-y: auto;
`;

const Dropdown = styled.div`
	border-radius: 5px;
	overflow: hidden;
	transition-duration: 0.2s;
`;

const DropdownHeader = styled.div`
	background-color: rgba(0, 0, 0, 0.1);
	font-weight: 900;
	padding: 10px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${({ theme }) => theme.listItemText};
	&:hover {
		background-color: ${({ theme }) => theme.listItemHover};
	}
`;

const DropdownList = styled.div`
	max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
	overflow: hidden;
	transition: max-height 0.3s ease;
`;

const ListItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 3px;
	color: ${({ theme }) => theme.listItemText};
	cursor: pointer;
	transition-duration: inherit;
	background-color: ${({ index }) =>
		index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
	overflow: hidden;
	padding-left: 20px;
	&:hover {
		background-color: ${({ theme }) => theme.listItemHover};
	}

	span {
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&:hover .delete-icon {
		opacity: 1;
	}
`;

const DeleteButton = styled.button`
	flex-shrink: 0;
	opacity: 0;
	background: rgba(0, 0, 0, 0);
	color: white;
	border: none;
	padding: 5px 7px;
	margin-left: 10px;
	cursor: pointer;
	transition-duration: inherit;
	border-radius: 3px;

	&:hover {
		background-color: rgba(30, 30, 30, 0.5);
	}
`;

const NoteList = ({
	notes,
	onSelectNote,
	onDeleteNote,
	attachments,
	onSelectAttachment,
	onDeleteAttachment,
	width,
}) => {
	const [isNotesOpen, setNotesOpen] = useState(true);
	const [isAttachmentsOpen, setAttachmentsOpen] = useState(false);

	return (
		<ListWrapper width={width}>
			{}
			<Dropdown>
				<DropdownHeader onClick={() => setAttachmentsOpen(!isAttachmentsOpen)}>
					<span>Attachments</span>
					<span>{isAttachmentsOpen ? "▲" : "▼"}</span>
				</DropdownHeader>
				<DropdownList isOpen={isAttachmentsOpen}>
					{attachments.map((attachment, index) => (
						<ListItem
							key={attachment.id}
							index={index}
							onClick={() => onSelectAttachment(attachment)}
						>
							<span>{attachment}</span>
							<DeleteButton
								className="delete-icon"
								onClick={e => {
									e.stopPropagation();
									onDeleteAttachment(attachment);
								}}
							>
								<FaTrashCan />
							</DeleteButton>
						</ListItem>
					))}
				</DropdownList>
			</Dropdown>

			{}
			<Dropdown>
				<DropdownHeader onClick={() => setNotesOpen(!isNotesOpen)}>
					<span>Notes</span>
					<span>{isNotesOpen ? "▲" : "▼"}</span>
				</DropdownHeader>
				<DropdownList isOpen={isNotesOpen}>
					{notes.map((note, index) => (
						<ListItem
							key={note.id}
							index={index}
							onClick={() => onSelectNote(note)}
						>
							<span>{note.title}</span>
							<DeleteButton
								className="delete-icon"
								onClick={e => {
									e.stopPropagation();
									onDeleteNote(note.id);
								}}
							>
								<FaTrashCan />
							</DeleteButton>
						</ListItem>
					))}
					{/* <AddButton > */}
					{/* Add Note */}
					{/* </AddButton> */}
				</DropdownList>
			</Dropdown>
		</ListWrapper>
	);
};

export default NoteList;
