import './style.css';

const appContainer = document.getElementById("app");
const formTask = document.getElementById('formtask');
const taskList = document.getElementById('tasklist');
const endPoint = "http://localhost:3000/tasks";

async function getTask() {
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

async function postTask(data) {
  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' //We are going to send a Json
      },
      body: JSON.stringify(data) // but then we transform it into string
    });
    if(!response.ok) throw new Error("ERROR!!")
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}




formTask.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = await getTask();
  const task = document.getElementById('task').value;

  const lastTask = data[data.length - 1];
  let newId = null;

  if(!lastTask){
    newId = 1;
  }else{
    newId = Number(lastTask.id) + 1;
  }

  const dataTask = {
    id: newId,
    title: task,
    completed: false
  }
  await postTask(dataTask);
  taskList.innerHTML = "";
  await loadTasks();
  formTask.reset();
})



function renderTask(task){
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="flex justify-between gap-1">
      <div class="flex flex-wrap gap-1">
        <input type="checkbox" ${task.completed ? 'checked': ''} data-id="${task.id}" class="h-5 w-5 self-center cursor-pointer">
        <span class="">${task.title}</span>
      </div>
      <div class="flex gap-2">
        <button title="Remove Task" class="cursor-pointer text-red-800 hover:scale-120"><i class="fa-solid fa-delete-left"></i></button>
      </div>
    </div>
  `;
  const deleteButton = div.querySelector('button[title="Remove Task"]')
  const checkbox = div.querySelector('input[type="checkbox"]')
  checkbox.addEventListener('change', async ()=>{ // this function is async because patchTask() takes time also fetch() inside it, loadTasks() as well.
    await patchTask(task.id, checkbox.checked);
    // console.log(task.id, checkbox.checked);
    taskList.innerHTML = ""; 
    await loadTasks();
  })
  deleteButton.addEventListener('click', async ()=>{
    await deleteTask(task.id);
    taskList.innerHTML ="";
    await loadTasks();
  })
  taskList.appendChild(div);
}

async function deleteTask(id){
  try {
    const response = await fetch(`${endPoint}/${id}`, {
      method: 'DELETE'
    })
    if(response.ok){ // delete returns voided responses 
      console.log('Deleted task');
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

async function patchTask(id, completed) {
  try {
    const response = await fetch(`${endPoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'completed': completed})
    });
    if(!response.ok){throw new Error('Error', response.status);
    }const result = await response.json() 
    console.log('It is been updated', result);
    
  } catch (error) {
    console.log(error);
  }
}

async function loadTasks() {
  const tasks = await getTask();
  const filter = sessionStorage.getItem('filter'); //we catch
  let filteredTasks = tasks;
  const search = sessionStorage.getItem('search');

  if (filter === 'pending'){
    filteredTasks = tasks.filter(task => task.completed === false);
  }
  if(filter === 'completed'){
    filteredTasks = tasks.filter(task => task.completed === true);
  }

  if (search){
    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(search.toLocaleLowerCase()))
  }

  filteredTasks.forEach(task => {
    renderTask(task);
  });
  
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await loadTasks();
})
const allButton = document.getElementById('all');
const pendingButton = document.getElementById('pending');
const completedButton = document.getElementById('completed');

allButton.addEventListener('click', async ()=>{
  sessionStorage.setItem('filter', 'all');
  taskList.innerHTML = "";
  await loadTasks();
})
pendingButton.addEventListener('click', async ()=>{
 sessionStorage.setItem('filter', 'pending');
 taskList.innerHTML = "";
 await loadTasks();
})
completedButton.addEventListener('click', async ()=>{
  sessionStorage.setItem('filter', 'completed');
  taskList.innerHTML = "";
  await loadTasks();
})
// 
const searchInput = document.getElementById('search')
searchInput.addEventListener('input',async ()=>{
  sessionStorage.setItem('search', searchInput.value);
  taskList.innerHTML = "";
  await loadTasks();
})