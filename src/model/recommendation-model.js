// src/model/recommendation-model.js
export default class RecommendationModel {
  #recommendations = [];
  #observers = [];

  constructor(initialRecommendations = []) {
    this.#recommendations = initialRecommendations;
  }

  get recommendations() {
    return this.#recommendations;
  }

  updateRecommendations(subscriptions) {
    this.#recommendations = subscriptions.map(sub => {
      let recommendation = null;
      
      switch(sub.name.toLowerCase()) {
        case 'netflix':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Okko вместо Netflix',
            savings: '-300 ₽',
            savingsValue: -300,
            details: 'Похожий контент, выгоднее',
            originalSubscription: sub.name
          };
          break;
        case 'adobe':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Figma вместо Adobe',
            savings: 'Бесплатно',
            savingsValue: -1499,
            details: 'Бесплатный план для проектов',
            originalSubscription: sub.name
          };
          break;
        case 'spotify':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Яндекс.Музыка вместо Spotify',
            savings: '-50 ₽',
            savingsValue: -50,
            details: 'Локальный контент, дешевле',
            originalSubscription: sub.name
          };
          break;
        case 'youtube premium':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Браузер с блокировщиком рекламы',
            savings: '-379 ₽', 
            savingsValue: -379,
            details: 'Бесплатный просмотр без рекламы',
            originalSubscription: sub.name
          };
          break;
        default:
          return null;
      }

      return recommendation;
    }).filter(rec => rec !== null);

    this._notifyObservers();
  }

  // Observer pattern
  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}