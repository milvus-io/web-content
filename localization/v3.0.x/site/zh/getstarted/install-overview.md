---
id: install-overview.md
summary: 请根据您的工作负载、可用性要求和运行环境，选择 Milvus Lite、Milvus Standalone 或 Milvus Distributed。
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
    </button></h1><p>Milvus 支持本地原型开发和大规模向量搜索服务。请根据您的数据、读写负载、可用性要求以及运行环境，在 Milvus Lite、Milvus Standalone 和 Milvus Distributed 之间进行选择。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是一个可导入到应用程序中的 Python 库。作为 Milvus 的轻量级版本，它非常适合在 Jupyter Notebook 中进行快速原型开发，或在资源有限的智能设备上运行。 Milvus Lite 支持其他 Milvus 部署方式相同的 API。与 Milvus Lite 交互的客户端代码也可与其他部署模式下的 Milvus 实例配合使用。</p>
<p>对于本地示例，请使用 Python 3.10 或更高版本，并显式安装可选的 Lite 依赖项。在 Windows 系统中，pip 会跳过 `<code translate="no">milvus-lite</code> ` 这一补充参数，因此需要显式指定包名：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>使用 `<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` 打开本地存储。Milvus Lite 3.x 会在此路径下创建一个目录；若存在 Milvus Lite 2.x 数据库文件，则需要进行导出和迁移。有关平台要求，请参阅《<a href="/docs/zh/milvus_lite.md">运行 Milvus Lite</a>》；有关完整的插入和搜索示例，请参阅《<a href="/docs/zh/quickstart.md">快速入门》</a>。</p>
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
    </button></h2><p>Milvus Standalone 是一种单机服务器部署方案。Milvus Standalone 的所有组件都打包在一个<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 镜像中</a>，使部署变得非常便捷。 如果您有生产环境的工作负载，但希望避免使用 Kubernetes，那么在内存充足的单台机器上运行 Milvus Standalone 是一个不错的选择。默认情况下，Milvus Standalone 使用<strong>Woodpecker</strong>（嵌入式）作为消息队列，因此无需单独运行消息服务。</p>
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
    </button></h2><p>Milvus Distributed 可部署在<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>集群上。该部署采用云原生架构，其中数据摄取负载和搜索查询由隔离的节点分别处理，从而为关键组件提供了冗余保障。它具备最高的可扩展性和可用性，同时支持灵活定制各组件的资源分配。 对于在生产环境中运行大规模向量搜索系统的企业用户而言，Milvus Distributed 是首选方案。默认情况下，Milvus Distributed 将<strong>Woodpecker</strong>作为消息队列运行，并作为独立服务与 Milvus 并行部署。</p>
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
<p>在笔记本中使用 Milvus Lite 来测试 Embeddings、RAG 分块策略和检索行为。当需要共享服务器，或者测得的内存和查询负载超过本地环境时，请切换到 Milvus Standalone。客户端 API 类似，但请检查功能差异，并单独迁移存储的数据。</p></li>
<li><p><strong>小规模生产部署</strong></p>
<p>当单台服务器能够满足您的工作负载和可用性要求，且您希望在不使用 Kubernetes 的情况下运行时，请使用 Milvus Standalone。根据向量维度、标量字段、索引设置和副本数量估算内存需求，然后对预期的查询并发量和写入速率进行基准测试。仅凭向量数量无法确定容量。</p></li>
<li><p><strong>大规模生产部署</strong></p>
<p>随着业务快速增长，当数据规模超过单台服务器的容量时，就该考虑使用 Milvus Distributed 了。您可以继续在开发或预发布环境中使用 Milvus Standalone 以保持便利性，同时运行托管 Milvus Distributed 的 K8s 集群。 这不仅能支持您处理数百亿量级的向量，还能根据具体工作负载（例如高读取、低写入，或高写入、低读取等场景）灵活调整节点规格。</p></li>
<li><p><strong>边缘设备上的本地搜索</strong></p>
<p>若需在边缘设备上搜索私有或敏感数据，您可在设备上部署 Milvus Lite，无需依赖云端服务即可进行文本或图像搜索。这适用于专有文档搜索或设备端物体检测等场景。</p></li>
</ul>
<p>Milvus 的部署模式选择取决于您项目的阶段和规模。从快速原型开发到大规模企业部署，Milvus 都能为各种需求提供灵活而强大的解决方案。</p>
<ul>
<li><strong>Milvus Lite</strong>适用于在单个应用程序的资源范围内进行本地评估和工作负载处理。</li>
<li>当单台服务器满足您对容量和可用性的要求时<strong>，Milvus Standalone</strong>可提供共享服务。</li>
<li>当您需要扩展至多台服务器，或隔离读写资源时，<strong>Milvus Distributed</strong>可提供组件级别的扩展性和冗余性。</li>
</ul>
<p>Milvus Standalone 和 Distributed 采用消息队列、对象存储以及元数据存储。Milvus Lite 则在本地运行，无需这些独立服务。有关服务器部署的默认依赖项和外部服务选项，请参阅<a href="/docs/zh/data-infra-integration-overview.md">“数据基础设施”</a>。</p>
<p>如果您希望使用托管服务而非自行运维服务器基础设施，请考虑<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。如需自行部署，请继续使用<a href="/docs/zh/install_standalone-docker.md">Docker</a>或<a href="/docs/zh/install_cluster-milvusoperator.md">Kubernetes</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>根据您的使用场景选择部署方案</span>
  
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
    </button></h2><p>“Lite”列描述的是 Milvus Lite 3.2.2。在本地应用程序中依赖某项服务器功能之前，请先查看<a href="/docs/zh/milvus_lite.md#Supported-features-and-limits">Milvus Lite 的限制</a>。</p>
<table>
<thead>
<tr><th>功能</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客户端库</td><td>Python（本地 PyMilvus 适配器）</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>数据类型</td><td><br/><br/><br/><br/><br/><br/><br/></td><td>稠密向量<br/>稀疏向量<br/>二进制向量<br/>布尔值<br/>整数<br/>浮点数<br/>VarChar<br/>数组<br/>JSON</td><td>稠密向量<br/>稀疏向量<br/>二进制向量<br/>布尔型<br/>整数型<br/>浮点型<br/>VarChar<br/>数组<br/>JSON</td></tr>
<tr><td>搜索功能</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td><td>向量搜索（ANN搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td><td>向量搜索（ANN 搜索）<br/>元数据过滤<br/>范围搜索<br/>标量查询<br/>按主键获取实体<br/>混合搜索</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高级数据管理</td><td>数据库<br/>分区<br/>别名<br/>无访问控制</td><td>访问控制<br/>分区<br/>分区 Key</td><td>访问控制<br/>分区<br/>分区 Key<br/>物理资源分组</td></tr>
<tr><td>一致性级别</td><td>不适用：由单个本地进程处理所有请求；<code translate="no">consistency_level</code> 被接受但无效</td><td>强一致性<br/>有限过时<br/>会话<br/>最终一致性</td><td>强<br/>有限过时<br/>会话<br/>最终</td></tr>
<tr><td>消息队列</td><td>不适用</td><td>Woodpecker（嵌入式）</td><td>Woodpecker（服务）</td></tr>
</tbody>
</table>
