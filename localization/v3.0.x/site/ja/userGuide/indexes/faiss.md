---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  Milvus 3.0 では、FAISS インデックスのパススルー機能を使用して、FAISS
  インデックス・ファクトリの文字列およびファクトリ固有の検索パラメータを指定します。
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">FAISS</code> インデックス型は、Milvus 3.0.0 以降で利用可能なエキスパートレベルのパススルー機能です。これにより、固定の Milvus インデックス型を選択する代わりに、<a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">Faiss インデックスファクトリ文字列</a>を指定することができます。</p>
<p><code translate="no">FAISS</code> を使用するのは、すでにテスト済みの Faiss レシピがあり、その構成を直接制御する必要がある場合です。専用の Milvus インデックス型が用意されている一般的なレシピについては、安定しており、ドキュメント化されたパラメータ契約がある専用型を優先してください。</p>
<div class="alert note">
<p>アップストリームのFaissで受け入れられるファクトリ文字列が、Milvusで自動的にサポートされるとは限りません。互換性は、ベクトルフィールドの型、メトリック、次元、MilvusイメージにコンパイルされたFaissモジュール、および生成されたインデックスがMilvusで必要な操作をサポートしているかどうかに依存します。</p>
</div>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">FAISS</code> <code translate="no">FLOAT_VECTOR</code> および フィールドをサポートしています。 、 、 、 フィールドはサポートしていません。<code translate="no">BINARY_VECTOR</code> <code translate="no">FLOAT16_VECTOR</code> <code translate="no">BFLOAT16_VECTOR</code> <code translate="no">INT8_VECTOR</code> <code translate="no">SPARSE_FLOAT_VECTOR</code> </p></li>
<li><p>汎用<code translate="no">FAISS</code> アダプターはCPU上で実行されます。これはFaissのGPUインデックス型ではありません。</p></li>
<li><p><code translate="no">faiss_index_name</code> ビルドパラメータは必須です。Milvus は、レシピを Milvus 専用のインデックス型に変換することなく、その値を Faiss に渡します。</p></li>
<li><p>ビルドおよび検索パラメータはファクトリごとに異なります。あるファクトリでサポートされているパラメータでも、別のファクトリでは拒否される場合があります。</p></li>
<li><p>スカラーフィルタリングを行うには、基盤となる Faiss インデックスが ID セレクタをサポートしている必要があります。Milvus 3.0.0 のテストでは、浮動小数点ファクトリである<code translate="no">Flat</code> 、<code translate="no">IVF64,Flat</code> 、および<code translate="no">HNSW16,Flat</code> を使用したフィルタリング検索がカバーされています。すべてのファクトリがフィルタをサポートしている、あるいはバイナリ<code translate="no">FAISS</code> インデックスがスカラーフィルタリングをサポートしていると想定しないでください。</p></li>
<li><p>検索イテレータはサポートされていません。</p></li>
<li><p>このアダプタは、生ベクトルの取得機能を提供しません。</p></li>
<li><p>範囲検索のサポートはファクトリによって異なります。Float<code translate="no">Flat</code> にはリリースカバレッジがあります。バイナリ<code translate="no">FAISS</code> インデックスでは範囲検索を使用しないでください。</p></li>
<li><p>ファクトリは正常に構築されても、一部の Milvus 検索操作を拒否する場合があります。たとえば、スタンドアロンの<code translate="no">PQ8x4</code> は、スカラーフィルタリング検索で使用されるセレクタを拒否します。フィルタリングされていない使用については、別途検証を行ってください。</p></li>
<li><p>Milvus 3.0.0 では、インデックスのリロード後に<code translate="no">COSINE</code> のスコアおよび範囲検索のしきい値を検証してください。Knowhere v3.0.6 では、逆シリアル化時に<code translate="no">FAISS</code> アダプターのコサイン正規化状態が復元されません。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>FAISSインデックスのパススルーワークフロー</span>
  
 </span></p>
<p>インデックス構築において、Milvusは<code translate="no">faiss_index_name</code> 、ベクトルフィールド型、メトリック、およびその他の構築パラメータをKnowhere FAISSアダプタに転送します。アダプタは、<code translate="no">FLOAT_VECTOR</code> フィールドの場合は<code translate="no">faiss::index_factory()</code> を、<code translate="no">BINARY_VECTOR</code> フィールドの場合は<code translate="no">faiss::index_binary_factory()</code> を呼び出します。その結果生成されるオブジェクトは、通常のMilvusインデックスライフサイクルを通じて管理されるネイティブのFaissインデックスです。</p>
<p>検索時には、アダプターが指定されたファクトリー固有のパラメータを、対応する Faiss の `<code translate="no">SearchParameters</code> ` オブジェクトに変換します。サポートされている浮動小数点ファクトリーの場合、Milvus のフィルタービットセットを Faiss のセレクターとして渡します。 セレクタのサポートはファクトリごとに異なり、公開されているテストでは、バイナリ<code translate="no">FAISS</code> インデックスに対するスカラーフィルタリングは確立されていません。これが、スタンドアロンのFaissでは有効なレシピであっても、Milvusの検索パスで要求される操作を拒否してしまう理由です。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 以降</li>
<li>PyMilvus 3.0.0 以降</li>
<li>Faiss インデックス・ファクトリの構文および選択したファクトリのトレーニング要件に関する知識</li>
</ul>
<p>インストール手順については、「<a href="/docs/ja/install-pymilvus.md">PyMilvusのインストール</a>」を参照してください。</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">ファクトリ文字列の選択<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>ファクトリ文字列は、Faissインデックスをコンポーネントのシーケンスとして記述します。以下の例は、Milvus 3.0.0のリリーステストで検証済みです。このリストは網羅的なものではありません。</p>
<table>
<thead>
<tr><th>ファクトリ文字列</th><th>フィールド型</th><th>リリーステストで検証されたメトリクス</th><th>検索パラメータ</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td><td>なし</td><td>完全一致検索。</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>、<code translate="no">IP</code> 、<code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>64個の反転リストと非圧縮ベクトルを用いたIVF。</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>,<code translate="no">IP</code>,<code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>フラットなベクトル格納を用いたHNSWグラフ。</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>ファクトリ固有</td><td>OPQ、IVF、PQを組み合わせたもの。ご自身のデータで学習サイズとリコール率を検証してください。</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>,<code translate="no">k_factor</code></td><td>PQ候補の抽出後にフラットリファイナーを使用します。</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>なし</td><td>リリーステストが組み込まれています。インデックスがセレクタを拒否するため、スカラーフィルタリングされた検索は失敗します。フィルタリングなしでの使用については別途検証してください。</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>なし</td><td>バイナリベクトルの完全一致検索。</td></tr>
</tbody>
</table>
<p><code translate="no">COSINE</code> のエントリは、ビルドおよび検索のスモークテストのカバレッジを示しています。Milvus 3.0.0 では、インデックスの再読み込み後のスコアや範囲検索の正確性は保証されません。「<a href="#limits">制限事項</a>」を参照してください。</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">浮動小数点インデックスの構築と検索<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、128次元のベクトルを3,000個生成します。これにより、この例で使用される<code translate="no">IVF64,Flat</code> レシピに十分なトレーニングデータが提供されます。インデックスの構築および検索を行う前に、セットアップブロックを展開して実行してください。</p>
<p><details></p>
<p><summary>浮動小数点ベクトルコレクションの準備</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">index_type</code> を<code translate="no">FAISS</code> に設定し、<code translate="no">faiss_index_name</code> を使用してネイティブのFaissファクトリレシピを選択します。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>ファクトリ文字列<code translate="no">IVF64,Flat</code> は、64 個の反転リストを持つ IVF インデックスを作成し、各リストに非圧縮のベクトルを格納します。</p>
<h3 id="Search-the-index" class="common-anchor-header">インデックスの検索<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">search_params.params</code> 内で、ファクトリ固有の検索パラメータを設定します。IVF ファクトリの場合、<code translate="no">nprobe</code> によって、Faiss が検索する逆引きリストの数が制御されます。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>クエリでは `<code translate="no">nprobe=8</code>` が使用されるため、Faiss は 64 個の反転リストのうち 8 個を検索します。このフィルタにより、<code translate="no">category</code> の値が `<code translate="no">reference</code>` であるエンティティに結果が絞り込まれます。</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">バイナリインデックスの構築と検索<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">BINARY_VECTOR</code> フィールドの場合は、<code translate="no">BFlat</code> などのバイナリファクトリ文字列と、互換性のあるバイナリメトリックを使用します。インデックスの構築および検索を行う前に、セットアップブロックを展開して実行してください。</p>
<p><details></p>
<p><summary>バイナリベクトルコレクションの準備</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>このバイナリベクトルの例では、ファクトリ文字列として `<code translate="no">BFlat</code> ` を、メトリックとして `<code translate="no">HAMMING</code> ` を使用します。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">インデックスの検索<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> には、ファミリー固有の検索パラメータはありません。検索リクエストを構築する際は、空の `<code translate="no">params</code> ` マッピングを渡してください。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>各 128 次元のバイナリベクトルは 16 バイトで表現されます。詳細については、「<a href="/docs/ja/binary-vector.md">バイナリベクトル」</a>を参照してください。</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">ビルドおよび検索パラメータの設定<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">FAISS</code> インデックス・タイプには、1 つの必須のパススルー・ビルド・パラメータがあります。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>場所</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in<code translate="no">add_index()</code></td><td>Faiss インデックスファクトリの文字列。例:<code translate="no">IVF64,Flat</code> 。</td></tr>
</tbody>
</table>
<p><code translate="no">search_params.params</code> 内で、ファクトリ固有の検索パラメータを設定します。以下の表は一般的な例を挙げたものであり、すべてを網羅しているわけではありません。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>ファクトリの例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>検索対象の反転リストの数。</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>HNSW 検索候補リストのサイズ。</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>要求されたトップKに対して、リファイナーに供給される候補の数。</td></tr>
</tbody>
</table>
<p>Milvus は、アダプタが認識する追加パラメータのみを転送します。具体的なファクトリファミリーがサポートしていない未知のビルドキーや検索キーは拒否されます。Milvus は、考えられるすべてのファクトリに対する汎用的なパラメータスキーマを維持していません。 選択したファクトリに関する Faiss のドキュメントを確認し、展開を予定している Milvus の正確なバージョンおよびイメージに対して、ビルドおよび検索フロー全体を検証してください。</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">エラーおよびサポートされていない操作への対応<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>ファクトリ文字列が無効であるか、Milvus ビルドで利用できない場合、インデックスの構築は失敗します。コレクションを読み込む前に、インデックスの状態と失敗理由を確認してください。</p></li>
<li><p>パラメータの型が間違っている場合、検索は失敗します。たとえば、<code translate="no">nprobe=&quot;invalid&quot;</code> は、<code translate="no">nprobe</code> が数値でなければならないため、拒否されます。</p></li>
<li><p>パラメータが構築済みのファクトリに適用されない場合、アダプタはそれを「未サポート」として拒否します。</p></li>
<li><p>ファクトリがMilvusセレクタをサポートしていない場合、同じファクトリがスタンドアロンのFaissでは検索できる場合でも、フィルタリング検索が失敗する可能性があります。</p></li>
<li><p>「<code translate="no">search_iterator()</code> 」を「<code translate="no">FAISS</code> 」インデックスと併用しないでください。</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/index-explained.md">「インデックスの解説</a>」で、Milvus インデックスの構成について学びましょう。</li>
<li>専用の<a href="/docs/ja/ivf-flat.md">IVF_FLAT</a>および<a href="/docs/ja/hnsw.md">HNSW</a>インデックスタイプを比較してください。</li>
<li>ファクトリ用のメトリックを選択する前に、「<a href="/docs/ja/metric.md">メトリックの種類</a>」を確認してください。</li>
</ul>
