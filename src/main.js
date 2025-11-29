// main.js (оставляем как есть)
import SubscriptionPresenter from './presenter/presenter.js';
import SubscriptionModel from './model/model.js';

const headerContainer = document.querySelector('.app-header');
const sidebarContainer = document.querySelector('.sidebar-section');
const mainContentContainer = document.querySelector('.main-content-section');

const subscriptionModel = new SubscriptionModel();
const subscriptionPresenter = new SubscriptionPresenter({
  headerContainer: headerContainer,
  sidebarContainer: sidebarContainer,
  mainContentContainer: mainContentContainer,
  subscriptionModel: subscriptionModel
});

subscriptionPresenter.init();