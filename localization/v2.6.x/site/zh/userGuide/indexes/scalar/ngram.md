---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  Milvus 中的 NGRAM 索引是为了加速对 VARCHAR 字段或 JSON 字段中特定 JSON 路径的 LIKE
  查询而构建的。在建立索引之前，Milvus 会将文本分割成固定长度为 n 的重叠短子串，称为 n-gram。例如，当 n = 3 时，单词 "Milvus
  "会被拆分成 3 个词组："Mil"、"ilv"、"lvu "和 "vus"。然后，这些 n
  个词组被存储在一个倒排索引中，该索引将每个词组映射到出现该词组的文档 ID。在查询时，该索引允许 Milvus
  将搜索范围迅速缩小到一小部分候选词，从而大大加快了查询的执行速度。
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">NGRAM</code> 索引是为了加速对<code translate="no">VARCHAR</code> 字段或<code translate="no">JSON</code> 字段内特定 JSON 路径的<code translate="no">LIKE</code> 查询而建立的。在建立索引之前，Milvus 会将文本分割成固定长度为<em>n</em> 的重叠短子串，称为<em>n-gram</em>。例如，<em>n = 3</em> 时，单词<em>"Milvus "</em>会被拆分成 3 个词组：<em>"Mil"、</em> <em>"ilv"、"</em> <em>lvu "</em>和<em>"vus"。</em>然后，这些 n 个词组被存储在一个倒排索引中，该索引将每个词组映射到出现该词组的文档 ID。在查询时，该索引允许 Milvus 将搜索范围迅速缩小到一小部分候选词，从而大大加快了查询执行速度。</p>
<p>当你需要快速过滤前缀、后缀、前后缀或通配符时，可以使用它：</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>有关过滤表达式语法的详细信息，请参阅<a href="/docs/zh/basic-operators.md#Range-operators">基本操作符</a>。</p>
</div>
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
    </button></h2><p>Milvus 分两个阶段实现<code translate="no">NGRAM</code> 索引：</p>
<ol>
<li><p><strong>建立索引</strong>：为每个文档生成 n-grams，并在摄取过程中建立倒排索引。</p></li>
<li><p><strong>加速查询</strong>：使用索引筛选出一个小的候选集，然后验证精确匹配。</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">第 1 阶段：建立索引<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在数据摄取过程中，Milvus 通过两个主要步骤建立 NGRAM 索引：</p>
<ol>
<li><p><strong>将文本分解为 n 个词组</strong>：Milvus 在目标字段中的每个字符串上滑动一个<em>n</em>的窗口，提取重叠的子串或<em>n-gram</em>。这些子串的长度在一个可配置的范围内，<code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>:要生成的最短 n-gram。这也定义了可从索引中获益的最小查询子串长度。</p></li>
<li><p><code translate="no">max_gram</code>:要生成的最长 n-gram。在查询时，它也被用作分割长查询字符串时的最大窗口大小。</p></li>
</ul>
<p>例如，在<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 的情况下，字符串<code translate="no">&quot;AI database&quot;</code> 的拆分情况如下：</p>
<ul>
<li><strong>2-grams：</strong> <code translate="no">AI</code>,<code translate="no">I_</code>,<code translate="no">_d</code>,<code translate="no">da</code>,<code translate="no">at</code>, ...</li>
<li><strong>3-grams：</strong> <code translate="no">AI_</code>,<code translate="no">I_d</code>,<code translate="no">_da</code>,<code translate="no">dat</code>,<code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>建立 Ngram 索引</span> </span></p>
<blockquote>
<p><strong>注释</strong></p>
<ul>
<li><p>对于一个范围<code translate="no">[min_gram, max_gram]</code> ，Milvus 会生成两个值之间每个长度（包括在内）的所有 n-gram。<br>
示例：对于<code translate="no">[2,4]</code> 和单词<code translate="no">&quot;text&quot;</code> ，Milvus 会生成：</p>
<ul>
<li><strong>2-grams：</strong> <code translate="no">te</code>,<code translate="no">ex</code> 、<code translate="no">xt</code></li>
<li><strong>3-grams：</strong> <code translate="no">tex</code>,<code translate="no">ext</code></li>
<li><strong>4-grams</strong>：<code translate="no">text</code></li>
</ul></li>
<li><p>N-gram 分解以字符为基础，与语言无关。例如，在中文中，带有<code translate="no">min_gram = 2</code> 的<code translate="no">&quot;向量数据库&quot;</code> 被分解为<code translate="no">&quot;向量&quot;</code>,<code translate="no">&quot;量数&quot;</code>,<code translate="no">&quot;数据&quot;</code>,<code translate="no">&quot;据库&quot;</code> 。</p></li>
<li><p>在分解过程中，空格和标点符号被视为字符。</p></li>
<li><p>分解时保留原始大小写，匹配时区分大小写。例如，<code translate="no">&quot;Database&quot;</code> 和<code translate="no">&quot;database&quot;</code> 会生成不同的 n-gram，查询时需要进行精确的大小写匹配。</p></li>
</ul>
</blockquote></li>
<li><p><strong>建立反转索引</strong>：创建一个<strong>倒排索引</strong>，将每个生成的 n-gram 映射到包含它的文档 ID 列表。</p>
<p>例如，如果 2-gram<code translate="no">&quot;AI&quot;</code> 出现在 ID 为 1、5、6、8 和 9 的文档中，索引就会记录<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 。查询时可使用该索引快速缩小搜索范围。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>建立 Ngram 索引 2</span> </span></p>
<div class="alert note">
<p>更宽的<code translate="no">[min_gram, max_gram]</code> 范围会产生更多的克和更大的映射列表。如果内存紧张，可考虑使用 mmap 模式处理超大张贴列表。有关详情，请参阅<a href="/docs/zh/mmap.md">使用 mmap</a>。</p>
</div>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">第 2 阶段：加速查询<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>当执行<code translate="no">LIKE</code> 过滤器时，Milvus 会使用 NGRAM 索引来加速查询，具体步骤如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>加速查询</span> </span></p>
<ol>
<li><p><strong>提取查询词：</strong>从<code translate="no">LIKE</code> 表达式中提取不含通配符的连续子串（例如，<code translate="no">&quot;%database%&quot;</code> 变成<code translate="no">&quot;database&quot;</code> ）。</p></li>
<li><p><strong>分解查询词：</strong>根据查询词的长度 (<code translate="no">L</code>) 以及<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 的设置，将查询词分解为<em>n 个词组</em>。</p>
<ul>
<li><p>如果<code translate="no">L &lt; min_gram</code> ，则无法使用索引，查询将退回到全扫描。</p></li>
<li><p>如果设置为<code translate="no">min_gram ≤ L ≤ max_gram</code> ，则整个查询词被视为一个 n-gram，无需进一步分解。</p></li>
<li><p>如果是<code translate="no">L &gt; max_gram</code> ，查询词将被分解为多个重叠克，窗口大小等于<code translate="no">max_gram</code> 。</p></li>
</ul>
<p>例如，如果<code translate="no">max_gram</code> 设置为<code translate="no">3</code> ，查询词为<code translate="no">&quot;database&quot;</code> ，长度为<strong>8</strong>，则会被分解为<code translate="no">&quot;dat&quot;</code>,<code translate="no">&quot;ata&quot;</code>,<code translate="no">&quot;tab&quot;</code> 等 3 个克的子串。</p></li>
<li><p><strong>查找每个语法并进行交集</strong>：Milvus 在倒排索引中查找每个查询语法，然后与得到的文档 ID 列表进行交集，找出一小组候选文档。这些候选文档包含查询中的所有语法。</p></li>
<li><p><strong>验证并返回结果：</strong>然后将原始的<code translate="no">LIKE</code> 过滤器作为最后检查只应用于小的候选集，以找到完全匹配的结果。</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">创建 NGRAM 索引<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>可以在<code translate="no">VARCHAR</code> 字段或<code translate="no">JSON</code> 字段内的特定路径上创建 NGRAM 索引。</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">例 1：在 VARCHAR 字段上创建<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>对于<code translate="no">VARCHAR</code> 字段，只需指定<code translate="no">field_name</code> 并配置<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 即可。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>此配置会为<code translate="no">text</code> 中的每个字符串生成 2-gram 和 3-gram，并将其存储在反转索引中。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">例 2：在 JSON 路径上创建<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>对于<code translate="no">JSON</code> 字段，除了克设置外，还必须指定</p>
<ul>
<li><p><code translate="no">params.json_path</code> - 指向要索引的值的 JSON 路径。</p></li>
<li><p><code translate="no">params.json_cast_type</code> - 必须是<code translate="no">&quot;varchar&quot;</code> （不区分大小写），因为 NGRAM 索引操作符是字符串。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此示例中</p>
<ul>
<li><p>只索引<code translate="no">json_field[&quot;body&quot;]</code> 中的值。</p></li>
<li><p>在进行 N-gram 标记化之前，该值会被转换为<code translate="no">VARCHAR</code> 。</p></li>
<li><p>Milvus 会生成长度为 2 到 4 的子串，并将它们存储在反转索引中。</p></li>
</ul>
<p>有关如何索引 JSON 字段的更多信息，请参阅<a href="/docs/zh/use-json-fields.md">JSON 字段</a>。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">通过 NGRAM 加速查询<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>要应用 NGRAM 索引：</p>
<ul>
<li><p>查询必须以具有<code translate="no">NGRAM</code> 索引的<code translate="no">VARCHAR</code> 字段（或 JSON 路径）为目标。</p></li>
<li><p><code translate="no">LIKE</code> 模式的字面部分长度必须至少为<code translate="no">min_gram</code> 个字符<em>（例如，如果最短的预期查询项为 2 个字符，则在创建索引时设置 min_gram=2）。</em></p></li>
</ul>
<p>支持的查询类型：</p>
<ul>
<li><p><strong>前缀匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>后缀匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>后缀匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>通配符匹配</strong></p>
<p>Milvus 支持<code translate="no">%</code> （0 个或多个字符）和<code translate="no">_</code> （正好一个字符）。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 路径查询</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>有关过滤表达式语法的更多信息，请参阅<a href="/docs/zh/basic-operators.md">基本操作符</a>。</p>
<h2 id="Usage-notes" class="common-anchor-header">使用说明<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>字段类型</strong>：支持<code translate="no">VARCHAR</code> 和<code translate="no">JSON</code> 字段。对于 JSON，同时提供<code translate="no">params.json_path</code> 和<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 。</p></li>
<li><p><strong>Unicode</strong>：NGRAM 分解以字符为基础，与语言无关，包括空白和标点符号。</p></li>
<li><p><strong>时空权衡</strong>：更宽的克范围<code translate="no">[min_gram, max_gram]</code> 会产生更多的克和更大的索引。如果内存紧张，可考虑使用<code translate="no">mmap</code> 模式处理大型张贴列表。更多信息，请参阅<a href="/docs/zh/mmap.md">使用 mmap</a>。</p></li>
<li><p><strong>不变性</strong>：<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 不能就地更改，需要重新构建索引才能调整。</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">最佳实践<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>选择 min_gram 和 max_gram 以匹配搜索行为</strong></p>
<ul>
<li><p>从<code translate="no">min_gram=2</code>,<code translate="no">max_gram=3</code> 开始。</p></li>
<li><p>将<code translate="no">min_gram</code> 设置为用户希望键入的最短文字。</p></li>
<li><p>将<code translate="no">max_gram</code> 设置为接近有意义子字符串的典型长度；较大的<code translate="no">max_gram</code> 可以提高过滤效果，但会增加空间。</p></li>
</ul></li>
<li><p><strong>避免低选择性语法</strong></p>
<p>高度重复的模式（如<code translate="no">&quot;aaaaaa&quot;</code> ）过滤效果较弱，收益有限。</p></li>
<li><p><strong>统一规范化</strong></p>
<p>如果您的用例需要，对摄取的文本和查询字面采用相同的规范化处理（如小写、修剪）。</p></li>
</ul>
