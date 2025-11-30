import StatsComponent from '../view/stats-component.js';
import { render } from '../framework/render.js';

export default class StatsPresenter {
  #container = null;
  #subscriptionModel = null;
  #statsComponent = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
    
    this.#subscriptionModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderStats();
  }

  #renderStats() {
    const stats = this.#subscriptionModel.getStats();
    
    if (this.#statsComponent) {
      this.#updateStatsComponent(stats);
    } else {
      this.#statsComponent = new StatsComponent({ stats });
      render(this.#statsComponent, this.#container);
    }
  }

  #updateStatsComponent(stats) {
    const statsElement = this.#container.querySelector('.stats');
    if (statsElement) {
        
      const newStatsComponent = new StatsComponent({ stats });
      statsElement.replaceWith(newStatsComponent.element);
      
      if (this.#statsComponent) {
        this.#statsComponent.removeElement();
      }
      this.#statsComponent = newStatsComponent;
    }
  }

  #handleModelChange() {
    this.#renderStats();
  }
}