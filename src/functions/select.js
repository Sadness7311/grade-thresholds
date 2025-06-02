function select(arr, toFind, strict = false) {
    return arr.indexOf(
        arr.find(el => strict 
            ? el.toLowerCase() == toFind 
            : el.toLowerCase().includes(toFind)
        )
    )
}

export default select