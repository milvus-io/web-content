---
id: performance_faq.md
summary: 查找有关搜索性能、性能优化及其他性能相关问题的常见问题解答。
title: 性能常见问题解答
---
<h1 id="Performance-FAQ" class="common-anchor-header">性能常见问题解答<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">如何为 IVF 索引设置<code translate="no">nlist</code> 和<code translate="no">nprobe</code> ？</h4><p><code translate="no">nlist</code> 的设置需根据具体场景而定。作为经验法则，<code translate="no">nlist</code> 的推荐值为<code translate="no">4 × sqrt(n)</code> ，其中<code translate="no">n</code> 表示分段中实体的总数。</p>
<p>每个分段的大小由<code translate="no">datacoord.segment.maxSize</code> 参数决定，该参数默认设置为1024 MB。分段n中的实体总数可通过将<code translate="no">datacoord.segment.maxSize</code> 除以每个实体的大小来估算。</p>
<p><code translate="no">nprobe</code> 的设置需根据具体数据集和场景而定，涉及准确率与查询性能之间的权衡。建议通过反复实验来确定最佳值。</p>
<p>下图展示了在 sift50m 数据集和 IVF_SQ8 索引上运行的测试结果，该测试对比了不同<code translate="no">nlist</code>/<code translate="no">nprobe</code> 组合的召回率和查询性能。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>准确率测试</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   性能测试</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">为什么在较小的数据集上，查询有时会耗时更长？</h4><p>查询操作是在分段上进行的。索引可以缩短查询单个分段所需的时间。如果某个分段尚未建立索引，Milvus 将转而对原始数据进行穷举搜索——这会大幅增加查询时间。</p>
<p>因此，在小型数据集（Collection）上进行查询通常耗时更长，因为尚未构建索引。这是由于其分段的大小尚未达到由<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 设定的索引构建阈值。调用<code translate="no">create_index()</code> 可强制Milvus对已达到阈值但尚未被自动索引的分段进行索引，从而显著提升查询性能。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">哪些因素会影响 CPU 使用率？</h4><p>当 Milvus 正在构建索引或运行查询时，CPU 使用率会上升。通常情况下，索引构建是 CPU 密集型操作，但使用 Annoy 时除外，因为 Annoy 在单线程上运行。</p>
<p>在执行查询时，CPU 使用率受<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的影响。当<code translate="no">nq</code> 和<code translate="no">nprobe</code> 数值较小时，并发度较低，CPU 使用率也保持在较低水平。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">同时插入数据和执行搜索会影响查询性能吗？</h4><p>插入操作本身并不消耗大量 CPU 资源。但是，由于新分段可能尚未达到构建索引的阈值，Milvus 会转而采用暴力搜索——这会显著影响查询性能。</p>
<p>参数<code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 决定了分段的索引构建阈值，默认设置为 1024 行。更多信息请参阅《<a href="/docs/zh/v2.6.x/system_configuration.md">系统配置》</a>。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">为 VARCHAR 字段建立索引能否提高删除速度？</h4><p>为 VARCHAR 字段建立索引可以加快“按表达式删除”操作的速度，但仅在特定条件下有效：</p>
<ul>
<li><strong>INVERTED 索引</strong>：此索引有助于在非主键 VARCHAR 字段上执行“按表达式删除”（<code translate="no">IN</code> ）或“按表达式查找”（<code translate="no">==</code> ）操作。</li>
<li><strong>Trie 索引</strong>：此索引有助于对非主键 VARCHAR 字段执行前缀查询（例如<code translate="no">LIKE prefix%</code> ）。</li>
</ul>
<p>但是，对 VARCHAR 字段建立索引并不能加快以下操作的速度：</p>
<ul>
<li><strong>按 ID 删除</strong>：当 VARCHAR 字段为主键时。</li>
<li><strong>无关表达式</strong>：当 VARCHAR 字段不属于 DELETE 表达式的一部分时。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">还有疑问吗？</h4><p>您可以：</p>
<ul>
<li>在 GitHub 上查看<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。欢迎随时提问、分享想法并帮助其他用户。</li>
<li>加入我们的<a href="https://discord.com/invite/8uyFbECzPX">Discord 频道</a>，获取支持并参与我们的开源社区。</li>
</ul>
