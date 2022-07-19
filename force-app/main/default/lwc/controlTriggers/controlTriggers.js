import { LightningElement, api, wire, track } from 'lwc';
import getObjectNames from '@salesforce/apex/TriggerController.getObjectNames';
import getTriggerNames from '@salesforce/apex/TriggerController.getTriggerNames';
import sendForUpdate from '@salesforce/apex/TriggerController.sendForUpdate';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Object Name', fieldName: 'TableEnumOrId',initialWidth: 280 },
    { label: 'Trigger Name', fieldName: 'Name',initialWidth: 280 },
    { label: 'Status', fieldName: 'Status', type: 'text',initialWidth: 280 },
    { label: 'Name Space Prefix', fieldName: 'NamespacePrefix', type: 'text',initialWidth: 280 },     
];

export default class ControlTriggers extends LightningElement {
    
    @track options;
    @api selectedObject;
    @track data = [];
    @api hidedatatable = false;
    @api showTable;
    collectselecteddata = [];
    showSpinner = false;
    columns = columns;

    connectedCallback(){
        getObjectNames()
            .then(result => {
                let options = [];
                    if (result) {
                    result.forEach(r => {
                        options.push({
                        label: r,
                        value: r,
                        });
                    });
                    }
                this.options = options;
                
            })
            .catch(error => {
               
            });
    }

    handleChange(event){
        this.showSpinner = true;
        this.selectedObject = event.target.value;
        getTriggerNames({
            objectName: this.selectedObject
            })
            .then(result => {

                if(result === null){
                    this.showSpinner = false;
                    this.hidedatatable = true;
                    this.showTable = false;
                    const event = new ShowToastEvent({
                        variant: 'warning',
                        message: 'No Triggers Found!',
                    });
                    this.dispatchEvent(event);
                }else{
                    console.log('result ==' + result);
                this.data = result;
                this.showTable = true;
                this.hidedatatable = false;
                this.showSpinner = false;
                }
                 
                
                
            })
            .catch(error => {
                this.showSpinner = false;
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
                // reset contacts var with null   
                this.data = null;
            });
    }

    getSelectedRows(event){
        this.collectselecteddata =  event.detail.selectedRows;
        sendForUpdate({
            triggers: this.collectselecteddata
            })
            .then(result => {

                if(result === success){
                    
                    const event = new ShowToastEvent({
                        variant: 'Success',
                        message: 'Triggers updated',
                    });
                    this.dispatchEvent(event);
                }
                
            })
            .catch(error => {
                this.showSpinner = false;
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);                
            });
    }

}