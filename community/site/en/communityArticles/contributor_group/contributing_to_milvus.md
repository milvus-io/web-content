---
id: contributing_to_milvus.md
---

# Contributing to Milvus

An entrypoint to getting started with contributing to the Milvus project.

We hope that Milvus can be promoted in a community way. If you encounter any unsuccessful situations during the participation process, please let us know.



## Communication

Any problems encountered can be discussed under Issue on GitHub. If this Issue does not exist, create one!



## GitHub flow

To check out code to work on, please refer to [the GitHub Workflow Guide](https://www.kubernetes.dev/docs/guide/github-workflow).

In simple words, making changes on a branch that created from the master branch, create a pull request on GitHub, and then these changes will be integrate into Milvus if pull request be merged.



## Create a Pull Request

On GitHub, the code is merged by creating a Pull Request (generally referred to as a PR), and the process is no different from the standard PR process on GitHub. In addition, the Milvus project also integrates a Prow robot (from Kubernetes) to help the operation of the PR process.

As long as you have created a PR, you will have seen this bot on GitHub, it will automatically add some labels to your PR, and suggest several reviewers. In addition to these automatic actions, you can also do more by using some commands in the comments. For commands, please refer to [Command Reference](https://prow.zilliz.cc/command-help).

Common new contributor PR issues are:

-   DCO check failed. See the [DCO page](https://github.com/apps/dco) to troubleshooting help

-   Dealing with test cases which fail on your PR, unrelated to the changes you introduce. Sse re-run to solve the problem
-   Include mentions (like @person) and [keywords](https://help.github.com/en/articles/closing-issues-using-keywords) which could close the issue (like fixes #xxxx) in commit messages



## Code Review

Code review is a necessary step of PR, the purpose is to ensure that the idea behind the code is reasonable, and the modification is correct and complete.

To make it easier for your PR to receive reviews, consider the reviewers will need you to:

-   follow the [Effictive Go](https://golang.org/doc/effective_go)

-   write [good commit message](https://chris.beams.io/posts/git-commit)

-   break large changes into a logical series of smaller patches which individually make easily understandable changes, and in aggregate solve a broader issue

-   label PRs with appropriate reviewers: to do this read the messages the bot sends you to guide you through the PR process

Note: If your PR does not get a response, you can find Reviewer in the [#pr-reviews](https://milvusio.slack.com/messages/pr-reviews) channel on Slack.



## Best Practice

-   Write clear and meaningful git commit messages

-   If the PR will *completely* fix a specific issue, include `fixes #123` in the PR body (where 123 is the specific issue number the PR will fix. This will automatically close the issue when the PR is merged
-   Make sure you don’t include `@mentions` or `fixes` keywords in your git commit messages. These should be included in the PR body instead

-   Please squash your commits so that we can maintain a clearer git history

-   Make sure you include a clear and detailed PR description explaining the reasons for the changes, and ensuring there is sufficient information for the reviewer to understand your PR



## Testing

It is the responsibility of the contributor to ensure that the submitted code changes pass the test. If you encounter a problem, you can contact @milvus-io/sig-testing for help.

Milvus contains a variety of tests, and different types of test cases have different test objectives:

-   Unit test: Used to verify that functions operates as expected. Golang includes a native ability for unit testing via the [testing](https://golang.org/pkg/testing/) package. Each PR needs to pass all unit tests before it can be merged into the master branch. The unit test code is next to each Golang file, for example: the functions in `milvus/internal/allocator/global_id.go` will be tested in `milvus/internal/allocator/global_id_test.go`.

-   Integration test: These are a subset of the end-to-end test, which aims to ensure that the PR can be merged into the mater branch more quickly. These tests is written in Python, stored in the `milvus/tests/python_test` and `milvus/tests20/python_client` directories, and can be run through `pytest --tags=smoke .`.

-   End-to-end testing: complete functional test cases. These tests is written in Python, stored in the `milvus/tests/python_test` and `milvus/tests20/python_client` directories, and can be run by `pytest .` .

Continuous integration will run unit tests and integration tests on PRs, and the results will be updated in PR. Any failure will block the code merging.



## Issue triage

You may notice that there are many [open issues](https://github.com/milvus-io/milvus/issues) in the Milvus repository. Helping to manage or triage these issues can be a great contribution and an great opportunity to learn about various areas of the project. Triaging is the word we use to describe the process of adding multiple types of descriptive labels to GitHub issues, in order to speed up routing issues to the right folks.

