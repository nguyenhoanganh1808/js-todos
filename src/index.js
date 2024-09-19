import "./style.css";
import project from "./application-logic/project.js";
import AsideController from "./DOM/asideStuff.js";
import MainContent from "./DOM/main_content.js";
("./DOM/asideStuff.js");
import LocalStorage from "./DOM/localStorage.js";

const myProject = project();
// console.log(
//   myProject.addTodoToProject("title", "des", "1/1/2024", 0, "note", true, 1)
// );

AsideController(myProject);
MainContent(myProject).renderProject(0);
