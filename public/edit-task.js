const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')

let tempName, tempCompleted




const showTask = async () => {
  try {
    var {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, completed, name } = task
    console.log("Abcd",task)
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    tempCompleted=completed
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
    alert(`No task with id : ${id}`)
    // swal(
    //   "Task Not Found",
    //  `No task with id : ${id}`,
    //   // button: "ok",
    // );
    window.location.replace('/')
  }
}
showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked
    console.log("passed 0")
    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    })
    console.log("passed 1")
    const { _id: taskID, completed, name } = task
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    console.log("passed 2")
    if (completed) {
      taskCompletedDOM.checked = true
    }
    console.log("passed 3")
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    console.log(tempName, tempCompleted,taskCompletedDOM.checked)
    taskNameDOM.value = tempName
    taskCompletedDOM.checked = tempCompleted
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
