let myLibrary = [];

function Book(title, author, year,status, rating){
      // the constructor...
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
    this.rating = rating;
    this.info = function (){
        return `${title} by ${author}, ${year} , ${status}, Rating: ${rating}/5 `;
    }
}

// Save data to local storage
function saveToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Retrieve data from local storage
function loadFromLocalStorage() {
  var storedLibrary = localStorage.getItem('myLibrary');
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
  }
}
loadFromLocalStorage();
console.log(myLibrary);

// Add Book to library
function addBookToLibrary(title, author, year,status, rating) {
  let newBook = new Book(title, author, year, status, rating);
  myLibrary.push(newBook);
  saveToLocalStorage();
}


// Function to reset myLibrary in localStorage
function resetLocalStorage() {
  localStorage.removeItem('myLibrary');
  myLibrary = []; // Reset the local variable to an empty array
}


