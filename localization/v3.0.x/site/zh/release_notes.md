---
id: release_notes.md
summary: Milvus 发行说明
title: 发布说明
---
<h1 id="Release-Notes" class="common-anchor-header">发布说明<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>了解 Milvus 新功能！本页面汇总了每个版本中的新功能、改进、已知问题和错误修复。建议您定期访问此页面，了解最新更新。</p>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026年9月9日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th><th>Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus v3.0.1 正式发布！此版本新增了 REST v2 快照管理功能、扩展的重新排序能力，并在 Go 客户端和 RESTful API 中支持 TEXT 字段，同时针对 Storage V3、数据一致性和安全性进行了性能优化和问题修复。</p>
<h3 id="Features-improvements" class="common-anchor-header">功能改进<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
<li>新增用于 Collection 级原生快照管理和异步恢复的 REST v2 API（<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>、<a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>）</li>
<li>新增可配置的结果数量阈值，用于控制搜索和查询操作中 Take 输出路径的选择（<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>）</li>
<li>在 Go 客户端和 RESTful API 中增加了对 TEXT 字段的支持（<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>）</li>
<li>为外部表添加了可配置的初始和最大读取 IOPS 速率 (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>为外部Collection刷新任务添加了可选设置，使其在报告完成前等待所有分段完成索引，同时不延迟数据发布（<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>）</li>
<li>在搜索函数链中添加了 L1 重新排序支持（<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>）</li>
<li>在 FunctionScore、REST、传统混合搜索以及 Go 客户端中，添加了加权 RRF 重新排序功能，支持针对每个 ANN 请求设置可选权重 (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>,<a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">稳定性改进<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
<li>改进了几何 RTree 索引和缓存中的内存安全性，以及对无法解析的 WKB 和空几何查询的处理 (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>通过恢复全进程范围的临时内存预算，并修正并发 Storage V2/V3 字段加载和标量 V3 索引加载的内存估算值，改进了内存管理 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>通过并行化读取并将原始向量数据流式传输到磁盘，减少了外部Collection索引构建过程中的下载瓶颈和内存使用量（<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>）</li>
<li>通过批量处理客户端追加操作并公开同步设置，提升了 Woodpecker 在小批量、高并发工作负载下的吞吐量（<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>）</li>
<li>改进了记录读取器的所有权和生命周期一致性、空二进制大对象处理，以及存储和压缩路径中的读取错误报告 (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>通过四路交错管道以及针对冲突和重新哈希边界的保护措施，提高了分组哈希探查的效率（<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>）</li>
<li>通过跳过不包含 BM25 或 MinHash 输出字段的 Collections 的 WAL 插入主体解析，降低了插入处理开销 (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>通过在各执行层保留临时和永久错误分类，改进了存储故障报告和重试处理 (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>通过默认启用 GIS 粗/细拆分以及同列谓词融合，提高了空间查询性能（<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>）</li>
<li>通过基于共享积压任务的准入控制和交替提交优先级，改进了文本索引和 JSON 拆分任务的调度（<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>）</li>
<li>为密封段偏移量映射添加了 mmap 支持，并提供了专用的加载选项和磁盘资源计账功能 (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>通过按需执行按列的块内存估算，优化了 Storage V2 数据加载 (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>为绑定到新函数输出字段的索引添加了服务器端 AutoIndex 支持，允许 add_function_field 请求省略索引参数或指定 AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>通过增量报告（并支持回退到完整报告）来减少 QueryNode 分布报告的有效载荷，并降低了指标收集过程中的内存分配量（<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>、<a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>）</li>
<li>通过将 bcrypt 成本从 4 提高到 10 来增强密码哈希强度，升级现有哈希值需要轮换凭据 (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>通过仅读取结构数组子字段所需的叶节点列，减少了 Parquet 导入过程中的冗余解码（<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>）</li>
<li>通过多轮基于大小的规划优化了强制合并分组，并废弃了旧版规划阈值设置（<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>）</li>
<li>升级了 cgosymbolizer，以防止作为 PID 1 运行的 Milvus 进程在发生本机故障后挂起 (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>改进了语义高亮输入的行数验证 (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>通过可配置的写入重试退避策略，改进了导入重试控制（<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>、<a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>、<a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>）</li>
<li>通过回收过期的统计信息版本并持久化终端状态，改进了分析任务的生命周期管理（<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>、<a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>）</li>
<li>通过在锁超时后等待分段释放，改进了分段生命周期协调 (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>通过 k 路合并改进数据压缩的存储排序（<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>）</li>
<li>通过在块访问、表达式求值和 JSON 统计信息中保留压缩掩码，减少了可为空字段的有效性缓冲区扩展（<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>）</li>
<li>通过防止敏感凭据、API 密钥、RBAC 密码哈希以及外部 Collection 源详细信息在日志或错误消息中泄露，从而增强了对其的保护（<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>、<a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>、<a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>）</li>
<li>通过乐观 CAS 验证和对符合条件的冲突进行安全重试，改进了部分更新的并发控制 (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>改进了增长分段读取快照的稳定性以及Schema快照生命周期管理 (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>减少了备份过程中对授权元数据的冗余扫描（<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>）</li>
<li>通过将其移入索引层、统一逻辑 ID 处理并支持密封索引的 mmap 支持映射，改进了可为空向量 ID 映射（<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>）</li>
<li>改进了 CPU 和 GPU 构建中 Sonic JIT 编译与 Go 插件加载之间的同步 (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>通过元数据缓存优化了代理写入路径的通道解析，消除了冗余的协调器 RPC 调用，并改进了错误分类 (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>在已报告的基准测试中，当 topk=100000 时，将召回计算时间从约 3.08 秒缩短至 18.5 毫秒 (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>通过复用有效性位图、减少冗余的空值偏移量存储以及加速位集复制，优化了可空字段过滤（<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>、<a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>、<a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>）</li>
<li>当不同元素的计数达到位图基数限制时，通过使用 STL_SORT 改进了嵌套结构体子字段上的混合标量索引 (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>提高了元数据缓存中段 ID 过滤的效率（<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>）</li>
<li>减少了哈希辅助函数中的内存分配（<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>）</li>
<li>通过消除每次比较时的映射查找，优化了合并后重新排序结果的排序（<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>）</li>
<li>在处理 JSON 默认值和非 NUL 终止的字符串视图时，提高了内存安全性 (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>通过范围限定统一编译、改进编译器缓存以及减少冗余编译工作，缩短了 C++ 构建时间 (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>通过在抓取时从缓存文件系统中收集指标，同时保留现有的指标名称和标签，从而提高了文件系统指标的覆盖率和时效性 (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>添加了可刷新设置 growingBuildThreadRate，用于配置每个增长段临时索引构建的线程数，同时保留单线程默认行为 (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>通过回溯移植为 3.0 版本添加了 mmap 字段数据写回支持，并提供默认禁用的 queryNode.mmap.writeback 选项（<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>）</li>
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
<li>修复了 JSON、ARRAY 和 TIMESTAMPTZ 查询中结果不正确和谓词验证不一致的问题，包括混合类型的谓词、大数比较以及跨多个批次的过滤 (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>修复了当分段的源文件跨越多个任务时，并行外部Collection刷新期间刷新数据不一致的问题（<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>）</li>
<li>修复了 MATCH 表达式接受不在元素级别运行的谓词的问题 (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>修复了无匹配结果的搜索因“不支持的 ID 类型”错误而失败的问题（<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>）</li>
<li>通过添加可配置的迁移超时（默认值为 10 秒），修复了 Milvus Standalone 在关闭时卡死的问题 (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>修复了当 DataNode 工作节点在多个服务集群间共享时，外部表嵌入请求使用错误的集群标识的问题 (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>修复了导致无法更新 TextEmbedding 函数的 integration_id 和 model_deployment_id 的问题（<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>）</li>
<li>修复了 HTTP JSON 响应中未为失败的回填分段明确包含 ok=false 状态码的问题 (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>修复了在传输或低速超时后重试时，MinIO 对象上传因 HTTP 400 XAmzContentChecksumMismatch 错误而失败的问题（<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>、<a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>）</li>
<li>修复了在启用流式服务时，QueryNodes 之间的分段平衡会陷入停滞的问题（<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>、<a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>）</li>
<li>修复了在混合压缩过程中，当无法重建保留记录时发生的无提示数据丢失问题（<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>）</li>
<li>修复了快照恢复时丢失Collection设置并意外默认采用“强一致性”的问题（<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>）</li>
<li>修复了流式删除操作遗漏新加载的已封存段的问题，该问题会导致已删除数据仍可被查询 (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>修复了针对空数据时嵌套索引构建不正确的问题（<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>）</li>
<li>修复了切换到流式服务时导致死锁，使操作无限期等待的问题（<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>）</li>
<li>修复了压缩和记录重建过程中几何值的默认值不正确，以及 Parquet 导入中默认填充的几何值标记为空的问题（<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>）</li>
<li>修复了在 DataCoord 重启后的压缩和恢复过程中，有效的 V3 分段被拒绝的问题（<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>、<a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>、<a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>、<a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>、<a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>、<a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>）</li>
<li>修复了在结构体中的 VARCHAR 数组子字段上使用混合标量索引时，因缺少版本元数据而导致的分段加载失败问题 (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>修复了重新打开已更新的清单时外部列无法刷新的问题 (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>修复了在包含时间依赖条件的搜索中时区处理不正确的问题（<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>）</li>
<li>修复了搜索请求中对 ArrayOfVector 输入的错误处理（<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>）</li>
<li>修复了插入操作无法拒绝超过支持大小限制的行的问题（<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>）</li>
<li>修复了临时索引忽略配置的目标索引版本的问题（<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>）</li>
<li>修复了使用 order_by 的查询无法返回密集向量输出字段的问题 (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>,<a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>修复了从权限组中移除后，已撤销的权限仍然有效的issues (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>修复了 DataCoord 重启后 Storage V3 分段的二进制日志文件计数和存储格式标签不正确的问题（<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>、<a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>）</li>
<li>修复了因工作进程版本检查不可靠，或反复重试不受支持的工作进程直至超时，导致外部快照还原卡死的问题（<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>）</li>
<li>修复了使用 3.0.0 版本的旧版 STLSORT 文件时，结构数组子字段上的 HYBRID 索引段加载失败的问题，且无需重新索引 (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>修复了处理零长度 Arrow C 数据缓冲区时发生的崩溃问题（<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>）</li>
<li>修复了在清单错误后加载或重新打开 Storage V3 分段时错误的故障处理机制，保留现有分段状态以实现安全重试（<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>）</li>
<li>修复了 ARRAY 元素过滤器在后续元素之前遇到整批 NULL 或空数组时查询失败的问题 (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>修复了在Schema更改后，回填作业提交过期Embeddings的问题（<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>）</li>
<li>修复了 Storage V3 记录中缺失的字段被返回为 NULL 而不是其声明的默认值的问题（<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>、<a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>、<a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>）</li>
<li>修复了导致无法使用 IAM/OAuth 凭据在 GCS 上恢复 Storage V3 快照的服务器端复制故障，包括大于 5 GiB 的对象复制（<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>）</li>
<li>修复了通过外部代理端口上的流式 gRPC 调用进行的未经身份验证访问的问题（<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>）</li>
<li>修复了集群压缩后数据丢失原始提交时间戳的问题（<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>）</li>
<li>修复了向已包含 Storage V2 分段的 Collections 添加 TEXT 字段后，因反复刷新失败导致的流式节点崩溃问题（<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>）</li>
<li>修复了 Storage V3 分段中已过期的行无法触发基于 TTL 字段的压缩，且会一直存储直到满足另一个压缩条件的情况 (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>修复了 CDC 复制导入过程中源 Collection 与目标 Collection 之间自动生成的主键不一致的问题（<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>）</li>
<li>修复了在 WAL 后端迁移过程中并发写入丢失的问题 (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>,<a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>,<a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>修复了包含高 Cardinal 数据的重建或紧凑化后的嵌套 HYBRID 索引在回滚到旧版本后无法读取的问题 (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>修复了外部密集向量行中空元素的处理方式：接受全空的可为空行，并增加了对部分为空行的可配置处理 (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>修复了流式节点故障转移后 V3 段行数不正确以及排序压缩反复失败的问题（<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>）</li>
<li>修复了将范围条件与 OR 运算符结合的查询中，会遗漏包含下限的记录的问题 (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>修复了按主键搜索时无法保留请求的 ID 顺序的问题（<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>）</li>
<li>修复了在启用 Storage V3 后添加 TEXT 字段会导致现有 Storage V2 增长分段无法加载，从而干扰刷新、排序和索引操作的问题（<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>）</li>
<li>修复了快照包含未提交的 Storage V3 段的问题，该问题导致恢复操作报告成功，但恢复的段无法加载（<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>、<a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>）</li>
<li>修复了当 Storage V3 文本索引的文件存储在嵌套任务或版本目录中时无法加载的问题 (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026年7月29日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th><th>Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 正式发布！基于<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> 版本中引入的湖原生架构，此版本完成了 beta 版所开启的工作：外部集合（External Collection）支持更多湖屋（Lakehouse）工作流；Schema 支持在线添加、回填和删除；稀疏索引已围绕 SINDI 重新构建； StructArray 和分面搜索进一步完善了检索引擎；FAISS 直通和 TEXT 扩展了索引与模态的选择范围；Woodpecker 现可作为独立服务运行。</p>
<p>观看下方视频，深入了解 Milvus 3.0 并参与与核心维护者的问答环节：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>如果您是首次接触 3.0 系列，下文的“Core 3.0 功能回顾”部分总结了 3.0-beta 中引入的功能；完整的说明请参阅<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta 版本说明</a>。</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0 版本的新功能（自 3.0-beta 以来）<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部Collection：更完善的湖仓工作流</h4><p>3.0-beta 版本引入了“外部 Collection”功能：原地引用湖存储文件、构建索引，并在无需将数据复制到 Milvus 的情况下进行检索。本次发布进一步扩展了该功能，以支持完整的湖仓检索工作流。 外部字段现可为函数输出字段（如 BM25 稀疏向量、MinHash 签名和文本 Embeddings）提供数据，因此文本和模型衍生的检索字段可在 Milvus 内部构建，无需复制源表。 刷新功能还支持增量式模式演进：当外部表新增列时，Milvus 会对受影响的段进行补丁修复，而非重建整个 Collection。</p>
<p>此版本还新增了<code translate="no">milvus-table</code> 外部格式，该格式将Milvus快照元数据和Storage V3清单视为外部数据源，因此Collection快照本身可作为外部表提供服务——批处理和服系统可获得基于同一数据的、由清单支持的共享视图。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/create-an-external-collection.md">创建外部Collection和</a> <a href="/docs/zh/snapshots.md">快照》</a>。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">灵活的Schema：在线添加、补全和删除列</h4><p>在生产环境中，Schema 并非一成不变——嵌入式模型会被替换、特征会迭代、字段会被弃用——而过去这些操作往往意味着需要重建整个 Collection，从而导致系统停机或出现双重写入。3.0.0 版本实现了闭环：在持续提供服务的同时，可以添加、填充和删除列。</p>
<p>补写支持双向操作。外部补写处理在 Milvus 外部计算的值：添加一列，对 Collection 进行快照以作为一致的起始点，离线运行任务，将值写回，Milvus 随后对新列进行增量索引——这使得跨越数亿行的嵌入式模型升级成为无需停机的热路径。 内部回填处理内核派生值：将 BM25 或 MinHash 函数附加到现有 Collection 后，其输出字段会自动基于现有数据进行计算。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/add-fields-to-an-existing-collection.md">向现有Collection添加字段》</a>。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">稀疏索引全面升级：SINDI、Block-Max WAND 和 Block-Max MaxScore</h4><p>Milvus 3.0 对稀疏向量索引进行了全面升级。它引入了新的搜索算法<a href="https://arxiv.org/abs/2509.08395">——SINDI</a>、Block-Max WAND 和 Block-Max MaxScore——同时支持倒排列表压缩、可配置量化以及按工作负载选择搜索算法。 此外，mmap 加载、序列化和 BM25 评分机制也得到了优化，从而降低了大规模稀疏向量和全文搜索的索引存储及加载开销。 在内部基准测试中，压缩后的 BM25 索引在可比召回率下比 2.6 稀疏索引小约 3 倍，而 SINDI 在已训练的稀疏 Embeddings 上达到的 QPS 最高可达 MaxScore 的 10 倍左右。 启用新索引版本后（参见“兼容性与行为说明”），SINDI 将成为稀疏 IP 搜索的默认选项，而 MaxScore 将成为 BM25 的默认选项。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray 支持范围</h4><p>StructArray 现支持空值、位图索引、对活动 Collections 进行 Dynamic Field 添加，以及通过 upsert 对结构体字段进行部分更新，并相应支持 REST 和批量导入功能。</p>
<p>元素级搜索新增了跨向量子字段的混合搜索，支持按实体配置折叠方式（最大值/求和/平均值/前k个变体），并支持范围搜索和组内分组。嵌套过滤支持<code translate="no">element_filter</code> 谓词、<code translate="no">MATCH_ANY</code> /<code translate="no">MATCH_ALL</code> /<code translate="no">MATCH_LEAST</code> /<code translate="no">MATCH_MOST</code> /<code translate="no">MATCH_EXACT</code> 量词、位置子字段访问（如<code translate="no">tags[0][name]</code> ）以及结构列上的<code translate="no">array_length()</code> 。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/array-of-structs.md">StructArray</a>和<a href="/docs/zh/struct-array-operators.md">StructArray 操作符</a>。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">搜索聚合和分面搜索</h4><p>测试版中的查询聚合会对过滤后的数据计算精确统计数据；3.0.0 版本在搜索路径中添加了分面功能。在搜索时指定一个分面字段，Milvus 将返回排名前列的分面值，每个值由其在 ANN 排名中匹配度最高的成员代表，并标注有 COUNT 和 AVG 等聚合统计信息 ——通过单次请求即可获得分面搜索侧边栏（品牌、价格范围、属性）的信息，而无需在客户端进行过量检索和计数。</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">函数链重新排序</h4><p>现在可以通过函数链 API 组合重新排序，该 API 作为单个搜索请求的一部分，执行有序的、类型化的管道。 一条链可以结合 QueryNode 上的早期 L0 重新评分与 Proxy 上的 L2 后缩减重新排序，支持评分转换与组合、基于模型的重新排序、排序以及候选项筛选，且无需客户端协调。 此版本还为 L0 重新排序新增了原生 XGBoost 评分功能，使用注册为 FileResources 的 UBJ 模型，同时引入了 Hugging Face 推理提供程序，用于服务器管理的文本嵌入和句子相似度重新排序。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 长文本字段</h4><p>TEXT字段使长文本成为第一类数据，并取消了存储层面的长度限制：它们支持<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 和BM25。小于64 KB的值保持内联存储；更大的值则存储在分区级别的Vortex格式LOB文件中，而列本身仅存储<code translate="no">(file_id, offset)</code> 引用。 LOB 文件在各个分段之间共享，因此压缩操作只需移动引用而非重写文本。对于 RAG 而言，这意味着可以通过一次 I/O 从同一存储中检索向量和源文本——无需操作外部 blob 存储。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS 索引直通</h4><p>新的<code translate="no">FAISS</code> 索引类型可通过<code translate="no">faiss_index_name</code> 参数接受任意Faiss索引生成器字符串——<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> ——并传递搜索参数，因此Faiss配置方案可直接在Milvus上复现。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">支持 Vortex 和 Lance 格式</h4><p>存储层新增了两种开放的列式格式：Vortex 作为下一代内部格式——支持自适应编码（字典编码、RLE、位打包、浮点数专用压缩）、零拷贝解压，并针对向量与标量混合工作负载进行了优化；此外，Lance 与 Parquet 共同用于开放生态系统的数据交换。 Vortex 将成为默认的内部格式，其路线图中还包含过滤器下推和本地变体功能。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker 独立部署</h4><p>作为流式写入路径核心的 WAL（写入前置日志）Woodpecker，现可作为独立服务进行部署，而非嵌入其他节点——具备独立扩展、故障隔离和可观测性，如同任何其他微服务。这对大型集群和高写入工作负载尤为重要。</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0 功能回顾<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>以下功能在<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>版本中首次推出，并已纳入 3.0.0 版本；完整说明请参阅 beta 版本说明。</p>
<ul>
<li><strong>外部Collection</strong>——就地查询湖仓数据（Parquet、Lance、Iceberg、Vortex）：零拷贝、只读，并通过增量刷新实现同步。</li>
<li><strong>快照</strong>— 通过分段引用生成特定时间点的只读Collection视图，边际存储成本近乎为零。</li>
<li><strong>存储 V3（Loon）</strong>——基于清单的对象存储列式存储；是快照和外部 Collection 的基础。</li>
<li><strong>查询/搜索 ORDER BY</strong>— 支持服务器端多字段排序，每个字段均可设置 ASC/DESC。</li>
<li><strong>查询聚合</strong>— 支持带分组条件的 COUNT / SUM / AVG / MIN / MAX，在服务器端计算。</li>
<li><strong>EmbList + DiskANN</strong>—— 针对 StructArray 嵌入列表的磁盘上多向量索引，提供 Muvera 和 Lemur 等加速路径。</li>
<li><strong>MinHash 函数（doc-in、doc-out）</strong>—— 服务器端的 MinHash 签名，配合“<code translate="no">MINHASH_LSH</code> ”用于近似重复项检测。</li>
<li><strong>可为空向量</strong>— 六种向量类型均支持NULL；搜索会跳过NULL行，且AddField功能已扩展至向量字段。</li>
<li><strong>实体 TTL</strong>— 由 TIMESTAMPTZ 字段驱动的按行过期机制。</li>
<li><strong>FileResource</strong>— 用于分析器、BM25 和文本匹配的集群管理的词典、同义词列表和停用词列表。</li>
<li><strong>强制合并</strong>— 由操作员触发的片段压缩，支持同步或异步模式。</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">兼容性与行为说明<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
<li><strong>Storage V3（Loon）默认处于禁用状态。</strong>依赖于它的功能（例如 Snapshot 和 TEXT 字段）需要通过<code translate="no">common.storage.useLoonFFI</code> 手动启用。Storage V3 将在后续版本中默认启用。</li>
<li><strong>保证 2.6 → 3.0 的兼容性与回滚</strong>——3.0 部署可回滚至 2.6。但是，一旦启用或使用了会更改序列化数据格式的功能（例如 Storage V3），则无法再进行回滚。</li>
<li><strong>目前，新索引版本需手动启用。</strong>新引入的索引算法<strong>在</strong>生效前，需要手动将目标索引版本提升（例如将<code translate="no">dataCoord.targetVecIndexVersion</code> 提升至 10，将<code translate="no">dataCoord.targetScalarIndexVersion</code> 提升至 4）；在后续版本中，这些功能将默认启用。</li>
<li><strong>GPU 镜像已迁移至 CUDA 12.9</strong>，且不再保留与 Ubuntu 20.04 的 GPU 兼容性。</li>
</ul>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta 通过与 Open Lake 生态系统的新集成扩展了 Milvus 向量数据库：External Collection 使 Milvus 能够以零拷贝方式查询外部 Lake 表，而 Spark 可通过 Snapshot 直接读取 Milvus Collections。 此版本还带来了更丰富的检索功能、更具表现力的 Schema、更深入的文本搜索定制、更精细的数据和模型生命周期控制，以及更多操作员层面的控制选项。Milvus 3.0 是 Zilliz Lakebase 的核心内核，为其统一的服从、发现和批处理提供支持。</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部Collection</h4><p>在典型的 AI 数据管道中，数 TB 规模的 Embeddings 和元数据通常已以 Parquet、Lance 或 Iceberg 表的形式存储在对象存储中。将这些数据复制到 Milvus 会使存储成本翻倍，增加必须保持同步的 ETL 管道，并导致数据治理权脱离客户掌控。</p>
<p>外部 Collection 功能消除了数据复制的需求。Milvus Collection 可直接引用文件在原始位置的存储位置，而 Milvus 仅负责管理 Schema、索引和查询执行。 增量刷新可确保 Collection 与底层文件保持同步。对于数据无法离开数据湖的客户（例如金融和医疗保健团队），可在数据原地运行向量检索。单个驻留于数据湖的数据集也可同时由多个 Milvus 实例提供服务。</p>
<p>如需了解更多信息，请参阅《<a href="/docs/zh/create-an-external-collection.md">创建外部Collection》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服务和批量发现通常需要同时访问同一个 Collection。A/B 模型评估、大规模去重、回填验证以及版本回滚，都需要在数据仍在写入的同时，获取 Collection 的稳定视图。</p>
<p>快照通过引用现有分段而非复制数据，为 Collection 创建一个特定时间点的只读视图，因此边际存储成本接近于零。在 MVCC 风格的隔离机制下，批处理任务可以从快照中读取数据，同时实时 Collection 仍可继续接受写入操作。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/snapshots.md">“快照”</a>、<a href="/docs/zh/manage-snapshots.md">“管理快照</a>”和<a href="/docs/zh/snapshot-use-cases.md">“快照用例”</a>。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查询/搜索排序</h4><p>搜索和查询现支持多字段排序，排序操作已下推至Milvus内核，且可针对每个字段分别设置<code translate="no">ASC</code> 和<code translate="no">DESC</code> 。这弥补了一个常见的生产环境缺陷：当最相似的项目并非最便宜、最新或最受欢迎时，仅基于距离的Top-K排序往往无法满足业务需求。</p>
<p>应用程序不再需要过度检索结果并在客户端重新排序来实现复合排名。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">按标量字段对搜索结果进行排序</a>》和《<a href="/docs/zh/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">对查询结果进行排序</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查询聚合</h4><p><code translate="no">group_by_fields</code> <code translate="no">output_fields</code> <code translate="no">count(*)</code> <code translate="no">count(&lt;field&gt;)</code> <code translate="no">sum(&lt;field&gt;)</code> <code translate="no">avg(&lt;field&gt;)</code> <code translate="no">min(&lt;field&gt;)</code>过去，要从 Milvus Collection 中生成租户分布统计、字段完整性计数或版本发布进度，必须将匹配的实体拉回客户端并在那里进行聚合。<code translate="no">max(&lt;field&gt;)</code></p>
<p>有关更多信息，请参阅<a href="/docs/zh/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">“聚合查询结果</a>”。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>Embeddings通常是异步生成的，因此实体可能先于其向量到达。 多模态数据本身也存在天然的缺失，例如没有字幕的视频或没有图片的产品。早期版本对此没有好的解决方案：应用程序要么延迟写入直到向量准备就绪，要么填充一个占位符向量，这两种选择都会影响检索质量。</p>
<p>Milvus 3.0 支持所有六种向量类型的向量字段中的 NULL 值。搜索会自动跳过 NULL 向量，检索质量不受影响，且 NULL 向量实际上不占用存储空间。<code translate="no">AddField</code> 功能也扩展至此次变更涉及的向量字段：通过<code translate="no">nullable=True</code> ，现有 Collection 可在不重建的情况下在线扩展新的向量字段。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/nullable-and-default.md">可为空字段</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自定义词典与同义词词典</h4><p>开箱即用的分词器并不总能满足生产环境的搜索质量要求。中文、医学、法律和化学等垂直领域，以及多语言语料库，均可从自定义词典和同义词表中获益匪浅。此前，这些资源主要以应用程序侧的查询重写形式存在。</p>
<p>Milvus 3.0 引入了 FileResource 机制，用于注册自定义分词器词典、同义词表、停用词表以及拆分规则。 资源注册后，可在任何分词器或过滤器中引用，并在 BM25、分析器和文本匹配中生效。词典和同义词现在可以进行版本控制并集中管理，而不再分散在应用程序代码中。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/manage-file-resources.md">管理文件资源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">实体 TTL</h4><p>对于许多生命周期和合规性场景而言，Collection 级和分区级的 TTL 过于粗放。同一 Collection 内的不同租户通常具有不同的保留规则，且单个实体的过期时间表可能与 Collection 中的其他实体不一致。</p>
<p>Milvus 3.0 支持按实体设置 TTL。在 Schema 中声明一个<code translate="no">TIMESTAMPTZ</code> 字段，并通过 Collection 属性将其标记为 TTL 字段，Milvus 便会自动回收已过期的实体。这涵盖了“被遗忘权”请求、过期的会话数据以及有限的对话历史记录，且无需应用端进行清理。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">设置实体级 TTL</a>》。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（文档输入、文档输出）</h4><p>Milvus 2.6 添加了<code translate="no">MINHASH_LSH</code> 索引，用于基于集合的近重复检测，但应用程序在将数据写入 Milvus 之前仍需计算 MinHash 签名。</p>
<p>Milvus 3.0 引入了服务器端的 MinHash 函数。在 Schema 中声明一个<code translate="no">VARCHAR</code> 输入字段和一个<code translate="no">BINARY_VECTOR</code> 输出字段，并关联一个<code translate="no">FunctionType.MINHASH</code> 函数，Milvus 便会在插入、批量插入和搜索过程中自动计算签名。结合<code translate="no">MINHASH_LSH</code> ，这支持 Milvus 内部针对大型数据集的去重工作流、指纹识别以及抄袭检测。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>“一个实体 = 一个向量”的假设已不再适用于现代检索。长文档会被拆分为多个片段，ColBERT 等晚期交互模型会为每个令牌生成一个向量，而多模态实体可能包含多种视图。</p>
<p>EmbList 为每个实体存储一个可变长度的向量列表，并以<code translate="no">DISKANN</code> 作为磁盘索引。当语料库规模超过内存预算时，该磁盘路径可有效控制内存占用。EmbList +<code translate="no">DISKANN</code> 是本次RC版本中更广泛的StructList家族的首个变体。 该家族的其余部分，包括 StructList 过滤以及 Muvera / Lemur 多向量加速功能，计划在 3.0 正式版中发布。</p>
<p>更多信息请参阅《<a href="/docs/zh/search-with-embedding-lists.md">使用Embeddings列表进行搜索</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">强制合并</h4><p>生产环境中的工作负载会随着时间推移积累分段碎片，从而导致查询延迟波动和存储空间膨胀。</p>
<p>Milvus 3.0 增加了在非高峰时段显式触发分段压缩的功能，支持同步和异步两种模式。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/force-merge.md">强制合并压缩</a>》。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 推出了 Storage V3，这是一种基于清单的列式存储引擎，其数据和元数据存储在兼容 S3 的对象存储中。每个数据集版本都被封装为不可变的清单快照——这是一种 Avro 编码文件，记录了构成该数据集的列组、增量日志和统计信息。</p>
<p>清单是紧凑的 Avro 文件，增量日志记录实体级别的删除操作，而无需重写数据文件。这确保了随着数据集的增长，元数据开销保持在较低水平。此外，清单还将元数据追踪与查询路径解耦，使 Collection 能够在不降低查询性能的情况下管理更多分段。</p>
<p>由于状态存储在对象存储中，数据集具有自描述性：任何能够访问存储路径的读取者，即使没有中央目录，也能发现并解读数据集。这一特性为外部Collection、快照以及未来的湖存储集成提供了基础。</p>
