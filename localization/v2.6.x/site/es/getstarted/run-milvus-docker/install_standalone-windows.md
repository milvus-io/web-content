---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Descubre cómo instalar Milvus en modo autónomo con Docker Desktop para
  Windows.
title: Ejecutar Milvus en Docker (Linux)
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
    </button></h1><p>En esta página se explica cómo ejecutar Milvus en Windows utilizando Docker Desktop para Windows.​</p>
<h2 id="Prerequisites​" class="common-anchor-header">Requisitos previos​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instala Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instala el Subsistema de Windows para Linux 2 (WSL 2)</a>.​</p></li>
<li><p>Instala Python 3.8 o superior.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Ejecutar Milvus en Docker​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona un script de instalación para instalarlo como contenedor de Docker. Una vez que hayas instalado Docker Desktop en Microsoft Windows, podrás acceder a la CLI de Docker desde PowerShell o el símbolo del sistema de Windows en modo <strong>administrador</strong> y desde WSL 2. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Desde PowerShell o el símbolo del sistema de Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si estás más familiarizado con PowerShell o el símbolo del sistema de Windows, el comando es el siguiente.</p>
<ol>
<li><p>Abre Docker Desktop en modo administrador haciendo clic con el botón derecho del ratón y seleccionando <strong>«Ejecutar como administrador</strong>».​</p></li>
<li><p>Descarga el script de instalación y guárdalo como « <code translate="no">standalone.bat</code> ».​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>Ejecuta el script descargado para iniciar Milvus como un contenedor de Docker.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>Tras ejecutar el script de instalación:​</p>
<ul>
<li><p>Se ha iniciado un contenedor de Docker llamado <strong>«milvus-standalone»</strong> en el puerto <strong>19530</strong>.​</p></li>
<li><p>Se ha instalado un etcd integrado junto con Milvus en el mismo contenedor y está disponible en el puerto <strong>2379</strong>. Su archivo de configuración está asignado a <strong>embedEtcd.yaml</strong> en la carpeta actual.​</p></li>
<li><p>El volumen de datos de Milvus está asignado a <strong>volumes/milvus</strong> en la carpeta actual.​</p></li>
</ul>
<p>Puede utilizar los siguientes comandos para gestionar el contenedor de Milvus y los datos almacenados.​</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Desde WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si prefiere iniciar Milvus utilizando comandos de Linux y scripts de shell en Windows, asegúrese de que ya tiene instalado WSL 2. Para obtener más información sobre cómo instalar WSL 2, puede consultar este <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">artículo de Microsoft</a>.​</p>
<ol>
<li><p>Inicia WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Descarga el script de instalación​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie Milvus como un contenedor de Docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Puedes utilizar los siguientes comandos para gestionar el contenedor de Milvus y los datos almacenados.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Ejecuta Milvus con Docker Compose​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya instalado Docker Desktop en Microsoft Windows, podrá acceder a la CLI de Docker desde PowerShell o el símbolo del sistema de Windows en modo <strong>administrador</strong>. Puede ejecutar Docker Compose en PowerShell, en el símbolo del sistema de Windows o en WSL 2 para iniciar Milvus.​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Desde PowerShell o el símbolo del sistema de Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
<li><p>Abre Docker Desktop en modo administrador haciendo clic con el botón derecho del ratón y seleccionando <strong>«Ejecutar como administrador</strong>».​</p></li>
<li><p>Ejecuta los siguientes comandos en PowerShell o en el símbolo del sistema de Windows para descargar el archivo de configuración de Docker Compose para Milvus Standalone e iniciar Milvus.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>Dependiendo de tu conexión de red, la descarga de las imágenes para la instalación de Milvus puede tardar un rato. Una vez que los contenedores denominados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> y <strong>milvus-etcd</strong> estén en funcionamiento, podrás comprobar que ​</p>
<ul>
<li><p>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y asigna sus datos a <strong>volumes/etcd</strong> en la carpeta actual.</p></li>
<li><p>El contenedor <strong>milvus-minio</strong> sirve los puertos <strong>9090</strong> y <strong>9091</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>volumes/minio</strong> en la carpeta actual.</p></li>
<li><p>El contenedor <strong>milvus-standalone</strong> sirve los puertos <strong>19530</strong> localmente con la configuración predeterminada y asigna sus datos a <strong>volumes/milvus</strong> en la carpeta actual.​</p></li>
</ul></li>
</ol>
<p>También puedes ejecutar la versión para Linux de los comandos de Docker Compose si tienes instalado WSL 2.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Desde WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>El procedimiento es similar al de utilizar Docker Compose para instalar Milvus en sistemas Linux.​</p>
<ol>
<li><p>Inicia WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Descarga el archivo de configuración de Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicia Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Preguntas frecuentes​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">¿Cómo puedo solucionar el error « <code translate="no">Docker Engine stopped</code> »?​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez instalado Docker Desktop en Windows, es posible que aparezca el error « <code translate="no">Docker Engine stopped</code> » si tu ordenador no está configurado correctamente. En ese caso, es posible que tengas que comprobar lo siguiente:​</p>
<ol>
<li><p>Comprueba si la virtualización está habilitada.</p>
<p>Puedes comprobar si la virtualización está activada en la pestaña <strong>«Rendimiento»</strong> del <strong>Administrador de tareas</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>Virtualización en el Administrador de tareas</span>
  
 </span></p>
<p>Si la virtualización está desactivada, es posible que tengas que comprobar la configuración de la BIOS del firmware de tu placa base. La forma de habilitar la virtualización en la configuración de la BIOS varía según el fabricante de la placa base. En el caso de las placas base ASUS, por ejemplo, puedes consultar <a href="https://www.asus.com/support/faq/1043786/">este artículo</a> sobre cómo habilitar la virtualización.​</p>
<p>A continuación, deberá reiniciar el ordenador y habilitar Hyper-V. Para obtener más detalles, consulte este <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">artículo</a> de <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft</a>.​</p></li>
<li><p>Comprueba si se ha iniciado el servicio Docker Desktop.</p>
<p>Puede ejecutar el siguiente comando para iniciar el servicio Docker Desktop.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>Comprueba si WSL se ha instalado correctamente.</p>
<p>Puede ejecutar el siguiente comando para instalar o actualizar WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Comprueba si se ha iniciado el daemon de Docker.</p>
<p>Debe ir al directorio de instalación de Docker Desktop y ejecutar « <code translate="no">.\DockerCli.exe -SwitchDaemon</code> » para iniciar el daemon de Docker.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Comprueba si has iniciado Docker Desktop en modo <strong>administrador</strong>.</p>
<p>Asegúrate de haber iniciado Docker Desktop en modo administrador. Para ello, haz clic con el botón derecho del ratón en <strong>Docker Desktop</strong> y selecciona <strong>«Ejecutar como administrador</strong>».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>Iniciar Docker Desktop como administrador</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">¿Cómo puedo solucionar los problemas relacionados con WSL al implementar Milvus?​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>Si ha encontrado problemas relacionados con WSL al ejecutar Milvus desde WSL 2, es posible que tenga que comprobar si ha configurado Docker Desktop para utilizar el motor basado en WSL 2 de la siguiente manera:​</p>
<ol>
<li><p>Asegúrate de que la opción «Usar el motor basado en WSL 2» esté marcada en <strong>Configuración</strong> &gt; <strong>General</strong>. ​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Utilizar el motor basado en WSL 2 en la configuración de Docker Desktop</span>
  
 </span></p></li>
<li><p>Selecciona, entre las distribuciones de WSL 2 instaladas, aquellas en las que deseas habilitar la integración con Docker accediendo a: <strong>Configuración</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integración con WSL</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Seleccionar distribuciones de WSL 2 en la configuración de Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">¿Cómo puedo solucionar los errores relacionados con el volumen que aparecen al iniciar Milvus y que dicen « <code translate="no">Read config failed</code> »?​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Mensaje de error «Read config failed» al iniciar Milvus</span>
  
 </span></p>
<p>Para solucionar el error que aparece al iniciar Milvus y que dice «Read config failed», debes comprobar si el volumen montado en el contenedor de Milvus es el correcto. Si el volumen está correctamente montado en el contenedor, puedes utilizar el comando <code translate="no">docker exec</code> para acceder al contenedor y listar el contenido de la carpeta <strong>/milvus/configs</strong> de la siguiente manera:​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Listar los archivos de configuración de Milvus</span>
  
 </span></p>
<p>​</p>
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
<li><p>Consultar <a href="/docs/es/v2.6.x/quickstart.md">la Guía de inicio rápido</a> para ver qué puede hacer Milvus.</p></li>
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
