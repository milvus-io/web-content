---
id: idempotent-import.md
order: 2
title: Importación masiva idempotente
summary: >-
  Envía una clave de idempotencia para que, al reintentar una importación
  masiva, se recupere la tarea original en lugar de crearse una segunda.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Importación masiva idempotente<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Una solicitud de importación masiva puede completarse con éxito aunque se pierda su respuesta: por ejemplo, si la llamada agota el tiempo de espera, se interrumpe la conexión o el orquestador se apaga antes de guardar el <code translate="no">jobId</code> devuelto. No es posible distinguir entre «no completado» y «completado, respuesta perdida». Si se vuelve a intentar, se inicia un segundo trabajo y cada fila se importa dos veces; si no se vuelve a intentar, se puede perder la importación.</p>
<p>Una clave de idempotencia elimina esa disyuntiva. Si se etiqueta la solicitud con una, un nuevo intento con la misma clave devolverá el <code translate="no">jobId</code> original en lugar de crear una segunda tarea.</p>
<p>La importación masiva idempotente requiere Milvus 3.0.2 o posterior, o 2.6.24 o posterior en la línea 2.6. Un servidor más antiguo ignora el encabezado y cada solicitud, se reintente o no, inicia un nuevo trabajo.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Envío de la clave<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>La clave se transmite como el encabezado HTTP « <code translate="no">Idempotency-Key</code> », no en el cuerpo de la solicitud.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> es <code translate="no">&quot;Idempotency-Key&quot;</code>; la cadena sin formato también funciona. El parámetro <code translate="no">headers</code> y <code translate="no">IDEMPOTENCY_KEY_HEADER</code> requieren pymilvus v3.0.3 o posterior en la línea 3.x, o v2.6.18 o posterior en la línea 2.6. En versiones anteriores de pymilvus, la línea <code translate="no">import</code> anterior falla con un error « <code translate="no">ImportError</code> » al buscar en <code translate="no">IDEMPOTENCY_KEY_HEADER</code>, y pasar <code translate="no">headers</code> a <code translate="no">bulk_import</code> tiene un comportamiento indefinido: la llamada puede dar error o la importación puede enviarse sin la clave.</p>
<p>Realiza una consulta a <code translate="no">/v2/vectordb/jobs/import/describe</code> con el <code translate="no">jobId</code> devuelto, como de costumbre. Un reintento que llega mientras la consulta original aún se está registrando espera a que esta finalice, por lo que un reintento nunca detecta una tarea a medio registrar.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Elección de una clave<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Una clave por solicitud lógica.</strong> Asigna un nombre a la unidad de trabajo, como <code translate="no">orders-2026-09-07-batch-3</code>, o genera un UUID y guárdalo junto con el elemento de trabajo antes de enviar la solicitud. Incluye un número de intento por si necesitas volver a ejecutar el mismo trabajo.</li>
<li><strong>Vuelve a intentarlo con la misma clave.</strong> Generar una nueva clave en un nuevo intento es lo que duplica los datos. Las excepciones se enumeran en <a href="#when-to-send-a-new-key">«Cuándo enviar una nueva clave</a>».</li>
<li><strong>Nunca reutilices una clave para archivos diferentes.</strong> Milvus no compara las dos solicitudes. Se te devolverá el <code translate="no">jobId</code> original y los nuevos archivos no se importarán.</li>
<li><strong>Que sea breve y imprimible.</strong> ASCII imprimible, como máximo 256 bytes por defecto (<code translate="no">streaming.idempotency.maxKeyLength</code>). Cualquier otra cosa se rechaza con el error <code translate="no">1100</code>.</li>
<li><strong>No incluyas información confidencial.</strong> La clave se almacena junto con tus datos.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Cuánto tiempo se recuerda una clave<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>La clave está vinculada a la colección mediante su ID interno, por lo que cambiar el nombre de la colección no interrumpe un reintento, siempre y cuando el reintento utilice el nuevo nombre de la colección. Eliminar y volver a crear la colección con el mismo nombre sí lo interrumpe, y en ese caso la solución adecuada es iniciar un nuevo trabajo.</p>
<p>Milvus recuerda una clave de importación durante aproximadamente un día. Considéralo un valor nominal más que una garantía: un tráfico intenso de DDL o de importación acorta este tiempo, y un reinicio del coordinador lo alarga. Un reintento después de que se haya olvidado la clave inicia un nuevo trabajo.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Cuándo enviar una nueva clave<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Dos casos, y solo dos:</p>
<ul>
<li><strong>El trabajo original falló o se abortó.</strong> La función «describe» devuelve « <code translate="no">state: Failed</code> » con un motivo. Al reintentar la clave, se devuelve ese mismo « <code translate="no">jobId</code> » mientras la clave se recuerde. Corrige la causa y, a continuación, envía una nueva clave.</li>
<li><strong>El trabajo original se ha eliminado.</strong> Milvus conserva los trabajos finalizados durante <code translate="no">dataCoord.import.taskRetention</code> (48 horas por defecto). Si ese plazo expira mientras la clave aún se recuerda, el reintento devuelve el antiguo <code translate="no">jobId</code>, y la función «describe» responde con el error <code translate="no">import job does not exist</code> en lugar de un estado del trabajo. Es posible que ese trabajo se haya completado con éxito. Confirma que faltan los datos antes de enviar una nueva clave.</li>
</ul>
<p>Un reintento que sea rechazado, por ejemplo, porque se ha alcanzado el límite de trabajos de importación, no se considera uno de estos casos. Vuelve a intentarlo más tarde con la misma clave.</p>
<h2 id="Configuration" class="common-anchor-header">Configuración<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Hay cuatro parámetros que determinan el comportamiento de esta página. No es necesario modificar ninguno de ellos para que la clave funcione.</p>
<table>
<thead>
<tr><th>Parámetro</th><th>Valor por defecto</th><th>Qué hace</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Tiempo durante el que se recuerda una clave de importación. No aparece en el archivo predeterminado « <code translate="no">milvus.yaml</code> »; añádelo explícitamente para modificarlo. El mismo almacén también rechaza los envíos duplicados de DDL, así que no lo reduzcas solo para acortar la ventana de importación.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Número de claves y registros DDL que el mismo almacén puede contener antes de que se eliminen los más antiguos, independientemente de su antigüedad. Esto es lo que permite que, ante un tráfico intenso de DDL o importaciones, se olvide una clave antes de <code translate="no">maxLifetime</code>. No está presente en el valor predeterminado <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 horas) desde las versiones 2.6.24 y 3.0.2; <code translate="no">10800</code> antes</td><td>Tiempo durante el que un trabajo de importación finalizado sigue estando disponible para consultas. Mantén este valor como mínimo el doble de <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>La longitud máxima de la clave en bytes. Una clave más larga se rechaza con el error <code translate="no">1100</code>. <code translate="no">0</code> desactiva el límite. No está presente en el valor predeterminado <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p>El archivo « <code translate="no">milvus.yaml</code> » incluido en versiones anteriores a la 2.6.24 y la 3.0.2 establece explícitamente « <code translate="no">taskRetention: 10800</code> », y una actualización no sobrescribe el valor de su archivo. Si ha actualizado con ese archivo, aumente « <code translate="no">taskRetention</code> » al menos al doble de « <code translate="no">maxLifetime</code> ». El nuevo valor solo se aplica a los trabajos que finalicen después del cambio.</p>
