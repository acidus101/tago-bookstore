let initialState = {
    books:[]
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case "add":
            return {
                ...state,
                books:[...state.books, action.item]
            };
        case "remove":
            return { 
                ...state,
                books: state.books.filter((item, index) => item != action.item)
            };
        case "clean":
            return {
                ...state,
                books: []
            }
        default:
            return state;
    }
}

export default reducer;