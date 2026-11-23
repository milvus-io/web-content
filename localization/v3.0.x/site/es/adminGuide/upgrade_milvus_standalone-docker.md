---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Descubre cómo actualizar Milvus en modo autónomo con Docker Compose.
title: Actualización de Milvus Standalone con Docker Compose
---
<div class="tab-wrapper"><a href="/docs/es/upgrade_milvus_standalone-operator.md" class=''>Milvus,</a><a href="/docs/es/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/es/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Actualización de Milvus Standalone con Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo actualizar una implementación independiente de Milvus 2.6.x a la versión 3.0.5 con Docker Compose.</p>
<div class="alert note">
<p>Este procedimiento se ha validado con la configuración oficial de Docker Compose para Milvus 2.6.20 en modo autónomo, con un único cambio en la imagen. El paso 2 añade además el servicio de propiedad del directorio de datos de la configuración de Compose de la versión 3.0.5, que no se incluyó en dicha validación.</p>
</div>
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
<li>Docker Engine y Docker Compose V2</li>
<li>Una implementación independiente existente de Milvus 2.6.x gestionada por Docker Compose</li>
<li>El archivo y la configuración de Docker Compose utilizados para la implementación existente</li>
<li>Una copia de seguridad actualizada de los metadatos y los datos persistentes de Milvus</li>
</ul>
<p><strong>Limitaciones de la cola de mensajes</strong>: al actualizar a Milvus v3.0.5, debes mantener tu elección actual de cola de mensajes. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. El soporte para cambiar de sistema de colas de mensajes estará disponible en futuras versiones.</p>
<div class="alert warning">
<p>No sustituya su archivo Compose actual ni modifique las versiones de las dependencias como parte de este procedimiento. Mantenga el etcd, el almacenamiento de objetos, la cola de mensajes, los volúmenes y la configuración existentes. Actualice la etiqueta de la imagen de Milvus y añada el servicio de propiedad del directorio de datos descrito en el paso 2.</p>
<p>Si su archivo Compose utiliza <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> y Docker no puede descargar esta imagen, cámbiela por <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, que es la que utiliza la configuración de Compose de la versión 3.0.5. Mantenga la misma etiqueta de versión.</p>
<p>Este procedimiento no valida una degradación o una reversión al cambiar la imagen de Milvus de nuevo a la versión 2.6.x. Una vez que la versión v3.0.5 haya escrito datos, una reversión que afecte únicamente a la imagen podría no leer correctamente el estado actualizado. Si la actualización falla, detén las operaciones de escritura y utiliza un plan de recuperación que restaure los metadatos previos a la actualización y las copias de seguridad de los datos persistentes. Valida primero el plan de recuperación en un entorno que no sea de producción.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Paso 1: Realizar una copia de seguridad de la configuración actual<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Guarde una copia del archivo Compose actual y de cualquier archivo de configuración de Milvus montado:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Comprueba que los contenedores actuales estén en buen estado antes de iniciar la actualización:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Paso 2: Actualizar la imagen de Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>En el archivo Compose existente, actualiza la imagen del servicio <code translate="no">standalone</code>, sustituye sus entradas <code translate="no">depends_on</code> por las que se indican a continuación y añade el servicio <code translate="no">milvus-volume-init</code>. Utiliza la misma imagen para ambos servicios y monta el mismo directorio de host que el servicio <code translate="no">standalone</code> monta en <code translate="no">/var/lib/milvus</code>. Mantén el resto de ajustes del servicio <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Las imágenes de Milvus v3.0.5 ejecutan Milvus como el usuario no root <code translate="no">milvus</code>, mientras que las imágenes de Milvus 2.6.x no establecen ningún usuario y ejecutan Milvus como <code translate="no">root</code>. El servicio <code translate="no">milvus-volume-init</code> procede de la configuración de Compose v3.0.5. Se ejecuta una vez como <code translate="no">root</code> antes de que se inicie Milvus y cambia el propietario de <code translate="no">/var/lib/milvus</code> y su contenido al usuario y grupo <code translate="no">milvus</code>, de modo que Milvus pueda escribir en los archivos que creó la implementación 2.6.x. A continuación, escribe un archivo marcador <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> en <code translate="no">/var/lib/milvus</code> y no realiza cambios en ejecuciones posteriores mientras el archivo marcador exista. Si posteriormente restaura archivos que pertenecen a otro usuario en el directorio de datos, elimine el archivo marcador para que el servicio vuelva a ejecutarse.</p>
<p>Descarga la imagen de destino y vuelve a crear el contenedor de Milvus. Dado que el servicio <code translate="no">standalone</code> depende de <code translate="no">milvus-volume-init</code>, Docker Compose ejecuta <code translate="no">milvus-volume-init</code> hasta su finalización antes de iniciar el nuevo contenedor de Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose mantiene en ejecución los contenedores existentes de etcd y de almacenamiento de objetos, y reutiliza los directorios de datos configurados. Si ha cambiado la configuración de una dependencia, por ejemplo, la imagen de MinIO, Compose vuelve a crear ese contenedor y conserva sus volúmenes montados.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Comprueba la actualización<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Comprueba el estado del contenedor y la imagen utilizada por el contenedor de Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Comprueba que el servicio <code translate="no">standalone</code> esté en buen estado, que su imagen sea <code translate="no">milvusdb/milvus:v3.0.5</code> y que las colecciones existentes sigan siendo consultables y buscables. Realiza estas comprobaciones antes de habilitar cualquier función específica de la versión 3.0.5.</p>
<div class="alert note">
<p>La actualización a Milvus 3.0 no habilita Storage V3. Una vez verificada la actualización, revisa <a href="/docs/es/storage-v3.md">Storage V3</a> antes de habilitar las funciones que dependen de él. Una vez que Milvus haya escrito datos en Storage V3, no se admite la vuelta a una versión anterior de Milvus que no pueda leer Storage V3.</p>
</div>
