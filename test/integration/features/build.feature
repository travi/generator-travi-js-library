Feature: Grunt Build

  Scenario: gates
    When the generator is run
    Then the gates task is configured to lint
