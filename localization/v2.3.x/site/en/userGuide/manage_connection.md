---
id: manage_connection.md
related_key: connect Milvus
summary: Learn how to connect to a Milvus server.
title: Manage Milvus Connections
---
<h1 id="Manage-Milvus-Connections" class="common-anchor-header">Manage Milvus Connections<button data-href="#Manage-Milvus-Connections" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to connect to and disconnect from a Milvus server.</p>
<div class="alert note">
  Ensure to connect to a Milvus server before any operations.
</div>
<p>Milvus supports two ports, port <code translate="no">19530</code> and port <code translate="no">9091</code>:</p>
<ul>
<li><p>Port <code translate="no">19530</code> is for gRPC and RESTful API. It is the default port when you connect to a Milvus server with different Milvus SDKs or HTTP clients.</p></li>
<li><p>Port <code translate="no">9091</code> is for metrics collection, pprof profiling, and health probes within Kubernetes. It serves as a management port.</p></li>
</ul>
<p>The example below demonstrates how to establish a connection to the Milvus server using <code translate="no">localhost</code> as the host and <code translate="no">19530</code> as the port, and then how to properly disconnect from it. If the connection is refused, try unblocking the corresponding port.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<h2 id="Connect-to-a-Milvus-server" class="common-anchor-header">Connect to a Milvus server<button data-href="#Connect-to-a-Milvus-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Construct a Milvus connection. Ensure to connect to Milvus server before any operations.</p>
<div class="alert note">
<p>The following code snippets assume that you have enabled authentication and need to set up a connection using the <strong>root</strong> account with the default password <strong>Milvus</strong>. The <code translate="no">token</code> parameter is a string in the format of <code translate="no">username:password</code>. If you have not set up authentication, you can omit this parameter.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Run `python3` in your terminal to operate in the Python interactive mode.</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections
connections.connect(
  alias=<span class="hljs-string">&quot;default&quot;</span>,
  uri=<span class="hljs-string">&quot;localhost:19530&quot;</span>,
  token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-keyword">const</span> ssl = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, ssl, token});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">milvusClient, err := client.NewGrpcClient(
  context.Background(), <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;localhost:19530&quot;</span>,    <span class="hljs-comment">// addr</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to connect to Milvus:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">final</span> <span class="hljs-type">MilvusServiceClient</span> <span class="hljs-variable">milvusClient</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusServiceClient</span>(
  ConnectParam.newBuilder()
    .withUri(<span class="hljs-string">&quot;localhost:19530&quot;</span>)
    .withToken(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
    .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">connect -h localhost -p <span class="hljs-number">19530</span> -a <span class="hljs-keyword">default</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request <span class="hljs-variable constant_">GET</span> \
    --url <span class="hljs-string">&#x27;localhost:19530/v1/vector/collections&#x27;</span>

{<span class="hljs-string">&quot;code&quot;</span>:<span class="hljs-number">200</span>,<span class="hljs-string">&quot;data&quot;</span>:[<span class="hljs-string">&quot;fouram_sLmXoqnw&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">alias</code></td>
        <td>Alias of the Milvus connection to construct.</td>
    </tr>
    <tr>
        <td><code translate="no">user</code></td>
        <td>Username of the Milvus server.</td>
    </tr>
    <tr>
        <td><code translate="no">password</code></td>
        <td>Password of the username of the Milvus server.</td>
    </tr>
    <tr>
        <td><code translate="no">host</code></td>
        <td>IP address of the Milvus server.</td>
    </tr>
    <tr>
        <td><code translate="no">port</code></td>
        <td>Port of the Milvus server.</td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">address</code></td>
            <td>Address of the Milvus connection to construct.</td>
        </tr>
    <tr>
        <td><code translate="no">username</code></td>
            <td>The username used to connect to Milvus.</td>
        </tr>
    <tr>
        <td><code translate="no">password</code></td>
            <td>The password used to connect to Milvus.</td>
        </tr>
    <tr>
        <td><code translate="no">ssl</code></td>
            <td>SSL connection. It is false by default.</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code translate="no">addr</code></td>
            <td>Address of the Milvus connection to construct.</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">Host</code></td>
        <td>IP address of the Milvus server.</td>
    </tr>
    <tr>
        <td><code translate="no">Port</code></td>
        <td>Port of the Milvus server.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-h (Optional)</td>
            <td>The host name. The default is "127.0.0.1".</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>The port number. The default is "19530".</td>
        </tr>
        <tr>
            <td>-a (Optional)</td>
            <td>The alias name of the Milvus link. The default is "default".</td>
        </tr>
        <tr>
            <td>-D (Optional)</td>
            <td>Flag to disconnect from the Milvus server specified by an alias. The default alias is "default".</td>
        </tr>
    </tbody>
</table>
<div class="language-python">
<h3 id="Return" class="common-anchor-header">Return</h3><p>A Milvus connection created by the passed parameters.</p>
<h3 id="Raises" class="common-anchor-header">Raises</h3><ul>
  <li><b>NotImplementedError</b>: If handler in connection parameters is not GRPC.</li>
  <li><b>ParamError</b>: If pool in connection parameters is not supported.</li>
  <li><b>Exception</b>: If server specified in parameters is not ready, we cannot connect to server.</li>
</ul>
</div>
<h2 id="Disconnect-from-a-Milvus-server" class="common-anchor-header">Disconnect from a Milvus server<button data-href="#Disconnect-from-a-Milvus-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Disconnect from a Milvus server.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python">connections.<span class="hljs-title function_">disconnect</span>(<span class="hljs-string">&quot;default&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">closeConnection</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">milvusClient.Close()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-built_in">close</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">connect -D
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Close your HTTP client connection.</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">alias</code></td>
        <td>Alias of the Milvus server to disconnect from.</td>
    </tr>
    </tbody>
</table>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>The maximum number of connections is 65,536.</p>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Having connected to a Milvus server, you can:</p>
<ul>
<li><a href="/docs/v2.3.x/create_collection.md">Create a collection</a></li>
<li><a href="/docs/v2.3.x/insert_data.md">Manage data</a></li>
<li><a href="/docs/v2.3.x/build_index.md">Build a vector index</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul>
