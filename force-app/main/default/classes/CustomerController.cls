public with sharing class CustomerController {
    @AuraEnabled(cacheable=true scope='global')
    public static Customer__c[] getAllCustomers() {
        return [
            SELECT
                Id,
                Name__c,
                Surname__c,
                Phone__c,
                Email__c
            FROM Customer__c
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }

    
}
