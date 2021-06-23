---
id: owners.md
---

# OWNERS 文件

OWNERS 文件用于实现 Milvus 项目代码提交的两阶段 Code Review。

我们在 Milvus 项目中使用 Kubernetes 社区的 [OWNERS 文件](https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md)和 [Prow](https://github.com/kubernetes/test-infra/tree/master/prow)。，目的是列出每一部分代码/内容的负责人以及实现两阶段 Code Review。GitHub 原生提供的 [CODEOWNER 文件](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners) 我们使用过一段时间，遇到的问题是当 codeowner 设置的较少时 code review 工作量很重，当 codeowner 设置的较多时某个 PR 可能并没有被关键的 codeowner 看到就已经被机器人合并进去了。后来我们看到了 Kubernetes 社区的 Code Review 流程，这解决了我们的问题，我们决定使用这个流程。

OWNERS 文件功能我们目前没有完全使用，以下将会描述与 Milvus 社区有关的内容。



## OWNERS 文件内容

OWNERS 文件符合 YAML 格式，并且支持以下关键字：

-   `approvers`：Code Maintainer 的 GitHub 用户名列表，可以在 PR 中使用 `/approve` 命令
-   `labels`：自动为该 PR 添加的 GitHub Label 列表
-   `reviewers`：Code Reviewer 的 GitHub 用户名列表，可以在 PR 中使用 `/lgtm` 命令



在 Milvus 项目中，常见的 OWNERS 文件格式如下：

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

这个配置文件意味着：如果一个 PR 修改了这个目录的文件，会自动地被加上 `component/proxy` Label，并且在收到 `reviewers` 列表中用户评论的 `/lgtm` 和 `approvers` 列表中用户评论的 `/approve` 后才可以被自动合并。



## Code Review 流程

-   作者提交了一个 PR
-   阶段 0：机器人自动地在 PR 上设置 Reviewer 和 Approver
    -   从 OWNERS 文件中最近修改过该文件的用户中选出
    -   选择出至少两个 reviewers ，并且 PR 中 @他们
    -   从每个 OWNERS 文件中选择一个 approvers，并且在 PR 中 @他们
-   阶段 1：Reviewer 审阅 PR 内容
    -   Reviewer 检查代码质量、正确性、风格等
    -   除了作者外的 milvus-io 组织中任何人都能作为 Reviewer
    -   如果 Reviewer 觉得这个 PR 的内容没有问题，他可以评论 `/lgtm`，如果他改变了主意，可以通过评论 `/lgtm cancel` 来取消这次 Review
    -   一旦有一个 Reviewer 评论了 `/lgtm`，Prow 就会给这个 PR 加上一个 `lgtm` Label
-   阶段 2：Approver 批准这个 PR
    -   只有在相关 OWNERS 文件列出的 Approver 才能够批准这个 PR（包括作者自身）
    -   Approver 这个 PR 中的依赖关系、前向/后向兼容性、API 等
    -   如果 Approver 觉得这个 PR 的内容没有问题，他可以评论 `/approve`，如果他改变了主意，可以通过评论 `/approve cancel` 来取消这次 Approve
    -   Prow 更新它在 PR 中的评论，指明还需要哪些 Approver 的审批
    -   一旦所有的 Approver 评论了 `/approve`，Prow 就会给这个 PR 加上一个 `approved` Label
-   阶段 3：PR 被自动合并
    -   如果这些检查条件都满足：
        -   所有必须的 Label 都存在（`lgtm`、`approved`、`ci-passed`）
        -   没有任何阻止合并的 Label（`do-not-merge/hold` 等）
    -   如果 Prow 上目前没有正在排队的任务
    -   这个 PR 会被自动合并



## OWNERS 文件维护

所有的 OWNERS 都应当被定期维护。

对于 OWNERS 文件中的内容，我们鼓励所有人通过 PR 自我提名、自我删除。

我们应当努力地去

-   增加 OWNERS 文件的数量
-   向 OWNERS 文件中添加新人
-   确保 OWNERS 文件中只包含 milvus-io 组织成员
-   确保 OWNERS 文件中只包含积极参与的人
-   从 OWNERS 文件中删除不活跃的人

