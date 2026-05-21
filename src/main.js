import './style.css'

const appContainer = document.getElementById("app")

async function getData(){
  const response = await fetch("http://localhost:3000/tasks")
  const data = await response.json()

  return data
}

