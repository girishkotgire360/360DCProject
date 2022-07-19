trigger accountTriggers2 on Account (before insert ) {       
    if(trigger.isInsert && trigger.isBefore){
        accountTriggerControllerClass.updateAccountBillingToShipping(trigger.new);
    }
}