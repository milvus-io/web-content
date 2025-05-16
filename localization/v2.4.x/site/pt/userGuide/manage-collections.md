---
id: manage-collections.md
title: Gerir colecções
---
<h1 id="Manage-Collections" class="common-anchor-header">Gerir colecções<button data-href="#Manage-Collections" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia orienta-o na criação e gestão de colecções utilizando o SDK da sua escolha.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de começar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Instalou <a href="https://milvus.io/docs/install_standalone-docker.md">o Milvus standalone</a> ou <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">o Milvus cluster</a>.</p></li>
<li><p>Instalou os SDKs preferidos. Pode escolher entre várias linguagens, incluindo <a href="https://milvus.io/docs/install-pymilvus.md">Python</a>, <a href="https://milvus.io/docs/install-java.md">Java</a>, <a href="https://milvus.io/docs/install-go.md">Go</a> e <a href="https://milvus.io/docs/install-node.md">Node.js</a>.</p></li>
</ul>
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
    </button></h2><p>No Milvus, armazena os seus embeddings vectoriais em colecções. Todos os embeddings vectoriais dentro de uma coleção partilham a mesma dimensionalidade e a mesma métrica de distância para medir a semelhança.</p>
<p>As colecções do Milvus suportam campos dinâmicos (ou seja, campos não pré-definidos no esquema) e incrementação automática de chaves primárias.</p>
<p>Para acomodar diferentes preferências, Milvus oferece dois métodos para criar uma coleção. Um permite uma configuração rápida, enquanto o outro permite uma personalização detalhada do esquema da coleção e dos parâmetros do índice.</p>
<p>Adicionalmente, pode visualizar, carregar, libertar e largar uma coleção quando necessário.</p>
<h2 id="Create-Collection" class="common-anchor-header">Criar coleção<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode criar uma coleção de uma das seguintes formas:</p>
<ul>
<li><p><strong>Configuração rápida</strong></p>
<p>Desta forma, pode criar uma coleção dando-lhe simplesmente um nome e especificando o número de dimensões dos embeddings de vetor a armazenar nesta coleção. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/manage-collections.md">Configuração rápida</a>.</p></li>
<li><p><strong>Configuração personalizada</strong></p>
<p>Em vez de deixar o In Milvus decidir quase tudo para a sua coleção, pode determinar o <strong>esquema</strong> e <strong>os parâmetros de índice</strong> da coleção por si próprio. Para mais detalhes, consulte <a href="/docs/pt/v2.4.x/manage-collections.md">Configuração personalizada</a>.</p></li>
</ul>
<h3 id="Quick-setup" class="common-anchor-header">Configuração rápida</h3><p>Tendo como pano de fundo o grande salto na indústria da IA, a maioria dos programadores apenas precisa de uma coleção simples mas dinâmica para começar. Milvus permite uma configuração rápida de tal coleção com apenas três argumentos:</p>
<ul>
<li><p>Nome da coleção a criar,</p></li>
<li><p>Dimensão dos vectores a inserir, e</p></li>
<li><p>Tipo de métrica utilizada para medir as semelhanças entre as incorporações vectoriais.</p></li>
</ul>
<div class="language-python">
<p>Para uma configuração rápida, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> da classe <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para criar uma coleção com o nome e a dimensão especificados.</p>
</div>
<div class="language-java">
<p>Para uma configuração rápida, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> da classe <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> para criar uma coleção com o nome e a dimensão especificados.</p>
</div>
<div class="language-javascript">
<p>Para uma configuração rápida, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> da classe <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para criar uma coleção com o nome e a dimensão especificados.</p>
</div>
<div class="language-go">
<p>Para uma configuração rápida, utilize o método <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/CreateCollection.md"><code translate="no">CreateCollection()</code></a> numa instância da interface <code translate="no">Client</code> utilizando o método <a href="https://milvus.io/api-reference/go/v2.4.x/Connections/NewClient.md"><code translate="no">NewClient()</code></a> para criar uma coleção com o nome e a dimensão especificados.</p>
</div>
<div class="language-shell">
<p>Para uma configuração rápida, utilize o método <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> para criar uma coleção com o nome e a dimensão especificados.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection in quick setup mode</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-keyword">import</span> (
  <span class="hljs-string">&quot;context&quot;</span>
  <span class="hljs-string">&quot;fmt&quot;</span>
  <span class="hljs-string">&quot;log&quot;</span>
  <span class="hljs-string">&quot;time&quot;</span>

  milvusClient <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span> <span class="hljs-comment">// milvusClient is an alias for milvus client package</span>
  <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/entity&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    ctx := context.Background()
    ctx, cancel := context.WithTimeout(ctx, <span class="hljs-number">2</span>*time.Second)
    <span class="hljs-keyword">defer</span> cancel()
    <span class="hljs-comment">// 1. Set up a Milvus client</span>
    client, err := milvusClient.NewClient(ctx, milvusClient.Config{
        Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    })
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus:&quot;</span>, err.Error())
    }
    <span class="hljs-keyword">defer</span> client.Close()
    
    <span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
    err = client.NewCollection(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-number">5</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err.Error())
    }
    
    stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;quick_setup&quot;</span>, []<span class="hljs-type">string</span>{})
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
    }
    fmt.Println(stateLoad)
    <span class="hljs-comment">// Output</span>
    <span class="hljs-comment">// 3</span>
    
    <span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
    <span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
    <span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
    <span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;dimension&quot;: 5
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>A coleção gerada no código acima contém apenas dois campos: <code translate="no">id</code> (como a chave primária) e <code translate="no">vector</code> (como o campo vetorial), com as definições <code translate="no">auto_id</code> e <code translate="no">enable_dynamic_field</code> activadas por predefinição.</p>
<ul>
<li><p><code translate="no">auto_id</code></p>
<p>A ativação desta definição garante que a chave primária é incrementada automaticamente. Não há necessidade de fornecimento manual de chaves primárias durante a inserção de dados.</p></li>
<li><p><code translate="no">enable_dynamic_field</code></p>
<p>Quando activada, todos os campos, excluindo <code translate="no">id</code> e <code translate="no">vector</code> nos dados a inserir, são tratados como campos dinâmicos. Estes campos adicionais são guardados como pares chave-valor num campo especial denominado <code translate="no">$meta</code>. Esta funcionalidade permite a inclusão de campos extra durante a inserção de dados.</p></li>
</ul>
<p>A coleção automaticamente indexada e carregada a partir do código fornecido está pronta para a inserção imediata de dados.</p>
<h3 id="Customized-setup" class="common-anchor-header">Configuração personalizada</h3><p>Em vez de deixar o Milvus decidir quase tudo para a sua coleção, pode determinar o <strong>esquema</strong> e <strong>os parâmetros de indexação</strong> da coleção por si próprio.</p>
<h4 id="Step-1-Set-up-schema" class="common-anchor-header">Passo 1: Configurar o esquema</h4><p>Um esquema define a estrutura de uma coleção. No esquema, tem a opção de ativar ou desativar <code translate="no">enable_dynamic_field</code>, adicionar campos pré-definidos e definir atributos para cada campo. Para obter uma explicação detalhada do conceito e dos tipos de dados disponíveis, consulte <a href="/docs/pt/v2.4.x/schema.md">Esquema explicado</a>.</p>
<div class="language-python">
<p>Para configurar um esquema, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> para criar um objeto de esquema e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> para adicionar campos ao esquema.</p>
</div>
<div class="language-java">
<p>Para configurar um esquema, utilizar <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a> para criar um objeto de esquema e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a> para adicionar campos ao esquema.</p>
</div>
<div class="language-javascript">
<p>Para configurar um esquema, utilizar <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
</div>
<div class="language-go">
<p>Para configurar um esquema, utilize <code translate="no">entity.NewSchema()</code> para criar um objeto de esquema e <code translate="no">schema.WithField()</code> para adicionar campos ao esquema.</p>
</div>
<div class="language-shell">
<p>Para configurar um esquema, é necessário definir um objeto JSON que siga o formato do esquema, conforme apresentado na <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> página de referência do ponto final da API.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
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
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
schema := entity.NewSchema()

<span class="hljs-comment">// 3.2. Add fields to schema</span>
schema.WithField(
    entity.NewField().
        WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">false</span>).
        WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">5</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> fields=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;dataType&quot;: &quot;Int64&quot;, \
    &quot;isPrimary&quot;: true \
}, \
{ \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;dataType&quot;: &quot;FloatVector&quot;, \
    &quot;elementTypeParams&quot;: { \
        &quot;dim&quot;: 5 \
    } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td>Determina se o campo primário é incrementado automaticamente.<br/>Definir este parâmetro como <strong>Verdadeiro</strong> faz com que o campo primário seja incrementado automaticamente. Neste caso, o campo primário não deve ser incluído nos dados a inserir para evitar erros. Os IDs gerados automaticamente têm um comprimento fixo e não podem ser alterados.</td>
    </tr>
    <tr>
      <td><code translate="no">enable_dynamic_field</code></td>
      <td>Determina se o Milvus guarda os valores dos campos indefinidos num campo dinâmico se os dados que estão a ser inseridos na coleção de destino incluírem campos que não estão definidos no esquema da coleção.<br/>Se definir esta opção como <strong>True</strong>, o Milvus criará um campo chamado <strong>$meta</strong> para guardar quaisquer campos indefinidos e os respectivos valores dos dados inseridos.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">datatype</code></td>
      <td>O tipo de dados do campo. Para obter uma lista dos tipos de dados disponíveis, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary</code></td>
      <td>Se o campo atual é o campo primário de uma coleção.<br/>Cada coleção tem apenas um campo primário. Um campo primário deve ser do tipo <strong>DataType.INT64</strong> ou do tipo <strong>DataType.VARCHAR</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>A dimensão dos embeddings de vetor.<br/>Isto é obrigatório para um campo do tipo <strong>DataType.FLOAT_VECTOR</strong>, <strong>DataType.BINARY_VECTOR</strong>, <strong>DataType.FLOAT16_VECTOR</strong> ou <strong>DataType.BFLOAT16_VECTOR</strong>. Se utilizar <strong>DataType.SPARSE_FLOAT_VECTOR</strong>, omita este parâmetro.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição do campo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>O tipo de dados do campo. Para obter uma lista dos tipos de dados disponíveis, consulte <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimaryKey</code></td>
      <td>Se o campo atual é o campo primário de uma coleção.<br/>Cada coleção tem apenas um campo primário. Um campo primário deve ser do tipo <strong>DataType.Int64</strong> ou do tipo <strong>DataType.VarChar</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">autoID</code></td>
      <td>Se permite que o campo primário seja incrementado automaticamente.<br/>Se definir este valor como <strong>verdadeiro</strong>, o campo primário é incrementado automaticamente. Neste caso, o campo primário não deve ser incluído nos dados a inserir para evitar erros.</td>
    </tr>
    <tr>
      <td><code translate="no">dimension</code></td>
      <td>A dimensão dos embeddings de vetor.<br/>Isto é obrigatório para um campo do tipo <strong>DataType.FloatVector</strong>, <strong>DataType.BinaryVector</strong>, <strong>DataType.Float16Vector</strong> ou <strong>DataType.BFloat16Vector</strong>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição do campo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">name</code></td>
      <td>O nome do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">data_type</code></td>
      <td>O tipo de dados do campo. Para obter uma enumeração de todos os tipos de dados disponíveis, consulte <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary_key</code></td>
      <td>Se o campo atual é o campo primário de uma coleção.<br/>Cada coleção tem apenas um campo primário. Um campo primário deve ser do tipo <strong>DataType.INT64</strong> ou do tipo <strong>DataType.VARCHAR</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td>Se o campo primário é automaticamente incrementado aquando da inserção de dados nesta coleção.<br/>O valor predefinido é <strong>False</strong>. Definir este parâmetro como <strong>True</strong> faz com que o campo primário seja incrementado automaticamente. Ignore este parâmetro se precisar de configurar uma coleção com um esquema personalizado.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>A dimensionalidade do campo de coleção que contém as incorporações de vetor.<br/>O valor deve ser um número inteiro superior a 1 e é normalmente determinado pelo modelo que utiliza para gerar incorporações de vetor.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">WithName()</code></td>
      <td>O nome do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDataType()</code></td>
      <td>O tipo de dados do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsPrimaryKey()</code></td>
      <td>Se o campo atual é o campo primário de uma coleção.<br/>Cada coleção tem apenas um campo primário. Um campo primário deve ser do tipo <strong>entity.FieldTypeInt64</strong> ou do tipo <strong>entity.FieldTypeVarChar</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsAutoID()</code></td>
      <td>Se o campo primário é automaticamente incrementado aquando da inserção de dados nesta coleção.<br/>O valor predefinido é <strong>false</strong>. Definir esse valor como <strong>true</strong> faz com que o campo primário seja incrementado automaticamente. Ignore este parâmetro se precisar de configurar uma coleção com um esquema personalizado.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDim()</code></td>
      <td>A dimensionalidade do campo de coleção que contém as incorporações de vetor.<br/>O valor deve ser um número inteiro superior a 1 e é normalmente determinado pelo modelo que utiliza para gerar incorporações de vetor.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo a criar na coleção de destino.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>O tipo de dados dos valores do campo.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimary</code></td>
      <td>Se o campo atual é o campo primário. Definir isto como <code translate="no">True</code> faz com que o campo atual seja o campo primário.</td>
    </tr>
    <tr>
      <td><code translate="no">elementTypeParams</code></td>
      <td>Parâmetros de campo extra.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>Um parâmetro opcional para campos FloatVector ou BinaryVector que determina a dimensão do vetor.</td>
    </tr>
  </tbody>
</table>
<h4 id="Step-2-Set-up-index-parameters" class="common-anchor-header">Passo 2: Configurar parâmetros de índice</h4><p>Os parâmetros de indexação ditam a forma como o Milvus organiza os seus dados dentro de uma coleção. Pode personalizar o processo de indexação para campos específicos, ajustando os seus <code translate="no">metric_type</code> e <code translate="no">index_type</code>. Para o campo vetorial, tem a flexibilidade de selecionar <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">HAMMING</code>, ou <code translate="no">JACCARD</code> como <code translate="no">metric_type</code>, dependendo do tipo de vectores com que está a trabalhar. Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/metric.md">Métricas de similaridade</a>.</p>
<div class="language-python">
<p>Para configurar os parâmetros de índice, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> para preparar os parâmetros do índice e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a> para adicionar o índice.</p>
</div>
<div class="language-java">
<p>Para configurar os parâmetros de índice, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>.</p>
</div>
<div class="language-javascript">
<p>Para configurar os parâmetros do índice, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="language-go">
<p>Para configurar os parâmetros do índice, utilize <a href="https://milvus.io/api-reference/go/v2.4.x/Index/CreateIndex.md"><code translate="no">CreateIndex()</code></a>.</p>
</div>
<div class="language-shell">
<p>Para configurar os parâmetros de índice, é necessário definir um objeto JSON que siga o formato dos parâmetros de índice, conforme apresentado na <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> página de referência do ponto de extremidade da API.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-meta"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-meta"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    field_name: <span class="hljs-string">&quot;my_id&quot;</span>,
    index_type: <span class="hljs-string">&quot;STL_SORT&quot;</span>
},{
    field_name: <span class="hljs-string">&quot;my_vector&quot;</span>,
    index_type: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>: { nlist: <span class="hljs-number">1024</span>}
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.3 Prepare index parameters</span>
idxID := entity.NewScalarIndexWithType(entity.Sorted)

idxVector, err := entity.NewIndexIvfFlat(entity.IP, <span class="hljs-number">1024</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to new index:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> indexParams=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;indexName&quot;: &quot;my_id&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;SLT_SORT&quot; \
  } \
}, { \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;metricType&quot;: &quot;COSINE&quot;, \
    &quot;indexName&quot;: &quot;my_vector&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;IVF_FLAT&quot;, \
        &quot;nlist&quot;: 1024 \
  } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição do objeto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do ficheiro de destino a que se aplica este objeto.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo vetorial. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados em Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Os parâmetros de ajuste fino para o tipo de índice especificado. Para obter detalhes sobre as chaves possíveis e intervalos de valores, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo de destino a que se aplica este objeto IndexParam.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>A métrica de distância a utilizar para o índice. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>Parâmetros de índice extra. Para obter detalhes, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do campo de destino no qual um índice deve ser criado.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo vetorial. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados em Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Os parâmetros de ajuste fino para o tipo de índice especificado. Para obter detalhes sobre as chaves possíveis e intervalos de valores, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo vetorial. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados no Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">nlist</code></td>
      <td>Número de unidades de cluster. As unidades de cluster são usadas em índices baseados em IVF (Inverted File) em Milvus. Para IVF_FLAT, o índice divide os dados do vetor em unidades de cluster `nlist`, e depois compara as distâncias entre o vetor de entrada alvo e o centro de cada cluster1. Deve estar entre 1 e 65536.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo de destino no qual um índice deve ser criado.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>O nome do índice a criar. O valor predefinido é o nome do campo de destino.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo de vetor. Para obter mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados no Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>O tipo de índice e as configurações relacionadas. Para obter detalhes, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params.index_type</code></td>
      <td>O tipo do índice a ser criado.</td>
    </tr>
    <tr>
      <td><code translate="no">params.nlist</code></td>
      <td>O número de unidades de cluster. Isto aplica-se aos tipos de índice relacionados com o IVF.</td>
    </tr>
  </tbody>
</table>
<p>O fragmento de código acima demonstra como configurar os parâmetros de índice para o campo vetorial e um campo escalar, respetivamente. Para o campo vetorial, defina o tipo de métrica e o tipo de índice. Para um campo escalar, defina apenas o tipo de índice. Recomenda-se a criação de um índice para o campo vetorial e quaisquer campos escalares que sejam frequentemente utilizados para filtragem.</p>
<h4 id="Step-3-Create-the-collection" class="common-anchor-header">Passo 3: Criar a coleção</h4><p>Tem a opção de criar uma coleção e um ficheiro de índice separadamente ou de criar uma coleção com o índice carregado simultaneamente na criação.</p>
<div class="language-python">
<p>Utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a> para criar uma coleção com o esquema e os parâmetros de índice especificados e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a> para verificar o estado de carregamento da coleção.</p>
</div>
<div class="language-java">
<p>Utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection()</a> para criar uma coleção com o esquema e os parâmetros de índice especificados e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md">getLoadState()</a> para verificar o estado de carregamento da coleção.</p>
</div>
<div class="language-javascript">
<p>Utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection()</a> para criar uma coleção com o esquema e os parâmetros de índice especificados e <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md">getLoadState()</a> para verificar o estado de carregamento da coleção.</p>
</div>
<ul>
<li><p><strong>Crie uma coleção com o índice carregado simultaneamente aquando da criação.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

time.sleep(<span class="hljs-number">5</span>)

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

<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .collectionSchema(schema)
    .indexParams(indexParams)
    .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 3.5 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//   </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
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
            }
        ]
    },
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;STL_SORT&quot;
            }            
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>A coleção criada acima é carregada automaticamente. Para saber mais sobre o carregamento e a libertação de uma coleção, consulte <a href="/docs/pt/v2.4.x/manage-collections.md#Load--Release-Collection">Carregar e libertar colecções</a>.</p></li>
<li><p><strong>Crie uma coleção e um arquivo de índice separadamente.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
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
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
schema.CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>
client.CreateCollection(ctx, schema, entity.DefaultShardNumber)

stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
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
            }
        ]
        
    }
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>A coleção criada acima não é carregada automaticamente. Pode criar um índice para a coleção da seguinte forma. A criação de um índice para a coleção de uma forma separada não carrega automaticamente a coleção. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/manage-collections.md#Load--Release-Collection">Carregar e liberar coleção</a>.</p>
<p><table class="language-python">
<thead>
<tr>
<th>Parâmetro</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>O nome da coleção.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>O esquema desta coleção.<br/>Se definir este parâmetro como <strong>None</strong> indica que esta coleção será criada com as definições por defeito.<br/>Para configurar uma coleção com um esquema personalizado, é necessário criar um objeto <strong>CollectionSchema</strong> e referenciá-lo aqui. Neste caso, o Milvus ignora todas as outras definições relacionadas com o esquema incluídas no pedido.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>Os parâmetros para construir o índice no campo vetorial desta coleção. Para configurar uma coleção com um esquema personalizado e carregar automaticamente a coleção para a memória, é necessário criar um objeto IndexParams e referenciá-lo aqui.<br/>Deve pelo menos adicionar um índice para o campo vetorial nesta coleção. Também pode ignorar este parâmetro se preferir configurar os parâmetros do índice mais tarde.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-java">
<thead>
<tr>
<th>Parâmetro</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>O nome da coleção.</td>
</tr>
<tr>
<td><code translate="no">collectionSchema</code></td>
<td>O esquema desta coleção.<br/>Se o deixar vazio, indica que esta coleção será criada com as predefinições. Para configurar uma coleção com um esquema personalizado, é necessário criar um objeto <strong>CollectionSchema</strong> e referenciá-lo aqui.</td>
</tr>
<tr>
<td><code translate="no">indexParams</code></td>
<td>Os parâmetros para criar o índice no campo de vetor nesta coleção. Para configurar uma coleção com um esquema personalizado e carregar automaticamente a coleção para a memória, crie um objeto <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParams</a> com uma lista de objectos IndexParam e faça referência a este objeto aqui.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-javascript">
<thead>
<tr>
<th>Parâmetro</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>O nome da coleção.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>Os campos na coleção.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>Os parâmetros de índice para a coleção a criar.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-go">
<thead>
<tr>
<th>Parâmetro</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">schema.CollectionName</code></td>
<td>O nome da coleção.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>O esquema desta coleção.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>Os parâmetros de índice para a coleção a criar.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-shell">
<thead>
<tr>
<th>Parâmetro</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>O nome da coleção.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>O esquema é responsável pela organização dos dados na coleção de destino. Um esquema válido deve ter vários campos, que devem incluir uma chave primária, um campo vetorial e vários campos escalares.</td>
</tr>
<tr>
<td><code translate="no">schema.autoID</code></td>
<td>Se permite que o campo primário seja incrementado automaticamente. Definir este valor como True faz com que o campo primário seja incrementado automaticamente. Neste caso, o campo primário não deve ser incluído nos dados a inserir para evitar erros. Defina este parâmetro no campo com is_primary definido como True.</td>
</tr>
<tr>
<td><code translate="no">schema.enableDynamicField</code></td>
<td>Se permite utilizar o campo reservado $meta para guardar campos não definidos pelo esquema em pares de valores chave.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>Uma lista de objectos de campo.</td>
</tr>
<tr>
<td><code translate="no">fields.fieldName</code></td>
<td>O nome do campo a criar na coleção de destino.</td>
</tr>
<tr>
<td><code translate="no">fields.dataType</code></td>
<td>O tipo de dados dos valores do campo.</td>
</tr>
<tr>
<td><code translate="no">fields.isPrimary</code></td>
<td>Se o campo atual é o campo primário. Definir isto como True torna o campo atual o campo primário.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams</code></td>
<td>Parâmetros de campo extra.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams.dim</code></td>
<td>Um parâmetro opcional para campos FloatVector ou BinaryVector que determina a dimensão do vetor.</td>
</tr>
</tbody>
</table></p>
<p>A coleção criada acima não é carregada automaticamente. Pode criar um índice para a coleção da seguinte forma. A criação de um índice para a coleção de uma forma separada não carrega automaticamente a coleção. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/manage-collections.md">Carregar e liberar coleção</a>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6 Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    index_params=index_params
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
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateIndexReq</span>  <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

<span class="hljs-comment">// 3.7 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq2);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.5 Create index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.5 Create index</span>
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, idxID, <span class="hljs-literal">false</span>)
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, idxVector, <span class="hljs-literal">false</span>)

stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/indexes/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexConfig&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
  <table class="language-python">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição da coleção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome da coleção.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>Um objeto <strong>IndexParams</strong> que contém uma lista de objectos <strong>IndexParam</strong>.</td>
    </tr>
  </tbody>
</table>
</li>
</ul>
<table class="language-java">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>O nome da coleção.</td>
    </tr>
    <tr>
      <td><code translate="no">indexParams</code></td>
      <td>Uma lista de objectos <strong>IndexParam</strong>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome da coleção.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>O nome do campo no qual se pretende criar um índice.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para obter informações sobre os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>O algoritmo que é utilizado para medir a semelhança entre vectores. Os valores possíveis são <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. Esta opção só está disponível quando o campo especificado é um campo vetorial. Para mais informações, consulte <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Índices suportados no Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Os parâmetros de ajuste fino para o tipo de índice especificado. Para obter detalhes sobre as chaves possíveis e intervalos de valores, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collName</code></td>
      <td>O nome da coleção.</td>
    </tr>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>O nome do campo no qual será criado um índice.</td>
    </tr>
    <tr>
      <td><code translate="no">idx</code></td>
      <td>O nome do algoritmo utilizado para organizar os dados no campo específico. Para obter informações sobre os algoritmos aplicáveis, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a> e <a href="https://milvus.io/docs/disk_index.md">Índice no disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">async</code></td>
      <td>Se esta operação é assíncrona.</td>
    </tr>
    <tr>
      <td><code translate="no">opts</code></td>
      <td>Os parâmetros de ajuste fino para o tipo de índice especificado. Você pode incluir vários `entity.IndexOption` nesta solicitação. Para obter detalhes sobre possíveis chaves e intervalos de valores, consulte <a href="https://milvus.io/docs/index.md">Índice na memória</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
        <th>Parâmetro</th>
        <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code translate="no">collectionName</code></td>
        <td>O nome da coleção.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams</code></td>
        <td>Os parâmetros de índice para a coleção a ser criada.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.metricType</code></td>
        <td>O tipo de métrica de similaridade utilizado para criar o índice. O valor predefinido é COSINE.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.fieldName</code></td>
        <td>O nome do campo de destino no qual um índice deve ser criado.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexName</code></td>
        <td>O nome do índice a criar, o valor predefinido é o nome do campo de destino.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexConfig.index_type</code></td>
        <td>O tipo do índice a ser criado.</td>
        </tr>
        <tr.>
        <td><code translate="no">indexParams.indexConfig.nlist</code></td>
        <td>O número de unidades de cluster. Isto aplica-se aos tipos de índice relacionados com FIV.</td>
        </tr>
    </tbody>
</table>
<h2 id="View-Collections" class="common-anchor-header">Visualizar colecções<button data-href="#View-Collections" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Para verificar os detalhes de uma coleção existente, utilize <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a>.</p>
</div>
<div class="language-java">
<p>Para verificar os detalhes de uma coleção existente, utilize <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-javascript">
<p>Para verificar os detalhes de uma coleção existente, utilize <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-go">
<p>Para verificar os detalhes de uma coleção existente, utilize <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DescribeCollection.md">DescribeCollection()</a>.</p>
</div>
<div class="language-shell">
<p>Para ver a definição de uma coleção, pode utilizar os botões <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/collections/describe</code></a> e o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/List.md"><code translate="no">POST /v2/vectordb/collections/list</code></a> pontos de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. View Collections</span>
res = client.describe_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;auto_id&quot;: false,</span>
<span class="hljs-comment">#     &quot;num_shards&quot;: 1,</span>
<span class="hljs-comment">#     &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#     &quot;fields&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 100,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 5,</span>
<span class="hljs-comment">#             &quot;params&quot;: {},</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0,</span>
<span class="hljs-comment">#             &quot;is_primary&quot;: true</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 101,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_vector&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 101,</span>
<span class="hljs-comment">#             &quot;params&quot;: {</span>
<span class="hljs-comment">#                 &quot;dim&quot;: 5</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#     &quot;collection_id&quot;: 448143479230158446,</span>
<span class="hljs-comment">#     &quot;consistency_level&quot;: 2,</span>
<span class="hljs-comment">#     &quot;properties&quot;: {},</span>
<span class="hljs-comment">#     &quot;num_partitions&quot;: 1,</span>
<span class="hljs-comment">#     &quot;enable_dynamic_field&quot;: true</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 4. View collections
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

DescribeCollectionResp describeCollectionRes = client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

// Output:
// {
//     <span class="hljs-string">&quot;createTime&quot;</span>: 449005822816026627,
//     <span class="hljs-string">&quot;collectionSchema&quot;</span>: {<span class="hljs-string">&quot;fieldSchemaList&quot;</span>: [
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;Int64&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">true</span>,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         },
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dimension&quot;</span>: 5,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         }
//     ]},
//     <span class="hljs-string">&quot;vectorFieldName&quot;</span>: [<span class="hljs-string">&quot;my_vector&quot;</span>],
//     <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//     <span class="hljs-string">&quot;fieldNames&quot;</span>: [
//         <span class="hljs-string">&quot;my_id&quot;</span>,
//         <span class="hljs-string">&quot;my_vector&quot;</span>
//     ],
//     <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//     <span class="hljs-string">&quot;numOfPartitions&quot;</span>: 1,
//     <span class="hljs-string">&quot;primaryFieldName&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//     <span class="hljs-string">&quot;enableDynamicField&quot;</span>: <span class="hljs-literal">true</span>,
//     <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. View Collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   virtual_channel_names: [ &#x27;by-dev-rootcoord-dml_13_449007919953017716v0&#x27; ],</span>
<span class="hljs-comment">//   physical_channel_names: [ &#x27;by-dev-rootcoord-dml_13&#x27; ],</span>
<span class="hljs-comment">//   aliases: [],</span>
<span class="hljs-comment">//   start_positions: [],</span>
<span class="hljs-comment">//   properties: [],</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   schema: {</span>
<span class="hljs-comment">//     fields: [ [Object], [Object] ],</span>
<span class="hljs-comment">//     properties: [],</span>
<span class="hljs-comment">//     name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//     description: &#x27;&#x27;,</span>
<span class="hljs-comment">//     autoID: false,</span>
<span class="hljs-comment">//     enable_dynamic_field: false</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   collectionID: &#x27;449007919953017716&#x27;,</span>
<span class="hljs-comment">//   created_timestamp: &#x27;449024569603784707&#x27;,</span>
<span class="hljs-comment">//   created_utc_timestamp: &#x27;1712892797866&#x27;,</span>
<span class="hljs-comment">//   shards_num: 1,</span>
<span class="hljs-comment">//   consistency_level: &#x27;Bounded&#x27;,</span>
<span class="hljs-comment">//   collection_name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   num_partitions: &#x27;1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 4. View collections</span>

res, err := client.DescribeCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to describe collection:&quot;</span>, err.Error())
}
fmt.Printf(<span class="hljs-string">&quot;ConsistencyLevel: %v\nID: %v\nLoaded: %v\nName: %v\nPhysicalChannels: %v\nProperties: %v\nSchemaField1: %v\nSchemaField2: %v\nShardNum: %v\nVirtualChannels: %v\nSchemaAutoID: %v\nSchemaCollectionName: %v\nSchemaDescription: %v&quot;</span>,
    res.ConsistencyLevel, res.ID, res.Loaded, res.Name, res.PhysicalChannels,
    res.Properties, res.Schema.Fields[<span class="hljs-number">0</span>], res.Schema.Fields[<span class="hljs-number">1</span>], res.ShardNum,
    res.VirtualChannels, res.Schema.AutoID, res.Schema.CollectionName, res.Schema.Description)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// ConsistencyLevel: 2</span>
<span class="hljs-comment">// ID: 453858520413977280</span>
<span class="hljs-comment">// Loaded: false</span>
<span class="hljs-comment">// Name: customized_setup_2</span>
<span class="hljs-comment">// PhysicalChannels: [by-dev-rootcoord-dml_14]</span>
<span class="hljs-comment">// Properties: map[]</span>
<span class="hljs-comment">// SchemaField1: &amp;{100 my_id true false  int64 map[] map[] false false false undefined}</span>
<span class="hljs-comment">// SchemaField2: &amp;{101 my_vector false false  []float32 map[dim:5] map[] false false false undefined}</span>
<span class="hljs-comment">// ShardNum: 1</span>
<span class="hljs-comment">// VirtualChannels: [by-dev-rootcoord-dml_14_453858520413977280v0]</span>
<span class="hljs-comment">// SchemaAutoID: false</span>
<span class="hljs-comment">// SchemaCollectionName: customized_setup_2</span>
<span class="hljs-comment">// SchemaDescription: 2024/11/12 14:06:53 my_rag_collection</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;,
    &quot;collectionName&quot;: &quot;test_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#         &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#         &quot;collectionID&quot;: 448707763883002014,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;test_collection&quot;,</span>
<span class="hljs-comment">#         &quot;consistencyLevel&quot;: &quot;Bounded&quot;,</span>
<span class="hljs-comment">#         &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#         &quot;enableDynamicField&quot;: true,</span>
<span class="hljs-comment">#         &quot;fields&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 100,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;id&quot;,</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: true,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;Int64&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 101,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;params&quot;: [</span>
<span class="hljs-comment">#                     {</span>
<span class="hljs-comment">#                         &quot;key&quot;: &quot;dim&quot;,</span>
<span class="hljs-comment">#                         &quot;value&quot;: &quot;5&quot;</span>
<span class="hljs-comment">#                     }</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;FloatVector&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;indexes&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;indexName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;metricType&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;load&quot;: &quot;LoadStateLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;partitionsNum&quot;: 1,</span>
<span class="hljs-comment">#         &quot;properties&quot;: [],</span>
<span class="hljs-comment">#         &quot;shardsNum&quot;: 1</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para listar todas as colecções existentes, pode fazer o seguinte:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. List all collection names</span>
res = client.list_collections()

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.response.ListCollectionsResp;

<span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 5. List all collection names</span>
collections, err := client.ListCollections(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to list collection:&quot;</span>, err.Error())
}
<span class="hljs-keyword">for</span> _, c := <span class="hljs-keyword">range</span> collections {
    log.Println(c.Name)
}

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// customized_setup_2</span>
<span class="hljs-comment">// quick_setup</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#   &quot;code&quot;: 0,</span>
<span class="hljs-comment">#   &quot;data&quot;: [</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load--Release-Collection" class="common-anchor-header">Carregar e libertar uma coleção<button data-href="#Load--Release-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Durante o processo de carregamento de uma coleção, o Milvus carrega o ficheiro de índice da coleção para a memória. Por outro lado, ao liberar uma coleção, Milvus descarrega o arquivo de índice da memória. Antes de efetuar pesquisas numa coleção, certifique-se de que a coleção está carregada.</p>
<h3 id="Load-a-collection" class="common-anchor-header">Carregar uma coleção</h3><div class="language-python">
<p>Para carregar uma coleção, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a> especificando o nome da coleção. Também pode definir <code translate="no">replica_number</code> para determinar quantas réplicas de segmentos de dados na memória devem ser criadas nos nós de consulta quando a coleção é carregada.</p>
<ul>
<li>Milvus Standalone: O valor máximo permitido para <code translate="no">replica_number</code> é 1.</li>
<li>Milvus Cluster: O valor máximo não deve exceder o <code translate="no">queryNode.replicas</code> definido nas configurações do Milvus. Para obter mais detalhes, consulte <a href="https://milvus.io/docs/configure_querynode.md#Query-Node-related-Configurations">Configurações relacionadas ao nó de consulta</a>.</li>
</ul>
</div>
<div class="language-java">
<p>Para carregar uma coleção, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-javascript">
<p>Para carregar uma coleção, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-go">
<p>Para carregar uma coleção, utilize o método <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/LoadCollection.md"><code translate="no">LoadCollection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-shell">
<p>Para carregar uma coleção, pode utilizar os métodos <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Load.md"><code translate="no">POST /v2/vectordb/collections/load</code></a> e o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> pontos de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    replica_number=<span class="hljs-number">1</span> <span class="hljs-comment"># Number of replicas to create on query nodes. Max value is 1 for Milvus Standalone, and no greater than `queryNode.replicas` for Milvus Cluster.</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;

<span class="hljs-comment">// 6. Load the collection</span>
<span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.loadCollection(loadCollectionReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 7. Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">loadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Load the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 6. Load the collection</span>

err = client.LoadCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-literal">false</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to laod collection:&quot;</span>, err.Error())
}

<span class="hljs-comment">// 7. Get load state of the collection</span>
stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/load&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-a-collection-partially-Public-Preview" class="common-anchor-header">Carregar uma coleção parcialmente (Pré-visualização pública)</h3><div class="alert note">
<p>Esta funcionalidade está atualmente em pré-visualização pública. A API e a funcionalidade podem mudar no futuro.</p>
</div>
<p>Ao receber o seu pedido de carregamento, o Milvus carrega todos os índices dos campos vectoriais e todos os dados dos campos escalares para a memória. Se alguns campos não estiverem envolvidos em pesquisas e consultas, pode excluí-los do carregamento para reduzir a utilização da memória, melhorando o desempenho da pesquisa.</p>
<div class="language-python">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    load_fields=[<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>], <span class="hljs-comment"># Load only the specified fields</span>
    skip_load_dynamic_field=<span class="hljs-literal">True</span> <span class="hljs-comment"># Skip loading the dynamic field</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Note-se que apenas os campos listados em <code translate="no">load_fields</code> podem ser utilizados como condições de filtragem e campos de saída em pesquisas e consultas. Deve incluir sempre a chave primária na lista. Os nomes de campo excluídos do carregamento não estarão disponíveis para filtragem ou saída.</p>
<p>Pode utilizar <code translate="no">skip_load_dynamic_field=True</code> para saltar o carregamento do campo dinâmico. O Milvus trata o campo dinâmico como um único campo, pelo que todas as chaves do campo dinâmico serão incluídas ou excluídas em conjunto.</p>
</div>
<h3 id="Release-a-collection" class="common-anchor-header">Libertar uma coleção</h3><div class="language-python">
<p>Para libertar uma coleção, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-java">
<p>Para libertar uma coleção, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-javascript">
<p>Para libertar uma coleção, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> método, especificando o nome da coleção.</p>
</div>
<div class="language-go">
<p>Para libertar uma coleção, utilize o método <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/ReleaseCollection.md"><code translate="no">ReleaseCollection()</code></a> método, especificando o nome da coleção.</p>
</div>
<div class="language-shell">
<p>Para libertar uma coleção, pode utilizar o método <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Release.md"><code translate="no">POST /v2/vectordb/collections/release</code></a> e o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> pontos de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Release the collection</span>
client.release_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;

<span class="hljs-comment">// 8. Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Release the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 8. Release the collection</span>
errRelease := client.ReleaseCollection(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> errRelease != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to release collection:&quot;</span>, errRelease.Error())
}
fmt.Println(errRelease)
stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// meaning not loaded</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/release&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoad&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-aliases" class="common-anchor-header">Configurar pseudónimos<button data-href="#Set-up-aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode atribuir pseudónimos às colecções para as tornar mais significativas num contexto específico. É possível atribuir vários pseudónimos a uma coleção, mas não é possível partilhar um pseudónimo com várias colecções.</p>
<h3 id="Create-aliases" class="common-anchor-header">Criar aliases</h3><div class="language-python">
<p>Para criar aliases, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_alias.md"><code translate="no">create_alias()</code></a> especificando o nome da coleção e o alias.</p>
</div>
<div class="language-java">
<p>Para criar aliases, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createAlias.md"><code translate="no">createAlias()</code></a> especificando o nome da coleção e o alias.</p>
</div>
<div class="language-javascript">
<p>Para criar aliases, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createAlias.md"><code translate="no">createAlias()</code></a> especificando o nome da coleção e o pseudónimo.</p>
</div>
<div class="language-shell">
<p>Para criar aliases para uma coleção, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/aliases/create</code></a> ponto de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição da coleção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome da coleção para a qual se pretende criar um alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>O pseudónimo da coleção. Antes desta operação, certifique-se de que o pseudónimo ainda não existe. Se existir, ocorrerão excepções.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>O nome da coleção para a qual se pretende criar um alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>O pseudónimo da coleção. Antes desta operação, certifique-se de que o alias ainda não existe. Se existir, ocorrerão excepções.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>O nome da coleção para a qual se pretende criar um alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>O pseudónimo da coleção. Antes desta operação, certifique-se de que o alias ainda não existe. Se existir, ocorrerão excepções.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>O nome da coleção para a qual se pretende criar um alias.</td>
    </tr>
    <tr>
      <td><code translate="no">aliasName</code></td>
      <td>O pseudónimo da coleção. Antes desta operação, certifique-se de que o alias ainda não existe. Se existir, ocorrerão excepções.</td>
    </tr>
  </tbody>
</table>
<h3 id="List-aliases" class="common-anchor-header">Listar aliases</h3><div class="language-python">
<p>Para listar os aliases, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_aliases.md"><code translate="no">list_aliases()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-java">
<p>Para listar aliases, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/listAliases.md"><code translate="no">listAliases()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-javascript">
<p>Para listar os aliases, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listAliases.md"><code translate="no">listAliases()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-shell">
<p>Para listar os aliases de uma coleção, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/List.md"><code translate="no">POST /v2/vectordb/aliases/list</code></a> ponto de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;alice&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Describe-aliases" class="common-anchor-header">Descrever pseudónimos</h3><div class="language-python">
<p>Para descrever aliases, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_alias.md"><code translate="no">describe_alias()</code></a> especificando o alias.</p>
</div>
<div class="language-java">
<p>Para descrever aliases, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> método, especificando o alias.</p>
</div>
<div class="language-javascript">
<p>Para descrever os aliases, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> especificando o alias.</p>
</div>
<div class="language-shell">
<p>Para descrever os aliases de uma coleção, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/aliases/describe</code></a> ponto de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DescribeAliasReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DescribeAliasResp</span>;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-title class_">DescribeAliasReq</span> describeAliasReq = <span class="hljs-title class_">DescribeAliasReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">alias</span>(<span class="hljs-string">&quot;bob&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DescribeAliasResp</span> describeAliasRes = client.<span class="hljs-title function_">describeAlias</span>(describeAliasReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(describeAliasRes));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;collectionName&quot;: &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   alias: &#x27;bob&#x27;,</span>
<span class="hljs-comment">//   collection: &#x27;customized_setup_2&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Reassign-aliases" class="common-anchor-header">Reatribuir aliases</h3><div class="language-python">
<p>Para reatribuir aliases a outras colecções, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/alter_alias.md"><code translate="no">alter_alias()</code></a> especificando o nome da coleção e o alias.</p>
</div>
<div class="language-java">
<p>Para reatribuir aliases a outras colecções, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> especificando o nome da coleção e o pseudónimo.</p>
</div>
<div class="language-javascript">
<p>Para reatribuir aliases a outras colecções, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> especificando o nome da coleção e o pseudónimo.</p>
</div>
<div class="language-shell">
<p>Para reatribuir aliases a outras colecções, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Alter.md"><code translate="no">POST /v2/vectordb/aliases/alter</code></a> ponto de extremidade da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;alice&quot;]</span>

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;bob&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/alter&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
     &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
     &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-aliases" class="common-anchor-header">Eliminar pseudónimos</h3><div class="language-python">
<p>Para eliminar aliases, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_alias.md"><code translate="no">drop_alias()</code></a> especificando o alias.</p>
</div>
<div class="language-java">
<p>Para eliminar aliases, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> especificando o alias.</p>
</div>
<div class="language-javascript">
<p>Para eliminar os pseudónimos, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> especificando o alias.</p>
</div>
<div class="language-shell">
<p>Para eliminar os aliases de uma coleção, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/aliases/drop</code></a> ponto final da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DropAliasReq;

<span class="hljs-comment">// 9.5 Drop alias</span>
<span class="hljs-type">DropAliasReq</span> <span class="hljs-variable">dropAliasReq</span> <span class="hljs-operator">=</span> DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.5 Drop aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Properties" class="common-anchor-header">Definir propriedades<button data-href="#Set-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>É possível definir propriedades para uma coleção, tais como <code translate="no">ttl.seconds</code> e <code translate="no">mmap.enabled</code>. Para obter mais informações, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/set_properties.md">set_properties()</a>.</p>
<div class="alert note">
<p>Os trechos de código nesta secção utilizam o <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">módulo PyMilvus ORM</a> para interagir com Milvus. Os trechos de código com o novo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a> estarão disponíveis em breve.</p>
</div>
<h3 id="Set-TTL" class="common-anchor-header">Definir TTL</h3><p>Define o Time-To-Live (TTL) para os dados na coleção, o que especifica quanto tempo os dados devem ser retidos antes de serem automaticamente eliminados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Set the TTL for the data in the collection</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-MMAP" class="common-anchor-header">Definir MMAP</h3><p>Configure a propriedade de mapeamento de memória (MMAP) para a coleção, que determina se os dados são mapeados na memória para melhorar o desempenho da consulta. Para obter mais informações, consulte <a href="https://milvus.io/docs/mmap.md#Configure-memory-mapping">Configurar mapeamento de memória</a>.</p>
<div class="alert note">
<p>Antes de definir a propriedade MMAP, liberte primeiro a coleção. Caso contrário, ocorrerá um erro.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Before setting memory mapping property, we need to release the collection first.</span>
collection.release()

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-Collection" class="common-anchor-header">Abandonar uma coleção<button data-href="#Drop-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Se uma coleção já não for necessária, pode abandoná-la.</p>
<div class="language-python">
<p>Para eliminar uma coleção, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md"><code translate="no">drop_collection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-java">
<p>Para eliminar uma coleção, utilize o método <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> especificando o nome da coleção.</p>
</div>
<div class="language-javascript">
<p>Para eliminar uma coleção, utilize o método <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> método, especificando o nome da coleção.</p>
</div>
<div class="language-go">
<p>Para eliminar uma coleção, utilize o método <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DropCollection.md"><code translate="no">DropCollection()</code></a> método, especificando o nome da coleção.</p>
</div>
<div class="language-shell">
<p>Para eliminar uma coleção, pode utilizar o <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/collections/drop</code></a> ponto final da API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 10. Drop the collections</span>
client.drop_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-comment">// 10. Drop collections</span>

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropQuickSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.dropCollection(dropQuickSetupParam);

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropCustomizedSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 10. Drop the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 10. Drop collections</span>

err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
