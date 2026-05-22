import './style.css'

const appContainer = document.getElementById("app")

async function getData(){
  const response = await fetch("http://localhost:3000/tasks")
  const data = await response.json()

  return data
}

async function postData(data) {
  const response = await fetch("http://localhost:3000/tasks", {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json' //We are going to send a Json
    },
    body : JSON.stringify(data) // but then we transform it into string
  })
  .then(response => {
    if(!response.ok){
    throw new Error('The response was not ok')
  }
  return response.json() // we use return here in case the condition above is false, so we can canture it
  })
  // whatever is returned, the next .then.s will print the fail or success of response 
  .then(result => {
    console.log('Success!', result);
  })
  .catch(error => {
    console.error('Error!', error);
  })
}
// const addButtom = document.getElementById('add')
const formTask = document.getElementById('formtask')
formTask.addEventListener('submit', (e) => {
  e.preventDefault()

  const task = document.getElementById('task').value

  const dataTask = {
    id : 3,
    title : task,
    completed : false
  }
  postData(dataTask)

})