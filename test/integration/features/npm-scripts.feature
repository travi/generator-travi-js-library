Feature: NPM Scripts

  Scenario: npm test
    When the generator is run
    And npm "test" is run
    Then the result is successful
