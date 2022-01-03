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
    if (action.type === "INCREMENT"){
        let incrementCard = state.items.map((curElem)=> {
            if (curElem.id === action.payload){
                return {
                    ...curElem,
                    quantity: curElem.quantity + 1
                };
            }
            return curElem;
        }) 
        return {
            ...state, 
            items: incrementCard
        }
    }
    if (action.type === "DECREMENT"){
        let decrement = state.items.map ((curElem)=>{
            if (curElem.id === action.payload){
                return {
                    ...curElem,
                    quantity : curElem.quantity - 1
                };
            }
            return curElem
        }).filter((curElem)=> curElem.quantity !== 0)
        return {
            ...state,
            items: decrement
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
