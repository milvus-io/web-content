---
id: filtering-templating.md
title: フィルタのテンプレート化
summary: >-
  Milvusでは、多数の要素を含む複雑なフィルタ式、特にCJK文字などの非ASCII文字を含むものは、クエリのパフォーマンスに大きな影響を与える可能性があります。この問題に対処するため、Milvusでは、複雑な式の解析にかかる時間を短縮することで効率を向上させることを目的とした、フィルタ式テンプレート機能を導入しています。このページでは、検索、クエリ、および削除操作におけるフィルタ式テンプレートの使用方法について説明します。
---
<h1 id="Filter-Templating" class="common-anchor-header">フィルタのテンプレート化<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、多数の要素を含む複雑なフィルタ式、特にCJK文字などの非ASCII文字を含むものは、クエリのパフォーマンスに大きな影響を与える可能性があります。この問題に対処するため、Milvusでは、複雑な式の解析にかかる時間を短縮することで効率を向上させることを目的とした、フィルタ式のテンプレート化メカニズムを導入しています。このページでは、検索、クエリ、および削除操作におけるフィルタ式のテンプレート化の使用方法について説明します。</p>
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
    </button></h2><p>フィルタ式のテンプレート機能を使用すると、プレースホルダーを含むフィルタ式を作成でき、クエリの実行時にそのプレースホルダーを動的に値に置き換えることができます。テンプレート機能を使用することで、大きな配列や複雑な式をフィルタに直接埋め込む必要がなくなり、解析時間を短縮してクエリのパフォーマンスを向上させることができます。</p>
<p>たとえば、<code translate="no">age</code> と<code translate="no">city</code> の 2 つのフィールドを含むフィルタ式があり、年齢が 25 歳以上で、「北京」または「上海」のいずれかに居住しているすべての人物を検索したいとします。フィルタ式に値を直接埋め込む代わりに、テンプレートを使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>ここで、<code translate="no">{age}</code> と<code translate="no">{city}</code> はプレースホルダーであり、クエリの実行時に<code translate="no">filter_params</code> 内の実際の値に置き換えられます。</p>
<p>Milvus でフィルタ式のテンプレート機能を使用することには、いくつかの重要な利点があります：</p>
<ul>
<li><p><strong>解析時間の短縮</strong>：大規模または複雑なフィルタ式をプレースホルダーに置き換えることで、システムがフィルタの解析と処理に費やす時間が短縮されます。</p></li>
<li><p><strong>クエリパフォーマンスの向上</strong>：解析のオーバーヘッドが軽減されることで、クエリパフォーマンスが向上し、QPSの向上と応答時間の短縮につながります。</p></li>
<li><p><strong>スケーラビリティ</strong>：データセットが拡大し、フィルタ式が複雑化しても、テンプレート化によりパフォーマンスの効率性とスケーラビリティが維持されます。</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">検索操作<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus での検索操作では、フィルタリング条件を定義するために `<code translate="no">filter</code> ` 式が使用され、プレースホルダーの値を指定するために `<code translate="no">filter_params</code> ` パラメータが使用されます。`<code translate="no">filter_params</code> ` 辞書には、Milvus がフィルタ式に代入するために使用する動的な値が含まれています。</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>この例では、検索の実行時に、Milvusは<code translate="no">{age}</code> を<code translate="no">25</code> に、<code translate="no">{city}</code> を<code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> に動的に置換します。</p>
<h2 id="Query-Operations" class="common-anchor-header">クエリ操作<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus のクエリ操作にも、同様のテンプレート機構を適用できます。<code translate="no">query</code> 関数では、フィルタ式を定義し、<code translate="no">filter_params</code> を使用して置換する値を指定します。</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">filter_params</code> を使用することで、Milvusは値の動的な挿入を効率的に処理し、クエリ実行速度を向上させます。</p>
<h2 id="Delete-Operations" class="common-anchor-header">削除操作<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>削除操作でも、フィルタ式のテンプレート化を使用できます。検索やクエリと同様に、<code translate="no">filter</code> 式で条件を定義し、<code translate="no">filter_params</code> でプレースホルダーに動的な値を指定します。</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>このアプローチにより、特に複雑なフィルタ条件を扱う場合、削除操作のパフォーマンスが向上します。</p>
<h2 id="Conclusion" class="common-anchor-header">まとめ<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>フィルタ式テンプレートは、Milvusにおけるクエリパフォーマンスを最適化するための不可欠なツールです。プレースホルダーと<code translate="no">filter_params</code> 辞書を使用することで、複雑なフィルタ式の解析にかかる時間を大幅に短縮できます。これにより、クエリの実行が高速化され、全体的なパフォーマンスが向上します。</p>
