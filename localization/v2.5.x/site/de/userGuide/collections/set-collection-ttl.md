---
id: set-collection-ttl.md
title: TTL für Sammlungen festlegen
summary: >-
  Sobald Daten in eine Sammlung eingefügt werden, verbleiben sie dort
  standardmäßig. In manchen Szenarien möchten Sie jedoch Daten nach einer
  bestimmten Zeit entfernen oder bereinigen. In solchen Fällen können Sie die
  Eigenschaft "Time-to-Live" (TTL) der Sammlung so konfigurieren, dass Milvus
  die Daten automatisch löscht, sobald die TTL abgelaufen ist.
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">TTL für Sammlungen festlegen<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>Sobald Daten in eine Sammlung eingefügt werden, bleiben sie dort standardmäßig. In manchen Szenarien möchten Sie jedoch Daten nach einer bestimmten Zeit entfernen oder bereinigen. In solchen Fällen können Sie die Eigenschaft Time-to-Live (TTL) der Sammlung so konfigurieren, dass Milvus die Daten automatisch löscht, sobald die TTL abgelaufen ist.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Time-to-Live (TTL) wird in Datenbanken häufig für Szenarien verwendet, in denen Daten nur für einen bestimmten Zeitraum nach dem Einfügen oder Ändern gültig oder zugänglich bleiben sollen. Danach können die Daten automatisch entfernt werden.</p>
<p>Wenn Sie beispielsweise täglich Daten einspielen, aber nur 14 Tage lang Datensätze aufbewahren müssen, können Sie Milvus so konfigurieren, dass alle Daten, die älter sind als diese, automatisch entfernt werden, indem Sie die TTL der Sammlung auf <strong>14 × 24 × 3600 = 1209600</strong> Sekunden einstellen. Dadurch wird sichergestellt, dass nur die Daten der letzten 14 Tage in der Sammlung verbleiben.</p>
<p>Die TTL-Eigenschaft in einer Milvus-Sammlung wird als ganze Zahl in Sekunden angegeben. Einmal festgelegt, werden alle Daten, die ihre TTL überschreiten, automatisch aus der Sammlung gelöscht.</p>
<p>Da der Löschvorgang asynchron abläuft, werden die Daten möglicherweise nicht genau dann aus den Suchergebnissen entfernt, wenn die angegebene TTL verstrichen ist. Stattdessen kann es zu einer Verzögerung kommen, da die Entfernung von der Garbage Collection (GC) und den Verdichtungsprozessen abhängt, die in nicht-deterministischen Intervallen stattfinden.</p>
<h2 id="Set-TTL" class="common-anchor-header">TTL setzen<button data-href="#Set-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die TTL-Eigenschaft festlegen, wenn Sie</p>
<ul>
<li><p><a href="/docs/de/set-collection-ttl.md#null">eine Sammlung erstellen.</a></p></li>
<li><p><a href="/docs/de/set-collection-ttl.md#null">die TTL-Eigenschaft einer bestehenden Sammlung ändern.</a></p></li>
</ul>
<h3 id="Set-TTL-when-creating-a-collection" class="common-anchor-header">TTL bei der Erstellung einer Sammlung festlegen</h3><p>Das folgende Codeschnipsel zeigt, wie die TTL-Eigenschaft beim Erstellen einer Sammlung festgelegt wird.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># With TTL</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-start</span>
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// With TTL</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq5</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
        .collectionSchema(schema)
        <span class="hljs-comment">// highlight-next-line</span>
        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;1209600&quot;</span>)
        .build();
client.createCollection(customizedSetupReq5);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-comment">// highlight-start</span>
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
    <span class="hljs-comment">// highlight-end</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/common&quot;</span>
)

err = cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_5&quot;</span>, schema).
        WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-TTL-for-an-existing-collection" class="common-anchor-header">TTL für eine bestehende Sammlung festlegen</h3><p>Der folgende Codeschnipsel demonstriert, wie die TTL-Eigenschaft in einer bestehenden Sammlung geändert werden kann.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">alter_collection_properties</span>(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">String</span>&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);

<span class="hljs-title class_">AlterCollectionReq</span> alterCollectionReq = <span class="hljs-title class_">AlterCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">properties</span>(properties)
        .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">alterCollection</span>(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

<span class="hljs-keyword">defer</span> cli.Close(ctx)

err = cli.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-TTL-setting" class="common-anchor-header">TTL-Einstellung aufheben<button data-href="#Drop-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie beschließen, die Daten in einer Sammlung auf unbestimmte Zeit aufzubewahren, können Sie die TTL-Einstellung für diese Sammlung einfach löschen.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_collection_properties</span>(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">propertyKeys = <span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>[<span class="hljs-number">1</span>]
propertyKeys[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;collection.ttl.second&quot;</span>

<span class="hljs-title class_">DropCollectionReq</span> dropCollectionReq = <span class="hljs-title class_">DropCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">propertyKeys</span>(propertyKeys)
        .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">dropCollection</span>(dropCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

<span class="hljs-keyword">defer</span> cli.Close(ctx)

err = cli.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 60
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
