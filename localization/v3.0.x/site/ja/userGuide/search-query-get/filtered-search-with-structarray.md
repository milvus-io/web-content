---
id: filtered-search-with-structarray.md
title: StructArray を使用したフィルタリング検索
summary: >-
  このページを使用して、StructArrayフィールドのベクトル検索にスカラーフィルタリングを追加します。StructArrayのフィルタリングには2つのレベルがあります。行レベルのフィルタは親エンティティを選択し、要素レベルのフィルタは、要素レベルのベクトル検索の対象となるStruct要素を制限します。
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">StructArray を使用したフィルタリング検索<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayフィールドのベクトル検索にスカラーフィルタリングを追加します。StructArrayのフィルタリングには2つのレベルがあります。行レベルのフィルタは親エンティティを選択し、要素レベルのフィルタは、要素レベルのベクトル検索に参加するStruct要素を制限します。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」にある<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">chunks</code> という名前のStructArrayフィールドがあり、<code translate="no">section</code> 、<code translate="no">page</code> 、<code translate="no">quality_score</code> 、<code translate="no">has_code</code> などのスカラーサブフィールドに加え、検索用のベクトルサブフィールドが含まれています。</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">フィルタの種類を選択してください<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>目標</th><th>使用</th><th>結果の挙動</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">category</code> などのトップレベルのスカラーフィールドでフィルタリングします。</td><td>通常のフィルタ式。</td><td>検索の前または検索中に親エンティティを選択します。</td></tr>
<tr><td>要素レベルのベクトル検索を、スカラー条件に一致する Struct 要素に制限します。</td><td><code translate="no">element_filter</code>。</td><td>一致する Struct 要素のみを検索し、一致した要素のオフセットを返すことができます。</td></tr>
<tr><td>Struct 要素のいずれか、すべて、または特定の数が述語に一致するかどうかに基づいてエンティティを選択します。</td><td><code translate="no">MATCH_ANY</code>、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 、または<code translate="no">MATCH_EXACT</code> 。</td><td>行レベルのフィルタリング。これらの演算子自体はオフセットを返しません。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>このページでは、検索ワークフローにおける StructArray フィルターの使用方法について説明します。完全な構文規則、サポートされている述語タイプ、およびサポートされていない述語マトリックスについては、「<a href="/docs/ja/struct-array-operators.md">StructArray 演算子</a>」を参照してください。</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">トップレベルフィールドによるフィルタリング<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>条件が個々の Struct 要素ではなく親エンティティに属する場合は、通常のフィルタ式を使用します。これは、EmbeddingList 検索と要素レベル検索の両方で機能します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>上記のフィルタは、トップレベルの<code translate="no">category</code> フィールドが<code translate="no">&quot;search&quot;</code> であるエンティティのみを選択します。これは、1つの一致するStruct要素を特定するものではありません。</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">要素レベルのベクトル検索のフィルタリング<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>スカラー条件を、要素レベルのベクトル検索に参加する同じStruct要素に適用する必要がある場合は、<code translate="no">element_filter(structArrayField, predicate)</code> を使用します。述語内では、<code translate="no">$[subfield]</code> を使用して、現在のStruct要素のスカラーサブフィールドを参照します。</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>この例では、最上位の述語 `<code translate="no">category == &quot;search&quot;</code> ` が候補エンティティを選択し、`<code translate="no">element_filter</code> ` が、`<code translate="no">section</code>`、`<code translate="no">quality_score</code>`、および `<code translate="no">has_code</code> ` のすべてが同じ Struct 要素内で一致するチャンクに、要素レベルのベクトル検索を制限しています。</p>
<div class="alert note">
<p>警告</p>
<p>トップレベルの述語を<code translate="no">element_filter</code> と組み合わせる場合は、<code translate="no">element_filter</code> を式の最後に配置してください。フィルタ式には<code translate="no">element_filter</code> を1つしか含めることができず、<code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> を別のStructArray演算子の内部にネストすることはできません。</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">MATCH演算子を使用したエンティティのフィルタリング<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>フィルタが、親エンティティの Struct 要素に基づいてそのエンティティが条件を満たすかどうかを判断する必要がある場合は、<code translate="no">MATCH_*</code> 演算子を使用します。これらの演算子は行レベルのフィルタであり、エンティティを選択しますが、それ自体では要素のオフセットを返しません。</p>
<table>
<thead>
<tr><th>演算子</th><th>次のような場合に使用します</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>少なくとも1つのStruct要素が述語を満たす必要があります。</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>すべての Struct 要素が述語を満たす必要があります。</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>少なくとも<code translate="no">N</code> 個のStruct要素が述語を満たす必要があります。</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td><code translate="no">N</code> 個以下のStruct要素が述語を満たす必要があります。</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td><code translate="no">N</code> 個のStruct要素が、その述語を満たさなければなりません。</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>EmbeddingList の検索結果はエンティティレベルであるため、ここでは `<code translate="no">MATCH_ANY</code> ` を使用します。このフィルターでは、エンティティ内のチャンクのうち少なくとも 1 つが、高品質な `<code translate="no">&quot;index&quot;</code> ` チャンクである必要がありますが、検索結果自体は依然として親エンティティを表しています。</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">ハイブリッド検索でのフィルタの使用<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索では、条件を適用すべき箇所に StructArray フィルタを適用します。トップレベルのフィルタは、ハイブリッド検索全体で共有できます。<code translate="no">element_filter</code> は、要素レベルの制約が必要な StructArray 要素レベルのリクエストに添付する必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">filter</code> 引数はトップレベルのエンティティ条件を適用しますが、<code translate="no">chunk_req</code> の<code translate="no">expr</code> は、StructArrayの要素レベルのベクトルリクエストのみを制限します。サポートされているハイブリッド検索の組み合わせおよびバージョン固有の制限については、<a href="/docs/ja/hybrid-search-with-structarray.md">「StructArrayを使用したハイブリッド検索」</a>および<a href="/docs/ja/structarray-limits.md">「StructArrayの制限</a>」を参照してください。</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">述語のサポート概要<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 述語ではスカラーサブフィールドを使用してください。ベクトルサブフィールドは、スカラー述語の入力には使用できません。</p>
<table>
<thead>
<tr><th>サブフィールドの型</th><th>代表的な述語の例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>,<code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>整数型</td><td><code translate="no">$[page] &gt;= 2</code>,<code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>,<code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>,<code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>ベクトルサブフィールド</td><td><code translate="no">$[...]</code> のスカラー述語の入力としてはサポートされていません。代わりに、ベクトル検索を通じてベクトルサブフィールドを使用してください。</td></tr>
</tbody>
</table>
<p>JSONパス、配列コンテナ関数、テキスト一致関数、<code translate="no">$[...]</code> に対する null 述語、Geometry 関数、Timestamptz 式、およびジェネリック関数の呼び出しなど、サポートされていないケースについては、「<a href="/docs/ja/struct-array-operators.md">StructArray 演算子</a>」を参照してください。</p>
<h2 id="Common-mistakes" class="common-anchor-header">よくある間違い<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p><code translate="no">element_filter</code> や<code translate="no">MATCH_*</code> の外で<code translate="no">$[subfield]</code> を使用すること。</p></li>
<li><p><code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> などのStructArray演算子構文の代わりに<code translate="no">chunks.section</code> を使用すること。</p></li>
<li><p>行レベルのフィルタリングのみが必要な場合に `<code translate="no">element_filter</code> ` を使用すること。エンティティを選択するだけなら、代わりに `<code translate="no">MATCH_ANY</code> ` を使用してください。</p></li>
<li><p><code translate="no">MATCH_*</code> が要素のオフセットを返すことを期待しないこと。これらの演算子はエンティティを選択するものであり、それ自体では一致した要素を特定するものではありません。</p></li>
<li><p><code translate="no">$[has_code]</code> のような単純なブール述語を記述すること。<code translate="no">$[has_code] == true</code> のような明示的な比較を使用してください。</p></li>
<li><p>同じフィルタ式内で、<code translate="no">element_filter</code> をトップレベルの述語の前に配置すること。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">次の手順<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>StructArray フィルタの構文全体を確認するには、「<a href="/docs/ja/struct-array-operators.md">StructArray 演算子</a>」を参照してください。</p></li>
<li><p>まず、フィルタリングなしのベクトル検索を実行するには、「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a>」を参照してください。</p></li>
<li><p>頻繁に使用する StructArray フィルタ用のスカラーインデックスを作成するには、「<a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス作成</a>」を参照してください。</p></li>
<li><p>バージョンごとのフィルタおよび検索の制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArrayの制限</a>」を参照してください。</p></li>
</ol>
