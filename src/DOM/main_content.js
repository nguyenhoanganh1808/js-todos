import deleteIcon from "../../icons/delete.svg";
import dateIcon from "../../icons/date.svg";
import project from "../application-logic/project";

export default function MainContent(myProject) {
  //   const myProject = project();
  const updateTaskBtn = document.querySelector("#update-task-btn");
  const titleInp = document.querySelector("#title");
  const descriptionInp = document.querySelector("#description");
  const prioriryInp = document.querySelector("#priority");
  const dueDateInp = document.querySelector("#duedate");

  function renderTodoItem(todo, projectIndex, todoIndex) {
    const itemDiv = document.createElement("div");
    const checklistInput = document.createElement("input");
    const contentContainerDiv = document.createElement("div");
    const h4Title = document.createElement("h4");
    const pDes = document.createElement("p");
    const divCalendar = document.createElement("div");
    const imgIcon = document.createElement("img");
    const pCalendar = document.createElement("p");

    const deleteBtn = document.createElement("button");
    const iconDeleteImg = document.createElement("img");

    itemDiv.classList.add("todo-item");

    divCalendar.classList.add("calendar");
    imgIcon.src = dateIcon;
    pCalendar.textContent = todo.getDueDate();
    divCalendar.appendChild(imgIcon);
    divCalendar.appendChild(pCalendar);

    console.log(todo.getPriority() === "1");
    h4Title.textContent = todo.getTitle();

    switch (todo.getPriority()) {
      case "1":
        h4Title.style.color = "red";
        break;
      case "2":
        h4Title.style.color = "orange";

        break;
      case "3":
        h4Title.style.color = "green";

        break;
      case "4":
        break;
    }
    pDes.textContent = todo.getDescription();
    contentContainerDiv.appendChild(h4Title);
    contentContainerDiv.appendChild(pDes);
    contentContainerDiv.appendChild(divCalendar);

    iconDeleteImg.src = deleteIcon;
    deleteBtn.appendChild(iconDeleteImg);
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (e) => {
      myProject.deleteTodoFromProject(projectIndex, todoIndex);
      renderProject(projectIndex);
    });

    checklistInput.setAttribute("type", "checkbox");
    checklistInput.setAttribute("name", "checklist");
    checklistInput.setAttribute("id", "checklist");

    checklistInput.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        h4Title.classList.add("checkedText");
        pDes.classList.add("checkedText");
      } else {
        h4Title.classList.remove("checkedText");
        pDes.classList.remove("checkedText");
      }
    });

    itemDiv.appendChild(checklistInput);
    itemDiv.appendChild(contentContainerDiv);
    itemDiv.appendChild(deleteBtn);

    contentContainerDiv.addEventListener("click", (e) => {
      handleShowEditTodo(projectIndex, todoIndex);
    });

    return itemDiv;
  }

  function handleSubmitEditTodo(projectIndex, todoIndex) {
    const newTodo = {
      title: titleInp.value,
      description: descriptionInp.value,
      priority: prioriryInp.value,
      dueDate: dueDateInp.value,
    };
    console.log("newtodo" + JSON.stringify(newTodo));
    myProject.updateTodo(projectIndex, todoIndex, newTodo);
    renderProject(projectIndex);
  }

  function handleShowEditTodo(projectIndex, todoIndex) {
    const addTaskDialog = document.querySelector("#add-task-dialog");
    const submitAddTask = document.querySelector("#add-task-btn");

    updateTaskBtn.removeAttribute("hidden");
    submitAddTask.setAttribute("hidden", "true");
    addTaskDialog.showModal();

    const todo = myProject.getAllProjects()[projectIndex].todos[todoIndex];
    console.log("todo " + todo);
    titleInp.value = todo.getTitle();
    descriptionInp.value = todo.getDescription();
    prioriryInp.value = todo.getDescription();
    dueDateInp.value = todo.getDueDate();
    updateTaskBtn.addEventListener("click", (e) => {
      handleSubmitEditTodo(projectIndex, todoIndex);
    });
  }

  function renderProject(projectIndex) {
    const mainContentDiv = document.querySelector("#main-content");
    mainContentDiv.textContent = "";
    const h1TitleProject = document.createElement("h1");
    const project = myProject.getAllProjects()[projectIndex];
    h1TitleProject.textContent = project.name;
    mainContentDiv.appendChild(h1TitleProject);
    project.todos.forEach((todo, index) => {
      const todoItemDiv = renderTodoItem(todo, projectIndex, index);

      mainContentDiv.appendChild(todoItemDiv);
      const hrr = document.createElement("hr");
      hrr.classList.add("solid");
      mainContentDiv.appendChild(hrr);
    });
  }

  return { renderProject };
}
