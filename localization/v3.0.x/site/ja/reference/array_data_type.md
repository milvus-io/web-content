---
id: array_data_type.md
title: 配列フィールドの使用
---
<h1 id="Use-Array-Fields" class="common-anchor-header">配列フィールドの使用<button data-href="#Use-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、配列値の挿入、ベクトルおよび配列フィールドへのインデックスの作成、基本および高度な演算子を使用した配列フィールドの検索およびクエリなど、配列フィールドの使用方法について説明します。</p>
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
    </button></h2><p>以下の環境が整っていることを確認してください：</p>
<ul>
<li>Milvusがインストールされ、稼動していること。Milvusのインストール方法については、<a href="/docs/ja/install-overview.md">Milvusのインストールを</a>参照してください。</li>
<li>お使いの環境にMilvus SDKのいずれかがインストールされていること。詳細は「<a href="/docs/ja/install-pymilvus.md">SDKのインストール</a>」をご参照ください。</li>
</ul>
<h2 id="Prepare-data-with-an-array-field" class="common-anchor-header">配列フィールドでデータを準備する<button data-href="#Prepare-data-with-an-array-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはフィールドデータ型の一つとして配列をサポートしています。Milvusコレクション内の配列は常に同じデータ型の要素を持つ必要があり、配列要素のデータ型はMilvusでサポートされているデータ型のいずれでもかまいません。サポートされるデータ型のリストについては、<a href="https://milvus.io/docs/schema.md#Supported-data-types">サポートされるデータ</a>型を参照してください。</p>
<p>次のコード・スニペットは<code translate="no">color_coord</code> という名前の配列フィールドを含むランダムなデータセットを生成します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    current_coord = [ random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(random.randint(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)) ]
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;color_tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_coord&quot;</span>: current_coord,
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> java.util.*;

List&lt;String&gt; colors = Arrays.asList(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">Random</span> <span class="hljs-variable">rand</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-type">String</span> <span class="hljs-variable">current_color</span> <span class="hljs-operator">=</span> colors.get(rand.nextInt(colors.size()-<span class="hljs-number">1</span>));
    <span class="hljs-type">Integer</span> <span class="hljs-variable">current_tag</span> <span class="hljs-operator">=</span> rand.nextInt(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;

    <span class="hljs-comment">// Generate an random-sized array</span>
    <span class="hljs-type">int</span> <span class="hljs-variable">capacity</span> <span class="hljs-operator">=</span> rand.nextInt(<span class="hljs-number">5</span>) + <span class="hljs-number">1</span>;
    List&lt;Integer&gt; current_coord = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> j=<span class="hljs-number">0</span>; j&lt;capacity; j++) {
        current_coord.add(rand.nextInt(<span class="hljs-number">40</span>));
    }

    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, (<span class="hljs-type">long</span>) i);
    row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.addProperty(<span class="hljs-string">&quot;color_tag&quot;</span>, current_tag);
    row.add(<span class="hljs-string">&quot;color_coord&quot;</span>, gson.toJsonTree(current_coord));
    data.add(row);
}

System.out.println(data.get(<span class="hljs-number">0</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>];
<span class="hljs-keyword">let</span> data = [];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">const</span> current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)];
    <span class="hljs-keyword">const</span> current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>);
    <span class="hljs-keyword">const</span> current_coord = <span class="hljs-title class_">Array</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">5</span> + <span class="hljs-number">1</span>)).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">40</span>));

    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: <span class="hljs-title class_">Array</span>(<span class="hljs-number">5</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
        <span class="hljs-attr">color</span>: current_color,
        <span class="hljs-attr">color_tag</span>: current_tag,
        <span class="hljs-attr">color_coord</span>: current_coord,
    });
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>]);
<button class="copy-code-btn"></button></code></pre>
<p>このコード・スニペットは、ランダムな色のリストを用意し、1,000個の実体を含むデータセットを生成する。各エンティティは、ID、5つの浮動小数点数のベクトル、色、色タグ、および3～5個の整数値を含む配列フィールド<code translate="no">color_coord</code> 。サンプル・データを印刷して、その構造を検証する。</p>
<p>出力構造：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    id<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    vector<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-number">0.0338537420906162</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.6844108238358322</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.28410588909961754</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.09752595400212116</span><span class="hljs-punctuation">,</span>
        <span class="hljs-number">0.22671013058761114</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    color<span class="hljs-punctuation">:</span> &#x27;orange&#x27;<span class="hljs-punctuation">,</span>
    color_tag<span class="hljs-punctuation">:</span> <span class="hljs-number">5677</span><span class="hljs-punctuation">,</span>
    color_coord<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">29</span> <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-MilvusClient" class="common-anchor-header">Milvusクライアントのセットアップ<button data-href="#Set-up-MilvusClient" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusと対話するために、サーバアドレスを指定してMilvusクライアントをセットアップします。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

client = MilvusClient(uri=SERVER_ADDR)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.*;

<span class="hljs-type">String</span> <span class="hljs-variable">SERVER_ADDR</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(SERVER_ADDR)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Connect to Milvus server</span>
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({<span class="hljs-attr">address</span>: address});
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection-with-an-array-field" class="common-anchor-header">配列フィールドを持つコレクションの作成<button data-href="#Create-a-collection-with-an-array-field" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-collection-schema" class="common-anchor-header">コレクション・スキーマの定義<button data-href="#Define-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>スキーマは、フィールドとそのデータ型を含むコレクションの構造を定義します。以下の例は、<a href="#prepare-data-with-an-array-field">前のセクションで</a>生成されたサンプル・データに一致するコレクション・スキーマを定義します。</p>
<p>コレクションに配列フィールドを設定する：</p>
<div class="language-python">
<ol>
<li><code translate="no">datatype</code>:<code translate="no">DataType.ARRAY</code> として構成する。</li>
<li><code translate="no">element_type</code>: 配列の要素のデータ型を選択する。配列フィールドの要素は、すべて同じデータ型を持つ必要があります。この例では、<code translate="no">element_type</code> を<code translate="no">DataType.INT64</code> に設定しています。</li>
<li>Define the<code translate="no">max_capacity</code>: このパラメータを設定して、配列フィールドが保持できる要素の最大数を指定します。</li>
</ol>
</div>
<div class="language-java">
<ol>
<li><code translate="no">dataType</code>:<code translate="no">DataType.Array</code> として設定する。</li>
<li>Specify the<code translate="no">elementType</code>: 配列の要素のデータ型を選択します。配列フィールドの要素は、すべて同じデータ型を持つ必要があります。この例では、<code translate="no">elementType</code> を<code translate="no">DataType.Int64</code> に設定しています。</li>
<li>Define the<code translate="no">maxCapacity</code>: このパラメータを設定して、配列フィールドが保持できる要素の最大数を指定します。</li>
</ol>
</div>
<div class="language-javascript">
<ol>
<li><code translate="no">data_type</code>:<code translate="no">DataType.Array</code> として設定する。</li>
<li>Specify the<code translate="no">element_type</code>: 配列の要素のデータ型を選択します。配列フィールドの要素は、すべて同じデータ型を持つ必要があります。この例では、<code translate="no">element_type</code> を<code translate="no">DataType.Int64</code> に設定しています。</li>
<li>Define the<code translate="no">max_capacity</code>: このパラメータを設定して、配列フィールドが保持できる要素の最大数を指定します。</li>
</ol>
</div>
<p>以下のコード例では、最大 5 要素、各要素が整数データ型の配列フィールド<code translate="no">color_coord</code> を持つコレクションスキーマを定義しています。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color_tag&quot;</span>, datatype=DataType.INT64)
schema.add_field(field_name=<span class="hljs-string">&quot;color_coord&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// Add fields to schema</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color_tag&quot;</span>)
        .dataType(DataType.Int64)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;color_coord&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color_tag&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color_coord&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>
    }
];
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">create_schemaと</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_fieldを</a>参照のこと。</p>
</div>
<div class="language-java">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md">createSchema</a>および<a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md">addField</a> を参照してください。</p>
</div>
<div class="language-javascript">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollectionを</a>参照してください。</p>
</div>
<h3 id="Create-the-collection" class="common-anchor-header">コレクションの作成<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>次に、定義されたスキーマを使用してコレクションを作成する。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.create_collection(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)
client.list_collections()

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;test_collection&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listCollections</span>({<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Existing collections: &quot;</span> + res.<span class="hljs-property">collection_names</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Existing collections: test_collection</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>メソッドとパラメータの詳細については<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection</a>と<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections</a> を参照。</p>
</div>
<div class="language-java">
<p>メソッドとパラメータの詳細については<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection</a> を参照。</p>
</div>
<div class="language-javascript">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection</a>および<a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listCollections.md">listCollections</a> を参照ください。</p>
</div>
<h2 id="Create-indexes" class="common-anchor-header">インデックスの作成<button data-href="#Create-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスは検索やクエリ操作のパフォーマンスを向上させます。Milvusでは、ベクトルフィールドとスカラーフィールドの両方にインデックスを作成することができます。この例では、ベクトルフィールド<code translate="no">vector</code> に<code translate="no">IVF_FLAT</code> インデックスを、配列フィールド<code translate="no">color_coord</code> に<code translate="no">INVERTED</code> インデックスを作成します。インデックスの詳細については、「<a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">ベクトル・フィールドのインデックス</a>」と「<a href="https://milvus.io/docs/index-scalar-fields.md">スカラー・ フィールドのインデックス</a>」を参照してください。</p>
<h3 id="Index-vector-field" class="common-anchor-header">ベクトル・フィールドのインデックス<button data-href="#Index-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>ベクトル・フィールドにインデックスを作成すると、ベクトル類似検索のパフォーマンスが向上します。</p>
<p>以下の例では、ベクトル・フィールド<code translate="no">vector</code> に<code translate="no">IVF_FLAT</code> 型のインデックスを作成しています。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}
)

client.create_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_params=index_params)
client.describe_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_name=<span class="hljs-string">&quot;vector_index&quot;</span>)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;nlist&#x27;: &#x27;128&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_type&#x27;: &#x27;IVF_FLAT&#x27;,</span>
<span class="hljs-comment">#  &#x27;metric_type&#x27;: &#x27;COSINE&#x27;,</span>
<span class="hljs-comment">#  &#x27;field_name&#x27;: &#x27;vector&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_name&#x27;: &#x27;vector_index&#x27;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .metricType(IndexParam.MetricType.COSINE)
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
        .build();
<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,   
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vector_index&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Vector index description: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Vector index description: {&quot;index_descriptions&quot;:[{&quot;params&quot;:[{&quot;key&quot;:&quot;params&quot;,&quot;value&quot;:&quot;{\&quot;nlist\&quot;:128}&quot;},{&quot;key&quot;:&quot;index_type&quot;,&quot;value&quot;:&quot;IVF_FLAT&quot;},{&quot;key&quot;:&quot;metric_type&quot;,&quot;value&quot;:&quot;COSINE&quot;}],&quot;index_name&quot;:&quot;vector_index&quot;,&quot;indexID&quot;:&quot;451543183233666062&quot;,&quot;field_name&quot;:&quot;vector&quot;,&quot;indexed_rows&quot;:&quot;0&quot;,&quot;total_rows&quot;:&quot;0&quot;,&quot;state&quot;:&quot;Finished&quot;,&quot;index_state_fail_reason&quot;:&quot;&quot;,&quot;pending_index_rows&quot;:&quot;0&quot;}],&quot;status&quot;:{&quot;extra_info&quot;:{},&quot;error_code&quot;:&quot;Success&quot;,&quot;reason&quot;:&quot;&quot;,&quot;code&quot;:0,&quot;retriable&quot;:false,&quot;detail&quot;:&quot;&quot;}}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md">prepare_index_params</a>、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a>、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_indexを</a>参照してください。</p>
</div>
<div class="language-java">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>と<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md">createIndex</a> を参照してください。</p>
</div>
<div class="language-javascript">
<p>メソッドとパラメータについての詳細は<a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md">createIndex</a> および<a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md">describeIndex</a> を参照。</p>
</div>
<h3 id="Index-array-field" class="common-anchor-header">インデックス配列フィールド<button data-href="#Index-array-field" class="anchor-icon" translate="no">
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
    </button></h3><p>スカラーフィールドにインデックスを作成すると、 そのフィールドに対するクエリの検索性能が向上します。</p>
<p>この例では、<code translate="no">color_coord</code> 配列フィールドに転置インデックスを作成します。これにより、このフィールドに基づくフィルタリングを高速化することができます。転置インデックスは全体的に優れた性能を発揮し、頻繁にデータを取得しない場合には生データを使った総当りフィルタリングを大幅に上回り、頻繁にデータを取得する場合には同等の性能を維持します。転置インデックスの詳細については、<a href="/docs/ja/scalar_index.md#Inverted-indexing">スカラー・インデックスを</a>参照。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;color_coord&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>
)

client.create_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_params=index_params)
client.describe_index(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;index_type&#x27;: &#x27;INVERTED&#x27;,</span>
<span class="hljs-comment">#  &#x27;field_name&#x27;: &#x27;color_coord&#x27;,</span>
<span class="hljs-comment">#  &#x27;index_name&#x27;: &#x27;inverted_index&#x27;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexParam = IndexParam.builder()
        .indexType(IndexParam.IndexType.INVERTED)
        .fieldName(<span class="hljs-string">&quot;color_coord&quot;</span>)
        .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>)
        .build();
createIndexReq = CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;color_coord&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Array index description: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Array index description: {&quot;index_descriptions&quot;:[{&quot;params&quot;:[{&quot;key&quot;:&quot;index_type&quot;,&quot;value&quot;:&quot;INVERTED&quot;}],&quot;index_name&quot;:&quot;inverted_index&quot;,&quot;indexID&quot;:&quot;451543183233667243&quot;,&quot;field_name&quot;:&quot;color_coord&quot;,&quot;indexed_rows&quot;:&quot;0&quot;,&quot;total_rows&quot;:&quot;0&quot;,&quot;state&quot;:&quot;Finished&quot;,&quot;index_state_fail_reason&quot;:&quot;&quot;,&quot;pending_index_rows&quot;:&quot;0&quot;}],&quot;status&quot;:{&quot;extra_info&quot;:{},&quot;error_code&quot;:&quot;Success&quot;,&quot;reason&quot;:&quot;&quot;,&quot;code&quot;:0,&quot;retriable&quot;:false,&quot;detail&quot;:&quot;&quot;}}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md">prepare_index_params</a>、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index</a>、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_indexを</a>参照してください。</p>
</div>
<div class="language-java">
<p>メソッドとパラメータの詳細については、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>と<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md">createIndex</a> を参照してください。</p>
</div>
<div class="language-javascript">
<p>メソッドとパラメータについての詳細は<a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md">createIndex</a> と<a href="https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md">describeIndex</a> を参照。</p>
</div>
<h2 id="Insert-data" class="common-anchor-header">データの挿入<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションとインデックスが作成されると、データをコレクションに挿入できます。このステップでは、<code translate="no">test_collection</code> に 1,000 個のエンティティを挿入します。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">res = client.insert(collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 1000, &#x27;ids&#x27;: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999], &#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .data(data)
    .build();

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Inserted <span class="hljs-subst">${res.insert_cnt}</span> entities`</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Inserted 1000 entities</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-the-collection" class="common-anchor-header">コレクションのロード<button data-href="#Load-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>データを挿入した後、コレクションをロードして検索やクエリ操作で利用できるようにする必要がある。</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_collection(<span class="hljs-string">&#x27;test_collection&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .build();
client.loadCollection(loadCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>
});

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Collection load state: &quot;</span> + res.<span class="hljs-property">state</span>);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Collection load state: LoadStateLoaded</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-scalar-filtering" class="common-anchor-header">基本的なスカラーフィルタリング<button data-href="#Basic-scalar-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのデータを追加したら、標準的なスカラー・フィールドと同じように、配列フィールドの要素を使用して検索やクエリを実行できます。</p>
<div class="language-python">
<p>パラメータの詳細については、SDKリファレンスの <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a>を参照してください。</p>
</div>
<div class="language-java">
<p>パラメータの詳細については、SDKリファレンスの <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md"><code translate="no">search()</code></a>を参照してください。</p>
</div>
<div class="language-javascript">
<p>パラメータの詳細については、SDKリファレンスの <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/search.md"><code translate="no">search()</code></a>を参照してください。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Basic search with the array field</span>
query_vectors = [ [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]]

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color_coord[0] &lt; 10&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}
    },
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 918, &#x27;distance&#x27;: 0.974249541759491, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [4, 34, 9, 18, 29], &#x27;id&#x27;: 918, &#x27;color&#x27;: &#x27;purple&#x27;, &#x27;color_tag&#x27;: 2940}}, {&#x27;id&#x27;: 822, &#x27;distance&#x27;: 0.9177230000495911, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [7, 36, 32], &#x27;id&#x27;: 822, &#x27;color&#x27;: &#x27;red&#x27;, &#x27;color_tag&#x27;: 8519}}, {&#x27;id&#x27;: 981, &#x27;distance&#x27;: 0.9116519689559937, &#x27;entity&#x27;: {&#x27;color_coord&#x27;: [7, 16, 40, 32, 32], &#x27;id&#x27;: 981, &#x27;color&#x27;: &#x27;pink&#x27;, &#x27;color_tag&#x27;: 2992}}]&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Basic search with an Array field</span>
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color_coord[0] in [7, 8, 9]&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3L</span>)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3069, id=16, color_coord=[9, 16, 19]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> query_vectors = [<span class="hljs-title class_">Array</span>(<span class="hljs-number">5</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>())];

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;color_coord[0] &lt; 10&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Search result: &quot;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Search result: [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9969238042831421,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;212&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;5603&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;9&quot;,</span>
<span class="hljs-comment">//             &quot;14&quot;,</span>
<span class="hljs-comment">//             &quot;22&quot;,</span>
<span class="hljs-comment">//             &quot;4&quot;,</span>
<span class="hljs-comment">//             &quot;35&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9952742457389832,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;339&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;8867&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;0&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.9944050312042236,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;24&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7686&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;17&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;,</span>
<span class="hljs-comment">//             &quot;32&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-filtering" class="common-anchor-header">高度なフィルタリング<button data-href="#Advanced-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>JSONフィールドと同様に、Milvusは配列に対する高度なフィルタリング演算子、すなわち、<code translate="no">ARRAY_CONTAINS</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code> 、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_LENGTH</code> も提供しています。演算子の詳細については、<a href="#reference-on-array-filters">配列フィルタのリファレンスを</a>参照してください。</p>
<ul>
<li><p><code translate="no">color_coord</code> 値に<code translate="no">10</code> を持つすべてのエンティティをフィルタリングします。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Advanced query within the array field</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 2, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 3676, &#x27;color_coord&#x27;: [26, 37, 30, 10]}&quot;, &quot;{&#x27;id&#x27;: 28, &#x27;color&#x27;: &#x27;red&#x27;, &#x27;color_tag&#x27;: 4735, &#x27;color_coord&#x27;: [30, 10, 40, 34]}&quot;, &quot;{&#x27;id&#x27;: 32, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 8816, &#x27;color_coord&#x27;: [10, 9, 24, 39]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Advanced query within an Array field</span>
queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=brown, color_tag=7727, id=17, color_coord=[1, 10, 16, 29]}), </span>
<span class="hljs-comment">//    QueryResp.QueryResult(entity={color=orange, color_tag=8128, id=26, color_coord=[10, 16, 3, 3]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Advanced search within the array field</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS(color_coord, 10)&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7962548732757568,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;696&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1798&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;33&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;,</span>
<span class="hljs-comment">//             &quot;37&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7126177549362183,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;770&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;red&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1962&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;21&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.6707111597061157,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;981&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;3100&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;28&quot;,</span>
<span class="hljs-comment">//             &quot;39&quot;,</span>
<span class="hljs-comment">//             &quot;10&quot;,</span>
<span class="hljs-comment">//             &quot;6&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">color_coord</code> の値に<code translate="no">7</code> と<code translate="no">8</code> を持つすべてのエンティティをフィルタリングする。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 147, &#x27;color&#x27;: &#x27;brown&#x27;, &#x27;color_tag&#x27;: 1287, &#x27;color_coord&#x27;: [7, 8, 11, 0]}&quot;, &quot;{&#x27;id&#x27;: 257, &#x27;color&#x27;: &#x27;white&#x27;, &#x27;color_tag&#x27;: 3641, &#x27;color_coord&#x27;: [2, 8, 31, 7]}&quot;, &quot;{&#x27;id&#x27;: 280, &#x27;color&#x27;: &#x27;orange&#x27;, &#x27;color_tag&#x27;: 1072, &#x27;color_coord&#x27;: [22, 7, 8]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=6939, id=246, color_coord=[1, 8, 27, 7]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=brown, color_tag=6341, id=673, color_coord=[8, 7, 33, 20, 11]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(color_coord, [7, 8])&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.8267516493797302,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;913&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;brown&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;8897&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;39&quot;,</span>
<span class="hljs-comment">//             &quot;31&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;29&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.6889009475708008,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;826&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4903&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;7&quot;,</span>
<span class="hljs-comment">//             &quot;25&quot;,</span>
<span class="hljs-comment">//             &quot;5&quot;,</span>
<span class="hljs-comment">//             &quot;12&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 0.5851659774780273,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;167&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;1550&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;27&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">color_coord</code> の値に 7、8、9 のいずれかを持つすべてのエンティティをフィルタリングする。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 0, &#x27;color&#x27;: &#x27;white&#x27;, &#x27;color_tag&#x27;: 2081, &#x27;color_coord&#x27;: [16, 7, 35, 5, 25]}&quot;, &quot;{&#x27;id&#x27;: 1, &#x27;color&#x27;: &#x27;purple&#x27;, &#x27;color_tag&#x27;: 4669, &#x27;color_coord&#x27;: [11, 9, 15, 38, 21]}&quot;, &quot;{&#x27;id&#x27;: 3, &#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;color_tag&#x27;: 2612, &#x27;color_coord&#x27;: [0, 12, 22, 7]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), </span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 2.015894889831543,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;260&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;green&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;5320&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;1&quot;,</span>
<span class="hljs-comment">//             &quot;7&quot;,</span>
<span class="hljs-comment">//             &quot;33&quot;,</span>
<span class="hljs-comment">//             &quot;13&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.783075213432312,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;593&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4079&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.7713876962661743,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;874&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;blue&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7029&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;14&quot;,</span>
<span class="hljs-comment">//             &quot;8&quot;,</span>
<span class="hljs-comment">//             &quot;15&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ちょうど4つの要素を持つエンティティをフィルタリングする。</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [&quot;{&#x27;id&#x27;: 2, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 3676, &#x27;color_coord&#x27;: [26, 37, 30, 10]}&quot;, &quot;{&#x27;id&#x27;: 3, &#x27;color&#x27;: &#x27;yellow&#x27;, &#x27;color_tag&#x27;: 2612, &#x27;color_coord&#x27;: [0, 12, 22, 7]}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;color&#x27;: &#x27;green&#x27;, &#x27;color_tag&#x27;: 6912, &#x27;color_coord&#x27;: [4, 5, 19, 28]}&quot;] , extra_info: {&#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">queryReq = QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .build();

queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults()); 

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=yellow, color_tag=1990, id=3, color_coord=[26, 20, 15, 26]}),</span>
<span class="hljs-comment">//  QueryResp.QueryResult(entity={color=purple, color_tag=3199, id=4, color_coord=[13, 19, 21, 30]})</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
<span class="hljs-attr">data</span>: query_vectors,
<span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;ARRAY_LENGTH(color_coord) == 4&quot;</span>,
<span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>, <span class="hljs-string">&quot;color_coord&quot;</span>],
<span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(res.<span class="hljs-property">results</span>, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>))

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 2.0404388904571533,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;439&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;orange&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;7096&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;27&quot;,</span>
<span class="hljs-comment">//             &quot;34&quot;,</span>
<span class="hljs-comment">//             &quot;26&quot;,</span>
<span class="hljs-comment">//             &quot;39&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.9059759378433228,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;918&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;purple&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;2903&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;28&quot;,</span>
<span class="hljs-comment">//             &quot;19&quot;,</span>
<span class="hljs-comment">//             &quot;36&quot;,</span>
<span class="hljs-comment">//             &quot;35&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;score&quot;: 1.8385567665100098,</span>
<span class="hljs-comment">//         &quot;id&quot;: &quot;92&quot;,</span>
<span class="hljs-comment">//         &quot;color&quot;: &quot;yellow&quot;,</span>
<span class="hljs-comment">//         &quot;color_tag&quot;: &quot;4693&quot;,</span>
<span class="hljs-comment">//         &quot;color_coord&quot;: [</span>
<span class="hljs-comment">//             &quot;1&quot;,</span>
<span class="hljs-comment">//             &quot;23&quot;,</span>
<span class="hljs-comment">//             &quot;2&quot;,</span>
<span class="hljs-comment">//             &quot;3&quot;</span>
<span class="hljs-comment">//         ]</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>ARRAYフィールドの要素は、<code translate="no">element_type</code> で指定された同じデータ型でなければならない。Milvusのスカラーフィールドで使用可能な有効なデータ型であれば、<code translate="no">element_type</code> 。サポートされるデータ型のリストについては、<a href="https://milvus.io/docs/schema.md#Supported-data-types">サポートされるデータ</a>型を参照してください。</p></li>
<li><p>ARRAYフィールドの要素数は、<code translate="no">max_capacity</code> で指定された配列フィールドの最大容量以下でなければなりません。</p></li>
</ul>
<h2 id="Reference-on-array-filters" class="common-anchor-header">配列フィルタのリファレンス<button data-href="#Reference-on-array-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>配列フィールドを扱う場合、文字列値をダブルクォーテーション（""）またはシングルクォーテーション（''）で囲むことができます。ここで重要なことは、Milvusはセマンティックエスケープや変換を行わず、文字列値をそのまま配列フィールドに格納するということです。例えば、<strong>'a "b'、</strong> <strong>'a'b'、</strong> <strong>'a'b'、'a "b'</strong>はそのまま保存され、<strong>'a'b'</strong>、<strong>'a "b'</strong>は無効な値として扱われます。</p>
<p>2つの配列フィールド<code translate="no">int_array</code> と<code translate="no">var_array</code> が定義されているとする。以下の表は、<code translate="no">expr</code> で配列フィールドを検索する際に使用できる、サポートされているブーリアン式について説明したものです。</p>
<table>
<thead>
<tr><th>演算子</th><th>例</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td><code translate="no">‘int_array[0] < 3’</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 3 より小さい場合に真と評価されます。</td></tr>
<tr><td>&gt;</td><td><code translate="no">‘int_array[0] > 5’</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 5 より大きい場合に真と評価されます。</td></tr>
<tr><td>==</td><td><code translate="no">‘int_array[0] == 0’</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 0 に等しい場合に真と評価される。</td></tr>
<tr><td>!=</td><td><code translate="no">‘var_array[0] != "a"’</code></td><td>この式は、<code translate="no">var_array[0]</code> の値が<code translate="no">“a”</code> と等しくない場合に真と評価される。</td></tr>
<tr><td>&lt;=</td><td><code translate="no">‘int_array[0] <= 3’</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 3 より小さいか等しい場合に真と評価される。</td></tr>
<tr><td>&gt;=</td><td><code translate="no">‘int_array[0] >= 10’</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 10 以上の場合に真と評価される。</td></tr>
<tr><td>in</td><td><code translate="no">'var_array[0] in ["str1", “str2”]'</code></td><td>この式は、<code translate="no">var_array[0]</code> の値が<code translate="no">“str1”</code> または<code translate="no">“str2”</code> の場合に真と評価される。</td></tr>
<tr><td>not in</td><td><code translate="no">'int_array[0] not in [1, 2, 3]'</code></td><td>この式は、<code translate="no">int_array[0]</code> の値が 1、2、または 3 でない場合に真と評価される。</td></tr>
<tr><td>+, -, *, /, %, **</td><td><code translate="no">‘int_array[0] + 100 > 200’</code></td><td>この式は、<code translate="no">int_array[0] + 100</code> の値が 200 より大きい場合に真と評価される。</td></tr>
<tr><td>ライク (LIKE)</td><td><code translate="no">‘var_array[0] like "prefix%"’</code></td><td>この式は、<code translate="no">var_array[0]</code> の値の前に<code translate="no">“prefix”</code> が付いている場合に真と評価されます。</td></tr>
<tr><td>および (&amp;&amp;)</td><td><code translate="no">‘var_array[0] like “prefix%” && int_array[0] <= 100’</code></td><td>この式は、<code translate="no">var_array[0]</code> の値の前に<code translate="no">“prefix”</code> が付き、<code translate="no">int_array[0]</code> の値が 100 以下の場合に真と評価される。</td></tr>
<tr><td>または (||)</td><td><code translate="no">‘var_array[0] like “prefix%” || int_array[0] <= 100’</code></td><td>この式は、<code translate="no">var_array[0]</code> の値の前に<code translate="no">“prefix”</code> が付いている場合、または<code translate="no">int_array[0]</code> の値が 100 より小さいか等しい場合に真と評価されます。</td></tr>
<tr><td>array_contains (ARRAY_CONTAINS)</td><td><code translate="no">'array_contains(int_array, 100)'</code></td><td>この式は、<code translate="no">int_array</code> が要素<code translate="no">100</code> を含む場合に真と評価されます。</td></tr>
<tr><td>array_contains_all (ARRAY_CONTAINS_ALL)</td><td><code translate="no">'array_contains_all(int_array, [1, 2, 3])'</code></td><td>この式は、<code translate="no">int_array</code> がすべての要素<code translate="no">1</code> 、<code translate="no">2</code> 、<code translate="no">3</code> を含む場合に真と評価されます。</td></tr>
<tr><td>array_contains_any (ARRAY_CONTAINS_ANY)</td><td><code translate="no">'array_contains_any(var_array, ["a", "b", “c”])'</code></td><td>この式は、<code translate="no">var_array</code> が<code translate="no">“a”</code>,<code translate="no">“b”</code>,<code translate="no">“c”</code> のいずれかの要素を含む場合に真と評価されます。</td></tr>
<tr><td>配列の長さ</td><td><code translate="no">‘array_length(int_array) == 10’</code></td><td>この式は、<code translate="no">int_array</code> がちょうど10個の要素を含む場合に真と評価されます。</td></tr>
</tbody>
</table>
