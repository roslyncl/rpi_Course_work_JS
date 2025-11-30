import AnalyticsComponent from '../view/analytics-component.js';
import { render } from '../framework/render.js';

export default class AnalyticsPresenter {
  #container = null;
  #subscriptionModel = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderAnalytics();
  }

  #renderAnalytics() {
    const analytics = this.#subscriptionModel.getAnalytics();
    const analyticsComponent = new AnalyticsComponent({ analytics });
    render(analyticsComponent, this.#container);
  }
}