// localStorage.setItem('tasks', JSON.stringify([]));


var formelements = document.getElementById('form');
var itemList = document.getElementById('task-list');
let taskListitems = JSON.parse(localStorage.getItem('tasks'));
let counter = 0;
refreshDom();

formelements.addEventListener('submit', addTask);


function update() {
    localStorage.setItem('tasks', JSON.stringify(taskListitems));
    refreshDom();
}

function refreshDom() {
    counter = 0;
    while(itemList.hasChildNodes()){
        itemList.removeChild(itemList.lastChild);
    }
    // if (itemList.hasChildNodes()) {
    //     itemList.innerHTML = '';
    // }
    const taskArray = JSON.parse(localStorage.getItem('tasks'));
    for (task of taskArray) {
       
        creatingItemblock(task);
    }
}
function creatingItemblock(newTask) {

    var txtdiv = document.createElement('div');
    txtdiv.className = 'list-text';
    txtdiv.appendChild(document.createTextNode(newTask.task));
    var li = document.createElement('li');
    li.className = 'list-item';
    li.setAttribute('position', counter)
    li.draggable = true;
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checked-item'
    checkBox.checked = newTask.status;
    if (newTask.status) {
        txtdiv.style.textDecoration = "line-through";
     
    }
    else {
        txtdiv.style.textDecoration = "none";
        
    }
    itemList.addEventListener('click', checkTask);
    li.appendChild(checkBox);
    li.appendChild(txtdiv);
    itemList.appendChild(li);
    var delBtn = document.createElement('button');
    delBtn.className = 'delete-button';
    delBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delBtn);
    delBtn.addEventListener('click', deleteTask);
    itemList.appendChild(li);
    itemList.addEventListener('dragstart', dragStart);
    itemList.addEventListener('dragover', dragOver);
    itemList.addEventListener('dragend', dragStop);
    counter++;
}

function addTask(obj) {
    obj.preventDefault();
    var newtask = document.getElementById('newtask').value;
    console.log("******")
    console.log(newtask);

    console.log("******")

    if (newtask.length) {
        taskListitems.push({ task: newtask, status: false });
    }
    else {
        alert("empty")
    }
    document.getElementById('newtask').value = "";
    update();
}


function deleteTask(obj) {
    var itemtobedeleted = obj.target.parentNode;
    var x = itemtobedeleted.attributes.position.value;
    taskListitems.splice(x, 1);
    update();
}

function checkTask(obj) {
    let elementStatus = 0;
    var parent = obj.target.parentNode;
    elementStatus = parent.attributes.position.value;
    // console.log(parent.firstChild.checked);
    taskListitems[elementStatus].status = parent.firstChild.checked;
    update();
}

var startPos = 0;
var endPos = 0;

function dragStart(obj) {
    startPos = obj.srcElement;
}

function dragOver(obj) {
    obj.preventDefault();
    endPos = obj.target;
}

function dragStop(obj) {
    var startIndex = startPos.attributes.position.value;
    var endIndex = endPos.attributes.position.value;

     var splicedArray = taskListitems.splice(startIndex, 1);
    taskListitems.splice(endIndex, 0, splicedArray[0]);

    update();
}