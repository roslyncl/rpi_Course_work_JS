// src/model/filters-model.js
export default class FiltersModel {
  #filters = {
    types: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
    maxPrice: 5000
  };
  #observers = [];

  constructor() {}

  get filters() {
    return this.#filters;
  }

  setFilters(newFilters) {
    this.#filters = { ...this.#filters, ...newFilters };
    this.#notifyObservers();
  }

  resetFilters() {
    this.#filters = {
      types: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
      maxPrice: 5000
    };
    this.#notifyObservers();
  }

  // Метод для применения фильтров к массиву подписок
  applyFilters(subscriptions) {
    return subscriptions.filter(subscription => {
      const matchesType = this.#filters.types.includes(subscription.type);
      const matchesPrice = subscription.priceValue <= this.#filters.maxPrice;
      return matchesType && matchesPrice;
    });
  }

  getActiveTypes() {
    return this.#filters.types;
  }

  getMaxPrice() {
    return this.#filters.maxPrice;
  }

  // Observer pattern
  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  #notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}