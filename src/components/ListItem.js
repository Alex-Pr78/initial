import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount,
    };
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';
    // ...
    this.$rootElement.dataset.id = this.state.id;
    // ...

    const formattedDate = this.state.date.toLocaleString();

    this.$rootElement.innerHTML = `
      ${formattedDate} - <b>$ ${this.state.amount}</b>
    `;

    // Кнопка удаления
    this.$deleteButton = document.createElement("button");
    this.$deleteButton.className = "delete-button";
    this.$deleteButton.textContent = "Удалить";

    this.$rootElement.append(this.$deleteButton);

    // Обработчик удаления
    this.$deleteButton.addEventListener("click", () => {
      this.props.onDelete(this.state.id, this.state.amount);
    });
  }
}
