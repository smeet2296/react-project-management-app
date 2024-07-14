import { useContext } from "react";
import { ProjectsStore } from "../store/projects-store";

export default function SideBar({
  selectedProject,
  onAddProject,
  onSelectProject,
}) {
  const { projects } = useContext(ProjectsStore);

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={onAddProject}
        >
          + Add Project
        </button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let projectMenuCssClasses =
            "w-full px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if (project.projectName === selectedProject) {
            projectMenuCssClasses += " bg-stone-800 text-stone-200";
          } else {
            projectMenuCssClasses += " text-stone-400";
          }
          return (
            <li key={project.projectName}>
              <button
                className={projectMenuCssClasses}
                onClick={() => onSelectProject(project.projectName)}
              >
                {project.projectName}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
