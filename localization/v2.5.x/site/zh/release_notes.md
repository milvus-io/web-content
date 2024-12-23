---
id: release_notes.md
summary: Milvus 发行说明
title: 版本说明
---
<h1 id="Release-Notes" class="common-anchor-header">版本说明<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>了解 Milvus 的新功能！本页总结了每个版本的新功能、改进、已知问题和错误修复。您可以在本部分找到 v2.5.0 之后每个版本的发布说明。我们建议您定期访问此页面以了解更新信息。</p>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 12 月 23 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 带来了重大进步，为处理向量搜索和大规模数据管理的用户提高了可用性、可扩展性和性能。通过这一版本，Milvus 集成了强大的新功能，如基于术语的搜索、用于优化查询的聚类压缩，以及对稀疏和密集向量搜索方法的多功能支持。集群管理、索引和数据处理方面的增强功能将灵活性和易用性提高到了新的水平，使 Milvus 成为一个更加强大和用户友好的向量数据库。</p>
<h3 id="Key-Features" class="common-anchor-header">主要功能</h3><h4 id="Full-Text-Search" class="common-anchor-header">全文搜索</h4><p>Milvus 2.5 支持使用 Sparse-BM25 实现全文搜索！该功能是对 Milvus 强大语义搜索功能的重要补充，尤其是在涉及罕见词或专业术语的情况下。在以前的版本中，Milvus 支持稀疏向量来辅助关键词搜索。这些稀疏向量由 SPLADEv2/BGE-M3 等神经模型或 BM25 算法等统计模型在 Milvus 外部生成。</p>
<p>Milvus 2.5 由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 提供技术支持，内置分析器和稀疏向量提取功能，将 API 从仅接收向量作为输入扩展到直接接受文本。在插入数据时，BM25 统计信息会实时更新，从而提高了可用性和准确性。此外，基于近似近邻（ANN）算法的稀疏向量比标准关键字搜索系统具有更强大的性能。</p>
<p>有关详情，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>和<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">集群管理 WebUI（测试版）</h4><p>为了更好地支持海量数据和丰富功能，Milvus 的复杂设计包括各种依赖关系、众多节点角色、复杂数据结构等。这些方面都会给使用和维护带来挑战。</p>
<p>Milvus 2.5 引入了内置的集群管理 WebUI，通过可视化 Milvus 复杂的运行环境信息，降低了系统维护难度。这包括数据库和 Collections、网段、通道、依赖关系、节点健康状态、任务信息、缓慢查询等详细信息。</p>
<h4 id="Text-Match" class="common-anchor-header">文本匹配</h4><p>Milvus 2.5 利用<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>的分析器和索引进行文本预处理和索引构建，支持根据特定术语对文本数据进行精确的自然语言匹配。该功能主要用于满足特定条件的过滤搜索，并可结合标量过滤功能细化查询结果，允许在满足标量标准的向量内进行相似性搜索。</p>
<p>有关详情，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>和<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">位图索引</h4><p>Milvus 系列新增了一种标量数据索引。位图索引使用长度与行数相等的位数组来表示值的存在并加速搜索。</p>
<p>位图索引传统上对低Cardinality字段很有效，这些字段的不同值数量不多--例如，包含性别信息的列只有两个可能的值：男性和女性。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/bitmap.md">位图索引</a>。</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">可空值和默认值</h4><p>Milvus 现在支持为主键字段以外的标量字段设置可归零属性和默认值。对于标记为<code translate="no">nullable=True</code> 的标量字段，用户可以在插入数据时省略该字段；系统会将其视为空值或默认值（如果已设置），而不会出错。</p>
<p>默认值和可归零属性为 Milvus 提供了更大的灵活性。用户在创建 Collections 时，可以利用这一功能来处理具有不确定值的字段。它还简化了从其他数据库系统到 Milvus 的数据迁移，允许处理包含空值的数据集，同时保留原始默认值设置。</p>
<p>有关详情，请参阅 "<a href="/docs/zh/nullable-and-default.md">可空值和默认值</a>"。</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">基于 Faiss 的 HNSW SQ/PQ/PRQ</h4><p>通过与 Faiss 社区的密切合作，Faiss 中的 HNSW 算法在功能和性能方面都有了显著的改进。出于稳定性和可维护性的考虑，Milvus 2.5 正式将对 HNSW 的支持从 hnswlib 迁移到 Faiss。</p>
<p>基于 Faiss，Milvus 2.5 支持 HNSW 上的多种量化方法，以满足不同场景的需求：SQ（标量量化器）、PQ（乘积量化器）和 PRQ（乘积残差量化器）。SQ 和 PQ 比较常见；SQ 提供了良好的查询性能和构建速度，而 PQ 在相同压缩比的情况下提供了更好的召回率。许多向量数据库通常使用二进制量化，这是 SQ 量化的一种简单形式。</p>
<p>PRQ 是 PQ 和 AQ（加法量化器）的融合。与 PQ 相比，PRQ 需要更长的构建时间，但却能提供更好的召回率，尤其是在高压缩率的情况下，二进制压缩的召回率更高。</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">聚类压缩（测试版）</h4><p>Milvus 2.5 引入了聚类压缩（Clustering Compaction）功能，以加快搜索速度并降低大型 Collections 的成本。通过指定一个标量字段作为聚类关键字，数据会按范围重新分配，以优化存储和检索。该功能的作用类似于全局索引，可使 Milvus 在基于聚类元数据的查询过程中有效地剪裁数据，从而在应用标量过滤器时提高搜索性能。</p>
<p>有关详情，请参阅<a href="/docs/zh/clustering-compaction.md">聚类压缩</a>。</p>
<h3 id="Other-Features" class="common-anchor-header">其他功能</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">流节点（测试版）</h4><p>Milvus 2.5 引入了一个名为流节点的新组件，它提供了先写日志（WAL）服务。这使 Milvus 能够在读写通道前后达成共识，解锁新特性、功能和优化。Milvus 2.5 版默认禁用此功能，3.0 版将正式启用。</p>
<h4 id="IPv6-Support" class="common-anchor-header">支持 IPv6</h4><p>Milvus 现在支持 IPv6，从而扩大了网络连接和兼容性。</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV 批量导入</h4><p>除 JSON 和 Parquet 格式外，Milvus 现在还支持直接批量导入 CSV 格式的数据。</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">加速查询的表达式模板</h4><p>Milvus 现在支持表达式模板，提高了表达式解析效率，尤其是在使用复杂表达式的情况下。</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">分组功能增强</h4><ul>
<li><strong>可定制的组大小</strong>：新增了对指定每个组返回条目的数量的支持。</li>
<li><strong>混合 GroupBy 搜索</strong>：支持基于多个向量列的混合 GroupBy 搜索。</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">迭代器增强功能</h4><ul>
<li><strong>支持 MVCC</strong>：得益于多版本并发控制（Multi-Version Concurrency Control，MVCC），用户现在可以使用迭代器，而不会受到插入和删除等后续数据更改的影响。</li>
<li><strong>持久游标</strong>Milvus 现在支持 QueryIterator 的持久游标，使用户能够在重启 Milvus 后从最后一个位置恢复迭代，而无需重启整个迭代过程。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><h4 id="Deletion-Optimization" class="common-anchor-header">删除优化</h4><p>通过优化锁的使用和内存管理，提高了大规模删除的速度并减少了内存使用量。</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">依赖关系升级</h4><p>升级至 ETCD 3.5.16 和 Pulsar 3.0.7 LTS，修复了现有的 CVE 并增强了安全性。注意：升级到 Pulsar 3.x 与之前的 2.x 版本不兼容。</p>
<p>对于已经拥有可正常使用的 Milvus 部署的用户，需要先升级 ETCD 和 Pulsar 组件，然后才能使用新特性和功能。详情请参阅<a href="/docs/zh/upgrade-pulsar-v3.md">将 Pulsar 从 2.x 升级到 3.x。</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">本地存储 V2</h4><p>在 Milvus 2.5 中引入了新的本地文件格式，提高了标量数据的加载和查询效率，减少了内存开销，并为未来的优化奠定了基础。</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">表达式解析优化</h4><p>通过对重复表达式实施缓存、升级 ANTLR 和优化<code translate="no">NOT IN</code> 子句的性能，改进了表达式解析。</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">改进 DDL 并发性能</h4><p>优化了数据定义语言 (DDL) 操作的并发性能。</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 功能调整</h4><p>使 RESTful API 的功能与其他 SDK 保持一致。</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">安全和配置更新</h4><p>支持 TLS，以确保更复杂或企业环境中的节点间通信安全。有关详情，请参阅<a href="/docs/zh/tls.md">安全配置</a>。</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">压缩性能增强</h4><p>删除了混合压缩中的最大分段限制，现在会优先处理较小的分段，从而提高效率并加快对大型或碎片化数据集的查询。</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">基于分数的通道平衡</h4><p>引入了一种可动态平衡各通道负载的策略，提高了大规模部署中的资源利用率和整体稳定性。</p>
