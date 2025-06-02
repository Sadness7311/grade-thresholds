function Section({ children, className, ...props }) {
    return (
        <div 
            className={"w-full flex flex-col items-center gap-3 px-4 " + className}
            { ...props }
        >
            { children }
        </div>
    )
}

export default Section