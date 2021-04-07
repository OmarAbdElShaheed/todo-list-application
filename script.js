//Grabbing the HTML elements
const input = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const clearAllBtn = document.querySelector('.footer button');

//Getting the user's input & cheking if there is data in the inputField
input.onkeyup = ()=> {
    let userData = input.value;
    if (userData.trim() != 0) {
    addBtn.classList.add("active");
    }else {
        addBtn.classList.remove("active");
    }
};

//Adding functonality to the plus btn
addBtn.onclick = ()=> {
    let userData = input.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage === null) {
        listArr = [];
    }else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    addTask();
    addBtn.classList.add("active");
}


//adding the user input to the list
function addTask() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage === null) {
        listArr = [];
    }else {
        listArr = JSON.parse(getLocalStorage)
    }
    let pendingTasks = document.querySelector('.pending-tasks');
     pendingTasks.textContent = listArr.length;

     if(listArr.length > 0) {
        clearAllBtn.classList.add("active");
     }else{
         clearAllBtn.classList.remove("active");
     }

    let newTag = '';
    listArr.forEach((element,index) => {
    newTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
        
    });
    todoList.innerHTML = newTag;
    input.value = "";
}

//delete a task after finishing it
function deleteTask(index) {
    
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1)
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    addTask();
}

clearAllBtn.onclick = ()=> {
    listArr = [];
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    addTask();
}