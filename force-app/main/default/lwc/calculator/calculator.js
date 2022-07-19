import { LightningElement, track,api } from 'lwc';

export default class Calculator extends LightningElement {

    @track input1;
    @track input2;
    @api finalAnswer

    handleChangeNum1(evt) {
        this.input1 = evt.target.value;
      }
    handleChangeNum2(evt) {
        this.input2 = evt.target.value;
    }


    addition(){
        this.finalAnswer = Number(this.input1) + Number(this.input2);
    }

    subtraction(){
        this.finalAnswer = Number(this.input1) - Number(this.input2);
    }
    multiplication(){
        this.finalAnswer = Number(this.input1) * Number(this.input2);
    }
    division(){
        this.finalAnswer = Number(this.input1) / Number(this.input2);
    }

}