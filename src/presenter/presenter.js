// src/presenter/presenter.js
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
import AddSubscriptionFormComponent from '../view/add-subscription-form-component.js';
import EditSubscriptionFormComponent from '../view/edit-subscription-form-component.js';
import { render } from '../framework/render.js';

export default class SubscriptionPresenter {
  #headerContainer = null;
  #sidebarContainer = null;
  #mainContentContainer = null;
  #subscriptionModel = null;
  #currentFilters = {
    types: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
    maxPrice: 5000
  };
  #subscriptionsListComponent = null;
  #addSubscriptionFormComponent = null;
  #editSubscriptionFormComponent = null;

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
    this.renderHeader();
    this.renderSidebar();
    this.renderMainContent();
    this.renderAddSubscriptionForm();
  }

  renderHeader() {
    const headerComponent = new HeaderComponent();
    render(headerComponent, this.#headerContainer);
  }

  renderSidebar() {
    // Рендерим фильтры
    const filtersComponent = new FiltersComponent({
      filters: this.#currentFilters,
      onFiltersChange: this.handleFiltersChange.bind(this)
    });
    render(filtersComponent, this.#sidebarContainer);

    // Рендерим статистику
    const stats = this.#subscriptionModel.getStats();
    const statsComponent = new StatsComponent({ stats });
    render(statsComponent, this.#sidebarContainer);
  }

  renderMainContent() {
    this.#mainContentContainer.innerHTML = '';
    
    this.renderSubscriptions();
    this.renderHorizontalBlocks();
    this.renderAnalytics();
    this.setupEventHandlers();
  }

  renderSubscriptions() {
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    // Создаем компонент списка подписок
    this.#subscriptionsListComponent = new SubscriptionsListComponent(subscriptions);
    render(this.#subscriptionsListComponent, this.#mainContentContainer);

    // Если есть подписки - рендерим их
    if (subscriptions.length > 0) {
      this.renderSubscriptionItems();
    }
  }

  renderSubscriptionItems() {
    const subscriptionsList = this.#mainContentContainer.querySelector('.subscriptions-list');
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    // Очищаем список перед рендером
    if (subscriptionsList) {
      subscriptionsList.innerHTML = '';
    }
    
    subscriptions.forEach(subscription => {
      const subscriptionComponent = new SubscriptionItemComponent({ 
        subscription,
        onEdit: () => this.handleEditSubscription(subscription),
        onDelete: () => this.handleRemoveSubscription(subscription.id)
      });
      render(subscriptionComponent, subscriptionsList);
    });
  }

  renderHorizontalBlocks() {
    const horizontalBlocksContainer = document.createElement('div');
    horizontalBlocksContainer.className = 'horizontal-blocks';
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    this.renderNotifications(horizontalBlocksContainer);
    this.renderRecommendations(horizontalBlocksContainer);
  }

  renderNotifications(container) {
    const notificationsSection = document.createElement('div');
    notificationsSection.className = 'notifications-section';
    notificationsSection.innerHTML = '<h2>Ближайшие платежи</h2>';
    
    const notificationsList = document.createElement('div');
    notificationsList.className = 'notifications-list';
    
    notificationsSection.appendChild(notificationsList);
    container.appendChild(notificationsSection);

    const notifications = this.#subscriptionModel.getNotifications();
    
    notifications.forEach(notification => {
      const notificationComponent = new NotificationItemComponent({ notification });
      render(notificationComponent, notificationsList);
    });
  }

  renderRecommendations(container) {
    const recommendationsSection = document.createElement('div');
    recommendationsSection.className = 'recommendations-section';
    recommendationsSection.innerHTML = '<h2>Рекомендации</h2>';
    
    const recommendationsList = document.createElement('div');
    recommendationsList.className = 'recommendations-list';
    
    recommendationsSection.appendChild(recommendationsList);
    container.appendChild(recommendationsSection);

    const recommendations = this.#subscriptionModel.getRecommendations();
    
    recommendations.forEach(recommendation => {
      const recommendationComponent = new RecommendationItemComponent({ recommendation });
      render(recommendationComponent, recommendationsList);
    });
  }

  renderAnalytics() {
    const analyticsSection = document.createElement('div');
    analyticsSection.className = 'analytics-section';
    this.#mainContentContainer.appendChild(analyticsSection);

    const analytics = this.#subscriptionModel.getAnalytics();
    const analyticsComponent = new AnalyticsComponent({ analytics });
    render(analyticsComponent, analyticsSection);
  }

  renderAddSubscriptionForm() {
    this.#addSubscriptionFormComponent = new AddSubscriptionFormComponent({
      onFormSubmit: this.handleAddSubscription.bind(this),
      onFormCancel: this.handleFormCancel.bind(this)
    });
    
    // Рендерим форму прямо в body, чтобы она была поверх всего
    render(this.#addSubscriptionFormComponent, document.body);
    this.#addSubscriptionFormComponent.hide();
  }

  // === ОБРАБОТЧИКИ СОБЫТИЙ ===

  handleFiltersChange(newFilters) {
    this.#currentFilters = { ...this.#currentFilters, ...newFilters };
    this.rerenderSubscriptions();
  }

  handleAddSubscription(subscriptionData) {
    try {
      const newSubscription = this.#subscriptionModel.addSubscription(subscriptionData);
      console.log('✅ Добавлена подписка:', newSubscription);
      
      // Скрываем форму
      this.#addSubscriptionFormComponent.hide();
      
      // Перерисовываем всё
      this.rerenderAll();
      
    } catch (error) {
      alert('Ошибка при добавлении подписки: ' + error.message);
    }
  }

  handleFormCancel() {
    this.#addSubscriptionFormComponent.hide();
  }

  handleRemoveSubscription(subscriptionId) {
    if (confirm('Вы уверены, что хотите удалить эту подписку?')) {
      const success = this.#subscriptionModel.removeSubscription(subscriptionId);
      if (success) {
        this.rerenderAll();
      }
    }
  }

  handleEditSubscription(subscription) {
    console.log('Редактирование подписки:', subscription);
    this.showEditSubscriptionForm(subscription);
  }

  handleUpdateSubscription(subscriptionId, updatedData) {
    try {
      const updatedSubscription = this.#subscriptionModel.updateSubscription(subscriptionId, updatedData);
      console.log('✅ Подписка обновлена:', updatedSubscription);
      
      // Скрываем форму редактирования
      this.#editSubscriptionFormComponent.hide();
      this.#editSubscriptionFormComponent.removeElement();
      this.#editSubscriptionFormComponent = null;
      
      // Перерисовываем всё
      this.rerenderAll();
      
    } catch (error) {
      alert('Ошибка при обновлении подписки: ' + error.message);
    }
  }

  handleEditFormCancel() {
    if (this.#editSubscriptionFormComponent) {
      this.#editSubscriptionFormComponent.hide();
      this.#editSubscriptionFormComponent.removeElement();
      this.#editSubscriptionFormComponent = null;
    }
  }

  setupEventHandlers() {
    this.setupAddButtonHandler();
    this.setupFilterHandlers();
  }

  setupAddButtonHandler() {
    const addButton = this.#mainContentContainer.querySelector('.add-btn');
    if (addButton) {
      addButton.addEventListener('click', () => {
        this.showAddSubscriptionForm();
      });
    }
  }

  setupFilterHandlers() {
    // Обработчики для чекбоксов фильтров
    const checkboxes = this.#sidebarContainer.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateTypeFilters();
      });
    });

    // Обработчик для слайдера цены
    const priceSlider = document.querySelector('input[type="range"]');
    if (priceSlider) {
      console.log('Слайдер найден!');
      
      priceSlider.addEventListener('input', (e) => {
        const maxPrice = parseInt(e.target.value);
        console.log('Слайдер изменен:', maxPrice);
        
        this.#currentFilters.maxPrice = maxPrice;
        this.rerenderSubscriptions();
        
        // Обновляем отображение цены
        const maxValueElement = document.querySelector('.max-value');
        if (maxValueElement) {
          maxValueElement.textContent = `${maxPrice} ₽`;
        }
      });

      // Инициализируем начальное значение
      const initialMaxValue = document.querySelector('.max-value');
      if (initialMaxValue) {
        initialMaxValue.textContent = `${priceSlider.value} ₽`;
      }
    } else {
      console.error('Слайдер не найден!');
    }
  }

  updateTypeFilters() {
    const checkedTypes = Array.from(this.#sidebarContainer.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
      .map(checkbox => {
        const label = checkbox.parentElement.textContent.trim();
        return label;
      });
    
    this.#currentFilters.types = checkedTypes;
    this.rerenderSubscriptions();
  }

  showAddSubscriptionForm() {
    this.#addSubscriptionFormComponent.show();
  }

  showEditSubscriptionForm(subscription) {
    // Если форма уже открыта, закрываем её
    if (this.#editSubscriptionFormComponent) {
      this.#editSubscriptionFormComponent.hide();
      this.#editSubscriptionFormComponent.removeElement();
    }

    // Создаем новую форму редактирования
    this.#editSubscriptionFormComponent = new EditSubscriptionFormComponent({
      subscription: subscription,
      onFormSubmit: this.handleUpdateSubscription.bind(this),
      onFormCancel: this.handleEditFormCancel.bind(this)
    });
    
    // Рендерим форму в body
    render(this.#editSubscriptionFormComponent, document.body);
    this.#editSubscriptionFormComponent.show();
  }

  rerenderSubscriptions() {
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    if (this.#subscriptionsListComponent) {
      this.#subscriptionsListComponent.updateSubscriptions(subscriptions);
    }
    
    // Если есть подписки - рендерим их
    if (subscriptions.length > 0) {
      this.renderSubscriptionItems();
    }
  }

  rerenderAll() {
    this.#mainContentContainer.innerHTML = '';
    this.renderMainContent();
  }
}