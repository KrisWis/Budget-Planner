import React from 'react';
import { addToCart } from '../../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartItemInterface, PizzaBlockInterface } from '../../@types/assets';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { MouseEventHandler } from 'react';


const PizzaBlock: React.FC<PizzaBlockInterface> = ({ id, title, price, imageUrl, sizes, types }): React.JSX.Element => {
    const [pizzaCount, setPizzaCount] = React.useState<number>(0);
    const [activeType, setActiveType] = React.useState<number>(0);
    const [activeSize, setActiveSize] = React.useState<number>(sizes[0]);

    const typeNames: string[] = ["тонкое", "традиционное"];

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const addToReduxCart: MouseEventHandler<HTMLDivElement> = (): void => {
        let item: CartItemInterface = {
            id,
            title,
            price,
            imageUrl,
            activeSize,
            activeType: typeNames[activeType],
            count: pizzaCount + 1
        };
        dispatch(addToCart(item));
        setPizzaCount((prev: number) => prev + 1);
    }

    const pizza_URL: string = `/pizza/${id}`;

    return (
        <div className='pizza-block-wrapper'>

            <Link to={pizza_URL} className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt={title}
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((typeIndex) => (
                            <li key={typeIndex} onClick={() => setActiveType(typeIndex)} className={activeType === typeIndex ? 'active' : ''}>{typeNames[typeIndex]}</li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size) => (
                            <li key={size} onClick={() => setActiveSize(size)} className={activeSize === size ? 'active' : ''}>{size} см.</li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div className="button button--outline button--add" onClick={addToReduxCart}>
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
                        {pizzaCount > 0 && <i>{pizzaCount}</i>}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PizzaBlock;