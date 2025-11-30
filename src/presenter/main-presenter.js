import HeaderComponent from '../view/header-component.js';
import FiltersPresenter from './filters-presenter.js';
import StatsPresenter from './stats-presenter.js';
import SubscriptionsPresenter from './subscriptions-presenter.js';
import NotificationsPresenter from './notifications-presenter.js';
import RecommendationsPresenter from './recommendations-presenter.js';
import AnalyticsPresenter from './analytics-presenter.js';
import { render } from '../framework/render.js';
import { presenterConstants, componentConfig } from '../mock/mock.js';

export default class MainPresenter {
  #headerContainer = null;
  #sidebarContainer = null;
  #mainContentContainer = null;
  #subscriptionModel = null;
  #filtersModel = null;

  constructor({ 
    headerContainer, 
    sidebarContainer, 
    mainContentContainer, 
    subscriptionModel,
    filtersModel
  }) {
    this.#headerContainer = headerContainer;
    this.#sidebarContainer = sidebarContainer;
    this.#mainContentContainer = mainContentContainer;
    this.#subscriptionModel = subscriptionModel;
    this.#filtersModel = filtersModel;

    this.#subscriptionModel.addObserver(this.#handleModelChange.bind(this));
    this.#filtersModel.addObserver(this.#handleModelChange.bind(this));
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
    this.#sidebarContainer.innerHTML = '';

    const filtersPresenter = new FiltersPresenter({
      container: this.#sidebarContainer,
      filtersModel: this.#filtersModel
    });
    filtersPresenter.init();

    const statsPresenter = new StatsPresenter({
      container: this.#sidebarContainer,
      subscriptionModel: this.#subscriptionModel
    });
    statsPresenter.init();
  }

  #renderMainContent() {
    this.#mainContentContainer.innerHTML = '';
    
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
    horizontalBlocksContainer.className = presenterConstants.CLASS_NAMES.HORIZONTAL_BLOCKS;
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    const notificationsPresenter = new NotificationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    notificationsPresenter.init();

    const recommendationsPresenter = new RecommendationsPresenter({
      container: horizontalBlocksContainer,
      subscriptionModel: this.#subscriptionModel
    });
    recommendationsPresenter.init();
  }

  #renderAnalytics() {
    const analyticsSection = document.createElement(componentConfig.ANALYTICS.tagName);
    analyticsSection.className = componentConfig.ANALYTICS.className;
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