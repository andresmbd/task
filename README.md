# Workspace Inteligente + API REST
## Description
Strategically decide where each piece of data resides, managing persistence on a simulated server and optimizing the user experience through browser storage.

## Tegnologies used
**Programming languages**: HTML, CSS and JavaScript  
**Frameworks**: TaildwindCSS  
**Project tool**: Vite  
**Execution enviroment**: Node.js

## Application structure
It is composed of a whole body where in the center there is a input prompt and buttons to add and remove tasks, and other buttons to filter the completed, pending or all tasks made.

## Functionalities
The project registers tasks that the user might enter, it controls where all the data it is sent, either to sessionStorage or the local server, each one has their own data container, like the filter and searches to the sessionStorage and the tasks to the local server; it can be seen both visually and through backend's json-server.

## How to run the project
The following steps are made in the terminal:
1. git clone https://github.com/andresmbd/task.git
2. cd task
3. npm install
4. npm run dev and npm run server
5. click on http://localhost:3000/tasks
