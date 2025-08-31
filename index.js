console.log("Welcome to my ToDo App");

todoarr = [];

let todoDataList = document.getElementById("todo-data-list");
let saveTodo = document.getElementById("save-todo");
let todoInput = document.getElementById("todo-input");
let getPending = document.getElementById("get-todos");

getPending.addEventListener("click", () => {
    todoarr = todoarr.filter((todo) => todo.status!='Finished');
    reRender();
});

todoInput.addEventListener("keyup", function toggleSaveButton(){
    let todoText = todoInput.value;
    if(todoText.length == 0){
        if(saveTodo.classList.contains("disabled")) return;
        saveTodo.classList.add("disabled");
    }
    else if(saveTodo.classList.contains("disabled")){
        saveTodo.classList.remove("disabled");
    }
});

saveTodo.addEventListener("click",function getTextAndAddTodo(){
    let todotext = todoInput.value;
    if(todotext.length == 0) return;
    let todo = {text: todotext, status:'In Progress', finishButtonText:'Finished'};
    todoarr.push(todo);
    addTodo(todo, todoarr.length);
    todoInput.value = '';
});

function reRender(){
    todoDataList.innerHTML = '';
    todoarr.forEach((element, idx) => {
        addTodo(element, idx+1);
    });
}

function removeTodo(event){
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    let idxToBeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todoarr.splice(idxToBeRemoved, 1);
    reRender();
}

function finishTodo(event){
    let finishedBtnPress = event.target;
    let indexToBeFinished = Number(finishedBtnPress.getAttribute("todo-idx"));
    if(todoarr[indexToBeFinished].status=='Finished'){
        todoarr[indexToBeFinished].status = 'In Progress';
        todoarr[indexToBeFinished].finishButtonText = 'Finished';
    }
    else{
        todoarr[indexToBeFinished].status = 'Finished';
        todoarr[indexToBeFinished].finishButtonText = 'Undo';
    }

    todoarr.sort((a,b) => {
        if(a.status=='Finished'){
            return 1;
        }
        return -1;
    });
    reRender();
}

function editTodo(event){
    let editButtonPressed = event.target;
    let indexToEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-idx="${indexToEdit}"]`);
    detailDiv.style.display="none";
    input.type = "text";
    input.value = detailDiv.textContent;
}

function saveEdittedTodo(event){
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    if(event.keyCode==13){
        detailDiv.textContent = input.value;
        detailDiv.style.display = "block";
        input.value = '';
        input.type = "hidden";
    }
}

function addTodo(todo, todoCount){
    console.log("call add todo");
    let rowDiv = document.createElement("div");
    let todoItems = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoDetails = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoAction = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let finishBtn = document.createElement("button");
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");
    
    deleteBtn.setAttribute("todo-idx", todoCount-1);
    finishBtn.setAttribute("todo-idx",todoCount-1);
    editButton.setAttribute("todo-idx",todoCount-1);
    todoDetails.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);
    hiddenInput.addEventListener("keypress",saveEdittedTodo);

    deleteBtn.onclick = removeTodo;
    finishBtn.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.type = "hidden";

    todoAction.appendChild(deleteBtn);
    todoAction.appendChild(finishBtn);
    todoAction.appendChild(editButton);

    todoNumber.textContent = `${todoCount}.`;
    todoDetails.textContent = todo.text;  // set the todo text sent from the input element
    todoStatus.textContent = todo.status;
    deleteBtn.textContent = "Delete";
    finishBtn.textContent = todo.finishButtonText;
    editButton.textContent = "Edit";


    // adding class
    rowDiv.classList.add("row");
    todoItems.classList.add("todo-items","d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetails.classList.add("todo-details","text-muted");
    todoStatus.classList.add("todo-status","text-muted");
    todoAction.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteBtn.classList.add("btn","btn-danger","delete-todo");
    finishBtn.classList.add("btn","btn-success","finish-todo");
    editButton.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control","todo-details")

    todoItems.appendChild(todoNumber);
    todoItems.appendChild(todoDetails);
    todoItems.appendChild(hiddenInput);
    todoItems.appendChild(todoStatus);
    todoItems.appendChild(todoAction);
    

    rowDiv.appendChild(todoItems);

    todoDataList.appendChild(rowDiv);
    rowDiv.appendChild(hr);
}
