import { createContext, useReducer } from "react";

export const ProjectsStore = createContext({
  projects: [],
  addProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

const addProject = (projects, project) => {
  return [{ ...project }, ...projects];
};

const deleteProject = (projects, projectName) => {
  return projects.filter((project) => project.projectName !== projectName);
};

const addTask = (projects, projectName, taskName) => {
  return projects.map((project) => {
    if (project.projectName === projectName) {
      return {
        ...project,
        tasks: project.tasks ? [...project.tasks, taskName] : [taskName],
      };
    } else {
      return { ...project };
    }
  });
};

const deleteTask = (projects, projectName, taskName) => {
  return projects.map((project) => {
    if (project.projectName === projectName) {
      return {
        ...project,
        tasks: project.tasks.filter((task) => task !== taskName),
      };
    } else {
      return { ...project };
    }
  });
};

const projectsReducer = (projects, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return addProject(projects, action.payload.project);
    case "DELETE_PROJECT":
      return deleteProject(projects, action.payload.projectName);
    case "ADD_TASK":
      return addTask(
        projects,
        action.payload.projectName,
        action.payload.taskName
      );
    case "DELETE_TASK":
      return deleteTask(
        projects,
        action.payload.projectName,
        action.payload.taskName
      );
  }
};

export default function ProjectsStoreProvider({ children, setHomePage }) {
  const [projects, dispatchProjects] = useReducer(projectsReducer, []);

  const addProject = (project) => {
    dispatchProjects({
      type: "ADD_PROJECT",
      payload: { project },
    });
    setHomePage(project.projectName);
  };

  const deleteProject = (projectName) => {
    dispatchProjects({
      type: "DELETE_PROJECT",
      payload: { projectName },
    });
    setHomePage(null);
  };

  const addTask = (projectName, taskName) => {
    dispatchProjects({
      type: "ADD_TASK",
      payload: { projectName, taskName },
    });
  };

  const deleteTask = (projectName, taskName) => {
    dispatchProjects({
      type: "DELETE_TASK",
      payload: { projectName, taskName },
    });
  };

  const projectsStoreUtilities = {
    projects,
    addProject,
    deleteProject,
    addTask,
    deleteTask,
  };

  return (
    <ProjectsStore.Provider value={projectsStoreUtilities}>
      {children}
    </ProjectsStore.Provider>
  );
}
