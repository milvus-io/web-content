---
id: mmap.md
title: Utilizar o mmap
summary: >-
  O mapeamento de memória (Mmap) permite o acesso direto à memória de ficheiros
  de grande dimensão no disco, permitindo que o Milvus armazene índices e dados
  tanto na memória como nos discos rígidos. Esta abordagem ajuda a otimizar a
  política de colocação de dados com base na frequência de acesso, expandindo a
  capacidade de armazenamento das coleções sem afetar significativamente o
  desempenho da pesquisa. Esta página ajuda-o a compreender como o Milvus
  utiliza o mmap para permitir o armazenamento e a recuperação de dados de forma
  rápida e eficiente.
---
<h1 id="Use-mmap" class="common-anchor-header">Utilizar o mmap<button data-href="#Use-mmap" class="anchor-icon" translate="no">
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
    </button></h1><p>O mapeamento de memória (mmap) permite o acesso direto à memória de ficheiros de grande dimensão no disco, permitindo que o Milvus armazene índices e dados tanto na memória como nos discos rígidos. Esta abordagem ajuda a otimizar a política de colocação de dados com base na frequência de acesso, expandindo a capacidade de armazenamento das coleções sem afetar significativamente o desempenho da pesquisa. Esta página ajuda-o a compreender como o Milvus utiliza o mmap para permitir o armazenamento e a recuperação rápidos e eficientes de dados.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus utiliza coleções para organizar representações vetoriais e os seus metadados, e cada linha da coleção representa uma entidade. Conforme ilustrado na figura à esquerda abaixo, o campo vetorial armazena representações vetoriais, enquanto os campos escalares armazenam os respetivos metadados. Depois de criar índices em determinados campos e carregar a coleção, o Milvus carrega os índices criados e os dados brutos dos campos na memória.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/mmap-illustrated.png" alt="Mmap Illustrated" class="doc-image" id="mmap-illustrated" /> 
   <span>O mmap ilustrado</span>
  
 </span></p>
<p>O Milvus é um sistema de base de dados que utiliza intensivamente a memória, e o tamanho da memória disponível determina a capacidade de uma coleção. Carregar campos que contêm um grande volume de dados na memória é impossível se o tamanho dos dados exceder a capacidade da memória, o que é habitual em aplicações baseadas em IA.</p>
<p>Para resolver esses problemas, o Milvus introduz o mmap para equilibrar o carregamento de dados «quentes» e «frios» nas coleções. Conforme ilustrado na figura à direita acima, é possível configurar o Milvus para mapear na memória os dados brutos em determinados campos, em vez de os carregar na íntegra na memória. Desta forma, é possível obter acesso direto à memória dos campos sem se preocupar com problemas de memória e ampliar a capacidade da coleção.</p>
<p>Ao comparar os procedimentos de colocação de dados nas figuras à esquerda e à direita, é possível perceber que a utilização de memória é muito maior na figura à esquerda do que na figura à direita. Com o mmap ativado, os dados que deveriam ter sido carregados na memória são transferidos para o disco rígido e armazenados na cache de páginas do sistema operativo, reduzindo a pegada de memória. No entanto, falhas na cache podem resultar numa degradação do desempenho. Para mais detalhes, consulte <a href="https://en.wikipedia.org/wiki/Mmap">este artigo</a>.</p>
<p>Ao configurar o mmap no Milvus, há sempre um princípio a seguir: mantenha sempre os dados e índices acedidos com frequência totalmente carregados na memória e utilize o mmap para os restantes.</p>
<h2 id="Use-mmap-in-Milvus" class="common-anchor-header">Utilizar o mmap no Milvus<button data-href="#Use-mmap-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus disponibiliza definições hierárquicas do mmap aos níveis global, de campo, de índice e de coleção, sendo que os níveis de índice e de campo têm precedência sobre o nível de coleção, e o nível de coleção sobre o nível global.</p>
<h3 id="Global-mmap-settings" class="common-anchor-header">Definições globais do mmap<button data-href="#Global-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>A configuração ao nível do cluster é a configuração global e tem a menor prioridade. O Milvus disponibiliza várias configurações relacionadas com o mmap em <code translate="no">milvus.yaml</code>. Estas configurações aplicam-se a todas as coleções do cluster.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">mmap:</span>
    <span class="hljs-attr">scalarField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">scalarIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorField:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">vectorIndex:</span> <span class="hljs-literal">false</span>
    <span class="hljs-comment"># The following should be a path on a high-performance disk</span>
    <span class="hljs-attr">mmapDirPath:</span> <span class="hljs-string">any/valid/path</span> 
<span class="hljs-string">....</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Configurar item</p></th>
     <th><p>Descrição</p></th>
     <th><p>Valor predefinido</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarField</code></p></td>
     <td><p>Especifica se os dados brutos de todos os campos escalares devem ser mapeados para a memória. Definir esta opção como « <code translate="no">true</code> » faz com que o Milvus mapeie os dados brutos dos campos escalares de uma coleção para a memória, em vez de os carregar na íntegra ao receber um pedido de carregamento para essa coleção.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.scalarIndex</code></p></td>
     <td><p>Especifica se todos os índices de campos escalares devem ser mapeados para a memória. Ao definir esta opção como « <code translate="no">true</code> », o Milvus mapeia os índices de campos escalares de uma coleção para a memória, em vez de os carregar na íntegra ao receber um pedido de carregamento para essa coleção.</p><p>Atualmente, apenas é suportado o campo escalar que utilize o seguinte tipo de índice:</p><ul><li>INVERTED</li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorField</code></p></td>
     <td><p>Especifica se os dados brutos de todos os campos vetoriais devem ser mapeados para a memória. Ao definir esta opção como « <code translate="no">true</code> », o Milvus mapeia os dados brutos dos campos vetoriais de uma coleção para a memória, em vez de os carregar na íntegra ao receber um pedido de carregamento para essa coleção.</p></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.vectorIndex</code></p></td>
     <td><p>Especifica se todos os índices de campos vetoriais devem ser mapeados para a memória. Ao definir este parâmetro como « <code translate="no">true</code> », o Milvus mapeia os índices de campos vetoriais de uma coleção para a memória, em vez de os carregar na íntegra ao receber um pedido de carregamento para essa coleção.</p><p>Atualmente, apenas são suportados os campos vetoriais que utilizam os seguintes tipos de índice:</p><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>HNSW</p></li><li><p>SCANN</p></li><li><p>ÍNDICE_INVERTO_DILUÍDO</p></li><li><p>SPARSE_WAND</p></li></ul></td>
     <td><p><code translate="no">false</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.mmapDirPath</code></p></td>
     <td><p>Especifica o caminho para os ficheiros mapeados na memória. Se não for especificado, aplica-se o valor predefinido. </p><p>O marcador de posição « <code translate="no">localStorage.path</code> » no valor predefinido indica o disco rígido dos QueryNodes do Milvus. Certifique-se de que os seus QueryNodes dispõem de um disco rígido de alto desempenho para tirar o máximo partido das vantagens do mmap.</p></td>
     <td><p><code translate="no">{localStorage.path}/mmap</code></p></td>
   </tr>
</table>
<p>Para aplicar as definições acima ao seu cluster Milvus, siga os passos descritos em <a href="/docs/pt/v2.6.x/configure-helm.md#Configure-Milvus-via-configuration-file">«Configurar o Milvus com o Helm</a> » e <a href="/docs/pt/v2.6.x/configure_operator.md">«Configurar o Milvus com os Milvus Operators</a>».</p>
<p>Por vezes, as definições globais do mmap não são flexíveis quando se enfrentam casos de utilização específicos. Para aplicar definições alternativas a uma coleção específica ou aos seus índices, considere configurar o mmap especificamente para uma coleção, um campo ou um índice. É necessário libertar e carregar uma coleção antes de as alterações às definições do mmap entrarem em vigor.</p>
<h3 id="Field-specific-mmap-settings" class="common-anchor-header">Definições do mmap específicas por campo<button data-href="#Field-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Para configurar o mmap específico por campo, é necessário incluir o parâmetro « <code translate="no">mmap_enabled</code> » ao adicionar um campo. Pode ativar o mmap neste campo específico definindo este parâmetro como « <code translate="no">True</code> ».</p>
<p>O exemplo seguinte demonstra como configurar o mmap específico de um campo ao adicionar um campo.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN
)

schema = MilvusClient.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

schema = MilvusClient.create_schema()

<span class="hljs-comment"># Add a scalar field and enable mmap</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    mmap_enabled=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Alter mmap settings on a specific field</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;doc_chunk&quot;</span>,
    field_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.*;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; typeParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, String&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>);
}};
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .typeParams(typeParams)
        .build());

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .build();
client.createCollection(req);

client.alterCollectionField(AlterCollectionFieldReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .fieldName(<span class="hljs-string">&quot;doc_chunk&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>=<span class="hljs-string">&quot;YOUR_CLUSTER_ENDPOINT&quot;</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">TOKEN</span>=<span class="hljs-string">&quot;YOUR_TOKEN&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">await</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-variable constant_">CLUSTER_ENDPOINT</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-variable constant_">TOKEN</span>
});

<span class="hljs-keyword">const</span> schema = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>
},
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">false</span>,
}
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionFieldProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;doc_chunk&quot;</span>,
    <span class="hljs-attr">properties</span>: {<span class="hljs-string">&quot;mmap_enable&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment">#restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-built_in">export</span> idField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    },
    &quot;isPrimary&quot;: true,
    &quot;autoId&quot;: false
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
       &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> docChunkField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512,
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$idField</span>,
        <span class="hljs-variable">$docChunkField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>
}&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/fields/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;fieldName&quot;: &quot;doc_chunk&quot;,
    &quot;fieldParams&quot;:{
        &quot;mmap.enabled&quot;: true
    }
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Considere ativar o mmap para os campos que armazenam grandes volumes de dados. São suportados tanto campos escalares como vetoriais.</p>
</div>
<p>Em seguida, pode criar uma coleção utilizando o esquema criado acima. Ao receber um pedido para carregar a coleção, o Milvus utiliza o mmap para mapear os dados brutos do campo ` <strong>doc_chunk</strong> ` para a memória.</p>
<h3 id="Index-specific-mmap-settings" class="common-anchor-header">Definições de mmap específicas do índice<button data-href="#Index-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Para configurar o mmap específico do índice, é necessário incluir a propriedade ` <code translate="no">mmap.enable</code> ` nos parâmetros do índice ao adicioná-lo. Pode ativar o mmap neste índice específico definindo a propriedade como ` <code translate="no">true</code>`.</p>
<p>O exemplo seguinte demonstra como configurar o mmap específico do índice ao adicionar um índice.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a varchar field</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>   
)

index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create index on the varchar field with mmap settings</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
<span class="highlighted-wrapper-line">    params={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;false&quot;</span> }</span>
)

<span class="hljs-comment"># Change mmap settings for an index</span>
<span class="hljs-comment"># The following assumes that you have a collection named `my_collection`</span>
client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;title&quot;</span>,
    properties={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
        
List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
    put(Constant.MMAP_ENABLED, <span class="hljs-literal">false</span>);
}};
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
        
client.alterIndexProperties(AlterIndexPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexName(<span class="hljs-string">&quot;title&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;true&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on the varchar field with mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});

<span class="hljs-comment">// Change mmap settings for an index</span>
<span class="hljs-comment">// The following assumes that you have a collection named `my_collection`</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterIndexProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">properties</span>:{<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">true</span>}
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;doc_chunk&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
                &quot;mmap.enabled&quot;: true
            }
        }
    ]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;indexName&quot;: &quot;doc_chunk&quot;,
    &quot;properties&quot;: {
        &quot;mmap.enabled&quot;: false
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Isto aplica-se aos índices de campos vetoriais e escalares.</p>
</div>
<p>Em seguida, pode referenciar os parâmetros do índice numa coleção. Ao receber um pedido para carregar a coleção, o Milvus mapeia na memória o índice do campo <strong>«title</strong> ».</p>
<h3 id="Collection-specific-mmap-settings" class="common-anchor-header">Definições de mmap específicas da coleção<button data-href="#Collection-specific-mmap-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Para configurar uma estratégia de mmap para toda a coleção, é necessário incluir a propriedade ` <code translate="no">mmap.enabled</code> ` na solicitação de criação da coleção. Pode ativar o mmap para uma coleção definindo esta propriedade como ` <code translate="no">true</code>`.</p>
<p>O exemplo seguinte demonstra como ativar o mmap numa coleção denominada <strong>my_collection</strong> aquando da sua criação. Ao receber um pedido para carregar a coleção, o Milvus mapeia os dados brutos de todos os campos para a memória.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Enable mmap when creating a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    properties={ <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-string">&quot;true&quot;</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build();
client.createCollection(req);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">scheme</span>: schema,
    <span class="hljs-attr">properties</span>: { <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span> }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: {
        \&quot;mmap.enabled\&quot;: \&quot;false\&quot;
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Também é possível alterar as definições de mmap de uma coleção existente.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release collection before change mmap settings</span>
client.release_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Ensure that the collection has already been released </span>
<span class="hljs-comment"># and run the following</span>
client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: false
    }
)

<span class="hljs-comment"># Load the collection to make the above change take effect</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">client.releaseCollection(ReleaseCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
        
client.alterCollectionProperties(AlterCollectionPropertiesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .property(Constant.MMAP_ENABLED, <span class="hljs-string">&quot;false&quot;</span>)
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .build());
       
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Release collection before change mmap settings</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});

<span class="hljs-comment">// Ensure that the collection has already been released </span>
<span class="hljs-comment">// and run the following</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">false</span>
    }
});

<span class="hljs-comment">// Load the collection to make the above change take effect</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/release&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;properties&quot;: {
        &quot;mmmap.enabled&quot;: false
    }
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>É necessário libertar a coleção para efetuar alterações nas suas propriedades e recarregá-la para que as alterações entrem em vigor.</p>
