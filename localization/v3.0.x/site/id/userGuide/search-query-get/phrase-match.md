---
id: phrase-match.md
title: Phrase MatchCompatible with Milvus 2.5.17+
summary: >-
  Pencocokan frasa memungkinkan Anda mencari dokumen yang berisi istilah kueri
  Anda sebagai frasa yang persis sama. Secara default, kata-kata tersebut harus
  muncul dalam urutan yang sama dan berdekatan satu sama lain. Misalnya, kueri
  "robotics machine learning" akan cocok dengan teks seperti "…model
  pembelajaran mesin robotika yang umum…", di mana kata-kata "robotics",
  "machine", dan "learning" muncul secara berurutan tanpa ada kata lain di
  antaranya.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Phrase Match<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Phrase match lets you search for documents containing your query terms as an exact phrase. By default, the words must appear in the same order and directly adjacent to one another. For example, a query for <strong>“robotics machine learning”</strong> matches text like <em>“…typical robotics machine learning models…”</em>, where the words <strong>“robotics”</strong>, <strong>“machine”</strong>, and <strong>“learning”</strong> appear in sequence with no other words between them.</p>
<p>However, in real-world scenarios, strict phrase matching can be too rigid. You might want to match text like <em>“…machine learning models widely adopted in robotics…”</em>. Here, the same keywords are present but not side-by-side or in the original order. To handle this, phrase match supports a <code translate="no">slop</code> parameter, which introduces flexibility. The <code translate="no">slop</code> value defines how many positional shifts are allowed between the terms in the phrase. For example, with a <code translate="no">slop</code> of 1, a query for <strong>“machine learning”</strong> can match text like <em>“…machine deep learning…”</em>, where one word (<strong>“deep”</strong>) separates the original terms.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Powered by the <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> search engine library, phrase match works by analyzing the positional information of words within documents. The diagram below illustrates the process:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
    <span>Phrase Match Workflow</span>
  </span>
</p>
<ol>
<li><p><strong>Document Tokenization</strong>: When you insert documents into Milvus, the text is split into tokens (individual words or terms) using an analyzer, with positional information recorded for each token. For example, <strong>doc_1</strong> is tokenized into <strong>[“machine” (pos=0), “learning” (pos=1), “boosts” (pos=2), “efficiency” (pos=3)]</strong>. For more information on analyzers, refer to <a href="/docs/id/analyzer-overview.md">Analyzer Overview</a>.</p></li>
<li><p><strong>Inverted Index Creation</strong>: Milvus builds an inverted index, mapping each token to the document(s) in which it appears and the token’s positions in those documents.</p></li>
<li><p><strong>Phrase Matching</strong>: When a phrase query is executed, Milvus looks up each token in the inverted index and checks their positions to determine if they appear in the correct order and proximity. The <code translate="no">slop</code> parameter controls the maximum number of positions allowed between matching tokens:</p>
<ul>
<li><p><strong>slop = 0</strong> means the tokens must appear <strong>in the exact order and immediately adjacent</strong> (i.e., no extra words in between).</p>
<ul>
<li>In the example, only <strong>doc_1</strong> (<strong>“machine”</strong> at <strong>pos=0</strong>, <strong>“learning”</strong> at <strong>pos=1</strong>) matches exactly.</li>
</ul></li>
<li><p><strong>slop = 2</strong> allows up to two positions of flexibility or rearrangements between matching tokens.</p>
<ul>
<li><p>This allows reversed order (<strong>“learning machine”</strong>) or a small gap between the tokens.</p></li>
<li><p>Consequently, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>“learning”</strong> at <strong>pos=0</strong>, <strong>“machine”</strong> at <strong>pos=1</strong>), and <strong>doc_3</strong> (<strong>“learning”</strong> at <strong>pos=1</strong>, <strong>“machine”</strong> at <strong>pos=2</strong>) all match.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Enable phrase match<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Phrase match works with the <code translate="no">VARCHAR</code> field type, the string data type in Milvus. To enable phrase matching, configure your collection schema by setting both <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code> parameters to <code translate="no">True</code>, similar to <a href="/docs/id/keyword-match.md">text match</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Set <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>To enable phrase match for a specific <code translate="no">VARCHAR</code> field, set both <code translate="no">enable_analyzer</code> and <code translate="no">enable_match</code> parameters to <code translate="no">True</code> when defining the field schema. This configuration instructs Milvus to tokenize the text and create an inverted index with positional information required for efficient phrase matching.</p>
<p>Here’s an example schema definition to enable phrase match:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
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
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string in bytes</span>
        .enableAnalyzer(<span class="hljs-literal">true</span>)           <span class="hljs-comment">// Enables text analysis (tokenization)</span>
        .enableMatch(<span class="hljs-literal">true</span>)              <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

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
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string in bytes</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis (tokenization)</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// Create a schema for a new collection</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">false</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>),
    )
    <span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)                   <span class="hljs-comment">// Name of the field</span>
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)   <span class="hljs-comment">// Field data type set as VARCHAR (string)</span>
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>)               <span class="hljs-comment">// Maximum length of the string in bytes</span>
            .<span class="hljs-title function_ invoke__">enable_analyzer</span>(<span class="hljs-literal">true</span>)          <span class="hljs-comment">// Enables text analysis (tokenization)</span>
            .<span class="hljs-title function_ invoke__">enable_match</span>(<span class="hljs-literal">true</span>),            <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-comment">// Create a schema for a new collection</span>
milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">false</span>);
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>});
<span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)    <span class="hljs-comment">// Maximum length of the string in bytes</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)   <span class="hljs-comment">// Enables text analysis (tokenization)</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));    <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embeddings&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                    .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
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
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string in bytes</span>
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a schema for a new collection</span>
CollectionSchema schema = <span class="hljs-keyword">new</span>()
{
    EnableDynamicFields = <span class="hljs-literal">false</span>,
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>),
        <span class="hljs-comment">// Add a VARCHAR field configured for phrase matching</span>
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">1000</span>, enableAnalyzer: <span class="hljs-literal">true</span>, enableMatch: <span class="hljs-literal">true</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;embeddings&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">5</span> }
    }
};
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
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Optional: Configure an analyzer<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Phrase matching accuracy depends significantly on the analyzer used to tokenize your text data. Different analyzers suit different languages and text formats, affecting tokenization and positional accuracy. Selecting an appropriate analyzer for your specific use case will optimize your phrase matching results.</p>
<p>By default, Milvus uses the standard analyzer, which tokenizes text based on whitespace and punctuation, removes tokens longer than 40 characters, and converts text to lowercase. No additional parameters are required for default usage. Refer to <a href="/docs/id/standard-analyzer.md">Standard Analyzer</a> for details.</p>
<p>If your application requires a specific analyzer, configure it using the <code translate="no">analyzer_params</code> parameter. For example, here’s how to configure the <code translate="no">english</code> analyzer for phrase matching in English text:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
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
        .maxLength(<span class="hljs-number">1000</span>)                <span class="hljs-comment">// Maximum length of the string in bytes</span>
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
    WithMaxLength(<span class="hljs-number">1000</span>).                   <span class="hljs-comment">// Maximum length of the string in bytes</span>
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).              <span class="hljs-comment">// Enables text analysis</span>
    WithAnalyzerParams(analyzerParams).    <span class="hljs-comment">// Specifies the analyzer configuration</span>
    WithEnableMatch(<span class="hljs-literal">true</span>),                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">analyzer_params</span> = serde_json::json!({<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>});

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_field</span>(
    FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)                   <span class="hljs-comment">// Name of the field</span>
        .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)   <span class="hljs-comment">// Field data type set as VARCHAR</span>
        .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>)               <span class="hljs-comment">// Maximum length of the string in bytes</span>
        .<span class="hljs-title function_ invoke__">enable_analyzer</span>(<span class="hljs-literal">true</span>)          <span class="hljs-comment">// Enables text analysis</span>
        .<span class="hljs-title function_ invoke__">analyzer_params</span>(analyzer_params) <span class="hljs-comment">// Specifies the analyzer configuration</span>
        .<span class="hljs-title function_ invoke__">enable_match</span>(<span class="hljs-literal">true</span>),            <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
nlohmann::json analyzer_params = {{<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>}};

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR)  <span class="hljs-comment">// Name of the field</span>
                    .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>)                 <span class="hljs-comment">// Maximum length of the string in bytes</span>
                    .<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>)                <span class="hljs-comment">// Enables text analysis</span>
                    .<span class="hljs-built_in">WithAnalyzerParams</span>(analyzer_params) <span class="hljs-comment">// Specifies the analyzer configuration</span>
                    .<span class="hljs-built_in">EnableMatch</span>(<span class="hljs-literal">true</span>));                 <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">const</span> analyzer_params = { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;english&quot;</span> };

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-comment">// Name of the field</span>
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>, <span class="hljs-comment">// Field data type set as VARCHAR</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>, <span class="hljs-comment">// Maximum length of the string in bytes</span>
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables text analysis</span>
    <span class="hljs-attr">analyzer_params</span>: analyzer_params, <span class="hljs-comment">// Specifies the analyzer configuration</span>
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Define analyzer parameters for English-language tokenization</span>
<span class="hljs-keyword">var</span> analyzerParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt; { [<span class="hljs-string">&quot;type&quot;</span>] = <span class="hljs-string">&quot;english&quot;</span> };

<span class="hljs-comment">// Add the VARCHAR field with the English analyzer enabled</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-number">1000</span>,
            enableAnalyzer: <span class="hljs-literal">true</span>,           <span class="hljs-comment">// Enables text analysis</span>
            analyzerParams: analyzerParams,  <span class="hljs-comment">// Specifies the analyzer configuration</span>
            enableMatch: <span class="hljs-literal">true</span>)               <span class="hljs-comment">// Enables inverted indexing for phrase matching</span>
    }
};
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
<p>Milvus supports several analyzers tailored for different languages and use cases. For detailed information, refer to <a href="/docs/id/analyzer-overview.md">Analyzer Overview</a>.</p>
<h3 id="Create-the-collection" class="common-anchor-header">Create the collection<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Once the necessary fields are defined, use the following code to create the collection:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create the collection</span>
COLLECTION_NAME = <span class="hljs-string">&quot;tech_articles&quot;</span>  <span class="hljs-comment"># Name your collection</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tech_articles&quot;</span>;  <span class="hljs-comment">// Name your collection</span>

<span class="hljs-keyword">if</span> (client.hasCollection(
        HasCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build()
    )) {
    client.dropCollection(
        DropCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build()
    );
}

client.createCollection(
    CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">collectionName := <span class="hljs-string">&quot;tech_articles&quot;</span>  <span class="hljs-comment">// Name your collection</span>

has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> has {
    _ = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
}

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;tech_articles&quot;</span>;  <span class="hljs-comment">// Name your collection</span>

<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;tech_articles&quot;</span>;  <span class="hljs-comment">// Name your collection</span>

milvus::HasCollectionResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">HasCollection</span>(milvus::<span class="hljs-built_in">HasCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name), response);
<span class="hljs-keyword">if</span> (response.<span class="hljs-built_in">Has</span>()) {
    status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
}

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create or recreate the collection if it already exists</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;tech_articles&quot;</span>; <span class="hljs-comment">// Name your collection</span>

<span class="hljs-keyword">const</span> hasCollection = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> });

<span class="hljs-keyword">if</span> (hasCollection.<span class="hljs-property">value</span>) {
    <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span> });
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>(schema);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> COLLECTION_NAME = <span class="hljs-string">&quot;tech_articles&quot;</span>; <span class="hljs-comment">// Name your collection</span>

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = COLLECTION_NAME }) <span class="hljs-keyword">is</span> { Has: <span class="hljs-literal">true</span> })
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = COLLECTION_NAME });
}

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = COLLECTION_NAME,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check whether the collection exists</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/has&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
  }&#x27;</span>

<span class="hljs-comment"># Drop the existing collection</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/drop&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;tech_articles&quot;
  }&#x27;</span>

<span class="hljs-comment"># Create the new collection</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;tech_articles\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>After the collection is created, make sure the following necessary steps are performed before <a href="#use-phrase-match">using phrase match</a>:</p>
<ul>
<li><p>Entities are inserted into the collection;</p></li>
<li><p>You have created an index on each vector field;</p></li>
<li><p>The collection is loaded into memory.</p></li>
</ul>
<p><details></p>
<p><summary>Show example code</summary></p>
<p>The following self-contained example creates a separate <code translate="no">phrase_match_demo</code> collection, inserts five documents, builds a vector index, and loads the collection. The query and search examples later on this page use the <code translate="no">tech_articles</code> dataset described in <a href="#example-dataset">Example dataset</a>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample data with text containing &quot;machine learning&quot; phrases</span>
COLLECTION_NAME = <span class="hljs-string">&quot;phrase_match_demo&quot;</span>

sample_data = [
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>,
        <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>,
        <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>,
        <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>]
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>,
        <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>,
        <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>]
    }
]

client.insert(collection_name=COLLECTION_NAME, data=sample_data)

<span class="hljs-comment"># Index the vector field and load the collection</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;embeddings_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">String</span> <span class="hljs-variable">COLLECTION_NAME</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;phrase_match_demo&quot;</span>;

<span class="hljs-comment">// Build the sample rows</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>);
row1.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>)));
data.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>);
row2.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>)));
data.add(row2);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>);
row3.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>)));
data.add(row3);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row4</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row4.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>);
row4.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>)));
data.add(row4);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row5</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row5.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>);
row5.add(<span class="hljs-string">&quot;embeddings&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.9f</span>)));
data.add(row5);

client.insert(InsertReq.builder().collectionName(COLLECTION_NAME).data(data).build());

<span class="hljs-comment">// Index the vector field and load the collection</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .indexName(<span class="hljs-string">&quot;embeddings_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName(COLLECTION_NAME)
        .indexParams(Collections.singletonList(indexParam))
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">collectionName := <span class="hljs-string">&quot;phrase_match_demo&quot;</span>

texts := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>,
    <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>,
    <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>,
    <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>,
    <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>,
}
embeddings := [][]<span class="hljs-type">float32</span>{
    {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>},
    {<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>},
    {<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>},
    {<span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>},
}

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithVarcharColumn(<span class="hljs-string">&quot;text&quot;</span>, texts).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-number">5</span>, embeddings))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Index the vector field and load the collection</span>
indexOption := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;embeddings&quot;</span>, index.NewAutoIndex(entity.COSINE)).
    WithIndexName(<span class="hljs-string">&quot;embeddings_index&quot;</span>)
_, err = client.CreateIndex(ctx, indexOption)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">collection_name</span> = <span class="hljs-string">&quot;phrase_match_demo&quot;</span>;

<span class="hljs-comment">// Insert sample data with text containing &quot;machine learning&quot; phrases</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">data</span> = <span class="hljs-built_in">vec!</span>[
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>]}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>]}),
    json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: [<span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>]}),
];

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">rows</span>(data)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Index the vector field and load the collection</span>
client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;embeddings_index&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">load_collection</span>(
        LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;phrase_match_demo&quot;</span>;

milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>}, {<span class="hljs-string">&quot;embeddings&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>}, {<span class="hljs-string">&quot;embeddings&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>}}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>}, {<span class="hljs-string">&quot;embeddings&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>}}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>}, {<span class="hljs-string">&quot;embeddings&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>}}},
    {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>}, {<span class="hljs-string">&quot;embeddings&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>}}}
};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                            response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Index the vector field and load the collection</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">embeddings_index</span><span class="hljs-params">(<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-string">&quot;embeddings_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                .<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(embeddings_index)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Insert sample data with text containing &quot;machine learning&quot; phrases</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">COLLECTION_NAME</span> = <span class="hljs-string">&quot;phrase_match_demo&quot;</span>;

<span class="hljs-keyword">const</span> sampleData = [
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>,
    <span class="hljs-attr">embeddings</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>,
    <span class="hljs-attr">embeddings</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>],
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>,
    <span class="hljs-attr">embeddings</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>],
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>,
    <span class="hljs-attr">embeddings</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
  },
  {
    <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>,
    <span class="hljs-attr">embeddings</span>: [<span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>],
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">data</span>: sampleData,
});

<span class="hljs-comment">// Create an index on the vector field and load the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;embeddings_index&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-variable constant_">COLLECTION_NAME</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> COLLECTION_NAME = <span class="hljs-string">&quot;phrase_match_demo&quot;</span>;

<span class="hljs-comment">// Insert sample data with text containing &quot;machine learning&quot; phrases</span>
<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = COLLECTION_NAME,
    RowsData =
    [
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;</span>, [<span class="hljs-string">&quot;embeddings&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> } },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Deep learning machine algorithms require large datasets for training.&quot;</span>, [<span class="hljs-string">&quot;embeddings&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span> } },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;The machine learning model showed excellent performance on the test set.&quot;</span>, [<span class="hljs-string">&quot;embeddings&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span> } },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;Natural language processing and machine learning go hand in hand.&quot;</span>, [<span class="hljs-string">&quot;embeddings&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span> } },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;This article discusses various learning machine techniques and applications.&quot;</span>, [<span class="hljs-string">&quot;embeddings&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.9f</span> } }
    ]
});

<span class="hljs-comment">// Index the vector field and load the collection</span>
<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = COLLECTION_NAME,
    Indexes = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-string">&quot;embeddings_index&quot;</span>, IndexType.AutoIndex, MetricType.Cosine) }
});

<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq { CollectionName = COLLECTION_NAME });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Insert the data into the collection</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;phrase_match_demo&quot;,
    &quot;data&quot;: [
      {
        &quot;text&quot;: &quot;Machine learning is a subset of artificial intelligence that focuses on algorithms.&quot;,
        &quot;embeddings&quot;: [0.1, 0.2, 0.3, 0.4, 0.5]
      },
      {
        &quot;text&quot;: &quot;Deep learning machine algorithms require large datasets for training.&quot;,
        &quot;embeddings&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]
      },
      {
        &quot;text&quot;: &quot;The machine learning model showed excellent performance on the test set.&quot;,
        &quot;embeddings&quot;: [0.3, 0.4, 0.5, 0.6, 0.7]
      },
      {
        &quot;text&quot;: &quot;Natural language processing and machine learning go hand in hand.&quot;,
        &quot;embeddings&quot;: [0.4, 0.5, 0.6, 0.7, 0.8]
      },
      {
        &quot;text&quot;: &quot;This article discusses various learning machine techniques and applications.&quot;,
        &quot;embeddings&quot;: [0.5, 0.6, 0.7, 0.8, 0.9]
      }
    ]
  }&#x27;</span>

<span class="hljs-comment"># Create an index on the vector field and load the collection</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;phrase_match_demo&quot;,
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;embeddings&quot;,
        &quot;indexName&quot;: &quot;embeddings_index&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
      }
    ]
  }&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/load&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;phrase_match_demo&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Use-phrase-match" class="common-anchor-header">Use phrase match<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you’ve enabled match for a <code translate="no">VARCHAR</code> field in your collection schema, you can perform phrase matches using the <code translate="no">PHRASE_MATCH</code> expression.</p>
<div class="alert note">
<p>The <code translate="no">PHRASE_MATCH</code> expression is case-insensitive. You can use either <code translate="no">PHRASE_MATCH</code> or <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">PHRASE_MATCH expression syntax<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Use the <code translate="no">PHRASE_MATCH</code> expression to specify the field, phrase, and optional flexibility (<code translate="no">slop</code>) when searching. The syntax is:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(PHRASE_MATCH(text, &#x27;machine learning&#x27;))&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-title function_">PHRASE_MATCH</span>(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;PHRASE_MATCH(field_name, phrase, slop)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> The name of the <code translate="no">VARCHAR</code> field on which you perform phrase matches.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> The exact phrase to search for.</p></li>
<li><p><code translate="no">slop</code> (optional)<strong>:</strong> An integer specifying the maximum number of positions allowed in matching tokens.</p>
<ul>
<li><p><code translate="no">0</code> (default): Matches exact phrases only. Example: A filter for <strong>“machine learning”</strong> will match <strong>“machine learning”</strong> exactly, but not <strong>“machine boosts learning”</strong> or <strong>“learning machine”</strong>.</p></li>
<li><p><code translate="no">1</code>: Allows minor variation, such as one extra term or minor shift in position. Example: A filter for <strong>“machine learning”</strong> will match <strong>“machine boosts learning”</strong> (one token between <strong>“machine”</strong> and <strong>“learning”</strong>) but not <strong>“learning machine”</strong> (terms reversed).</p></li>
<li><p><code translate="no">2</code>: Allows more flexibility, including reversed term order or up to two tokens in between. Example: A filter for <strong>“machine learning”</strong> will match <strong>“learning machine”</strong> (terms reversed) or <strong>“machine quickly boosts learning”</strong> (two tokens between <strong>“machine”</strong> and <strong>“learning”</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Example dataset<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Suppose you have a collection named <strong>tech_articles</strong> containing the following five entities:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Machine swiftly improves model performance for ongoing learning"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>
<p>The query and search examples below use this dataset. The runnable example in <a href="#create-the-collection">Create the collection</a> inserts its own rows into a separate <code translate="no">phrase_match_demo</code> collection, so its printed output differs from the expected results below.</p>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Query with phrase match<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>When using the <code translate="no">query()</code> method, <strong>PHRASE_MATCH</strong> acts as a scalar filter. Only documents that contain the specified phrase (subject to the allowed slop) are returned.</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Example: slop = 0 (exact match)</h4><p>This example returns documents containing the exact phrase <strong>“machine learning”</strong> without any extra tokens in between.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(filter)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>;

QueryResp result = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    Expression = filter,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters { OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span> } }
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
<p><strong>Expected match results:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
</table>
<p>Only document 1 contains the exact phrase <strong>“machine learning”</strong> in the specified order with no additional tokens.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Search with phrase match<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>In search operations, <strong>PHRASE_MATCH</strong> is used to filter documents before applying vector similarity ranking. This two-step approach first narrows the candidate set by textual matching and then re-ranks those candidates based on vector embeddings.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Example: slop = 1</h4><p>Here, we allow a slop of 1. The filter is applied to documents that contain the phrase <strong>“learning machine”</strong> with slight flexibility.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
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
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector]))
            .<span class="hljs-title function_ invoke__">filter</span>(filter)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>;

SearchResp result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;embeddings&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }],
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter,
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span> }
    }
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
<p><strong>Match results:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Example: slop = 2</h4><p>This example allows a slop of 2, meaning that up to two extra tokens (or reversed terms) are allowed between the words <strong>“machine”</strong> and <strong>“learning”</strong>.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
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
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)     <span class="hljs-comment">// Vector field name</span>
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector])) <span class="hljs-comment">// Query vector</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter)                 <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)                      <span class="hljs-comment">// Maximum results to return</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>;

SearchResp result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;embeddings&quot;</span>,          <span class="hljs-comment">// Vector field name</span>
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector</span>
    Limit = <span class="hljs-number">10</span>,                              <span class="hljs-comment">// Maximum results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter,                 <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span> }
    }
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
<p><strong>Match results:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Example: slop = 3</h4><p>In this example, a slop of 3 provides even more flexibility. The filter searches for <strong>“machine learning”</strong> with up to three token positions allowed between the words.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop3 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
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
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">query_vector</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>];

<span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;tech_articles&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;embeddings&quot;</span>)     <span class="hljs-comment">// Vector field name</span>
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[query_vector])) <span class="hljs-comment">// Query vector</span>
            .<span class="hljs-title function_ invoke__">filter</span>(filter)                 <span class="hljs-comment">// Filter expression</span>
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)                      <span class="hljs-comment">// Maximum results to return</span>
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>;

SearchResp result = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;tech_articles&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;embeddings&quot;</span>,          <span class="hljs-comment">// Vector field name</span>
    Vectors = [<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }], <span class="hljs-comment">// Query vector</span>
    Limit = <span class="hljs-number">10</span>,                              <span class="hljs-comment">// Maximum results to return</span>
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = filter,                 <span class="hljs-comment">// Filter expression</span>
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span> }
    }
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
<p><strong>Match results:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Considerations<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Enabling phrase matching for a field triggers the creation of an inverted index, which consumes storage resources. Consider storage impact when deciding to enable this feature, as it varies based on text size, unique tokens, and the analyzer used.</p></li>
<li><p>Once you’ve defined an analyzer in your schema, its settings become permanent for that collection. If you decide that a different analyzer would better suit your needs, you may consider dropping the existing collection and creating a new one with the desired analyzer configuration.</p></li>
<li><p>Phrase match performance depends on how text is tokenized. Before applying an analyzer to your entire collection, use the <code translate="no">run_analyzer</code> method to review the tokenization output. For more information, refer to <a href="/docs/id/analyzer-overview.md#Example-use">Example use</a>.</p></li>
<li><p>Escape rules in <code translate="no">filter</code> expressions:</p>
<ul>
<li><p>Characters enclosed in double quotes or single quotes within expressions are interpreted as string constants. If the string constant includes escape characters, the escape characters must be represented with escape sequence. For example, use <code translate="no">\\</code> to represent <code translate="no">\</code>, <code translate="no">\\t</code> to represent a tab <code translate="no">\t</code>, and <code translate="no">\\n</code> to represent a newline.</p></li>
<li><p>If a string constant is enclosed by single quotes, a single quote within the constant should be represented as <code translate="no">\\'</code> while a double quote can be represented as either <code translate="no">&quot;</code> or <code translate="no">\\&quot;</code>. Example: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>If a string constant is enclosed by double quotes, a double quote within the constant should be represented as <code translate="no">\\&quot;</code> while a single quote can be represented as either <code translate="no">'</code> or <code translate="no">\\'</code>. Example: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
