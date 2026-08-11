---
id: manage-snapshots.md
title: Gestionar instantáneasCompatible with Milvus 3.0.x
summary: >-
  Aprende a crear, enumerar, describir, fijar, restaurar y eliminar
  instantáneas, así como a supervisar las tareas de restauración.
beta: Milvus 3.0.x
---
<h1 id="Manage-Snapshots" class="common-anchor-header">Gestionar instantáneas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Manage-Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta guía, aprenderás a crear y gestionar instantáneas, incluyendo</p>
<ul>
<li><a href="#Create-snapshot">Crear una instantánea</a>,</li>
<li><a href="#List-snapshots">enumerar instantáneas</a>,</li>
<li><a href="#Describe-snapshot">Describir una instantánea</a>,</li>
<li><a href="#Pinunpin-snapshot-data">Anclar o desanclar datos de una instantánea</a>,</li>
<li><a href="#Restore-snapshot">Restaurar una instantánea</a>,</li>
<li><a href="#Drop-snapshot">Eliminar una instantánea</a>,</li>
<li><a href="#List-restoration-jobs">Mostrar una lista de tareas de restauración</a>, y</li>
<li><a href="#Get-restoration-state">Obtener el estado de la restauración</a>.</li>
</ul>
<h2 id="Create-snapshot" class="common-anchor-header">Crear una instantánea<button data-href="#Create-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de crear una instantánea, se recomienda dejar de escribir datos en la colección de destino y llamar a ` <code translate="no">flush()</code> ` para evitar una posible pérdida de datos.</p>
<div class="alert note">
<p>La llamada a ` <code translate="no">flush()</code> ` no es obligatoria, pero se recomienda encarecidamente para evitar la pérdida de datos. Si se omite este paso, la instantánea solo contendrá los datos que ya se hayan vaciado.</p>
</div>
<p>Al nombrar una instantánea, utilice nombres claros y descriptivos, como « <code translate="no">&quot;daily_backup_20240101&quot;</code> » o « <code translate="no">&quot;v2.1_production_release&quot;</code> », y evite términos genéricos, como « <code translate="no">&quot;backup1&quot;</code> » y « <code translate="no">&quot;test&quot;</code> ». Utilice los nombres de las instantáneas con criterio para distinguirlas entre versiones, entornos y etapas.</p>
<p>Los ejemplos de código que aparecen a continuación dan por hecho que ya dispones de una colección denominada <code translate="no">my_collection</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Recommended: Flush data before creating snapshot to ensure all data is included</span>
client.flush(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Create snapshot for entire collection</span>
client.create_snapshot(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    description=<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(context.Background(), &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Token: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})

<span class="hljs-comment">// Recommended: Flush data before creating snapshot to ensure all data is included</span>
err = client.Flush(context.Background(), milvusclient.NewFlushOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Create snapshot</span>
createOpt := milvusclient.NewCreateSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).
    WithDescription(<span class="hljs-string">&quot;Daily backup for January 1st, 2024&quot;</span>)

err = client.CreateSnapshot(context.Background(), createOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-snapshots" class="common-anchor-header">Listar instantáneas<button data-href="#List-snapshots" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede obtener una lista de los nombres de las instantáneas existentes.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all snapshots for a collection</span>
snapshots = client.list_snapshots(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List snapshots for collection</span>
listOpt := milvusclient.NewListSnapshotsOption().
    WithCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)

snapshots, err := client.ListSnapshots(context.Background(), listOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># bash</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-snapshot" class="common-anchor-header">Describir una instantánea<button data-href="#Describe-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede obtener información detallada sobre una instantánea específica.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Snapshot ID: <span class="hljs-subst">{snapshot_info.<span class="hljs-built_in">id</span>}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection: <span class="hljs-subst">{snapshot_info.collection_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created: <span class="hljs-subst">{snapshot_info.create_ts}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Description: <span class="hljs-subst">{snapshot_info.description}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">describeOpt := milvusclient.NewDescribeSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
resp, err := client.DescribeSnapshot(context.Background(), describeOpt)

fmt.Printf(<span class="hljs-string">&quot;Snapshot ID: %d\n&quot;</span>, resp.GetSnapshotInfo().GetId())
fmt.Printf(<span class="hljs-string">&quot;Collection: %s\n&quot;</span>, resp.GetSnapshotInfo().GetCollectionName())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pinunpin-snapshot-data" class="common-anchor-header">Fijar/desfijar datos de una instantánea<button data-href="#Pinunpin-snapshot-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Durante la restauración, puede fijar una instantánea para proteger temporalmente sus datos subyacentes de la recolección de basura, y desmarcarla para liberar los datos.</p>
<p>También puede establecer un tiempo de vida (TTL) para la operación de fijación, de modo que los datos fijados se liberen cuando expire dicho tiempo.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">pin_id = client.pin_snapshot_data(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ttl_seconds=<span class="hljs-number">3600</span>,
)

client.unpin_snapshot_data(
    pin_id=pin_id
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">pinID, err := client.PinSnapshotData(
    context.Background(),
    milvusclient.NewPinSnapshotDataOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>, <span class="hljs-string">&quot;my_collection&quot;</span>).WithTTL(<span class="hljs-number">3600</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">defer</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> {
    _ = client.UnpinSnapshotData(
        context.Background(),
        milvusclient.NewUnpinSnapshotDataOption(pinID),
    )
}()

<span class="hljs-comment">// Do work with pinned snapshot data.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Restore-snapshot" class="common-anchor-header">Restaurar una instantánea<button data-href="#Restore-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Se puede restaurar una instantánea en una nueva colección. Esta operación es asíncrona y devuelve un ID de trabajo para realizar el seguimiento del progreso de la restauración.</p>
<p>La restauración utiliza un mecanismo <strong>de copia de segmentos</strong> en lugar de la importación de datos, lo cual es más eficiente porque</p>
<ul>
<li>copia directamente los archivos de segmentos (binlogs, deltalogs, archivos de índice) desde el almacenamiento de instantáneas</li>
<li>conserva los ID de campo y los ID de índice para garantizar la compatibilidad con los archivos de datos existentes</li>
<li>evita la reescritura de datos y la reconstrucción de índices, lo que se traduce en tiempos de restauración significativamente más rápidos, y</li>
<li>garantiza un aumento del rendimiento de entre 10 y 100 veces en comparación con los métodos tradicionales de copia de seguridad y restauración</li>
</ul>
<p>Para restaurar una instantánea, haz lo siguiente:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Restore snapshot to new collection</span>
job_id = client.restore_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>,
    collection_name=<span class="hljs-string">&quot;restored_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">restoreOpt := milvusclient.NewRestoreSnapshotOption(
    <span class="hljs-string">&quot;backup_20240101&quot;</span>,
    <span class="hljs-string">&quot;restored_collection&quot;</span>
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre cómo supervisar el progreso de una tarea de restauración, consulta <a href="#Get-restoration-state">Obtener el estado de la restauración</a>.</p>
<h2 id="Drop-snapshot" class="common-anchor-header">Eliminar una instantánea<button data-href="#Drop-snapshot" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede eliminar una instantánea si ya no la necesita. Se recomienda eliminar las instantáneas antiguas con regularidad para ahorrar espacio de almacenamiento.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_snapshot(
    snapshot_name=<span class="hljs-string">&quot;backup_20240101&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dropOpt := milvusclient.NewDropSnapshotOption(<span class="hljs-string">&quot;backup_20240101&quot;</span>)
err := client.DropSnapshot(context.Background(), dropOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-restoration-jobs" class="common-anchor-header">Listar tareas de restauración<button data-href="#List-restoration-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede utilizar esta API para obtener una lista de las instantáneas ya creadas para la colección de destino.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># List all restore jobs</span>
jobs = client.list_restore_snapshot_jobs()

<span class="hljs-keyword">for</span> job <span class="hljs-keyword">in</span> jobs:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Job <span class="hljs-subst">{job.job_id}</span>: <span class="hljs-subst">{job.snapshot_name}</span> -&gt; Collection <span class="hljs-subst">{job.collection_id}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  State: <span class="hljs-subst">{job.state}</span>, Progress: <span class="hljs-subst">{job.progress}</span>%&quot;</span>)

<span class="hljs-comment"># List restore jobs for a specific collection</span>
jobs = client.list_restore_snapshot_jobs(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// List all restore jobs</span>
listOpt := milvusclient.NewListRestoreSnapshotJobsOption()
jobs, err := client.ListRestoreSnapshotJobs(context.Background(), listOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-keyword">for</span> _, job := <span class="hljs-keyword">range</span> jobs {
    fmt.Printf(<span class="hljs-string">&quot;Job %d: %s -&gt; Collection %d\n&quot;</span>,
        job.GetJobId(), job.GetSnapshotName(), job.GetCollectionId())
    fmt.Printf(<span class="hljs-string">&quot;  State: %s, Progress: %d%%\n&quot;</span>,
        job.GetState(), job.GetProgress())
}

<span class="hljs-comment">// List restore jobs for a specific collection</span>
listOpt = milvusclient.NewListRestoreSnapshotJobsOption().
    WithCollectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
jobs, err = client.ListRestoreSnapshotJobs(context.Background(), listOpt)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-restoration-state" class="common-anchor-header">Obtener el estado de la restauración<button data-href="#Get-restoration-state" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que dispongas del ID de una tarea de restauración, puedes utilizarlo para consultar el progreso de la restauración.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">state = client.get_restore_snapshot_state(job_id=<span class="hljs-number">12345</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Job ID: <span class="hljs-subst">{state.job_id}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Snapshot Name: <span class="hljs-subst">{state.snapshot_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection ID: <span class="hljs-subst">{state.collection_id}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state.state}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Progress: <span class="hljs-subst">{state.progress}</span>%&quot;</span>)
<span class="hljs-keyword">if</span> state.state == <span class="hljs-string">&quot;RestoreSnapshotFailed&quot;</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Failure Reason: <span class="hljs-subst">{state.reason}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Time Cost: <span class="hljs-subst">{state.time_cost}</span>ms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">stateOpt := milvusclient.NewGetRestoreSnapshotStateOption(<span class="hljs-number">12345</span>)
state, err := client.GetRestoreSnapshotState(context.Background(), stateOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

fmt.Printf(<span class="hljs-string">&quot;Job ID: %d\n&quot;</span>, state.GetJobId())
fmt.Printf(<span class="hljs-string">&quot;Snapshot Name: %s\n&quot;</span>, state.GetSnapshotName())
fmt.Printf(<span class="hljs-string">&quot;Collection ID: %d\n&quot;</span>, state.GetCollectionId())
fmt.Printf(<span class="hljs-string">&quot;State: %s\n&quot;</span>, state.GetState())
fmt.Printf(<span class="hljs-string">&quot;Progress: %d%%\n&quot;</span>, state.GetProgress())
<span class="hljs-keyword">if</span> state.GetState() == milvuspb.RestoreSnapshotState_RestoreSnapshotFailed {
    fmt.Printf(<span class="hljs-string">&quot;Failure Reason: %s\n&quot;</span>, state.GetReason())
}
fmt.Printf(<span class="hljs-string">&quot;Time Cost: %dms\n&quot;</span>, state.GetTimeCost())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
