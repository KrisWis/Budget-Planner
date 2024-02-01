import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PizzaInterface } from '../@types/assets';

const FullPizza: React.FC = (): React.JSX.Element | string => {
    const params = useParams();
    const id = params.id;
    const [pizza, setPizza] = React.useState<PizzaInterface>();

    React.useEffect(() => {
        async function fetch() {
            try {
                const res = await axios.get(`https://65932afdbb12970719906e63.mockapi.io/items/${id}`);
                setPizza(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetch();
    })

    if (!pizza) {
        return 'Загрузка..'
    }

    return (
        <div>{pizza.title}</div>
    )
}

export default FullPizza;
