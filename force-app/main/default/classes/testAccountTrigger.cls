@istest
public class testAccountTrigger {
    //Write a trigger on Account, when an account is inserted,
    // automatically account billing address should populate into the account shipping address
    
    
    @isTest
    public static void handleAccountAddress(){
        list<Account> accBlankList = new list<Account> () ;
        for(integer i = 1; i<=200; i++){
            Account acc = new account() ;
            acc.Name = 'test'+i ;
            acc.BillingCity= 'AB';
            acc.BillingCountry='Ab';
            acc.BillingPostalCode= '123456';
            acc.BillingStreet='xyz';
            acc.BillingState = 'NY';
            accBlankList.add(acc);
        }
        test.startTest();
        accountTriggerControllerClass.updateAccountBillingToShipping(accBlankList);
        test.stopTest();
        
    } 
    
    
}