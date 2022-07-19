import { LightningElement, api, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountsHandler.getAccounts';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
const COLUMNS = [
    
    {label:'Account Name',fieldName:'Name'},
    {label:'Industry',fieldName:'Industry'},
    {label:'Rating',fieldName:'Rating'},
    {label:'AnnualRevenue',fieldName:'AnnualRevenue'},
    {label:'Type',fieldName:'Type'}
];

export default class ShowAccounts extends LightningElement {
    
    tableColumns = COLUMNS;
    @track data;

    @wire(getAccounts) 
    tabledata;

    connectedCallback(){
        getAccounts()
        .then(result =>{
            console.log('Girish:' + result);
            this.data = result;
        }).catch(error=>{

        })
    }
    
}