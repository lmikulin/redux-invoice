const initialState = {
  items: {
    items: []
  },
  totals: {
    subtotal: 0,
    tax: 0,
    total: 0
  }
};
export default function reducer(state=initialState, action) {
  var newItems, subtotal;
  switch (action.type) {
    case "ADD_ITEM":
      // add the new item to the list
      // update the subtotal, tax and total
      newItems = [...state.items.items, action.payload];
      subtotal = newItems.reduce((sum, item) => {return sum + item.total}, 0);
      return {
        items: {
          items: newItems
        },
        totals: {
          subtotal: subtotal,
          tax: subtotal * 0.05,
          total: subtotal * 1.05
        }
      }
    case "DELETE_ITEM":
      // remove the item from the list
      // update the subtotal, tax and total
      newItems = state.items.items.filter((item, index) => index != action.payload.index);
      subtotal = newItems.reduce((sum, item) => {return sum + item.total}, 0);
      return {
        items: {
          items: newItems
        },
        totals: {
          subtotal: subtotal,
          tax: subtotal * 0.05,
          total: subtotal * 1.05
        }
      }
    case "EDIT_ITEM":
      // modify the item
      // update the subtotal, tax and total
      return state;
      break;
  }
  return state;
}
