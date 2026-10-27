---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN は、IVF、RaBitQ バイナリ量子化、および SIMD
  バッチスキャンを組み合わせることで、メモリ効率に優れ、高スループットなベクトル検索を実現します。
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> は、IVFパーティショニング、RaBitQバイナリ量子化、およびFastScanバッチ処理を組み合わせたものです。データベースベクトルに対して1ビットのRaBitQコードを格納し、SIMDに適した32個のデータベースベクトル単位のブロックでコードを処理します。これにより、近似結果が許容される、高スループットかつメモリ制約のあるワークロードに適しています。</p>
<p>検索で多数の候補をスキャンし、スループットが最優先される場合は、<a href="/docs/ja/ivf-rabitq.md">IVF_RABITQ</a>ではなく<code translate="no">IVF_RABITQ_FASTSCAN</code> を選択してください。 FastScanのクエリごとのセットアップコストは、パックされたコードブロック全体に分散されるため、通常は大規模なデータセットや長いIVFリストの場合に有利です。小規模なコレクションや、候補をほとんど検査しない検索の場合は、代わりに<code translate="no">IVF_RABITQ</code> を使用してください。また、設定可能なクエリ量子化、より多くの精緻化タイプ、およびイテレータもサポートしています。</p>
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> 以下の段階を経て処理を行います：</p>
<ol>
<li><strong>IVFによる分割</strong>：IVFはベクトルを<code translate="no">nlist</code> クラスタにグループ化し、<code translate="no">nprobe</code> で最も近いクラスタを検索します。</li>
<li><strong>RaBitQエンコーディング</strong>：各ベクトルの残差は、次元ごとに1ビットのRaBitQコードとしてエンコードされます。</li>
<li><strong>FastScan</strong>：インデックスは、キャッシュ効率に優れたSIMDバッチ処理のためにコードをパックします。各バッチで32個のデータベースベクトルを評価します。</li>
<li><strong>オプションの精緻化</strong>：有効にすると、Milvusが最終結果を返す前に、FP32リファイナーが候補のスコアを再計算します。</li>
</ol>
<p>基盤となるFaissインデックスは<code translate="no">IndexIVFRaBitQFastScan</code> です。Knowhereはこれにランダム回転変換を適用し、オプションでFP32リファイナーを追加します。</p>
<p>FastScanは、パックされたコードブロックをスキャンする前に、クエリに関連するルックアップテーブルの構築や量子化など、クエリごとのセットアップ作業を実行します。ご自身のデータと検索パラメータを使用して、<code translate="no">IVF_RABITQ</code> と<code translate="no">IVF_RABITQ_FASTSCAN</code> の両方をベンチマークしてください。</p>
<h2 id="Build-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus のベクトルフィールド上に<code translate="no">IVF_RABITQ_FASTSCAN</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、およびインデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><p><code translate="no">index_type</code>: 構築するインデックスのタイプ。この例では、値を `<code translate="no">IVF_RABITQ_FASTSCAN</code>` に設定します。</p></li>
<li><p><code translate="no">metric_type</code>: ベクトル間の距離を計算するために使用されるメソッド。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> などがあります。詳細については、<a href="/docs/ja/metric.md">「メトリックタイプ</a>」を参照してください。</p></li>
<li><p><code translate="no">params</code>: インデックスの構築に関する追加の設定オプション。詳細については、「<a href="/docs/ja/ivf-rabitq-fastscan.md#Index-building-params">インデックス構築パラメータ</a>」を参照してください。</p></li>
</ul>
<p>インデックスパラメータの設定が完了したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドにインデックスパラメータを渡すことで、インデックスを作成できます。詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
<h2 id="Search-on-index" class="common-anchor-header">インデックスでの検索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの構築とエンティティの挿入が完了すると、そのインデックスに対して類似度検索を実行できます。</p>
<p><code translate="no">nprobe</code> を設定して、検索対象となる IVF クラスタの数を制御します。インデックスがリファインメント機能を使用して構築された場合は、<code translate="no">refine_k</code> を使用して、FP32 リファイナーに渡される候補プールを制御します。</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><code translate="no">params</code>: インデックスでの検索に関する追加の設定オプション。詳細については、「<a href="/docs/ja/ivf-rabitq-fastscan.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</li>
</ul>
<div class="alert note">
<p><code translate="no">IVF_RABITQ</code> とは異なり、<code translate="no">IVF_RABITQ_FASTSCAN</code> は<code translate="no">rbq_bits_query</code> 検索パラメータを受け付けません。FastScanは内部で常に8ビットのクエリ量子化を使用するため、<code translate="no">rbq_bits_query</code> を省略するか、<code translate="no">0</code> に設定してください。これより大きい値は拒否されます。</p>
</div>
<h2 id="Index-params" class="common-anchor-header">インデックスパラメータ<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、インデックスの構築およびインデックスでの検索に使用されるパラメータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/ivf-rabitq-fastscan.md#Build-index">インデックスを構築する</a>際に設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>インデックス構築時に k-means アルゴリズムを使用して作成するクラスタの数。各クラスタは中心点（セントロイド）によって表され、ベクトルのリストを格納します。このパラメータの値を大きくすると、各クラスタに含まれるベクトルの数が減り、より小さく、より焦点を絞ったパーティションが作成されます。</p></td>
     <td><p><strong>型</strong>：整数<br><strong>範囲</strong>：[1, 65536]<br><strong>デフォルト値</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> の値を大きくすると、より精細なクラスターが生成されリコール率が向上しますが、インデックス構築時間が長くなります。データセットのサイズと利用可能なリソースに基づいて最適化してください。ほとんどの場合、[32, 4096]の範囲内の値を設定することを推奨します。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>精緻化プロセスを有効にし、精緻化されたデータを保存します。<code translate="no">IVF_RABITQ_FASTSCAN</code> はFP32形式での精緻化のみをサポートしています。</p></td>
     <td><p><strong>型</strong>: ブール型<br><strong>範囲</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]<br><strong>デフォルト値</strong>：<code translate="no">false</code></p></td>
     <td><p>0.9以上のリコール率が必要な場合は、<code translate="no">true</code> に設定してください。リファインを有効にすると精度は向上しますが、ストレージ要件とインデックス構築時間が増加します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p><code translate="no">refine</code> が有効な場合に、リファインメントに使用されるデータ表現を定義します。<code translate="no">refine</code> が<code translate="no">true</code> である場合にのみ必須です。</p></td>
     <td><p><strong>型</strong>: 文字列<br><strong>範囲</strong>: [<code translate="no">FP32</code>,<code translate="no">FLAT</code>]<br><strong>デフォルト値</strong>：なし</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> FP32 の精緻化のみをサポートしており、<code translate="no">FLAT</code> は<code translate="no">FP32</code> と同一です。値の一致判定では大文字と小文字は区別されません。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の表は、<a href="/docs/ja/ivf-rabitq-fastscan.md#Search-on-index">インデックスでの検索時に</a> <code translate="no">search_params.params</code> で設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>候補を検索するクラスタの数。値を大きくすると、より多くのクラスタを検索できるようになり、検索範囲を拡大することでリコール率が向上しますが、その代償としてクエリのレイテンシが増加します。</p></td>
     <td><p><strong>型</strong>: 整数<br><strong>範囲</strong>: [1,<em>nlist</em>]<br><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>この値を大きくするとリコール率は向上しますが、検索速度が低下する可能性があります。速度と精度のバランスをとるには、`<code translate="no">nprobe</code> ` を `<code translate="no">nlist</code> ` に比例して設定してください。ほとんどの場合、[1,<em>nlist</em>] の範囲内の値を設定することを推奨します。</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>精緻化プロセスでは、より高品質な量子化を用いて、IVF_RABITQ_FASTSCANで選択された候補プール（<code translate="no">refine_k</code> 倍の規模）から、必要な数の最近傍を選択します。精緻化が無効になっている場合は、この設定は効果を持ちません。</p></td>
     <td><p><strong>型</strong>: Float<br><strong>範囲</strong>：[1,<em>float_max</em>)<br><strong>デフォルト値</strong>：<code translate="no">1</code></p></td>
     <td><p><code translate="no">refine_k</code> の値を大きくするとQPSは低下しますが、リコール率は向上します。まず<code translate="no">1</code> から始め、<code translate="no">2</code> 、<code translate="no">3</code> 、<code translate="no">4</code> 、<code translate="no">5</code> の各値をテストして、データセットに適したQPSとリコール率の最適なバランスを見つけてください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>クエリベクトルに対して追加のスカラー量子化を適用するかどうかを設定します。<strong> <code translate="no">IVF_RABITQ_FASTSCAN</code> ではサポートされていません</strong>。このインデックスは内部で常に8ビットのクエリ量子化を使用します。このパラメータを省略するか、<code translate="no">0</code> に設定してください。<code translate="no">0</code> より大きい値は拒否されます。</p></td>
     <td><p><strong>型</strong>：整数<br><strong>範囲</strong>：[0, 0]<br><strong>デフォルト値</strong>：<code translate="no">0</code></p></td>
     <td><p>設定しないでください。クエリ量子化を設定可能な場合は、代わりに<a href="/docs/ja/ivf-rabitq.md">IVF_RABITQ</a>を使用してください。</p></td>
   </tr>
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
<li>FastScan は、固定の 1 ビット RaBitQ データベースエンコーディングと 8 ビットのクエリ量子化を使用します。<code translate="no">rbq_bits_query</code> は省略するか、<code translate="no">0</code> に設定する必要があります。</li>
<li>FP32（<code translate="no">FLAT</code> と同等）による精緻化のみがサポートされています。</li>
<li>イテレータはサポートされていません。</li>
<li>これは CPU インデックスです。GPU では実行されません。</li>
<li>実際のパフォーマンスは、CPUのSIMDサポート、ベクトルの次元、<code translate="no">nlist</code> 、<code translate="no">nprobe</code> 、およびデータの分布によって異なります。本番環境に導入する前に、ご自身のワークロードでベンチマークテストを行ってください。</li>
</ul>
<p>FastScan 以外の RaBitQ バリアントおよびその追加の精緻化オプションについては、<a href="/docs/ja/ivf-rabitq.md">IVF_RABITQ を</a>参照してください。</p>
