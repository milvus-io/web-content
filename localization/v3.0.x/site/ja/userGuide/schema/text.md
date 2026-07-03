---
id: text.md
title: テキストフィールドCompatible with Milvus 3.0.x
summary: TEXT は、Milvus 内でドキュメントのテキスト、文章、その他の長文コンテンツを格納するためのスカラーフィールド型です。
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">テキストフィールド<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>AI検索アプリケーションにおいて、ベクトル検索は意味的に類似したエンティティを見つけるのに役立ちますが、多くの場合、各一致結果の背後にある元のソーステキストもアプリケーションに必要となります。LLMやエージェントは、そのテキストをコンテキストとして利用し、読み上げ、引用、要約、あるいはプロンプトに結果を含めることができます。</p>
<p>Milvusでは、長いソーステキストをエンティティと共に直接格納するためのスカラーフィールド型「<code translate="no">TEXT</code> 」を提供しています。代表的な値としては、文章の抜粋、長文のドキュメント、記事本文、チケット、ログなどが挙げられます。固定の<code translate="no">max_length</code> を必要とする<code translate="no">VARCHAR</code> とは異なり、<code translate="no">TEXT</code> では、コレクションスキーマで最大バイト長を設定する必要はありません。</p>
<p><code translate="no">TEXT</code> フィールドを定義するには、<code translate="no">datatype</code> を<code translate="no">DataType.TEXT</code> に設定します。</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>フィールドの定義後、各エンティティはそのフィールドに文字列値を格納できるようになります。<code translate="no">TEXT</code> の値は他のスカラーフィールドと同様に挿入でき、クエリや検索結果から返す際には、<code translate="no">output_fields</code> にそのフィールドを指定します。</p>
<div class="alert note">
<p><code translate="no">TEXT</code> フィールドはNULL値をサポートしています。この機能を有効にするには、<code translate="no">nullable</code> を<code translate="no">True</code> に設定します。詳細については、「<a href="/docs/ja/nullable-and-default.md">NULL許容フィールド</a>」を参照してください。</p>
</div>
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
<li><code translate="no">TEXT</code> フィールドはプライマリフィールドにすることはできません。プライマリフィールドは<code translate="no">INT64</code> および<code translate="no">VARCHAR</code> をサポートしています。</li>
<li>Milvus 3.0.0 では、<code translate="no">TEXT</code> フィールドは<code translate="no">PHRASE_MATCH</code> をサポートしていません。</li>
<li>Milvus 3.0.0 では、<code translate="no">TEXT</code> フィールドは をサポートしていません。</li>
<li>Milvus 3.0.0 では、外部コレクションで<code translate="no">TEXT</code> フィールドはサポートされていません。</li>
<li>Milvus 3.0.0 では、<code translate="no">TEXT</code> フィールドはスカラーインデックスをサポートしていません。</li>
<li><code translate="no">TEXT</code> は、通常のメタデータフィルタリングを目的としたものではありません。短い文字列のメタデータでフィルタリングを行う必要があり、フィールドの値が<code translate="no">VARCHAR</code> の長さ制限内に収まる場合は、<code translate="no">VARCHAR</code> を使用してください。</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">TEXT または VARCHAR を選択してください<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> と<code translate="no">VARCHAR</code> はどちらも文字列値を格納しますが、対応するアプリケーションのニーズが異なります。エンティティの識別、分類、またはフィルタリングを行う、短く長さが限定されたメタデータには<code translate="no">VARCHAR</code> を使用してください。LLM やエージェントが読み取り、引用、要約、またはプロンプトを作成するのに十分なコンテキストを提供する、より長いソースコンテンツには<code translate="no">TEXT</code> を使用してください。</p>
<table>
<thead>
<tr><th>側面</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>最適な用途</td><td>エンティティの識別、分類、フィルタリングに使用される短いメタデータ（例：<code translate="no">title</code> 、<code translate="no">tag</code> 、<code translate="no">category</code> 、<code translate="no">external_id</code> ）。</td><td><code translate="no">content</code> 、<code translate="no">passage</code> 、<code translate="no">article_body</code> 、<code translate="no">log_message</code> など、LLM やエージェントのワークフローで使用される、より長いソースコンテンツ。</td></tr>
<tr><td>長さの設定</td><td><code translate="no">max_length</code> が必要です。これは、フィールドが格納できる最大バイト数を定義します。最大値は<code translate="no">65,535</code> バイトです。値がこの制限を超える可能性がある場合は、<code translate="no">TEXT</code> を使用してください。</td><td><code translate="no">max_length</code> は不要であるため、スキーマにテキスト値の固定バイト制限を指定する必要はありません。</td></tr>
<tr><td>格納の動作</td><td>各値は、フィールドに設定された<code translate="no">max_length</code> 内に格納されます。</td><td>大きなテキスト値については、自動ストレージ選択が使用されます。詳細については、「<a href="#how-milvus-stores-large-text-values">Milvus による大きな TEXT 値の保存方法</a>」を参照してください。</td></tr>
<tr><td>プライマリフィールドとしてのサポート</td><td>プライマリフィールドとして使用可能です。</td><td>プライマリフィールドとしては使用できません。</td></tr>
<tr><td>フィルタリング</td><td><code translate="no">category == &quot;news&quot;</code> や<code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> など、フィルタ式に含める必要がある短い文字列のメタデータに使用します。</td><td>通常のメタデータフィルタリングには使用しないでください。</td></tr>
</tbody>
</table>
<p><code translate="no">VARCHAR</code> フィールドの詳細については、「<a href="/docs/ja/string.md">VarChar フィールド</a>」を参照してください。</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Milvus による大きな TEXT 値の保存方法<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
<p>エンティティを挿入する際、<code translate="no">TEXT</code> フィールドに指定した文字列が<code translate="no">TEXT</code> 値となります。Milvus は、その値のサイズを<a href="/docs/ja/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>（デフォルトでは<code translate="no">65,536</code> バイト）と比較し、2 つの内部保存パスのいずれかを選択します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>大容量テキストの保存</span>
  
 </span></p>
<ul>
<li><strong>インライン保存</strong>：<code translate="no">TEXT</code> の値が<code translate="no">dataNode.text.inlineThreshold</code> より小さい場合、Milvusは元のテキスト値を<code translate="no">TEXT</code> フィールドdataに直接保存します。</li>
<li><strong>LOB ストレージ</strong>：<code translate="no">TEXT</code> の値が<code translate="no">dataNode.text.inlineThreshold</code> 以上の場合、Milvusはその値を大容量オブジェクトとして扱い、元のテキストをMinIOなどのオブジェクトストレージに別途保存します。<code translate="no">TEXT</code> フィールドのデータには、別途保存されたテキストへの内部参照が格納されます。クエリや検索結果で<code translate="no">TEXT</code> フィールドが要求されると、Milvusはこの参照を使用して元のテキストを取得し、返します。</li>
</ul>
<p>このストレージの選択は内部的なものです。Milvusがどのストレージパスを使用する場合でも、<code translate="no">TEXT</code> フィールドへの挿入、クエリ、検索は同じ方法で行います。しきい値や、関連するストレージ、コンパクション、ガベージコレクションの動作を調整するには、<a href="/docs/ja/configure_datanode.md">dataNode関連の設定</a> <a href="/docs/ja/configure_datacoord.md">およびdataCoord関連の設定</a>を参照してください。</p>
<p>デプロイメントでオブジェクトストレージを使用している場合、<code translate="no">TEXT</code> の値が大きいと、<code translate="no">lobs/...</code> などのパス下にMilvusが管理するオブジェクトとして表示されることがあります。これらのオブジェクトは実装上の詳細であり、手動で移動、コピー、または削除してはなりません。 エンティティの削除、パーティションの削除、またはデータの圧縮を行った後、オブジェクトストレージの使用量が減少するのは、Milvusのガベージコレクションがセーフティウィンドウ経過後に参照されていない大容量オブジェクトデータを削除してからとなります。</p>
<p></details></p>
<p><code translate="no">TEXT</code> の一般的な用途として、BM25を用いた全文検索が挙げられます。このパターンでは、<code translate="no">TEXT</code> フィールドに元のソースコンテンツが格納され、BM25がテキストを分析して、キーワードに基づく一致をランク付けするためのスパースベクトルを生成します。検索結果では、一致した<code translate="no">TEXT</code> 値をLLMやエージェントワークフローのコンテキストとして返すことができます。 以下の例は、<code translate="no">TEXT</code> フィールドをBM25の入力フィールドとして使用する方法を示しています。全文検索の概念やクエリオプションについては、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">ステップ 1: TEXT フィールドを含むコレクションを作成する<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、ソースコンテンツ用の<code translate="no">TEXT</code> フィールドと、BM25によって生成されたスパースベクトル用のスパースベクトルフィールドを持つコレクションを作成します。BM25関数は、<code translate="no">content</code> から取得したトークン化されたテキストを、<code translate="no">sparse</code> に格納されたスパースベクトルに変換します。</p>
<p>BM25全文検索を行うには、入力となる<code translate="no">TEXT</code> フィールドで<code translate="no">enable_analyzer=True</code> が設定されている必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">ステップ 2: スパースベクトルインデックスの作成<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25関数によって生成されたスパースベクトルフィールドに対してインデックスを作成します。メトリックタイプは<code translate="no">BM25</code> に設定する必要があります。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">ステップ 3: TEXT データの挿入<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> フィールドにテキストを直接挿入します。<code translate="no">sparse</code> フィールドには値を指定しないでください。Milvusは、<code translate="no">content</code> に対してBM25関数を適用することで、内部的にスパースベクトルを生成します。</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">ステップ 4: BM25 フルテキスト検索の実行<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>生のクエリテキストを検索データとして使用し、スパースベクトルフィールドに対して検索を実行します。Milvusはクエリテキストをスパースベクトルに変換し、BM25を用いて一致する結果をランク付けし、要求された<code translate="no">TEXT</code> フィールドを<code translate="no">output_fields</code> として返します。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">ステップ 5: 返された TEXT 値を読み取る<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>各検索ヒットには、BM25スコアと元の<code translate="no">TEXT</code> 値が含まれます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>BM25関数、スパースベクトルインデックス、および全文検索のクエリ構文に関する詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p>
