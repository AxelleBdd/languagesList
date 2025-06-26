const container = document.querySelector('#languagesDisplay')
const addButton = document.querySelector('#addLanguageButton')
const inputAdd = document.querySelector('#addLanguage')

async function displayLanguages() {
    const response = await fetch('http://localhost:8000/languages');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const list = await response.json();
    createLanguageDiv(list, container);
}

async function postLanguage() {
    const input = {
        language: inputAdd.value
    }

    try {
        const response = await fetch('http://localhost:8000/languages', {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
    
                },
            body: JSON.stringify(input)
        });

        const result = await response.json();
        await displayLanguages();

    } catch (error) {
        console.error(error.message); 
    }
}

function createLanguageDiv(languageArray, container) {
    languageArray.forEach(language => {
        const languageDiv = document.createElement('p');
        languageDiv.innerHTML = `· ${language}`;

        const modifyLanguage = document.createElement('button');
        modifyLanguage.innerText = "Modify";

        const deleteLanguage = document.createElement('button');
        deleteLanguage.innerText = "Delete";


        container.appendChild(languageDiv);
        languageDiv.appendChild(modifyLanguage);
        languageDiv.appendChild(deleteLanguage);
    });
}

addButton.addEventListener("click", function () {
    event.preventDefault(); //Eviter le rechargement du navigateur au submit du form
    postLanguage();
})

displayLanguages()