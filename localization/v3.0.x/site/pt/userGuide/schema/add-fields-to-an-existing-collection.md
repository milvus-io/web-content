---
id: add-fields-to-an-existing-collection.md
title: Alterar o esquema da coleção
summary: >-
  Altere um esquema de coleção existente, adicionando ou eliminando campos
  definidos pelo utilizador ou funções, juntamente com os respetivos campos
  vetoriais gerados.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Alterar o esquema da coleção<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>À medida que uma coleção passa da fase de desenvolvimento para a de produção, o seu esquema sofre frequentemente alterações. Pode adicionar campos escalares, tais como « <code translate="no">source_uri</code> » ou « <code translate="no">review_status</code> », para fins de filtragem e lógica de aplicação; adicionar um novo campo vetorial para embeddings gerados pela sua aplicação; adicionar uma função BM25 e o seu campo vetorial esparso gerado para pesquisa lexical em texto existente; ou remover campos e funções que já não são utilizados. A opção «Alterar Esquema da Coleção» permite-lhe efetuar alterações suportadas em campos e funções no próprio local, em vez de recriar a coleção.</p>
<div class="alert note">
<p>Este guia aborda alterações no esquema para campos definidos pelo utilizador e para funções com os seus campos vetoriais gerados em coleções geridas. Para adicionar um campo a uma coleção externa, consulte <a href="/docs/pt/alter-external-collection-schema.md">«Alterar o esquema de uma coleção externa</a>». Para alterações nas propriedades dos campos, tais como alterar « <code translate="no">max_length</code> » num campo « <code translate="no">VARCHAR</code> » ou « <code translate="no">max_capacity</code> » num campo « <code translate="no">ARRAY</code> », consulte <a href="/docs/pt/alter-collection-field.md">«Alterar campo da coleção</a>». Para o comportamento dinâmico dos campos, consulte <a href="/docs/pt/enable-dynamic-field.md">«Campo dinâmico</a> » e <a href="/docs/pt/modify-collection.md">«Modificar coleção</a>».</p>
</div>
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
    </button></h2><p><strong>Adicionar campos definidos pelo utilizador</strong></p>
<ul>
<li><p>Os campos definidos pelo utilizador adicionados têm de ser nulos. Defina <code translate="no">nullable=True</code> ao chamar <code translate="no">add_collection_field()</code>. Para entidades existentes, o campo adicionado é <code translate="no">NULL</code>, a menos que adicione um campo escalar com um <code translate="no">default_value</code>.</p></li>
<li><p>A adição de campos escalares definidos pelo utilizador é suportada no Milvus 2.6.x e versões posteriores. A adição de campos vetoriais definidos pelo utilizador é suportada no Milvus 2.6.18 e versões posteriores.</p></li>
</ul>
<ul>
<li>A adição de campos StructArray é suportada no Milvus 3.0.0 e versões posteriores. Os campos StructArray adicionados devem ser nulos.</li>
</ul>
<ul>
<li>Os nomes dos campos devem ser únicos entre os campos da coleção.</li>
</ul>
<p><strong>Adicionar uma função e o seu campo vetorial gerado</strong></p>
<ul>
<li><p>Cada atualização do esquema pode adicionar apenas uma função e um campo vetorial gerado.</p></li>
<li><p>A função suportada determina o tipo do campo vetorial gerado: « <code translate="no">BM25</code> » gera um campo « <code translate="no">SPARSE_FLOAT_VECTOR</code> », e « <code translate="no">MINHASH</code> » gera um campo « <code translate="no">BINARY_VECTOR</code> ».</p></li>
<li><p>O campo vetorial gerado deve ser um campo novo. Não pode apontar para um campo que já exista no esquema da coleção.</p></li>
<li><p>O campo vetorial gerado não pode ser nulo.</p></li>
<li><p>Os campos de entrada utilizados pela Função devem já existir na coleção.</p></li>
<li><p>Ao adicionar uma função BM25 ou MinHash a uma coleção existente, a entrada da função deve ser um campo « <code translate="no">VARCHAR</code> ». Uma entrada « <code translate="no">TEXT</code> » não é suportada neste fluxo de trabalho, porque o Milvus não consegue preencher retroativamente a saída gerada para entidades existentes a partir desse tipo de entrada.</p></li>
</ul>
<p><strong>Eliminar campos definidos pelo utilizador</strong></p>
<ul>
<li><p>Não é possível eliminar o campo de chave primária, o campo de chave de partição, o campo de chave de agrupamento ou o último campo vetorial de uma coleção.</p></li>
<li><p>É possível eliminar um campo « <code translate="no">ARRAY&lt;STRUCT&gt;</code> » na totalidade, mas não é possível eliminar um subcampo individual dentro de um campo « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>Não é possível eliminar diretamente um campo que seja utilizado como campo de entrada de uma função ou gerado como campo de saída de uma função. Para remover um campo de saída de uma função, elimine a função que o gera.</p></li>
</ul>
<p><strong>Eliminar uma função e o seu campo vetorial gerado</strong></p>
<ul>
<li><p>Neste fluxo de trabalho de alteração de esquema, eliminar uma Função remove a Função, o seu campo vetorial gerado e o índice associado. Os campos de entrada da Função permanecem no esquema da coleção.</p></li>
<li><p>A remoção de uma função é rejeitada se a remoção do seu campo vetorial gerado deixar a coleção sem qualquer campo vetorial.</p></li>
</ul>
<div class="alert note">
<p>Para alterações de esquema fora das operações de adição e eliminação suportadas, recrie ou migre a coleção.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Adicionar campos e funções a uma coleção existente<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha o fluxo de trabalho consoante esteja a adicionar um campo definido pelo utilizador ou uma função que gere um campo vetorial:</p>
<ul>
<li><p><a href="#Add-user-defined-scalar-fields--Milvus-26x">Adicione campos escalares definidos pelo utilizador</a> quando precisar de novos metadados para filtragem, resultados de consultas ou lógica de aplicação.</p></li>
<li><p><a href="#Add-StructArray-fields--Milvus-300">Adicione campos StructArray</a> quando precisar de um campo de matriz cujos elementos partilhem o mesmo esquema Struct.</p></li>
<li><p><a href="#Add-user-defined-vector-fields--Milvus-2618">Adicione campos vetoriais definidos pelo utilizador</a> quando a sua aplicação gerar embeddings e gravar valores vetoriais no Milvus.</p></li>
<li><p><a href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x">Adicione uma função e o seu campo vetorial gerado</a> quando o Milvus tiver de gerar valores vetoriais a partir de campos existentes, tais como vetores esparsos BM25 ou assinaturas MinHash a partir de texto.</p></li>
</ul>
<p>Em todos os casos, o nome do novo campo não pode já existir na coleção e o número total de campos não pode exceder o limite de contagem de campos do Milvus. Para mais detalhes, consulte <a href="/docs/pt/limitations.md#number-of-resources-in-a-collection">os Limites do Milvus</a>.</p>
<h3 id="Add-user-defined-scalar-fields" class="common-anchor-header">Adicionar campos escalares definidos pelo utilizador<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize « <code translate="no">add_collection_field()</code> » para adicionar um campo escalar definido pelo utilizador a uma coleção existente.</p>
<p>Isto difere do armazenamento de chaves arbitrárias no campo dinâmico: após a atualização do esquema estar disponível, o novo campo escalar torna-se parte integrante do esquema da coleção. Pode inserir ou atualizar valores nesse campo, criar índices nos casos em que tal seja suportado, utilizá-lo em consultas e filtros de pesquisa e apresentá-lo nos resultados de consultas ou pesquisas.</p>
<p>Como as entidades existentes foram inseridas antes de o novo campo existir, todos os campos escalares definidos pelo utilizador adicionados têm de ser nulos:</p>
<ul>
<li><p>Se adicionar um campo escalar com ` <code translate="no">nullable=True</code> ` e sem ` <code translate="no">default_value</code>`, as entidades existentes devolvem ` <code translate="no">NULL</code> ` para o novo campo.</p></li>
<li><p>Se adicionar um campo escalar com « <code translate="no">nullable=True</code> » e « <code translate="no">default_value</code> », as entidades existentes devolvem o valor predefinido em vez de « <code translate="no">NULL</code> ».</p></li>
</ul>
<p>As expressões de filtro escalares não correspondem a valores escalares <code translate="no">NULL</code>. Para mais detalhes, consulte <a href="/docs/pt/nullable-and-default.md">Campos nulos</a>.</p>
<p><strong>Exemplo: Adicionar um campo escalar nulo</strong></p>
<p>O exemplo seguinte adiciona um campo escalar nulo <code translate="no">source</code> a uma coleção existente denominada <code translate="no">product_catalog</code>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFunctionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropFunctionFieldReq;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;source&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">128</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;source&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">128</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;
client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;source&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">128</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;source&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">128</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;source&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">128</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;source&quot;</span>, maxLength: <span class="hljs-number">128</span>, nullable: <span class="hljs-literal">true</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;source&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 128
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Após a adição do campo, as entidades que já existiam na coleção devolvem ` <code translate="no">NULL</code> ` para ` <code translate="no">source</code>`. As novas entidades podem definir ` <code translate="no">source</code> ` durante a inserção ou atualização.</p>
<p><strong>Exemplo: Adicionar um campo escalar com um valor por defeito</strong></p>
<p>Se as entidades existentes deverem devolver um valor concreto em vez de « <code translate="no">NULL</code> », especifique « <code translate="no">default_value</code> » ao adicionar um campo escalar. O exemplo seguinte adiciona um campo « <code translate="no">review_status</code> » e utiliza « <code translate="no">&quot;unreviewed&quot;</code> » como valor predefinido.</p>
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
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;review_status&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">32</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .defaultValue(<span class="hljs-string">&quot;unreviewed&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;review_status&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">32</span>).
    WithDefaultValueString(<span class="hljs-string">&quot;unreviewed&quot;</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;review_status&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
                    .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">32</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                    .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;review_status&quot;</span>, milvus::DataType::VARCHAR)
                                .<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">32</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                .<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-string">&quot;unreviewed&quot;</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;review_status&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">32</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default_value</span>: <span class="hljs-string">&quot;unreviewed&quot;</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;review_status&quot;</span>, maxLength: <span class="hljs-number">32</span>, nullable: <span class="hljs-literal">true</span>, defaultValue: <span class="hljs-string">&quot;unreviewed&quot;</span>)
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;review_status&quot;,
         &quot;dataType&quot;: &quot;VarChar&quot;,
         &quot;nullable&quot;: true,
         &quot;defaultValue&quot;: &quot;unreviewed&quot;,
         &quot;elementTypeParams&quot;: {
           &quot;max_length&quot;: 32
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Após a adição do campo, as entidades que já existiam na coleção devolvem <code translate="no">&quot;unreviewed&quot;</code> para <code translate="no">review_status</code>. As novas entidades podem definir um valor diferente ou utilizar o valor predefinido quando não for fornecido qualquer valor.</p>
<h3 id="Add-StructArray-fields" class="common-anchor-header">Adicionar campos StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize <code translate="no">add_collection_struct_field()</code> para adicionar um campo StructArray que aceite matrizes de elementos Struct. Para adicionar um campo StructArray, proceda da seguinte forma:</p>
<ol>
<li><p>Crie um esquema Struct que contenha os subcampos necessários dos tipos de dados suportados. Para os tipos de dados aplicáveis, consulte <a href="/docs/pt/structarray-limits.md#Supported-subfield-data-types">Limites</a> do <a href="/docs/pt/structarray-limits.md#Supported-subfield-data-types">StructArray</a>.</p></li>
<li><p>Faça referência ao esquema Struct criado acima e defina a capacidade máxima do campo em « <code translate="no">add_collection_struct_field()</code> ».</p></li>
<li><p>Defina ` <code translate="no">nullable=True</code> ` na solicitação.</p></li>
</ol>
<p><strong>Exemplo: Adicionar um campo StructArray nulo</strong></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a struct schema</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># add a scalar field to the struct</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># add a vector field to the struct with mmap enabled</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span></span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
Map&lt;String, String&gt; mmapParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
mmapParams.put(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;books&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .maxCapacity(<span class="hljs-number">1024</span>)
        .nullable(<span class="hljs-literal">true</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(<span class="hljs-number">5</span>)
                .typeParams(mmapParams)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
structSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">512</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;text_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;chapter_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">5</span>).WithTypeParams(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;chunks&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithNullable(<span class="hljs-literal">true</span>).
    WithMaxCapacity(<span class="hljs-number">1024</span>).
    WithStructSchema(structSchema)
err = client.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption(<span class="hljs-string">&quot;books&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add struct field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">struct_schema</span> = StructFieldSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
    .<span class="hljs-title function_ invoke__">max_capacity</span>(<span class="hljs-number">1024</span>)
    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">512</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>)
            .<span class="hljs-title function_ invoke__">type_params</span>(
                std::collections::HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;mmap.enabled&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;true&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]),
            ),
    );
client
    .<span class="hljs-title function_ invoke__">add_collection_struct_field</span>(
        AddCollectionStructFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;books&quot;</span>)
            .<span class="hljs-title function_ invoke__">struct_field</span>(struct_schema)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>
milvus::StructFieldSchema struct_schema = milvus::<span class="hljs-built_in">StructFieldSchema</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
                                              .<span class="hljs-built_in">WithMaxCapacity</span>(<span class="hljs-number">1024</span>)
                                              .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>)
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">512</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>))
                                              .<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;chapter_vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>).<span class="hljs-built_in">AddTypeParam</span>(<span class="hljs-string">&quot;mmap.enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>));
status = client-&gt;<span class="hljs-built_in">AddCollectionStructField</span>(
    milvus::<span class="hljs-built_in">AddCollectionStructFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;books&quot;</span>).<span class="hljs-built_in">WithStructField</span>(std::<span class="hljs-built_in">move</span>(struct_schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create a struct schema and add its subfields</span>
<span class="hljs-comment">// add a vector subfield with mmap enabled</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;Array&quot;</span>,
        <span class="hljs-attr">element_type</span>: <span class="hljs-string">&quot;Struct&quot;</span>,
        <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1024</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">fields</span>: [
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>, <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
            { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter_vector&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span> },
        ],
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Create a struct schema</span>
<span class="hljs-keyword">var</span> structSchema = <span class="hljs-keyword">new</span> StructFieldSchema(<span class="hljs-string">&quot;chunks&quot;</span>)
{
    MaxCapacity = <span class="hljs-number">1024</span>,
    Nullable = <span class="hljs-literal">true</span>
};

<span class="hljs-comment">// add a scalar field to the struct</span>
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">65535</span>));
structSchema.Fields.Add(FieldSchema.CreateVarchar(<span class="hljs-string">&quot;chapter&quot;</span>, maxLength: <span class="hljs-number">512</span>));

<span class="hljs-comment">// add a vector field to the struct with mmap enabled</span>
<span class="hljs-keyword">var</span> textVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;text_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
textVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(textVector);

<span class="hljs-keyword">var</span> chapterVector = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;chapter_vector&quot;</span>, dimension: <span class="hljs-number">5</span>);
chapterVector.TypeParams[<span class="hljs-string">&quot;mmap.enabled&quot;</span>] = <span class="hljs-string">&quot;true&quot;</span>;
structSchema.Fields.Add(chapterVector);

<span class="hljs-keyword">await</span> client.AddCollectionStructFieldAsync(<span class="hljs-keyword">new</span> AddCollectionStructFieldReq
{
    CollectionName = <span class="hljs-string">&quot;books&quot;</span>,
    StructField = structSchema
});
<button class="copy-code-btn"></button></code></pre>
<p>Após a adição do campo StructArray, as entidades já existentes na coleção devolvem « <code translate="no">NULL</code> » para « <code translate="no">chunks</code> » em todos os seus subcampos. Ao inserir uma nova entidade, certifique-se de que todos os subcampos estão definidos como « <code translate="no">NULL</code> » ou têm valores válidos. A inserção de uma entidade com alguns subcampos definidos como « <code translate="no">NULL</code> » e outros com valores válidos resulta em erros.</p>
<h3 id="Add-user-defined-vector-fields" class="common-anchor-header">Adicionar campos vetoriais definidos pelo utilizador<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize <code translate="no">add_collection_field()</code> para adicionar um campo vetorial definido pelo utilizador quando a sua aplicação gerar embeddings e gravar valores vetoriais no Milvus.</p>
<p>Todos os campos vetoriais definidos pelo utilizador adicionados têm de ser nulos. As entidades existentes têm o valor « <code translate="no">NULL</code> » para o novo campo vetorial até que escreva valores vetoriais através de um «upsert» ou de um fluxo de trabalho de preenchimento retroativo. As novas entidades podem incluir o campo vetorial durante a inserção. A pesquisa vetorial ignora as entidades cujo valor vetorial seja « <code translate="no">NULL</code> ». Para mais detalhes, consulte <a href="/docs/pt/nullable-and-default.md">Campos nulos</a>.</p>
<p><strong>Exemplo: Adicionar um campo vetorial nulo</strong></p>
<p>O exemplo seguinte adiciona um campo vetorial denso nulo denominado « <code translate="no">embedding_v2</code> » a uma coleção existente. Defina « <code translate="no">dim</code> » de acordo com a dimensionalidade das incorporações geradas pela sua aplicação.</p>
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
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .isNullable(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">newField := entity.NewField().
    WithName(<span class="hljs-string">&quot;embedding_v2&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithNullable(<span class="hljs-literal">true</span>).
    WithDim(<span class="hljs-number">768</span>)
err = client.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, newField))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">add_collection_field</span>(
        AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
                    .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                    .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">milvus::FieldSchema field = milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>, milvus::DataType::FLOAT_VECTOR)
                                .<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">768</span>)
                                .<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>);
status = client-&gt;<span class="hljs-built_in">AddCollectionField</span>(
    milvus::<span class="hljs-built_in">AddCollectionFieldRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(field)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
        <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> embeddingV2 = FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;embedding_v2&quot;</span>, dimension: <span class="hljs-number">768</span>);
embeddingV2.Nullable = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">await</span> client.AddCollectionFieldAsync(<span class="hljs-keyword">new</span> AddCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = embeddingV2
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/fields/add&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;schema&quot;: {
         &quot;fieldName&quot;: &quot;embedding_v2&quot;,
         &quot;dataType&quot;: &quot;FloatVector&quot;,
         &quot;nullable&quot;: true,
         &quot;elementTypeParams&quot;: {
           &quot;dim&quot;: 768
         }
       }
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Depois de adicionar o campo, crie um índice no novo campo vetorial antes de o pesquisar:</p>
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
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOpt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, index.NewAutoIndex(entity.COSINE))
_, err = client.CreateIndex(ctx, indexOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to create index: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">create_index</span>(
        CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_param</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;embedding_v2&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Cosine),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index_desc</span><span class="hljs-params">(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)</span></span>;
status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(
    milvus::<span class="hljs-built_in">CreateIndexRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>).<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(index_desc)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding_v2&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;embedding_v2&quot;</span>, <span class="hljs-string">&quot;embedding_v2&quot;</span>, IndexType.AutoIndex, MetricType.Cosine)
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
     --url <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/indexes/create&quot;</span> \
     --header <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
     --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;product_catalog&quot;,
       &quot;indexParams&quot;: [
         {
           &quot;fieldName&quot;: &quot;embedding_v2&quot;,
           &quot;params&quot;: {&quot;index_type&quot;: &quot;AUTOINDEX&quot;},
           &quot;metricType&quot;: &quot;COSINE&quot;
         }
       ]
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>As entidades existentes têm um valor « <code translate="no">NULL</code> » para « <code translate="no">embedding_v2</code> » e são ignoradas quando se efetua uma pesquisa neste campo. Para tornar as entidades existentes pesquisáveis através de « <code translate="no">embedding_v2</code> », escreva valores vetoriais diferentes de NULL através de um fluxo de trabalho de «upsert» ou de «backfill». As novas entidades podem incluir « <code translate="no">embedding_v2</code> » durante a inserção.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field" class="common-anchor-header">Adicionar uma função e o seu campo vetorial gerado<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize este fluxo de trabalho quando o Milvus tiver de gerar um novo campo vetorial a partir de dados já armazenados numa coleção existente. A operação adiciona três elementos de esquema relacionados:</p>
<ul>
<li><p>Uma definição de função que lê a partir de um ou mais campos de entrada existentes.</p></li>
<li><p>Um novo campo vetorial que armazena a saída da função.</p></li>
<li><p>Uma definição de índice associada ao novo campo vetorial.</p></li>
</ul>
<p>Por exemplo, uma função BM25 lê um campo existente « <code translate="no">VARCHAR</code> » e gera um campo « <code translate="no">SPARSE_FLOAT_VECTOR</code> » para pesquisa lexical. Uma função MinHash gera um campo « <code translate="no">BINARY_VECTOR</code> » para deteção de quase-duplicados. Este fluxo de trabalho não adiciona nem substitui o campo de entrada da função.</p>
<div class="alert note">
<p>Esta funcionalidade requer o Storage V3. Para obter instruções de ativação e considerações de compatibilidade, consulte <a href="/docs/pt/storage-v3.md">Storage V3</a>.</p>
</div>
<p>Adicionar uma função e o seu campo vetorial gerado a uma coleção existente também requer a compactação da versão do esquema e a compactação da versão de armazenamento. O Milvus rejeita o pedido se qualquer uma destas definições estiver desativada. Estes pré-requisitos adicionais aplicam-se apenas ao modificar uma coleção existente; a definição da função no esquema inicial da coleção não utiliza este fluxo de trabalho de preenchimento de dados existentes.</p>
<p>A Função suportada determina o tipo de campo vetorial gerado:</p>
<table>
<thead>
<tr><th>Função</th><th>Tipo de campo vetorial gerado</th><th>Campo de entrada típico</th><th>Caso de utilização típico</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Um campo « <code translate="no">VARCHAR</code> » com o analisador ativado</td><td>Pesquisa lexical e relevância de palavras-chave</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Um campo « <code translate="no">VARCHAR</code> »</td><td>Detecção de quase-duplicados</td></tr>
</tbody>
</table>
<p>Para obter detalhes sobre o funcionamento de cada função, consulte a <a href="/docs/pt/bm25-function.md">Função BM25</a> e <a href="/docs/pt/minhash-function.md">a Função MinHash</a>.</p>
<p>O campo vetorial gerado não pode já existir na coleção e não pode ser nulo. O campo de entrada da função já tem de existir.</p>
<p><strong>Exemplo: Adicionar uma função BM25 e o seu campo vetorial esparso gerado</strong></p>
<p>O exemplo seguinte adiciona uma função BM25 denominada « <code translate="no">text_bm25</code> » e o seu campo vetorial esparso gerado, denominado « <code translate="no">text_sparse</code> », a uma coleção existente. A coleção deve já possuir um campo « <code translate="no">VARCHAR</code> » denominado « <code translate="no">text</code> », com o analisador ativado.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python">sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client.addFunctionField(AddFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .indexParam(IndexParam.builder()
                .fieldName(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
                .metricType(IndexParam.MetricType.BM25)
                .build())
        .function(CreateCollectionReq.Function.builder()
                .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                .functionType(FunctionType.BM25)
                .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
                .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse&quot;</span>))
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
field := entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector)
function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithType(entity.FunctionTypeBM25).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse&quot;</span>)
boundIndex := index.NewSparseInvertedIndex(entity.BM25, <span class="hljs-number">0.2</span>)
err = client.AddFunctionField(ctx, milvusclient.NewAddFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, field, function, boundIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to add function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
client
    .<span class="hljs-title function_ invoke__">add_function_field</span>(
        AddFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field</span>(
                FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector),
            )
            .<span class="hljs-title function_ invoke__">function</span>(
                Function::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
                    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Bm25)
                    .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;text&quot;</span>])
                    .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;text_sparse&quot;</span>]),
            )
            .<span class="hljs-title function_ invoke__">index</span>(
                IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>)
                    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
                    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Bm25),
            )
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>
<span class="hljs-function">milvus::FieldSchema <span class="hljs-title">sparse_field</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR)</span></span>;
milvus::FunctionPtr function = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::Function&gt;(<span class="hljs-string">&quot;text_bm25&quot;</span>, milvus::FunctionType::BM25);
function-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;text&quot;</span>);
function-&gt;<span class="hljs-built_in">AddOutputFieldName</span>(<span class="hljs-string">&quot;text_sparse&quot;</span>);
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">index</span><span class="hljs-params">(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25)</span></span>;
status = client-&gt;<span class="hljs-built_in">AddFunctionField</span>(milvus::<span class="hljs-built_in">AddFunctionFieldRequest</span>()
                                      .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                      .<span class="hljs-built_in">WithField</span>(std::<span class="hljs-built_in">move</span>(sparse_field))
                                      .<span class="hljs-built_in">WithFunction</span>(function)
                                      .<span class="hljs-built_in">WithIndex</span>(std::<span class="hljs-built_in">move</span>(index)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Add a BM25 function, its generated sparse vector field, and the bound index</span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;SparseFloatVector&quot;</span>,
    },
    <span class="hljs-attr">function</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;text&quot;</span>],
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;text_sparse&quot;</span>],
    },
    <span class="hljs-attr">extra_params</span>: {
        <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
            <span class="hljs-attr">bm25_k1</span>: <span class="hljs-number">1.2</span>,
            <span class="hljs-attr">bm25_b</span>: <span class="hljs-number">0.75</span>,
        },
    },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.AddFunctionFieldAsync(<span class="hljs-keyword">new</span> AddFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    Field = FieldSchema.CreateSparseFloatVector(<span class="hljs-string">&quot;text_sparse&quot;</span>, description: <span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>),
    Function = FunctionSchema.CreateBm25(<span class="hljs-string">&quot;text_bm25&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>),
    IndexParam = <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;text_sparse&quot;</span>, <span class="hljs-string">&quot;text_sparse&quot;</span>, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>, [<span class="hljs-string">&quot;bm25_k1&quot;</span>] = <span class="hljs-string">&quot;1.2&quot;</span>, [<span class="hljs-string">&quot;bm25_b&quot;</span>] = <span class="hljs-string">&quot;0.75&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<p>O objeto ` <code translate="no">index_params</code> ` deve conter exatamente uma definição de índice para o novo campo de saída `Function`. O Milvus adiciona a função, o seu campo vetorial gerado e a definição de índice associada na mesma alteração de esquema. Não chame ` <code translate="no">create_index()</code> ` separadamente após ` <code translate="no">add_function_field()</code>`.</p>
<p>Conceitualmente, esta operação adiciona as seguintes definições de «Function», de campo de saída gerado e de índice associado:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>Após o sucesso do pedido, <code translate="no">describe_collection()</code> devolve tanto a nova função « <code translate="no">text_bm25</code> » como o seu campo vetorial gerado « <code translate="no">text_sparse</code> » no esquema da coleção. O Milvus gera a saída da função para novas entidades à medida que estas são gravadas. Para as entidades existentes, o Milvus preenche o campo vetorial gerado de forma assíncrona através de uma compactação em segundo plano. A visibilidade do esquema confirma que a atualização do esquema foi bem-sucedida, mas não indica que o preenchimento retroativo tenha sido concluído para todas as entidades existentes. Para o fluxo de trabalho completo de pesquisa BM25, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de Texto Completo</a>.</p>
<p>O Milvus também suporta funções MinHash e os seus campos vetoriais binários gerados para a deteção de quase-duplicados. Uma função MinHash utiliza um <code translate="no">FunctionType.MINHASH</code> e e grava num novo campo de saída « <code translate="no">BINARY_VECTOR</code> ». Para obter detalhes sobre a configuração, consulte <a href="/docs/pt/minhash-function.md">«Função MinHash</a>».</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Remover campos e funções de uma coleção existente<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode remover campos definidos pelo utilizador diretamente quando estes já não fizerem parte do seu modelo de coleção. Para remover uma função e o campo vetorial por ela gerado, elimine a função; o Milvus remove o campo gerado e o seu índice na mesma alteração de esquema.</p>
<h3 id="Drop-user-defined-fields" class="common-anchor-header">Eliminar campos definidos pelo utilizador<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize « <code translate="no">drop_collection_field()</code> » para remover um campo escalar, vetorial ou StructArray definido pelo utilizador que já não faça parte do seu modelo de coleção.</p>
<p>A eliminação de um campo altera, em primeiro lugar, o esquema da coleção e a visibilidade do campo:</p>
<ul>
<li><p>Após o sucesso de « <code translate="no">drop_collection_field()</code> », o esquema da coleção é atualizado: « <code translate="no">describe_collection()</code> » já não devolve o campo eliminado, e as consultas ou pesquisas já não podem devolver o campo em « <code translate="no">output_fields</code> » nem utilizá-lo em expressões.</p></li>
<li><p>Os índices criados no campo eliminado são removidos como parte da atualização do esquema.</p></li>
</ul>
<p>A limpeza do armazenamento é tratada separadamente da limpeza do esquema. Para mais detalhes, consulte <a href="#When-is-storage-space-reclaimed-after-dropping-a-field">«Quando é que o espaço de armazenamento é recuperado após a eliminação de um campo?</a>».</p>
<p><strong>Exemplo: Eliminar um campo escalar definido pelo utilizador</strong></p>
<p>O exemplo seguinte pressupõe que « <code translate="no">experiment_tag</code> » é um campo escalar definido pelo utilizador em « <code translate="no">product_catalog</code> » e elimina-o da coleção.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;experiment_tag&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;experiment_tag&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;experiment_tag&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;experiment_tag&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Após eliminar um campo, pode chamar ` <code translate="no">describe_collection()</code> ` para verificar se o campo já não faz parte do esquema.</p>
<p><strong>Exemplo: Remover um campo StructArray</strong></p>
<p>O exemplo seguinte pressupõe que ` <code translate="no">chunks</code> ` é um campo `StructArray` em ` <code translate="no">my_collection</code>` e remove-o da coleção.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;chunks&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;chunks&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;chunks&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    FieldName = <span class="hljs-string">&quot;chunks&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemplo: Remover um campo vetorial definido pelo utilizador</strong></p>
<p>Pode eliminar um campo vetorial com o mesmo método <code translate="no">drop_collection_field()</code>, mas a coleção deve continuar a conter, pelo menos, um campo vetorial após a eliminação. Isto é útil para coleções que contêm temporariamente várias representações vetoriais e que, posteriormente, se padronizam numa delas.</p>
<p>O exemplo seguinte pressupõe que ` <code translate="no">image_vector</code> ` é um campo vetorial definido pelo utilizador em ` <code translate="no">hybrid_catalog</code>`, e que a coleção ainda mantém outro campo vetorial, como ` <code translate="no">text_vector</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;image_vector&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>, <span class="hljs-string">&quot;image_vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_collection_field</span>(
        DropCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropCollectionField</span>(milvus::<span class="hljs-built_in">DropCollectionFieldRequest</span>()
                                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hybrid_catalog&quot;</span>)
                                         .<span class="hljs-built_in">WithFieldName</span>(<span class="hljs-string">&quot;image_vector&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;image_vector&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropCollectionFieldAsync(<span class="hljs-keyword">new</span> DropCollectionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;hybrid_catalog&quot;</span>,
    FieldName = <span class="hljs-string">&quot;image_vector&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">image_vector</code> for o último campo vetorial da coleção, a operação de remoção é rejeitada.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Eliminar uma função e o seu campo vetorial gerado<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize esta operação quando já não precisar de uma função ou do seu campo vetorial gerado, como, por exemplo, uma função BM25 e o seu campo vetorial esparso gerado.</p>
<p>Chame <code translate="no">drop_function_field()</code> com o nome da função. O Milvus remove a função, o seu campo vetorial gerado e o índice associado, preservando os campos de entrada da função.</p>
<p><strong>Exemplo: Eliminar uma função BM25 e o seu campo vetorial esparso gerado</strong></p>
<p>O exemplo seguinte pressupõe que « <code translate="no">text_bm25</code> » é uma função BM25 em « <code translate="no">product_catalog</code> » e gera um campo de saída de vetores esparsos denominado « <code translate="no">text_sparse</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.dropFunctionField(DropFunctionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_catalog&quot;</span>)
        .functionName(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.DropFunctionField(ctx, milvusclient.NewDropFunctionFieldOption(<span class="hljs-string">&quot;product_catalog&quot;</span>, <span class="hljs-string">&quot;text_bm25&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop function field: &quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client
    .<span class="hljs-title function_ invoke__">drop_function_field</span>(
        DropFunctionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
            .<span class="hljs-title function_ invoke__">function_name</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropFunctionField</span>(milvus::<span class="hljs-built_in">DropFunctionFieldRequest</span>()
                                       .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;product_catalog&quot;</span>)
                                       .<span class="hljs-built_in">WithFunctionName</span>(<span class="hljs-string">&quot;text_bm25&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropFunctionField</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;product_catalog&quot;</span>,
    <span class="hljs-attr">function_name</span>: <span class="hljs-string">&quot;text_bm25&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">await</span> client.DropFunctionFieldAsync(<span class="hljs-keyword">new</span> DropFunctionFieldReq
{
    CollectionName = <span class="hljs-string">&quot;product_catalog&quot;</span>,
    FunctionName = <span class="hljs-string">&quot;text_bm25&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<p>Após o sucesso da operação, « <code translate="no">describe_collection()</code> » deixa de devolver a função eliminada ou o seu campo vetorial gerado. Os campos de entrada da função permanecem no esquema.</p>
<p>Se a remoção do campo de saída da Função deixar a coleção sem qualquer campo vetorial, a operação é rejeitada.</p>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">Que método devo utilizar para adicionar um campo ou uma função?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize <code translate="no">add_collection_field()</code> para adicionar um campo escalar ou vetorial definido pelo utilizador.</p>
<p>Utilize ` <code translate="no">add_collection_struct_field()</code> ` para adicionar um campo `StructArray` quando precisar de um campo de matriz cujos elementos partilhem o mesmo esquema `Struct`.</p>
<p>Utilize « <code translate="no">add_function_field()</code> » para adicionar uma função, o seu campo vetorial gerado e a definição do índice vinculado na mesma alteração de esquema.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Por que razão os campos definidos pelo utilizador adicionados têm de ser nulos?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>As entidades existentes foram inseridas antes de o novo campo existir, pelo que não possuem valores para esse campo. Definir « <code translate="no">nullable=True</code> » permite que o Milvus represente o valor em falta como « <code translate="no">NULL</code> » até que a sua aplicação escreva um valor ou, no caso de campos escalares, até que seja aplicado um valor por predefinição.</p>
<p>Esta regra aplica-se a campos escalares definidos pelo utilizador e a campos vetoriais definidos pelo utilizador adicionados com ` <code translate="no">add_collection_field()</code>`, bem como a campos `StructArray` adicionados com ` <code translate="no">add_collection_struct_field()</code>`. Não se aplica ao campo vetorial gerado por uma função, que não pode ser nulo.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">O que acontece às entidades existentes depois de adicionar um campo definido pelo utilizador?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>No caso de um campo escalar definido pelo utilizador, as entidades existentes devolvem « <code translate="no">NULL</code> », a menos que defina « <code translate="no">default_value</code> ». Se definir « <code translate="no">default_value</code> », as entidades existentes devolvem esse valor por predefinição.</p>
<p>No caso de um campo vetorial definido pelo utilizador, as entidades existentes apresentam o valor « <code translate="no">NULL</code> » para o novo campo vetorial. A pesquisa vetorial no campo adicionado ignora as entidades cujo valor vetorial seja « <code translate="no">NULL</code> ». Para tornar as entidades existentes pesquisáveis através do novo campo vetorial, insira valores vetoriais não nulos através de um «upsert» ou de um fluxo de trabalho de preenchimento retroativo. As novas entidades podem incluir o novo campo vetorial durante a inserção.</p>
<p>No caso de um campo StructArray, as entidades existentes devolvem « <code translate="no">NULL</code> » para o novo campo StructArray em todos os seus subcampos. As novas entidades devem fornecer « <code translate="no">NULL</code> » para todos os subcampos ou valores válidos para todos os subcampos.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">Posso adicionar a pesquisa lexical BM25 a uma coleção existente?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Sim. Se a coleção já tiver um campo « <code translate="no">VARCHAR</code> » com o analisador ativado, pode adicionar uma função BM25 e o seu campo de vetor esparso gerado para a pesquisa lexical. Neste fluxo de trabalho, o Milvus adiciona a função, o novo campo de saída « <code translate="no">SPARSE_FLOAT_VECTOR</code> » e a definição do índice limitado na mesma alteração de esquema. Não é possível utilizar um campo « <code translate="no">TEXT</code> » existente como entrada BM25 neste fluxo de trabalho de alteração de esquema. Para utilizar uma entrada « <code translate="no">TEXT</code> », defina o campo e a função BM25 ao criar a coleção.</p>
<p>Ao chamar « <code translate="no">add_function_field()</code> », forneça um objeto « <code translate="no">index_params</code> » que contenha um índice « <code translate="no">SPARSE_INVERTED_INDEX</code> » com « <code translate="no">metric_type=&quot;BM25&quot;</code> » para o novo campo de saída. O Milvus vincula a definição do índice ao campo gerado como parte da mesma alteração de esquema.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Como posso eliminar uma Função e o seu campo vetorial gerado?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Chame <code translate="no">drop_function_field()</code> com o nome da função. Neste fluxo de trabalho de alteração de esquema, o Milvus remove a função, o seu campo vetorial gerado e o índice associado em conjunto, preservando os campos de entrada da função.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">É necessário esperar após alterar o esquema de uma coleção?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Normalmente, não é necessária qualquer espera manual. Se a sua próxima operação depender do esquema atualizado, pode chamar primeiro ` <code translate="no">describe_collection()</code> ` para confirmar o esquema que o Milvus devolve atualmente.</p>
<p>Numa implementação distribuída, pode haver um breve período de propagação enquanto os componentes do Milvus atualizam os metadados da coleção. Se uma operação realizada imediatamente após a alteração do esquema falhar com um erro relacionado com o esquema, atualize o esquema e tente novamente a operação.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Quando é que o espaço de armazenamento é recuperado após a eliminação de um campo?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>A remoção de um campo elimina-o do esquema atual e da visibilidade normal de consultas/pesquisas, mas os dados históricos desse campo não são fisicamente eliminados do armazenamento de objetos de imediato.</p>
<p>O espaço de armazenamento pode ser recuperado posteriormente, durante a compactação. A compactação é um processo em segundo plano que reorganiza os ficheiros de dados existentes em ficheiros novos e mais compactos. Após a remoção de um campo, os ficheiros recém-compactados seguem o esquema atual e omitem o campo removido. O Milvus não garante uma redução imediata ou num prazo fixo do espaço de armazenamento após a remoção de um campo.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">O que acontece se eu adicionar um campo escalar com o mesmo nome que uma chave de campo dinâmico?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Se o campo dinâmico estiver ativado, pode adicionar um campo escalar com o mesmo nome que uma chave de campo dinâmico existente. O novo campo escalar oculta a chave do campo dinâmico na saída normal da consulta, mas os dados dinâmicos originais são preservados em <code translate="no">$meta</code>.</p>
<p>Por exemplo, se as entidades existentes armazenarem uma chave dinâmica denominada « <code translate="no">source</code> » e, posteriormente, adicionar um campo escalar denominado « <code translate="no">source</code> », a saída normal para « <code translate="no">source</code> » refere-se ao campo escalar. Para aceder ao valor dinâmico original, utilize a sintaxe de caminho « <code translate="no">$meta</code> », como por exemplo « <code translate="no">$meta[&quot;source&quot;]</code> ».</p>
