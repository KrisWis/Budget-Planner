declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

export interface PizzaInterface {
    id: string,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}

export interface CartItemInterface {
    id: string,
    imageUrl: string,
    title: string,
    activeType: number,
    activeSize: number,
    price: number,
    count: number
}

export interface PaginationInterface {
    currentPage: number,
    onChangePage: Function
}

export interface PizzaBlockInterface {
    id: string,
    imageUrl: string,
    title: string,
    sizes: number[],
    types: number[],
    price: number
}

export interface SortFilterInterface {
    name: string,
    sort: string
}

export interface FetchPizzasInterface {
    currentPage: number,
    categoryIndex: number,
    sortFilter: SortFilter | string,
    searchValue: string
}

export interface PizzasInterface {
    pizzas: {
        pizzas: PizzaInterface[],
        status: string
    }
}

export interface CartInterface {
    items: CartItemInterface[],
    totalPrice: number
}