/**
 * @fileoverview This file contains the utilities for the better textarea
 * @author Gideon Swaak
 * @requires showdown
 */
import showdown from "showdown";

/**
 * 
 * @param {string} text - the text to be encoded
 * @param {boolean} replaceLinebreaks - true: replace <br> with \n, false: do nothing
 */
export function betterTextareaEncode(text, replaceLinebreaks = false) {
    if (replaceLinebreaks) {
        text = text.replaceAll("<br>", "\n");
    }
    return text.replaceAll("\u0027", "\u2019");
}

/**
 * 
 * @param {string} text - the text to be decoded 
 * @param {boolean} replaceLinebreaks - true: replace \n with <br>, false: do nothing
 */
export function betterTextareaDecode(text, replaceLinebreaks = false) {
    if (replaceLinebreaks) {
        text = text.replaceAll("\n", "<br>");
    }
    return text.replaceAll("\u2019", "\u0027");
}

/**
 * @param {HTMLElement} element          - the element to be rendered
 * @param {boolean} enabled              - true: preview, false: edit
 * @param {HTMLTextAreaElement} textarea - the original textarea
 * @description Renders the preview or edit mode of the better textarea
 */
export function markdownPreview(element, enabled, textarea) {
    const Showdown = new showdown.Converter();
    if (enabled) {
        element.innerHTML = Showdown.makeHtml(betterTextareaDecode(textarea.value, false));
        element.contentEditable = false;
    } else {
        element.innerHTML = betterTextareaDecode(textarea.value, false);
        element.contentEditable = true;
    }
}