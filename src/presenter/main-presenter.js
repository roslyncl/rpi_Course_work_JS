// src/presenter/main-presenter.js
import HeaderComponent from '../view/header-component.js';
import FiltersComponent from '../view/filters-component.js';
import StatsComponent from '../view/stats-component.js';
import SubscriptionsListComponent from '../view/subscriptions-list-component.js';
import NotificationsListComponent from '../view/notifications-list-component.js';
import RecommendationsListComponent from '../view/recommendations-list-component.js';
import AnalyticsComponent from '../view/analytics-component.js';
import AddSubscriptionFormComponent from '../view/add-subscription-form-component.js';
import { render } from '../framework/render.js';

export default class MainPresenter {
  #headerContainer = null;
  #sidebarContainer = null;
  #mainContentContainer = null;
  #subscriptionModel = null;

  #subscriptionsPresenter = null;
  #filtersPresenter = null;
  #statsPresenter = null;
  #notificationsPresenter = null;
  #recommendationsPresenter = null;
  #analyticsPresenter = null;
  #formPresenter = null;

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
    this.#filtersPresenter = new FiltersPresenter({
      container: this.#sidebarContainer,
      subscriptionModel: this.#subscriptionModel
    });
    this.#filtersPresenter.init();

    this.#statsPresenter = new StatsPresenter({
      container: this.#sidebarContainer,
      subscriptionModel: this.#subscriptionModel
    });
    this.#statsPresenter.init();
  }

  #renderMainContent() {
    this.#mainContentContainer.innerHTML = '';
    
    this.#subscriptionsPresenter = new SubscriptionsPresenter({
      container: this.#mainContentContainer,
      subscriptionModel: this.#subscriptionModel
    });
    this.#subscriptionsPresenter.init();

    this.#renderHorizontalBlocks();
    this.#renderAnalytics();
  }

  #renderHorizontalBlocks() {
    const horizontalBlocksContainer = document.createElement('div');
    horizontalBlocksContainer.className = 'horizontal-blocks';
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    this.#notificationsPresenter = new NotificationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    this.#notificationsPresenter.init();

    this.#recommendationsPresenter = new RecommendationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    this.#recommendationsPresenter.init();
  }

  #renderAnalytics() {
    const analyticsSection = document.createElement('div');
    analyticsSection.className = 'analytics-section';
    this.#mainContentContainer.appendChild(analyticsSection);

    this.#analyticsPresenter = new AnalyticsPresenter({
      container: analyticsSection,
      subscriptionModel: this.#subscriptionModel
    });
    this.#analyticsPresenter.init();
  }

  #handleModelChange() {
    this.#renderMainContent();
  }
}