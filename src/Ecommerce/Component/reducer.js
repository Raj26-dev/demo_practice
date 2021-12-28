 export const reducer =(state, action)=>{
    if (action.type === "REMOVE_ITEM"){
        return {
            ...state,
            items: state.items.filter((curElem)=>{
                console.log(curElem.id)
                return curElem.id !== action.payload;
            })
        }
    }
    if (action.type === "CLEAR_CART"){
        return {
            ...state,
            items:[]
        }
    }
    return state;
};


// import React from 'react'

// const reducer = (state, action) => {
//     if (action.type === "REMOVE_ITEM"){
//         return {
//             ...state,
//             item: state.items.filter((curElem)=>{
//                 console.log(curElem.id)
//                 return curElem.id != action.payload;
//             })
//         }
//     }
//     return state;
// }

// export default reducer
