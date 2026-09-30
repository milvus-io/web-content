---
id: minhash-function.md
title: MinHash関数Compatible with Milvus 3.0.x
summary: MinHash を使用して、テキストをバイナリベクトルに変換し、ジャカードベースの類似度検索やニアダブレットの検出を行います。
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">MinHash関数<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>MinHash関数は、</strong>生テキストを、文書<a href="https://en.wikipedia.org/wiki/Jaccard_index">間のジャッカード類似度を</a> <strong>近似するバイナリベクトルに変換します</strong>。テキストのシンギングと複数のハッシュ関数を適用して固定長のシグネチャベクトルを生成することで、大規模な環境においても、近似重複文書の高速検出と文書重複排除を可能にします。</p>
<p>MinHashは組み込み関数であるため、Milvus内で実行され、外部モデルによる推論や前処理を必要としません。生のテキストを入力するだけで、Milvusが自動的にMinHashシグネチャベクトルを生成します。</p>
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
<li><p>各MinHashシグネチャは32ビットのハッシュ値であるため、出力フィールドは次元が<code translate="no">dim % 32 == 0</code> を満たす<code translate="no">BINARY_VECTOR</code> でなければなりません。</p></li>
<li><p>バイナリベクトルフィールドの<code translate="no">dim</code> は、<code translate="no">32 * num_hashes</code> と一致している必要があります。一致しない場合はエラーが発生します。</p></li>
<li><p><code translate="no">MINHASH_LSH</code> のインデックスをMinHash関数の出力に使用する場合は、<code translate="no">mh_element_bit_width</code> を<code translate="no">32</code> に設定する必要があります。</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">MinHashの仕組み<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>展開して仕組みを確認</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHashは</a>、集合<a href="https://en.wikipedia.org/wiki/Jaccard_index">間のジャカード類似度を</a>推定する、局所性に敏感なハッシュ手法です。Milvusにおいて、MinHash関数は以下のパイプラインに従います。ユーザーは生のテキストを入力として提供し、Milvusはバイナリベクトルを出力します。中間ステップはすべて内部で処理されます。</p>
<p>全体的なワークフローは、ドキュメントの取り込みとクエリ処理の両方で使用される<strong>共通のテキスト処理パイプライン</strong>と、それに続く保存および検索のためのフェーズ固有の操作で構成されています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">共通のテキスト処理パイプライン<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>ドキュメントの取り込みとクエリ処理の両方において、生のテキストは同じ4段階の変換処理を経ます：</p>
<ol>
<li><p><strong>テキスト分析</strong>：テキストは<a href="/docs/ja/analyzer-overview.md">アナライザー</a>によって処理される（<code translate="no">token_level</code> が<code translate="no">&quot;word&quot;</code> の場合）か、直接使用される（<code translate="no">token_level</code> が<code translate="no">&quot;char&quot;</code> の場合）。単語レベルのトークン化では、入力フィールドに設定されたアナライザーを適用してテキストを用語に分割します。例えば、<code translate="no">&quot;milvus is vector db&quot;</code> は<code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code> となります。</p></li>
<li><p><strong>シンギング</strong>：トークンは、サイズが<code translate="no">shingle_size</code> の重なり合うn-グラム（シングル）に分割されます。たとえば、単語レベルで3-グラムを使用する場合、トークン「<code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> 」は「<code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code> 」のようなシングルになります。</p></li>
<li><p><strong>MinHashシグネチャの生成</strong>：複数のハッシュ関数（H1, H2, …, Hn、ここで n =<code translate="no">num_hashes</code> ）がシングル集合に適用される。 各ハッシュ関数について、すべてのシンブルにわたる最小のハッシュ値が選択されます。これらの最小値の集合が MinHash 署名を形成します。これは、元の文書のジャッカード類似度を近似する固定長の表現です。</p></li>
<li><p><strong>バイナリベクトルエンコーディング</strong>：各署名値は 32 ビットのハッシュであり、完全な署名は次元<code translate="no">32 * num_hashes</code> の<code translate="no">BINARY_VECTOR</code> にパックされます。</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">文書の取り込み<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>挿入時、共有パイプラインによって生成されたバイナリベクトルは、<code translate="no">MINHASH_LSH</code> インデックスに格納されます。このインデックスは、類似したシグネチャを同じバケットにグループ化するLSH（局所性感受性ハッシュ）テーブルを維持しており、クエリ実行時に候補を高速に検索できるようにしています。</p>
<h3 id="Query-processing" class="common-anchor-header">クエリ処理<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>検索時には、クエリテキストが同じ共有パイプラインを通過してバイナリベクトルが生成されます。このベクトルを使用して<code translate="no">MINHASH_LSH</code> インデックス内でLSH検索が行われ、類似している可能性が高い候補ペアが迅速に特定されます。ジャカード精緻化が有効になっていない場合、Milvusは推定ジャカード類似度によるランク付けが行われていないLSH候補を返します。 ジャカード精緻化が有効になっている場合、Milvusは保存された生のMinHashシグネチャを使用して、推定ジャカード類似度に基づいて候補をランク付けし、上位K件の結果を返します。</p>
<p>どちらの処理経路も同一の変換ロジックを共有しているため、内容が高度に重複している2つのドキュメントは、類似したMinHashシグネチャを生成します。これにより、ドキュメント間の語順、書式、あるいは些細な表現の違いがあっても、ニアダブレートを効果的に検出することが可能になります。</p>
<p></details></p>
<h2 id="Before-you-start" class="common-anchor-header">開始する前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash 関数を使用する前に、コレクションスキーマに以下の項目を含めるよう計画してください：</p>
<ul>
<li><p><strong>生コンテンツ用のテキストフィールド</strong></p>
<p>コレクションには、生のテキストを格納するための<code translate="no">VARCHAR</code> フィールドが含まれている必要があります。このフィールドは、MinHash関数の入力として機能します。</p></li>
<li><p><strong>テキストフィールド用のアナライザー</strong>（単語レベルのトークン化を使用する場合）</p>
<p><code translate="no">token_level</code> が<code translate="no">&quot;word&quot;</code> （デフォルト）に設定されている場合、テキストフィールドにはアナライザーが有効になっている必要があります。アナライザーは、シンギングの前にテキストがどのようにトークン化されるかを定義します。デフォルトでは、Milvusは<code translate="no">standard</code> アナライザーを使用します。別のアナライザーを設定するには、<a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md">「ユースケースに適したアナライザーの選択</a>」を参照してください。</p></li>
<li><p><strong>MinHash出力用のバイナリベクトルフィールド</strong></p>
<p>コレクションには、MinHash関数によって生成されたバイナリベクトルを格納するための<code translate="no">BINARY_VECTOR</code> フィールドが含まれている必要があります。そのディメンションは<code translate="no">32 * num_hashes</code> と一致している必要があります。</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">ステップ 1: MinHash 関数を含むコレクションを作成する<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHash関数を使用するには、コレクションの作成時にその関数を定義します。この関数はコレクションスキーマの一部となり、データの挿入や検索の際に自動的に適用されます。</p>
<h3 id="Define-schema-fields" class="common-anchor-header">スキーマフィールドの定義<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクションスキーマには、少なくとも以下の3つのフィールドを含める必要があります。</p>
<ul>
<li><p><strong>プライマリフィールド</strong>：コレクション内の各エンティティを一意に識別します。</p></li>
<li><p><strong>テキストフィールド</strong>(<code translate="no">VARCHAR</code>): 生のテキストドキュメントを格納します。MilvusがMinHashシグネチャ生成のためにテキストを処理できるよう、<code translate="no">enable_analyzer=True</code> を設定してください。デフォルトでは、Milvusはテキスト分析に<code translate="no">standard</code> アナライザを使用します。別のアナライザを設定するには、<a href="/docs/ja/choose-the-right-analyzer-for-your-use-case.md">「ユースケースに適したアナライザの選択</a>」を参照してください。</p></li>
<li><p><strong>バイナリベクトルフィールド</strong>(<code translate="no">BINARY_VECTOR</code>): MinHash関数によって自動的に生成されたバイナリベクトルを格納します。次元は<code translate="no">32 * num_hashes</code> と一致している必要があります。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">MinHash関数の定義<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash関数は、分析されたテキストを、ドキュメント間のジャカード類似度を近似するバイナリベクトルに変換します。</p>
<p>関数を定義し、スキーマに追加します：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>設定オプション</strong></p>
<p>MinHash関数の<code translate="no">params</code> 辞書は、以下のパラメータを受け付けます。すべてのパラメータ名<strong>は大文字小文字を区別しません</strong>。</p>
<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>型</strong></p></th>
     <th><p><strong>デフォルト</strong></p></th>
     <th><p><strong>説明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>由来<code translate="no">dim / 32</code></p></td>
     <td><p>署名生成に使用するハッシュ関数の数。出力バイナリベクトルの次元は、<code translate="no">32 &ast; num_hashes</code> となります。値を大きくすると、類似度推定における分散は減少しますが、計算量は増加します。推奨値：<code translate="no">256</code> （dim = 8192）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>シンギング用のN-gramサイズ。単語レベル：通常は1～3。文字レベル：通常は2～6。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>使用するハッシュ関数。オプション： </p><ul><li><p><code translate="no">"xxhash"</code> (高速)</p></li><li><p><code translate="no">"sha1"</code> （処理速度は遅くなるが、衝突耐性が高い）。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>トークン化レベル。オプション：</p><ul><li><p><code translate="no">"word"</code>: トークン化にフィールドのアナライザを使用し、その後 n-gram シンギリングを適用します。</p></li><li><p><code translate="no">"char"</code> /<code translate="no">"character"</code>: 生の文字に対して直接 n-gram シンギングを適用します（アナライザは使用しません）。</p><p>単語レベルはより強力な意味論と高い効率を提供しますが、言語固有のトークン化に依存します。文字レベルは言語に依存しませんが、より高次元のシンギングを生成し、意味論は弱くなります。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>MinHash関数の初期化に使用するランダムシード。</p></td>
   </tr>
</table>
<h3 id="Configure-the-index" class="common-anchor-header">インデックスの設定<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash バイナリベクトルに推奨されるインデックス型は `<code translate="no">MINHASH_LSH</code>` で、メトリック型は `<code translate="no">MHJACCARD</code>` です。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>検索でジャッカード精緻化を使用する場合は、<code translate="no">with_raw_data</code> を<code translate="no">True</code> に設定してください。LSH検索によって返された候補に対する推定ジャッカード類似度を計算するには、生のMinHashシグネチャが必要です。</p>
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
    </button></h3><p>上記で定義したスキーマおよびインデックスパラメータを使用してコレクションを作成します:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">ステップ 2: ドキュメントの挿入<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションの設定が完了したら、テキストデータを挿入します。必要なのは生のテキストのみです。MinHash関数が各ドキュメントのバイナリベクトルを自動的に生成します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">ステップ 3: MinHash を使用した検索<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>データの挿入が完了したら、生のテキストクエリを指定して、近似重複ドキュメントを検索します。Milvusは各クエリを自動的にMinHashバイナリベクトルに変換します。Jaccard精緻化を有効にすると、推定されたJaccard類似度に基づいてLSH候補をランク付けできます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">3</span>,
    },
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">mh_search_with_jaccard</code> を<code translate="no">True</code> に設定すると、ジャッカード精緻化が有効になります。<code translate="no">refine_k</code> は、精緻化に使用される候補プールの容量を制御します。Milvusは<code translate="no">max(refine_k, limit)</code> を容量として使用しますが、LSH検索で一致する候補が少ない場合は、精緻化の対象となる候補数が少なくなる場合があります。<code translate="no">refine_k</code> の値を大きくすると、計算負荷は増えますが、結果の品質を向上させることができます。</p>
<h2 id="Whats-next" class="common-anchor-header">今後の展望<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ja/full-text-search.md">全文検索</a>：近似重複の検出ではなく、語彙的関連性のランキングにBM25を使用します。</p></li>
<li><p><a href="/docs/ja/analyzer-overview.md">アナライザーの概要</a>：テキストのトークン化用にカスタムアナライザーを設定します。</p></li>
<li><p><a href="/docs/ja/minhash-lsh.md">MINHASH_LSH インデックス</a>：リコール率とパフォーマンス向上のための LSH パラメータの調整について学ぶ。</p></li>
</ul>
