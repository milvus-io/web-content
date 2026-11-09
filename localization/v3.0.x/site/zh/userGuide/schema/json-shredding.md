---
id: json-shredding.md
title: JSON 拆分Compatible with Milvus 2.6.2+
summary: >-
  JSON 分片通过将传统的行式存储转换为优化的列式存储，从而加速了 JSON 查询。在保持 JSON 数据建模灵活性的同时，Milvus
  会在后台进行列式优化，从而显著提升访问和查询效率。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSON 拆分<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON 拆分通过将传统的行式存储转换为优化的列式存储，从而加速 JSON 查询。在保持 JSON 数据建模灵活性的同时，Milvus 会在后台执行列式优化，从而显著提高访问和查询效率。</p>
<p>JSON 拆分对大多数 JSON 查询场景都十分有效。在以下情况下，其性能优势更为显著：</p>
<ul>
<li><p><strong>规模更大、结构更复杂的 JSON 文档</strong>——随着文档大小的增加，性能提升幅度更大</p></li>
<li><p><strong>读取密集型工作负载</strong>——频繁对 JSON 键进行过滤、排序或搜索</p></li>
<li><p><strong>混合查询模式</strong>——跨不同 JSON 键的查询可从混合存储方式中获益</p></li>
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
    </button></h2><p>JSON 分片过程分为三个明确的阶段，旨在优化数据以实现快速检索。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">第一阶段：数据摄入与键分类<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>当新的 JSON 文档被写入时，Milvus 会持续对其进行采样和分析，以构建每个 JSON 键的统计信息。该分析包括键的出现频率及其类型稳定性（即其数据类型在不同文档中是否保持一致）。</p>
<p>基于这些统计数据，JSON键会被分类为以下几类，以实现最优存储。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSON键的分类</h4><table>
   <tr>
     <th><p>键类型</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>有类型键</p></td>
     <td><p>存在于大多数文档中且数据类型始终相同的键（例如，全是整数或全是字符串）。</p></td>
   </tr>
   <tr>
     <td><p>动态键</p></td>
     <td><p>频繁出现但数据类型不一的键（例如，有时是字符串，有时是整数）。</p></td>
   </tr>
   <tr>
     <td><p>共享键</p></td>
     <td><p>出现频率较低或嵌套的键，其出现频率低于可配置的阈值<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分类示例</h4><p>考虑包含以下 JSON 键的示例 JSON 数据：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>根据这些数据，这些键将被分类如下：</p>
<ul>
<li><p><strong>类型化键</strong>：<code translate="no">a</code> 和<code translate="no">f</code> （始终为整数）</p></li>
<li><p><strong>动态键</strong>：<code translate="no">b</code> （字符串与整数混合）</p></li>
<li><p><strong>共享键</strong>：<code translate="no">e</code> （出现频率较低的键）</p></li>
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
    </button></h3><p><a href="/docs/zh/json-shredding.md#Phase-1-Ingestion--key-classification">第一阶段</a>的分类结果决定了存储布局。Milvus采用针对查询进行优化的列式格式。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>JSON 分片流程</span>
  
 </span></p>
<ul>
<li><p><strong>拆分列</strong>：对于<strong>类型化</strong> <strong>键</strong>和<strong>动态</strong> <strong>键，</strong>数据将写入专用列中。这种列式存储可在查询时实现快速、直接的扫描，因为 Milvus 只需读取给定键所需的数据，而无需处理整个文档。</p></li>
<li><p><strong>共享列</strong>：所有<strong>共享键</strong>均存储在单个紧凑的二进制 JSON 列中。在此列上构建了共享键<strong>倒排索引</strong>。该索引对于加速低频键的查询至关重要，它使 Milvus 能够快速筛选数据，将搜索范围有效缩小至仅包含指定键的行。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">第三阶段：查询执行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最后阶段利用优化的存储布局，为每个查询谓词智能地选择最快的路径。</p>
<ul>
<li><p><strong>快速路径</strong>：针对类型化/动态键的查询（例如<code translate="no">json['a'] &lt; 100</code> ）会直接访问专用列</p></li>
<li><p><strong>优化路径</strong>：针对共享键（例如<code translate="no">json['e'] = 'rare'</code> ）的查询使用倒排索引快速定位相关文档</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">启用 JSON 拆分<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>要启用该功能，请在您的<code translate="no">milvus.yaml</code> 配置文件中将<code translate="no">common.enabledJSONShredding</code> 设置为<code translate="no">true</code> 。新数据将自动触发拆分过程。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>启用后，Milvus将在数据摄入时自动开始分析和重构您的JSON数据，无需任何进一步的手动干预。</p>
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
    </button></h2><p>对于大多数用户而言，启用 JSON 拆分后，其他参数的默认设置已足够。不过，您可以通过<code translate="no">milvus.yaml</code> 中的以下参数对 JSON 拆分的行为进行微调。</p>
<table>
   <tr>
     <th><p>参数名称</p></th>
     <th><p>描述</p></th>
     <th><p>默认值</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>控制是否启用 JSON 拆分构建和加载流程。</p></td>
     <td><p>false</p></td>
     <td><p>必须设置为<strong>true</strong>才能激活该功能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>控制 Milvus 是否使用拆分后的数据进行加速。</p></td>
     <td><p>true</p></td>
     <td><p>若查询失败，可将其设置为<strong>false</strong>作为恢复措施，从而恢复到原始查询路径。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>决定 Milvus 在加载分片数据时是否使用 mmap。</p><p>有关详细信息，请参阅<a href="/docs/zh/mmap.md">“使用 mmap</a>”。</p></td>
     <td><p>true</p></td>
     <td><p>此设置通常已针对性能进行了优化。仅当您的系统有特定的内存管理需求或限制时，才需调整此设置。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>将存储在分片列中的 JSON 键的最大数量。 </p><p>如果频繁出现的键的数量超过此限制，Milvus 将优先对最频繁出现的键进行分片，其余键将存储在共享列中。</p></td>
     <td><p>1024</p></td>
     <td><p>对于大多数场景而言，此值已足够。对于包含数千个高频键的 JSON，您可能需要增加此值，但请监控存储使用情况。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>JSON 键必须达到的最低出现比率，才能被考虑拆分到拆分列中。</p><p>如果某个键的出现比率高于此阈值，则该键被视为频繁出现。</p></td>
     <td><p>0.3</p></td>
     <td><p>如果符合拆分条件的键的数量超过了<code translate="no">dataCoord.jsonShreddingMaxColumns</code> 限制，<strong>请增加该值</strong>（例如，<strong>增加</strong>到0.5）。这会使阈值更严格，从而减少符合拆分条件的键的数量。</p><p>如果您希望将出现频率低于默认 30% 阈值的键进行拆分，<strong>请降低该值</strong>（例如，降至 0.1）。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能基准测试<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>我们的测试表明，在不同的 JSON 键类型和查询模式下，性能均得到了显著提升。</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">测试环境与方法<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>数据集</strong>：来自<a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>的 100 万份文档</p></li>
<li><p><strong>平均文档大小</strong>：478.89 字节</p></li>
<li><p><strong>测试时长</strong>：100秒，用于测量QPS和延迟</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">结果：有类型键<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>本次测试衡量了查询在大多数文档中都存在的键时的性能。</p>
<table>
   <tr>
     <th><p>查询表达式</p></th>
     <th><p>键值类型</p></th>
     <th><p>QPS（未进行分片）</p></th>
     <th><p>QPS（启用分片）</p></th>
     <th><p>性能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整数</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33倍</p></td>
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
    </button></h3><p>本次测试重点针对属于“共享”类别的稀疏、嵌套键的查询。</p>
<table>
   <tr>
     <th><p>查询表达式</p></th>
     <th><p>键值类型</p></th>
     <th><p>每秒查询数（QPS）（未进行分片）</p></th>
     <th><p>QPS（启用分片）</p></th>
     <th><p>性能提升</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>嵌套整数</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9倍</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>嵌套字符串</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3倍</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">关键发现<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>共享键查询的</strong>性能提升最为显著（最高可达89倍）</p></li>
<li><p><strong>带类型键的查询</strong>可提供稳定的 15-30 倍性能提升</p></li>
<li><p><strong>所有查询类型</strong>均可受益于 JSON 拆分，且不会导致性能退化</p></li>
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
<li><p><strong>如何验证 JSON 分片是否正常工作？</strong></p>
<ol>
<li><p>首先，请使用<a href="/docs/zh/birdwatcher_usage_guides.md">Birdwatcher</a>工具中的 `<code translate="no">show segment --format table</code> ` 命令检查数据是否已构建。若成功，输出结果<strong>的“Json Key Stats</strong>”字段下将包含 `<code translate="no">shredding_data/</code> ` 和 `<code translate="no">shared_key_index/</code> `。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Birdwatcher 输出</span>
  
 </span></p></li>
<li><p>接下来，在查询节点上运行<code translate="no">show loaded-json-stats</code> 命令，以验证数据是否已加载。输出结果将显示每个查询节点已加载的拆分数据的详细信息。</p></li>
</ol></li>
<li><p><strong>如果遇到错误怎么办？</strong></p>
<p>如果构建或加载过程失败，您可以通过设置<code translate="no">common.enabledJSONShredding=false</code> 快速禁用该功能。要清除任何剩余任务，请在<a href="/docs/zh/birdwatcher_usage_guides.md">Birdwatcher</a> 中使用<code translate="no">remove stats-task &lt;task_id&gt;</code> 命令。如果查询失败，请将<code translate="no">common.usingjsonShreddingForQuery=false</code> 设置为 0 以恢复到原始查询路径，从而绕过分片数据。</p></li>
</ul>
<ul>
<li><p><strong>如何在 JSON 分片和 JSON 索引之间进行选择？</strong></p>
<ul>
<li><p><strong>JSON 分片</strong>非常适合文档中频繁出现的键，尤其是对于复杂的 JSON 结构。它结合了列式存储和倒排索引的优势，非常适合需要查询大量不同键的读取密集型场景。但是，对于非常小的 JSON 文档，不建议使用 JSON 分片，因为性能提升微乎其微。 键值占 JSON 文档总大小的比例越小，拆分带来的性能优化效果就越好。</p></li>
<li><p><strong>JSON 索引</strong>更适合针对特定基于键的查询进行定向优化，且存储开销较低。它适用于较简单的 JSON 结构。请注意，JSON 分片不支持对数组内键的查询，因此您需要使用 JSON 索引来加速此类查询。</p></li>
</ul>
<p>有关详细信息，请参阅《<a href="/docs/zh/json-field-overview.md#Next-Accelerate-JSON-queries">JSON 字段概述</a>》。</p></li>
</ul>
