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

export interface OnPageChangePagination {
    selected: number
}

export interface PaginationInterface {
    currentPage: number,
    onChangePage: (e: number) => void
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
    name: 'популярности' | 'цене' | 'алфавиту',
    sort: 'rating' | 'price' | 'title'
}

export interface FetchPizzasInterface {
    currentPage: number,
    categoryIndex: number,
    sortFilter: SortFilter | string,
    searchValue: string
}
export interface PizzasInterface {
    pizzas: PizzaInterface[],
    status: Status
}