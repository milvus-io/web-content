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
    </button></h1><p>了解 Milvus 的新功能！本页总结了每个版本的新功能、改进、已知问题和错误修复。您可以在本部分找到 v2.6.0 之后每个版本的发布说明。我们建议您定期访问此页面以了解更新信息。</p>
<h2 id="v260-rc1" class="common-anchor-header">版本 2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 6 月 18 日</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus 版本</th><th style="text-align:center">Python SDK 版本</th><th style="text-align:center">Node.js SDK 版本</th><th style="text-align:center">Java SDK 版本</th><th style="text-align:center">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 引入了简化的云原生架构，旨在通过降低部署复杂性来提高操作效率、资源利用率和总体拥有成本。该版本增加了以性能、搜索和开发为重点的新功能。主要功能包括：可提高性能的高精度 1 位量化 (RaBitQ) 和动态缓存层；可进行高级搜索的 MinHash 近乎重复的检测和精确的短语匹配；以及可在线修改 Schema 以增强开发人员体验的自动嵌入功能。</p>
<div class="alert note">
<p>这是 Milvus 2.6.0 的预发布版本。要试用最新功能，请将此版本作为全新部署安装。不支持从 Milvus v2.5.x 或更早版本升级到 2.6.0-rc1。</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">架构变更</h3><p>自 2.6 版起，Milvus 引入了旨在提高性能、可扩展性和易用性的重大架构变更。有关详细信息，请参阅<a href="/docs/zh/v2.6.x/architecture_overview.md">Milvus 架构概述</a>。</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">流节点（GA）</h4><p>在以前的版本中，流数据由代理写入 WAL，由查询节点（QueryNode）和数据节点（DataNode）读取。这种架构很难在写入端达成共识，读取端需要复杂的逻辑。此外，查询委托器位于 QueryNode 中，妨碍了可扩展性。Milvus 2.5.0 引入了流节点（Streaming Node），并在 2.6.0 版本中成为 GA。该组件现在负责所有碎片级 WAL 读/写操作，同时还充当查询委托器，从而解决了上述问题，并实现了新的优化。</p>
<p><strong>重要升级通知</strong>：流节点是一项重大的架构变革，因此不支持从以前的版本直接升级到 Milvus 2.6.0-rc1。</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">啄木鸟原生 WAL</h4><p>Milvus 此前的 WAL 依赖于 Kafka 或 Pulsar 等外部系统。这些系统虽然功能强大，但却大大增加了操作的复杂性和资源开销，尤其是对于中小型部署而言。在 Milvus 2.6 中，这些系统被专门构建的云原生 WAL 系统 Woodpecker 取代。Woodpecker 专为对象存储而设计，支持基于本地和对象存储的零磁盘模式，在简化操作的同时提高了性能和可扩展性。</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">数据节点和索引节点合并</h4><p>在 Milvus 2.6 中，压缩、批量导入、统计数据收集和索引建立等任务现在由统一的调度程序管理。以前由数据节点（DataNode）处理的数据持久化功能已移至流节点（Streaming Node）。为简化部署和维护，IndexNode 和 DataNode 已合并为一个 DataNode 组件。这个合并节点现在执行所有这些关键任务，降低了操作复杂性，优化了资源利用率。</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">协调器合并为 MixCoord</h4><p>以前的设计中，RootCoord、QueryCoord 和 DataCoord 模块各自独立，模块间的通信非常复杂。为了简化系统设计，这些组件被合并为一个统一的协调器，称为 MixCoord。这种合并用内部函数调用取代了基于网络的通信，从而降低了分布式编程的复杂性，提高了系统操作的效率，简化了开发和维护工作。</p>
<h3 id="Key-Features" class="common-anchor-header">主要功能</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1 位量化</h4><p>要处理大规模数据集，1 位量化是提高资源利用率和搜索性能的有效技术。然而，传统方法会对召回率产生负面影响。Milvus 2.6 与原研究作者合作，推出了 1 位量化解决方案 RaBitQ，在保持高召回准确率的同时，提供 1 位压缩的资源和性能优势。</p>
<p>更多信息，请参阅<a href="/docs/zh/v2.6.x/ivf-rabitq.md">IVF_RABITQ</a>。</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON 功能增强</h4><p>Milvus 2.6 通过以下改进增强了对 JSON 数据类型的支持：</p>
<ul>
<li><strong>性能</strong>：现在正式支持 JSON 路径索引，允许在 JSON 对象（如<code translate="no">meta.user.location</code> ）内的特定路径上创建反向索引。这避免了对整个对象的扫描，并改善了使用复杂过滤器进行查询的延迟。</li>
<li><strong>功能性</strong>：为支持更复杂的过滤逻辑，本版本新增了对<code translate="no">JSON_CONTAINS</code>,<code translate="no">JSON_EXISTS</code>,<code translate="no">IS NULL</code> 和<code translate="no">CAST</code> 函数的支持。 展望未来，我们在 JSON 支持方面的工作仍在继续。我们很高兴地预告，即将发布的正式版本将提供更强大的功能，如<strong>JSON 切碎</strong>和<strong>JSON FLAT 索引</strong>，旨在显著提高高度嵌套的 JSON 数据的性能。</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">分析器/令牌器功能增强</h4><p>通过对分析器和令牌器的多项更新，该版本大大增强了文本处理功能：</p>
<ul>
<li>新的<a href="/docs/zh/v2.6.x/analyzer-overview.md#Example-use">运行分析器</a>语法可用于验证令牌器配置。</li>
<li>集成了<a href="/docs/zh/v2.6.x/lindera-tokenizer.md">Lindera 标记符号生成器</a>，以改进对日语和韩语等亚洲语言的支持。</li>
<li>现在支持行级标记符选择，通用<a href="/docs/zh/v2.6.x/icu-tokenizer.md">ICU 标记符可</a>作为多语言场景的备用<a href="/docs/zh/v2.6.x/icu-tokenizer.md">标记符</a>。</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">数据输入、数据输出与 Embeddings 功能</h4><p>Milvus 2.6 引入了 "数据输入、数据输出 "功能，通过直接与第三方嵌入模型（如 OpenAI、AWS Bedrock、Google Vertex AI 和 Hugging Face）集成，简化了人工智能应用程序开发。用户现在可以使用原始文本数据进行插入和查询，Milvus 会自动调用指定的模型服务，实时将文本转换为向量。这样就不再需要单独的向量转换管道了。</p>
<p>更多信息，请参阅<a href="/docs/zh/v2.6.x/embedding-function-overview.md">Embedding 功能概述</a>。</p>
<h4 id="Phrase-Match" class="common-anchor-header">短语匹配</h4><p>短语匹配是一种文本搜索功能，只有当查询中的精确单词序列以正确的顺序连续出现在文档中时，才会返回结果。</p>
<p><strong>主要特点</strong>：</p>
<ul>
<li>顺序敏感：单词必须以与查询中相同的顺序出现。</li>
<li>连续匹配：除非使用了斜率值，否则单词必须紧挨着出现。</li>
<li>斜率（可选）：这是一个可调整的参数，允许少量间隔词，从而实现模糊短语匹配。</li>
</ul>
<p>更多信息，请参阅<a href="/docs/zh/v2.6.x/phrase-match.md">短语匹配</a>。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">最小哈希 LSH 索引（测试版）</h4><p>为满足模型训练中重复数据删除的需求，Milvus 2.6 增加了对 MINHASH_LSH 索引的支持。该功能提供了一种计算效率高、可扩展的方法，用于估算文档之间的 Jaccard 相似性，以识别近似重复的文档。用户可以在预处理过程中为文本文档生成 MinHash 签名，并在 Milvus 中使用 MINHASH_LSH 索引高效地查找大规模数据集中的相似内容，从而提高数据清理和模型质量。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">时间感知衰减函数</h4><p>Milvus 2.6 引入了时间感知衰减函数，以解决信息价值随时间变化的情况。在结果重新排序过程中，用户可以根据时间戳字段应用指数、高斯或线性衰减函数来调整文档的相关性得分。这可以确保优先处理较新的内容，这对新闻源、电子商务和人工智能 Agents 的记忆等应用至关重要。</p>
<p>如需了解更多信息，请参阅 "<a href="/docs/zh/v2.6.x/decay-ranker-overview.md">衰减排名器概述</a>"。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">为在线 Schema 演进添加字段</h4><p>为了提供更大的模式灵活性，Milvus 2.6 现在支持向现有 Collections 的模式在线添加新的标量或向量字段。这就避免了在应用需求发生变化时创建新的 Collections 和执行破坏性数据迁移的需要。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/v2.6.x/add-fields-to-an-existing-collection.md">向现有 Collections 添加字段</a>。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 向量支持</h4><p>为了应对产生 8 位整数嵌入的量化模型的使用日益增多，Milvus 2.6 增加了对 INT8 向量的本地数据类型支持。这样，用户就可以直接摄取这些向量，而无需去量化，从而节省了计算、网络带宽和存储成本。该功能最初支持 HNSW 系列索引。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/v2.6.x/dense-vector.md">密集向量</a>。</p>
