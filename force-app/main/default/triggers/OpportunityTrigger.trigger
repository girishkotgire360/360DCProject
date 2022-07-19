trigger OpportunityTrigger on Opportunity (before insert) {
	system.debug('Opportunity Trigger fired');
}