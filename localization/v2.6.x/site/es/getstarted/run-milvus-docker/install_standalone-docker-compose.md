---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Descubre cómo instalar Milvus en modo autónomo con Docker Compose.
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
    </button></h1><p>En esta página se explica cómo iniciar una instancia de Milvus en Docker utilizando Docker Compose.</p>
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
<li><a href="https://docs.docker.com/get-docker/">Instala Docker</a>.</li>
<li><a href="/docs/es/v2.6.x/prerequisite-docker.md">Comprueba los requisitos de hardware y software</a> antes de la instalación.</li>
</ul>
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
    </button></h2><p>Milvus proporciona un archivo de configuración de Docker Compose en el repositorio de Milvus. Para instalar Milvus mediante Docker Compose, basta con ejecutar</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Novedades de la versión 2.6.17:</strong></p>
<ul>
<li><strong>Arquitectura mejorada</strong>: incluye el nuevo nodo de streaming y componentes optimizados</li>
<li><strong>Dependencias actualizadas</strong>: incluye las últimas versiones de MinIO y etcd</li>
<li><strong>Configuración mejorada</strong>: ajustes optimizados para un mejor rendimiento</li>
</ul>
<p>Descarga siempre la configuración más reciente de Docker Compose para garantizar la compatibilidad con las características de la v2.6.17.</p>
<ul>
<li><p>Si no has podido ejecutar el comando anterior, comprueba si tu sistema tiene instalada la versión 1 de Docker Compose. Si es así, te recomendamos que migres a la versión 2 de Docker Compose, tal y como se indica en <a href="https://docs.docker.com/compose/">esta página</a>.</p></li>
<li><p>Si tienes algún problema al descargar la imagen, ponte en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con los detalles del problema y te proporcionaremos la asistencia necesaria.</p></li>
</ul>
</div>
<p>Tras iniciar Milvus,</p>
<ul>
<li>los contenedores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> estarán en funcionamiento.
<ul>
<li>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y asigna sus datos a <strong>volumes/etcd</strong> en la carpeta actual.</li>
<li>El contenedor <strong>«milvus-minio»</strong> atiende los puertos <strong>9090</strong> y <strong>9091</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>«volumes/minio»</strong> en la carpeta actual.</li>
<li>El contenedor <strong>milvus-standalone</strong> atiende los puertos <strong>19530</strong> localmente con la configuración predeterminada y asigna sus datos a <strong>la carpeta volumes/milvus</strong> de la carpeta actual.</li>
</ul></li>
</ul>
<p>Puedes comprobar si los contenedores están en funcionamiento mediante el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>También puede acceder a la interfaz web de Milvus en <code translate="no">http://127.0.0.1:9091/webui/</code> para obtener más información sobre su instancia de Milvus. Para más detalles, consulte <a href="/docs/es/v2.6.x/milvus-webui.md">la interfaz web de Milvus</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opcional) Actualizar las configuraciones de Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Para actualizar la configuración de Milvus según sus necesidades, debe modificar el archivo ` <code translate="no">/milvus/configs/user.yaml</code> ` dentro del contenedor ` <code translate="no">milvus-standalone</code> `.</p>
<ol>
<li><p>Acceda al contenedor <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Añade configuraciones adicionales para anular las predeterminadas.
A continuación se da por supuesto que necesitas anular la configuración predeterminada de <code translate="no">proxy.healthCheckTimeout</code>. Para conocer los elementos de configuración aplicables, consulta <a href="/docs/es/v2.6.x/system_configuration.md">Configuración del sistema</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Reinicia el contenedor <code translate="no">milvus-standalone</code> para aplicar los cambios.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Detener y eliminar Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede detener y eliminar este contenedor de la siguiente manera</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
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
    </button></h2><p>Una vez instalado Milvus en Docker, puede:</p>
<ul>
<li><p>Consulta <a href="/docs/es/v2.6.x/quickstart.md">la Guía de inicio rápido</a> para ver lo que Milvus puede hacer.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/v2.6.x/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/v2.6.x/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/v2.6.x/manage-partitions.md">Gestionar particiones</a></li>
<li><a href="/docs/es/v2.6.x/insert-update-delete.md">Insertar, actualizar o insertar y eliminar</a></li>
<li><a href="/docs/es/v2.6.x/single-vector-search.md">Búsqueda de un solo vector</a></li>
<li><a href="/docs/es/v2.6.x/multi-vector-search.md">Búsqueda híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/v2.6.x/upgrade_milvus_cluster-helm.md">Actualizar Milvus mediante Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/v2.6.x/scaleout.md">Escala tu clúster de Milvus</a>.</p></li>
<li><p>Implementa tu clúster de Milvus en la nube:</p>
<ul>
<li><a href="/docs/es/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Descubre <a href="/docs/es/v2.6.x/milvus-webui.md">Milvus WebUI</a>, una interfaz web intuitiva para la observabilidad y la gestión de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para la depuración de Milvus y las actualizaciones dinámicas de la configuración.</p></li>
<li><p>Descubre <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/v2.6.x/monitor.md">Supervisa Milvus con Prometheus</a>.</p></li>
</ul>
