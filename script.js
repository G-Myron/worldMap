const paths = document.querySelectorAll("#worldMap > path");
const screen = document.querySelector("#screen");

const hoverColor = '#ccc', markedColor = '#a0c';

const countries = {};

// In the svg used, each country is composed of 1 or more path elements representing its parts.
// If there's only one part it has attributes id and name, otherwise class.
paths.forEach( path => {
    // Assign the name of each country to its parts
    path.name = path.id? path.getAttribute("name") : path.getAttribute("class");

    // Object countries has countries names as keys and all their parts as items
    countries[path.name]? countries[path.name].push(path) : countries[path.name] = [path];


    path.addEventListener("mouseenter", e=> {
        screen.textContent = path.name;
        // if ( !path.clicked )
            applyToCountry(path.name, cntryPath => cntryPath.setAttribute('fill', hoverColor));
    });
    path.addEventListener("mouseleave", e=> {
        if ( !path.clicked )
            applyToCountry(path.name, cntryPath => cntryPath.removeAttribute('fill'));
        else
            applyToCountry(path.name, cntryPath => cntryPath.setAttribute('fill', markedColor));
    });

    path.addEventListener("click", e=> {
        applyToCountry(path.name, cntryPath => cntryPath.setAttribute('fill', markedColor));
        applyToCountry(path.name, cntryPath => !cntryPath.clicked? cntryPath.clicked = true : cntryPath.clicked = false);
    });
});


// Apply a function to every part of the country
function applyToCountry(cntryName, func) {
    countries[cntryName].forEach(func);
}

