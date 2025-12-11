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
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 11 月 21 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.6.6 版本发布，它具有一系列强大的新功能、性能增强和重要的错误修复。本次更新引入了 Geospatial 和 Timestampz 数据类型、用于重新评分的 Boost ranker 等重要功能。该版本还改进了许多重要的标量过滤性能。此外，还解决了几个关键错误，以确保更高的稳定性和可靠性。通过这一版本，Milvus 将继续为所有用户提供更强大、更高效的体验。以下是该版本的主要亮点。</p>
<ul>
<li>地理空间数据类型：Milvus 引入了对<code translate="no">Geometry</code> 数据类型的支持，代表符合 OGC 标准的几何对象，如<code translate="no">POINT</code>,<code translate="no">LINESTRING</code>, 和<code translate="no">POLYGON</code> 。该类型支持多种空间关系操作符（st_contains、st_intersects、st_within、st_dwithin......），并提供<code translate="no">RTREE</code> 空间索引，以加速空间过滤和查询执行。这样就能为 LBS、制图和其他空间工作负载高效地存储和查询地理空间形状。</li>
<li>Timestamptz 数据类型：Milvus 引入了 TIMESTAMPTZ 数据类型，为所有时间数据提供时区感知。该功能允许用户使用数据库和 Collections 上的时区属性定义默认时间上下文，从而在全球部署中实现一致的数据管理。最重要的是，该字段完全支持基于表达式的时间范围查询过滤，检索操作（查询和搜索）支持时区参数，以便在输出时将时间戳即时、即时地转换为所需的本地格式。</li>
<li>提升排名器：Boost Ranker 允许 Milvus 在函数中使用可选的过滤条件来查找搜索结果候选项中的匹配项，并通过应用指定的权重来提高这些匹配项的得分，从而帮助提升或降低匹配实体在最终结果中的排名，而不是仅仅依赖基于向量距离计算的语义相似性。</li>
<li>STL_SORT 索引现在支持 VARCHAR 和 TIMESTAMPTZ 数据类型。</li>
<li>现在可以通过更改现有 Collections 启用动态字段。</li>
<li>修正了 cve-2025-63811。</li>
</ul>
<h3 id="Features" class="common-anchor-header">新增功能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>添加了新配置并启用了动态更新配置<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
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
<li>修正了 cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>删除了 querynode 日志中的大段 id 数组<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>更新了 expr 在每个循环中复制输入值的多个地方<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>优化了术语 expr 性能<a href="https://github.com/milvus-io/milvus/pull/45671">（#45671）</a></li>
<li>为封存的非索引段预取向量块<a href="https://github.com/milvus-io/milvus/pull/45666">（#45666）</a></li>
<li>表达式：只预取一次块<a href="https://github.com/milvus-io/milvus/pull/45555">（#45555）</a></li>
<li>为几何和 timestamptz 类型添加了可归零支持<a href="https://github.com/milvus-io/milvus/pull/45522">（#45522）</a></li>
<li>会话 ttl 从 10 秒增至 30 秒<a href="https://github.com/milvus-io/milvus/pull/45517">（#45517）</a></li>
<li>为 ddl 框架添加了更多指标<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>更新了 maxconnections 配置版本<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>跳过检查源 ID<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>支持远程存储的 max_connection 配置<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>通过在清除 insertrecord pk2offset 时添加空指针检查来防止恐慌<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>对分层存储场景中的标量字段获取进行了一些优化<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>修正了分析器参数的错字<a href="https://github.com/milvus-io/milvus/pull/45434">（＃45434）</a></li>
<li>创建段索引时覆盖了索引类型<a href="https://github.com/milvus-io/milvus/pull/45417">（＃45417）</a></li>
<li>为 updatereplicateconfiguration 添加了 rbac 支持<a href="https://github.com/milvus-io/milvus/pull/45236">（#45236）</a></li>
<li>将 go 版本提升至 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>禁用默认配置的 jsonshredding<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>统一了缓冲区和直接输入/输出的对齐缓冲区<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>重命名与 jsonstats 相关的用户配置参数<a href="https://github.com/milvus-io/milvus/pull/45252">（#45252）</a></li>
<li>让 knowhere 线程池配置可刷新<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>删减了新的 ddl 框架和 CDC 3 的补丁<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>创建新 Collections 时设置 Schema 版本<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>为 bulkinsert 支持 jsonl/ndjson 文件<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>等待复制流客户端完成<a href="https://github.com/milvus-io/milvus/pull/45260">（#45260）</a></li>
<li>让几何缓存成为可选配置<a href="https://github.com/milvus-io/milvus/pull/45196">（#45196）</a></li>
<li>删减了新的 ddl 框架和 CDC 2 的补丁<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>默认不启动 CDC<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>新 ddl 框架和 CDC 的精选补丁<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>删除了最大向量字段数量限制<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>显示导入工作的创建时间<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>优化了范围查询的标量索引排序位图初始化<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>启用 stl_sort，以支持 varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>将分片客户端逻辑提取到专用软件包中<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>重构权限管理，将权限缓存提取到单独的软件包中<a href="https://github.com/milvus-io/milvus/pull/45002">（＃45002）</a></li>
<li>在 fillfielddata 中支持 json 默认值<a href="https://github.com/milvus-io/milvus/pull/45470">（#45470）</a></li>
<li>更新了修改 Collections 时的 enabledynamicfield 和 schemaversion<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>修复了 timestamptz 的部分更新恐慌<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>使用 2.6.6 升级 Milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>使用最新的时间戳来过期缓存<a href="https://github.com/milvus-io/milvus/pull/45699">（#45699）</a></li>
<li>让流节点在初始化失败时退出<a href="https://github.com/milvus-io/milvus/pull/45732">（#45732）</a></li>
<li>保护 tbb concurrent_map emplace 以避免竞赛条件死锁<a href="https://github.com/milvus-io/milvus/pull/45682">（＃45682）</a></li>
<li>当流协调关闭但 Query coord 仍在工作时，防止出现恐慌<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>在工作者没有任务时设置任务初始值<a href="https://github.com/milvus-io/milvus/pull/45676">（＃45676）</a></li>
<li>当准备失败时，防止运行组件中出现死锁<a href="https://github.com/milvus-io/milvus/pull/45647">（#45647）</a></li>
<li>防止重复关闭 ack 广播通道时发生恐慌<a href="https://github.com/milvus-io/milvus/pull/45662">（#45662）</a></li>
<li>更正了添加字段时的默认值回填<a href="https://github.com/milvus-io/milvus/pull/45644">（＃45644）</a></li>
<li>压缩了频道的分配历史，以减少分配恢复信息的大小<a href="https://github.com/milvus-io/milvus/pull/45607">（＃45607）</a></li>
<li>在压缩新增字段时正确处理默认值<a href="https://github.com/milvus-io/milvus/pull/45619">（#45619）</a></li>
<li>删除 dropindex 中的 validatefieldname<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>当来自段不健康时忽略压缩任务<a href="https://github.com/milvus-io/milvus/pull/45535">（#45535）</a></li>
<li>在广播更改 Collections 之前设置 Schema 属性<a href="https://github.com/milvus-io/milvus/pull/45529">（#45529）</a></li>
<li>在键无效时存储数据库事件<a href="https://github.com/milvus-io/milvus/pull/45530">（#45530）</a></li>
<li>修复了结构字段的批量导入错误<a href="https://github.com/milvus-io/milvus/pull/45536">（#45536）</a></li>
<li>混合索引获取原始数据失败<a href="https://github.com/milvus-io/milvus/pull/45408">（#45408）</a></li>
<li>提前保留 Collections 以防止其在查询完成前被释放<a href="https://github.com/milvus-io/milvus/pull/45415">（#45415）</a></li>
<li>为 ddl 使用了正确的资源键锁，并在传输副本中使用了新的 ddl<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>修复了升级后的索引<a href="https://github.com/milvus-io/milvus/pull/45374">兼容性问题（#45374）</a></li>
<li>修复了通道不可用的错误，并解除了 Collections 阻塞<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>删除分区时的 Collections 元<a href="https://github.com/milvus-io/milvus/pull/45497">（#45497）</a></li>
<li>修正了两次保存统计结果时标记为已放弃的目标分区<a href="https://github.com/milvus-io/milvus/pull/45479">（#45479）</a></li>
<li>错误更新了 Collections 信息的时间戳<a href="https://github.com/milvus-io/milvus/pull/45471">（#45471）</a></li>
<li>添加了 tzdata 依赖关系以启用 iana 时区 ID 识别<a href="https://github.com/milvus-io/milvus/pull/45495">（#45495）</a></li>
<li>更正了批量搜索 Rerankers 函数中的字段数据偏移计算<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>修正了使用 mmap 增长时的过滤器几何形状<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>下一个字段数据未考虑结构体<a href="https://github.com/milvus-io/milvus/pull/45438">（#45438）</a></li>
<li>组值为零<a href="https://github.com/milvus-io/milvus/pull/45419">（＃45419）</a></li>
<li>为压缩中的切片箭头数组提供了精确的大小估计<a href="https://github.com/milvus-io/milvus/pull/45352">（#45352）</a></li>
<li>修复了复制流客户端中的数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/45347">（#45347）</a></li>
<li>跳过为新添加的列建立文本索引<a href="https://github.com/milvus-io/milvus/pull/45317">（#45317）</a></li>
<li>在 l0 压缩中意外忽略了密封段<a href="https://github.com/milvus-io/milvus/pull/45341">（#45341）</a></li>
<li>将 finishload 移至文本索引创建之前，以确保原始数据的可用性<a href="https://github.com/milvus-io/milvus/pull/45335">（#45335）</a></li>
<li>在 json 路径为空的情况下未使用 json_shredding<a href="https://github.com/milvus-io/milvus/pull/45311">（#45311）</a></li>
<li>对与 timestamptz 相关的修复进行了删减<a href="https://github.com/milvus-io/milvus/pull/45321">（#45321）</a></li>
<li>修正了因获取磁盘使用情况错误而导致的加载段失败<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>在压缩中支持 json 默认值<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>为增长段的几何索引计算正确的批次大小<a href="https://github.com/milvus-io/milvus/pull/45261">（#45261）</a></li>
<li>应用了 ddl 框架错误补丁<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>修正了结构体的 mmap 设置导致的更改 Collections 失败<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>在复合 binlog 写入器中初始化了时间戳范围<a href="https://github.com/milvus-io/milvus/pull/45283">（＃45283）</a></li>
<li>跳过为增长的 r-tree 索引创建 tmp 目录<a href="https://github.com/milvus-io/milvus/pull/45257">（#45257）</a></li>
<li>更新执行器时避免了潜在的竞赛条件<a href="https://github.com/milvus-io/milvus/pull/45232">（＃45232）</a></li>
<li>允许在索引名称中使用"["和"]"（<a href="https://github.com/milvus-io/milvus/pull/45194">#45194）</a></li>
<li>修复了当 json 为空而非 null 时粉碎 json 的错误<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>确保追加操作只能由钱包本身取消，而不能由 rpc 取消<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>解决了 wp gcp 云存储访问 ak/sk 的问题<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>修复了导入空几何体数据的问题<a href="https://github.com/milvus-io/milvus/pull/45162">（#45162）</a></li>
<li>在 jsonstatsparquetwriter::close() 中为 packed_writer_ 添加了空值检查<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>未能在嵌入列表中对 emb_list_meta 进行毫米映射<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>当 Collections 没有分段时，更新了 querynode 数量指标<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>在导入无效的 utf-8 字符串时防止重试<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>在重新查询情况下处理 reduce/erankers 中的空字段数据<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>修正了优雅停止 CDC 时的恐慌<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>修正了验证令牌污染、oss/cos 支持、多余的同步错误日志<a href="https://github.com/milvus-io/milvus/pull/45106">（#45106）</a></li>
<li>处理字符串索引排序中的全空数据，防止加载超时<a href="https://github.com/milvus-io/milvus/pull/45104">（#45104）</a></li>
<li>禁止从请求中构建旧版本的 jsonstats<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>修正了导入几何数据的错误<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>修复了 struct 中的 parquet 导入错误<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>将 getmetrics 添加回 indexnodeserver 以确保兼容性<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>修正了结构体子字段的更改 Collections 失败<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>修复了结构体的 Collections 层 mmap 不生效的问题<a href="https://github.com/milvus-io/milvus/pull/44997">（#44997）</a></li>
<li>防止了 querycoord Collections 通知更新中的数据竞赛<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>处理了存储层中 json 字段的默认值<a href="https://github.com/milvus-io/milvus/pull/45009">（＃45009）</a></li>
<li>双重检查以避免 iter 被其他线程擦除<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>修正了用于过滤几何图形的 GIS 函数的错误<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期： 2025 年 11 月 11 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布发布 Milvus 2.6.5，该版本解决了<a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a>的一个<strong>重要安全漏洞</strong>，并升级到 Go 1.24.9。我们强烈建议<strong>所有 Milvus 2.6.x 用户尽快升级到 2.6.5</strong>。本次更新还包括其他一些改进和错误修复，为用户提供更强大、更高效的体验。</p>
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
<li>更新了生成器图像标签，可升级至 go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>跳过检查源 ID<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>组值为零<a href="https://github.com/milvus-io/milvus/pull/45421">（#45421）</a></li>
<li>在复合 binlog 写入器中初始化了时间戳范围（<a href="https://github.com/milvus-io/milvus/pull/45402">#45402）</a></li>
<li>在重新查询情况下处理 reduce/erankers 中的空字段数据 (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>在 jsonstatsparquetwrite 中为 packed_writer_ 添加了空检查<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>跳过为新添加的列建立文本索引<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>在 l0 压缩中意外忽略了密封段<a href="https://github.com/milvus-io/milvus/pull/45351">（#45351）</a></li>
<li>将 finishload 移至文本索引创建之前，以确保原始数据的可用性<a href="https://github.com/milvus-io/milvus/pull/45336">（#45336）</a></li>
<li>在压缩中支持 json 默认值<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>更新了 Milvus-storage，以修复重复的 aws sdk 初始化 (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2025 年 10 月 21 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.6.4 版本发布，该版本具有一系列强大的新功能、性能增强和重要的错误修复。本次更新引入了一些重要功能，如用于高级数据模型的 ARRAY 中的 Struct。此外，我们默认启用了 JSON Shredding，进一步提高了查询性能和效率。我们还解决了几个关键错误，以确保更高的稳定性和可靠性。通过此次发布，Milvus 将继续为所有用户提供更强大、更高效的体验。以下是该版本的主要亮点。</p>
<h3 id="Features" class="common-anchor-header">功能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>ARRAY 中的 Struct：Milvus 引入了新的数据类型 Struct，允许用户在单个实体中组织和管理多个相关字段。目前，Struct 只能作为 DataType.ARRAY 下的一个元素使用，从而实现了向量数组（Array of Vector）等功能，其中每一行都包含多个向量，为复杂的数据建模和搜索开辟了新的可能性。<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>在 DashScope 中支持 Qwen GTE-Rerank-v2 模型<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
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
<li><strong>将 Go 版本升级至 1.24.6</strong>，并增加了图像生成器<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>启用默认的 JSON 碎纸<a href="https://github.com/milvus-io/milvus/pull/44811">（#44811）</a></li>
<li>为加载的 binlog 大小添加了磁盘配额，以防止查询节点加载失败<a href="https://github.com/milvus-io/milvus/pull/44932">（#44932）</a></li>
<li>在 MemVectorIndex 中为结构数组启用了 mmap 支持<a href="https://github.com/milvus-io/milvus/pull/44832">（#44832）</a></li>
<li>为 TextMatchIndex 添加了缓存层管理<a href="https://github.com/milvus-io/milvus/pull/44768">（#44768）</a></li>
<li>优化了位图反向查找性能（<a href="https://github.com/milvus-io/milvus/pull/44838">#44838）</a></li>
<li>更新了 Knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/44707">（#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765）</a></li>
<li>删除了段加载过程中的逻辑使用检查<a href="https://github.com/milvus-io/milvus/pull/44770">（#44770）</a></li>
<li>为模板值长度信息添加了访问日志字段<a href="https://github.com/milvus-io/milvus/pull/44783">（#44783）</a></li>
<li>允许在索引构建过程中覆盖当前索引类型<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>为向量索引添加了加载参数<a href="https://github.com/milvus-io/milvus/pull/44749">（#44749）</a></li>
<li>统一了压实执行器任务状态管理<a href="https://github.com/milvus-io/milvus/pull/44722">（#44722）</a></li>
<li>为 QueryCoord 中的任务调度程序添加了完善的日志<a href="https://github.com/milvus-io/milvus/pull/44725">（#44725）</a></li>
<li>确保 accesslog.$consistency_level 代表使用的实际值（<a href="https://github.com/milvus-io/milvus/pull/44711">#44711）</a></li>
<li>删除了 datacoord 中多余的通道管理器<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
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
<li>从构建 Dockerfile 中移除 GCC 以修复 CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>确保分数相同时搜索结果的确定性排序<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>如果 Reranker 未使用字段数据，则在重新查询前重新排序<a href="https://github.com/milvus-io/milvus/pull/44943">（#44943）</a></li>
<li>确保在 CreateArrowFileSystem 抛出异常时履行承诺<a href="https://github.com/milvus-io/milvus/pull/44976">（#44976）</a></li>
<li>修复了磁盘加密配置缺失的问题<a href="https://github.com/milvus-io/milvus/pull/44839">（#44839）</a></li>
<li>修正了停用余额检查器导致余额停止的问题<a href="https://github.com/milvus-io/milvus/pull/44836">（#44836）</a></li>
<li>修正了 "不等于 "不包括 "无 "的问题<a href="https://github.com/milvus-io/milvus/pull/44960">（#44960）</a></li>
<li>在 CreateArrowScalarFromDefaultValue 中支持 JSON 默认值<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>在调试日志中使用短调试字符串以避免换行<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>修正了 JSON 平面索引的 exists 表达式<a href="https://github.com/milvus-io/milvus/pull/44951">（#44951）</a></li>
<li>统一了 JSON 存在路径语义<a href="https://github.com/milvus-io/milvus/pull/44926">（#44926）</a></li>
<li>修复了因内部插入信息为空而导致的恐慌<a href="https://github.com/milvus-io/milvus/pull/44906">（#44906）</a></li>
<li>更新了 AI/SAQ 参数<a href="https://github.com/milvus-io/milvus/pull/44862">（#44862）</a></li>
<li>删除了禁用自动索引时重复数据删除的限制<a href="https://github.com/milvus-io/milvus/pull/44824">（#44824）</a></li>
<li>避免了对 DataCoord 指标的并发重置/添加操作<a href="https://github.com/milvus-io/milvus/pull/44815">（#44815）</a></li>
<li>修复了 JSON_contains(path, int) 中的错误（<a href="https://github.com/milvus-io/milvus/pull/44818">#44818）</a></li>
<li>在处理 JSON 时避免了缓存层中的驱逐<a href="https://github.com/milvus-io/milvus/pull/44813">（#44813）</a></li>
<li>修正了跳过 exp 过滤器时的错误结果<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>检查查询节点是否为带标签和流节点列表的 SQN<a href="https://github.com/milvus-io/milvus/pull/44793">（#44793）</a></li>
<li>修正了 BM25，当 boost 返回无序结果时<a href="https://github.com/milvus-io/milvus/pull/44759">（#44759）</a></li>
<li>修复了带自动 ID 的批量导入<a href="https://github.com/milvus-io/milvus/pull/44694">（#44694）</a></li>
<li>加载索引时通过 FileManagerContext 传递文件系统<a href="https://github.com/milvus-io/milvus/pull/44734">（#44734）</a></li>
<li>使用 "最终 "并修复了任务 ID 同时出现在执行和完成状态的问题<a href="https://github.com/milvus-io/milvus/pull/44715">（#44715）</a></li>
<li>删除了不正确的开始时间标记，以避免过滤时间轴小于它的 DML<a href="https://github.com/milvus-io/milvus/pull/44692">（#44692）</a></li>
<li>使 AWS 凭据提供程序成为单例<a href="https://github.com/milvus-io/milvus/pull/44705">（#44705）</a></li>
<li>禁用了对包含数字的 JSON 路径的粉碎处理<a href="https://github.com/milvus-io/milvus/pull/44808">（#44808）</a></li>
<li>修正了 TestUnaryRangeJsonNullable 的有效单元测试<a href="https://github.com/milvus-io/milvus/pull/44990">（#44990）</a></li>
<li>修正了单元测试并移除了文件系统回退逻辑<a href="https://github.com/milvus-io/milvus/pull/44686">（#44686）</a></li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2025 年 10 月 11 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.6.3 版本发布，该版本引入了各种令人兴奋的新功能、改进和关键错误修复。该版本增强了系统性能，扩展了功能，修复了关键问题，为所有用户提供了更稳定的体验。以下是该版本的亮点：</p>
<h3 id="New-Features" class="common-anchor-header">新功能<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>启用自动 ID 的主键：启用<code translate="no">autoid</code> 时，用户现在可以写入主键字段。<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>手动压缩 L0 段：新增了对手动压缩 L0 段的支持。<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>自动 ID 中的群集 ID 编码：自动生成的 ID 现在将包含群集 ID。<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>支持 gRPC 标记符号：集成 gRPC 标记符号器，提高查询灵活性。<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
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
<li>通过实施优先队列改进了平衡检查器，改善了任务分配。<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>为密封段预载 BM25 统计信息并优化序列化。<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>可空字段现在可用作 BM25 函数的输入。<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>在啄木鸟中添加了对 Azure Blob Storage 的支持。<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>在啄木鸟分段压缩之后立即清除小文件。<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>为增强查询启用随机得分功能。<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>为自动索引中的<code translate="no">int8</code> 向量类型新增了配置选项。<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>添加了控制混合搜索重新查询策略的参数项。<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>添加了对插入函数输出字段的控制支持。<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>衰减函数现在支持可配置的分数合并，以提高性能。<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>改进了字符串二进制搜索的性能。<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>在查询中引入了对稀疏过滤器的支持。 <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>增强分层索引功能的各种更新。<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>为标量和向量搜索添加了存储资源使用跟踪功能。<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>为删除/upsert/restful 添加存储使用情况<a href="https://github.com/milvus-io/milvus/pull/44512">（#44512）</a></li>
<li>为<code translate="no">flushall</code> 操作启用粒度刷新目标。<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>数据节点现在将使用非蝶式文件系统，以便更好地管理资源。<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>为元数据中的批处理添加了配置选项。 <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>错误信息现在包含数据库名称，从而更加清晰。<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>为更好地模块化，将跟踪测试移至<code translate="no">milvus-common</code> 仓库。<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>为了更好地组织，将 C API 单元测试文件移至<code translate="no">src</code> 目录。<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>如果启用了<code translate="no">autoid</code> ，Go SDK 现在允许用户插入主键数据。<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>解决了 CVE-2020-25576 和 WS-2023-0223 漏洞。<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>修正了一个问题，即逻辑资源被用于流节点上配额中心的度量。<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>启用备用时，在<code translate="no">activatefunc</code> 中设置<code translate="no">mixcoord</code> 。<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>删除了存储 V2 组件的冗余初始化。<a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>修复了因执行器循环退出而导致的压缩任务阻塞。<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>在<code translate="no">insert/deleterecord</code> 析构函数中退还了已加载资源的使用。<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>修复了复制器无法停止的问题，并增强了复制配置验证器。<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>禁用 mmap 时，将<code translate="no">mmap_file_raii_</code> 设为<code translate="no">nullptr</code> 。<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>使<code translate="no">diskfilemanager</code> 从上下文中使用文件系统。<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>在存储 V2 中为 OSS 和 COS 强制虚拟主机。<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>当<code translate="no">extrainfo</code> 不是<code translate="no">nil</code> 时，设置<code translate="no">report_value</code> 的默认值，以实现兼容性。<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>删除 rootcoord 中的 Collections 后，清理了 Collection 指标。<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>修复了因字段<code translate="no">mmap.enable</code> 属性重复而导致的段加载失败。<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>修正了动态副本的加载配置解析错误。<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>在 Go SDK 中处理了动态列的行到列输入。<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 9 月 19 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.6.2 正式发布！本次更新引入了强大的新功能、显著的性能提升和关键修复，使系统更加稳定，更适合生产。该版本的亮点包括：使用 upsert 进行部分字段更新、使用 JSON Shredding 加速动态字段过滤、使用 NGram 索引实现更快的 LIKE 查询，以及在现有 Collections 上实现更灵活的 Schema 演进。该版本基于社区反馈，为实际部署奠定了更坚实的基础，我们鼓励所有用户升级以利用这些改进。</p>
<h3 id="Features" class="common-anchor-header">新增功能<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>添加了对 JSON Shredding 的支持，以加速动态字段过滤。有关详细信息，请参阅<a href="/docs/zh/json-shredding.md">JSON Shredding</a>。</li>
<li>已添加对 NGRAM 索引的支持，以加速同类操作。有关详情，请参阅<a href="/docs/zh/ngram.md">NGRAM</a>。</li>
<li>已添加对 upsert API 部分字段更新的支持。有关详情，请参阅 "<a href="/docs/zh/upsert-entities.md">Upsert Entities</a>"。</li>
<li>已添加对 Boost 功能的支持。详情请参阅<a href="/docs/zh/boost-ranker.md">Boost Ranker</a>。</li>
<li>已添加对按 JSON 字段和动态字段分组的支持<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>已添加对在现有 Collections 上启用动态 Schema 的支持<a href="https://github.com/milvus-io/milvus/pull/44151">（#44151）</a></li>
<li>已添加对删除索引而不释放 Collections 的支持<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
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
<li>[存储2]将日志文件大小改为压缩大小<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[存储2]在加载信息中添加了子字段<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2]在系统组中添加了对包含 Partition Key 和集群 Key 的支持<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>删除了压缩任务的超时<a href="https://github.com/milvus-io/milvus/pull/44277">（#44277）</a></li>
<li>[StorageV2]启用与 Azure 一起构建<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] 利用组信息估算逻辑使用量<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] 利用组拆分信息估算使用量<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] 在压缩中保存列组结果<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] 为基于大小的拆分策略添加了配置<a href="https://github.com/milvus-io/milvus/pull/44301">（#44301）</a></li>
<li>[StorageV2] 添加了对基于 Schema 和基于大小的拆分策略的支持<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] 已添加可配置的拆分策略<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[缓存层]添加了更多指标和配置<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>添加了在加载段之前等待所有索引准备就绪的支持<a href="https://github.com/milvus-io/milvus/pull/44313">（#44313）</a></li>
<li>为重核节点添加了内部核心延迟指标<a href="https://github.com/milvus-io/milvus/pull/44010">（#44010）</a></li>
<li>优化了打印 KV 参数时的访问日志格式<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>添加了修改转储快照批量大小的配置<a href="https://github.com/milvus-io/milvus/pull/44215">（#44215）</a></li>
<li>缩短了压缩任务清理间隔<a href="https://github.com/milvus-io/milvus/pull/44207">（#44207）</a></li>
<li>增强了合并排序以支持多个字段<a href="https://github.com/milvus-io/milvus/pull/44191">（#44191</a>）<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>为分层索引添加了负载资源估算<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>为重复数据删除情况添加了自动索引配置<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>已添加配置，允许在名称中使用自定义字符 (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>为流媒体服务添加了对 cchannel 的支持<a href="https://github.com/milvus-io/milvus/pull/44143">（＃44143）</a></li>
<li>已添加互斥和范围检查以保护并发删除<a href="https://github.com/milvus-io/milvus/pull/44128">（#44128）</a></li>
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
<li>在暴力和索引之间调整了 exists 表达式的行为<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>修复了重命名到删除的 Collections 时的错误<a href="https://github.com/milvus-io/milvus/pull/44436">（#44436）</a></li>
<li>[存储空间 2]检查子字段长度<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[存储V2]默认打开 Azure<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>更正了池化数据节点下 L0 压缩的上传路径<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>如果启用了数据库加密，则不允许重命名<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>禁止删除 dynamicfield.enable 属性<a href="https://github.com/milvus-io/milvus/pull/44335">（#44335）</a></li>
<li>当预分配 ID 无效时，将任务标记为失败<a href="https://github.com/milvus-io/milvus/pull/44350">（#44350）</a></li>
<li>跳过 PK 比较表达式的 MVCC 检查<a href="https://github.com/milvus-io/milvus/pull/44353">（#44353）</a></li>
<li>修复了统计的 json_contains 错误<a href="https://github.com/milvus-io/milvus/pull/44325">（#44325）</a></li>
<li>为查询节点和流节点添加了初始化文件系统检查<a href="https://github.com/milvus-io/milvus/pull/44360">（#44360）</a></li>
<li>修正了当段被垃圾收集时的空压缩目标<a href="https://github.com/milvus-io/milvus/pull/44270">（#44270）</a></li>
<li>修正了初始化时间戳索引时的竞赛条件<a href="https://github.com/milvus-io/milvus/pull/44317">（#44317）</a></li>
<li>检查数组数据是否为空，以防止出现恐慌<a href="https://github.com/milvus-io/milvus/pull/44332">（#44332）</a></li>
<li>修正了为嵌套对象构建 JSON 统计信息的错误<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>避免了多个 JSON 字段的 mmap 重写<a href="https://github.com/milvus-io/milvus/pull/44299">（#44299）</a></li>
<li>统一有效数据格式<a href="https://github.com/milvus-io/milvus/pull/44296">（#44296）</a></li>
<li>隐藏网页用户界面中嵌入/Reranking 提供商的凭证<a href="https://github.com/milvus-io/milvus/pull/44275">（#44275）</a></li>
<li>更正了池化数据节点下的统计日志路径<a href="https://github.com/milvus-io/milvus/pull/44288">（#44288）</a></li>
<li>更正了 IDF 甲骨文的路径<a href="https://github.com/milvus-io/milvus/pull/44266">（#44266）</a></li>
<li>如果没有 vchannel 正在恢复，则使用恢复快照检查点<a href="https://github.com/milvus-io/milvus/pull/44246">（#44246）</a></li>
<li>限制 JSON 统计数据中的列数<a href="https://github.com/milvus-io/milvus/pull/44233">（#44233）</a></li>
<li>创建负载资源计数 n-gram 索引（<a href="https://github.com/milvus-io/milvus/pull/44237">#44237）</a></li>
<li>从非空搜索结果中推断度量类型<a href="https://github.com/milvus-io/milvus/pull/44222">（#44222）</a></li>
<li>修复了多分段写入只能写入一个分段的问题<a href="https://github.com/milvus-io/milvus/pull/44256">（#44256）</a></li>
<li>修复了合并排序超出范围的问题<a href="https://github.com/milvus-io/milvus/pull/44230">（#44230）</a></li>
<li>在执行 BM25 函数前添加了 UTF-8 检查<a href="https://github.com/milvus-io/milvus/pull/44220">（#44220）</a></li>
<li>重试已存在的旧会话<a href="https://github.com/milvus-io/milvus/pull/44208">（#44208）</a></li>
<li>添加了 Kafka 缓冲区大小限制，以防止数据节点 OOM<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>通过扩展锁保护范围修复了恐慌<a href="https://github.com/milvus-io/milvus/pull/44130">（#44130）</a></li>
<li>修复了在 Schema 更改时未刷新增长的数据段的问题<a href="https://github.com/milvus-io/milvus/pull/44412">（#44412）</a></li>
<li>[StorageV2]处理 IO 错误<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>防止在 Tantivy 索引路径不存在时出现恐慌<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
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
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON 扁平索引（测试版）</h4><p>Milvus 2.6 引入了 JSON 扁平索引，以处理高度动态的 JSON Schema。JSON 路径索引需要预先声明特定路径及其预期类型，而 JSON 扁平索引则不同，它会自动发现并索引给定路径下的所有嵌套结构。在索引一个 JSON 字段时，它会递归扁平化整个子树，为遇到的每一个路径-值对创建反转索引条目，而不管其深度或类型如何。 这种自动扁平化功能使 JSON Flat Index 非常适合不断发展的 Schema，因为在这种情况下，新字段的出现会毫无征兆。例如，如果你为 "元数据 "字段建立索引，系统会自动处理传入数据中出现的 "metadata.version2.features.experimental "等新嵌套字段，而不需要新的索引配置。</p>
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
<li>斜率（可选）：这是一个可调整的参数，允许少量的词语间隔，从而实现模糊短语匹配。</li>
</ul>
<p>更多信息，请参阅<a href="/docs/zh/phrase-match.md">短语匹配</a>。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">最小哈希 LSH 索引（测试版）</h4><p>为满足模型训练中重复数据删除的需求，Milvus 2.6 增加了对 MINHASH_LSH 索引的支持。该功能提供了一种计算效率高、可扩展的方法，用于估算文档之间的 Jaccard 相似性，以识别近似重复的文档。用户可以在预处理过程中为文本文档生成 MinHash 签名，并在 Milvus 中使用 MINHASH_LSH 索引高效地查找大规模数据集中的相似内容，从而提高数据清理和模型质量。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">时间感知衰减函数</h4><p>Milvus 2.6 引入了时间感知衰减函数，以解决信息价值随时间变化的情况。在结果重新排序过程中，用户可以根据时间戳字段应用指数、高斯或线性衰减函数来调整文档的相关性得分。这可以确保优先处理较新的内容，这对于新闻提要、电子商务和人工智能 Agents 内存等应用至关重要。</p>
<p>如需了解更多信息，请参阅 "<a href="/docs/zh/decay-ranker-overview.md">衰减排名器概述</a>"。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">为在线 Schema 演进添加字段</h4><p>为了提供更大的模式灵活性，Milvus 2.6 现在支持向现有 Collections 的模式在线添加新的标量字段。这就避免了在应用需求发生变化时创建新 Collections 和执行破坏性数据迁移的需要。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/add-fields-to-an-existing-collection.md">向现有 Collections 添加字段</a>。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 向量支持</h4><p>为了应对产生 8 位整数嵌入的量化模型的使用日益增多，Milvus 2.6 增加了对 INT8 向量的本地数据类型支持。这样，用户就可以直接摄取这些向量，而无需去量化，从而节省了计算、网络带宽和存储成本。该功能最初支持 HNSW 系列索引。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/dense-vector.md">密集向量</a>。</p>
