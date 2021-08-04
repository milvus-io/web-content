---
id: contributing_to_milvus.md
---

# 贡献代码

Milvus 是一个开源项目，我们欢迎每一位贡献者，也希望所有贡献者都遵守我们的 [行为准则](code_of_conduct.md)。

本篇文档详细说明了开发工作流程中的惯例、提交消息格式、最佳实践以及在向 Milvus 贡献代码时可能需要的其他资源。 如果在参与 Milvus 贡献时遇到任何问题，欢迎 [提交 GitHub Issue](https://github.com/milvus-io/community/issues/new) 或通过 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 联系我们的工程师团队。

## 开始之前/快速开始

关于搭建开发环境，参见 [Milvus Development Guide](https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md)。

## GitHub 工作流程

一般情况下，我们遵循 "fork-and-pull" 工作流程。

1. 将 GitHub 上的 Milvus 公有库 [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) 至自己的账户中；
2. 在私有库中新建分支，并在其中 [提交更改](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/committing-changes-to-a-pull-request-branch-created-from-a-fork)；
3. 提交 [pull request（PR）](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests)，等待审阅以及合并。

> *在向上游提交建议的更改之前*，[同步](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced) 你的私有 Milvus 库。

更多指引，参考 [成为 Milvus 贡献者](making_your_first_contributions.md)。

### prow 机器人

为了管理 GitHub PR 标准流程，Milvus 项目集成了一个 prow 机器人（基于 Kubernetes 的 CI/CD 系统）。它会自动为你的 PR 添加标签并分配审阅者。 你还可以在注释中使用命令行来管理该过程。 详细信息见 [命令参考](https://prow.zilliz.cc/command-help)。

### PR 常见疑难解答

以下是在 PR 中可能遇到的常见问题以及相应的解决方案：

- DCO 检查失败：请参阅 [DCO 页面](https://github.com/apps/dco) 以解决问题。

- 测试用例失败：调整代码以通过测试用例。如果测试用例与你引入的代码更改无关，则通过 *re-run jobs* 以解决问题。

## 代码审查

PR 开启后，将会有审阅者对你的代码进行全面检查，检查内容涵盖思路正确性、bug、改进可能性、文档和注释，以及代码风格等方面。

> 如果你的 PR 长时间未得到回应，你可以在 Slack 的 [#pr-reviews](https://milvusio.slack.com/messages/pr-reviews) 频道中联系相关 reviwer。

### 风格参考

保持代码、注释、commit message 和 PR 描述的风格一致可以大大加快你的 PR 审查流程。我们强烈建议你在开启 PR 时参考并遵守以下风格指南：

- 代码风格：参考 [Effictive Go Style Guide](https://golang.org/doc/effective_go)

- Commit message 和 PR 描述的风格： 参考 [good commit messages](https://chris.beams.io/posts/git-commit)

### 最佳实践

以下，我们列出了一些向 Milvus 贡献代码时可以用到的技巧：

- 将一个大的改动分成一系列的小改动，每个小改动都是一个易于理解的部分。

- 合并所有 commit，帮助我们维持清晰的 Git 历史记录。

- 保持 commit message 简明扼要。

- 不要在提交消息中包含 `@someone` 或 `fixes #<issue-number>` 等关键词。 应当在 PR 描述中说明它们。

- 编写清晰详细的 PR 描述，解释代码更改的原因，并确保有足够的信息供审阅者了解你的 PR。

- 如果你的 PR 完全修复了某个问题，请在 PR 正文中填写 `fix #<issue-number>` 关键词。 这将在 PR 合并时自动关闭你提到的问题。

- 在 PR 页面中机器人的引导下，为你的 PR 分配合适的审阅者。

## 测试

贡献者有责任确保提交的代码更改通过测试。 如果遇到问题，在评论中联系 @milvus-io/sig-testing 寻求帮助。

贡献给 Milvus 的代码需要通过多种测试，每个测试都有不同的目标：

- 单元测试：用以验证功能是否按预期运行。 Golang 包含通过 [testing](https://golang.org/pkg/testing/) package 进行单元测试的内置功能。 每个 PR 必须通过所有单元测试才能合并。 每个单元测试代码都和对应的 Golang 文件一起存放，例如：**milvus/internal/allocator/global_id.go** 中的功能会在**milvus/internal/allocator/global_id_test.go** 中进行测试。

- 集成测试：端对端测试的一个子集，用以确保 PR 可以高效合并。 这些测试是用 Python 编写的，存储在 **milvus/tests/python_test** 和 **milvus/tests20/python_client** 目录下。 运行集成测试：

```
pytest --tags=smoke .
```

- 端对端测试：完整的功能测试用例。 这些测试是用 Python 编写的，存储在 **milvus/tests/python_test** 和 **milvus/tests20/python_client** 目录下。 运行端对端测试：

```
pytest .
```

持续集成（Continuous integration，即 CI）将在 PR 上运行单元测试和集成测试，其结果将在 GitHub Pull Request 状态中更新。 任何测试失败都会阻止代码合并。
