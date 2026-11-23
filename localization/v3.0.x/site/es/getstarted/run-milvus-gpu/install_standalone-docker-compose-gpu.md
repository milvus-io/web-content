---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Descubre cómo instalar Milvus en modo autónomo con soporte para GPU utilizando
  Docker Compose.
title: Ejecutar Milvus con soporte para GPU mediante Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Ejecutar Milvus con soporte para GPU mediante Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>En esta página se explica cómo iniciar una instancia de Milvus con soporte para GPU mediante Docker Compose.</p>
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
<li><a href="/docs/es/prerequisite-gpu.md">Comprueba los requisitos de hardware y software</a> antes de la instalación.</li>
</ul>
<div class="alert note">
<p>Si tienes algún problema al descargar la imagen, ponte en contacto con nosotros en <a href="mailto:community@zilliz.com">community@zilliz.com</a> con los detalles del problema y te proporcionaremos la asistencia necesaria.</p>
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
    </button></h2><p>Para instalar Milvus con soporte para GPU utilizando Docker Compose, sigue estos pasos.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Descarga y configura el archivo YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Descárgalo <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> y guárdalo como docker-compose.yml manualmente o con el siguiente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para comprobar la descarga, compara la salida del siguiente comando con el resumen de « <code translate="no">sha256</code> » que aparece para « <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> » en la <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">página de lanzamientos</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Puede cambiar los dispositivos de GPU asignados a Milvus en la sección « <code translate="no">deploy</code> » del servicio « <code translate="no">standalone</code> » del archivo YAML de la siguiente manera:</p>
<ul>
<li>Para asignar un dispositivo GPU específico a Milvus, localice el campo « <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> » en la definición del servicio « <code translate="no">standalone</code> » y sustituya su valor por el ID de la GPU deseada. Puede utilizar la herramienta « <code translate="no">nvidia-smi</code> », incluida con los controladores de pantalla de las GPU de NVIDIA, para determinar el ID de un dispositivo GPU. Milvus admite varios dispositivos GPU.</li>
</ul>
<p>Asignar un único dispositivo de GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Asignar varios dispositivos de GPU a Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Iniciar Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>En el directorio que contiene el archivo docker-compose.yml, inicia Milvus ejecutando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si no ha podido ejecutar el comando anterior, compruebe si su sistema tiene instalado Docker Compose V1. Si es así, se recomienda migrar a Docker Compose V2 debido a las notas que figuran en <a href="https://docs.docker.com/compose/">esta página</a>.</p>
</div>
<p>Tras iniciar Milvus,</p>
<ul>
<li>los contenedores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> estarán en funcionamiento.
<ul>
<li>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y asigna sus datos a <strong>volumes/etcd</strong> en la carpeta actual.</li>
<li>El contenedor <strong>«milvus-minio»</strong> atiende los puertos <strong>9000</strong> y <strong>9001</strong> con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>«volumes/minio»</strong> en la carpeta actual.</li>
<li>El contenedor <strong>«milvus-standalone»</strong> atiende los puertos <strong>19530</strong> y <strong>9091</strong> con la configuración predeterminada y asigna sus datos a <strong>«volumes/milvus»</strong> en la carpeta actual.</li>
</ul></li>
</ul>
<p>El servicio « <code translate="no">standalone</code> » establece ` <code translate="no">security_opt: seccomp:unconfined</code>`, de modo que el contenedor de Milvus se ejecuta sin el perfil seccomp predeterminado de Docker.</p>
<div class="alert warning">
<blockquote>
<p>El archivo Compose publica estos puertos sin una IP de host, por lo que Docker los vincula a todas las interfaces de red del host, y otras máquinas que puedan acceder a este host podrán conectarse a Milvus y MinIO. MinIO utiliza la clave de acceso y la clave secreta <code translate="no">minioadmin</code>, que se configuran en el archivo Compose. Para publicar los puertos únicamente en la dirección de bucle invertido, añade <code translate="no">127.0.0.1:</code> a las entradas « <code translate="no">ports</code> » de los servicios <code translate="no">minio</code> y <code translate="no">standalone</code> en <code translate="no">docker-compose.yml</code>, por ejemplo, <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, y vuelve a ejecutar <code translate="no">sudo docker compose up -d</code>. Para obtener más información, consulta <a href="https://docs.docker.com/engine/network/port-publishing/">«Publicación y asignación de puertos</a>». Para utilizar otras credenciales de MinIO, modifica <code translate="no">MINIO_ACCESS_KEY</code> y <code translate="no">MINIO_SECRET_KEY</code> del servicio <code translate="no">minio</code>, y establece los mismos valores en <code translate="no">minio.accessKeyID</code> y <code translate="no">minio.secretAccessKey</code> de la configuración de Milvus. Para exigir un nombre de usuario y una contraseña en las conexiones de los clientes a Milvus, consulta <a href="/docs/es/authenticate.md">«Autenticación del acceso de usuarios</a>».</p>
</blockquote>
</div>
<p>Puede comprobar si los contenedores están en funcionamiento mediante el siguiente comando:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>De forma predeterminada, el comando solo muestra los contenedores en ejecución. Comprueba que la salida incluya los contenedores <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> y <strong>milvus-standalone</strong>, y que la columna « <code translate="no">STATUS</code> » de cada uno de ellos comience por « <code translate="no">Up</code> ».</p>
<p>También puede acceder a la interfaz web de Milvus en <code translate="no">http://127.0.0.1:9091/webui/</code> para obtener más información sobre su instancia de Milvus. Para más detalles, consulte <a href="/docs/es/milvus-webui.md">la interfaz web de Milvus</a>.</p>
<p>Para cambiar los dispositivos GPU que utiliza Milvus una vez iniciado, edite el campo « <code translate="no">device_ids</code> » en « <code translate="no">deploy.resources.reservations.devices</code> » del servicio « <code translate="no">standalone</code> » en el archivo «docker-compose.yml», tal y como se muestra en el paso 1, y, a continuación, ejecute el siguiente comando. Dado que la configuración del servicio ha cambiado, « <code translate="no">docker compose up</code> » detiene y vuelve a crear el contenedor <strong>«milvus-standalone</strong> ». Para obtener más información, consulta <a href="https://docs.docker.com/compose/how-tos/gpu-support/">«Ejecutar servicios de Docker Compose con acceso a la GPU</a>».</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Puede detener y eliminar este contenedor de la siguiente manera.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Configurar el grupo de memoria<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que Milvus esté en funcionamiento, puede personalizar el grupo de memoria modificando los ajustes de <code translate="no">initMemSize</code> y <code translate="no">maxMemSize</code> en la sección « <code translate="no">gpu</code> » de la configuración de Milvus.</p>
<div class="alert note">
<p>El archivo « <code translate="no">milvus.yaml</code> » se encuentra en el directorio « <code translate="no">/milvus/configs/</code> » dentro del contenedor de Milvus. Los ajustes del archivo « <code translate="no">user.yaml</code> » situado en el mismo directorio anulan los valores de « <code translate="no">milvus.yaml</code> ».</p>
</div>
<p>Para conservar la configuración cuando se vuelva a crear el contenedor, guárdala en un archivo <code translate="no">user.yaml</code> en el host y monta el archivo en el contenedor de la siguiente manera.</p>
<ol>
<li><p>En el directorio que contiene el archivo `docker-compose.yml`, crea un archivo llamado ` <code translate="no">user.yaml</code> ` con la configuración que desees modificar. El siguiente ejemplo muestra la sección ` <code translate="no">gpu</code> ` con sus valores predeterminados. Sustitúyelos por los tamaños que necesites:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Tamaño inicial del grupo de memoria, en MB. El valor por defecto es 2048.</li>
<li><code translate="no">maxMemSize</code>: Tamaño máximo del grupo de memoria, en MB. El valor predeterminado es 4096.</li>
</ul></li>
<li><p>En docker-compose.yml, añade el archivo <code translate="no">user.yaml</code> a la lista <code translate="no">volumes</code> del servicio <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Vuelve a crear el contenedor Milvus para aplicar los cambios:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Una vez montado el archivo, reinicia el servicio « <code translate="no">standalone</code> » para aplicar los cambios posteriores a « <code translate="no">user.yaml</code> »:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 está desactivado de forma predeterminada. Actívalo antes de utilizar las funciones que dependen de él. Para conocer los requisitos y las consideraciones de compatibilidad, consulta <a href="/docs/es/storage-v3.md">Storage V3</a>.</p>
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
<li><p>Consulta <a href="/docs/es/milvus-webui.md">la interfaz web de Milvus</a> para obtener más información sobre la instancia de Milvus.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/manage-partitions.md">Gestionar particiones</a></li>
<li><a href="/docs/es/insert-update-delete.md">Insertar, actualizar o eliminar</a></li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda de un solo vector</a></li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></li>
</ul></li>
<li><p><a href="/docs/es/upgrade_milvus_standalone-docker.md">Actualiza Milvus Standalone con Docker Compose</a>. En esa página se muestra la etiqueta de la imagen de la CPU. Para esta implementación en GPU, mantén el sufijo « <code translate="no">-gpu</code> » (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) y conserva tus configuraciones de « <code translate="no">deploy</code> » y « <code translate="no">user.yaml</code> ».</p></li>
<li><p><a href="/docs/es/scaleout.md">Escala un clúster de Milvus</a> en Kubernetes. Ese procedimiento utiliza Helm y no es aplicable a esta implementación de Docker.</p></li>
<li><p>Implementa tu clúster de Milvus en la nube:</p>
<ul>
<li><a href="/docs/es/eks.md">Amazon EKS</a></li>
<li><a href="/docs/es/gcp.md">Google Cloud</a></li>
<li><a href="/docs/es/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explora <a href="/docs/es/milvus-webui.md">Milvus WebUI</a>, una interfaz web intuitiva para la observabilidad y la gestión de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/milvus_backup_overview.md">Milvus Backup</a>, una herramienta de código abierto para realizar copias de seguridad de los datos de Milvus.</p></li>
<li><p>Descubre <a href="/docs/es/birdwatcher_overview.md">Birdwatcher</a>, una herramienta de código abierto para la depuración de Milvus y las actualizaciones dinámicas de configuración.</p></li>
<li><p>Descubre <a href="https://github.com/zilliztech/attu">Attu</a>, una herramienta GUI de código abierto para la gestión intuitiva de Milvus.</p></li>
<li><p><a href="/docs/es/monitor.md">Supervisa Milvus con Prometheus</a>.</p></li>
</ul>
