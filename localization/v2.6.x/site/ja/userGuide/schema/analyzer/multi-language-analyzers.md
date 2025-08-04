---
id: multi-language-analyzers.md
title: 多言語アナライザCompatible with Milvus 2.5.11+
summary: >-
  Milvusがテキスト分析を行う場合、通常、コレクション内のテキストフィールド全体に単一の分析器を適用します。その分析ツールが英語用に最適化されている場合、中国語、スペイン語、フランス語など、他の言語で必要とされる非常に異なるトークン化やステミングのルールと格闘することになり、結果として想起率が低下します。たとえば、スペイン語の「teléfono」（「電話」を意味する）を検索すると、英語に特化したアナライザはつまずきます。
  アクセントが削除され、スペイン語固有のステミングが適用されないため、関連する結果が見落とされる可能性があります。
beta: Milvus 2.5.11+
---
<h1 id="Multi-language-Analyzers" class="common-anchor-header">多言語アナライザ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Multi-language-Analyzers" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusがテキスト分析を行う場合、通常、コレクション内のテキストフィールド全体に単一のアナライザーを適用します。そのアナライザーが英語用に最適化されている場合、中国語、スペイン語、フランス語など、他の言語で必要とされる非常に異なるトークン化やステミングのルールと格闘することになり、結果として想起率が低下します。たとえば、スペイン語の<em>「teléfono」</em>（<em>「電話」の</em>意味）を検索する場合、英語に特化したアナライザでは、アクセント記号が削除され、スペイン語固有のステミングが適用されないため、関連する結果が見落とされてしまいます。</p>
<p>多言語アナライザは、テキストフィールドに対して複数のアナライザを単一のコレクションに設定できるようにすることで、この問題を解決します。このようにして、テキストフィールドに多言語ドキュメントを保存することができ、Milvusはドキュメントごとに適切な言語ルールに従ってテキストを分析します。</p>
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
<li><p>この機能はBM25ベースのテキスト検索とスパースベクターでのみ動作します。詳細については、<a href="/docs/ja/full-text-search.md">全文検索を</a>参照してください。</p></li>
<li><p>1つのコレクション内の各文書は、言語識別子フィールド値によって決定される1つのアナライザのみを使用できます。</p></li>
<li><p>性能は、アナライザの複雑さやテキストデータのサイズによって異なる場合があります。</p></li>
</ul>
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
    </button></h2><p>以下の図は、Milvusで多言語アナライザを設定・使用する際のワークフローを示しています：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/multi-language-analyzers-workflow.png" alt="Multi Language Analyzers Workflow" class="doc-image" id="multi-language-analyzers-workflow" />
   </span> <span class="img-wrapper"> <span>多言語アナライザーのワークフロー</span> </span></p>
<ol>
<li><p><strong>多言語アナライザの設定</strong></p>
<ul>
<li><p>複数の言語アナライザーを設定します：<code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>各<code translate="no">analyzer_config</code> は、<a href="/docs/ja/analyzer-overview.md#Analyzer-types">Analyzer Overview</a> に記載されている標準の<code translate="no">analyzer_params</code> 設定に従います。</p></li>
<li><p>各文書のアナライザーの選択を決定する特別な識別子フィールドを定義する。</p></li>
<li><p>未知の言語を処理するために、<code translate="no">default</code> アナライザを設定する。</p></li>
</ul></li>
<li><p><strong>コレクションを作成</strong>する：</p>
<ul>
<li><p>必須フィールドを持つスキーマを定義する：</p>
<ul>
<li><p><strong>primary_key</strong>：一意な文書識別子。</p></li>
<li><p><strong>text_field</strong>：オリジナルのテキストコンテンツを格納します。</p></li>
<li><p><strong>identifier_field</strong>：各文書にどの分析器を使用するかを示す。</p></li>
<li><p><strong>vector_field</strong>：BM25 関数によって生成されるスパース埋め込みを格納する。</p></li>
</ul></li>
<li><p>BM25関数とインデックス作成パラメータを設定する。</p></li>
</ul></li>
<li><p><strong>言語識別子付きデータの挿入</strong>：</p>
<ul>
<li><p>様々な言語のテキストを含む文書を追加し、各文書にはどの解析器を使用するかを指定する識別子値が含まれる。</p></li>
<li><p>Milvusは識別子フィールドに基づいて適切な分析器を選択し、識別子が不明な文書は<code translate="no">default</code> 。</p></li>
</ul></li>
<li><p><strong>言語固有のアナライザを使用した検索</strong>：</p>
<ul>
<li><p>Milvusは指定された解析器を使用してクエリを処理します。</p></li>
<li><p>言語固有のルールに従ってトークン化が行われ、類似性に基づいてその言語に適した検索結果が返される。</p></li>
</ul></li>
</ol>
<h2 id="Step-1-Configure-multianalyzerparams" class="common-anchor-header">ステップ1：multi_analyzer_paramsの設定<button data-href="#Step-1-Configure-multianalyzerparams" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">multi_analyzer_params</code> 、Milvusが各エンティティに適切な解析器を選択する方法を決定する単一のJSONオブジェクトです：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">multi_analyzer_params = {
  <span class="hljs-comment"># Define language-specific analyzers</span>
  <span class="hljs-comment"># Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          <span class="hljs-comment"># English-optimized analyzer</span>
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          <span class="hljs-comment"># Chinese-optimized analyzer</span>
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          <span class="hljs-comment"># Required fallback analyzer</span>
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    <span class="hljs-comment"># Field determining analyzer selection</span>
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         <span class="hljs-comment"># Use &quot;cn&quot; as shorthand for Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          <span class="hljs-comment"># Use &quot;en&quot; as shorthand for English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;analyzers&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    }});
    put(<span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
        put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;icu&quot;</span>);
    }});
}});
analyzerParams.put(<span class="hljs-string">&quot;by_field&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;alias&quot;</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(<span class="hljs-string">&quot;cn&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>);
    put(<span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
}});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> multi_analyzer_params = {
  <span class="hljs-comment">// Define language-specific analyzers</span>
  <span class="hljs-comment">// Each analyzer follows this format: &lt;analyzer_name&gt;: &lt;analyzer_params&gt;</span>
  <span class="hljs-string">&quot;analyzers&quot;</span>: {
    <span class="hljs-string">&quot;english&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},          # <span class="hljs-title class_">English</span>-optimized analyzer
    <span class="hljs-string">&quot;chinese&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},          # <span class="hljs-title class_">Chinese</span>-optimized analyzer
    <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>}          # <span class="hljs-title class_">Required</span> fallback analyzer
  },
  <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,                    # <span class="hljs-title class_">Field</span> determining analyzer selection
  <span class="hljs-string">&quot;alias&quot;</span>: {
    <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,                         # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;cn&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">Chinese</span>
    <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>                          # <span class="hljs-title class_">Use</span> <span class="hljs-string">&quot;en&quot;</span> <span class="hljs-keyword">as</span> shorthand <span class="hljs-keyword">for</span> <span class="hljs-title class_">English</span>
  }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">multiAnalyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;analyzers&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;english&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
        <span class="hljs-string">&quot;chinese&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>},
        <span class="hljs-string">&quot;default&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>},
    },
    <span class="hljs-string">&quot;by_field&quot;</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-string">&quot;alias&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;cn&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
        <span class="hljs-string">&quot;en&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,
    },
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> multi_analyzer_params=<span class="hljs-string">&#x27;{
  &quot;analyzers&quot;: {
    &quot;english&quot;: {
      &quot;type&quot;: &quot;english&quot;
    },
    &quot;chinese&quot;: {
      &quot;type&quot;: &quot;chinese&quot;
    },
    &quot;default&quot;: {
      &quot;tokenizer&quot;: &quot;icu&quot;
    }
  },
  &quot;by_field&quot;: &quot;language&quot;,
  &quot;alias&quot;: {
    &quot;cn&quot;: &quot;chinese&quot;,
    &quot;en&quot;: &quot;english&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須か？</p></th>
     <th><p>説明</p></th>
     <th><p>ルール</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">analyzers</code></p></td>
     <td><p>はい</p></td>
     <td><p>Milvusがテキスト処理に使用できる各言語固有のアナライザをリストします。<code translate="no">analyzers</code> の各アナライザは次の形式に従っています:<code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_params&gt;</code>.</p></td>
     <td><ul>
<li>標準の<code translate="no">analyzer_params</code> 構文で各分析器を定義します (「<a href="/docs/ja/analyzer-overview.md#Analyzer-types">解析器の概要</a>」を参照)。</li>
<li>キーが<code translate="no">default</code> のエントリを追加します。<code translate="no">by_field</code> に格納された値が他の解析器名と一致しない場合、Milvusはこの解析器にフォールバックします。</li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">by_field</code></p></td>
     <td><p>はい</p></td>
     <td><p>Milvusが適用すべき言語(つまり分析器名)を文書ごとに格納するフィールドの名前。</p></td>
     <td><ul>
<li><p>コレクションで定義された<code translate="no">VARCHAR</code> フィールドでなければならない。</p></li>
<li><p>すべての行の値は、<code translate="no">analyzers</code> にリストされている分析器名(またはエイリアス)のいずれかと正確に一致する必要がある。</p></li>
<li><p>行の値が見つからない場合、Milvusは自動的に<code translate="no">default</code> アナライザを適用します。</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">alias</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>アナライザのショートカットまたは代替名を作成し、コード内で参照しやすくします。各分析器は1つ以上のエイリアスを持つことができます。</p></td>
     <td><p>各エイリアスは、既存のアナライザー・キーにマッピングする必要があります。</p></td>
   </tr>
</table>
<h2 id="Step-2-Create-collection" class="common-anchor-header">ステップ2: コレクションの作成<button data-href="#Step-2-Create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>多言語をサポートするコレクションを作成するには、特定のフィールドとインデックスを設定する必要があります：</p>
<h3 id="Add-fields" class="common-anchor-header">フィールドの追加</h3><p>このステップでは、4つの必須フィールドを持つコレクションスキーマを定義します：</p>
<ul>
<li><p><strong>主キーフィールド</strong>(<code translate="no">id</code>)：コレクション内の各エンティティの一意な識別子。<code translate="no">auto_id=True</code> を設定すると、milvusがこれらのIDを自動的に生成します。</p></li>
<li><p><strong>言語インジケータフィールド</strong>(<code translate="no">language</code>)：この VARCHAR フィールドは、<code translate="no">multi_analyzer_params</code> で指定された<code translate="no">by_field</code> に対応します。各エンティティの言語識別子が格納され、Milvusにどのアナライザを使用するかを伝えます。</p></li>
<li><p><strong>テキスト内容フィールド</strong>(<code translate="no">text</code>)：この VARCHAR フィールドには、分析および検索する実際のテキスト・データが格納されます。<code translate="no">enable_analyzer=True</code> を設定することは、このフィールドのテキスト分析機能を有効にするため、非常に重要です。<code translate="no">multi_analyzer_params</code> 構成はこのフィールドに直接アタッチされ、テキスト・データと言語別アナライザーの接続を確立します。</p></li>
<li><p><strong>Vector Field</strong>(<code translate="no">sparse</code>)：このフィールドには、BM25 関数によって生成されたスパース・ベクトルが格納されます。これらのベクトルはテキストデータの解析可能な形式を表し、milvusが実際に検索するものです。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import required modules</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Initialize a new schema</span>
schema = client.create_schema()

<span class="hljs-comment"># Step 2.1: Add a primary key field for unique document identification</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,                  <span class="hljs-comment"># Field name</span>
    datatype=DataType.INT64,          <span class="hljs-comment"># Integer data type</span>
    is_primary=<span class="hljs-literal">True</span>,                  <span class="hljs-comment"># Designate as primary key</span>
    auto_id=<span class="hljs-literal">True</span>                      <span class="hljs-comment"># Auto-generate IDs (recommended)</span>
)

<span class="hljs-comment"># Step 2.2: Add language identifier field</span>
<span class="hljs-comment"># This MUST match the &quot;by_field&quot; value in language_analyzer_config</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;language&quot;</span>,       <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">255</span>               <span class="hljs-comment"># Maximum length (adjust as needed)</span>
)

<span class="hljs-comment"># Step 2.3: Add text content field with multi-language analysis capability</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,                           <span class="hljs-comment"># Field name</span>
    datatype=DataType.VARCHAR,                   <span class="hljs-comment"># String data type</span>
    max_length=<span class="hljs-number">8192</span>,                             <span class="hljs-comment"># Maximum length (adjust based on expected text size)</span>
    enable_analyzer=<span class="hljs-literal">True</span>,                        <span class="hljs-comment"># Enable text analysis</span>
    multi_analyzer_params=multi_analyzer_params  <span class="hljs-comment"># Connect with our language analyzers</span>
)

<span class="hljs-comment"># Step 2.4: Add sparse vector field to store the BM25 output</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,                   <span class="hljs-comment"># Field name</span>
    datatype=DataType.SPARSE_FLOAT_VECTOR  <span class="hljs-comment"># Sparse vector data type</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;language&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">255</span>)
        .build());

collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">8192</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .multiAnalyzerParams(analyzerParams)
        .build());
        
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Initialize schema array</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;language&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">255</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">8192</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">analyzer_params</span>: multi_analyzer_params,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

schema := entity.NewSchema()

schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;language&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">255</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">8192</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMultiAnalyzerParams(multiAnalyzerParams),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> languageField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;language&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 255
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;text&quot;,
  &quot;dataType&quot;: &quot;VarChar&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;max_length&quot;: 8192,
    &quot;enable_analyzer&quot;: true，
    &quot;multiAnalyzerParam&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$multi_analyzer_params</span>&quot;</span><span class="hljs-string">&#x27;
  },
}&#x27;</span>

<span class="hljs-built_in">export</span> sparseField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;sparse&quot;,
  &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-BM25-function" class="common-anchor-header">BM25関数の定義</h3><p>生のテキストデータからスパースベクトル表現を生成するBM25関数を定義します：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create the BM25 function</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;text_to_vector&quot;</span>,            <span class="hljs-comment"># Descriptive function name</span>
    function_type=FunctionType.BM25,  <span class="hljs-comment"># Use BM25 algorithm</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],       <span class="hljs-comment"># Process text from this field</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>]     <span class="hljs-comment"># Store vectors in this field</span>
)

<span class="hljs-comment"># Add the function to our schema</span>
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">function</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_to_vector&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build();
collectionSchema.addFunction(function);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25_emb&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;bm25 function&quot;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
    <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
    <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;sparse&quot;</span>],
    <span class="hljs-attr">params</span>: {},
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction()
schema.WithFunction(function.WithName(<span class="hljs-string">&quot;text_to_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> <span class="hljs-keyword">function</span>=<span class="hljs-string">&#x27;{
  &quot;name&quot;: &quot;text_to_vector&quot;,
  &quot;type&quot;: &quot;BM25&quot;,
  &quot;inputFieldNames&quot;: [&quot;text&quot;],
  &quot;outputFieldNames&quot;: [&quot;sparse&quot;]
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$idField</span>,
    <span class="hljs-variable">$languageField</span>,
    <span class="hljs-variable">$textField</span>,
    <span class="hljs-variable">$sparseField</span>
  ],
  \&quot;functions\&quot;: [
    <span class="hljs-variable">$function</span>
  ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この関数は、言語識別子に基づいて、各テキスト項目に適切なアナライザを自動的に適用します。BM25 ベースのテキスト検索の詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p>
<h3 id="Configure-index-params" class="common-anchor-header">インデックス・パラメータの構成</h3><p>効率的な検索を可能にするために、疎なベクトル・フィールドにインデックスを作成します：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Configure index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add index for sparse vector field</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,        <span class="hljs-comment"># Field to index (our vector field)</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,     <span class="hljs-comment"># Let Milvus choose optimal index type</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>          <span class="hljs-comment"># Must be BM25 for this feature</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>
}];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">idx := index.NewAutoIndex(index.MetricType(entity.BM25))
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> IndexParams=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;sparse&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;BM25&quot;,
    &quot;params&quot;: {}
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>インデックスは、効率的な BM25 類似性計算のためにスパース・ベクトルを整理することで、検索パフォーマンスを向上させます。</p>
<h3 id="Create-the-collection" class="common-anchor-header">コレクションの作成</h3><p>この最後の作成ステップでは、これまでのすべての設定をまとめます：</p>
<ul>
<li><p><code translate="no">collection_name=&quot;multilang_demo&quot;</code> コレクションに名前を付けます。</p></li>
<li><p><code translate="no">schema=schema</code> 定義したフィールド構造と機能を適用します。</p></li>
<li><p><code translate="no">index_params=index_params</code> 効率的な検索のためのインデックス戦略を実装します。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection</span>
COLLECTION_NAME = <span class="hljs-string">&quot;multilingual_documents&quot;</span>

<span class="hljs-comment"># Check if collection already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)  <span class="hljs-comment"># Remove it for this example</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Dropped existing collection: <span class="hljs-subst">{COLLECTION_NAME}</span>&quot;</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=COLLECTION_NAME,       <span class="hljs-comment"># Collection name</span>
    schema=schema,                         <span class="hljs-comment"># Our multilingual schema</span>
    index_params=index_params              <span class="hljs-comment"># Our search index configuration</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;multilingual_documents&quot;</span>;

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">schema</span>: schema,
  <span class="hljs-attr">index_params</span>: index_params,
  <span class="hljs-attr">functions</span>: functions
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;multilingual_documents\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$IndexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>この時点で、Milvusは多言語アナライザーをサポートした空のコレクションを作成し、データを受信できるようにします。</p>
<h2 id="Step-3-Insert-example-data" class="common-anchor-header">ステップ3: サンプルデータの挿入<button data-href="#Step-3-Insert-example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>多言語コレクションにドキュメントを追加する場合、それぞれにテキストコンテンツと言語識別子の両方を含める必要があります：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare multilingual documents</span>
documents = [
    <span class="hljs-comment"># English documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;en&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
    <span class="hljs-comment"># Chinese documents</span>
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,  <span class="hljs-comment"># Using full language name</span>
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;cn&quot;</span>,  <span class="hljs-comment"># Using our defined alias</span>
    },
]

<span class="hljs-comment"># Insert the documents</span>
result = client.insert(COLLECTION_NAME, documents)

<span class="hljs-comment"># Print results</span>
inserted = result[<span class="hljs-string">&quot;insert_count&quot;</span>]            
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Successfully inserted <span class="hljs-subst">{inserted}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Successfully inserted 4 documents</span>
<span class="hljs-comment"># Documents by language: 2 English, 2 Chinese</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;String&gt; texts = Arrays.asList(
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>
);
List&lt;String&gt; languages = Arrays.asList(
        <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>
);

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; texts.size(); i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, texts.get(i));
    row.addProperty(<span class="hljs-string">&quot;language&quot;</span>, languages.get(i));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare multilingual documents</span>
<span class="hljs-keyword">const</span> documents = [
  <span class="hljs-comment">// English documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;english&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;en&quot;</span>,
  },
  <span class="hljs-comment">// Chinese documents</span>
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;chinese&quot;</span>,
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    <span class="hljs-attr">language</span>: <span class="hljs-string">&quot;cn&quot;</span>,
  },
];

<span class="hljs-comment">// Insert the documents</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: documents,
});

<span class="hljs-comment">// Print results</span>
<span class="hljs-keyword">const</span> inserted = result.<span class="hljs-property">insert_count</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Successfully inserted <span class="hljs-subst">${inserted}</span> documents`</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Documents by language: 2 English, 2 Chinese&quot;</span>);

<span class="hljs-comment">// Expected output:</span>
<span class="hljs-comment">// Successfully inserted 4 documents</span>
<span class="hljs-comment">// Documents by language: 2 English, 2 Chinese</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">column1 := column.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>,
    []<span class="hljs-type">string</span>{
        <span class="hljs-string">&quot;Artificial intelligence is transforming technology&quot;</span>,
        <span class="hljs-string">&quot;Machine learning models require large datasets&quot;</span>,
        <span class="hljs-string">&quot;人工智能正在改变技术领域&quot;</span>,
        <span class="hljs-string">&quot;机器学习模型需要大型数据集&quot;</span>,
    })
column2 := column.NewColumnVarChar(<span class="hljs-string">&quot;language&quot;</span>,
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-string">&quot;en&quot;</span>, <span class="hljs-string">&quot;chinese&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;multilingual_documents&quot;</span>).
    WithColumns(column1, column2),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [
    {
      &quot;text&quot;: &quot;Artificial intelligence is transforming technology&quot;,
      &quot;language&quot;: &quot;english&quot;
    },
    {
      &quot;text&quot;: &quot;Machine learning models require large datasets&quot;,
      &quot;language&quot;: &quot;en&quot;
    },
    {
      &quot;text&quot;: &quot;人工智能正在改变技术领域&quot;,
      &quot;language&quot;: &quot;chinese&quot;
    },
    {
      &quot;text&quot;: &quot;机器学习模型需要大型数据集&quot;,
      &quot;language&quot;: &quot;cn&quot;
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>挿入中、milvusは：</p>
<ol>
<li><p>各文書の<code translate="no">language</code> フィールドを読み込む</p></li>
<li><p>対応する解析器を<code translate="no">text</code> フィールドに適用する。</p></li>
<li><p>BM25関数によりスパースベクトル表現を生成。</p></li>
<li><p>元のテキストと生成されたスパースベクトルの両方を保存します。</p></li>
</ol>
<div class="alert note">
<p>スパース・ベクトルを直接指定する必要はありません。BM25 関数は、テキストと指定されたアナライザに基づいて自動的にスパース・ベクトルを生成します。</p>
</div>
<h2 id="Step-4-Perform-search-operations" class="common-anchor-header">ステップ4：検索操作の実行<button data-href="#Step-4-Perform-search-operations" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Use-English-analyzer" class="common-anchor-header">英語の解析器を使用する</h3><p>多言語分析器を使用して検索を行う場合、<code translate="no">search_params</code> は重要な設定を含んでいます：</p>
<ul>
<li><p><code translate="no">metric_type=&quot;BM25&quot;</code> は、インデックスの設定と一致していなければなりません。</p></li>
<li><p><code translate="no">analyzer_name=&quot;english&quot;</code> は、クエリ・テキストに適用する分析器を指定します。これは、保存された文書に使用される解析器とは無関係です。</p></li>
<li><p><code translate="no">params={&quot;drop_ratio_search&quot;: &quot;0&quot;}</code> BM25固有の動作を制御します。ここでは、検索に含まれるすべての用語を保持します。詳細については、「<a href="/docs/ja/sparse_vector.md">スパース・ベクター</a>」を参照してください。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,            <span class="hljs-comment"># Must match index configuration</span>
    <span class="hljs-string">&quot;analyzer_name&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,  <span class="hljs-comment"># Analyzer that matches the query language</span>
    <span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-string">&quot;0&quot;</span>,     <span class="hljs-comment"># Keep all terms in search (tweak as needed)</span>
}

<span class="hljs-comment"># Execute the search</span>
english_results = client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># Collection to search</span>
    data=[<span class="hljs-string">&quot;artificial intelligence&quot;</span>],                <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,              <span class="hljs-comment"># Field to search against</span>
    search_params=search_params,      <span class="hljs-comment"># Search configuration</span>
    limit=<span class="hljs-number">3</span>,                      <span class="hljs-comment"># Max results to return</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],  <span class="hljs-comment"># Fields to include in the output</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,       <span class="hljs-comment"># Data‑consistency guarantee</span>
)

<span class="hljs-comment"># Display English search results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>)
<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(english_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">{hit.score:<span class="hljs-number">.4</span>f}</span>] <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;text&#x27;</span>)}</span> &quot;</span>
          <span class="hljs-string">f&quot;(Language: <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;language&#x27;</span>)}</span>)&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># === English Search Results ===</span>
<span class="hljs-comment"># 1. [2.7881] Artificial intelligence is transforming technology (Language: english)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> english_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;artificial intelligence&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;english&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,
});

<span class="hljs-comment">// Display English search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== English Search Results ===&quot;</span>);
english_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;BM25&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>)
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0</span>)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;artificial intelligence&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;artificial intelligence&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;BM25&quot;,
    &quot;analyzer_name&quot;: &quot;english&quot;,
    &quot;drop_ratio_search&quot;: &quot;0&quot;  
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-Chinese-analyzer" class="common-anchor-header">中国語アナライザを使用する</h3><p>この例では、異なるクエリ・テキストに対して、中国語アナライザ（そのエイリアス<code translate="no">&quot;cn&quot;</code> を使用）に切り替えることを示します。他のパラメータはすべて同じですが、中国語固有のトークン化ルールを使用してクエリ・テキストが処理されます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params[<span class="hljs-string">&quot;analyzer_name&quot;</span>] = <span class="hljs-string">&quot;cn&quot;</span>

chinese_results = client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># Collection to search</span>
    data=[<span class="hljs-string">&quot;人工智能&quot;</span>],                <span class="hljs-comment"># Query text</span>
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,              <span class="hljs-comment"># Field to search against</span>
    search_params=search_params,      <span class="hljs-comment"># Search configuration</span>
    limit=<span class="hljs-number">3</span>,                      <span class="hljs-comment"># Max results to return</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],  <span class="hljs-comment"># Fields to include in the output</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,       <span class="hljs-comment"># Data‑consistency guarantee</span>
)

<span class="hljs-comment"># Display Chinese search results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>)
<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(chinese_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">{hit.score:<span class="hljs-number">.4</span>f}</span>] <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;text&#x27;</span>)}</span> &quot;</span>
          <span class="hljs-string">f&quot;(Language: <span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;language&#x27;</span>)}</span>)&quot;</span>)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># === Chinese Search Results ===</span>
<span class="hljs-comment"># 1. [3.3814] 人工智能正在改变技术领域 (Language: chinese)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">searchParams.put(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>);
searchResp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;multilingual_documents&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;人工智能&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
        .build());

System.out.println(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.printf(<span class="hljs-string">&quot;Score: %f, %s\n&quot;</span>, result.getScore(), result.getEntity().toString());
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Execute the search</span>
<span class="hljs-keyword">const</span> cn_results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;人工智能&quot;</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">analyzer_name</span>: <span class="hljs-string">&quot;cn&quot;</span>,
    <span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-string">&quot;0&quot;</span>,
  },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,
});

<span class="hljs-comment">// Display Chinese search results</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\n=== Chinese Search Results ===&quot;</span>);
cn_results.<span class="hljs-property">results</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">hit, i</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
    <span class="hljs-string">`<span class="hljs-subst">${i + <span class="hljs-number">1</span>}</span>. [<span class="hljs-subst">${hit.score.toFixed(<span class="hljs-number">4</span>)}</span>] <span class="hljs-subst">${hit.entity.text}</span> `</span> +
      <span class="hljs-string">`(Language: <span class="hljs-subst">${hit.entity.language}</span>)`</span>
  );
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams.WithExtraParam(<span class="hljs-string">&quot;analyzer_name&quot;</span>, <span class="hljs-string">&quot;cn&quot;</span>)

resultSets, err = client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;multilingual_documents&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,                        <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;人工智能&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;language&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(resultSet.Scores); i++ {
        text, _ := resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).GetAsString(i)
        lang, _ := resultSet.GetColumn(<span class="hljs-string">&quot;language&quot;</span>).GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Score: &quot;</span>, resultSet.Scores[i], <span class="hljs-string">&quot;Text: &quot;</span>, text, <span class="hljs-string">&quot;Language:&quot;</span>, lang)
    }
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;multilingual_documents&quot;,
  &quot;data&quot;: [&quot;人工智能&quot;],
  &quot;annsField&quot;: &quot;sparse&quot;,
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;analyzer_name&quot;: &quot;cn&quot;
  },
  &quot;outputFields&quot;: [&quot;text&quot;, &quot;language&quot;],
  &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
