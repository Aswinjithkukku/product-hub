import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    fontClass?: string;
    desc?: ReactNode;
    isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    children,
    desc,
    className = "mb-10 text-neutral-900 ",
    isCenter = false,
    ...args
}) => {
    return (
        <div className={`relative ${className}`}>
            <div
                className={
                    isCenter ? "text-center w-full max-w-2xl mx-auto mb-4" : "max-w-2xl"
                }
            >
                <h2 className={`text-3xl font-semibold`} {...args}>
                    {children || `Section Heading`}
                </h2>
                {desc && (
                    <span className="block mt-2  font-normal text-base sm:text-lg text-neutral-400 ">
                        {desc}
                    </span>
                )}
            </div>
            <div className='border-b w-24 mt-4' />
        </div>
    );
};

export default Heading;
