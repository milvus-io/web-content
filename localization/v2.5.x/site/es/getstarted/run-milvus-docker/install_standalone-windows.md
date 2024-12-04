---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Aprenda a instalar Milvus de forma autónoma con Docker Desktop para Windows.
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
    </button></h1><p>Esta página muestra cómo ejecutar Milvus en Windows utilizando Docker Desktop para Windows.</p>
<h2 id="Prerequisites​" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Instale Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Instale Windows Subsystem for Linux 2 (WSL 2)</a>.</p></li>
<li><p>Instalar Python 3.8+.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Ejecutar Milvus en Docker<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona un script de instalación para instalarlo como un contenedor Docker. Una vez que haya instalado Docker Desktop en Microsoft Windows, puede acceder a la CLI de Docker desde PowerShell o Windows Command Prompt en modo <strong>administrador</strong> y desde WSL 2. </p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Desde PowerShell o Símbolo del sistema de Windows</h3><p>Si estás más familiarizado con PowerShell o Símbolo del sistema de Windows, el símbolo del sistema es el siguiente.</p>
<ol>
<li><p>Abra Docker Desktop en modo administrador haciendo clic con el botón derecho y seleccionando <strong>Ejecutar como administrador</strong>.</p></li>
<li><p>Descargue el script de instalación y guárdelo como <code translate="no">standalone.bat</code>.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ejecute el script descargado para iniciar Milvus como contenedor Docker.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Después de ejecutar el script de instalación.</p>
<ul>
<li><p>Se ha iniciado un contenedor Docker llamado <strong>milvus-standalone</strong> en el puerto <strong>19530</strong>.</p></li>
<li><p>Un embed etcd se instala junto con Milvus en el mismo contenedor y sirve en el puerto <strong>2379</strong>. Su archivo de configuración se asigna a <strong>embedEtcd.yaml</strong> en la carpeta actual.</p></li>
<li><p>El volumen de datos de Milvus se asigna a <strong>volumes/milvus</strong> en la carpeta actual.</p></li>
</ul>
<p>Puede utilizar los siguientes comandos para gestionar el contenedor Milvus y los datos almacenados.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Stop Milvus​</span>
C:\&gt;standalone.bat stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus container​</span>
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. <span class="hljs-comment"># Container has been removed.​</span>
Delete successfully. <span class="hljs-comment"># Data has been removed.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">Desde WSL 2</h3><p>Si prefiere iniciar Milvus utilizando comandos Linux y shell scripts en Windows, asegúrese de que ya tiene instalado el comando WSL 2. Para más detalles sobre cómo instalar el comando WSL 2, puede consultar este <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">artículo de Microsoft</a>.</p>
<ol>
<li><p>Inicie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Descargue el script de instalación</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie Milvus como un contenedor Docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Puede utilizar los siguientes comandos para gestionar el contenedor Milvus y los datos almacenados.</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Ejecutar Milvus con Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya instalado Docker Desktop en Microsoft Windows, puede acceder a la CLI de Docker desde PowerShell o desde el símbolo del sistema de Windows en modo de <strong>administrador</strong>. Puede ejecutar Docker Compose en PowerShell, Símbolo del sistema de Windows o WSL 2 para iniciar Milvus.</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Desde PowerShell o Símbolo del sistema de Windows</h3><ol>
<li><p>Abra Docker Desktop en modo administrador haciendo clic con el botón derecho y seleccionando <strong>Ejecutar como administrador</strong>.</p></li>
<li><p>Ejecute los siguientes comandos en PowerShell o Windows Command Prompt para descargar el archivo de configuración Docker Compose para Milvus Standalone e iniciar Milvus.</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker-compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dependiendo de su conexión de red, la descarga de imágenes para la instalación de Milvus puede tardar un poco. Una vez que los contenedores llamados <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, y <strong>milvus-etcd</strong> están arriba, puede ser testigo de que</p>
<ul>
<li><p>El contenedor <strong>milvus-etcd</strong> no expone ningún puerto al host y mapea sus datos a <strong>volúmenes/etcd</strong> en la carpeta actual.</p></li>
<li><p>El contenedor <strong>milvus-minio</strong> sirve los puertos <strong>9090</strong> y <strong>9091</strong> localmente con las credenciales de autenticación predeterminadas y asigna sus datos a <strong>volumes/minio</strong> en la carpeta actual.</p></li>
<li><p>El contenedor <strong>milvus-standalone</strong> sirve los puertos <strong>19530</strong> localmente con la configuración por defecto y asigna sus datos a <strong>volumes/milvus</strong> en la carpeta actual.</p></li>
</ul></li>
</ol>
<p>También puede llamar a la versión Linux de los comandos Docker Compose si tiene WSL 2 instalado.</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Desde WSL 2</h3><p>El procedimiento es similar al uso de Docker Compose para instalar Milvus en sistemas Linux.</p>
<ol>
<li><p>Inicie WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Descargue el archivo de configuración de Milvus.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inicie Milvus.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">¿Cómo puedo solucionar el error <code translate="no">Docker Engine stopped</code>?</h3><p>Una vez que instale Docker Desktop en Windows, puede encontrarse con el error <code translate="no">Docker Engine stopped</code> si su equipo no está configurado correctamente. En este caso, puede que necesite realizar las siguientes comprobaciones.</p>
<ol>
<li><p>Compruebe si la virtualización está activada.</p>
<p>Puede comprobar si la virtualización está habilitada consultando la pestaña <strong>Rendimiento</strong> del <strong>Administrador de tareas</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>Virtualización en el Administrador de tareas</span> </span></p>
<p>Si la virtualización está deshabilitada, puede que necesites comprobar la configuración de la BIOS del firmware de tu placa base. La forma de habilitar la virtualización en la configuración de la BIOS varía según el fabricante de la placa base. Para la placa base ASUS, por ejemplo, puedes consultar <a href="https://www.asus.com/support/faq/1043786/">este artículo</a> sobre cómo habilitar la virtualización.</p>
<p>A continuación, es necesario reiniciar el equipo y habilitar Hyper-V. Para más detalles, consulta este <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">artículo de Microsoft</a>.</p></li>
<li><p>Compruebe si se ha iniciado el servicio Docker Desktop.</p>
<p>Puede ejecutar el siguiente comando para iniciar el servicio Docker Desktop.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compruebe si WSL se ha instalado correctamente.</p>
<p>Puede ejecutar el siguiente comando para instalar o actualizar el comando WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compruebe si se ha iniciado Docker Daemon.</p>
<p>Debe ir al directorio de instalación de Docker Desktop y ejecutar <code translate="no">.\DockerCli.exe -SwitchDaemon</code> para iniciar Docker Daemon.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Compruebe si ha iniciado Docker Desktop en modo <strong>administrador</strong>.</p>
<p>Asegúrese de que ha iniciado Docker Desktop en modo administrador. Para ello, haga clic con el botón derecho en <strong>Docker Desktop</strong> y seleccione <strong>Ejecutar como administrador</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>Iniciar Docker Desktop como administrador</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">¿Cómo puedo solucionar los problemas relacionados con WSL al desplegar Milvus?</h3><p>Si ha encontrado problemas relacionados con WSL mientras ejecuta Milvus desde WSL 2, puede que necesite comprobar si ha configurado Docker Desktop para utilizar el motor basado en WSL 2 de la siguiente manera.</p>
<ol>
<li><p>Asegúrese de que "Usar el motor basado en WSL 2" está marcado en <strong>Configuración</strong> &gt; <strong>General</strong>. </p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Utilizar el motor basado en WSL 2 en la configuración de Docker Desktop</span> </span></p></li>
<li><p>Seleccione de entre sus distribuciones WSL 2 instaladas aquella en la que desea habilitar la integración con Docker yendo a: <strong>Configuración</strong> &gt; <strong>Recursos</strong> &gt; <strong>Integración WSL</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>Seleccione las distribuciones WSL 2 en la configuración de Docker Desktop</span> </span>.</p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">¿Cómo puedo solucionar los errores relacionados con el volumen que aparecen durante el inicio de Milvus que lee <code translate="no">Read config failed</code>?</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Error de lectura de configuración en el arranque de Milvus</span> </span></p>
<p>Para solucionar el error que aparece durante el arranque de Milvus y que dice "Read config failed", debe comprobar si el volumen montado en el contenedor Milvus es correcto. Si el volumen está montado correctamente en el contenedor, puede utilizar el comando <code translate="no">docker exec</code> para entrar en el contenedor y listar la carpeta <strong>/milvus/configs</strong> como se indica a continuación.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>Listar los archivos de configuración de Milvus</span> </span></p>
<p></p>
