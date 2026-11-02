---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: 'Узнайте, как установить автономную версию Milvus с помощью Docker Compose.'
title: Запуск Milvus с помощью Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Запуск Milvus с помощью Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице описано, как запустить экземпляр Milvus в Docker с помощью Docker Compose.</p>
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
<li>Установите <a href="https://docs.docker.com/compose/install/linux/">плагин Docker Compose</a> (версии 2 или более поздней) и проверьте его работу с помощью команды ` <code translate="no">docker compose version</code>`. В данной инструкции используется команда ` <code translate="no">docker compose</code>`, а не устаревшая команда версии 1 ` <code translate="no">docker-compose</code> `.</li>
<li>Перед установкой<a href="/docs/ru/prerequisite-docker.md">проверьте требования к аппаратному и программному обеспечению</a>.</li>
</ul>
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
    </button></h2><p>Milvus предоставляет файл конфигурации Docker Compose в репозитории Milvus. Загрузите конфигурацию для версии v3.0.3 и запустите новое развертывание:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.3/milvus-standalone-docker-compose.yaml -O docker-compose.yaml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Развертывание по умолчанию (v3.0.3):</strong> <code translate="no">docker compose up -d</code> запускает три контейнера длительного выполнения — <code translate="no">milvus-etcd</code> (метаданные), <code translate="no">milvus-minio</code> (объектное хранилище) и <code translate="no">milvus-standalone</code>. В качестве очереди сообщений используется <strong>Woodpecker (встроенный, с MinIO / объектным хранилищем в качестве бэкэнда WAL)</strong>, поэтому отдельный контейнер для очереди сообщений не требуется.</p>
<p>Конфигурация также запускает однократную службу <code translate="no">milvus-volume-init</code> для подготовки прав владения каталогом данных. После завершения этой задачи служба завершается.</p>
<p><strong>Очередь сообщений по умолчанию в зависимости от версии:</strong></p>
<ul>
<li><strong>2.5.x</strong> — по умолчанию используется <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x и более поздние версии</strong> — по умолчанию используется <strong>встроенная</strong> очередь сообщений <strong>Woodpecker</strong>.</li>
</ul>
<p>Используйте конфигурацию, прилагаемую к версии, которую вы собираетесь установить. Для существующего развертывания следуйте инструкциям по обновлению вместо замены его конфигурации файлом для новой установки.</p>
<ul>
<li><p>Если <code translate="no">docker compose</code> недоступен, установите плагин Compose, следуя <a href="https://docs.docker.com/compose/install/linux/">инструкциям</a> для <a href="https://docs.docker.com/compose/install/linux/">Docker</a>.</p></li>
<li><p>Если у вас возникнут проблемы с загрузкой образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a>, указав подробности проблемы, и мы предоставим вам необходимую поддержку.</p></li>
</ul>
</div>
<p>После запуска Milvus</p>
<ul>
<li>запустятся контейнеры с именами <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> и <strong>milvus-etcd</strong>.
<ul>
<li>Контейнер <strong>milvus-etcd</strong> не открывает никаких портов для хоста и сопоставляет свои данные с <strong>папкой volumes/etcd</strong> в текущем каталоге.</li>
<li>Контейнер <strong>milvus-minio</strong> обслуживает локальные порты <strong>9000</strong> и <strong>9001</strong> с учетными данными аутентификации по умолчанию и сопоставляет свои данные с <strong>папкой volumes/minio</strong> в текущем каталоге.</li>
<li>Контейнер <strong>milvus-standalone</strong> обслуживает локально порты <strong>19530</strong> с настройками по умолчанию и сопоставляет свои данные с <strong>каталогом volumes/milvus</strong> в текущей папке.</li>
</ul></li>
</ul>
<p>Вы можете проверить, запущены ли контейнеры, с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Вы также можете перейти в веб-интерфейс Milvus по адресу <code translate="no">http://127.0.0.1:9091/webui/</code>, чтобы узнать больше о вашем экземпляре Milvus. Подробности см. в разделе <a href="/docs/ru/milvus-webui.md">«Веб-интерфейс Milvus</a>».</p>
<p>Чтобы опробовать работающий сервер, следуйте инструкциям раздела <strong>«Использование существующего сервера Milvus»</strong> в <a href="/docs/ru/quickstart.md">руководстве «Быстрый старт»</a> и подключитесь к <code translate="no">http://localhost:19530</code>. Не используйте блок локального подключения « <code translate="no">.db</code> », который запускает отдельную базу данных Milvus Lite.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Необязательно) Обновление конфигурации Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы обновить конфигурацию Milvus в соответствии с вашими потребностями, необходимо изменить файл <code translate="no">/milvus/configs/user.yaml</code> в контейнере <code translate="no">milvus-standalone</code>.</p>
<ol>
<li><p>Получите доступ к контейнеру <code translate="no">milvus-standalone</code>.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Добавьте дополнительные настройки, чтобы переопределить настройки по умолчанию.
Ниже предполагается, что вам необходимо переопределить файл <code translate="no">proxy.healthCheckTimeout</code> по умолчанию. Информацию о соответствующих элементах конфигурации см. в разделе <a href="/docs/ru/system_configuration.md">«Конфигурация системы</a>».</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Перезапустите контейнер <code translate="no">milvus-standalone</code>, чтобы применить изменения.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Остановка и удаление Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете остановить и удалить этот контейнер следующим образом</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-an-existing-deployment" class="common-anchor-header">Обновление существующего развертывания<button data-href="#Upgrade-an-existing-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Для автономного развертывания Milvus 2.6.x следуйте инструкциям в разделе <a href="/docs/ru/upgrade_milvus_standalone-docker.md">«Обновление автономной версии Milvus с помощью Docker Compose</a>». Сделайте резервную копию метаданных и постоянных данных, сохраните существующие зависимости и конфигурацию, а также проверьте описанный в документации путь обновления от исходной версии к целевой, прежде чем изменять образ Milvus. Не заменяйте файл Compose старого развертывания конфигурацией для новой установки, приведённой выше.</p>
<p><strong>Ограничения</strong>, связанные с<strong>очередью сообщений</strong>: при обновлении до Milvus v3.0.3 необходимо сохранить текущий выбор системы очереди сообщений. Переключение между различными системами очередей сообщений во время обновления не поддерживается. Поддержка смены систем очередей сообщений будет доступна в будущих версиях.</p>
<p>В Milvus 2.6.x и более поздних версиях по умолчанию используется Woodpecker, а в развертываниях версии 2.5.x — <strong>RocksMQ</strong>. Если развертывание, которое вы обновляете, по-прежнему использует RocksMQ, зафиксируйте его в файле ` <code translate="no">user.yaml</code> ` перед изменением образа Milvus, чтобы обновлённый экземпляр сохранил существующую очередь сообщений вместо запуска с новым значением по умолчанию:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>После того как обновленный экземпляр начнёт работать на версии 3.0.3, вы сможете перейти с RocksMQ на Woodpecker с помощью <a href="/docs/ru/switch-mq-type.md">функции «Switch Message Queue»</a>, доступной в Milvus 3.0 и более поздних версиях.</p>
<h2 id="Optional-dependencies" class="common-anchor-header">Дополнительные зависимости<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>В данном развертывании для обмена сообщениями используется <strong>Woodpecker</strong> (встроенный, бэкэнд MinIO WAL), для метаданных — <strong>etcd</strong>, а для объектного хранилища — <strong>MinIO</strong>. Чтобы использовать другую очередь сообщений или подключить внешнее объектное хранилище/метаданные, см.:</p>
<ul>
<li>Очередь сообщений: <a href="/docs/ru/woodpecker.md">Woodpecker</a> (по умолчанию) · <a href="/docs/ru/mq_pulsar.md">Pulsar</a> · <a href="/docs/ru/mq_kafka.md">Kafka</a> · <a href="/docs/ru/mq_rocksmq.md">RocksMQ</a></li>
<li>Объектное хранилище: <a href="/docs/ru/deploy_s3.md">MinIO</a> (по умолчанию) · <a href="/docs/ru/deploy_s3.md">AWS S3</a> · <a href="/docs/ru/abs.md">Azure Blob</a> · <a href="/docs/ru/gcs.md">GCP Cloud Storage</a> · <a href="/docs/ru/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/ru/deploy_s3.md">Tencent COS</a> · <a href="/docs/ru/deploy_s3.md">Huawei OBS</a> · <a href="/docs/ru/deploy_s3.md">S3-совместимые</a></li>
<li>Метаданные: <a href="/docs/ru/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 по умолчанию отключен. Включите его перед использованием функций, которые от него зависят. Требования и соображения по совместимости см. в разделе <a href="/docs/ru/storage-v3.md">Storage V3</a>.</p>
</div>
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
<li><p><a href="/docs/ru/upgrade_milvus_standalone-docker.md">Обновление автономной версии Milvus с помощью Docker Compose</a>.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабируйте свой кластер Milvus</a>.</p></li>
<li><p>Разверните кластер Milvus в облаке:</p>
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
