---
id: bulk-import-in-cdc-replication.md
summary: >-
  Descubre cómo realizar una importación masiva en clústeres de Milvus que
  utilizan la replicación CDC.
title: Importación masiva en la replicación CDC
---
<h1 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">Importación masiva en la replicación CDC<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía explica cómo realizar una importación masiva en clústeres de Milvus que forman parte de una topología de replicación CDC. En un clúster de replicación, la importación masiva debe utilizar la confirmación en dos fases (2PC) para que la importación se confirme como un único punto ordenado en los clústeres primario y de reserva.</p>
<p>En esta guía, el clúster primario es el clúster Milvus de origen, y el clúster de reserva es el clúster Milvus de destino.</p>
<p>Antes de empezar, asegúrate de que la replicación CDC ya esté configurada entre tus clústeres. Para obtener más información, consulta <a href="/docs/es/set_up_cdc_replication.md">«Configurar la replicación CDC</a>».</p>
<h2 id="Why-2PC-is-required" class="common-anchor-header">Por qué es necesario el 2PC<button data-href="#Why-2PC-is-required" class="anchor-icon" translate="no">
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
    </button></h2><p>Una importación masiva normal se confirma automáticamente cuando finaliza el trabajo de importación, lo que hace que los datos importados sean visibles de inmediato. En una topología de replicación CDC, este comportamiento no está permitido porque los clústeres primario y de reserva deben hacer que los datos importados sean visibles en el mismo punto lógico.</p>
<p>En su lugar, ejecute la importación en modo de confirmación en dos fases configurando « <code translate="no">auto_commit=false</code> »:</p>
<ol>
<li><p><strong>Fase de importación</strong>: Milvus carga los datos en el clúster primario y replica la importación al clúster de reserva, pero los datos importados permanecen invisibles. El trabajo de importación se detiene en el estado « <code translate="no">Uncommitted</code> » y queda en espera.</p></li>
<li><p><strong>Fase de confirmación</strong>: Se confirma explícitamente el trabajo de importación en el clúster primario. La confirmación se replica en el clúster de reserva como una única valla ordenada, de modo que ambos clústeres hacen visibles los datos importados en el mismo punto lógico.</p></li>
</ol>
<h2 id="Step-1-Enable-import-in-a-replicating-cluster" class="common-anchor-header">Paso 1: Habilitar la importación en un clúster de replicación<button data-href="#Step-1-Enable-import-in-a-replicating-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>La importación en un clúster de replicación está desactivada por defecto. Actívala configurando ` <code translate="no">dataCoord.import.enableInReplicatingCluster</code> ` como ` <code translate="no">true</code> ` tanto en el clúster primario como en el clúster de reserva.</p>
<p>Si implementa Milvus con Milvus Operator, añada la siguiente configuración a ` <code translate="no">spec.config</code> ` de cada recurso ` <code translate="no">Milvus</code> `:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">import:</span>
        <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si configura Milvus directamente a través de ` <code translate="no">milvus.yaml</code>`, añada la siguiente configuración:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">import:</span>
    <span class="hljs-attr">enableInReplicatingCluster:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuración se puede actualizar, por lo que puede surtir efecto sin necesidad de un reinicio completo.</p>
<p>Cuando esta configuración está habilitada, un clúster de replicación solo acepta importaciones con <code translate="no">auto_commit=false</code>. La siguiente tabla enumera las solicitudes rechazadas más comunes:</p>
<table>
<thead>
<tr><th>Situación</th><th>Mensaje de error</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dataCoord.import.enableInReplicatingCluster</code> no está habilitado</td><td><code translate="no">import in replicating cluster is not supported yet</code></td></tr>
<tr><td><code translate="no">auto_commit=true</code> Se envía</td><td><code translate="no">auto_commit=true import in replicating cluster is not supported</code></td></tr>
</tbody>
</table>
<h2 id="Step-2-Run-a-2PC-import" class="common-anchor-header">Paso 2: Ejecutar una importación 2PC<button data-href="#Step-2-Run-a-2PC-import" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecuta todas las llamadas de importación en el clúster primario. Los datos importados y la decisión de confirmación se replican automáticamente en el clúster de reserva, por lo que no debes enviar ni confirmar la importación en el clúster de reserva por tu cuenta.</p>
<p>Cada clúster lee los archivos de importación desde su propio almacenamiento de objetos. Asegúrate de que los archivos que se van a importar existan tanto en el almacenamiento de objetos primario como en el de reserva. Puedes subir los archivos a ambos clústeres o utilizar un almacenamiento de objetos al que ambos clústeres puedan acceder. Si faltan archivos en el clúster de reserva, la importación replicada fallará allí con un error de «objeto no encontrado».</p>
<p>En el siguiente ejemplo se utilizan los ayudantes de importación basados en REST de <code translate="no">pymilvus.bulk_writer</code>. Los valores de <code translate="no">url</code> son las mismas direcciones de Milvus que utilizas para otras llamadas a la API.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> bulk_import, commit_import, get_import_progress

primary_url = <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
standby_url = <span class="hljs-string">&quot;http://127.0.0.1:19531&quot;</span>

collection_name = <span class="hljs-string">&quot;demo_collection&quot;</span>

<span class="hljs-comment"># Object-storage paths of the files to import. Prepare these files the same</span>
<span class="hljs-comment"># way as a normal bulk import, for example by using BulkWriter.</span>
files = [
    [<span class="hljs-string">&quot;import-data/part-1.parquet&quot;</span>],
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">wait_for_state</span>(<span class="hljs-params">url, job_id, target_state, timeout=<span class="hljs-number">600</span></span>):
    deadline = time.time() + timeout
    <span class="hljs-keyword">while</span> time.time() &lt; deadline:
        resp = get_import_progress(url=url, job_id=job_id)
        data = resp.json().get(<span class="hljs-string">&quot;data&quot;</span>, {})
        state = data.get(<span class="hljs-string">&quot;state&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;[<span class="hljs-subst">{url}</span>] job <span class="hljs-subst">{job_id}</span> state=<span class="hljs-subst">{state}</span>, progress=<span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;progress&#x27;</span>)}</span>&quot;</span>)

        <span class="hljs-keyword">if</span> state == target_state:
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">if</span> state == <span class="hljs-string">&quot;Failed&quot;</span>:
            <span class="hljs-keyword">raise</span> RuntimeError(
                <span class="hljs-string">f&quot;import job <span class="hljs-subst">{job_id}</span> failed on <span class="hljs-subst">{url}</span>: <span class="hljs-subst">{data.get(<span class="hljs-string">&#x27;reason&#x27;</span>)}</span>&quot;</span>
            )

        time.sleep(<span class="hljs-number">3</span>)

    <span class="hljs-keyword">raise</span> TimeoutError(<span class="hljs-string">f&quot;job <span class="hljs-subst">{job_id}</span> did not reach <span class="hljs-subst">{target_state}</span> on <span class="hljs-subst">{url}</span>&quot;</span>)


<span class="hljs-comment"># Start a 2PC import on the primary cluster. In a replicating cluster,</span>
<span class="hljs-comment"># auto_commit=false is required, and the job stops at the Uncommitted state.</span>
resp = bulk_import(
    url=primary_url,
    collection_name=collection_name,
    files=files,
    options={<span class="hljs-string">&quot;auto_commit&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>},
)
job_id = resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;started 2PC import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until both clusters report Uncommitted. The same job ID is used on the</span>
<span class="hljs-comment"># primary and standby clusters because the import is replicated through CDC.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Uncommitted&quot;</span>)

<span class="hljs-comment"># Commit once on the primary cluster. Do not commit on the standby cluster.</span>
commit_import(url=primary_url, job_id=job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;committed import job: <span class="hljs-subst">{job_id}</span>&quot;</span>)

<span class="hljs-comment"># Wait until the import is completed and visible on both clusters.</span>
wait_for_state(primary_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
wait_for_state(standby_url, job_id, <span class="hljs-string">&quot;Completed&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;import committed and visible on both clusters&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Why-wait-for-Uncommitted-on-both-clusters" class="common-anchor-header">¿Por qué esperar a que <code translate="no">Uncommitted</code> se ejecute en ambos clústeres?<button data-href="#Why-wait-for-Uncommitted-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Realizar la confirmación antes de que el clúster de reserva haya terminado de importar no daña los datos, pero el clúster de reserva aún se está poniendo al día cuando se aplica la confirmación. Esperar hasta que tanto el clúster primario como el de reserva informen de <code translate="no">Uncommitted</code> confirma que los datos importados se han replicado por completo y que ambos clústeres están listos para hacerlos visibles conjuntamente.</p>
<h2 id="Step-3-Verify-the-data" class="common-anchor-header">Paso 3: Verificar los datos<button data-href="#Step-3-Verify-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que el trabajo alcanza el estado « <code translate="no">Completed</code> », las entidades importadas son visibles en ambos clústeres. Carga y consulta la colección en el clúster primario; a continuación, ejecuta la misma consulta en el clúster de reserva sin cargar manualmente la colección allí y confirma que las entidades importadas están presentes en ambos clústeres.</p>
<p>El clúster de reserva es de solo lectura mientras permanezca en estado de reserva. No envíe importaciones, confirmaciones ni otras operaciones DDL o DCL directamente al clúster de reserva. Realice estas operaciones en el clúster primario y deje que la replicación CDC las aplique al clúster de reserva.</p>
<h2 id="FAQ" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-cluster-should-I-run-the-import-and-commit-on" class="common-anchor-header">¿En qué clúster debo ejecutar la importación y la confirmación?<button data-href="#Which-cluster-should-I-run-the-import-and-commit-on" class="anchor-icon" translate="no">
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
    </button></h3><p>Ejecute la importación y la confirmación en el clúster primario. El clúster de reserva recibe tanto los datos importados como la confirmación a través de la replicación CDC.</p>
<h3 id="Do-I-need-to-commit-on-the-standby-cluster" class="common-anchor-header">¿Tengo que realizar la confirmación en el clúster de reserva?<button data-href="#Do-I-need-to-commit-on-the-standby-cluster" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Al realizar la confirmación en el clúster primario, esta se replica en el clúster de espera como una única valla ordenada.</p>
<h3 id="Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="common-anchor-header">¿Por qué falla mi importación con el error « <code translate="no">import in replicating cluster is not supported yet</code> »?<button data-href="#Why-does-my-import-fail-with-import-in-replicating-cluster-is-not-supported-yet" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">dataCoord.import.enableInReplicatingCluster</code> no está habilitado en ese clúster. Configúralo como « <code translate="no">true</code> » tanto en el clúster primario como en el de reserva.</p>
<h3 id="Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="common-anchor-header">¿Por qué falla mi importación con « <code translate="no">auto_commit=true import in replicating cluster is not supported</code> »?<button data-href="#Why-does-my-import-fail-with-autocommittrue-import-in-replicating-cluster-is-not-supported" class="anchor-icon" translate="no">
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
    </button></h3><p>En un clúster de replicación, solo se aceptan importaciones 2PC con « <code translate="no">auto_commit=false</code> ». Configura « <code translate="no">options={&quot;auto_commit&quot;: &quot;false&quot;}</code> » en la solicitud de importación.</p>
