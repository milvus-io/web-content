---
id: nullable-and-default.md
title: Champs pouvant prendre la valeur NULL
summary: >-
  Configurer les champs pouvant prendre la valeur « null » et les valeurs par
  défaut, y compris le schéma, l'insertion, l'indexation, la recherche et le
  filtrage.
---
<h1 id="Nullable-Fields" class="common-anchor-header">Champs pouvant prendre la valeur NULL<button data-href="#Nullable-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge les champs pouvant accepter la valeur NULL, ce qui permet à la valeur d'un champ d'être manquante ou explicitement définie sur NULL. La possibilité d'accepter la valeur NULL est définie au niveau du schéma et s'applique de manière cohérente lors des opérations d'ingestion de données, d'indexation, de recherche et de requête.</p>
<p>Utilisez des champs pouvant accepter la valeur NULL lorsque :</p>
<ul>
<li>Les données sont ingérées à partir de systèmes externes autorisant des valeurs manquantes.</li>
<li>Certaines métadonnées sont facultatives ou ne sont disponibles que pour une partie de l'ensemble de données.</li>
<li>Les représentations vectorielles sont générées de manière asynchrone et insérées ultérieurement.</li>
</ul>
<h2 id="Limits" class="common-anchor-header">Restrictions<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Les champs vectoriels autorisant les valeurs NULL ne prennent pas en charge les expressions de filtrage de type « <code translate="no">IS NULL</code> » ou « <code translate="no">IS NOT NULL</code> ». Vous ne pouvez pas filtrer explicitement les entités en fonction du fait qu’une valeur de champ vectoriel soit NULL.</p></li>
<li><p>À partir de Milvus 3.0.0, le champ <a href="/docs/fr/array-of-structs.md">StructArray</a> parent peut être nullable. Définissez la propriété « <code translate="no">nullable=True</code> » sur le champ StructArray parent, et non sur les sous-champs individuels. La valeur NULL s’applique à l’ensemble du champ StructArray, et non à un élément Struct individuel, et Milvus propage en interne la nullabilité du parent à ses sous-champs. Un champ StructArray ajouté à une collection existante doit être nullable afin que les entités existantes puissent renvoyer la valeur NULL pour ce nouveau champ. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/structarray-limits.md#Nullable-and-dynamic-schema-limits">Limites de StructArray</a> ».</p></li>
<li><p>L’attribut « nullable » est défini lors de la création d’un champ et ne peut pas être modifié par la suite. Vous ne pouvez pas activer ou désactiver la nullabilité pour un champ existant.</p></li>
<li><p>Les champs marqués comme pouvant être nuls ne peuvent pas être utilisés comme clés de partition. Les champs de clé de partition doivent toujours contenir des valeurs valides et non nulles. Pour plus d’informations, consultez la section « <a href="/docs/fr/use-partition-key.md">Utilisation d’une clé de partition</a> ».</p></li>
</ul>
<h2 id="What-is-a-nullable-field" class="common-anchor-header">Qu’est-ce qu’un champ pouvant accepter la valeur NULL ?<button data-href="#What-is-a-nullable-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, la possibilité pour un champ de stocker une valeur NULL est contrôlée par un attribut de champ au niveau du schéma nommé « <code translate="no">nullable</code> ».</p>
<p>Lorsqu’un champ est défini avec l’attribut ` <code translate="no">nullable=True</code>`, Milvus autorise l’absence de valeur pour ce champ lors de l’ingestion des données. En pratique, Milvus traite les deux entrées suivantes comme équivalentes et stocke la valeur du champ comme NULL :</p>
<ul>
<li>Le champ est omis dans l’entité d’entrée.</li>
<li>Le champ est explicitement défini sur NULL (par exemple, ` <code translate="no">None</code> ` en Python).</li>
</ul>
<p>Si un champ n’est pas défini comme pouvant être nul (comportement par défaut), chaque entité doit fournir une valeur valide pour ce champ. L’omission du champ ou l’attribution explicite d’une valeur NULL entraînera l’échec de l’opération d’insertion ou d’importation.</p>
<p>L’attribut « nullable » est pris en charge à la fois pour <strong>les champs scalaires et vectoriels</strong> dans un schéma de collection. À partir de Milvus 3.0.0, il est également pris en charge sur le champ parent StructArray. Ne configurez pas les sous-champs Struct comme pouvant être nuls de manière indépendante ; définissez la possibilité de valeur nulle sur le champ parent StructArray et Milvus propagera ce paramètre à ses sous-champs en interne.</p>
<div class="alert note">
<p>La nullabilité détermine si la valeur d’un champ peut être manquante ; elle ne définit pas quelle valeur est utilisée lorsqu’un champ est manquant.</p>
<ul>
<li>Si un champ pouvant être nul est configuré sans valeur par défaut, l’omission du champ entraîne le stockage d’une valeur NULL.</li>
<li>Si une valeur par défaut est configurée, Milvus peut stocker cette valeur à la place. Pour plus de détails, consultez la section « <a href="/docs/fr/default-values.md">Valeurs par défaut</a> ».</li>
</ul>
</div>
<h2 id="Define-a-nullable-field-in-the-collection-schema" class="common-anchor-header">Définir un champ pouvant être nul dans le schéma de collection<button data-href="#Define-a-nullable-field-in-the-collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser des champs pouvant être nuls, vous devez activer l’attribut « nullable » lors de la définition du schéma de collection.</p>
<p>Dans cet exemple, le schéma de collection définit un champ vectoriel nommé « <code translate="no">embedding</code> » avec la valeur « <code translate="no">nullable=True</code> ». Cela permet aux entités de la collection d’omettre la valeur du vecteur ou de la définir explicitement sur NULL lors de l’ingestion des données.</p>
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
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>)
<span class="highlighted-wrapper-line">            .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),</span>
    );

client.<span class="hljs-title function_ invoke__">create_collection</span>(
    CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">schema</span>(schema)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64).<span class="hljs-built_in">WithPrimaryKey</span>(<span class="hljs-literal">true</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});

<span class="hljs-comment">// Define schema fields</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema { Name = <span class="hljs-string">&quot;my_collection&quot;</span> };
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>)); <span class="hljs-comment">// Primary field</span>
schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FloatVector) { Dimension = <span class="hljs-number">4</span>, Nullable = <span class="hljs-literal">true</span> }); <span class="hljs-comment">// Enable the nullable attribute; defaults to false</span>

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq { CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>, Schema = schema });
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
  &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4},
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
<p>Dans ce schéma :</p>
<ul>
<li>Le champ « <code translate="no">embedding</code> » est explicitement marqué comme pouvant être nul.</li>
<li>Les entités peuvent omettre le champ « <code translate="no">embedding</code> » ou lui attribuer une valeur NULL lors de l’insertion.</li>
<li>La décision d’autoriser les valeurs NULL est prise au moment de la création de la collection.</li>
</ul>
<p>Par souci de clarté, les exemples suivants se concentrent sur un champ vectoriel pouvant prendre la valeur NULL (<code translate="no">embedding</code>). La définition de champs scalaires pouvant prendre la valeur NULL est facultative et n’est pas requise pour suivre la suite de ce guide.</p>
<p><details>
<summary>Facultatif : définir un champ scalaire pouvant prendre la valeur NULL</summary></p>
<p>Les champs scalaires peuvent également être définis comme pouvant prendre la valeur NULL à l’aide du même attribut ` <code translate="no">nullable</code> ` et suivent les mêmes règles lors de l’ingestion. Par exemple :</p>
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
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;age&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithNullable(<span class="hljs-literal">true</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = schema.<span class="hljs-title function_ invoke__">add_field</span>(
    FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;age&quot;</span>)
        .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
<span class="highlighted-wrapper-line">        .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;age&quot;</span>, milvus::DataType::INT64).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add to the fields array when calling createCollection:</span>
<span class="hljs-comment">// { name: &quot;age&quot;, data_type: DataType.Int64, nullable: true },</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

schema.Fields.Add(<span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;age&quot;</span>, DataType.Int64) { Nullable = <span class="hljs-literal">true</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Add another field object to the schema &quot;fields&quot; array, for example:</span>
<span class="hljs-comment"># { &quot;fieldName&quot;: &quot;age&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;nullable&quot;: true }</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Insert-behavior-with-missing-or-NULL-values" class="common-anchor-header">Comportement d’insertion en cas de valeurs manquantes ou NULL<button data-href="#Insert-behavior-with-missing-or-NULL-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois qu’un champ est défini comme pouvant prendre la valeur NULL dans le schéma de collection, Milvus autorise que la valeur du champ soit manquante ou explicitement définie sur NULL lors de l’ingestion des données.</p>
<p>L’exemple ci-dessous insère trois entités dans la collection créée dans la section « <a href="#Define-a-nullable-field-in-the-collection-schema">Définir un champ pouvant être nul dans le schéma de collection</a> », illustrant ces différents cas.</p>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rows</span> = <span class="hljs-built_in">vec!</span>[
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]}),
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: None::&lt;<span class="hljs-type">Vec</span>&lt;<span class="hljs-type">f32</span>&gt;&gt;}),
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>}),
];

client.<span class="hljs-title function_ invoke__">insert</span>(
    InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">rows</span>(rows)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

milvus::EntityRows data = {
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-literal">nullptr</span>}},
    {{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>}},
};

milvus::InsertResponse insert_response;
status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                            .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                        insert_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> List&lt;IDictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;&gt;
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">1L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> } },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">2L</span>, [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-literal">null</span> },   <span class="hljs-comment">// Explicitly set to NULL</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt; { [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">3L</span> },                         <span class="hljs-comment">// Field omitted; stored as NULL</span>
};

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    RowsData = data
});
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
<p>Dans cet exemple :</p>
<ul>
<li>L'entité <strong>id = 1</strong> fournit une valeur vectorielle valide.</li>
<li>L'entité <strong>id = 2</strong> attribue explicitement la valeur NULL au champ « <code translate="no">embedding</code> ».</li>
<li>L’entité <strong>id = 3</strong> omet complètement le champ « <code translate="no">embedding</code> » ; Milvus le stocke comme NULL.</li>
</ul>
<h2 id="Index-behavior-on-nullable-fields" class="common-anchor-header">Comportement de l'index sur les champs pouvant prendre la valeur NULL<button data-href="#Index-behavior-on-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Après l'insertion des données, vous pouvez créer un index sur un champ pouvant prendre la valeur NULL comme d'habitude. La principale différence réside dans la manière dont Milvus gère les valeurs NULL lors de la création de l'index :</p>
<ul>
<li>Seules les entités dont les valeurs ne sont pas NULL sont ajoutées à l’index.</li>
<li>Les entités comportant des valeurs NULL sont ignorées et ne participent pas à la création de l’index.</li>
</ul>
<p>Pour un champ vectoriel pouvant prendre la valeur NULL, cela signifie que seules les entités disposant de vecteurs valides peuvent faire l’objet d’une recherche par similarité vectorielle.</p>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client.<span class="hljs-title function_ invoke__">create_index</span>(
    CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_param</span>(
            IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">load_collection</span>(
    LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE))
                                .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Indexes = [<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding&quot;</span>, <span class="hljs-string">&quot;embedding_index&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)]
});

<span class="hljs-comment">// Load collection for future search operations</span>
<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq { CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span> });
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
<p>À ce stade :</p>
<ul>
<li>Les entités dont les valeurs d'embedding sont valides sont indexées et prêtes à être recherchées.</li>
<li>Les entités dont l'embedding est NULL restent dans la collection, mais elles ne sont pas incluses dans l'index vectoriel.</li>
</ul>
<h2 id="Search-behavior-with-nullable-fields" class="common-anchor-header">Comportement de recherche avec des champs pouvant prendre la valeur NULL<button data-href="#Search-behavior-with-nullable-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous effectuez des opérations de recherche sur un champ pouvant prendre la valeur NULL, Milvus n'évalue que les entités dont la valeur du champ utilisé dans la recherche est non nulle. Les entités dont le champ vectoriel est NULL sont automatiquement ignorées.</p>
<p>Pour un champ vectoriel pouvant prendre la valeur NULL, tel que « <code translate="no">embedding</code> » dans cet exemple :</p>
<ul>
<li>Seules les entités présentant des valeurs vectorielles valides sont évaluées et classées.</li>
<li>Les entités dont le vecteur est NULL ne provoquent pas d’erreur.</li>
<li>Si le nombre de vecteurs valides est inférieur au nombre d'<code translate="no">topK</code> s demandées (<code translate="no">limit</code>), Milvus peut renvoyer moins de résultats que <code translate="no">limit</code>.</li>
</ul>
<p>L'exemple suivant effectue une recherche vectorielle sur le champ vectoriel pouvant contenir des valeurs NULL <code translate="no">embedding</code>:</p>
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
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">search_results</span> = client.<span class="hljs-title function_ invoke__">search</span>(
    SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
        .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]]))
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;embedding&quot;</span>])
        .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> search_results.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">iter</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">get_output_rows</span>()? {
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>};
milvus::SearchResponse search_response;
status = client-&gt;<span class="hljs-built_in">Search</span>(milvus::<span class="hljs-built_in">SearchRequest</span>()
                            .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                            .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
                            .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                            .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
                            .<span class="hljs-built_in">AddFloatVector</span>(query_vector),
                        search_response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;embedding&quot;</span>,
    Vectors = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> }) },
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters { OutputFields = { <span class="hljs-string">&quot;embedding&quot;</span> } }
});

Console.WriteLine(res);
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
<p>Dans cette recherche :</p>
<ul>
<li>Seules les entités dont les valeurs « <code translate="no">embedding</code> » sont non nulles sont considérées comme candidates.</li>
<li>Les entités dont la valeur « <code translate="no">embedding</code> » est nulle sont exclues de l’évaluation.</li>
<li>Le nombre de résultats renvoyés dépend du nombre de vecteurs valides présents dans la collection.</li>
</ul>
<h2 id="Query-and-filtering-implications" class="common-anchor-header">Implications en matière de requêtes et de filtrage<button data-href="#Query-and-filtering-implications" class="anchor-icon" translate="no">
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
    </button></h2><p>Les exemples précédents se concentrent sur les champs vectoriels. Cette section décrit le comportement des valeurs NULL dans <strong>les expressions de filtrage scalaires</strong>.</p>
<p>Les champs scalaires peuvent être définis avec <code translate="no">nullable=True</code> et suivent les mêmes règles d’ingestion que les champs vectoriels. Cependant, <strong>les valeurs scalaires NULL sont toujours évaluées comme fausses dans les expressions de filtrage</strong>. Utilisez <code translate="no">IS NULL</code> ou <code translate="no">IS NOT NULL</code> pour sélectionner des entités en fonction de la valeur d’un champ scalaire (NULL ou non).</p>
<p>Par exemple, pour un champ scalaire pouvant prendre la valeur NULL <code translate="no">age</code>, le filtre suivant sélectionne les entités dont l’âge est supérieur à 18 :</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age &gt; 18&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use in query/search filter parameter, for example:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;age &gt; 18&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les entités pour lesquelles <code translate="no">age</code> est NULL sont exclues des résultats, car une valeur NULL ne satisfait pas à la condition du filtre.</p>
<p>De même, les vérifications d’égalité ne correspondent pas aux valeurs NULL. Par exemple :</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`status == &quot;active&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les entités pour lesquelles la valeur « <code translate="no">status</code> » est NULL sont exclues des résultats.</p>
<h2 id="Nullable-fields-and-default-values" class="common-anchor-header">Champs pouvant prendre la valeur NULL et valeurs par défaut<button data-href="#Nullable-fields-and-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsqu’un champ est configuré à la fois avec « <code translate="no">nullable</code> » et « <code translate="no">default_value</code> », les règles suivantes déterminent la manière dont Milvus gère les entrées NULL ou les valeurs de champ manquantes lors de l’insertion.</p>
<table>
<thead>
<tr><th>Nullable activé</th><th>Valeur par défaut</th><th>Saisie utilisateur (NULL ou omise)</th><th>Résultat</th></tr>
</thead>
<tbody>
<tr><td>Oui</td><td>Oui (non NULL)</td><td>NULL ou omis</td><td>Utilise la valeur par défaut</td></tr>
<tr><td>Oui</td><td>Non</td><td>NULL ou omis</td><td>Enregistré comme NULL</td></tr>
<tr><td>Non</td><td>Oui (non NULL)</td><td>NULL ou omis</td><td>Utilise la valeur par défaut</td></tr>
<tr><td>Non</td><td>Non</td><td>NULL ou omis</td><td>Génère une erreur</td></tr>
<tr><td>Non</td><td>Oui (NULL par défaut)</td><td>NULL ou omis</td><td>Génère une erreur</td></tr>
</tbody>
</table>
<p><strong>Points clés :</strong></p>
<ul>
<li>Lorsqu'un champ possède une valeur par défaut non NULL, cette valeur est utilisée, que l'option « <code translate="no">nullable</code> » soit activée ou non.</li>
<li>Lorsque l'<code translate="no">nullable=True</code> est activée mais qu'aucune valeur par défaut n'est définie, le champ stocke la valeur NULL.</li>
<li>Lorsqu'<code translate="no">nullable=False</code> est activé mais qu'aucune valeur par défaut n'est définie, l'insertion échoue et génère une erreur.</li>
<li>La définition d’une valeur par défaut NULL sur un champ non nul n’est pas valide et provoque une erreur.</li>
</ul>
<p>Pour des exemples complets et l’utilisation de l’API concernant les valeurs par défaut, consultez la section « <a href="/docs/fr/default-values.md">Valeurs par défaut</a> ».</p>
