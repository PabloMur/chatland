import { useState } from "react";
import { FormComponent } from "./schema";

export function useFormEngine(schema: FormComponent[]) {
  const [state, setState] = useState<any>({
    user: "",
    password: "",
    loggedIn: false,
  });

  const handleChange = (key: string, value: string) => {
    setState((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAction = (action: string) => {
    if (action === "login") {
      console.log("Login click", state);

      if (state.user && state.password) {
        setState((prev: any) => ({
          ...prev,
          loggedIn: true,
        }));
      }
    }
  };

  return {
    state,
    handleChange,
    handleAction,
  };
}
