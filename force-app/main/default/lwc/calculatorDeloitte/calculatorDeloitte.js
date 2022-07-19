import { LightningElement, api } from 'lwc';

export default class CalculatorDeloitte extends LightningElement {

    @api number1;
    @api number2;

    @api sum;
    @api mul;

    onChangeNumber1(event){
        this.number1 = event.detail.value;
    }

    onChangeNumber2(event){
        this.number2 = event.detail.value;
    }

    addition(){
        this.sum = +this.number1 + +this.number2;
    }

    multiplication(){
        this.mul = this.number1 * this.number2;
    }
}