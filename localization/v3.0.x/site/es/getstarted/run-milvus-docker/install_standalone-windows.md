---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Descubre cómo instalar Milvus en modo autónomo con Docker Desktop para
  Windows.
title: Ejecutar Milvus en Docker (Windows)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Ejecutar Milvus en Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>De forma predeterminada, esta implementación utiliza <strong>Woodpecker</strong> (sistema de archivos local) como cola de mensajes, por lo que no se necesita ningún servicio externo de colas de mensajes. Consulta <a href="/docs/es/woodpecker.md">Woodpecker</a>.</p>
</blockquote>
<p>En esta página se explica cómo ejecutar Milvus en Windows utilizando Docker Desktop con el backend WSL 2 y contenedores Linux.</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instala Docker Desktop</a> y cumple con sus requisitos de Windows y de hardware.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instala el Subsistema de Windows para Linux 2 (WSL 2)</a>.</li>
<li>Inicie Docker Desktop, active la opción <strong>«Usar el motor basado en WSL 2</strong>» y seleccione «Contenedores Linux». Para ejecutar comandos dentro de una distribución WSL, active también dicha distribución en <strong>«Configuración</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integración con WSL</strong>». Véase <a href="https://docs.docker.com/desktop/features/wsl/">el backend WSL 2 de Docker Desktop</a>.</li>
</ul>
<p>Realice las siguientes comprobaciones en PowerShell o en el símbolo del sistema de Windows antes de descargar los archivos de Milvus:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>El tipo de sistema operativo de Docker debe ser « <code translate="no">linux</code> ». Los ejemplos de Compose utilizan el complemento « <code translate="no">docker compose</code> » (V2 o posterior), no el comando heredado « <code translate="no">docker-compose</code> » V1.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Ejecutar Milvus en Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Elige uno de los siguientes terminales. Ejecuta los comandos en un directorio de trabajo en el que se pueda escribir; el script almacena allí los archivos de configuración y el directorio <code translate="no">volumes</code>.</p>
<p>El script se descarga desde la rama « <code translate="no">master</code> » de Milvus. La etiqueta de su imagen de Docker está definida en el script y puede diferir de la v3.0.3. Para implementar esa versión concreta, utiliza la configuración de Docker Compose con versión específica que se indica a continuación.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Desde PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarga el script y, a continuación, inicia Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell requiere el prefijo « <code translate="no">.\</code> » para ejecutar un script desde el directorio de trabajo.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Desde el símbolo del sistema de Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza <code translate="no">curl.exe</code> para descargar el script; <code translate="no">Invoke-WebRequest</code> es un comando de PowerShell y no se ejecuta en el símbolo del sistema:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>Tras ejecutar cualquiera de las dos secuencias de comandos de Windows:</p>
<ul>
<li>Un contenedor de Docker llamado <strong>milvus-standalone</strong> escucha en el puerto <strong>19530</strong>.</li>
<li>El etcd integrado se ejecuta en el mismo contenedor en el puerto <strong>2379</strong>. Su archivo de configuración se corresponde con <strong>embedEtcd.yaml</strong> en el directorio de trabajo.</li>
<li>Milvus almacena los datos en <strong>«volumes/milvus»</strong> del directorio de trabajo.</li>
<li>Las modificaciones de configuración deben realizarse en <strong>el archivo user.yaml</strong> del directorio de trabajo. Reinicia el contenedor después de modificarlas.</li>
</ul>
<p>Comprueba el estado de la imagen y del contenedor en cualquiera de las terminales:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Para detener Milvus desde PowerShell, ejecute « <code translate="no">.\standalone.bat stop</code> »; desde el símbolo del sistema, ejecute « <code translate="no">standalone.bat stop</code> ». El comando « <code translate="no">delete</code> » elimina tanto el contenedor como los datos almacenados en él. Realice una copia de seguridad de los datos antes de utilizarlo.</p>
<h3 id="From-WSL-2" class="common-anchor-header">Desde WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Abre la distribución de WSL que tengas instalada desde un terminal de Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>En la terminal de WSL, descarga el script de Linux e inicia Milvus una vez:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Para detener Milvus, ejecuta « <code translate="no">bash standalone_embed.sh stop</code> ». El comando « <code translate="no">bash standalone_embed.sh delete</code> » elimina el contenedor, la configuración y los datos; haz una copia de seguridad de los datos antes de utilizarlo.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Ejecutar Milvus con Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza la configuración adjunta a la versión v3.0.3. Ejecuta únicamente la secuencia de comandos correspondiente a tu terminal.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Desde PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarga la configuración e inicia Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Desde el símbolo del sistema de Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Descarga la configuración e inicia Milvus:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">Desde WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Abre tu distribución de WSL y, a continuación, ejecuta los comandos de Linux:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>La configuración inicia tres contenedores de ejecución prolongada: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong>. También ejecuta el servicio « <code translate="no">milvus-volume-init</code> » de una sola vez para preparar la propiedad del directorio de datos. Sus datos se asignan a <strong>volumes/milvus</strong>, <strong>volumes/minio</strong> y <strong>volumes/etcd</strong> en el directorio de trabajo. MinIO expone los puertos <strong>9000</strong> y <strong>9001</strong>; Milvus expone los puertos <strong>19530</strong> y <strong>9091</strong>. Para conocer los comandos de configuración y gestión del ciclo de vida, consulta <a href="/docs/es/install_standalone-docker-compose.md">«Ejecutar Milvus con Docker Compose</a>».</p>
<h2 id="FAQs" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">¿Cómo puedo solucionar el error « <code translate="no">Docker Engine stopped</code> »?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus utiliza contenedores de Linux. Comprueba Docker Desktop y su backend WSL 2 antes de volver a intentar la instalación:</p>
<ol>
<li><p>Habilita la virtualización de hardware en la BIOS/UEFI si en <strong>el Administrador de tareas</strong> &gt; <strong>Rendimiento</strong> se muestra que está deshabilitada. Consulta los <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">requisitos de Docker Desktop para Windows</a>.</p></li>
<li><p>Inicia Docker Desktop desde el menú Inicio de Windows y espera a que se ejecute su motor. Es posible que se requieran privilegios de administrador para instalar o actualizar WSL o para determinados modos de instalación de Docker Desktop; no son un requisito general para ejecutar contenedores de Linux con el backend WSL 2.</p></li>
<li><p>Comprueba WSL desde un terminal de Windows. Si necesita una actualización, ejecuta el comando de actualización con los privilegios que solicite Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Habilita la opción <strong>«Usar el motor basado en WSL 2»</strong> en Docker Desktop. Si el menú de Docker ofrece la opción <strong>«Cambiar a contenedores de Linux</strong>», selecciónala. No cambies a contenedores de Windows para solucionar problemas en una imagen de Milvus Linux.</p></li>
<li><p>Ejecuta la siguiente comprobación en la terminal que utilices para la instalación:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Debe devolver « <code translate="no">linux</code> ». Si no puede conectarse al daemon, sigue <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">las instrucciones de resolución de problemas de Docker Desktop</a> antes de volver a ejecutar el script de Milvus. El simple hecho de iniciar « <code translate="no">com.docker.service</code> » no garantiza que el motor Linux de WSL 2 esté en funcionamiento.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">¿Cómo puedo solucionar los problemas relacionados con WSL al implementar Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Si has encontrado problemas relacionados con WSL al ejecutar Milvus desde WSL 2, es posible que tengas que comprobar si has configurado Docker Desktop para utilizar el motor basado en WSL 2 de la siguiente manera:</p>
<ol>
<li><p>Asegúrate de que la opción «Usar el motor basado en WSL 2» esté marcada en <strong>Configuración</strong> &gt; <strong>General</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Utilizar el motor basado en WSL 2 en la configuración de Docker Desktop</span>
  
 </span></p></li>
<li><p>Selecciona, entre las distribuciones de WSL 2 instaladas, aquellas en las que desees habilitar la integración con Docker yendo a: <strong>Configuración</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integración con WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Seleccionar distribuciones de WSL 2 en la configuración de Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">¿Cómo puedo solucionar los errores relacionados con el volumen que aparecen al iniciar Milvus y que indican « <code translate="no">Read config failed</code> »?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Mensaje de error «Read config failed» al iniciar Milvus</span>
  
 </span></p>
<p>Para solucionar el error que aparece al iniciar Milvus y que dice «Read config failed», debes comprobar si el volumen montado en el contenedor de Milvus es el correcto. Si el volumen está montado correctamente en el contenedor, puedes utilizar el comando <code translate="no">docker exec</code> para acceder al contenedor y listar el contenido de la carpeta <strong>/milvus/configs</strong> de la siguiente manera:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Listar los archivos de configuración de Milvus</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3 está desactivado de forma predeterminada. Actívalo antes de utilizar funciones que dependan de él. Para conocer los requisitos y las consideraciones de compatibilidad, consulta <a href="/docs/es/storage-v3.md">Storage V3</a>.</p>
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
    </button></h2><p>Una vez instalado Milvus en Docker, sigue la ruta <strong>«Utilizar un servidor Milvus existente»</strong> de <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a> y conecta el SDK a <code translate="no">http://localhost:19530</code>. Esta ruta de servidor no necesita Milvus Lite; el bloque de conexión local <code translate="no">.db</code> iniciaría una base de datos local independiente en lugar de utilizar este contenedor.</p>
<p>También puedes:</p>
<ul>
<li><p>Consultar <a href="/docs/es/quickstart.md">la Guía de inicio rápido</a> para ver lo que Milvus puede hacer.</p></li>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/manage_databases.md">Gestionar bases de datos</a></li>
<li><a href="/docs/es/manage-collections.md">Gestionar colecciones</a></li>
<li><a href="/docs/es/manage-partitions.md">Gestionar particiones</a></li>
<li><a href="/docs/es/insert-update-delete.md">Insertar, actualizar o eliminar</a></li>
<li><a href="/docs/es/single-vector-search.md">Búsqueda de un solo vector</a></li>
<li><a href="/docs/es/multi-vector-search.md">Búsqueda híbrida</a></li>
</ul></li>
<li><p>Para implementaciones con Compose, sigue las instrucciones de <a href="/docs/es/upgrade_milvus_standalone-docker.md">«Actualizar Milvus Standalone con Docker Compose»</a>; comprueba que el procedimiento funciona en tu entorno antes de realizar la actualización.</p></li>
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
