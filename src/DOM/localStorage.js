import project from "../application-logic/project";
import TodoItem from "../application-logic/todo_item";

export default function LocalStorage(myProjects) {
  function populateStorage() {
    myProjects.forEach((project) => {
      project.todos = project.todos.map((todo) => {
        const todoWithFuncsAsStrings = {
          checkList: todo.getChecklist(),
          description: todo.getDescription(),
          dueDate: todo.getDueDate(),
          note: todo.getNote(),
          priority: todo.getPriority(),
          title: todo.getTitle(),
        };
        return todoWithFuncsAsStrings;
      });
    });
    console.log(myProjects);
    localStorage.setItem("myProjects", JSON.stringify(myProjects));
    return setMyProjects();
  }
  function setMyProjects() {
    var currentMyProjects = JSON.parse(localStorage.getItem("myProjects"));

    currentMyProjects.forEach((project) => {
      project.todos = project.todos.map((todoString) => {
        return TodoItem(
          todoString.title,
          todoString.description,
          todoString.dueDate,
          todoString.priority,
          todoString.note,
          todoString.checkList
        );
      });
      console.log("todo " + project.todos);
    });
    console.log("current " + currentMyProjects);
    return currentMyProjects;
  }

  return {
    setMyProjects,
    populateStorage,
  };
}
