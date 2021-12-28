import React,{useContext} from 'react'
import { CardContext } from './Card'

const Item = ({id, img, title, description, price, quantity}) => {
    const {removeItem} = useContext(CardContext)
    return (
        <div>
           
            <div className='items-info'>
                            <div className='product-img'>
                                <img src={img} alt='product image'/>
                            </div>
                            <div className='title'>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </div>
                            <div className='add-minus-quantity'>
                                <i className=" fas fa-minus minus"></i>
                                <input type='text' placeholder={quantity}/>
                                <i className='fas fa-plus add'></i>
                            </div>
                            <div className='price'>
                                <h3>{price}</h3>
                            </div>
                            <div className='remove-item'>
                                <i className='fas fa-trash-alt remove' onClick={()=>removeItem(id)}></i>
                            </div>
                        </div>
                        <hr/>
        </div>
    )
}

export default Item
