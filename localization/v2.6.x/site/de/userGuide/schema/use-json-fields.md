---
id: use-json-fields.md
title: JSON-Feld
summary: >-
  Mit Milvus können Sie strukturierte Daten in einem einzigen Feld speichern und
  indizieren, indem Sie den JSON-Datentyp verwenden. Dies ermöglicht flexible
  Schemata mit verschachtelten Attributen und gleichzeitig eine effiziente
  Filterung über JSON-Pfadindizierung.
---
<h1 id="JSON-Field" class="common-anchor-header">JSON-Feld<button data-href="#JSON-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ermöglicht Ihnen die Speicherung und Indizierung strukturierter Daten in einem einzigen Feld unter Verwendung des Datentyps <code translate="no">JSON</code>. Dies ermöglicht flexible Schemata mit verschachtelten Attributen und gleichzeitig eine effiziente Filterung über die JSON-Pfadindizierung.</p>
<h2 id="What-is-a-JSON-field" class="common-anchor-header">Was ist ein JSON-Feld?<button data-href="#What-is-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein JSON-Feld ist ein schema-definiertes Feld in Milvus, das strukturierte Schlüssel-Wert-Daten speichert. Die Werte können Strings, Zahlen, Boolesche Werte, Arrays oder tief verschachtelte Objekte enthalten.</p>
<p>Hier ist ein Beispiel dafür, wie ein JSON-Feld in einem Dokument aussehen könnte:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel:</p>
<ul>
<li><p><code translate="no">metadata</code> ist das im Schema definierte JSON-Feld.</p></li>
<li><p>Sie können flache Werte (z. B. <code translate="no">category</code>, <code translate="no">in_stock</code>), Arrays (<code translate="no">tags</code>) und verschachtelte Objekte (<code translate="no">supplier</code>) speichern.</p></li>
</ul>
<h2 id="Define-a-JSON-field-in-the-schema" class="common-anchor-header">Definieren Sie ein JSON-Feld im Schema<button data-href="#Define-a-JSON-field-in-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Um ein JSON-Feld zu verwenden, definieren Sie es explizit im Schema der Sammlung, indem Sie <code translate="no">DataType</code> als <code translate="no">JSON</code> angeben.</p>
<p>Im folgenden Beispiel wird eine Sammlung erstellt, deren Schema diese Felder enthält:</p>
<ul>
<li><p>Den Primärschlüssel (<code translate="no">product_id</code>)</p></li>
<li><p>Ein Feld <code translate="no">vector</code> (obligatorisch für jede Sammlung)</p></li>
<li><p>Ein <code translate="no">metadata</code> Feld vom Typ <code translate="no">JSON</code>, das strukturierte Daten wie flache Werte, Arrays oder verschachtelte Objekte speichern kann</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a JSON field</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>)

schema.add_field(field_name=<span class="hljs-string">&quot;product_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<span class="highlighted-wrapper-line">schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)  <span class="hljs-comment"># JSON field that allows null values</span></span>

client.create_collection(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    schema=schema
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();
        
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
        
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;product_id&quot;</span>).pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON).
    WithNullable(<span class="hljs-literal">true</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sie können auch die Funktion "Dynamisches Feld" aktivieren, um nicht deklarierte Felder flexibel zu speichern, aber das ist für die Funktion von JSON-Feldern nicht erforderlich. Weitere Informationen finden Sie unter <a href="/docs/de/enable-dynamic-field.md">Dynamisches Feld</a>.</p>
</div>
<h2 id="Insert-entities-with-JSON-data" class="common-anchor-header">Einfügen von Entitäten mit JSON-Daten<button data-href="#Insert-entities-with-JSON-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald die Sammlung erstellt ist, fügen Sie Entitäten, die strukturierte JSON-Objekte enthalten, in das <code translate="no">metadata</code> JSON-Feld ein.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
metadata.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;electronics&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;BrandA&quot;</span>);
metadata.addProperty(<span class="hljs-string">&quot;in_stock&quot;</span>, <span class="hljs-literal">true</span>);
metadata.addProperty(<span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-number">99.99</span>);
metadata.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);
metadata.add(<span class="hljs-string">&quot;tags&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>)));

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">supplier</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
supplier.addProperty(<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;SupplierX&quot;</span>);
supplier.addProperty(<span class="hljs-string">&quot;country&quot;</span>, <span class="hljs-string">&quot;USA&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">contact</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
contact.addProperty(<span class="hljs-string">&quot;email&quot;</span>, <span class="hljs-string">&quot;support@supplierx.com&quot;</span>);
contact.addProperty(<span class="hljs-string">&quot;phone&quot;</span>, <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>);

supplier.add(<span class="hljs-string">&quot;contact&quot;</span>, contact);
metadata.add(<span class="hljs-string">&quot;supplier&quot;</span>, supplier);
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;product_catalog&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;product_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            &quot;category&quot;: &quot;electronics&quot;,
            &quot;brand&quot;: &quot;BrandA&quot;,
            &quot;in_stock&quot;: True,
            &quot;price&quot;: 99.99,
            &quot;string_price&quot;: &quot;99.99&quot;,
            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
            &quot;supplier&quot;: {
                &quot;name&quot;: &quot;SupplierX&quot;,
                &quot;country&quot;: &quot;USA&quot;,
                &quot;contact&quot;: {
                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                }
            }
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-values-inside-the-JSON-field--Milvus-2511+" class="common-anchor-header">Indexwerte innerhalb des JSON-Feldes<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-values-inside-the-JSON-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Um die skalare Filterung von JSON-Feldern zu beschleunigen, unterstützt Milvus die Indizierung von JSON-Feldern mittels <strong>JSON-Pfadindizierung</strong>. Dies ermöglicht es Ihnen, nach Schlüsseln oder verschachtelten Werten innerhalb eines JSON-Objekts zu filtern, ohne das gesamte Feld zu scannen.</p>
<div class="alert note">
<p>Die Indizierung von JSON-Feldern ist <strong>optional</strong>. Sie können immer noch nach JSON-Pfaden ohne Index abfragen oder filtern, aber es kann zu einer langsameren Leistung aufgrund der Brute-Force-Suche führen.</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">Syntax der JSON-Pfadindizierung</h3><p>Um einen JSON-Pfad-Index zu erstellen, geben Sie an:</p>
<ul>
<li><p><strong>JSON-Pfad</strong> (<code translate="no">json_path</code>): Der Pfad zu dem Schlüssel oder dem verschachtelten Feld in Ihrem JSON-Objekt, das Sie indizieren möchten.</p>
<ul>
<li><p>Beispiel: <code translate="no">metadata[&quot;category&quot;]</code></p>
<p>Damit wird festgelegt, wo die Indizierungsmaschine innerhalb der JSON-Struktur suchen soll.</p></li>
</ul></li>
<li><p><strong>JSON-Cast-Typ</strong> (<code translate="no">json_cast_type</code>): Der Datentyp, den Milvus beim Interpretieren und Indizieren des Wertes am angegebenen Pfad verwenden soll.</p>
<ul>
<li><p>Dieser Typ muss mit dem tatsächlichen Datentyp des zu indizierenden Feldes übereinstimmen. Wenn Sie den Datentyp während der Indizierung in einen anderen konvertieren wollen, sollten Sie <a href="/docs/de/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">eine Cast-Funktion verwenden</a>.</p></li>
<li><p>Eine vollständige Liste finden Sie <a href="/docs/de/use-json-fields.md#Supported-JSON-cast-types">unten</a>.</p></li>
</ul></li>
</ul>
<h4 id="Supported-JSON-cast-types" class="common-anchor-header">Unterstützte JSON-Cast-Typen</h4><p>Bei Cast-Typen wird die Groß- und Kleinschreibung nicht berücksichtigt. Die folgenden Typen werden unterstützt:</p>
<table>
   <tr>
     <th><p>Cast-Typ</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Beispiel JSON-Wert</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">bool</code></p></td>
     <td><p>Boolescher Wert</p></td>
     <td><p><code translate="no">true</code>, <code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">double</code></p></td>
     <td><p>Numerischer Wert (Integer oder Float)</p></td>
     <td><p><code translate="no">42</code>, <code translate="no">99.99</code>, <code translate="no">-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">varchar</code></p></td>
     <td><p>String-Wert</p></td>
     <td><p><code translate="no">"electronics"</code>, <code translate="no">"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_bool</code></p></td>
     <td><p>Array von Booleschen Werten</p></td>
     <td><p><code translate="no">[true, false, true]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_double</code></p></td>
     <td><p>Array von Zahlen</p></td>
     <td><p><code translate="no">[1.2, 3.14, 42]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">array_varchar</code></p></td>
     <td><p>Array mit Zeichenketten</p></td>
     <td><p><code translate="no">["tag1", "tag2", "tag3"]</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Arrays sollten für eine optimale Indizierung Elemente desselben Typs enthalten. Weitere Informationen finden Sie unter <a href="/docs/de/array_data_type.md">Array-Feld</a>.</p>
</div>
<h4 id="Example-Create-JSON-path-indexes" class="common-anchor-header">Beispiel: JSON-Pfadindizes erstellen</h4><p>Unter Verwendung der <code translate="no">metadata</code> JSON-Struktur aus unserer Einführung, sind hier Beispiele, wie man Indizes auf verschiedenen JSON-Pfaden erstellen kann:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the category field as a string</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index the tags array as string array</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;tags_array_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;array_varchar&quot;</span> <span class="hljs-comment"># Data cast type</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;tags\&quot;]&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;array_varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;array_varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;tags&quot;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;tags_array_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">Verwenden Sie JSON-Cast-Funktionen für die Typkonvertierung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h3><p>Wenn Ihr JSON-Feldschlüssel Werte in einem falschen Format enthält (z. B. Zahlen, die als Strings gespeichert sind), können Sie Cast-Funktionen verwenden, um Werte während der Indizierung zu konvertieren.</p>
<h4 id="Supported-cast-functions" class="common-anchor-header">Unterstützte Cast-Funktionen</h4><p>Bei Cast-Funktionen wird die Groß-/Kleinschreibung nicht berücksichtigt. Die folgenden Typen werden unterstützt:</p>
<table>
   <tr>
     <th><p>Cast-Funktion</p></th>
     <th><p>Konvertiert von → nach</p></th>
     <th><p>Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">"STRING_TO_DOUBLE"</code></p></td>
     <td><p>String → Numerisch (double)</p></td>
     <td><p>Konvertiert <code translate="no">"99.99"</code> in <code translate="no">99.99</code></p></td>
   </tr>
</table>
<h4 id="Example-Cast-string-numbers-to-double" class="common-anchor-header">Beispiel: String-Zahlen in double umwandeln</h4><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert string numbers to double for indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTEDfor JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>, <span class="hljs-comment"># Path to the JSON key to be indexed</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Data cast type</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Cast function; case insensitive</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>)
                    .WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)

indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Der Parameter <code translate="no">json_cast_type</code> ist obligatorisch und muss mit dem Ausgabetyp der Cast-Funktion übereinstimmen.</p></li>
<li><p>Wenn die Konvertierung fehlschlägt (z.B. nicht-numerischer String), wird der Wert übersprungen und nicht indiziert.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">Indizes auf die Sammlung anwenden</h3><p>Nachdem Sie die Indexparameter definiert haben, können Sie sie mit <code translate="no">create_index()</code> auf die Sammlung anwenden:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexTask1, err := client.CreateIndex(ctx, indexOpt1)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-JSON-field-values" class="common-anchor-header">Filtern nach JSON-Feldwerten<button data-href="#Filter-by-JSON-field-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach dem Einfügen und Indizieren von JSON-Feldern können Sie mit Standard-Filterausdrücken mit JSON-Pfadsyntax nach ihnen filtern.</p>
<p>Zum Beispiel:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>
filter := <span class="hljs-string">&#x27;metadata[&quot;price&quot;] &gt; 50&#x27;</span>
filter := <span class="hljs-string">&#x27;json_contains(metadata[&quot;tags&quot;], &quot;featured&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um diese Ausdrücke in einer Suche oder Abfrage zu verwenden, stellen Sie sicher, dass:</p>
<ul>
<li><p>Sie haben einen Index für jedes Vektorfeld erstellt.</p></li>
<li><p>Die Sammlung ist in den Speicher geladen.</p></li>
</ul>
<p>Eine vollständige Liste der unterstützten Operatoren und Ausdrücke finden Sie unter <a href="/docs/de/json-operators.md">JSON-Operatoren</a>.</p>
<h2 id="Pull-it-all-together" class="common-anchor-header">Alles zusammenfassen<button data-href="#Pull-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>Inzwischen haben Sie gelernt, wie man strukturierte Werte innerhalb eines JSON-Feldes definiert, einfügt und optional indiziert.</p>
<p>Um den Arbeitsablauf in einer realen Anwendung zu vervollständigen, müssen Sie auch Folgendes tun</p>
<ul>
<li><p><strong>Erstellen Sie einen Index für Ihre Vektorfelder</strong> (obligatorisch für jedes Vektorfeld in einer Sammlung)</p>
<p>Siehe <a href="/docs/de/create-collection.md#Optional-Set-Index-Parameters">Indexparameter festlegen</a></p></li>
<li><p><strong>Laden Sie die Sammlung</strong></p>
<p>Siehe <a href="/docs/de/load-and-release.md">Laden &amp; Freigeben</a></p></li>
<li><p><strong>Suchen oder Abfragen mit JSON-Pfadfiltern</strong></p>
<p>Siehe <a href="/docs/de/filtered-search.md">Gefilterte Suche</a> und <a href="/docs/de/json-operators.md">JSON-Operatoren</a></p></li>
</ul>
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
    </button></h2><h3 id="What-are-the-differences-between-a-JSON-field-and-the-dynamic-field" class="common-anchor-header">Was sind die Unterschiede zwischen einem JSON-Feld und einem dynamischen Feld?</h3><ul>
<li><p>Das<strong>JSON-Feld</strong> ist schema-definiert. Sie müssen das Feld explizit im Schema deklarieren.</p></li>
<li><p>Das<strong>dynamische Feld</strong> ist ein verstecktes JSON-Objekt (<code translate="no">$meta</code>), das automatisch jedes Feld speichert, das nicht im Schema definiert ist.</p></li>
</ul>
<p>Beide unterstützen verschachtelte Strukturen und JSON-Pfadindizierung, aber dynamische Felder sind besser für optionale oder sich entwickelnde Datenstrukturen geeignet.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/enable-dynamic-field.md">Dynamisches Feld</a>.</p>
<h3 id="Are-there-any-limitations-on-the-size-of-a-JSON-field" class="common-anchor-header">Gibt es irgendwelche Beschränkungen für die Größe eines JSON-Feldes?</h3><p>Ja. Jedes JSON-Feld ist auf 65.536 Byte begrenzt.</p>
<h3 id="Does-a-JSON-field-support-setting-a-default-value" class="common-anchor-header">Unterstützt ein JSON-Feld die Festlegung eines Standardwerts?</h3><p>Nein, JSON-Felder unterstützen keine Standardwerte. Sie können jedoch <code translate="no">nullable=True</code> festlegen, wenn Sie das Feld definieren, um leere Einträge zuzulassen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/nullable-and-default.md">Nullable &amp; Default</a>.</p>
<h3 id="Are-there-any-naming-conventions-for-JSON-field-keys" class="common-anchor-header">Gibt es Namenskonventionen für JSON-Feldschlüssel?</h3><p>Ja, um die Kompatibilität mit Abfragen und Indizierungen zu gewährleisten:</p>
<ul>
<li><p>Verwenden Sie in JSON-Schlüsseln nur Buchstaben, Zahlen und Unterstriche.</p></li>
<li><p>Vermeiden Sie die Verwendung von Sonderzeichen, Leerzeichen oder Punkten (<code translate="no">.</code>, <code translate="no">/</code>, etc.).</p></li>
<li><p>Inkompatible Schlüssel können zu Parsing-Problemen in Filterausdrücken führen.</p></li>
</ul>
<h3 id="How-does-Milvus-handle-string-values-in-JSON-fields" class="common-anchor-header">Wie behandelt Milvus Zeichenkettenwerte in JSON-Feldern?</h3><p>Milvus speichert String-Werte genau so, wie sie in der JSON-Eingabe erscheinen - ohne semantische Umwandlung. Nicht korrekt zitierte Zeichenketten können beim Parsen zu Fehlern führen.</p>
<p><strong>Beispiele für gültige Zeichenketten</strong>:</p>
<pre><code translate="no" class="language-plaintext">&quot;a\&quot;b&quot;, &quot;a&#x27;b&quot;, &quot;a\\b&quot;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Beispiele für ungültige Zeich</strong>enketten:</p>
<pre><code translate="no" class="language-plaintext">&#x27;a&quot;b&#x27;, &#x27;a\&#x27;b&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="What-filtering-logic-does-Milvus-use-for-indexed-JSON-paths" class="common-anchor-header">Welche Filterlogik verwendet Milvus für indizierte JSON-Pfade?</h3><ul>
<li><p><strong>Numerische Indizierung</strong>:</p>
<p>Wenn ein Index mit <code translate="no">json_cast_type=&quot;double&quot;</code> erstellt wird, werden nur numerische Filterbedingungen (z. B. <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">== 42</code>) den Index nutzen. Nicht-numerische Bedingungen erzwingen einen Brute-Force-Scan.</p></li>
<li><p><strong>String-Indizierung</strong>:</p>
<p>Wenn ein Index <code translate="no">json_cast_type=&quot;varchar&quot;</code> verwendet, profitieren nur String-Filterbedingungen von dem Index; bei anderen Typen wird auf eine Brute-Force-Suche zurückgegriffen.</p></li>
<li><p><strong>Boolesche Indizierung</strong>:</p>
<p>Die boolesche Indizierung verhält sich ähnlich wie die Zeichenkettenindizierung, wobei der Index nur dann verwendet wird, wenn die Bedingung strikt wahr oder falsch ist.</p></li>
</ul>
<h3 id="How-do-term-expressions-work-with-JSON-field-indexing" class="common-anchor-header">Wie funktionieren Termausdrücke bei der Indizierung von JSON-Feldern?</h3><p>Sie können Begriffsausdrücke wie <code translate="no">json[&quot;field&quot;] IN [value1, value2, …]</code> verwenden, um Entitäten zu filtern.</p>
<ul>
<li><p>Der Index gilt nur, wenn der Zielwert ein Skalar ist.</p></li>
<li><p>Wenn <code translate="no">json[&quot;field&quot;]</code> ein Array ist, wird die Abfrage den Index nicht verwenden und auf eine Brute-Force-Suche zurückgreifen.</p></li>
</ul>
<h3 id="What-about-numeric-precision-when-indexing-JSON-fields" class="common-anchor-header">Was ist mit der numerischen Präzision bei der Indizierung von JSON-Feldern?</h3><p>Milvus speichert alle indizierten numerischen Werte als Doubles.</p>
<p>Wenn ein numerischer Wert <strong>2^53</strong> überschreitet, kann er an Präzision verlieren. Dieser Präzisionsverlust kann dazu führen, dass Filterabfragen nicht genau mit Werten übereinstimmen, die außerhalb des Bereichs liegen.</p>
<h3 id="How-does-Milvus-handle-data-integrity-for-JSON-field-indexing" class="common-anchor-header">Wie behandelt Milvus die Datenintegrität bei der Indizierung von JSON-Feldern?</h3><p>Milvus konvertiert oder normalisiert inkonsistente Datentypen nicht automatisch.</p>
<p>Wenn zum Beispiel einige Zeilen <code translate="no">&quot;price&quot;: &quot;99.99&quot;</code> als String und andere <code translate="no">&quot;price&quot;: 99.99</code> als Zahl speichern, während der Index als Double definiert ist, werden nur die Zeilen mit numerischen Werten indiziert.</p>
<p>Inkonsistenzen führen dazu, dass die betroffenen Zeilen während der Indizierung übersprungen werden.</p>
<h3 id="What-happens-if-type-casting-fails-when-indexing-a-JSON-field" class="common-anchor-header">Was passiert, wenn das Typ-Casting bei der Indizierung eines JSON-Feldes fehlschlägt?</h3><p>Wenn ein Wert nicht in den angegebenen <code translate="no">json_cast_type</code> umgewandelt werden kann (z. B. eine nicht numerische Zeichenkette, wenn eine <code translate="no">double</code> erwartet wird), wird dieser Wert stillschweigend übersprungen und <strong>nicht in den Index aufgenommen</strong>. Infolgedessen werden Entitäten mit Casting-Fehlern <strong>von Filterergebnissen ausgeschlossen</strong>, die auf dem Index basieren.</p>
<p>Um unerwartetes Abfrageverhalten zu vermeiden, stellen Sie sicher, dass alle Werte unter dem indizierten JSON-Pfad konsistent typisiert sind.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-path-with-different-cast-types" class="common-anchor-header">Kann ich mehrere Indizes für denselben JSON-Pfad mit unterschiedlichen Cast-Typen erstellen?</h3><p>Nein, jeder JSON-Pfad unterstützt <strong>nur einen Index</strong>. Sie müssen einen einzigen <code translate="no">json_cast_type</code> wählen, der Ihren Daten entspricht. Das Erstellen mehrerer Indizes für denselben Pfad mit unterschiedlichen Cast-Typen wird nicht unterstützt.</p>
<h3 id="What-if-values-at-a-JSON-path-have-inconsistent-types" class="common-anchor-header">Was passiert, wenn Werte in einem JSON-Pfad inkonsistente Typen haben?</h3><p>Inkonsistente Typen zwischen Entitäten können zu einer <strong>teilweisen Indizierung</strong> führen. Wenn beispielsweise <code translate="no">metadata[&quot;price&quot;]</code> sowohl als Zahl (<code translate="no">99.99</code>) als auch als Zeichenkette (<code translate="no">&quot;99.99&quot;</code>) gespeichert ist und der Index mit <code translate="no">json_cast_type=&quot;double&quot;</code> definiert wird, werden nur die numerischen Werte indiziert. Die Einträge in String-Form werden übersprungen und erscheinen nicht in den Filterergebnissen.</p>
<h3 id="Can-I-use-filters-with-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Kann ich Filter mit einem anderen Typ als dem indizierten Cast-Typ verwenden?</h3><p>Wenn Ihr Filterausdruck einen anderen Typ als den des Index <code translate="no">json_cast_type</code> verwendet, <strong>verwendet</strong> das System <strong>den Index nicht</strong> und kann auf einen langsameren Brute-Force-Scan zurückgreifen, sofern die Daten dies zulassen. Um die beste Leistung zu erzielen, sollten Sie Ihren Filterausdruck immer an den Cast-Typ des Indexes anpassen.</p>
