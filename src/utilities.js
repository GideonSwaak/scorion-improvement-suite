export function betterTextareaEncode(text, replaceLinebreaks = false) {
    if (replaceLinebreaks) {
        text = text.replaceAll("<br>", "\n");
    }
    return text.replaceAll("\u0027", "\u2019");
}

export function betterTextareaDecode(text, replaceLinebreaks = false) {
    if (replaceLinebreaks) {
        text = text.replaceAll("\n", "<br>");
    }
    return text.replaceAll("\u2019", "\u0027");
}