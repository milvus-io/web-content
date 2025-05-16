---
id: deploy_s3.md
title: Configurar el almacenamiento de objetos con Docker Compose o Helm
related_key: 'S3, storage'
summary: >-
  Aprenda a configurar el almacenamiento S3 para Milvus con Docker Compose o
  Helm.
---
<h1 id="Configure-Object-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configurar el almacenamiento de objetos con Docker Compose o Helm<button data-href="#Configure-Object-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus utiliza MinIO para el almacenamiento de objetos de forma predeterminada, pero también admite el uso de <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> como almacenamiento de objetos persistente para archivos de registro e índice. Este tema describe cómo configurar S3 para Milvus. Puede omitir este tema si está satisfecho con MinIO.</p>
<p>Puede configurar S3 con <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> o en K8s.</p>
<h2 id="Configure-S3-with-Docker-Compose" class="common-anchor-header">Configurar S3 con Docker Compose<button data-href="#Configure-S3-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurar S3</h3><p><a href="https://min.io/product/overview">MinIO</a> es compatible con S3. Para configurar S3 con Docker Compose, proporcione sus valores para la sección <code translate="no">minio</code> en el archivo <code translate="no">milvus.yaml</code> en la ruta milvus/configs.</p>
<pre><code translate="no" class="language-yaml">minio:
  address: &lt;your_s3_endpoint&gt;
  port: &lt;your_s3_port&gt;
  accessKeyID: &lt;your_s3_access_key_id&gt;
  secretAccessKey: &lt;your_s3_secret_access_key&gt;
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulte <a href="/docs/es/v2.4.x/configure_minio.md">Configuraciones de MinIO/S3</a> para obtener más información.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Afinar docker-compose.yaml</h3><p>También eliminaría la variable de entorno <code translate="no">MINIO_ADDRESS</code> para el servicio milvus en <code translate="no">docker-compose.yaml</code>. Por defecto milvus utilizará minio local en lugar de S3 externo.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Ejecutar Milvus</h3><p>Ejecute el siguiente comando para iniciar Milvus que utiliza las configuraciones de S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Las configuraciones sólo tendrán efecto después de que Milvus se inicie. Consulte <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Iniciar Milvus</a> para más información.</div>
<h2 id="Configure-S3-on-K8s" class="common-anchor-header">Configurar S3 en K8s<button data-href="#Configure-S3-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Para clusters Milvus en K8s, puede configurar S3 en el mismo comando que inicia Milvus. Alternativamente, puede configurar S3 utilizando el archivo <code translate="no">values.yml</code> en la ruta /charts/milvus en el repositorio <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> antes de iniciar Milvus.</p>
<p>La siguiente tabla lista las claves para configurar S3 en el archivo YAML.</p>
<table>
<thead>
<tr><th>Clave</th><th>Descripción</th><th>Valor</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Activa o desactiva MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Activa o desactiva S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>El punto final para acceder a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>El puerto de acceso a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>La ruta raíz del almacenamiento S3.</td><td>Por defecto es una cadena de texto.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>El ID de la clave de acceso para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La clave de acceso secreta para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>El nombre del bucket de S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Si utilizar SSL al conectarse.</td><td>Los valores por defecto son <code translate="no">false</code></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML</h3><ol>
<li>Configure la sección <code translate="no">minio</code> en el archivo <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure la sección <code translate="no">externalS3</code> utilizando sus valores en el archivo <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml">externalS3:
  enabled: <span class="hljs-literal">true</span>
  host: <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  port: <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  accessKey: <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  secretKey: <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  useSSL: &lt;<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>&gt;
  bucketName: <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Después de configurar las secciones anteriores y guardar el archivo <code translate="no">values.yaml</code>, ejecute el siguiente comando para instalar Milvus que utiliza las configuraciones S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Uso de un comando</h3><p>Para instalar Milvus y configurar S3, ejecute el siguiente comando utilizando sus valores.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> minio.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=&lt;your_s3_endpoint&gt; --<span class="hljs-built_in">set</span> externalS3.port=&lt;your_s3_port&gt; --<span class="hljs-built_in">set</span> externalS3.accessKey=&lt;your_s3_access_key_id&gt; --<span class="hljs-built_in">set</span> externalS3.secretKey=&lt;your_s3_secret_key&gt; --<span class="hljs-built_in">set</span> externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Aprende a configurar otras dependencias de Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/es/v2.4.x/deploy_etcd.md">Configurar Meta Storage con Docker Compose o Helm</a></li>
<li><a href="/docs/es/v2.4.x/deploy_pulsar.md">Configurar el almacenamiento de mensajes con Docker Compose o Helm</a></li>
</ul>
