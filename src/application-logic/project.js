import TodoItem from "./todo_item";
import LocalStorage from "../DOM/localStorage";

export default (function () {
  let projects = [{ name: "Inbox", todos: [] }];

  if (!localStorage.getItem("myProjects")) {
    LocalStorage(projects).populateStorage();
  } else {
    projects = LocalStorage(projects).setMyProjects();
  }

  function getAllProjects() {
    return projects;
  }

  const setProjects = (newProjects) => {
    projects = newProjects;
  };
  function createProject(name, color) {
    let todos = [];
    const project = { name: name, color: color, todos: todos };
    projects.push(project);
    LocalStorage(projects).populateStorage();
    return project;
  }

  function updateTodo(projectIndex, todoIndex, newtodo) {
    const todo = projects[projectIndex].todos[todoIndex];
    todo.setTitle(newtodo.title);
    todo.setDescription(newtodo.description);
    todo.setPriority(newtodo.priority);
    todo.setDueDate(newtodo.dueDate);
    projects = LocalStorage(projects).populateStorage();
  }

  function deleteTodoFromProject(projectIndex, todoIndex) {
    projects[projectIndex].todos.splice(todoIndex, 1);
    // LocalStorage(projects).populateStorage();
    projects = LocalStorage(projects).populateStorage();
  }

  function deleteProject(projectIndex) {
    projects.splice(projectIndex, 1);
    // LocalStorage(projects).populateStorage();
    projects = LocalStorage(projects).populateStorage();
  }

  function addTodoToProject(
    title,
    description,
    dueDate,
    priority,
    note,
    checkList,
    projectIndex
  ) {
    const todo = TodoItem(
      title,
      description,
      dueDate,
      priority,
      note,
      checkList,
      projectIndex
    );

    projects[projectIndex].todos.push(todo);
    console.log(projects);

    projects = LocalStorage(projects).populateStorage();

    return todo;
  }

  return {
    getAllProjects,
    createProject,
    addTodoToProject,
    deleteProject,
    deleteTodoFromProject,
    updateTodo,
    setProjects,
  };
});
