---
id: nullable-and-default.md
title: Nullfähige Felder
summary: >-
  Konfigurieren Sie nullfähige Felder und Standardwerte, einschließlich Schema,
  Einfüge-, Index-, Such- und Filterverhalten.
---
<h1 id="Nullable-Fields" class="common-anchor-header">Nullfähige Felder<button data-href="#Nullable-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt nullfähige Felder, bei denen ein Feldwert fehlen oder explizit auf NULL gesetzt werden kann. Die Nullfähigkeit wird auf Schemaebene definiert und gilt einheitlich für alle Vorgänge der Datenerfassung, Indizierung, Suche und Abfrage.</p>
<p>Verwenden Sie nullfähige Felder, wenn:</p>
<ul>
<li>Daten aus externen Systemen eingelesen werden, die fehlende Werte zulassen.</li>
<li>Bestimmte Metadaten optional sind oder nur für einen Teil des Datensatzes verfügbar sind.</li>
<li>Vektor-Einbettungen asynchron generiert und später eingefügt werden.</li>
</ul>
<h2 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Vektorfelder, die NULL-Werte zulassen, unterstützen keine Filterausdrücke vom Typ „ <code translate="no">IS NULL</code> “ oder „ <code translate="no">IS NOT NULL</code> “. Sie können Entitäten nicht explizit danach filtern, ob der Wert eines Vektorfelds NULL ist.</p></li>
<li><p>Ab Milvus 3.0.0 kann das übergeordnete <a href="/docs/de/array-of-structs.md">StructArray-Feld</a> nullfähig sein. Legen Sie „ <code translate="no">nullable=True</code> “ für das übergeordnete StructArray-Feld fest, nicht für einzelne Unterfelder. „NULL“ gilt für das gesamte StructArray-Feld, nicht für ein einzelnes Struct-Element, und Milvus überträgt die Nullfähigkeit des übergeordneten Feldes intern auf dessen Unterfelder. Ein StructArray-Feld, das einer bestehenden Sammlung hinzugefügt wird, muss nullfähig sein, damit bestehende Entitäten für das neue Feld NULL zurückgeben können. Weitere Informationen finden Sie unter <a href="/docs/de/structarray-limits.md#Nullable-and-dynamic-schema-limits">„StructArray-Beschränkungen</a>“.</p></li>
<li><p>Das Attribut „nullfähig“ wird beim Anlegen eines Feldes festgelegt und kann anschließend nicht mehr geändert werden. Sie können die Nullfähigkeit für ein bestehendes Feld nicht aktivieren oder deaktivieren.</p></li>
<li><p>Als nullfähig markierte Felder können nicht als Partitionsschlüssel verwendet werden. Partitionsschlüsselfelder müssen immer gültige, nicht-nullwerte Werte enthalten. Weitere Informationen finden Sie unter <a href="/docs/de/use-partition-key.md">„Partitionsschlüssel verwenden</a>“.</p></li>
</ul>
<h2 id="What-is-a-nullable-field" class="common-anchor-header">Was ist ein nullfähiges Feld?<button data-href="#What-is-a-nullable-field" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus wird durch ein Feldattribut auf Schemaebene namens „ <code translate="no">nullable</code> “ gesteuert, ob ein Feld einen NULL-Wert speichern darf.</p>
<p>Wenn ein Feld mit „ <code translate="no">nullable=True</code> “ definiert ist, lässt Milvus zu, dass der Feldwert bei der Dateneingabe fehlt. In der Praxis behandelt Milvus die folgenden beiden Eingaben als gleichwertig und speichert den Feldwert als NULL:</p>
<ul>
<li>Das Feld wird in der Eingabeentität weggelassen.</li>
<li>Das Feld wird explizit auf NULL gesetzt (z. B. ` <code translate="no">None</code> ` in Python).</li>
</ul>
<p>Wenn ein Feld nicht als nullfähig definiert ist (Standardverhalten), muss jede Entität einen gültigen Wert für dieses Feld bereitstellen. Das Weglassen des Feldes oder die explizite Zuweisung eines NULL-Werts führt dazu, dass der Einfüge- oder Importvorgang fehlschlägt.</p>
<p>Das Attribut „nullable“ wird sowohl für <strong>Skalar- als auch für Vektorfelder</strong> in einem Sammlungsschema unterstützt. Ab Milvus 3.0.0 wird es auch für das übergeordnete StructArray-Feld unterstützt. Konfigurieren Sie Struct-Unterfelder nicht separat als nullable; definieren Sie die Nullbarkeit auf dem übergeordneten StructArray, und Milvus überträgt diese Einstellung intern auf dessen Unterfelder.</p>
<div class="alert note">
<p>Die Nullbarkeit legt fest, ob ein Feldwert fehlen darf; sie definiert jedoch nicht, welcher Wert verwendet wird, wenn ein Feld fehlt.</p>
<ul>
<li>Wenn ein nullfähiges Feld ohne Standardwert konfiguriert ist, führt das Weglassen des Feldes dazu, dass ein NULL-Wert gespeichert wird.</li>
<li>Wenn ein Standardwert konfiguriert ist, speichert Milvus möglicherweise stattdessen den Standardwert. Weitere Informationen finden Sie unter <a href="/docs/de/default-values.md">„Standardwerte</a>“.</li>
</ul>
</div>
<h2 id="Define-a-nullable-field-in-the-collection-schema" class="common-anchor-header">Definieren Sie ein nullfähiges Feld im Sammlungsschema<button data-href="#Define-a-nullable-field-in-the-collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Um nullfähige Felder zu verwenden, müssen Sie bei der Definition des Sammlungsschemas das Attribut „nullfähig“ aktivieren.</p>
<p>In diesem Beispiel definiert das Sammlungsschema ein Vektorfeld namens „ <code translate="no">embedding</code> “ mit der Eigenschaft „ <code translate="no">nullable=True</code> “. Dadurch können Entitäten in der Sammlung den Vektorwert weglassen oder ihn bei der Datenerfassung explizit auf NULL setzen.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Define schema fields</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># Primary field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
<span class="highlighted-wrapper-line">    nullable=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable the nullable attribute; defaults to False</span></span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
<span class="highlighted-wrapper-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
      <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
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
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">4</span>).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> embeddingField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;embedding&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;typeParams&quot;: {&quot;dim&quot;: &quot;4&quot;},
  &quot;nullable&quot;: true
}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: {
      \&quot;fields\&quot;: [
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$embeddingField</span>
      ]
    }
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Schema:</p>
<ul>
<li>Das Feld „ <code translate="no">embedding</code> “ ist explizit als nullfähig gekennzeichnet.</li>
<li>Entitäten können das Feld „ <code translate="no">embedding</code> “ weglassen oder ihm beim Einfügen einen NULL-Wert zuweisen.</li>
<li>Die Entscheidung, NULL-Werte zuzulassen, wird bei der Erstellung der Sammlung festgelegt.</li>
</ul>
<p>Der Übersichtlichkeit halber konzentrieren sich die folgenden Beispiele auf ein nullfähiges Vektorfeld (<code translate="no">embedding</code>). Die Definition nullfähiger Skalarfelder ist optional und für die weitere Verwendung dieses Leitfadens nicht erforderlich.</p>
<p><details>
<summary>Optional: Definieren eines nullfähigen Skalarfelds</summary></p>
<p>Skalarfelder können ebenfalls mithilfe desselben Attributs „ <code translate="no">nullable</code> “ als nullfähig definiert werden und unterliegen bei der Erfassung denselben Regeln. Beispiel:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;age&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-wrapper-line">    nullable=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)
        .dataType(DataType.Int64)
<span class="highlighted-wrapper-line">        .isNullable(<span class="hljs-literal">true</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add to the fields array when calling createCollection:</span>
<span class="hljs-comment">// { name: &quot;age&quot;, data_type: DataType.Int64, nullable: true },</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;age&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithNullable(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Add another field object to the schema &quot;fields&quot; array, for example:</span>
<span class="hljs-comment"># { &quot;fieldName&quot;: &quot;age&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;nullable&quot;: true }</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Insert-behavior-with-missing-or-NULL-values" class="common-anchor-header">Einfügeverhalten bei fehlenden oder NULL-Werten<button data-href="#Insert-behavior-with-missing-or-NULL-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald ein Feld im Sammlungsschema als nullfähig definiert ist, erlaubt Milvus, dass der Feldwert bei der Dateneingabe fehlt oder explizit auf NULL gesetzt wird.</p>
<p>Das folgende Beispiel fügt drei Entitäten in die unter <a href="#define-a-nullable-field-in-the-collection-schema">„Ein nullfähiges Feld im Sammlungsschema definieren</a>“ erstellte Sammlung ein und veranschaulicht diese verschiedenen Fälle.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Explicitly set to NULL</span>
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,  <span class="hljs-comment"># Field omitted → stored as NULL</span>
    },
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, JsonNull.INSTANCE); <span class="hljs-comment">// Explicitly set to NULL</span>

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// Field omitted; stored as NULL</span>

List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(data)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>] },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: <span class="hljs-literal">null</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

rows := []any{
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">1</span>), <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}},
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">2</span>), <span class="hljs-string">&quot;embedding&quot;</span>: <span class="hljs-literal">nil</span>},
    <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-type">int64</span>(<span class="hljs-number">3</span>)},
}

_, err := client.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>, rows...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {&quot;id&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4]},
      {&quot;id&quot;: 2, &quot;embedding&quot;: null},
      {&quot;id&quot;: 3}
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel:</p>
<ul>
<li>Entity <strong>id = 1</strong> liefert einen gültigen Vektorwert.</li>
<li>Entität <strong>mit ID = 2</strong> weist dem Feld „ <code translate="no">embedding</code> “ explizit den Wert NULL zu.</li>
<li>Entität <strong>mit ID = 3</strong> lässt das Feld „ <code translate="no">embedding</code> “ vollständig weg; Milvus speichert es als NULL.</li>
</ul>
<h2 id="Index-behavior-on-nullable-fields" class="common-anchor-header">Verhalten des Indexes bei Feldern, die NULL-Werte zulassen<button data-href="#Index-behavior-on-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach dem Einfügen von Daten können Sie wie gewohnt einen Index auf einem Feld erstellen, das NULL-Werte zulässt. Der wesentliche Unterschied besteht darin, wie Milvus NULL-Werte während der Indexerstellung behandelt:</p>
<ul>
<li>Nur Entitäten mit Nicht-NULL-Werten werden in den Index aufgenommen.</li>
<li>Entitäten mit NULL-Werten werden übersprungen und sind nicht am Indexaufbau beteiligt.</li>
</ul>
<p>Bei einem nullfähigen Vektorfeld bedeutet dies, dass nur Entitäten mit gültigen Vektoren anhand der Vektorähnlichkeit durchsuchbar sind.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index parameters</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params,
)

<span class="hljs-comment"># Load collection for future search operations</span>
client.load_collection(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexName(<span class="hljs-string">&quot;embedding_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;embedding_idx&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>,
    index.NewAutoIndex(entity.COSINE))

_, err := client.CreateIndex(ctx, indexOption)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;embedding&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
      }
    ]
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Zu diesem Zeitpunkt:</p>
<ul>
<li>Entitäten mit gültigen Einbettungswerten sind indiziert und für die Suche bereit.</li>
<li>Entitäten, deren Einbettung NULL ist, verbleiben in der Sammlung, werden jedoch nicht in den Vektorindex aufgenommen.</li>
</ul>
<h2 id="Search-behavior-with-nullable-fields" class="common-anchor-header">Suchverhalten bei Feldern, die NULL-Werte zulassen<button data-href="#Search-behavior-with-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie Suchvorgänge für ein nullfähiges Feld durchführen, wertet Milvus nur Entitäten aus, deren Wert für das in der Suche verwendete Feld nicht NULL ist. Entitäten, deren Vektorfeld NULL ist, werden automatisch übersprungen.</p>
<p>Bei einem nullfähigen Vektorfeld wie beispielsweise „ <code translate="no">embedding</code> “ in diesem Beispiel gilt:</p>
<ul>
<li>werden nur Entitäten mit gültigen Vektorwerten ausgewertet und in die Rangliste aufgenommen.</li>
<li>Entitäten mit NULL-Vektoren verursachen keine Fehler.</li>
<li>Wenn die Anzahl der gültigen Vektoren kleiner ist als die angeforderte Anzahl von „ <code translate="no">topK</code> “ (<code translate="no">limit</code>), gibt Milvus möglicherweise weniger Ergebnisse zurück als unter <code translate="no">limit</code>.</li>
</ul>
<p>Das folgende Beispiel führt eine Vektorsuche auf dem nullfähigen Vektorfeld „ <code translate="no">embedding</code> “ durch:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
    output_fields=[<span class="hljs-string">&quot;embedding&quot;</span>],
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>))))
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;embedding&quot;</span>))
        .build());

System.out.println(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span> },
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;embedding&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

<span class="hljs-comment">// Assumes `client` is the Milvus client from the Go schema example above.</span>
ctx := context.Background()

query := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">3</span>,
    []entity.Vector{entity.FloatVector(query)},
).WithANNSField(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;embedding&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
}
fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;annsField&quot;: &quot;embedding&quot;,
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {&quot;metricType&quot;: &quot;COSINE&quot;},
    &quot;outputFields&quot;: [&quot;embedding&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Bei dieser Suche:</p>
<ul>
<li>werden nur Entitäten mit Nicht-Null-Werten für „ <code translate="no">embedding</code> “ als Kandidaten berücksichtigt.</li>
<li>Entitäten mit NULL-Werten für ` <code translate="no">embedding</code> ` werden von der Auswertung ausgeschlossen.</li>
<li>Die Anzahl der zurückgegebenen Ergebnisse hängt davon ab, wie viele gültige Vektoren in der Sammlung vorhanden sind.</li>
</ul>
<h2 id="Query-and-filtering-implications" class="common-anchor-header">Auswirkungen auf Abfragen und Filterung<button data-href="#Query-and-filtering-implications" class="anchor-icon" translate="no">
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
    </button></h2><p>Die vorherigen Beispiele konzentrieren sich auf Vektorfelder. In diesem Abschnitt wird beschrieben, wie sich NULL-Werte in <strong>skalaren Filterausdrücken</strong> verhalten.</p>
<p>Skalarfelder können mit ` <code translate="no">nullable=True</code> ` definiert werden und unterliegen denselben Erfassungsregeln wie Vektorfelder. <strong>Skalare NULL-Werte werden in Filterausdrücken</strong> jedoch <strong>immer als „false“ ausgewertet</strong>.</p>
<p>Beispiel: Bei einem nullfähigen Skalarfeld „ <code translate="no">age</code> “ wählt der folgende Filter Entitäten aus, deren Alter größer als 18 ist:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use in query/search filter parameter, for example:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Entitäten, bei denen ` <code translate="no">age</code> ` den Wert `NULL` hat, werden aus den Ergebnissen ausgeschlossen, da ein `NULL`-Wert die Filterbedingung nicht erfüllt.</p>
<p>Ebenso stimmen Gleichheitsprüfungen nicht mit NULL-Werten überein. Beispiel:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`status == &quot;active&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Entitäten, bei denen „ <code translate="no">status</code> “ NULL ist, werden aus den Ergebnissen ausgeschlossen.</p>
<h2 id="Nullable-fields-and-default-values" class="common-anchor-header">Nullfähige Felder und Standardwerte<button data-href="#Nullable-fields-and-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn für ein Feld sowohl „ <code translate="no">nullable</code> “ als auch „ <code translate="no">default_value</code> “ konfiguriert sind, bestimmen die folgenden Regeln, wie Milvus bei der Einfügung mit NULL-Eingaben oder fehlenden Feldwerten umgeht.</p>
<table>
<thead>
<tr><th>Null-Zulassung aktiviert</th><th>Standardwert</th><th>Benutzereingabe (NULL oder weggelassen)</th><th>Ergebnis</th></tr>
</thead>
<tbody>
<tr><td>Ja</td><td>Ja (nicht NULL)</td><td>NULL oder nicht angegeben</td><td>Verwendet den Standardwert</td></tr>
<tr><td>Ja</td><td>Nein</td><td>NULL oder ausgelassen</td><td>Wird als NULL gespeichert</td></tr>
<tr><td>Nein</td><td>Ja (nicht NULL)</td><td>NULL oder ausgelassen</td><td>Verwendet den Standardwert</td></tr>
<tr><td>Nein</td><td>Nein</td><td>NULL oder weggelassen</td><td>Löst einen Fehler aus</td></tr>
<tr><td>Nein</td><td>Ja (Standardwert: NULL)</td><td>NULL oder ausgelassen</td><td>Löst einen Fehler aus</td></tr>
</tbody>
</table>
<p><strong>Wichtige Erkenntnisse:</strong></p>
<ul>
<li>Wenn ein Feld einen Nicht-NULL-Standardwert hat, wird dieser Wert unabhängig davon verwendet, ob „ <code translate="no">nullable</code> “ aktiviert ist.</li>
<li>Wenn „ <code translate="no">nullable=True</code> “ aktiviert ist, aber kein Standardwert festgelegt wurde, wird im Feld „NULL“ gespeichert.</li>
<li>Wenn „ <code translate="no">nullable=False</code> “ aktiviert ist und kein Standardwert festgelegt wurde, schlägt das Einfügen mit einer Fehlermeldung fehl.</li>
<li>Das Festlegen eines NULL-Standardwerts für ein nicht-NULL-fähiges Feld ist ungültig und führt zu einem Fehler.</li>
</ul>
<p>Ausführliche Beispiele und Informationen zur Verwendung der API für Standardwerte finden Sie unter <a href="/docs/de/default-values.md">„Standardwerte</a>“.</p>
