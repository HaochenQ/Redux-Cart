import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  TOGGLE_AMOUNT,
} from "./actions";

//reducer - takes state and actions
export default function reducer(state, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };
    case TOGGLE_AMOUNT: {
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            switch (action.payload.toggle) {
              case "INC":
                return { ...cartItem, amount: cartItem.amount + 1 };
              case "DEC":
                return { ...cartItem, amount: cartItem.amount - 1 };
              default:
                break;
            }
          }
          return cartItem;
        }),
      };
    }
    case DECREASE: {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }

        return cartItem;
      });

      return { ...state, cart: tempCart };
    }
    case INCREASE: {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }

        return cartItem;
      });

      return { ...state, cart: tempCart };
    }
    case REMOVE: {
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    }
    case GET_TOTALS: {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;

          cartTotal.amount += amount;
          cartTotal.total += amount * price;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };
    }
    default:
      return state;
  }
}
