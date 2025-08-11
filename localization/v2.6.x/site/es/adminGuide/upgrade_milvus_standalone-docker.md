---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Aprenda a actualizar Milvus standalone con Docker Compose.
title: Actualizar Milvus Standalone con Docker Compose
---
<div class="tab-wrapper"><a href="/docs/es/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/es/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/es/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Actualizar Milvus Standalone con Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo actualizar su despliegue independiente Milvus de v2.5.x a v2.6.0 utilizando Docker Compose.</p>
<h2 id="Before-you-start" class="common-anchor-header">Antes de comenzar<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v260" class="common-anchor-header">Novedades de la versión 2.6.0</h3><p>La actualización de Milvus 2.5.x a 2.6.0 implica cambios arquitectónicos significativos:</p>
<ul>
<li><strong>Consolidación</strong> de<strong>coordinadores</strong>: Los coordinadores independientes heredados (<code translate="no">dataCoord</code>, <code translate="no">queryCoord</code>, <code translate="no">indexCoord</code>) se han consolidado en uno solo. <code translate="no">mixCoord</code></li>
<li><strong>Nuevos componentes</strong>: Introducción de Streaming Node para mejorar el procesamiento de datos</li>
<li><strong>Eliminación</strong> de<strong>componentes</strong>: <code translate="no">indexNode</code> eliminado y consolidado</li>
</ul>
<p>Este proceso de actualización garantiza una migración adecuada a la nueva arquitectura. Para obtener más información sobre los cambios en la arquitectura, consulte <a href="/docs/es/architecture_overview.md">Visión general de la arquitectura de Milvus</a>.</p>
<h3 id="Requirements" class="common-anchor-header">Requisitos</h3><p><strong>Requisitos del sistema:</strong></p>
<ul>
<li>Docker y Docker Compose instalados</li>
<li>Milvus independiente desplegado a través de Docker Compose</li>
</ul>
<p><strong>Requisitos de compatibilidad:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 <strong>no es compatible</strong> con v2.6.0. Las actualizaciones directas desde versiones candidatas no son compatibles.</li>
<li>Si actualmente está ejecutando v2.6.0-rc1 y necesita conservar sus datos, consulte <a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">esta guía de la comunidad</a> para obtener ayuda sobre la migración.</li>
<li><strong>Debe</strong> actualizar a v2.5.16 o posterior antes de actualizar a v2.6.0.</li>
</ul>
<div class="alter note">
<p>Por motivos de seguridad, Milvus actualiza su MinIO a RELEASE.2024-12-18T13-15-44Z con el lanzamiento de v2.6.0. Antes de realizar cualquier actualización desde versiones anteriores de Milvus Standalone instaladas mediante Docker Compose, debe crear un despliegue de MinIO Single-Node Single-Drive y migrar la configuración y el contenido existentes de MinIO al nuevo despliegue. Para más detalles, consulte <a href="https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#id2">esta guía</a>.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Proceso de actualización<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-to-v2516" class="common-anchor-header">Paso 1: Actualización a v2.5.16</h3><div class="alert note">
<p>Omita este paso si su despliegue autónomo ya ejecuta la versión 2.5.16 o superior.</p>
</div>
<ol>
<li><p>Edite su archivo <code translate="no">docker-compose.yaml</code> existente y actualice la etiqueta de imagen de Milvus a v2.5.16:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aplique la actualización a v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique la actualización a v2.5.16:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Step-2-Upgrade-to-v260" class="common-anchor-header">Paso 2: Actualizar a v2.6.0</h3><p>Una vez que la versión 2.5.16 esté funcionando correctamente, actualice a la versión 2.6.0:</p>
<ol>
<li><p>Edite el archivo <code translate="no">docker-compose.yaml</code> existente y actualice las etiquetas de imagen de Milvus y MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-minio</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">minio/minio:RELEASE.2024-12-18T13-15-44Z</span>

<span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Aplique la actualización final:</p>
<pre><code translate="no" class="language-bash">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifique la actualización<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Confirme que su despliegue autónomo está ejecutando la nueva versión:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check container status</span>
docker compose ps

<span class="hljs-comment"># Check Milvus version</span>
docker compose logs standalone | grep <span class="hljs-string">&quot;version&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">¿Qué sigue?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Es posible que también desee aprender cómo:<ul>
<li><a href="/docs/es/scaleout.md">Escalar un clúster Milvus</a></li>
</ul></li>
<li>Si está listo para desplegar su cluster en nubes:<ul>
<li>Aprenda a <a href="/docs/es/eks.md">implementar Milvus en Amazon EKS con Terraform</a></li>
<li>Aprenda a <a href="/docs/es/gcp.md">implementar Milvus Cluster en GCP con Kubernetes</a></li>
<li>Aprenda a <a href="/docs/es/azure.md">desplegar Milvus en Microsoft Azure con Kubernetes</a></li>
</ul></li>
</ul>
