import { FormComponent } from "./schema";
import { Text } from "./Text";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";

export function Renderer({
    components,
    state,
    onChange,
    onAction
}: {
    components: FormComponent[];
    state: any;
    onChange: (k: string, v: string) => void;
    onAction: (a: string) => void;
}) {
    return (
        <>
            {components.map((c) => {
                if (c.hideIf && c.hideIf(state)) return null;

                switch (c.type) {
                    case "text":
                        return <Text key={c.id} value={c.value} />;

                    case "input":
                        return (
                            <Input
                                key={c.id}
                                label={c.label}
                                value={state[c.keyName] || ""}
                                onChange={(v: any) => onChange(c.keyName, v)}
                            />
                        );

                    case "button":
                        return (
                            <Button
                                key={c.id}
                                label={c.label}
                                onClick={() => onAction(c.onClick)}
                            />
                        );

                    case "select":
                        return (
                            <Select
                                key={c.id}
                                label={c.label}
                                value={state[c.keyName] || ""}
                                options={c.options}
                                onChange={(v: any) => onChange(c.keyName, v)}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
}
