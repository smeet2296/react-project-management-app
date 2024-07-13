import moment from "moment";
import ElementRender from "./ElementRender";
import { useForm } from "react-hook-form";

const formComponents = [
  {
    type: "INPUT",
    label: "Project Name",
    bindTo: "$formData$.projectDetails",
    key: "projectName",
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  {
    type: "TEXT_AREA",
    label: "Project Description",
    bindTo: "$formData$.projectDetails",
    key: "projectDescription",
    required: true,
    minLength: 10,
    maxLength: 300,
  },
  {
    type: "DATE",
    label: "Due Date",
    bindTo: "$formData$.projectDetails",
    key: "dueDate",
    required: true,
    minDate: new Date(),
    maxDate: new Date(moment().add(3, "months")),
  },
];

export default function NewProject({ onSubmit, onCancel }) {
  const form = useForm();

  const cancelForm = () => {
    form.reset();
    onCancel();
  };

  return (
    <form
      className="w-[35rem] mt-16"
      onSubmit={form.handleSubmit((data) =>
        onSubmit(data.$formData$.projectDetails)
      )}
    >
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            type="button"
            className="text-stone-800 hover:text-stone-950"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            type="submit"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        {formComponents.map((component) => (
          <ElementRender
            form={form}
            component={component}
            key={component.key}
          />
        ))}
      </div>
    </form>
  );
}
