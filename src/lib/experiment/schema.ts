export type ComponentType = "text" | "input" | "button" | "select";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  hideIf?: (state: any) => boolean;
}

export interface TextComponent extends BaseComponent {
  type: "text";
  value: string;
}

export interface InputComponent extends BaseComponent {
  type: "input";
  label: string;
  keyName: string;
}

export interface ButtonComponent extends BaseComponent {
  type: "button";
  label: string;
  onClick: string;
}

export interface SelectComponent extends BaseComponent {
  type: "select";
  label: string;
  keyName: string;
  options: string[];
}

export type FormComponent =
  | TextComponent
  | InputComponent
  | ButtonComponent
  | SelectComponent;
