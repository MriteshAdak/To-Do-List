class Task {
    constructor({title, description, dueDate, priority}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get getTitle() {
        return this.title;
    }
    set setTitle(newTitle) {
        this.title = newTitle;
    }
    get getDescription() {
        return this.description;
    }
    set setDescription(newDescription) {
        this.description = newDescription;
    }
    get getDate() {
        return this.dueDate;
    }
    set setDate(newDate) {
        this.dueDate = newDate;
    }
    get getPriority() {
        return this.priority;
    }
    set setPriority(newPriority) {
        this.priority = newPriority;
    }
}

const taskList = (function (task) {
    const taskList = [];

    function addInList(task) {
        taskList.push(task);
    }

    function removeFromList(findTask) {
        const foundTask = (function(findTask) {
            for(let i=0; i<taskList.length; i++) {
                const task = taskList[i];
                if(Object.keys(findTask).every( 
                    key => task[key] == findTask[key]))
                    return i;
                else
                    return false;
            }
        });
        console.log(foundTask);

        if(foundTask !== false){
            taskList.splice(foundTask, 1);
            console.log("task removed");
        }
    }
    
    function getAllTasks() {
        const tasks = taskList;
        return tasks;
    }

    return { addInList, removeFromList, getAllTasks };
})();


const taskSection = document.querySelector('#taskSection');
const addTask = document.querySelector('#addTask');

addTask.onclick = createTask;

function createTask() {
    const taskForm = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('select');
    const optionDefaultPriority = document.createElement('option')
    const optionHighPriority = document.createElement('option')
    const optionNormalPriority = document.createElement('option')
    const optionLowPriority = document.createElement('option')
    const actionButtons = addSaveEditButtons(taskForm);

    setAttributes(title, {
        "type": "text",
        "name": "title",
        "placeholder": "Task"
    });

    setAttributes(description, {
        "type": "text",
        "name": "description",
        "placeholder": "Description"
    });

    setAttributes(dueDate, {
        "type":"datetime-local",
        "name": "dueDate",
        "placeholder": "Due Date"
    });

    priority.setAttribute("name", "priority");

    setAttributes(optionDefaultPriority, {
        "disabled": true,
        "selected": true,
        "hidden": true
    });

    optionHighPriority.setAttribute("value", "High");
    optionNormalPriority.setAttribute("value", "Normal");
    optionLowPriority.setAttribute("value", "Low");
    optionHighPriority.textContent = "High";
    optionNormalPriority.textContent = "Normal";
    optionLowPriority.textContent = "Low";

    priority.append(optionDefaultPriority, optionHighPriority, optionNormalPriority, optionLowPriority);

    taskForm.append(title, description, dueDate, priority, actionButtons[0], actionButtons[1]);
    taskSection.appendChild(taskForm);
}

function addSaveEditButtons(form) {
    
    const saveButton = document.createElement('button');
    const editButton = document.createElement('button');
    
    setAttributes(saveButton, {
        'class': 'save project',
        'type': 'submit'
    });
    setAttributes(editButton, {
        'hidden': true,
        'class': 'edit project',
        'type': 'submit'
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        taskList.addInList(formDataObject);
        for(const child of form.children){
            if(child.tagName != 'BUTTON')
                child.setAttribute('disabled', true);
        }
        editButton.hidden = false;
        saveButton.setAttribute('hidden', true);
        console.log(taskList.getAllTasks());
    });

    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        for(const child of form.children)
            child.disabled = false;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        // const findTask = new Task (formDataObject);
        taskList.removeFromList(formDataObject);
        console.log(taskList.getAllTasks());
        editButton.hidden = true;
        saveButton.hidden = false;
    });

    const saveIcon = document.createElement('img');
    const editIcon = document.createElement('img');

    saveIcon.src = './assets/save.png';
    saveIcon.alt = 'save';
    saveButton.appendChild(saveIcon);    
    editIcon.src = './assets/edit.png';
    editIcon.alt = 'edit';
    editButton.appendChild(editIcon);

    return [saveButton, editButton];
}

function setAttributes(element, attributes) {
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
