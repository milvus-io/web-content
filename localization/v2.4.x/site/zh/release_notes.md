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
    </button></h1><p>了解 Milvus 的新功能！本页总结了每个版本的新功能、改进、已知问题和错误修复。您可以在本部分找到 v2.4.0 之后每个版本的发布说明。我们建议您定期访问此页面以了解更新信息。</p>
<h2 id="v2414" class="common-anchor-header">v2.4.14<button data-href="#v2414" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 10 月 31 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.14</td><td>2.4.9</td><td>2.4.7</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.14 解决了 2.4.13 版中的一个关键问题，该问题可能导致<code translate="no">snapshotKV</code> 垃圾收集后丢失 Collection 信息。它还修复了几个资源泄漏问题。此外，该版本还包含大量增强功能，主要用于提高大规模删除操作的稳定性和压缩性能。</p>
<h3 id="Features" class="common-anchor-header">功能特性</h3><ul>
<li>支持内存模式块缓存<a href="https://github.com/milvus-io/milvus/pull/35836">（#35836）</a></li>
<li>支持用于 bulkinsert 的 db<a href="https://github.com/milvus-io/milvus/pull/37017">(#37017</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>删除/压缩优化<ul>
<li>启用 l0 压缩并行执行<a href="https://github.com/milvus-io/milvus/pull/36985">（#36985）</a></li>
<li>使用直接转发时，对转发删除进行批量处理<a href="https://github.com/milvus-io/milvus/pull/37107">（#37107）</a></li>
<li>使用 remoteload 时，跳过在委托器中加载 delta 数据<a href="https://github.com/milvus-io/milvus/pull/37112">（#37112）</a></li>
<li>直接转发不包括 l0 段的 delta<a href="https://github.com/milvus-io/milvus/pull/36914">(#36914</a>)</li>
<li>在 DataCoord 中添加了压缩任务的优先级<a href="https://github.com/milvus-io/milvus/pull/36979">（＃36979）</a></li>
<li>跟踪复杂删除率<a href="https://github.com/milvus-io/milvus/pull/36958">（＃36958）</a></li>
</ul></li>
<li>重构了 RESTFul API 中的 CreateCollection<a href="https://github.com/milvus-io/milvus/pull/36885">（#36885）</a></li>
<li>将多个 "和 "与 "或 "操作合并为一个操作符<a href="https://github.com/milvus-io/milvus/pull/36973">（#36973）</a></li>
<li>使跳过加载适用于所有分支<a href="https://github.com/milvus-io/milvus/pull/37161">（#37161）</a></li>
<li>升级 Minio 依赖关系以支持 EKS Pod Identities<a href="https://github.com/milvus-io/milvus/pull/37089">(#37089</a>)</li>
<li>精简导入选项<a href="https://github.com/milvus-io/milvus/pull/37078">(#37078</a>)</li>
<li>限制导入工作的最大数量<a href="https://github.com/milvus-io/milvus/pull/36892">（#36892）</a></li>
<li>预分配数据片段以避免重新分配内存<a href="https://github.com/milvus-io/milvus/pull/37044">(#37044</a>)</li>
<li>防止数据节点加载 bf<a href="https://github.com/milvus-io/milvus/pull/37027">(#37027</a>)</li>
<li>避免重复限制 ddl 操作符<a href="https://github.com/milvus-io/milvus/pull/37011">（＃37011）</a></li>
<li>使配置项<code translate="no">datanode.import.maxconcurrenttasknum</code> 可动态调整<a href="https://github.com/milvus-io/milvus/pull/37103">（＃37103）</a></li>
<li>使用<code translate="no">queryNode.mmap.growingMmapEnabled</code> 控制临时索引的行为<a href="https://github.com/milvus-io/milvus/pull/36391">（＃36391）</a></li>
<li>在成长段的 segmentLoadInfo 中填充<code translate="no">Level</code> 和<code translate="no">StartPosition</code> 字段<a href="https://github.com/milvus-io/milvus/pull/36911">(#36911</a>)</li>
<li>在收到 drop Collections 消息时强制停止缓冲消息<a href="https://github.com/milvus-io/milvus/pull/36917">（#36917）</a></li>
<li>为查询节点删除缓冲区信息添加了指标<a href="https://github.com/milvus-io/milvus/pull/37097">（#37097）</a></li>
<li>为某些指标添加了 Collections 名称标签<a href="https://github.com/milvus-io/milvus/pull/37159">(#37159</a>)</li>
<li>使用中间件观察 RESTful v2 输入/输出 rpc 统计信息<a href="https://github.com/milvus-io/milvus/pull/37224">（#37224）</a></li>
<li>更改了 GPU 默认内存池大小<a href="https://github.com/milvus-io/milvus/pull/36969">（#36969）</a></li>
<li>将Knowhere版本更新至2.3.12<a href="https://github.com/milvus-io/milvus/pull/37132">（#37132）</a></li>
<li>允许在磁盘配额用完时删除数据<a href="https://github.com/milvus-io/milvus/pull/37139">（#37139）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>修正了在所有快照都被垃圾回收的情况下，重启后无法从 metakv 恢复 Collections 信息的问题<a href="https://github.com/milvus-io/milvus/pull/36950">(#36950</a>)</li>
<li>修正了 rpc 错误代码，以避免客户端无效重试<a href="https://github.com/milvus-io/milvus/pull/37025">(#37025</a>)</li>
<li>忽略配额中心未找到数据库的错误<a href="https://github.com/milvus-io/milvus/pull/36850">(#36850</a>)</li>
<li>通过使用单例删除池，修正了查询节点中的程序泄漏<a href="https://github.com/milvus-io/milvus/pull/37225">（＃37225）</a></li>
<li>修复了查询节点中的 Collections 泄漏问题<a href="https://github.com/milvus-io/milvus/pull/37079">(#37079</a>)</li>
<li>修正了聚类压缩任务的泄漏<a href="https://github.com/milvus-io/milvus/pull/36803">（#36803）</a></li>
<li>禁止重命名有别名的 Collections<a href="https://github.com/milvus-io/milvus/pull/37208">(#37208</a>)</li>
<li>确保缓存别名<a href="https://github.com/milvus-io/milvus/pull/36808">（#36808）</a></li>
<li>更新委托人缓存时搜索/查询可能失败<a href="https://github.com/milvus-io/milvus/pull/37174">（#37174）</a></li>
<li>执行集群时排除 l0 压缩<a href="https://github.com/milvus-io/milvus/pull/37142">（#37142）</a></li>
<li>仅加载 l0 段元时引用 Collections 元<a href="https://github.com/milvus-io/milvus/pull/37179">（#37179）</a></li>
<li>重新启动 querycoord 后，委托者可能无法使用<a href="https://github.com/milvus-io/milvus/pull/37100">（#37100）</a></li>
<li>动态释放分区可能导致搜索/查询失败<a href="https://github.com/milvus-io/milvus/pull/37099">(#37099</a>)</li>
<li>修正了删除缓冲区行数配额值<a href="https://github.com/milvus-io/milvus/pull/37068">(#37068</a>)</li>
<li>启用部分加载时传递完整字段列表<a href="https://github.com/milvus-io/milvus/pull/37063">(#37063</a>)</li>
<li>向 Worker 发送 rpc 时发生查询节点恐慌<a href="https://github.com/milvus-io/milvus/pull/36988">（＃36988）</a></li>
<li>Datacoord 在停止进程时卡住<a href="https://github.com/milvus-io/milvus/pull/36961">（＃36961）</a></li>
<li>当原始数据被临时索引替换时，修正了增长段中的越界访问<a href="https://github.com/milvus-io/milvus/pull/36938">（＃36938）</a></li>
<li>Rootcoord 在优雅停止时卡住的问题<a href="https://github.com/milvus-io/milvus/pull/36881">（#36881）</a></li>
</ul>
<h2 id="v2413-hotfix" class="common-anchor-header">版本 2.4.13-热修复<button data-href="#v2413-hotfix" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 10 月 17 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.13-hotfix</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus v2.4.13-hotfix 解决了 v2.4.13 特有的一个关键问题，即如果所有 MetaKV 快照都被垃圾 Collections<a href="https://github.com/milvus-io/milvus/pull/36933">（#36933</a>），则重启后 Milvus 可能无法检索 Collections 信息。<strong>建议当前运行 v2.4.13 的用户尽早升级到 v2.4.13-hotfix，以避免潜在的中断</strong>。</p>
<h3 id="Critical-fixes" class="common-anchor-header">关键修复</h3><ul>
<li>如果时间戳为 MaxTimestamp，则加载原始密钥<a href="https://github.com/milvus-io/milvus/pull/36935">(#36935</a>)</li>
</ul>
<h2 id="Deprecated-v2413" class="common-anchor-header">[已废弃] v2.4.13<button data-href="#Deprecated-v2413" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 10 月 12 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.13</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.13 引入了动态副本加载，允许用户调整 Collections 的副本数量，而无需释放和重新加载 Collections。该版本还解决了与批量导入、表达式解析、负载平衡和故障恢复有关的几个关键错误。此外，还对 MMAP 资源使用和导入性能进行了重大改进，提高了系统的整体效率。我们强烈建议升级到该版本，以获得更好的性能和稳定性。</p>
<h3 id="Features" class="common-anchor-header">功能特点</h3><ul>
<li>对已加载的 Collections 进行动态复制调整<a href="https://github.com/milvus-io/milvus/pull/36417">(#36417</a>)</li>
<li>不断增长的段类型中的稀疏向量 MMAP<a href="https://github.com/milvus-io/milvus/pull/36565">(#36565</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修复了一个刷新性能问题<a href="https://github.com/milvus-io/milvus/pull/36741">（#36741）</a></li>
<li>修复了&quot;[]&quot;中 JSON 表达式的一个错误<a href="https://github.com/milvus-io/milvus/pull/36722">（#36722）</a></li>
<li>如果紧凑目标未编入索引，则移除邻居<a href="https://github.com/milvus-io/milvus/pull/36694">（#36694）</a></li>
<li>提高了通道已满时 Rocksmq 的性能<a href="https://github.com/milvus-io/milvus/pull/36618">（#36618）</a></li>
<li>修正了一个问题，即在解钉入过程中错误不会延迟<a href="https://github.com/milvus-io/milvus/pull/36665">（#36665）</a></li>
<li>解决了段管理器中导入段的内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/36631">（#36631）</a></li>
<li>跳过了代理中查询节点不必要的健康检查<a href="https://github.com/milvus-io/milvus/pull/36553">(#36553</a>)</li>
<li>修复了术语表达式的溢出问题<a href="https://github.com/milvus-io/milvus/pull/36534">(#36534</a>)</li>
<li>在分配任务前记录节点 ID，以防止任务分配错误<a href="https://github.com/milvus-io/milvus/pull/36493">（＃36493）</a></li>
<li>解决了聚类压缩中的数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/36499">（＃36499）</a></li>
<li>在类型匹配后添加了对字符串数组最大长度的检查<a href="https://github.com/milvus-io/milvus/pull/36497">（＃36497）</a></li>
<li>解决了混合或独立模式下的竞赛问题<a href="https://github.com/milvus-io/milvus/pull/36459">（#36459）</a></li>
<li>修正了重复加载和释放操作后的段不平衡问题<a href="https://github.com/milvus-io/milvus/pull/36543">(#36543</a>)</li>
<li>修正了一个无法从停止节点移动数据段的角落情况<a href="https://github.com/milvus-io/milvus/pull/36475">（#36475）</a></li>
<li>即使某些程序段丢失，也能正确更新程序段信息<a href="https://github.com/milvus-io/milvus/pull/36729">（#36729）</a></li>
<li>防止快照 KV 中的 etcd 事务超过最大限制<a href="https://github.com/milvus-io/milvus/pull/36773">（#36773）</a></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>增强了 MMAP 资源估算：<ul>
<li>改进了 column.h 中与 MMAP 相关的代码<a href="https://github.com/milvus-io/milvus/pull/36521">(#36521</a>)</li>
<li>改进了加载 Collections 时的资源估算<a href="https://github.com/milvus-io/milvus/pull/36728">（#36728）</a></li>
</ul></li>
<li>性能增强：<ul>
<li>通过将 Unicode 转换为 ASCII 提高了表达式解析效率<a href="https://github.com/milvus-io/milvus/pull/36676">(#36676</a>)</li>
<li>支持并行生成多个主题的信息<a href="https://github.com/milvus-io/milvus/pull/36462">（#36462）</a></li>
<li>计算索引文件大小时减少了 CPU 开销<a href="https://github.com/milvus-io/milvus/pull/36580">（#36580）</a></li>
<li>从报文头读取报文类型，以尽量减少解码<a href="https://github.com/milvus-io/milvus/pull/36454">（＃36454）</a></li>
<li>优化了基于工作负载的副本选择策略<a href="https://github.com/milvus-io/milvus/pull/36384">（#36384）</a></li>
</ul></li>
<li>拆分删除任务消息以适应最大消息大小限制<a href="https://github.com/milvus-io/milvus/pull/36574">（#36574）</a></li>
<li>添加了新的 RESTful URL 以描述导入任务<a href="https://github.com/milvus-io/milvus/pull/36754">（#36754）</a></li>
<li>优化了导入调度并添加了时间成本指标<a href="https://github.com/milvus-io/milvus/pull/36684">（#36684）</a></li>
<li>为查询协调平衡器添加了平衡报告日志<a href="https://github.com/milvus-io/milvus/pull/36749">（＃36749）</a></li>
<li>改用通用 GC 配置<a href="https://github.com/milvus-io/milvus/pull/36670">(#36670</a>)</li>
<li>为委托者添加了流式转发策略开关<a href="https://github.com/milvus-io/milvus/pull/36712">（#36712）</a></li>
<li>为无索引的 Collections 启用手动压缩<a href="https://github.com/milvus-io/milvus/pull/36581">(#36581</a>)</li>
<li>在具有不同内存容量的查询节点上启用负载平衡<a href="https://github.com/milvus-io/milvus/pull/36625">（#36625）</a></li>
<li>使用 metrics.label 统一入站标签案例<a href="https://github.com/milvus-io/milvus/pull/36616">(#36616</a>)</li>
<li>使传输通道/分段操作具有幂等性<a href="https://github.com/milvus-io/milvus/pull/36552">(#36552</a>)</li>
<li>添加了监控导入吞吐量和导入行数的指标<a href="https://github.com/milvus-io/milvus/pull/36588">(#36588</a>)</li>
<li>防止在目标中创建多个计时器对象<a href="https://github.com/milvus-io/milvus/pull/36573">(#36573</a>)</li>
<li>更新了表达式版本和表达式的 HTTP 响应格式<a href="https://github.com/milvus-io/milvus/pull/36467">(#36467</a>)</li>
<li>增强了快照 KV 中的垃圾 Collections<a href="https://github.com/milvus-io/milvus/pull/36793">（＃36793）</a></li>
<li>添加了对使用上下文参数执行方法的支持<a href="https://github.com/milvus-io/milvus/pull/36798">（＃36798）</a></li>
</ul>
<h2 id="v2412" class="common-anchor-header">v2.4.12<button data-href="#v2412" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 9 月 26 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.12</td><td>2.4.7</td><td>2.4.4</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.12 引入了重大增强功能和关键错误修复。该版本解决了数据重复问题，提高了故障恢复速度，尤其是在处理大量删除时。不过，仍存在一个已知问题，即在删除大量数据时，故障恢复速度可能会很慢。我们正在积极解决这个问题。</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>为 flowgraph 管理器实现了优雅停止<a href="https://github.com/milvus-io/milvus/pull/36358">(#36358</a>)</li>
<li>禁用了对未加载向量字段的索引检查<a href="https://github.com/milvus-io/milvus/pull/36280">（#36280）</a></li>
<li>在 delta 加载过程中过滤掉了未命中的删除记录<a href="https://github.com/milvus-io/milvus/pull/36272">（#36272）</a></li>
<li>改进了对 std::stoi 异常的错误处理<a href="https://github.com/milvus-io/milvus/pull/36296">（＃36296）</a></li>
<li>禁止使用关键字作为字段名或动态字段名<a href="https://github.com/milvus-io/milvus/pull/36108">(#36108</a>)</li>
<li>为 L0 段中的删除条目添加了度量指标<a href="https://github.com/milvus-io/milvus/pull/36227">（＃36227）</a></li>
<li>实施了 L0 转发策略以支持远程加载<a href="https://github.com/milvus-io/milvus/pull/36208">(#36208</a>)</li>
<li>在代理中添加了 ANN 字段加载检查<a href="https://github.com/milvus-io/milvus/pull/36194">（＃36194）</a></li>
<li>启用空稀疏行支持<a href="https://github.com/milvus-io/milvus/pull/36061">（＃36061）</a></li>
<li>修复了一个安全漏洞<a href="https://github.com/milvus-io/milvus/pull/36156">（＃36156）</a></li>
<li>实施了请求/响应大小度量的统计处理程序<a href="https://github.com/milvus-io/milvus/pull/36118">(#36118</a>)</li>
<li>修正了编码数组数据的大小估算<a href="https://github.com/milvus-io/milvus/pull/36379">（#36379）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>解决了具有两个向量字段的 Collections 的度量类型错误<a href="https://github.com/milvus-io/milvus/pull/36473">（#36473）</a></li>
<li>修正了导致消息队列接收失败的长缓冲问题<a href="https://github.com/milvus-io/milvus/pull/36425">（#36425）</a></li>
<li>在支持拆分后实现了适当的压缩到分段返回<a href="https://github.com/milvus-io/milvus/pull/36429">（#36429）</a></li>
<li>解决了节点 ID 检查程序的数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/36377">（＃36377）</a></li>
<li>删除了元素类型检查<a href="https://github.com/milvus-io/milvus/pull/36324">（#36324）</a></li>
<li>修复了增长和密封分段的并发访问问题<a href="https://github.com/milvus-io/milvus/pull/36288">（#36288）</a></li>
<li>实现了未来有状态锁<a href="https://github.com/milvus-io/milvus/pull/36333">（#36333）</a></li>
<li>纠正了 HybridSearch 中偏移量的使用<a href="https://github.com/milvus-io/milvus/pull/36287">（#36287</a>、<a href="https://github.com/milvus-io/milvus/pull/36253">#36253）</a></li>
<li>解决了查询节点上的脏段/通道泄漏问题<a href="https://github.com/milvus-io/milvus/pull/36259">（#36259）</a></li>
<li>修正了主键重复处理<a href="https://github.com/milvus-io/milvus/pull/36274">（#36274）</a></li>
<li>在搜索请求中强制执行度量类型设置<a href="https://github.com/milvus-io/milvus/pull/36279">（#36279）</a></li>
<li>修正了存储索引文件大小的度量清除问题<a href="https://github.com/milvus-io/milvus/pull/36161">(#36161</a>)</li>
<li>修正了全局 API 访问的读写权限组行为<a href="https://github.com/milvus-io/milvus/pull/36145">(#36145</a>)</li>
</ul>
<h2 id="v2411" class="common-anchor-header">v2.4.11<button data-href="#v2411" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 9 月 11 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.11</td><td>2.4.6</td><td>2.4.3</td><td>2.4.8</td></tr>
</tbody>
</table>
<p>Milvus 2.4.11 是一个错误修复版本，解决了与 MARISA 三角索引、压缩和加载操作有关的多个关键问题。该版本引入了查看表达式和提高删除稳定性的新功能。我们建议所有 2.4.x 系列的用户升级到此版本，以受益于这些改进和修复。</p>
<h3 id="Features" class="common-anchor-header">新功能</h3><ul>
<li>为 2.4 版中的表达式添加了静态视图<a href="https://github.com/milvus-io/milvus/pull/35954">(#35954</a>)</li>
<li>实现了与删除缓冲区相关的配额逻辑<a href="https://github.com/milvus-io/milvus/pull/35997">(#35997</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>解决了针对 GreaterThan 和 GreaterThanEqual 比较的 Trie 索引范围操作符问题<a href="https://github.com/milvus-io/milvus/pull/36126">(#36126</a>)</li>
<li>更正了<code translate="no">marisa_label_order</code> 在 Trie 索引构建中的用法<a href="https://github.com/milvus-io/milvus/pull/36060">(#36060</a>)</li>
<li>增强了<code translate="no">trie.predictive_search</code> 的值检查（<a href="https://github.com/milvus-io/milvus/pull/35999">＃35999）</a></li>
<li>在反转索引中启用二进制算术表达式支持<a href="https://github.com/milvus-io/milvus/pull/36097">（＃36097）</a></li>
<li>修复了由 Skipindex 引起的段故障<a href="https://github.com/milvus-io/milvus/pull/35908">(#35908</a>)</li>
<li>解决了代理元缓存中的内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/36076">(#36076</a>)</li>
<li>重命名了 mmap 文件路径以防止目录冲突<a href="https://github.com/milvus-io/milvus/pull/35975">(#35975</a>)</li>
<li>改进了混合压缩中失败/超时任务的日志记录和清理<a href="https://github.com/milvus-io/milvus/pull/35967">（#35967）</a></li>
<li>解决了委托人高内存使用时的逻辑死锁问题<a href="https://github.com/milvus-io/milvus/pull/36066">(#36066</a>)</li>
<li>当压实删除所有插入时，实现了空段创建<a href="https://github.com/milvus-io/milvus/pull/36045">（＃36045）</a></li>
<li>更正了 2.4 中旧版本加载信息中的加载字段列表<a href="https://github.com/milvus-io/milvus/pull/36018">（＃36018）</a></li>
<li>修正了 2.4 中的跟踪配置更新逻辑<a href="https://github.com/milvus-io/milvus/pull/35998">(#35998</a>)</li>
<li>解决了动态分区发布期间搜索/查询请求失败的问题<a href="https://github.com/milvus-io/milvus/pull/36019">(#36019</a>)</li>
<li>防止覆盖回退参数<a href="https://github.com/milvus-io/milvus/pull/36006">(#36006</a>)</li>
<li>确保正确注册特权组以进行验证<a href="https://github.com/milvus-io/milvus/pull/35938">(#35938</a>)</li>
<li>防止错误清理数据库限制器节点<a href="https://github.com/milvus-io/milvus/pull/35992">（#35992）</a></li>
<li>解决了故障恢复后副本不参与查询的问题<a href="https://github.com/milvus-io/milvus/pull/35925">（#35925）</a></li>
<li>解决了聚类压缩写入器中的数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/35958">（#35958）</a></li>
<li>修复了移动操作后的变量引用问题<a href="https://github.com/milvus-io/milvus/pull/35904">（#35904）</a></li>
<li>实施了集群键跳过加载行为检查<a href="https://github.com/milvus-io/milvus/pull/35899">（#35899）</a></li>
<li>确保在 2.4 中单次启动 querycoord 观察器<a href="https://github.com/milvus-io/milvus/pull/35817">（#35817）</a></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>将 Milvus 和 proto 版本升级到 2.4.11<a href="https://github.com/milvus-io/milvus/pull/36069">(#36069</a>)</li>
<li>解决了单元测试中的内存泄漏问题，并启用了单元测试构建中的 use_asan 选项<a href="https://github.com/milvus-io/milvus/pull/35857">(#35857</a>)</li>
<li>将 l0segmentsrowcount 限制调整为更合适的值<a href="https://github.com/milvus-io/milvus/pull/36015">(#36015</a>)</li>
<li>将 deltalog 内存估算系数修改为 1<a href="https://github.com/milvus-io/milvus/pull/36035">(#36035</a>)</li>
<li>为加载字段列表比较实施了片段验证<a href="https://github.com/milvus-io/milvus/pull/36062">（＃36062）</a></li>
<li>降低了删除操作的日志频率<a href="https://github.com/milvus-io/milvus/pull/35981">（＃35981）</a></li>
<li>将 etcd 版本升级至 3.5.14<a href="https://github.com/milvus-io/milvus/pull/35977">(#35977</a>)</li>
<li>优化了预热后的 mmap-rss 缩减<a href="https://github.com/milvus-io/milvus/pull/35965">（＃35965）</a></li>
<li>删除了读取请求速率限制器中的冷却期<a href="https://github.com/milvus-io/milvus/pull/35936">（#35936）</a></li>
<li>增强了对先前加载过的 Collections 的加载字段检查<a href="https://github.com/milvus-io/milvus/pull/35910">（#35910）</a></li>
<li>在 2.4 中添加了对放弃与特权列表相关的角色的支持<a href="https://github.com/milvus-io/milvus/pull/35863">（#35863）</a></li>
<li>实施了 depguard 规则，禁止使用已废弃的 proto 库<a href="https://github.com/milvus-io/milvus/pull/35818">（#35818）</a></li>
</ul>
<h3 id="Others" class="common-anchor-header">其他</h3><ul>
<li>更新了 Knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/36067">(#36067</a>)</li>
</ul>
<h2 id="v2410" class="common-anchor-header">v2.4.10<button data-href="#v2410" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期： 2024 年 8 月 30 日2024 年 8 月 30 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.10</td><td>2.4.6</td><td>2.4.3</td><td>2.4.6</td></tr>
</tbody>
</table>
<p>Milvus 2.4.10 在功能和稳定性方面都有显著改进。主要功能包括支持在启用 AutoID 的 Collections 上进行 upsert 操作、部分 Collections 加载功能以及各种内存映射 (MMAP) 配置，以优化内存使用。该版本还解决了导致恐慌、内核转储和资源泄漏的几个错误。我们建议升级以充分利用这些改进。</p>
<h3 id="Features" class="common-anchor-header">功能特性</h3><ul>
<li><strong>带自动 ID 的倒插</strong>操作：支持自动生成 ID 的倒插操作<a href="https://github.com/milvus-io/milvus/pull/34633">(#34633</a>)</li>
<li><strong>字段部分加载 Collections</strong>[测试版预览]：允许加载 Collections 的特定字段<a href="https://github.com/milvus-io/milvus/pull/35696">(#35696</a>)</li>
<li><strong>RBAC 增强功能</strong>：<ul>
<li>为变更数据捕获（CDC）添加了 RBAC 消息支持（<a href="https://github.com/milvus-io/milvus/pull/35562">#35562）</a></li>
<li>引入只读/读写/管理员权限组，以简化 RBAC 授权流程<a href="https://github.com/milvus-io/milvus/pull/35543">(#35543</a>)</li>
<li>用于备份和恢复 RBAC 配置的新 API<a href="https://github.com/milvus-io/milvus/pull/35513">(#35513</a>)</li>
<li>恢复 RBAC 元数据后刷新代理缓存<a href="https://github.com/milvus-io/milvus/pull/35636">（＃35636）</a></li>
</ul></li>
<li><strong>改进了 MMAP 配置</strong>：控制 MMAP 行为的更多通用配置选项<a href="https://github.com/milvus-io/milvus/pull/35609">(#35609</a>)</li>
<li><strong>数据库访问限制</strong>：限制数据库读取访问的新属性<a href="https://github.com/milvus-io/milvus/pull/35754">（#35754）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了箭头围棋客户端不返回错误的问题<a href="https://github.com/milvus-io/milvus/pull/35820">（#35820）</a></li>
<li>修正了不准确的速率限制<a href="https://github.com/milvus-io/milvus/pull/35700">（#35700）</a></li>
<li>解决了导入相关 API 失败后代理恐慌的问题<a href="https://github.com/milvus-io/milvus/pull/35559">（#35559）</a></li>
<li>修正了 GC 通道检查点期间可能出现的错误删除<a href="https://github.com/milvus-io/milvus/pull/35708">（#35708）</a></li>
<li>解决了因候选导入段为空而导致的恐慌<a href="https://github.com/milvus-io/milvus/pull/35674">（#35674）</a></li>
<li>修正了 mmap 内存分配<a href="https://github.com/milvus-io/milvus/pull/35726">（#35726）</a></li>
<li>确保从 2.2 升级到 2.4 时正确观察通道<a href="https://github.com/milvus-io/milvus/pull/35695">（#35695）</a></li>
<li>修正了数据节点解除观察通道释放功能<a href="https://github.com/milvus-io/milvus/pull/35657">（#35657）</a></li>
<li>修正了 RootCoord 元数据中的分区计数<a href="https://github.com/milvus-io/milvus/pull/35601">（#35601）</a></li>
<li>解决了某些参数的动态配置更新问题<a href="https://github.com/milvus-io/milvus/pull/35637">(#35637</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><h4 id="Performance" class="common-anchor-header">性能</h4><ul>
<li>优化了动态 Field 的检索<a href="https://github.com/milvus-io/milvus/pull/35602">(#35602</a>)</li>
<li>提高了 AVX512 的比特集性能<a href="https://github.com/milvus-io/milvus/pull/35480">（#35480）</a></li>
<li>在<code translate="no">once</code> 初始化后重新读取值，以提高效率<a href="https://github.com/milvus-io/milvus/pull/35643">(#35643</a>)</li>
</ul>
<h4 id="Rolling-upgrade-improvements" class="common-anchor-header">滚动升级改进</h4><ul>
<li>将暂停后的查询节点标记为只读节点<a href="https://github.com/milvus-io/milvus/pull/35586">(#35586</a>)</li>
<li>防止旧协调器与新节点/代理共存<a href="https://github.com/milvus-io/milvus/pull/35760">（#35760）</a></li>
</ul>
<h4 id="Others" class="common-anchor-header">其他</h4><ul>
<li>优化了 Milvus 核心构建流程<a href="https://github.com/milvus-io/milvus/pull/35660">(#35660</a>)</li>
<li>更新至 protobuf-go v2<a href="https://github.com/milvus-io/milvus/pull/35555">(#35555</a>)</li>
<li>为 traceid 和 spanid 增强了使用十六进制字符串编码的追踪功能<a href="https://github.com/milvus-io/milvus/pull/35568">(#35568</a>)</li>
<li>为查询钩子添加了命中段数指标<a href="https://github.com/milvus-io/milvus/pull/35619">(#35619</a>)</li>
<li>改进了配置加载参数功能与旧 SDK 的兼容性<a href="https://github.com/milvus-io/milvus/pull/35573">(#35573</a>)</li>
<li>添加了对 HTTP v1/v2 节流的支持<a href="https://github.com/milvus-io/milvus/pull/35504">（#35504）</a></li>
<li>修正了索引内存估算<a href="https://github.com/milvus-io/milvus/pull/35670">（#35670）</a></li>
<li>能够在混合压缩器中写入多个片段，以避免生成大片段<a href="https://github.com/milvus-io/milvus/pull/35648">（#35648）</a></li>
</ul>
<h2 id="v249" class="common-anchor-header">v2.4.9<button data-href="#v249" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2024 年 8 月 20 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.9</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.9 解决了在某些角落情况下可能返回结果小于 limit (topk) 的关键问题，并包含几项关键改进，以提高平台的性能和可用性。</p>
<h3 id="Critical-fixes" class="common-anchor-header">关键修复</h3><ul>
<li>将 l0 段排除在可读快照之外<a href="https://github.com/milvus-io/milvus/pull/35510">（#35510</a>）。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>删除了代理中重复创建的 Schema 辅助程序<a href="https://github.com/milvus-io/milvus/pull/35502">（#35502</a>）。</li>
<li>添加了对在 Ubuntu 20.04 上编译 Milvus 的支持<a href="https://github.com/milvus-io/milvus/pull/35457">（#35457</a>）。</li>
<li>优化了锁的使用，避免了集群缓冲区写入器的双重刷新<a href="https://github.com/milvus-io/milvus/pull/35490">（#35490</a>）。</li>
<li>删除了无效日志<a href="https://github.com/milvus-io/milvus/pull/35473">（#35473</a>）。</li>
<li>添加了聚类压缩用户指南文档<a href="https://github.com/milvus-io/milvus/pull/35428">（#35428</a>）。</li>
<li>在 Schema 助手中添加了对动态字段的支持<a href="https://github.com/milvus-io/milvus/pull/35469">（#35469</a>）。</li>
<li>在生成的 YAML 中添加了 msgchannel 部分<a href="https://github.com/milvus-io/milvus/pull/35466">（#35466</a>）。</li>
</ul>
<h2 id="v248" class="common-anchor-header">v2.4.8<button data-href="#v248" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 8 月 14 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.8</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus 2.4.8 对系统的性能和稳定性进行了多项重大改进。最显著的特点是实现了聚类压缩，这种机制可根据指定的聚类密钥重新分配大型 Collections 中的数据，减少扫描的数据量，从而提高搜索和查询效率。压缩还与分片数据节点解耦，允许任何数据节点独立执行压缩，从而提高了容错性、稳定性、性能和可扩展性。此外，还重构了 Go 和 C++ 组件之间的接口，使用异步 CGO 调用，解决了会话超时等问题，并根据剖析结果对其他性能进行了优化。此外，还更新了应用程序的依赖关系，以解决已知的安全漏洞。此外，该版本还包含大量性能优化和重要错误修复。</p>
<h3 id="Features" class="common-anchor-header">功能特性</h3><ul>
<li>实现了聚类压缩，允许根据指定的聚类密钥重新分配数据，以提高查询效率<a href="https://github.com/milvus-io/milvus/pull/34326">(#34326</a>),<a href="https://github.com/milvus-io/milvus/pull/34363">(#34363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>在 CGO 中实现了异步搜索和检索功能。<a href="https://github.com/milvus-io/milvus/pull/34200">(#34200</a>)</li>
<li>将压缩过程从碎片数据节点中分离出来，以提高系统模块化程度。<a href="https://github.com/milvus-io/milvus/pull/34157">(#34157</a>)</li>
<li>在代理/委托器中的 QueryNode 中添加了对客户端池的支持，以提高性能。<a href="https://github.com/milvus-io/milvus/pull/35195">(#35195</a>)</li>
<li>在 Gin 和 RestfulV1 处理器中集成了 Sonic，以尽量减少 JSON marshaling 和 unmarshaling 过程中的 CPU 开销。<a href="https://github.com/milvus-io/milvus/pull/35018">(#35018</a>)</li>
<li>引入内存缓存，优化验证结果检索。<a href="https://github.com/milvus-io/milvus/pull/35272">(#35272</a>)</li>
<li>修改了自动索引的默认度量类型。[<a href="https://github.com/milvus-io/milvus/pull/34277">#34277</a>,<a href="https://github.com/milvus-io/milvus/pull/34479">#34479</a>]</li>
<li>重构了变量列的运行时内存格式，从而减少了内存使用。<a href="https://github.com/milvus-io/milvus/pull/34367">[#34367</a>,<a href="https://github.com/milvus-io/milvus/pull/35012">#35012</a>,<a href="https://github.com/milvus-io/milvus/pull/35041">#35041</a>]</li>
<li>重构了压缩过程，以启用持久数据存储。<a href="https://github.com/milvus-io/milvus/pull/34268">(#34268</a>)</li>
<li>为不断增长的段启用内存映射文件支持，改善内存管理。<a href="https://github.com/milvus-io/milvus/pull/34110">(#34110</a>)</li>
<li>通过添加 RESTful API 支持、记录一致性级别以及区分系统错误和用户错误，改进了访问日志。<a href="https://github.com/milvus-io/milvus/pull/34295">[#34295</a> <a href="https://github.com/milvus-io/milvus/pull/34352">, #34352</a> <a href="https://github.com/milvus-io/milvus/pull/34396">, #34396]</a></li>
<li>在 Knowhere 中使用新的<code translate="no">range_search_k</code> 参数，加快范围搜索速度。<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>应用阻塞式 Bloom 过滤器，提高过滤器构建和查询的速度。[<a href="https://github.com/milvus-io/milvus/pull/34377">#34377</a>,<a href="https://github.com/milvus-io/milvus/pull/34922">#34922</a>]</li>
<li>内存使用改进：<ul>
<li>为数据节点插入缓冲区预分配空间。<a href="https://github.com/milvus-io/milvus/pull/34205">(#34205</a>)</li>
<li>为还原操作预分配<code translate="no">FieldData</code> 。<a href="https://github.com/milvus-io/milvus/pull/34254">(#34254</a>)</li>
<li>在删除编解码器中释放记录以防止内存泄漏。<a href="https://github.com/milvus-io/milvus/pull/34506">(#34506</a>)</li>
<li>在文件加载过程中控制磁盘文件管理器的并发级别。<a href="https://github.com/milvus-io/milvus/pull/35282">(#35282</a>)</li>
<li>优化了 Go 运行时的垃圾 Collections 逻辑，以便及时释放内存。<a href="https://github.com/milvus-io/milvus/pull/34950">(#34950</a>)</li>
<li>为不断增长的分段实施了新的密封策略。<a href="https://github.com/milvus-io/milvus/pull/34779">(#34779</a>)</li>
</ul></li>
<li>增强了 DataCoord：<ul>
<li>降低 CPU 占用率。[<a href="https://github.com/milvus-io/milvus/pull/34231">#34231</a>,<a href="https://github.com/milvus-io/milvus/pull/34309">#34309</a>]</li>
<li>实现了更快的垃圾 Collections 退出逻辑。<a href="https://github.com/milvus-io/milvus/pull/35051">(#35051</a>)</li>
<li>改进了工作节点调度算法。<a href="https://github.com/milvus-io/milvus/pull/34382">(#34382</a>)</li>
<li>增强了专门针对导入操作的段大小控制算法。<a href="https://github.com/milvus-io/milvus/pull/35149">(#35149</a>)</li>
</ul></li>
<li>负载平衡算法改进：<ul>
<li>降低了委托人的内存超载系数。<a href="https://github.com/milvus-io/milvus/pull/35164">(#35164</a>)</li>
<li>为委托人分配固定内存大小。<a href="https://github.com/milvus-io/milvus/pull/34600">(#34600</a>)</li>
<li>避免为新查询节点分配过多的段和通道。<a href="https://github.com/milvus-io/milvus/pull/34245">(#34245</a>)</li>
<li>减少查询协调器每个调度周期的任务数量，同时提高调度频率。<a href="https://github.com/milvus-io/milvus/pull/34987">(#34987</a>)</li>
<li>增强了数据节点上的通道平衡算法<a href="https://github.com/milvus-io/milvus/pull/35033">(#35033</a>)</li>
</ul></li>
<li>扩展了系统指标：在各种组件中添加了新指标，以监控特定方面，包括<ul>
<li>强制拒绝写入状态。<a href="https://github.com/milvus-io/milvus/pull/34989">(#34989</a>)</li>
<li>队列延迟。<a href="https://github.com/milvus-io/milvus/pull/34788">(#34788</a>)</li>
<li>磁盘配额。<a href="https://github.com/milvus-io/milvus/pull/35306">(#35306</a>)</li>
<li>任务执行时间。<a href="https://github.com/milvus-io/milvus/pull/35141">(#35141</a>)</li>
<li>备用日志大小。<a href="https://github.com/milvus-io/milvus/pull/35235">(#35235</a>)</li>
<li>插入率。<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>内存高水位。<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>RESTful API 指标。<a href="https://github.com/milvus-io/milvus/pull/35083">(#35083</a>)</li>
<li>搜索延迟。<a href="https://github.com/milvus-io/milvus/pull/34783">(#34783</a>)</li>
</ul></li>
</ul>
<h3 id="Changes" class="common-anchor-header">更改</h3><ul>
<li><p>对于开源用户，该版本将自动索引中<code translate="no">FloatVector</code> 和<code translate="no">BinaryVector</code> 的度量类型分别改为<code translate="no">Cosine</code> 和<code translate="no">Hamming</code> 。</p></li>
<li><p><strong>固定的第三方依赖版本</strong>：</p>
<ul>
<li>该版本引入了某些第三方依赖库的固定版本，大大加强了 Milvus 的软件供应链管理。</li>
<li>通过将项目与上游变更隔离开来，它可以保护日常构建免受潜在中断的影响。</li>
<li>该更新通过在 JFrog Cloud 上独家托管经过验证的 C++ 第三方软件包和使用 Conan Recipe Revisions (RREV) 来确保稳定性。</li>
<li>这种方法降低了因 ConanCenter 更新而产生破坏性变更的风险。</li>
<li>使用 Ubuntu 22.04 的开发人员将立即受益于这些变更。不过，使用其他操作系统的开发人员可能需要升级他们的<code translate="no">glibc</code> 版本，以避免出现兼容性问题。</li>
</ul></li>
</ul>
<h3 id="Critical-bug-fixes" class="common-anchor-header">重要错误修复</h3><ul>
<li>修正了在 L0 压缩过程中因遗漏数据段而导致删除数据丢失的问题。<a href="https://github.com/milvus-io/milvus/pull/33980">[#33980</a> <a href="https://github.com/milvus-io/milvus/pull/34363">, #34363]</a></li>
<li>修正了因数据范围处理不当而导致删除信息无法转发的问题。<a href="https://github.com/milvus-io/milvus/pull/35313">(#35313</a>)</li>
<li>解决了由于不正确使用<code translate="no">mmap</code> 而导致的 SIGBUS 异常。<a href="https://github.com/milvus-io/milvus/pull/34455">[#34455</a>,<a href="https://github.com/milvus-io/milvus/pull/34530">#34530］</a></li>
<li>修复了非法搜索表达式导致的崩溃。<a href="https://github.com/milvus-io/milvus/pull/35307">(#35307</a>)</li>
<li>修正了因监视上下文中的超时设置不正确而导致 DataNode 监视失败的问题。<a href="https://github.com/milvus-io/milvus/pull/35017">(#35017</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>通过升级某些依赖项解决了安全漏洞。[<a href="https://github.com/milvus-io/milvus/pull/33927">#33927</a>,<a href="https://github.com/milvus-io/milvus/pull/34693">#34693</a>]</li>
<li>修正了过长表达式引发的解析错误。<a href="https://github.com/milvus-io/milvus/pull/34957">(#34957</a>)</li>
<li>解决了查询计划解析过程中出现的内存泄漏问题。<a href="https://github.com/milvus-io/milvus/pull/34932">(#34932</a>)</li>
<li>修正了动态日志级别修改不生效的问题。<a href="https://github.com/milvus-io/milvus/pull/34777">(#34777</a>)</li>
<li>解决了因未初始化段偏移而导致对不断增长的数据进行分组查询失败的问题。<a href="https://github.com/milvus-io/milvus/pull/34750">(#34750</a>)</li>
<li>更正了使用 Knowhere 迭代器时搜索参数的设置。<a href="https://github.com/milvus-io/milvus/pull/34732">(#34732</a>)</li>
<li>修改了检查分区加载状态的逻辑。<a href="https://github.com/milvus-io/milvus/pull/34305">(#34305</a>)</li>
<li>修正了权限缓存更新因未处理请求错误而失败的问题。<a href="https://github.com/milvus-io/milvus/pull/34697">(#34697</a>)</li>
<li>解决了 QueryCoord 重启后加载的 Collections 恢复失败的问题。<a href="https://github.com/milvus-io/milvus/pull/35211">(#35211</a>)</li>
<li>通过移除不必要的索引参数验证，修正了加载幂等性问题。<a href="https://github.com/milvus-io/milvus/pull/35179">(#35179</a>)</li>
<li>确保在 DataCoord 重启后执行<code translate="no">compressBinlog</code> ，以使<code translate="no">reloadFromKV</code> 能够正确填充 binlog 的<code translate="no">logID</code> 。<a href="https://github.com/milvus-io/milvus/pull/34062">(#34062</a>)</li>
<li>修正了 DataCoord 垃圾收集后未删除 Collections 元数据的问题。<a href="https://github.com/milvus-io/milvus/pull/34884">(#34884</a>)</li>
<li>通过移除通过导入生成的刷新段，解决了 DataCoord 中的 SegmentManager 的内存泄漏问题。<a href="https://github.com/milvus-io/milvus/pull/34651">(#34651</a>)</li>
<li>修复了当压缩被禁用而某个 Collection 被丢弃时的恐慌问题。<a href="https://github.com/milvus-io/milvus/pull/34206">(#34206</a>)</li>
<li>通过增强内存使用估算算法，修正了 DataNode 中的内存不足问题。<a href="https://github.com/milvus-io/milvus/pull/34203">(#34203</a>)</li>
<li>通过为大块缓存实施单飞（singleflight），防止了当多个向量检索请求命中缓存未命中时的突发内存使用。<a href="https://github.com/milvus-io/milvus/pull/34283">(#34283</a>)</li>
<li>在配置中捕获 CAS（比较和交换）操作期间的<code translate="no">ErrKeyNotFound</code> 。<a href="https://github.com/milvus-io/milvus/pull/34489">(#34489</a>)</li>
<li>修正了因在 CAS 操作中错误使用格式化值而导致配置更新失败的问题。<a href="https://github.com/milvus-io/milvus/pull/34373">(#34373</a>)</li>
</ul>
<h3 id="Miscellaneous" class="common-anchor-header">杂项</h3><ul>
<li>添加了对 OTLP HTTP 导出器的支持，从而增强了可观察性和监控能力。[<a href="https://github.com/milvus-io/milvus/pull/35073">#35073</a>,<a href="https://github.com/milvus-io/milvus/pull/35299">#35299</a>]</li>
<li>通过引入 "最大 Collections "和 "磁盘配额 "等属性增强了数据库功能，这些属性现在可以动态修改。<a href="https://github.com/milvus-io/milvus/pull/34511">[#34511</a>,<a href="https://github.com/milvus-io/milvus/pull/34386">#34386</a>]</li>
<li>为 DataNode 中的 L0 压缩进程添加了跟踪功能，以改进诊断和监控。<a href="https://github.com/milvus-io/milvus/pull/33898">(#33898</a>)</li>
<li>为每个 Collections 的 L0 段条目数量引入了配额配置，从而能够通过应用反向压力更好地控制删除率。<a href="https://github.com/milvus-io/milvus/pull/34837">(#34837</a>)</li>
<li>扩展了插入操作的速率限制机制，使其也适用于上插操作，从而确保在高负载情况下的性能一致性。<a href="https://github.com/milvus-io/milvus/pull/34616">(#34616</a>)</li>
<li>为代理 CGO 调用实施了动态 CGO 池，优化了资源使用和性能。<a href="https://github.com/milvus-io/milvus/pull/34842">(#34842</a>)</li>
<li>为 Ubuntu、Rocky 和 Amazon 操作系统启用了 DiskAnn 编译选项，提高了这些平台的兼容性和性能。<a href="https://github.com/milvus-io/milvus/pull/34244">(#34244</a>)</li>
<li>将柯南升级到 1.64.1 版，确保与最新功能和改进兼容。<a href="https://github.com/milvus-io/milvus/pull/35216">(#35216</a>)</li>
<li>将 Knowhere 升级到 2.3.7 版，带来了性能增强和新功能。<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>修正了特定第三方软件包的修订，以确保编译的一致性并降低意外更改的风险。<a href="https://github.com/milvus-io/milvus/pull/35316">(#35316</a>)</li>
</ul>
<h2 id="v246" class="common-anchor-header">v2.4.6<button data-href="#v246" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 7 月 16 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.6</td><td>2.4.4</td><td>2.4.2</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.6 是一个修复错误的版本，解决了删除过程中的恐慌、内存泄漏和数据丢失等关键问题。它还引入了多项优化，包括增强监控指标、将 Go 版本升级到 1.21，以及改善 RESTful count(*) 查询的用户体验。</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>增强了 RESTful API 查询的用户友好性<a href="https://github.com/milvus-io/milvus/pull/34444">（#34444</a>）。</li>
<li>将 Go 版本从 1.20 升级到 1.21<a href="https://github.com/milvus-io/milvus/pull/33940">（#33940</a>）。</li>
<li>优化了直方图度量桶，使桶的粒度更细<a href="https://github.com/milvus-io/milvus/pull/34592">（#34592</a>）。</li>
<li>将 Pulsar 依赖关系版本从 2.8.2 升级到 2.9.5。建议自 Milvus 2.4.6 起将 Pulsar 升级到 2.9.5。</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>修正了 GetReplicas API 返回零状态的问题<a href="https://github.com/milvus-io/milvus/pull/34019">（#34019</a>）。</li>
<li>修正了查询可能返回已删除记录的问题<a href="https://github.com/milvus-io/milvus/pull/34502">（#34502</a>）。</li>
<li>解决了 IndexNode 在停止过程中由于生命周期控制不正确而卡住的问题<a href="https://github.com/milvus-io/milvus/pull/34559">（#34559</a>）。</li>
<li>修正了当 Worker 离线时主键 oracle 对象的内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/34020">(#34020</a>)。</li>
<li>修正了 ChannelManagerImplV2，使其能通知正确的节点，从而解决了循环闭合中的参数捕获问题<a href="https://github.com/milvus-io/milvus/pull/34004">（#34004</a>）。</li>
<li>通过实现深度复制，修正了 ImportTask segmentsInfo 中的读写数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/34126">（#34126</a>）。</li>
<li>更正了 "legacyVersionWithoutRPCWatch "配置选项的版本信息，以防止滚动升级时出错<a href="https://github.com/milvus-io/milvus/pull/34185">（#34185</a>）。</li>
<li>修正了加载分区数量的度量<a href="https://github.com/milvus-io/milvus/pull/34195">（#34195</a>）。</li>
<li>在设置 segcore 跟踪时传递了<code translate="no">otlpSecure</code> 配置<a href="https://github.com/milvus-io/milvus/pull/34210">（#34210</a>）。</li>
<li>修正了 DataCoord 属性被错误覆盖的问题<a href="https://github.com/milvus-io/milvus/pull/34240">（#34240</a>）。</li>
<li>解决了因错误合并两个新创建的消息流而导致的数据丢失问题<a href="https://github.com/milvus-io/milvus/pull/34563">（#34563</a>）。</li>
<li>修正了因 msgstream 尝试使用无效 pchannel 而导致的恐慌<a href="https://github.com/milvus-io/milvus/pull/34230">（#34230</a>）。</li>
<li>解决了导入可能生成孤儿文件的问题<a href="https://github.com/milvus-io/milvus/pull/34071">（#34071</a>）。</li>
<li>修正了因段中主键重复而导致查询结果不完整的问题<a href="https://github.com/milvus-io/milvus/pull/34302">（#34302</a>）。</li>
<li>解决了在 L0 压缩中丢失密封段的问题<a href="https://github.com/milvus-io/milvus/pull/34566">（#34566</a>）。</li>
<li>修正了垃圾收集后生成的 channel-cp meta 中的脏数据问题<a href="https://github.com/milvus-io/milvus/pull/34609">（#34609</a>）。</li>
<li>修正了重启 RootCoord 后数据库数为 0 的指标<a href="https://github.com/milvus-io/milvus/pull/34010">（#34010</a>）。</li>
<li>通过移除通过导入生成的已刷新片段，修正了 DataCoord 中片段管理器的内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/34652">（#34652</a>）。</li>
<li>确保在 DataCoord 重新启动后，compressBinlog 能够填充 binlogs 的 logID，从而确保从 KV 适当地重新加载<a href="https://github.com/milvus-io/milvus/pull/34064">(#34064</a>)。</li>
</ul>
<h2 id="v245" class="common-anchor-header">v2.4.5<button data-href="#v245" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 6 月 18 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.5</td><td>2.4.4</td><td>2.4.1</td><td>2.4.3</td></tr>
</tbody>
</table>
<p>Milvus 2.4.5 的发布引入了多项改进和错误修复，以提高性能、稳定性和功能性。Milvus 2.4.5 通过自动索引简化了稀疏、float16 和 bfloat16 向量搜索，通过 Bloom 过滤器优化加快了搜索、删除和压缩速度，并通过更快的加载时间和导入 L0 段支持解决了数据管理问题。它还引入了用于高效高维稀疏数据搜索的稀疏 HNSW 索引，增强了支持稀疏浮点型向量的 RESTful API，并修复了关键错误以提高稳定性。</p>
<h3 id="New-Features" class="common-anchor-header">新功能</h3><ul>
<li>为 describe/alter 数据库应用程序添加了 rbac 支持<a href="https://github.com/milvus-io/milvus/pull/33804">（#33804）</a></li>
<li>支持为稀疏向量构建 HNSW 索引<a href="https://github.com/milvus-io/milvus/pull/33653">(#33653</a>,<a href="https://github.com/milvus-io/milvus/pull/33662">#33662</a>)</li>
<li>支持为二进制向量构建磁盘索引<a href="https://github.com/milvus-io/milvus/pull/33575">(#33575</a>)</li>
<li>在 RESTful v2 上支持稀疏向量类型<a href="https://github.com/milvus-io/milvus/pull/33555">(#33555</a>)</li>
<li>添加 /management/stop RESTful api 以停止组件<a href="https://github.com/milvus-io/milvus/pull/33799">(#33799</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>将 maxPartitionNum 默认值设为 1024<a href="https://github.com/milvus-io/milvus/pull/33950">(#33950</a>)</li>
<li>启用不可用错误时强制重置连接<a href="https://github.com/milvus-io/milvus/pull/33910">(#33910</a>)</li>
<li>启用收集级别的刷新率限制器<a href="https://github.com/milvus-io/milvus/pull/33864">（#33864）</a></li>
<li>并行执行 Bloom 过滤器应用，以加快分段预测<a href="https://github.com/milvus-io/milvus/pull/33793">(#33793</a>)</li>
<li>使用 fastjson lib 来清除删除日志，以加快 json.Unmarshal 的速度<a href="https://github.com/milvus-io/milvus/pull/33802">（#33802）</a></li>
<li>使用 BatchPkExist 减少 bloom filter func 调用成本<a href="https://github.com/milvus-io/milvus/pull/33752">(#33752</a>)</li>
<li>加快了小型集合的加载速度<a href="https://github.com/milvus-io/milvus/pull/33746">（#33746）</a></li>
<li>支持向 L0 段导入删除数据（<a href="https://github.com/milvus-io/milvus/pull/33712">＃33712）</a></li>
<li>跳过标记压缩任务进行超时，避免重复执行同一任务<a href="https://github.com/milvus-io/milvus/pull/33833">（＃33833）</a></li>
<li>在 numpy 批量插入中将 float16 和 bfloat16 向量处理为与 BinaryVector 相同（<a href="https://github.com/milvus-io/milvus/pull/33788">#33788）</a></li>
<li>为寻道方法添加了 includeCurrentMsg 标志<a href="https://github.com/milvus-io/milvus/pull/33743">（#33743）</a></li>
<li>为 msgdispatcher 的配置添加了 mergeInterval、targetBufSize 和 maxTolerantLag<a href="https://github.com/milvus-io/milvus/pull/33680">（#33680）</a></li>
<li>改进了稀疏向量的 GetVectorByID<a href="https://github.com/milvus-io/milvus/pull/33652">(#33652</a>)</li>
<li>移除了 StringPrimarykey 以减少不必要的复制和函数调用成本（<a href="https://github.com/milvus-io/milvus/pull/33649">#33649）</a></li>
<li>为二进制/稀疏数据类型添加了自动索引映射<a href="https://github.com/milvus-io/milvus/pull/33625">（＃33625）</a></li>
<li>优化了部分缓存以减少内存使用<a href="https://github.com/milvus-io/milvus/pull/33560">（＃33560）</a></li>
<li>抽象了导入/预导入任务的执行接口（<a href="https://github.com/milvus-io/milvus/pull/33607">＃33607）</a></li>
<li>在缓冲区插入中使用 map pk 到时间戳，以减少 bf 原因<a href="https://github.com/milvus-io/milvus/pull/33582">（＃33582）</a></li>
<li>避免对导入进行多余的元操作符（<a href="https://github.com/milvus-io/milvus/pull/33519">＃33519）</a></li>
<li>通过记录更好的磁盘配额信息、添加 UseDefaultConsistency 标志、删除不必要的日志来改进日志<a href="https://github.com/milvus-io/milvus/pull/33597">（＃33597</a>、<a href="https://github.com/milvus-io/milvus/pull/33644">＃33644</a>、<a href="https://github.com/milvus-io/milvus/pull/33670">＃33670）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>修正了查询钩无法识别向量类型的错误<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>防止使用捕获的迭代变量 partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>修正了一个可能导致 Milvus 无法在二进制和稀疏向量上创建 AutoIndex 的错误<a href="https://github.com/milvus-io/milvus/pull/33867">（＃33867）</a></li>
<li>修正了一个 Bug，该 Bug 可能导致 indexnode 在所有向量的无效索引参数上重试创建索引（#33878）</li>
<li>修正了加载和发布同时进行时可能导致服务器崩溃的错误<a href="https://github.com/milvus-io/milvus/pull/33699">（#33699）</a></li>
<li>改进了配置值的缓存一致性<a href="https://github.com/milvus-io/milvus/pull/33797">（#33797）</a></li>
<li>防止删除过程中可能出现的数据丢失<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>确保在删除 Collections 后设置 DroppedAt 字段（可能的删除时间戳）<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>修正了一个可能导致 Milvus 错误处理二进制向量数据大小的问题<a href="https://github.com/milvus-io/milvus/pull/33751">（#33751）</a></li>
<li>防止以纯文本记录敏感的 Kafka 凭据<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>,<a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>确保 Milvus 能够正确导入包含多个向量字段的数据<a href="https://github.com/milvus-io/milvus/pull/33724">（#33724</a>）。</li>
<li>通过在启动前检查导入任务是否存在，提高了导入的可靠性。<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>改进了稀疏 HNSW 索引的处理（内部功能）(<a href="https://github.com/milvus-io/milvus/pull/33714">#33714</a>)</li>
<li>清理向量内存以避免内存泄漏<a href="https://github.com/milvus-io/milvus/pull/33708">（#33708）</a></li>
<li>通过修复状态锁问题，确保异步预热更加顺畅<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>解决了一个可能导致查询迭代器丢失结果的 bug。<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>修正了一个可能导致导入段大小不均的错误（<a href="https://github.com/milvus-io/milvus/pull/33634">＃33634）</a></li>
<li>修正了对 bf16、fp16 和二进制向量类型的不正确数据大小处理<a href="https://github.com/milvus-io/milvus/pull/33488">（#33488）</a></li>
<li>通过解决 L0 压缩器的潜在问题提高了稳定性<a href="https://github.com/milvus-io/milvus/pull/33564">（#33564）</a></li>
<li>确保动态配置更新在缓存中得到正确反映。<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>提高了 RootCoordQuotaStates 指标的准确性 (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>确保在指标中准确报告已加载实体的数量<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>在异常日志中提供了更完整的信息。 <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>通过移除不必要的组检查器，优化了查询管道<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>在索引节点上使用本地存储路径进行更精确的磁盘容量检查。<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>更正了当命中数大于限制时 hasMoreResult 可能返回 false 的问题<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>延迟在委派器中加载 bf，以防止在 Worker 没有更多内存时重复加载 bf<a href="https://github.com/milvus-io/milvus/pull/33650">（#33650</a>）- 修复了一个 Bug，即 queryHook 无法识别向量类型<a href="https://github.com/milvus-io/milvus/pull/33911">（#33911）</a></li>
<li>防止使用捕获的迭代变量 partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>修正了一个可能导致 Milvus 无法在二进制和稀疏向量上创建 AutoIndex 的错误<a href="https://github.com/milvus-io/milvus/pull/33867">（＃33867）</a></li>
<li>修正了一个 Bug，该 Bug 可能导致 indexnode 在所有向量的无效索引参数上重试创建索引（#33878）</li>
<li>修正了加载和发布同时进行时可能导致服务器崩溃的错误<a href="https://github.com/milvus-io/milvus/pull/33699">（#33699）</a></li>
<li>改进了配置值的缓存一致性<a href="https://github.com/milvus-io/milvus/pull/33797">（#33797）</a></li>
<li>防止删除过程中可能出现的数据丢失<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>确保在删除 Collections 后设置 DroppedAt 字段（可能的删除时间戳）<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>修正了一个可能导致 Milvus 错误处理二进制向量数据大小的问题<a href="https://github.com/milvus-io/milvus/pull/33751">（#33751）</a></li>
<li>防止以纯文本记录敏感的 Kafka 凭据<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>,<a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>确保 Milvus 能够正确导入包含多个向量字段的数据<a href="https://github.com/milvus-io/milvus/pull/33724">（#33724</a>）。</li>
<li>通过在启动前检查导入任务是否存在，提高了导入的可靠性。<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>改进了稀疏 HNSW 索引的处理（内部功能）(<a href="https://github.com/milvus-io/milvus/pull/33714">#33714</a>)</li>
<li>清理向量内存以避免内存泄漏<a href="https://github.com/milvus-io/milvus/pull/33708">（#33708）</a></li>
<li>通过修复状态锁问题，确保异步预热更加顺畅<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>解决了一个可能导致查询迭代器丢失结果的 bug。<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>修正了一个可能导致导入段大小不均的错误（<a href="https://github.com/milvus-io/milvus/pull/33634">＃33634）</a></li>
<li>修正了对 bf16、fp16 和二进制向量类型的不正确数据大小处理<a href="https://github.com/milvus-io/milvus/pull/33488">（#33488）</a></li>
<li>通过解决 L0 压缩器的潜在问题提高了稳定性<a href="https://github.com/milvus-io/milvus/pull/33564">（#33564）</a></li>
<li>确保动态配置更新在缓存中得到正确反映。<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>提高了 RootCoordQuotaStates 指标的准确性 (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>确保在指标中准确报告已加载实体的数量<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>在异常日志中提供了更完整的信息。 <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>通过移除不必要的组检查器，优化了查询管道<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>在索引节点上使用本地存储路径进行更精确的磁盘容量检查。<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>更正了当命中数大于限制时 hasMoreResult 可能返回 false 的问题<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>延迟在委派器中加载 bf，以防止在工作程序没有更多内存时重复加载 bfs<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)</li>
</ul>
<h2 id="v244" class="common-anchor-header">v2.4.4<button data-href="#v244" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 5 月 31 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.4</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus v2.4.4 包含多个关键错误修复和改进，旨在提高性能和稳定性。值得注意的是，我们<strong>解决了一个关键问题，即批量插入统计日志被错误地垃圾收集</strong>，从而可能影响数据完整性。<strong>我们强烈建议所有 v2.4 用户升级到该版本，以受益于这些修复。</strong></p>
<p><strong>如果您正在使用批量插入功能，请尽早升级到 v2.4.4，以确保数据完整性。</strong></p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">重要错误修复</h3><ul>
<li>填写统计日志 ID 并验证其正确性<a href="https://github.com/milvus-io/milvus/pull/33478">(#33478</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>升级了 ARM SVE 的比特集<a href="https://github.com/milvus-io/milvus/pull/33440">(#33440</a>)</li>
<li>启用 Milvus 与 GCC-13 的编译<a href="https://github.com/milvus-io/milvus/pull/33441">(#33441</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>授予所有权限时显示空的 Collections<a href="https://github.com/milvus-io/milvus/pull/33454">(#33454</a>)</li>
<li>确保 CMake 下载并安装到当前平台，而非 x86_64<a href="https://github.com/milvus-io/milvus/pull/33439">(#33439</a>)</li>
</ul>
<h2 id="v243" class="common-anchor-header">v2.4.3<button data-href="#v243" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 5 月 29 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.3</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus 2.4.3 版引入了大量功能、改进和错误修复，以提高性能和可靠性。值得注意的改进包括支持稀疏浮点向量批量插入和优化的 Bloom 过滤器加速。改进涵盖了从动态配置更新到内存使用优化等多个领域。错误修复解决了恐慌情景等关键问题，确保系统操作更加流畅。该版本强调了 Milvus 对增强功能、优化性能和提供强大用户体验的持续承诺。</p>
<h3 id="Features" class="common-anchor-header">功能特性</h3><ul>
<li>支持 binlog/json/parquet 的稀疏浮点向量批量插入<a href="https://github.com/milvus-io/milvus/pull/32649">(#32649</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>基于 RPC 实现了 Datacoord/节点观察通道<a href="https://github.com/milvus-io/milvus/pull/32036">(#32036</a>)</li>
<li>优化了 Bloom 过滤器，以加速删除过滤<a href="https://github.com/milvus-io/milvus/pull/32642">（＃32642</a>、<a href="https://github.com/milvus-io/milvus/pull/33329">＃33329</a>、<a href="https://github.com/milvus-io/milvus/pull/33284">＃33284）</a></li>
<li>如果标量索引没有原始数据，则通过 mmap 加载原始数据<a href="https://github.com/milvus-io/milvus/pull/33317">（＃33317）</a></li>
<li>将 milvus 配置同步到 milvus.yaml 中<a href="https://github.com/milvus-io/milvus/pull/33322">（#33322</a>、<a href="https://github.com/milvus-io/milvus/pull/32920">#32920</a>、<a href="https://github.com/milvus-io/milvus/pull/32857">#32857</a>、<a href="https://github.com/milvus-io/milvus/pull/32946">#32946）</a></li>
<li>更新了 knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/33310">（#33310</a>、<a href="https://github.com/milvus-io/milvus/pull/32931">#32931</a>、<a href="https://github.com/milvus-io/milvus/pull/33043">#33043）</a></li>
<li>在 QueryCoord 中启用动态更新平衡策略<a href="https://github.com/milvus-io/milvus/pull/33272">(#33272</a>)</li>
<li>在写缓冲区中使用预置的日志记录器，以尽量减少日志记录器的分配<a href="https://github.com/milvus-io/milvus/pull/33304">（#33304）</a></li>
<li>改进了参数检查<a href="https://github.com/milvus-io/milvus/pull/32777">（#32777</a>、<a href="https://github.com/milvus-io/milvus/pull/33271">#33271</a>、<a href="https://github.com/milvus-io/milvus/pull/33218">#33218）</a></li>
<li>添加了一个参数以忽略检查点中不正确的消息 ID<a href="https://github.com/milvus-io/milvus/pull/33249">（＃33249）</a></li>
<li>添加了控制插件初始化失败处理的配置<a href="https://github.com/milvus-io/milvus/pull/32680">（#32680）</a></li>
<li>为 knowhere 添加了分数计算一致性配置<a href="https://github.com/milvus-io/milvus/pull/32997">（#32997）</a></li>
<li>引入了一个配置选项来控制公共角色权限的初始化<a href="https://github.com/milvus-io/milvus/pull/33174">（#33174）</a></li>
<li>优化了读取字段时的内存使用<a href="https://github.com/milvus-io/milvus/pull/33196">（#33196）</a></li>
<li>改进了通道管理器 v2 的实现<a href="https://github.com/milvus-io/milvus/pull/33172">（＃33172</a>、<a href="https://github.com/milvus-io/milvus/pull/33121">＃33121</a>、<a href="https://github.com/milvus-io/milvus/pull/33014">＃33014）</a></li>
<li>添加了跟踪内存中 binlog 数据大小的功能<a href="https://github.com/milvus-io/milvus/pull/33025">（＃33025）</a></li>
<li>添加了段索引文件大小的度量<a href="https://github.com/milvus-io/milvus/pull/32979">（＃32979</a>，<a href="https://github.com/milvus-io/milvus/pull/33305">＃33305）</a></li>
<li>用 DeletePartialMatch 代替 Delete 以移除指标<a href="https://github.com/milvus-io/milvus/pull/33029">(#33029</a>)</li>
<li>根据片段类型获取相关数据大小<a href="https://github.com/milvus-io/milvus/pull/33017">（＃33017）</a></li>
<li>清理元存储中的通道节点信息<a href="https://github.com/milvus-io/milvus/pull/32988">（#32988）</a></li>
<li>从数据节点代理中移除根节点<a href="https://github.com/milvus-io/milvus/pull/32818">（＃32818）</a></li>
<li>启用批量上传<a href="https://github.com/milvus-io/milvus/pull/32788">（#32788）</a></li>
<li>使用 Partition Key 时，将默认分区数改为 16<a href="https://github.com/milvus-io/milvus/pull/32950">(#32950</a>)</li>
<li>改进了超大 top-k 查询的还原性能<a href="https://github.com/milvus-io/milvus/pull/32871">（＃32871）</a></li>
<li>利用 TestLocations 功能加速写入和压缩（<a href="https://github.com/milvus-io/milvus/pull/32948">＃32948）</a></li>
<li>优化了计划解析器池，以避免不必要的循环<a href="https://github.com/milvus-io/milvus/pull/32869">（#32869）</a></li>
<li>提高了加载速度<a href="https://github.com/milvus-io/milvus/pull/32898">（#32898）</a></li>
<li>为 restv2 使用了 Collections 默认一致性级别<a href="https://github.com/milvus-io/milvus/pull/32956">（#32956）</a></li>
<li>为其余 API 添加了成本响应<a href="https://github.com/milvus-io/milvus/pull/32620">（#32620）</a></li>
<li>启用通道独占平衡策略<a href="https://github.com/milvus-io/milvus/pull/32911">（#32911）</a></li>
<li>在代理中公开 describedatabase API<a href="https://github.com/milvus-io/milvus/pull/32732">(#32732</a>)</li>
<li>通过 Collections 获取 RG 时使用 coll2replica 映射<a href="https://github.com/milvus-io/milvus/pull/32892">(#32892</a>)</li>
<li>为搜索和查询添加了更多跟踪功能<a href="https://github.com/milvus-io/milvus/pull/32734">(#32734</a>)</li>
<li>支持对 opentelemetry 跟踪进行动态配置<a href="https://github.com/milvus-io/milvus/pull/32169">(#32169</a>)</li>
<li>更新领导视图时避免迭代通道结果<a href="https://github.com/milvus-io/milvus/pull/32887">（#32887）</a></li>
<li>优化了对 parquet 的向量偏移处理<a href="https://github.com/milvus-io/milvus/pull/32822">（#32822）</a></li>
<li>通过 Collections 改进了数据记录段过滤<a href="https://github.com/milvus-io/milvus/pull/32831">（＃32831）</a></li>
<li>调整了日志级别和频率<a href="https://github.com/milvus-io/milvus/pull/33042">（＃33042</a>、<a href="https://github.com/milvus-io/milvus/pull/32838">＃32838</a>、<a href="https://github.com/milvus-io/milvus/pull/33337">＃33337）</a></li>
<li>在暂停平衡后启用停止平衡<a href="https://github.com/milvus-io/milvus/pull/32812">（＃32812）</a></li>
<li>当分块领导者位置发生变化时，更新分块领导者缓存<a href="https://github.com/milvus-io/milvus/pull/32470">（＃32470）</a></li>
<li>移除过时的应用程序接口和字段<a href="https://github.com/milvus-io/milvus/pull/32808">（＃32808</a>，<a href="https://github.com/milvus-io/milvus/pull/32704">＃32704）</a></li>
<li>添加了 metautil.channel 以将字符串比较转换为 int<a href="https://github.com/milvus-io/milvus/pull/32749">(#32749</a>)</li>
<li>当 querynode 发现新的 Collections 时，为 payload writer 的错误信息和日志添加了类型信息<a href="https://github.com/milvus-io/milvus/pull/32522">(#32522</a>)</li>
<li>使用分区键创建 Collections 时检查分区号<a href="https://github.com/milvus-io/milvus/pull/32670">(#32670</a>)</li>
<li>如果观察失败，则删除传统的 l0 段<a href="https://github.com/milvus-io/milvus/pull/32725">(#32725</a>)</li>
<li>改进了请求类型的打印<a href="https://github.com/milvus-io/milvus/pull/33319">(#33319</a>)</li>
<li>在获取类型前检查数组字段数据是否为零<a href="https://github.com/milvus-io/milvus/pull/33311">（＃33311）</a></li>
<li>启动删除/添加节点操作失败时返回错误<a href="https://github.com/milvus-io/milvus/pull/33258">(#33258</a>)</li>
<li>允许更新数据节点的服务器 ID<a href="https://github.com/milvus-io/milvus/pull/31597">(#31597</a>)</li>
<li>在 Collections 版本中统一了 querynode 指标清理<a href="https://github.com/milvus-io/milvus/pull/32805">(#32805</a>)</li>
<li>修复了标量自动索引配置版本不正确的问题<a href="https://github.com/milvus-io/milvus/pull/32795">（#32795）</a></li>
<li>改进了创建/更改索引时的索引参数检查<a href="https://github.com/milvus-io/milvus/pull/32712">（#32712）</a></li>
<li>删除了冗余的副本恢复<a href="https://github.com/milvus-io/milvus/pull/32985">（#32985）</a></li>
<li>启用通道元表以写入超过 200k 的片段<a href="https://github.com/milvus-io/milvus/pull/33300">（#33300）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修复了速率限制拦截器中数据库不存在时的恐慌<a href="https://github.com/milvus-io/milvus/pull/33308">(#33308</a>)</li>
<li>修正了因参数不正确而导致的 quotacenter 指标收集失败<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
<li>修正了当 processactivestandby 返回错误时的恐慌<a href="https://github.com/milvus-io/milvus/pull/33372">(#33372</a>)</li>
<li>修复了 nq &gt; 1 时 restful v2 中搜索结果截断的问题<a href="https://github.com/milvus-io/milvus/pull/33363">(#33363</a>)</li>
<li>为 restful v2 中的角色操作添加了数据库名称字段<a href="https://github.com/milvus-io/milvus/pull/33291">(#33291</a>)</li>
<li>修复了全局速率限制不起作用的问题<a href="https://github.com/milvus-io/milvus/pull/33336">(#33336</a>)</li>
<li>修复了因建立索引失败而导致的恐慌<a href="https://github.com/milvus-io/milvus/pull/33314">(#33314</a>)</li>
<li>在 segcore 中添加了稀疏向量验证，以确保合法性<a href="https://github.com/milvus-io/milvus/pull/33312">（#33312）</a></li>
<li>任务完成后从同步管理中移除任务<a href="https://github.com/milvus-io/milvus/pull/33303">（#33303）</a></li>
<li>修复了数据导入时 Partition Key 过滤失败的问题<a href="https://github.com/milvus-io/milvus/pull/33277">（#33277）</a></li>
<li>修复了使用 noop 输出程序时无法生成 traceID 的问题<a href="https://github.com/milvus-io/milvus/pull/33208">（#33208）</a></li>
<li>改进了查询结果检索<a href="https://github.com/milvus-io/milvus/pull/33179">（#33179）</a></li>
<li>标记通道检查点已放弃，以防止检查点滞后指标泄漏<a href="https://github.com/milvus-io/milvus/pull/33201">（#33201）</a></li>
<li>修复了查询节点在停止过程中卡住的问题<a href="https://github.com/milvus-io/milvus/pull/33154">（#33154）</a></li>
<li>修复了刷新响应中缺失的片段<a href="https://github.com/milvus-io/milvus/pull/33061">（＃33061）</a></li>
<li>使提交操作符合empotent条件<a href="https://github.com/milvus-io/milvus/pull/33053">（＃33053）</a></li>
<li>为流式阅读器中的每个批次分配新片段<a href="https://github.com/milvus-io/milvus/pull/33360">(#33360</a>)</li>
<li>在 QueryCoord 重启后从资源组中清理离线节点<a href="https://github.com/milvus-io/milvus/pull/33233">(#33233</a>)</li>
<li>移除 completedCompactor 中的 l0 压缩器<a href="https://github.com/milvus-io/milvus/pull/33216">(#33216</a>)</li>
<li>初始化限制器时重置配额值<a href="https://github.com/milvus-io/milvus/pull/33152">(#33152</a>)</li>
<li>修复了超出 etcd 限制的问题<a href="https://github.com/milvus-io/milvus/pull/33041">(#33041</a>)</li>
<li>解决了因字段过多而超出 etcd 事务限制的问题<a href="https://github.com/milvus-io/milvus/pull/33040">(#33040</a>)</li>
<li>删除了 GetNumRowsOfPartition 中的 RLock 重入<a href="https://github.com/milvus-io/milvus/pull/33045">(#33045</a>)</li>
<li>在 SyncAll 之前启动 LeaderCacheObserver<a href="https://github.com/milvus-io/milvus/pull/33035">(#33035</a>)</li>
<li>启用已释放备用通道的平衡<a href="https://github.com/milvus-io/milvus/pull/32986">(#32986</a>)</li>
<li>在服务器初始化之前初始化访问记录器<a href="https://github.com/milvus-io/milvus/pull/32976">(#32976</a>)</li>
<li>使压缩器能够清除空片段<a href="https://github.com/milvus-io/milvus/pull/32821">(#32821</a>)</li>
<li>在 l0 压缩中填入 deltalog 条目编号和时间范围<a href="https://github.com/milvus-io/milvus/pull/33004">（＃33004）</a></li>
<li>修正了因分片领导者缓存数据竞赛而导致的代理崩溃问题<a href="https://github.com/milvus-io/milvus/pull/32971">（#32971）</a></li>
<li>修正了负载索引度量的时间单位<a href="https://github.com/milvus-io/milvus/pull/32935">（#32935）</a></li>
<li>修正了停止查询节点上的分段无法成功释放的问题<a href="https://github.com/milvus-io/milvus/pull/32929">（#32929）</a></li>
<li>修正了索引资源估算<a href="https://github.com/milvus-io/milvus/pull/32842">（#32842）</a></li>
<li>将通道检查点设置为 delta 位置<a href="https://github.com/milvus-io/milvus/pull/32878">(#32878</a>)</li>
<li>使 syncmgr 在返回未来之前锁定关键字<a href="https://github.com/milvus-io/milvus/pull/32865">（＃32865）</a></li>
<li>确保反转索引只有一个分段<a href="https://github.com/milvus-io/milvus/pull/32858">(#32858</a>)</li>
<li>修复了选择两个相同段的压缩触发器<a href="https://github.com/milvus-io/milvus/pull/32800">（＃32800）</a></li>
<li>修复了 binlog 导入时无法指定分区名称的问题<a href="https://github.com/milvus-io/milvus/pull/32730">（＃32730</a>，<a href="https://github.com/milvus-io/milvus/pull/33027">＃33027）</a></li>
<li>在镶嵌导入中使动态列成为可选项<a href="https://github.com/milvus-io/milvus/pull/32738">（＃32738）</a></li>
<li>插入数据时跳过自动 ID 检查<a href="https://github.com/milvus-io/milvus/pull/32775">（＃32775）</a></li>
<li>根据 Schema 验证插入字段数据的行数<a href="https://github.com/milvus-io/milvus/pull/32770">（＃32770）</a></li>
<li>为 CTraceContext ID 添加了封装器和保持器<a href="https://github.com/milvus-io/milvus/pull/32746">（＃32746）</a></li>
<li>修复了在 datacoord 元对象中找不到数据库名称的问题<a href="https://github.com/milvus-io/milvus/pull/33412">（＃33412）</a></li>
<li>同步了已删除分区的已删除段<a href="https://github.com/milvus-io/milvus/pull/33332">（#33332）</a></li>
<li>修复了因参数不正确而导致的 quotaCenter 指标收集失败的问题<a href="https://github.com/milvus-io/milvus/pull/33399">（#33399）</a></li>
</ul>
<h2 id="v241" class="common-anchor-header">v2.4.1<button data-href="#v241" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 5 月 6 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Java SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.1</td><td>2.4.1</td><td>2.4.0</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus 2.4.1 版带来了大量改进和错误修复，旨在提高软件的性能、可观测性和稳定性。这些改进包括声明式资源组 API、支持 Float16/BFloat16 向量数据类型的增强型批量插入功能、可减少对象存储的列表操作的完善的垃圾收集（GC）机制，以及其他与性能优化相关的更改。此外，错误修复还解决了编译错误、换行符模糊匹配失败、RESTful 接口参数数据类型不正确，以及启用动态字段时 BulkInsert 在 numpy 文件上引发错误等问题。</p>
<h3 id="Breaking-changes" class="common-anchor-header">破坏性更改</h3><ul>
<li>不再支持使用空筛选表达式删除。<a href="https://github.com/milvus-io/milvus/pull/32472">(#32472</a>)</li>
</ul>
<h3 id="Features" class="common-anchor-header">新增功能</h3><ul>
<li>在批量插入中添加了对 Float16/BFloat16 向量数据类型的支持<a href="https://github.com/milvus-io/milvus/pull/32157">（#32157）</a></li>
<li>增强了稀疏浮点型向量，以支持暴力迭代器搜索和范围搜索<a href="https://github.com/milvus-io/milvus/pull/32635">(#32635</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>添加了声明式资源组 api<a href="https://github.com/milvus-io/milvus/pull/31930">（＃31930</a>、<a href="https://github.com/milvus-io/milvus/pull/32297">＃32297</a>、<a href="https://github.com/milvus-io/milvus/pull/32536">＃32536</a>、<a href="https://github.com/milvus-io/milvus/pull/32666">＃32666）</a></li>
<li>重写了 QueryCoord 中的 Collections 观察器，使其任务驱动<a href="https://github.com/milvus-io/milvus/pull/32441">(#32441</a>)</li>
<li>重构了 DataNode 的 SyncManager 中使用的数据结构，以减少内存使用并防止错误<a href="https://github.com/milvus-io/milvus/pull/32673">(#32673</a>)</li>
<li>修改了垃圾收集的实现，以尽量减少与对象存储相关的列表操作<a href="https://github.com/milvus-io/milvus/pull/31740">（＃31740）</a></li>
<li>降低了高收集数时的 CPU 占用率<a href="https://github.com/milvus-io/milvus/pull/32245">（＃32245）</a></li>
<li>通过代码自动生成 milvus.yaml 文件中的相关配置项，从而加强了对 milvus.yaml 的管理<a href="https://github.com/milvus-io/milvus/pull/31832">（＃31832</a>、<a href="https://github.com/milvus-io/milvus/pull/32357">＃32357）</a></li>
<li>通过在执行本地缩减后检索数据，增强了查询的性能<a href="https://github.com/milvus-io/milvus/pull/32346">（＃32346）</a></li>
<li>为创建 etcd 客户端添加了 WithBlock 选项<a href="https://github.com/milvus-io/milvus/pull/32641">（＃32641）</a></li>
<li>如果客户端提供，则使用客户端指定的 client_request_id 作为 TraceID<a href="https://github.com/milvus-io/milvus/pull/32264">(#32264</a>)</li>
<li>为删除和批量插入操作的指标添加了数据库标签<a href="https://github.com/milvus-io/milvus/pull/32611">（＃32611）</a></li>
<li>添加了通过配置跳过 AutoID 和 PartitionKey 列验证的逻辑<a href="https://github.com/milvus-io/milvus/pull/32592">（＃32592）</a></li>
<li>改进了与身份验证有关的错误<a href="https://github.com/milvus-io/milvus/pull/32253">(#32253</a>)</li>
<li>改进了 DataCoord 中 AllocSegmentID 的错误日志<a href="https://github.com/milvus-io/milvus/pull/32351">（＃32351</a>，<a href="https://github.com/milvus-io/milvus/pull/32335">＃32335）</a></li>
<li>删除了重复的度量<a href="https://github.com/milvus-io/milvus/pull/32380">（#32380</a>、<a href="https://github.com/milvus-io/milvus/pull/32308">#32308</a>），并清理了未使用的度量<a href="https://github.com/milvus-io/milvus/pull/32404">（#32404</a>、<a href="https://github.com/milvus-io/milvus/pull/32515">#32515）</a></li>
<li>添加了配置选项，以控制是否强制激活 partitionKey 功能<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>添加了配置选项，以控制单次请求中可插入的最大数据量<a href="https://github.com/milvus-io/milvus/pull/32433">（＃32433）</a></li>
<li>在段级别对 applyDelete 操作进行并行化，以加快 Delegator 对 Delete 消息的处理<a href="https://github.com/milvus-io/milvus/pull/32291">(#32291</a>)</li>
<li>使用索引<a href="https://github.com/milvus-io/milvus/pull/32232">（#32232</a>，<a href="https://github.com/milvus-io/milvus/pull/32505">#32505</a>，<a href="https://github.com/milvus-io/milvus/pull/32533">#32533</a>，<a href="https://github.com/milvus-io/milvus/pull/32595">#32595</a>）和添加缓存<a href="https://github.com/milvus-io/milvus/pull/32580">（#32580</a>）来加速 QueryCoord 中频繁的过滤操作。</li>
<li>重写数据结构<a href="https://github.com/milvus-io/milvus/pull/32273">(#32273</a>) 和重构代码<a href="https://github.com/milvus-io/milvus/pull/32389">(#32389</a>) 以加速 DataCoord 中的常见操作。</li>
<li>从 Conan 中移除 openblas<a href="https://github.com/milvus-io/milvus/pull/32002">(#32002</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了在 rockylinux8 中构建 milvus<a href="https://github.com/milvus-io/milvus/pull/32619">(#32619</a>)</li>
<li>修正了 ARM 上 SVE 的编译错误<a href="https://github.com/milvus-io/milvus/pull/32463">(#32463</a>,<a href="https://github.com/milvus-io/milvus/pull/32270">#32270</a>)</li>
<li>修正了基于 ARM 的 GPU 图像的崩溃问题<a href="https://github.com/milvus-io/milvus/pull/31980">(#31980</a>)</li>
<li>修正了 regex 查询无法处理带换行的文本<a href="https://github.com/milvus-io/milvus/pull/32569">(#32569</a>)</li>
<li>修正了因 GetShardLeaders 返回空节点列表而导致搜索结果为空的问题<a href="https://github.com/milvus-io/milvus/pull/32685">（＃32685）</a></li>
<li>修正了 BulkInsert 在遇到 numpy 文件中的 Dynamic Field 时引发错误的问题<a href="https://github.com/milvus-io/milvus/pull/32596">(#32596</a>)</li>
<li>修正了与 RESTFulV2 接口相关的错误，包括允许请求中的数字参数接受数字输入而非字符串类型的重要修正<a href="https://github.com/milvus-io/milvus/pull/32485">(#32485</a>,<a href="https://github.com/milvus-io/milvus/pull/32355">#32355</a>)</li>
<li>通过移除速率限制器中的观察配置事件，修复了代理中的内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/32313">(#32313</a>)</li>
<li>修正了当未指定 partitionName 时，速率限制器会错误地报告无法找到分区的问题<a href="https://github.com/milvus-io/milvus/pull/32647">(#32647</a>)</li>
<li>在错误类型中添加了对 Collections 处于恢复状态和未加载两种情况的检测。<a href="https://github.com/milvus-io/milvus/pull/32447">(#32447</a>)</li>
<li>更正了可查询的负数实体度量<a href="https://github.com/milvus-io/milvus/pull/32361">(#32361</a>)</li>
</ul>
<h2 id="v240" class="common-anchor-header">v2.4.0<button data-href="#v240" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 4 月 17 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.0</td><td>2.4.0</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.4.0 正式发布--在 2.4.0-rc.1 版本的坚实基础上，我们重点解决了用户报告的关键 Bug，同时保留了现有功能。此外，Milvus 2.4.0 还引入了一系列优化措施，旨在提高系统性能，通过纳入各种指标来提高可观察性，并精简代码库以提高简洁性。</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>支持 MinIO TLS 连接<a href="https://github.com/milvus-io/milvus/pull/31396">（#31396</a>、<a href="https://github.com/milvus-io/milvus/pull/31618">#31618）</a></li>
<li>支持标量字段的自动索引<a href="https://github.com/milvus-io/milvus/pull/31593">（＃31593）</a></li>
<li>混合搜索重构，与常规搜索的执行路径保持一致<a href="https://github.com/milvus-io/milvus/pull/31742">（＃31742</a>、<a href="https://github.com/milvus-io/milvus/pull/32178">＃32178）</a></li>
<li>通过重构 bitset 和 bitset_view 加速过滤<a href="https://github.com/milvus-io/milvus/pull/31592">(#31592</a>,<a href="https://github.com/milvus-io/milvus/pull/31754">#31754</a>,<a href="https://github.com/milvus-io/milvus/pull/32139">#32139</a>)</li>
<li>导入任务现在支持等待数据索引完成<a href="https://github.com/milvus-io/milvus/pull/31733">(#31733</a>)</li>
<li>增强了导入兼容性<a href="https://github.com/milvus-io/milvus/pull/32121">（＃32121</a>）、任务调度<a href="https://github.com/milvus-io/milvus/pull/31475">（＃31475</a>）以及对导入文件大小和数量的限制<a href="https://github.com/milvus-io/milvus/pull/31542">（＃31542）</a></li>
<li>简化代码，包括类型检查的接口标准化<a href="https://github.com/milvus-io/milvus/pull/31945">（＃31945</a>、<a href="https://github.com/milvus-io/milvus/pull/31857">＃31857</a>）、删除过时代码和指标<a href="https://github.com/milvus-io/milvus/pull/32079">（＃32079</a>、<a href="https://github.com/milvus-io/milvus/pull/32134">＃32134</a>、<a href="https://github.com/milvus-io/milvus/pull/31535">＃31535</a>、<a href="https://github.com/milvus-io/milvus/pull/32211">＃32211</a>、<a href="https://github.com/milvus-io/milvus/pull/31935">＃31935</a>）以及常量名称的规范化<a href="https://github.com/milvus-io/milvus/pull/31515">（＃31515）</a></li>
<li>为 QueryCoord 当前目标通道检查点滞后延迟新增指标<a href="https://github.com/milvus-io/milvus/pull/31420">(#31420</a>)</li>
<li>为通用指标新增数据库标签<a href="https://github.com/milvus-io/milvus/pull/32024">(#32024</a>)</li>
<li>为删除、索引和加载实体的计数添加新指标，并包含诸如集合名称（collectionName）和数据库名称<a href="https://github.com/milvus-io/milvus/pull/31861">（</a>dbName）等标签<a href="https://github.com/milvus-io/milvus/pull/31861">(#31861</a>)</li>
<li>改进了向量类型不匹配时的错误处理<a href="https://github.com/milvus-io/milvus/pull/31766">(#31766</a>)</li>
<li>当索引无法建立时，支持抛出错误而非崩溃<a href="https://github.com/milvus-io/milvus/pull/31845">(#31845</a>)</li>
<li>支持在放弃数据库时使数据库元缓存失效<a href="https://github.com/milvus-io/milvus/pull/32092">(#32092</a>)</li>
<li>重构通道分发<a href="https://github.com/milvus-io/milvus/pull/31814">（＃31814</a>）和领导者视图管理<a href="https://github.com/milvus-io/milvus/pull/32127">（＃32127</a>）的接口</li>
<li>重构频道分发管理器接口<a href="https://github.com/milvus-io/milvus/pull/31814">（＃31814</a>）和重构领导者视图管理器接口<a href="https://github.com/milvus-io/milvus/pull/32127">（＃32127）</a></li>
<li>批处理<a href="https://github.com/milvus-io/milvus/pull/31632">（＃31632</a>）、添加映射信息<a href="https://github.com/milvus-io/milvus/pull/32234">（＃32234</a>、<a href="https://github.com/milvus-io/milvus/pull/32249">＃32249</a>）和避免使用锁<a href="https://github.com/milvus-io/milvus/pull/31787">（＃31787</a>）以加速频繁调用的操作符</li>
</ul>
<h3 id="Breaking-Changes" class="common-anchor-header">破坏性更改</h3><ul>
<li>停止二进制向量的分组搜索<a href="https://github.com/milvus-io/milvus/pull/31735">(#31735</a>)</li>
<li>停止使用混合搜索进行分组搜索<a href="https://github.com/milvus-io/milvus/pull/31812">(#31812</a>)</li>
<li>停止二进制向量的 HNSW 索引<a href="https://github.com/milvus-io/milvus/pull/31883">(#31883</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">错误修复</h3><ul>
<li>增强了查询和插入的数据类型和值检查，以防止崩溃<a href="https://github.com/milvus-io/milvus/pull/31478">（＃31478</a>、<a href="https://github.com/milvus-io/milvus/pull/31653">＃31653</a>、<a href="https://github.com/milvus-io/milvus/pull/31698">＃31698</a>、<a href="https://github.com/milvus-io/milvus/pull/31842">＃31842</a>、<a href="https://github.com/milvus-io/milvus/pull/32042">＃32042</a>、<a href="https://github.com/milvus-io/milvus/pull/32251">＃32251</a>、<a href="https://github.com/milvus-io/milvus/pull/32204">＃32204）</a></li>
<li>修复了 RESTful API 的错误<a href="https://github.com/milvus-io/milvus/pull/32160">（＃32160）</a></li>
<li>改进了对倒排索引资源使用情况的预测<a href="https://github.com/milvus-io/milvus/pull/31641">(#31641</a>)</li>
<li>解决启用授权时与 etcd 的连接问题<a href="https://github.com/milvus-io/milvus/pull/31668">(#31668</a>)</li>
<li>nats 服务器的安全更新<a href="https://github.com/milvus-io/milvus/pull/32023">（＃32023）</a></li>
<li>将倒排索引文件存储到查询节点的本地存储路径，而不是 /tmp<a href="https://github.com/milvus-io/milvus/pull/32210">(#32210</a>)</li>
<li>解决了 collectionInfo 的数据线内存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/32243">(#32243</a>)</li>
<li>修复了与 fp16/bf16 相关的、可能导致系统崩溃的错误<a href="https://github.com/milvus-io/milvus/pull/31677">（＃31677</a>、<a href="https://github.com/milvus-io/milvus/pull/31841">＃31841</a>、<a href="https://github.com/milvus-io/milvus/pull/32196">＃32196）</a></li>
<li>解决了分组搜索返回结果不足的问题<a href="https://github.com/milvus-io/milvus/pull/32151">(#32151</a>)</li>
<li>调整了使用迭代器的搜索，以更有效地处理还原步骤中的偏移，并确保在启用 "reduceStopForBest "的情况下获得足够的结果<a href="https://github.com/milvus-io/milvus/pull/32088">（#32088）</a></li>
</ul>
<h2 id="v240-rc1" class="common-anchor-header">版本 2.4.0-rc.1<button data-href="#v240-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 3 月 20 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.4.0-rc.1</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>此版本引入了多个基于场景的功能：</p>
<ul>
<li><p><strong>新 GPU 索引 - CAGRA</strong>：得益于英伟达™（NVIDIA®）的贡献，新 GPU 索引的性能提升了 10 倍，尤其是在批量搜索时。有关详情，请参阅<a href="/docs/zh/gpu_index.md">GPU 索引</a>。</p></li>
<li><p><strong>多向量</strong>和<strong>混合搜索</strong>：该功能可以存储来自多个模型的向量 Embeddings 并进行混合搜索。详情请参阅<a href="/docs/zh/multi-vector-search.md">混合搜索</a>。</p></li>
<li><p><strong>稀疏向量</strong>：稀疏向量是关键词解释和分析的理想选择，现在支持在 Collections 中进行处理。有关详情，请参阅<a href="/docs/zh/sparse_vector.md">稀疏向量</a>。</p></li>
<li><p><strong>分组搜索</strong>：分类聚合提高了检索增强生成 (RAG) 应用程序的文档级召回率。详情请参阅<a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">分组搜索</a>。</p></li>
<li><p><strong>反向索引</strong>和<strong>模糊匹配</strong>：这些功能提高了标量字段的关键词检索能力。有关详情，请参阅<a href="/docs/zh/index-scalar-fields.md">索引标量字段</a>和<a href="/docs/zh/single-vector-search.md#filtered-search">过滤搜索</a>。</p></li>
</ul>
<h3 id="New-Features" class="common-anchor-header">新功能</h3><h4 id="GPU-Index---CAGRA" class="common-anchor-header">GPU 索引 - CAGRA</h4><p>我们衷心感谢英伟达™（NVIDIA®）团队为 CAGRA 做出的宝贵贡献，CAGRA 是基于 GPU 的最先进（SoTA）图索引，可在线使用。</p>
<p>与以往的 GPU 索引不同，CAGRA 甚至在小批量查询方面也表现出了压倒性的优势，而这正是 CPU 索引传统上最擅长的领域。此外，CAGRA 在大型批量查询和索引构建速度方面的性能也是无与伦比的，而这正是 GPU 索引大显身手的领域。</p>
<p>示例代码见<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py">example_gpu_cagra.py</a>。</p>
<h4 id="Sparse-Vector-Beta" class="common-anchor-header">稀疏向量（测试版）</h4><p>在此版本中，我们引入了一种新的向量场类型，称为稀疏向量。稀疏向量不同于稠密向量，因为稀疏向量的维数比稠密向量高出数倍，只有少数维数为非零。由于其基于项的性质，这一特征具有更好的可解释性，在某些领域可能更加有效。事实证明，SPLADEv2/BGE-M3 等学习的稀疏模型对于常见的第一阶段排名任务非常有用。Milvus 这一新功能的主要用例是允许对 SPLADEv2/BGE-M3 等神经模型和 BM25 算法等统计模型生成的稀疏向量进行高效的近似语义近邻搜索。Milvus 现在支持稀疏向量的高效和高性能存储、索引和搜索（MIPS，最大内积搜索）。</p>
<p>示例代码请参见<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py">hello_sparse.py</a>。</p>
<h4 id="Multi-Embedding---Hybrid-Search" class="common-anchor-header">多嵌入与混合搜索</h4><p>多向量支持是需要多模型数据处理或混合使用密集向量和稀疏向量的应用的基石。有了多向量支持，您现在可以</p>
<ul>
<li>存储多个模型为非结构化文本、图像或音频样本生成的向量 Embeddings。</li>
<li>进行包含每个实体的多个向量的 ANN 搜索。</li>
<li>通过为不同的 Embeddings 模型分配权重来定制搜索策略。</li>
<li>尝试使用各种嵌入模型，以找到最佳模型组合。</li>
</ul>
<p>多向量支持允许在一个 Collections 中对不同类型的多个向量场（如 FLOAT_VECTOR 和 SPARSE_FLOAT_VECTOR）进行存储、索引和应用重排策略。目前，有两种 Rerankers 策略可供选择：<strong>互易排名融合（RRF）</strong>和<strong>平均加权评分（Average Weighted Scoring</strong>）。这两种策略都是将不同向量场的搜索结果合并成一个统一的结果集。第一种策略优先处理在不同向量领域搜索结果中持续出现的实体，而其他策略则为每个向量领域的搜索结果分配权重，以确定它们在最终结果集中的重要性。</p>
<p>示例代码见<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py">hybrid_search.py</a>。</p>
<h4 id="Inverted-Index-and-Fuzzy-Match" class="common-anchor-header">反向索引和模糊匹配</h4><p>在 Milvus 以前的版本中，标量字段索引使用了基于内存的二进制搜索索引和 Marisa Trie 索引。不过，这些方法需要消耗大量内存。现在，Milvus 的最新版本采用了基于 Tantivy 的倒排索引，可应用于所有数字和字符串数据类型。这种新索引大大提高了标量查询性能，将字符串中关键字的查询量减少了十倍。此外，由于对数据压缩和内部索引结构的内存映射存储（MMap）机制进行了额外优化，倒置索引消耗的内存更少。</p>
<p>该版本还支持在标量过滤中使用前缀、后缀和后缀进行模糊匹配。</p>
<p>示例代码可在<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py">inverted_index_example.py</a>和<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py">fuzzy_match.py</a> 中找到。</p>
<h4 id="Grouping-Search" class="common-anchor-header">分组搜索</h4><p>现在，您可以根据特定标量字段中的值对搜索结果进行聚合。这有助于 RAG 应用程序实现文档级召回。考虑一个文档 Collections，每个文档分成不同的段落。每个段落由一个向量 Embeddings 表示，属于一个文档。为了找到最相关的文档而不是分散的段落，可以在 search() 操作中加入 group_by_field 参数，根据文档 ID 对结果进行分组。</p>
<p>示例代码见<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py">example_group_by.py</a>。</p>
<h4 id="Float16-and-BFloat--Vector-DataType" class="common-anchor-header">Float16 和 BFloat- 向量数据类型</h4><p>机器学习和神经网络经常使用半精度数据类型，如 Float16 和 BFloat--虽然这些数据类型可以提高查询效率并减少内存使用量，但同时也会降低精度。在此版本中，Milvus 现在支持向量字段的这些数据类型。</p>
<p>示例代码可在<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py">float16_example.py</a>和<a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py">bfloat16_example.py</a> 中找到。</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">升级后的架构</h3><h4 id="L0-Segment" class="common-anchor-header">L0 段</h4><p>此版本包含一个名为 L0 段的新网段，用于记录删除的数据。该分段会定期压缩已存储的删除记录，并将其分割成密封分段，从而减少小规模删除所需的数据刷新次数，并留下少量存储空间。通过这种机制，Milvus 将数据压缩与数据刷新完全分离，提高了删除和上载操作的性能。</p>
<h4 id="Refactored-BulkInsert" class="common-anchor-header">重构的批量插入</h4><p>此版本还引入了改进的批量插入逻辑。这样就可以在单个批量插入请求中导入多个文件。通过重构版本，批量插入的性能和稳定性都有了显著提高。用户体验也得到了增强，例如对速率限制进行了微调，错误信息也更加友好。此外，你还可以通过 Milvus 的 RESTful API 轻松访问批量插入端点。</p>
<h4 id="Memory-mapped-Storage" class="common-anchor-header">内存映射存储</h4><p>Milvus 使用内存映射存储（MMap）来优化内存使用。这种机制不是将文件内容直接加载到内存中，而是将文件内容映射到内存中。这种方法会导致性能下降。  在拥有 2 个 CPU 和 8 GB 内存的主机上，通过为 HNSW 索引 Collections 启用 MMap，可以多加载 4 倍的数据，而性能下降不到 10%。</p>
<p>此外，该版本还允许对 MMap 进行动态和细粒度控制，而无需重启 Milvus。</p>
<p>有关详情，请参阅<a href="/docs/zh/mmap.md">MMap 存储</a>。</p>
<h3 id="Others" class="common-anchor-header">其他</h3><h4 id="Milvus-CDC" class="common-anchor-header">Milvus-CDC</h4><p>Milvus CDC 是一个易于使用的配套工具，用于捕获和同步 Milvus 实例之间的增量数据，从而轻松实现增量备份和灾难恢复。在此版本中，Milvus-CDC 的稳定性得到了提高，其变更数据捕获 (CDC) 功能现已全面可用。</p>
<p>要了解有关 Milvus-CDC 的更多信息，请参阅<a href="https://github.com/zilliztech/milvus-cdc">GitHub 存储库</a>和<a href="/docs/zh/milvus-cdc-overview.md">Milvus-CDC 概述</a>。</p>
<h4 id="Refined-MilvusClient-Interfaces" class="common-anchor-header">改进的 MilvusClient 界面</h4><p>MilvusClient 是 ORM 模块的易用替代品。它采用纯功能方法来简化与服务器的交互。每个 MilvusClient 都会与服务器建立 gRPC 连接，而不是维护一个连接池。 MilvusClient 模块实现了 ORM 模块的大部分功能。 要了解有关 MilvusClient 模块的更多信息，请访问<a href="https://github.com/milvus-io/pymilvus">pymilvus</a>和<a href="/api-reference/pymilvus/v2.4.x/About.md">参考文档</a>。</p>
