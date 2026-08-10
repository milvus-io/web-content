---
id: install-overview.md
summary: >-
  Milvus 是一款高性能、可扩展的向量数据库。它支持各种规模的应用场景，从在 Jupyter Notebook
  中本地运行的演示，到处理数百亿个向量的大规模 Kubernetes 集群。目前，Milvus 提供三种部署方案：Milvus Lite、Milvus
  Standalone 和 Milvus Distributed。
title: Milvus 部署选项概述
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
    </button></h1><p>Milvus 是一款高性能、可扩展的向量数据库。它支持各种规模的应用场景，从在 Jupyter Notebook 中本地运行的演示，到处理数百亿个向量的大规模 Kubernetes 集群。目前，Milvus 提供三种部署选项：Milvus Lite、Milvus Standalone 和 Milvus Distributed。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是一个可导入到应用程序中的 Python 库。作为 Milvus 的精简版，它非常适合在 Jupyter Notebook 中进行快速原型开发，或在资源有限的智能设备上运行。 Milvus Lite 支持其他 Milvus 部署方式相同的 API。与 Milvus Lite 交互的客户端代码也可与其他部署模式下的 Milvus 实例配合使用。</p>
<p>要将 Milvus Lite 集成到您的应用程序中，请运行 `<code translate="no">pip install pymilvus</code> ` 进行安装，并使用 `<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` 语句基于本地文件实例化向量数据库，该文件将持久化所有数据。更多详细信息，请参阅《<a href="https://milvus.io/docs/milvus_lite.md">运行 Milvus Lite</a>》。</p>
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
    </button></h2><p>Milvus Standalone 是一种单机服务器部署方案。Milvus Standalone 的所有组件均打包在一个<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 镜像</a>中，便于部署。 如果您有生产环境的工作负载，但希望避免使用 Kubernetes，那么在内存充足的单台机器上运行 Milvus Standalone 是一个不错的选择。默认情况下，Milvus Standalone 使用<strong>Woodpecker</strong>（嵌入式）作为消息队列，因此无需单独运维消息服务。</p>
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
    </button></h2><p>Milvus Distributed 可部署在<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>集群上。该部署采用云原生架构，其中数据摄取负载和搜索查询由隔离的节点分别处理，从而为关键组件提供了冗余保障。它具备最高的可扩展性和可用性，同时允许灵活定制各组件的资源分配。 对于在生产环境中运行大规模向量搜索系统的企业用户而言，Milvus Distributed 是首选方案。默认情况下，Milvus Distributed 将<strong>Woodpecker</strong>作为消息队列运行，并作为独立服务与 Milvus 并行部署。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">根据您的用例选择合适的部署方式<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<li><p><strong>快速原型开发</strong></p>
<p>如果您希望快速构建原型或用于学习目的，例如检索增强生成（RAG）演示、AI 聊天机器人、多模态搜索，那么 Milvus Lite 本身或 Milvus Lite 与 Milvus Standalone 的组合都是合适的选择。 您可以在笔记本中使用 Milvus Lite 进行快速原型设计，并探索各种方法，例如 RAG 中的不同分块策略。如果您希望将使用 Milvus Lite 构建的应用程序部署到小规模生产环境中以服务真实用户，或者在更大规模的数据集（例如超过几百万个向量）上验证该想法，则 Milvus Standalone 是合适的选择。 由于所有 Milvus 部署都采用相同的客户端 API，因此 Milvus Lite 的应用逻辑仍可复用。此外，存储在 Milvus Lite 中的数据也可通过命令行工具迁移至 Milvus Standalone。</p></li>
<li><p><strong>小规模生产部署</strong></p>
<p>对于早期生产环境，当项目仍处于探索产品与市场契合度的阶段，且敏捷性比可扩展性更为重要时，Milvus Standalone 是最佳选择。在机器资源充足的情况下，它仍可扩展至 1 亿个向量，同时所需的 DevOps 工作量远低于维护 K8s 集群。</p></li>
<li><p><strong>大规模生产部署</strong></p>
<p>随着业务快速增长，数据规模超过单台服务器的容量，此时应考虑采用 Milvus Distributed。您可以继续在开发或预生产环境中使用 Milvus Standalone 以保持便利性，同时运维运行 Milvus Distributed 的 K8s 集群。 这种架构不仅能支持您处理数百亿向量，还能根据具体工作负载（例如高读取、低写入，或高写入、低读取等场景）灵活调整节点规格。</p></li>
<li><p><strong>边缘设备上的本地搜索</strong></p>
<p>若需在边缘设备上对私有或敏感数据进行搜索，您可在设备上部署 Milvus Lite，无需依赖云端服务即可进行文本或图像搜索。这适用于专有文档搜索或设备端物体检测等场景。</p></li>
</ul>
<p>Milvus 的部署模式选择取决于您项目的阶段和规模。从快速原型设计到大规模企业部署，Milvus 都能为各种需求提供灵活而强大的解决方案。</p>
<ul>
<li>对于规模较小、最多几百万个向量的数据集，建议使用<strong>Milvus Lite</strong>。</li>
<li><strong>Milvus Standalone</strong>适用于中等规模的数据集，可扩展至 1 亿个向量。</li>
<li><strong>Milvus Distributed</strong>专为大规模部署设计，能够处理从 1 亿到数百亿向量规模的数据集。</li>
</ul>
<p>无论采用何种部署模式，每个 Milvus 实例都依赖于消息队列、对象存储和元数据存储——默认使用<strong>Woodpecker</strong>、<strong>MinIO</strong> 和<strong>etcd</strong>。如需了解这些依赖项、进行配置调整或连接外部服务，请参阅<a href="/docs/zh/data-infra-integration-overview.md">“数据基础设施”</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>根据您的用例选择部署选项</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">功能对比<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>功能</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客户端库</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>数据类型</td><td>稠密向量<br/>稀疏向量<br/>二进制向量<br/>布尔值<br/>整数<br/>浮点数<br/>可变长度字符串<br/>数组<br/>JSON</td><td>稠密向量<br/>稀疏向量<br/>二进制向量<br/>布尔值<br/>整数<br/>浮点数<br/>VarChar<br/>数组<br/>JSON</td><td>稠密向量<br/>稀疏向量<br/>二进制向量<br/>布尔值<br/>整数<br/>浮点数<br/>VarChar<br/>数组<br/>JSON</td></tr>
<tr><td>搜索功能</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td><td>向量搜索（ANN搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td><td>向量搜索（ANN搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高级数据管理</td><td>不适用</td><td>访问控制<br/>分区<br/>分区 Key</td><td>访问控制<br/>分区<br/>分区 Key<br/>物理资源分组</td></tr>
<tr><td>一致性级别</td><td>强</td><td>强<br/>有限过时<br/>会话<br/>最终</td><td>强<br/>有限过时<br/>会话<br/>最终</td></tr>
<tr><td>消息队列</td><td>不适用</td><td>Woodpecker（嵌入式）</td><td>Woodpecker（服务）</td></tr>
</tbody>
</table>
