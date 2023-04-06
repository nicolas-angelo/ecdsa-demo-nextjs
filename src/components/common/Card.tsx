import Image from "next/image";
import { Button } from "app/components";
import { clsx, classNames } from "app/utils";
import React from "react";

interface CardProps extends ChildrenAndClassesProps {}

interface CardHeaderProps {
	img?: string;
	title?: string;
}

interface CardFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	submitCta?: string;
}

const Card = ({ className, children }: CardProps) => (
	<div className={clsx(`${className} card`)}>{children}</div>
);

const Header = ({ img, title }: CardHeaderProps) => (
	<>
		{img && (
			<Image
				width={100}
				height={100}
				src={img}
				alt="form header logo"
				className="mx-auto my-3 h-14 w-auto"
				priority
			/>
		)}
		<h2 className="text-center text-3xl font-extrabold">{title}</h2>
	</>
);

const Form = ({ className, submitCta, children, onSubmit }: CardFormProps) => (
	<form className={clsx(`${className} space-y-6`)} onSubmit={onSubmit}>
		{children}
		<div>
			<button type="submit" className="w-full">
				{submitCta}
			</button>
		</div>
	</form>
);

const Divider = ({ label }: { label?: string }) => (
	<div className="relative">
		<div className="absolute inset-0 flex items-center">
			<div className="w-full border-t-[2.75px] border-neutral-600 dark:border-neutral-400" />
		</div>
		<div className="relative flex justify-center text-sm">
			<span
				className={classNames(
					label
						? "text-default bg-white dark:bg-slate-700"
						: "bg-transparent py-2 text-transparent",
					"px-2"
				)}
			>
				{label}
			</span>
		</div>
	</div>
);

Card.ActionStack = Button.Group;
Card.Button = Button;
Card.Divider = Divider;
Card.Form = Form;
Card.Header = Header;

export default Card;
