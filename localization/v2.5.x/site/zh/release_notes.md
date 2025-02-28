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
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期2025 年 2 月 26 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 在单个集群可支持的 Collections 和分区数量方面带来了重大改进。现在，Milvus 完全可以运行 10K Collections 和 100K 分区。该版本还解决了几个关键错误，包括匹配统计丢失和多阶段查询中的死锁问题。此外，它还包括大量可观察性和安全性增强功能。我们强烈建议所有运行 Milvus 2.5.x 的用户尽快升级。</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">依赖关系升级</h3><p>升级至 ETCD 3.5.18 以修复多个 CVE。</p>
<ul>
<li>[2.5] 更新筏到 cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] 更新 Knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>,<a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">重要错误</h3><ul>
<li>[2.5] 文本匹配索引空偏移文件使用<code translate="no">text_log</code> 前缀<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] 为多阶段任务添加了子任务池，以避免死锁<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">错误修正</h3><ul>
<li>[2.5] 修正了任务调度器死锁<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] 修正了导致创建多个相同索引的竞赛条件<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] 修复了可能创建名称重复的 Collections 的问题<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>修正了搜索空表达式失败的问题<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] 修复了前缀中包含通配符时前缀匹配失败的问题<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>HTTP 请求超时时取消子上下文级联<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] 修复了还原任务的任务三角缓存泄漏<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] 修正了角落情况下的 querycoord 恐慌<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] 增强了 isbalanced 函数，以正确计算引号对<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] 执行压缩任务时出现负 -1 的问题得到修正<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] 修正了程序段可能永远无法从密封状态转移到冲洗状态的错误<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>加载 pk 索引时跳过创建主键索引<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] 当排序后分段为零时，跳过文本索引创建<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] 修复了搜索最早位置失败的问题<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>忽略混合搜索时丢失的增长选项<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] 修正了 altercollection 无法修改一致性级别的问题<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>修正了由于行数为 0 而导致导入失败的问题<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] 修正了长类型的错误模块结果<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] 为压缩触发器添加并使用生命周期上下文<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] 在目标检查之前检查 Collections 的释放<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>修正了 Rootcoord 优雅停止失败和 CI 资源有限的问题<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] 删除加载字段和 Schema 列大小检查<a href="https://github.com/milvus-io/milvus/pull/39834">（＃39834</a>，<a href="https://github.com/milvus-io/milvus/pull/39835">＃39835）</a></li>
<li>[2.5] 创建索引时移除类型参数中的 mmap.enable 参数<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] 删除属性时未传递索引名称<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] 片段同时返回增长和封存结果<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] 修复了并发地图问题<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] 解决了 QC 任务测试中的冲突<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] 修复了发生压实或 GC 时 Collections 载入卡住的问题<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] 修复了因执行任务 delta 缓存泄漏而导致的分布不均问题<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] 跳过加载 pk 索引时提前返回<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] 修正了即使设置了<code translate="no">common.security.rootShouldBindRole</code> ，root 用户也能列出所有 Collections 的问题<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] 修正了 flowgraph 泄露<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] 使用参数项格式化以避免 setconfig 重叠<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] 使用权限名称 "全部 "检查元存储权限名称<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] 为 RESTful v1 添加了速率限制器<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] 删除了 RESTful 处理程序中的硬编码分区号<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><h4 id="Observability" class="common-anchor-header">可观察性</h4><ul>
<li>添加了监控指标以检索原始数据<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] 添加了获取向量延迟指标，并改进了请求限制错误信息<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] 添加了代理队列指标<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>公开更多指标数据<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] 为解析表达式添加了指标<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] 为混合搜索添加了 DSL 日志字段<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] 如果索引被删除，则跳过更新索引指标<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] 如果组件停止进度超时，则转储 pprof 信息<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] 添加了管理 API 以检查 querycoord 平衡状态<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">统计/压缩/索引任务调度器优化</h4><ul>
<li>改进索引任务调度策略<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] 限制了生成统计任务的速度<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>添加了压缩计划的配置<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] 检查了 L0 压缩在说明时只能使用同一通道<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] 调整了段加载器对临时索引的内存估算<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] 根据生命周期策略为封段使用起始位置 ts<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>不再需要任务时删除任务元<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] 在导入 binlog 时加速列出对象<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>支持创建带描述的 Collections<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] 在配置中导出索引请求超时间隔<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] 同步 proxy.maxTaskNum 默认值为 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>将转储快照限制从 10w 降为 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] 避免批量 pk 存在时字符串到切片字节的拷贝<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>支持在描述索引时返回可配置属性<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>优化了某些点的表达式性能<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] 优化了 getQueryNodeDistribution 的结果格式<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] 启用写放大观察<a href="https://github.com/milvus-io/milvus/pull/39743">（#39743）</a></li>
<li>[2.5] 在 RESTful v2 中搜索时返回 top-k 结果<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] 添加了 withEnableMatch 语法糖<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] 临时索引支持不同的索引类型和更多数据类型（FP16/BF16）<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] 同步主分支的 GoSDK 提交<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>保持内存和广播器元的一致性<a href="https://github.com/milvus-io/milvus/pull/39721">（#39721）</a></li>
<li>使用基于事件的通知进行广播<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] 改进了 Schema 和索引检查的错误信息<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] 重置标量的默认自动索引类型<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] 预检查失败时重新排队 L0 压缩任务<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 1 月 23 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.4 版本发布，该版本引入了关键性能优化和新功能，如 PartitionKey 隔离、带 DAAT MaxScore 的稀疏索引和增强的锁定机制。该版本的一个突出亮点是支持 10,000 个 Collections 和 100 万个分区，是多租户使用案例的一个重要里程碑。该版本还解决了多个错误，提高了整体稳定性和可靠性，其中两个关键错误可能会导致数据丢失。我们鼓励您升级或试用这一最新版本，并期待您的反馈意见帮助我们不断完善 Milvus！</p>
<h3 id="Features" class="common-anchor-header">功能特点</h3><ul>
<li>支持 PartitionKey 隔离，以提高使用多个分区 Key 时的性能<a href="https://github.com/milvus-io/milvus/pull/39245">（#39245</a>）。有关详细信息，请参阅<a href="/docs/zh/use-partition-key.md">使用分区密钥</a>。</li>
<li>稀疏索引现在支持 DAAT MaxScore<a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>。有关详细信息，请参阅<a href="/docs/zh/sparse_vector.md">稀疏向量</a>。</li>
<li>在表达式中添加对<code translate="no">is_null</code> 的支持<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>可自定义根权限<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>在一个集群中支持 1 万个 Collections 和 100 万个分区<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>缓存段的 delta 信息，以加快查询协调器的运行<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>在 Collections 级别并发读取元数据，加快故障恢复<a href="https://github.com/milvus-io/milvus/pull/38900">（#38900）</a></li>
<li>完善查询节点中的锁粒度<a href="https://github.com/milvus-io/milvus/pull/39282">（＃39282</a>）、<a href="https://github.com/milvus-io/milvus/pull/38907">（＃38907）</a></li>
<li>通过使用 CStatus 来处理 NewCollection CGO 调用来统一风格<a href="https://github.com/milvus-io/milvus/pull/39303">（＃39303）</a></li>
<li>如果未设置分区，则跳过生成分区限制器<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>添加了更多 RESTful API 支持<a href="https://github.com/milvus-io/milvus/pull/38875">（#38875</a>）<a href="https://github.com/milvus-io/milvus/pull/39425">（#39425）</a></li>
<li>删除了查询节点和数据节点中不必要的 Bloom 过滤器，以减少内存使用<a href="https://github.com/milvus-io/milvus/pull/38913">（＃38913）</a></li>
<li>通过在 QueryCoord 中加速任务生成、调度和执行来加快数据加载<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>减少 DataCoord 中的锁定，以加快加载和插入操作<a href="https://github.com/milvus-io/milvus/pull/38904">（#38904）</a></li>
<li>在<code translate="no">SearchResult</code> 和<code translate="no">QueryResults</code> 中添加主字段名称<a href="https://github.com/milvus-io/milvus/pull/39222">（＃39222）</a></li>
<li>将 binlog 大小和索引大小作为磁盘配额节流标准<a href="https://github.com/milvus-io/milvus/pull/38844">（＃38844）</a></li>
<li>优化了全文搜索 knowhere/#1011 的内存使用率</li>
<li>为标量索引添加了版本控制功能<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>通过避免不必要的复制，提高了从 RootCoord 获取 Collections 信息的速度<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">重要错误修复</h3><ul>
<li>修复了带索引的主键搜索失败的问题<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>修正了因同时重启 MixCoord 和刷新而导致的潜在数据丢失问题<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>修正了在 MixCoord 重启后，统计任务和 L0 压缩之间不适当的并发所引发的删除失败<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>修正了从 2.4 升级到 2.5 时标量倒置索引的不兼容性<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了在多列加载过程中由于粗锁粒度而导致的缓慢查询问题<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>修正了使用别名可能导致迭代器遍历错误数据库的问题<a href="https://github.com/milvus-io/milvus/pull/39248">（#39248）</a></li>
<li>修正了更改数据库时资源组更新失败的问题<a href="https://github.com/milvus-io/milvus/pull/39356">（＃39356）</a></li>
<li>修正了一个偶发问题，即 tantivy 索引在发布期间无法删除索引文件<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>修正了因线程过多而导致索引运行缓慢的问题<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>修复了在批量导入时无法跳过磁盘配额检查的问题<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>通过限制并发量，解决了因消息队列消费者过多而导致的冻结问题<a href="https://github.com/milvus-io/milvus/pull/38915">（＃38915）</a></li>
<li>修复了大规模压缩过程中因 MixCoord 重启而导致的查询超时问题<a href="https://github.com/milvus-io/milvus/pull/38926">（#38926）</a></li>
<li>修复了节点宕机导致的通道不平衡问题<a href="https://github.com/milvus-io/milvus/pull/39200">（#39200）</a></li>
<li>修正了一个可能导致通道平衡卡住的问题。<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>修正了 RBAC 自定义组权限级别检查失效的问题<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>修正了在空索引中检索行数失败的问题<a href="https://github.com/milvus-io/milvus/pull/39210">（＃39210）</a></li>
<li>修正了对小片段内存估算不正确的问题<a href="https://github.com/milvus-io/milvus/pull/38909">（＃38909）</a></li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 1 月 13 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 提供了关键的错误修复和性能增强功能，以提高整体稳定性、可靠性和可用性。该版本改进了并发处理，加强了数据索引和检索，并更新了几个关键组件，以提供更强大的用户体验。</p>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了在<code translate="no">VARCHAR</code> 主键上使用<code translate="no">IN</code> 过滤器可能返回空结果的问题。<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>修正了查询和删除操作之间的并发问题，该问题可能导致不正确的结果。<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>修正了当<code translate="no">expr</code> 在查询请求中为空时，迭代过滤导致的故障。<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>修正了在更新配置时磁盘出错导致使用默认配置设置的问题。<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>修正了由于聚类压缩而可能导致删除数据丢失的问题。<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>修正了增长数据段中的文本匹配查询中断问题。<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>修正了因索引不包含稀疏向量的原始数据而导致的检索失败。<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>修正了并发查询和数据加载可能导致的列字段竞赛条件。<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>修正了当数据中不包含 nullable 或 default_value 字段时批量插入失败的问题。<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>为 RESTful 接口添加了资源组 API。<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>利用比特集 SIMD 方法优化了检索性能。<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>指定时使用 MVCC 时间戳作为保证时间戳。<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>添加了缺失的删除指标。<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>将 Etcd 更新至 v3.5.16。<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>创建了一个新的 Go 软件包来管理 protos<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期： 2025 年 1 月 3 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 支持修改 VARCHAR 列的最大长度，并解决了几个与并发、分区丢弃和导入过程中 BM25 统计处理有关的关键问题。我们强烈建议升级到该版本，以提高稳定性和性能。</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>仅在指定路径不存在时生成磁盘使用日志。<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>添加了一个用于调整最大 VARCHAR 长度的参数，并将限制恢复为 65,535<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>支持表达式的参数类型转换。<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>修正了并发情况下的潜在死锁。<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>仅为支持空值的字段生成 index_null_offset 文件。<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>修正了还原阶段释放后的检索计划使用问题。<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>识别带大写 AND 和 OR 的表达式。<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>即使加载失败，也允许成功丢弃分区。<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>修复了导入过程中 BM25 统计文件的注册问题。<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2024 年 12 月 26 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 集中修复了一系列错误，解决了内存加载、RBAC 列表、查询节点平衡和密封段索引等问题，同时还改进了 Web UI 和拦截器。我们强烈建议升级到 2.5.1，以增强稳定性和可靠性。</p>
<h3 id="Improvement" class="common-anchor-header">改进</h3><ul>
<li>更新 Web UI Collections 和查询页面。<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>通过在加载估算中添加内存系数，修复了 OOM 问题。<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>在 RootCoord 中列出策略时，修正了特权组扩展问题。<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>修正了列出权限组和 Collections 时的问题。<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>修正了平衡器，以避免重复超载同一查询节点。<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>修复了 QueryCoord 重启后触发的意外平衡任务。<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>修复了负载配置更新不适用于加载 Collections 的问题。<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>修正了数据导入时读取次数为零的问题。<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>修正了表达式中 JSON 键的 Unicode 解码。<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>修正了 2.5 版中 alterCollectionField 的拦截器 DB 名称。 <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>当使用 BM25 强制搜索时，修正了密封段的空索引参数。<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
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
<h3 id="Key-Features" class="common-anchor-header">主要功能</h3><h4 id="Full-Text-Search" class="common-anchor-header">全文搜索</h4><p>Milvus 2.5 支持使用 Sparse-BM25 实现全文搜索！该功能是对 Milvus 强大语义搜索功能的重要补充，尤其是在涉及罕见词汇或专业术语的情况下。在以前的版本中，Milvus 支持稀疏向量来辅助关键词搜索。这些稀疏向量由 SPLADEv2/BGE-M3 等神经模型或 BM25 算法等统计模型在 Milvus 外部生成。</p>
<p>Milvus 2.5 由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 提供技术支持，内置分析器和稀疏向量提取功能，将 API 从仅接收向量作为输入扩展到直接接受文本。在插入数据时，BM25 统计信息会实时更新，从而提高了可用性和准确性。此外，基于近似近邻（ANN）算法的稀疏向量比标准关键字搜索系统具有更强大的性能。</p>
<p>有关详情，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>和<a href="/docs/zh/full-text-search.md">全文搜索</a>。</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">集群管理 WebUI（测试版）</h4><p>为了更好地支持海量数据和丰富功能，Milvus 的复杂设计包括各种依赖关系、众多节点角色、复杂数据结构等。这些方面都会给使用和维护带来挑战。</p>
<p>Milvus 2.5 引入了内置的集群管理 WebUI，通过可视化 Milvus 复杂的运行环境信息，降低了系统维护难度。其中包括数据库和 Collections、网段、通道、依赖关系、节点健康状态、任务信息、缓慢查询等详细信息。</p>
<p>详情请参阅<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>。</p>
<h4 id="Text-Match" class="common-anchor-header">文本匹配</h4><p>Milvus 2.5 利用<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>的分析器和索引进行文本预处理和索引构建，支持根据特定术语对文本数据进行精确的自然语言匹配。该功能主要用于满足特定条件的过滤搜索，并可结合标量过滤功能细化查询结果，允许在满足标量标准的向量内进行相似性搜索。</p>
<p>有关详情，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>和<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">位图索引</h4><p>Milvus 系列新增了一种标量数据索引。位图索引使用长度与行数相等的位数组来表示值的存在并加速搜索。</p>
<p>Bitmap 索引传统上对低 Cardinal 字段非常有效，因为这些字段只有少量不同的值--例如，包含性别信息的列只有两个可能的值：男性和女性。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/bitmap.md">位图索引</a>。</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">可归零和默认值</h4><p>Milvus 现在支持为主键字段以外的标量字段设置可归零属性和默认值。对于标记为<code translate="no">nullable=True</code> 的标量字段，用户可以在插入数据时省略该字段；系统会将其视为空值或默认值（如果已设置），而不会出错。</p>
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
<p>有关详情，请参阅 "<a href="/docs/zh/filtering-templating.md">过滤器模板</a>"。</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">分组功能增强</h4><ul>
<li><strong>可定制组大小</strong>：新增了对指定每个组返回条目的数量的支持。</li>
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
