import moment from "moment";
import ProjectTasks from "./ProjectTasks";

export default function Home({ onAddProject, onDeleteProject, project = {} }) {
  let view;

  const projectView = (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.projectName}
          </h1>
          <button
            type="button"
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDeleteProject(project.projectName)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-left text-stone-400">
          {moment(project.dueDate).format("DD/MM/YYYY")}
        </p>
        <p className="text-left text-stone-600 whitespace-pre-wrap">
          {project.projectDescription}
        </p>
      </header>
      <ProjectTasks project={project} />
    </div>
  );

  const noProjectView = (
    <div className="mt-24 text-center w-2/3">
      <img src="project.png" className="w-16 h-16 object-contain mx-auto" />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={onAddProject}
        >
          Create New Project
        </button>
      </p>
    </div>
  );

  if (project.projectName != null) {
    view = projectView;
  } else {
    view = noProjectView;
  }

  return view;
}
