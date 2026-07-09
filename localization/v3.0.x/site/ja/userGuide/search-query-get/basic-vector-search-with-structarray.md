---
id: basic-vector-search-with-structarray.md
title: StructArray を使用した基本的なベクトル検索
summary: >-
  このページでは、StructArrayフィールド内のベクトルサブフィールドに対してベクトル検索を実行できます。StructArrayでは、2つの基本的なベクトル検索モードがサポートされています。1つは、各エンティティに格納された埋め込みリストに対してスコアを算出する「EmbeddingList検索」、もう1つは、各Struct要素を個別に検索する「要素レベル検索」です。
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">StructArray を使用した基本的なベクトル検索<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、StructArrayフィールド内のベクトルサブフィールドに対してベクトル検索を実行できます。StructArrayは、各エンティティに格納された埋め込みリストを評価する「EmbeddingList検索」と、各Struct要素を個別に検索する「要素レベル検索」という2つの基本的なベクトル検索モードをサポートしています。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a>」にある<code translate="no">tech_articles</code> コレクションを使用しています。このコレクションには、<code translate="no">chunks</code> という名前のStructArrayフィールドが含まれています。各チャンクには、テキスト、スカラーメタデータ、EmbeddingList検索用のインデックスを持つ<code translate="no">emb_list_vector</code> という名前のベクトルサブフィールド、および要素レベル検索用のインデックスを持つ<code translate="no">emb</code> という名前のベクトルサブフィールドが含まれています。</p>
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
    </button></h2><p>コレクションのスキーマ、データ、およびインデックスがすでに準備されていることを確認してください。</p>
<table>
<thead>
<tr><th>要件</th><th>準備場所</th></tr>
</thead>
<tbody>
<tr><td>開始する前に<code translate="no">chunks</code> などの StructArray フィールドを作成してください。</td><td><a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a></td></tr>
<tr><td><code translate="no">chunks</code> フィールドにStructオブジェクトが含まれるエンティティを挿入します。</td><td><a href="/docs/ja/insert-data-into-structarray-fields.md">StructArrayフィールドへのデータの挿入</a></td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code> に対して、EmbeddingList 検索用の<code translate="no">MAX_SIM*</code> インデックスを作成します。</td><td><a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス作成</a></td></tr>
<tr><td>要素レベルの検索用に、<code translate="no">chunks[emb]</code> に対して通常のベクトルメトリックインデックスを作成します。</td><td><a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドのインデックス作成</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>ベクトルフィールドまたはベクトルサブフィールドには、1 つのインデックスのみ設定できます。EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを作成してください。このページでは、<code translate="no">chunks[emb_list_vector]</code> は EmbeddingList 検索用に、<code translate="no">chunks[emb]</code> は要素レベルの検索用にインデックスが作成されています。</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">検索モードの選択<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>アスペクト</th><th>EmbeddingList検索</th><th>要素レベル検索</th></tr>
</thead>
<tbody>
<tr><td>対象サブフィールド</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>クエリデータ</td><td>1つ以上のベクトルを含む埋め込みリスト。</td><td>通常のベクトル。</td></tr>
<tr><td>メトリックファミリー</td><td><code translate="no">MAX_SIM*</code>（例：<code translate="no">MAX_SIM_COSINE</code> ）。</td><td><code translate="no">COSINE</code> 、<code translate="no">IP</code> 、<code translate="no">L2</code> などの通常のベクトルメトリック。</td></tr>
<tr><td>1つのヒットが表すもの</td><td>StructArray ベクトルサブフィールドがクエリの埋め込みリストと類似している、一致したエンティティ。</td><td>StructArray フィールド内の、一致した Struct 要素。</td></tr>
<tr><td>結果の粒度</td><td>エンティティレベル。</td><td>Struct 要素レベル。</td></tr>
<tr><td>オフセット</td><td>該当なし。</td><td>返される際、一致した構造体要素の 0 を基点とする位置を識別します。</td></tr>
<tr><td>一般的な使用例</td><td>ColBERT、ColPali、およびその他の後期相互作用型検索パターン。</td><td>チャンクレベル、パッセージレベル、クリップレベル、パッチレベル、またはファクトレベルの検索。</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">EmbeddingList 検索の実行<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>クエリ自体に複数のベクトルが含まれており、対象の StructArray ベクトルのサブフィールドが<code translate="no">MAX_SIM*</code> メトリックでインデックス付けされている場合は、EmbeddingList 検索を使用します。結果はエンティティレベルの一致となります。</p>
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
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>この検索モードでは、<code translate="no">limit</code> が各クエリに対して返されるエンティティの数を制御します。出力にはStructArrayのサブフィールドが含まれる場合がありますが、ヒット自体は特定のStruct要素ではなく、一致した親エンティティを表します。</p>
<div class="alert note">
<p>ColBERTやColPaliの完全な解説については、「<a href="/docs/ja/search-with-embedding-lists.md">埋め込みリストを使用した検索」を</a>参照してください。このページでは、StructArrayの基本的な検索動作についてのみ説明します。</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">要素レベルの検索を実行する<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>各Struct要素が個別にベクトル検索の対象となる場合は、要素レベルの検索を使用します。クエリは通常のベクトルであり、対象となるベクトルサブフィールドには通常のベクトルメトリックによるインデックスが付けられている必要があります。</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>要素レベル検索では、各ヒットは一致したStruct要素を表します。<code translate="no">offset</code> の値は、StructArrayフィールド内におけるその要素の0を基点とする位置です。クエリに一致するStruct要素が複数ある場合、同じエンティティが複数回出現する可能性があります。<code translate="no">limit</code> の値は、一意の親エンティティではなく、要素のヒットに適用されます。</p>
<h2 id="Interpret-results" class="common-anchor-header">結果の解釈<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>結果項目</th><th>EmbeddingList検索</th><th>要素レベルの検索</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>一致したエンティティの主キー。</td><td>一致した Struct 要素を含むエンティティの主キー。</td></tr>
<tr><td><code translate="no">distance</code> またはスコア</td><td>クエリの埋め込みリストと保存済みの埋め込みリストとの間のスコアまたは距離。</td><td>クエリベクトルと一致した Struct 要素のベクトルとの間のスコアまたは距離。</td></tr>
<tr><td><code translate="no">offset</code></td><td>該当なし。</td><td>返される際の一致した Struct 要素の 0 を基点とする位置。</td></tr>
<tr><td>重複する主キー</td><td>結果はエンティティレベルであるため、単一のクエリでは発生しないことが予想されます。</td><td>同じエンティティ内の複数の Struct 要素が一致する可能性があるため、発生する可能性があります。</td></tr>
<tr><td>要求された StructArray 出力フィールド</td><td>一致したエンティティから返されます。</td><td>ターゲット API および SDK がサポートする要素レベルのヒットシェイプで返されます。</td></tr>
</tbody>
</table>
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
<li><p>必要なサブフィールドパス構文<code translate="no">chunks[emb]</code> の代わりに、<code translate="no">chunks.emb</code> を使用してしまう。</p></li>
<li><p>通常のベクトルメトリックでインデックス付けされたベクトルサブフィールドに対して、EmbeddingList クエリを使用すること。</p></li>
<li><p><code translate="no">MAX_SIM*</code> メトリックでインデックス化されたベクトルサブフィールドに対して、通常のベクトルクエリを使用すること。</p></li>
<li><p>要素レベルの検索（<code translate="no">limit</code> ）が、その数だけの一意な親エンティティを返すことを期待している。実際には、要素レベルのヒットが返されます。</p></li>
<li><p>EmbeddingList検索が特定の要素オフセットを1つ返すことを期待している。しかし、エンティティレベルの一致が返される。</p></li>
<li><p>1つのベクトルサブフィールドを両方の検索モードで再利用している。各ベクトルサブフィールドは1つのインデックスのみを受け入れるため、別々のベクトルサブフィールドを使用する。</p></li>
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
<li><p>スカラー条件による要素レベルの検索を制限するには、「<a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタリング検索</a>」を参照してください。</p></li>
<li><p>スコアまたは距離の境界による検索については、「<a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a>」を参照してください。</p></li>
<li><p>要素レベルの検索後、親エンティティごとに最大1つの結果を返すには、「<a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a>」を参照してください。</p></li>
<li><p>StructArray 検索を他のベクトル検索と組み合わせるには、「<a href="/docs/ja/hybrid-search-with-structarray.md">StructArray を使用したハイブリッド検索</a>」を参照してください。</p></li>
<li><p>サポートされているデータ型、メトリック、フィルター、およびバージョン固有の制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArrayの制限</a>」を参照してください。</p></li>
</ol>
