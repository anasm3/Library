const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; 
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index;
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
            <button onclick="removeBook(${index})">Remove Book</button>
        `;
        libraryDiv.appendChild(bookCard);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('formContainer').classList.toggle('hidden');
});

document.getElementById('bookForm').addEventListener('submit', (event) => {
    // event.preventDefault(); // Prevent form from submitting the traditional way
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    document.getElementById('bookForm').reset();
    document.getElementById('formContainer').classList.add('hidden');
});

addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
