import styled from 'styled-components';

export const EditorWrapper = styled.div`
	display: flex;
	flex: 1;
	overflow: hidden;
	width: ${props => 100 - props.width}%;
		
	scrollbar-width: thin;
	scrollbar-color: rgba(190, 190, 190, 0.0) transparent;
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 4px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}
`;

export const TextArea = styled.textarea`
	border-radius: ${({ theme }) => theme.borderRadius};
	border-radius: 10px 0 0 10px;
	margin: ${({ theme }) => theme.borderMargin};
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(20px);
	padding: 10px;
	margin-right: 0;
	border: none;
	resize: none;
	outline: none;
	color: ${({ theme }) => theme.textColor};
	font-size: 20px;
	width: ${props => props.width}%;
	overflow: auto;
	padding-bottom: ${({ theme }) => theme.paddingBottom};

	scrollbar-width: thin;
	/* transition-duration: 0.2s; */
	&:hover {
		scrollbar-color: rgba(190, 190, 190, 0.15) transparent;
	}
`;

export const Preview = styled.div`
	border-radius: ${({ theme }) => theme.borderRadius};
	border-radius: 0 10px 10px 0;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(20px);
	padding: 10px;
	margin: ${({ theme }) => theme.borderMargin};
	margin-left: 0;
	overflow-y: auto;
	overflow-x: hidden; 
	color: ${({ theme }) => theme.textColor};
	font-size: 20px;
	width: ${props => 100 - props.width}%;

	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	padding-bottom: ${({ theme }) => theme.paddingBottom};

	img {
		max-width: 100%;
		height: auto;
	}

	scrollbar-width: thin;
	/* transition-duration: 0.2s; */
	&:hover {
		scrollbar-color: rgba(190, 190, 190, 0.15) transparent;
	}
	ul, ol {
        /* margin-left: 20px; Делает маркеры видимыми */
        /* padding-left: 20px; */
		margin-bottom: 0;
		margin-top: 0;
        list-style-position: inside; /* Маркеры внутри контейнера */
    }

    li {
        margin-bottom: 5px; /* Отступ между элементами списка */
    }
`;

export const Divider = styled.div`
	width: 3px;
	cursor: col-resize;
	margin: ${({ theme }) => theme.borderMargin} 0;
	/* background-color: ${({ theme }) => theme.dividerColor}; */
	background-color: rgba(50,50,90,0.9);
	z-index: 1;
`;

export const Placeholder = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	/* height: 100%; */
	width: 100%;
	/* background-color: ${({ theme }) => theme.placeholderBackground}; */
	color: ${({ theme }) => theme.placeholderText};
	font-size: 70px;

	border-radius: 10px;
	margin: ${({ theme }) => theme.borderMargin};
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(20px);
`;
