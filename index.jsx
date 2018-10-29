import React from 'react';

export default class Debounced extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
    this.onInput = this.onInput.bind(this);
    this.threshold = 5;
    this.taskInProcess = false;
    this.decreaseInterval = null;
  }

  reset(){
    this.threshold = 5;
    clearInterval(this.decreaseInterval);
    this.decreaseInterval = null;
    console.log('Reset! You may debounce again now.');
  }

  /**
   *
   * @param {Function|function} execute
   */
  handleDebounce(execute) {
    this.threshold--;

    if (this.threshold === 0) {
      console.log('Executing callback now!');
      execute();
      this.reset();
    }else{
      console.log(this.threshold);
    }
  }

  /**
   *
   * @param {Event} e
   * @param {Function} execute
   */
  onInput(e, execute) {
    this.threshold = !this.taskInProcess ? 5 : this.threshold;
    if (this.decreaseInterval == null) {
      this.decreaseInterval = setInterval(() => this.handleDebounce(execute), 1000);
    }
  }

  componentDidMount() {
    this.input = document.querySelector(`#${this.props.id}`);
    this.input.oninput = e => this.onInput(e, this.props.execute);
  }

  render() {
    return <input type='text' id={this.props.id} placeholder={this.props.placeholder} />;
  }

}