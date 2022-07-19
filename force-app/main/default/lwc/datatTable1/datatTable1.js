import { LightningElement, wire,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRandomAccounts from '@salesforce/apex/GetAccounts.getRandomAccounts';
import { publish, MessageContext } from 'lightning/messageService';
import SEND_DATA_CHANNEL from '@salesforce/messageChannel/My_Channel__c';
import {refreshApex} from '@salesforce/apex';

const actions = [
    { label: 'View', name: 'record_details' },
    { label: 'Edit', name: 'edit' }
];

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true, type: 'string' },
    { label: 'Type', fieldName: 'Type', editable: true, type: 'string' },
    { label: 'Industry', fieldName: 'Industry', editable: true, type: 'string' },
    { label: 'Account Source', fieldName: 'AccountSource', editable: true, type: 'string' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', editable: true, type: 'string' },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
            menuAlignment: 'right'
        }
    },    
];

export default class DatatTable1 extends LightningElement {

    data = [];
    columns = columns;
    error;
    collectselecteddata = [];

    @track record = [];
    @track bShowModal = false;
    @track currentRecordId;
    @track isEditForm = false;
    @track showLoadingSpinner = false;

    // non-reactive variables
    selectedRecords = [];
    refreshTable;
   

    @wire(MessageContext)
  messageContext;

  @wire(getRandomAccounts)
  accounts(result) {
      this.refreshTable = result;
      if (result.data) {
          this.data = result.data;
          this.error = undefined;

      } else if (result.error) {
          this.error = result.error;
          this.data = undefined;
      }
  }

    connectedCallback(){
        
    }
    getSelectedRows(event){
        this.collectselecteddata =  event.detail.selectedRows;
        
     }

     buttonClick(){
        const payload = { 
            data: this.collectselecteddata
        };
        publish(this.messageContext, SEND_DATA_CHANNEL, payload);
     }

     handleRowActions(event) {
        let actionName = event.detail.action.name;

        window.console.log('actionName ====> ' + actionName);

        let row = event.detail.row;

        window.console.log('row ====> ' + row);
        // eslint-disable-next-line default-case
        switch (actionName) {
            case 'record_details':
                this.viewCurrentRecord(row);
                break;
            case 'edit':
                this.editCurrentRecord(row);
                break;
            case 'delete':
                this.deleteCons(row);
                break;
        }
    }

    // view the current record details
    viewCurrentRecord(currentRow) {
        this.bShowModal = true;
        this.isEditForm = false;
        this.record = currentRow;
        this.currentRecordId = currentRow.Id;
    }

    // closing modal box
    closeModal() {
        this.bShowModal = false;
    }


    editCurrentRecord(currentRow) {
        // open modal box
        this.bShowModal = true;
        this.isEditForm = true;

        // assign record id to the record edit form
        this.currentRecordId = currentRow.Id;
    }

    // handleing record edit form submit
    handleSubmit(event) {
        

        // querying the record edit form and submiting fields to form
        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);

        // closing modal
        this.bShowModal = false;

        
        refreshApex(this.refreshTable);

    }
    handleSuccess() {
        return refreshApex(this.refreshTable);
    }

     

    
}