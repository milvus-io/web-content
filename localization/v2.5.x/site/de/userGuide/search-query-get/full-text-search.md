---
id: full-text-search.md
title: Volltextsuche
summary: >-
  Die Volltextsuche ist eine Funktion, die Dokumente mit bestimmten Begriffen
  oder Phrasen in Textdatensätzen abruft und die Ergebnisse dann nach Relevanz
  einstuft. Diese Funktion überwindet die Beschränkungen der semantischen Suche,
  bei der präzise Begriffe übersehen werden können, und stellt sicher, dass Sie
  die genauesten und kontextuell relevanten Ergebnisse erhalten. Darüber hinaus
  vereinfacht es die Vektorsuche, indem es Rohtexteingaben akzeptiert und Ihre
  Textdaten automatisch in spärliche Einbettungen konvertiert, ohne dass Sie
  manuell Vektoreinbettungen erzeugen müssen.
---
<h1 id="Full-Text-Search" class="common-anchor-header">Volltextsuche<button data-href="#Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Volltextsuche ist eine Funktion, die Dokumente mit bestimmten Begriffen oder Phrasen in Textdatensätzen abruft und die Ergebnisse dann nach Relevanz einstuft. Diese Funktion überwindet die Beschränkungen der semantischen Suche, bei der präzise Begriffe übersehen werden können, und stellt sicher, dass Sie die genauesten und kontextuell relevanten Ergebnisse erhalten. Darüber hinaus vereinfacht es die Vektorsuche, indem es Rohtexteingaben akzeptiert und Ihre Textdaten automatisch in spärliche Einbettungen konvertiert, ohne dass Sie manuell Vektoreinbettungen erstellen müssen.</p>
<p>Durch die Verwendung des BM25-Algorithmus für die Relevanzbewertung ist diese Funktion besonders wertvoll in Retrieval-Augmented-Generating-Szenarien (RAG), bei denen Dokumente mit hoher Übereinstimmung mit bestimmten Suchbegriffen priorisiert werden.</p>
<div class="alert note">
<p>Durch die Integration der Volltextsuche mit der semantikbasierten dichten Vektorsuche können Sie die Genauigkeit und Relevanz der Suchergebnisse verbessern. Weitere Informationen finden Sie unter <a href="/docs/de/v2.5.x/multi-vector-search.md">Hybride Suche</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Volltextsuche vereinfacht den Prozess der textbasierten Suche, indem sie die Notwendigkeit der manuellen Einbettung eliminiert. Diese Funktion funktioniert über den folgenden Arbeitsablauf:</p>
<ol>
<li><p><strong>Texteingabe</strong>: Sie fügen Rohtextdokumente ein oder stellen Abfragetext bereit, ohne dass eine manuelle Einbettung erforderlich ist.</p></li>
<li><p><strong>Text-Analyse</strong>: Milvus verwendet einen <a href="/docs/de/v2.5.x/analyzer-overview.md">Analysator</a>, um den eingegebenen Text in einzelne, durchsuchbare Begriffe zu zerlegen.</p></li>
<li><p><strong>Funktions-Verarbeitung</strong>: Die eingebaute Funktion empfängt tokenisierte Begriffe und wandelt sie in spärliche Vektordarstellungen um.</p></li>
<li><p><strong>Sammlungsspeicher</strong>: Milvus speichert diese spärlichen Einbettungen in einer Sammlung zum effizienten Abruf.</p></li>
<li><p><strong>BM25-Bewertung</strong>: Während einer Suche wendet Milvus den BM25-Algorithmus an, um Scores für die gespeicherten Dokumente zu berechnen und die übereinstimmenden Ergebnisse nach ihrer Relevanz für den Abfragetext zu ordnen.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/full-text-search.png" alt="Full Text Search" class="doc-image" id="full-text-search" />
   </span> <span class="img-wrapper"> <span>Volltextsuche</span> </span></p>
<p>Um die Volltextsuche zu nutzen, führen Sie die folgenden Schritte aus:</p>
<ol>
<li><p><a href="/docs/de/v2.5.x/full-text-search.md#Create-a-collection-for-full-text-search">Erstellen Sie eine Sammlung</a>: Richten Sie eine Sammlung mit den erforderlichen Feldern ein und definieren Sie eine Funktion zur Umwandlung von Rohtext in Sparse Embeddings.</p></li>
<li><p><a href="/docs/de/v2.5.x/full-text-search.md#Insert-text-data">Daten einfügen</a>: Fügen Sie Ihre Rohtextdokumente in die Sammlung ein.</p></li>
<li><p><a href="/docs/de/v2.5.x/full-text-search.md#Perform-full-text-search">Suchen durchführen</a>: Verwenden Sie Abfragetexte, um Ihre Sammlung zu durchsuchen und relevante Ergebnisse zu erhalten.</p></li>
</ol>
<h2 id="Create-a-collection-for-full-text-search" class="common-anchor-header">Erstellen Sie eine Sammlung für die Volltextsuche<button data-href="#Create-a-collection-for-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die Volltextsuche zu ermöglichen, erstellen Sie eine Sammlung mit einem bestimmten Schema. Dieses Schema muss drei notwendige Felder enthalten:</p>
<ul>
<li><p>Das Primärfeld, das jede Entität in einer Sammlung eindeutig identifiziert.</p></li>
<li><p>Ein <code translate="no">VARCHAR</code> -Feld, das Rohtextdokumente speichert, wobei das <code translate="no">enable_analyzer</code> -Attribut auf <code translate="no">True</code> gesetzt ist. Dies ermöglicht Milvus die Tokenisierung von Text in spezifische Begriffe für die Funktionsverarbeitung.</p></li>
<li><p>Ein <code translate="no">SPARSE_FLOAT_VECTOR</code> Feld, das für die Speicherung von Sparse Embeddings reserviert ist, die Milvus automatisch für das <code translate="no">VARCHAR</code> Feld generiert.</p></li>
</ul>
<h3 id="Define-the-collection-schema" class="common-anchor-header">Definieren Sie das Sammlungsschema</h3><p>Erstellen Sie zunächst das Schema und fügen Sie die erforderlichen Felder hinzu:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
];

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)
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
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration,</p>
<ul>
<li><p><code translate="no">id</code>: dient als Primärschlüssel und wird automatisch mit <code translate="no">auto_id=True</code> generiert.</p></li>
<li><p><code translate="no">text</code>: speichert Ihre Rohtextdaten für Volltextsuchvorgänge. Der Datentyp muss <code translate="no">VARCHAR</code> sein, da <code translate="no">VARCHAR</code> der Milvus-String-Datentyp für die Textspeicherung ist. Setzen Sie <code translate="no">enable_analyzer=True</code>, um Milvus die Tokenisierung des Textes zu erlauben. Standardmäßig verwendet Milvus den <code translate="no">standard</code><a href="/docs/de/v2.5.x/standard-analyzer.md"> Analysator</a> für die Textanalyse. Um einen anderen Analyzer zu konfigurieren, siehe <a href="/docs/de/v2.5.x/analyzer-overview.md">Analyzer-Übersicht</a>.</p></li>
<li><p><code translate="no">sparse</code>Vektorfeld: Ein Vektorfeld, das für die Speicherung von intern generierten Sparse Embeddings für Volltextsuchoperationen reserviert ist. Der Datentyp muss <code translate="no">SPARSE_FLOAT_VECTOR</code> sein.</p></li>
</ul>
<p>Definieren Sie nun eine Funktion, die Ihren Text in Sparse-Vektor-Darstellungen umwandelt, und fügen Sie sie dann dem Schema hinzu:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25_emb&quot;</span>, <span class="hljs-comment"># Function name</span>
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text data</span>
    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>], <span class="hljs-comment"># Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings</span>
    function_type=FunctionType.BM25, <span class="hljs-comment"># Set to `BM25`</span>
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;sparse&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25_emb&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25_emb&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;sparse&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
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
                    &quot;enable_analyzer&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;sparse&quot;,
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;
            }
        ],
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;text_bm25_emb&quot;,
                &quot;type&quot;: &quot;BM25&quot;,
                &quot;inputFieldNames&quot;: [&quot;text&quot;],
                &quot;outputFieldNames&quot;: [&quot;sparse&quot;],
                &quot;params&quot;: {}
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Der Name der Funktion. Diese Funktion wandelt Ihren Rohtext aus dem Feld <code translate="no">text</code> in durchsuchbare Vektoren um, die im Feld <code translate="no">sparse</code> gespeichert werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Der Name des <code translate="no">VARCHAR</code> Feldes, das die Konvertierung von Text in spärliche Vektoren erfordert. Für <code translate="no">FunctionType.BM25</code> akzeptiert dieser Parameter nur einen Feldnamen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Der Name des Feldes, in dem die intern erzeugten Sparse-Vektoren gespeichert werden. Für <code translate="no">FunctionType.BM25</code> akzeptiert dieser Parameter nur einen Feldnamen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Der Typ der zu verwendenden Funktion. Setzen Sie den Wert auf <code translate="no">FunctionType.BM25</code>.</p></td>
   </tr>
</table>
<div class="alert note">
<p>Für Sammlungen mit mehreren <code translate="no">VARCHAR</code> Feldern, die eine Konvertierung von Text in Sparse Vectors erfordern, fügen Sie dem Sammlungsschema separate Funktionen hinzu und stellen sicher, dass jede Funktion einen eindeutigen Namen und <code translate="no">output_field_names</code> Wert hat.</p>
</div>
<h3 id="Configure-the-index" class="common-anchor-header">Konfigurieren Sie den Index</h3><p>Nachdem Sie das Schema mit den erforderlichen Feldern und der integrierten Funktion definiert haben, richten Sie den Index für Ihre Sammlung ein. Um diesen Prozess zu vereinfachen, verwenden Sie <code translate="no">AUTOINDEX</code> als <code translate="no">index_type</code>, eine Option, die es Milvus ermöglicht, den am besten geeigneten Indextyp basierend auf der Struktur Ihrer Daten auszuwählen und zu konfigurieren.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,

    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }

)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
fvParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
fvParams.put(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>);
fvParams.put(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>);

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());    
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>,
    index.NewAutoIndex(entity.MetricType(entity.BM25)))
    .WithExtraParam(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_k1&quot;</span>, <span class="hljs-number">1.2</span>)
    .WithExtraParam(<span class="hljs-string">&quot;bm25_b&quot;</span>, <span class="hljs-number">0.75</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    <span class="hljs-attr">params</span>: {
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>
    }
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse&quot;,
            &quot;metricType&quot;: &quot;BM25&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
            &quot;params&quot;:{
               &quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;,
               &quot;bm25_k1&quot;: 1.2,
               &quot;bm25_b&quot;: 0.75
            }
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Der Name des zu indizierenden Vektorfeldes. Für die Volltextsuche sollte dies das Feld sein, das die generierten Sparse-Vektoren speichert. In diesem Beispiel setzen Sie den Wert auf <code translate="no">sparse</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Der Typ des zu erstellenden Indexes. <code translate="no">AUTOINDEX</code> ermöglicht es Milvus, die Indexeinstellungen automatisch zu optimieren. Wenn Sie mehr Kontrolle über Ihre Indexeinstellungen benötigen, können Sie aus verschiedenen Indextypen wählen, die für Sparse-Vektoren in Milvus verfügbar sind. Weitere Informationen finden Sie unter <a href="/docs/de/v2.5.x/index.md#Indexes-supported-in-Milvus">In Milvus unterstützte Indizes</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">metric_type</code></p></td>
     <td><p>Der Wert für diesen Parameter muss speziell für die Volltextsuchfunktionalität auf <code translate="no">BM25</code> gesetzt werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Ein Wörterbuch mit zusätzlichen Parametern, die für den Index spezifisch sind.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.inverted_index_algo</code></p></td>
     <td><p>Der Algorithmus, der für den Aufbau und die Abfrage des Indexes verwendet wird. Gültige Werte:</p>
<ul>
<li><p><code translate="no">"DAAT_MAXSCORE"</code> (Standard): Optimierte Document-at-a-Time (DAAT)-Abfrageverarbeitung unter Verwendung des MaxScore-Algorithmus. MaxScore bietet eine bessere Leistung für hohe <em>k-Werte</em> oder Abfragen mit vielen Begriffen, indem Begriffe und Dokumente übersprungen werden, die wahrscheinlich nur geringe Auswirkungen haben. Dies wird erreicht, indem Begriffe auf der Grundlage ihrer maximalen Trefferquote in wesentliche und nicht wesentliche Gruppen unterteilt werden, wobei der Schwerpunkt auf Begriffen liegt, die zu den Top-k-Ergebnissen beitragen können.</p></li>
<li><p><code translate="no">"DAAT_WAND"</code>: Optimierte Verarbeitung von DAAT-Anfragen mit dem WAND-Algorithmus. WAND wertet weniger Trefferdokumente aus, indem es die maximalen Impact-Scores nutzt, um nicht konkurrierende Dokumente zu überspringen, aber es hat einen höheren Overhead pro Treffer. Dadurch ist WAND effizienter für Abfragen mit kleinen <em>k-Werten</em> oder kurzen Abfragen, bei denen das Überspringen von Dokumenten praktikabler ist.</p></li>
<li><p><code translate="no">"TAAT_NAIVE"</code>: Basic Term-at-a-Time (TAAT) Abfrageverarbeitung. Obwohl er im Vergleich zu <code translate="no">DAAT_MAXSCORE</code> und <code translate="no">DAAT_WAND</code> langsamer ist, bietet <code translate="no">TAAT_NAIVE</code> einen einzigartigen Vorteil. Im Gegensatz zu DAAT-Algorithmen, die zwischengespeicherte Maximalwerte verwenden, die unabhängig von Änderungen des globalen Sammelparameters (avgdl) statisch bleiben, passt sich <code translate="no">TAAT_NAIVE</code> dynamisch an solche Änderungen an.</p></li>
</ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_k1</code></p></td>
     <td><p>Steuert die Sättigung der Termhäufigkeit. Höhere Werte erhöhen die Bedeutung der Termhäufigkeit bei der Bewertung von Dokumenten. Wertebereich: [1.2, 2.0].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.bm25_b</code></p></td>
     <td><p>Steuert das Ausmaß, in dem die Dokumentlänge normalisiert wird. Üblicherweise werden Werte zwischen 0 und 1 verwendet, wobei der Standardwert bei 0,75 liegt. Ein Wert von 1 bedeutet keine Längennormalisierung, während ein Wert von 0 eine vollständige Normalisierung bedeutet.</p></td>
   </tr>
</table>
<h3 id="Create-the-collection" class="common-anchor-header">Erstellen Sie die Sammlung</h3><p>Erstellen Sie nun die Sammlung unter Verwendung der definierten Schema- und Indexparameter.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">schema</span>: schema, 
    <span class="hljs-attr">index_params</span>: index_params,
    <span class="hljs-attr">functions</span>: functions
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-text-data" class="common-anchor-header">Einfügen von Textdaten<button data-href="#Insert-text-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie Ihre Sammlung und Ihren Index eingerichtet haben, können Sie nun Textdaten einfügen. Bei diesem Vorgang müssen Sie nur den Rohtext bereitstellen. Die integrierte Funktion, die wir zuvor definiert haben, erzeugt automatisch den entsprechenden Sparse-Vektor für jeden Texteintrag.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.insert(<span class="hljs-string">&#x27;my_collection&#x27;</span>, [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval is a field of study.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;information retrieval focuses on finding relevant information in large datasets.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;text\&quot;: \&quot;data mining and information retrieval overlap in research.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="hljs-attr">data</span>: [
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>},
    {<span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;data mining and information retrieval overlap in research.&#x27;</span>},
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;text&quot;: &quot;information retrieval is a field of study.&quot;},
        {&quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;},
        {&quot;text&quot;: &quot;data mining and information retrieval overlap in research.&quot;}       
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-full-text-search" class="common-anchor-header">Volltextsuche durchführen<button data-href="#Perform-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald Sie Daten in Ihre Sammlung eingefügt haben, können Sie eine Volltextsuche mit Rohtextabfragen durchführen. Milvus konvertiert Ihre Abfrage automatisch in einen Sparse-Vektor und ordnet die übereinstimmenden Suchergebnisse mit dem BM25-Algorithmus ein und gibt dann die TopK (<code translate="no">limit</code>) Ergebnisse zurück.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&#x27;params&#x27;</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},
}

client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>], <span class="hljs-comment"># Fields to return in search results; sparse field cannot be output</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;sparse&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;whats the focus of information retrieval?&quot;</span>)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;sparse&quot;</span>).
    WithAnnParam(annSearchParams).
    WithOutputFields(<span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;text: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;text&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&#x27;whats the focus of information retrieval?&#x27;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;sparse&#x27;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">params</span>: {<span class="hljs-string">&#x27;drop_ratio_search&#x27;</span>: <span class="hljs-number">0.2</span>},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data-raw <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        &quot;whats the focus of information retrieval?&quot;
    ],
    &quot;annsField&quot;: &quot;sparse&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [
        &quot;text&quot;
    ],
    &quot;searchParams&quot;:{
        &quot;params&quot;:{
            &quot;drop_ratio_search&quot;:0.2
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_params</code></p></td>
     <td><p>Ein Wörterbuch mit Suchparametern.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.drop_ratio_search</code></p></td>
     <td><p>Anteil der Begriffe mit geringer Bedeutung, die bei der Suche ignoriert werden sollen. Für Details siehe <a href="/docs/de/v2.5.x/sparse_vector.md">Sparse Vector</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">data</code></p></td>
     <td><p>Roher Abfragetext in natürlicher Sprache. Milvus konvertiert Ihre Textabfrage automatisch in Sparse Vectors unter Verwendung der BM25-Funktion - geben Sie <strong>keine</strong> vorberechneten Vektoren an.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">anns_field</code></p></td>
     <td><p>Der Name des Feldes, das intern generierte Sparse-Vektoren enthält.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_fields</code></p></td>
     <td><p>Liste der Feldnamen, die in den Suchergebnissen zurückgegeben werden sollen. Unterstützt alle Felder <strong>mit Ausnahme des Feldes "Sparse Vector"</strong>, das BM25-generierte Einbettungen enthält. Übliche Ausgabefelder sind das Primärschlüsselfeld (z. B. <code translate="no">id</code>) und das ursprüngliche Textfeld (z. B. <code translate="no">text</code>). Weitere Informationen finden Sie in den <a href="/docs/de/v2.5.x/full-text-search.md#Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search">FAQ</a>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">limit</code></p></td>
     <td><p>Maximale Anzahl von Top-Treffern, die zurückgegeben werden.</p></td>
   </tr>
</table>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-output-or-access-the-sparse-vectors-generated-by-the-BM25-function-in-full-text-search" class="common-anchor-header">Kann ich die von der BM25-Funktion erzeugten Sparse-Vektoren in der Volltextsuche ausgeben oder darauf zugreifen?</h3><p>Nein, die von der BM25-Funktion erzeugten Sparse-Vektoren sind in der Volltextsuche nicht direkt zugänglich oder ausgabefähig. Hier sind die Details:</p>
<ul>
<li><p>Die BM25-Funktion generiert intern Sparse-Vektoren für Ranking und Retrieval</p></li>
<li><p>Diese Vektoren werden im Sparse-Feld gespeichert, können aber nicht in die Volltextsuche einbezogen werden. <code translate="no">output_fields</code></p></li>
<li><p>Sie können nur die ursprünglichen Textfelder und Metadaten (wie <code translate="no">id</code>, <code translate="no">text</code>) ausgeben.</p></li>
</ul>
<p>Beispiel:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># ❌ This throws an error - you cannot output the sparse field</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;sparse&#x27;</span>]  <span class="hljs-comment"># &#x27;sparse&#x27; causes an error</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)

<span class="hljs-comment"># ✅ This works - output text fields only</span>
client.search(
    collection_name=<span class="hljs-string">&#x27;my_collection&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;query text&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;sparse&#x27;</span>,
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&#x27;text&#x27;</span>]</span>
    limit=<span class="hljs-number">3</span>,
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-do-I-need-to-define-a-sparse-vector-field-if-I-cant-access-it" class="common-anchor-header">Warum muss ich ein Sparse-Vektorfeld definieren, wenn ich nicht darauf zugreifen kann?</h3><p>Das spärliche Vektorfeld dient als interner Suchindex, ähnlich wie Datenbankindizes, mit denen die Benutzer nicht direkt interagieren.</p>
<p><strong>Entwurfsbegründung</strong>:</p>
<ul>
<li><p>Trennung der Belange: Sie arbeiten mit Text (Eingabe/Ausgabe), Milvus bearbeitet Vektoren (interne Verarbeitung)</p></li>
<li><p>Leistung: Vorberechnete spärliche Vektoren ermöglichen ein schnelles BM25-Ranking bei Abfragen</p></li>
<li><p>Benutzerfreundlichkeit: Abstrahiert komplexe Vektoroperationen hinter einer einfachen Textschnittstelle</p></li>
</ul>
<p><strong>Wenn Sie Zugriff auf Vektoren benötigen</strong>:</p>
<ul>
<li><p>Verwenden Sie manuelle Sparse-Vector-Operationen anstelle einer Volltextsuche</p></li>
<li><p>Erstellen Sie separate Sammlungen für benutzerdefinierte Sparse-Vector-Workflows</p></li>
</ul>
<p>Einzelheiten finden Sie unter <a href="/docs/de/v2.5.x/sparse_vector.md">Sparse Vector</a>.</p>
