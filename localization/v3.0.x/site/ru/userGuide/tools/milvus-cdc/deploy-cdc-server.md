---
id: deploy-cdc-server.md
order: 2
summary: >-
  В этом руководстве представлен пошаговый процесс развертывания сервера
  Milvus-CDC.
title: Развертывание сервера CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">Развертывание сервера CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве представлен пошаговый процесс развертывания сервера Milvus-CDC.</p>
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
    </button></h2><p>Перед развертыванием сервера Milvus-CDC убедитесь, что выполнены следующие условия:</p>
<ul>
<li><p><strong>Экземпляры Milvus</strong>: Оба исходных Milvus и хотя бы один целевой Milvus должны быть развернуты и работать.</p>
<ul>
<li><p>Версии исходного и целевого Milvus должны быть 2.3.2 или выше, предпочтительно 2.4.x. Мы рекомендуем использовать одну и ту же версию для исходного и целевого Milvus, чтобы обеспечить совместимость.</p></li>
<li><p>Установите конфигурацию <code translate="no">common.ttMsgEnabled</code> целевого Milvus на <code translate="no">false</code>.</p></li>
<li><p>Настройте исходный и целевой Milvus с разными параметрами хранения метаданных и сообщений, чтобы избежать конфликтов. Например, избегайте использования одинаковых конфигураций etcd и rootPath, а также одинаковых сервисов Pulsar и <code translate="no">chanNamePrefix</code> в нескольких экземплярах Milvus.</p></li>
</ul></li>
<li><p><strong>Метахранилище</strong>: Подготовьте базу данных etcd или MySQL для метахранилища Milvus-CDC.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">Шаги<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Получите файл конфигурации Milvus-CDC</h3><p>Клонируйте <a href="https://github.com/zilliztech/milvus-cdc">репозиторий Milvus-CDC</a> и перейдите в каталог <code translate="no">milvus-cdc/server/configs</code>, чтобы получить доступ к файлу конфигурации <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">Отредактируйте файл конфигурации</h3><p>В каталоге <code translate="no">milvus-cdc/server/configs</code> измените файл <code translate="no">cdc.yaml</code>, чтобы настроить конфигурации, связанные с метахранилищем Milvus-CDC и деталями подключения исходного Milvus.</p>
<ul>
<li><p><strong>Конфигурация метахранилища</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: Тип метахранилища для Milvus-CDC. Возможные значения: <code translate="no">etcd</code> или <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: Адрес для подключения к etcd Milvus-CDC. Требуется, если для <code translate="no">storeType</code> установлено значение <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: Адрес подключения к базе данных MySQL для сервера Milvus-CDC. Требуется, если <code translate="no">storeType</code> установлен в <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: Корневой путь метахранилища Milvus-CDC. Эта конфигурация обеспечивает многопользовательский режим, позволяя нескольким службам CDC использовать один и тот же экземпляр etcd или MySQL, достигая при этом изоляции за счет разных корневых путей.</p></li>
</ul>
<p>Пример конфигурации:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Конфигурация источника Milvus:</strong></p>
<p>Укажите детали подключения исходного Milvus, включая etcd и хранилище сообщений, чтобы установить соединение между сервером Milvus-CDC и исходным Milvus.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: Адрес для подключения к etcd источника Milvus. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">Конфигурации, связанные с etcd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: Корневой префикс ключа, по которому исходный Milvus хранит данные в etcd. Значение может меняться в зависимости от метода развертывания экземпляра Milvus:</p>
<ul>
<li><p><strong>Helm</strong> или <strong>Docker Compose</strong>: По умолчанию <code translate="no">by-dev</code>.</p></li>
<li><p><strong>Оператор</strong>: По умолчанию <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>: имя канала репликации milvus, которое находится на <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> в файле milvus.yaml.</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: Конфигурации Pulsar для исходного Milvus. Если источник Milvus использует Kafka для хранения сообщений, удалите все конфигурации, связанные с Pulsar. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_pulsar.md">Конфигурации, связанные с Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: Адрес Kafka для источника Milvus. Не комментируйте эту конфигурацию, если источник Milvus использует Kafka для хранения сообщений.</p></li>
</ul></li>
</ul>
<p>Пример конфигурации:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Компиляция сервера Milvus-CDC</h3><p>После сохранения файла <code translate="no">cdc.yaml</code> перейдите в каталог <code translate="no">milvus-cdc</code> и выполните одну из следующих команд для компиляции сервера:</p>
<ul>
<li><p>Для бинарного файла:</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Для образа Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Для образа Docker смонтируйте скомпилированный файл на <code translate="no">/app/server/configs/cdc.yaml</code> внутри контейнера.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">Запустите сервер</h3><ul>
<li><p>Использование двоичного файла</p>
<p>Перейдите в каталог с бинарным файлом <code translate="no">milvus-cdc</code> и в каталог <code translate="no">configs</code> с файлом <code translate="no">cdc.yaml</code>, а затем запустите сервер:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Используя Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
