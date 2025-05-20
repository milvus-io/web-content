---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Aprenda a instalar Milvus de forma autónoma con Docker Compose.
title: Ejecutar Milvus con Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Ejecutar Milvus con Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra cómo lanzar una instancia de Milvus en Docker utilizando Docker Compose.</p>
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
<li><a href="/docs/es/v2.4.x/prerequisite-docker.md">Compruebe los requisitos de hardware y software</a> antes de la instalación.</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">Instale Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona un archivo de configuración Docker Compose en el repositorio Milvus. Para instalar Milvus utilizando Docker Compose, simplemente ejecute</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Si no puede ejecutar el comando anterior, compruebe si su sistema tiene instalado Docker Compose V1. Si este es el caso, se le aconseja migrar a Docker Compose V2 debido a las notas en <a href="https://docs.docker.com/compose/">esta página</a>.</p></li>
<li><p>Si encuentra algún problema al arrancar la imagen, póngase en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con detalles sobre el problema, y le proporcionaremos el soporte necesario.</p></li>
</ul>
</div>
<p>Después de arrancar Milvus,</p>
<ul>
<li>Los contenedores <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> están activos.<ul>
<li>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y mapea sus datos a <strong>volúmenes/etcd</strong> en la carpeta actual.</li>
<li>El contenedor <strong>milvus-minio</strong> sirve los puertos <strong>9090</strong> y <strong>9091</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>volumes/minio</strong> en la carpeta actual.</li>
<li>El contenedor <strong>milvus-standalone</strong> sirve los puertos <strong>19530</strong> localmente con la configuración por defecto y asigna sus datos a <strong>volumes/milvus</strong> en la carpeta actual.</li>
</ul></li>
</ul>
<p>Puede comprobar si los contenedores están en funcionamiento utilizando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Puede detener y eliminar este contenedor de la siguiente manera</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>Habiendo instalado Milvus en Docker, puede:</p>
<ul>
<li><p>Comprobar <a href="/docs/es/v2.4.x/quickstart.md">Quickstart</a> para ver lo que Milvus puede hacer.</p></li>
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
<li><p>Despliegue su clúster Milvus en nubes:</p>
<ul>
<li><a href="/docs/es/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/es/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Explore <a href="/docs/es/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para depurar Milvus y actualizaciones dinámicas de configuración.</p></li>
<li><p>Explore <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/v2.4.x/monitor.md">Supervise Milvus con Prometheus</a>.</p></li>
</ul>
