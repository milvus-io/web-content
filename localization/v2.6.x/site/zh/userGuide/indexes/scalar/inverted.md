---
id: inverted.md
title: 反转
summary: Milvus 中的倒排索引旨在加速标量字段和结构化 JSON 字段的过滤查询。通过将术语映射到包含这些术语的文档或记录，倒排索引可大大提高查询性能。
---
<h1 id="INVERTED" class="common-anchor-header">反转<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">INVERTED</code> 索引旨在加速标量字段和结构化 JSON 字段的过滤查询。通过将术语映射到包含这些术语的文档或记录，倒排索引可大大提高查询性能。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>在<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 的支持下，Milvus 实现了倒排索引，以加速过滤查询，尤其是文本数据的过滤查询。下面是它的工作原理：</p>
<ol>
<li><p><strong>标记化数据</strong>：Milvus 获取原始数据--本例中是两句话：</p>
<ul>
<li><p><strong>"Milvus是一个云原生向量数据库"。</strong></p></li>
<li><p><strong>"Milvus 在性能方面非常出色"。</strong></p></li>
</ul>
<p>并将它们分解为独特的单词（例如，<em>Milvus</em>、<em>is</em>、<em>cloud</em> <em>-native</em>、<em>向量</em>、<em>数据库</em>、<em>very</em>、<em>good</em>、<em>at</em>、<em>performance</em>）。</p></li>
<li><p><strong>建立术语词典</strong>：这些独特的单词被存储在一个名为 "<strong>术语字典</strong>"的分类列表中。通过这个词典，Milvus 可以快速检查某个词是否存在，并找到它在索引中的位置。</p></li>
<li><p><strong>创建反向列表</strong>：对于术语词典中的每个单词，Milvus 会保存一个<strong>反向列表</strong>，显示哪些文档包含该单词。例如，<strong>"Milvus "</strong>出现在两个句子中，因此其倒置列表指向两个文档 ID。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>倒排</span> </span></p>
<p>由于词典是排序的，因此可以高效地处理基于术语的过滤。Milvus 不需要扫描所有文档，只需在字典中查找该术语，然后检索其倒排列表--这大大加快了大型数据集的搜索和筛选速度。</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">为常规标量字段建立索引<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>对于<strong>BOOL</strong>、<strong>INT8</strong>、<strong>INT16</strong>、<strong>INT32</strong>、<strong>INT64</strong>、<strong>FLOAT</strong>、<strong>DOUBLE</strong>、<strong>VARCHAR</strong> 和<strong>ARRAY</strong> 等标量字段，创建反转索引非常简单。使用<code translate="no">create_index()</code> 方法，将<code translate="no">index_type</code> 参数设置为<code translate="no">&quot;INVERTED&quot;</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">索引一个 JSON 字段<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 将其索引功能扩展到了 JSON 字段，使您可以高效地过滤存储在单列中的嵌套数据或结构化数据。与标量字段不同，索引 JSON 字段时必须提供两个附加参数：</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong>指定要索引的嵌套键。</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong>定义数据类型（如<code translate="no">&quot;varchar&quot;</code> 、<code translate="no">&quot;double&quot;</code> 或<code translate="no">&quot;bool&quot;</code> ），提取的 JSON 值将被转换为该类型。</p></li>
</ul>
<p>例如，考虑一个名为<code translate="no">metadata</code> 的 JSON 字段，其结构如下：</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>要在特定 JSON 路径上创建反转索引，可以使用以下方法：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>参数</p></th>
     <th><p>示例值</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Schema 中 JSON 字段的名称。</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>要创建的索引类型；目前 JSON 路径索引只支持<code translate="no">INVERTED</code> 。</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(可选）自定义索引名称。如果在同一 JSON 字段上创建多个索引，请指定不同的名称。</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>指定要索引的 JSON 路径。可以针对嵌套键、数组位置或两者（如<code translate="no">metadata["product_info"]["category"]</code> 或<code translate="no">metadata["tags"][0]</code> ）。如果缺少路径或某一行不存在数组元素，则在索引过程中会跳过该行，不会出错。</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>在建立索引时，Milvus 将把提取的 JSON 值转换成的数据类型。有效值</p>
<ul>
<li><p><code translate="no">"bool"</code> 或<code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> 或<code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> 或<code translate="no">"VARCHAR"</code></p>
<p><strong>注意</strong>：对于整数值，Milvus 内部使用 double 作为索引。超过 2^53 的大整数会失去精度。如果投递失败（由于类型不匹配），不会抛出错误，也不会索引该行的值。</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">JSON 索引的注意事项<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>过滤逻辑</strong>：</p>
<ul>
<li><p>如果<strong>创建了一个双类型索引</strong>（<code translate="no">json_cast_type=&quot;double&quot;</code> ），则只有数字类型的过滤条件才能使用该索引。如果过滤器将双索引与非数值型条件进行比较，Milvus 就会退回到蛮力搜索。</p></li>
<li><p>如果<strong>创建了 varchar 类型的索引</strong>(<code translate="no">json_cast_type=&quot;varchar&quot;</code>)，则只有字符串类型的过滤条件才能使用该索引。否则，Milvus 将退回蛮力搜索。</p></li>
<li><p><strong>布尔</strong>索引的行为与 varchar 类型类似。</p></li>
</ul></li>
<li><p><strong>术语表达式</strong>：</p>
<ul>
<li>可以使用<code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> 。但是，索引只对存储在该路径下的标量值有效。如果<code translate="no">json[&quot;field&quot;]</code> 是一个数组，查询将退回到蛮力方式（尚未支持数组类型索引）。</li>
</ul></li>
<li><p><strong>数字精度</strong>：</p>
<ul>
<li>在内部，Milvus 将所有数值字段索引为双倍。如果数值超过<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>，就会失去精度，对这些超出范围的数值进行的查询可能无法完全匹配。</li>
</ul></li>
<li><p><strong>数据完整性</strong>：</p>
<ul>
<li>Milvus 不会解析或转换超出你指定铸造的 JSON 键。如果源数据不一致（例如，某些行的键<code translate="no">&quot;k&quot;</code> 存储的是字符串，而其他行存储的是数字），某些行将不会被索引。</li>
</ul></li>
</ul>
