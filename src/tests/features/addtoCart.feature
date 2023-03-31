Feature: User adds product to the card

    Background: 
        Given user navigates to the application
        And user clicks on the login link


    Scenario Outline: User adds a new product to the cart
        Given user enter the username as "<username>"
        And user enter the password as "<password>"
        And user click on the login button
        And user searches for a new "<book>"
        When user adds the book to the cart
        Then the cart badge should get updated

        Examples:
            |username|password |book           |
            |ortoni  |pass1234$|Roomies        |
            |ortonikc|pass1234 |The Simple Wild|
