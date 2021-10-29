name: 🚀  General question
description: Any question that isn't answered in the docs
labels: []
assignees:
 
body:
- type: markdown
  attributes:
    value: |
      > Note: This repository is ONLY used to solve issues related to DOCS.
      > For other issues, please move to [other repositories](https://github.com/milvus-io/).
      Before submitting your question, make sure you have:

      - Googled your question.
      - Searched the [GitHub issues](https://github.com/milvus-io/docs/issues).
      - Read the [documentation](https://github.com/milvus-io/docs)

- type: checkboxes
  attributes:
    label: Is there an existing issue for this?
    description: Please search to see if an issue related to this feature request already exists.
    options:
    - label: I have searched the existing issues
      required: true
      
- type: textarea
  attributes:
    label: "What is your question?"
    description: Add A Question here .....
  validations:
    required: true
