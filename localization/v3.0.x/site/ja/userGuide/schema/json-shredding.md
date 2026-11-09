---
id: json-shredding.md
title: JSONシュレッディングCompatible with Milvus 2.6.2+
summary: >-
  JSONシュレッディングは、従来の行ベースのストレージを最適化された列指向ストレージに変換することで、JSONクエリの処理を高速化します。Milvusは、データモデリングにおけるJSONの柔軟性を維持しつつ、バックグラウンドで列指向の最適化を実行し、アクセスおよびクエリの効率を劇的に向上させます。
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">JSONシュレッディング<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>JSONシュレッディングは、従来の行ベースのストレージを最適化された列指向ストレージに変換することで、JSONクエリを高速化します。Milvusは、データモデリングにおけるJSONの柔軟性を維持しつつ、バックグラウンドで列指向の最適化を実行し、アクセスおよびクエリの効率を劇的に向上させます。</p>
<p>JSONシュレッディングは、ほとんどのJSONクエリシナリオで有効です。以下の条件では、パフォーマンス上のメリットがさらに顕著になります。</p>
<ul>
<li><p><strong>大規模で複雑なJSONドキュメント</strong>— ドキュメントサイズが大きくなるほど<strong>、</strong>パフォーマンスの向上が顕著になります</p></li>
<li><p><strong>読み取り中心のワークロード</strong>— JSONキーに対する頻繁なフィルタリング、ソート、または検索</p></li>
<li><p><strong>混合クエリパターン</strong>— 異なるJSONキーを跨ぐクエリでは、ハイブリッドストレージアプローチの恩恵を受けられます</p></li>
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
    </button></h2><p>JSONシュレッディング処理は、高速なデータ取得のためにデータを最適化するため、3つの明確なフェーズで行われます。</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">フェーズ 1: 取り込みとキーの分類<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>新しい JSON ドキュメントが書き込まれるにつれて、Milvus はそれらを継続的にサンプリングおよび分析し、各 JSON キーの統計情報を構築します。この分析には、キーの出現率やタイプの安定性（ドキュメント間でデータ型が一貫しているかどうか）が含まれます。</p>
<p>これらの統計データに基づき、JSONキーは最適なストレージを実現するために以下のように分類されます。</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">JSONキーの分類</h4><table>
   <tr>
     <th><p>キーの種類</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>型付きキー</p></td>
     <td><p>ほとんどのドキュメントに存在し、常に同じデータ型（例：すべて整数、またはすべて文字列）を持つキー。</p></td>
   </tr>
   <tr>
     <td><p>動的キー</p></td>
     <td><p>頻繁に現れるが、データ型が混在しているキー（例：時には文字列、時には整数）。</p></td>
   </tr>
   <tr>
     <td><p>共有キー</p></td>
     <td><p>出現頻度が低い、またはネストされたキーで、設定可能な出現頻度閾値を下回るもの<strong>。</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">分類例</h4><p>以下のJSONキーを含むサンプルJSONデータを考えてみましょう：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>このデータに基づくと、キーは次のように分類されます：</p>
<ul>
<li><p><strong>型付きキー</strong>：<code translate="no">a</code> および<code translate="no">f</code> （常に整数）</p></li>
<li><p><strong>動的キー</strong>：<code translate="no">b</code> （文字列と整数の混合）</p></li>
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
    </button></h3><p><a href="/docs/ja/json-shredding.md#Phase-1-Ingestion--key-classification">フェーズ1</a>での分類結果に基づき、ストレージのレイアウトが決定されます。Milvusは、クエリ処理に最適化された列指向形式を採用しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>JSON シュレッディングの流れ</span>
  
 </span></p>
<ul>
<li><p><strong>シュレッディングされたカラム</strong>：<strong>型付き</strong> <strong>キー</strong>および<strong>動的</strong> <strong>キー</strong>の場合、データは専用のカラムに書き込まれます。このカラム型ストレージにより、クエリ実行時に高速かつ直接的なスキャンが可能になります。これは、Milvusがドキュメント全体を処理することなく、特定のキーに必要なデータのみを読み取ることができるためです。</p></li>
<li><p><strong>共有カラム</strong>：すべての<strong>共有キーは</strong>、単一のコンパクトなバイナリJSONカラムにまとめて格納されます。このカラムに基づいて、共有キー<strong>用の逆引きインデックスが</strong>構築されます。このインデックスは、Milvusがデータを迅速に絞り込み、検索範囲を指定されたキーを含む行のみに効果的に限定できるようにすることで、出現頻度の低いキーに対するクエリを高速化する上で極めて重要です。</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">フェーズ3：クエリの実行<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>最終フェーズでは、最適化されたストレージレイアウトを活用し、各クエリ述語に対して最も高速なパスをインテリジェントに選択します。</p>
<ul>
<li><p><strong>高速パス</strong>：型付き/動的キー（例：<code translate="no">json['a'] &lt; 100</code> ）に対するクエリは、専用のカラムに直接アクセスします。</p></li>
<li><p><strong>最適化パス</strong>：共有キー（例：<code translate="no">json['e'] = 'rare'</code> ）に対するクエリは、反転インデックスを使用して関連ドキュメントを迅速に特定します</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">JSON シュレッディングを有効にする<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>この機能を有効にするには、<code translate="no">milvus.yaml</code> の設定ファイルで `<code translate="no">common.enabledJSONShredding</code> ` を `<code translate="no">true</code> ` に設定してください。新しいデータが取り込まれると、自動的にシュレッディング処理が開始されます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>有効化されると、MilvusはJSONデータの取り込み時に、それ以上の手動操作を必要とせずに、データの分析と再構成を開始します。</p>
<h2 id="Parameter-tuning" class="common-anchor-header">パラメータの調整<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>ほとんどのユーザーにとって、JSON シュレッディングを有効にすれば、他のパラメータのデフォルト設定で十分です。ただし、<code translate="no">milvus.yaml</code> 内の以下のパラメータを使用して、JSON シュレッディングの動作を微調整することも可能です。</p>
<table>
   <tr>
     <th><p>パラメータ名</p></th>
     <th><p>説明</p></th>
     <th><p>デフォルト値</p></th>
     <th><p>調整のアドバイス</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>JSON シュレッディングのビルドおよびロードプロセスを有効にするかどうかを制御します。</p></td>
     <td><p>false</p></td>
     <td><p>この機能を有効にするには、<strong>true</strong>に設定する必要があります。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Milvusが高速化のためにシュレッディングされたデータを使用するかどうかを制御します。</p></td>
     <td><p>true</p></td>
     <td><p>クエリが失敗した場合の復旧措置として<strong>false</strong>に設定し、元のクエリパスに戻します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Milvus がシュレッディングデータの読み込み時に mmap を使用するかどうかを決定します。</p><p>詳細については、「<a href="/docs/ja/mmap.md">mmap の使用</a>」を参照してください。</p></td>
     <td><p>true</p></td>
     <td><p>この設定は、一般的にパフォーマンスが最適化されています。システムに特定のメモリ管理上の要件や制約がある場合にのみ、調整してください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>シュレッディングされたカラムに格納される JSON キーの最大数。 </p><p>頻繁に現れるキーの数がこの制限を超える場合、Milvus は最も頻度の高いキーを優先してシュレッディングを行い、残りのキーは共有カラムに格納されます。</p></td>
     <td><p>1024</p></td>
     <td><p>これはほとんどのシナリオで十分です。頻繁に出現するキーが数千個ある JSON の場合は、この値を増やす必要がありますが、ストレージの使用状況を監視してください。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>JSON キーがシュレッドされたカラムへのシュレッド対象となるために必要な、出現頻度の最低比率です。</p><p>この閾値を超えると、そのキーは頻繁に出現するものとみなされます。</p></td>
     <td><p>0.3xml-ph-0000@deepl.internal</p></td>
     <td><p>シュレッディングの基準を満たすキーの数が、<code translate="no">dataCoord.jsonShreddingMaxColumns</code> の制限を超える場合は、<strong>この値を</strong>（たとえば 0.5 など）に<strong>増やしてください</strong>。これにより、しきい値が厳しくなり、シュレッディングの対象となるキーの数が減少します。</p><p>デフォルトの 30% のしきい値よりも出現頻度の低いキーをさらに多くシュレッドしたい場合は、<strong>この値を小さくします</strong>（例：0.1）。</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">パフォーマンスのベンチマーク<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>当社のテストでは、さまざまな JSON キータイプやクエリパターンにおいて、パフォーマンスが大幅に向上することが実証されています。</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">テスト環境と方法論<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>ハードウェア</strong>：1 コア/8GB クラスタ</p></li>
<li><p><strong>データセット</strong>：<a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a>からの 100 万件のドキュメント</p></li>
<li><p><strong>ドキュメントの平均サイズ</strong>：478.89バイト</p></li>
<li><p><strong>テスト時間</strong>：QPSおよびレイテンシを測定する100秒間</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">結果：型付きキー<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>このテストでは、ほとんどのドキュメントに存在するキーをクエリした際のパフォーマンスを測定しました。</p>
<table>
   <tr>
     <th><p>クエリ式</p></th>
     <th><p>キー値の型</p></th>
     <th><p>QPS（シュレッディングなし）</p></th>
     <th><p>QPS（シュレッディングあり）</p></th>
     <th><p>パフォーマンス向上率</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>整数</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33倍</p></td>
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
    </button></h3><p>このテストでは、「共有」カテゴリに分類される、疎でネストされたキーに対するクエリに焦点を当てました。</p>
<table>
   <tr>
     <th><p>クエリ式</p></th>
     <th><p>キー値の型</p></th>
     <th><p>QPS（シュレッディングなし）</p></th>
     <th><p>QPS（シュレッディングあり）</p></th>
     <th><p>パフォーマンスの向上</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>ネストされた整数</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9倍</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>ネストされた文字列</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3倍</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">主な知見<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>共有キーによるクエリでは</strong>、最も劇的なパフォーマンス向上（最大89倍の高速化）が見られる</p></li>
<li><p><strong>型付きキーによるクエリでは</strong>、一貫して15～30倍のパフォーマンス向上が見られる</p></li>
<li><p><strong>すべてのクエリタイプで</strong>、パフォーマンスの低下を招くことなくJSONシュレッディングの恩恵を受けられる</p></li>
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
<li><p><strong>JSONシュレッディングが正常に機能しているかどうかを確認するにはどうすればよいですか？</strong></p>
<ol>
<li><p>まず、<a href="/docs/ja/birdwatcher_usage_guides.md">Birdwatcherツールの</a> <code translate="no">show segment --format table</code> <a href="/docs/ja/birdwatcher_usage_guides.md"></a>コマンドを使用して、データが構築されているか確認してください。正常に構築されていれば、出力の「<strong>Json Key Stats</strong>」フィールドに「<code translate="no">shredding_data/</code> 」および「<code translate="no">shared_key_index/</code> 」が表示されます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Birdwatcherの出力</span>
  
 </span></p></li>
<li><p>次に、クエリノードで `<code translate="no">show loaded-json-stats</code> ` を実行し、データが読み込まれていることを確認します。出力には、各クエリノードについて、読み込まれたシュレッディング済みデータの詳細が表示されます。</p></li>
</ol></li>
<li><p><strong>エラーが発生した場合は？</strong></p>
<p>ビルドまたはロード処理が失敗した場合は、<code translate="no">common.enabledJSONShredding=false</code> を設定することで、この機能を即座に無効にできます。残っているタスクをすべてクリアするには、<a href="/docs/ja/birdwatcher_usage_guides.md">Birdwatcherで</a> <code translate="no">remove stats-task &lt;task_id&gt;</code> コマンドを使用してください。クエリが失敗した場合は、<code translate="no">common.usingjsonShreddingForQuery=false</code> を設定して、シュレッドされたデータをバイパスし、元のクエリパスに戻してください。</p></li>
</ul>
<ul>
<li><p><strong>JSONシュレッディングとJSONインデックス化のどちらを選択すればよいですか？</strong></p>
<ul>
<li><p><strong>JSON シュレッディングは</strong>、ドキュメント内で頻繁に現れるキー、特に複雑な JSON 構造に最適です。これは、列指向ストレージと逆引きインデックスの利点を組み合わせたもので、多くの異なるキーをクエリする読み取り中心のシナリオに非常に適しています。ただし、パフォーマンスの向上がごくわずかであるため、非常に小さな JSON ドキュメントには推奨されません。 JSONドキュメントの総サイズに対するキーの値の割合が小さいほど、シュレッディングによるパフォーマンスの最適化効果は高くなります。</p></li>
<li><p><strong>JSONインデックスは</strong>、特定のキーに基づくクエリをターゲットに最適化する場合に適しており、ストレージのオーバーヘッドも低くなります。より単純なJSON構造に適しています。なお、JSONシュレッディングでは配列内のキーに対するクエリは対象外となるため、それらを高速化するにはJSONインデックスが必要です。</p></li>
</ul>
<p>詳細については、「<a href="/docs/ja/json-field-overview.md#Next-Accelerate-JSON-queries">JSON フィールドの概要</a>」を参照してください。</p></li>
</ul>
