---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: Learn how to install Milvus standalone with Docker Desktop for Windows.
title: Run Milvus in Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Run Milvus in Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>This page demonstrates how to run Milvus on Windows using Docker Desktop for Windows.​</p>
<h2 id="Prerequisites​" class="common-anchor-header">Prerequisites​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Install Docker Desktop</a>.​</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Install Windows Subsystem for Linux 2 (WSL 2)</a>.​</p></li>
<li><p>Install Python 3.8+.​</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Run Milvus in Docker​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides an installation script to install it as a Docker container. Once you have installed Docker Desktop on Microsoft Windows, you can access the Docker CLI from PowerShell or Windows Command Prompt in <strong>administrator</strong> mode and from WSL 2. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">From PowerShell or Windows Command Prompt​</h3><p>If you are more familiar with PowerShell or Windows Command Prompt, the command prompt is as follows.​</p>
<ol>
<li><p>Open Docker Desktop in administrator mode by right-clicking and selecting <strong>Run as administrator</strong>.​</p></li>
<li><p>Download the installation script and save it as <code translate="no">standalone.bat</code>.​</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Run the downloaded script to start Milvus as a Docker container.​</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>After running the installation script:​</p>
<ul>
<li><p>A docker container named <strong>milvus-standalone</strong> has been started at port <strong>19530</strong>.​</p></li>
<li><p>An embed etcd is installed along with Milvus in the same container and serves at port <strong>2379</strong>. Its configuration file is mapped to <strong>embedEtcd.yaml</strong> in the current folder.​</p></li>
<li><p>The Milvus data volume is mapped to <strong>volumes/milvus</strong> in the current folder.​</p></li>
</ul>
<p>You can use the following commands to manage the Milvus container and stored data.​</p>
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
<h3 id="From-WSL-2​" class="common-anchor-header">From WSL 2​</h3><p>If you prefer to start Milvus using Linux commands and shell scripts on Windows, ensure that you already have installed the WSL 2 command. For details on how to install WSL 2 command, you can refer to this <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Microsoft article</a>.​</p>
<ol>
<li><p>Start WSL 2.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Download the installation script​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Start Milvus as a docker container.​</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>You can use the following commands to manage the Milvus container and stored data.​</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Run Milvus with Docker Compose​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have installed Docker Desktop on Microsoft Windows, you can access the Docker CLI from the PowerShell or Windows Command Prompt in <strong>administrator</strong> mode. You can run Docker Compose either in PowerShell, Windows Command Prompt, or WSL 2 to start Milvus.​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">From PowerShell or Windows Command Prompt​</h3><ol>
<li><p>Open Docker Desktop in administrator mode by right-clicking and selecting <strong>Run as administrator</strong>.​</p></li>
<li><p>Run the following commands in PowerShell or Windows Command Prompt to download the Docker Compose configuration file for Milvus Standalone and start Milvus.​</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Depending on your network connection, downloading images for the Milvus installation may take a while. Once the containers named <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, and <strong>milvus-etcd</strong> are up, you can witness that ​</p>
<ul>
<li><p>The <strong>milvus-etcd</strong> container does not expose any ports to the host and maps its data to <strong>volumes/etcd</strong> in the current folder.​</p></li>
<li><p>The <strong>milvus-minio</strong> container serves ports <strong>9090</strong> and <strong>9091</strong> locally with the default authentication credentials and maps its data to <strong>volumes/minio</strong> in the current folder.​</p></li>
<li><p>The <strong>milvus-standalone</strong> container serves ports <strong>19530</strong> locally with the default settings and maps its data to <strong>volumes/milvus</strong> in the current folder.​</p></li>
</ul></li>
</ol>
<p>You can also call the Linux version of the Docker Compose commands if you have WSL 2 installed.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">From WSL 2​</h3><p>The procedure is similar to using Docker Compose to install Milvus in Linux systems.​</p>
<ol>
<li><p>Start WSL 2.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Download the Milvus configuration file.​</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Start Milvus.​</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">FAQs​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">How can I deal with the <code translate="no">Docker Engine stopped</code> error?​</h3><p>Once you install Docker Desktop in Windows, you may encounter the <code translate="no">Docker Engine stopped</code> error if your computer are not configured properly. In this case, you may need to make the following checks:​</p>
<ol>
<li><p>Check whether virtualization is enabled.​</p>
<p>You can check whether virtualization is enabled by looking at the <strong>Performance</strong> tab in the <strong>Task Manager</strong>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
    <span>Virtualization in Task Manager</span>
  </span>
</p>
<p>If virtualization is disabled, you may need to check the BIOS settings of your motherboard firmware. The way to enable virtualization in BIOS settings varies with motherboard vendors. For the ASUS motherboard, for example, you can refer to <a href="https://www.asus.com/support/faq/1043786/">this article</a> on enabling virtualization.​</p>
<p>Then, you need to restart your computer and enable Hyper-V. For details, refer to this <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">Microsoft article</a>.​</p></li>
<li><p>Check whether the Docker Desktop Service has been started.​</p>
<p>You can run the following command to start the Docker Desktop Service.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check whether WSL has been installed properly.​</p>
<p>You can run the following command to install or update the WSL 2 command.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check whether Docker Daemon has been started.​</p>
<p>You need to go to the installation directory of Docker Desktop and run <code translate="no">.\DockerCli.exe -SwitchDaemon</code> to start Docker Daemon.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check whether you have started Docker Desktop in <strong>administrator</strong> mode.​</p>
<p>Ensure that you have started Docker Desktop in administrator mode. To do so, right-click on <strong>Docker Desktop</strong> and choose <strong>Run as administrator</strong>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
    <span>Start Docker Desktop as Administrator</span>
  </span>
</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">How can I deal with WSL-related issues while deploying Milvus?​</h3><p>If you have encountered WSL-related issues while running Milvus from WSL 2, you may need to check whether you have configured Docker Desktop to use the WSL 2-based engine as follows:​</p>
<ol>
<li><p>Ensure that “Use the WSL 2 based engine” is checked in <strong>Settings</strong> &gt; <strong>General</strong>. ​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
    <span>Use the WSL 2 based engine in Docker Desktop Settings</span>
  </span>
</p></li>
<li><p>Select from your installed WSL 2 distributions which you want to enable Docker integration on by going to: <strong>Settings</strong> &gt; <strong>Resources</strong> &gt; <strong>WSL Integration</strong>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
    <span>Select WSL 2 distributions in Docker Desktop Settings</span>
  </span>
</p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">How can I deal with the volume-related errors prompted during Milvus startup that reads <code translate="no">Read config failed</code>?​</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
    <span>Read config failed error prompt in Milvus startup</span>
  </span>
</p>
<p>To deal with the error prompted during Milvus startup that reads “Read config failed,” you need to check whether the volume mounted into the Milvus container is correct. If the volume is correctly mounted into the container, you can use the <code translate="no">docker exec</code> command to go into the container and list the <strong>/milvus/configs</strong> folder as follows:​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
    <span>List Milvus config files</span>
  </span>
</p>
<p>​</p>
