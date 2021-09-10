$(document).ready(function() {
  $("#sun").click(function() {
    $("body").toggleClass("active");
    $("#moon").toggleClass("active");
    $("#sun").toggleClass('active');
    $(".circle").toggleClass("active");
    $("input").toggleClass("active");
    $(".row").toggleClass("active");
    
  });
  $("#moon").click(function() {
      $("body").toggleClass("active");
      $("#sun").toggleClass("active");
      $("#moon").toggleClass("active");
      $(".circle").toggleClass("active");
      $("input").toggleClass("active");
      $(".row").toggleClass("active");
      
    });
});
//select elements//
const input = document.getElementById('input')
const list = document.getElementById('list')
const clear = document.getElementById('clear')
const dateElement = document.getElementById('date')
const form = document.getElementById('form')

//class names//
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINETHROUGH = "lineThrough";

//variables//
let LIST = [];
let id = 0;
const children = list.children;



//get from localstorage//
let data = localStorage.getItem('TODO')
//if data is not empty//
if(data){
  LIST = JSON.parse(data);
 //load the list to page//
  loadToDo(LIST);
  id = LIST.length; //set id to the last// 
}
//if data is empty,like youre using it for the first time//
else{
  LIST = [];
  id = 0;
}
//load data to user interface//
function loadToDo(array){
  array.forEach(item => {
    addTodo(item.name,item.id,item.done,item.trash)
  });
}

//show date//
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US',options);

//add todo function//
function addTodo(todo,id,done,trash){
  if(trash){return;}
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINETHROUGH : ''
  const item  = `<li class="item" style="">
                <i class="far ${ DONE }" job="complete" id="${id}" style="padding-right:5px; margin-top:20px"></i>
                <p class="text ${ LINE }" style="flex-grow:1; margin-top:20px">${todo}</p>
                <i class="material-icons" job="delete" id="${id}" style="margin-right:0; margin-top:20px">clear</i>
                </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position,item)
}
console.log(addTodo('cofee',1,false,true))

input.addEventListener('keyup', myFunction);
function myFunction(){
  const todo = input.value;
  if(todo){
    addTodo(todo,id,false,false)
    
    LIST.push(
      {
        name: todo,
        id:0,
        done:false,
        trash:false
      }
    )
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
   input.value = '';
  
}
// complete todo//
function completeTodo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
  
}
//remove todo//
function deleteTodo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;

}
//get list on click//
list.addEventListener("click",function(event){
  let element = event.target;
  let JOB = event.target.attributes.job.value;
  if(JOB == 'complete'){
    completeTodo(element)
  }
  else if(JOB == 'delete'){
    deleteTodo(element)
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));

})


clear.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
})