
const url = 'https://thronesapi.com/api/v2/Characters'; // import data from api
const tableBody = document.getElementById("tablebody"); // linking tablebody from html to js

const fullname = document.getElementById("fullname");
const image = document.getElementById("image");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const fullnamep = document.getElementById("fullnamep");
const title = document.getElementById("title");
const family = document.getElementById("family");
const imgsrc = document.getElementById("imgsrc");

const pagination = document.getElementById("pagination");

let currentpage=1;
let rows=10;

function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML="";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginated_items = items.slice(start, end);

    for (let i = 0; i < paginated_items.length; i++) {
        console.log(items[i]);
        let item = items[i];
        let item_element = document.createElement("div");
        item_element.classList.add("item");
        item_element.innerText = item;
        wrapper.appendChild(item_element);
    }
}

const myAsyncFunction = async () => {

    const response = await fetch(url); // fetching data
    const dataSet = await response.json(); // uploading data to the dataSet function as json

    console.log("Data:", dataSet); // checking from console everything is ok

    tableBody.textContent = ""; // just to make sure tableBody is empty

    dataSet.forEach((rowData, index) => { // LOOP
    
        // If index is less than 30, print data (controlling how many rows is showing on character list...)
        if (index < 500) {
          const row = document.createElement("tr"); // id and name are texts, so we want to create tr tags

          const img = document.createElement("img"); // image is not text, so we need img tag
          img.src = rowData.imageUrl; //fetching href for every image
          img.height="50"; // controlling image size
    
          const cellDataArray = [ // creating small array containing id and name
            index,
            rowData.fullName,
          ];
      
          for (const cellData of cellDataArray) { // making rows to the table by checking values of cellDataArray
            const cell = document.createElement("td"); // lets create table data element
            const cellText = document.createTextNode(cellData); // 
    
            cell.appendChild(cellText); // creating one cell with cellText
            row.appendChild(cell); // lets add the cell to the row
          }
            row.appendChild(img); // we want image to be the last element of the row
            tableBody.appendChild(row); // uploading one more row to the tableBody

            row.addEventListener("click", () => { // when the table row is clicked...
                console.log("clicked character on the list", rowData.fullName); // ... data is updated to the rightside div
                fullname.innerHTML=rowData.fullName;

                image.height="200";
                image.style="align:center";
                image.src=rowData.imageUrl;

                firstname.innerHTML="First Name: " + rowData.firstName;
                lastname.innerHTML="Last Name: " + rowData.lastName;
                fullnamep.innerHTML="Full Name: " + rowData.fullName;
                title.innerHTML="Title: " + rowData.title;
                family.innerHTML="Family: " + rowData.family;
                imgsrc.innerHTML="Image URL: " + rowData.imageUrl;
            });
        }
    });
};

console.log("hello");
myAsyncFunction();