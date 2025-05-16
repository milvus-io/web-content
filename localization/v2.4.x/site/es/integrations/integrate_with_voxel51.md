---
id: integrate_with_voxel51.md
summary: Esta página trata de la integración con voxel51
title: Realizar búsquedas visuales con Milvus y FiftyOne
---
<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">Realice búsquedas de visión con Milvus y FiftyOne<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOne</a> es una herramienta de código abierto para construir conjuntos de datos de alta calidad y modelos de visión por ordenador. Esta guía le ayuda a integrar las capacidades de búsqueda de similitud de Milvus en FiftyOne, permitiéndole realizar búsquedas de visión en sus propios conjuntos de datos.</p>
<p>FiftyOne proporciona una API para crear colecciones Milvus, cargar vectores y ejecutar consultas de similitud, tanto <a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">mediante programación</a> en Python como a través de apuntar y hacer clic en la aplicación. La demostración en esta página se centra en la integración programática.</p>
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
    </button></h2><p>Antes de comenzar, asegúrese de tener lo siguiente:</p>
<ul>
<li>Un <a href="/docs/es/v2.4.x/install_standalone-docker.md">servidor Milvus</a> en ejecución.</li>
<li>Un entorno Python con <code translate="no">pymilvus</code> y <code translate="no">fiftyone</code> instalados.</li>
<li>Un <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">conjunto de datos</a> de imágenes para buscar.</li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">Requisitos de instalación<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Para este ejemplo, vamos a utilizar <code translate="no">pymilvus</code> y <code translate="no">fiftyone</code>. Puede instalarlos ejecutando los siguientes comandos:</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">Receta básica<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>El flujo de trabajo básico para utilizar Milvus para crear un índice de similitud en sus conjuntos de datos FiftyOne y utilizarlo para consultar sus datos es el siguiente:</p>
<ol>
<li>Cargar un <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">conjunto de datos</a> en FiftyOne</li>
<li>Calcule incrustaciones vectoriales para muestras o parches en su conjunto de datos, o seleccione un modelo para utilizar la generación de incrustaciones.</li>
<li>Utilice el método <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> para generar un índice de similitud Milvus para las muestras o los parches de objetos de un conjunto de datos estableciendo el parámetro <code translate="no">backend=&quot;milvus&quot;</code> y especificando un <code translate="no">brain_key</code> de su elección.</li>
<li>Utilice este índice de similitud Milvus para consultar sus datos con <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>Si lo desea, elimine el índice.</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">Procedimientos<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente ejemplo muestra el flujo de trabajo anterior.</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1. Cargar un conjunto de datos en FiftyOne y calcular las incrustaciones de las muestras.</h3><p>El siguiente código utiliza el conjunto de imágenes de muestra proporcionado por FiftyOne para demostrar la integración. Puede preparar su propio conjunto de imágenes consultando <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">este artículo</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
    dataset,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2. Realizar búsquedas de similitud de visión</h3><p>Ahora puede utilizar el índice de similitud de Milvus para realizar búsquedas de similitud de visión en su conjunto de datos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Delete-the-index" class="common-anchor-header">3. Eliminar el índice</h3><p>Si ya no necesita el índice de similitud de Milvus, puede eliminarlo utilizando el siguiente código:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">Utilizar el backend de Milvus<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>Por defecto, al llamar a <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> o <code translate="no">sort_by_similarity()</code> utilizará un backend sklearn.</p>
<p>Para utilizar el backend Milvus, basta con establecer el parámetro opcional backend de <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> a <code translate="no">&quot;milvus&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.<span class="hljs-property">brain</span> <span class="hljs-keyword">as</span> fob

fob.<span class="hljs-title function_">compute_similarity</span>(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<p>Alternativamente, puede configurar permanentemente FiftyOne para utilizar el backend Milvus estableciendo la siguiente variable de entorno:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>o estableciendo el parámetro <code translate="no">default_similarity_backend</code> de su <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">brain config</a> ubicado en <code translate="no">~/.fiftyone/brain_config.json</code>:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;default_similarity_backend&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">Autenticación<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Si está utilizando un servidor Milvus personalizado, puede proporcionar sus credenciales de varias maneras.</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">Variables de entorno (recomendado)</h3><p>La forma recomendada de configurar sus credenciales Milvus es almacenarlas en las variables de entorno que se muestran a continuación, a las que FiftyOne accede automáticamente cada vez que se establece una conexión con Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>
<h3 id="FiftyOne-Brain-config" class="common-anchor-header">Configuración de FiftyOne Brain</h3><p>También puede almacenar sus credenciales en la <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">configuración de</a> su <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">cerebro</a> en <code translate="no">~/.fiftyone/brain_config.json</code>:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Tenga en cuenta que este archivo no existirá hasta que usted lo cree.</p>
<h3 id="Keyword-arguments" class="common-anchor-header">Argumentos de palabras clave</h3><p>Puede proporcionar manualmente sus credenciales de Milvus como argumentos de palabra clave cada vez que llame a métodos como <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> que requieren conexiones a Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Tenga en cuenta que, cuando utilice esta estrategia, deberá proporcionar manualmente las credenciales cuando cargue un índice posteriormente a través de <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-config-parameters" class="common-anchor-header">Parámetros de configuración de Milvus</h3><p>El backend de Milvus admite una variedad de parámetros de consulta que pueden utilizarse para personalizar sus consultas de similitud. Estos parámetros incluyen:</p>
<ul>
<li><p><strong>collection_name</strong><em>(None</em>): el nombre de la colección Milvus a utilizar o crear. Si no se proporciona ninguno, se creará una nueva colección</p></li>
<li><p><strong>métrica</strong> (<em>"dotproduct")</em>: la métrica de distancia de incrustación que se utilizará al crear un nuevo índice. Los valores admitidos son (<code translate="no">&quot;dotproduct&quot;</code>, <code translate="no">&quot;euclidean&quot;</code>)</p></li>
<li><p><strong>consistency_level</strong> (<em>"Sesión")</em>: el nivel de consistencia a utilizar. Los valores admitidos son (<code translate="no">&quot;Strong&quot;</code>, <code translate="no">&quot;Session&quot;</code>, <code translate="no">&quot;Bounded&quot;</code>, <code translate="no">&quot;Eventually&quot;</code>)</p></li>
</ul>
<p>Para obtener información detallada sobre estos parámetros, consulte la <a href="/docs/es/v2.4.x/authenticate.md">documentación sobre autenticación de</a> <a href="/docs/es/v2.4.x/consistency.md">Milvus</a> y <a href="/docs/es/v2.4.x/consistency.md">la documentación sobre niveles de consistencia de Milvus</a>.</p>
<p>Puede especificar estos parámetros mediante cualquiera de las estrategias descritas en la sección anterior. Aquí hay un ejemplo de una <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">configuración de cerebro</a> que incluye todos los parámetros disponibles:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;your_collection&quot;</span>,
            <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;dotproduct&quot;</span>,
            <span class="hljs-string">&quot;consistency_level&quot;</span>: <span class="hljs-string">&quot;Strong&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Sin embargo, normalmente estos parámetros se pasan directamente a <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> para configurar un nuevo índice específico:</p>
<pre><code translate="no" class="language-python">milvus_index = fob.<span class="hljs-title function_">compute_similarity</span>(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">Gestionar ejecuciones del cerebro<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>FiftyOne proporciona una variedad de métodos que puede utilizar para gestionar las ejecuciones del cerebro.</p>
<p>Por ejemplo, puede llamar a <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a> para ver las claves de cerebro disponibles en un conjunto de datos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
    <span class="hljs-built_in">type</span>=fob.Similarity,
    patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
    supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>O puede utilizar <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a> para recuperar información sobre la configuración de una ejecución del cerebro:</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>Utilice <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a> para cargar la instancia <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a> instancia de una ejecución cerebral.</p>
<p>Puede utilizar <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a> para renombrar la clave de cerebro asociada a una ejecución de resultados de similitud existente:</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>Por último, puede utilizar <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> para eliminar una ejecución del cerebro:</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si llama a <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> sólo borra el registro de la ejecución cerebral de su conjunto de datos FiftyOne; no borrará ninguna colección Milvus asociada, lo que puede hacer como sigue:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Para un flujo de trabajo de búsqueda vectorial común en un conjunto de datos FiftyOne utilizando el backend Milvus, vea <a href="https://docs.voxel51.com/integrations/milvus.html#examples">Ejemplos aquí</a>.</p>
