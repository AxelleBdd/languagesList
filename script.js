const container = document.querySelector('#LanguagesDisplay')

async function displayLanguages() {
    const response = await fetch('http://localhost:8000/languages');
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const list = await response.json();

    list.forEach(language => {
        const languagediv = document.createElement('p');
        languagediv.innerHTML = `${language}`;

        container.appendChild(languagediv)
    });
}

displayLanguages()