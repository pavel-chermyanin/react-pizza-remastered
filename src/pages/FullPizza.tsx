import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addItem, selectItemById } from '../redux/slices/cartSlice'



const typeNames = ['тонкое', 'традиционное']

const FullPizza: React.FC = () => {

    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        name: string;
        price: number;
        types: number[];
        sizes: number[];
    }>()
    const { id } = useParams()
    const dispatch = useDispatch()

    const cartItem = useSelector(selectItemById(id))

    const [activeType, setActiveType] = React.useState(0)
    const [activeSize, setActiveSize] = React.useState(0)


    const onClickAddToCard = () => {
        const item = {
            id,
            name,
            imageUrl,
            price,
            type: typeNames[activeType],
            size: sizes[activeSize]
        }
        dispatch(addItem(item))

    }

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get(`https://628e5bff368687f3e715b43f.mockapi.io/pizzas/${id}`)
                setPizza(data)
            } catch (error) {
                alert('Произошла ошибка при получении пиццы!')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <p>'Загрузка...'</p>
    }

    const { imageUrl, name, types, sizes, price } = pizza
    return (
        <div className="fullpizza">
            <div className="fullpizza__left">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt={name}
                />

                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, i) => (
                            <li
                                key={i}
                                onClick={() => setActiveType(type)}
                                className={activeType === type ? 'active' : ''}>
                                {typeNames[type]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? 'active' : ''}>
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div
                        onClick={onClickAddToCard}
                        className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {cartItem && <i>{cartItem.count}</i>}
                    </div>
                </div>

            </div>


            <div className="fullpizza__right">
                    <h4 className="pizza-block__title">{name}</h4>
                    <p className="fullpizza__text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, dignissimos.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, dignissimos.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, dignissimos.
                    </p>
                    <Link to="/" className="button button--black">
                        <span>Вернуться назад</span>
                    </Link>
            </div>
        </div>
    )
}

export default FullPizza