---
id: primary-field.md
title: Primärfeld & AutoID
summary: >-
  Das Primärfeld dient der eindeutigen Identifizierung einer Entität. Auf dieser
  Seite erfahren Sie, wie Sie das Primärfeld von zwei verschiedenen Datentypen
  hinzufügen und wie Sie Milvus die automatische Zuweisung von Primärfeldwerten
  ermöglichen.
---
<h1 id="Primary-Field--AutoID" class="common-anchor-header">Primärfeld &amp; AutoID<button data-href="#Primary-Field--AutoID" class="anchor-icon" translate="no">
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
    </button></h1><p>Das Primärfeld dient der eindeutigen Identifizierung einer Entität. Auf dieser Seite erfahren Sie, wie Sie das Primärfeld von zwei verschiedenen Datentypen hinzufügen können und wie Sie Milvus in die Lage versetzen, Primärfeldwerte automatisch zuzuordnen.</p>
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
    </button></h2><p>In einer Sammlung sollte der Primärschlüssel jeder Entität global eindeutig sein. Wenn Sie das Primärfeld hinzufügen, müssen Sie seinen Datentyp explizit auf <strong>VARCHAR</strong> oder <strong>INT64</strong> einstellen. Die Einstellung des Datentyps auf <strong>INT64</strong> bedeutet, dass die Primärschlüssel eine ganze Zahl ähnlich wie <code translate="no">12345</code> sein sollten; die Einstellung des Datentyps auf <strong>VARCHAR</strong> bedeutet, dass die Primärschlüssel eine Zeichenkette ähnlich wie <code translate="no">my_entity_1234</code> sein sollten.</p>
<p>Sie können auch <strong>AutoID</strong> aktivieren, damit Milvus automatisch Primärschlüssel für eingehende Entitäten zuweist. Sobald Sie <strong>AutoID</strong> in Ihrer Sammlung aktiviert haben, sollten Sie beim Einfügen von Entitäten keine Primärschlüssel verwenden.</p>
<p>Das Primärfeld in einer Sammlung hat keinen Standardwert und kann nicht null sein.</p>
<h2 id="Use-Int64-Primary-Keys" class="common-anchor-header">Int64-Primärschlüssel verwenden<button data-href="#Use-Int64-Primary-Keys" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Primärschlüssel vom Typ Int64 zu verwenden, müssen Sie <code translate="no">datatype</code> auf <code translate="no">DataType.INT64</code> und <code translate="no">is_primary</code> auf <code translate="no">true</code> setzen. Wenn Milvus auch die Primärschlüssel für die eingehenden Entitäten zuweisen soll, setzen Sie <code translate="no">auto_id</code> auf <code translate="no">true</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
    <span class="hljs-comment"># highlight-start</span>
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        <span class="hljs-comment">// highlight-start</span>
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        <span class="hljs-comment">// highlight-end</span>
        .build());
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;ID field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-VarChar-Primary-Keys" class="common-anchor-header">Verwendung von VarChar-Primärschlüsseln<button data-href="#Use-VarChar-Primary-Keys" class="anchor-icon" translate="no">
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
    </button></h2><p>Um VarChar-Primärschlüssel zu verwenden, müssen Sie nicht nur den Wert des Parameters <code translate="no">data_type</code> auf <code translate="no">DataType.VARCHAR</code> ändern, sondern auch den Parameter <code translate="no">max_length</code> für das Feld festlegen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.VARCHAR,
    <span class="hljs-comment"># highlight-start</span>
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>,
    max_length=<span class="hljs-number">512</span>,
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.VarChar)
        <span class="hljs-comment">// highlight-start</span>
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">512</span>)
        <span class="hljs-comment">// highlight-end</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-comment">// highlight-start</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">512</span>
    <span class="hljs-comment">// highlight-end</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    <span class="hljs-comment">// highlight-start</span>
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">512</span>),
    <span class="hljs-comment">// highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>
    ],
    \&quot;params\&quot;: {
        \&quot;max_length\&quot;: 512
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
