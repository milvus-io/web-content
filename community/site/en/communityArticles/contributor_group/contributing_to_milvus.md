---
id: contributing_to_milvus.md
---

# Contributing Code

Milvus is an open source project and we welcome every contributor. Contributions to Milvus are expected to adhere to our [Code of Conduct](code_of_conduct.md).

This document outlines the conventions about development workflow, commit message formatting, best practices, and other resources you may need while contributing code to Milvus.  [File an issue](https://github.com/milvus-io/community/issues/new) or reach out to our engineering team at [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) if you encounter any problem in participating in contribution to Milvus.

## Before You Start/Quick Start

For more instruction on setting up your development environment, refer to [Milvus Development Guide](https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md).

## GitHub Workflow

Generally, we follow the "fork-and-pull" GitHub workflow.

1. [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) the repo on GitHub;
2. [Commit](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/committing-changes-to-a-pull-request-branch-created-from-a-fork) changes to your own branch;
3. Submit a [pull request (PR)](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) so that we can review your changes.

> Remember to [sync your forked repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced) *before* submitting proposed changes upstream.

See [Make Your First Contribution](making_your_first_contributions.md) for detailed instructions.

### Prow robot

To manage the stadard GitHub PR process, the Milvus project integrates a prow robot (a Kubernetes-based CI/CD system), which will automatically add labels and assign reviewers to your PR. You may also use commands in comment to manage the process. See [Command Reference](https://prow.zilliz.cc/command-help) for more information.

### PR Troubleshooting

Below are the common issues you may encounter in a PR and the corresponding solutions:

- DCO check failed - See [DCO page](https://github.com/apps/dco) to troubleshoot the problem.

- Test cases failed - Deal with the test cases that fail on your PR, or re-run jobs to solve the problem if the test cases are irrelevant to the changes you introduced.

## Code Review

Eligible reviewers will be assigned to your PR once it is opened for a thorough code review, looking at correctness, bugs, opportunities for improvement, documentation and comments, and style.

> If your PR does not get a response, you can find corresponding reviewers in the [#pr-reviews](https://milvusio.slack.com/messages/pr-reviews) channel on Slack.

### Style Reference

Keeping a consistent style for code, code comments, commit messages, and PR descriptions will greatly accelerate your PR review process. We highly recommend you refer to and comply to the following style guides when you put together your pull requests:

- Coding style: refer to the [Effictive Go Style Guide](https://golang.org/doc/effective_go)

- Commit message and PR description style: refer to [good commit messages](https://chris.beams.io/posts/git-commit)

### Best Practices

Below, we listed some tips for you while contributing code to Milvus:

- Divide a large change into a logical series of smaller ones, each of which is an easily understandable patch.

- Squash your commits to help us maintain a clearer Git history.

- Write clear and meaningful Git commit messages.

- Do not include `@someone` or `fixes #<issue-number>` keywords in your commit messages. State them in the PR description instead.

- Compile a clear and detailed PR description explaining the reasons for the changes, and ensure that there is sufficient information for the reviewer to understand your PR.

- If your PR *completely* fixes a specific issue, include `fixes #<issue-number>` in the PR body. This will automatically close the issue you mentioned when the PR is merged.

- Assign appropriate reviewers to your PR under the guidance of the robot in your PR page.

## Testing

It is contributors' responsibility to ensure that the submitted code changes pass the tests. Contact @milvus-io/sig-testing in comment for help if you encounter a problem.

Code contributed to Milvus will need to complete a variety of tests, each of which has a different objective:

- Unit tests: Verifies if functions operate as expected. Golang includes an in-built ability for unit testing via [testing](https://golang.org/pkg/testing/) package. Each PR has to pass all unit tests before it can be merged. Each unit test code is stored together with the corresponding Golang file, for example: the functions in **milvus/internal/allocator/global_id.go** will be tested in **milvus/internal/allocator/global_id_test.go**.

- Integration tests: A subset of the end-to-end test to ensure that the PR can be merged with efficiency. These tests are written in Python, stored under the **milvus/tests/python_test** and **milvus/tests20/python_client** directories. Run integration tests:

```
pytest --tags=smoke .
```

- End-to-end tests: The complete functional test cases. These tests are written in Python, stored under the **milvus/tests/python_test** and **milvus/tests20/python_client** directories. Run end-to-end tests:

```
pytest .
```

Continuous integration will run unit tests and integration tests on PRs, and the results will be updated in GitHub Pull Request status. Any failure will block the code merging.


