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
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.11 正式发布！该版本引入了强大的新功能，如多分析器功能和扩展的标记符支持（Jieba、Lindera、ICU、Language Identifier）。我们还进行了多项改进，包括动态分段加载线程池更新和优化 binlog 导入过程中的删除过滤。主要的错误修复解决了潜在的段丢失问题、BM25 搜索失败和 JSON 统计过滤错误。</p>
<p>我们建议您升级到 2.5.11，以利用这些改进和修复！</p>
<h3 id="Features" class="common-anchor-header">功能</h3><ul>
<li>增加了为多语言支持配置多个分析器（标记器）的功能，并可根据输入数据的指令选择适当的分析器<a href="https://github.com/milvus-io/milvus/pull/41444">（#41444</a>）。</li>
<li>增强了 BM25 分析器功能<a href="https://github.com/milvus-io/milvus/pull/41456">（#41456</a>）。<ul>
<li>引入了用于干运行的<code translate="no">run_analyzer</code> API，以帮助分析标记化结果。有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>。</li>
<li>标记化器<ul>
<li>已添加对 Jieba 令牌化器参数定制的支持。</li>
<li>添加了对 Lindera 令牌化器的支持。有关详细信息，请参阅<a href="/docs/zh/lindera-tokenizer.md">Lindera</a>。</li>
<li>已添加对 ICU 令牌生成器的支持。如需了解更多信息，请参阅<a href="/docs/zh/icu-tokenizer.md">ICU</a>。</li>
<li>已添加用于语言检测的语言标识符标记符。</li>
</ul></li>
<li>过滤器<ul>
<li>扩展了对内置停止词过滤器的语言支持。更多信息，请参阅<a href="/docs/zh/stop-filter.md">停止</a>。</li>
<li>添加了<code translate="no">remove_punct</code> 过滤器以移除标点符号。有关更多信息，请参阅<a href="/docs/zh/removepunct-filter.md">删除标点符号</a>。</li>
<li>添加了<code translate="no">regex</code> 过滤器，用于基于模式的文本过滤。更多信息，请参阅<a href="/docs/zh/regex-filter.md">Regex</a>。</li>
</ul></li>
</ul></li>
<li>新增了对修改数组字段最大容量的支持<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>)。</li>
<li>在 JSON 路径索引中添加了对二进制范围表达式的支持<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>)。</li>
<li>在 JSON 统计中添加了对后缀和后缀匹配类型的支持<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>)。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>启用了对分段加载线程池大小的动态更新<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>)。</li>
<li>在导入 binlog 时加速删除过滤<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>)。</li>
<li>为表达式过滤比率添加了监控参数<a href="https://github.com/milvus-io/milvus/pull/41403">（#41403</a>）。</li>
<li>添加了一个配置选项，以强制将索引重建为最新版本<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>)。</li>
<li>改进了列表策略的错误日志信息<a href="https://github.com/milvus-io/milvus/pull/41368">（#41368</a>）。</li>
<li>调整了对 gRPC 元数据头中连字符的处理<a href="https://github.com/milvus-io/milvus/pull/41372">（#41372</a>）。</li>
<li>将 Go 版本升级至 1.24.1，以解决 CVE 问题<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>,<a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>)。</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了在丢弃分区时可能无法正确丢弃分段的问题<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>)。</li>
<li>修正了批量插入使用函数运行程序的输入字段列表而非 Schema 的字段列表的问题<a href="https://github.com/milvus-io/milvus/pull/41561">（#41561</a>）。</li>
<li>修正了当<code translate="no">avgdl</code> （平均文档长度）为 NaN 时出现的 BM25 搜索失败问题<a href="https://github.com/milvus-io/milvus/pull/41503">（#41503</a>）。</li>
<li>修正了查询节点指标中不准确的标签<a href="https://github.com/milvus-io/milvus/pull/41422">（#41422</a>）。</li>
<li>修正了一个问题，即如果数据包含空映射，JSON 统计索引创建可能会失败<a href="https://github.com/milvus-io/milvus/pull/41506">（#41506</a>）。</li>
<li>修正了<code translate="no">AlterCollection</code> API，以正确保存修改时间戳<a href="https://github.com/milvus-io/milvus/pull/41469">（#41469</a>）。</li>
<li>修正了<code translate="no">ConjunctExpr</code> 下 JSON 统计中的间歇性过滤错误，并改进了任务槽计算逻辑，以加快 JSON 统计的构建<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>)。</li>
<li>修正了 BM25 统计计算中的 IDF 甲骨文泄漏问题<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>)。</li>
<li>确保在碎片编号验证过程中首先检查预创建的主题<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>)。</li>
<li>修正了单元测试中出现的错误死锁报告<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>)。</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 4 月 21 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 提高了搜索和加载性能，增强了度量报告功能，并扩大了对加速度量计算的 SVE 支持。该版本还包含多个错误修复，提高了稳定性和正确性。我们鼓励您升级或试用，您的反馈对我们改进 Milvus 非常宝贵！</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>忽略为不存在的索引报告索引指标<a href="https://github.com/milvus-io/milvus/pull/41296">（#41296）</a></li>
<li>即使存在反转索引，也为 LIKE 使用扫描模式<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>优化 LIKE 表达式的性能<a href="https://github.com/milvus-io/milvus/pull/41222">（#41222）</a></li>
<li>优化索引格式以提高加载性能<a href="https://github.com/milvus-io/milvus/pull/41041">（#41041）</a></li>
<li>RESTful：使默认超时可配置<a href="https://github.com/milvus-io/milvus/pull/41225">（＃41225）</a></li>
<li>启用 SVE 支持 FP16 / NY 函数中的 L2 度量计算<a href="https://github.com/zilliztech/knowhere/pull/1134">（knowhere #1134）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修复 JSON 索引无法用于字符串过滤器的问题<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>在预检查中跳过非向量字段的维度检查<a href="https://github.com/milvus-io/milvus/pull/41329">（#41329）</a></li>
<li>更改 Collections 现在可以正确更新 Schema<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>更新 knowhere 版本以修复 macOS 版本<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>在段索引初始化完成前列出索引时防止恐慌<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>通过更改日志级别解决性能回归问题<a href="https://github.com/milvus-io/milvus/pull/41269">（#41269）</a></li>
<li>在移除工作客户端之前关闭客户端<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 4 月 11 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.9 正式发布，该版本提高了 JSON 关键字统计的性能，增强了索引功能，并修复了若干关键错误，从而提高了稳定性和数据处理能力。我们鼓励您升级或试用该版本，并一如既往地感谢您的反馈，我们将继续完善 Milvus。</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>支持跳过加权重新排序器的得分规范化<a href="https://github.com/milvus-io/milvus/pull/40905">（#40905）</a></li>
<li>通过批量添加文档提高 JSON 关键统计构建的性能<a href="https://github.com/milvus-io/milvus/pull/40898">（#40898）</a></li>
<li>为<code translate="no">int8</code>/<code translate="no">int16</code> 元素类型创建数组索引时使用<code translate="no">int32</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>使暴力搜索结果与<code translate="no">exists</code> 表达式的 JSON 索引行为保持一致<a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了在客户端发送 traceID 时导致 traceID 混淆的问题<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>修正了因不正确使用<code translate="no">noexcept</code> 而导致 IO 故障的潜在崩溃问题<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>解决了余额暂停后触发的无限正常余额循环问题<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>显示 Collections 现在支持授予自定义权限组的对象<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>修复了检索复制通道位置失败的问题<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>修复了由 RESTful 超时导致的潜在线程泄漏<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>为批量跳过模式添加了一个清除位图<a href="https://github.com/milvus-io/milvus/pull/41165">（#41165）</a></li>
<li>修复了在本地模式远程存储中移除索引类型失败的问题<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>为数组<code translate="no">isNull</code> 操作符使用<code translate="no">element_type</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>删除了度量重置，以确保报告的准确性<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>修正了一个 Bug，该 Bug 可防止<code translate="no">null</code> 数据被<code translate="no">null</code> 表达式过滤<a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>忽略密封策略中无起始位置的增长段<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>避免在重试期间更新原始搜索/查询请求<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>修复了<code translate="no">LoadArrowReaderFromRemote</code> 在异常路径中运行时的分段故障<a href="https://github.com/milvus-io/milvus/pull/41071">（＃41071）</a></li>
<li>解决了手动平衡和平衡检查问题<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>对于使用懒惰<code translate="no">DescribeCollection</code> 的 JSON 统计，已验证的 Schema 不是<code translate="no">nil</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>修复了比较两列时光标移动的错误<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>解决了在打开不断增长的 mmap 时插入<code translate="no">null</code> 和非空数组时崩溃的问题<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>修复了一个 arm64 编译问题<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>添加了旁路线程池模式，以避免因索引增长而阻塞插入/加载操作<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>修正了 JSON 格式错误<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>当<code translate="no">http.enablepprof</code> 为 false 时，修正了 WebUI 中的 404 错误<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 4 月 1 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.8 版本发布，该版本增强了 JSON 表达式、UTF-8 验证、内存使用和平衡逻辑。该版本还包含多个重要的错误修复，以改进并发性和数据处理。我们鼓励您升级或试用，您的反馈将一如既往地帮助我们不断改进 Milvus！</p>
<h3 id="Features" class="common-anchor-header">功能</h3><ul>
<li>支持 JSON<code translate="no">null</code>/<code translate="no">exists</code> 表达式<a href="https://github.com/milvus-io/milvus/pull/41002">（#41002）</a></li>
<li>支持在批量插入中解析来自 Parquet 结构的稀疏向量<a href="https://github.com/milvus-io/milvus/pull/40874">（#40874）</a></li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>先平衡行数最多的 Collections<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>在导入过程中支持 UTF-8 字符串验证<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>为所有 VARCHAR 字段添加 UTF-8 验证<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>如果混合搜索只请求将 PK 作为输出字段，则避免重新查询<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>改进数组视图以优化内存使用<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>为自动平衡添加触发间隔配置<a href="https://github.com/milvus-io/milvus/pull/39918">（#39918）</a></li>
<li>将多个 OR 表达式转换为 IN 表达式（<a href="https://github.com/milvus-io/milvus/pull/40751">＃40751）</a></li>
<li>支持详细的手动压缩标准<a href="https://github.com/milvus-io/milvus/pull/40924">（＃40924）</a></li>
<li>为审计日志保留原始令牌<a href="https://github.com/milvus-io/milvus/pull/40867">（#40867）</a></li>
<li>优化 DataCoord 元互斥使用<a href="https://github.com/milvus-io/milvus/pull/40753">（#40753）</a></li>
<li>在<code translate="no">MsgDispatcher</code> 中引入批量订阅<a href="https://github.com/milvus-io/milvus/pull/40596">（＃40596）</a></li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了涉及可归零输入和不断增长的 mmap 数据类型的崩溃<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>修正了删除操作中因重复的 binlog ID 而可能造成的数据丢失<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>)、<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>为<code translate="no">GetSegmentsIndexStates</code> 添加了字段索引锁，以避免在创建 Collections 时插入可能造成的恐慌<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>修复了 Rocksmq 消费者注册中的并发问题<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>为分段加载检索所有子 delta 日志<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>修复了在指定<code translate="no">iterative_filter</code> 时使用 JSON 索引导致的错误结果<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>确保<code translate="no">exists</code> 操作符具有更高的优先级<a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>修正了<code translate="no">WithGroupSize</code> 在缩小时的问题<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>随着分段大小的增加，按比例增加插槽数量<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>在 enqueue 之前设置任务队列时间<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>修正了数据节点上的通道不平衡问题<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>为任务插槽设置正确的默认配置<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK：根据基于行的插入的 FieldSchema 设置可空标志<a href="https://github.com/milvus-io/milvus/pull/40962">（#40962）</a></li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 3 月 21 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.7 版本发布，其亮点是新引入的 JSON 路径索引功能。这使您可以在动态或 JSON 列上建立反向索引，从而显著提高查询性能。除了这些新功能，我们还进行了大量的增强和错误修复，以提高可靠性、改进错误处理并提高可用性。我们鼓励您升级或试用，并一如既往地感谢您的反馈，我们将继续改进 Milvus！</p>
<h3 id="Features" class="common-anchor-header">功能</h3><ul>
<li><strong>JSON 路径索引</strong>：为满足用户对动态 Schema 的需求，Milvus 2.5.7 引入了在动态列和 JSON 列上建立索引的功能。利用该功能，您可以为特定动态列或 JSON 路径创建反转索引，从而有效绕过较慢的 JSON 加载过程，大大提高查询性能。有关详细信息，请参阅<a href="/docs/zh/use-json-fields.md">JSON 字段</a>。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>为连接表达式的子表达式重新排序<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>为<code translate="no">interimindex</code> 添加更多配置选项，以支持精炼模式<a href="https://github.com/milvus-io/milvus/pull/40429">（#40429）</a></li>
<li>在整体 WA 计算中使用正确的计数器指标<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>使网段清除配置可刷新<a href="https://github.com/milvus-io/milvus/pull/40632">（＃40632）</a></li>
<li>添加基于封锁 L0 的通道密封策略<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>使用键级锁定完善任务元数据<a href="https://github.com/milvus-io/milvus/pull/40353">（#40353）</a></li>
<li>移除度量中不必要的 Collections 和分区标签<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>改进导入错误信息<a href="https://github.com/milvus-io/milvus/pull/40597">（#40597）</a></li>
<li>避免在<code translate="no">httpserver</code> 中将正文字节片转换为字符串<a href="https://github.com/milvus-io/milvus/pull/40414">（＃40414）</a></li>
<li>记录删除信息的起始位置<a href="https://github.com/milvus-io/milvus/pull/40678">（#40678）</a></li>
<li>支持使用新的<code translate="no">GetSegmentsInfo</code> 界面检索分段日志<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修正</h3><ul>
<li>导入 binlog 文件时使用<code translate="no">newInsertDataWithFunctionOutputField</code> <a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>修复了创建 Collections 时 mmap 属性无法应用的问题<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>取样失败时不删除 centroids 文件；而是等待 GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>修正了寻道过程中的信息丢失问题<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>移除主调度程序后的滞后目标<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>为每个批处理循环添加了清除位图输入<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>使用 RLock 保护<code translate="no">GetSegmentIndexes</code> <a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>避免了因检索空向量数据集而导致的分割故障<a href="https://github.com/milvus-io/milvus/pull/40546">（＃40546）</a></li>
<li>修复了 JSON 索引 "不等于 "过滤器<a href="https://github.com/milvus-io/milvus/pull/40648">（#40648）</a></li>
<li>修正了反转索引中的空偏移加载<a href="https://github.com/milvus-io/milvus/pull/40524">（#40524）</a></li>
<li>修正了<code translate="no">jsonKey</code> 统计信息的垃圾清理逻辑，并改进了 JSON 关键统计信息过滤器<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>捕获无效的 JSON 指针错误<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>列出策略时，RBAC 星级权限现在返回空<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>避免了当某个字段不存在于 QueryNode 中的 Schema 时的恐慌<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>修复了搜索/查询的引用 Collections 问题<a href="https://github.com/milvus-io/milvus/pull/40550">（#40550）</a></li>
<li>处理稀疏向量的空行<a href="https://github.com/milvus-io/milvus/pull/40586">（＃40586）</a></li>
<li>创建集合时添加了重复类型/索引参数检查<a href="https://github.com/milvus-io/milvus/pull/40465">（#40465）</a></li>
<li>将<code translate="no">metaHeader</code> 移至客户端以避免数据竞赛<a href="https://github.com/milvus-io/milvus/pull/40444">（＃40444）</a></li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2025 年 3 月 10 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>我们很高兴地宣布 Milvus 2.5.6 版本发布，该版本对工具链、日志、度量和数组处理进行了有价值的改进，并修复了多个错误，提高了可靠性和性能。本次更新包括完善的并发处理、更强大的压缩任务以及其他重要改进。我们鼓励您升级或试用，并一如既往地欢迎您提供反馈意见，帮助我们不断改进 Milvus！</p>
<h3 id="Improvements" class="common-anchor-header">改进</h3><ul>
<li>将 Go 工具链升级到 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>将 Rust 版本升级到 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>将 Etcd 版本提升至 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>只检查非空数组的元素类型<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>移除资源组处理程序（v2）中的调试日志<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>改进 gRPC 解析器的日志记录<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>为异步 CGO 组件添加更多指标<a href="https://github.com/milvus-io/milvus/pull/40232">（#40232）</a></li>
<li>在发布 Collections 后清理碎片位置缓存<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">错误修复</h3><ul>
<li>修正了忽略有效性导致的数组损坏<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>修正了<code translate="no">null</code> 表达式对 JSON 字段不起作用的问题<a href="https://github.com/milvus-io/milvus/pull/40457">（#40457）</a></li>
<li>修正了在使用可空字段构建 Tantivy 时存储错误偏移的问题<a href="https://github.com/milvus-io/milvus/pull/40453">（＃40453）</a></li>
<li>跳过执行零段的统计<a href="https://github.com/milvus-io/milvus/pull/40449">（#40449）</a></li>
<li>修正了数组的内存大小估算<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>传递一个编织袋指针以避免多重压缩<a href="https://github.com/milvus-io/milvus/pull/40401">（＃40401）</a></li>
<li>修复了批量插入时的崩溃问题<a href="https://github.com/milvus-io/milvus/pull/40304">（#40304）</a></li>
<li>通过正确终止主调度程序防止了消息流泄漏<a href="https://github.com/milvus-io/milvus/pull/40351">（＃40351）</a></li>
<li>修正了<code translate="no">null</code> 偏移的并发问题（<a href="https://github.com/milvus-io/milvus/pull/40363">＃40363</a>）、<a href="https://github.com/milvus-io/milvus/pull/40365">（＃40365）</a></li>
<li>修复了<code translate="no">import end ts</code> 的解析问题（<a href="https://github.com/milvus-io/milvus/pull/40333">#40333）</a></li>
<li>改进了<code translate="no">InitMetaCache</code> 函数的错误处理和单元测试<a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>为<code translate="no">CreateIndex</code> 添加了重复参数检查<a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>解决了在大小超过最大限制时阻止压缩任务的问题<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>修正了从数据流中重复消耗不可见片段的问题<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>修改了 CMake 变量，以便切换到<code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>修复了通过 RESTful 丢弃 DB 属性失败的问题<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>为<code translate="no">OperatePrivilegeV2</code> API 使用了不同的消息类型<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>修复了任务三角缓存中的数据竞赛问题<a href="https://github.com/milvus-io/milvus/pull/40262">（#40262）</a></li>
<li>解决了由重复任务 ID 引起的任务三角缓存泄漏问题<a href="https://github.com/milvus-io/milvus/pull/40184">（#40184）</a></li>
</ul>
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
<p>Milvus 2.5.2 支持修改 VARCHAR 列的最大长度，并解决了几个与并发、分区丢弃和导入时 BM25 统计处理有关的关键问题。我们强烈建议升级到该版本，以提高稳定性和性能。</p>
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
<p>有关详细信息，请参阅<a href="/docs/zh/analyzer-overview.md">分析器概述</a>和<a href="/docs/zh/keyword-match.md">文本匹配</a>。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">位图索引</h4><p>Milvus 系列新增了一种标量数据索引。位图索引使用长度与行数相等的位数组来表示值的存在并加速搜索。</p>
<p>位图索引传统上对低Cardinality字段很有效，这些字段的不同值数量不多--例如，包含性别信息的列只有两个可能的值：男性和女性。</p>
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
