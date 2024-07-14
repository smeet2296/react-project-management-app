import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProjectsStore } from "../store/projects-store";

export default function ProjectTasks({ project }) {
  const { tasks = [], projectName } = project;
  const form = useForm();
  const { addTask, deleteTask } = useContext(ProjectsStore);

  const saveTaskForm = (data) => {
    addTask(projectName, data.task);
    form.reset();
  };

  return (
    <section className="text-left">
      <h2 className="text-2xl font-bold font-stone-700 mb-4">Tasks</h2>
      <form onSubmit={form.handleSubmit(saveTaskForm)}>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            {...form.register("task", { required: "Task cannot be empty" })}
          />
          {form.formState.errors.task && (
            <span className="text-red-500">
              {form.formState.errors.task.message}
            </span>
          )}
          <button type="submit" className="text-stone-700 hover:text-stone-950">
            Add Task
          </button>
        </div>
      </form>
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task} className="flex justify-between my-4">
              <span>{task}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => deleteTask(projectName, task)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
