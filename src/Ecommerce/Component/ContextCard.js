import React,{useContext} from 'react'
import Item from './Item';
import { Scrollbars } from 'react-custom-scrollbars-2';
// import { Products } from './ProductApi';
import { CardContext } from './Card';

const ContextCard = () => {
    // const [items, setItems] = useState(Products)
    const {items, clearCart} = useContext(CardContext)
//* this is conditionally rendering if we find item length 0 or we clear all item then showing below section 
    if (items.length === 0){
        return(
            <>
                 <header>
                <div className='continue-shopping'>
                    <img src="./images/arrow.png" className='arrow-icon' />
                    <h3>E-commerce</h3>
                </div>
                <div className='cart-icon'>
                    <img src="./images/cart.png" />
                    <p>0</p>
                </div>
            </header>
            <section className='main-cart-section'>
                <h1>Shopping Cart</h1>
                <p className='total-items'>
                    you have 
                    <span className='total-items-count'>
                        0
                    </span>
                     items
                </p>
                </section>
            </>
        )
    }
    console.log(items)

    return (
        <>
           <header>
                <div className='continue-shopping'>
                    <img src="./images/arrow.png" className='arrow-icon' />
                    <h3>E-commerce</h3>
                </div>
                <div className='cart-icon'>
                    <img src="./images/cart.png" />
                    <p>1</p>
                </div>
            </header>
            <section className='main-cart-section'>
                <h1>Shopping Cart</h1>
                <p className='total-items'>
                    you have 
                    <span className='total-items-count'>
                        1
                    </span>
                     items
                </p>
                <div className='cart-items'>
                    <div className='cart-items-container'>
                     {/* // *this is use for scroll bar (library) */}
                        <Scrollbars> 
                            {
                                items.map((currItem)=>{
                                    return <Item key={currItem.id} {...currItem}/> // * ((Item)-> use as component where through from props passing data)   
                                })
                            }
                            
                        </Scrollbars>
                    </div>
                </div>
                <div className='card-total'>
                    <h1>Cart Total : <span>2000</span></h1>
                    <button>CheckOut</button>   
                    <button className='clear-cart' onClick={clearCart}>Clear Cart</button>         
                </div>
            </section> 
        </>
    )
}

export default ContextCard
