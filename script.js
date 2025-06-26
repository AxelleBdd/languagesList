const container = document.querySelector('#languagesDisplay');
const addButton = document.querySelector('#addLanguageButton');
const inputAdd = document.querySelector('#addLanguage');

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

async function deleteLanguage(name) {
    try {
        const response = await fetch(`http://localhost:8000/languages`, {
            method: "DELETE",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({ language: name })
        });
        if (response.ok){
            alert("Language deleted")
            await displayLanguages();
        } else {
            alert("An error has occurred")
        }

    } catch (error) {
        console.error(error.message); 
    }
}

async function modifyLanguage(name, userInput) {
    try {
        const response = await fetch(`http://localhost:8000/languages/${name}`, {
            method: "PUT",
            headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({ language: userInput })
        });
        if (response.ok){
            alert("Language modified")
            await displayLanguages();
        } else {
            alert("An error has occurred")
        }

    } catch (error) {
        console.error(error.message); 
    }
}

function createLanguageDiv(languageArray, container) {
    container.innerHTML = "";
    languageArray.forEach(language => {
        const languageDiv = document.createElement('div');
        languageDiv.innerHTML = `· ${language}`;
        languageDiv.className = "languageDiv"
        
        const modifyLanguageButton = document.createElement('button');
        modifyLanguageButton.innerText = "Modify";
        modifyLanguageButton.className = "modifyButton";
        
        const deleteLanguageButton = document.createElement('button');
        deleteLanguageButton.innerText = "Delete";
        deleteLanguageButton.className = "deleteButton";
        
        deleteLanguageButton.addEventListener("click", () => {
            deleteLanguage(language);
        })
        
        modifyLanguageButton.addEventListener("click", () => {
            let updatelanguage = prompt("Enter the new language name: ")
            modifyLanguage(language, updatelanguage);
        })

        container.appendChild(languageDiv);
        languageDiv.appendChild(modifyLanguageButton);
        languageDiv.appendChild(deleteLanguageButton);
    });
}

addButton.addEventListener("click", () => {
    event.preventDefault(); //Eviter le rechargement du navigateur au submit du form
    postLanguage();
    inputAdd.value = "";
})


displayLanguages()