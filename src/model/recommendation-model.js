import { recommendationsData } from '../mock/mock.js';

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
    const currentSubscriptions = subscriptions.map(sub => ({
      name: sub.name.toLowerCase(),
      type: sub.type,
      price: sub.priceValue
    }));

    const allRecommendations = Object.entries(recommendationsData)
      .flatMap(([category, recs]) => {
        const hasCategorySubscriptions = currentSubscriptions.some(sub => sub.type === category);
        
        if (!hasCategorySubscriptions) return [];

        const filteredRecs = recs
          .filter(rec => {
            const shouldAvoid = rec.avoid.some(avoidName =>
              currentSubscriptions.some(sub => sub.name.includes(avoidName))
            );
            const alreadyHas = currentSubscriptions.some(sub =>
              sub.name.includes(rec.name.toLowerCase())
            );
            const isFree = rec.price === 0;
            
            return !shouldAvoid && !alreadyHas && !isFree;
          });

        if (filteredRecs.length > 0) {
          const bestRec = filteredRecs
            .sort((a, b) => a.price - b.price)[0];
          
          return [{
            id: `rec-${category}-${bestRec.name}`,
            name: bestRec.name,
            price: bestRec.price,
            formattedPrice: `${bestRec.price} ₽`,
            details: bestRec.details,
            category: category
          }];
        }
        
        return [];
      });

    this.#recommendations = allRecommendations
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    this._notifyObservers();
  }

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