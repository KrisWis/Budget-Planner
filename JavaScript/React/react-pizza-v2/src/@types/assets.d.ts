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
    activeType: string,
    activeSize: number,
    price: number,
    count: number
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
    pizzas: PizzaInterface[],
    status: string
}

export interface CartInterface {
    items: CartItemInterface[],
    totalPrice: number
}

export interface PizzaSlicePayloadAction {
    payload: PizzaInterface[];
    type: string;
}

export interface NumberPayloadAction {
    payload: number;
    type: string;
}

export interface StringPayloadAction {
    payload: string;
    type: string;
}

export interface SortFilterPayloadAction {
    payload: SortFilterInterface;
    type: string;
}

export interface FiltersPayloadAction {
    payload: FetchPizzasInterface;
    type: string;
}

export interface CartSlicePayloadAction {
    payload: CartItemInterface;
    type: string;
}
