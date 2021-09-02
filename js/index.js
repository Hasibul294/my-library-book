const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const resultCounter = document.getElementById('total-result');
const resultField = document.getElementById('result-field');    

// Loading Books data 
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
            .then(data => {
                displaySearchResult(data.docs);
                displayTotalResult(data);
            });
    }
}

// Display Books Result 
const displaySearchResult = books => {
    resultField.textContent = '';
    let count = 0;
    if(books.length === 0){
        resultCounter.textContent = '';
        return;
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
                        <p class="card-text"><small class="fw-bold">Author:</small> ${book.author_name?.[0] ?? 'N/A'}</p>
                        <p class="card-text"><span class="fw-bold">Publisher:</span> ${book.publisher?.[0] ?? 'N/A'}</p>
                        <p class="card-text"><span class="fw-bold">1st Publish Year:</span> ${book?.first_publish_year ?? 'N/A'}</p>
                    </div>
                </div>
            `;
            resultField.appendChild(div);
            count++;
        })
    }
}

// Display Total Result 
const displayTotalResult = totalResult => {
    if(totalResult.numFound === 0){
        resultCounter.innerText = 'No result Found';
    }
    else{
        resultCounter.innerText = `Total Result: ${totalResult.numFound}`;
    }
}