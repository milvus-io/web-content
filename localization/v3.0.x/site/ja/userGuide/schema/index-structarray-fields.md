---
id: index-structarray-fields.md
title: StructArray フィールドのインデックス作成
summary: >-
  ベクトル検索を実行したり、スカラーフィルタリングを高速化したりする前に、StructArrayのサブフィールドにインデックスを作成してください。StructArrayフィールドの場合、インデックスの対象となるのは、chunks[emb_list_vector]、chunks[emb]、chunks[section]
  などのサブフィールドパスです。
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">StructArray フィールドのインデックス作成<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>ベクトル検索を実行したり、スカラーフィルタリングを高速化したりする前に、StructArray のサブフィールドにインデックスを作成してください。StructArray フィールドの場合、インデックスのターゲットは、<code translate="no">chunks[emb_list_vector]</code> 、<code translate="no">chunks[emb]</code> 、<code translate="no">chunks[section]</code> などのサブフィールドパスになります。</p>
<p>このページでは、「<a href="/docs/ja/create-structarray-field.md">StructArray フィールドの作成</a>」の<code translate="no">tech_articles</code> コレクションを使用しています。<code translate="no">chunks</code> StructArray フィールドには、フィルタリング用のスカラーサブフィールドと、検索用のベクトルサブフィールドが含まれています。</p>
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
    </button></h2><p>コレクションスキーマに「<code translate="no">chunks</code> 」StructArrayフィールドがすでに含まれており、データが挿入されていることを確認してください。</p>
<table>
<thead>
<tr><th>サブフィールドのパス</th><th>タイプ</th><th>インデックスの目的</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">MAX_SIM*</code> メトリクスを使用した EmbeddingList 検索。</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>通常のベクトルメトリックを使用した要素レベルの検索。</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>カテゴリフィルタリング。</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>数値フィルタリングおよび範囲指定型の述語。</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>ブールフィルタリング。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>ベクトルフィールドまたはベクトルサブフィールドは、1 つのインデックスのみを受け入れます。EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを作成し、それぞれ個別にインデックスを作成してください。このページでは、<code translate="no">chunks[emb_list_vector]</code> は EmbeddingList 検索用に、<code translate="no">chunks[emb]</code> は要素レベルの検索用にインデックスが作成されています。</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">インデックスの選択<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>検索モードを使用して、ベクトルメトリックファミリーを選択します。</p>
<table>
<thead>
<tr><th>検索またはフィルタリングの目的</th><th>ターゲットパス</th><th>選択項目</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingListの検索</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">MAX_SIM*</code> メトリックファミリー。</td></tr>
<tr><td>要素レベルのベクトル検索</td><td><code translate="no">chunks[emb]</code></td><td><code translate="no">COSINE</code> 、<code translate="no">IP</code> 、<code translate="no">L2</code> などの通常のベクトルメトリックファミリー。</td></tr>
<tr><td>文字列またはカテゴリによるフィルタリング</td><td><code translate="no">chunks[section]</code></td><td>ターゲットでサポートされているスカラーインデックス。</td></tr>
<tr><td>数値範囲によるフィルタリング</td><td><code translate="no">chunks[quality_score]</code>、<code translate="no">chunks[page]</code></td><td>ターゲットでサポートされているスカラーインデックス。</td></tr>
<tr><td>ブール値によるフィルタリング</td><td><code translate="no">chunks[has_code]</code></td><td>ターゲットでサポートされているスカラーインデックス。</td></tr>
</tbody>
</table>
<p>EmbeddingList 検索は、StructArray のベクトルサブフィールド内のベクトルを埋め込みリストとして扱い、エンティティレベルの結果を返します。要素レベルの検索は、各 Struct 要素を個別に検索し、一致した要素のオフセットを返すことができます。</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">ベクトルインデックスの作成<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、2つのベクトルインデックスを作成します。1つ目のインデックスは、EmbeddingList検索用に<code translate="no">MAX_SIM*</code> メトリックを使用します。2つ目のインデックスは、要素レベル検索用に通常のベクトルメトリックを使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>警告
同じベクトルサブフィールドに対して、<code translate="no">MAX_SIM*</code> インデックスと通常のベクトルメトリックインデックスを同時に作成しないでください。両方の検索モードが必要な場合は、ベクトルを2つの別々のベクトルサブフィールドに書き込み、各サブフィールドに対して1つずつインデックスを作成してください。</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">スカラーインデックスの作成<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>フィルタで StructArray のスカラーサブフィールドを使用する場合は、それらに対してスカラーインデックスを作成してください。<code translate="no">structArray[subfield]</code> パス構文と同じものを使用します。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>スカラーインデックスはオプションですが、<code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> や<code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code> などのフィルターでStructArrayのスカラーサブフィールドが頻繁に現れる場合には有用です。</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">インデックスとメトリックの互換性<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArrayのベクトルサブフィールドに対するインデックス型およびメトリック型を選択する際は、以下の表を参照してください。対象から始め、検索モードに応じてメトリックファミリーを選択してください。</p>
<p>以下の互換性表から、Milvus インデックス型とメトリック型を選択してください。</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">EmbeddingList 検索<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>EmbeddingList 検索では、<code translate="no">MAX_SIM*</code> メトリックが使用されます。StructArray ベクトルサブフィールド内のベクトルをエンベディングリストとして扱い、エンティティレベルの結果を返します。</p>
<table>
<thead>
<tr><th>ベクトルサブフィールドのデータ型</th><th>インデックス・タイプ</th><th>メトリックタイプ</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>,<code translate="no">FLOAT16_VECTOR</code>,<code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>,<code translate="no">IVF_FLAT_CC</code>,<code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code>,<code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>,<code translate="no">MAX_SIM_COSINE</code>,<code translate="no">MAX_SIM_IP</code>,<code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>,<code translate="no">MAX_SIM_COSINE</code>,<code translate="no">MAX_SIM_IP</code>,<code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>,<code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">要素レベルの検索<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>要素レベルの検索では、通常のベクトルメトリックが使用されます。各Struct要素を個別に検索し、一致した要素のオフセットを返すことができます。</p>
<table>
<thead>
<tr><th>ベクトルのサブフィールドのデータ型</th><th>インデックス型</th><th>メトリック型</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>,<code translate="no">FLOAT16_VECTOR</code>,<code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>,<code translate="no">IVF_FLAT</code>,<code translate="no">IVF_FLAT_CC</code>,<code translate="no">IVF_SQ8</code>,<code translate="no">IVF_SQ_CC</code>,<code translate="no">IVF_PQ</code>,<code translate="no">SCANN</code>,<code translate="no">IVF_RABITQ</code>,<code translate="no">IVF_RABITQ_FASTSCAN</code>,<code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code>,<code translate="no">DISKANN</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>,<code translate="no">HNSW_SQ</code>,<code translate="no">HNSW_PQ</code>,<code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code>,<code translate="no">SUBSTRUCTURE</code>,<code translate="no">SUPERSTRUCTURE</code>,<code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>バージョン固有のサポートやその他の制限については、「<a href="/docs/ja/structarray-limits.md">StructArray の制限</a>」を参照してください。</p>
<h2 id="Verify-indexes" class="common-anchor-header">インデックスの確認<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの作成後、コレクションまたはリストのインデックスを記述して、期待されるサブフィールドパスがインデックス化されていることを確認してください。</p>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<p>お使いの SDK バージョンでインデックス記述 API が公開されている場合は、特定のインデックスを記述することもできます。</p>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-rules" class="common-anchor-header">インデックスルール<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>ルール</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>サブフィールドインデックスにはパス構文を使用してください。</td><td>インデックスは `<code translate="no">chunks[emb]</code>` とし、`<code translate="no">emb</code> ` や `<code translate="no">chunks.emb</code>` は使用しないでください。</td></tr>
<tr><td>1 つのベクトルサブフィールドには 1 つのインデックスしか指定できません。</td><td>異なるメトリックファミリーが必要な場合は、別々のベクトルサブフィールドを使用してください。</td></tr>
<tr><td>EmbeddingList 検索には、<code translate="no">MAX_SIM*</code> メトリックを使用してください。</td><td>EmbeddingList クエリデータには、<code translate="no">MAX_SIM*</code> メトリックを使用して構築されたインデックスが必要です。</td></tr>
<tr><td>要素レベルの検索には、通常のベクトルメトリクスを使用してください。</td><td>要素レベルの検索では、通常のベクトルクエリデータと、<code translate="no">COSINE</code> 、<code translate="no">IP</code> 、<code translate="no">L2</code> などのメトリックが使用されます。</td></tr>
<tr><td>フィルタに現れるスカラーサブフィールドをインデックス化してください。</td><td>ターゲットでサポートされているスカラーインデックス型を使用してください。</td></tr>
<tr><td>ベクトルフィールドの制限に注意してください。</td><td>ベクトルフィールドとベクトルサブフィールドの合計数には制限があります。多数のベクトルサブフィールドを追加する前に、「StructArray の制限」を参照してください。</td></tr>
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
<li><p><code translate="no">chunks[emb]</code> ではなく、<code translate="no">chunks.emb</code> にインデックスを作成してしまう。</p></li>
<li><p><code translate="no">MAX_SIM*</code> インデックスのみを作成し、その同じサブフィールドに対して要素レベルの検索を実行しようとする。</p></li>
<li><p>通常のベクトルインデックスのみを作成し、その後、同じサブフィールドで EmbeddingList 検索を実行しようとする。</p></li>
<li><p><code translate="no">MAX_SIM*</code> メトリクスと通常のベクトルメトリクスの両方で、1 つのベクトルサブフィールドを再利用すること。</p></li>
<li><p>頻繁に使用される StructArray フィルターに対するスカラーインデックスの作成を忘れている。</p></li>
<li><p>Structスキーマに存在しないStructArrayサブフィールドにインデックスを付与している。</p></li>
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
<li><p>エンティティレベルの EmbeddingList 検索や要素レベルのベクトル検索を実行するには、「StructArray を使用した基本的なベクトル検索」を参照してください。</p></li>
<li><p>検索時に StructArray のスカラーサブフィールドをフィルタリングするには、「StructArray を使用したフィルタ検索」を参照してください。</p></li>
<li><p>インデックスおよびメトリックの制限を確認するには、「<a href="/docs/ja/structarray-limits.md">StructArray の制限</a>」を参照してください。</p></li>
</ol>
