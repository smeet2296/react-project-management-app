import { get } from "react-hook-form";

export default function TextInput({ form, component }) {
  let fieldPath = `${component.bindTo}.${component.key}`;
  const {
    register,
    formState: { errors },
  } = form;

  const error = get(errors, fieldPath);

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {component.label}
      </label>
      <input
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        type="text"
        {...register(fieldPath, {
          required: {
            value: component.required,
            message: `${component.label} cannot be empty`,
          },
          minLength: {
            value: component.minLength,
            message: `Minimum ${component.minLength} characters required`,
          },
          maxLength: {
            value: component.maxLength,
            message: `Maximum ${component.maxLength} characters allowed`,
          },
        })}
      ></input>
      {error && <span className="text-red-500">{error.message}</span>}
    </p>
  );
}
