---
id: grouping-search-with-structarray.md
title: StructArray を使用した検索結果のグループ化
summary: >-
  このページでは、StructArrayの要素レベルの検索結果を親エンティティごとにグループ化できます。要素レベルの検索では、複数のStruct要素がクエリに一致する場合、同じエンティティから複数の検索結果が返されることがあります。グループ化を行うと、それらの要素の検索結果がまとめられるため、各親エンティティは最大1回だけ表示されます。
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">StructArray を使用した検索結果のグループ化<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayの要素レベルの検索結果を親エンティティごとにグループ化します。要素レベルの検索では、複数のStruct要素がクエリに一致する場合、同じエンティティから複数のヒットが返されることがあります。グループ化を行うと、これらの要素ヒットがまとめられ、各親エンティティが最大1回だけ表示されるようになります。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」の<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">chunks</code> という名前のStructArrayフィールドがあります。<code translate="no">chunks[emb]</code> ベクトルサブフィールドは、通常のベクトルメトリックを使用して要素レベルの検索がインデックス化されています。</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">StructArray に対するグループ化の適用方法<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>検索モード</th><th>グループ化の動作</th><th>結果の挙動</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList検索</td><td>サポートされていません。</td><td>該当なし。</td></tr>
<tr><td>要素レベルの検索</td><td>主キーによるグループ化によりサポートされます。</td><td>親エンティティごとに最大 1 件の結果が返されます。要素レベルのメタデータは保持されるため、API または SDK によって公開される場合、選択された要素のインデックスまたはオフセットが返されます。</td></tr>
<tr><td>ハイブリッド検索</td><td>すべてのサブ検索が、同じ StructArray フィールドの下にある要素レベルのベクトルフィールドを対象としている場合にのみサポートされます。</td><td>要素レベルのサブ検索は、最終的な結果の処理の前に主キーによってグループ化されます。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>グループ化されていない要素レベルの検索で重複する親エンティティが多数返される場合は、グループ化を使用してください。一致するすべての Struct 要素を個別のヒットとして取得したい場合は、<code translate="no">group_by_field</code> を使用せずに<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本ベクトル検索</a>を使用してください。</p>
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
    </button></h2><p>グループ化検索を実行する前に、コレクション、データ、およびインデックスを準備してください。</p>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>要素レベルのベクトルサブフィールド</td><td><code translate="no">chunks[emb]</code> などの StructArray ベクトルサブフィールドを使用し、通常のベクトルメトリックでインデックス付けしてください。</td></tr>
<tr><td>通常のベクトルクエリ</td><td><code translate="no">EmbeddingList</code> ではなく、通常のクエリベクトルを使用してください。</td></tr>
<tr><td>主キーによるグループ化</td><td>コレクションの主キーを<code translate="no">group_by_field</code> として使用します（例：<code translate="no">doc_id</code> ）。</td></tr>
<tr><td>範囲パラメータは使用しない</td><td>グループ化検索を、<code translate="no">radius</code> や<code translate="no">range_filter</code> などの範囲検索パラメータと組み合わせて使用しないでください。</td></tr>
</tbody>
</table>
<p>インデックスの設定については、「<a href="/docs/ja/index-structarray-fields.md">StructArray フィールドのインデックス</a>」を参照してください。</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">グループ化された要素レベルの検索を実行する<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、まず個々のチャンクを検索し、その後、親エンティティのプライマリキーに基づいてヒットした要素をグループ化します。</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>グループ化を行わない場合、複数のチャンクがクエリに一致すると、同じ `<code translate="no">doc_id</code> ` が複数回表示される可能性があります。`<code translate="no">group_by_field=&quot;doc_id&quot;</code>` を使用すると、各親エンティティは最大 1 回だけ表示されます。グループ化によって要素レベルのメタデータが保持されるため、API または SDK が公開している場合、グループ化された結果には、選択された Struct 要素のインデックスまたはオフセットが引き続き含まれることがあります。</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">スカラーフィルターの追加<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>グループ化検索と StructArray のスカラーフィルタリングを組み合わせることができます。スカラー条件によって、要素レベルのベクトル検索に参加する Struct 要素を制限する必要がある場合は、<code translate="no">element_filter</code> を使用します。</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>最上位の述語は候補エンティティを選択します。<code translate="no">element_filter</code> 述語は、要素レベルのベクトル検索を一致するStruct要素に限定します。その後、グループ化によって、一致した要素のヒットが主キーごとに集約されます。</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">ハイブリッド検索でのグループ化の使用<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray を使用したハイブリッドグループ化は、要素レベルの機能です。これは、すべてのサブ検索が、同じ StructArray フィールドの下にある要素レベルのベクトルフィールドを対象としている場合にのみサポートされます。グループ化された StructArray ハイブリッド検索では、EmbeddingList レベルのリクエストを使用しないでください。</p>
<p>次の例では、<code translate="no">chunks</code> というStructArrayフィールドに、<code translate="no">chunks[emb]</code> と<code translate="no">chunks[code_emb]</code> という2つの要素レベルのベクトルサブフィールドがあり、両方が通常のベクトルメトリックでインデックス化されていることを前提としています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、両方のサブリクエストが、同じ StructArray フィールド（<code translate="no">chunks</code> ）の下にある要素レベルのベクトルフィールドを対象としています。ハイブリッド検索では、通常のベクトルフィールド、異なる StructArray フィールド、または EmbeddingList レベルのリクエストが混在している場合、要素レベルのグループ化はサポートされません。</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">グループ化された結果の解釈<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>グループ化された親エンティティのプライマリキー。</td></tr>
<tr><td><code translate="no">distance</code> またはスコア</td><td>その親エンティティに対して選択されたStruct要素のスコアまたは距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>返される際の、選択されたStruct要素の0を基点とする位置。</td></tr>
<tr><td>重複する主キー</td><td>主キーによるグループ化では発生しない。</td></tr>
<tr><td><code translate="no">limit</code></td><td>グループ化された親エンティティの結果に適用されます。</td></tr>
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
<li><p>グループ化検索は、要素レベルの StructArray ベクトル検索にのみ適用されます。EmbeddingList 検索および EmbeddingList レベルのハイブリッド検索では、グループ化はサポートされていません。</p></li>
<li><p>主キーを `<code translate="no">group_by_field</code>` として使用してください。StructArray の要素レベルのグループ化は、任意のスカラーフィールドに対する汎用的なグループ化ではありません。</p></li>
<li><p>グループ化検索を範囲検索と組み合わせないでください。</p></li>
<li><p>グループ化検索には、<code translate="no">EmbeddingList</code> クエリや<code translate="no">MAX_SIM*</code> メトリックを使用しないでください。</p></li>
<li><p>ハイブリッドグループ化は、すべてのサブ検索が、同じ StructArray フィールドの下にある要素レベルのベクトルフィールドを対象としている場合にのみサポートされます。</p></li>
<li><p>ハイブリッド検索で、通常のベクトルフィールド、別の StructArray フィールド、または EmbeddingList レベルのリクエストが混在している場合、ハイブリッドグループ化はサポートされません。</p></li>
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
<li><p><code translate="no">chunks[emb_list_vector]</code> でのグループ化の使用。これは EmbeddingList 検索を目的としています。</p></li>
<li><p>主キー以外のスカラーフィールドによるグループ化。</p></li>
<li><p>複数のフィールドによるグループ化。要素レベルの StructArray グループ化では、主キーによるグループ化のみがサポートされています。</p></li>
<li><p>グループ化された結果が、一致したすべての Struct 要素を表すものと期待すること。グループ化では、親エンティティごとに最大 1 つの結果が返されます。</p></li>
<li><p>グループ化された要素レベルの検索によって、EmbeddingList形式の<code translate="no">MAX_SIM*</code> スコアが再計算されると想定すること。グループ化は要素レベルのヒットを統合するものであり、スコアリングモデルを変更するものではありません。</p></li>
<li><p><code translate="no">group_by_field</code> と<code translate="no">radius</code> または<code translate="no">range_filter</code> の組み合わせ。</p></li>
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
<li><p>まず、グループ化されていない要素レベルの検索について学ぶには、「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a>」を参照してください。</p></li>
<li><p>グループ化された検索にスカラーフィルタを追加するには、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタ付き検索</a>」を参照してください。</p></li>
<li><p>グループ化の代わりにスコアまたは距離の境界を使用するには、「<a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a>」を参照してください。</p></li>
<li><p>StructArray の検索制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArray の制限</a>」を参照してください。</p></li>
</ol>
