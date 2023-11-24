/* Открытие корзины */
const cart__modal__open: HTMLElement = document.getElementById("profile__cart");
const cart__modal_wrapper: HTMLElement = document.getElementById("cart__modal_wrapper");
const cart__modal__close: HTMLElement = document.getElementById("cart__modal--close");
cart__modal__open.addEventListener("click", function (): void {
    cart__modal_wrapper.classList.add("cart__modal_wrapper--open");

    cart__modal__close.addEventListener("click", function (): void {
        cart__modal_wrapper.classList.remove("cart__modal_wrapper--open");
    })
})

/* Добавление товара в корзину */
const item__buy_buttons: NodeListOf<Node> = document.querySelectorAll(".item__buy_button");
const cart__items: HTMLElement = document.getElementById("cart__items");

for (let buy_button of item__buy_buttons) {
    buy_button.addEventListener("click", function (): void {
        let item_id: string = (buy_button as HTMLElement).id;

        /* Открытие кругового меню выбора при нажатии */
        let item_select_menu: HTMLElement = document.getElementById(`${item_id}--amount`);
        let select_menu__overlay: HTMLElement = document.getElementById("select_menu__overlay");
        let body: HTMLElement = document.querySelector("body");
        item_select_menu.classList.add("select_menu--open");
        select_menu__overlay.classList.add("overlay--open");
        body.classList.add("inactive");

        /* Нажатие при выборе количества */
        const select_menu__options: NodeListOf<Node> = document.querySelectorAll(".amount--select_menu__option");

        function select_menu_func(option) {
            let item_amount: number = Number(option.textContent);
            let item_price: string = document.getElementById(`${item_id}--price`).textContent;
            let item_img: string = (document.getElementById(`${item_id}--img`) as HTMLImageElement).src;
            let item_caption: string = document.getElementById(`${item_id}--caption`).textContent;
            let item_desc: string = document.getElementById(`${item_id}--desc`).textContent;

            if (!document.getElementById(`cart__${item_id}`)) {
                let comment__request: string =
                    `<div class="cart__item" id="cart__${item_id}">

                <div class="cart__item__img">
                    <img src="${item_img}" alt="Предмет в корзине">
                </div>
        
                <div class="cart__item__desc">
                    <h2 class="desc--caption__${item_id}">${item_caption}</h2>
                    <p class="desc--description__${item_id}">${item_desc}</p>
                </div>
        
                <div class="cart__item__amount">
                    <i class="fa fa-plus cart__item__amount--plus" aria-hidden="true" id="amount--plus__${item_id}"></i>
                    <p class="cart__item__amount--number" id="amount--number__${item_id}">${item_amount}</p>
                    <i class="fa fa-minus cart__item__amount--minus" aria-hidden="true" id="amount--minus__${item_id}"></i>
                </div>
        
                <button class="cart__item__delete" id="${item_id}--delete">Удалить</button>
            </div>`;
                cart__items.insertAdjacentHTML(`beforeend`,
                    comment__request
                );

                /* Увеличение количества товара */
                const cart__item__amount__plus: HTMLElement = document.getElementById(`amount--plus__${item_id}`);

                cart__item__amount__plus.addEventListener("click", function (): void {
                    document.getElementById(`amount--number__${item_id}`).textContent = String(Number(document.getElementById(`amount--number__${item_id}`).textContent) + 1);
                    const cart__final_price: number = Number(document.getElementById("cart__final_price").textContent);
                    document.getElementById("cart__final_price").textContent = String(cart__final_price + (Number(item_price.slice(0, -1)) * 1000));
                })

                /* Уменьшение количества товара */
                const cart__item__amount__minus: HTMLElement = document.getElementById(`amount--minus__${item_id}`);

                cart__item__amount__minus.addEventListener("click", function (): void {
                    let item_amount: number = Number(document.getElementById(`amount--number__${item_id}`).textContent);
                    if (item_amount - 1 >= 1) {
                        document.getElementById(`amount--number__${item_id}`).textContent = String(item_amount - 1);
                        const cart__final_price: number = Number(document.getElementById("cart__final_price").textContent);
                        document.getElementById("cart__final_price").textContent = String(cart__final_price - (Number(item_price.slice(0, -1)) * 1000));
                    }
                })

                /* Удаление товара */
                const cart__item__delete: HTMLElement = document.getElementById(`${item_id}--delete`);
                cart__item__delete.addEventListener("click", function (): void {
                    const cart__item: HTMLElement = document.getElementById(`cart__${item_id}`);
                    const cart__final_price: number = Number(document.getElementById("cart__final_price").textContent);
                    let item_amount: number = Number(document.getElementById(`amount--number__${item_id}`).textContent);
                    document.getElementById("cart__final_price").textContent = String(cart__final_price - (Number(item_price.slice(0, -1)) * 1000 * item_amount));
                    cart__items.removeChild(cart__item);
                })

                /* Изменение финальной цены товара */
                const cart__final_price: number = Number(document.getElementById("cart__final_price").textContent);
                document.getElementById("cart__final_price").textContent = String(cart__final_price + (Number(item_price.slice(0, -1)) * 1000 * item_amount));
            } else {
                document.getElementById(`amount--number__${item_id}`).textContent = String(Number(document.getElementById(`amount--number__${item_id}`).textContent) + item_amount);
                const cart__final_price: number = Number(document.getElementById("cart__final_price").textContent);
                document.getElementById("cart__final_price").textContent = String(cart__final_price + (Number(item_price.slice(0, -1)) * 1000 * item_amount));
            }

            body.classList.remove("inactive");
            item_select_menu.classList.remove("select_menu--open");
            select_menu__overlay.classList.remove("overlay--open");
        }

        for (let option of select_menu__options) {
            let select_menu_function: VoidFunction = select_menu_func.bind(null, option);
            (option as HTMLElement).onclick = select_menu_function;
        }
    })
}

/* Убираем класс для прерывания анимаций при загрузке страницы */
window.onload = function () {
    setTimeout(() => {
        cart__modal_wrapper.classList.remove("preload");
    }, 500);
}