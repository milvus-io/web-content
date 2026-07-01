---
id: range-search-with-structarray.md
title: StructArray を使用した範囲検索
summary: >-
  このページを使用して、StructArrayのベクトルサブフィールドに対して範囲検索を実行します。範囲検索では、スコアまたは距離が指定された範囲内に収まるベクトルヒットが返されます。StructArrayフィールドの場合、要素レベルのベクトル検索と組み合わせて範囲検索を使用します。この場合、各Struct要素が個別に検索されます。
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">StructArray を使用した範囲検索<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayのベクトルサブフィールドに対して範囲検索を実行します。範囲検索では、スコアまたは距離が指定された範囲内に収まるベクトルヒットが返されます。StructArrayフィールドの場合、要素レベルのベクトル検索と組み合わせて範囲検索を使用します。この場合、各Struct要素が個別に検索されます。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」の<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">chunks</code> という名前のStructArrayフィールドがあります。<code translate="no">chunks[emb]</code> ベクトルサブフィールドは、<code translate="no">COSINE</code> 、<code translate="no">IP</code> 、<code translate="no">L2</code> などの通常のベクトルメトリックを使用して、要素レベルの検索が行えるようインデックス化されています。</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">StructArray に対する範囲検索の適用方法<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>検索モード</th><th>範囲検索の動作</th><th>結果の粒度</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 検索</td><td>サポートされていません。</td><td>該当なし。</td></tr>
<tr><td>要素単位の検索</td><td><code translate="no">radius</code> および、必要に応じて<code translate="no">range_filter</code> を使用した通常のベクトルクエリを使用してください。</td><td>構造体要素レベル。</td></tr>
<tr><td>ハイブリッド検索</td><td>StructArray リクエストが要素レベルのベクトルフィールドを対象とする場合にサポートされます。EmbeddingList レベルのリクエストでは、範囲検索はサポートされていません。</td><td>要素レベルのサブ検索、その後ハイブリッド再ランク付け。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>最も近い Struct 要素のみが必要な場合は、<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本ベクトル検索</a>から始めてください。結果がトップ K ランキングだけでなく、スコアや距離の境界条件も満たす必要がある場合は、範囲検索を使用してください。</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">開始する前に<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>範囲検索を実行する前に、コレクション、データ、およびインデックスを準備してください。</p>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>StructArray フィールド</td><td>コレクションには、<code translate="no">chunks</code> などの StructArray フィールドが含まれています。</td></tr>
<tr><td>要素レベルのベクトルサブフィールド</td><td>対象のベクトルサブフィールドは<code translate="no">chunks[emb]</code> であり、<code translate="no">chunks[emb_list_vector]</code> ではありません。</td></tr>
<tr><td>インデックス指標</td><td>このベクトルサブフィールドは、<code translate="no">COSINE</code> 、<code translate="no">IP</code> 、または<code translate="no">L2</code> などの通常のベクトルメトリックでインデックス付けされています。</td></tr>
<tr><td>クエリデータ</td><td>クエリは、<code translate="no">EmbeddingList</code> ではなく、通常のベクトルです。</td></tr>
</tbody>
</table>
<p>インデックスの設定については、「<a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス</a>」を参照してください。</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">radius および range_filter の使用<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">radius</code> を設定して、検索範囲を定義します。内部境界も必要な場合は、<code translate="no">range_filter</code> を設定します。方向は、距離が短いほど良いか、類似度スコアが高いほど良いかによって異なります。</p>
<table>
<thead>
<tr><th>メトリックタイプ</th><th>スコアが高いほど良い？</th><th><code translate="no">range_filter</code> を使用する場合の範囲条件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>いいえ。距離が小さいほど良い。</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>,<code translate="no">COSINE</code></td><td>はい。スコアが大きいほど良い。</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p><code translate="no">radius</code> のみが設定されている場合、範囲検索では、メトリックの外側境界を満たすヒットが返されます。埋め込みのスコアまたは距離のスケールに応じて値を選択してください。</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">要素レベルの範囲検索を実行する<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、<code translate="no">chunks[emb]</code> ベクトルがクエリベクトルと十分に類似している個々のチャンクを検索します。各検索結果は、一致したStruct要素を表します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
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
<p>この例では、<code translate="no">COSINE</code> は類似度型のメトリックであるため、結果の範囲は<code translate="no">radius</code> より大きく、<code translate="no">range_filter</code> 以下となります。返される<code translate="no">offset</code> の値は、<code translate="no">chunks</code> 配列内の一致したStruct要素を識別します。</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">スカラーフィルタの追加<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>要素レベルの範囲検索と StructArray のスカラーフィルタリングを組み合わせることができます。親エンティティのフィールドにはトップレベルの述語を使用し、<code translate="no">element_filter</code> を使用して、ベクトル範囲検索の対象となる Struct 要素を制限します。</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<p>トップレベルの述語は候補エンティティを選択します。<code translate="no">element_filter</code> 述語は、ベクトル範囲検索を一致するStruct要素に限定します。フィルタリングのその他の例については、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArrayを使用したフィルタリング検索</a>」を参照してください。</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">ハイブリッド検索での範囲検索の使用<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArrayの要素レベルのベクトルフィールドは、ハイブリッド検索における範囲検索をサポートしています。StructArrayの要素レベルのベクトルフィールドを対象とする<code translate="no">AnnSearchRequest</code> に、<code translate="no">radius</code> を追加し、必要に応じて<code translate="no">range_filter</code> も追加します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、<code translate="no">chunks[emb]</code> サブリクエストのみが範囲検索パラメータを使用します。StructArray リクエストは依然として要素レベルのセマンティクスに従います。つまり、範囲の境界は、ハイブリッド検索が結果を結合して再ランク付けを行う前に、Struct 要素のヒットに対して適用されます。</p>
<h2 id="Interpret-range-results" class="common-anchor-header">範囲検索結果の解釈<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><th>結果項目</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>一致した Struct 要素を含むエンティティのプライマリキー。</td></tr>
<tr><td><code translate="no">distance</code> またはスコア</td><td>クエリベクトルと一致したStruct要素のベクトルとの間のスコアまたは距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>返される際、StructArrayフィールド内での一致したStruct要素の0を基点とする位置。</td></tr>
<tr><td>重複する主キー</td><td>あり得ます。同じエンティティ内の複数の Struct 要素が、指定された範囲内に収まる場合があります。</td></tr>
<tr><td><code translate="no">limit</code></td><td>これは要素のヒットに適用され、一意の親エンティティには適用されません。</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">制限事項<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>StructArray ベクトルサブフィールドの範囲検索には、<code translate="no">EmbeddingList</code> クエリや<code translate="no">MAX_SIM*</code> メトリックを使用しないでください。EmbeddingList レベルの検索では、範囲検索はサポートされていません。</p></li>
<li><p>範囲検索とグループ化検索を組み合わせて使用しないでください。親エンティティごとに 1 つの結果が必要な場合は、範囲パラメータを指定せずに要素レベルの検索を実行し、サポートされている場合はグループ化を使用してください。</p></li>
<li><p>StructArrayの要素レベルのベクトルフィールドでは、ハイブリッド範囲検索がサポートされています。EmbeddingListレベルのStructArrayリクエストではサポートされていません。</p></li>
</ul>
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
<li><p><code translate="no">chunks[emb_list_vector]</code> に対して範囲検索を実行すること。これは EmbeddingList 検索を目的としたものです。</p></li>
<li><p>要素レベルの範囲検索において、<code translate="no">COSINE</code> などの通常のメトリックの代わりに<code translate="no">MAX_SIM_COSINE</code> を使用すること。</p></li>
<li><p>通常のベクトルクエリの代わりに<code translate="no">EmbeddingList</code> クエリを使用すること。</p></li>
<li><p>範囲検索の結果が親エンティティごとに一意であると想定している。範囲検索では、一致する Struct 要素のヒットが返されます。</p></li>
<li><p>必須のサブフィールドパス構文 `<code translate="no">chunks[emb]</code>` の代わりに `<code translate="no">chunks.emb</code> ` を使用している。</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">次のステップ<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>StructArray の 2 つの基本的なベクトル検索モードについて学ぶには、「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a>」を参照してください。</p></li>
<li><p>範囲検索にスカラーフィルターを追加するには、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルター検索</a>」を参照してください。</p></li>
<li><p>サポートされている場合、親エンティティごとに最大 1 件の結果を返すには、「<a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a>」を参照してください。</p></li>
<li><p>バージョンごとの検索制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArray の制限</a>」を参照してください。</p></li>
</ol>
