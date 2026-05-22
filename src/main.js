import './style.css'

const appContainer = document.getElementById("app")

async function getData() {
  const response = await fetch("http://localhost:3000/tasks")
  const data = await response.json()
  return data
}

async function postData(data) {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' //We are going to send a Json
      },
      body: JSON.stringify(data) // but then we transform it into string
    })
    if(!response.ok) throw new Error("dadada")
    return await response.json()
  } catch (error) {
    console.log(error);
  }

}

// const addButtom = document.getElementById('add')
const formTask = document.getElementById('formtask')
formTask.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = await getData()

  console.log(data)


  const task = document.getElementById('task').value

  const dataTask = {
    
    title: task,
    completed: false
  }
  postData(dataTask)
  formTask.reset()

})

const editButtom = document.getElementById('title').textContent // title
const checkbox = document.getElementById('checkbox').checked