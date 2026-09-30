---
id: integrate_with_fastgpt.md
summary: >-
  Este tutorial le guiará sobre cómo desplegar rápidamente su propia aplicación
  FastGPT exclusiva utilizando [Milvus](https://milvus.io/).
title: Despliegue de FastGPT con Milvus
---
<h1 id="Deploying-FastGPT-with-Milvus" class="common-anchor-header">Despliegue de FastGPT con Milvus<button data-href="#Deploying-FastGPT-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://fastgpt.in/">FastGPT</a> es un sistema de preguntas y respuestas basado en el conocimiento y construido sobre el gran modelo de lenguaje LLM, que ofrece capacidades listas para usar para el procesamiento de datos y la invocación de modelos. Además, permite la orquestación del flujo de trabajo a través de la visualización Flow, facilitando así escenarios complejos de preguntas y respuestas. Este tutorial le guiará sobre cómo desplegar rápidamente su propia aplicación FastGPT exclusiva utilizando <a href="https://milvus.io/">Milvus</a>.</p>
<h2 id="Download-docker-composeyml" class="common-anchor-header">Descargar docker-compose.yml<button data-href="#Download-docker-composeyml" class="anchor-icon" translate="no">
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
    </button></h2><p>Asegúrese de que ya ha instalado <a href="https://docs.docker.com/compose/">Docker Compose</a>.<br>
Ejecute el siguiente comando para descargar el archivo docker-compose.yml.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> fastgpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -O https://raw.githubusercontent.com/labring/FastGPT/main/projects/app/data/config.json</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">milvus version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-milvus.yml</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">zilliz version</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">curl -o docker-compose.yml https://raw.githubusercontent.com/labring/FastGPT/main/files/docker/docker-compose-zilliz.yml</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Si estás usando la versión de <a href="https://zilliz.com/cloud">Zilliz</a>, ajusta los parámetros <code translate="no">MILVUS_ADDRESS</code> y <code translate="no">MILVUS_TOKEN</code> link en el archivo docker-compose.yml, que corresponde al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y Api key</a> en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
</blockquote>
<h2 id="Launch-the-Container" class="common-anchor-header">Lanzar el Contenedor<button data-href="#Launch-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecutar en el mismo directorio que docker-compose.yml. Asegúrese de que la versión de docker-compose es idealmente superior a 2.17, ya que algunos comandos de automatización pueden no funcionar de otra manera.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Launch the container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose up -d</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Wait <span class="hljs-keyword">for</span> 10s, OneAPI typically needs to restart a few <span class="hljs-built_in">times</span> to initially connect to Mysql</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sleep</span> 10</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">Restart oneapi (Due to certain issues with the default Key of OneAPI, it will display <span class="hljs-string">&#x27;channel not found&#x27;</span> <span class="hljs-keyword">if</span> not restarted, this can be temporarily resolved by manually restarting once, <span class="hljs-keyword">while</span> waiting <span class="hljs-keyword">for</span> the author<span class="hljs-string">&#x27;s fix)</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-string">docker restart oneapi</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Access-OneAPI-to-Add-Models" class="common-anchor-header">Acceda a OneAPI para añadir modelos<button data-href="#Access-OneAPI-to-Add-Models" class="anchor-icon" translate="no">
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
    </button></h2><p>Se puede acceder a OneAPI en <code translate="no">ip:3001</code>. El nombre de usuario por defecto es root, y la contraseña es 123456. Puede modificar la contraseña después de iniciar sesión.<br>
Utilizando el modelo de OpenAI como ejemplo, haga clic en la pestaña "Canal", y seleccione su modelo de chat y el modelo de incrustación en "Modelos".<br>
Introduce tu <a href="https://platform.openai.com/docs/quickstart">API Key de OpenAI</a> en la sección "Secretos".<br>
Para el uso de modelos más allá de OpenAI, y más información, por favor consulte <a href="https://doc.fastgpt.in/docs/development/one-api/">One API</a>.</p>
<h2 id="Setting-Tokens" class="common-anchor-header">Configuración de tokens<button data-href="#Setting-Tokens" class="anchor-icon" translate="no">
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
    </button></h2><p>Haga clic en la pestaña "Tokens". Por defecto, hay un token <code translate="no">Initial Root Token</code>. También puede crear un nuevo token y establecer una cuota por su cuenta.<br>
Haga clic en "Copiar" en su token, asegurándose de que el valor de este token coincide con el valor <code translate="no">CHAT_API_KEY</code> establecido en el archivo docker-compose.yml.</p>
<h2 id="Accessing-FastGPT" class="common-anchor-header">Acceso a FastGPT<button data-href="#Accessing-FastGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Actualmente, se puede acceder directamente a FastGPT en <code translate="no">ip:3000</code> (tenga en cuenta el cortafuegos). El nombre de usuario de acceso es root, con la contraseña establecida en <code translate="no">DEFAULT_ROOT_PSW</code> dentro de la variable de entorno docker-compose.yml. Si necesita acceso a un nombre de dominio, deberá instalar y configurar <a href="https://nginx.org/en/">Nginx</a> por su cuenta.</p>
<h2 id="Stop-the-Container" class="common-anchor-header">Detener el contenedor<button data-href="#Stop-the-Container" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para detener el contenedor.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
