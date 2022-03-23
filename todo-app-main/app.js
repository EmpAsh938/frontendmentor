window.addEventListener('DOMContentLoaded', () => {
    toggleBackground()
    let getTodosLocalStorage = JSON.parse(localStorage.getItem('todos'))
    if (getTodosLocalStorage){
        todos = [...getTodosLocalStorage]
    }
    displayTodo(todos)
})
let todos = [
    {
        todoId: 1001,
        isCompleted: false,
        desc: "Run 2 miles a day"
    },
    {
        todoId: 1022,
        isCompleted: false,
        desc: "Run 2 miles a day"
    },
    {
        todoId: 1003,
        isCompleted: true,
        desc: "Run 2 miles a day"
    }
]
let theme = 'sunny'
let isEditing = false
let editId
    const themeButton = document.querySelector('.btn-theme')
    const btnIcon = document.querySelector('.btn-icon')
    const todosWrapper = document.querySelector('.todos-wrapper')
    const todoForm = document.querySelector('.todo-form')
    const input = document.querySelector('.todo-input')
    const count = document.querySelector('.count')
    const clearButton = document.querySelector('.clear-btn')
    const allButton = document.querySelector('.btn-all')
    const activeButton = document.querySelector('.btn-active')
    const completedButton = document.querySelector('.btn-completed')

    function displayTodo(arr) {
        localStorage.removeItem('todos')
        localStorage.setItem('todos', JSON.stringify(todos))
        let checkLeft = arr.filter(item => !item.isCompleted)
        count.textContent = checkLeft.length
        if (arr.length === 0) {
            todosWrapper.innerHTML = ` <div class="box">
                <p>No todos to display</p>
            </div>`
        } else {
            todosWrapper.innerHTML = arr.map(item => {
                const {todoId, isCompleted, desc} = item
                return `
                    <div class="box">
                        <span class=${isCompleted ? "active-check" : "check"} data-id=${todoId}></span>
                        <p class=${isCompleted ? "box-text-active":"box-text"}>${desc}</p>
                        <div>
                            <buttton class="edit-btn" data-id=${todoId}>
                            <ion-icon name="create-outline"></ion-icon>
                            </button>
                            <button class="delete-btn" data-id=${todoId}>
                            <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                `
            }).join('')
        }
    }

    function handleEdit(id){
        isEditing = true
        editId = id
        let newTodo = todos.filter(item => item.todoId == id)
        const {todoId, isCompleted, desc} = newTodo[0]
        input.value = desc
        input.focus()
    }

    function handleDelete(id){
        todos = todos.filter(item => item.todoId != id)
        displayTodo(todos)
    }

    function addTodo(e){
        e.preventDefault()
        if (!input.value) return
        if (isEditing){
            todos = todos.map(item => {
                if (item.todoId == editId ){
                    item.desc = input.value
                }
                return item
            })
        } else {
            let id = new Date().getTime().toString()
            todos.push({todoId: id, desc: input.value, isCompleted:false})
        }
        isEditing = false
        input.value = ''
        displayTodo(todos)
    }

    function toggleBackground(type='light'){
        document.documentElement.className = type;
    }

    function changeTheme(){
        if (theme === 'sunny') {
            theme = 'moon'
            toggleBackground('dark')
        } else {
            theme = 'sunny'
            toggleBackground()
        }
        btnIcon.setAttribute('name', `${theme}-outline`)
        btnIcon.setAttribute('aria-label', `${theme}-outline`)
    }

    function toggleCompleted(id) {
        todos = todos.map(item => {
            if (item.todoId == id){
                item.isCompleted = !item.isCompleted
            }
            return item
        })
        displayTodo(todos)
    }

    function clearCompleted(){
        todos = todos.filter(item => !item.isCompleted)
        displayTodo(todos)
    }

    function showActive(){
        let newTodo = todos.filter(item => !item.isCompleted)
        displayTodo(newTodo)
    }

    function showCompleted(){
        let newTodo = todos.filter(item => item.isCompleted)
        displayTodo(newTodo)
    }

todoForm.addEventListener('submit', addTodo)
themeButton.addEventListener('click', changeTheme)
clearButton.addEventListener('click', clearCompleted)
activeButton.addEventListener('click', showActive)
completedButton.addEventListener('click', showCompleted)
allButton.addEventListener('click', () => displayTodo(todos))
todosWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')){
        handleDelete(e.target.dataset.id)
    } else if(e.target.parentElement.classList.contains('delete-btn')){
        handleDelete(e.target.parentElement.dataset.id)
    } else if(e.target.classList.contains('edit-btn')){
        handleEdit(e.target.dataset.id)
    } else if (e.target.parentElement.classList.contains('edit-btn')){
        handleEdit(e.target.parentElement.dataset.id)
    } else if (e.target.classList.contains('check') || e.target.classList.contains('active-check')){
        toggleCompleted(e.target.dataset.id)
    }
})