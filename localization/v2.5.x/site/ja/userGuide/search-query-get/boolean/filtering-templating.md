---
id: filtering-templating.md
summary: >-
  Milvusでは、多数の要素を含む複雑なフィルタ式、特に日中韓文字のような非ASCII文字を含むフィルタ式は、クエリのパフォーマンスに大きな影響を与える可能性があります。この問題に対処するため、Milvusでは複雑な式の解析にかかる時間を短縮し、効率を向上させることを目的としたフィルタ式のテンプレート化機構を導入しています。このページでは、検索、クエリー、削除操作におけるフィルター式のテンプレート化について説明します。
title: フィルタリング・テンプレート
---
<h1 id="Filter-Templating​" class="common-anchor-header">フィルタテンプレート<button data-href="#Filter-Templating​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、多数の要素を含む複雑なフィルタ式、特に日中韓文字のような非ASCII文字を含むフィルタ式は、クエリのパフォーマンスに大きな影響を与える可能性があります。この問題に対処するため、Milvusでは複雑な式の解析にかかる時間を短縮し、効率を向上させることを目的としたフィルタ式のテンプレート化機構を導入しています。このページでは、検索、クエリ、削除操作におけるフィルタ式のテンプレート化について説明します。</p>
<h2 id="Overview​" class="common-anchor-header">概要<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>フィルタ式のテンプレート化により、プレースホルダを持つフィルタ式を作成し、クエリ実行中に動的に値を代入することができます。テンプレート化を使用すると、大きな配列や複雑な式を直接フィルタに埋め込む必要がなくなるので、解析時間が短縮され、クエリのパフォーマンスが向上します。</p>
<p>例えば、<code translate="no">age</code> と<code translate="no">city</code> という2つのフィールドを含むフィルタ式があり、年齢が25歳以上で、"北京"（北京）か "上海"（上海）のどちらかに住んでいる人をすべて見つけたいとします。フィルター式に値を直接埋め込む代わりに、テンプレートを使うことができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​

<button class="copy-code-btn"></button></code></pre>
<p>ここで、<code translate="no">{age}</code> と<code translate="no">{city}</code> はプレースホルダで、クエリ実行時に<code translate="no">filter_params</code> の実際の値に置き換えられます。</p>
<p>Milvusでフィルタ式のテンプレート化を使用すると、いくつかの重要な利点があります。</p>
<ul>
<li><p><strong>解析時間の短縮</strong>: 大きく複雑なフィルタ式をプレースホルダに置き換えることで、フィルタの解析と処理にかかる時間を短縮できます。</p></li>
<li><p><strong> <strong>クエリパフォーマンスの</strong>向上</strong>：解析のオーバーヘッドが減ることで、クエリのパフォーマンスが向上し、QPSの向上とレスポンスタイムの短縮につながります。</p></li>
<li><p><strong>スケーラビリティ</strong>：データセットが大きくなり、フィルター式が複雑になっても、テンプレート化によってパフォーマンスが効率的かつスケーラブルに維持されます。</p></li>
</ul>
<h2 id="Search-Operations​" class="common-anchor-header">検索オペレーション<button data-href="#Search-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの検索操作では、<code translate="no">filter</code> 式を使用してフィルタリング条件を定義し、<code translate="no">filter_params</code> パラメータを使用してプレースホルダの値を指定します。<code translate="no">filter_params</code> 辞書には、Milvusがフィルター式に代入するために使用する動的な値が含まれています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.search(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    vectors[:nq],​
    filter=<span class="hljs-built_in">expr</span>,​
    <span class="hljs-built_in">limit</span>=10,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: 100}},​
    filter_params=filter_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>この例では、Milvusは検索を実行する際に、<code translate="no">{age}</code> を<code translate="no">25</code> に、<code translate="no">{city}</code> を<code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> に動的に置き換えます。</p>
<h2 id="Query-Operations​" class="common-anchor-header">クエリ操作<button data-href="#Query-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのクエリーオペレーションにも同じテンプレート機構を適用することができます。<code translate="no">query</code> 、フィルタ式を定義し、<code translate="no">filter_params</code> 、置換する値を指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.query(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">filter_params</code> を使用することで、Milvusは値の動的挿入を効率的に処理し、クエリの実行速度を向上させます。</p>
<h2 id="Delete-Operations​" class="common-anchor-header">削除操作<button data-href="#Delete-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>削除操作でもフィルタ式のテンプレート化を使用することができます。検索や問い合わせと同様に、<code translate="no">filter</code> 式が条件を定義し、<code translate="no">filter_params</code> がプレースホルダの動的値を提供します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.delete(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>この方法は、特に複雑なフィルター条件を扱う場合に、削除操作のパフォーマンスを向上させます。</p>
<h2 id="Conclusion​" class="common-anchor-header">結論<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>フィルタ式のテンプレート化は、Milvusのクエリ性能を最適化するために不可欠なツールです。プレースホルダと<code translate="no">filter_params</code> 辞書を使用することで、複雑なフィルタ式の解析にかかる時間を大幅に短縮することができます。これにより、問い合わせの実行が速くなり、全体的なパフォーマンスが向上します。</p>
