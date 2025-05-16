---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 'Узнайте, как установить кластер Milvus на Kubernetes.'
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
<li>Перед установкой<a href="/docs/ru/v2.4.x/prerequisite-gpu.md">проверьте требования к оборудованию и программному обеспечению</a>.</li>
</ul>
<div class="alert note">
<p>Если у вас возникнут проблемы с запуском образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a> и подробно расскажите о проблеме, и мы окажем вам необходимую поддержку.</p>
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
    </button></h2><p>Чтобы установить Milvus с поддержкой GPU с помощью Docker Compose, выполните следующие действия.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Загрузите и настройте YAML-файл</h3><p>Скачайте <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> и сохраните его как docker-compose.yml вручную или с помощью следующей команды.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>В YAML-файле необходимо внести некоторые изменения в переменные окружения автономной службы:</p>
<ul>
<li>Чтобы назначить конкретное GPU-устройство для Milvus, найдите поле <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> в определении сервиса <code translate="no">standalone</code> и замените его значение на ID нужного GPU. Для определения идентификатора GPU-устройства можно использовать инструмент <code translate="no">nvidia-smi</code>, входящий в состав драйверов дисплея NVIDIA GPU. Milvus поддерживает несколько устройств GPU.</li>
</ul>
<p>Назначьте Milvus одно устройство GPU:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Назначить несколько устройств GPU для Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Запустите Milvus</h3><p>В директории, содержащей файл docker-compose.yml, запустите Milvus, выполнив команду:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вам не удалось выполнить вышеуказанную команду, проверьте, установлен ли в вашей системе Docker Compose V1. Если это так, рекомендуем перейти на Docker Compose V2 в соответствии с примечаниями на <a href="https://docs.docker.com/compose/">этой странице</a>.</p>
</div>
<p>После запуска Milvus,</p>
<ul>
<li>Появились контейнеры с именами <strong>milvus-standalone</strong>, <strong>milvus-minio</strong> и <strong>milvus-etcd</strong>.<ul>
<li>Контейнер <strong>milvus-etcd</strong> не открывает никаких портов для хоста и сопоставляет свои данные с <strong>томами/etcd</strong> в текущей папке.</li>
<li>Контейнер <strong>milvus-minio</strong> обслуживает порты <strong>9090</strong> и <strong>9091</strong> локально, используя стандартные учетные данные аутентификации, и сопоставляет свои данные с <strong>томами/minio</strong> в текущей папке.</li>
<li>Контейнер <strong>milvus-standalone</strong> обслуживает порты <strong>19530</strong> локально с настройками по умолчанию и сопоставляет свои данные с <strong>томами/milvus</strong> в текущей папке.</li>
</ul></li>
</ul>
<p>Проверить работоспособность контейнеров можно с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Если вы назначили несколько GPU-устройств для Milvus в docker-compose.yml, вы можете указать, какое GPU-устройство является видимым или доступным для использования.</p>
<p>Сделайте GPU-устройство <code translate="no">0</code> видимым для Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Сделать GPU-устройства <code translate="no">0</code> и <code translate="no">1</code> видимыми для Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Остановить и удалить этот контейнер можно следующим образом.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>После запуска Milvus вы можете настроить пул памяти, изменив параметры <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> в файле <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>Файл <code translate="no">milvus.yaml</code> находится в каталоге <code translate="no">/milvus/configs/</code> внутри контейнера Milvus.</p>
</div>
<p>Чтобы настроить пул памяти, измените параметры <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> в файле <code translate="no">milvus.yaml</code> следующим образом.</p>
<ol>
<li><p>Используйте следующую команду, чтобы скопировать <code translate="no">milvus.yaml</code> из контейнера Milvus на локальную машину. Замените <code translate="no">&lt;milvus_container_id&gt;</code> на реальный идентификатор контейнера Milvus.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Откройте скопированный файл <code translate="no">milvus.yaml</code> в удобном для вас текстовом редакторе. Например, с помощью vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Отредактируйте настройки <code translate="no">initMemSize</code> и <code translate="no">maxMemSize</code> по мере необходимости и сохраните изменения:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Начальный размер пула памяти. По умолчанию 1024.</li>
<li><code translate="no">maxMemSize</code>: Максимальный размер пула памяти. По умолчанию 2048.</li>
</ul></li>
<li><p>Используйте следующую команду, чтобы скопировать измененный файл <code translate="no">milvus.yaml</code> обратно в контейнер Milvus. Замените <code translate="no">&lt;milvus_container_id&gt;</code> на реальный идентификатор контейнера Milvus.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Перезапустите контейнер Milvus, чтобы применить изменения:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p>Проверить <a href="/docs/ru/v2.4.x/quickstart.md">Quickstart</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Изучить основные операции Milvus:</p>
<ul>
<li><a href="/docs/ru/v2.4.x/manage_databases.md">Управлять базами данных</a></li>
<li><a href="/docs/ru/v2.4.x/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/v2.4.x/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/v2.4.x/insert-update-delete.md">Вставка, вставка и удаление</a></li>
<li><a href="/docs/ru/v2.4.x/single-vector-search.md">Одновекторный поиск</a></li>
<li><a href="/docs/ru/v2.4.x/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/v2.4.x/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/v2.4.x/scaleout.md">Масштабирование кластера Milvus</a>.</p></li>
<li><p>Развертывание кластера Milvu в облаках:</p>
<ul>
<li><a href="/docs/ru/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Изучите <a href="/docs/ru/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, инструмент с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, инструмент с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Изучите <a href="https://milvus.io/docs/attu.md">Attu</a>, инструмент с открытым исходным кодом GUI для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/v2.4.x/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
