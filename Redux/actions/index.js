export const addBook=(item)=>{
    return (dispatch) => {
        dispatch({
            type: "add",
            item: item
        })
    }
}

export const removeBook=(item)=>{
    return (dispatch) => {
        dispatch({
            type: "remove",
            item: item
        })
    }
}

export const cleanBooks=(item)=>{
    return (dispatch) => {
        dispatch({
            type: "clean"
        })
    }
}