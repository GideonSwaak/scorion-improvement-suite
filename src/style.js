const style = document.createElement("style");
style.innerHTML = `
    .custom-textarea ul {
        margin-block-start: 0;
        margin-block-end: 0;
    }

    .custom-textarea[contenteditable=false] {
        white-space: unset;
    }

    .custom-textarea-titlebar {
        width: 100%;
        background-color: #2ea1d7;
        color: white;
    }

    .custom-textarea-titlebar .divLabel {
        background: none;
        border: 0;
        color: white;
    }

    .btn-preview {
        background-color: #e85818;
        color: white;
        border: 0;
        outline: 0;
        height: 100%;
        padding: 0.2rem;
        padding-top: calc(0.2rem + 2.5px);
        padding-bottom: calc(0.2rem + 2.5px);
    }

    .btn-preview:hover {
        background-color: #e85818cc;
        color: white;
    }
    
    .btn-preview-active {
    }
    `;
document.head.appendChild(style);