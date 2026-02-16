---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 'Узнайте, как установить Milvus в автономном режиме с помощью Docker.'
title: Запуск Milvus в Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Запуск Milvus в Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице показано, как запустить экземпляр Milvus в Docker.</p>
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
<li>Перед установкой<a href="/docs/ru/prerequisite-docker.md">ознакомьтесь с требованиями к аппаратному и программному обеспечению</a>.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Установка Milvus в Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus предоставляет сценарий установки для установки в качестве контейнера docker. Сценарий доступен в <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">репозитории Milvus</a>. Чтобы установить Milvus в Docker, просто выполните команду</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Что нового в версии 2.6.11:</strong></p>
<ul>
<li><strong>Streaming Node</strong>: Расширенные возможности обработки данных</li>
<li><strong>Woodpecker MQ</strong>: улучшенная очередь сообщений с уменьшенными затратами на обслуживание, подробнее см. в разделе <a href="/docs/ru/use-woodpecker.md">"Использование Woodpecker"</a>.</li>
<li><strong>Оптимизированная архитектура</strong>: Консолидированные компоненты для повышения производительности</li>
</ul>
<p>Всегда загружайте последнюю версию сценария, чтобы убедиться, что вы получили самые последние конфигурации и улучшения архитектуры.</p>
<p>Если вы хотите использовать <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> в режиме автономного развертывания, рекомендуется использовать метод развертывания <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Если у вас возникнут проблемы с развертыванием образа, свяжитесь с нами по адресу <a href="mailto:community@zilliz.com">community@zilliz.com</a>, подробно описав проблему, и мы предоставим вам необходимую поддержку.</p>
</div>
<p>После запуска сценария установки:</p>
<ul>
<li>Контейнер docker с именем milvus был запущен на порту <strong>19530</strong>.</li>
<li>Встроенный etcd установлен вместе с Milvus в том же контейнере и работает на порту <strong>2379</strong>. Его конфигурационный файл отображается на <strong>embedEtcd.yaml</strong> в текущей папке.</li>
<li>Чтобы изменить конфигурацию Milvus по умолчанию, добавьте свои настройки в файл <strong>user.yaml</strong> в текущей папке, а затем перезапустите службу.</li>
<li>Том данных Milvus отображается на <strong>volumes/milvus</strong> в текущей папке.</li>
</ul>
<p>Вы можете получить доступ к Milvus WebUI по адресу <code translate="no">http://127.0.0.1:9091/webui/</code>, чтобы узнать больше о вашем экземпляре Milvus. Для получения подробной информации см. раздел <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Необязательно) Обновление конфигураций Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете изменить конфигурации Milvus в файле <strong>user.yaml</strong> в текущей папке. Например, чтобы изменить <code translate="no">proxy.healthCheckTimeout</code> на <code translate="no">1000</code> ms, вы можете изменить файл следующим образом:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Затем перезапустите службу следующим образом:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Применимые элементы конфигурации см. в разделе <a href="/docs/ru/system_configuration.md">Конфигурация системы</a>.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Обновление Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете обновить Milvus до последней версии с помощью встроенной команды обновления. При этом автоматически загружается последняя конфигурация и образ Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Команда обновления автоматически:</p>
<ul>
<li>Загружает последний сценарий установки с обновленными конфигурациями</li>
<li>Извлекает последний образ Milvus Docker</li>
<li>Перезапускает контейнер с новой версией</li>
<li>Сохранение существующих данных и конфигураций</li>
</ul>
<p>Это рекомендуемый способ обновления автономного развертывания Milvus.</p>
</div>
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
    </button></h2><p>Остановить и удалить этот контейнер можно следующим образом</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Проверить <a href="/docs/ru/quickstart.md">Quickstart</a>, чтобы узнать, на что способен Milvus.</p></li>
<li><p>Изучить основные операции Milvus:</p>
<ul>
<li><a href="/docs/ru/manage_databases.md">Управлять базами данных</a></li>
<li><a href="/docs/ru/manage-collections.md">Управлять коллекциями</a></li>
<li><a href="/docs/ru/manage-partitions.md">Управление разделами</a></li>
<li><a href="/docs/ru/insert-update-delete.md">Вставка, вставка и удаление</a></li>
<li><a href="/docs/ru/single-vector-search.md">Одновекторный поиск</a></li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a></li>
</ul></li>
<li><p><a href="/docs/ru/upgrade_milvus_cluster-helm.md">Обновление Milvus с помощью Helm Chart</a>.</p></li>
<li><p><a href="/docs/ru/scaleout.md">Масштабирование кластера Milvus</a>.</p></li>
<li><p>Развертывание кластера Milvu в облаках:</p>
<ul>
<li><a href="/docs/ru/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ru/gcp.md">Google Cloud</a></li>
<li><a href="/docs/ru/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Изучите <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>, интуитивно понятный веб-интерфейс для наблюдения и управления Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/milvus_backup_overview.md">Milvus Backup</a>, инструмент с открытым исходным кодом для резервного копирования данных Milvus.</p></li>
<li><p>Изучите <a href="/docs/ru/birdwatcher_overview.md">Birdwatcher</a>, инструмент с открытым исходным кодом для отладки Milvus и динамического обновления конфигурации.</p></li>
<li><p>Изучите <a href="https://github.com/zilliztech/attu">Attu</a>, инструмент с открытым исходным кодом GUI для интуитивного управления Milvus.</p></li>
<li><p><a href="/docs/ru/monitor.md">Мониторинг Milvus с помощью Prometheus</a>.</p></li>
</ul>
