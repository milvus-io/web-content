---
id: comparison.md
title: 比较
summary: 本文对 Milvus 与其他向量搜索解决方案进行了比较。
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Milvus 与替代产品的比较<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>在探索各种向量数据库选项时，本综合指南将帮助您了解 Milvus 的独特功能，确保您选择最适合自己特定需求的数据库。值得注意的是，Milvus 是领先的开源矢量数据库，<a href="https://zilliz.com/cloud">Zilliz Cloud</a>提供全面管理的 Milvus 服务。要对照竞争对手客观评估 Milvus，可以考虑使用<a href="https://github.com/zilliztech/VectorDBBench#quick-start">基准工具</a>分析性能指标。</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Milvus 的亮点<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>功能性</strong>：Milvus 不仅支持基本的向量相似性搜索，还支持<a href="https://milvus.io/docs/sparse_vector.md">稀疏向量</a>、<a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">批量向量</a>、<a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">过滤搜索</a>和<a href="https://milvus.io/docs/multi-vector-search.md">混合搜索</a>功能等高级功能。</p></li>
<li><p><strong>灵活性</strong>：Milvus 支持多种部署模式和多个 SDK，所有这些都在一个强大的集成生态系统中实现。</p></li>
<li><p><strong>性能</strong>：Milvus 采用<a href="https://milvus.io/docs/index.md#HNSW">HNSW</a>和<a href="https://milvus.io/docs/disk_index.md">DiskANN</a> 等优化索引算法以及先进的<a href="https://milvus.io/docs/gpu_index.md">GPU 加速</a>，可确保高吞吐量和低延迟的实时处理。</p></li>
<li><p><strong>可扩展性</strong>：其定制的分布式架构可轻松扩展，从小型数据集到超过 100 亿向量的 Collections 都能轻松应对。</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">整体比较<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>为了对 Milvus 和 Pinecone 这两个向量数据库解决方案进行比较，下表突出了各种功能之间的差异。</p>
<table>
<thead>
<tr><th>特征</th><th>Pinecone</th><th>Milvus</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>部署模式</td><td>纯 SaaS</td><td>Milvus Lite、On-prem Standalone &amp; Cluster、Zilliz Cloud Saas &amp; BYOC</td><td>Milvus 提供更灵活的部署模式。</td></tr>
<tr><td>支持的 SDK</td><td>Python、JavaScript/TypeScript</td><td>Python、Java、NodeJS、Go、Restful API、C#、Rust</td><td>Milvus 支持更广泛的编程语言。</td></tr>
<tr><td>开源状态</td><td>已关闭</td><td>开源</td><td>Milvus 是一个流行的开源向量数据库。</td></tr>
<tr><td>可扩展性</td><td>仅向上/向下扩展</td><td>向外/向内扩展和向上/向下扩展</td><td>Milvus 采用分布式架构，增强了可扩展性。</td></tr>
<tr><td>可用性</td><td>可用区域内基于 Pod 的架构</td><td>可用区域故障切换和跨区域 HA</td><td>Milvus CDC（变更数据捕获）可实现主备模式，以提高可用性。</td></tr>
<tr><td>性能成本（每百万次查询收费）</td><td>中型数据集 0.178 美元起，大型数据集 1.222 美元起</td><td>Zilliz Cloud 中型数据集的起价为 0.148 美元，大型数据集的起价为 0.635 美元；提供免费版本</td><td>请参阅<a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">成本排名报告</a>。</td></tr>
<tr><td>GPU 加速</td><td>不支持</td><td>支持英伟达™（NVIDIA®）GPU</td><td>GPU 加速可大幅提升性能，通常可提升几个数量级。</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">术语比较<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>虽然两者作为向量数据库的功能相似，但 Milvus 和 Pinecone 的特定领域术语略有不同。详细的术语比较如下。</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>索引</td><td><a href="https://zilliz.com/comparison">Collections</a></td><td>在 Pinecone 中，索引是存储和管理相同大小向量的组织单位，这种索引与硬件（称为 pod）紧密结合在一起。相比之下，Milvus 的 Collections 功能类似，但能在单个实例中处理多个集合。</td></tr>
<tr><td>Collections</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">备份</a></td><td>在 Pinecone 中，Collection 本质上是索引的静态快照，主要用于备份目的，不能被查询。在 Milvus 中，用于创建备份的相应功能更加透明，命名也更直观。</td></tr>
<tr><td>命名空间</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">Partition Key</a></td><td>命名空间允许将索引中的向量分割成子集。Milvus 提供了分区或分区键等多种方法，以确保在 Collections 中实现高效的数据隔离。</td></tr>
<tr><td>元数据</td><td><a href="https://milvus.io/docs/boolean.md">标量字段</a></td><td>Pinecone 的元数据处理依赖于键值对，而 Milvus 允许使用复杂的标量字段，包括标准数据类型和动态 JSON 字段。</td></tr>
<tr><td>查询</td><td><a href="https://milvus.io/docs/single-vector-search.md">查询</a></td><td>用于查找给定向量近邻的方法名称，可能会在上面应用一些额外的过滤器。</td></tr>
<tr><td>不可用</td><td><a href="https://milvus.io/docs/with-iterators.md">迭代器</a></td><td>Pinecone 缺乏对索引中所有向量进行迭代的功能。Milvus 引入了搜索迭代器和查询迭代器方法，增强了跨数据集的数据检索能力。</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">能力比较<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
<tr><th>功能</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>部署模式</td><td>纯 SaaS</td><td>Milvus Lite、On-prem Standalone &amp; Cluster、Zilliz Cloud Saas &amp; BYOC</td></tr>
<tr><td>Embeddings 功能</td><td>不可用</td><td>支持<a href="https://github.com/milvus-io/milvus-model">pymilvus[模型］</a></td></tr>
<tr><td>数据类型</td><td>字符串、数字、布尔、字符串列表</td><td>字符串、VarChar、数（Int、Float、Double）、Bool、数组、JSON、浮点矢量、二进制矢量、BFloat16、Float16、稀疏矢量</td></tr>
<tr><td>度量和索引类型</td><td>余弦、点、欧几里得<br/>P-家族、S-家族</td><td>余弦、IP（点）、L2（欧几里得）、汉明、雅卡<br/>FLAT、IVF_FLAT、IVF_SQ8、IVF_PQ、HNSW、SCANN、GPU 索引</td></tr>
<tr><td>Schema 设计</td><td>灵活模式</td><td>灵活模式、严格模式</td></tr>
<tr><td>多个向量场</td><td>不适用</td><td>多向量和混合搜索</td></tr>
<tr><td>工具</td><td>数据集、文本工具、Spark 连接器</td><td>Attu、Birdwatcher、备份、CLI、CDC、Spark 和 Kafka 连接器</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">主要见解</h3><ul>
<li><p><strong>部署模式</strong>：Milvus提供多种部署选项，包括本地部署、Docker、Kubernetes on-premises、云SaaS和面向企业的自带云（BYOC），而Pinecone仅限于SaaS部署。</p></li>
<li><p><strong>嵌入功能</strong>：Milvus 支持额外的嵌入库，可直接使用嵌入模型将源数据转换为向量。</p></li>
<li><p><strong>数据类型</strong>：与 Pinecone 相比，Milvus 支持更广泛的数据类型，包括数组和 JSON。Pinecone 只支持以字符串、数字、布尔值或字符串列表为值的扁平元数据结构，而 Milvus 可以在一个 JSON 字段内处理任何 JSON 对象，包括嵌套结构。Pinecone 限制每个向量的元数据大小为 40KB。</p></li>
<li><p><strong>度量和索引类型</strong>：Milvus 支持多种度量和索引类型，以适应各种使用情况，而 Pinecone 的选择较为有限。虽然在 Milvus 中必须为向量建立索引，但也提供了 AUTO_INDEX 选项来简化配置过程。</p></li>
<li><p><strong>Schema 设计</strong>：Milvus 为模式设计提供了灵活的<code translate="no">create_collection</code> 模式，包括快速设置动态模式以获得类似 Pinecone 的无模式体验，以及自定义设置预定义模式字段和索引以获得类似关系数据库管理系统（RDBMS）的体验。</p></li>
<li><p><strong>多向量字段</strong>：Milvus 支持在单个 Collections 中存储多个向量字段，这些字段可以是稀疏的，也可以是密集的，维度也可能不同。Pinecone 不提供类似功能。</p></li>
<li><p><strong>工具</strong>：Milvus 为数据库管理和使用提供了更广泛的工具选择，如 Attu、Birdwatcher、Backup、CLI、CDC 以及 Spark 和 Kafka 连接器。</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">下一步计划<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>试用</strong>：从 Milvus<a href="https://milvus.io/docs/quickstart.md">快速入门</a>或<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">注册 Zilliz Cloud</a> 开始，亲身体验 Milvus。</p></li>
<li><p><strong>了解更多</strong>：通过我们全面的<a href="/docs/zh/glossary.md">术语</a>和<a href="https://milvus.io/docs/manage-collections.md">用户指南</a>深入了解 Milvus 的功能。</p></li>
<li><p><strong>探索替代方案</strong>：如需对向量数据库选项进行更广泛的比较，请浏览<a href="https://zilliz.com/comparison">本页</a>上的其他资源。</p></li>
</ul>
