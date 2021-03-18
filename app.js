//to do make it so the adjustments affect the objects, and make it so objects are editable after refresh (might need to fix new linking). Make it so that yes can be selected at the input form and translated to the visual. 


let read;
let title;
let author;
let pages;
let i = 0;
let individualBook = 0;
let individualBookArray = 0;


 let library = [];


library = JSON.parse(localStorage["library"]);

for(savedBook in library){
  addOldVisuals();
};

console.log(library);

class books{

  constructor(title,author,pages,read,dataNumber){
  this.title  = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.dataNumber = dataNumber;
  }

  info() { 
    return(`The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  }

}

let formEvent = document.getElementById('myForm');

formEvent.addEventListener("submit", function(e){
  const radiobtns = this.querySelectorAll("input[type=radio]");
  e.preventDefault();
  for(radiobtn of radiobtns){
    if( radiobtn.checked){
      read = radiobtn.value;
      submitCalled();
    //  return addBookToLibrary(read);

    }
  }
  console.log(read);
})
//test input
// let onion1 = new book("Tom","Jim",423,"yes",3);
let test;
let listTest;
function submitCalled(){
    hideSubmit();
    
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = parseInt(document.getElementById('pages').value)
    read = document.getElementById('no').value;


console.log(document.querySelectorAll('.visualBook').length);

console.log(library.slice(-1)[0]);

    if(library.length == 0){
       dataNumber = 0;
    }
      else{
        console.log("wtf")
         dataNumber = library.slice(-1)[0].dataNumber + 1;
      }

    const bookAdd = new books(title,author,pages,read,dataNumber);
    library.push(bookAdd);
    addVisual();
    for(book in library);{
      console.log(library[book]);
      console.log(library);
    }
  
  }

  function hideSubmit(){
    let hideForm = document.getElementById("myForm");
    
    hideForm.parentNode.style.display="none";
   
   }
   
   function showSubmit(){
     let showForm = document.getElementById("myForm");
     
     showForm.parentNode.style.display="";
    }

    function addVisual(){
      const container = document.querySelector('.container');
      console.log("test visual")
      
      for (; i<library.length; i++){
        console.log(library[i]);
        divBook = document.createElement("div");
        divBook.classList.add("visualBook");
        
      
        container.append(divBook);
        individualBook = document.querySelectorAll(".visualBook");
        individualBookArray = document.querySelector(".visualBook");
        
        console.log(individualBook[i]);
        titleBook = document.createElement('H2');
        authorBook = document.createElement("P");
        pagesBook = document.createElement("P");
        readBook = document.createElement("button");
        buttonAdd = document.createElement("button");
        buttonRemove = document.createElement("button");
        buttonDelete = document.createElement("button");
        readBook.className = "buttonRead";
        buttonAdd.className = "buttonAdd";
        buttonRemove.className = "buttonRemove";
        buttonDelete.className = "deleteButton";
        buttonAdd.innerText = "+";
        buttonRemove.innerText = "-"
        individualBook[i].setAttribute("data-index-number",library.slice(-1)[0].dataNumber)
        titleBook.innerText = title;
        authorBook.innerText="by: " + author;
        pagesBook.innerText= pages + " pg";
        buttonDelete.innerText = "Delete";
        readBook.innerText = read;
        if(readBook.innerText=="yes"){
          readBook.style.backgroundColor="green";
      
        }
      
      
      
        individualBook[i].append(titleBook);
        individualBook[i].append(authorBook);
        individualBook[i].append(pagesBook);
        individualBook[i].append(readBook);
        individualBook[i].append(buttonAdd);
        individualBook[i].append(buttonRemove);
        individualBook[i].append(buttonDelete);
        
        buttonDelete.addEventListener("click",(e)=>{
          console.log(e.currentTarget.parentNode);
          let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
          console.log(identifybook);
          console.log(e.currentTarget.parentNode);
          console.log(individualBook[i]);
          // let identifybook = individualBook[i].dataset.indexNumber;
          console.log(identifybook);
          deleteButtonEvent(identifybook);
        })
        buttonAdd.addEventListener("click",(e)=>{
          // let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
          indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
          libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);
  
         // let libraryFind = library.find(dataNumber);
         //  console.log(libraryFind);
          console.log(libraryFiltered[0].pages);
           pagesCount = parseInt(libraryFiltered[0].pages);
           console.log(pagesCount)
           pagesCount = (pagesCount + 1);
           libraryFiltered[0].pages = pagesCount;
           console.log(pagesCount);
           console.log(libraryFiltered.pages);
       
           let listOfBooks = e.currentTarget.parentNode.children[2];
           listOfBooks.innerHTML = pagesCount + " pg";
           
           localStorage.setItem("library", JSON.stringify(library));
  
         })
          buttonRemove.addEventListener("click",(e)=>{
            // let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
            
           indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
           libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);
  
          // let libraryFind = library.find(dataNumber);
          //  console.log(libraryFind);
           console.log(libraryFiltered[0].pages);
            pagesCount = parseInt(libraryFiltered[0].pages);
            console.log(pagesCount)
            pagesCount = (pagesCount - 1);
            libraryFiltered[0].pages = pagesCount;
            console.log(pagesCount);
            console.log(libraryFiltered.pages);
        
            let listOfBooks = e.currentTarget.parentNode.children[2];
            listOfBooks.innerHTML = pagesCount + " pg";
            
            localStorage.setItem("library", JSON.stringify(library));
  
          })
          readBook.addEventListener("click",(e)=>{
            indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
            console.log(e.currentTarget);
            indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
            libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);
  
            let textValue = e.currentTarget.innerHTML;
            if(textValue=="yes"){
              libraryFiltered[0].read = "no";
              e.currentTarget.innerHTML = "no";
              e.currentTarget.style.backgroundColor="white";
            }
            else if(textValue=="no"){
              libraryFiltered[0].read = "yes";
              e.currentTarget.innerHTML = "yes";
              e.currentTarget.style.backgroundColor="green";
            }
        
            
        
          })
          localStorage.setItem("library", JSON.stringify(library));
         
        }

  deleteEvent = document.querySelector(".deleteButton");
function deleteButtonEvent(indexValue){
if(indexValue>0){
  console.log(library);
  library.splice(indexValue-1,1);

  console.log(library);
}
else{
  library.splice(indexValue,1);
  console.log(library);
}

let contentToDelete = document.getElementsByClassName("visualBook");
console.log(contentToDelete);
for(let j=0; j<contentToDelete.length;j++){
  let holdVal = contentToDelete[j].getAttribute("data-index-number");
  console.log(holdVal);
  if(holdVal==indexValue){
  console.log(contentToDelete[indexValue]);
  contentToDelete[j].remove("div");
  console.log(contentToDelete);
  i = library.length;
}


}
localStorage.setItem("library",JSON.stringify(library));

      };
    }
     

      function addOldVisuals(){
        const container = document.querySelector('.container');
      console.log("test visual")
      
      for (; i<library.length; i++){
        console.log(library[i]);
        divBook = document.createElement("div");
        divBook.classList.add("visualBook");
        
      
        container.append(divBook);
        individualBook = document.querySelectorAll(".visualBook");
        individualBookArray = document.querySelector(".visualBook");
        
        console.log(individualBook[i]);
        titleBook = document.createElement('H2');
        authorBook = document.createElement("P");
        pagesBook = document.createElement("P");
        readBook = document.createElement("button");
        buttonAdd = document.createElement("button");
        buttonRemove = document.createElement("button");
        buttonDelete = document.createElement("button");
        readBook.className = "buttonRead";
        buttonAdd.className = "buttonAdd";
        buttonRemove.className = "buttonRemove";
        buttonDelete.className = "deleteButton";
        buttonAdd.innerText = "+";
        buttonRemove.innerText = "-"
        individualBook[i].setAttribute("data-index-number",library.slice(-1)[0].dataNumber)
        titleBook.innerText = library[i].title;
        authorBook.innerText="by: " + library[i].author;
        pagesBook.innerText= library[i].pages + " pg";
        buttonDelete.innerText = "Delete";
        readBook.innerText = library[i].read;
        if(readBook.innerText=="yes"){
          readBook.style.backgroundColor="green";
      
        }
      
      
      
        individualBook[i].append(titleBook);
        individualBook[i].append(authorBook);
        individualBook[i].append(pagesBook);
        individualBook[i].append(readBook);
        individualBook[i].append(buttonAdd);
        individualBook[i].append(buttonRemove);
        individualBook[i].append(buttonDelete);
        
        buttonDelete.addEventListener("click",(e)=>{
          console.log(e.currentTarget.parentNode);
          let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
          console.log(identifybook);
          console.log(e.currentTarget.parentNode);
          console.log(individualBook[i]);
          // let identifybook = individualBook[i].dataset.indexNumber;
          console.log(identifybook);
          deleteButtonEvent(identifybook);
        })
        buttonAdd.addEventListener("click",(e)=>{
          // let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
          indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
          libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);
 
         // let libraryFind = library.find(dataNumber);
         //  console.log(libraryFind);
          console.log(libraryFiltered[0].pages);
           pagesCount = parseInt(libraryFiltered[0].pages);
           console.log(pagesCount)
           pagesCount = (pagesCount + 1);
           libraryFiltered[0].pages = pagesCount;
           console.log(pagesCount);
           console.log(libraryFiltered.pages);
       
           let listOfBooks = e.currentTarget.parentNode.children[2];
           listOfBooks.innerHTML = pagesCount + " pg";
           
           localStorage.setItem("library", JSON.stringify(library));
 
         })
        buttonRemove.addEventListener("click",(e)=>{
          // let identifybook = e.currentTarget.parentNode.getAttribute("data-index-number");
          
         indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
         libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);

        // let libraryFind = library.find(dataNumber);
        //  console.log(libraryFind);
         console.log(libraryFiltered[0].pages);
          pagesCount = parseInt(libraryFiltered[0].pages);
          console.log(pagesCount)
          pagesCount = (pagesCount - 1);
          libraryFiltered[0].pages = pagesCount;
          console.log(pagesCount);
          console.log(libraryFiltered.pages);
      
          let listOfBooks = e.currentTarget.parentNode.children[2];
          listOfBooks.innerHTML = pagesCount + " pg";
          
          localStorage.setItem("library", JSON.stringify(library));

        })
        readBook.addEventListener("click",(e)=>{
          indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
          console.log(e.currentTarget);
          indextoAdd = e.currentTarget.parentNode.getAttribute("data-index-number");
          libraryFiltered = library.filter(bookIndex => bookIndex.dataNumber == indextoAdd);

          let textValue = e.currentTarget.innerHTML;
          if(textValue=="yes"){
            libraryFiltered[0].read = "no";
            e.currentTarget.innerHTML = "no";
            e.currentTarget.style.backgroundColor="white";
          }
          else if(textValue=="no"){
            libraryFiltered[0].read = "yes";
            e.currentTarget.innerHTML = "yes";
            e.currentTarget.style.backgroundColor="green";
          }
      
          
      
        })
        localStorage.setItem("library", JSON.stringify(library));
       
      }

      
deleteEvent = document.querySelector(".deleteButton");
function deleteButtonEvent(indexValue){
if(indexValue>0){
  console.log(library);
  library.splice(indexValue-1,1);

  console.log(library);
}
else{
  library.splice(indexValue,1);
  console.log(library);
}

let contentToDelete = document.getElementsByClassName("visualBook");
console.log(contentToDelete);
for(let j=0; j<contentToDelete.length;j++){
  let holdVal = contentToDelete[j].getAttribute("data-index-number");
  console.log(holdVal);
  if(holdVal==indexValue){
  console.log(contentToDelete[indexValue]);
  contentToDelete[j].remove("div");
  console.log(contentToDelete);
  i = library.length;
}


}
localStorage.setItem("library",JSON.stringify(library));



      };
      }
