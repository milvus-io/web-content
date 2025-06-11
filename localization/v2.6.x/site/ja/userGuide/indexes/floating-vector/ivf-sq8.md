---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  IVF_SQ8インデックスは、大規模な類似検索の課題に取り組むために設計された量子化ベースのインデックス作成アルゴリズムである。このインデックスタイプは、網羅的検索手法に比べ、はるかに少ないメモリフットプリントで高速な検索を実現する。
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_SQ8</strong>インデックスは、大規模な類似検索の課題に取り組むために設計された<strong>量子化ベースの</strong>インデックス作成アルゴリズムです。このインデックスタイプは、網羅的検索手法と比較して、より少ないメモリフットプリントで高速な検索を実現します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>IVF_SQ8 インデックスは2つの主要なコンポーネントに基づいて構築されている：</p>
<ul>
<li><p><strong>転置ファイル（IVF）</strong>：データをクラスタに整理し、検索アルゴリズムが最も関連性の高いベクトルのサブセットのみにフォーカスできるようにする。</p></li>
<li><p><strong>スカラー量子化（SQ8）</strong>：ベクトルをよりコンパクトな形に圧縮し、メモリ使用量を大幅に削減すると同時に、高速な類似度計算のための十分な精度を維持します。</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVFは、本の索引を作るようなものです。すべてのページ（私たちの場合はすべてのベクトル）をスキャンする代わりに、インデックスで特定のキーワード（クラスタ）を検索し、関連するページ（ベクトル）をすばやく見つけます。このシナリオでは、ベクターはクラスターにグループ化され、アルゴリズムはクエリーベクターに近いいくつかのクラスター内を検索します。</p>
<p>以下がその仕組みだ：</p>
<ol>
<li><p><strong>クラスタリング：</strong>ベクトルデータセットは、k-meansのようなクラスタリングアルゴリズムを使用して、指定された数のクラスタに分割されます。各クラスタにはセントロイド（クラスタを代表するベクトル）があります。</p></li>
<li><p><strong>割り当て：</strong>各ベクトルは、セントロイドが最も近いクラスタに割り当てられます。</p></li>
<li><p><strong>転置インデックス：</strong>各クラスタのセントロイドを、そのクラスタに割り当てられたベクトルのリストにマッピングするインデックスが作成されます。</p></li>
<li><p><strong>検索：</strong>最近傍を検索する場合、検索アルゴリズムはクエリベクトルとクラスタ重心を比較し、最も有望なクラスタを選択します。そして、その選択されたクラスタ内のベクトルに検索が絞り込まれます。</p></li>
</ol>
<p>技術的な詳細については、<a href="/docs/ja/ivf-flat.md">IVF_FLATを</a>参照してください。</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>スカラー量子化(SQ)は、高次元ベクトルの値をより小さくコンパクトな表現に置き換えることで、そのサイズを縮小するために使用される手法です。<strong>SQ8では</strong>、ベクトルの各次元の値を格納するのに、一般的な32ビット浮動小数点数の代わりに8ビット整数を使用します。これにより、データの保存に必要なメモリ量が大幅に削減される。</p>
<p>SQ8の仕組みは以下の通り：</p>
<ol>
<li><p><strong>範囲の特定</strong>まず、ベクトル内の最小値と最大値を特定します。この範囲が量子化の境界となる。</p></li>
<li><p><strong>正規化：</strong>式を使用して、ベクトル値を0から1の範囲に正規化します：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>これにより、すべての値が標準化された範囲に比例してマッピングされ、圧縮に備えます。</p></li>
<li><p><strong>8ビット圧縮：</strong>正規化された値に255（8ビット整数の最大値）を掛け、その結果を最も近い整数に丸めます。これにより、各値が効果的に 8 ビット表現に圧縮されます。</p></li>
</ol>
<p>ディメンジョン値が 1.2 で、最小値が -1.7、最大値が 2.3 であるとします。次の図は、float32 値を int8 整数に変換するために SQ8 がどのように適用されるかを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>IVF SQ8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>IVF_SQ8 インデックスは、IVF と SQ8 を組み合わせて効率的に類似検索を行います：</p>
<ol>
<li><p><strong>IVF は検索範囲を狭める</strong>：データセットをクラスタに分割し、クエリが発行されると、IVF はまずクエリとクラスタのセントロイドを比較し、最も関連性の高いクラスタを選択する。</p></li>
<li><p><strong>SQ8は距離計算を高速化する</strong>：選択されたクラスタ内で、SQ8はベクトルを8ビット整数に圧縮し、メモリ使用量を削減し、距離計算を高速化する。</p></li>
</ol>
<p>IVFで探索を絞り込み、SQ8で計算を高速化することで、IVF_SQ8は高速な探索時間とメモリ効率の両方を実現しています。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">IVF_SQ8</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">IVF_SQ8</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><code translate="no">nlist</code>:インデックス構築時に k-means アルゴリズムを使用して作成するクラスタの数。</li>
</ul>
<p><code translate="no">IVF_SQ8</code> インデックスで利用可能な構築パラメータの詳細については、<a href="/docs/ja/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">インデックス構築パラメータを</a>参照してください。</p></li>
</ul>
<p>インデックス・パラメータを構成したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドでインデックス・パラメータを渡してインデックスを作成できます。詳細は、<a href="/docs/ja/create-collection.md">コレクションの作成</a> を参照してください。</p>
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
    </button></h2><p>インデックスが構築され、エンティティが挿入されると、インデックスで類似検索を実行できます。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">params</code>:インデックスで検索するための追加構成オプション。</p>
<ul>
<li><code translate="no">nprobe</code>:候補を検索するクラスタの数。</li>
</ul>
<p><code translate="no">IVF_SQ8</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">インデックス固有の検索パラメータを</a>参照してください。</p></li>
</ul>
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
    </button></h2><p>このセクションでは、インデックスを構築し、インデックス上で検索を実行する際に使用するパラメータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">インデックスを構築する</a>際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>インデックス構築時にk-meansアルゴリズムを使用して作成するクラスタの数。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[1, 65536]</p>
<p><strong>デフォルト値</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> の値を大きくすると、より洗練されたクラスターを作成することでリコールが向上しますが、インデックス構築時間が長くなります。ほとんどの場合、この範囲内の値を設定することを推奨する：[32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">インデックス検索</a>時に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングサジェスチョン</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>候補を検索するクラスタの数。</p></td>
     <td><p><strong>型</strong>：整数<strong>Range</strong>：[1,<em>nlist］</em></p>
<p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>値を大きくすると、より多くのクラスターを検索できるようになり、検索範囲が広がることでリコールが向上しますが、その代償としてクエリの待ち時間が長くなります。速度と精度のバランスをとるために、<code translate="no">nlist</code> に比例して<code translate="no">nprobe</code> を設定します。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[1, nlist]。</p></td>
   </tr>
</table>
