---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: >-
  Узнайте, как установить автономную версию Milvus с помощью Docker Desktop для
  Windows.
title: Запуск Milvus в Docker (Windows)
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
    </button></h1><blockquote>
<p>По умолчанию в этом развертывании в качестве очереди сообщений используется <strong>Woodpecker</strong> (локальная файловая система), поэтому внешний сервис очереди сообщений не требуется. См. раздел <a href="/docs/ru/woodpecker.md">«Woodpecker</a>».</p>
</blockquote>
<p>На этой странице показано, как запустить Milvus в Windows с помощью Docker Desktop с бэкэндом WSL 2 и контейнерами Linux.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">Установите Docker Desktop</a> и убедитесь, что ваша система соответствует требованиям к Windows и аппаратному обеспечению.</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">Установите подсистему Windows для Linux 2 (WSL 2)</a>.</li>
<li>Запустите Docker Desktop, включите параметр <strong>«Использовать движок на основе WSL 2</strong>» и выберите «Контейнеры Linux». Для команд, выполняемых внутри дистрибутива WSL, также включите этот дистрибутив в разделе <strong>«Настройки»</strong> &gt; <strong>«Ресурсы</strong> » &gt; <strong>«Интеграция с WSL</strong>». См. раз <a href="https://docs.docker.com/desktop/features/wsl/">дел «Бэкенд Docker Desktop WSL 2</a>».</li>
</ul>
<p>Перед загрузкой файлов Milvus выполните следующие проверки в PowerShell или командной строке Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Тип ОС Docker должен быть « <code translate="no">linux</code> ». В примерах Compose используется плагин « <code translate="no">docker compose</code> » (версии 2 или более поздней), а не устаревшая команда « <code translate="no">docker-compose</code> » версии 1.</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">Запуск Milvus в Docker<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Выберите один из следующих терминалов. Запустите команды в рабочем каталоге с правами на запись; скрипт сохраняет в нём файлы конфигурации и каталог <code translate="no">volumes</code>.</p>
<p>Скрипт загружается из ветки Milvus <code translate="no">master</code>. Тег образа Docker определён в скрипте и может отличаться от v3.0.5. Чтобы развернуть именно этот выпуск, используйте приведённую ниже конфигурацию Docker Compose с указанием версии.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Из PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Загрузите скрипт, а затем запустите Milvus:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>Для запуска скрипта из рабочего каталога в PowerShell требуется префикс <code translate="no">.\</code>.</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Из командной строки Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте команду « <code translate="no">curl.exe</code> » для загрузки скрипта; команда « <code translate="no">Invoke-WebRequest</code> » предназначена для PowerShell и не работает в командной строке:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>После выполнения любой из следующих последовательностей команд Windows:</p>
<ul>
<li>Контейнер Docker с именем <strong>milvus-standalone</strong> обслуживает порт <strong>19530</strong>.</li>
<li>Встроенный etcd работает в том же контейнере на порту <strong>2379</strong>. Его файл конфигурации соответствует файлу <strong>embedEtcd.yaml</strong> в рабочем каталоге.</li>
<li>Milvus хранит данные в папке <strong>volumes/milvus</strong> в рабочем каталоге.</li>
<li>Переопределения конфигурации должны находиться в <strong>файле user.yaml</strong> в рабочем каталоге. После их изменения перезапустите контейнер.</li>
</ul>
<p>Команда ` <code translate="no">start</code> ` выводит сообщение « <code translate="no">Wait for Milvus Starting...</code> », а затем выполняет проверку раз в секунду до тех пор, пока ` <code translate="no">docker ps</code> ` не сообщит, что контейнер находится в рабочем состоянии. Эта проверка не имеет ограничения по времени. Если команда не завершается, проверьте журналы контейнера из другого терминала с помощью команды ` <code translate="no">docker logs milvus-standalone</code>`. Скрипт запускает контейнер с параметром ` <code translate="no">--security-opt seccomp:unconfined</code>`, поэтому контейнер работает без профиля seccomp Docker по умолчанию.</p>
<div class="alert warning">
<blockquote>
<p>Скрипт открывает порты <strong>19530</strong>, <strong>9091</strong> и <strong>2379</strong> без указания адреса хоста, а <strong>файл embedEtcd.yaml</strong> настраивает etcd на прослушивание по адресу <code translate="no">http://0.0.0.0:2379</code>. По умолчанию Docker Desktop открывает доступ к таким портам на всех сетевых интерфейсах, поэтому другие машины, имеющие доступ к данному компьютеру, также могут подключаться к Milvus и etcd. Чтобы ограничить доступ к данному компьютеру, отредактируйте параметры <code translate="no">-p</code> в файле <code translate="no">standalone.bat</code> перед первым <code translate="no">start</code>, например, <code translate="no">-p 127.0.0.1:19530:19530</code>, и удалите <code translate="no">-p 2379:2379</code>, если вы не подключаетесь к etcd из-за пределов контейнера. Если контейнер <code translate="no">milvus-standalone</code> уже существует, команда <code translate="no">start</code> запустит его заново с исходными параметрами. Чтобы по умолчанию привязать опубликованные порты к localhost, см. раздел <a href="https://docs.docker.com/desktop/features/networking/">«Сеть в Docker Desktop</a>».</p>
</blockquote>
</div>
<p>Проверьте состояние образа и контейнера в любом терминале:</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>Чтобы остановить Milvus из PowerShell, выполните команду ` <code translate="no">.\standalone.bat stop</code>`; из командной строки выполните команду ` <code translate="no">standalone.bat stop</code>`. Выполните команду ` <code translate="no">stop</code> ` перед командой ` <code translate="no">delete</code>`: после подтверждения команда ` <code translate="no">delete</code> ` попытается удалить контейнер, а затем удалит папку <strong>`volumes`</strong>, <strong>файлы `embedEtcd.yaml</strong>` и <strong>`user.yaml`</strong>, даже если контейнер все еще работает и не был удален. Сделайте резервную копию данных перед использованием.</p>
<h3 id="From-WSL-2" class="common-anchor-header">Из WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Откройте установленный дистрибутив WSL из терминала Windows:</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>В терминале WSL загрузите скрипт для Linux и запустите Milvus один раз:</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы остановить Milvus, выполните команду ` <code translate="no">bash standalone_embed.sh stop</code>`. Команда ` <code translate="no">bash standalone_embed.sh delete</code> ` удаляет контейнер, конфигурацию и данные; перед использованием создайте резервную копию данных.</p>
<p>Скрипт для Linux запускает Docker с помощью команды ` <code translate="no">sudo</code>`, публикует его порты без указания адреса хоста и запускает контейнер с помощью команды ` <code translate="no">--security-opt seccomp:unconfined</code>`. Примечания по этим настройкам, приведенные в <a href="/docs/ru/install_standalone-docker.md">разделе «Запуск Milvus в Docker (Linux)</a> », также применимы при запуске в WSL 2.</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">Запуск Milvus с помощью Docker Compose<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте конфигурацию, прилагаемую к выпуску v3.0.5. Выполните только ту последовательность команд, которая соответствует вашему терминалу.</p>
<h3 id="From-PowerShell" class="common-anchor-header">Из PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>Загрузите конфигурацию и выведите её хеш SHA-256:</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yaml
Get-FileHash docker-compose.yaml -Algorithm SHA256
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">Из командной строки Windows<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>Загрузите конфигурацию и выведите её хеш SHA-256:</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yaml
certutil -hashfile docker-compose.yaml SHA256
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">Из WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>Откройте дистрибутив WSL, затем загрузите конфигурацию и выведите ее хеш SHA-256:</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml
<span class="hljs-built_in">sha256sum</span> docker-compose.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">Запустите Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Сравните хеш с дайджестом <code translate="no">sha256</code>, указанным для <code translate="no">milvus-standalone-docker-compose.yaml</code> на <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">странице выпуска версии 3.0.5</a>. Команда ` <code translate="no">Get-FileHash</code> ` выводит хеш заглавными буквами, а на странице выпуска он указан строчными, поэтому при сравнении не обращайте внимания на регистр. Затем запустите Milvus и проверьте контейнеры из того же терминала:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>Конфигурация запускает три долгоработающих контейнера: <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> и <strong>milvus-etcd</strong>. Она также запускает одноразовую службу <code translate="no">milvus-volume-init</code> для подготовки прав владения каталогом данных. Их данные сопоставляются с катало <strong>гами volumes/milvus</strong>, <strong>volumes/minio</strong> и <strong>volumes/etcd</strong> в рабочем каталоге. MinIO открывает порты <strong>9000</strong> и <strong>9001</strong>; Milvus — порты <strong>19530</strong> и <strong>9091</strong>. В конфигурации эти порты публикуются на всех сетевых интерфейсах, MinIO использует учетные данные по умолчанию <code translate="no">minioadmin</code>, а служба <code translate="no">standalone</code> устанавливает <code translate="no">security_opt: seccomp:unconfined</code>. Информацию об ограничении доступа, изменении учетных данных, а также о командах настройки и управления жизненным циклом см. в разделе <a href="/docs/ru/install_standalone-docker-compose.md">«Запуск Milvus с помощью Docker Compose</a>».</p>
<h2 id="FAQs" class="common-anchor-header">Часто задаваемые вопросы<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">Как устранить ошибку « <code translate="no">Docker Engine stopped</code> »?<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus использует контейнеры Linux. Перед повторной попыткой установки проверьте Docker Desktop и его бэкэнд WSL 2:</p>
<ol>
<li><p>Включите аппаратную виртуализацию в BIOS/UEFI, если <strong>в «Диспетчере задач»</strong> &gt; <strong>«Производительность»</strong> указано, что она отключена. Ознакомьтесь с <a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">требованиями Docker Desktop для Windows</a>.</p></li>
<li><p>Запустите Docker Desktop из меню «Пуск» Windows и дождитесь запуска его движка. Для установки или обновления WSL, а также для определённых режимов установки Docker Desktop могут потребоваться права администратора; они не являются общим требованием для запуска контейнеров Linux с бэкэндом WSL 2.</p></li>
<li><p>Проверьте WSL из терминала Windows. Если требуется обновление, выполните команду обновления с правами, запрашиваемыми Windows:</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>Включите параметр <strong>«Использовать движок на основе WSL 2»</strong> в Docker Desktop. Если в меню Docker доступен пункт <strong>«Переключиться на контейнеры Linux»</strong>, выберите его. Не переключайтесь на контейнеры Windows для устранения неполадок в образе Milvus Linux.</p></li>
<li><p>Выполните следующую проверку в терминале, который вы используете для установки:</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>Результат должен быть « <code translate="no">linux</code> ». Если подключение к демону не удается, следуйте <a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">инструкциям по устранению неполадок в Docker Desktop</a>, прежде чем повторно запускать скрипт Milvus. Сам по себе запуск команды « <code translate="no">com.docker.service</code> » не гарантирует, что движок WSL 2 Linux работает.</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">Как устранить проблемы, связанные с WSL, при развертывании Milvus?<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Если при запуске Milvus из WSL 2 у вас возникли проблемы, связанные с WSL, возможно, вам потребуется проверить, настроен ли Docker Desktop на использование движка на основе WSL 2, следующим образом:</p>
<ol>
<li><p>Убедитесь, что в разделе <strong>«Настройки»</strong> &gt; <strong>«Общие»</strong> установлен флажок «Использовать движок на основе WSL 2».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>Использование движка на основе WSL 2 в настройках Docker Desktop</span>
  
 </span></p></li>
<li><p>Выберите из установленных дистрибутивов WSL 2 те, для которых вы хотите включить интеграцию с Docker, перейдя в раздел: <strong>«Настройки»</strong> &gt; <strong>«Ресурсы</strong> » &gt; <strong>«Интеграция с WSL</strong>».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>Выбор дистрибутивов WSL 2 в настройках Docker Desktop</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">Как устранить ошибку, связанную с томом, возникающую при запуске Milvus с сообщением « <code translate="no">Read config failed</code> »?<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
   <span>Сообщение об ошибке «Read config failed» при запуске Milvus</span>
  
 </span></p>
<p>Чтобы устранить ошибку «Read config failed», возникающую при запуске Milvus, необходимо проверить, правильно ли смонтирован том в контейнере Milvus. Если том смонтирован в контейнере правильно, вы можете использовать команду <code translate="no">docker exec</code>, чтобы войти в контейнер и отобразить содержимое папки <strong>/milvus/configs</strong> следующим образом:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>Просмотр файлов конфигурации Milvus</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3 по умолчанию отключен. Включите его перед использованием функций, которые от него зависят. Требования и рекомендации по совместимости см. в разделе <a href="/docs/ru/storage-v3.md">«Storage V3</a>».</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Дальнейшие действия<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>После установки Milvus в Docker следуйте инструкциям раздела <strong>«Использование существующего сервера Milvus»</strong> в <a href="/docs/ru/quickstart.md">руководстве «Быстрый старт»</a> и подключите SDK к <code translate="no">http://localhost:19530</code>. Для этого пути к серверу не требуется Milvus Lite; локальный блок подключения <code translate="no">.db</code> запустит отдельную локальную базу данных вместо использования этого контейнера.</p>
<p>Вы также можете:</p>
<ul>
<li><p>Ознакомьтесь с <a href="/docs/ru/quickstart.md">разделом «Быстрый старт»</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Ознакомиться с основными операциями Milvus:</p>
<ul>
<li><a href="/docs/ru/manage_databases.md">Управление базами данных</a></li>
<li><a href="/docs/ru/manage-collections.md">Управление коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставка, обновление и удаление</a></li>
<li><a href="/docs/ru/single-vector-search.md">Поиск по одному вектору</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p>Для развертываний с использованием Compose следуйте инструкциям <a href="/docs/ru/upgrade_milvus_standalone-docker.md">по обновлению автономной версии Milvus с помощью Docker Compose</a>; перед обновлением проверьте работоспособность процедуры в вашей среде.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабируйте кластер Milvus</a> в Kubernetes. В этой процедуре используется Helm, и она не применима к данному развертыванию с помощью Docker.</p></li>
<li><p>Разверните кластер Milvus в облачных средах:</p>
<ul>
<li><a href="/docs/ru/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a> — интуитивно понятным веб-интерфейсом для мониторинга и управления Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/milvus_backup_overview.md">Milvus Backup</a> — инструментом с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/birdwatcher_overview.md">Birdwatcher</a> — инструментом с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Познакомьтесь с <a href="https://github.com/zilliztech/attu">Attu</a> — инструментом с графическим интерфейсом с открытым исходным кодом для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
