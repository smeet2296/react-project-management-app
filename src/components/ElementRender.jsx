import DateInput from "./DateInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

export default function ElementRender({ form, component }) {
  let element;
  if (component.type === "INPUT") {
    element = <TextInput form={form} component={component}></TextInput>;
  } else if (component.type === "TEXT_AREA") {
    element = <TextAreaInput form={form} component={component}></TextAreaInput>;
  } else if (component.type === "DATE") {
    element = <DateInput form={form} component={component}></DateInput>;
  }
  return element;
}
