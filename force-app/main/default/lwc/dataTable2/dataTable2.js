import { LightningElement,wire,track } from 'lwc';

import { subscribe, MessageContext } from 'lightning/messageService';
import SEND_DATA_CHANNEL from '@salesforce/messageChannel/My_Channel__c';

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true, type: 'string' },
    { label: 'Type', fieldName: 'Type', editable: true, type: 'string' },
    { label: 'Industry', fieldName: 'Industry', editable: true, type: 'string' },
    { label: 'Account Source', fieldName: 'AccountSource', editable: true, type: 'string' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', editable: true, type: 'string' },
];

export default class DataTable2 extends LightningElement {
    @wire(MessageContext)
  messageContext;
  subscription = null;
  @track data = [];
  columns = columns;
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      SEND_DATA_CHANNEL,
      (message) => this.handleMessage(message)
    );
  }

  handleMessage(message) {
    this.data = message.data;
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }
}