
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];
// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
getDataFromLocalStorage()
submit.addEventListener("click",(e)=>{
    if(input.value !== ""){
        let div = document.createElement("div");
        let span = document.createElement("span");
        let Button = document.createElement("button");
        let text = document.createTextNode("delate");
        Button.classList.add("doneTask");
        let textspan = document.createTextNode(input.value)
        Button.appendChild(text);
        span.appendChild(textspan);
        div.appendChild(span);
        div.appendChild(Button);
        tasksDiv.appendChild(div);
        div.classList.add("task");
        add(input.value,div);
    }

    input.value = "";

});

function add(value,div) {
    let obj = {
        text : value,
        completed : false,
        id: Date.now(),
    };
    div.setAttribute("data-id",obj.id);
    arrayOfTasks.push(obj);
    addTolocalStorge(arrayOfTasks);
}
function addTolocalStorge(arrayOfTasks){
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addele(tasks);
    }
  }
function addele (taskes){

taskes.forEach((ele) => {
    let div = document.createElement("div");
    let span = document.createElement("span");
    let Button = document.createElement("button");
    Button.classList.add("doneTask");
    let text = document.createTextNode("delate");
    div.setAttribute("data-id",ele.id);
    let textspan = document.createTextNode(ele.text);
    Button.appendChild(text);
    span.appendChild(textspan);
    div.appendChild(span);
    div.appendChild(Button);
    tasksDiv.appendChild(div);
    div.classList.add("task");
    if (ele.completed) {
        div.classList.add("done");
      }
});

}

let done = document.querySelector(".doneTask");

tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("doneTask")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done");
        toggole(e.target.getAttribute("data-id"));
    }
})
function toggole(id){
    arrayOfTasks.forEach((ele)=>{
        if(ele.id == id){
            if(ele.completed === true){
                ele.completed = false
            }else{
                ele.completed = true
            }
        }
    })
    addTolocalStorge(arrayOfTasks);
    
}

function deleteTaskWith(id){
 arrayOfTasks = arrayOfTasks.filter((ele)=>{
    return ele.id != id ;
 })
 addTolocalStorge(arrayOfTasks);
}


