import RecommendationItemComponent from '../view/recommendation-item-component.js';
import { render } from '../framework/render.js';
import { presenterConstants, componentConfig } from '../mock/mock.js';

export default class RecommendationsPresenter {
  #container = null;
  #subscriptionModel = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderRecommendations();
  }

  #renderRecommendations() {
    const recommendationsSection = document.createElement(componentConfig.RECOMMENDATIONS.tagName);
    recommendationsSection.className = componentConfig.RECOMMENDATIONS.className;
    recommendationsSection.innerHTML = `<h2>${presenterConstants.TEXTS.RECOMMENDATIONS_TITLE}</h2>`;
    
    const recommendationsList = document.createElement('div');
    recommendationsList.className = presenterConstants.CLASS_NAMES.RECOMMENDATIONS_LIST;
    
    recommendationsSection.appendChild(recommendationsList);
    this.#container.appendChild(recommendationsSection);

    const recommendations = this.#subscriptionModel.getRecommendations();
    
    recommendations.forEach(recommendation => {
      const recommendationComponent = new RecommendationItemComponent({ recommendation });
      render(recommendationComponent, recommendationsList);
    });
  }
}