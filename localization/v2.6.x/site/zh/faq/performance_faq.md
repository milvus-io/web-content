---
id: performance_faq.md
summary: 查找有关搜索性能、性能增强和其他性能相关问题的常见问题答案。
title: 性能常见问题
---
<h1 id="Performance-FAQ" class="common-anchor-header">性能常见问题<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">如何为 IVF 索引设置<code translate="no">nlist</code> 和<code translate="no">nprobe</code> ？</h4><p>设置<code translate="no">nlist</code> 需要根据具体情况而定。根据经验，<code translate="no">nlist</code> 的推荐值是<code translate="no">4 × sqrt(n)</code> ，其中<code translate="no">n</code> 是段中实体的总数。</p>
<p>每个段的大小由<code translate="no">datacoord.segment.maxSize</code> 参数决定，默认设置为 512 MB。将<code translate="no">datacoord.segment.maxSize</code> 除以每个实体的大小，即可估算出数据段 n 中实体的总数。</p>
<p><code translate="no">nprobe</code> 的设置取决于数据集和场景，需要在准确性和查询性能之间进行权衡。我们建议通过反复试验找到理想值。</p>
<p>下图是在 sift50m 数据集和 IVF_SQ8 索引上运行的测试结果，其中比较了不同<code translate="no">nlist</code>/<code translate="no">nprobe</code> 对的召回率和查询性能。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>准确性测试</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>性能测试</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">为什么在较小的数据集上查询有时需要更长的时间？</h4><p>查询操作是在分段上进行的。索引可减少查询数据段所需的时间。如果一个数据段没有索引，Milvus 就会对原始数据进行暴力搜索，从而大大增加查询时间。</p>
<p>因此，在小数据集（Collection）上查询通常需要更长的时间，因为它没有建立索引。这是因为数据段的大小还没有达到<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 设置的建立索引阈值。调用<code translate="no">create_index()</code> 可强制 Milvus 对已达到阈值但尚未自动建立索引的数据段建立索引，从而显著提高查询性能。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">哪些因素会影响 CPU 占用率？</h4><p>当 Milvus 正在建立索引或运行查询时，CPU 使用率会增加。一般来说，除了使用 Annoy（在单线程上运行）外，索引构建都是 CPU 密集型工作。</p>
<p>运行查询时，CPU 使用率受<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的影响。当<code translate="no">nq</code> 和<code translate="no">nprobe</code> 较小时，并发量较低，CPU 占用率也较低。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">同时插入数据和搜索会影响查询性能吗？</h4><p>插入操作不占用 CPU。但是，由于新的数据段可能还没有达到建立索引的阈值，Milvus 会采用暴力搜索，这将严重影响查询性能。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 参数决定了段的索引建立阈值，默认设置为 1024 行。更多信息请参阅<a href="/docs/zh/system_configuration.md">系统配置</a>。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">为 VARCHAR 字段建立索引能否提高删除速度？</h4><p>为 VARCHAR 字段建立索引可以加快 "按表达式删除 "操作的速度，但仅限于特定条件下：</p>
<ul>
<li><strong>反转索引</strong>：该索引有助于非主键 VARCHAR 字段上的<code translate="no">IN</code> 或<code translate="no">==</code> 表达式。</li>
<li><strong>Trie 索引</strong>：该索引有助于对非主键 VARCHAR 字段进行前缀查询（如<code translate="no">LIKE prefix%</code> ）。</li>
</ul>
<p>不过，为 VARCHAR 字段建立索引不会加快速度：</p>
<ul>
<li><strong>按 ID 删除</strong>：当 VARCHAR 字段是主键时。</li>
<li><strong>不相关的表达式</strong>：当 VARCHAR 字段不是删除表达式的一部分时。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">还有问题？</h4><p>你可以</p>
<ul>
<li>在 GitHub 上查看<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。随时提问、分享想法并帮助其他用户。</li>
<li>加入我们的<a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack 频道</a>，寻求支持并与我们的开源社区互动。</li>
</ul>
