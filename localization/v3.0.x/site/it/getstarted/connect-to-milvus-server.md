---
id: connect-to-milvus-server.md
title: Connessione al server Milvus
summary: >-
  In questa sezione viene descritto come stabilire una connessione client a un
  server Milvus e configurare le opzioni di connessione più comuni.
---
<h1 id="Connect-to-Milvus-Server" class="common-anchor-header">Connessione al server Milvus<button data-href="#Connect-to-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come stabilire una connessione client a un server Milvus e configurare le opzioni di connessione più comuni.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>SDK del proprio linguaggio installato. Per ulteriori dettagli, consultare <a href="/docs/it/install-pymilvus.md">SDK Python</a>, <a href="/docs/it/install-java.md">SDK Java</a>, <a href="/docs/it/install-go.md">SDK Go</a> o <a href="/docs/it/install-node.md">SDK Node.js</a>.</p></li>
<li><p>Un indirizzo del server Milvus (per l'impostazione predefinita locale: <code translate="no">http://localhost:19530</code>, porta proxy <strong>19530</strong>).</p></li>
<li><p>Se <a href="/docs/it/authenticate.md">l’autenticazione è abilitata</a>, fornire un <strong>token</strong> oppure un <strong>nome utente e una password</strong>. Un token può essere <code translate="no">username:password</code> (ad es., <code translate="no">root:Milvus</code>). Per ulteriori dettagli, consultare <a href="/docs/it/authenticate.md">Autenticazione dell’accesso utente</a> e <a href="/docs/it/users_and_roles.md">Creazione di utenti e ruoli</a>.</p></li>
</ul>
<h2 id="Connect-by-URI-authentication-disabled" class="common-anchor-header">Connessione tramite URI (autenticazione disabilitata)<button data-href="#Connect-by-URI-authentication-disabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare l’indirizzo del server Milvus (ad es. <code translate="no">http://localhost:19530</code>) per stabilire una connessione.</p>
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
<h2 id="Connect-with-credentials-authentication-enabled" class="common-anchor-header">Connessione con credenziali (autenticazione abilitata)<button data-href="#Connect-with-credentials-authentication-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Fornire un <strong>token</strong> nel formato <code translate="no">&quot;username:password&quot;</code> oppure separatamente <code translate="no">user</code> e <code translate="no">password</code>. L’amministratore predefinito integrato è <code translate="no">root:Milvus</code> (modificarlo per l’ambiente di produzione).</p>
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
<p>Il formato del token è <code translate="no">&quot;&lt;username&gt;:&lt;password&gt;&quot;</code>. La documentazione indica esplicitamente <code translate="no">root:Milvus</code> come credenziale predefinita, mentre la guida <a href="/docs/it/users_and_roles.md">"Crea utenti e ruoli</a> " illustra la gestione degli utenti.</p>
</div>
<h2 id="Configure-a-timeout" class="common-anchor-header">Configurare un timeout<button data-href="#Configure-a-timeout" class="anchor-icon" translate="no">
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
    </button></h2><p>Impostare un timeout predefinito per la connessione client:</p>
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
<li><p>Per gli SDK sopra elencati, questo timeout viene utilizzato solo durante l’instaurazione delle connessioni e non funge da timeout predefinito per altre operazioni API.</p></li>
<li><p>Per l’API RESTful, ` <code translate="no">Request-Timeout</code> ` è un limite di tempo per ogni richiesta espresso in secondi (a differenza di ` <code translate="no">rpcDeadlineMs</code> ` in Java e ` <code translate="no">timeout</code>` in Node.js, che sono in millisecondi), quindi includilo in ogni chiamata che richiede un limite di tempo.</p></li>
</ul>
</div>
<h2 id="Connect-to-a-specific-database" class="common-anchor-header">Connettersi a un database specifico<button data-href="#Connect-to-a-specific-database" class="anchor-icon" translate="no">
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
    </button></h2><p>Scegliere il database di destinazione durante la creazione con ` <code translate="no">db_name</code>`. È anche possibile cambiarlo in un secondo momento utilizzando ` <code translate="no">using_database()</code>`.</p>
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
<p>Consulta la guida <a href="/docs/it/manage_databases.md">ai database</a> per creare, elencare e descrivere i database, nonché per attività più ampie di gestione dei database.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/it/create-collection.md">Crea una raccolta</a></p></li>
<li><p><a href="/docs/it/insert-update-delete.md">Inserire entità</a></p></li>
<li><p><a href="/docs/it/single-vector-search.md">Ricerca vettoriale di base</a></p></li>
</ul>
