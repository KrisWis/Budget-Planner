import React from 'react'; // Подключаем React
import List from './List'; // Импортируем компонент List

function App() { // Обозначаем функцию приложения

  const [visibleList, setVisibleList] = React.useState < boolean > (true);

  const toggleVisibleList = () => {
    setVisibleList((visible) => !visible);
  }


  return ( // Она возвращает JSX разметку (типа HTML)
    <div className="App">
      {visibleList && <List />} - отображаем наш компонент в этом компоненте App.
      <button onClick={toggleVisibleList}>Показать / скрыть список</button>
    </div>
  )
}

export default App; // Экспортируем функцию