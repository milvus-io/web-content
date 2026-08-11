---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Descubre cómo instalar Milvus en modo autónomo con Docker.
title: Ejecutar Milvus en Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Ejecutar Milvus en Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se explica cómo iniciar una instancia de Milvus en Docker.</p>
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
<li><a href="/docs/es/prerequisite-docker.md">Comprueba los requisitos de hardware y software</a> antes de la instalación.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Instalar Milvus en Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona un script de instalación para instalarlo como contenedor de Docker. El script está disponible en el <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositorio de Milvus</a>. Para instalar Milvus en Docker, basta con ejecutar</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Novedades de la versión 3.0-beta:</strong></p>
<ul>
<li><strong>Nodo de streaming</strong>: capacidades mejoradas de procesamiento de datos</li>
<li><strong>Woodpecker MQ (predeterminado)</strong>: esta implementación en Docker ejecuta Woodpecker como cola de mensajes con el <strong>sistema de archivos local</strong> como backend WAL, por lo que no se requiere ningún servicio externo de cola de mensajes. Véase <a href="/docs/es/woodpecker.md">Woodpecker</a>.</li>
<li><strong>Arquitectura optimizada</strong>: componentes consolidados para un mejor rendimiento</li>
</ul>
<p>Descarga siempre el script más reciente para asegurarte de obtener las configuraciones y mejoras de arquitectura más actuales.</p>
<p>Si deseas utilizar <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> en modo de implementación independiente, se recomienda utilizar el método de implementación <a href="https://milvus.io/docs/install_standalone-docker-compose.md">de Docker Compose</a>.</p>
<p>Si tienes algún problema al descargar la imagen, ponte en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con los detalles del problema y te proporcionaremos la asistencia necesaria.</p>
</div>
<p>Tras ejecutar el script de instalación:</p>
<ul>
<li>Se ha iniciado un contenedor Docker denominado «milvus-standalone» en el puerto <strong>19530</strong>.</li>
<li>Se ha instalado un etcd integrado junto con Milvus en el mismo contenedor y está disponible en el puerto <strong>2379</strong>. Su archivo de configuración está asociado a <strong>embedEtcd.yaml</strong> en la carpeta actual.</li>
<li>Para modificar la configuración predeterminada de Milvus, añade tus ajustes al archivo <strong>user.yaml</strong> de la carpeta actual y, a continuación, reinicia el servicio.</li>
<li>El volumen de datos de Milvus está asignado a <strong>«volumes/milvus»</strong> en la carpeta actual.</li>
</ul>
<p>Puede acceder a la interfaz web de Milvus en <code translate="no">http://127.0.0.1:9091/webui/</code> para obtener más información sobre su instancia de Milvus. Para más detalles, consulte <a href="/docs/es/milvus-webui.md">la interfaz web de Milvus</a>.</p>
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
    </button></h2><p>Puede modificar la configuración de Milvus en el archivo <strong>user.yaml</strong> de la carpeta actual. Por ejemplo, para cambiar la dirección <code translate="no">proxy.healthCheckTimeout</code> por <code translate="no">1000</code>, puede modificar el archivo de la siguiente manera:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, reinicie el servicio de la siguiente manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para conocer los elementos de configuración aplicables, consulte <a href="/docs/es/system_configuration.md">«Configuración del sistema</a>».</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Actualizar Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede actualizar a la última versión de Milvus utilizando el comando de actualización integrado. Esto descarga automáticamente la última configuración y la imagen de Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>El comando de actualización realiza automáticamente lo siguiente:</p>
<ul>
<li>Descarga el script de instalación más reciente con las configuraciones actualizadas</li>
<li>Recupera la imagen Docker más reciente de Milvus</li>
<li>Reinicia el contenedor con la nueva versión</li>
<li>Conserva los datos y las configuraciones existentes</li>
</ul>
<p>Esta es la forma recomendada de actualizar tu implementación independiente de Milvus.</p>
</div>
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
    </button></h2><p>Puedes detener y eliminar este contenedor de la siguiente manera</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Por defecto, esta implementación ejecuta <strong>Woodpecker</strong> (WAL en el sistema de archivos local) como cola de mensajes y un <strong>etcd integrado</strong> para los metadatos; no es necesario instalar nada más. Para utilizar una cola de mensajes diferente o conectar almacenamiento de objetos externo o metadatos, consulta:</p>
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
<li><a href="/docs/es/insert-update-delete.md">Insertar, actualizar o insertar y eliminar</a></li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda de un solo vector</a></li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/upgrade_milvus_cluster-helm.md">Actualizar Milvus mediante Helm Chart</a>.</p></li>
<li><p><a href="/docs/es/scaleout.md">Escala tu clúster de Milvus</a>.</p></li>
<li><p>Implementa tu clúster de Milvus en la nube:</p>
<ul>
<li><a href="/docs/es/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Descubre <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>, una interfaz web intuitiva para la observabilidad y la gestión de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para la depuración de Milvus y las actualizaciones dinámicas de la configuración.</p></li>
<li><p>Descubre <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/monitor.md">Supervisa Milvus con Prometheus</a>.</p></li>
</ul>
