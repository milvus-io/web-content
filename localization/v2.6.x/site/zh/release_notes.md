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
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 9 月 3 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.6.1 正式发布！该版本以之前版本的主要架构进步为基础，提供了专注于生产稳定性、性能和操作符稳健性的关键增强功能。该版本解决了关键的社区反馈问题，并加强了系统的大规模部署能力。我们强烈建议所有用户进行升级，以便从更稳定、性能更强和更可靠的系统中获益。</p>
<h3 id="Improvements" class="common-anchor-header">改进<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>远程存储支持 POSIX 兼容文件系统<a href="https://github.com/milvus-io/milvus/pull/43944">（#43944）</a></li>
<li>引入基于模型的 Rerankers<a href="https://github.com/milvus-io/milvus/pull/43270">（#43270）</a></li>
<li>优化了主键字段比较表达式的性能<a href="https://github.com/milvus-io/milvus/pull/43154">（#43154）</a></li>
<li>直接从发布列表中收集 doc_id，以加速文本匹配<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>通过将多个 != 条件转换为单个 NOT IN 子句来优化查询性能<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>在段加载过程中加强缓存层的资源管理<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>改进数据加载期间临时索引的内存估算<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>使临时索引的构建比率可配置<a href="https://github.com/milvus-io/milvus/pull/43939">（#43939）</a></li>
<li>为磁盘写入器添加可配置的写入速率限制<a href="https://github.com/milvus-io/milvus/pull/43912">（#43912）</a></li>
<li>现在无需重启 Milvus 服务即可动态更新 SegCore 参数<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>添加统一的 gRPC 延迟指标以提高可观察性<a href="https://github.com/milvus-io/milvus/pull/44089">（#44089）</a></li>
<li>在 gRPC 标头中包含客户端请求时间戳，以简化调试<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>支持 segcore 的跟踪日志级别<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>添加了一个可配置开关，用于调整一致性保证以提高可用性<a href="https://github.com/milvus-io/milvus/pull/43874">（#43874）</a></li>
<li>实施稳健的重新观察机制，以处理 etcd 连接失败<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>改进内部节点健康检查逻辑<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>优化列出 Collections 时的元数据访问<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>将 Pulsar 客户端升级至 v0.15.1 正式版并添加更多日志记录<a href="https://github.com/milvus-io/milvus/pull/43913">（#43913）</a></li>
<li>将 aws-sdk 从 1.9.234 升级到 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>支持行情组件的动态间隔更新<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>改进比特集操作中 ARM SVE 指令集的自动检测<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>改进文本或短语匹配失败时的错误信息<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>改进向量维度不匹配时的错误信息<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>改进了对象存储不可用时追加超时的错误报告<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>修复了 Parquet 文件导入时可能出现的内存不足 (OOM) 问题<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>修复了备用节点在租约到期时无法恢复的问题<a href="https://github.com/milvus-io/milvus/pull/44112">（#44112）</a></li>
<li>正确处理压缩重试状态<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>修复了连续读取请求与索引加载之间可能导致索引无法加载的死锁问题<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>修复了在高并发情况下可能导致数据删除失败的错误<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>修复了加载文本和 JSON 索引时可能出现的竞赛条件<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>修复了重新启动 QueryCoord 后可能出现的节点状态不一致问题<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>确保在重启后正确清理 "脏 "查询节点<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>修复了一个问题，即对于具有非空有效载荷的请求，未正确处理重试状态<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>修复了批量写入器 v2 未使用正确桶名的问题<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>通过从 RESTful get_configs 端点隐藏敏感项目来增强安全性<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>确保啄木鸟的对象上传在超时重试期间是等效的<a href="https://github.com/milvus-io/milvus/pull/43947">（#43947）</a></li>
<li>禁止从 Parquet 文件导入数组字段中的空元素<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>修复了创建 Collections 别名后代理缓存未失效的错误<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>改进了流节点的内部服务发现机制<a href="https://github.com/milvus-io/milvus/pull/44033">（#44033）</a></li>
<li>修正了资源组逻辑，以正确过滤流节点<a href="https://github.com/milvus-io/milvus/pull/43984">（#43984）</a></li>
<li>为度量添加数据库名称标签，以防止在多数据库环境中发生命名冲突<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>修复内部任务状态处理中的逻辑错误<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>优化了内部指标的初始化时序，以避免潜在的恐慌<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>修复了内部 HTTP 服务器中一个罕见的潜在崩溃问题<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 8 月 6 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 正式发布！在<a href="#v260-rc1">2.6.0-rc1</a> 所奠定的架构基础上，这个生产就绪的版本解决了大量稳定性和性能问题，同时引入了强大的新功能，包括存储格式 V2、高级 JSON 处理和增强的搜索功能。根据 RC 阶段的社区反馈，Milvus 2.6.0 进行了大量的错误修复和优化，可供您探索和采用。</p>
<div class="alert warning">
<p>由于架构变化，不支持从 2.6.0 之前的版本直接升级。请遵循我们的<a href="/docs/zh/upgrade_milvus_cluster-operator.md">升级指南</a>。</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">2.6.0 中的新功能（自 RC 版起）<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">优化存储格式 v2</h4><p>为应对标量和向量数据混合存储的挑战，特别是非结构化数据的点查找，Milvus 2.6 引入了存储格式 V2。这种新的自适应列式存储格式采用了 "窄列合并+宽列独立 "的布局策略，从根本上解决了向量数据库中处理点查找和小批量检索时的性能瓶颈。</p>
<p>新格式现在支持无 I/O 放大的高效随机存取，与之前采用的 vanilla Parquet 格式相比，性能最多可提升 100 倍，非常适合同时需要分析处理和精确向量检索的人工智能工作负载。此外，它还能将典型工作负载的文件数量减少高达 98%。主要压缩的内存消耗减少了 300%，I/O 操作的读取优化高达 80%，写入优化超过 600%。</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON 扁平索引（测试版）</h4><p>Milvus 2.6 引入了 JSON 扁平索引，以处理高度动态的 JSON Schema。JSON 路径索引需要预先声明特定路径及其预期类型，而 JSON 扁平索引则不同，它会自动发现并索引给定路径下的所有嵌套结构。在为一个 JSON 字段建立索引时，它会递归地对整个子树进行扁平化处理，为遇到的每一个路径-值对创建反转索引条目，而不管其深度或类型如何。 这种自动扁平化处理使 JSON Flat Index 非常适合不断演化的 Schema，因为在这种情况下，新字段的出现会毫无征兆。例如，如果你为 "元数据 "字段建立索引，系统会自动处理传入数据中出现的 "metadata.version2.features.experimental "等新嵌套字段，而不需要新的索引配置。</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">核心 2.6.0 功能回顾<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>有关 2.6.0-RC 中引入的架构更改和功能的详细信息，请参阅<a href="#v260-rc1">2.6.0-rc1 发行说明</a>。</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">架构简化</h4><ul>
<li>流节点 (GA) - 集中 WAL 管理</li>
<li>使用 Woodpecker 的本地 WAL - 消除了对 Kafka/Pulsar 的依赖</li>
<li>统一协调器 (MixCoord)；合并 IndexNode 和 DataNode - 降低组件复杂性</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">搜索和分析</h4><ul>
<li>RaBitQ 1 位量化，高召回率</li>
<li>短语匹配</li>
<li>用于重复数据删除的 MinHash LSH</li>
<li>时间感知排序功能</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">开发人员体验</h4><ul>
<li>用于 "数据输入、数据输出 "工作流程的嵌入式功能</li>
<li>在线 Schema 演进</li>
<li>支持 INT8 向量</li>
<li>支持全球语言的增强型标记器</li>
<li>具有懒加载功能的缓存层--处理大于内存的数据集</li>
</ul>
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
<h3 id="Architecture-Changes" class="common-anchor-header">架构变更<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>自 2.6 版起，Milvus 引入了旨在提高性能、可扩展性和易用性的重大架构变更。有关详细信息，请参阅<a href="/docs/zh/architecture_overview.md">Milvus 架构概述</a>。</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">流节点（GA）</h4><p>在以前的版本中，流数据由代理写入 WAL，由查询节点（QueryNode）和数据节点（DataNode）读取。这种架构很难在写入端达成共识，读取端需要复杂的逻辑。此外，查询委托器位于 QueryNode 中，妨碍了可扩展性。Milvus 2.5.0 引入了流节点（Streaming Node），并在 2.6.0 版本中成为 GA。该组件现在负责所有碎片级 WAL 读/写操作，同时还充当查询委托器，从而解决了上述问题，并实现了新的优化。</p>
<p><strong>重要升级通知</strong>：流节点是一项重大的架构变革，因此不支持从以前的版本直接升级到 Milvus 2.6.0-rc1。</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">啄木鸟原生 WAL</h4><p>Milvus 此前的 WAL 依赖于 Kafka 或 Pulsar 等外部系统。这些系统虽然功能强大，但却大大增加了操作的复杂性和资源开销，尤其是对于中小型部署而言。在 Milvus 2.6 中，这些系统被专门构建的云原生 WAL 系统 Woodpecker 取代。Woodpecker 专为对象存储而设计，支持基于本地和对象存储的零磁盘模式，在简化操作的同时提高了性能和可扩展性。</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">数据节点和索引节点合并</h4><p>在 Milvus 2.6 中，压缩、批量导入、统计数据收集和索引建立等任务现在由统一的调度程序管理。以前由数据节点（DataNode）处理的数据持久化功能已移至流节点（Streaming Node）。为简化部署和维护，IndexNode 和 DataNode 已合并为一个 DataNode 组件。这个合并节点现在执行所有这些关键任务，降低了操作复杂性，优化了资源利用率。</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">协调器合并为 MixCoord</h4><p>以前的设计中，RootCoord、QueryCoord 和 DataCoord 模块各自独立，模块间的通信非常复杂。为了简化系统设计，这些组件被合并为一个统一的协调器，称为 MixCoord。这种合并用内部函数调用取代了基于网络的通信，从而降低了分布式编程的复杂性，提高了系统操作的效率，简化了开发和维护工作。</p>
<h3 id="Key-Features" class="common-anchor-header">主要功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1 位量化</h4><p>要处理大规模数据集，1 位量化是提高资源利用率和搜索性能的有效技术。然而，传统方法会对召回率产生负面影响。Milvus 2.6 与原研究作者合作，推出了 1 位量化解决方案 RaBitQ，在保持高召回准确率的同时，提供 1 位压缩的资源和性能优势。</p>
<p>更多信息，请参阅<a href="/docs/zh/ivf-rabitq.md">IVF_RABITQ</a>。</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON 功能增强</h4><p>Milvus 2.6 通过以下改进增强了对 JSON 数据类型的支持：</p>
<ul>
<li><strong>性能</strong>：现在正式支持 JSON 路径索引，允许在 JSON 对象（如<code translate="no">meta.user.location</code> ）内的特定路径上创建反向索引。这避免了对整个对象的扫描，并改善了使用复杂过滤器进行查询的延迟。</li>
<li><strong>功能性</strong>：为支持更复杂的过滤逻辑，本版本新增了对<code translate="no">JSON_CONTAINS</code>,<code translate="no">JSON_EXISTS</code>,<code translate="no">IS NULL</code> 和<code translate="no">CAST</code> 函数的支持。 展望未来，我们在 JSON 支持方面的工作仍在继续。我们很高兴地预告，即将发布的正式版本将提供更强大的功能，如<strong>JSON 切碎</strong>和<strong>JSON FLAT 索引</strong>，旨在显著提高高度嵌套的 JSON 数据的性能。</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">分析器/令牌器功能增强</h4><p>通过对分析器和令牌器的多项更新，该版本大大增强了文本处理功能：</p>
<ul>
<li>新的<a href="/docs/zh/analyzer-overview.md#Example-use">运行分析器</a>语法可用于验证令牌器配置。</li>
<li>集成了<a href="/docs/zh/lindera-tokenizer.md">Lindera 标记符号生成器</a>，以改进对日语和韩语等亚洲语言的支持。</li>
<li>现在支持行级标记符选择，通用<a href="/docs/zh/icu-tokenizer.md">ICU 标记符可</a>作为多语言场景的备用<a href="/docs/zh/icu-tokenizer.md">标记符</a>。</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">数据输入、数据输出与 Embeddings 功能</h4><p>Milvus 2.6 引入了 "数据输入、数据输出 "功能，通过直接与第三方嵌入模型（如 OpenAI、AWS Bedrock、Google Vertex AI 和 Hugging Face）集成，简化了人工智能应用程序开发。用户现在可以使用原始文本数据进行插入和查询，Milvus 会自动调用指定的模型服务，实时将文本转换为向量。这样就不再需要单独的向量转换管道了。</p>
<p>更多信息，请参阅<a href="/docs/zh/embedding-function-overview.md">Embedding 功能概述</a>。</p>
<h4 id="Phrase-Match" class="common-anchor-header">短语匹配</h4><p>短语匹配是一种文本搜索功能，只有当查询中的精确单词序列以正确的顺序连续出现在文档中时，才会返回结果。</p>
<p><strong>主要特点</strong>：</p>
<ul>
<li>顺序敏感：单词必须以与查询中相同的顺序出现。</li>
<li>连续匹配：除非使用了斜率值，否则单词必须紧挨着出现。</li>
<li>斜率（可选）：这是一个可调整的参数，允许少量间隔词，从而实现模糊短语匹配。</li>
</ul>
<p>更多信息，请参阅<a href="/docs/zh/phrase-match.md">短语匹配</a>。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">最小哈希 LSH 索引（测试版）</h4><p>为满足模型训练中重复数据删除的需求，Milvus 2.6 增加了对 MINHASH_LSH 索引的支持。该功能提供了一种计算效率高、可扩展的方法，用于估算文档之间的 Jaccard 相似性，以识别近似重复的文档。用户可以在预处理过程中为文本文档生成 MinHash 签名，并在 Milvus 中使用 MINHASH_LSH 索引高效地查找大规模数据集中的相似内容，从而提高数据清理和模型质量。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">时间感知衰减函数</h4><p>Milvus 2.6 引入了时间感知衰减函数，以解决信息价值随时间变化的情况。在结果重新排序过程中，用户可以根据时间戳字段应用指数、高斯或线性衰减函数来调整文档的相关性得分。这可以确保优先处理较新的内容，这对新闻源、电子商务和人工智能 Agents 的记忆等应用至关重要。</p>
<p>如需了解更多信息，请参阅 "<a href="/docs/zh/decay-ranker-overview.md">衰减排名器概述</a>"。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">为在线 Schema 演进添加字段</h4><p>为了提供更大的模式灵活性，Milvus 2.6 现在支持向现有 Collections 的模式在线添加新的标量字段。这就避免了在应用需求发生变化时创建新 Collections 和执行破坏性数据迁移的需要。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/add-fields-to-an-existing-collection.md">向现有 Collections 添加字段</a>。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 向量支持</h4><p>为了应对产生 8 位整数嵌入的量化模型的使用日益增多，Milvus 2.6 增加了对 INT8 向量的本地数据类型支持。这样，用户就可以直接摄取这些向量，而无需去量化，从而节省了计算、网络带宽和存储成本。该功能最初支持 HNSW 系列索引。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/dense-vector.md">密集向量</a>。</p>
