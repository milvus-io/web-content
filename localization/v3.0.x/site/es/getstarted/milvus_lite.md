---
id: milvus_lite.md
summary: >-
  Instala Milvus Lite y ejecuta una búsqueda vectorial local con una ruta de
  base de datos persistente.
title: Ejecutar Milvus Lite de forma local
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Ejecutar Milvus Lite de forma local<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página muestra cómo realizar búsquedas vectoriales locales con Milvus Lite. Abarca la instalación, la persistencia de datos, el filtrado y la exportación de datos a otra implementación de Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite es un backend local ligero para el <a href="https://github.com/milvus-io/pymilvus">SDK de Python de Milvus</a>. Instálalo con el complemento opcional « <code translate="no">milvus-lite</code> »; la instalación de « <code translate="no">pymilvus</code> » por sí sola no instala este backend en la versión del SDK que se utiliza a continuación.</p>
<p>Milvus Lite es adecuado para el desarrollo local y cargas de trabajo a pequeña escala en entornos como:</p>
<ul>
<li>Jupyter Notebook o Google Colab</li>
<li>Ordenadores portátiles</li>
<li>Dispositivos periféricos con dependencias de Python compatibles</li>
</ul>
<p>Milvus Lite utiliza la API de <code translate="no">MilvusClient</code> para las operaciones compatibles, entre las que se incluyen la persistencia de datos vectoriales, la inserción y eliminación, la búsqueda vectorial y el filtrado de metadatos. Para trasladar un flujo de trabajo de una aplicación compatible a una implementación remota, cambie la URI de conexión y las credenciales, y revise las diferencias en las funciones compatibles. Para cargas de trabajo de producción a gran escala, utilice <a href="/docs/es/install-overview.md">Milvus Standalone o Distributed</a>, o Milvus totalmente gestionado en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta guía utiliza PyMilvus <strong>3.0.2</strong> y Milvus Lite <strong>3.2.2</strong>. Prepara el siguiente entorno:</p>
<ul>
<li>Python 3.10 o posterior. El backend local de Lite requiere una versión mínima de Python superior a la del cliente remoto de PyMilvus.</li>
<li>macOS, Linux o Windows, con paquetes «wheels» compatibles para dependencias como <code translate="no">faiss-cpu</code> y <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 es un paquete escrito íntegramente en Python, por lo que el sistema operativo y la arquitectura deben cumplir con dichas dependencias, y no el propio paquete Lite.</li>
<li>Un directorio local con permisos de escritura para el almacenamiento de la base de datos.</li>
</ul>
<p>En Windows, pip omite el extra <code translate="no">milvus-lite</code> de PyMilvus 3.0.2 debido a su marcador de plataforma, por lo que <code translate="no">milvus-lite</code> debe indicarse explícitamente. El comando de instalación que figura a continuación ya lo hace. Para otras combinaciones de paquetes y plataformas, consulta los <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">requisitos de la versión de Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Configuración de Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea un entorno Python aislado e instala ambos paquetes:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pon entre comillas la expresión «extras» para que los shells como zsh no interpreten los corchetes. En Windows PowerShell, activa el entorno con ` <code translate="no">.venv\Scripts\Activate.ps1</code> ` en lugar de ` <code translate="no">source .venv/bin/activate</code>`. Las versiones explícitas mantienen el SDK y el backend local alineados con esta guía.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x utiliza un motor de almacenamiento diferente al del paquete 2.x original. No puede abrir directamente un archivo <code translate="no">.db</code> existente de la versión 2.x. Conserva la base de datos original y un entorno que pueda abrirla, exporta los datos a ese entorno e impórtalos a una nueva base de datos. La instalación de un nuevo paquete no migra el formato de almacenamiento antiguo. Consulta <a href="#Migrating-data-from-Milvus-Lite">Migración de datos desde Milvus Lite</a>.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Conectarse a Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Pasa una ruta local que termine en <code translate="no">.db</code> a <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>En Milvus Lite 3.2.2, esto crea un <strong>directorio milvus_demo.db</strong> en el directorio de trabajo. El directorio contiene los archivos de almacenamiento de la base de datos; el sufijo <code translate="no">.db</code> no significa que se trate de un único archivo portátil. Reutiliza la misma ruta para volver a abrir la base de datos tras cerrar el cliente o reiniciar la aplicación.</p>
<p>Utiliza una ruta diferente para una nueva base de datos. Para conectarte a un servidor Milvus remoto, introduce su punto final y tus credenciales:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Ejecuta un ejemplo de búsqueda local<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo muestra el flujo de trabajo de la API con vectores generados. Estos vectores no codifican el significado del texto; utiliza un modelo de incrustación al crear una búsqueda semántica. Ejecuta el ejemplo con una nueva ruta de base de datos o elimina el archivo <code translate="no">demo_collection</code> existente antes de volver a ejecutarlo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Para una aplicación que genere incrustaciones a partir de texto, continúa con <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a>. También puedes explorar los <a href="https://github.com/milvus-io/bootcamp">ejemplos del Milvus Bootcamp</a> sobre RAG, búsqueda de imágenes e integraciones de marcos de trabajo.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Funcionalidades compatibles y límites<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 implementa un subconjunto de operaciones de Milvus a través de su adaptador local PyMilvus. Su <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">referencia de características versionada</a> describe las siguientes capacidades:</p>
<table>
<thead>
<tr><th>Área</th><th>Compatibilidad en esta versión Lite</th></tr>
</thead>
<tbody>
<tr><td>Vectores densos y dispersos</td><td><code translate="no">FLOAT_VECTOR</code> y <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Índices vectoriales</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, y <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>Índices escalares y dispersos</td><td><code translate="no">INVERTED</code> índices escalares y <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Operaciones con datos</td><td>Insertar, actualizar o insertar, recuperar, consultar, búsqueda vectorial y eliminar</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda densa y dispersa, filtros de metadatos, múltiples campos vectoriales y búsqueda híbrida</td></tr>
<tr><td>Organización de colecciones</td><td>Colecciones, bases de datos con nombre, alias y particiones, dentro de las operaciones compatibles con el adaptador local</td></tr>
</tbody>
</table>
<p>Esta versión no se limita a los índices « <code translate="no">FLAT</code> ». La disponibilidad y el comportamiento de los índices dependen de la versión Lite; no apliques los límites del backend original 2.x al motor 3.x.</p>
<p>Revisa estos límites antes de elegir Lite para una aplicación:</p>
<ul>
<li>Solo un proceso puede ser propietario de un directorio de almacenamiento de bases de datos a la vez. El motor protege el directorio con un bloqueo de archivo.</li>
<li>Secuencialice las escrituras en la misma colección. Las escrituras simultáneas no se admiten de forma segura.</li>
<li>El adaptador local no implementa todas las RPC de Milvus. Las operaciones no compatibles devuelven un error « <code translate="no">UNIMPLEMENTED</code> »; no están disponibles la modificación del esquema ni la carga o liberación a nivel de partición.</li>
<li>No se admiten la autenticación, los usuarios, los roles, el RBAC ni el TLS. No expongas el servidor local a una red no fiable.</li>
<li>No se admiten los campos vectoriales «binary», «float16», «bfloat16» e «int8», ni los índices de cuantificación de producto.</li>
<li>Lite está diseñado para cargas de trabajo locales. La compatibilidad con la API local no ofrece escalabilidad distribuida ni el aislamiento y la disponibilidad de producción que proporciona una implementación remota.</li>
</ul>
<p>Consulte las <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">limitaciones conocidas por versión</a> antes de confiar en una función del servidor que el ejemplo local no utilice.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migración de datos desde Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice <code translate="no">milvus-lite dump</code> para exportar una colección como archivos JSON de Milvus BulkWriter. Estos archivos se pueden importar a una implementación de Milvus autohospedada o a Zilliz Cloud.</p>
<p>Instala las dependencias del Bulk Writer del SDK en el entorno que abre la base de datos de origen:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Cierra la aplicación de Python que gestiona la base de datos local antes de ejecutar el comando en otro proceso. Exporta la colección del ejemplo anterior:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>El comando lee <code translate="no">demo_collection</code> desde el <strong>directorio de almacenamiento milvus_demo.db</strong> y escribe los archivos de exportación en <strong>data_dir</strong>. Importe esos archivos con <a href="/docs/es/import-data.md">Bulk Insert</a> o <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Para exportar un archivo de base de datos 2.x original, ejecute la herramienta de volcado en un entorno con la versión Lite original capaz de abrir dicho archivo. La herramienta de volcado 3.x no convierte el formato de almacenamiento antiguo al abrirlo directamente. Conserve la base de datos de origen hasta que haya verificado el recuento de filas importadas y los resultados de la búsqueda.</p>
</blockquote>
</div>
<p>Para conocer las opciones de volcado compatibles y las restricciones del formato de almacenamiento, consulta la <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">referencia de exportación de Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Continúa con estas tareas:</p>
<ul>
<li><a href="/docs/es/quickstart.md">Guía de inicio rápido</a>: generar representaciones y ejecutar un flujo de trabajo de búsqueda.</li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda de vector único</a> y <a href="/docs/es/multi-vector-search.md">búsqueda híbrida</a>: diseña consultas para tu aplicación.</li>
<li><a href="/docs/es/install-overview.md">Elige una implementación</a>: ve más allá del desarrollo local.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: explora la interfaz gráfica de usuario de Milvus para una implementación remota.</li>
</ul>
