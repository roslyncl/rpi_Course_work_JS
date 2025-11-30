// src/presenter/stats-presenter.js
import StatsComponent from '../view/stats-component.js';
import { render } from '../framework/render.js';

export default class StatsPresenter {
  #container = null;
  #subscriptionModel = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderStats();
  }

  #renderStats() {
    const stats = this.#subscriptionModel.getStats();
    const statsComponent = new StatsComponent({ stats });
    render(statsComponent, this.#container);
  }
}