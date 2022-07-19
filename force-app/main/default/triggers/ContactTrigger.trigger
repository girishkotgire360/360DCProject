trigger ContactTrigger on Contact (before insert) {
	system.debug('Contact Trigger fired');
}