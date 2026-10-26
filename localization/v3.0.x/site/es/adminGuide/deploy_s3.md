---
id: deploy_s3.md
title: Configurar el almacenamiento de objetos con Docker Compose o Helm
related_key: 'S3, storage'
summary: >-
  Descubre cómo configurar el almacenamiento S3 para Milvus con Docker Compose o
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
    </button></h1><p>Milvus utiliza MinIO como almacenamiento de objetos por defecto, pero también admite el uso de <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (S3)</a> y otros almacenes de objetos compatibles con S3 (por ejemplo, Backblaze B2 o Cloudflare R2) como almacenamiento persistente de objetos para archivos de registro e índices. En este tema se describe cómo configurar S3 para Milvus. Puedes saltarte este tema si te basta con MinIO.</p>
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
    </button></h2><h3 id="1-Configure-S3" class="common-anchor-header">1. Configurar S3<button data-href="#1-Configure-S3" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://min.io/product/overview">MinIO</a> es compatible con S3. Para configurar S3 con Docker Compose, introduce tus valores en la sección « <code translate="no">minio</code> » del archivo « <code translate="no">milvus.yaml</code> », ubicado en la ruta «milvus/configs».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">&lt;your_s3_access_key_id&gt;</span>
  <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;your_s3_secret_access_key&gt;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Consulta <a href="/docs/es/configure_minio.md">«Configuraciones de MinIO/S3</a> » para obtener más información.</p>
<p>Aunque funciona introducir la clave de acceso y la clave secreta de forma estática, si ejecutas Milvus en un host o clúster que admita la identidad de la carga de trabajo (por ejemplo, un perfil de instancia de EC2 o IRSA en EKS), te recomendamos utilizar un rol de IAM en su lugar. Establece <code translate="no">useIAM</code> en <code translate="no">true</code> y elimina <code translate="no">accessKeyID</code> y <code translate="no">secretAccessKey</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;your_s3_endpoint&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;your_s3_port&gt;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>De este modo, Milvus obtiene credenciales temporales del rol de IAM asociado a la carga de trabajo. <code translate="no">cloudProvider</code> admite <code translate="no">aws</code>, <code translate="no">gcp</code> o <code translate="no">aliyun</code>, y en <code translate="no">iamEndpoint</code> se puede especificar opcionalmente un punto final personalizado para obtener las credenciales del rol de IAM.</p>
<h3 id="2-Refine-docker-composeyaml" class="common-anchor-header">2. Modifica el archivo docker-compose.yaml<button data-href="#2-Refine-docker-composeyaml" class="anchor-icon" translate="no">
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
    </button></h3><p>También deberás eliminar la variable de entorno ` <code translate="no">MINIO_ADDRESS</code> ` para el servicio Milvus en ` <code translate="no">docker-compose.yaml</code>`. Por defecto, Milvus utilizará Minio local en lugar de S3 externo.</p>
<h3 id="3-Run-Milvus" class="common-anchor-header">3. Ejecutar Milvus<button data-href="#3-Run-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Ejecuta el siguiente comando para iniciar Milvus con las configuraciones de S3.</p>
<pre><code translate="no" class="language-shell">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Las configuraciones solo surten efecto una vez que Milvus se ha iniciado. Consulta <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">«Iniciar Milvus</a> » para obtener más información.</div>
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
    </button></h2><p>Para los clústeres de Milvus en K8s, puede configurar S3 en el mismo comando con el que se inicia Milvus. Como alternativa, puede configurar S3 utilizando el archivo « <code translate="no">values.yml</code> », ubicado en la ruta «/charts/milvus» del repositorio <a href="https://github.com/milvus-io/milvus-helm">«milvus-helm»</a>, antes de iniciar Milvus.</p>
<p>En la siguiente tabla se enumeran las claves para configurar S3 en el archivo YAML.</p>
<table>
<thead>
<tr><th>Clave</th><th>Descripción</th><th>Valor</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio.enabled</code></td><td>Activa o desactiva MinIO.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.enabled</code></td><td>Activa o desactiva S3.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.host</code></td><td>El punto final para acceder a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.port</code></td><td>El puerto para acceder a S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.rootPath</code></td><td>La ruta raíz del almacenamiento S3.</td><td>Una cadena vacía por defecto.</td></tr>
<tr><td><code translate="no">externalS3.accessKey</code></td><td>El ID de la clave de acceso para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.secretKey</code></td><td>La clave de acceso secreta para S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.bucketName</code></td><td>El nombre del depósito de S3.</td><td></td></tr>
<tr><td><code translate="no">externalS3.useSSL</code></td><td>Si se debe utilizar SSL al conectarse</td><td>Los valores predeterminados son <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.useIAM</code></td><td>Si se debe utilizar un rol de IAM en lugar de claves de acceso y secretas para acceder a S3.</td><td>El valor por defecto es <code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalS3.cloudProvider</code></td><td>Proveedor de nube que emite las credenciales del rol de IAM.</td><td><code translate="no">aws</code>, <code translate="no">gcp</code> o <code translate="no">aliyun</code>; el valor por defecto es <code translate="no">aws</code></td></tr>
<tr><td><code translate="no">externalS3.iamEndpoint</code></td><td>Punto de conexión personalizado para obtener las credenciales del rol de IAM.</td><td>Déjelo en blanco para utilizar el valor predeterminado del proveedor.</td></tr>
</tbody>
</table>
<p>Si tu clúster admite la identidad de la carga de trabajo (por ejemplo, IRSA en EKS), configura <code translate="no">externalS3.useIAM</code> como <code translate="no">true</code> y elimina <code translate="no">externalS3.accessKey</code> y <code translate="no">externalS3.secretKey</code>: Milvus obtendrá credenciales temporales del rol de IAM asociado a la carga de trabajo.</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Uso del archivo YAML<button data-href="#Using-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Configure la sección « <code translate="no">minio</code> » en el archivo « <code translate="no">values.yaml</code> ».</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure la sección « <code translate="no">externalS3</code> » con sus valores en el archivo « <code translate="no">values.yaml</code> ».</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;&lt;your_s3_endpoint&gt;&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;&lt;your_s3_port&gt;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;your_s3_access_key_id&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;your_s3_secret_key&gt;&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-string">&lt;true/false&gt;</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;your_bucket_name&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Tras configurar las secciones anteriores y guardar el archivo <code translate="no">values.yaml</code>, ejecute el siguiente comando para instalar Milvus utilizando las configuraciones de S3.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Uso de un comando<button data-href="#Using-a-command" class="anchor-icon" translate="no">
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
    </button></h3><p>Para instalar Milvus y configurar S3, ejecuta el siguiente comando utilizando tus valores.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true  --set minio.enabled=false --set externalS3.enabled=true --set externalS3.host=&lt;your_s3_endpoint&gt; --set externalS3.port=&lt;your_s3_port&gt; --set externalS3.accessKey=&lt;your_s3_access_key_id&gt; --set externalS3.secretKey=&lt;your_s3_secret_key&gt; --set externalS3.bucketName=&lt;your_bucket_name&gt;
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Descubre cómo configurar otras dependencias de Milvus con Docker Compose o Helm:</p>
<ul>
<li><a href="/docs/es/deploy_etcd.md">Configurar Meta Storage con Docker Compose o Helm</a></li>
<li><a href="/docs/es/deploy_pulsar.md">Configurar Message Storage con Docker Compose o Helm</a></li>
</ul>
