import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddSubscriptionBtnComponentTemplate() {
    return (
        `<button class="add-btn">+ Добавить подписку</button>`
    );
}

export default class AddSubscriptionBtnComponent extends AbstractComponent {
    get template() { 
        return createAddSubscriptionBtnComponentTemplate();
    }
}