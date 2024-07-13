import "./App.css";
import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import { useState } from "react";
import Home from "./components/Home";

function App() {
  let [projects, setProjects] = useState([]);
  let [currentPage, setCurrentPage] = useState({
    page: "HOME",
    selectedProject:
      Array.isArray(projects) && projects.length ? projects[0] : {},
  });
  console.log(projects)

  const addProject = (project) => {
    setProjects((projects) => [{ ...project }, ...projects]);
    setHomePage(project);
  };

  const deleteProject = (projectName) => {
    setProjects((projects) =>
      projects.filter((project) => project.projectName !== projectName)
    );
    setHomePage({});
  };

  const setHomePage = (project) => {
    setCurrentPage({
      page: "HOME",
      selectedProject: project,
    });
  };

  const setNewProjectPage = () => {
    setCurrentPage({ page: "NEW_PROJECT", selectedProject: {} });
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={projects}
        selectedProject={currentPage.selectedProject}
        onAddProject={setNewProjectPage}
        onSelectProject={(project) => setHomePage(project)}
      />
      {currentPage.page === "HOME" && (
        <Home
          project={currentPage.selectedProject}
          onAddProject={setNewProjectPage}
          onDeleteProject={deleteProject}
        />
      )}
      {currentPage.page === "NEW_PROJECT" && (
        <NewProject onSubmit={addProject} onCancel={setHomePage} />
      )}
    </main>
  );
}

export default App;
