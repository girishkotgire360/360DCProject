public with sharing class accountTriggerControllerClass {
    
    public static void updateAccountBillingToShipping(List<Account> accTrigger){
        for(account acc : accTrigger){
            if(acc.BillingCity !=null && acc.BillingCity != acc.ShippingCity && acc.ShippingCity == null ){
                acc.ShippingCity = acc.BillingCity ;
            }
            if(acc.BillingCountry !=null && acc.BillingCountry != acc.ShippingCountry && acc.ShippingCountry == null ){
                acc.ShippingCountry = acc.BillingCountry ;
            }
            if(acc.BillingState !=null && acc.BillingState != acc.ShippingState && acc.ShippingState == null ){
                acc.ShippingState = acc.BillingState ;
            }
            if(acc.BillingStreet !=null && acc.BillingStreet != acc.ShippingStreet && acc.ShippingStreet == null ){
                acc.ShippingStreet = acc.BillingStreet ;
            }
            if(acc.BillingPostalCode !=null && acc.BillingPostalCode != acc.ShippingPostalCode && acc.ShippingPostalCode == null ){
                acc.ShippingPostalCode = acc.BillingPostalCode ;
            }
        }
    }
   
}