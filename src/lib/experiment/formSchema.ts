import { FormComponent } from "./schema";

export const initialSchema: FormComponent[] = [
  {
    id: "title",
    type: "text",
    value: "Bienvenido a VisualTIME",
  },
  {
    id: "user",
    type: "input",
    label: "Usuario",
    keyName: "user",
  },
  {
    id: "pass",
    type: "input",
    label: "Password",
    keyName: "password",
  },
  {
    id: "loginBtn",
    type: "button",
    label: "Iniciar",
    onClick: "login",
  },
  {
    id: "company",
    type: "select",
    label: "Compañía",
    keyName: "company",
    options: ["Empresa A", "Empresa B"],
    hideIf: (state) => !state.loggedIn,
  },
];
