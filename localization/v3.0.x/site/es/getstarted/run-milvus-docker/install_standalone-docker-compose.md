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
<li>Instala el <a href="https://docs.docker.com/compose/install/linux/">complemento de Docker Compose</a> (V2 o posterior) y comprueba que funciona con el comando « <code translate="no">docker compose version</code> ». Estas instrucciones utilizan « <code translate="no">docker compose</code> », no el comando heredado « <code translate="no">docker-compose</code> » de la versión V1.</li>
<li><a href="/docs/es/prerequisite-docker.md">Comprueba los requisitos de hardware y software</a> antes de la instalación.</li>
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
    </button></h2><p>Milvus proporciona un archivo de configuración de Docker Compose en el repositorio de Milvus. Descarga la configuración para la versión 3.0.5 e inicia una nueva implementación:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Despliegue predeterminado (v3.0.5):</strong> <code translate="no">docker compose up -d</code> inicia tres contenedores de ejecución prolongada: <code translate="no">milvus-etcd</code> (metadatos), <code translate="no">milvus-minio</code> (almacenamiento de objetos) y <code translate="no">milvus-standalone</code>. La cola de mensajes es <strong>Woodpecker (integrada, con MinIO / almacenamiento de objetos como backend WAL)</strong>, por lo que no se requiere un contenedor de cola de mensajes independiente.</p>
<p>La configuración también ejecuta el servicio de un solo uso <code translate="no">milvus-volume-init</code> para preparar la propiedad del directorio de datos. Se cierra tras completar esa tarea.</p>
<p><strong>Cola de mensajes predeterminada según la versión:</strong></p>
<ul>
<li><strong>2.5.x</strong>: la cola de mensajes predeterminada es <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x y posteriores</strong>: la cola de mensajes predeterminada es <strong>Woodpecker (integrada)</strong>.</li>
</ul>
<p>Utiliza la configuración adjunta a la versión que pretendas instalar. Para una implementación existente, sigue las instrucciones de actualización en lugar de sustituir su configuración por un archivo de nueva instalación.</p>
<ul>
<li><p>Si « <code translate="no">docker compose</code> » no está disponible, instala el complemento Compose siguiendo las <a href="https://docs.docker.com/compose/install/linux/">instrucciones de Docker</a>.</p></li>
<li><p>Si tiene algún problema al descargar la imagen, póngase en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con los detalles del problema y le proporcionaremos la asistencia necesaria.</p></li>
</ul>
</div>
<p>Tras iniciar Milvus,</p>
<ul>
<li>los contenedores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> estarán en funcionamiento.
<ul>
<li>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y asigna sus datos a <strong>volumes/etcd</strong> en la carpeta actual.</li>
<li>El contenedor <strong>«milvus-minio»</strong> atiende los puertos <strong>9000</strong> y <strong>9001</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>«volumes/minio»</strong> en la carpeta actual.</li>
<li>El contenedor <strong>«milvus-standalone»</strong> atiende los puertos <strong>19530</strong> de forma local con la configuración predeterminada y asigna sus datos a <strong>la carpeta «volumes/milvus»</strong> de la carpeta actual.</li>
</ul></li>
</ul>
<p>Puedes comprobar si los contenedores están en funcionamiento mediante el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>También puede acceder a la interfaz web de Milvus en <code translate="no">http://127.0.0.1:9091/webui/</code> para obtener más información sobre su instancia de Milvus. Para más detalles, consulte <a href="/docs/es/milvus-webui.md">la interfaz web de Milvus</a>.</p>
<p>Para probar el servidor en ejecución, siga la ruta <strong>«Utilizar un servidor Milvus existente»</strong> en <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a> y conéctese a <code translate="no">http://localhost:19530</code>. No utilice el bloque de conexión local <code translate="no">.db</code>, ya que inicia una base de datos Milvus Lite independiente.</p>
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
    </button></h2><p>Para actualizar la configuración de Milvus según sus necesidades, debe modificar el archivo <code translate="no">/milvus/configs/user.yaml</code> dentro del contenedor <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>Accede al contenedor <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Añade configuraciones adicionales para anular las predeterminadas.
A continuación se da por hecho que necesitas anular la configuración predeterminada de <code translate="no">proxy.healthCheckTimeout</code>. Para conocer los elementos de configuración aplicables, consulta <a href="/docs/es/system_configuration.md">«Configuración del sistema</a>».</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Reinicia el contenedor « <code translate="no">milvus-standalone</code> » para aplicar los cambios.</p>
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
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Actualizar una implementación existente<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Para una implementación independiente de Milvus 2.6.x, siga las instrucciones de <a href="/docs/es/upgrade_milvus_standalone-docker.md">Actualizar Milvus independiente con Docker Compose</a>. Realice una copia de seguridad de los metadatos y los datos persistentes, conserve las dependencias y la configuración existentes, y valide la ruta de actualización documentada de origen a destino antes de cambiar la imagen de Milvus. No sustituya el archivo Compose de una implementación anterior por la configuración de nueva instalación indicada anteriormente.</p>
<p><strong>Limitaciones de la cola de mensajes</strong>: al actualizar a Milvus v3.0.5, debe mantener su elección actual de cola de mensajes. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. La compatibilidad con el cambio de sistemas de colas de mensajes estará disponible en futuras versiones.</p>
<p>Milvus 2.6.x y versiones posteriores utilizan Woodpecker de forma predeterminada, mientras que las implementaciones 2.5.x utilizan <strong>RocksMQ</strong> de forma predeterminada. Si la implementación que está actualizando sigue ejecutando RocksMQ, fíjela en <code translate="no">user.yaml</code> antes de cambiar la imagen de Milvus, de modo que la instancia actualizada mantenga su cola de mensajes existente en lugar de comenzar con el nuevo valor predeterminado:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que la instancia actualizada esté ejecutándose en la versión 3.0.5, podrá pasar de RocksMQ a Woodpecker mediante la <a href="/docs/es/switch-mq-type.md">opción «Switch Message Queue»</a>, disponible en Milvus 3.0 y versiones posteriores.</p>
<h2 id="Optional-dependencies" class="common-anchor-header">Dependencias opcionales<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta implementación utiliza <strong>Woodpecker</strong> (integrado, backend WAL de MinIO) para la gestión de mensajes, <strong>etcd</strong> para los metadatos y <strong>MinIO</strong> para el almacenamiento de objetos. Para utilizar una cola de mensajes diferente o conectar un almacenamiento de objetos o metadatos externo, consulta:</p>
<ul>
<li>Cola de mensajes: <a href="/docs/es/woodpecker.md">Woodpecker</a> (predeterminada) · <a href="/docs/es/mq_pulsar.md">Pulsar</a> · <a href="/docs/es/mq_kafka.md">Kafka</a> · <a href="/docs/es/mq_rocksmq.md">RocksMQ</a></li>
<li>Almacenamiento de objetos: <a href="/docs/es/deploy_s3.md">MinIO</a> (predeterminado) · <a href="/docs/es/deploy_s3.md">AWS S3</a> · <a href="/docs/es/abs.md">Azure Blob</a> · <a href="/docs/es/gcs.md">GCP Cloud Storage</a> · <a href="/docs/es/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/es/deploy_s3.md">Tencent COS</a> · <a href="/docs/es/deploy_s3.md">Huawei OBS</a> · <a href="/docs/es/deploy_s3.md">Compatible con S3</a></li>
<li>Metadatos: <a href="/docs/es/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>El almacenamiento V3 está desactivado por defecto. Actívalo antes de utilizar las funciones que dependen de él. Para conocer los requisitos y las consideraciones de compatibilidad, consulta <a href="/docs/es/storage-v3.md">Almacenamiento V3</a>.</p>
</div>
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
    </button></h2><p>Una vez instalado Milvus en Docker, puedes:</p>
<ul>
<li><p>Consulta <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a> para ver lo que Milvus puede hacer.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/manage-partitions.md">Gestionar particiones</a></li>
<li><a href="/docs/es/insert-update-delete.md">Insertar, actualizar o eliminar</a></li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda de un solo vector</a></li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/upgrade_milvus_standalone-docker.md">Actualiza Milvus Standalone con Docker Compose</a>.</p></li>
<li><p><a href="/docs/es/scaleout.md">Escala tu clúster de Milvus</a>.</p></li>
<li><p>Implementa tu clúster de Milvus en la nube:</p>
<ul>
<li><a href="/docs/es/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Descubre <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>, una interfaz web intuitiva para la observabilidad y la gestión de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para la depuración de Milvus y las actualizaciones dinámicas de configuración.</p></li>
<li><p>Descubre <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/monitor.md">Supervisa Milvus con Prometheus</a>.</p></li>
</ul>
