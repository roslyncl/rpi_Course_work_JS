// src/presenter/recommendations-presenter.js
import RecommendationsListComponent from '../view/recommendations-list-component.js';
import RecommendationItemComponent from '../view/recommendation-item-component.js';
import { render } from '../framework/render.js';

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
    const recommendationsSection = document.createElement('div');
    recommendationsSection.className = 'recommendations-section';
    recommendationsSection.innerHTML = '<h2>Рекомендации</h2>';
    
    const recommendationsList = document.createElement('div');
    recommendationsList.className = 'recommendations-list';
    
    recommendationsSection.appendChild(recommendationsList);
    this.#container.appendChild(recommendationsSection);

    const recommendations = this.#subscriptionModel.getRecommendations();
    
    recommendations.forEach(recommendation => {
      const recommendationComponent = new RecommendationItemComponent({ recommendation });
      render(recommendationComponent, recommendationsList);
    });
  }
}