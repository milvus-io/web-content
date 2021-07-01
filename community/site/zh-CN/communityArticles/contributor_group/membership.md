---
id: membership.md
---

# 社区成员

这篇文档列出了 Milvus 社区的各种角色及其职责。

| 角色               | 职责                   | 要求                                            | 定义                                                         |
| ------------------ | ---------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| Contributor        | 社区的贡献者           | 在 Milvus 项目或子项目做出过一次以上的贡献      | 在 milvus 仓库的 [All contributors 列表](https://github.com/milvus-io/milvus#all-contributors) 中列出 |
| Active Contributor | 社区活跃的贡献者       | 做出多次贡献后被 Reviewer 邀请                  | milvus-io GitHub 组织的成员                                  |
| Reviewer           | 审查其他成员的 PR      | 在任一仓库多次 Review 和贡献代码                | [OWNERS] 文件中 reviewers 字段                               |
| Maintainer         | 批准其他成员的 PR      | 经验丰富的 Reviewer，非常清楚地了解某一部分代码 | [OWNERS] 文件中 approvers 字段                               |
| TOC members        | 确保Milvus项目健康发展 | 对 Milvus 项目表现出责任感和出色的技术视野      |                                                              |



## Contributor

Milvus 社区欢迎各种类型的贡献，包括但不限于改进文档、改进代码、写新功能、为 Milvus 写博客等。无论贡献大小，只要为 Milvus 项目做过任何以上的贡献，就可以成为 Milvus Contributor。社区现有成员应当欢迎新的 Contributor 加入社区，帮助解决 PR 上遇到的问题，以及引导他到正确的文档和沟通渠道。

**定义在**： [All contributors 列表](https://github.com/milvus-io/milvus#all-contributors)

如果你为 Milvus 做了贡献却没有被列出，请[创建一个 Issue](https://github.com/milvus-io/community/issues/new)。



## Active Contributor

Active Contributor 是社区中继续活跃的贡献者，并因此被邀请加入 milvus-io 组织。Active Contributor 可以成为某一个 Issue 或者 PR 的负责人，可以通过加入 SIG 更加深入地参与 Milvus 的开发。

**定义在**： [milvus-io GitHub 组织成员](https://github.com/orgs/milvus-io/people)

**要求**

-   在 GitHub 上打开账号的两步验证
-   在 Milvus 项目/社区中做出多次贡献
-   订阅邮件列表 [milvus-technical-discuss@lists.lfaidata.foundation](mailto:milvus-technical-discuss@lists.lfaidata.foundation)
-   在一个或多个的子项目持续活跃



## Reviewer

Reviewer 负责审查代码质量和正确性，他们需要对负责的代码内容非常了解。

**定义在**：每个仓库的 OWNERS 文件的 reviewers 字段中

**要求**

-   成为 Active Contributor 3 个月以上的时间
-   参与 5 个以上 PR 的审查
-   在这个目录下有 20 个以上的 commit 贡献
-   由 Maintainer 或者 TOC 成员提名



## Maintainer

Maintainer 负责审查和批准代码提交，主要考虑代码的依赖关系、前向/后向兼容，API等。

**定义在**：每个仓库的 OWNERS 文件的 approvers 字段中

**要求**

-   成为 Reviewer 3 个月以上的时间
-   作为主要 Reviewer 参与 10 个以上 PR 的审查
-   这个目录代码的主要贡献者
-   由 Maintainer 或者 TOC 成员提名



## TSC(Technical Steering Committee) members

TSC 成员从社区中投票选出，主要负责以下内容：

-   确保 Milvus 项目健康发展
-   为社区确定技术方向和事情的优先级
-   提名以及指导 Maintainer、Reviewer 和其他贡献者

**定义在**：https://github.com/orgs/milvus-io/teams/tsc
