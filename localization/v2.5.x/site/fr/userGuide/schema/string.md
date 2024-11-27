---
id: string.md
title: Champ de la chaîne de caractères
summary: >-
  Dans Milvus, VARCHAR est le type de données utilisé pour stocker des données
  de type chaîne, adapté au stockage de chaînes de longueur variable. Il permet
  de stocker des chaînes de caractères à un ou plusieurs octets, avec une
  longueur maximale de 60 535 caractères. Lorsque vous définissez un champ
  VARCHAR, vous devez également spécifier le paramètre de longueur maximale
  max_length. Le type de chaîne VARCHAR offre un moyen efficace et flexible de
  stocker et de gérer des données textuelles, ce qui le rend idéal pour les
  applications qui gèrent des chaînes de différentes longueurs.
---
<h1 id="String-Field​" class="common-anchor-header">Champ chaîne de caractères<button data-href="#String-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, <code translate="no">VARCHAR</code> est le type de données utilisé pour stocker des données de type chaîne de caractères, adaptées au stockage de chaînes de caractères de longueur variable. Il permet de stocker des chaînes de caractères à un ou plusieurs octets, avec une longueur maximale de 60 535 caractères. Lorsque vous définissez un champ <code translate="no">VARCHAR</code>, vous devez également spécifier le paramètre de longueur maximale <code translate="no">max_length</code>. Le type de chaîne <code translate="no">VARCHAR</code> offre un moyen efficace et flexible de stocker et de gérer des données textuelles, ce qui le rend idéal pour les applications qui gèrent des chaînes de différentes longueurs.</p>
<h2 id="Add-VARCHAR-field​" class="common-anchor-header">Ajout d'un champ VARCHAR<button data-href="#Add-VARCHAR-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser des données de type chaîne dans Milvus, définissez un champ <code translate="no">VARCHAR</code> lors de la création d'une collection. Ce processus comprend les éléments suivants</p>
<ol>
<li><p>Définir <code translate="no">datatype</code> sur le type de données de chaîne pris en charge, c'est-à-dire <code translate="no">VARCHAR</code>.</p></li>
<li><p>Spécifier la longueur maximale du type de chaîne à l'aide du paramètre <code translate="no">max_length</code>, qui ne peut pas dépasser 60 535 caractères.</p></li>
</ol>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
<span class="hljs-comment"># define schema​</span>
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;varchar_field1&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;varchar_field2&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;varchar_field1&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;varchar_field2&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">200</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;varchar_field2&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;varchar_field1&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,​
  },​
];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> varcharField1=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;varchar_field1&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> varcharField2=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;varchar_field2&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 200​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$varcharField1</span>,​
        <span class="hljs-variable">$varcharField2</span>,​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, nous ajoutons deux champs <code translate="no">VARCHAR</code>: <code translate="no">varchar_field1</code> et <code translate="no">varchar_field2</code>, dont les longueurs maximales sont respectivement de 100 et 200 caractères. Il est recommandé de définir <code translate="no">max_length</code> en fonction des caractéristiques de vos données afin de s'assurer qu'il prend en charge les données les plus longues tout en évitant une allocation d'espace excessive. En outre, nous avons ajouté un champ primaire <code translate="no">pk</code> et un champ vectoriel <code translate="no">embedding</code>.</p>
<div class="alert note">
<p>Le champ primaire et le champ vectoriel sont obligatoires lorsque vous créez une collection. Le champ primaire identifie chaque entité de manière unique, tandis que le champ vectoriel est essentiel pour la recherche de similarités. Pour plus de détails, reportez-vous à <a href="/docs/fr/primary-field.md">Champ primaire &amp; AutoID</a>, <a href="/docs/fr/dense-vector.md">Vecteur dense</a>, <a href="/docs/fr/binary-vector.md">Vecteur binaire</a> ou <a href="/docs/fr/sparse_vector.md">Vecteur épars</a>.</p>
</div>
<h2 id="Set-index-params​" class="common-anchor-header">Définir les paramètres d'index<button data-href="#Set-index-params​" class="anchor-icon" translate="no">
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
    </button></h2><p>La définition de paramètres d'index pour les champs <code translate="no">VARCHAR</code> est facultative, mais elle peut améliorer considérablement l'efficacité de la recherche.</p>
<p>Dans l'exemple suivant, nous créons un <code translate="no">AUTOINDEX</code> pour <code translate="no">varchar_field1</code>, ce qui signifie que Milvus créera automatiquement un index approprié en fonction du type de données. Pour plus d'informations, voir <a href="https://milvus.io/docs/glossary.md#Auto-Index">AUTOINDEX</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;varchar_field1&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    index_name=<span class="hljs-string">&quot;varchar_index&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">​
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;varchar_field1&quot;</span>)​
        .indexName(<span class="hljs-string">&quot;varchar_index&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [{​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;varchar_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;varchar_field1&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
)];​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;varchar_field1&quot;,​
            &quot;indexName&quot;: &quot;varchar_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Outre <code translate="no">AUTOINDEX</code>, vous pouvez spécifier d'autres types d'index scalaires, tels que <code translate="no">INVERTED</code> ou <code translate="no">BITMAP</code>. Pour connaître les types d'index pris en charge, reportez-vous à la section <a href="https://milvus.io/docs/scalar_index.md">Index scalaires</a>.</p>
<p>En outre, avant de créer la collection, vous devez créer un index pour le champ vectoriel. Dans cet exemple, nous utilisons <code translate="no">AUTOINDEX</code> pour simplifier les paramètres de l'index vectoriel.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add vector index​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings​</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">COSINE</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;varchar_field1&quot;,​
            &quot;indexName&quot;: &quot;varchar_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">Créer une collection<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois le schéma et l'index définis, vous pouvez créer une collection comprenant des champs de type chaîne de caractères.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_varchar_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_varchar_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: index_params​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_varchar_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;data&quot;:{}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">Insérer des données<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir créé la collection, vous pouvez insérer des données comprenant des champs de type chaîne.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;varchar_field1&quot;</span>: <span class="hljs-string">&quot;Product A&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>: <span class="hljs-string">&quot;High quality product&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>]},​
    {<span class="hljs-string">&quot;varchar_field1&quot;</span>: <span class="hljs-string">&quot;Product B&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>: <span class="hljs-string">&quot;Affordable price&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]},​
    {<span class="hljs-string">&quot;varchar_field1&quot;</span>: <span class="hljs-string">&quot;Product C&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>: <span class="hljs-string">&quot;Best seller&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_varchar_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;varchar_field1\&quot;: \&quot;Product A\&quot;, \&quot;varchar_field2\&quot;: \&quot;High quality product\&quot;, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;varchar_field1\&quot;: \&quot;Product B\&quot;, \&quot;varchar_field2\&quot;: \&quot;Affordable price\&quot;, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;varchar_field1\&quot;: \&quot;Product C\&quot;, \&quot;varchar_field2\&quot;: \&quot;Best seller\&quot;, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_varchar_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  {​
    <span class="hljs-attr">varchar_field1</span>: <span class="hljs-string">&quot;Product A&quot;</span>,​
    <span class="hljs-attr">varchar_field2</span>: <span class="hljs-string">&quot;High quality product&quot;</span>,​
    <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>,​
    <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>],​
  },​
  {​
    <span class="hljs-attr">varchar_field1</span>: <span class="hljs-string">&quot;Product B&quot;</span>,​
    <span class="hljs-attr">varchar_field2</span>: <span class="hljs-string">&quot;Affordable price&quot;</span>,​
    <span class="hljs-attr">pk</span>: <span class="hljs-number">2</span>,​
    <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>],​
  },​
  {​
    <span class="hljs-attr">varchar_field1</span>: <span class="hljs-string">&quot;Product C&quot;</span>,​
    <span class="hljs-attr">varchar_field2</span>: <span class="hljs-string">&quot;Best seller&quot;</span>,​
    <span class="hljs-attr">pk</span>: <span class="hljs-number">3</span>,​
    <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>],​
  },​
];​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_sparse_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;varchar_field1&quot;: &quot;Product A&quot;, &quot;varchar_field2&quot;: &quot;High quality product&quot;, &quot;pk&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3]},​
    {&quot;varchar_field1&quot;: &quot;Product B&quot;, &quot;varchar_field2&quot;: &quot;Affordable price&quot;, &quot;pk&quot;: 2, &quot;embedding&quot;: [0.4, 0.5, 0.6]},​
    {&quot;varchar_field1&quot;: &quot;Product C&quot;, &quot;varchar_field2&quot;: &quot;Best seller&quot;, &quot;pk&quot;: 3, &quot;embedding&quot;: [0.7, 0.8, 0.9]}       ​
    ],​
    &quot;collectionName&quot;: &quot;my_varchar_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:3,&quot;insertIds&quot;:[1,2,3]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, nous insérons des données qui comprennent des champs <code translate="no">VARCHAR</code> (<code translate="no">varchar_field1</code> et <code translate="no">varchar_field2</code>), un champ primaire (<code translate="no">pk</code>) et des représentations vectorielles (<code translate="no">embedding</code>). Pour s'assurer que les données insérées correspondent aux champs définis dans le schéma, il est recommandé de vérifier les types de données à l'avance afin d'éviter les erreurs d'insertion.</p>
<p>Si vous avez défini <code translate="no">enable_dynamic_fields=True</code> lors de la définition du schéma, Milvus vous permet d'insérer des champs de type chaîne qui n'ont pas été définis à l'avance. Cependant, n'oubliez pas que cela peut augmenter la complexité des requêtes et de la gestion, ce qui peut avoir un impact sur les performances. Pour plus d'informations, voir <a href="/docs/fr/enable-dynamic-field.md">Champ dynamique</a>.</p>
<h2 id="Search-and-query​" class="common-anchor-header">Recherche et interrogation<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir ajouté des champs de type chaîne, vous pouvez les utiliser pour le filtrage dans les opérations de recherche et de requête, afin d'obtenir des résultats de recherche plus précis.</p>
<h3 id="Filter-queries​" class="common-anchor-header">Filtrer les requêtes</h3><p>Après avoir ajouté des champs de type chaîne, vous pouvez filtrer les résultats à l'aide de ces champs dans les requêtes. Par exemple, vous pouvez interroger toutes les entités pour lesquelles <code translate="no">varchar_field1</code> est égal à <code translate="no">&quot;Product A&quot;</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;varchar_field1 == &quot;Product A&quot;&#x27;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_varchar_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;varchar_field1&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;varchar_field1&#x27;: &#x27;Product A&#x27;, &#x27;varchar_field2&#x27;: &#x27;High quality product&#x27;, &#x27;pk&#x27;: 1}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;varchar_field1 == \&quot;Product A\&quot;&quot;</span>;​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_varchar_collection&quot;</span>)​
        .filter(filter)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;varchar_field1&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={varchar_field1=Product A, varchar_field2=High quality product, pk=1})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_varchar_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;varchar_field1 == &quot;Product A&quot;&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;varchar_field1&#x27;</span>, <span class="hljs-string">&#x27;varchar_field2&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_varchar_collection&quot;,​
    &quot;filter&quot;: &quot;varchar_field1 == \&quot;Product A\&quot;&quot;,​
    &quot;outputFields&quot;: [&quot;varchar_field1&quot;, &quot;varchar_field2&quot;]​
}&#x27;</span>​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;pk&quot;:1,&quot;varchar_field1&quot;:&quot;Product A&quot;,&quot;varchar_field2&quot;:&quot;High quality product&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Cette expression de requête renvoie toutes les entités correspondantes et affiche les champs <code translate="no">varchar_field1</code> et <code translate="no">varchar_field2</code>. Pour plus d'informations sur les requêtes de filtrage, reportez-vous à la section <a href="/docs/fr/boolean.md">Filtrage des métadonnées</a>.</p>
<h3 id="Vector-search-with-string-filtering​" class="common-anchor-header">Recherche vectorielle avec filtrage de chaînes</h3><p>Outre le filtrage de base des champs scalaires, vous pouvez combiner des recherches de similarité vectorielle avec des filtres de champs scalaires. Par exemple, le code suivant montre comment ajouter un filtre de champ scalaire à une recherche vectorielle.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;varchar_field1 == &quot;Product A&quot;&#x27;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_varchar_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;varchar_field1&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.06000000238418579, &#x27;entity&#x27;: {&#x27;varchar_field1&#x27;: &#x27;Product A&#x27;, &#x27;varchar_field2&#x27;: &#x27;High quality product&#x27;}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;varchar_field1 == \&quot;Product A\&quot;&quot;</span>;​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_varchar_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, -<span class="hljs-number">0.6f</span>, <span class="hljs-number">0.1f</span>})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;varchar_field1&quot;</span>, <span class="hljs-string">&quot;varchar_field2&quot;</span>))​
        .filter(filter)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={varchar_field1=Product A, varchar_field2=High quality product}, score=-0.2364331, id=1)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_varchar_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;varchar_field1&#x27;</span>, <span class="hljs-string">&#x27;varchar_field2&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;varchar_field1 == &quot;Product A&quot;&#x27;</span>​
    params: {​
       nprobe:<span class="hljs-number">10</span>​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_varchar_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;varchar_field1&quot;, &quot;varchar_field2&quot;],​
    &quot;filter&quot;: &quot;varchar_field1 == \&quot;Product A\&quot;&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:-0.2364331,&quot;id&quot;:1,&quot;varchar_field1&quot;:&quot;Product A&quot;,&quot;varchar_field2&quot;:&quot;High quality product&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, nous définissons d'abord un vecteur de requête et ajoutons une condition de filtre <code translate="no">varchar_field1 == &quot;Product A&quot;</code> pendant la recherche. Cela permet de s'assurer que les résultats de la recherche ne sont pas seulement similaires au vecteur de requête, mais qu'ils correspondent également à la condition de filtrage de la chaîne spécifiée. Pour plus d'informations, voir <a href="/docs/fr/boolean.md">Filtrage des métadonnées</a>.</p>
