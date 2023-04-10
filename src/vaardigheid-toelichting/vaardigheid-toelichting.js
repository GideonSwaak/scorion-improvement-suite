$(window).load(async function () {
    const vaardigheden = await fetch("https://competenties.hu-open-ict.nl/api/v1/vaardigheden").then(res => res.json());

    const elements = [...document.querySelectorAll(".clsFormElementQuestion")]
        .filter(element => element.id.includes("oordeel"))
        .map(element => ({ el: element, vaardigheid: element.querySelector(".divLabel")?.innerText.trim() }));

    elements.forEach(element => [...element.el.querySelectorAll(".clsFormInputRadio")].forEach(input => input.addEventListener("change", drawVaardigheden)));

    function drawVaardigheden() {
        [...document.querySelectorAll(".vaardigheid-toelichting")].forEach(el => el.remove());
        elements.forEach(element => {
            const niveau = parseInt(element.el.querySelector("input[type=\"radio\"]:checked")?.value[7]);
            if (niveau) element.el.appendChild(createVaardigheidsBlock(element.vaardigheid, niveau, element.el));
        });
    }

    function createVaardigheidsBlock(vaardigheid, level, element) {
        const block = document.createElement("div");
        const width = getComputedStyle(element).width;
        block.style.width = width;
        block.classList.add("vaardigheid-toelichting");
        block.innerHTML += `<strong>Niveau: ${level}</strong><br>`;
        block.innerHTML += vaardigheden[vaardigheid][`${level}`].title;
        return block;
    }
    
    drawVaardigheden();
});