export function addItem(name, quantity, price, total) {
  return {
    type: "ADD_ITEM",
    payload: {name, quantity, price, total}
  }
}

export function deleteItem(index) {
  return {
    type: "DELETE_ITEM",
    payload: {index}
  }
}

export function editItem(name, quantity, price) {
  return {
    type: "EDIT_ITEM",
    payload: {name, quantity, price}
  }
}
