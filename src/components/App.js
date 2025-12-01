import { Component } from "../core/Component";
import { Form } from "./Form";
import { List } from "./List";
import { ListItem } from "./ListItem";

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: [],
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const title = document.createElement('h1');
    title.className = 'total-amount';
    title.innerHTML = `Итого: $ <span>${this.state.total}</span>`;
    this.$total = title.querySelector('span');
    this.$rootElement.append(title);

    // Создание формы с callback
    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this),
    });

    this.$rootElement.appendChild(donateForm.$rootElement);

    // Создание списка
    this.donateList = new List();
    this.$rootElement.appendChild(this.donateList.$rootElement);
  }

  onItemDelete(id, amount) {
    // Удаляем из массива state
    this.state.donates = this.state.donates.filter(item => item.state.id !== id);

    // Обновляем сумму
    this.state.total -= amount;
    this.$total.textContent = this.state.total;

    // Удаляем из списка DOM
    this.donateList.removeItemById(id);
  }

  onItemCreate(amount) {
    // Создаём item и удаляем из списка
    const item = new ListItem({
      amount,
      onDelete: this.onItemDelete.bind(this)
    });

    // Сохраняем в массиве
    this.state.donates.push(item); 

    // Добавляем визуально
    this.donateList.addItem(item);

    // Обновляем total
    this.state.total += amount;
    this.$total.textContent = this.state.total;
  }
}