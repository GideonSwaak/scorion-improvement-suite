import { betterTextareaDecode, betterTextareaEncode } from "./utilities.js";
import showdown from "showdown";

$(document).ready(function () {
    const Showdown = new showdown.Converter();

    function markdownPreview(element, enabled, textarea) {
        if (enabled) {
            element.innerHTML = Showdown.makeHtml(betterTextareaDecode(textarea.value, false));
            element.contentEditable = false;
        } else {
            element.innerHTML = betterTextareaDecode(textarea.value, false);
            element.contentEditable = true;
        }
    }

    function renderBetterTextarea(originalTextarea) {
        const customTextarea = document.createElement("div");
        customTextarea.classList.add("custom-textarea");
        customTextarea.contentEditable = true;
        customTextarea.innerHTML = betterTextareaDecode(originalTextarea.value);
        customTextarea.addEventListener("input", function () {
            originalTextarea.value = betterTextareaEncode(customTextarea.innerHTML, true);
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

    function renderBetterReadonlyTextarea(element) {
        const readonlyTextarea = document.createElement("div");
        readonlyTextarea.classList.add("readonly-textarea");
        readonlyTextarea.innerHTML = Showdown.makeHtml(betterTextareaDecode(element.value, false));
        return readonlyTextarea;
    }

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