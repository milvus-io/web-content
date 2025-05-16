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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>准确性测试</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>性能测试</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">为什么在较小的数据集上查询有时需要更长的时间？</h4><p>查询操作是在分段上进行的。索引可减少查询数据段所需的时间。如果一个数据段没有索引，Milvus 就会对原始数据进行暴力搜索，从而大大增加查询时间。</p>
<p>因此，在小数据集（Collection）上查询通常需要更长的时间，因为它没有建立索引。这是因为数据段的大小还没有达到<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 设置的建立索引阈值。调用<code translate="no">create_index()</code> 可强制 Milvus 为已达到阈值但尚未自动建立索引的数据段建立索引，从而显著提高查询性能。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">哪些因素会影响 CPU 占用率？</h4><p>当 Milvus 正在建立索引或运行查询时，CPU 使用率会增加。一般来说，除了使用 Annoy（在单线程上运行）外，索引构建都是 CPU 密集型工作。</p>
<p>运行查询时，CPU 使用率受<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的影响。当<code translate="no">nq</code> 和<code translate="no">nprobe</code> 较小时，并发量较低，CPU 占用率也较低。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">同时插入数据和搜索会影响查询性能吗？</h4><p>插入操作不占用 CPU。但是，由于新的数据段可能还没有达到建立索引的阈值，Milvus 会采用暴力搜索，这将严重影响查询性能。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 参数决定了段的索引建立阈值，默认设置为 1024 行。更多信息请参阅<a href="/docs/zh/v2.4.x/system_configuration.md">系统配置</a>。</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">在 Milvus 中删除数据后，存储空间会立即释放吗？</h4><p>不，在 Milvus 中删除数据后，存储空间不会立即释放。虽然删除数据会将实体标记为 "逻辑删除"，但实际空间可能不会立即释放。原因如下：</p>
<ul>
<li><strong>压缩</strong>：Milvus 会在后台自动压缩数据。这个过程会将较小的数据段合并为较大的数据段，并删除逻辑上已删除的数据（标记为删除的实体）或已超过有效时间（TTL）的数据。不过，压缩会创建新的数据段，同时将旧数据段标记为 "已丢弃"。</li>
<li><strong>垃圾收集</strong>：一个名为 Garbage Collection (GC) 的独立进程会定期删除这些 "已丢弃 "的数据段，从而释放它们占用的存储空间。这样可以确保存储空间的有效利用，但在删除和空间回收之间会有轻微延迟。</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">操作符插入、删除或上插数据后，我能否立即看到这些数据，而无需等待刷新？</h4><p>是的，在 Milvus，由于其存储-计算分解架构，数据可见性与刷新操作没有直接联系。您可以使用一致性级别管理数据可读性。</p>
<p>选择一致性级别时，要考虑一致性和性能之间的权衡。对于需要即时可见性的操作符，请使用 "强 "一致性级别。对于更快的写入，优先考虑较弱的一致性（数据可能不会立即可见）。有关详细信息，请参阅<a href="/docs/zh/v2.4.x/consistency.md">一致性</a>。</p>
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
<li>加入我们的<a href="https://discord.com/invite/8uyFbECzPX">Discord 服务器</a>，寻求支持并参与我们的开源社区。</li>
</ul>
