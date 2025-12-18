// src/models/order.js
export default class Order {
  constructor({ id, email, amount, currency, provider, hours, status }) {
    this.id = id;
    this.email = email;
    this.amount = amount;
    this.currency = currency;
    this.provider = provider;
    this.hours = hours;
    this.status = status;
  }
}

