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
    const currentSubscriptions = subscriptions.map(sub => ({
      name: sub.name.toLowerCase(),
      type: sub.type,
      price: sub.priceValue
    }));

    // Рекомендации по категориям (только платные)
    const recommendationsByCategory = {
      'Стриминг': [
        { name: 'Okko', avoid: ['netflix'], price: 299, details: 'Локальный контент дешевле' },
        { name: 'IVI', avoid: [], price: 199, details: 'Российские фильмы и сериалы' },
        { name: 'Start', avoid: [], price: 249, details: 'Эксклюзивные российские сериалы' }
      ],
      'Музыка': [
        { name: 'Яндекс.Музыка', avoid: ['spotify'], price: 149, details: 'Умные рекомендации и локальный контент' },
        { name: 'Apple Music', avoid: ['spotify'], price: 169, details: 'Высокое качество звука' },
        { name: 'Deezer', avoid: [], price: 219, details: 'Flow - умный плейлист' }
      ],
      'ПО': [
        { name: 'Figma Pro', avoid: ['adobe'], price: 999, details: 'Профессиональный дизайн для команд' },
        { name: 'Notion Plus', avoid: [], price: 299, details: 'Расширенные возможности для организации' },
        { name: 'Grammarly Premium', avoid: [], price: 599, details: 'Проверка грамматики и стиля' }
      ],
      'Видео': [
        { name: 'YouTube Premium через VPN', avoid: ['youtube premium'], price: 179, details: 'Тот же сервис по региональной цене' },
        { name: 'Twitch Turbo', avoid: [], price: 449, details: 'Просмотр без рекламы на Twitch' }
      ],
      'Игры': [
        { name: 'Xbox Game Pass', avoid: [], price: 499, details: 'Доступ к сотням игр за одну подписку' },
        { name: 'PlayStation Plus Essential', avoid: [], price: 599, details: 'Мультиплеер и бесплатные игры ежемесячно' },
        { name: 'Nintendo Switch Online', avoid: [], price: 299, details: 'Классические игры NES и SNES' }
      ],
      'Другое': [
        { name: 'Google One 100GB', avoid: [], price: 149, details: 'Облачное хранилище и дополнительные бонусы' },
        { name: 'ChatGPT Plus', avoid: [], price: 1699, details: 'Расширенный доступ к нейросети' },
        { name: 'Midjourney Pro', avoid: [], price: 1999, details: 'Генерация изображений без ограничений' }
      ]
    };

    // Собираем все возможные рекомендации
    const allRecommendations = Object.entries(recommendationsByCategory)
      .flatMap(([category, recs]) => {
        // Проверяем, есть ли у пользователя подписки этой категории
        const hasCategorySubscriptions = currentSubscriptions.some(sub => sub.type === category);
        
        if (!hasCategorySubscriptions) return [];

        // Фильтруем рекомендации: убираем бесплатные и те, что уже есть у пользователя
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

        // Берем только одну (самую дешевую) рекомендацию для категории
        if (filteredRecs.length > 0) {
          // Сортируем по цене (от самой дешевой) и берем первую
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

    // Сортируем все рекомендации по цене (от дешевой к дорогой) и берем топ-3
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