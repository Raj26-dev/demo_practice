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

        const clearCart =()=>{
            return dispatch({
                type: "CLEAR_CART",
                
            })
        }
    return (
        <>
            <CardContext.Provider value = {{...state, removeItem, clearCart}}>
                <ContextCard/>
            </CardContext.Provider>
        </>
    )
}

export default Card
