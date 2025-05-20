---
id: overview.md
title: Milvus 是什么？
related_key: Milvus Overview
summary: >-
  Milvus
  是一个高性能、高度可扩展的向量数据库，可在从笔记本电脑到大型分布式系统等各种环境中高效运行。它既可以开源软件的形式提供，也可以云服务的形式提供。
---
<h1 id="What-is-Milvus" class="common-anchor-header">Milvus 是什么？<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 是一种高性能、高扩展性的向量数据库，可在从笔记本电脑到大规模分布式系统等各种环境中高效运行。它既可以开源软件的形式提供，也可以云服务的形式提供。</p>
<p>Milvus 是 LF AI &amp; Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。大多数贡献者都是高性能计算（HPC）领域的专家，擅长构建大型系统和优化硬件感知代码。核心贡献者包括来自 Zilliz、ARM、NVIDIA、AMD、英特尔、Meta、IBM、Salesforce、阿里巴巴和微软的专业人士。</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">非结构化数据、Embeddings 和 Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>文本、图像和音频等非结构化数据格式各异，并带有丰富的底层语义，因此分析起来极具挑战性。为了处理这种复杂性，Embeddings 被用来将非结构化数据转换成能够捕捉其基本特征的数字向量。然后将这些向量存储在向量数据库中，从而实现快速、可扩展的搜索和分析。</p>
<p>Milvus 提供强大的数据建模功能，使您能够将非结构化或多模式数据组织成结构化的 Collections。它支持多种数据类型，适用于不同的属性模型，包括常见的数字和字符类型、各种向量类型、数组、集合和 JSON，为您节省了维护多个数据库系统的精力。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>非结构化数据、Embeddings 和 Milvus</span> </span></p>
<p>Milvus 提供三种部署模式，涵盖各种数据规模--从 Jupyter Notebooks 中的本地原型到管理数百亿向量的大规模 Kubernetes 集群：</p>
<ul>
<li>Milvus Lite 是一个 Python 库，可以轻松集成到您的应用程序中。作为 Milvus 的轻量级版本，它非常适合在 Jupyter Notebooks 中进行快速原型开发，或在资源有限的边缘设备上运行。<a href="/docs/zh/v2.4.x/milvus_lite.md">了解更多信息</a>。</li>
<li>Milvus Standalone 是单机服务器部署，所有组件都捆绑在一个 Docker 镜像中，方便部署。<a href="/docs/zh/v2.4.x/install_standalone-docker.md">了解更多</a>。</li>
<li>Milvus Distributed 可部署在 Kubernetes 集群上，采用云原生架构，专为十亿规模甚至更大的场景而设计。该架构可确保关键组件的冗余。<a href="/docs/zh/v2.4.x/install_cluster-milvusoperator.md">了解更多</a>。</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Milvus 为何如此快速？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 从设计之初就是一个高效的向量数据库系统。在大多数情况下，Milvus 的性能是其他向量数据库的 2-5 倍（参见 VectorDBBench 结果）。这种高性能是几个关键设计决策的结果：</p>
<p><strong>硬件感知优化</strong>：为了让 Milvus 适应各种硬件环境，我们专门针对多种硬件架构和平台优化了其性能，包括 AVX512、SIMD、GPU 和 NVMe SSD。</p>
<p><strong>高级搜索算法</strong>：Milvus 支持多种内存和磁盘索引/搜索算法，包括 IVF、HNSW、DiskANN 等，所有这些算法都经过了深度优化。与 FAISS 和 HNSWLib 等流行实现相比，Milvus 的性能提高了 30%-70%。</p>
<p><strong>C++ 搜索引擎</strong>向量数据库性能的 80% 以上取决于其搜索引擎。由于 C++ 语言的高性能、底层优化和高效资源管理，Milvus 将 C++ 用于这一关键组件。最重要的是，Milvus 集成了大量硬件感知代码优化，从汇编级向量到多线程并行化和调度，以充分利用硬件能力。</p>
<p><strong>面向列</strong>：Milvus 是面向列的向量数据库系统。其主要优势来自数据访问模式。在执行查询时，面向列的数据库只读取查询中涉及的特定字段，而不是整行，这大大减少了访问的数据量。此外，对基于列的数据的操作可以很容易地进行向量化，从而可以一次性在整个列中应用操作，进一步提高性能。</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">是什么让 Milvus 具有如此高的可扩展性？<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022 年，Milvus 支持十亿级向量，2023 年，它以持续稳定的方式扩展到数百亿级，为 300 多家大型企业的大规模场景提供支持，包括 Salesforce、PayPal、Shopee、Airbnb、eBay、NVIDIA、IBM、AT&amp;T、LINE、ROBLOX、Inflection 等。</p>
<p>Milvus 的云原生和高度解耦的系统架构确保了系统可以随着数据的增长而不断扩展：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Milvus 高度解耦的系统架构</span> </span></p>
<p>Milvus 本身是完全无状态的，因此可以借助 Kubernetes 或公共云轻松扩展。此外，Milvus 的各个组件都有很好的解耦，其中最关键的三项任务--搜索、数据插入和索引/压实--被设计为易于并行化的流程，复杂的逻辑被分离出来。这确保了相应的查询节点、数据节点和索引节点可以独立地向上和向下扩展，从而优化了性能和成本效益。</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Milvus 支持的搜索类型<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持各种类型的搜索功能，以满足不同用例的需求：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md#Basic-search">ANN 搜索</a>：查找最接近查询向量的前 K 个向量。</li>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md#Filtered-search">过滤搜索</a>：在指定的过滤条件下执行 ANN 搜索。</li>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md#Range-search">范围搜索</a>：查找查询向量指定半径范围内的向量。</li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a>：基于多个向量场进行 ANN 搜索。</li>
<li>关键词搜索基于 BM25 的关键词搜索。</li>
<li><a href="/docs/zh/v2.4.x/reranking.md">Rerankers</a>：根据附加标准或辅助算法调整搜索结果的顺序，完善最初的 ANN 搜索结果。</li>
<li><a href="/docs/zh/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">获取</a>：根据主键检索数据。</li>
<li><a href="/docs/zh/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">查询</a>使用特定表达式检索数据。</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">综合功能集<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>除了上述主要搜索功能外，Milvus 还提供了一系列围绕 ANN 搜索实现的功能，以便您能充分利用其功能。</p>
<h3 id="API-and-SDK" class="common-anchor-header">应用程序接口和 SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a>（Python SDK）（官方）</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a>（JavaScript）SDK（官方）</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a>（微软提供）</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">高级数据类型</h3><p>除了原始数据类型外，Milvus 还支持各种高级数据类型及其各自适用的距离度量。</p>
<ul>
<li><a href="/docs/zh/v2.4.x/sparse_vector.md">稀疏向量</a></li>
<li><a href="/docs/zh/v2.4.x/index-vector-fields.md">二进制向量</a></li>
<li><a href="/docs/zh/v2.4.x/use-json-fields.md">支持 JSON</a></li>
<li><a href="/docs/zh/v2.4.x/array_data_type.md">数组支持</a></li>
<li><a href="/docs/zh/v2.4.x/metric.md">距离度量</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">加速</h3><ul>
<li><p>搜索算法 Milvus 支持一系列可调整的索引和搜索算法。有关详情，请参阅<a href="/docs/zh/v2.4.x/index.md">内存索引</a>、<a href="/docs/zh/v2.4.x/disk_index.md">磁盘索引</a>和<a href="/docs/zh/v2.4.x/gpu_index.md">GPU 索引</a>。</p></li>
<li><p>分区和分区键 分区是 Milvus Collection 的子分区。你可以选择一个标量字段作为分区键，以获得更好的搜索性能。有关详情，请参阅<a href="/docs/zh/v2.4.x/manage-partitions.md">管理分区</a>和<a href="/docs/zh/v2.4.x/use-partition-key.md">使用分区密钥</a>。</p></li>
<li><p>可调一致性模型 一致性可确保每个 Milvus 节点或副本在给定时间写入或读取数据时拥有相同的数据视图。在 Milvus 中进行 ANN 搜索时，可以轻松调整一致性级别。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/consistency.md">一致性</a>。</p></li>
<li><p>高通量数据导入 要将大量数据导入 Milvus，而不是一个接一个地插入，可以考虑使用我们的高通量数据导入工具。有关详情，请参阅<a href="/docs/zh/v2.4.x/prepare-source-data.md">准备源数据</a>和<a href="/docs/zh/v2.4.x/import-data.md">导入数据</a>。</p></li>
<li><p>多租户支持 Milvus 实现了许多面向多租户场景的功能，包括 Partition Key、Clustering Key 等。有关详情，请参阅<a href="/docs/zh/v2.4.x/multi_tenancy.md">多租户策略</a>。</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">安全和授权</h3><ul>
<li><p>可调一致性模型 一致性可确保每个 Milvus 节点或副本在给定时间写入或读取数据时拥有相同的数据视图。在 Milvus 中进行 ANN 搜索时，您可以轻松调整一致性级别。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/consistency.md">一致性</a>。</p></li>
<li><p>数据隔离和资源控制 对于多租户场景，数据隔离是基本的安全要求。Milvus 实现了多种功能来解决您的安全问题。详情请参阅<a href="/docs/zh/v2.4.x/resource_group.md">管理资源组和</a> <a href="/docs/zh/v2.4.x/clustering-compaction.md">集群压缩</a>。</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">人工智能集成</h3><ul>
<li><p>Embeddings 模型集成 Embedding 模型将非结构化数据转换为其在高维数据空间中的数字表示，以便您能将其存储在 Milvus 中。目前，PyMilvus（Python SDK）集成了多个嵌入模型，以便您能快速将数据准备成向量嵌入。有关详情，请参阅<a href="/docs/zh/v2.4.x/embeddings.md">嵌入概述</a>。</p></li>
<li><p>Reranker 模型集成 在信息检索和生成式人工智能领域，Reranker 是优化初始搜索结果顺序的重要工具。PyMilvus 也集成了几种 Rerankers 模型，以优化初始搜索返回结果的顺序。详情请参考<a href="/docs/zh/v2.4.x/rerankers-overview.md">Rerankers 概述</a>。</p></li>
<li><p>LangChain 和其他人工智能工具集成 在 GenAI 时代，LangChain 等工具受到了应用程序开发人员的广泛关注。作为核心组件，Milvus 通常在此类工具中充当向量存储。要了解如何将 Milvus 集成到您喜爱的人工智能工具中，请参阅我们的<a href="/docs/zh/v2.4.x/integrate_with_openai.md">集成</a>和<a href="/docs/zh/v2.4.x/build-rag-with-milvus.md">教程</a>。</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">工具和生态系统</h3><ul>
<li><p>Attu Attu 是一个一体化的直观图形用户界面，可帮助您管理 Milvus 及其存储的数据。有关详情，请参阅<a href="https://github.com/zilliztech/attu">Attu</a>存储库。</p></li>
<li><p>Birdwatcher Birdwatcher 是 Milvus 的调试工具。使用它连接到 etcd，你可以检查 Milvus 系统的状态，或动态配置它。有关详情，请参阅<a href="/docs/zh/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>。</p></li>
<li><p>Promethus 和 Grafana 集成 Promethus 是 Kubernetes 的开源系统监控和警报工具包。Grafana 是一个开源可视化堆栈，可以连接所有数据源。您可以使用 Promethus 和 Grafana 作为监控服务提供商，对 Milvus Distributed 的性能进行可视化监控。有关详情，请参阅<a href="/docs/zh/v2.4.x/monitor.md">部署监控服务</a>。</p></li>
<li><p>Milvus 备份 Milvus 备份是一个允许用户备份和恢复 Milvus 数据的工具。它同时提供 CLI 和 API，以适应不同的应用场景。详情请参阅<a href="/docs/zh/v2.4.x/milvus_backup_overview.md">Milvus 备份</a>。</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC 可以捕获和同步 Milvus 实例中的增量数据，并通过在源实例和目标实例之间的无缝传输，确保业务数据的可靠性，从而轻松实现增量备份和灾难恢复。详情请参阅<a href="/docs/zh/v2.4.x/milvus-cdc-overview.md">Milvus CDC</a>。</p></li>
<li><p>Milvus 连接器 Milvus 为您规划了一套连接器，以便将 Milvus 与 Apache Spark 等第三方工具无缝集成。目前，您可以使用我们的 Spark 连接器将 Milvus 数据馈送到 Apache Spark 进行机器学习处理。有关详情，请参阅<a href="/docs/zh/v2.4.x/integrate_with_spark.md">Spark-Milvus Connector</a>。</p></li>
<li><p>向量传输服务（VTS） Milvus 为您提供了一套工具，用于在 Milvus 实例和一系列数据源（包括 Zilliz 集群、Elasticsearch、Postgres (PgVector) 和另一个 Milvus 实例）之间传输数据。有关详情，请参阅<a href="https://github.com/zilliztech/vts">VTS</a>。</p></li>
</ul>
