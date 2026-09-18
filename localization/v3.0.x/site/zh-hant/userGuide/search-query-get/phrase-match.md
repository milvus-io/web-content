---
id: phrase-match.md
title: 短語匹配Compatible with Milvus 2.5.17+
summary: >-
  「短語匹配」可讓您搜尋包含查詢詞彙作為精確短語的文件。預設情況下，這些詞彙必須以相同的順序出現，且彼此緊鄰。 例如，查詢「robotics machine
  learning」會匹配如「…典型的機器人學機器學習模型…」這類文字，其中「robotics」、「machine」和「learning」這三個詞依序出現，且之間沒有其他詞彙。
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">短語匹配<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>短語匹配可讓您搜尋包含查詢詞彙作為精確短語的文件。預設情況下，這些詞彙必須以相同的順序出現，且彼此緊鄰。 例如，查詢<strong>「robotics machine learning」</strong>會匹配類似<em>「…典型的機器人學機器學習模型…」</em>這類文字，其中<strong>「robotics」</strong>、<strong>「machine」</strong>和<strong>「learning」</strong>這三個詞按順序出現，且之間沒有其他詞彙。</p>
<p>然而，在實際情境中，嚴格的短語匹配可能過於僵化。您可能希望匹配如<em>「…在機器人學中廣泛採用的機器學習模型…」</em>這類文字<em>。</em>在此情況下，雖然包含相同的關鍵字，但這些關鍵字並非緊鄰出現，亦非依原始順序排列。為解決此問題，短語匹配支援<code translate="no">slop</code> 參數，藉此增加靈活性。<code translate="no">slop</code> 的數值定義了短語中各詞彙之間允許的位置偏移量。例如，當<code translate="no">slop</code> 設為 1 時，查詢<strong>「machine learning」</strong>即可匹配如<em>「…machine deep learning…」</em>這類文字，其中一個詞彙（<strong>「deep」</strong>）將原始詞彙分隔開來。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>短語匹配功能由<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>搜尋引擎函式庫驅動，其運作原理是分析文件中單字的位置資訊。下圖說明了此過程：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>短語匹配工作流程</span>
  
 </span></p>
<ol>
<li><p><strong>文件分詞</strong>：當您將文件導入 Milvus 時，系統會透過分析器將文字分割為分詞（單一單詞或術語），並為每個分詞記錄其位置資訊。 例如<strong>，doc_1</strong>被分詞為<strong>[“machine” (pos=0)，“learning” (pos=1)，“boosts” (pos=2)，“efficiency” (pos=3)]</strong>。有關分析器的更多資訊，請參閱《<a href="/docs/zh-hant/analyzer-overview.md">分析器概覽》</a>。</p></li>
<li><p><strong>倒排索引建立</strong>：Milvus 會建立一個倒排索引，將每個詞元映射至其出現的文件，以及該詞元在這些文件中的位置。</p></li>
<li><p><strong>短語匹配</strong>：當執行短語查詢時，Milvus 會從倒排索引中查找每個詞元，並檢查其位置，以確定它們是否以正確的順序和相鄰度出現。<code translate="no">slop</code> 參數控制匹配詞元之間允許的最大位置數：</p>
<ul>
<li><p><strong>slop = 0</strong>表示詞元必須<strong>以完全相同的順序</strong>出現<strong>，且緊鄰</strong>（即中間不得有額外單字）。</p>
<ul>
<li>在此範例中，僅<strong>doc_1</strong>（<strong>位置 0</strong> 的<strong>「machine」</strong>，<strong>位置 1</strong> 的<strong>「learning」</strong>）完全匹配。</li>
</ul></li>
<li><p><strong>slop = 2</strong>允許匹配標記之間最多有兩個位置的彈性或重新排列。</p>
<ul>
<li><p>這允許順序顛倒（<strong>「learning machine」</strong>）或標記之間存在微小間隔。</p></li>
<li><p>因此，<strong>doc_1</strong>、<strong>doc_2</strong>（<strong>位置 0</strong> 為<strong>「learning」</strong>，<strong>位置 1</strong> 為<strong>「machine」</strong>）以及<strong>doc_3</strong>（<strong>位置 1</strong> 為<strong>「learning」</strong>，<strong>位置 2</strong> 為<strong>「machine」</strong>）均符合條件。</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">啟用短語匹配<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>短語匹配適用於<code translate="no">VARCHAR</code> 欄位類型，即 Milvus 中的字串資料類型。要啟用短語匹配，請透過將<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 參數均設定為<code translate="no">True</code> 來配置您的集合架構，這與<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>類似。</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">設定<code translate="no">enable_analyzer</code> 以及<code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>若要為特定的<code translate="no">VARCHAR</code> 欄位啟用短語匹配，請在定義欄位架構時，將<code translate="no">enable_analyzer</code> 和<code translate="no">enable_match</code> 參數均設定為<code translate="no">True</code> 。此設定會指示 Milvus 將文字分詞，並建立包含高效短語匹配所需位置資訊的倒排索引。</p>
<p>以下是一個啟用短語匹配的範例模式定義：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Create a schema for a new collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis (tokenization)</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

<span class="hljs-comment">// Create a schema for a new collection</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;embeddings&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/types/CollectionSchema.h&quot;</span></span>

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-function">milvus::CollectionSchema <span class="hljs-title">schema</span><span class="hljs-params">(<span class="hljs-string">&quot;tech_articles&quot;</span>)</span></span>;
schema.<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>));
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)    <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Enables text analysis (tokenization)</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));    <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embeddings&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                    .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">可選：配置分析器<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>短語匹配的準確度在很大程度上取決於用於將文字資料分詞的分析器。不同的分析器適用於不同的語言和文字格式，並會影響分詞結果及位置準確度。針對您的特定使用情境選擇合適的分析器，將能優化短語匹配結果。</p>
<p>預設情況下，Milvus 使用標準分析器，該分析器會根據空格和標點符號對文字進行分詞，移除長度超過 40 個字元的詞元，並將文字轉換為小寫。預設使用時無需額外參數。詳情請參閱「<a href="/docs/zh-hant/standard-analyzer.md">標準分析器</a>」。</p>
<p>若您的應用程式需要特定的分析器，請使用 `<code translate="no">analyzer_params</code> ` 參數進行設定。例如，以下是針對英文文本的短語比對，設定 `<code translate="no">english</code> ` 分析器的做法：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)              <span class="hljs-comment">// Name of the field</span>
        .dataType(DataType.VarChar)     <span class="hljs-comment">// Field data type set as VARCHAR</span>
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis</span>
        .analyzerParams(analyzerParams) <span class="hljs-comment">// Specifies the analyzer configuration</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).                      <span class="hljs-comment">// Name of the field</span>
    WithDataType(entity.FieldTypeVarChar). <span class="hljs-comment">// Field data type set as VARCHAR</span>
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis</span>
    WithAnalyzerParams(analyzerParams).    <span class="hljs-comment">// Specifies the analyzer configuration</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">const</span> analyzer_params = { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> };

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis</span>
    <span class="hljs-attr">analyzer_params</span>: analyzer_params, <span class="hljs-comment">// Specifies the analyzer configuration</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;},
                    &quot;enable_match&quot;: true
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
nlohmann::json analyzer_params = {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}};

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)               <span class="hljs-comment">// Enables text analysis</span>
                    .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params) <span class="hljs-comment">// Specifies the analyzer configuration</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));                <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 支援多種針對不同語言及使用情境量身打造的分析器。如需詳細資訊，請參閱《<a href="/docs/zh-hant/analyzer-overview.md">分析器概覽</a>》。</p>
<h2 id="Use-phrase-match" class="common-anchor-header">使用短語匹配<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>在您的集合架構中為<code translate="no">VARCHAR</code> 欄位啟用匹配功能後，即可使用<code translate="no">PHRASE_MATCH</code> 表達式執行短語匹配。</p>
<div class="alert note">
<p><code translate="no">PHRASE_MATCH</code> 表達式不區分大小寫。您可以使用<code translate="no">PHRASE_MATCH</code> 或<code translate="no">phrase_match</code> 。</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH 表達式語法<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">PHRASE_MATCH</code> 表達式，可在搜尋時指定欄位、短語以及可選的彈性設定（<code translate="no">slop</code> ）。其語法如下：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-title function_">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-built_in">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong>用於執行短語匹配的<code translate="no">VARCHAR</code> 欄位名稱。</p></li>
<li><p><code translate="no">phrase</code><strong>：</strong>要進行短語比對的 xml-ph-0000@deepl.internal 欄位名稱。</p></li>
<li><p><code translate="no">slop</code> （可選）<strong>：</strong>指定在匹配標記中允許的最大位置數的整數。</p>
<ul>
<li><p><code translate="no">0</code> (預設)：僅匹配完全相符的短語。範例：針對<strong>「machine learning」</strong>的篩選器將精確匹配<strong>「machine learning」</strong>，但不會匹配<strong>「machine boosts learning」</strong>或<strong>「learning machine」。</strong></p></li>
<li><p><code translate="no">1</code>: 允許輕微變體，例如多一個詞彙或位置的輕微變動。範例：針對<strong>「machine learning」</strong>的篩選器會匹配<strong>「machine boosts learning」</strong>（<strong>「machine」</strong>與<strong>「learning」</strong>之間隔一個詞彙），但不會匹配<strong>「learning machine」</strong>（詞彙順序顛倒）。</p></li>
<li><p><code translate="no">2</code>：允許更大的彈性，包括詞彙順序顛倒或中間最多有兩個詞元。範例：篩選條件<strong>「machine learning」</strong>將匹配<strong>「learning machine」</strong>（詞彙順序顛倒）或<strong>「machine quickly boosts learning」</strong>（<strong>「machine」</strong>與<strong>「learning」</strong>之間有兩個詞元）。</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">範例資料集<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>假設您有一個名為<strong>tech_articles</strong>的集合，其中包含以下五個實體：</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習能提升大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習以機器為基礎的方法對現代人工智慧的進展至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構可優化運算負載」</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>「機器能迅速提升模型效能，以支援持續學習」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法可拓展人工智慧的能力」</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">使用短語匹配進行查詢<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">query()</code> ` 方法時，<strong>`PHRASE_MATCH</strong>` 會作為標量篩選器。系統僅會回傳包含指定短語（且符合允許的容差範圍）的文件。</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">範例：slop = 0（精確匹配）</h4><p>此範例會回傳內容中包含精確短語<strong>「machine learning」</strong>，且中間沒有任何額外字元之文件。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;tech_articles&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(milvus::<span class="hljs-built_in">QueryRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                            response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>預期匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習可提升大規模資料分析的效率」</p></td>
   </tr>
</table>
<p>僅文件 1 包含精確短語<strong>「machine learning」</strong>，且順序與指定一致，中間沒有額外的詞元。</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">使用短語匹配進行搜尋<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>在搜尋操作中<strong>，PHRASE_MATCH</strong>用於在套用向量相似度排序之前篩選文件。此兩步驟方法首先透過文字比對縮小候選集範圍，然後根據向量嵌入重新對這些候選項進行排序。</p>
<h4 id="Example-slop--1" class="common-anchor-header">範例：slop = 1</h4><p>在此，我們允許 1 的容錯度。此篩選器將套用至包含短語<strong>「learning machine」</strong>且具有些微彈性的文件。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .filter(filter)
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithFilter(filter).
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector)
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>)
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習基於機器的方法對於現代人工智慧的進展至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構能優化運算負載」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法能拓展人工智慧的能力」</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">範例：slop = 2</h4><p>此範例允許 2 的彈性範圍，意即在<strong>「machine」</strong>與<strong>「learning」</strong>兩個詞之間，最多可有兩個額外的詞元（或倒置的詞語）<strong>。</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構可優化運算負載」</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">範例：slop = 3</h4><p>在此範例中，slop 值設定為 3 可提供更大的靈活性。此篩選器會搜尋<strong>「machine learning」</strong>，並允許兩個詞語之間最多有三個詞元的位置差。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
 <a href="#cpp">   C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

Map&lt;String, Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>);

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;tech_articles&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)            <span class="hljs-comment">// Vector field name</span>
        .data(Collections.singletonList(queryVector)) <span class="hljs-comment">// Query vector</span>
        .filter(filter)                     <span class="hljs-comment">// Filter expression</span>
        .searchParams(searchParams)
        .topK(<span class="hljs-number">10</span>)                           <span class="hljs-comment">// Maximum results to return</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter := <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;tech_articles&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit, maximum results to return</span>
    []entity.Vector{entity.FloatVector(queryVector)}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>). <span class="hljs-comment">// vector field name</span>
    WithFilter(filter).        <span class="hljs-comment">// filter expression</span>
    WithSearchParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter, <span class="hljs-comment">// Filter expression</span>
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">10</span> },
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Maximum results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
                                 .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embeddings&quot;</span>) <span class="hljs-comment">// Vector field name</span>
                                 .<span class="hljs-built_in">AddFloatVector</span>(query_vector) <span class="hljs-comment">// Query vector</span>
                                 .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>) <span class="hljs-comment">// Filter expression</span>
                                 .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-string">&quot;10&quot;</span>)
                                 .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>) <span class="hljs-comment">// Maximum results to return</span>
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                                 .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;text&quot;</span>),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>匹配結果：</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>「機器學習提升大規模資料分析的效率」</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>「學習以機器為基礎的方法對現代人工智慧的進展至關重要」</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>「深度學習機器架構能優化運算負載」</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>「學習先進的機器演算法能拓展人工智慧的能力」</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">注意事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>為某個欄位啟用短語匹配功能會觸發建立倒排索引，這會消耗儲存資源。在決定是否啟用此功能時，請考量其對儲存空間的影響，因為此影響會因文字大小、唯一詞元以及所使用的分析器而異。</p></li>
<li><p>一旦在資料結構中定義了分析器，其設定將對該集合永久生效。若您認為其他分析器更能滿足需求，可考慮刪除現有集合，並使用所需的分析器配置建立新的集合。</p></li>
<li><p>短語匹配的效能取決於文字的分詞方式。在將分析器套用至整個集合之前，請使用 `<code translate="no">run_analyzer</code> ` 方法檢視分詞結果。如需更多資訊，請參閱《<a href="/docs/zh-hant/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">分析器概述</a>》。</p></li>
<li><p><code translate="no">filter</code> 表達式中的轉義規則：</p>
<ul>
<li><p>在表達式中，以雙引號或單引號包圍的字元將被視為字串常數。若字串常數包含轉義字元，則必須使用轉義序列來表示這些轉義字元。例如，使用<code translate="no">\\</code> 來表示<code translate="no">\</code> 、<code translate="no">\\t</code> 來表示制表符<code translate="no">\t</code> ，以及<code translate="no">\\n</code> 來表示換行符。</p></li>
<li><p>若字串常數以單引號包圍，常數內的單引號應以<code translate="no">\\'</code> 表示，而雙引號則可使用<code translate="no">&quot;</code> 或<code translate="no">\\&quot;</code> 表示。範例：<code translate="no">'It\\'s milvus'</code> 。</p></li>
<li><p>若字串常數以雙引號包圍，則常數內的雙引號應以<code translate="no">\\&quot;</code> 表示，而單引號則可採用<code translate="no">'</code> 或<code translate="no">\\'</code> 表示。範例：<code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> 。</p></li>
</ul></li>
</ul>
