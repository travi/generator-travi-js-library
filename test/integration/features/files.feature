Feature: Files

  Scenario: core file list
    When the generator is run
    Then the core files should be present
    And the core dependencies will be installed

  Scenario: populated project config
    Given the project-name prompt is populated with "foo-bar"
    When the generator is run
    Then the project-name of "foo-bar" is defined in the generated files
    And the test script is configured
    And the node version is set to "5.0"
    And the linter is configured

  Scenario: files ignored by git
    Given the generator is run
    Then git should ignore certain files by default
