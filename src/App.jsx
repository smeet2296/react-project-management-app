import "./App.css";
import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import { useState } from "react";
import Home from "./components/Home";
import ProjectsStoreProvider from "./store/projects-store";

function App() {
  let [currentPage, setCurrentPage] = useState({
    page: "HOME",
    selectedProject: null,
  });

  const setHomePage = (projectName) => {
    setCurrentPage({
      page: "HOME",
      selectedProject: projectName,
    });
  };

  const setNewProjectPage = () => {
    setCurrentPage({ page: "NEW_PROJECT", selectedProject: null });
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsStoreProvider setHomePage={setHomePage}>
        <SideBar
          selectedProject={currentPage.selectedProject}
          onAddProject={setNewProjectPage}
          onSelectProject={setHomePage}
        />
        {currentPage.page === "HOME" && (
          <Home
            selectedProject={currentPage.selectedProject}
            onAddProject={setNewProjectPage}
          />
        )}
        {currentPage.page === "NEW_PROJECT" && (
          <NewProject onCancel={setHomePage} />
        )}
      </ProjectsStoreProvider>
    </main>
  );
}

export default App;
