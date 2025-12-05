---
id: install-overview.md
summary: >-
  Milvus 是一个高性能、可扩展的向量数据库。它支持各种规模的用例，从在 Jupyter 笔记本中本地运行的演示到处理数百亿向量的大规模
  Kubernetes 集群。目前，Milvus 有三种部署选项：Milvus Lite、Milvus Standalone 和 Milvus
  Distributed。
title: Milvus 部署选项概览
---

<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvus 部署选项概述<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Milvus 是一个高性能、可扩展的向量数据库。它支持各种规模的用例，从在 Jupyter 笔记本中本地运行的演示到处理数百亿向量的大规模 Kubernetes 集群。目前，Milvus 有三种部署选项：Milvus Lite、Milvus Standalone 和 Milvus Distributed。</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是一个 Python 库，可导入到您的应用程序中。作为 Milvus 的轻量级版本，它非常适合在 Jupyter 笔记本或资源有限的智能设备上运行快速原型。Milvus Lite 支持与其他 Milvus 部署相同的 API。与 Milvus Lite 交互的客户端代码也可以与其他部署模式下的 Milvus 实例协同工作。</p>
<p>要将 Milvus Lite 集成到应用程序中，请运行<code translate="no">pip install pymilvus</code> 进行安装，并使用<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> 语句实例化一个带有本地文件的向量数据库，以持久化所有数据。更多详情，请参阅<a href="https://milvus.io/docs/milvus_lite.md">运行 Milvus Lite</a>。</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus Standalone 是单机服务器部署。Milvus Standalone 的所有组件都打包到一个<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 映像</a>中，因此部署非常方便。如果你有生产工作负载，但不想使用 Kubernetes，那么在内存充足的单机上运行 Milvus Standalone 是一个不错的选择。此外，Milvus Standalone 通过主从复制支持高可用性。</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Milvus Distributed 可部署在<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>集群上。这种部署采用云原生架构，摄取负载和搜索查询分别由独立节点处理，允许关键组件冗余。它具有最高的可扩展性和可用性，并能灵活定制每个组件中分配的资源。Milvus Distributed 是在生产中运行大规模向量搜索系统的企业用户的首选。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">为您的使用案例选择正确的部署方式<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>部署模式的选择通常取决于应用程序的开发阶段：</p>
<ul>
<li><p><strong>用于快速原型开发</strong></p>
<p>如果您想快速构建原型或用于学习，如检索增强生成（RAG）演示、人工智能聊天机器人、多模态搜索，Milvus Lite 本身或 Milvus Lite 与 Milvus Standalone 的组合都很适合。您可以在笔记本中使用 Milvus Lite 进行快速原型开发，并探索各种方法，例如 RAG 中的不同分块策略。您可能希望在小规模生产中部署用 Milvus Lite 构建的应用程序，为真实用户提供服务，或在更大的数据集（如超过几百万个向量）上验证想法。Milvus Standalone 是合适的选择。Milvus Lite 的应用逻辑仍可共享，因为所有 Milvus 部署都有相同的客户端应用程序接口。Milvus Lite 中存储的数据也可通过命令行工具移植到 Milvus Standalone 中。</p></li>
<li><p><strong>小规模生产部署</strong></p>
<p>对于早期阶段的生产，当项目仍在寻求产品与市场的契合，敏捷性比可扩展性更重要时，Milvus Standalone 是最佳选择。如果有足够的机器资源，它仍然可以扩展到 1 亿向量，同时对 DevOps 的要求也比维护 K8s 集群低得多。</p></li>
<li><p><strong>大规模生产部署</strong></p>
<p>当你的业务快速增长，数据规模超过单台服务器的容量时，是时候考虑使用 Milvus Distributed 了。你可以继续使用Milvus Standalone作为开发或暂存环境，并运行Milvus Distributed的K8s集群。这可以支持你处理数百亿个向量，还能根据你的特定工作负载（如高读取、低写入或高写入、低读取的情况）灵活调整节点大小。</p></li>
<li><p><strong>边缘设备上的本地搜索</strong></p>
<p>对于在边缘设备上通过私人或敏感信息进行搜索，您可以在设备上部署 Milvus Lite，而无需依赖基于云的服务来进行文本或图像搜索。这适用于专有文档搜索或设备上对象检测等情况。</p></li>
</ul>
<p>Milvus 部署模式的选择取决于项目的阶段和规模。Milvus 提供灵活而强大的解决方案，可满足从快速原型开发到大规模企业部署的各种需求。</p>
<ul>
<li><strong>Milvus Lite</strong>建议用于较小的数据集，多达几百万个向量。</li>
<li><strong>Milvus Standalone</strong>适用于中型数据集，可扩展至 1 亿向量。</li>
<li><strong>Milvus Distributed 专为</strong>大规模部署而设计，能够处理从 1 亿到数百亿载体的数据集。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>选择适合您使用情况的部署选项</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">功能比较<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table>
<thead>
<tr><th>功能</th><th>Milvus Lite</th><th>Milvus 单机版</th><th>分布式</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客户端软件</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>数据类型</td><td>密集向量<br/>稀疏向量<br/>二进制向量<br/>布尔型<br/>整数<br/>浮点型<br/>VarChar<br/>数组<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二进制向量<br/>布尔型<br/>整数<br/>浮点型<br/>VarChar<br/>数组<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二进制向量<br/>布尔值<br/>整数<br/>浮点<br/>VarChar<br/>数组<br/>JSON</td></tr>
<tr><td>搜索功能</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>通过主键获取实体<br/>混合搜索</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>通过主键获取实体<br/>混合搜索</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>通过主键获取实体<br/>混合搜索</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高级数据管理</td><td>不适用</td><td>访问控制<br/>分区<br/>Partition Key</td><td>访问控制<br/>分区<br/>Partition Key<br/>物理资源分组</td></tr>
<tr><td>一致性级别</td><td>强</td><td>强<br/>有界停滞<br/>会话<br/>最终</td><td>强<br/>有界稳定性<br/>会话<br/>最终</td></tr>
</tbody>
</table>
