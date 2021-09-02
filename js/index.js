const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const resultField = document.getElementById('result-field');

const loadBook = () => {
    const url = `http://openlibrary.org/search.json?q=${inputField.value}`;
    inputField.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
}

const displaySearchResult = books => {
    resultField.textContent = '';
    // console.log(books.docs);
    let count = 0;
    resultField.textContent = '';
    books.forEach(book => {
        // console.log(book.cover_i);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top h-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author_name?.[0]}</p>
                    <p class="card-text">1st Publish Year: ${book.first_publish_year}</p>
                    <p class="card-text">Publisher: ${book.publisher?.[0]}</p>
                </div>
            </div>
        `;
        resultField.appendChild(div);
        count++;
        console.log(count);
    })
    
}