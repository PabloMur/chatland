export function Input({
    label,
    value,
    onChange
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label>{label}</label>
            <input value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
