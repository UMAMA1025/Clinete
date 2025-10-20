window.onload = function() {
    // Create a container div for the results
    let resultsDiv = document.createElement("div");
    resultsDiv.style.border = "1px solid black";
    resultsDiv.style.padding = "10px";
    resultsDiv.style.margin = "10px 0";
    resultsDiv.style.backgroundColor = "#f0f0f0";
    resultsDiv.innerHTML = "<h2>Resultados DOM</h2>";

    // Número de enlaces de la página
    let totalLinks = document.links.length;
    resultsDiv.innerHTML += "<p>Número de enlaces: " + totalLinks + "</p>";

    // Dirección del penúltimo enlace
    let penultimateHref = document.links[document.links.length - 2].href;
    resultsDiv.innerHTML += "<p>Penúltimo enlace: " + penultimateHref + "</p>";

    // Número de enlaces que enlazan a http://prueba
    let countPrueba = 0;
    for (let i = 0; i < document.links.length; i++) {
        if (document.links[i].href === "http://prueba") {
            countPrueba++;
        }
    }
    resultsDiv.innerHTML += "<p>Número de enlaces a http://prueba: " + countPrueba + "</p>";

    // Número de enlaces del tercer párrafo
    let thirdParagraph = document.getElementsByTagName("p")[2];
    let linksInThird = thirdParagraph.getElementsByTagName("a").length;
    resultsDiv.innerHTML += "<p>Número de enlaces en el tercer párrafo: " + linksInThird + "</p>";

    // Add the results div to the body
    document.body.appendChild(resultsDiv);
};
