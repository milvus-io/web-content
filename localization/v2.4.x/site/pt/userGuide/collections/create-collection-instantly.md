---
id: create-collection-instantly.md
title: Criar coleção instantaneamente
---
<h1 id="Create-Collection-Instantly​" class="common-anchor-header">Criar coleção instantaneamente<button data-href="#Create-Collection-Instantly​" class="anchor-icon" translate="no">
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
    </button></h1><p>Pode criar uma coleção instantaneamente definindo o seu nome e a dimensionalidade do campo vetorial. O Milvus indexa automaticamente o campo vetorial e carrega a coleção aquando da sua criação. Esta página demonstra como criar uma coleção instantaneamente com as configurações padrão.</p>
<h2 id="Overview​" class="common-anchor-header">Descrição geral<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma coleção é uma tabela bidimensional com colunas fixas e linhas variantes. Cada coluna representa um campo e cada linha representa uma entidade. É necessário um esquema para implementar esta gestão estrutural de dados. Cada entidade a inserir tem de cumprir os condicionalismos definidos no esquema.</p>
<p>As aplicações AIGC utilizam geralmente bases de dados vectoriais como base de conhecimentos para gerir os dados gerados durante a interação entre os utilizadores e os grandes modelos linguísticos (LLM). Estas bases de conhecimentos são praticamente semelhantes. Para acelerar a utilização dos agregados Milvus em tais cenários, está disponível um método instantâneo para criar uma coleção com apenas dois parâmetros, nomeadamente o nome da coleção e a dimensionalidade do campo vetorial.</p>
<p>Quando cria uma coleção instantaneamente com as predefinições, aplicam-se as seguintes definições.</p>
<ul>
<li><p>Os campos primário e vetorial são adicionados ao esquema<strong>(id</strong> e <strong>vetor</strong>).</p></li>
<li><p>O campo primário aceita números inteiros e desactiva <strong>o AutoId</strong>.</p></li>
<li><p>O campo vetor aceita incorporações de vectores flutuantes.</p></li>
<li><p><strong>AUTOINDEX</strong> é utilizado para criar um índice no campo vetorial.</p></li>
<li><p><strong>COSINE</strong> é utilizado para medir as semelhanças entre as incorporações vectoriais.</p></li>
<li><p>O campo dinâmico de reservas denominado <strong>$meta</strong> é ativado para guardar campos não definidos pelo esquema e os seus valores em pares de valores chave.</p></li>
<li><p>A coleção é carregada automaticamente aquando da criação.</p></li>
</ul>
<p>Para obter detalhes sobre as terminologias acima, consulte <a href="/docs/pt/manage-collections.md">Coleção explicada</a>. </p>
<p>É importante notar que a criação instantânea de uma coleção com as predefinições não se adequa a todos os cenários. Aconselha-se a familiarizar-se com o <a href="/docs/pt/create-collection.md">procedimento comum de criação de colecções</a> para que possa compreender melhor as capacidades do Milvus.</p>
<h2 id="Quick-Setup​" class="common-anchor-header">Configuração rápida<button data-href="#Quick-Setup​" class="anchor-icon" translate="no">
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
    </button></h2><p>Desta forma, pode criar uma coleção instantaneamente apenas com o nome da coleção e a dimensionalidade do campo vetorial.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
TOKEN = <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
<span class="hljs-comment"># 1. Set up a Milvus client​</span>
client = MilvusClient(​
    uri=CLUSTER_ENDPOINT,​
    token=TOKEN ​
)​
​
<span class="hljs-comment"># 2. Create a collection in quick setup mode​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    dimension=<span class="hljs-number">5</span>​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .dimension(<span class="hljs-number">5</span>)​
        .build();​
​
client.createCollection(quickSetupReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);​
System.out.println(res);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client​</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,​
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,​
});  ​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;dimension&quot;: 5​
}&#x27;</span>​
​
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,​</span>
<span class="hljs-comment">#     &quot;data&quot;: {}​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Quick-Setup-with-Custom-Fields​" class="common-anchor-header">Configuração rápida com campos personalizados<button data-href="#Quick-Setup-with-Custom-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Se o tipo de métrica padrão, os nomes de campo e os tipos de dados não atenderem às suas necessidades, é possível ajustar essas configurações da seguinte forma.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
CLUSTER_ENDPOINT = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
TOKEN = <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
<span class="hljs-comment"># 1. Set up a Milvus client​</span>
client = MilvusClient(​
    uri=CLUSTER_ENDPOINT,​
    token=TOKEN ​
)​
​
<span class="hljs-comment"># 2. Create a collection in quick setup mode​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;custom_quick_setup&quot;</span>,​
    dimension=<span class="hljs-number">5</span>,​
    primary_field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    id_type=<span class="hljs-string">&quot;string&quot;</span>,​
    vector_field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,​
    auto_id=<span class="hljs-literal">True</span>,​
    max_length=<span class="hljs-number">512</span>​
)​
​
res = client.get_load_state(​
    collection_name=<span class="hljs-string">&quot;custom_quick_setup&quot;</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {​</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;​</span>
<span class="hljs-comment"># }​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
​
<span class="hljs-comment">// 1. Connect to Milvus server​</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(CLUSTER_ENDPOINT)​
        .token(TOKEN)​
        .build();​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customQuickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;custom_quick_setup&quot;</span>)​
        .dimension(<span class="hljs-number">5</span>)​
        .primaryFieldName(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .idType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        .vectorFieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .metricType(<span class="hljs-string">&quot;L2&quot;</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .build();​
​
client.createCollection(customQuickSetupReq);​
​
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customQuickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()​
        .collectionName(<span class="hljs-string">&quot;custom_quick_setup&quot;</span>)​
        .build();​
​
<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(customQuickSetupLoadStateReq);​
System.out.println(res);​
​
<span class="hljs-comment">// Output:​</span>
<span class="hljs-comment">// true​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 1. Set up a Milvus Client​</span>
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 2. Create a collection in quick setup mode​</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;custom_quick_setup&quot;</span>,​
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">primary_field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">id_type</span>: <span class="hljs-string">&quot;Varchar&quot;</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
    <span class="hljs-attr">vector_field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,​
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>​
});  ​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// Success​</span>
<span class="hljs-comment">// ​</span>
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;custom_quick_setup&quot;</span>​
})​
​
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// ​</span>
<span class="hljs-comment">// LoadStateLoaded​</span>
<span class="hljs-comment">// ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Go 缺失​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;custom_quick_setup&quot;,​
    &quot;dimension&quot;: 5,​
    &quot;primaryFieldName&quot;: &quot;my_id&quot;,​
    &quot;idType&quot;: &quot;VarChar&quot;,​
    &quot;vectorFieldName&quot;: &quot;my_vector&quot;,​
    &quot;metricType&quot;: &quot;L2&quot;,​
    &quot;autoId&quot;: true,​
    &quot;params&quot;: {​
        &quot;max_length&quot;: &quot;512&quot;​
    }​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Se as coleções criadas usando as duas maneiras acima ainda não atenderem às suas necessidades, considere seguir o procedimento em <a href="/docs/pt/create-collection.md">Criar coleção</a>.</p>
