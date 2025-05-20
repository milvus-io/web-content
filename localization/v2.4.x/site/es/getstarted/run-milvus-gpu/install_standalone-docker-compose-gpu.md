---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Aprenda a instalar el clúster Milvus en Kubernetes.
title: Ejecutar Milvus con soporte GPU usando Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Ejecutar Milvus con soporte GPU usando Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra cómo iniciar una instancia Milvus con soporte GPU utilizando Docker Compose.</p>
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
    </button></h2><ul>
<li><a href="https://docs.docker.com/get-docker/">Instale Docker</a>.</li>
<li><a href="/docs/es/v2.4.x/prerequisite-gpu.md">Compruebe los requisitos de hardware y software</a> antes de la instalación.</li>
</ul>
<div class="alert note">
<p>Si encuentra algún problema al arrancar la imagen, póngase en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con detalles sobre el problema, y le proporcionaremos el soporte necesario.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Instalar Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Para instalar Milvus con soporte GPU utilizando Docker Compose, siga estos pasos.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Descargue y configure el archivo YAML</h3><p>Descarga <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> y guárdelo como docker-compose.yml manualmente, o con el siguiente comando.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>Es necesario realizar algunos cambios en las variables de entorno del servicio autónomo en el archivo YAML como se indica a continuación:</p>
<ul>
<li>Para asignar un dispositivo GPU específico a Milvus, localice el campo <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> en la definición del servicio <code translate="no">standalone</code> y sustituya su valor por el ID de la GPU deseada. Puede utilizar la herramienta <code translate="no">nvidia-smi</code>, incluida con los controladores de pantalla GPU de NVIDIA, para determinar el ID de un dispositivo GPU. Milvus admite múltiples dispositivos GPU.</li>
</ul>
<p>Asigne un único dispositivo GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Asignar múltiples dispositivos GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Inicie Milvus</h3><p>En el directorio que contiene docker-compose.yml, inicie Milvus ejecutando:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si no puede ejecutar el comando anterior, compruebe si su sistema tiene instalado Docker Compose V1. Si este es el caso, se le aconseja migrar a Docker Compose V2 debido a las notas en <a href="https://docs.docker.com/compose/">esta página</a>.</p>
</div>
<p>Después de iniciar Milvus,</p>
<ul>
<li>Los contenedores llamados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> están activos.<ul>
<li>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y mapea sus datos a <strong>volúmenes/etcd</strong> en la carpeta actual.</li>
<li>El contenedor <strong>milvus-minio</strong> sirve los puertos <strong>9090</strong> y <strong>9091</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>volumes/minio</strong> en la carpeta actual.</li>
<li>El contenedor <strong>milvus-standalone</strong> sirve los puertos <strong>19530</strong> localmente con la configuración por defecto y asigna sus datos a <strong>volumes/milvus</strong> en la carpeta actual.</li>
</ul></li>
</ul>
<p>Puede comprobar si los contenedores están en funcionamiento utilizando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Si ha asignado varios dispositivos GPU a Milvus en docker-compose.yml, puede especificar qué dispositivo GPU está visible o disponible para su uso.</p>
<p>Haga que el dispositivo GPU <code translate="no">0</code> sea visible para Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Haga que los dispositivos GPU <code translate="no">0</code> y <code translate="no">1</code> sean visibles para Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Puede detener y eliminar este contenedor de la siguiente manera.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurar el pool de memoria<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de que Milvus esté en funcionamiento, puede personalizar el pool de memoria modificando los ajustes de <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> en el archivo <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>El archivo <code translate="no">milvus.yaml</code> se encuentra en el directorio <code translate="no">/milvus/configs/</code> dentro del contenedor Milvus.</p>
</div>
<p>Para configurar la reserva de memoria, modifique las opciones <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> en el archivo <code translate="no">milvus.yaml</code> de la siguiente manera.</p>
<ol>
<li><p>Utilice el siguiente comando para copiar <code translate="no">milvus.yaml</code> desde el contenedor Milvus a su máquina local. Sustituya <code translate="no">&lt;milvus_container_id&gt;</code> por el ID real de su contenedor Milvus.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Abra el archivo <code translate="no">milvus.yaml</code> copiado con su editor de texto preferido. Por ejemplo, con vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edite las opciones <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> según sea necesario y guarde los cambios:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Tamaño inicial de la reserva de memoria. Por defecto 1024.</li>
<li><code translate="no">maxMemSize</code>: Tamaño máximo de la reserva de memoria. Por defecto es 2048.</li>
</ul></li>
<li><p>Utilice el siguiente comando para copiar el archivo <code translate="no">milvus.yaml</code> modificado de nuevo al contenedor Milvus. Sustituya <code translate="no">&lt;milvus_container_id&gt;</code> por el ID real de su contenedor Milvus.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Reinicie el contenedor Milvus para aplicar los cambios:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Una vez instalado Milvus en Docker, puede:</p>
<ul>
<li><p>Consultar <a href="/docs/es/v2.4.x/quickstart.md">Quickstart</a> para ver qué puede hacer Milvus.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/v2.4.x/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/v2.4.x/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/v2.4.x/manage-partitions.md">Gestionar Particiones</a></li>
<li><a href="/docs/es/v2.4.x/insert-update-delete.md">Insertar, Subinsertar y Eliminar</a></li>
<li><a href="/docs/es/v2.4.x/single-vector-search.md">Búsqueda monovectorial</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda Híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-helm.md">Actualice Milvus utilizando Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/v2.4.x/scaleout.md">Escale su cluster Milvus</a>.</p></li>
<li><p>Despliegue su clúster Milvu en nubes:</p>
<ul>
<li><a href="/docs/es/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/es/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Explore <a href="/docs/es/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para depurar Milvus y actualizaciones dinámicas de configuración.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/v2.4.x/monitor.md">Supervise Milvus con Prometheus</a>.</p></li>
</ul>
