import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Controller, get } from "react-hook-form";

export default function DateInput({ form, component }) {
  const fieldPath = `${component.bindTo}.${component.key}`;
  const {
    control,
    formState: { errors },
  } = form;

  const error = get(errors, fieldPath);

  return (
    <>
      <label className="text-sm font-bold uppercase text-stone-500">
        {component.label}
      </label>
      <Controller
        name={fieldPath}
        control={control}
        rules={{
          required: {
            value: component.required,
            message: `${component.label} cannot be empty`,
          },
        }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            selected={value}
            isClearable
            dateFormat="dd/MM/yyyy"
            onChange={(date) => onChange(date)}
            minDate={component.minDate}
            maxDate={component.maxDate}
          />
        )}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </>
  );
}
