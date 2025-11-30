import { AbstractComponent } from "../framework/view/abstract-component.js";

function createStatsComponentTemplate(stats) {
  const totalSubscriptions = stats?.totalSubscriptions ?? 0;
  const totalCost = stats?.totalCost ?? '0 ₽/мес';
  const savings = stats?.savings ?? '0 ₽/мес';
  
  return (
    `<div class="stats">
      <h3>Статистика</h3>
      <div class="stat-item">
        <div class="stat-label">Всего подписок:</div>
        <div class="stat-value">${totalSubscriptions}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Общая стоимость:</div>
        <div class="stat-value">${totalCost}</div>
      </div>
    </div>`
  );
}

export default class StatsComponent extends AbstractComponent {
  constructor({ stats }) {
    super();
    this.stats = stats || {
      totalSubscriptions: 0,
      totalCost: '0 ₽/мес'
    };
  }

  get template() { 
    return createStatsComponentTemplate(this.stats);
  }
}