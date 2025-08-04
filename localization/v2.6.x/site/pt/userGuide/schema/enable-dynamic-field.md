---
id: enable-dynamic-field.md
title: Campo dinâmico
summary: >-
  O Milvus permite-lhe inserir entidades com estruturas flexíveis e evolutivas
  através de uma caraterística especial chamada campo dinâmico. Este campo é
  implementado como um campo JSON oculto chamado $meta, que armazena
  automaticamente quaisquer campos nos seus dados que não estejam explicitamente
  definidos no esquema da coleção.
---
<h1 id="Dynamic-Field" class="common-anchor-header">Campo dinâmico<button data-href="#Dynamic-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus permite-lhe inserir entidades com estruturas flexíveis e evolutivas através de uma funcionalidade especial designada por <strong>campo dinâmico</strong>. Este campo é implementado como um campo JSON oculto chamado <code translate="no">$meta</code>, que armazena automaticamente quaisquer campos nos seus dados que <strong>não</strong> estejam <strong>explicitamente definidos</strong> no esquema da coleção.</p>
<h2 id="How-it-works" class="common-anchor-header">Como funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando o campo dinâmico está ativado, o Milvus adiciona um campo <code translate="no">$meta</code> oculto a cada entidade. Este campo é do tipo JSON, o que significa que pode armazenar qualquer estrutura de dados compatível com JSON e pode ser indexado utilizando a sintaxe de caminho JSON.</p>
<p>Durante a inserção de dados, qualquer campo não declarado no esquema é automaticamente armazenado como um par chave-valor dentro deste campo dinâmico.</p>
<p>Não é necessário gerir o <code translate="no">$meta</code> manualmente - o Milvus trata-o de forma transparente.</p>
<p>Por exemplo, se o esquema da coleção definir apenas <code translate="no">id</code> e <code translate="no">vector</code>, e inserir a seguinte entidade:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span>    <span class="hljs-comment">// Not in schema</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span>  <span class="hljs-comment">// Not in schema</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Com a funcionalidade de campo dinâmico activada, o Milvus armazena-a internamente como:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">  <span class="hljs-attr">&quot;$meta&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Item A&quot;</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;books&quot;</span></span>
<span class="highlighted-comment-line">  <span class="hljs-punctuation">}</span></span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Isto permite-lhe evoluir a sua estrutura de dados sem alterar o esquema.</p>
<p>Casos de uso comuns incluem:</p>
<ul>
<li><p>Armazenamento de campos opcionais ou de recuperação pouco frequente</p></li>
<li><p>Capturar metadados que variam consoante a entidade</p></li>
<li><p>Suporte de filtragem flexível através de índices em chaves de campo dinâmicas específicas</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Tipos de dados suportados<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>O campo dinâmico suporta todos os tipos de dados escalares fornecidos pelo Milvus, incluindo valores simples e complexos. Estes tipos de dados aplicam-se aos **valores das chaves armazenadas em <code translate="no">$meta</code>.</p>
<p><strong>Os tipos suportados incluem:</strong></p>
<ul>
<li><p>String (<code translate="no">VARCHAR</code>)</p></li>
<li><p>Inteiro (<code translate="no">INT8</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>)</p></li>
<li><p>Ponto flutuante (<code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>)</p></li>
<li><p>Booleano (<code translate="no">BOOL</code>)</p></li>
<li><p>Matriz de valores escalares (<code translate="no">ARRAY</code>)</p></li>
<li><p>Objectos JSON (<code translate="no">JSON</code>)</p></li>
</ul>
<p><strong>Exemplo:</strong></p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Acme&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">29.99</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;new&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;hot&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;specs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;weight&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.2kg&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dimensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;width&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;height&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span> <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cada uma das chaves e valores acima seria armazenada no campo <code translate="no">$meta</code>.</p>
<h2 id="Enable-dynamic-field" class="common-anchor-header">Ativar o campo dinâmico<button data-href="#Enable-dynamic-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar a funcionalidade de campo dinâmico, defina <code translate="no">enable_dynamic_field=True</code> ao criar o esquema de coleção:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with dynamic field enabled</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
<span class="highlighted-wrapper-line">    enable_dynamic_field=<span class="hljs-literal">True</span>,</span>
)

<span class="hljs-comment"># Add explicitly defined fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
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
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">CreateCollectionReq</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Initialize client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span> });

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">schema</span>:  [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_id&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;my_vector&#x27;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">type_params</span>: {
          <span class="hljs-attr">dim</span>: <span class="hljs-string">&#x27;5&#x27;</span>,
      }
   ],
   <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>
});

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
    WithName(<span class="hljs-string">&quot;my_id&quot;</span>).pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> myIdField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_id&quot;,
  &quot;dataType&quot;: &quot;Int64&quot;,
  &quot;isPrimary&quot;: true,
  &quot;autoID&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> myVectorField=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;my_vector&quot;,
  &quot;dataType&quot;: &quot;FloatVector&quot;,
  &quot;elementTypeParams&quot;: {
    &quot;dim&quot;: 5
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
  \&quot;autoID\&quot;: false,
  \&quot;enableDynamicField\&quot;: true,
  \&quot;fields\&quot;: [
    <span class="hljs-variable">$myIdField</span>,
    <span class="hljs-variable">$myVectorField</span>
  ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-entities-to-the-collection" class="common-anchor-header">Inserir entidades na coleção<button data-href="#Insert-entities-to-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>O campo dinâmico permite-lhe inserir campos extra não definidos no esquema. Estes campos serão armazenados automaticamente em <code translate="no">$meta</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">entities = [
    {
        <span class="hljs-string">&quot;my_id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-comment"># Explicitly defined primary field</span>
        <span class="hljs-string">&quot;my_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-comment"># Explicitly defined vector field</span>
        <span class="hljs-string">&quot;overview&quot;</span>: <span class="hljs-string">&quot;Great product&quot;</span>,       <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;words&quot;</span>: <span class="hljs-number">150</span>,                      <span class="hljs-comment"># Scalar key not defined in schema</span>
        <span class="hljs-string">&quot;dynamic_json&quot;</span>: {                  <span class="hljs-comment"># JSON key not defined in schema</span>
            <span class="hljs-string">&quot;varchar&quot;</span>: <span class="hljs-string">&quot;some text&quot;</span>,
            <span class="hljs-string">&quot;nested&quot;</span>: {
                <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-number">42.5</span>
            },
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>        <span class="hljs-comment"># Number stored as string</span>
        }
    }
]

client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-number">1</span>);
row.add(<span class="hljs-string">&quot;my_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>)));
row.addProperty(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;Great product&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;words&quot;</span>, <span class="hljs-number">150</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">dynamic</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
dynamic.addProperty(<span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;some text&quot;</span>);
dynamic.addProperty(<span class="hljs-string">&quot;string_price&quot;</span>, <span class="hljs-string">&quot;99.99&quot;</span>);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">nested</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
nested.addProperty(<span class="hljs-string">&quot;value&quot;</span>, <span class="hljs-number">42.5</span>);

dynamic.add(<span class="hljs-string">&quot;nested&quot;</span>, nested);
row.add(<span class="hljs-string">&quot;dynamic_json&quot;</span>, dynamic);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">const</span> entities = [
  {
    <span class="hljs-attr">my_id</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">my_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">overview</span>: <span class="hljs-string">&#x27;Great product&#x27;</span>,
    <span class="hljs-attr">words</span>: <span class="hljs-number">150</span>,
    <span class="hljs-attr">dynamic_json</span>: {
      <span class="hljs-attr">varchar</span>: <span class="hljs-string">&#x27;some text&#x27;</span>,
      <span class="hljs-attr">nested</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">42.5</span>,
      },
      <span class="hljs-attr">string_price</span>: <span class="hljs-string">&#x27;99.99&#x27;</span>,
    },
  },
];
<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: entities,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;my_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;my_vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
    }).WithColumns(
    column.NewColumnVarChar(<span class="hljs-string">&quot;overview&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Great product&quot;</span>}),
    column.NewColumnInt32(<span class="hljs-string">&quot;words&quot;</span>, []<span class="hljs-type">int32</span>{<span class="hljs-number">150</span>}),
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;dynamic_json&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
            varchar: &#x27;some text&#x27;,
            nested: {
                value: 42.5,
            },
            string_price: &#x27;99.99&#x27;,
        }`</span>),
    }),
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
  &quot;data&quot;: [
    {
      &quot;my_id&quot;: 1,
      &quot;my_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
      &quot;overview&quot;: &quot;Great product&quot;,
      &quot;words&quot;: 150,
      &quot;dynamic_json&quot;: {
        &quot;varchar&quot;: &quot;some text&quot;,
        &quot;nested&quot;: {
          &quot;value&quot;: 42.5
        },
        &quot;string_price&quot;: &quot;99.99&quot;
      }
    }
  ],
  &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-keys-in-the-dynamic-field--Milvus-2511+" class="common-anchor-header">Chaves de índice no campo dinâmico<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Index-keys-in-the-dynamic-field--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus permite-lhe utilizar <strong>a indexação de caminhos JSON</strong> para criar índices em chaves específicas dentro do campo dinâmico. Estes podem ser valores escalares ou valores aninhados em objectos JSON.</p>
<div class="alert note">
<p>A indexação das chaves do campo dinâmico é <strong>opcional</strong>. Ainda é possível consultar ou filtrar por chaves de campo dinâmico sem um índice, mas isso pode resultar num desempenho mais lento devido à pesquisa de força bruta.</p>
</div>
<h3 id="JSON-path-indexing-syntax" class="common-anchor-header">Sintaxe de indexação de caminho JSON</h3><p>Para criar um índice de caminho JSON, especifique:</p>
<ul>
<li><p><strong>Caminho JSON</strong> (<code translate="no">json_path</code>): O caminho para a chave ou o campo aninhado no seu objeto JSON que pretende indexar.</p>
<ul>
<li><p>Exemplo: <code translate="no">metadata[&quot;category&quot;]</code></p>
<p>Isso define onde o mecanismo de indexação deve procurar dentro da estrutura JSON.</p></li>
</ul></li>
<li><p><strong>Tipo de elenco JSON</strong> (<code translate="no">json_cast_type</code>): O tipo de dados que o Milvus deve utilizar ao interpretar e indexar o valor no caminho especificado.</p>
<ul>
<li><p>Este tipo deve corresponder ao tipo de dados real do campo que está a ser indexado.</p></li>
<li><p>Para obter uma lista completa, consulte <a href="/docs/pt/use-json-fields.md#Supported-JSON-cast-types">Tipos de elenco JSON suportados</a>.</p></li>
</ul></li>
</ul>
<h3 id="Use-JSON-path-to-index-dynamic-field-keys" class="common-anchor-header">Usar o caminho JSON para indexar chaves de campo dinâmico</h3><p>Como o campo dinâmico é um campo JSON, você pode indexar qualquer chave dentro dele usando a sintaxe de caminho JSON. Isso funciona tanto para valores escalares simples quanto para estruturas aninhadas complexas.</p>
<p><strong>Exemplos de caminho JSON:</strong></p>
<ul>
<li><p>Para chaves simples: <code translate="no">overview</code>, <code translate="no">words</code></p></li>
<li><p>Para chaves aninhadas: <code translate="no">dynamic_json['varchar']</code>, <code translate="no">dynamic_json['nested']['value']</code></p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Index a simple string key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;overview&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;overview_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>,   <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;overview&quot;</span>        <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a simple numeric key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;words&quot;</span>,  <span class="hljs-comment"># Key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;words_index&quot;</span>,  <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,  <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;words&quot;</span> <span class="hljs-comment"># JSON path to the key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a nested key within a JSON object</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name in the dynamic field</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_varchar_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-comment"># Data type that Milvus uses when indexing the values</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span> <span class="hljs-comment"># JSON path to the nested key</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Index a deeply nested key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-comment"># Must be set to AUTOINDEX or INVERTED for JSON path indexing</span></span>
    index_name=<span class="hljs-string">&quot;json_nested_index&quot;</span>, <span class="hljs-comment"># Unique index name</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

Map&lt;String,Object&gt; extraParams1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams1.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>);
extraParams1.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;overview&quot;</span>)
        .indexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map&lt;String,Object&gt; extraParams2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams2.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>);
extraParams2.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;words&quot;</span>)
        .indexName(<span class="hljs-string">&quot;words_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());

Map&lt;String,Object&gt; extraParams3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams3.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>);
extraParams3.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());

Map&lt;String,Object&gt; extraParams4 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams4.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>);
extraParams4.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;overview_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;overview&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;words_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;words&#x27;</span>,
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_varchar_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;varchar&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>,
      },
    },
    {
      <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
      <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
      <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_nested_index&#x27;</span>,
      <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
      <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
      <span class="hljs-attr">params</span>: {
        <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
        <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]&quot;</span>,
      },
    },
  ];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;overview_index&quot;</span>)
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>)
    .WithIndexName(<span class="hljs-string">&quot;words_index&quot;</span>)
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;varchar&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_varchar_index&quot;</span>)
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;nested&#x27;][&#x27;value&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_nested_index&quot;</span>)

indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;overview&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;words&quot;</span>, jsonIndex2)
indexOpt3 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex3)
indexOpt4 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex4)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> overviewIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;overview_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;overview\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> wordsIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;words_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;words\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> varcharIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_varchar_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;varchar&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;varchar\&quot;]&quot;
  }
}&#x27;</span>

<span class="hljs-built_in">export</span> nestedIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_nested_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
          &quot;json_path&quot;: &quot;dynamic_json[\&quot;nested\&quot;][\&quot;value\&quot;]&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Use-JSON-cast-functions-for-type-conversion--Milvus-2514+" class="common-anchor-header">Utilizar funções de conversão JSON para conversão de tipos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.14+</span></h3><p>Se uma chave de campo dinâmico contiver valores num formato incorreto (por exemplo, números armazenados como cadeias de caracteres), pode utilizar uma função de conversão para o converter:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Convert a string to double before indexing</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dynamic_json&quot;</span>, <span class="hljs-comment"># JSON key name</span>
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_string_price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-comment"># Must be the output type of the cast function</span>
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span> <span class="hljs-comment"># Case insensitive; convert string to double</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String,Object&gt; extraParams5 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams5.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>);
extraParams5.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dynamic_json&quot;</span>)
        .indexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams5)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dynamic_json&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;json_string_price_index&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;NONE&#x27;</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">json_path</span>: <span class="hljs-string">&quot;dynamic_json[&#x27;string_price&#x27;]&quot;</span>,
      <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&#x27;double&#x27;</span>,
      <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&#x27;STRING_TO_DOUBLE&#x27;</span>,
    },
  });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`dynamic_json[&#x27;string_price&#x27;]`</span>)
    .WithIndexName(<span class="hljs-string">&quot;json_string_price_index&quot;</span>)
indexOpt5 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dynamic_json&quot;</span>, jsonIndex5)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> stringPriceIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;dynamic_json&quot;,
  &quot;indexName&quot;: &quot;json_string_price_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;dynamic_json[\&quot;string_price\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;double&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Se a conversão de tipo falhar (por exemplo, o valor <code translate="no">&quot;not_a_number&quot;</code> não pode ser convertido num número), o valor é ignorado e desindexado.</p></li>
<li><p>Para obter detalhes sobre os parâmetros da função de conversão, consulte <a href="/docs/pt/use-json-fields.md#Use-JSON-cast-functions-for-type-conversion">Campo JSON</a>.</p></li>
</ul>
</div>
<h3 id="Apply-indexes-to-the-collection" class="common-anchor-header">Aplicar índices à coleção</h3><p>Depois de definir os parâmetros de índice, pode aplicá-los à coleção utilizando <code translate="no">create_index()</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams);
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
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$varcharIndex</span>,
  <span class="hljs-variable">$nestedIndex</span>,
  <span class="hljs-variable">$overviewIndex</span>,
  <span class="hljs-variable">$wordsIndex</span>,
  <span class="hljs-variable">$stringPriceIndex</span>
]&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Filter-by-dynamic-field-keys" class="common-anchor-header">Filtrar por chaves de campo dinâmicas<button data-href="#Filter-by-dynamic-field-keys" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de inserir entidades com chaves de campo dinâmicas, pode filtrá-las utilizando expressões de filtro padrão.</p>
<ul>
<li><p>Para chaves não JSON (por exemplo, strings, números, booleanos), pode referenciá-las diretamente pelo nome da chave.</p></li>
<li><p>Para chaves que armazenam objetos JSON, use a sintaxe de caminho JSON para acessar valores aninhados.</p></li>
</ul>
<p>Com base <a href="/docs/pt/enable-dynamic-field.md#Insert-entities-to-the-collection">na </a><a href="/docs/pt/enable-dynamic-field.md#Insert-entities-to-the-collection">entidade de exemplo</a> da secção anterior, as expressões de filtro válidas incluem:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment"># Non-JSON key</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment"># JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">filter = <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>                <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>                               <span class="hljs-comment">// Non-JSON key</span>
filter = <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>       <span class="hljs-comment">// JSON object key</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
filter := <span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
filter := <span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> filterOverview=<span class="hljs-string">&#x27;overview == &quot;Great product&quot;&#x27;</span>
<span class="hljs-built_in">export</span> filterWords=<span class="hljs-string">&#x27;words &gt;= 100&#x27;</span>
<span class="hljs-built_in">export</span> filterNestedValue=<span class="hljs-string">&#x27;dynamic_json[&quot;nested&quot;][&quot;value&quot;] &lt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Recuperando chaves de campo dinâmicas</strong>: Para retornar chaves de campo dinâmicas nos resultados de pesquisa ou consulta, é necessário especificá-las explicitamente no parâmetro <code translate="no">output_fields</code> usando a mesma sintaxe de caminho JSON da filtragem:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Include dynamic field keys in search results</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                         <span class="hljs-comment"># Filter expression defined earlier</span>
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-comment-line">    output_fields=[</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;overview&quot;</span>,                        <span class="hljs-comment"># Simple dynamic field key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&#x27;dynamic_json[&quot;varchar&quot;]&#x27;</span>          <span class="hljs-comment"># Nested JSON key</span></span>
<span class="highlighted-comment-line">    ]</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>)
        .token(<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>)
        .build());

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">5</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">filters</span>: filter,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
token := <span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>

client, err := client.New(ctx, &amp;client.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;overview&quot;</span>, <span class="hljs-string">&quot;dynamic_json[&#x27;varchar&#x27;]&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;YOUR_CLUSTER_TOKEN&quot;</span>
<span class="hljs-built_in">export</span> FILTER=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&quot;{
  \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
  \&quot;data\&quot;: [
    [0.1, 0.2, 0.3, 0.4, 0.5]
  ],
  \&quot;annsField\&quot;: \&quot;my_vector\&quot;,
  \&quot;filter\&quot;: \&quot;<span class="hljs-variable">${FILTER}</span>\&quot;,
  \&quot;limit\&quot;: 5,
  \&quot;outputFields\&quot;: [\&quot;overview\&quot;, \&quot;dynamic_json.varchar\&quot;]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>As chaves de campo dinâmicas não são incluídas nos resultados por padrão e devem ser solicitadas explicitamente.</p>
</div>
<p>Para obter uma lista completa de operadores e expressões de filtro compatíveis, consulte <a href="/docs/pt/filtered-search.md">Pesquisa filtrada</a>.</p>
<h2 id="Put-it-all-together" class="common-anchor-header">Colocar tudo junto<button data-href="#Put-it-all-together" class="anchor-icon" translate="no">
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
    </button></h2><p>Até agora, você aprendeu como usar o campo dinâmico para armazenar e indexar de forma flexível chaves que não estão definidas no esquema. Uma vez inserida uma chave de campo dinâmico, pode utilizá-la como qualquer outro campo em expressões de filtro, sem necessidade de sintaxe especial.</p>
<p>Para concluir o fluxo de trabalho numa aplicação do mundo real, também é necessário:</p>
<ul>
<li><p><strong>Criar um índice no seu campo de vetor</strong> (obrigatório para cada coleção)</p>
<p>Consulte <a href="/docs/pt/create-collection.md#Optional-Set-Index-Parameters">Definir parâmetros de índice</a></p></li>
<li><p><strong>Carregar a coleção</strong></p>
<p>Consulte <a href="/docs/pt/load-and-release.md">Carregar e liberar</a></p></li>
<li><p><strong>Pesquisar ou consultar usando filtros de caminho JSON</strong></p>
<p>Consulte <a href="/docs/pt/filtered-search.md">Pesquisa filtrada</a> e <a href="/docs/pt/json-operators.md">operadores JSON</a></p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="When-should-I-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key" class="common-anchor-header">Quando é que devo definir um campo explicitamente no esquema em vez de utilizar uma chave de campo dinâmica?</h3><p>Deve definir um campo explicitamente no esquema em vez de utilizar uma chave de campo dinâmica quando:</p>
<ul>
<li><p><strong>O campo é frequentemente incluído em output_fields</strong>: Apenas os campos definidos explicitamente têm a garantia de serem recuperados de forma eficiente através de <code translate="no">output_fields</code>. As chaves de campo dinâmicas não são optimizadas para recuperação de alta frequência e podem incorrer em custos adicionais de desempenho.</p></li>
<li><p><strong>O campo é acedido ou filtrado frequentemente</strong>: Embora a indexação de uma chave de campo dinâmica possa proporcionar um desempenho de filtragem semelhante ao dos campos de esquema fixo, os campos explicitamente definidos oferecem uma estrutura mais clara e uma melhor manutenção.</p></li>
<li><p><strong>É necessário um controlo total sobre o comportamento do campo</strong>: Os campos explícitos suportam restrições ao nível do esquema, validações e digitação mais clara, o que pode ser útil para gerir a integridade e consistência dos dados.</p></li>
<li><p><strong>Você quer evitar inconsistências de indexação</strong>: Os dados em chaves de campo dinâmicas são mais propensos a inconsistências no tipo ou na estrutura. A utilização de um esquema fixo ajuda a garantir a qualidade dos dados, especialmente se planear utilizar indexação ou casting.</p></li>
</ul>
<h3 id="Can-I-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types" class="common-anchor-header">Posso criar vários índices na mesma chave de campo dinâmica com diferentes tipos de dados?</h3><p>Não, você pode criar <strong>apenas um índice por caminho JSON</strong>. Mesmo que uma chave de campo dinâmico contenha valores de tipo misto (por exemplo, algumas cadeias de caracteres e alguns números), tem de escolher um único <code translate="no">json_cast_type</code> ao indexar esse caminho. De momento, não são suportados vários índices na mesma chave com tipos diferentes.</p>
<h3 id="When-indexing-a-dynamic-field-key-what-if-the-data-casting-fails" class="common-anchor-header">Ao indexar uma chave de campo dinâmica, o que acontece se a conversão de dados falhar?</h3><p>Se tiver criado um índice numa chave de campo dinâmico e a conversão de dados falhar - por exemplo, um valor destinado a ser convertido para <code translate="no">double</code> é uma cadeia de caracteres não numérica como <code translate="no">&quot;abc&quot;</code>- esses valores específicos serão <strong>ignorados silenciosamente durante a criação do índice</strong>. Eles não aparecerão no índice e, portanto, <strong>não serão retornados na pesquisa baseada em filtro ou nos resultados da consulta</strong> que dependem do índice.</p>
<p>Isso tem algumas implicações importantes:</p>
<ul>
<li><p><strong>Nenhum fallback para varredura completa</strong>: Se a maioria das entidades for indexada com êxito, as consultas de filtragem dependerão inteiramente do índice. As entidades com falhas de fundição serão excluídas do conjunto de resultados - mesmo que correspondam logicamente à condição do filtro.</p></li>
<li><p><strong>Risco de precisão da pesquisa</strong>: Em grandes conjuntos de dados onde a qualidade dos dados é inconsistente (especialmente em chaves de campo dinâmicas), este comportamento pode levar a resultados inesperados em falta. É fundamental garantir uma formatação de dados consistente e válida antes da indexação.</p></li>
<li><p><strong>Use funções de conversão com cautela</strong>: Se utilizar uma <code translate="no">json_cast_function</code> para converter cadeias de caracteres em números durante a indexação, certifique-se de que os valores das cadeias de caracteres são convertíveis de forma fiável. Uma incompatibilidade entre <code translate="no">json_cast_type</code> e o tipo convertido real resultará em erros ou entradas ignoradas.</p></li>
</ul>
<h3 id="What-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type" class="common-anchor-header">O que acontece se a minha consulta utilizar um tipo de dados diferente do tipo de conversão indexado?</h3><p>Se a sua consulta comparar uma chave de campo dinâmica utilizando um <strong>tipo de dados</strong> diferente do que foi utilizado no índice (por exemplo, uma consulta com uma comparação de cadeias de caracteres quando o índice foi convertido para <code translate="no">double</code>), o sistema <strong>não</strong> utilizará <strong>o índice</strong> e poderá voltar a uma pesquisa completa <em>apenas se possível</em>. Para obter o melhor desempenho e precisão, certifique-se de que o seu tipo de consulta corresponde ao <code translate="no">json_cast_type</code> utilizado durante a criação do índice.</p>
