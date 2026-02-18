---
id: switch_milvus_cluster_mq_type-operator.md
summary: 'Узнайте, как переключить тип очереди сообщений для кластера Milvus.'
title: Переключение типа MQ для кластера Milvus
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">Переключение типа MQ для кластера Milvus<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как переключить тип очереди сообщений (MQ) для существующего развертывания кластера Milvus. Milvus поддерживает онлайн-переключение MQ между Pulsar, Kafka и Woodpecker без простоев.</p>
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
<li>Работающий экземпляр кластера Milvus, установленный через <a href="/docs/ru/v2.6.x/install_cluster-milvusoperator.md">Milvus Operator</a> или <a href="/docs/ru/v2.6.x/install_cluster-helm.md">Helm</a>.</li>
<li>Экземпляр Milvus был обновлен до последней версии, поддерживающей эту функцию Switch MQ.</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">Переключение с Pulsar/Kafka на Woodpecker (MinIO)<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующие шаги, чтобы переключить тип MQ с Pulsar или Kafka на Woodpecker с хранилищем MinIO.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Шаг 1: Убедитесь, что экземпляр Milvus запущен.<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Перед переключением убедитесь, что ваш экземпляр кластера Milvus работает правильно. Вы можете проверить это, создав тестовую коллекцию, вставив данные и выполнив запрос.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">Шаг 2: (Необязательно) Проверка конфигурации Woodpecker<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>В конфигурации Milvus по умолчанию тип хранилища Woodpecker уже установлен на MinIO, поэтому в большинстве случаев дополнительная настройка не требуется.</p>
<p>Однако если вы ранее настраивали конфигурацию Woodpecker, необходимо убедиться, что значение <code translate="no">woodpecker.storage.type</code> установлено на <code translate="no">minio</code>. Обновите конфигурацию Milvus <strong>, не</strong> изменяя значение <code translate="no">mqType</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Для <strong>Helm</strong> инструкции по обновлению конфигурации см. в разделе <a href="/docs/ru/v2.6.x/configure-helm.md">Настройка Milvus с помощью Helm Charts</a>.</li>
<li>Для <strong>Milvus Operator</strong> инструкции по обновлению конфигурации см. в разделе <a href="/docs/ru/v2.6.x/configure_operator.md">Настройка Milvus с Milvus Operator</a>.</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Шаг 3: Выполните переключение MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Выполните следующую команду, чтобы запустить переключение на Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Замените <code translate="no">&lt;mixcoord_addr&gt;</code> на фактический адрес вашей службы MixCoord.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Шаг 4: Убедитесь, что переключение завершено<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Процесс переключения завершится автоматически. Чтобы убедиться в завершении процесса переключения, отследите в журналах Milvus следующие ключевые сообщения:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>В приведенных выше сообщениях журнала <code translate="no">&lt;MQ1&gt;</code> - это исходный тип MQ (например, <code translate="no">pulsar</code> или <code translate="no">kafka</code>), а <code translate="no">&lt;MQ2&gt;</code> - целевой тип MQ (<code translate="no">woodpecker</code>).</p>
<ul>
<li>Первое сообщение указывает на то, что переключение WAL с источника на цель завершено.</li>
<li>Второе сообщение указывает на то, что все физические каналы были переключены.</li>
<li>Третье сообщение указывает на то, что конфигурация <code translate="no">mq.type</code> была обновлена в etcd.</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">Переключение с Woodpecker (MinIO) на Pulsar или Kafka<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующие шаги, чтобы переключить тип MQ с Woodpecker обратно на Pulsar или Kafka.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Шаг 1: Убедитесь, что экземпляр Milvus запущен.<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Перед переключением убедитесь, что ваш экземпляр кластера Milvus работает нормально.</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">Шаг 2: Настройте целевой MQ<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Перед началом переключения необходимо убедиться, что целевая служба MQ (Pulsar или Kafka) доступна и ее конфигурация доступа перенесена в конфигурацию Milvus.</p>
<div class="alert note">
<p>Конкретные шаги в этом разделе зависят от того, используете ли вы внутреннюю (пакетную) или внешнюю службу MQ.</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">Вариант A: Внутренний Pulsar/Kafka (поставляется вместе с Helm)</h4><p>Если вы используете встроенный Pulsar или Kafka, развернутый Helm, обновите релиз Helm, чтобы включить целевую службу MQ и отключить Woodpecker. Флаг <code translate="no">streaming.enabled=true</code> необходим для включения потокового узла, который является необходимым условием для функции Switch MQ. Например, для переключения на Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>После обновления убедитесь, что целевая конфигурация доступа MQ была преобразована в конфигурацию Milvus. Например, для Pulsar:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">Вариант B: Внутренний Pulsar/Kafka (управляется Milvus Operator)</h4><p>Если вы используете Milvus Operator, обновите пользовательский ресурс Milvus, чтобы включить целевую конфигурацию доступа MQ. Подробные сведения об обновлении конфигурации <a href="/docs/ru/v2.6.x/configure_operator.md">Milvus</a> см. в разделе <a href="/docs/ru/v2.6.x/configure_operator.md">Настройка Milvus с помощью Milvus Operator</a>.</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">Вариант C: Внешний Pulsar/Kafka</h4><p>Если вы используете внешнюю службу Pulsar или Kafka, вам не нужно изменять <code translate="no">mqType</code>. Просто добавьте конфигурацию внешнего доступа к MQ на свой <code translate="no">values.yaml</code> и перезапустите экземпляр Milvus для визуализации конфигурации.</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Шаг 3: Выполните переключение MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Выполните следующую команду, чтобы запустить переход на Pulsar (замените <code translate="no">pulsar</code> на <code translate="no">kafka</code>, если переходите на Kafka):</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Замените <code translate="no">&lt;mixcoord_addr&gt;</code> на фактический адрес вашего сервиса MixCoord.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Шаг 4: Убедитесь, что переключение завершено<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>Процесс переключения завершится автоматически. Чтобы убедиться в завершении процесса переключения, просмотрите журналы Milvus на предмет следующих ключевых сообщений:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>В приведенных выше сообщениях журнала <code translate="no">&lt;MQ1&gt;</code> - это исходный тип MQ (<code translate="no">woodpecker</code>), а <code translate="no">&lt;MQ2&gt;</code> - целевой тип MQ (например, <code translate="no">pulsar</code> или <code translate="no">kafka</code>).</p>
<ul>
<li>Первое сообщение указывает на то, что переключение WAL с источника на цель завершено.</li>
<li>Второе сообщение указывает на то, что все физические каналы были переключены.</li>
<li>Третье сообщение указывает на то, что конфигурация <code translate="no">mq.type</code> была обновлена в etcd.</li>
</ul>
</div>
