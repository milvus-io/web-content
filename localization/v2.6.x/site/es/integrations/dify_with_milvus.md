---
id: dify_with_milvus.md
summary: >-
  En este tutorial, le mostraremos cómo desplegar Dify con Milvus, para permitir
  una recuperación eficiente y un motor RAG.
title: Despliegue de Dify con Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Despliegue de Dify con Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> es una plataforma de código abierto diseñada para simplificar la creación de aplicaciones de IA combinando Backend-as-a-Service con LLMOps. Es compatible con los principales LLM, ofrece una interfaz de orquestación rápida e intuitiva, motores RAG de alta calidad y un marco de agentes de IA flexible. Con flujos de trabajo de bajo código, interfaces fáciles de usar y APIs, Dify permite tanto a desarrolladores como a usuarios no técnicos centrarse en la creación de soluciones de IA innovadoras y reales sin tener que lidiar con la complejidad.</p>
<p>En este tutorial, le mostraremos cómo desplegar Dify con Milvus, para permitir una recuperación eficiente y un motor RAG.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">Clonar el Repositorio<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clone el código fuente de Dify en su máquina local:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Establezca las variables de entorno<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Navega al directorio Docker en el código fuente de Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copia el archivo de configuración del entorno</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<p>Cambia el valor <code translate="no">VECTOR_STORE</code> en el archivo <code translate="no">.env</code> </p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Asegúrese de que la configuración de Milvus en el archivo <code translate="no">.env</code> tiene la siguiente línea:</p>
<pre><code translate="no"><span class="hljs-attr">MILVUS_URI</span>=http://host.docker.internal:<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tenga en cuenta que al especificar <code translate="no">VECTOR_STORE=milvus</code>, Dify traerá un servidor Milvus Standalone en docker. A pesar de que puede acceder al servidor desde fuera del Docker a través de <code translate="no">http://localhost:19530</code>, para que otros contenedores Dify puedan hablar con él dentro del entorno Docker, necesitan conectarse al nombre DNS especial <code translate="no">host.docker.internal</code>. Por lo tanto, establecemos <code translate="no">http://host.docker.internal:19530</code> como <code translate="no">MILVUS_URI</code>.</p>
<p>Para el despliegue de producción es posible que desee personalizar la autenticación. Para más información sobre cómo establecer token o nombre de usuario y contraseña en Milvus, puede consultar la <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">página de autenticación</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Inicie los contenedores Docker<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Elija el comando apropiado para iniciar los contenedores basado en la versión de Docker Compose en su sistema. Puede utilizar el comando <code translate="no">$ docker compose version</code> para comprobar la versión, y consulte la documentación de Docker para obtener más información:</p>
<p>Si tiene Docker Compose V2, utilice el siguiente comando:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Si tiene Docker Compose V1, utilice el siguiente comando:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Inicie sesión en Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Abra su navegador y vaya a la página de instalación de Dify, y puede configurar su cuenta de administrador aquí:<code translate="no">http://localhost/install</code>, Y luego inicie sesión en la página principal de Dify para su uso posterior.</p>
<p>Para mayor uso y orientación, por favor refiérase a la <a href="https://docs.dify.ai/">documentación de Dify</a>.</p>
