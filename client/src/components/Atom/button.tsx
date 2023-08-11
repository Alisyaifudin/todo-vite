import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

function Button({ children, ...props }: ButtonProps) {
	return (
		<button {...props} className="disabled:opacity-50 bg-blue-500 text-white py-1 px-2 rounded-md" type="submit">
			{children}
		</button>
	);
}

export default Button;
