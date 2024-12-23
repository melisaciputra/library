function Book(title, author, year,status, rating){
      // the constructor...
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
    this.rating = rating;
    this.getInfoHTML = function() {
      return `<p>${this.title} by ${this.author}, ${this.year} , ${this.status}, Rating: ${this.rating}/5</p>`;
  };
}



let myLibrary = [];

// Save data to local storage
function saveToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Retrieve data from local storage
function loadFromLocalStorage() {
  const storedLibrary = localStorage.getItem('myLibrary');
  if (storedLibrary) {
    const storedBooks = JSON.parse(storedLibrary);
      
      // Create Book instances for each stored object
      // NOte that it has to be NEW BOOK otherwise it is not a "Book" object, just a default object
      myLibrary = storedBooks.map(function(storedBook) {
          return new Book(storedBook.title, storedBook.author, storedBook.year, storedBook.status, storedBook.rating);
      });
  }
}

/**
 *  Rendering the libary 
 * 
 * */
loadFromLocalStorage();

if (myLibrary.length === 0) {
  console.log("Your library is empty");
} else {
  // Print information for each book in myLibrary
  const libraryContainer = document.getElementById('library-container');
  myLibrary.forEach(function(book) {
      libraryContainer.innerHTML += book.getInfoHTML();
  });
}


// Add Book to library
function addBookToLibrary(title, author, year,status, rating) {
  let newBook = new Book(title, author, year, status, rating);
  myLibrary.push(newBook);
  saveToLocalStorage();
  console.log("Adding to the library");
  console.log(myLibrary);
}


// Function to reset myLibrary in localStorage
function resetLocalStorage() {
  localStorage.removeItem('myLibrary');
  myLibrary = []; // Reset the local variable to an empty array
}


// add book from the modal
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const status = document.getElementById('status').value;
  const rating = document.getElementById('bookRating').value;

  // Call addBookToLibrary with the form values
  addBookToLibrary(title, author, year, status, rating);
}


// Attach the handleFormSubmit function to the form's submit event
const addBookForm = document.getElementById('addBookModal');
addBookForm.addEventListener('submit', handleFormSubmit);

/* The popup */
function showPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

function hidePopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', showPopup);

const closePopupButton = document.getElementById('close-popup');
const overlay = document.getElementById('overlay');

closePopupButton.addEventListener('click', hidePopup);
overlay.addEventListener('click', hidePopup);
