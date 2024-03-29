import { createSelector } from "reselect";

const selectCartReducer = state => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce(
        (quantity,cartitem) => quantity + cartitem.quantity,
        0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total,cartitem) => total + cartitem.quantity*cartitem.price,
        0
    )
)