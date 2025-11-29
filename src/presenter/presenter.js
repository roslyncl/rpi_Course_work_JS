import HeaderComponent from '../view/header-component.js';
import FiltersComponent from '../view/filters-component.js';
import StatsComponent from '../view/stats-component.js';
import SubscriptionsListComponent from '../view/subscriptions-list-component.js';
import SubscriptionItemComponent from '../view/subscription-item-component.js';
import NotificationsListComponent from '../view/notifications-list-component.js';
import NotificationItemComponent from '../view/notification-item-component.js';
import RecommendationsListComponent from '../view/recommendations-list-component.js';
import RecommendationItemComponent from '../view/recommendation-item-component.js';
import AnalyticsComponent from '../view/analytics-component.js';
import { render } from '../framework/render.js';

export default class SubscriptionPresenter {
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
    const filtersComponent = new FiltersComponent();
    render(filtersComponent, this.#sidebarContainer);

    const stats = this.#subscriptionModel.getStats();
    const statsComponent = new StatsComponent({ stats });
    render(statsComponent, this.#sidebarContainer);
  }

  #renderMainContent() {
    this.#renderSubscriptions();
    this.#renderHorizontalBlocks();
    this.#renderAnalytics();
  }

  #renderSubscriptions() {
    const subscriptions = this.#subscriptionModel.getSubscriptions();
    const subscriptionsListComponent = new SubscriptionsListComponent();
    render(subscriptionsListComponent, this.#mainContentContainer);

    const subscriptionsContainer = subscriptionsListComponent.getElement().querySelector('.subscriptions-list');
    
    subscriptions.forEach(subscription => {
      const subscriptionComponent = new SubscriptionItemComponent({ subscription });
      render(subscriptionComponent, subscriptionsContainer);
    });
  }

  #renderHorizontalBlocks() {
    const horizontalBlocksContainer = document.createElement('div');
    horizontalBlocksContainer.className = 'horizontal-blocks';
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    this.#renderNotifications(horizontalBlocksContainer);
    this.#renderRecommendations(horizontalBlocksContainer);
  }

  #renderNotifications(container) {
    const notifications = this.#subscriptionModel.getNotifications();
    const notificationsListComponent = new NotificationsListComponent();
    render(notificationsListComponent, container);

    const notificationsContainer = notificationsListComponent.getElement().querySelector('.notifications-list');
    
    notifications.forEach(notification => {
      const notificationComponent = new NotificationItemComponent({ notification });
      render(notificationComponent, notificationsContainer);
    });
  }

  #renderRecommendations(container) {
    const recommendations = this.#subscriptionModel.getRecommendations();
    const recommendationsListComponent = new RecommendationsListComponent();
    render(recommendationsListComponent, container);

    const recommendationsContainer = recommendationsListComponent.getElement().querySelector('.recommendations-list');
    
    recommendations.forEach(recommendation => {
      const recommendationComponent = new RecommendationItemComponent({ recommendation });
      render(recommendationComponent, recommendationsContainer);
    });
  }

  #renderAnalytics() {
    const analytics = this.#subscriptionModel.getAnalytics();
    const analyticsComponent = new AnalyticsComponent({ analytics });
    render(analyticsComponent, this.#mainContentContainer);
  }

    // Добавь этот метод в класс SubscriptionPresenter
    #setupAddButtonHandler() {
        // Находим кнопку после рендеринга и добавляем обработчик
        const addButton = document.querySelector('.add-btn');
        if (addButton) {
            addButton.addEventListener('click', this.#handleAddButtonClick);
        }
    }

    #handleAddButtonClick = () => {
        console.log('Кнопка "Добавить подписку" нажата!');
        // Здесь будет логика открытия формы добавления
        alert('Форма добавления новой подписки будет здесь!');
    }


}