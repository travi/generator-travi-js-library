Feature: Files

  Scenario: core file list
    When the generator is run
    Then the core files should be present
    # And the core dependencies will be installed