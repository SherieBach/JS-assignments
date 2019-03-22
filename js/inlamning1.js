let myList;

function addItems(item) { // add new list item
    const name = document.getElementById(item).value;
    if (name === "") {
        alert("You need to write something");
    } else {  // write a new tod0 object

        const newToDo = {
            name: name,
            id: getId(), // call and get unique id
            done: false // for sorting
        };

        myList.push(newToDo); // push the new item in the list
        localStorage.setItem("items", JSON.stringify(myList));
        renderToDoList(); // render the list again
    }

    document.getElementById("toDo").value = "";  // clear input field
}

let latestId = localStorage.getItem('latestId') ? parseInt(localStorage.getItem('latestId')) : 5; // set lastest id if last item key or 5

function getId() {
    localStorage.setItem("latestId", latestId += 1); //set the latest id in local storage and add 1.
    return latestId; // add +1 on the latest id on the list in addItems

}

myList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [ // my sexy list.

    {
        name: "Shower",
        id: 1,
        done: false
    },
    {
        name: "Breakfast",
        id: 2,
        done: false
    },
    {
        name: "Study",
        id: 3,
        done: false
    },
    {
        name: "Gym time",
        id: 4,
        done: false
    },
    {
        name: "Lunch",
        id: 5,
        done: false
    }
];


function findTodoIndex(todoId, todoList) { // returns a index or undefined.
    return todoList.findIndex(function (todo) { // returns result inside find() with an anonymous function
        return todo.id === todoId; // matches the id to the checked id.
    });
}


function checkItem(id) {

    if (document.getElementById(id).className === "done") { // check the classname done or notDone from below.
        const todoIndex = findTodoIndex(id, myList);
        myList[todoIndex].done = false;

    } else {
        const todoIndex = findTodoIndex(id, myList);
        myList[todoIndex].done = true;
    }
    localStorage.setItem("items", JSON.stringify(myList));
    renderToDoList();
}


function renderToDoList() { // Display list
    document.getElementById("list").innerHTML = "";
    for (let i = 0; i < myList.length; i++) {

        const checkedOrNot = myList[i].done ? "checked" : " ";
        const className = myList[i].done ? "done" : "notDone"; // Set two classnames to list item for styling the different states.

        document.getElementById("list").innerHTML += "<li class='" + className + "' id='" + myList[i].id + "'>"
            + "<input onclick='checkItem(" + myList[i].id + ")' type='checkbox' " + checkedOrNot + ">" + myList[i].name +
            "<span onclick='removeToDo(" + myList[i].id + ")' class='delete'>&times</span>" +
            "</li>";
    }
}

function removeToDo(idToRemove) {
    const filteredList = myList.filter(function (todo) {

        return todo.id !== idToRemove;

    });
    myList = filteredList; // new filtered list
    localStorage.setItem("items", JSON.stringify(filteredList));
    renderToDoList();
}


