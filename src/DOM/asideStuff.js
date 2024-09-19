import MainContent from "./main_content";

export default function AsideController(myProject) {
  let selectedProjectIndex = 0;
  const addProjectBtn = document.querySelector("#add-project");
  const dialog = document.querySelector("#add-project-dialog");
  const closeDialogAddProjectBtn = document.querySelector("#cancel");
  const submitAddProjectBtn = document.querySelector("#add-project-btn");
  const nameInput = document.querySelector("#project-name");
  const showAddTaskBtn = document.querySelector("#show-add-task-btn");
  const addTaskDialog = document.querySelector("#add-task-dialog");
  const submitAddTask = document.querySelector("#add-task-btn");
  const updateTaskBtn = document.querySelector("#update-task-btn");

  function showAddTaskDialog() {
    updateTaskBtn.setAttribute("hidden", "true");
    submitAddTask.removeAttribute("hidden");
    addTaskDialog.showModal();
  }

  function showaddProjectDialog() {
    dialog.showModal();
  }

  function closeDialogAddProject() {
    // e.preventDefault();
    dialog.close();
  }

  function submitDialogAddProject() {
    myProject.createProject(nameInput.value);
    nameInput.value = "";
    myProjectScreenController.updateAllProject();
  }

  addProjectBtn.addEventListener("click", showaddProjectDialog);
  closeDialogAddProjectBtn.addEventListener("click", closeDialogAddProject);
  submitAddProjectBtn.addEventListener("click", submitDialogAddProject);

  showAddTaskBtn.addEventListener("click", showAddTaskDialog);

  const myProjectScreenController = (function MyProjectScreenController() {
    const myProjectListDiv = document.querySelector(".my-projects-list");
    function updateAllProject() {
      myProjectListDiv.textContent = "";
      myProject.getAllProjects().forEach((project, index) => {
        if (index === 0) {
          return;
        }
        const projectDiv = document.createElement("div");
        if (selectedProjectIndex == index) {
          projectDiv.classList.add("dark-background");
        }

        projectDiv.dataset.index = index;

        projectDiv.textContent = "# " + project.name;
        myProjectListDiv.appendChild(projectDiv);
      });
    }

    const handleClickProject = (e) => {
      const index = e.target.dataset.index;
      selectedProjectIndex = index;
      updateAllProject();
      MainContent(myProject).renderProject(selectedProjectIndex);
    };
    myProjectListDiv.addEventListener("click", handleClickProject);

    function addTodoToProject(projectIndex, todo) {
      const titleInp = document.querySelector("#title");
      const descriptionInp = document.querySelector("#description");
      const prioriryInp = document.querySelector("#priority");
      const dueDateInp = document.querySelector("#duedate");
      myProject.addTodoToProject(
        titleInp.value,
        descriptionInp.value,
        dueDateInp.value,
        prioriryInp.value,
        todo.note,
        todo.checkList,
        projectIndex,
      );
      titleInp.value = "";
      descriptionInp.value = "";
      dueDateInp.value = "";
      prioriryInp.value = "";
      MainContent(myProject).renderProject(selectedProjectIndex);
    }

    return { updateAllProject, addTodoToProject };
  })();

  submitAddTask.addEventListener("click", () => {
    myProjectScreenController.addTodoToProject(selectedProjectIndex, {});
  });

  myProjectScreenController.updateAllProject(myProject);
}
