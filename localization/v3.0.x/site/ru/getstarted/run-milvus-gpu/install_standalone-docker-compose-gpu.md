---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Узнайте, как установить автономную версию Milvus с поддержкой графического
  процессора с помощью Docker Compose.
title: Запуск Milvus с поддержкой GPU с помощью Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Запуск Milvus с поддержкой GPU с помощью Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить экземпляр Milvus с поддержкой GPU с помощью Docker Compose.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">Установите Docker</a>.</li>
<li>Перед установкой<a href="/docs/ru/prerequisite-gpu.md">проверьте требования к аппаратному и программному обеспечению</a>.</li>
</ul>
<div class="alert note">
<p>Если у вас возникнут проблемы с загрузкой образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a>, указав подробности проблемы, и мы предоставим вам необходимую поддержку.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Установка Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы установить Milvus с поддержкой GPU с помощью Docker Compose, выполните следующие шаги.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Загрузите и настройте файл YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Скачайте <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> и сохраните его как docker-compose.yml вручную или с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Чтобы проверить загрузку, сравните вывод следующей команды с дайджестом <code translate="no">sha256</code>, указанным для <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> на <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">странице выпуска</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете изменить устройства GPU, назначенные Milvus, в разделе « <code translate="no">deploy</code> » службы « <code translate="no">standalone</code> » в файле YAML следующим образом:</p>
<ul>
<li>Чтобы назначить Milvus конкретное устройство GPU, найдите поле « <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> » в определении службы « <code translate="no">standalone</code> » и замените его значение на ID нужного GPU. Для определения ID устройства GPU можно использовать инструмент « <code translate="no">nvidia-smi</code> », входящий в состав драйверов отображения NVIDIA GPU. Milvus поддерживает несколько устройств GPU.</li>
</ul>
<p>Назначение одного графического процессора для Milvus:</p>
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
<p>Назначение нескольких графических процессоров для Milvus:</p>
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
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Запустите Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>В каталоге, содержащем файл docker-compose.yml, запустите Milvus, выполнив следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если выполнение вышеуказанной команды не удалось, проверьте, установлен ли в вашей системе Docker Compose V1. В этом случае рекомендуется перейти на Docker Compose V2 в соответствии с примечаниями на <a href="https://docs.docker.com/compose/">этой странице</a>.</p>
</div>
<p>После запуска Milvus</p>
<ul>
<li>контейнеры с именами <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> и <strong>milvus-etcd</strong> будут запущены.
<ul>
<li>Контейнер <strong>milvus-etcd</strong> не открывает никаких портов для хоста и сопоставляет свои данные с <strong>папкой volumes/etcd</strong> в текущем каталоге.</li>
<li>Контейнер <strong>milvus-minio</strong> обслуживает порты <strong>9000</strong> и <strong>9001</strong> с учетными данными аутентификации по умолчанию и сопоставляет свои данные с <strong>папкой volumes/minio</strong> в текущем каталоге.</li>
<li>Контейнер <strong>milvus-standalone</strong> обслуживает порты <strong>19530</strong> и <strong>9091</strong> с настройками по умолчанию и сопоставляет свои данные с <strong>папкой volumes/milvus</strong> в текущем каталоге.</li>
</ul></li>
</ul>
<p>Служба « <code translate="no">standalone</code> » устанавливает значение <code translate="no">security_opt: seccomp:unconfined</code>, благодаря чему контейнер Milvus работает без профиля seccomp Docker по умолчанию.</p>
<div class="alert warning">
<blockquote>
<p>Файл Compose публикует эти порты без указания IP-адреса хоста, поэтому Docker привязывает их ко всем сетевым интерфейсам хоста, и другие машины, имеющие доступ к этому хосту, могут подключаться к Milvus и MinIO. MinIO использует ключ доступа и секретный ключ <code translate="no">minioadmin</code>, которые заданы в файле Compose. Чтобы открыть порты только на адресе loopback, добавьте <code translate="no">127.0.0.1:</code> в строки <code translate="no">ports</code> для сервисов <code translate="no">minio</code> и <code translate="no">standalone</code> в файле <code translate="no">docker-compose.yml</code>, например <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, и запустите <code translate="no">sudo docker compose up -d</code> заново. Подробности см. в разделе <a href="https://docs.docker.com/engine/network/port-publishing/">«Публикация и сопоставление портов</a>». Чтобы использовать другие учетные данные MinIO, измените значения <code translate="no">MINIO_ACCESS_KEY</code> и <code translate="no">MINIO_SECRET_KEY</code> службы <code translate="no">minio</code> и установите те же значения в <code translate="no">minio.accessKeyID</code> и <code translate="no">minio.secretAccessKey</code> конфигурации Milvus. Чтобы для подключения клиентов к Milvus требовались имя пользователя и пароль, см. раздел <a href="/docs/ru/authenticate.md">«Аутентификация доступа пользователей</a>».</p>
</blockquote>
</div>
<p>Вы можете проверить, запущены ли контейнеры, с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>По умолчанию эта команда выводит список только запущенных контейнеров. Убедитесь, что в выводе указаны контейнеры <strong>milvus-etcd</strong>, <strong>milvus-minio</strong> и <strong>milvus-standalone</strong>, а столбец « <code translate="no">STATUS</code> » для каждого из них начинается со значения <code translate="no">Up</code>.</p>
<p>Вы также можете перейти в веб-интерфейс Milvus по адресу <code translate="no">http://127.0.0.1:9091/webui/</code>, чтобы узнать больше о вашем экземпляре Milvus. Подробности см. в разделе <a href="/docs/ru/milvus-webui.md">«Веб-интерфейс Milvus</a>».</p>
<p>Чтобы изменить устройства GPU, используемые Milvus после его запуска, отредактируйте поле « <code translate="no">device_ids</code> » в разделе « <code translate="no">deploy.resources.reservations.devices</code> » службы « <code translate="no">standalone</code> » в файле docker-compose.yml, как показано в шаге 1, а затем выполните следующую команду. Поскольку конфигурация службы изменилась, команда « <code translate="no">docker compose up</code> » остановит и заново создаст контейнер <strong>milvus-standalone</strong>. Подробнее см. в разделе <a href="https://docs.docker.com/compose/how-tos/gpu-support/">«Запуск служб Docker Compose с доступом к GPU</a>».</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете остановить и удалить этот контейнер следующим образом.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Настройка пула памяти<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>После запуска Milvus вы можете настроить пул памяти, изменив параметры <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> в разделе <code translate="no">gpu</code> конфигурации Milvus.</p>
<div class="alert note">
<p>Файл ` <code translate="no">milvus.yaml</code> ` находится в каталоге ` <code translate="no">/milvus/configs/</code> ` внутри контейнера Milvus. Настройки в файле ` <code translate="no">user.yaml</code> `, расположенном в том же каталоге, переопределяют значения в файле ` <code translate="no">milvus.yaml</code>`.</p>
</div>
<p>Чтобы сохранить настройки при повторном создании контейнера, сохраните их в файле <code translate="no">user.yaml</code> на хосте и смонтируйте этот файл в контейнер следующим образом.</p>
<ol>
<li><p>В каталоге, содержащем файл docker-compose.yml, создайте файл с именем <code translate="no">user.yaml</code>, содержащий настройки, которые вы хотите изменить. В следующем примере показан раздел <code translate="no">gpu</code> с его значениями по умолчанию. Замените их на нужные вам размеры:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Начальный размер пула памяти, в МБ. По умолчанию — 2048.</li>
<li><code translate="no">maxMemSize</code>: Максимальный размер пула памяти, в МБ. По умолчанию — 4096.</li>
</ul></li>
<li><p>В файле docker-compose.yml добавьте файл <code translate="no">user.yaml</code> в список <code translate="no">volumes</code> службы <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Пересоздайте контейнер Milvus, чтобы применить изменения:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>После монтирования файла перезапустите службу ` <code translate="no">standalone</code> `, чтобы применить последующие изменения к ` <code translate="no">user.yaml</code>`:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Установив Milvus в Docker, вы можете:</p>
<ul>
<li><p>Ознакомьтесь с <a href="/docs/ru/quickstart.md">разделом «Быстрый старт»</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Ознакомьтесь с <a href="/docs/ru/milvus-webui.md">веб-интерфейсом Milvus</a>, чтобы узнать больше об экземпляре Milvus.</p></li>
<li><p>Ознакомьтесь с основными операциями Milvus:</p>
<ul>
<li><a href="/docs/ru/manage_databases.md">Управление базами данных</a></li>
<li><a href="/docs/ru/manage-collections.md">Управление коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставка, обновление и удаление</a></li>
<li><a href="/docs/ru/single-vector-search.md">Поиск по одному вектору</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/upgrade_milvus_standalone-docker.md">Обновите автономную версию Milvus с помощью Docker Compose</a>. На этой странице отображается тег образа для ЦП. Для данного развертывания на GPU сохраните суффикс « <code translate="no">-gpu</code> » (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) и оставьте настройки « <code translate="no">deploy</code> » и « <code translate="no">user.yaml</code> » без изменений.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабируйте кластер Milvus</a> в Kubernetes. В этой процедуре используется Helm, и она не применима к данному развертыванию с использованием Docker.</p></li>
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
