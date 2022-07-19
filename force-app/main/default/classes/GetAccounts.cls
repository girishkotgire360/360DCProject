public class GetAccounts {
	@future 
    public static void getRandomAccounts(){
        system.debug('In future method');
        System.enqueueJob(new QueueableClass());
    }
}