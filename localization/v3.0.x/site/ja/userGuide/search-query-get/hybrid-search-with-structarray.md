---
id: hybrid-search-with-structarray.md
title: StructArray を使用したハイブリッド検索
summary: >-
  このページを使用すると、StructArray
  ベクトル検索と他のベクトル検索を組み合わせて、1つのハイブリッド検索リクエストとして実行できます。StructArray ハイブリッド検索では、組み合わせる
  AnnSearchRequest オブジェクトに応じて、エンティティレベルの結果または要素レベルの結果が得られます。
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">StructArray を使用したハイブリッド検索<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayベクトル検索と他のベクトル検索を組み合わせて、1つのハイブリッド検索リクエストとして実行できます。StructArrayハイブリッド検索では、組み合わせる<code translate="no">AnnSearchRequest</code> オブジェクトに応じて、エンティティレベルの結果または要素レベルの結果が得られます。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」の<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">title_vector</code> という名前の最上位ベクトルフィールドと、<code translate="no">chunks</code> という名前のStructArrayフィールドがあります。<code translate="no">chunks[emb_list_vector]</code> サブフィールドはEmbeddingList検索用にインデックス化されており、<code translate="no">chunks[emb]</code> は要素レベル検索用にインデックス化されています。</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">StructArray に対するハイブリッド検索の適用方法<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> 組み合わせ</th><th>最終的な候補スコープ</th><th>結果の挙動</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>コレクションレベルのベクトルフィールド + StructArrayのEmbeddingListサブフィールド</td><td>エンティティレベル</td><td>最終候補は主キーでキー付けされます。</td><td>使用しないでください。</td></tr>
<tr><td>コレクションレベルのベクトルフィールド + StructArray 要素レベルのサブフィールド</td><td>エンティティレベル</td><td>要素レベルのヒットは、ハイブリッド再ランク付けの前にエンティティレベルの候補に集約されます。</td><td>StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> に対するオプションの折りたたみ設定。</td></tr>
<tr><td>同じ StructArray フィールドの下にある複数の要素レベルのサブフィールド</td><td>要素レベル</td><td>最終候補は、主キーと Struct 要素のオフセットを組み合わせたキーで指定されます。</td><td>使用しないでください。</td></tr>
<tr><td>異なる StructArray フィールドの下にある要素レベルのサブフィールド</td><td>エンティティレベル</td><td>要素オフセットは識別子を共有しないため、再ランク付けの前に、各 StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> が折りたたまれます。</td><td>各 StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> に対するオプションの折りたたみ設定。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p><code translate="no">element_scope</code> は、異なる構造体（non-same-struct）の要素レベルのハイブリッド検索において、StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> オブジェクトの折りたたみを設定する場合にのみ使用してください。EmbeddingList リクエスト、コレクションレベルのベクトルリクエスト、または同一 StructArray 要素レベルのハイブリッド検索には使用しないでください。</p>
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
    </button></h2><p>ハイブリッド検索を実行する前に、コレクション、データ、およびインデックスを準備してください。</p>
<table>
<thead>
<tr><th>要件</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td>StructArray フィールド</td><td>コレクションには、<code translate="no">chunks</code> などの StructArray フィールドが含まれています。</td></tr>
<tr><td>ベクトルサブフィールド</td><td>EmbeddingList 検索と要素レベルの検索には、それぞれ個別のベクトルサブフィールドを使用してください。</td></tr>
<tr><td>インデックス</td><td><code translate="no">chunks[emb_list_vector]</code> は、<code translate="no">MAX_SIM*</code> メトリックを使用します。<code translate="no">chunks[emb]</code> は、<code translate="no">COSINE</code> 、<code translate="no">IP</code> 、または<code translate="no">L2</code> などの通常のベクトルメトリックを使用します。</td></tr>
<tr><td>再ランク付けアルゴリズム</td><td><code translate="no">RRFRanker</code> などのハイブリッド・リランカー、またはお使いのアプリケーションでサポートされている他のリランカーを選択してください。</td></tr>
</tbody>
</table>
<p>インデックスの設定については、「<a href="/docs/ja/index-structarray-fields.md">Index StructArray Fields</a>」を参照してください。</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">EmbeddingList リクエストを使用したハイブリッド検索の実行<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索において、StructArray ベクトルサブフィールドに対する EmbeddingList 検索はエンティティレベルで行われます。これはエンティティレベルのベクトル検索リクエストと同様に動作し、一致した Struct 要素のオフセットを 1 つ返すことはありません。</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、両方の<code translate="no">AnnSearchRequest</code> オブジェクトがエンティティレベルの候補を生成します。最終結果は、親エンティティのプライマリキーをキーとして返されます。EmbeddingListリクエストに<code translate="no">element_scope</code> を追加しないでください。</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">同一StructArrayの要素レベルハイブリッド検索を実行する<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>すべての<code translate="no">AnnSearchRequest</code> オブジェクトが、同じStructArrayフィールドの下にある要素レベルのベクトルサブフィールドを対象としている場合、ハイブリッド検索では再ランク付けを通じて要素レベルの候補を維持できます。これは、最終結果が要素レベルのままとなる唯一のStructArrayハイブリッドモードです。</p>
<p>次の例では、<code translate="no">chunks</code> のStructArrayフィールドに、<code translate="no">chunks[emb]</code> と<code translate="no">chunks[code_emb]</code> という2つの要素レベルのベクトルサブフィールドがあり、両方が通常のベクトルメトリックを使用していることを想定しています。</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>両方の<code translate="no">AnnSearchRequest</code> オブジェクトは、<code translate="no">chunks</code> 配下のベクトルサブフィールドを検索します。同じ0を基点とするオフセットは同じStruct要素を指すため、ハイブリッド再ランク付け機能は要素候補を直接ランク付けできます。このモードではエンティティレベルの集約が行われないため、<code translate="no">element_scope</code> を設定しないでください。</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">エンティティレベルのハイブリッド検索における要素レベルのヒットの集約<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>ハイブリッド検索において、StructArrayの要素レベルの<code translate="no">AnnSearchRequest</code> が、コレクションレベルのベクトルリクエスト、EmbeddingListリクエスト、または別のStructArrayフィールド下の要素レベルのリクエストと組み合わされる場合、最終的な候補の範囲はエンティティレベルとなります。この場合、ハイブリッド再ランク付けの前に、各StructArray要素レベルの<code translate="no">AnnSearchRequest</code> はエンティティレベルの候補に集約されます。</p>
<p>同一エンティティからの複数の一致要素をどのように集約するかを制御する必要がある場合は、StructArray要素レベルの<code translate="no">AnnSearchRequest</code> の<code translate="no">params</code> 内で<code translate="no">element_scope</code> を使用してください。</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>この例では、<code translate="no">title_req</code> はエンティティレベルであるため、最終的なハイブリッド結果もエンティティレベルになります。<code translate="no">chunk_req</code> リクエストは、まず<code translate="no">chunks[emb]</code> から要素ヒットを返し、次に同じエンティティからの返された要素を、上位3つの要素スコアの合計を算出することで集約します。エンティティレベルの集約が必要な場合に<code translate="no">element_scope</code> が省略されると、集約戦略はデフォルトで<code translate="no">max</code> になります。</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">集約戦略の選択<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>戦略</th><th>動作</th><th><code translate="no">topk</code></th><th>メトリックの要件</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>そのエンティティに対して、返された要素のうち最高のスコアを保持します。</td><td>使用不可。</td><td>サポートされている任意の正規ベクトルメトリック。</td></tr>
<tr><td><code translate="no">sum</code></td><td>そのエンティティに対して返されたすべての要素のスコアを合計する。</td><td>使用不可。サポートされている任意の通常のベクトルメトリック。そのエンティティに対して返されたすべての要素のスコアを合計する。</td><td><code translate="no">IP</code> や<code translate="no">COSINE</code> など、正の相関を持つメトリクスのみ。</td></tr>
<tr><td><code translate="no">avg</code></td><td>そのエンティティについて、返されたすべての要素スコアの平均を算出します。</td><td>使用不可。</td><td>サポートされている任意の正規ベクトルメトリック。</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>そのエンティティに対して返された要素スコアのうち、<code translate="no">K</code> で算出された最高スコアを合計します。</td><td>必須であり、正の値でなければなりません。</td><td><code translate="no">IP</code> や<code translate="no">COSINE</code> など、正の相関を持つメトリクスのみ。</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>そのエンティティに対して返された<code translate="no">K</code> の要素スコアのうち、最高値の平均を算出します。</td><td>必須であり、正の値でなければなりません。xml-ph-0000@deepl.internal や xml-ph-0001@deepl.internal など、正の相関メトリクスのみ。そのエンティティに対して返された xml-ph-0000@deepl.internal の要素スコアのうち、最高のものの平均を算出します。</td><td>サポートされている任意の正規ベクトルメトリック。</td></tr>
</tbody>
</table>
<p>Collapse は、その StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> によって返された要素ヒットのみを使用します。ANN 検索の後、エンティティ内のすべての Struct 要素をスキャンすることはありません。Collapse で利用可能な要素を確保できるよう、リクエストの<code translate="no">limit</code> を十分に高い値に設定してください。</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">フィルタ、範囲検索、およびグループ化の追加<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">AnnSearchRequest</code> スカラー条件を、ベクトル検索に参加する同じStruct要素に適用する必要がある場合は、StructArray要素レベルの<code translate="no">element_filter</code> に を添付できます。また、親エンティティの条件については、<code translate="no">hybrid_search()</code> に対してトップレベルの<code translate="no">filter</code> を使用することもできます。</p>
<p>StructArrayの要素レベルのベクトルフィールドは、ハイブリッド検索における範囲検索をサポートしています。要素レベルの<code translate="no">AnnSearchRequest</code> に<code translate="no">radius</code> を追加し、必要に応じて<code translate="no">range_filter</code> を追加します。EmbeddingListレベルのStructArrayリクエストは範囲検索をサポートしていません。</p>
<p>要素レベルのハイブリッドグループ化は、すべての<code translate="no">AnnSearchRequest</code> オブジェクトが同じStructArrayフィールド下の要素レベルのベクトルフィールドを対象としている場合にのみサポートされ、<code translate="no">group_by_field</code> は主キーでなければなりません。リクエストにコレクションレベルのベクトルフィールド、異なるStructArrayフィールド、またはEmbeddingListレベルのリクエストが混在している場合、ハイブリッドグループ化はサポートされません。範囲検索とグループ化を組み合わせて使用しないでください。</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">ハイブリッド結果の解釈<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>最終候補範囲</th><th>結果キー</th><th>オフセットの挙動</th><th>発生条件</th></tr>
</thead>
<tbody>
<tr><td>エンティティレベル</td><td>主キー。</td><td>最終結果に要素オフセットは含まれません。</td><td>ハイブリッドリクエストには、コレクションレベルのベクトルフィールド、EmbeddingList リクエスト、または異なる StructArray フィールドの下にある要素レベルのリクエストが含まれています。</td></tr>
<tr><td>要素レベル</td><td>主キー、親の StructArray フィールド、および要素オフセット。</td><td>選択された要素オフセットは、API または SDK によって公開されている場合、返されることがあります。</td><td>すべての<code translate="no">AnnSearchRequest</code> オブジェクトは要素レベルであり、同じStructArrayフィールドの下にあります。</td></tr>
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
<li><p><code translate="no">element_scope</code> は、ハイブリッド検索においてエンティティレベルの候補に折りたたまれる必要がある、StructArray 要素レベルの<code translate="no">AnnSearchRequest</code> オブジェクトにのみ使用してください。</p></li>
<li><p>EmbeddingList リクエスト、コレクションレベルのベクトルリクエスト、または同じ StructArray 要素レベルのハイブリッド検索には、<code translate="no">element_scope</code> を使用しないでください。</p></li>
<li><p><code translate="no">sum</code> および<code translate="no">topk_sum</code> の折りたたみ戦略では、<code translate="no">IP</code> や<code translate="no">COSINE</code> などの正の相関メトリクスが必要です。<code translate="no">L2</code> と一緒に使用しないでください。</p></li>
<li><p><code translate="no">topk_sum</code> また、<code translate="no">topk_avg</code> には、正の<code translate="no">topk</code> 値が必要です。その他の折りたたみ戦略には、<code translate="no">topk</code> を含めてはなりません。</p></li>
<li><p>EmbeddingList レベルの StructArray リクエストは、範囲検索やグループ化をサポートしていません。</p></li>
<li><p>ハイブリッドグループ化は、同じ StructArray 要素レベルのハイブリッド検索においてのみ、かつ主キーによる場合のみサポートされます。</p></li>
<li><p>範囲検索とグループ化を組み合わせて使用しないでください。</p></li>
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
<li><p>同じ StructArray 要素レベルのハイブリッドリクエストに<code translate="no">element_scope</code> を追加すること。そのリクエストは要素レベルのままとなり、エンティティレベルの折りたたみは実行されません。</p></li>
<li><p><code translate="no">chunks[emb_list_vector]</code> に<code translate="no">element_scope</code> を追加すること。EmbeddingList 検索はすでにエンティティレベルです。</p></li>
<li><p>2つのStructArrayフィールドが要素オフセットを共有していると仮定すること。「<code translate="no">chunks</code> 」内のオフセット<code translate="no">3</code> と、別のStructArrayフィールド内のオフセット<code translate="no">3</code> は異なる要素であるため、ハイブリッドリクエストはエンティティレベルになります。</p></li>
<li><p><code translate="no">topk_sum</code> を<code translate="no">L2</code> と併用します。負の距離メトリックについては、<code translate="no">max</code> 、<code translate="no">avg</code> 、または<code translate="no">topk_avg</code> を使用してください。</p></li>
<li><p>エンティティレベルのハイブリッド検索結果には、折りたたみ後に選択された Struct 要素のオフセットが含まれることが期待されます。</p></li>
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
<li><p>StructArray による 2 つの基本的なベクトル検索モードについては、「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a>」を参照してください。</p></li>
<li><p>ハイブリッド検索にスカラーフィルタを追加するには、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタ付き検索</a>」を参照してください。</p></li>
<li><p>ハイブリッド検索でスコアまたは距離の境界を使用するには、「<a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a>」を参照してください。</p></li>
<li><p>要素レベルのハイブリッド検索結果を親エンティティごとにグループ化するには、「<a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a>」を参照してください。</p></li>
<li><p>StructArrayの検索制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArrayの制限</a>」を参照してください。</p></li>
</ol>
