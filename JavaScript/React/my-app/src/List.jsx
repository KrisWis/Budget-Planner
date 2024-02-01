import React from "react";

// class List extends React.Component {

//     state = {
//         numbers: [1, 2, 3]
//     };

//     addRandomNumber = () => {
//         const randNumber = Math.floor(Math.random() * 10);
//         this.setState({
//             numbers: [...this.state.numbers, randNumber]
//         })
//     }

//     componentDidMount() {
//         console.log("Компонент был отображен!")
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log(prevProps, prevState, this.props, this.state)
//     }

//     componentWillUnmount() {
//         console.log("Компонент будет удалён!")
//     }


//     render() {
//         return (
//             <div>
//                 <ul>
//                     {
//                         this.state.numbers.map((num, index) => (
//                             <li key={index}>{num}</li>
//                         ))}
//                     <button onClick={this.addRandomNumber}>Новое число</button>
//                 </ul>
//             </div>
//         )
//     }
// }

const List = () => {

    const [numbers, setNumbers] = React.useState < Array < number > ([1, 2, 3]);

    // Создаём функцию, которая добавляет в массив цифру.
    const AddNumber = () => {
        /* И это число добавиться в массив numbers, но в том то и дело, что мы оповещаем об этом только js, но не React.
        React не знает о том, что массив обновился, поэтому элементы не перерендеривает. */
        // numbers.push(4);

        // Просто создаём рандомное число
        const randNumber = Math.floor(Math.random() * 10);
        /* Используем функцию setNumbers для замены значения в нашем состоянии, которое храниться в numbers. 
        Мы передаём туда массив, где с помощью spread оператора достаём все цифры из прошлого массива и добавляем новое число, только что созданное. */
        const newArr = [...numbers, randNumber];
        setNumbers(newArr);
    }

    React.useEffect(() => {
        console.log("Компонент был отображён!");

        return () => {
            console.log("Компонент был удалён!");
        }
    }, []);

    return (
        <div>
            <ul>
                {
                    /* Проходимся по массиву с помощью map() и генерируем на основе каждого элемента в массиве элемент li.
                    Но также, нужно помнить, что React имеет некое виртуальное дерево и он решает, нужно ли элемент рендерить или нет.
                    Поэтому, нам нужно добавить уникальный ключ для каждого элемента с помощью свойства key, куда мы передаём индекс элемента в массиве.
                    В нашем примере, ключ может быть неуникальным, но вообще, ему нужно быть полностью уникальным и неповторяющимся.
                    И также, этого свойства в DOM дереве мы увидеть не сможем, оно находиться именно в виртуальном дереве React. */
                    numbers.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                В React события нужно писать с большой буквы (т.е не onclick, а onClick) и уже потом в фигурных скобках передаём функцию.
                <button onClick={AddNumber}>Новое число</button>
            </ul>
        </div>
    )
}

export default List;