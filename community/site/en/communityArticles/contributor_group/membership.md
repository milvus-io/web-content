---
id: membership.md
---

# Membership

This doc outlines the various responsibilities of contributor roles in The Milvus Project.

| Role             | Responsibilities                              | Requirements                                                 | Defined by                   |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| Member           | Active contributor in the community           | Invited by reviewer and multiple contributions to the project | milvus-io GitHub org member  |
| Reviewer         | Review contributions from other members       | History of review and authorship in a subproject             | [OWNERS] file reviewer entry |
| Approver         | Contributions acceptance approval             | Highly experienced active reviewer and contributor to a subproject | [OWNERS] file approver entry |
| Subproject owner | Set direction and priorities for a subproject | Demonstrated responsibility and excellent technical judgement for the subproject |                              |



## New Contributor

New contributors should be welcomed to the community by existing members, helped with PR workflow, and directed to relevant documentation and communication channels.



## Member

Members are continuously active contributors in the community. They can have issues and PRs assigned to them, participate in SIGs through GitHub teams, and pre-submit tests are automatically run for their PRs. Members are expected to remain active contributors to the community.



## Reviewer

Reviewers are able to review code for quality and correctness on some part of a subproject. They are knowledgeable about both the codebase and software engineering principles.



## Approver

Code approvers are able to both review and approve code contributions. While code review is focused on code quality and correctness, approval is focused on holistic acceptance of a contribution including: backwards / forwards compatibility, adhering to API and flag conventions, subtle performance and correctness issues, interactions with other parts of the system, etc.



## Subproject Owner

Subproject Owners are the technical authority for a subproject in the Milvus project. They *MUST* have demonstrated both good judgement and responsibility towards the health of that subproject. Subproject Owners *MUST* set technical direction and make or approve design decisions for their subproject - either directly or through delegation of these responsibilities.