import { clsx } from "app/utils";

export interface ButtonProps {
	className?: string;
	label?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonGroupProps {
	containerProps?: string;
	items: ButtonProps[];
}

const Button = ({ className, label, onClick, ...props }: ButtonProps) => (
	<button
		className={clsx(`${className} btn w-full`)}
		onClick={onClick}
		type="button"
		{...props}
	>
		{label}
	</button>
);

Button.Group = ({ containerProps, items }: ButtonGroupProps) => (
	<div className={clsx(`${containerProps} grid grid-cols-3 gap-3`)}>
		{items.map(({ label, onClick, ...props }, i) => (
			<Button key={i} {...{ label, onClick, ...props }} />
		))}
	</div>
);

export default Button;
