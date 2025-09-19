---
id: json-shredding.md
title: JSONシュレッダーCompatible with Milvus 2.6.2+
summary: >-
  JSONシュレッダーは、従来の行ベースのストレージを最適化されたカラム型ストレージに変換することで、JSONクエリを高速化します。Milvusは、データモデリングにおけるJSONの柔軟性を維持しながら、舞台裏でカラム単位の最適化を行い、アクセスとクエリの効率を劇的に改善します。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSONシュレッダー<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSONシュレッディングは、従来の行ベースのストレージを最適化されたカラム型ストレージに変換することで、JSONクエリを高速化します。Milvusは、JSONのデータモデリングにおける柔軟性を維持しながら、舞台裏でカラム単位の最適化を行い、アクセスとクエリの効率を劇的に改善します。</p>
<p>JSONシュレッダーは、ほとんどのJSONクエリシナリオに有効です。パフォーマンスの利点は、以下の場合に顕著になります：</p>
<ul>
<li><p><strong>より大きく、より複雑な JSON ドキュメント</strong>- ドキュメントサイズが大きくなるほど、パフォーマンスが向上します。</p></li>
<li><p><strong>読み取り負荷の高いワークロード</strong>- JSONキーの頻繁なフィルタリング、ソート、検索</p></li>
<li><p><strong>混合クエリパターン</strong>- 異なるJSONキーにまたがるクエリは、ハイブリッドストレージアプローチの恩恵を受けます。</p></li>
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
    </button></h2><p>JSONのシュレッダー処理は、3つのフェーズで行われ、データを最適化して高速な検索を実現します。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">フェーズ1：取り込みとキーの分類<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>新しいJSONドキュメントが書き込まれると、Milvusは継続的にサンプリングと分析を行い、各JSONキーの統計情報を作成します。この分析には、キーの出現率と型の安定性（データ型が文書間で一貫しているかどうか）が含まれます。</p>
<p>これらの統計に基づき、JSONキーは最適な保存のために以下のように分類されます。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSONキーの分類</h4><table>
   <tr>
     <th><p>キーの種類</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>型付きキー</p></td>
     <td><p>ほとんどのドキュメントに存在し、常に同じデータ型を持つキー（例：すべての整数またはすべての文字列）。</p></td>
   </tr>
   <tr>
     <td><p>動的なキー</p></td>
     <td><p>頻繁に現れるがデータ型がまちまちなキー（例えば、文字列のときもあれば整数のときもある）。</p></td>
   </tr>
   <tr>
     <td><p>共有キー</p></td>
     <td><p>設定可能な頻度のしきい値を下回る、出現頻度の低いキーやネストしたキー<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分類の例</h4><p>以下のJSONキーを含むサンプルJSONデータを考えてみましょう：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>このデータに基づいて、キーは以下のように分類される：</p>
<ul>
<li><p><strong>型付きキー</strong>:<code translate="no">a</code> と<code translate="no">f</code> (常に整数)</p></li>
<li><p><strong>動的キー</strong>:<code translate="no">b</code> (文字列と整数の混合)</p></li>
<li><p><strong>共有キー</strong>：<code translate="no">e</code> （出現頻度の低いキー）</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">フェーズ2：ストレージの最適化<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="/docs/ja/json-shredding.md#Phase-1-Ingestion--key-classification">フェーズ1の</a>分類により、ストレージのレイアウトが決定される。milvusはクエリに最適化されたカラム形式を使用する。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Jsonシュレッダーフロー</span> </span></p>
<ul>
<li><p><strong>細断されたカラム</strong>：<strong>型付き</strong> <strong>キーと</strong> <strong>動的</strong> <strong>キーの</strong>場合、データは専用のカラムに書き込まれる。このカラム型ストレージにより、Milvusはドキュメント全体を処理することなく、指定されたキーの必要なデータのみを読み出すことができるため、クエリ時に高速でダイレクトなスキャンが可能となる。</p></li>
<li><p><strong>共有カラム</strong>：すべての<strong>共有キーは</strong>単一のコンパクトなバイナリJSONカラムにまとめて格納される。このカラムには共有キーの<strong>転置インデックスが</strong>構築される。このインデックスは、Milvusがデータを迅速に刈り込み、検索空間を指定されたキーを含む行のみに効果的に絞り込むことで、頻度の低いキーのクエリを高速化する上で極めて重要である。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">フェーズ 3：クエリの実行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最終フェーズでは、最適化されたストレージレイアウトを活用し、各クエリ述語の最速パスをインテリジェントに選択します。</p>
<ul>
<li><p><strong>高速パス</strong>：型付き/動的キー（例：<code translate="no">json['a'] &lt; 100</code> ）に対するクエリは、専用カラムに直接アクセスします。</p></li>
<li><p><strong>最適化されたパス</strong>：共有キー（例：<code translate="no">json['e'] = 'rare'</code> ）に対するクエリは、転置インデックスを使用して関連ドキュメントを迅速に検索する。</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">JSONシュレッダーを有効にする<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>この機能を有効にするには、<code translate="no">milvus.yaml</code> 設定ファイルで<code translate="no">common.enabledJSONKeyStats</code> を<code translate="no">true</code> に設定します。新しいデータは自動的にシュレッダー処理のトリガーとなります。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONKeyStats:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>この機能を有効にすると、MilvusはJSONデータの解析と再構築を開始します。</p>
<h2 id="Parameter-tuning" class="common-anchor-header">パラメータ調整<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>JSONシュレッダーを有効にすると、他のパラメータはデフォルト設定で十分です。しかし、<code translate="no">milvus.yaml</code> のこれらのパラメータを使用して、JSONシュレッダーの動作を微調整することができます。</p>
<table>
   <tr>
     <th><p>パラメータ名</p></th>
     <th><p>説明</p></th>
     <th><p>デフォルト値</p></th>
     <th><p>チューニング・アドバイス</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONKeyStats</code></p></td>
     <td><p>JSON 破砕のビルドとロードのプロセスを有効にするかどうかを制御します。</p></td>
     <td><p>false</p></td>
     <td><p>機能を有効にするには<strong>trueに</strong>設定する必要があります。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingJsonStatsForQuery</code></p></td>
     <td><p>Milvusが高速化のためにシュレッダーされたデータを使用するかどうかを制御します。</p></td>
     <td><p>true</p></td>
     <td><p>クエリが失敗した場合のリカバリ手段として<strong>falseに</strong>設定し、元のクエリパスに戻します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonStats</code></p></td>
     <td><p>Milvusが細断データをロードする際にmmapを使用するかどうかを決定します。</p><p>詳細については、<a href="/docs/ja/mmap.md">mmapを使用するを</a>参照してください。</p></td>
     <td><p>真</p></td>
     <td><p>この設定は一般的にパフォーマンスに最適化されています。特定のメモリ管理が必要であったり、システムに制約がある場合にのみ調整してください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code></p></td>
     <td><p>細断カラムに格納されるJSONキーの最大数。 </p><p>頻繁に出現するキーの数がこの上限を超えた場合、Milvusは最も頻繁に出現するキーを優先的にシュレッダーにかけ、残りのキーは共有カラムに保存されます。</p></td>
     <td><p>1024</p></td>
     <td><p>ほとんどのシナリオではこれで十分です。数千のキーが頻繁に出現するJSONの場合、これを増やす必要があるかもしれませんが、ストレージの使用状況を監視してください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonStatsShreddingRatioThreshold</code></p></td>
     <td><p>JSONキーが細断カラムへの細断を考慮されるために必要な最小出現率。</p><p>キーは、その比率がこのしきい値を超えている場合、頻繁に出現するとみなされる。</p></td>
     <td><p>0.3</p></td>
     <td><p>細断基準を満たすキーの数が<code translate="no">dataCoord.jsonStatsMaxShreddingColumns</code> の制限を超えた場合に<strong>増加させる</strong>（例えば0.5に）。これにより、閾値が厳しくなり、シュレッダーの対象となる鍵の数が減る。</p><p>デフォルトのしきい値30%より出現頻度の低い鍵をより多く細断する場合は、 0.1に<strong>減らす</strong>。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">性能ベンチマーク<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>私たちのテストでは、さまざまな JSON キーのタイプとクエリのパターンで、パフォーマンスが大幅に向上していることが実証されています。</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">テスト環境と方法<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>ハードウェア</strong>: 1コア/8GBクラスタ</p></li>
<li><p><strong>データセット</strong> <a href="https://github.com/ClickHouse/JSONBench.git">JSONBenchからの</a>100万ドキュメント</p></li>
<li><p><strong>平均ドキュメントサイズ</strong>：478.89バイト</p></li>
<li><p><strong>テスト時間</strong>100秒間でQPSとレイテンシーを測定</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">結果: タイプされたキー<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>このテストでは、ほとんどのドキュメントに存在するキーをクエリしたときのパフォーマンスを測定しました。</p>
<table>
   <tr>
     <th><p>クエリー表現</p></th>
     <th><p>キーの値の種類</p></th>
     <th><p>QPS（シュレッダーなし）</p></th>
     <th><p>QPS（シュレッダーあり）</p></th>
     <th><p>パフォーマンス・ブースト</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整数</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>文字列</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">結果：共有キー<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>このテストでは、"共有 "カテゴリーに分類される、疎なネストされたキーのクエリに焦点を当てた。</p>
<table>
   <tr>
     <th><p>クエリ式</p></th>
     <th><p>キー値のタイプ</p></th>
     <th><p>QPS（シュレッダーなし）</p></th>
     <th><p>QPS（シュレッダーあり）</p></th>
     <th><p>パフォーマンス向上</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>入れ子の整数</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>入れ子文字列</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">キーインサイト<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>共有キークエリが</strong>最も劇的な改善を示す（最大89倍高速化）</p></li>
<li><p><strong>型付きキークエリは</strong>一貫して15～30倍のパフォーマンス向上を実現</p></li>
<li><p><strong>すべてのクエリタイプが</strong>JSON Shreddingの恩恵を受け、パフォーマンスの低下は見られない。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>JSONシュレッダーが正しく機能するかどうかを確認するにはどうすればよいですか？</strong></p>
<ol>
<li><p>まず、<a href="/docs/ja/birdwatcher_usage_guides.md">Birdwatcher</a>ツールの<code translate="no">show segment --format table</code> コマンドを使用して、データが構築されているかどうかを確認します。成功すれば、<strong>Json Key Stats</strong>フィールドの下に<code translate="no">shredding_data/</code> と<code translate="no">shared_key_index/</code> が出力されます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Birdwatcherの出力</span> </span></p></li>
<li><p>次に、クエリーノードで<code translate="no">show loaded-json-stats</code> を実行して、データがロードされたことを確認します。出力には、各クエリーノードについてロードされた細断データの詳細が表示されます。</p></li>
</ol></li>
<li><p><strong>JSONシュレッダーとJSONインデックスのどちらを選択すればよいですか？</strong></p>
<ul>
<li><p><strong>JSONシュレッダーは</strong>、ドキュメントに頻繁に現れるキー、特に複雑なJSON構造に最適です。JSONシュレッダーは、カラム型ストレージと転置インデックスの利点を兼ね備えているため、多くの異なるキーにクエリを発行するような、読み取り負荷の高いシナリオに適しています。しかし、非常に小さなJSONドキュメントに対しては、パフォーマンス向上がわずかであるため、推奨されない。JSONドキュメントの総サイズに占めるキーの値の割合が小さいほど、シュレッダーによるパフォーマンスの最適化は向上する。</p></li>
<li><p><strong>JSONインデクシングは</strong>、特定のキーベースのクエリの最適化に適しており、ストレージのオーバーヘッドも低くなります。より単純なJSON構造に適しています。JSONシュレッダーは、配列内のキーに対するクエリには対応していないため、これらのクエリを高速化するにはJSONインデックスが必要であることに注意してください。</p></li>
</ul></li>
<li><p><strong>エラーが発生した場合はどうなりますか？</strong></p>
<p>ビルドやロードのプロセスが失敗した場合、<code translate="no">common.enabledJSONKeyStats=false</code> を設定することで、この機能をすぐに無効にすることができます。残っているタスクを消去するには、<a href="/docs/ja/birdwatcher_usage_guides.md">Birdwatcherの</a> <code translate="no">remove stats-task &lt;task_id&gt;</code> コマンドを使ってください。クエリーが失敗した場合、<code translate="no">common.usingJsonStatsForQuery=false</code> を設定すると、細断されたデータをバイパスして、元のクエリーパスに戻ります。</p></li>
</ul>
