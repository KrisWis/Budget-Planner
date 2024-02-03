export interface CartItemInterface {
    id: string,
    imageUrl: string,
    title: string,
    activeType: string,
    activeSize: number,
    price: number,
    count: number
}

export interface CartInterface {
    items: CartItemInterface[],
    totalPrice: number
}