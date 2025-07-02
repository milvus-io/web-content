---
id: manage-aliases.md
title: Aliase verwalten
summary: >-
  Milvus bietet Funktionen zur Verwaltung von Aliasen. Auf dieser Seite werden
  die Verfahren zum Erstellen, Auflisten, Ändern und Löschen von Aliasen
  beschrieben.
---
<h1 id="Manage-Aliases" class="common-anchor-header">Aliase verwalten<button data-href="#Manage-Aliases" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus ist ein Alias ein zweiter, veränderbarer Name für eine Sammlung. Die Verwendung von Aliasen bietet eine Abstraktionsebene, die es Ihnen ermöglicht, dynamisch zwischen Sammlungen zu wechseln, ohne Ihren Anwendungscode zu ändern. Dies ist besonders in Produktionsumgebungen für nahtlose Datenaktualisierungen, A/B-Tests und andere operative Aufgaben nützlich.</p>
<p>Auf dieser Seite wird gezeigt, wie Sie Sammlungs-Aliase erstellen, auflisten, neu zuordnen und löschen können.</p>
<h2 id="Why-Use-an-Alias" class="common-anchor-header">Warum einen Alias verwenden?<button data-href="#Why-Use-an-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Hauptvorteil der Verwendung eines Alias ist die Entkopplung Ihrer Client-Anwendung von einem bestimmten, physischen Sammlungsnamen.</p>
<p>Stellen Sie sich vor, Sie haben eine Live-Anwendung, die eine Sammlung namens <code translate="no">prod_data</code> abfragt. Wenn Sie die zugrundeliegenden Daten aktualisieren müssen, können Sie die Aktualisierung ohne Dienstunterbrechung durchführen. Der Arbeitsablauf wäre folgender:</p>
<ol>
<li><strong>Erstellen Sie eine neue Sammlung</strong>: Erstellen Sie eine neue Sammlung, zum Beispiel <code translate="no">prod_data_v2</code>.</li>
<li><strong>Daten vorbereiten</strong>: Laden und indizieren Sie die neuen Daten in <code translate="no">prod_data_v2</code>.</li>
<li><strong>Wechseln Sie den Alias</strong>: Sobald die neue Sammlung einsatzbereit ist, weisen Sie den Alias <code translate="no">prod_data</code> von der alten Sammlung atomar auf <code translate="no">prod_data_v2</code> um.</li>
</ol>
<p>Ihre Anwendung sendet weiterhin Anfragen an den Alias <code translate="no">prod_data</code>, ohne dass es zu Ausfallzeiten kommt. Dieser Mechanismus ermöglicht nahtlose Aktualisierungen und vereinfacht Vorgänge wie Blue-Green-Deployments für Ihren Vektorsuchdienst.</p>
<p><strong>Schlüsseleigenschaften von Aliasen:</strong></p>
<ul>
<li>Eine Sammlung kann mehrere Aliasnamen haben.</li>
<li>Ein Alias kann jeweils nur auf eine Sammlung verweisen.</li>
<li>Bei der Verarbeitung einer Anfrage prüft Milvus zunächst, ob eine Sammlung mit dem angegebenen Namen existiert. Wenn nicht, wird geprüft, ob der Name ein Alias für eine Sammlung ist.</li>
</ul>
<h2 id="Create-Alias" class="common-anchor-header">Alias erstellen<button data-href="#Create-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel zeigt, wie man einen Alias für eine Sammlung erstellt.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 9. Manage aliases</span>
<span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>,
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">TOKEN</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root:Milvus&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .alias(<span class="hljs-string">&quot;bob&quot;</span>)
        .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .alias(<span class="hljs-string">&quot;alice&quot;</span>)
        .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)
ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.CreateAlias(ctx, milvusclient.NewCreateAliasOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>, <span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.CreateAlias(ctx, milvusclient.NewCreateAliasOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>, <span class="hljs-string">&quot;alice&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;,
    &quot;collectionName&quot;: &quot;my_collection_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;,
    &quot;collectionName&quot;: &quot;my_collection_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-Aliases" class="common-anchor-header">Aliase auflisten<button data-href="#List-Aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel demonstriert das Verfahren zur Auflistung der Aliasnamen, die einer bestimmten Sammlung zugeordnet sind.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [bob, alice]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">aliases, err := client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/list&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-Alias" class="common-anchor-header">Alias beschreiben<button data-href="#Describe-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel beschreibt einen bestimmten Alias im Detail, einschließlich des Namens der Sammlung, der er zugewiesen wurde.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DescribeAliasReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.DescribeAliasResp;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-type">DescribeAliasReq</span> <span class="hljs-variable">describeAliasReq</span> <span class="hljs-operator">=</span> DescribeAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

<span class="hljs-type">DescribeAliasResp</span> <span class="hljs-variable">describeAliasRes</span> <span class="hljs-operator">=</span> client.describeAlias(describeAliasReq);

System.out.println(describeAliasRes);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// DescribeAliasResp(collectionName=my_collection_1, alias=bob)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>,
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
<span class="hljs-comment">//   collection: &#x27;my_collection_1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">alias, err := client.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption(<span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(alias)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Alter-Alias" class="common-anchor-header">Alias ändern<button data-href="#Alter-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können den Alias, der bereits einer bestimmten Sammlung zugewiesen wurde, einer anderen zuweisen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;my_collection_2&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;my_collection_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
<span class="hljs-type">AlterAliasReq</span> <span class="hljs-variable">alterAliasReq</span> <span class="hljs-operator">=</span> AlterAliasReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_2&quot;</span>)
        .alias(<span class="hljs-string">&quot;alice&quot;</span>)
        .build();

client.alterAlias(alterAliasReq);

<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_2&quot;</span>)
        .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

listAliasesReq = ListAliasesReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection_1&quot;</span>)
        .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [bob]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.AlterAlias(ctx, milvusclient.NewAlterAliasOption(<span class="hljs-string">&quot;alice&quot;</span>, <span class="hljs-string">&quot;my_collection_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

aliases, err := client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_2&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)

aliases, err = client.ListAliases(ctx, milvusclient.NewListAliasesOption(<span class="hljs-string">&quot;my_collection_1&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(aliases)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/alter&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;,
    &quot;collectionName&quot;: &quot;my_collection_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;alice&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_2&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;alice&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;my_collection_1&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Alias" class="common-anchor-header">Alias verwerfen<button data-href="#Drop-Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Der folgende Codeschnipsel demonstriert das Verfahren zum Löschen eines Alias.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    alias=<span class="hljs-string">&quot;alice&quot;</span>
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
<pre><code translate="no" class="language-go">err = client.DropAlias(ctx, milvusclient.NewDropAliasOption(<span class="hljs-string">&quot;bob&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.DropAlias(ctx, milvusclient.NewDropAliasOption(<span class="hljs-string">&quot;alice&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/aliases/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
