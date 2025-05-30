function SelectBoard({ name, boardIndex, board, onClick }) {
    return (
        <div 
            className={`border-3 border-primary rounded-md p-6 cursor-pointer hover:bg-primary hover:text-primary-foreground transition ${board === boardIndex && 'bg-primary text-primary-foreground'}`} 
            onClick={onClick}
        >
            <h2>{ name }</h2>
        </div>
    )
}

export default SelectBoard