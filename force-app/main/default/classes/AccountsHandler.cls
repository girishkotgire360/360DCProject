public class AccountsHandler {
	@auraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        system.debug('Girish on LWC');
        return [Select Id,Name,Rating,AnnualRevenue,Industry,Type From Account];
    }
}