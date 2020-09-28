// Task class
class Task{
    constructor(title){
            this.title = title;
    }
}



//UI : HANDLES UI tasks
class UI {
    static displayTasks(){
      

         const tasks = store.getTasks();
         tasks.forEach((task) => UI.addTaskToList(task));
    }
    static addTaskToList(task){
        const list = document.querySelector('#table-body');
        const row  = document.createElement('tr');
        row.innerHTML = `
              <td><input type = "checkbox"></td>
              <td>${task.title}</td>
              <td><a href="#" class=" btn btn-danger delete">x</td>

        `;
        list.appendChild(row);
    }
    static deleteTask(el){
      if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove(); 
      }

    }

    static showAlert(message, className){
    const div = document.createElement('div');
         div.className = `alert ${className}`;
         div.appendChild(document.createTextNode(message));

         const container = document.querySelector('.container');
         const form =document.querySelector('#task-form');
         container.insertBefore(div, form);
         //vanish in 3 seconds
         setTimeout(() => document.querySelector('.alert').remove(),3000);

    }

    static clearField(){
        document.querySelector('#title').value = '';
    }
}

    


// store class: handle storage
class store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTask(task) {
        const tasks = store.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }
    static removeTask(title) {
        const tasks = store.getTasks();
        tasks.forEach((task, index) => {
            if (task.title === title) {
                tasks.splice(index, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// event class

// event ...display task
    document.addEventListener('DOMContentLoaded',UI.displayTasks());
// event ...add task
  document.querySelector('#task-form').addEventListener('submit', (e) => {
      //prevent default
      e.preventDefault();
   // get form values
   const title = document.querySelector('#title').value;

   //instatiate a task

// validation
if(title === ''){
    UI.showAlert('please fill in the input field', 'alert-danger col-sm-6 mx-auto');
}else{
    //instantiate
    const task = new Task(title);

    // add the task to UI
    UI.addTaskToList(task);

    //add tasks to store
    store.addTask(task);
    // show success message
    UI.showAlert('Task Added', 'alert-success col-sm-6 mx-auto');
    // clear field
    UI.clearField();
}
});

// event ...remove task
document.querySelector('#table-body').addEventListener('click', (e) => {

    UI.deleteTask(e.target);
    //remove tasks from UI
    Store.removeTask(e.target);

})