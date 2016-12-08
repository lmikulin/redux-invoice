import React from "react";
import {connect} from "react-redux";
import {addItem, deleteItem, editItem} from "../actions/item-actions";

@connect((store) => {
  console.log("connecting store", store);
  return {
    items: store.items,
    totals: store.totals
  };
})
export default class Layout extends React.Component {
  constructor() {
    super();
    this._onDeleteItem = this._onDeleteItem.bind(this);
    this._onAddItem = this._onAddItem.bind(this);
    this._onSetName = this._onSetName.bind(this);
    this._onSetQuantity = this._onSetQuantity.bind(this);
    this._onSetPrice = this._onSetPrice.bind(this);

    this.state = this._getClearItem();
  }
  _getClearItem() {
    return {name: "", quantity: 0, price: 0, total: 0};
  }
  _onDeleteItem(index, event) {
    this.props.dispatch(deleteItem(index));
  }
  _onAddItem(event) {
    if (this.state.name && this.state.quantity) {
      this.props.dispatch(addItem(this.state.name, this.state.quantity, this.state.price, this.state.total));
      this.setState(this._getClearItem());
    }
  }
  _onSetName(event) {
    this.setState({name: event.target.value});
  }
  _onSetQuantity(event) {
    var qty = Math.round(event.target.value);
    this.setState({quantity: qty, total: qty * this.state.price});
  }
  _onSetPrice(event) {
    var price = Number(event.target.value);
    this.setState({price: price, total: this.state.quantity * price});
  }
  render() {
    return (
      <div class="container">
        <h1>Invoice Editor</h1>
        <p>Type in your item, quantity and price. Add or delete using
        the <span class="text-success">&#x2713;</span> and <span class="text-warning">&#x2717;</span> controls.</p>
        <p>You need at least an item name and quantity to add the entry.</p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" onChange={this._onSetName}
                value={this.state.name}
                placeholder="new item"/></td>
              <td><input onChange={this._onSetQuantity}
                type="number"
                placeholder={0}
                value={this.state.quantity}/></td>
              <td><input onChange={this._onSetPrice}
                type="number"
                placeholder={0}
                value={this.state.price}/></td>
              <td class="text-right">{(this.state.total).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
              <td><span class="text-success action-button" onClick={this._onAddItem}>&#x2713;</span></td>
            </tr>
            {this.props.items.items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td class="text-right">{(item.price).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
                  <td class="text-right">{(item.total).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
                  <td><span class="text-warning action-button" onClick={this._onDeleteItem.bind(null, index)}>&#x2717;</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <table class="table table-bordered totals-table">
          <tbody>
            <tr>
              <th>Subtotal</th>
              <td>{(this.props.totals.subtotal).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
            </tr>
            <tr>
              <th>Tax (5%)</th>
              <td>{(this.props.totals.tax).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{(this.props.totals.total).toLocaleString("en-US",{style: "currency", currency: "USD"})}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
