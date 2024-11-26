---
id: keyword-match.md
summary: >-
  Milvusのキーワードマッチは、特定の用語に基づいた正確な文書検索を可能にする。この機能は主に特定の条件を満たすフィルタリング検索に使用され、スカラーフィルタリングを組み込んでクエリ結果を絞り込むことができるため、スカラー条件を満たすベクトル内の類似検索が可能である。
title: キーワードマッチ
---
<h1 id="Keyword-Match​" class="common-anchor-header">キーワードマッチ<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusのキーワードマッチは、特定の用語に基づいた正確な文書検索を可能にします。この機能は主に特定の条件を満たすためのフィルタリング検索に使用され、クエリー結果を絞り込むためにスカラーフィルタリングを組み込むことができ、スカラー条件を満たすベクトル内の類似検索を可能にします。</p>
<div class="alert note">
<p>キーワードマッチは、マッチした文書の関連性をスコアリングすることなく、クエリー用語の正確な出現箇所を見つけることに重点を置いています。クエリー用語の意味や重要性に基づいて最も関連性の高い文書を検索したい場合は、<a href="/docs/ja/full-text-search.md">Full Text Searchを</a>使用することをお勧めします。</p>
</div>
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
    </button></h2><p>Milvusは<a href="https://github.com/quickwit-oss/tantivy">Tantivyを</a>統合し、転置インデックスとキーワード検索を実現しています。Milvusは各テキストエントリに対して、以下の手順でインデックスを作成します。</p>
<ol>
<li><p><a href="/docs/ja/analyzer-overview.md">アナライザー</a>：アナライザは入力テキストを個々の単語（トークン）にトークン化し、必要に応じてフィルタを適用して処理します。これにより、Milvusはこれらのトークンに基づいたインデックスを構築することができる。</p></li>
<li><p><a href="/docs/ja/index-scalar-fields.md">インデックス作成</a>：テキスト解析後、Milvusは各トークンを含む文書に対応付ける転置インデックスを作成する。</p></li>
</ol>
<p>ユーザがキーワードマッチを実行すると、転置インデックスがキーワードを含む全ての文書を素早く検索するために使用される。これは、各文書を個別にスキャンするよりもはるかに高速です。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>キーワードマッチ</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">キーワード一致を有効にする<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>キーワードマッチは<code translate="no">VARCHAR</code> フィールドタイプで機能します。これは基本的にmilvusの文字列データ型です。キーワード照合を有効にするには、<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> の両方を<code translate="no">True</code> に設定し、コレクションスキーマを定義する際にオプションでテキスト分析用のアナライザを設定します。</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header"><code translate="no">enable_analyzer</code> および<code translate="no">enable_match</code>を設定します。</h3><p>特定の<code translate="no">VARCHAR</code> フィールドのキーワード照合を有効にするには、フィールドスキーマの定義時に<code translate="no">enable_analyzer</code> と<code translate="no">enable_match</code> パラメータの両方を<code translate="no">True</code> に設定します。これにより、Milvusはテキストをトークン化し、指定されたフィールドに対して転置インデックスを作成し、高速かつ効率的なキーワードマッチを可能にします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">オプション：アナライザの設定</h3><p>キーワード・マッチングのパフォーマンスと精度は、選択したアナライザに依存します。さまざまなアナライザは、さまざまな言語やテキスト構造に合わせて調整されているため、適切なアナライザを選択することで、特定のユースケースの検索結果に大きな影響を与えることができます。</p>
<p>デフォルトでは、Milvusは<code translate="no">standard</code> アナライザーを使用します。このアナライザーは、空白と句読点に基づいてテキストをトークン化し、40文字以上のトークンを削除し、テキストを小文字に変換します。このデフォルト設定を適用するために追加のパラメータは必要ありません。詳細については、「<a href="/docs/ja/standard-analyzer.md">標準</a>」を参照してください。</p>
<p>別のアナライザが必要な場合は、<code translate="no">analyzer_params</code> パラメータを使用してアナライザを設定できます。例えば、英語のテキストを処理するために<code translate="no">english</code> アナライザを適用する場合などです。</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvusは他にも様々な言語やシナリオに適したアナライザを提供しています。詳細については、「<a href="/docs/ja/analyzer-overview.md">概要</a>」を参照してください。</p>
<h2 id="Use-keyword-match" class="common-anchor-header">キーワード一致の使用<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションスキーマのVARCHARフィールドでキーワードマッチを有効にすると、<code translate="no">TEXT_MATCH</code> 式を使用してキーワードマッチを実行できます。</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">TEXT_MATCH 式の構文</h3><p><code translate="no">TEXT_MATCH</code> 式を使用して、検索するフィールドとキーワードを指定します。その構文は以下のとおりです。</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>:検索するVARCHARフィールドの名前。</p></li>
<li><p><code translate="no">text</code>:検索するキーワード。複数のキーワードは、言語や設定されている解析器に応じて、スペースやその他の適切な区切り文字で区切ることができます。</p></li>
</ul>
<p>デフォルトでは、<code translate="no">TEXT_MATCH</code> 、<strong>OR</strong>マッチング・ロジックを使用します。つまり、指定したキーワードのいずれかを含む文書を返します。たとえば、<code translate="no">text</code> フィールドに<code translate="no">machine</code> または<code translate="no">deep</code> というキーワードを含む文書を検索するには、次の式を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>また、論理演算子を使用して複数の<code translate="no">TEXT_MATCH</code> 式を組み合わせ、<strong>AND</strong>マッチングを実行することもできます。たとえば、<code translate="no">text</code> フィールドに<code translate="no">machine</code> と<code translate="no">deep</code> の両方を含む文書を検索するには、次の式を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">キーワードマッチで検索</h3><p>キーワードマッチは、ベクトル類似性検索と組み合わせて使用することで、検索範囲を狭め、検索パフォーマンスを向上させることができます。ベ ク ト ル類似検索の前にキーワー ド 整合を使っ て コ レ ク シ ョ ン を フ ィ ル タ リ ン グす る こ と で、 検索す る 必要があ る 文書の数を減 ら す こ と がで き 、 結果 と し て ク エ リ 時間が短縮 さ れます。</p>
<p>こ の例では、<code translate="no">filter</code> 式が検索結果を フ ィ ル タ し て、 指定 さ れたキー ワー ド<code translate="no">keyword1</code> または<code translate="no">keyword2</code> に一致す る 文書のみを含めます。 次に、 ベ ク ト ル類似性検索は、 こ の フ ィ ル タ さ れた部分集合の文書に対 し て実行 さ れます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">キーワードマッチによるクエリー</h3><p>キーワードマッチはクエリー操作のスカラーフィルタリングにも使うことができます。<code translate="no">query()</code> メソッドの<code translate="no">expr</code> パラメータに<code translate="no">TEXT_MATCH</code> 式を指定することで、与えられたキーワードにマッチする文書を取り出すことができます。</p>
<p>以下の例は、<code translate="no">text</code> フィールドがキーワード<code translate="no">keyword1</code> と<code translate="no">keyword2</code> の両方を含む文書を検索します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">注意点<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>フィールドのキーワード・マッチを有効にすると、転置インデックスが作成され、 ストレージ・リソースが消費されます。この機能を有効にするかどうかは、テキスト・サイズ、一意のトークン、使用する解析器によって異なるため、ストレージへの影響を考慮してください。</p></li>
<li><p>スキーマでアナライザを定義すると、その設定はそのコレクションに対して永続的になります。別のアナライザの方がニーズに合っていると判断した場合は、既存のコレクションを削除して、希望するアナライザ設定で新しいコレクションを作成することを検討できます。</p></li>
</ul>
