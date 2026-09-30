---
id: array-of-structs.md
title: StructArray の概要
summary: >-
  StructArrayは、1つのエンティティが構造化された要素の順序付きリストを格納する必要がある場合に使用します。例えば、多数のチャンクを含む1つのドキュメント、多数のビジュアルパッチを含む1つのページ、あるいは多数のクリップを含む1つの動画などが該当します。StructArrayは、これらの要素を親エンティティ内に保持しつつ、各要素内のフィールドに対するベクトル検索やスカラーフィルタリングを可能にします。
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray の概要<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArrayは、1つのエンティティが構造化された要素の順序付きリストを格納する必要がある場合に使用します。例としては、多数のチャンクを含む1つのドキュメント、多数のビジュアルパッチを含む1つのページ、または多数のクリップを含む1つの動画などが挙げられます。StructArrayは、これらの要素を親エンティティ内に保持しつつ、各要素内のフィールドに対するベクトル検索やスカラーフィルタリングを可能にします。</p>
<h2 id="What-is-StructArray" class="common-anchor-header">StructArray とは？<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>（構造体の配列とも呼ばれる）は、各エンティティ内に順序付けられた Struct 要素のセットを格納します。配列内のすべての Struct 要素は、同じスキーマに従います。Struct 要素には、スカラーサブフィールド、ベクトルサブフィールド、あるいはその両方を含めることができます。</p>
<p>たとえば、コレクションは1つの記事をエンティティとして格納し、そのチャンクを「<code translate="no">chunks</code> 」という名前のStructArrayフィールドに格納できます。各チャンクには、テキスト、セクションのメタデータ、品質スコア、および1つ以上のベクトル埋め込みを含めることができます。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>この例にある2つのベクトルサブフィールドは、2つの検索の観点から見た同じチャンクを表しています。「<code translate="no">chunks[emb_list_vector]</code> 」は、<code translate="no">MAX_SIM*</code> メトリクスを使用した EmbeddingList 検索を目的としており、「<code translate="no">chunks[emb]</code> 」は、<code translate="no">COSINE</code> 、<code translate="no">IP</code> 、または<code translate="no">L2</code> などの通常のベクトルメトリクスを使用した要素レベルの検索を目的としています。</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">StructArrayの使用場面<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>返したい自然単位が、検索やフィルタリングに用いたい自然単位よりも大きい場合に、StructArrayを使用します。</p>
<table>
<thead>
<tr><th>使用例</th><th>StructArrayが役立つ理由</th><th>典型的な StructArray フィールド</th></tr>
</thead>
<tbody>
<tr><td>ドキュメントの検索</td><td>1つのドキュメントをエンティティとして保存しつつ、そのチャンク全体を横断して検索します。</td><td><code translate="no">chunks</code></td></tr>
<tr><td>遅延インタラクションによる検索</td><td>ドキュメントやページを埋め込みリストとして保存し、<code translate="no">MAX_SIM*</code> でスコアを算出します。</td><td><code translate="no">chunks[emb_list_vector]</code> または<code translate="no">patches[emb]</code></td></tr>
<tr><td>要素レベルでの検索</td><td>最も関連性の高いチャンク、クリップ、パッチ、またはオブザベーションを、その配列オフセットを含めて返す。</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>構造化フィルタリング</td><td>section、score、page、flags など、Struct 要素内のスカラーサブフィールドでフィルタリングします。</td><td><code translate="no">chunks[section]</code>,<code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>重複する親結果の削減</td><td>各子要素を個別の行として保存するのではなく、同じ親エンティティの下に子要素を保持します。</td><td><code translate="no">chunks</code>,<code translate="no">clips</code>,<code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">決定マトリックス<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>適切な StructArray パスを選択するには、以下のマトリックスを参照してください。</p>
<table>
<thead>
<tr><th>目標</th><th>推奨パス</th><th>結果の粒度</th><th>ここから始めましょう</th></tr>
</thead>
<tbody>
<tr><td>1 つの親オブジェクトと、多数の構造化された子オブジェクトをモデル化する場合。</td><td>StructArrayフィールドを作成します。</td><td>エンティティには順序付きStruct要素が含まれます。</td><td><a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a></td></tr>
<tr><td>ネストされた子データを含む親レコードを挿入します。</td><td>StructArrayフィールドがStructオブジェクトのリストであるエンティティを挿入します。</td><td>エンティティレベルの挿入。</td><td><a href="/docs/ja/insert-data-into-structarray-fields.md">StructArrayフィールドへのデータの挿入</a></td></tr>
<tr><td>ColBERT、ColPali、またはドキュメントレベルのレイトインタラクション検索を実行します。</td><td><code translate="no">MAX_SIM*</code> インデックスを使用したEmbeddingList検索を実行します。</td><td>エンティティレベル。</td><td><a href="/docs/ja/search-with-embedding-lists.md">Embedding Lists を使用した検索</a></td></tr>
<tr><td>個々のチャンク、クリップ、またはパッチを検索します。</td><td>通常のベクトルメトリックを使用した要素レベルの検索を行います。</td><td>Struct 要素レベル。利用可能な場合はオフセットを含みます。</td><td><a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a></td></tr>
<tr><td>スカラー条件に一致する要素に限定して、要素レベルのベクトル検索を実行します。</td><td><code translate="no">element_filter</code> を使用します。</td><td>要素レベルのフィルタリング。結果の形状は検索タイプによって異なります。</td><td><a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタリング検索</a></td></tr>
<tr><td>条件を満たす Struct 要素の数に基づいてエンティティを選択します。</td><td><code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 、または<code translate="no">MATCH_EXACT</code> を使用します。</td><td>エンティティレベル。</td><td><a href="/docs/ja/struct-array-operators.md">StructArray 演算子</a></td></tr>
<tr><td>StructArray ベクトルのサブフィールドに対して、スコアまたは距離の境界を使用します。</td><td>要素レベルの範囲検索を使用します。</td><td>Struct 要素レベル。</td><td><a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a></td></tr>
<tr><td>要素レベルの検索後、親エンティティごとに最大1つの結果を返します。</td><td>主キーによるグループ化検索を使用します。</td><td>グループ化後のエンティティレベル。</td><td><a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a></td></tr>
<tr><td>StructArray要素検索を別のベクトルフィールドと組み合わせる。</td><td>StructArrayのベクトルサブフィールドを対象とする1つのAnnSearchRequestを使用したハイブリッド検索を実行します。</td><td>要素レベルのサブ検索、エンティティレベルの再ランク付け。</td><td><a href="/docs/ja/hybrid-search-with-structarray.md">StructArray を使用したハイブリッド検索</a></td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">2つの検索モデルを理解する<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    <tr>
      <th scope="col"><h3>EmbeddingList検索</h3></th>
      <th scope="col"><h3>要素レベルの検索</h3></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>EmbeddingList検索では、StructArrayベクトルサブフィールド内のベクトルを、親エンティティの1つの埋め込みリストとして扱います。クエリも埋め込みリストです。Milvusは、<code translate="no">MAX_SIM*</code> メトリックを使用して、クエリの埋め込みリストと保存された埋め込みリストを比較し、一致するエンティティを返します。</p>
        <ul>
          <li>クエリデータ：埋め込みリスト。</li>
          <li>メトリックファミリー：<code translate="no">MAX_SIM*</code> 。</li>
          <li>結果の粒度：エンティティレベル。</li>
          <li>最適な用途：ドキュメントレベルまたはページレベルでの後期インタラクション検索。</li>
        </ul>
      </td>
      <td>
        <p>要素レベルの検索では、各 Struct 要素を独立したベクトル検索の候補として扱います。各ヒットは StructArray フィールド内の照合された要素を表し、グループ化されていない結果では要素のオフセットが明らかになる場合があります。</p>
        <ul>
          <li>クエリデータ：通常のベクトル。</li>
          <li>メトリックファミリー：通常のベクトルメトリック。</li>
          <li>結果の粒度：Struct 要素レベル。</li>
          <li>最適な用途：チャンクレベル、クリップレベル、またはパッチレベルの検索。</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>警告</p>
<p>コレクションで EmbeddingList 検索と要素レベルの検索の両方が必要な場合は、2 つの別々のベクトルサブフィールドを使用してください。ベクトルフィールドまたはベクトルサブフィールドは 1 つのインデックスのみを受け入れ、2 つの検索モードでは異なるメトリックファミリーが必要です。</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">ドキュメントマップ<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray のドキュメントは、モデリングページと検索ページに分かれています。モデリングページを使用してデータを定義および準備し、検索ページを使用して適切な検索およびフィルタリングの動作を選択してください。</p>
<table>
<thead>
<tr><th>エリア</th><th>ページ</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td>モデリング</td><td><a href="/docs/ja/create-structarray-field.md">StructArrayフィールドの作成</a></td><td>Structスキーマを定義し、StructArrayフィールドを追加します。</td></tr>
<tr><td>モデリング</td><td><a href="/docs/ja/insert-data-into-structarray-fields.md">StructArray フィールドへのデータの挿入</a></td><td>ネストされたStructArrayデータを準備し、挿入します。</td></tr>
<tr><td>モデリング</td><td><a href="/docs/ja/index-structarray-fields.md">StructArray フィールドへのインデックス設定</a></td><td>StructArrayのサブフィールドに対してベクトルインデックスおよびスカラーインデックスを作成します。</td></tr>
<tr><td>参照</td><td><a href="/docs/ja/structarray-limits.md">StructArray の制限</a></td><td>スキーマ、データ型、インデックス、検索、フィルタ、およびバージョンの制限を確認します。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a></td><td>EmbeddingList 検索と要素レベルのベクトル検索を比較します。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/range-search-with-structarray.md">StructArray を使用した範囲検索</a></td><td>StructArrayのベクトルサブフィールドで範囲制約を使用する。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/grouping-search-with-structarray.md">StructArray を使用したグループ化検索</a></td><td>要素レベルの検索結果を主キーでグループ化します。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/hybrid-search-with-structarray.md">StructArray を使用したハイブリッド検索</a></td><td>StructArrayによる要素レベルの検索を、他のベクトル検索と組み合わせます。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/filtered-search-with-structarray.md">StructArray を使用したフィルタ検索</a></td><td>検索、クエリ、およびハイブリッド検索でStructArrayフィルターを使用します。</td></tr>
<tr><td>検索</td><td><a href="/docs/ja/search-with-embedding-lists.md">埋め込みリストを用いた検索</a></td><td>StructArray を使用して、ColBERT や ColPali スタイルの検索システムを構築します。</td></tr>
<tr><td>フィルタ</td><td><a href="/docs/ja/struct-array-operators.md">StructArray演算子</a></td><td><code translate="no">element_filter</code> および<code translate="no">MATCH_*</code> 演算子のリファレンス構文。</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">最初に確認すべき主な制限事項<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct は、Array フィールドの要素型として使用できます。トップレベルのコレクションフィールドとしては使用されません。</p></li>
<li><p>同じ StructArray フィールド内のすべての Struct 要素は、1 つの事前定義されたスキーマを共有します。</p></li>
<li><p>Vector サブフィールドにはインデックスが必要です。EmbeddingList 検索では `<code translate="no">MAX_SIM*</code> ` メトリクスが使用されますが、要素レベルの検索では通常のベクトルメトリクスが使用されます。</p></li>
<li><p><code translate="no">element_filter</code> また、<code translate="no">MATCH_*</code> は、StructArrayフィールド内のスカラーサブフィールド向けです。<code translate="no">$[subfield]</code> は、これらの演算子内でのみ使用してください。</p></li>
<li><p>一部の検索の組み合わせは、バージョン制限やモード固有の制限があります。範囲検索、グループ化検索、ハイブリッド検索、NULL許容フィールド、または動的に追加されたフィールドを利用する前に、<a href="/docs/ja/structarray-limits.md">StructArrayの制限事項</a>を確認してください。</p></li>
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
<li><p>スキーマを設計するには、「<a href="/docs/ja/create-structarray-field.md">StructArray フィールドの作成</a>」を参照してください。</p></li>
<li><p>データを準備するには、「<a href="/docs/ja/insert-data-into-structarray-fields.md">StructArrayフィールドへのデータ挿入</a>」を参照してください。</p></li>
<li><p>インデックスを選択するには、「<a href="/docs/ja/index-structarray-fields.md">StructArrayフィールドへのインデックス設定</a>」を参照してください。</p></li>
<li><p>StructArrayのベクトルサブフィールドを検索するには、「<a href="/docs/ja/basic-vector-search-with-structarray.md">StructArray を使用した基本的なベクトル検索</a>」から始めてください。</p></li>
<li><p>StructArrayのスカラーサブフィールドをフィルタリングするには、「<a href="/docs/ja/struct-array-operators.md">StructArray演算子</a>」および「<a href="/docs/ja/filtered-search-with-structarray.md">StructArrayを使用したフィルタ検索</a>」を参照してください。</p></li>
</ol>
