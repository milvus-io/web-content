---
id: use_milvus_in_docsgpt.md
summary: >-
  En este tutorial, le mostraremos cómo utilizar Milvus como base de datos
  vectorial backend para DocsGPT.
title: Utilizar Milvus en DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Utilizar Milvus en DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> es una solución avanzada de código abierto que simplifica la búsqueda de información en la documentación de proyectos mediante la integración de potentes modelos GPT. Permite a los desarrolladores obtener fácilmente respuestas precisas a sus preguntas sobre un proyecto, eliminando las búsquedas manuales que tanto tiempo consumen.</p>
<p>En este tutorial, le mostraremos cómo utilizar Milvus como base de datos vectorial backend para DocsGPT.</p>
<div class="alert note">
<p>Este tutorial hace referencia principalmente a la guía de instalación oficial de <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>. Si encuentra que este tutorial tiene partes desactualizadas, puede priorizar seguir la guía oficial y crearnos un issue.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Requisitos<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Asegúrate de tener <a href="https://docs.docker.com/engine/install/">Docker</a> instalado</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Clonar el repositorio<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clona el repositorio y navega hasta él:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Añadir dependencia<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Añade la dependencia <code translate="no">langchain-milvus</code> al archivo <code translate="no">requirements.txt</code> bajo la carpeta <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Establecer variables de entorno<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Añade <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> a las variables de entorno para los servicios <code translate="no">backend</code> y <code translate="no">worker</code> en el archivo <code translate="no">docker-compose.yaml</code>, tal y como se muestra a continuación:</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>Para los servicios <code translate="no">MILVUS_URI</code> y <code translate="no">MILVUS_TOKEN</code>, puede utilizar el servicio <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(Recomendado) totalmente gestionado o el servicio Milvus iniciado manualmente.</p>
<ul>
<li><p>Para el servicio Zillz Cloud totalmente gestionado: Recomendamos utilizar el servicio Zilliz Cloud. Puede registrarse para obtener una cuenta de prueba gratuita en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Después, obtendrá <code translate="no">MILVUS_URI</code> y <code translate="no">MILVUS_TOKEN</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">punto final público y a la clave API</a>.</p></li>
<li><p>Para iniciar manualmente el servicio Milvus: Si desea configurar un servicio Milvus, puede seguir la <a href="https://milvus.io/docs/install_standalone-docker-compose.md">documentación oficial de Milvus</a> para configurar un servidor Milvus y, a continuación, obtener los <code translate="no">MILVUS_URI</code> y <code translate="no">MILVUS_TOKEN</code> del servidor. Los <code translate="no">MILVUS_URI</code> y <code translate="no">MILVUS_TOKEN</code> deben tener el formato <code translate="no">http://&lt;your_server_ip&gt;:19530</code> y <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> respectivamente.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Inicie los servicios<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecútalos: <code translate="no">./setup.sh</code></p>
<p>A continuación, vaya a http://localhost:5173/.</p>
<p>Puedes jugar con la interfaz de usuario y hacer preguntas sobre tus documentos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>texto alternativo</span> </span></p>
<p>Si quieres parar los servicios, ejecuta:</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>Para más detalles y configuraciones más avanzadas, consulta la documentación oficial <a href="https://github.com/arc53/DocsGPT">de DocsGPT</a>.</p>
