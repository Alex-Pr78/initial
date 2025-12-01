import { Component } from '../core/Component';

export class Form extends Component {

  setup(props) {
    this.state = {
      amount: ''
    }
    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    this.$label = document.createElement('label');
    this.$label.className = 'donate-form__input-label';
    this.$label.textContent = 'Введите сумму в $';

    this.$input = document.createElement('input');
    this.$input.className = 'donate-form__donate-input';
    this.$input.name = 'amount';
    this.$input.type = 'number';
    this.$input.max = '100';
    this.$input.min = '1';
    this.$input.required = true;

    this.$button = document.createElement('button');
    this.$button.className = 'donate-form__submit-button';
    this.$button.type = 'submit';
    this.$button.disabled = true;
    this.$button.textContent = 'Задонатить';

    this.$label.appendChild(this.$input);
    this.$rootElement.appendChild(this.$label);
    this.$rootElement.appendChild(this.$button);

    this.$input.addEventListener('input', this.handleInput.bind(this))
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this))
  }

  get isValid() {
    const num = Number(this.state.amount);
    return num >= 1 && num <= 100;
  }

  handleInput(event) {
    this.state.amount = event.target.value;
    this.$button.disabled = !this.isValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.isValid) return;
    console.log('Submitted amount:', this.state.amount);

    // вызываем callback из App
    this.props.onSubmit(Number(this.state.amount))

    // Очистить поле
    this.state.amount = '';
    this.$input.value = '';
    this.$button.disabled = true;
    
  }
}
