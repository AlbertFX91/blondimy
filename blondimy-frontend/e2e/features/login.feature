Feature: Login

   A login page which can signin a new user or login with his/her credentials

   Scenario: Login with wrong credentials
    Given I have navigated to the login view
    When I use wrong crendetials "wrong-user" and "wrong-password"
    Then an error message "Wrong credentials" is displayed

   Scenario: Login with correct credentials
    Given I have navigated to the login view
    When I use my correct credentials "testing" and "testing"
    Then I can see my home screen

   Scenario: Sign in a new user
    Given I have navigated to the login view
    When I click in the signin option
    And I enter my credentials "awesome-worker" and "my-secret"
    Then I can see my home screen 

   Scenario: Sign in with an username already used
    Given I have navigated to the login view
    When I click in the signin option
    And I use an used username as "testing"
    Then an error message "The username already exists" is displayed