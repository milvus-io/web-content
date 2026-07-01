---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Узнайте, как установить автономную версию Milvus с помощью Docker Desktop для
  Windows.
title: Запуск Milvus в Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">Запуск Milvus в Docker (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить Milvus в Windows с помощью Docker Desktop для Windows.​</p>
<h2 id="Prerequisites​" class="common-anchor-header">Необходимые условия​<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Установите Docker Desktop</a>.</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Установите Windows Subsystem for Linux 2 (WSL 2)</a>.​</p></li>
<li><p>Установите Python 3.8 или более позднюю версию.</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">Запуск Milvus в Docker​<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет скрипт установки для развертывания в виде контейнера Docker. После установки Docker Desktop в Microsoft Windows вы можете получить доступ к командной строке Docker из PowerShell или командной строки Windows в режиме <strong>администратора</strong>, а также из WSL 2. ​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Из PowerShell или командной строки Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы лучше знакомы с PowerShell или командной строкой Windows, выполните следующие команды.​</p>
<ol>
<li><p>Откройте Docker Desktop в режиме администратора, щелкнув правой кнопкой мыши и выбрав <strong>«Запуск от имени администратора</strong>».​</p></li>
<li><p>Скачайте скрипт установки и сохраните его как « <code translate="no">standalone.bat</code> ».​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>Запустите загруженный скрипт, чтобы запустить Milvus в виде контейнера Docker.​</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>После запуска скрипта установки:​</p>
<ul>
<li><p>Запущен контейнер Docker с именем <strong>milvus-standalone</strong> на порту <strong>19530</strong>.​</p></li>
<li><p>Вместе с Milvus в том же контейнере установлен встроенный etcd, работающий на порту <strong>2379</strong>. Его файл конфигурации сопоставлен файлу <strong>embedEtcd.yaml</strong> в текущей папке.​</p></li>
<li><p>Том данных Milvus сопоставлен папке <strong>volumes/milvus</strong> в текущей папке.​</p></li>
</ul>
<p>Для управления контейнером Milvus и хранящимися данными можно использовать следующие команды.​</p>
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
<h3 id="From-WSL-2​" class="common-anchor-header">Из WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Если вы предпочитаете запускать Milvus с помощью команд Linux и скриптов оболочки в Windows, убедитесь, что у вас уже установлен WSL 2. Подробную информацию об установке WSL 2 можно найти в этой <a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">статье Microsoft</a>.​</p>
<ol>
<li><p>Запустите WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Загрузите скрипт установки​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Запустите Milvus в качестве контейнера Docker.</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>Для управления контейнером Milvus и хранящимися данными можно использовать следующие команды.​</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">Запустите Milvus с помощью Docker Compose​<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>После установки Docker Desktop в Microsoft Windows вы можете получить доступ к командной строке Docker (CLI) из PowerShell или командной строки Windows в режиме <strong>администратора</strong>. Для запуска Milvus вы можете запустить Docker Compose в PowerShell, командной строке Windows или WSL 2​</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">Из PowerShell или командной строки Windows​<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
<li><p>Откройте Docker Desktop в режиме администратора, щелкнув правой кнопкой мыши и выбрав <strong>«Запуск от имени администратора</strong>».​</p></li>
<li><p>Выполните следующие команды в PowerShell или командной строке Windows, чтобы загрузить файл конфигурации Docker Compose для Milvus Standalone и запустить Milvus.</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>В зависимости от вашего сетевого соединения загрузка образов для установки Milvus может занять некоторое время. Как только контейнеры с именами <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> и <strong>milvus-etcd</strong> будут запущены, вы увидите, что ​</p>
<ul>
<li><p>контейнер <strong>milvus-etcd</strong> не открывает никаких портов для хоста и сопоставляет свои данные с <strong>папкой volumes/etcd</strong> в текущем каталоге.</p></li>
<li><p>Контейнер <strong>milvus-minio</strong> обслуживает локальные порты <strong>9090</strong> и <strong>9091</strong> с учетными данными аутентификации по умолчанию и сопоставляет свои данные с <strong>папкой volumes/minio</strong> в текущем каталоге.​</p></li>
<li><p>Контейнер <strong>milvus-standalone</strong> обслуживает порты <strong>19530</strong> локально с настройками по умолчанию и сопоставляет свои данные с <strong>папкой volumes/milvus</strong> в текущем каталоге.​</p></li>
</ul></li>
</ol>
<p>Вы также можете использовать команды Docker Compose для Linux, если у вас установлен WSL 2.​</p>
<h3 id="From-WSL-2​" class="common-anchor-header">Из WSL 2​<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>Процедура аналогична установке Milvus в системах Linux с помощью Docker Compose.​</p>
<ol>
<li><p>Запустите WSL 2.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>Загрузите файл конфигурации Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Запустите Milvus.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">Часто задаваемые вопросы​<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">Как устранить ошибку « <code translate="no">Docker Engine stopped</code> »?​<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>После установки Docker Desktop в Windows может возникнуть ошибка « <code translate="no">Docker Engine stopped</code> », если ваш компьютер настроен неправильно. В этом случае необходимо выполнить следующие проверки:​</p>
<ol>
<li><p>Проверьте, включена ли виртуализация.​</p>
<p>Проверить, включена ли виртуализация, можно на вкладке <strong>«Производительность»</strong> в <strong>диспетчере задач</strong>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" /> 
   <span>Виртуализация в «Диспетчере задач»</span>
  
 </span></p>
<p>Если виртуализация отключена, вам, возможно, потребуется проверить настройки BIOS прошивки вашей материнской платы. Способ включения виртуализации в настройках BIOS зависит от производителя материнской платы. Например, для материнских плат ASUS вы можете воспользоваться <a href="https://www.asus.com/support/faq/1043786/">этой статьёй</a> о включении виртуализации.​</p>
<p>Затем необходимо перезагрузить компьютер и включить Hyper-V. Подробности см. в этой <a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">статье Microsoft</a>.​</p></li>
<li><p>Проверьте, запущена ли служба Docker Desktop.</p>
<p>Для запуска службы Docker Desktop можно выполнить следующую команду.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>Проверьте, правильно ли установлена среда WSL.</p>
<p>Для установки или обновления WSL 2 выполните следующую команду.</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>Убедитесь, что Docker Daemon запущен.</p>
<p>Для запуска демона Docker необходимо перейти в каталог установки Docker Desktop и выполнить команду « <code translate="no">.\DockerCli.exe -SwitchDaemon</code> ».</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>Убедитесь, что Docker Desktop запущен в режиме <strong>администратора</strong>.</p>
<p>Убедитесь, что Docker Desktop запущен в режиме администратора. Для этого щелкните правой кнопкой мыши по <strong>Docker Desktop</strong> и выберите <strong>«Запуск от имени администратора</strong>».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" /> 
   <span>Запустите Docker Desktop от имени администратора</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">Как устранить проблемы, связанные с WSL, при развертывании Milvus?​<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>Если при запуске Milvus из WSL 2 у вас возникли проблемы, связанные с WSL, возможно, вам необходимо проверить, настроен ли Docker Desktop на использование движка на основе WSL 2, следующим образом:​</p>
<ol>
<li><p>Убедитесь, что в разделе <strong>«Настройки»</strong> &gt; <strong>«Общие»</strong> установлен флажок «Использовать движок на основе WSL 2».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Использование движка на основе WSL 2 в настройках Docker Desktop</span>
  
 </span></p></li>
<li><p>Выберите из установленных дистрибутивов WSL 2 те, для которых вы хотите включить интеграцию с Docker, перейдя в раздел: <strong>«Настройки»</strong> &gt; <strong>«Ресурсы»</strong> &gt; <strong>«Интеграция с WSL</strong>».​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Выбор дистрибутивов WSL 2 в настройках Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">Как устранить ошибку, связанную с томом, возникающую при запуске Milvus: « <code translate="no">Read config failed</code> »?​<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
   <span>Сообщение об ошибке «Read config failed» при запуске Milvus</span>
  
 </span></p>
<p>Чтобы устранить ошибку «Read config failed», возникающую при запуске Milvus, необходимо проверить, правильно ли смонтирован том в контейнере Milvus. Если том правильно смонтирован в контейнере, вы можете использовать команду <code translate="no">docker exec</code>, чтобы войти в контейнер и отобразить содержимое папки <strong>/milvus/configs</strong> следующим образом:​</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Отображение списка файлов конфигурации Milvus</span>
  
 </span></p>
<p>​</p>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Установив Milvus в Docker, вы можете:</p>
<ul>
<li><p>Ознакомиться <a href="/docs/ru/v2.6.x/quickstart.md">с руководством по быстрому запуску</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Ознакомиться с основными операциями Milvus:</p>
<ul>
<li><a href="/docs/ru/v2.6.x/manage_databases.md">Управление базами данных</a></li>
<li><a href="/docs/ru/v2.6.x/manage-collections.md">Управление коллекциями</a></li>
<li><a href="/docs/ru/v2.6.x/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/v2.6.x/insert-update-delete.md">Вставка, обновление и удаление</a></li>
<li><a href="/docs/ru/v2.6.x/single-vector-search.md">Поиск по одному вектору</a></li>
<li><a href="/docs/ru/v2.6.x/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/v2.6.x/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/v2.6.x/scaleout.md">Масштабируйте свой кластер Milvus</a>.</p></li>
<li><p>Разверните кластер Milvus в облаке:</p>
<ul>
<li><a href="/docs/ru/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/v2.6.x/milvus-webui.md">Milvus WebUI</a> — интуитивно понятным веб-интерфейсом для мониторинга и управления Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/v2.6.x/milvus_backup_overview.md">Milvus Backup</a> — инструментом с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Познакомьтесь с <a href="/docs/ru/v2.6.x/birdwatcher_overview.md">Birdwatcher</a> — инструментом с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Познакомьтесь с <a href="https://github.com/zilliztech/attu">Attu</a> — инструментом с графическим интерфейсом с открытым исходным кодом для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/v2.6.x/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
