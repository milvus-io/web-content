---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Узнайте о конфигурации системы Milvus.
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Контрольный список системных конфигураций Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме представлены общие разделы системных конфигураций в Milvus.</p>
<p>Milvus поддерживает значительное количество параметров, которые настраивают систему. Каждая конфигурация имеет значение по умолчанию, которое можно использовать напрямую. Вы можете гибко изменять эти параметры, чтобы Milvus мог лучше обслуживать ваше приложение. Дополнительную информацию см. в разделе <a href="/docs/ru/configure-docker.md">Настройка Milvus</a>.</p>
<div class="alert note">
В текущем выпуске все параметры вступают в силу только после настройки при запуске Milvus.</div>
<h2 id="Sections" class="common-anchor-header">Разделы<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Для удобства обслуживания Milvus классифицирует свои конфигурации на %s разделов, основываясь на своих компонентах, зависимостях и общем использовании.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Связанная конфигурация etcd, используемая для хранения метаданных Milvus и обнаружения сервисов.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_etcd.md">Конфигурации, связанные с etcd</a>.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_metastore.md">Конфигурации, связанные с метахранилищем</a>.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Связанная конфигурация tikv, используемая для хранения метаданных Milvus.</p>
<p>Обратите внимание, что когда TiKV включен для метахранилища, вам все еще нужно иметь etcd для обнаружения сервисов.</p>
<p>TiKV - это хороший вариант, когда размер метаданных требует лучшей горизонтальной масштабируемости.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_tikv.md">Конфигурации, связанные с tikv</a>.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_localstorage.md">Конфигурации, связанные с localStorage</a>.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>Связанная конфигурация MinIO/S3/GCS или любого другого сервиса поддерживает S3 API, который отвечает за сохранение данных для Milvus.</p>
<p>В дальнейшем описании для простоты мы будем называть сервис хранения данных MinIO/S3.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_minio.md">"Конфигурации, связанные с MinIO"</a>.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus поддерживает четыре MQ: rocksmq (на основе RockDB), natsmq (встроенный nats-сервер), Pulsar и Kafka.</p>
<p>Вы можете изменить свой MQ, задав поле mq.type.</p>
<p>Если вы не установите поле mq.type по умолчанию, в этом файле есть примечание о включении приоритета, если мы настраиваем несколько mq.</p>
<ol>
<li><p>автономный (локальный) режим: rocksmq (по умолчанию) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>кластерный режим:  Pulsar(по умолчанию) &gt; Kafka (rocksmq и natsmq не поддерживаются в кластерном режиме).</p></li>
</ol>
<p>Подробное описание каждого параметра в этом разделе смотрите в разделе <a href="/docs/ru/configure_mq.md">Конфигурации, связанные с mq</a>.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Связанная конфигурация pulsar, используемая для управления журналами Milvus о последних операциях мутации, вывода потокового журнала и предоставления услуг публикации-подписки журналов.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_pulsar.md">Конфигурации, связанные с pulsar</a>.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Если вы хотите включить kafka, необходимо закомментировать конфигурацию pulsar</p>
<p>kafka:</p>
<p>brokerList: localhost:9092</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_rocksmq.md">Конфигурации, связанные с rocksmq</a>.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>конфигурация natsmq.</p>
<p>подробнее: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_natsmq.md">Конфигурации, связанные с natsmq</a>.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Связанная конфигурация rootCoord, используемая для обработки запросов языка определения данных (DDL) и языка управления данными (DCL).</p>
<p>См. раздел <a href="/docs/ru/configure_rootcoord.md">Конфигурации, связанные с rootCoord</a>, для подробного описания каждого параметра в этом разделе.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Связанная конфигурация прокси, используемая для проверки клиентских запросов и уменьшения возвращаемых результатов.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_proxy.md">Конфигурации, связанные с прокси</a>.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Связанная конфигурация queryCoord, используемая для управления топологией и балансировкой нагрузки для узлов запроса, а также для передачи данных из растущих сегментов в закрытые сегменты.</p>
<p>Подробное описание каждого параметра этого раздела см. в разделе <a href="/docs/ru/configure_querycoord.md">Конфигурации, связанные с queryCoord</a>.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Связанная конфигурация узла запроса (queryNode), используемая для гибридного поиска между векторными и скалярными данными.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_querynode.md">Конфигурации, связанные с узлом запроса</a>.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>См. <a href="/docs/ru/configure_indexcoord.md">Конфигурации, связанные с indexCoord</a>, для подробного описания каждого параметра в этом разделе.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>См. <a href="/docs/ru/configure_indexnode.md">Конфигурации, связанные с узлом indexNode</a>, для подробного описания каждого параметра в этом разделе.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_datacoord.md">Конфигурации, связанные с данными</a>.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>См. <a href="/docs/ru/configure_datanode.md">Конфигурации, связанные с узлом данных</a>, для подробного описания каждого параметра в этом разделе.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>В этой теме представлены конфигурации Milvus, связанные с каналом сообщений.</p>
<p>Подробное описание каждого параметра этого раздела см. в разделе <a href="/docs/ru/configure_msgchannel.md">msgChannel-related Configurations</a>.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Настройка вывода системного журнала.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_log.md">Конфигурации, связанные с журналом</a>.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_grpc.md">Конфигурации, связанные с grpc</a>.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Настройка внешнего tls.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_tls.md">Конфигурации, связанные с tls</a>.</p>
<h3 id="internaltls" class="common-anchor-header"><code translate="no">internaltls</code></h3><p>Настроить внутренний tls.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_internaltls.md">Конфигурации, связанные с internaltls</a>.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Конфигурации, <a href="/docs/ru/configure_common.md">связанные с общим,</a> см. в разделе Конфигурации, связанные <a href="/docs/ru/configure_common.md">с общим</a>, для подробного описания каждого параметра в этом разделе.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, настройка квот и лимитов Milvus.</p>
<p>По умолчанию мы включаем:</p>
<ol>
<li><p>Защита TT;</p></li>
<li><p>Защита памяти.</p></li>
<li><p>Защита дисковых квот.</p></li>
</ol>
<p>Вы можете включить:</p>
<ol>
<li><p>Ограничение пропускной способности DML;</p></li>
<li><p>DDL, DQL qps/rps ограничение;</p></li>
<li><p>Защита длины/латентности очереди DQL;</p></li>
<li><p>защиту скорости обработки результатов DQL;</p></li>
</ol>
<p>При необходимости вы также можете вручную принудительно отклонять запросы RW.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_quotaandlimits.md">Конфигурации, связанные с квотами и лимитами</a>.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_trace.md">Конфигурации, связанные с трассировкой</a>.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#при использовании индексирования на GPU Milvus будет использовать пул памяти, чтобы избежать частого выделения и удаления памяти.</p>
<p>#здесь вы можете задать размер памяти, занимаемой пулом памяти, единицей измерения является МБ.</p>
<p>#отметим, что существует вероятность аварийного завершения работы Milvus, когда фактическая потребность в памяти превышает значение, заданное параметром maxMemSize.</p>
<p>#если initMemSize и MaxMemSize оба равны нулю,</p>
<p>#milvus автоматически инициализирует половину доступной памяти GPU,</p>
<p>#maxMemSize - всю доступную память GPU.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_gpu.md">Конфигурации, связанные с gpu</a>.</p>
<h3 id="streamingNode" class="common-anchor-header"><code translate="no">streamingNode</code></h3><p>Любая конфигурация, связанная с сервером потокового узла.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_streamingnode.md">Конфигурации, связанные с потоковым узлом</a>.</p>
<h3 id="streaming" class="common-anchor-header"><code translate="no">streaming</code></h3><p>Любая конфигурация, связанная со службой потоковой передачи.</p>
<p>Подробное описание каждого параметра в этом разделе см. в разделе <a href="/docs/ru/configure_streaming.md">Конфигурации, связанные с потоковой передачей</a>.</p>
<h3 id="knowhere" class="common-anchor-header"><code translate="no">knowhere</code></h3><p>Любая конфигурация, связанная с векторной поисковой системой knowhere.</p>
<p>См. <a href="/docs/ru/configure_knowhere.md">Конфигурации, связанные с knowhere</a>, для подробного описания каждого параметра в этом разделе.</p>
