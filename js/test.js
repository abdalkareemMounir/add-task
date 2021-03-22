

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list =document.getElementById("list");
const input= document.getElementById("input");
const plus=document.getElementById("PLUS");


// classes names
const CHECK ="fa-check-circle";
const circle = "fa-circle-notch";
const UNCHECK = circle;
const LINE_THROUGH = "lineThrough";

//variables
let LIST =[]
    ,id=0;

//show today date
const options ={weekday: "long",month:"short",day:"numeric"};
const today =new Date();

dateElement.innerHTML =today.toLocaleDateString("en-US",options);

// add task function
function addToDo(toDo, id, done,trash){

    if (trash){ return ;}

    const DONE =done ? CHECK : UNCHECK;
    const LINE =done ? LINE_THROUGH:"";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
                    </li>
    `;

    const position="beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user enter key
document.addEventListener("keyup",function (ev){
    if (ev.keyCode ==13){
        const toDo=input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo, id ,false ,false);

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });
            id++;
        }
        input.value="";
    }
});

// plus buttom to do
plus.addEventListener("click",function (){

        const toDo=input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo, id ,false ,false);

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });
            id++;
        }
        input.value="";

});
// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done =LIST[element.id].done ? false: true;
}
 //remove to do function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash= true;
}

//target th items created dynamically

list.addEventListener("click", function (event){
    const element =event.target; // return the click  element inside the list
    const elementJob = element.attributes.job.value; // complete or delete
    if (elementJob == "complete"){
        completeToDo(element);
    }else if (elementJob =="delete"){
        removeToDo(element);
    }

});