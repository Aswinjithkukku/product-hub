import Button, { ButtonProps } from "./Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps { }

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
    className = "  ",
    ...args
}) => {
    return (
        <Button
            className={` bg-blue-600 hover:bg-blue-700 text-neutral-50  ${className}`}
            {...args}
        />
    );
};

export default ButtonPrimary;
