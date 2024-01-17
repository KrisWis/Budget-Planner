import './scss/app.scss';
import Header from './components/Header'
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Пицца" price={200} image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
            <PizzaBlock title="Пицца" price="200" image="https://planeta778.1c-umi.ru/images/cms/data/picca/30258560074074452_7f68.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
