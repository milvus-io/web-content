---
id: phrase-match.md
title: PhrasenübereinstimmungCompatible with Milvus 2.5.17+
summary: >-
  Mit der Phrasenübereinstimmung können Sie nach Dokumenten suchen, die Ihre
  Suchbegriffe als exakte Phrase enthalten. Standardmäßig müssen die Wörter in
  derselben Reihenfolge und direkt nebeneinander stehen. Beispielsweise liefert
  eine Suche nach „Robotik maschinelles Lernen“ Treffer wie „…typische
  Robotik-Modelle für maschinelles Lernen…“, bei denen die Wörter „Robotik“,
  „Maschine“ und „Lernen“ nacheinander erscheinen, ohne dass andere Wörter
  dazwischen stehen.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Phrasenübereinstimmung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit der Phrasenübereinstimmung können Sie nach Dokumenten suchen, die Ihre Suchbegriffe als exakte Phrase enthalten. Standardmäßig müssen die Wörter in derselben Reihenfolge und direkt nebeneinander stehen. Beispielsweise liefert eine Suche nach <strong>„Robotik maschinelles Lernen“</strong> Treffer wie <em>„…typische Robotik-Modelle für maschinelles Lernen…“</em>, bei denen die Wörter <strong>„Robotik“</strong>, <strong>„Maschine“</strong> und <strong>„Lernen“</strong> nacheinander und ohne weitere Wörter dazwischen vorkommen.</p>
<p>In der Praxis kann ein strikter Phrasenabgleich jedoch zu starr sein. Möglicherweise möchten Sie Text wie <em>„…Maschinell-Lern-Modelle, die in der Robotik weit verbreitet sind…“</em> finden <em>.</em> Hier sind zwar dieselben Schlüsselwörter vorhanden, jedoch nicht nebeneinander oder in der ursprünglichen Reihenfolge. Um dies zu berücksichtigen, unterstützt der Phrasenabgleich den Parameter „ <code translate="no">slop</code> “, der für mehr Flexibilität sorgt. Der Wert „ <code translate="no">slop</code> “ legt fest, wie viele Positionsverschiebungen zwischen den Begriffen in der Phrase zulässig sind. Bei einem Wert von 1 für „ <code translate="no">slop</code> “ kann eine Suchanfrage nach <strong>„machine learning“</strong> beispielsweise mit Text wie <em>„…machine deep learning…“</em> übereinstimmen, bei dem ein Wort (<strong>„deep“</strong>) die ursprünglichen Begriffe trennt.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Phrasenübereinstimmung basiert auf der <a href="https://github.com/quickwit-oss/tantivy">Tantivy-Suchmaschinenbibliothek</a> und funktioniert durch die Analyse der Positionsinformationen von Wörtern innerhalb von Dokumenten. Das folgende Diagramm veranschaulicht den Prozess:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>Ablauf der Phrasenübereinstimmung</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenisierung von Dokumenten</strong>: Wenn Sie Dokumente in Milvus einfügen, wird der Text mithilfe eines Analysators in Token (einzelne Wörter oder Begriffe) aufgeteilt, wobei für jedes Token Positionsinformationen erfasst werden. Beispielsweise wird <strong>doc_1</strong> in <strong>[„machine“ (pos=0), „learning“ (pos=1), „boosts“ (pos=2), „efficiency“ (pos=3)]</strong> tokenisiert. Weitere Informationen zu Analysatoren finden Sie unter <a href="/docs/de/analyzer-overview.md">„Übersicht über Analysatoren</a>“.</p></li>
<li><p><strong>Erstellung eines invertierten Index</strong>: Milvus erstellt einen invertierten Index, der jedes Token den Dokumenten zuordnet, in denen es vorkommt, sowie die Positionen des Tokens in diesen Dokumenten.</p></li>
<li><p><strong>Phrasenabgleich</strong>: Bei der Ausführung einer Phrasenabfrage sucht Milvus jedes Token im invertierten Index und überprüft dessen Positionen, um festzustellen, ob sie in der richtigen Reihenfolge und Nähe zueinander vorkommen. Der Parameter „ <code translate="no">slop</code> “ steuert die maximal zulässige Anzahl von Positionen zwischen übereinstimmenden Token:</p>
<ul>
<li><p><strong>slop = 0</strong> bedeutet, dass die Token <strong>in genau dieser Reihenfolge und unmittelbar nebeneinander</strong> vorkommen müssen (d. h., es dürfen keine zusätzlichen Wörter dazwischen stehen).</p>
<ul>
<li>Im Beispiel passt nur <strong>doc_1</strong> (<strong>„machine“</strong> an <strong>Pos=0</strong>, <strong>„learning“</strong> an <strong>Pos=1</strong>) exakt.</li>
</ul></li>
<li><p><strong>slop = 2</strong> erlaubt bis zu zwei Positionen Flexibilität oder Umstellungen zwischen übereinstimmenden Tokens.</p>
<ul>
<li><p>Dies erlaubt eine umgekehrte Reihenfolge (<strong>„learning machine“</strong>) oder eine kleine Lücke zwischen den Tokens.</p></li>
<li><p>Folglich stimmen <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>„learning“</strong> an <strong>Pos. 0</strong>, <strong>„machine“</strong> an <strong>Pos. 1</strong>) und <strong>doc_3</strong> (<strong>„learning“</strong> an <strong>Pos. 1</strong>, <strong>„machine“</strong> an <strong>Pos. 2</strong>) alle überein.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Phrasenabgleich aktivieren<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Phrasenabgleich funktioniert mit dem Feldtyp „ <code translate="no">VARCHAR</code> “, dem String-Datentyp in Milvus. Um den Phrasenabgleich zu aktivieren, konfigurieren Sie Ihr Sammlungsschema, indem Sie die Parameter „ <code translate="no">enable_analyzer</code> “ und „ <code translate="no">enable_match</code> “ ähnlich wie <a href="/docs/de/keyword-match.md">beim Textabgleich</a> auf „ <code translate="no">True</code> “ setzen.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Legen Sie „ <code translate="no">enable_analyzer</code> “ und <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Um den Phrasenabgleich für ein bestimmtes „ <code translate="no">VARCHAR</code> “-Feld zu aktivieren, setzen Sie bei der Definition des Feldschemas die Parameter „ <code translate="no">enable_analyzer</code> “ und „ <code translate="no">enable_match</code> “ auf „ <code translate="no">True</code> “. Diese Konfiguration weist Milvus an, den Text zu tokenisieren und einen invertierten Index mit den für einen effizienten Phrasenabgleich erforderlichen Positionsinformationen zu erstellen.</p>
<p>Hier ist ein Beispiel für eine Schemadefinition zur Aktivierung des Phrasenabgleichs:</p>
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
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Optional: Konfigurieren Sie einen Analysator<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Genauigkeit des Phrasenabgleichs hängt maßgeblich vom verwendeten Analysator ab, der Ihre Textdaten tokenisiert. Verschiedene Analysatoren eignen sich für unterschiedliche Sprachen und Textformate und beeinflussen die Tokenisierung sowie die Positionsgenauigkeit. Die Auswahl eines geeigneten Analysators für Ihren spezifischen Anwendungsfall optimiert Ihre Ergebnisse beim Phrasenabgleich.</p>
<p>Standardmäßig verwendet Milvus den Standard-Analysator, der Text anhand von Leerzeichen und Satzzeichen tokenisiert, Token mit mehr als 40 Zeichen entfernt und den Text in Kleinbuchstaben umwandelt. Für die Standardnutzung sind keine zusätzlichen Parameter erforderlich. Weitere Informationen finden Sie unter <a href="/docs/de/standard-analyzer.md">„Standard-Analysator</a> “.</p>
<p>Wenn Ihre Anwendung einen bestimmten Analysator erfordert, konfigurieren Sie diesen mithilfe des Parameters „ <code translate="no">analyzer_params</code> “. So konfigurieren Sie beispielsweise den Analysator „ <code translate="no">english</code> “ für den Phrasenabgleich in englischem Text:</p>
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
<p>Milvus unterstützt mehrere Analysatoren, die auf verschiedene Sprachen und Anwendungsfälle zugeschnitten sind. Ausführliche Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md">„Analyzer-Übersicht</a>“.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Phrasenabgleich verwenden<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie den Abgleich für ein „ <code translate="no">VARCHAR</code> “-Feld in Ihrem Sammlungsschema aktiviert haben, können Sie Phrasenabgleiche mithilfe des Ausdrucks „ <code translate="no">PHRASE_MATCH</code> “ durchführen.</p>
<div class="alert note">
<p>Bei dem Ausdruck „ <code translate="no">PHRASE_MATCH</code> “ wird die Groß-/Kleinschreibung nicht berücksichtigt. Sie können entweder „ <code translate="no">PHRASE_MATCH</code> “ oder „ <code translate="no">phrase_match</code> “ verwenden.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Syntax des Ausdrucks „PHRASE_MATCH“<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie den Ausdruck „ <code translate="no">PHRASE_MATCH</code> “, um bei der Suche das Feld, die Phrase und optional die Flexibilität (`<code translate="no">slop</code>`) anzugeben. Die Syntax lautet:</p>
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
<li><p><code translate="no">field_name</code><strong>:</strong> Der Name des „ <code translate="no">VARCHAR</code> “-Feldes, für das Sie Phrasenabgleiche durchführen.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> Die genaue Phrase, nach der gesucht werden soll.</p></li>
<li><p><code translate="no">slop</code> (optional)<strong>:</strong> Eine Ganzzahl, die die maximale Anzahl der zulässigen Positionen bei der Übereinstimmung von Tokens angibt.</p>
<ul>
<li><p><code translate="no">0</code> (Standard): Es werden nur exakte Phrasen abgeglichen. Beispiel: Ein Filter für <strong>„machine learning“</strong> findet genau <strong>„machine learning“</strong>, jedoch nicht <strong>„machine boosts learning“</strong> oder <strong>„learning machine“.</strong></p></li>
<li><p><code translate="no">1</code>: Erlaubt geringfügige Abweichungen, wie beispielsweise einen zusätzlichen Begriff oder eine geringfügige Verschiebung der Reihenfolge. Beispiel: Ein Filter für <strong>„machine learning“</strong> findet Übereinstimmungen mit <strong>„machine boosts learning“</strong> (ein Token zwischen <strong>„machine“</strong> und <strong>„learning“</strong>), jedoch nicht mit <strong>„learning machine“</strong> (umgekehrte Reihenfolge der Begriffe).</p></li>
<li><p><code translate="no">2</code>: Ermöglicht mehr Flexibilität, einschließlich umgekehrter Wortreihenfolge oder bis zu zwei Token dazwischen. Beispiel: Ein Filter für <strong>„machine learning“</strong> findet Übereinstimmungen mit <strong>„learning machine“</strong> (umgekehrte Wortreihenfolge) oder <strong>„machine quickly boosts learning“</strong> (zwei Token zwischen <strong>„machine“</strong> und <strong>„learning“</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Beispiel-Datensatz<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Angenommen, Sie haben eine Sammlung namens <strong>„tech_articles“</strong>, die die folgenden fünf Entitäten enthält:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>„Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen“</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>„Das Erlernen eines maschinellen Ansatzes ist entscheidend für den Fortschritt der modernen KI“</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>„Deep-Learning-Architekturen optimieren die Rechenlast“</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>„Die Maschine verbessert zügig die Modellleistung für kontinuierliches Lernen“</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>„Das Erlernen fortschrittlicher Algorithmen erweitert die Fähigkeiten der KI“</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Abfrage mit Phrasenabgleich<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei Verwendung der Methode „ <code translate="no">query()</code> “ fungiert <strong>PHRASE_MATCH</strong> als skalarer Filter. Es werden nur Dokumente zurückgegeben, die die angegebene Phrase enthalten (unter Berücksichtigung der zulässigen Toleranz).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Beispiel: slop = 0 (exakte Übereinstimmung)</h4><p>Dieses Beispiel gibt Dokumente zurück, die genau die Phrase <strong>„machine learning“</strong> enthalten, ohne dass dazwischen zusätzliche Token stehen.</p>
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
<p><strong>Erwartete Übereinstimmungsergebnisse:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>„Machine Learning steigert die Effizienz bei der Analyse großer Datenmengen“</p></td>
   </tr>
</table>
<p>Nur Dokument 1 enthält die exakte Phrase <strong>„machine learning“</strong> in der angegebenen Reihenfolge ohne zusätzliche Token.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Suche mit Phrasenabgleich<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei Suchvorgängen wird <strong>PHRASE_MATCH</strong> verwendet, um Dokumente zu filtern, bevor die Rangfolge anhand der Vektorähnlichkeit ermittelt wird. Bei diesem zweistufigen Ansatz wird zunächst die Kandidatenmenge durch textbasierte Übereinstimmung eingegrenzt und anschließend erfolgt eine Neuanordnung dieser Kandidaten auf der Grundlage von Vektor-Einbettungen.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Beispiel: slop = 1</h4><p>Hier lassen wir eine Toleranz von 1 zu. Der Filter wird auf Dokumente angewendet, die die Phrase <strong>„learning machine“</strong> mit geringer Flexibilität enthalten.</p>
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
<p><strong>Übereinstimmungsergebnisse:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>„Das Erlernen eines maschinenbasierten Ansatzes ist entscheidend für den Fortschritt der modernen KI“</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>„Deep-Learning-Architekturen optimieren die Rechenlasten“</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>„Das Erlernen fortschrittlicher maschineller Algorithmen erweitert die Fähigkeiten der KI“</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Beispiel: Toleranz = 2</h4><p>In diesem Beispiel ist ein Slop von 2 zulässig, was bedeutet, dass zwischen den Wörtern <strong>„machine“</strong> und <strong>„learning“</strong> bis zu zwei zusätzliche Token (oder in umgekehrter Reihenfolge stehende Begriffe) erlaubt sind <strong>.</strong></p>
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
<p><strong>Treffer:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>„Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen“</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>„Deep-Learning-Architekturen optimieren die Rechenlast“</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Beispiel: slop = 3</h4><p>In diesem Beispiel bietet ein Slop-Wert von 3 noch mehr Flexibilität. Der Filter sucht nach <strong>„maschinelles Lernen“</strong>, wobei bis zu drei Token-Positionen zwischen den Wörtern zulässig sind.</p>
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
<p><strong>Treffer:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>„Maschinelles Lernen steigert die Effizienz bei der Analyse großer Datenmengen“</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>„Das Erlernen eines maschinellen Ansatzes ist entscheidend für den Fortschritt der modernen KI“</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>„Deep-Learning-Architekturen optimieren die Rechenlast“</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>„Das Erlernen fortschrittlicher maschineller Algorithmen erweitert die Möglichkeiten der KI“</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Zu beachtende Aspekte<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Das Aktivieren des Phrasenabgleichs für ein Feld löst die Erstellung eines invertierten Indexes aus, der Speicherressourcen beansprucht. Berücksichtigen Sie die Auswirkungen auf den Speicherplatz, wenn Sie sich für die Aktivierung dieser Funktion entscheiden, da diese je nach Textgröße, eindeutigen Tokens und dem verwendeten Analysator variieren.</p></li>
<li><p>Sobald Sie einen Analysator in Ihrem Schema definiert haben, sind dessen Einstellungen für diese Sammlung dauerhaft festgelegt. Wenn Sie zu dem Schluss kommen, dass ein anderer Analysator Ihren Anforderungen besser entspricht, können Sie die bestehende Sammlung löschen und eine neue mit der gewünschten Analysator-Konfiguration erstellen.</p></li>
<li><p>Die Leistung des Phrasenabgleichs hängt davon ab, wie der Text tokenisiert wird. Bevor Sie einen Analysator auf Ihre gesamte Sammlung anwenden, sollten Sie die Tokenisierungsergebnisse mit der Methode ` <code translate="no">run_analyzer</code> ` überprüfen. Weitere Informationen finden Sie unter <a href="/docs/de/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">„Übersicht über Analysatoren</a>“.</p></li>
<li><p>Escape-Regeln in „ <code translate="no">filter</code> “-Ausdrücken:</p>
<ul>
<li><p>Zeichen, die innerhalb von Ausdrücken in doppelte oder einfache Anführungszeichen gesetzt sind, werden als Zeichenfolgenkonstanten interpretiert. Wenn die Zeichenfolgenkonstante Escape-Zeichen enthält, müssen diese mit einer Escape-Sequenz dargestellt werden. Verwenden Sie beispielsweise ` <code translate="no">\\</code> `, um ` <code translate="no">\</code>` darzustellen, ` <code translate="no">\\t</code> `, um einen Tabulator darzustellen ` <code translate="no">\t</code>`, und ` <code translate="no">\\n</code> `, um einen Zeilenumbruch darzustellen.</p></li>
<li><p>Wenn eine Zeichenfolgenkonstante in einfache Anführungszeichen gesetzt ist, sollte ein einfaches Anführungszeichen innerhalb der Konstante als <code translate="no">\\'</code> dargestellt werden, während ein doppeltes Anführungszeichen entweder als <code translate="no">&quot;</code> oder als <code translate="no">\\&quot;</code> dargestellt werden kann. Beispiel: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Wenn eine Zeichenfolgenkonstante in doppelte Anführungszeichen gesetzt ist, sollte ein doppeltes Anführungszeichen innerhalb der Konstante als „ <code translate="no">\\&quot;</code> “ dargestellt werden, während ein einfaches Anführungszeichen entweder als „ <code translate="no">'</code> “ oder „ <code translate="no">\\'</code> “ dargestellt werden kann. Beispiel: „ <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code> “.</p></li>
</ul></li>
</ul>
