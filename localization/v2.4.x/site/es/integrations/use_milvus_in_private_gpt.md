---
id: use_milvus_in_private_gpt.md
summary: >-
  En este tutorial, le mostraremos cómo utilizar Milvus como base de datos
  vectorial backend para PrivateGPT.
title: Utilizar Milvus en PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Utilizar Milvus en PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> es un proyecto de IA listo para la producción que permite a los usuarios hacer preguntas sobre sus documentos utilizando Large Language Models sin conexión a Internet, garantizando al mismo tiempo un 100% de privacidad. PrivateGPT ofrece una API dividida en bloques de alto y bajo nivel. También proporciona un cliente Gradio UI y herramientas útiles como scripts de descarga masiva de modelos y scripts de ingestión. Conceptualmente, PrivateGPT envuelve un pipeline RAG y expone sus primitivas, estando listo para usar y proporcionando una implementación completa de la API y del pipeline RAG.</p>
<p>En este tutorial, le mostraremos cómo utilizar Milvus como base de datos vectorial backend para PrivateGPT.</p>
<div class="alert note">
<p>Este tutorial hace referencia principalmente a la guía de instalación oficial <a href="https://docs.privategpt.dev/installation/getting-started/installation">de</a> PrivateGPT. Si encuentra que este tutorial tiene partes obsoletas, puede dar prioridad a seguir la guía oficial y crear un problema con nosotros.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Requisitos básicos para ejecutar PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Clonar el repositorio PrivateGPT</h3><p>Clona el repositorio y navega hasta él:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Instalar Poetry</h3><p>Instala <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> para la gestión de dependencias: Sigue las instrucciones de la página oficial de Poetry para instalarlo.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Opcional) Instala make</h3><p>Para ejecutar varios scripts, necesitas instalar make.</p>
<p>macOS (Usando Homebrew):</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (Usando Chocolatey):</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Instale los módulos disponibles<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT permite personalizar la configuración de algunos módulos, por ejemplo LLM, Embeddings, Vector Stores, UI.</p>
<p>En este tutorial, utilizaremos los siguientes módulos:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Almacenes vectoriales</strong>: Milvus</li>
<li><strong>IU</strong>: Gradio</li>
</ul>
<p>Ejecute el siguiente comando para utilizar la poesía para instalar las dependencias de los módulos necesarios:</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Iniciar el servicio Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Vaya a <a href="https://ollama.com/">ollama.ai</a> y siga las instrucciones para instalar Ollama en su máquina.</p>
<p>Tras la instalación, asegúrate de que la aplicación de escritorio de Ollama está cerrada.</p>
<p>Ahora, inicie el servicio Ollama (iniciará un servidor de inferencia local, sirviendo tanto al LLM como a los Embeddings):</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>Instale los modelos que se van a utilizar, por defecto <code translate="no">settings-ollama.yaml</code> está configurado para el usuario <code translate="no">llama3.1</code> 8b LLM (~4GB) y <code translate="no">nomic-embed-text</code> Embeddings (~275MB)</p>
<p>Por defecto, PrivateGPT extraerá automáticamente los modelos según sea necesario. Este comportamiento puede cambiarse modificando la propiedad <code translate="no">ollama.autopull_models</code>.</p>
<p>En cualquier caso, si desea extraer modelos manualmente, ejecute los siguientes comandos:</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, puede cambiar a sus modelos favoritos en el archivo <code translate="no">settings-ollama.yaml</code> y extraerlos manualmente.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Cambiar la configuración de Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>En el archivo <code translate="no">settings-ollama.yaml</code>, establece el vectorstore a milvus:</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>También puede añadir alguna configuración cumstom Milvus para especificar sus ajustes. Así:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>Las opciones de configuración disponibles son:</p>
<table>
<thead>
<tr><th>Campo Opción</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>Por defecto se establece en "local_data/private_gpt/milvus/milvus_local.db" como archivo local; también puede configurar un servidor Milvus de mayor rendimiento en docker o k8s, por ejemplo http://localhost:19530, como su uri; Para utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, ajuste la uri y el token a <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint y API key</a> en Zilliz Cloud.</td></tr>
<tr><td>token</td><td>Emparejar con el servidor Milvus en docker o k8s o la clave api de Zilliz Cloud.</td></tr>
<tr><td>nombre_colección</td><td>El nombre de la colección, establecido por defecto "milvus_db".</td></tr>
<tr><td>sobrescribir</td><td>Sobrescribe los datos de la colección si ya existían, establecido por defecto como True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Iniciar PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez realizados todos los ajustes, puede ejecutar PrivateGPT con la interfaz de Gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>La interfaz de usuario estará disponible en <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Puede jugar con la interfaz y hacer preguntas sobre sus documentos.</p>
<p>Para más información, consulte la documentación oficial <a href="https://docs.privategpt.dev/">de Private</a> GPT.</p>
