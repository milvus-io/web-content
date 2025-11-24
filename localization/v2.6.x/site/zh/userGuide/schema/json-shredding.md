---
id: json-shredding.md
title: JSON 切碎Compatible with Milvus 2.6.2+
summary: >-
  通过将传统的基于行的存储转换为优化的列式存储，JSON 切碎可加速 JSON 查询。在保持 JSON 数据建模灵活性的同时，Milvus
  在幕后执行列优化，极大地提高了访问和查询效率。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 切碎<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>通过将传统的基于行的存储转换为优化的列式存储，JSON 切碎可加速 JSON 查询。在保持 JSON 数据建模灵活性的同时，Milvus 在幕后执行列优化，从而显著提高了访问和查询效率。</p>
<p>JSON 切碎对大多数 JSON 查询场景都很有效。在以下情况下，性能优势会更加明显</p>
<ul>
<li><p><strong>更大、更复杂的 JSON 文档</strong>- 随着文档大小的增加，性能收益也会增加</p></li>
<li><p><strong>读取繁重的工作负载</strong>--经常对 JSON 键进行过滤、排序或搜索</p></li>
<li><p><strong>混合查询模式</strong>- 不同 JSON 键的查询从混合存储方法中获益</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">工作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON 粉碎过程分为三个不同阶段，以优化数据，实现快速检索。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">第 1 阶段：输入和密钥分类<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>随着新 JSON 文档的写入，Milvus 不断对其进行采样和分析，以建立每个 JSON 关键字的统计数据。这种分析包括关键字的出现率和类型稳定性（其数据类型在不同文档中是否一致）。</p>
<p>根据这些统计数据，JSON 关键字被分为以下几类，以便进行最佳存储。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON 关键字分类</h4><table>
   <tr>
     <th><p>键类型</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>类型键</p></td>
     <td><p>存在于大多数文档中且始终具有相同数据类型（如所有整数或所有字符串）的键。</p></td>
   </tr>
   <tr>
     <td><p>动态键</p></td>
     <td><p>经常出现但具有混合数据类型的键（例如，有时是字符串，有时是整数）。</p></td>
   </tr>
   <tr>
     <td><p>共享键</p></td>
     <td><p>不常出现或嵌套的键，低于可配置的频率阈值<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分类示例</h4><p>考虑包含以下 JSON 键的 JSON 数据样本：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>根据这些数据，这些键可分类如下：</p>
<ul>
<li><p><strong>类型键</strong>：<code translate="no">a</code> 和<code translate="no">f</code> （始终为整数）</p></li>
<li><p><strong>动态键</strong>：<code translate="no">b</code> （混合字符串/整数）</p></li>
<li><p><strong>共享键</strong>：<code translate="no">e</code> （不经常出现的键）</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">第二阶段：存储优化<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/zh/json-shredding.md#Phase-1-Ingestion--key-classification">第 1 阶段</a>的分类决定了存储布局。Milvus 使用专为查询优化的列格式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Json 粉碎流程</span> </span></p>
<ul>
<li><p><strong>切碎列</strong>：对于<strong>类型</strong> <strong>键</strong>和<strong>动态</strong> <strong>键</strong>，数据被写入专用列。这种列式存储允许在查询时进行快速、直接的扫描，因为 Milvus 可以只读取给定键所需的数据，而无需处理整个文档。</p></li>
<li><p><strong>共享列</strong>：所有<strong>共享键</strong>都一起存储在一个紧凑的二进制 JSON 列中。在这一列上建立共享键<strong>反转索引</strong>。该索引对于加速低频键的查询至关重要，它允许 Milvus 快速剪裁数据，有效地将搜索空间缩小到仅包含指定键的行。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">第 3 阶段查询执行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最后阶段利用优化的存储布局，为每个查询谓词智能选择最快的路径。</p>
<ul>
<li><p><strong>快速路径</strong>：对键入/动态键（如<code translate="no">json['a'] &lt; 100</code> ）的查询直接访问专用列</p></li>
<li><p><strong>优化路径</strong>：对共享键（如<code translate="no">json['e'] = 'rare'</code> ）的查询使用倒排索引来快速查找相关文档</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">启用 JSON 切碎功能<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>要激活该功能，请在<code translate="no">milvus.yaml</code> 配置文件中将<code translate="no">common.enabledJSONShredding</code> 设置为<code translate="no">true</code> 。新数据将自动触发粉碎过程。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>一旦启用，Milvus 将在摄取时开始分析和重组 JSON 数据，而无需任何进一步的人工干预。</p>
<h2 id="Parameter-tuning" class="common-anchor-header">参数调整<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>对于大多数用户来说，一旦启用 JSON 切碎，其他参数的默认设置就足够了。不过，您可以使用<code translate="no">milvus.yaml</code> 中的这些参数对 JSON 切碎的行为进行微调。</p>
<table>
   <tr>
     <th><p>参数名称</p></th>
     <th><p>说明</p></th>
     <th><p>默认值</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>控制是否启用 JSON 切碎构建和加载流程。</p></td>
     <td><p>假</p></td>
     <td><p>必须设为<strong>true</strong>才能激活该功能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>控制 Milvus 是否使用粉碎数据进行加速。</p></td>
     <td><p>为真</p></td>
     <td><p>设为<strong>false</strong>，作为查询失败时的恢复措施，恢复到原始查询路径。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>决定 Milvus 在加载粉碎数据时是否使用 mmap。</p><p>有关详情，请参阅<a href="/docs/zh/mmap.md">使用 mmap</a>。</p></td>
     <td><p>真</p></td>
     <td><p>此设置通常为性能优化。只有在系统有特定内存管理需求或限制的情况下才会调整它。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>将存储在粉碎列中的 JSON 键的最大数量。 </p><p>如果频繁出现的键的数量超过此限制，Milvus 将优先对最频繁出现的键进行粉碎，其余键将存储在共享列中。</p></td>
     <td><p>1024</p></td>
     <td><p>这足以满足大多数情况的需要。对于有数千个频繁出现密钥的 JSON，可能需要增加这一限制，但要监控存储空间的使用情况。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>要将一个 JSON 密钥粉碎到粉碎列中，该密钥必须具备的最小出现率。</p><p>如果一个密钥的出现比率高于此阈值，则该密钥被视为频繁出现。</p></td>
     <td><p>0.3</p></td>
     <td><p>如果符合粉碎标准的密钥数量超过<code translate="no">dataCoord.jsonShreddingMaxColumns</code> 限制，则<strong>增加</strong>（例如增加到 0.5）。这将使阈值更加严格，减少符合粉碎条件的钥匙数量。</p><p>如果你想粉碎更多出现频率低于默认 30% 阈值的密钥，则<strong>将阈值降低</strong>（例如<strong>降低</strong>到 0.1）。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能基准<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我们的测试表明，在不同的 JSON 密钥类型和查询模式下，性能都有显著提高。</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">测试环境和方法<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>硬件</strong>：1 核/8GB 集群</p></li>
<li><p><strong>数据集</strong>来自<a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>的 100 万个文档</p></li>
<li><p><strong>平均文档大小</strong>：478.89 字节</p></li>
<li><p><strong>测试持续时间</strong>100 秒，测量 QPS 和延迟</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">结果：键入键<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>该测试测量的是查询大多数文档中存在的键时的性能。</p>
<table>
   <tr>
     <th><p>查询表达式</p></th>
     <th><p>键值类型</p></th>
     <th><p>QPS （不粉碎）</p></th>
     <th><p>QPS （已粉碎）</p></th>
     <th><p>性能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整数</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>字符串</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">结果：共享键<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>本测试重点查询属于 "共享 "类别的稀疏嵌套键。</p>
<table>
   <tr>
     <th><p>查询表达式</p></th>
     <th><p>键值类型</p></th>
     <th><p>QPS （不粉碎）</p></th>
     <th><p>QPS （已粉碎）</p></th>
     <th><p>性能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>嵌套整数</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>嵌套字符串</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">关键信息<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>共享关键字查询</strong>显示出最显著的改进（快达 89 倍）</p></li>
<li><p><strong>键入式查询</strong>可持续提高 15-30 倍性能</p></li>
<li><p><strong>所有查询类型都</strong>从 JSON 破碎处理中获益，性能没有下降</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>如何验证 JSON 破碎处理是否正常工作？</strong></p>
<ol>
<li><p>首先，使用<a href="/docs/zh/birdwatcher_usage_guides.md">Birdwatcher</a>工具中的<code translate="no">show segment --format table</code> 命令检查数据是否已构建。如果成功，输出将在<strong>Json Key Stats 字段</strong>下包含<code translate="no">shredding_data/</code> 和<code translate="no">shared_key_index/</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Birdwatcher 输出</span> </span></p></li>
<li><p>接下来，在查询节点上运行<code translate="no">show loaded-json-stats</code> 验证数据是否已加载。输出将显示每个查询节点已加载碎纸数据的详细信息。</p></li>
</ol></li>
<li><p><strong>如果遇到错误怎么办？</strong></p>
<p>如果构建或加载过程失败，可以通过设置<code translate="no">common.enabledJSONShredding=false</code> 快速禁用该功能。要清除任何剩余任务，请使用<a href="/docs/zh/birdwatcher_usage_guides.md">Birdwatcher</a> 中的<code translate="no">remove stats-task &lt;task_id&gt;</code> 命令。如果查询失败，可设置<code translate="no">common.usingjsonShreddingForQuery=false</code> 恢复到原始查询路径，绕过粉碎数据。</p></li>
<li><p><strong>如何在 JSON 切碎和 JSON 索引之间进行选择？</strong></p>
<ul>
<li><p><strong>JSON 切碎</strong>非常适合文档中频繁出现的键，尤其是复杂的 JSON 结构。它结合了列式存储和反转索引的优点，非常适合查询许多不同键的重读取场景。不过，对于非常小的 JSON 文档，不建议使用这种方法，因为性能提升微乎其微。键值占 JSON 文档总大小的比例越小，粉碎带来的性能优化效果就越好。</p></li>
<li><p><strong>JSON 索引</strong>更适合对基于特定键值的查询进行有针对性的优化，而且存储开销更低。它适用于较简单的 JSON 结构。请注意，JSON 切碎不包括对数组内部键的查询，因此需要 JSON 索引来加速这些查询。</p></li>
</ul>
<p>有关详情，请参阅<a href="/docs/zh/json-field-overview.md#Next-Accelerate-JSON-queries">JSON 字段概述</a>。</p></li>
</ul>
