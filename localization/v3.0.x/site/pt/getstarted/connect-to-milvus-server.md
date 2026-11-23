---
id: connect-to-milvus-server.md
title: Ligar-se ao servidor Milvus
summary: >-
  Este tópico descreve como estabelecer uma ligação de cliente a um servidor
  Milvus e configurar opções comuns de ligação.
---
<h1 id="Connect-to-Milvus-Server" class="common-anchor-header">Ligar-se ao servidor Milvus<button data-href="#Connect-to-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como estabelecer uma ligação de cliente a um servidor Milvus e configurar opções de ligação comuns.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>O SDK da sua linguagem deve estar instalado. Para mais detalhes, consulte <a href="/docs/pt/install-pymilvus.md">o SDK</a> para <a href="/docs/pt/install-pymilvus.md">Python</a>, <a href="/docs/pt/install-java.md">o SDK para Java</a>, <a href="/docs/pt/install-go.md">o SDK para Go</a> ou <a href="/docs/pt/install-node.md">o SDK para Node.js</a>.</p></li>
<li><p>Um endereço do servidor Milvus (para a configuração local predefinida: <code translate="no">http://localhost:19530</code>, porta de proxy <strong>19530</strong>).</p></li>
<li><p>Se <a href="/docs/pt/authenticate.md">a autenticação estiver ativada</a>, forneça um <strong>token</strong> ou um <strong>nome de utilizador + palavra-passe</strong>. Um token pode ser <code translate="no">username:password</code> (por exemplo, <code translate="no">root:Milvus</code>). Consulte <a href="/docs/pt/authenticate.md">Autenticar o acesso do utilizador</a> e <a href="/docs/pt/users_and_roles.md">Criar utilizadores e funções</a> para obter mais detalhes.</p></li>
</ul>
<h2 id="Connect-by-URI-authentication-disabled" class="common-anchor-header">Ligar-se por URI (autenticação desativada)<button data-href="#Connect-by-URI-authentication-disabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o endereço do servidor Milvus (por exemplo, <code translate="no">http://localhost:19530</code>) para estabelecer uma ligação.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># The RESTful API is stateless, so there is no persistent connection.</span>
<span class="hljs-comment"># Each request hits the server directly; the /collections/list endpoint</span>
<span class="hljs-comment"># doubles as a health check when you need to verify reachability.</span>
<span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-with-credentials-authentication-enabled" class="common-anchor-header">Ligar com credenciais (autenticação ativada)<button data-href="#Connect-with-credentials-authentication-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Forneça um <strong>token</strong> no formato <code translate="no">&quot;username:password&quot;</code> ou, separadamente, <code translate="no">user</code> e <code translate="no">password</code>. O administrador predefinido integrado é <code translate="no">root:Milvus</code> (altere isto para o ambiente de produção).</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Token form</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

<span class="hljs-comment"># Or explicit user/password</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    user=<span class="hljs-string">&quot;root&quot;</span>,
    password=<span class="hljs-string">&quot;Milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .username(<span class="hljs-string">&quot;root&quot;</span>)
        .password(<span class="hljs-string">&quot;Milvus&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Username: <span class="hljs-string">&quot;root&quot;</span>,
    Password: <span class="hljs-string">&quot;Milvus&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O formato do token é <code translate="no">&quot;&lt;username&gt;:&lt;password&gt;&quot;</code>. A documentação indica explicitamente <code translate="no">root:Milvus</code> como credencial predefinida, e o guia <a href="/docs/pt/users_and_roles.md">«Criar utilizadores e funções»</a> aborda a gestão de utilizadores.</p>
</div>
<h2 id="Configure-a-timeout" class="common-anchor-header">Configurar um tempo de espera<button data-href="#Configure-a-timeout" class="anchor-icon" translate="no">
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
    </button></h2><p>Defina um tempo de espera predefinido para a ligação do cliente:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, timeout=<span class="hljs-number">1</span>) <span class="hljs-comment"># Unit: seconds. If not set, the client waits up to 10 seconds to connect.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .rpcDeadlineMs(<span class="hljs-number">1000</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>,
   <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span> <span class="hljs-comment">// ms</span>
});
<span class="hljs-comment">// await client.listCollections({ timeout: 2000})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
<span class="hljs-keyword">defer</span> cancel()
c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Request-Timeout is applied per-request (unit: seconds). --max-time</span>
<span class="hljs-comment"># caps the total curl wall-clock so the client gives up even if the</span>
<span class="hljs-comment"># server never responds.</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    --max-time 7 \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Para os SDKs acima referidos, este tempo de espera é utilizado apenas ao estabelecer ligações e não serve como tempo de espera predefinido para outras operações da API.</p></li>
<li><p>Para a API RESTful, ` <code translate="no">Request-Timeout</code> ` é um prazo por pedido, expresso em segundos (ao contrário de ` <code translate="no">rpcDeadlineMs</code> ` no Java e de ` <code translate="no">timeout</code>` no Node.js, que são em milissegundos), pelo que deve ser incluído em todas as chamadas que necessitem de um prazo.</p></li>
</ul>
</div>
<h2 id="Connect-to-a-specific-database" class="common-anchor-header">Ligar-se a uma base de dados específica<button data-href="#Connect-to-a-specific-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha a base de dados de destino durante a construção com ` <code translate="no">db_name</code>`. Também pode mudar mais tarde utilizando ` <code translate="no">using_database()</code>`.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Set the database when creating the client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
    db_name=<span class="hljs-string">&quot;analytics&quot;</span>,
)

<span class="hljs-comment"># (Optional) Switch the active database later</span>
<span class="hljs-comment"># client.using_database(&quot;reports&quot;)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .username(<span class="hljs-string">&quot;root&quot;</span>)
        .password(<span class="hljs-string">&quot;Milvus&quot;</span>)
        .dbName(<span class="hljs-string">&quot;analytics&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>,
   <span class="hljs-attr">database</span>: <span class="hljs-string">&#x27;analytics&#x27;</span>
});
<span class="hljs-comment">// (Optional) Switch the active database later</span>
<span class="hljs-comment">// await milvusClient.useDatabase({</span>
<span class="hljs-comment">//   db_name: &#x27;reports&#x27;,</span>
<span class="hljs-comment">//});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    DBName:  <span class="hljs-string">&quot;analytics&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-comment">// (Optional) switch the active database later with:</span>
err = c.UseDatabase(ctx, milvusclient.NewUseDatabaseOption(<span class="hljs-string">&quot;reports&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Target a specific database by setting &quot;dbName&quot; in the request body.</span>
<span class="hljs-comment"># The RESTful API is stateless, so include &quot;dbName&quot; on every request</span>
<span class="hljs-comment"># that should run against a non-default database.</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{
      &quot;dbName&quot;: &quot;analytics&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Consulte o guia <a href="/docs/pt/manage_databases.md">de bases de dados</a> para criar, listar e descrever bases de dados, bem como para tarefas mais abrangentes de gestão de bases de dados.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/pt/create-collection.md">Criar coleção</a></p></li>
<li><p><a href="/docs/pt/insert-update-delete.md">Inserir entidades</a></p></li>
<li><p><a href="/docs/pt/single-vector-search.md">Pesquisa vetorial básica</a></p></li>
</ul>
