// src/presenter/main-presenter.js
import HeaderComponent from '../view/header-component.js';
import FiltersPresenter from './filters-presenter.js';
import StatsPresenter from './stats-presenter.js';
import SubscriptionsPresenter from './subscriptions-presenter.js';
import NotificationsPresenter from './notifications-presenter.js';
import RecommendationsPresenter from './recommendations-presenter.js';
import AnalyticsPresenter from './analytics-presenter.js';
import { render } from '../framework/render.js';

export default class MainPresenter {
  #headerContainer = null;
  #sidebarContainer = null;
  #mainContentContainer = null;
  #subscriptionModel = null;

  constructor({ 
    headerContainer, 
    sidebarContainer, 
    mainContentContainer, 
    subscriptionModel 
  }) {
    this.#headerContainer = headerContainer;
    this.#sidebarContainer = sidebarContainer;
    this.#mainContentContainer = mainContentContainer;
    this.#subscriptionModel = subscriptionModel;

    this.#subscriptionModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderHeader();
    this.#renderSidebar();
    this.#renderMainContent();
  }

  #renderHeader() {
    const headerComponent = new HeaderComponent();
    render(headerComponent, this.#headerContainer);
  }

  #renderSidebar() {
    // Рендерим фильтры
    const filtersPresenter = new FiltersPresenter({
      container: this.#sidebarContainer,
      subscriptionModel: this.#subscriptionModel
    });
    filtersPresenter.init();

    // Рендерим статистику
    const statsPresenter = new StatsPresenter({
      container: this.#sidebarContainer,
      subscriptionModel: this.#subscriptionModel
    });
    statsPresenter.init();
  }

  #renderMainContent() {
    this.#mainContentContainer.innerHTML = '';
    
    // Рендерим подписки
    const subscriptionsPresenter = new SubscriptionsPresenter({
      container: this.#mainContentContainer,
      subscriptionModel: this.#subscriptionModel
    });
    subscriptionsPresenter.init();

    this.#renderHorizontalBlocks();
    this.#renderAnalytics();
  }

  #renderHorizontalBlocks() {
    const horizontalBlocksContainer = document.createElement('div');
    horizontalBlocksContainer.className = 'horizontal-blocks';
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    // Рендерим уведомления
    const notificationsPresenter = new NotificationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    notificationsPresenter.init();

    // Рендерим рекомендации
    const recommendationsPresenter = new RecommendationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    recommendationsPresenter.init();
  }

  #renderAnalytics() {
    const analyticsSection = document.createElement('div');
    analyticsSection.className = 'analytics-section';
    this.#mainContentContainer.appendChild(analyticsSection);

    const analyticsPresenter = new AnalyticsPresenter({
      container: analyticsSection,
      subscriptionModel: this.#subscriptionModel
    });
    analyticsPresenter.init();
  }

  #handleModelChange() {
    this.#renderMainContent();
  }
}