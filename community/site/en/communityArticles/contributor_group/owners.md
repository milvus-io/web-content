---
id: owners.md
---

# OWNERS Files

OWNERS files are used to implement the two-phase code review process.

We used the [OWNERS file](https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md) and [Prow](https://github.com) (opensource by Kubernetes) in The Milvus Project in order to implement a two-phase code review. 

We have used the [GitHub's CODEOWNER file](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners) for months. The problem we encountered is that the code review workload is very heavy when there are only a few code owners. Once we set more code owners, a PR may be merged before being reviewed by a key reviewer. Later we saw the code review process in the Kubernetes community, which solved our problem, and we decided to use this process.

The OWNERS file function is currently not fully used. The following describes the content related to the Milvus community.



## OWNERS spec

OWNERS files are in YAML format and support the following keys:

-   `approvers`: a list of GitHub usernames or aliases that can `/approve` a PR
-   `labels`: a list of GitHub labels to automatically apply to a PR
-   `reviewers`: a list of GitHub usernames or aliases that are good candidates to `/lgtm` a PR



In the Milvus project, the common OWNERS file format is as follows:

```yaml
# order by contributions
reviewers:
  - DragonDriver
  - czs007
  - FluorineDog
  - godchen0212
  - neza2017
  - xiaocai2333

approvers:
  - czs007
  - neza2017
  - scsven

labels:
- component/proxy
```

This OWNERS file means: Once a PR modifies a file in the same directory with this OWNERS file, it is labeled with `component/proxy` automatically, and it will be merged when it gets `/lgtm` from someone in the **reviewers** list and `/approve` from someone in the **approvers** list.



## Code Review Process

-   The **author** submits a PR
-   Phase 0: Automation suggests **reviewers** and **approvers** for the PR
    -   Determines the set of OWNERS files nearest to the code being changed
    -   Chooses at least two suggested **reviewers**, trying to find a unique reviewer for every leaf OWNERS file, and requests their review on the PR
    -   Chooses suggested **approvers**, one from each OWNERS file, and list them in a comment on the PR

-   Phase 1：Humans review the PR
    -   **Reviewers** look for general code quality, correctness, sane software engineering, style, etc.
    -   Anyone in the organization can act as a **reviewer** with the exception of the individual who opened the PR
    -   If the code changes look good to them, a **reviewer** types `/lgtm` in a PR comment or review; if they change their mind, they `/lgtm cancel`
    -   Once a **reviewer** has `/lgtm`'ed, [prow](https://prow.zilliz.cc/) ([@sre-ci-robot](https://github.com/sre-ci-robot)) applies an `lgtm` label to the PR
-   Phase 2：Humans approve the PR
    -   Only people listed in the relevant OWNERS files can act as **approvers**, including the individual who opened the PR
    -   **Approvers** look for holistic acceptance criteria, including dependencies with other features, forwards/backwards compatibility, API and flag definitions, etc.
    -   If the code changes look good to them, an **approver** types `/approve` in a PR comment or review; if they change their mind, they `/approve cancel`
    -   [prow](https://prow.zilliz.cc/) ([@sre-ci-robot](https://github.com/sre-ci-robot)) updates its comment in the PR to indicate which **approvers** still need to approve
    -   Once all **approvers** (one from each of the previously identified OWNERS files) have approved, [prow](https://prow.k8s.io/) ([@k8s-ci-robot](https://github.com/k8s-ci-robot/)) applies an `approved` label
-   Phase 3: Automation merges the PR when all of the following are true：
    -   All required labels are present (eg: `lgtm`, `approved`, `ci-passed`)
    -   No blocking label is present (eg: `do-not-merge/hold`)
    -   There is no presubmit prow job configured for this repo



## Maintaining OWNERS files

OWNERS files should be regularly maintained.

We encourage people to self-nominate and self-remove from OWNERS files via PRs.

We should strive to:

-   grow the number of OWNERS files
-   add new people to OWNERS files
-   ensure OWNERS files only contain organization members
-   ensure OWNERS files only contain people who are actively contributing to or reviewing the code they own
-   remove inactive people from OWNERS files
