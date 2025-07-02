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
<div class="alert note">
<p>Esta documentación se basa principalmente en la <a href="https://docs.dify.ai/">documentación</a> oficial de <a href="https://docs.dify.ai/">Dify</a>. Si encuentra algún contenido desactualizado o inconsistente, por favor priorice la documentación oficial y siéntase libre de plantearnos un problema.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerrequisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Clonar el repositorio</h3><p>Clone el código fuente de Dify a su máquina local:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Preparar la configuración del entorno</h3><p>Navega al directorio Docker en el código fuente de Dify</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Copie el archivo de configuración del entorno</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Opciones de despliegue<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede desplegar Dify con Milvus utilizando dos enfoques diferentes. Elija el que mejor se adapte a sus necesidades:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Opción 1: Usando Milvus con Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta opción ejecuta contenedores Milvus junto con Dify en su máquina local utilizando Docker Compose.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configure las variables de entorno</h3><p>Edite el archivo <code translate="no">.env</code> con la siguiente configuración de Milvus:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> utiliza <code translate="no">host.docker.internal:19530</code> que permite a los contenedores Docker acceder a Milvus ejecutándose en la máquina anfitriona a través de la red interna de Docker.</li>
<li><code translate="no">MILVUS_TOKEN</code> puede dejarse vacío para despliegues locales de Milvus.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Inicie los contenedores Docker</h3><p>Inicie los contenedores con el perfil <code translate="no">milvus</code> para incluir los servicios Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Este comando iniciará el servicio Dify junto con los contenedores <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code>, y <code translate="no">minio</code>.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Opción 2: Usando Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta opción conecta Dify a un servicio Milvus gestionado en Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Configure las variables de entorno</h3><p>Edite el archivo <code translate="no">.env</code> con sus detalles de conexión a Zilliz Cloud:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Reemplaza <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> con tu <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint</a> de Zilliz Cloud.</li>
<li>Sustituye <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> por tu <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">clave API</a> de Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Inicie los contenedores Docker</h3><p>Inicie sólo los contenedores Dify sin el perfil Milvus:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Accediendo a Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Inicie sesión en Dify</h3><p>Abra su navegador y vaya a la página de instalación de Dify, y puede configurar su cuenta de administrador aquí:<code translate="no">http://localhost/install</code>, Y luego inicie sesión en la página principal de Dify para su uso posterior.</p>
<p>Para mayor información y orientación, por favor consulte la <a href="https://docs.dify.ai/">documentación de Dify</a>.</p>
