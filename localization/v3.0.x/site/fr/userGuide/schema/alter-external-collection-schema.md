---
id: alter-external-collection-schema.md
title: Modifier le schéma d'une collection externeCompatible with Milvus 3.0.x
summary: >-
  Découvrez comment afficher un champ supplémentaire provenant d'une source de
  données externe dans une collection externe existante.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">Modifier le schéma d'une collection externe<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Les sources de données externes évoluent souvent après la création d’une collection externe. Par exemple, une table « lakehouse » qui stocke déjà des embeddings peut par la suite inclure un nouveau champ scalaire, tel qu’un score, une catégorie ou un horodatage, que vous souhaitez faire apparaître dans les résultats de requête ou utiliser dans des filtres.</p>
<p>Au lieu de recréer la collection externe ou de copier les données source dans Milvus, ajoutez un champ Milvus qui correspond au champ existant dans la source de données externe. Après avoir ajouté le champ, actualisez la collection externe afin que le nouveau champ puisse être utilisé dans les requêtes et les recherches.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Les collections externes prennent actuellement en charge l’ajout de champs après leur création. Les autres modifications de schéma, telles que la suppression de champs, le renommage de champs, la modification des types de données des champs, la modification des dimensions des vecteurs ou le remappage d’ <code translate="no">external_field</code>, ne sont pas prises en charge.</li>
<li>Vous ne pouvez ajouter qu’un champ qui existe déjà dans la source de données externe. Cette opération mappe un champ externe existant à un champ Milvus. Elle ne crée pas de nouveau champ dans la source de données externe et ne remplit pas les données de la source a posteriori.</li>
<li>L’ajout de champs de type « <code translate="no">SPARSE_FLOAT_VECTOR</code> » à une collection externe existante n’est pas pris en charge.</li>
<li>L’ajout de champs StructArray à une collection externe existante n’est pas pris en charge. Si votre collection externe nécessite un champ StructArray, définissez-le dans le schéma de la collection lors de sa création.</li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">Ajouter un champ<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’ajouter un champ à une collection externe, vérifiez que ce champ existe déjà dans la source de données externe. Appelez ensuite la méthode ` <code translate="no">add_collection_field()</code> ` pour exposer ce champ dans Milvus en définissant ` <code translate="no">external_field</code> ` sur le nom du champ dans la source de données externe. Définissez ` <code translate="no">data_type</code> ` sur le type de données Milvus correspondant au champ de la source de données externe. Par exemple, si le champ mappé stocke des valeurs en double précision, utilisez ` <code translate="no">DataType.DOUBLE</code>`.</p>
<p>Contrairement aux collections gérées, les valeurs du champ ajouté sont lues à partir de la source de données externe après l’actualisation de la collection externe.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">Ajouter un champ scalaire<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">add_collection_field()</code> pour ajouter un champ scalaire lorsque vous souhaitez renvoyer ce champ dans les résultats d’une requête ou l’utiliser dans des filtres. L’exemple suivant ajoute un champ <code translate="no">score</code> qui est mappé au champ <code translate="no">score</code> de la source de données externe.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
from pymilvus import DataType, MilvusClient
<p>client = MilvusClient(
uri="http://localhost:19530",
token="root:Milvus",
)</p>
<p>client.add_collection_field(
collection_name="product_embeddings",
field_name="score",
data_type=DataType.DOUBLE,
nullable=True,
# highlight-next-line
external_field="score",
)</p>
<pre><code translate="no">
```java
<span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2 <span class="hljs-keyword">as</span> sdk;
<span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;score&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::Double)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;score&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, « <code translate="no">score</code> » est le nom du champ Milvus et « <code translate="no">external_field=&quot;score&quot;</code> » le mappe au champ « <code translate="no">score</code> » de la source de données externe. Définissez « <code translate="no">nullable=True</code> » car le champ est ajouté après la création de la collection.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">Ajouter un champ vectoriel<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous pouvez également ajouter un champ vectoriel si la source de données externe contient déjà les valeurs vectorielles. Définissez les paramètres « <code translate="no">data_type</code> » et « <code translate="no">dim</code> » du vecteur de manière à ce qu’ils correspondent au champ vectoriel de la source de données externe.</p>
<p>L'exemple suivant ajoute un champ vectoriel dense nommé <code translate="no">image_embedding_v2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
client.add_collection_field(
    collection_name="product_embeddings",
    field_name="image_embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    dim=768,
    nullable=True,
    # highlight-next-line
    external_field="image_embedding_v2",
)
```
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::FloatVector)
                .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
     <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si vous prévoyez d'effectuer une recherche vectorielle sur le champ vectoriel ajouté, créez un index pour ce champ avant d'actualiser la collection externe.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
```python
index_params = client.prepare_index_params()
<p>index_params.add_index(
field_name="image_embedding_v2",
index_type="AUTOINDEX",
metric_type="COSINE",
)</p>
<p>client.create_index(
collection_name="product_embeddings",
index_params=index_params,
)</p>
<pre><code translate="no">
```java
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    <span class="hljs-string">&quot;product_embeddings&quot;</span>, <span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.COSINE))))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">create_index</span>(
    sdk::request::index::CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_param</span>(
            sdk::IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(sdk::IndexType::AutoIndex)
                .<span class="hljs-title function_ invoke__">metric_type</span>(sdk::MetricType::Cosine),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> </span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">CreateIndex</span><span class="hljs-params">(milvus::CreateIndexRequest()
                                 .WithCollectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
                                 .AddIndex(std::move(index_desc)))</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">RefreshExternalCollection</span><span class="hljs-params">(request, response)</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">refreshExternalCollection</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp">RefreshExternalCollectionResp resp = <span class="hljs-keyword">await</span> client.RefreshExternalCollectionAsync(
    <span class="hljs-keyword">new</span> RefreshExternalCollectionReq
    {
        CollectionName = <span class="hljs-string">&quot;product_embeddings&quot;</span>
    });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_embeddings&quot;
}&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
