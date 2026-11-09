---
id: create-collection.md
title: Créer une collection
summary: >-
  Vous pouvez créer une collection en définissant son schéma, ses paramètres
  d'indexation, le type de métrique et en précisant si elle doit être chargée
  lors de sa création. Cette page explique comment créer une collection à partir
  de zéro.
---
<h1 id="Create-Collection" class="common-anchor-header">Créer une collection<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>Vous pouvez créer une collection en définissant son schéma, ses paramètres d'index, le type de métrique et en indiquant si elle doit être chargée lors de sa création. Cette page explique comment créer une collection à partir de zéro.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Une collection est un tableau bidimensionnel comportant des colonnes fixes et des lignes variables. Chaque colonne représente un champ, et chaque ligne représente une entité. Un schéma est nécessaire pour mettre en œuvre cette gestion structurelle des données. Chaque entité à insérer doit respecter les contraintes définies dans le schéma.</p>
<p>Vous pouvez définir tous les aspects d’une collection, notamment son schéma, ses paramètres d’index, son type de métrique et s’il faut la charger lors de sa création, afin de vous assurer qu’elle réponde pleinement à vos besoins.</p>
<p>Pour créer une collection, vous devez</p>
<ul>
<li><p><a href="/docs/fr/create-collection.md#Create-Schema">Créer un schéma</a></p></li>
<li><p><a href="/docs/fr/create-collection.md#Optional-Set-Index-Parameters">Définir les paramètres d’index</a> (facultatif)</p></li>
<li><p><a href="/docs/fr/create-collection.md#Create-a-Collection">Créer une collection</a></p></li>
</ul>
<h2 id="Create-Schema" class="common-anchor-header">Créer un schéma<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Un schéma définit la structure des données d’une collection. Lors de la création d’une collection, vous devez concevoir le schéma en fonction de vos besoins. Pour plus de détails, consultez la section « <a href="/docs/fr/schema.md">Explication du schéma</a> ».</p>
<p>Les extraits de code suivants créent un schéma avec un champ dynamique activé et trois champs obligatoires nommés « <code translate="no">my_id</code> », « <code translate="no">my_vector</code> » et « <code translate="no">my_varchar</code> ».</p>
<div class="alert note">
<p>Vous pouvez définir des valeurs par défaut pour n’importe quel champ scalaire et le rendre nul. Pour plus de détails, consultez la section « <a href="/docs/fr/nullable-and-default.md">Champs nuls et valeurs par défaut</a> ».</p>
</div>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);

<span class="hljs-comment">// 3.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).WithIsAutoID(<span class="hljs-literal">false</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// 3.1 + 3.2 Create schema and add fields</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;my_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">false</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">SetEnableDynamicField</span>(<span class="hljs-literal">true</span>);
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;my_id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;my_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 + 3.2 Create schema and define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">const</span> <span class="hljs-built_in">string</span> CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = CLUSTER_ENDPOINT,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;my_id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;my_vector&quot;</span>, dimension: <span class="hljs-number">5</span>),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;my_varchar&quot;</span>, maxLength: <span class="hljs-number">512</span>)
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: false,
        &quot;enableDynamicField&quot;: true,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-Set-Index-Parameters" class="common-anchor-header">(Facultatif) Définir les paramètres d’index<button data-href="#Optional-Set-Index-Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>La création d’un index sur un champ spécifique accélère la recherche sur ce champ. Un index enregistre l’ordre des entités au sein d’une collection. Comme le montrent les extraits de code suivants, vous pouvez utiliser <code translate="no">metric_type</code> et <code translate="no">index_type</code> pour choisir les méthodes appropriées permettant à Milvus d’indexer un champ et de mesurer les similitudes entre les représentations vectorielles.</p>
<p>Sur Milvus, vous pouvez utiliser <code translate="no">AUTOINDEX</code> comme type d’index pour tous les champs vectoriels, et l’un des types suivants : <code translate="no">COSINE</code>, <code translate="no">L2</code> ou <code translate="no">IP</code> comme type de métrique, en fonction de vos besoins.</p>
<p>Comme le montre l’extrait de code ci-dessus, vous devez définir à la fois le type d’index et le type de métrique pour les champs vectoriels, et uniquement le type d’index pour les champs scalaires. Les index sont obligatoires pour les champs vectoriels, et il est recommandé de créer des index sur les champs scalaires fréquemment utilisés dans les conditions de filtrage.</p>
<p>Pour plus de détails, consultez les sections « <a href="/docs/fr/index-vector-fields.md">Indexer des champs vectoriels</a> » et « <a href="/docs/fr/index-scalar-fields.md">Indexer des champs scalaires</a> ».</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

collectionName := <span class="hljs-string">&quot;customized_setup_1&quot;</span>
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_vector&quot;</span>, index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;my_id&quot;</span>, index.NewAutoIndex(entity.COSINE)),
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// 3.3 + 3.4 Prepare and add index parameters</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">index_params</span> = <span class="hljs-built_in">vec!</span>[
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;my_id&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex),
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;milvus::IndexDesc&gt; indexes = {
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, milvus::IndexType::AUTOINDEX),
    milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;my_vector&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 + 3.4 Prepare and add index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexParams = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, IndexType.AutoIndex),
    <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;my_vector&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Collection" class="common-anchor-header">Créer une collection<button data-href="#Create-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous avez créé une collection avec des paramètres d’index, Milvus charge automatiquement la collection dès sa création. Dans ce cas, tous les champs mentionnés dans les paramètres d’index sont indexés.</p>
<p>Les extraits de code suivants montrent comment créer une collection avec des paramètres d’index et vérifier son état de chargement.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.5 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// Check the load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq1);
System.out.println(loaded);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_1&quot;</span>, schema).
    WithIndexOptions(indexOptions...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(<span class="hljs-string">&quot;customized_setup_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(state.State)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// 3.5 Create a collection with the index loaded simultaneously</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">index_params</span>(index_params.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">get_load_state</span>(
        GetLoadStateRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">state</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                           .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
                                           .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                           .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(indexes)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::GetLoadStateResponse response;
status = client-&gt;<span class="hljs-built_in">GetLoadState</span>(milvus::<span class="hljs-built_in">GetLoadStateRequest</span>()
                                  .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_1&quot;</span>),
                              response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
std::cout &lt;&lt; std::<span class="hljs-built_in">to_string</span>(response.<span class="hljs-built_in">State</span>()) &lt;&lt; std::endl;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.5 Create a collection with fields and index parameters</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">//</span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    Schema = schema,
    Indexes = indexParams
});

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.GetLoadStateAsync(<span class="hljs-keyword">new</span> GetLoadStateReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_1&quot;</span>
});
Console.WriteLine(res.State);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_1\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également créer une collection sans aucun paramètre d'index et les ajouter par la suite. Dans ce cas, Milvus ne charge pas la collection lors de sa création.</p>
<p>L'extrait de code suivant montre comment créer une collection sans index ; la collection reste alors non chargée au moment de sa création.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    schema=schema,
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
        .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">loaded</span> <span class="hljs-operator">=</span> client.getLoadState(customSetupLoadStateReq2);
System.out.println(loaded);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_2&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption(<span class="hljs-string">&quot;customized_setup_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(state.State)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">get_load_state</span>(
        GetLoadStateRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, res.<span class="hljs-title function_ invoke__">state</span>());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                           .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
                                           .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::GetLoadStateResponse response;
status = client-&gt;<span class="hljs-built_in">GetLoadState</span>(milvus::<span class="hljs-built_in">GetLoadStateRequest</span>()
                                  .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_2&quot;</span>),
                              response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
std::cout &lt;&lt; std::<span class="hljs-built_in">to_string</span>(response.<span class="hljs-built_in">State</span>()) &lt;&lt; std::endl;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">//</span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    Schema = schema
});

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.GetLoadStateAsync(<span class="hljs-keyword">new</span> GetLoadStateReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>
});
Console.WriteLine(res.State);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_2\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 0,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoad&quot;,</span>
<span class="hljs-comment">#         &quot;message&quot;: &quot;&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Collection-Properties" class="common-anchor-header">Définir les propriétés de la collection<button data-href="#Set-Collection-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez définir les propriétés de la collection à créer afin de l'adapter à votre service. Les propriétés applicables sont les suivantes.</p>
<h3 id="Set-Shard-Number" class="common-anchor-header">Définir le nombre de shards<button data-href="#Set-Shard-Number" class="anchor-icon" translate="no">
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
    </button></h3><p>Les shards sont des tranches horizontales d’une collection, et chaque shard correspond à un canal d’entrée de données. Par défaut, chaque collection comporte un shard. Vous pouvez spécifier le nombre de shards lors de la création d’une collection afin de mieux l’adapter à votre volume de données et à votre charge de travail.</p>
<p>À titre indicatif, tenez compte des éléments suivants lors de la définition du nombre de shards :</p>
<ul>
<li><strong>Taille des données :</strong> une pratique courante consiste à prévoir un shard pour 200 millions d’entités. Vous pouvez également effectuer une estimation en fonction de la taille totale des données, par exemple en ajoutant un shard pour chaque tranche de 100 Go de données que vous prévoyez d’insérer.</li>
<li><strong>Utilisation des nœuds de flux :</strong> si votre instance Milvus comporte plusieurs nœuds de flux, il est recommandé d’utiliser plusieurs shards. Cela garantit que la charge de travail liée à l’insertion des données est répartie sur tous les nœuds de flux disponibles, ce qui évite que certains restent inactifs tandis que d’autres sont surchargés.</li>
</ul>
<p>L'extrait de code suivant montre comment définir le nombre de shards lors de la création d'une collection.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With shard number</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_3&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    num_shards=<span class="hljs-number">1</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// With shard number</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq3</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_3&quot;</span>)
    .collectionSchema(schema)
<span class="highlighted-wrapper-line">    .numShards(<span class="hljs-number">1</span>)</span>
    .build();
client.createCollection(customizedSetupReq3);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_3&quot;</span>, schema).WithShardNum(<span class="hljs-number">1</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// With shard number</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_3&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">num_shards</span>(<span class="hljs-number">1</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                          .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_3&quot;</span>)
                                          .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                          .<span class="hljs-built_in">WithNumShards</span>(<span class="hljs-number">1</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_3&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">shards_num</span>: <span class="hljs-number">1</span></span>
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_3&quot;</span>,
    Schema = schema,
    ShardsNum = <span class="hljs-number">1</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;shardsNum&quot;: 1
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_3\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-mmap" class="common-anchor-header">Activer mmap<button data-href="#Enable-mmap" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus active mmap par défaut sur toutes les collections, ce qui lui permet de mapper les données brutes des champs en mémoire au lieu de les charger intégralement. Cela réduit l’empreinte mémoire et augmente la capacité de la collection. L’exemple suivant désactive mmap pour une seule collection ; pour plus de détails sur mmap, consultez la section <a href="/docs/fr/mmap.md">Utiliser mmap</a>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With mmap</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_4&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    enable_mmap=<span class="hljs-literal">False</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// With MMap</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq4</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_4&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)</span>
        .build();
client.createCollection(customizedSetupReq4);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/common&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_4&quot;</span>, schema).
    WithProperty(common.MmapEnabledKey, <span class="hljs-literal">false</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// With mmap</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_4&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">properties</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(
                <span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
                <span class="hljs-string">&quot;false&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
            )]))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                          .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_4&quot;</span>)
                                          .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                          .<span class="hljs-built_in">AddProperty</span>(milvus::MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_4&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">properties</span>: {</span>
        <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
    },
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_4&quot;</span>,
    Schema = schema,
    Properties =
    {
        [<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;false&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;mmap.enabled&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_4\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Collection-TTL" class="common-anchor-header">Définir la durée de vie (TTL) d’une collection<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h3><p>Si les données d’une collection doivent être supprimées au bout d’une période donnée, pensez à définir son délai de vie (Time-To-Live, TTL) en secondes. Une fois le TTL écoulé, Milvus supprime les entités de la collection. La suppression est asynchrone, ce qui signifie que les recherches et les requêtes restent possibles avant que la suppression ne soit terminée.</p>
<p>L'extrait de code suivant définit la durée de vie (TTL) sur un jour (86 400 secondes). Il est recommandé de définir la durée de vie (TTL) sur au moins deux jours.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With TTL</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// With TTL</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq5</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;86400&quot;</span>)</span>
        .build();
client.createCollection(customizedSetupReq5);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/common&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_5&quot;</span>, schema).
    WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">86400</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// With TTL</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">properties</span>(std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(
                <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
                <span class="hljs-string">&quot;86400&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
            )]))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                          .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
                                          .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                          .<span class="hljs-built_in">AddProperty</span>(milvus::COLLECTION_TTL_SECONDS, <span class="hljs-string">&quot;86400&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">properties</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">86400</span></span>
<span class="highlighted-comment-line">    }</span>
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    Schema = schema,
    Properties =
    {
        [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>] = <span class="hljs-string">&quot;86400&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 86400
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Consistency-Level" class="common-anchor-header">Définir le niveau de cohérence<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h3><p>Lors de la création d’une collection, vous pouvez définir le niveau de cohérence pour les recherches et les requêtes effectuées dans celle-ci. Vous pouvez également modifier le niveau de cohérence de la collection lors d’une recherche ou d’une requête spécifique.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># With consistency level</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_6&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// With consistency level</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq6</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_6&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.BOUNDED)</span>
        .build();
client.createCollection(customizedSetupReq6);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_6&quot;</span>, schema).
    WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-comment">// With consistency level</span>
client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;customized_setup_6&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema.<span class="hljs-title function_ invoke__">clone</span>())
            .<span class="hljs-title function_ invoke__">consistency_level</span>(ConsistencyLevel::Bounded)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                          .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;customized_setup_6&quot;</span>)
                                          .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                          .<span class="hljs-built_in">WithConsistencyLevel</span>(milvus::ConsistencyLevel::BOUNDED));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_6&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,</span>
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;customized_setup_6&quot;</span>,
    Schema = schema,
    ConsistencyLevel = ConsistencyLevel.BoundedStaleness
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_6\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour en savoir plus sur les niveaux de cohérence, consultez la section <a href="/docs/fr/tune_consistency.md">Niveau de cohérence</a>.</p>
<h3 id="Enable-Dynamic-Field" class="common-anchor-header">Activer le champ dynamique<button data-href="#Enable-Dynamic-Field" class="anchor-icon" translate="no">
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
    </button></h3><p>Le champ dynamique d’une collection est un champ JSON (JavaScript Object Notation) réservé nommé <strong>$meta</strong>. Une fois ce champ activé, Milvus enregistre tous les champs non définis par le schéma présents dans chaque entité, ainsi que leurs valeurs, sous forme de paires clé-valeur dans ce champ réservé.</p>
<p>Pour plus de détails sur l'utilisation du champ dynamique, consultez la section « <a href="/docs/fr/enable-dynamic-field.md">Champ dynamique</a> ».</p>
