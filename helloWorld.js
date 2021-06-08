import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'enter name..';

  changeHandler(event) {
    this.greeting = event.target.value.toLowerCase();
  }
}