export interface LabeledInputProps {
	label: string;
	name: string;
	placeholder?: string;
	value: string;
	onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

export default function LabeledInput({
	label,
	name,
	placeholder,
	value,
	onChange,
	required,
}: LabeledInputProps) {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<div className="mt-2">
				<input
					id={name}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required={required}
				/>
			</div>
		</div>
	);
}
