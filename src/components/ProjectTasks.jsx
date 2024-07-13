import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProjectTasks({ project }) {
  const form = useForm();
  const [tasks, setTasks] = useState(project.tasks || []);

  const addTask = (data) => {
    if (Array.isArray(project.tasks)) {
      project.tasks = [...project.tasks, data.task];
    } else {
      project.tasks = [data.task];
    }
    setTasks([...project.tasks]);
    form.reset();
  };

  const deleteTask = (selectedTask) => {
    project.tasks = project.tasks.filter((task) => task !== selectedTask);
    setTasks([...project.tasks]);
  };

  return (
    <section className="text-left">
      <h2 className="text-2xl font-bold font-stone-700 mb-4">Tasks</h2>
      <form onSubmit={form.handleSubmit(addTask)}>
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
                onClick={() => deleteTask(task)}
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
