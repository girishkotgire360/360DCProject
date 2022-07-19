trigger CaseTrigger on Case (before insert) {
	system.debug('Case Trigger fired');
}