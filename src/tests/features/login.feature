Feature: User Authentication tests

    Background:
        Given user navigates to the application
        And user clicks on the login link

    @smoke @reg
    Scenario: Login should succeed
        Given user enter the username as "ortoni"
        And user enter the password as "Pass1234"
        When user click on the login button
        Then login should be success


