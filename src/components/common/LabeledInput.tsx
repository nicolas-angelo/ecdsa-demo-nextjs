import { forwardRef } from "react";
import { clsx } from "app/utils";

export interface LabeledInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	icon?: JSX.Element;
}

interface LabeledInputWithSkeleton
	extends React.ForwardRefExoticComponent<
		LabeledInputProps & React.RefAttributes<HTMLInputElement>
	> {
	Skeleton: React.FC;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
	(
		{
			label,
			icon,
			name,
			value,
			onChange,
			className,
			...inputProps
		}: LabeledInputProps,
		ref
	) => {
		return (
			<div>
				<label htmlFor={name}>{label}</label>
				<div className={clsx(`mt-2 ${icon && "relative rounded-md shadow-sm"}`)}>
					{icon && (
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							{icon}
						</div>
					)}
					<input
						className={clsx(`${className} ${icon && "pl-10"}`)}
						{...{ name, value, onChange }}
						{...inputProps}
						ref={ref}
					/>
				</div>
			</div>
		);
	}
) as LabeledInputWithSkeleton;

LabeledInput.Skeleton = () => (
	<div>
		<div className="mb-3 h-3 w-28 rounded-md dark:bg-slate-600" />
		<div className="input-base input-primary h-[2.5rem] py-4 ring dark:ring-slate-500" />
	</div>
);

export default LabeledInput;
