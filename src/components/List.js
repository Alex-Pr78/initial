import { Component } from '../core/Component';

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';
    // ...

    this.$container = document.createElement('div');
    this.$container.className = 'donates-container';

    this.$title = document.createElement('h2');
    this.$title.className = 'donates-container__title';
    this.$title.textContent = 'Список донатов';

    this.$donates = document.createElement('div');
    this.$donates.className = 'donates-container__donates';

    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$donates);
    this.$rootElement.appendChild(this.$container)
  }

  addItem(item) {
    this.$donates.appendChild(item.$rootElement);
  }

  removeItemById(id) {
    const node = this.$donates.querySelector(`[data-id="${id}"]`);
    if (node) node.remove();
  }
}