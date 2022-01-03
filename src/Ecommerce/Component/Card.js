import React,{useReducer, createContext} from 'react'
import "./Card.css"
import ContextCard from './ContextCard';
import { Products } from './ProductApi';
import { reducer}  from './reducer';

const initialState = {
    items: Products
}
export const CardContext = createContext();

const Card = () => {
    // const [items, setItems] = useState(Products)


    const [state, dispatch] = useReducer(reducer, initialState)
        //* delete item one by one / to delete the individual element
        const removeItem =(id)=>{
            return dispatch ({
                type : "REMOVE_ITEM",
                payload: id,
            })
        }

        // * clear all item of card
        const clearCart =()=>{
            return dispatch({
                type: "CLEAR_CART",
                
            })
        }

        // * increment item of card
        const increment =(id)=>{
            return dispatch({
                type: "INCREMENT",
                payload: id
            })
        }

        // * decrement item of card 
        const decrement = (id)=>{
            return dispatch({
                type: "DECREMENT",
                payload: id
            })
        }
    return (
        <>
            <CardContext.Provider value = {{...state, removeItem, clearCart, increment, decrement}}>
                <ContextCard/>
            </CardContext.Provider>
        </>
    )
}

export default Card
