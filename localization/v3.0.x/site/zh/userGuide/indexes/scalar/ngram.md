---
id: ngram.md
title: NGRAM
summary: >-
  Milvus 中的 NGRAM 索引可加速针对 VARCHAR 字段或 JSON 字段内特定 JSON 路径的 LIKE
  查询和符合条件的正则表达式过滤。在构建索引之前，Milvus 会将文本拆分为固定长度 n 的短且相互重叠的子字符串，即 n-gram。
  在查询时，Milvus 会利用这些 n-gram 来缩小候选实体的范围，然后才验证原始过滤条件。
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">NGRAM</code> 索引可加速对<code translate="no">VARCHAR</code> 字段或<code translate="no">JSON</code> 字段内特定 JSON 路径的<code translate="no">LIKE</code> 查询及符合条件的正则表达式过滤。在构建索引之前，Milvus 会将文本拆分为长度固定为<em>n</em> 的短且重叠的子字符串，即<em>n-gram</em>。 例如，当<em>n = 3</em> 时<em>，单词“Milvus”会被</em>拆分为 3-gram：<em>“Mil”</em>、<em>“ilv”</em>、<em>“lvu”和“vus”。</em>随后，这些 n-gram 会被存储在倒排索引中，该索引将每个 n-gram 映射到其出现的文档 ID。 在查询时，该索引使 Milvus 能够在验证原始过滤条件之前，快速将搜索范围缩小到一小部分候选结果。</p>
<p>当您需要快速的前缀、后缀、中缀、通配符或符合条件的正则表达式过滤时，请使用此功能，例如：</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>有关<code translate="no">LIKE</code> 和正则表达式过滤表达式语法的详细信息，请参阅《<a href="/docs/zh/pattern-matching.md">模式匹配</a>》。</p>
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
    </button></h2><p>Milvus 通过两阶段流程实现<code translate="no">NGRAM</code> 索引：</p>
<ol>
<li><p><strong>构建索引</strong>：在数据摄入过程中，为每份文档生成 n-gram，并构建倒排索引。</p></li>
<li><p><strong>加速查询</strong>：利用索引将结果过滤为一个较小的候选集，然后验证精确匹配。</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">第一阶段：构建索引<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在数据摄入过程中，Milvus 通过执行以下两个主要步骤来构建 NGRAM 索引：</p>
<ol>
<li><p><strong>将文本分解为 n-gram</strong>：Milvus 在目标字段的每个字符串上滑动一个长度为<em>n</em>的滑动窗口，并提取重叠的子字符串，即<em>n-gram</em>。这些子字符串的长度在可配置的范围内，<code translate="no">[min_gram, max_gram]</code> 。</p>
<ul>
<li><p><code translate="no">min_gram</code>：要生成的最短 n-gram。这也定义了能够从该索引中受益的最小查询子串长度。</p></li>
<li><p><code translate="no">max_gram</code>：要生成的最长 n-gram。在查询时，该值还将作为拆分长查询字符串时的最大窗口大小。</p></li>
</ul>
<p>例如，当<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 时，字符串<code translate="no">&quot;AI database&quot;</code> 的拆分结果如下：</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>构建 N-gram 索引</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>构建倒排索引</strong>：创建一个<strong>倒排索引</strong>，将每个生成的 n-gram 映射到包含该 n-gram 的文档 ID 列表。</p>
<p>例如，如果 2-gram<code translate="no">&quot;AI&quot;</code> 出现在 ID 为 1、5、6、8 和 9 的文档中，则索引会记录<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 。该索引随后将在查询时用于快速缩小搜索范围。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>构建 N-gram 索引 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">第二阶段：加速查询<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>当执行<code translate="no">LIKE</code> 过滤器或符合条件的正则表达式过滤器时，Milvus会通过NGRAM索引按以下步骤加速查询：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>加速查询</span>
  
 </span></p>
<ol>
<li><p><strong>提取查询词：</strong>从<code translate="no">LIKE</code> 表达式中提取不包含通配符的连续子字符串（例如，<code translate="no">&quot;%database%&quot;</code> 变为<code translate="no">&quot;database&quot;</code> ）。对于正则表达式过滤器，Milvus会在可能的情况下从正则表达式模式中提取固定的字面量子字符串。例如，<code translate="no">message =~ &quot;error.*timeout&quot;</code> 包含字面量<code translate="no">error</code> 和<code translate="no">timeout</code> 。</p></li>
<li><p><strong>分解查询词：</strong>根据查询词的长度（<code translate="no">L</code> ）以及<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 的设置，将查询词分解为<em>n-gram</em>。</p>
<ul>
<li><p>如果<code translate="no">L &lt; min_gram</code> ，则无法使用索引，查询将回退到全表扫描。</p></li>
<li><p>如果<code translate="no">min_gram ≤ L ≤ max_gram</code> ，则整个查询词将被视为一个 n-gram，无需进一步分解。</p></li>
<li><p>如果<code translate="no">L &gt; max_gram</code> ，则使用等于<code translate="no">max_gram</code> 的窗口大小将查询词分解为重叠的语素。</p></li>
</ul>
<p>例如，如果<code translate="no">max_gram</code> 设置为<code translate="no">3</code> ，而查询词为<code translate="no">&quot;database&quot;</code> （长度为<strong>8</strong>），则将其分解为<code translate="no">&quot;dat&quot;</code> 、<code translate="no">&quot;ata&quot;</code> 、<code translate="no">&quot;tab&quot;</code> 等3-gram子字符串。</p></li>
<li><p><strong>查找每个语素并取交集</strong>：Milvus 在倒排索引中查找查询中的每个语素，然后对得到的文档 ID 列表进行交集运算，以找出一个较小的候选文档集。这些候选文档包含查询中的所有语素。</p></li>
<li><p><strong>验证并返回结果：</strong>随后仅对该小型候选集应用原始的<code translate="no">LIKE</code> 或正则表达式过滤器作为最终检查，以找出精确匹配的结果。</p></li>
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
    </button></h2><p>您可以在<code translate="no">VARCHAR</code> 字段上，或在<code translate="no">JSON</code> 字段内的特定路径上创建NGRAM索引。</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">示例 1：在 VARCHAR 字段上创建<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>对于<code translate="no">VARCHAR</code> 字段，您只需指定<code translate="no">field_name</code> ，并配置<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 。</p>
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
<p>此配置会为<code translate="no">text</code> 中的每个字符串生成2-gram和3-gram，并将它们存储在倒排索引中。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">示例 2：基于 JSON 路径创建<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>对于<code translate="no">JSON</code> 字段，除了词元设置外，您还必须指定：</p>
<ul>
<li><p><code translate="no">params.json_path</code> – 指向要索引的值的 JSON 路径。</p></li>
<li><p><code translate="no">params.json_cast_type</code> – 必须为 `<code translate="no">&quot;varchar&quot;</code> `（不区分大小写），因为 NGRAM 索引操作针对的是字符串。</p></li>
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
<p>在此示例中：</p>
<ul>
<li><p>仅对位于<code translate="no">json_field[&quot;body&quot;]</code> 处的值进行索引。</p></li>
<li><p>该值在 n-gram 分词之前会被转换为<code translate="no">VARCHAR</code> 。</p></li>
<li><p>Milvus 会生成长度为 2 到 4 的子字符串，并将它们存储在倒排索引中。</p></li>
</ul>
<p>有关如何对 JSON 字段进行索引的更多信息，请参阅<a href="/docs/zh/json-indexing.md">JSON 索引</a>。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">由 N-gram 加速的查询<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
<li><p>查询必须针对具有<code translate="no">NGRAM</code> 索引的<code translate="no">VARCHAR</code> 字段（或 JSON 路径）。</p></li>
<li><p><code translate="no">LIKE</code> 模式中的字面量部分长度必须至少为<code translate="no">min_gram</code> 个字符。
<em>（例如，如果预期最短的查询词为 2 个字符，则在创建索引时应将 min_gram 设置为 2。）</em></p></li>
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
<li><p><strong>中缀匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>通配符匹配</strong></p>
<p>Milvus 同时支持<code translate="no">%</code> （零个或多个字符）和<code translate="no">_</code> （恰好一个字符）。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON路径查询</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>正则表达式过滤</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>基于 JSON 路径的正则表达式过滤</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>有关过滤表达式语法的更多信息，请参阅<a href="/docs/zh/pattern-matching.md">“模式匹配</a>”。</p>
<h2 id="Drop-an-index" class="common-anchor-header">删除索引<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">drop_index()</code> 方法从 Collection 中删除现有索引。</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
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
<li><p><strong>字段类型</strong>：支持用于<code translate="no">VARCHAR</code> 和<code translate="no">JSON</code> 字段。对于JSON，需同时提供<code translate="no">params.json_path</code> 和<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 。</p></li>
<li><p><strong>正则表达式加速</strong>：仅当 Milvus 能从正则表达式模式中提取固定的字面量子字符串时，<code translate="no">NGRAM</code> 才会加速正则表达式过滤。诸如<code translate="no">[a-z]+</code> 之类的模式可能因不包含固定字面量而退回到扫描模式。</p></li>
<li><p><strong>不区分大小写的正则表达式</strong>：支持使用<code translate="no">(?i)</code> 的正则表达式模式，但它们可能会跳过<code translate="no">NGRAM</code> 优化，因为索引会保留原始的大小写状态。</p></li>
<li><p><strong>验证步骤</strong>：对于正则表达式过滤器，<code translate="no">NGRAM</code> 会生成候选结果，Milvus 会使用完整的 RE2 正则表达式模式对其进行验证，因此索引加速不会改变匹配结果。</p></li>
<li><p><strong>Unicode</strong>：NGRAM 分解基于字符且与语言无关，并包含空格和标点符号。</p></li>
<li><p><strong>空间-时间权衡</strong>：<code translate="no">[min_gram, max_gram]</code> 生成的语素范围越宽，产生的语素越多，索引也越大。如果内存紧张，对于大型索引列表，请考虑使用<code translate="no">mmap</code> 模式。有关更多信息，请参阅<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">“使用 mmap”</a>。</p></li>
<li><p><strong>不可变性</strong>：<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 无法就地修改——需重建索引才能调整它们。</p></li>
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
<li><p>建议从<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 开始设置。</p></li>
<li><p>将<code translate="no">min_gram</code> 设置为用户预计会输入的最短字符串。</p></li>
<li><p>将<code translate="no">max_gram</code> 设置为接近有意义子字符串的典型长度；较大的<code translate="no">max_gram</code> 可提高过滤效果，但会增加空间占用。</p></li>
</ul></li>
<li><p><strong>避免选择性较低的语素</strong></p>
<p>高度重复的模式（例如<code translate="no">&quot;aaaaaa&quot;</code> ）过滤效果较弱，且可能带来的收益有限。</p></li>
<li><p><strong>保持规范化的一致性</strong></p>
<p>如果您的用例需要，请对摄入的文本和查询字面量应用相同的规范化处理（例如，转小写、去除空格）。</p></li>
</ul>
