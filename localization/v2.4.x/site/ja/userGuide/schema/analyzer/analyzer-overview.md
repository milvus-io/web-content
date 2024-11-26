---
id: analyzer-overview.md
title: アナライザーの概要
summary: >-
  テキスト処理において、アナライザーは生テキストを構造化された検索可能な形式に変換する重要なコンポーネントである。各分析器は通常、トークナイザーとフィルターという2つのコア要素で構成される。これらは共に、入力テキストをトークンに変換し、これらのトークンを洗練させ、効率的な索引付けと検索に備える。
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">アナライザーの概要<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>テキスト処理において、<strong>アナライザーは</strong>生テキストを構造化された検索可能な形式に変換する重要なコンポーネントである。アナライザーは通常、<strong>トークナイザーと</strong> <strong>フィルターという</strong>2つのコア要素で構成される。これらは共に入力テキストをトークンに変換し、トークンを洗練させ、効率的なインデックス作成と検索に備えます。</p>
<p>Milvusでは、アナライザはコレクション作成時に<code translate="no">VARCHAR</code> フィールドをコレクションスキーマに追加する際に設定されます。アナライザによって生成されたトークンは、キーワードマッチングのためのインデックスを構築するために使用したり、全文検索のためにスパース埋め込みに変換したりすることができます。詳細については、<a href="/docs/ja/keyword-match.md">キーワード・マッチ</a>または<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p>
<div class="alert note">
<p>アナライザの使用はパフォーマンスに影響を与える場合があります。</p>
<ul>
<li><p><strong>全文検索：</strong>全文検索：全文検索の場合、DataNodeと<strong>QueryNode</strong>チャネルはトークン化の完了を待つ必要があるため、データの消費が遅くなります。その結果、新しく取り込まれたデータが検索に利用できるようになるまでに時間がかかる。</p></li>
<li><p><strong>キーワードマッチ：</strong>キーワードマッチの場合、インデックスを構築する前にトークン化が完了する必要があるため、インデックス作成も遅くなります。</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">アナライザーの構造<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのアナライザーは、1つの<strong>トークナイザーと</strong> <strong>0つ以上の</strong>フィルターから構成されます。</p>
<ul>
<li><p><strong>トークナイザー</strong>：トークナイザーは入力テキストをトークンと呼ばれる個別の単位に分割します。トークンはトークン化の種類によって、単語であったりフレーズであったりします。</p></li>
<li><p><strong>フィルター</strong>：たとえば、小文字にしたり、一般的な単語を削除したりします。</p></li>
</ul>
<p>以下のワークフローは、アナライザーがテキストをどのように処理するかを示しています。</p>
<p><img translate="no" src="/docs/v2.4.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">分析器のタイプ<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、様々なテキスト処理のニーズに対応するため、2種類のアナライザを提供しています。</p>
<ul>
<li><p><strong>内蔵アナライザ</strong>：ビルトイン アナライザ: 最小限のセットアップで一般的なテキスト処理タスクをカバーする、定義済みのコンフィギュレーションです。複雑な設定が不要なため、汎用的な検索に最適です。</p></li>
<li><p><strong>カスタムアナライザー</strong>：より高度な要件に対応するカスタム・アナライザでは、トークナイザとゼロ個以上のフィルタの両方を指定することで、独自の設定を定義できます。このレベルのカスタマイズは、テキスト処理を正確に制御する必要がある特殊なユースケースで特に役立ちます。</p></li>
</ul>
<div class="alert note">
<p>コレクション作成時にアナライザ設定を省略した場合、Milvusはデフォルトですべてのテキスト処理に<code translate="no">standard</code> アナライザを使用します。詳細については、「<a href="/docs/ja/standard-analyzer.md">標準</a>」を参照してください。</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">内蔵アナライザ</h3><p>Milvusのビルトインアナライザは、特定のトークナイザやフィルタがあらかじめ設定されており、これらのコンポーネントを自分で定義することなく、すぐに使用することができます。各ビルトインアナライザは、予め設定されたトークナイザーとフィルタを含むテンプレートとして機能し、カスタマイズのためのオプションパラメータが用意されています。</p>
<p>たとえば、<code translate="no">standard</code> 組み込み解析器を使用するには、<code translate="no">standard</code> という名前を<code translate="no">type</code> と指定し、オプションで<code translate="no">stop_words</code> など、この解析器タイプに固有の追加設定を含めるだけです。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>上記の<code translate="no">standard</code> ビルトインアナライザーの設定は、<code translate="no">tokenizer</code> と<code translate="no">filter</code> オプションを明示的に定義して同じ機能を実現する、以下のパラメータを持つカスタムアナライザーを設定することと同じです：</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Milvusは以下のビルトインアナライザを提供しており、それぞれ<code translate="no">type</code> パラメータに名前を指定することで直接使用することができます。</p>
<ul>
<li><p><code translate="no">standard</code>:標準的なトークン化と小文字フィルタリングを適用した、汎用的なテキスト処理に適しています。</p></li>
<li><p><code translate="no">english</code>:英語のストップワードに対応し、英語テキストに最適化されています。</p></li>
<li><p><code translate="no">chinese</code>:中国語のテキスト処理に特化し、中国語の言語構造に適応したトークン化を含む。</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">カスタムアナライザー</h3><p>より高度なテキスト処理のために、Milvusのカスタムアナライザーでは、<strong>トークナイザーと</strong>フィルターの両方を指定することで、独自のテキスト処理パイプラインを構築することができます。この設定は、精密な制御が必要な特殊なユースケースに最適です。</p>
<h4 id="Tokenizer​" class="common-anchor-header">トークナイザー</h4><p><strong>トークナイザーは</strong>カスタムアナライザーに<strong>必須の</strong>コンポーネントで、入力テキストを個別の単位（<strong>トークン</strong>）に分解することでアナライザーパイプラインを開始します。トークン化は、トークナイザーのタイプに応じて、空白や句読点による分割など、特定のルールに従います。この処理により、各単語や語句をより正確かつ独立に扱うことができます。</p>
<p>たとえば、トークナイザーはテキスト<code translate="no">&quot;Vector Database Built for Scale&quot;</code> を個別のトークンに変換します。</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>トークナイザーの指定例</strong>。</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">フィルター</h4><p><strong>フィルタは</strong>、トークナイザが生成したトークンに作用する<strong>オプションの</strong>コンポーネントで、必要に応じてトークンを変換または改良します。たとえば、トークン化された用語<code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code> に<code translate="no">lowercase</code> フィルタを適用すると、次のようになります。</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>カスタム・アナライザーのフィルターは、構成のニーズに応じて、<strong>組み込み</strong>または<strong>カスタムの</strong>いずれかになります。</p>
<ul>
<li><p><strong>組み込みフィルター</strong>：Milvusによって事前に設定されており、最小限のセットアップで済みます。これらのフィルタは、名前を指定することですぐに使用することができます。以下のフィルタは直接使用できるように組み込まれています。</p>
<ul>
<li><p><code translate="no">lowercase</code>:テキストを小文字に変換し、大文字小文字を区別せずにマッチングします。詳細は<a href="/docs/ja/lowercase-filter.md">小文字を</a>参照してください。</p></li>
<li><p><code translate="no">asciifolding</code>:非ASCII文字をASCII等価文字に変換し、多言語テキスト処理を簡素化します。詳細については、<a href="/docs/ja/ascii-folding-filter.md">ASCII 字形統合を</a>参照してください。</p></li>
<li><p><code translate="no">alphanumonly</code>:英数字だけを残し、他の文字を削除します。詳しくは<a href="/docs/ja/alphanumonly-filter.md">英数字のみ</a> を参照。</p></li>
<li><p><code translate="no">cnalphanumonly</code>:漢字、英字、数字以外の文字を含むトークンを削除する。詳細は<a href="/docs/ja/cnalphanumonly-filter.md">Cnalphanumonly</a> を参照。</p></li>
<li><p><code translate="no">cncharonly</code>:中国語以外の文字を含むトークンを削除します。詳細は<a href="/docs/ja/cncharonly-filter.md">Cncharonlyを</a>参照。</p></li>
</ul>
<p><strong>組み込みフィルタの使用例</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>カスタムフィルタ</strong>：カスタムフィルタ：カスタムフィルタを使用すると、特殊な設定を行うことができます。有効なフィルタタイプ (<code translate="no">filter.type</code>) を選択し、各フィルタタイプに固有の設定を追加することで、カスタムフィルタを定義できます。カスタマイズをサポートするフィルタータイプの例。</p>
<ul>
<li><p><code translate="no">stop</code>:ストップワードのリストを設定することで、指定された一般的な単語を削除します (例:<code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>)。詳細については、「<a href="/docs/ja/stop-filter.md">ストップ</a>」を参照してください。</p></li>
<li><p><code translate="no">length</code>:トークンの最大長を設定するなど、長さの基準に基づいてトークンを除外する。詳細は「<a href="/docs/ja/length-filter.md">長さ</a>」を参照。</p></li>
<li><p><code translate="no">stemmer</code>:より柔軟なマッチングのために、単語を語根の形に変換します。詳細については、「<a href="/docs/ja/stemmer-filter.md">ステマー</a>」を参照してください。</p></li>
</ul>
<p><strong>カスタムフィルタの設定例</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">使用例<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、埋め込み用のベクトルフィールドと、テキスト処理機能用の 2 つの<code translate="no">VARCHAR</code> フィールドを持つコレクションスキーマを定義します。各<code translate="no">VARCHAR</code> フィールドは、異なる処理ニーズに対応するために、独自のアナライザ設定で構成されます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p></p>
