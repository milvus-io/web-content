---
id: use-json-fields.md
title: Utiliser des champs JSON
summary: >-
  JSON (JavaScript Object Notation) est un format d'échange de données léger qui
  offre un moyen souple de stocker et d'interroger des structures de données
  complexes. Dans Milvus, vous pouvez stocker des informations structurées
  supplémentaires avec des données vectorielles à l'aide de champs JSON, ce qui
  permet d'effectuer des recherches et des requêtes avancées combinant la
  similarité vectorielle et le filtrage structuré.
---
<h1 id="JSON-Field​" class="common-anchor-header">Champ JSON<button data-href="#JSON-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>Un champ <a href="https://en.wikipedia.org/wiki/JSON">JSON</a> est un champ scalaire qui stocke des informations supplémentaires ainsi que des représentations vectorielles, sous forme de paires clé-valeur. Voici un exemple de la manière dont les données sont stockées au format JSON :</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;metadata&quot;</span>: {
    <span class="hljs-string">&quot;product_info&quot;</span>: {
      <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
      <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>
    },
    <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
    <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>, <span class="hljs-string">&quot;clearance&quot;</span>]
  }
}
<button class="copy-code-btn"></button></code></pre>
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
<li><strong>Taille du champ</strong>: La taille des champs JSON est limitée à 65 536 octets.</li>
<li><strong>Dictionnaires imbriqués</strong>: Tous les dictionnaires imbriqués dans les valeurs des champs JSON sont traités comme des chaînes simples pour le stockage.</li>
<li><strong>Valeurs par défaut</strong>: Les champs JSON ne prennent pas en charge les valeurs par défaut. Toutefois, vous pouvez attribuer la valeur <code translate="no">True</code> à l'attribut <code translate="no">nullable</code> pour autoriser les valeurs nulles. Pour plus de détails, voir <a href="/docs/fr/nullable-and-default.md">Nullable &amp; Default</a>.</li>
<li><strong>Correspondance des types</strong>: si la valeur clé d'un champ JSON est un entier ou un flottant, elle ne peut être comparée (via des filtres d'expression) qu'à une autre clé numérique du même type.</li>
<li><strong>Nommage</strong>: Pour nommer les clés JSON, il est recommandé de n'utiliser que des lettres, des chiffres et des traits de soulignement. L'utilisation d'autres caractères peut poser des problèmes lors du filtrage ou de la recherche.</li>
<li><strong>Traitement des chaînes</strong>: Milvus stocke les valeurs de chaîne dans les champs JSON telles qu'elles sont saisies, sans conversion sémantique. Par exemple :<ul>
<li><code translate="no">'a&quot;b'</code>, <code translate="no">&quot;a'b&quot;</code>, <code translate="no">'a\\'b'</code>, et <code translate="no">&quot;a\\&quot;b&quot;</code> sont stockés tels quels.</li>
<li><code translate="no">'a'b'</code> et <code translate="no">&quot;a&quot;b&quot;</code> sont considérés comme non valides.</li>
</ul></li>
<li><strong>Indexation JSON</strong>: Lors de l'indexation d'un champ JSON, vous pouvez spécifier un ou plusieurs chemins d'accès dans le champ JSON afin d'accélérer le filtrage. Chaque chemin supplémentaire augmente la charge d'indexation, c'est pourquoi vous devez planifier votre stratégie d'indexation avec soin. Pour plus d'informations sur l'indexation d'un champ JSON, reportez-vous à la section <a href="#considerations-on-json-indexing">Considérations sur l'indexation JSON</a>.</li>
</ul>
<h2 id="Add-JSON-field​" class="common-anchor-header">Ajouter un champ JSON<button data-href="#Add-JSON-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour ajouter le champ JSON <code translate="no">metadata</code> au schéma de votre collection, utilisez <code translate="no">DataType.JSON</code>. L'exemple ci-dessous définit un champ JSON dont les métadonnées autorisent les valeurs nulles :</p>
<p>Voici comment définir un schéma de collection qui inclut un champ JSON.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Import necessary libraries</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Define server address</span>
SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=SERVER_ADDR)

<span class="hljs-comment"># Define the collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add a JSON field that supports null values</span>
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON, nullable=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .dataType(DataType.JSON)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">3</span>)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,
  },
];

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">3</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;metadata&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;metadata&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;embedding&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 3
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;enableDynamicField\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$pkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Définissez <code translate="no">enable_dynamic_fields=True</code> si vous avez besoin d'insérer des champs supplémentaires non définis à l'avenir.</li>
<li>Utilisez <code translate="no">nullable=True</code> pour autoriser les objets JSON manquants ou nuls.</li>
</ul>
</div>
<h2 id="Set-index-params" class="common-anchor-header">Définir les paramètres d'indexation<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>L'indexation permet à Milvus de filtrer ou de rechercher rapidement de grands volumes de données. Dans Milvus, l'indexation est</p>
<ul>
<li>Obligatoire pour les champs vectoriels (pour exécuter efficacement les recherches de similarité).</li>
<li>Facultatif pour les champs JSON (pour accélérer les filtres scalaires sur des chemins JSON spécifiques).</li>
</ul>
<h3 id="Index-a-JSON-field" class="common-anchor-header">Indexer un champ JSON</h3><p>Par défaut, les champs JSON ne sont pas indexés, de sorte que toutes les requêtes de filtrage (par exemple, <code translate="no">metadata[&quot;price&quot;] &lt; 100</code>) doivent analyser toutes les lignes. Si vous souhaitez accélérer les requêtes sur des chemins spécifiques à l'intérieur du champ <code translate="no">metadata</code>, vous pouvez créer un index inversé sur chaque chemin qui vous intéresse. Dans cet exemple, nous allons créer deux index sur des chemins différents à l'intérieur du champ JSON <code translate="no">metadata</code>:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

# Example <span class="hljs-number">1</span>: Index the <span class="hljs-string">&#x27;category&#x27;</span> key inside <span class="hljs-string">&#x27;product_info&#x27;</span> as a <span class="hljs-type">string</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>
    }
)

# Example <span class="hljs-number">2</span>: Index <span class="hljs-string">&#x27;price&#x27;</span> as a numeric <span class="hljs-keyword">type</span> (double)
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>);
extraParams_1.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_1&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_1)
        .<span class="hljs-title function_">build</span>());

<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams_2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
extraParams_2.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;double&quot;</span>);
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;json_index_2&quot;</span>)
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">INVERTED</span>)
        .<span class="hljs-title function_">extraParams</span>(extraParams_2)
        .<span class="hljs-title function_">build</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_1&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;varchar&quot;</span>
        }
    },
    {
        field_name: <span class="hljs-string">&quot;metadata&quot;</span>,
        index_type: <span class="hljs-string">&quot;INVERTED&quot;</span>,
        index_name: <span class="hljs-string">&quot;json_index_2&quot;</span>,
        <span class="hljs-keyword">params</span>: {
            json_path: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
            json_cast_type: <span class="hljs-string">&quot;double&quot;</span>
        }
    }
]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">jsonIndex1 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;product_info&quot;][&quot;category&quot;]`</span>)
jsonIndex2 := index.NewJSONPathIndex(index.Inverted, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;price&quot;]`</span>)
indexOpt1 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;meta&quot;</span>, jsonIndex2)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_1&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;metadata&quot;,
            &quot;indexName&quot;: &quot;json_index_2&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;,
            &quot;params&quot;: {
                &quot;json_path&quot;: &quot;metadata[\&quot;price\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;double&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th><strong>Paramètre</strong></th><th><strong>Description de l'index</strong></th><th><strong>Exemple Valeur</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">field_name</code></td><td>Nom du champ JSON dans votre schéma.</td><td><code translate="no">&quot;metadata&quot;</code></td></tr>
<tr><td><code translate="no">index_type</code></td><td>Type d'index à créer ; actuellement, seul <code translate="no">INVERTED</code> est pris en charge pour l'indexation des chemins JSON.</td><td><code translate="no">&quot;INVERTED&quot;</code></td></tr>
<tr><td><code translate="no">index_name</code></td><td>(Facultatif) Un nom d'index personnalisé. Spécifiez des noms différents si vous créez plusieurs index sur le même champ JSON.</td><td><code translate="no">&quot;json_index_1&quot;</code></td></tr>
<tr><td><code translate="no">params.json_path</code></td><td>Spécifie le chemin JSON à indexer. Vous pouvez cibler des clés imbriquées, des positions de tableau ou les deux (par exemple, <code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> ou <code translate="no">metadata[&quot;tags&quot;][0]</code>). Si le chemin est manquant ou si l'élément de tableau n'existe pas pour une ligne particulière, cette ligne est simplement ignorée lors de l'indexation et aucune erreur n'est générée.</td><td><code translate="no">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</code></td></tr>
<tr><td><code translate="no">params.json_cast_type</code></td><td>Type de données vers lequel Milvus convertira les valeurs JSON extraites lors de la construction de l'index. Valeurs valides : <ul><li> <code translate="no">&quot;bool&quot;</code> ou <code translate="no">&quot;BOOL&quot;</code></li><li><code translate="no">&quot;double&quot;</code> ou <code translate="no">&quot;DOUBLE&quot;</code></li><li> <code translate="no">&quot;varchar&quot;</code> ou <code translate="no">&quot;VARCHAR&quot;</code></li></ul><br><strong>Remarque</strong>: Pour les valeurs entières, Milvus utilise en interne le type double pour l'index. Les grands nombres entiers supérieurs à 2^53 perdent en précision. Si la conversion échoue (en raison d'une incompatibilité de type), aucune erreur n'est générée et la valeur de cette ligne n'est pas indexée.</td><td><code translate="no">&quot;varchar&quot;</code></td></tr>
</tbody>
</table>
<h4 id="Considerations-on-JSON-indexing" class="common-anchor-header">Considérations sur l'indexation JSON</h4><ul>
<li><strong>Logique de filtrage</strong>:<ul>
<li>Si vous <strong>créez un index de type double</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), seules les conditions de filtrage de type numérique peuvent utiliser l'index. Si le filtre compare un index double à une condition non numérique, Milvus revient à la recherche par force brute.</li>
<li>Si vous <strong>créez un index de type varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), seules les conditions de filtrage de type chaîne peuvent utiliser l'index. Sinon, Milvus revient à la force brute.</li>
<li>L'indexation<strong>booléenne</strong> se comporte de la même manière que l'indexation de type varchar.</li>
</ul></li>
<li><strong>Expressions de termes</strong>:<ul>
<li>Vous pouvez utiliser <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. Cependant, l'index ne fonctionne que pour les valeurs scalaires stockées sous ce chemin. Si <code translate="no">json[&quot;field&quot;]</code> est un tableau, la requête revient à la force brute (l'indexation de type tableau n'est pas encore prise en charge).</li>
</ul></li>
<li><strong>Précision numérique</strong>:<ul>
<li>En interne, Milvus indexe tous les champs numériques sous forme de doubles. Si une valeur numérique dépasse 2^53, elle perd en précision et les requêtes sur ces valeurs hors plage peuvent ne pas correspondre exactement.</li>
</ul></li>
<li><strong>Intégrité des données</strong>:<ul>
<li>Milvus n'analyse pas et ne transforme pas les clés JSON au-delà de la distribution spécifiée. Si les données source sont incohérentes (par exemple, certaines lignes stockent une chaîne pour la clé <code translate="no">&quot;k&quot;</code> alors que d'autres stockent un nombre), certaines lignes ne seront pas indexées.</li>
</ul></li>
</ul>
<h3 id="Index-a-vector-field" class="common-anchor-header">Indexation d'un champ vectoriel</h3><p>L'exemple suivant crée un index sur l'intégration d'un champ vectoriel, en utilisant le type d'index AUTOINDEX. Avec ce type d'index, Milvus sélectionne automatiquement l'index le plus approprié en fonction du type de données. Vous pouvez également personnaliser le type d'index et les paramètres pour chaque champ.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set index params</span>

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index `embedding` with AUTOINDEX and specify similarity metric type</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .indexName(<span class="hljs-string">&quot;vector_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;embedding_index&#x27;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;embedding&#x27;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;vector_index&#x27;</span>,
    <span class="hljs-attr">metricType</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">CONSINE</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">vectorIndex := index.NewAutoIndex(entity.COSINE)
indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>, vectorIndex)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;indexName&quot;: &quot;vector_index&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
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
    </button></h2><p>Une fois le schéma et l'index définis, créez une collection comprenant des champs de type chaîne.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">index_params</span>: indexParams
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>, schema).
        WithIndexOptions(indexOpt1, indexOpt2, indexOpt))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-comment">// handler err</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_json_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

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
    </button></h2><p>Après avoir créé la collection, insérez les entités qui correspondent au schéma.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=data
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
Gson gson = <span class="hljs-keyword">new</span> Gson();
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:\&quot;electronics\&quot;,\&quot;brand\&quot;:\&quot;BrandA\&quot;},\&quot;price\&quot;:99.99,\&quot;in_stock\&quot;:True,\&quot;tags\&quot;:[\&quot;summer_sale\&quot;]},\&quot;pk\&quot;:1,\&quot;embedding\&quot;:[0.12,0.34,0.56]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:null,\&quot;pk\&quot;:2,\&quot;embedding\&quot;:[0.56,0.78,0.90]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;pk\&quot;:3,\&quot;embedding\&quot;:[0.91,0.18,0.23]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));
rows.<span class="hljs-keyword">add</span>(gson.fromJson(<span class="hljs-string">&quot;{\&quot;metadata\&quot;:{\&quot;product_info\&quot;:{\&quot;category\&quot;:null,\&quot;brand\&quot;:\&quot;BrandB\&quot;},\&quot;price\&quot;:59.99,\&quot;in_stock\&quot;:null},\&quot;pk\&quot;:4,\&quot;embedding\&quot;:[0.56,0.38,0.21]}&quot;</span>, JsonObject.<span class="hljs-keyword">class</span>));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .data(rows)
        .build());

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const data = [
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
    },
    {
        <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire JSON object is null</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
    },
    {
        <span class="hljs-comment"># JSON field is completely missing</span>
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
    },
    {
        <span class="hljs-comment"># Some sub-keys are null</span>
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">None</span>
        },
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
    }
];

<span class="hljs-keyword">await</span> client.insert({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data: data
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

resp, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []int64{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-number">3</span>, [][]float32{
        {<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>},
        {<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>},
        {<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>},
    }).WithColumns(
    column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{
        []<span class="hljs-type">byte</span>(`{
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: True,
        <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;summer_sale&quot;</span>]
    }`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-literal">null</span>`),
        []<span class="hljs-type">byte</span>(`<span class="hljs-string">&quot;metadata&quot;</span>: {
        <span class="hljs-string">&quot;product_info&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: None, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandB&quot;</span>},
        <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">59.99</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: None
    }`),
    }),
))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle err</span>
}
fmt.Println(resp)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--data <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
             &quot;metadata&quot;:  {
                   &quot;product_info&quot;: {&quot;category&quot;: &quot;electronics&quot;, &quot;brand&quot;: &quot;BrandA&quot;},
                  &quot;price&quot;:  99.99,
                   &quot;in_stock&quot;:  true,
                  &quot;tags&quot;: [&quot;summer_sale&quot;]
              }, 
             &quot;varchar_field2&quot;: &quot;High quality product&quot;, 
             &quot;pk&quot;: 1, 
             &quot;embedding&quot;: [0.1, 0.2, 0.3]
          },
          {
              &quot;metadata&quot;: null,
              &quot;pk&quot;: 2,
              &quot;embedding&quot;: [0.56, 0.78, 0.90]
          },
         {
               &quot;pk&quot;: 3,
               &quot;embedding&quot;: [0.91, 0.18, 0.23]
         },
        {
              &quot;metadata&quot;: {
                     &quot;product_info&quot;: {&quot;category&quot;: null, &quot;brand&quot;: &quot;BrandB&quot;},
                     &quot;price&quot;: 59.99,
                     &quot;in_stock&quot;: null
               },
              &quot;pk&quot;: 4,
              &quot;embedding&quot;: [0.56, 0.38, 0.21]
         }
    ],
    &quot;collectionName&quot;: &quot;my_json_collection&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-filter-expressions" class="common-anchor-header">Requête avec des expressions de filtre</h3><p>Après avoir inséré des entités, utilisez la méthode de requête pour récupérer les entités qui correspondent aux expressions de filtre spécifiées.</p>
<div class="alert note">
<p>Pour les champs JSON qui autorisent les valeurs nulles, le champ sera traité comme nul si l'objet JSON entier est manquant ou défini sur None. Pour plus d'informations, voir Champs JSON avec valeurs nulles.</p>
</div>
<p>Pour récupérer des entités dont les métadonnées ne sont pas nulles :</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query to filter out records with null metadata</span>

<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata is not null&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># Rows with pk=1 and pk=4 have valid, non-null metadata.</span>
<span class="hljs-comment"># Rows with pk=2 (metadata=None) and pk=3 (no metadata key) are excluded.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: None, &#x27;brand&#x27;: &#x27;BrandB&#x27;}, &#x27;price&#x27;: 59.99, &#x27;in_stock&#x27;: None}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata is not null&quot;</span>;
QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>}),
//    QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:null,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandB&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">59.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:null}, pk=<span class="hljs-number">4</span>})
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>]
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;metadata is not null&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_json_collection&quot;,
    &quot;filter&quot;: &quot;metadata is not null&quot;,
    &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:2},{&quot;metadata&quot;:&quot;&quot;,&quot;pk&quot;:3},{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: null, \&quot;brand\&quot;: \&quot;BrandB\&quot;}, \&quot;price\&quot;: 59.99, \&quot;in_stock\&quot;: null}&quot;,&quot;pk&quot;:4}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p>Pour récupérer les entités pour lesquelles <code translate="no">metadata[&quot;product_info&quot;][&quot;category&quot;]</code> est <code translate="no">&quot;electronics&quot;</code>:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;category&quot;: &quot;electronics&quot;.</span>
<span class="hljs-comment"># - pk=4 has &quot;category&quot;: None, so it doesn&#x27;t match.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;pk&#x27;: 1, &#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;</span>;

QueryResp resp = client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [QueryResp.QueryResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}, pk=<span class="hljs-number">1</span>})]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">const <span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot;&#x27;</span>;
const res = <span class="hljs-keyword">await</span> client.query({
    collection_name: <span class="hljs-string">&quot;my_json_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>: <span class="hljs-built_in">filter</span>,
    output_fields: [<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>]
});

// Example output:
// {
//.  data: [
//      {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;metadata&#x27;</span>: {<span class="hljs-string">&#x27;category&#x27;</span>: <span class="hljs-string">&#x27;electronics&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&#x27;brand&#x27;</span>: <span class="hljs-string">&#x27;BrandA&#x27;</span>}}
// ]
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">rs, err := cli.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_json_collection&quot;</span>).
    WithFilter(`metadata[<span class="hljs-string">&quot;product_info&quot;</span>][<span class="hljs-string">&quot;category&quot;</span>] == <span class="hljs-string">&quot;electronics&quot;</span>`).
    WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;pk&quot;</span>))
<span class="hljs-keyword">if</span> err != nil {
    <span class="hljs-comment">// handle error</span>
}

fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>))
fmt.Println(rs.GetColumn(<span class="hljs-string">&quot;metadata&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># restful</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;] == \&quot;electronics\&quot;&quot;,
  &quot;outputFields&quot;: [&quot;metadata&quot;, &quot;pk&quot;]
}&#x27;</span>

<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Vector-search-with-JSON-filtering​" class="common-anchor-header">Recherche vectorielle avec filtrage JSON</h3><p>Outre le filtrage de base des champs scalaires, vous pouvez combiner des recherches de similarité vectorielle avec des filtres de champs scalaires. Par exemple, le code suivant montre comment ajouter un filtre de champ scalaire à une recherche vectorielle :</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata[&quot;product_info&quot;][&quot;brand&quot;] == &quot;BrandA&quot;&#x27;</span>

res = client.search(
    collection_name=<span class="hljs-string">&quot;my_json_collection&quot;</span>,
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],
    limit=<span class="hljs-number">5</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;metadata&quot;</span>],
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>
)

<span class="hljs-comment"># Expected result:</span>
<span class="hljs-comment"># - Only pk=1 has &quot;brand&quot;: &quot;BrandA&quot; in metadata[&quot;product_info&quot;].</span>
<span class="hljs-comment"># - pk=4 has &quot;brand&quot;: &quot;BrandB&quot;.</span>
<span class="hljs-comment"># - pk=2 and pk=3 have no valid metadata.</span>
<span class="hljs-comment"># Hence, only pk=1 matches the filter.</span>

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.2479381263256073, &#x27;entity&#x27;: {&#x27;metadata&#x27;: {&#x27;product_info&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;price&#x27;: 99.99, &#x27;in_stock&#x27;: True, &#x27;tags&#x27;: [&#x27;summer_sale&#x27;]}}}]&quot;</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;</span>;

SearchResp resp = client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_json_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))
        .topK(<span class="hljs-number">5</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;metadata&quot;</span>))
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={metadata={<span class="hljs-string">&quot;product_info&quot;</span>:{<span class="hljs-string">&quot;category&quot;</span>:<span class="hljs-string">&quot;electronics&quot;</span>,<span class="hljs-string">&quot;brand&quot;</span>:<span class="hljs-string">&quot;BrandA&quot;</span>},<span class="hljs-string">&quot;price&quot;</span>:<span class="hljs-number">99.99</span>,<span class="hljs-string">&quot;in_stock&quot;</span>:true,<span class="hljs-string">&quot;tags&quot;</span>:[<span class="hljs-string">&quot;summer_sale&quot;</span>]}}, score=-<span class="hljs-number">0.24793813</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)
//   ]
// ]

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.search({
    collection_name: <span class="hljs-string">&#x27;my_json_collection&#x27;</span>,
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],
    limit: <span class="hljs-number">5</span>,
    output_fields: [<span class="hljs-string">&#x27;metadata&#x27;</span>],
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;] == &quot;electronics&quot; and metadata[&quot;price&quot;] &lt; 150&#x27;</span>,
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3</span>, <span class="hljs-number">-0.6</span>, <span class="hljs-number">-0.1</span>}

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">10</span>)
resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_json_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">5</span>,                    <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithOutputFields(<span class="hljs-string">&quot;metadata&quot;</span>).WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to perform basic ANN search collection: &quot;</span>, err.Error())
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    log.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    log.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;my_json_collection&quot;,
  &quot;data&quot;: [
    [0.3, -0.6, 0.1]
  ],
  &quot;annsField&quot;: &quot;embedding&quot;,
  &quot;limit&quot;: 5,
  &quot;searchParams&quot;: {
    &quot;params&quot;: {
      &quot;nprobe&quot;: 10
    }
  },
  &quot;outputFields&quot;: [&quot;metadata&quot;],
  &quot;filter&quot;: &quot;metadata[\&quot;product_info\&quot;][\&quot;brand\&quot;] == \&quot;BrandA\&quot;&quot;
}&#x27;</span>

<span class="hljs-comment">##{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;metadata&quot;:&quot;{\&quot;product_info\&quot;: {\&quot;category\&quot;: \&quot;electronics\&quot;, \&quot;brand\&quot;: \&quot;BrandA\&quot;}, \&quot;price\&quot;: 99.99, \&quot;in_stock\&quot;: true, \&quot;tags\&quot;: [\&quot;summer_sale\&quot;]}&quot;,&quot;pk&quot;:1}]}</span>

<button class="copy-code-btn"></button></code></pre>
<p>En outre, Milvus prend en charge des opérateurs de filtrage JSON avancés tels que <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ALL</code>, et <code translate="no">JSON_CONTAINS_ANY</code>, qui permettent d'améliorer encore les capacités d'interrogation. Pour plus de détails, voir <a href="/docs/fr/json-operators.md">Opérateurs JSON</a>.</p>
