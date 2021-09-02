const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const resultCounter = document.getElementById('total-result');
const resultField = document.getElementById('result-field');    

const loadBook = () => {
    if(inputField.value === ''){
        resultCounter.textContent = '';
        resultCounter.innerText = 'input field does not empty!';
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${inputField.value}`;
        inputField.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}

const displaySearchResult = books => {
    resultField.textContent = '';
    let count = 0;
    if(books.length === 0){
        resultCounter.textContent = '';
        resultCounter.innerText = 'No result Found';
    }
    else{
        books.forEach(book => {
            resultCounter.textContent = '';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top h-50" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name?.[0] ?? 'N/A'}</p>
                        <p class="card-text">1st Publish Year: ${book?.first_publish_year ?? 'N/A'}</p>
                        <p class="card-text">Publisher: ${book.publisher?.[0] ?? 'N/A'}</p>
                    </div>
                </div>
            `;
            resultField.appendChild(div);
            count++;
        })
        resultCounter.innerText = `Total Result: ${count}`;
    }
    
}