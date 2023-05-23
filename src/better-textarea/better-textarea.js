import { betterTextareaDecode, betterTextareaEncode, markdownPreview } from "./utilities.js";
import showdown from "showdown";

$(document).ready(function () {
    showdown.setOption("simpleLineBreaks", true);
    showdown.setOption("simplifiedAutoLink", true);
    const Showdown = new showdown.Converter();

    // Render non-readonly textareas
    function renderBetterTextarea(originalTextarea) {
        const customTextarea = document.createElement("div");
        customTextarea.classList.add("custom-textarea");
        customTextarea.contentEditable = true;
        customTextarea.innerHTML = betterTextareaDecode(originalTextarea.value);
        customTextarea.addEventListener("input", function () {
            originalTextarea.value = betterTextareaEncode(customTextarea.innerHTML, true);
        });
        customTextarea.addEventListener("paste", function (event) {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, text);
        });

        const titlebar = originalTextarea.closest("tr").previousElementSibling;
        titlebar.classList.add("custom-textarea-titlebar");
        const td = titlebar.querySelector("td:nth-child(2)");
        td.setAttribute("valign", "middle");
        const button = document.createElement("button");
        button.innerHTML = "Preview";
        button.classList.add("btn-preview");
        button.addEventListener("click", event => {
            if (customTextarea.contentEditable === "true") {
                markdownPreview(customTextarea, true, originalTextarea);
                button.classList.add("btn-preview-active");
            } else {
                markdownPreview(customTextarea, false, originalTextarea);
                button.classList.remove("btn-preview-active");
            }
        });
        td.appendChild(button);
        return customTextarea;
    }

    // Render readonly textareas
    function renderBetterReadonlyTextarea(element) {
        const readonlyTextarea = document.createElement("div");
        readonlyTextarea.classList.add("readonly-textarea");
        readonlyTextarea.innerHTML = Showdown.makeHtml(betterTextareaDecode(element.value, false));
        return readonlyTextarea;
    }

    // Replace all textareas with custom textareas (readonly and non-readonly)
    document.querySelectorAll("textarea.clsFormInputArea").forEach(textArea => {
        if (textArea.readOnly || textArea.disabled) {
            textArea.classList.add("old-readonly-textarea", "hidden");
            textArea.insertAdjacentElement("afterend", renderBetterReadonlyTextarea(textArea));
        } else {
            textArea.classList.add("old-textarea", "hidden");
            textArea.insertAdjacentElement("afterend", renderBetterTextarea(textArea));
        }
    });
});