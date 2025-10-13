---
id: inverted.md
title: 反転
summary: >-
  データに対して頻繁にフィルタクエリを実行する必要がある場合、転置インデックスによりクエリのパフォーマンスを劇的に向上させることができます。Milvusは、すべての文書をスキャンする代わりに、転置インデックスを使用して、フィルタ条件に一致する正確なレコードを迅速に検索します。
---
<h1 id="INVERTED" class="common-anchor-header">反転<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>データに対して頻繁にフィルタクエリを実行する必要がある場合、<code translate="no">INVERTED</code> インデックスはクエリパフォーマンスを劇的に向上させます。Milvusは全ての文書をスキャンする代わりに、転置インデックスを使用し、フィルタ条件に一致する正確なレコードを素早く探し出します。</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">転置インデックスを使用する場合<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>INVERTEDインデックスは以下のような場合に使用します：</p>
<ul>
<li><p><strong>特定の値でフィルタリング</strong>する：フィールドが特定の値に等しいすべてのレコードを検索します（例：<code translate="no">category == &quot;electronics&quot;</code> ）。</p></li>
<li><p><strong>テキストコンテンツのフィルタリング</strong>：<code translate="no">VARCHAR</code> フィールドを効率的に検索する。</p></li>
<li><p><strong>JSONフィールド値のクエリ</strong>：JSON構造内の特定のキーにフィルターをかける</p></li>
</ul>
<p><strong>パフォーマンス上の利点</strong>: INVERTED インデックスは、コレクション全体のスキャンを不要にすることで、大規模なデータセットのクエリ時間を数秒から数ミリ秒に短縮することができます。</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">INVERTED インデックスの仕組み<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの<strong>INVERTEDインデックスは</strong>、一意のフィールド値（用語）を、その値が出現するドキュメントIDの集合にマッピングします。この構造により、繰り返し値やカテゴリ値を持つフィールドの高速検索が可能になります。</p>
<p>図に示すように、処理は2つのステップで行われる：</p>
<ol>
<li><p><strong>前方マッピング（ID → 用語）：</strong>各文書IDは、それが含むフィールド値を指す。</p></li>
<li><p><strong>反転マッピング（用語 → ID）：</strong>Milvusはユニークな用語を収集し、各用語からそれを含むすべてのIDへの逆マッピングを構築します。</p></li>
</ol>
<p>例えば、<strong>"electronics "</strong>という値はID1と<strong>3に</strong>、<strong>"books "</strong>はID2と<strong>5に</strong>マッピングされます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" />
   </span> <span class="img-wrapper"> <span>転置インデックスの仕組み</span> </span></p>
<p>特定の値(例:<code translate="no">category == &quot;electronics&quot;</code>)を検索する場合、Milvusは単純にインデックスでその用語を検索し、一致するIDを直接取得します。これにより、データセット全体をスキャンする必要がなくなり、特にカテゴリ値や繰り返し値の高速フィルタリングが可能になります。</p>
<p>INVERTEDインデックスは、<strong>BOOL</strong>、<strong>INT8</strong>、<strong>INT16</strong>、<strong>INT32</strong>、<strong>INT64</strong>、<strong>FLOAT</strong>、<strong>DOUBLE</strong>、<strong>VARCHAR</strong>、<strong>JSON</strong>、<strong>ARRAYなど</strong>、すべてのスカラーフィールド型をサポートしています。ただし、JSONフィールドにインデックスを作成する際のインデックス・パラメータは、通常のスカラー・フィールドとは若干異なります。</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">JSON以外のフィールドにインデックスを作成する<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>JSON以外のフィールドにインデックスを作成するには、以下の手順に従います：</p>
<ol>
<li><p>インデックス・パラメータを準備する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">INVERTED</code> インデックスを追加する：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>インデックスを作成する：</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">JSONフィールドにインデックスを作成する<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>JSONフィールド内の特定のパスにINVERTEDインデックスを作成することもできます。これには、JSONパスとデータ型を指定する追加のパラメータが必要です：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>サポートされているパス、データ型、制限など、JSONフィールド・インデックスの詳細については、「<a href="/docs/ja/use-json-fields.md">JSONフィールド</a>」を参照してください。</p>
<h2 id="Best-practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>データのロード後にインデックスを作成</strong>する：パフォーマンスを向上させるために、すでにデータを含むコレクションにインデックスを作成します。</p></li>
<li><p><strong>説明的なインデックス名を使用する</strong>：フィールドと目的を明確に示す名前を選択する</p></li>
<li><p><strong>インデックスのパフォーマンスを監視する</strong>：インデックス作成前と作成後のクエリパフォーマンスをチェックする</p></li>
<li><p><strong>クエリのパターンを考慮する</strong>：頻繁にフィルタリングするフィールドにインデックスを作成する</p></li>
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
    </button></h2><ul>
<li><p><a href="/docs/ja/index-explained.md">他のインデックスタイプについて</a>学ぶ</p></li>
<li><p>JSON インデックスの高度なシナリオについては、<a href="/docs/ja/use-json-fields.md#Index-values-inside-the-JSON-field">JSON フィールドインデックスを</a>参照してください。</p></li>
</ul>
