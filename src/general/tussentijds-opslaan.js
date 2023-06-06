document.addEventListener("keydown", event => {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        const tussentijdsOpslaan = document.querySelector("input[value='Tussentijds opslaan']");
        if (tussentijdsOpslaan) {
            tussentijdsOpslaan.click();
        }
    }
});