---
id: primary-field.md
title: Campo principal e ID automático
summary: >-
  Todas las colecciones de Milvus deben tener un campo principal que identifique
  de forma única a cada entidad. Este campo garantiza que cada entidad pueda
  insertarse, actualizarse, consultarse o eliminarse sin ambigüedad alguna.
---
<h1 id="Primary-Field--AutoID" class="common-anchor-header">Campo principal e ID automático<button data-href="#Primary-Field--AutoID" class="anchor-icon" translate="no">
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
    </button></h1><p>Cada colección de Milvus debe tener un campo principal que identifique de forma única a cada entidad. Este campo garantiza que cada entidad pueda insertarse, actualizarse, consultarse o eliminarse sin ambigüedad.</p>
<p>Dependiendo de tu caso de uso, puedes dejar que Milvus genere automáticamente los identificadores (AutoID) o asignar tus propios identificadores manualmente.</p>
<h2 id="What-is-a-primary-field" class="common-anchor-header">¿Qué es un campo principal?<button data-href="#What-is-a-primary-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo primario actúa como clave única para cada entidad de una colección, de forma similar a una clave primaria en una base de datos tradicional. Milvus utiliza el campo primario para gestionar las entidades durante las operaciones de inserción, actualización, eliminación y consulta.</p>
<p>Requisitos clave:</p>
<ul>
<li><p>Cada colección debe tener <strong>exactamente un</strong> campo primario.</p></li>
<li><p>Los valores del campo primario no pueden ser nulos.</p></li>
<li><p>El tipo de datos debe especificarse en el momento de la creación y no puede modificarse posteriormente.</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Tipos de datos admitidos<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>El campo principal debe utilizar un tipo de datos escalar compatible que permita identificar de forma única a las entidades.</p>
<table>
   <tr>
     <th><p>Tipo de datos</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">INT64</code></p></td>
     <td><p>Tipo entero de 64 bits, que se utiliza habitualmente con AutoID. Es la opción recomendada para la mayoría de los casos de uso.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">VARCHAR</code></p></td>
     <td><p>Tipo de cadena de longitud variable. Utilízalo cuando los identificadores de entidades procedan de sistemas externos (por ejemplo, códigos de producto o ID de usuario). Requiere la propiedad « <code translate="no">max_length</code> » para definir el número máximo de bytes permitidos por valor.</p></td>
   </tr>
</table>
<h2 id="Choose-between-AutoID-and-Manual-IDs" class="common-anchor-header">Elige entre AutoID e ID manuales<button data-href="#Choose-between-AutoID-and-Manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite dos modos para asignar valores de clave primaria.</p>
<table>
   <tr>
     <th><p>Modo</p></th>
     <th><p>Descripción</p></th>
     <th><p>Recomendado para</p></th>
   </tr>
   <tr>
     <td><p>AutoID</p></td>
     <td><p>Milvus genera automáticamente identificadores únicos para las entidades insertadas o importadas.</p></td>
     <td><p>La mayoría de los casos en los que no es necesario gestionar los identificadores manualmente.</p></td>
   </tr>
   <tr>
     <td><p>ID manual</p></td>
     <td><p>Tú mismo proporcionas los identificadores únicos al insertar o importar datos.</p></td>
     <td><p>Cuando los identificadores deben coincidir con sistemas externos o conjuntos de datos preexistentes.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p>Si no estás seguro de qué modo elegir, <a href="/docs/es/primary-field.md#Quickstart-Use-AutoID">empieza con AutoID</a> para una ingesta más sencilla y una unicidad garantizada.</p></li>
<li><p>Se recomienda utilizar « <code translate="no">autoId</code> » en todos los casos, salvo que resulte ventajoso establecer manualmente las claves primarias.</p></li>
</ul>
</div>
<h2 id="Quickstart-Use-AutoID" class="common-anchor-header">Guía rápida: Utiliza AutoID<button data-href="#Quickstart-Use-AutoID" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede dejar que Milvus se encargue de generar los identificadores automáticamente.</p>
<h3 id="Step-1-Create-a-collection-with-AutoID" class="common-anchor-header">Paso 1: Crea una colección con AutoID<button data-href="#Step-1-Create-a-collection-with-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><p>Activa « <code translate="no">auto_id=True</code> » en la definición de tu campo principal. Milvus se encargará de generar los ID automáticamente.</p>
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define primary field with AutoID enabled</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-comment"># Primary field name</span></span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Milvus generates IDs automatically; Defaults to False</span></span>
<span class="highlighted-comment-line">    datatype=DataType.INT64</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
        Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
        APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect:&quot;</span>, err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := &amp;entity.Schema{
        CollectionName: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
        Fields: []*entity.Field{
                entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">true</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;embedding&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;category&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>),
    );

<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
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
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;Primary field&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;Vector field&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;Scalar field&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>));

status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define schema fields</span>
<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Primary field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Milvus generates IDs automatically</span>
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Vector field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;Scalar field&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-comment">// Create the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>), <span class="hljs-comment">// Milvus generates IDs automatically</span>
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding&quot;</span>, dimension: <span class="hljs-number">4</span>), <span class="hljs-comment">// Vector field</span>
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, maxLength: <span class="hljs-number">1000</span>) <span class="hljs-comment">// Scalar field of the VARCHAR type</span>
    }
};

<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span> })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span> });
}

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: true,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {}
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-Data" class="common-anchor-header">Paso 2: Insertar datos<button data-href="#Step-2-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Importante:</strong> No incluyas la columna del campo primario en tus datos. Milvus genera los identificadores automáticamente.</p>
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
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_autoid&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [461526052788333649, 461526052788333650]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

data := []any{
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
}

result, err := cli.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;demo_autoid&quot;</span>, data...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to insert:&quot;</span>, err)
}
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsInt64(i)
        fmt.Println(<span class="hljs-string">&quot;Generated ID:&quot;</span>, id)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>([
                serde_json::json!({<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>}),
                serde_json::json!({<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>}),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

milvus::EntityRows data = {{{<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>}},
                           {{<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_autoid&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data))
                                , response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> ids = response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">IdArray</span>().<span class="hljs-built_in">IntIDArray</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;book&quot;</span>
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;toy&quot;</span>
    }
};

MutationResp res = <span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;demo_autoid&quot;</span>,
    RowsData = data
});
Console.WriteLine(<span class="hljs-string">&quot;Generated IDs: &quot;</span> + <span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, res.LongIds ?? []));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_autoid\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Utiliza <code translate="no">upsert()</code> en lugar de <code translate="no">insert()</code> cuando trabajes con entidades existentes para evitar errores de ID duplicados.</p>
</div>
<h2 id="Use-manual-IDs" class="common-anchor-header">Utiliza identificadores manuales<button data-href="#Use-manual-IDs" class="anchor-icon" translate="no">
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
    </button></h2><p>Si necesitas controlar los ID manualmente, desactiva AutoID y proporciona tus propios valores.</p>
<h3 id="Step-1-Create-a-collection-without-AutoID" class="common-anchor-header">Paso 1: Crea una colección sin AutoID<button data-href="#Step-1-Create-a-collection-without-AutoID" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
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

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema()

<span class="hljs-comment"># Define the primary field without AutoID</span>
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;product_id&quot;</span>,</span>
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># You&#x27;ll provide IDs manually at data ingestion</span></span>
<span class="highlighted-comment-line">    datatype=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">100</span> <span class="hljs-comment"># Required when datatype is VARCHAR</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Define the other fields</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>) <span class="hljs-comment"># Vector field</span>
schema.add_field(field_name=<span class="hljs-string">&quot;category&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>) <span class="hljs-comment"># Scalar field of the VARCHAR type</span>

<span class="hljs-comment"># Create the collection</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
client.create_collection(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;product_id&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;category&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
        Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
        APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect:&quot;</span>, err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := &amp;entity.Schema{
        CollectionName: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
        Fields: []*entity.Field{
                entity.NewField().WithName(<span class="hljs-string">&quot;product_id&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithMaxLength(<span class="hljs-number">100</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;embedding&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>),
                entity.NewField().WithName(<span class="hljs-string">&quot;category&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">1000</span>),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;product_id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">100</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;category&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">1000</span>),
    );

<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;product_id&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">100</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;category&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">1000</span>));

status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                                    .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;product_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;category&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
});
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;product_id&quot;</span>, maxLength: <span class="hljs-number">100</span>, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">false</span>), <span class="hljs-comment">// You provide IDs manually</span>
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding&quot;</span>, dimension: <span class="hljs-number">4</span>), <span class="hljs-comment">// Vector field</span>
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;category&quot;</span>, maxLength: <span class="hljs-number">1000</span>) <span class="hljs-comment">// Scalar field of the VARCHAR type</span>
    }
};

<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span> })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span> });
}

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    Schema = schema
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> SCHEMA=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;product_id&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: true,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;100&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;embedding&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: &quot;4&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;category&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;isPrimary&quot;: false,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: &quot;1000&quot;
            }
        }
    ]
}&#x27;</span>

curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/collections/create&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data-with-your-IDs" class="common-anchor-header">Paso 2: Inserta datos con tus ID<button data-href="#Step-2-Insert-data-with-your-IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>Debes incluir la columna del campo primario en cada operación de inserción.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Each entity must contain the primary field `product_id`</span>
data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
]

res = client.insert(collection_name=<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Generated IDs:&quot;</span>, res.get(<span class="hljs-string">&quot;ids&quot;</span>))

<span class="hljs-comment"># Output example:</span>
<span class="hljs-comment"># Generated IDs: [&#x27;PROD-001&#x27;, &#x27;PROD-002&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.*;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-001&quot;</span>);
row1.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}));
row1.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>);
rows.add(row1);

<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-002&quot;</span>);
row2.add(<span class="hljs-string">&quot;embedding&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row2.addProperty(<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>);
rows.add(row2);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
        .data(rows)
        .build());
System.out.printf(<span class="hljs-string">&quot;Generated IDs: %s\n&quot;</span>, insertR.getPrimaryKeys());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

data = []any{
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
        <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}, <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
}

result, err = cli.Insert(ctx, milvusclient.NewRowBasedInsertOption(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>, data...))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to insert:&quot;</span>, err)
}
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsString(i)
        fmt.Println(<span class="hljs-string">&quot;Inserted ID:&quot;</span>, id)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>([
                serde_json::json!({<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>}),
                serde_json::json!({<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>}),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

milvus::EntityRows data = {{{<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-001&quot;</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;book&quot;</span>}},
                           {{<span class="hljs-string">&quot;product_id&quot;</span>, <span class="hljs-string">&quot;PROD-002&quot;</span>}, {<span class="hljs-string">&quot;embedding&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>}}, {<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-string">&quot;toy&quot;</span>}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;demo_manual_ids&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data))
                                , response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> string_ids = response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">IdArray</span>().<span class="hljs-built_in">StrIDArray</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-001&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>},
    {<span class="hljs-string">&quot;product_id&quot;</span>: <span class="hljs-string">&quot;PROD-002&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;toy&quot;</span>},
];

<span class="hljs-keyword">const</span> insert = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(insert);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Each entity must contain the primary field `product_id`</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;product_id&quot;</span>] = <span class="hljs-string">&quot;PROD-001&quot;</span>,
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;book&quot;</span>
    },
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;product_id&quot;</span>] = <span class="hljs-string">&quot;PROD-002&quot;</span>,
        [<span class="hljs-string">&quot;embedding&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> },
        [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;toy&quot;</span>
    }
};

MutationResp res = <span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;demo_manual_ids&quot;</span>,
    RowsData = data
});
Console.WriteLine(<span class="hljs-string">&quot;Generated IDs: &quot;</span> + <span class="hljs-built_in">string</span>.Join(<span class="hljs-string">&quot;, &quot;</span>, res.StringIds ?? []));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> INSERT_DATA=<span class="hljs-string">&#x27;[
    {
        &quot;product_id&quot;: &quot;PROD-001&quot;,
        &quot;embedding&quot;: [0.1, 0.2, 0.3, 0.4],
        &quot;category&quot;: &quot;book&quot;
    },
    {
        &quot;product_id&quot;: &quot;PROD-002&quot;,
        &quot;embedding&quot;: [0.2, 0.3, 0.4, 0.5],
        &quot;category&quot;: &quot;toy&quot;
    }
]&#x27;</span>

<span class="hljs-comment"># 插入数据</span>
curl -X POST <span class="hljs-string">&#x27;http://localhost:19530/v2/vectordb/entities/insert&#x27;</span> \
-H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;demo_manual_ids\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$INSERT_DATA</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tus responsabilidades:</p>
<ul>
<li><p>Asegúrate de que todos los ID sean únicos en todas las entidades</p></li>
<li><p>Incluir el campo primario en cada operación de inserción o importación</p></li>
<li><p>Gestionar tú mismo los conflictos de ID y la detección de duplicados</p></li>
</ul>
<h2 id="Advanced-usage" class="common-anchor-header">Uso avanzado<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Migrate-data-with-existing-AutoIDs" class="common-anchor-header">Migrar datos con AutoID existentes<button data-href="#Migrate-data-with-existing-AutoIDs" class="anchor-icon" translate="no">
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
    </button></h3><p>Para conservar los identificadores existentes durante la migración de datos, habilita la propiedad « <code translate="no">allow_insert_auto_id</code> » realizando la llamada « <code translate="no">alter_collection_properties</code> ». Cuando se establece en «true», Milvus acepta los identificadores proporcionados por el usuario incluso si el AutoID está habilitado.</p>
<p>Para obtener más detalles sobre la configuración, consulta <a href="/docs/es/modify-collection.md#Example-6-Enable-allowinsertautoid">«Modificar colección</a>».</p>
<h3 id="Ensure-global-AutoID-uniqueness-across-clusters" class="common-anchor-header">Garantiza la unicidad global de los AutoID entre clústeres<button data-href="#Ensure-global-AutoID-uniqueness-across-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Si se ejecutan varios clústeres de Milvus, configura un ID de clúster único para cada uno de ellos a fin de garantizar que los AutoID nunca se solapen.</p>
<p><strong>Configuración:</strong> Edita la configuración de « <code translate="no">common.clusterID</code> » en « <code translate="no">milvus.yaml</code> » antes de inicializar tu clúster:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">clusterID:</span> <span class="hljs-number">3</span>   <span class="hljs-comment"># Must be unique across all clusters (Range: 0-7)</span>
<button class="copy-code-btn"></button></code></pre>
<p>En esta configuración, « <code translate="no">clusterID</code> » especifica el identificador único utilizado en la generación de AutoID, con valores comprendidos entre 0 y 7 (admite hasta ocho clústeres).</p>
<div class="alert note">
<p>Milvus gestiona internamente la inversión de bits para permitir una futura expansión sin solapamiento de ID. No se necesita ninguna configuración manual más allá de establecer el ID del clúster.</p>
</div>
<h2 id="Reference-How-AutoID-works" class="common-anchor-header">Referencia: Cómo funciona el AutoID<button data-href="#Reference-How-AutoID-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Comprender cómo AutoID genera internamente identificadores únicos puede ayudarte a <a href="/docs/es/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">configurar</a> correctamente <a href="/docs/es/primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters">los ID de los clústeres</a> y a resolver problemas relacionados con los ID.</p>
<p>AutoID utiliza un formato estructurado de 64 bits para garantizar la unicidad:</p>
<pre><code translate="no" class="language-plaintext">[sign_bit][cluster_id][physical_ts][logical_ts]
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Segmento</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sign_bit</code></p></td>
     <td><p>Reservado para uso interno</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cluster_id</code></p></td>
     <td><p>Identifica qué clúster generó el identificador (rango de valores: 0-7)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">physical_ts</code></p></td>
     <td><p>Marca de tiempo en milisegundos en la que se generó el ID</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">logical_ts</code></p></td>
     <td><p>Contador para distinguir los ID creados en el mismo milisegundo</p></td>
   </tr>
</table>
<div class="alert note">
<p>Incluso cuando se habilita AutoID con « <code translate="no">VARCHAR</code> » como tipo de datos, Milvus sigue generando ID numéricos. Estos se almacenan como cadenas numéricas con una longitud máxima de 20 caracteres (rango uint64).</p>
</div>
