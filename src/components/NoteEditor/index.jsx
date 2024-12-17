import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import NoteApi from "../../api/noteApi";
import { API_URI } from "../../constants/api";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import {
	Divider,
	EditorWrapper,
	Placeholder,
	Preview,
	TextArea,
} from "./components";

const NoteEditor = ({
	note,
	onUpdate,
	onKeyDown,
	updateImageList,
	imageUrl,
}) => {
	const [content, setContent] = useState(note?.content || "");
	const [textAreaWidth, setTextAreaWidth] = useState(50);

	const handleDragDivider = e => {
		const editorWrapper = document.querySelector(".editor-wrapper");
		if (!editorWrapper) {
			console.error("no editor wrapper");
			return;
		}
		const textareaLeft = editorWrapper.getBoundingClientRect().left;
		const editorWidth = editorWrapper.offsetWidth;

		const newWidth = ((e.clientX - textareaLeft) / editorWidth) * 100;
		if (newWidth > 20 && newWidth < 80) {
			setTextAreaWidth(newWidth);
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

	useEffect(() => {
		setContent(note?.content || "");
	}, [note]);

	const handleContentChange = e => {
		setContent(e.target.value);
		// console.log(note);
		if (note) onUpdate(note.id, note.title, e.target.value);
	};

	const handlePaste = async e => {
		const items = e.clipboardData.items;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.type.indexOf("image") !== -1) {
				const file = item.getAsFile();

				const imageUrl = await NoteApi.uploadImage(file);
				if (!imageUrl) return;
				updateImageList(imageUrl.substring(8));

				const textarea = e.target;
				const start = textarea.selectionStart;
				const end = textarea.selectionEnd;
				const before = content.substring(0, start);
				const after = content.substring(end);

				const newContent = `${before}![${file.name}](${API_URI}${imageUrl})${after}`;
				setContent(newContent);
				setTimeout(() => {
					textarea.selectionStart = textarea.selectionEnd =
						start + `![${file.name}](${API_URI}${imageUrl})`.length;
				}, 0);

				break;
			}
		}
	};

	const mdParser = new MarkdownIt({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return `<pre class="hljs"><code>${
						hljs.highlight(str, { language: lang }).value
					}</code></pre>`;
				} catch (__) {}
			}
			return `<pre class="hljs"><code>${mdParser.utils.escapeHtml(
				str
			)}</code></pre>`;
		},
	});

	return (
		<EditorWrapper className="editor-wrapper">
			{note ? (
				<>
					{!imageUrl && (
						<TextArea
							width={textAreaWidth}
							value={content}
							onChange={handleContentChange}
							onPaste={handlePaste}
							onKeyDown={onKeyDown}
						/>
					)}
					{!imageUrl && <Divider onMouseDown={startDrag} />}
					<Preview width={!imageUrl ? textAreaWidth : 0}>
						<div
							dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
						/>
					</Preview>
				</>
			) : (
				<Placeholder>Select a note to edit</Placeholder>
			)}
		</EditorWrapper>
	);
};

export default NoteEditor;
