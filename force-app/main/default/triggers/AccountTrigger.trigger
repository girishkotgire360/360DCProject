trigger AccountTrigger on Account (before insert) {
	system.debug('Account Trigger fired');
}