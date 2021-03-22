---
id: announcement.md
---

# Milvus v1.0 已发布

今天，我们很高兴地宣布 Milvus 1.0 版本的发布。经过了 8 个月与数百名 Milvus 社区用户不断地测试和试验后，现在 Milvus v0.10.x 已足够稳定，该发布基于 Milvus v0.10.6 的 Milvus v1.0 了。

Milvus v1.0 具有以下功能：

- 支持主流的相似度计算方式，包括欧氏距离 (L2)、内积 (IP)、汉明距离、杰卡德距离等。

- 与 SOTA ANN 算法的集成和优化，包括 Faiss，Hnswlib，Annoy，NSG 等。

- 可通过 Mishards 集群分片中间件进行横向扩展。

- 支持 AI 场景中常用的处理器，包括 X86，Nvidia GPU，Xilinx FPGA 等。

> 请参见[发版说明](https://www.milvus.io/cn/docs/v1.0.0/release_notes.md)，了解更多有关 v1.0 的功能。

<br/>

Milvus 是一个正在持续发展的开源软件（OSS）项目。虽然项目后续会不断迭代，我们仍认为第一个主要发行版本对我们的社区用户至关重要，原因如下：

- 社区将长期将支持 Milvus v1.0。

- 一个稳定版的 Milvus 可以更轻松地集成到 AI 生态系统中。

- Milvus 项目将进一步向新的方向演化。

## 长期支持 （LTS）
Milvus v1.0 是我们的第一个长期支持（LTS）版本。 Milvus 社区将在 2024 年 12 月 31 日之前为 Milvus v1.0 提供问题修复支持（由 Zilliz 公司赞助）。v1.x 版本中将不会添加新功能。

更多有关 Milvus 版本发布策略的详细说明，请参见[《Milvus发行指南》](https://www.milvus.io/docs/v1.0.0/milvus_release_guideline.md)。

## 工具链与 AI 生态系统整合
Milvus 引擎的开发正在快速迭代，但我们尚未在 Milvus 工具链的开发上投入很多资源。从 v1.0 开始，我们计划为 Milvus 用户开发必要的工具和实用程序。请在[工具链兴趣小组](https://www.milvus.io/docs/v1.0.0/sig_tool.md)中找到更多详细信息。

稳定的版本使 Milvus 与 AI 生态系统的集成变得轻而易举。现在，我们正在寻求社区与其他 AI OSS 社区之间的更多合作。我们也鼓励在 Milvus 中支持新的 AI 芯片 （ASIC）。如果您有兴趣，请查看 ASIC 兴趣小组。


## Milvus 的未来
 

我们认为，Milvus 的光明的发展前景取决于以下因素：

- Milvus 社区开发人员的积极贡献。

- 能够与任何云原生环境集成。

 <br/>

为了不断培育和发展 Milvus 社区，我们制定了社区宪章 ，据此做出了一些技术决策，以吸引更多的参与者加入社区。

- 我们将使用 Golang 进行 Milvus 引擎的开发，而 ANNS 算法组件仍将使用 C ++ 开发。

- 展望未来，分布式/集群/云 Milvus 将尽可能使用现有的云组件。

 <br/>

让我们共同努力，为 AI 构建下一代云数据管理解决方案！

