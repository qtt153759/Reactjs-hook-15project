// Cấu trúc file reducer bình thường
const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return { ...state, cart: [] };
        case "REMOVE":
            return {
                ...state,
                // filter thì bỏ {} nếu ko return
                cart: state.cart.filter(
                    (cartItem) => cartItem.id !== action.payload
                ),
            };
        // Khai báo chung let tempCart thì phải có case:{}
        // case "INCREASE": {
        //     let tempCart = state.cart.map((cartItem) => {
        //         if (cartItem.id === action.payload) {
        //             return { ...cartItem, amount: cartItem.amount + 1 };
        //         }
        //         return cartItem;
        //     });
        //     return {
        //         ...state,
        //         cart: tempCart,
        //     };
        // }
        // case "DECREASE": {
        //     // Chơi map+filter cũng hay
        //     let tempCart = state.cart
        //         .map((cartItem) => {
        //             if (cartItem.id === action.payload) {
        //                 return { ...cartItem, amount: cartItem.amount - 1 };
        //             }
        //             return cartItem;
        //         })
        //         .filter((cartItem) => cartItem.amount !== 0);
        //     return {
        //         ...state,
        //         cart: tempCart,
        //     };
        // }

        //Increase+Decrease=Toggle_amount
        case "TOGGLE_AMOUNT":
            let tempCart = state.cart
                .map((cartItem) => {
                    if (cartItem.id === action.payload.id) {
                        if (action.payload.type === "inc") {
                            return { ...cartItem, amount: cartItem.amount + 1 };
                        }
                        if (action.payload.type === "des") {
                            return { ...cartItem, amount: cartItem.amount - 1 };
                        }
                    }
                    return cartItem;
                })
                .filter((cartItem) => cartItem.amount !== 0);
            return { ...state, cart: tempCart };
        case "GET_TOTALS":
            let { total, amount } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    let { amount, price } = cartItem;
                    cartTotal.amount += amount;
                    cartTotal.total += price * amount;
                    return cartTotal;
                },
                { amount: 0, total: 0 }
            );
            // cách 14.99942359723520 => 14.99
            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount };
        case "LOADING":
            return { ...state, loading: true };
        case "DISPLAY_ITEMS":
            return { ...state, cart: action.payload, loading: false };
        default:
            throw new Error("no matching action type");
    }
};
export default reducer;
