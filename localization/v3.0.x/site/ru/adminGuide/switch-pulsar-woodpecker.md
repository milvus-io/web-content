---
id: switch-pulsar-woodpecker.md
title: Переключение между Pulsar и Woodpecker
summary: >-
  Переключите очередь сообщений кластера Milvus с Pulsar на Woodpecker с помощью
  Helm или Milvus Operator.
---
<h1 id="Switch-between-Pulsar-and-Woodpecker" class="common-anchor-header">Переключение между Pulsar и Woodpecker<button data-href="#Switch-between-Pulsar-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>На этой странице описано, как переключить очередь сообщений (MQ) <strong>кластера Milvus</strong> между <strong>Pulsar</strong> (встроенным или внешним) и <strong>Woodpecker</strong> (с бэкэндом MinIO) в обоих направлениях. Общий порядок действий и необходимые условия см. в разделе <a href="/docs/ru/switch-mq-type.md">«Переключение типа MQ</a>».</p>
<div class="alert note">
<p><strong>Предпосылка:</strong> функция «Переключение MQ» доступна в <strong>Milvus 3.0 и более поздних версиях</strong>. Перед началом обновите свой экземпляр Milvus до версии 3.0 или более поздней — эта функция недоступна в более ранних версиях.</p>
</div>
<div class="alert warning">
<p>Переключение очереди сообщений — <strong>операция с высоким уровнем риска</strong>. Выберите раздел, соответствующий <strong>вашему</strong> способу развертывания — <strong>«С помощью Helm»</strong> или <strong>«С помощью Milvus Operator»</strong> — и следуйте инструкциям от начала до конца. Не смешивайте команды Helm и Operator.</p>
</div>
<h2 id="With-Helm" class="common-anchor-header">С помощью Helm<button data-href="#With-Helm" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Helm" class="common-anchor-header">Переход с Pulsar на Woodpecker (Helm)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Шаг 1: Убедитесь, что экземпляр Milvus работает.</strong> Убедитесь, что ваш кластер Milvus работает корректно — например, создав тестовую коллекцию, вставив данные и выполнив запрос.</p>
<p><strong>Шаг 2: Выполните переключение MQ.</strong> Откройте интерфейс управления MixCoord, затем вызовите API переключения:</p>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>В другом терминале:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Шаг 3: Убедитесь, что переключение завершено.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>В случае успешного переключения в журнале регистрируется сообщение « <code translate="no">[mqTypeValue=woodpecker]</code> ».</p>
<p><strong>Шаг 4: (Необязательно) Остановите Pulsar и выполните очистку.</strong> Для <strong>встроенного</strong> Pulsar отключите Pulsar и включите Woodpecker, затем удалите PVC Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade my-release zilliztech/milvus \
  --set image.all.tag=v3.0-beta \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl get pvc | grep my-release-pulsarv3
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>Для <strong>внешнего</strong> Pulsar очистите темы Milvus во внешнем экземпляре Pulsar. Темы Milvus имеют формат <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code> (например, <code translate="no">by-dev-rootcoord-dml_10_464633776992639586v0</code>).</p>
<div class="alert note">
<p>Если вы планируете позже вернуться к Pulsar, сначала очистите данные/темы, чтобы избежать конфликтов. Из-за ограничений диаграмм Helm возвращение к <strong>встроенному</strong> экземпляру Pulsar в настоящее время невозможно.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Helm" class="common-anchor-header">Переход с Woodpecker на Pulsar (Helm)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Шаг 1: Убедитесь, что экземпляр Milvus работает.</strong></p>
<p><strong>Шаг 2: Настройте целевое соединение с Pulsar и перезапустите Milvus.</strong> Для перехода необходимо, чтобы Milvus уже знал о соединении с Pulsar, поэтому запишите его в файл « <code translate="no">user.yaml</code> » через <code translate="no">extraConfigFiles</code> и примените с помощью команды <code translate="no">helm upgrade</code> (которая перезапускает поды). Для работы функции Switch MQ требуется файл « <code translate="no">streaming.enabled=true</code> ».</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># values.yaml</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    pulsar:
      address: &lt;pulsar addr&gt;
      port: &lt;pulsar port, e.g. 6650&gt;
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release zilliztech/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь, пока все поды будут готовы, затем убедитесь, что конфигурация доступа к Pulsar была отражена в конфигурации Milvus.</p>
<p><strong>Шаг 3: Выполните переключение MQ.</strong></p>
<div class="alert note">
<p>Убедитесь, что целевой Pulsar не содержит тем Milvus из предыдущей конфигурации. Если это ваш первый переход на Pulsar, пропустите это примечание; в противном случае сначала удалите оставшиеся темы Milvus с такими же именами.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-mixcoord 29091:9091
<button class="copy-code-btn"></button></code></pre>
<p>В другом терминале:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://127.0.0.1:29091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Шаг 4: Убедитесь, что переход завершен.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>При успешном переключении в журнале появляется запись « <code translate="no">[mqTypeValue=pulsar]</code> ».</p>
<p><strong>Шаг 5: (Необязательно) Удалите данные Woodpecker.</strong> Удалите данные Woodpecker на MinIO/S3 (в папке <code translate="no">&lt;rootPath&gt;/wp/...</code>, обычно <code translate="no">files/wp/...</code>) и метаданные Woodpecker в etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Если вы планируете позже вернуться к Woodpecker, сначала удалите эти файлы.</p>
<h2 id="With-Milvus-Operator" class="common-anchor-header">С помощью Milvus Operator<button data-href="#With-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="common-anchor-header">Переход с Pulsar на Woodpecker (Milvus Operator)<button data-href="#Switch-from-Pulsar-to-Woodpecker-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Шаг 1: Убедитесь, что экземпляр Milvus запущен.</strong></p>
<p><strong>Шаг 2: Выполните переключение MQ.</strong> Сервис MixCoord не доступен извне, поэтому запустите API переключения изнутри под MixCoord:</p>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Шаг 3: Убедитесь, что переключение завершено.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>В случае успешного переключения в журнале регистрируется сообщение « <code translate="no">[mqTypeValue=woodpecker]</code> ».</p>
<p><strong>Шаг 4: Обновите тип MQ в Operator.</strong> Обновите конфигурацию, управляемую Operator, чтобы Operator не отменил переключение. Создайте файл <code translate="no">change_configmap.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p><strong>Шаг 5: (Необязательно) Остановите Pulsar и выполните очистку.</strong> Для <strong>встроенного</strong> Pulsar удалите релиз Pulsar и его PVC:</p>
<pre><code translate="no" class="language-shell">helm uninstall my-release-pulsar
kubectl get pvc | grep my-release-pulsar
kubectl delete pvc &lt;pulsar-pvc-name&gt; ...
<button class="copy-code-btn"></button></code></pre>
<p>Для <strong>внешнего</strong> Pulsar очистите темы Milvus (формат <code translate="no">&lt;cluster_prefix&gt;-dml_&lt;seqNo&gt;_&lt;TimeTick&gt;&lt;Version&gt;</code>).</p>
<div class="alert note">
<p>Если вы планируете позже вернуться к Pulsar, сначала очистите данные/темы, чтобы избежать конфликтов. Из-за ограничений диаграмм Helm возврат к <strong>встроенному</strong> экземпляру Pulsar в настоящее время невозможен.</p>
</div>
<h3 id="Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="common-anchor-header">Переход с Woodpecker на Pulsar (оператор Milvus)<button data-href="#Switch-from-Woodpecker-to-Pulsar-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Шаг 1: Убедитесь, что экземпляр Milvus запущен.</strong></p>
<p><strong>Шаг 2: Настройте подключение к целевому Pulsar и перезапустите Milvus.</strong> Добавьте подключение к Pulsar в файл <code translate="no">spec.config</code> (оператор преобразует <code translate="no">spec.config</code> в <code translate="no">user.yaml</code>) и установите тип MQ; при применении CR поды будут перезапущены с новой конфигурацией.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change_configmap.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">addr&gt;</span>
      <span class="hljs-attr">port:</span> <span class="hljs-string">&lt;pulsar</span> <span class="hljs-string">port,</span> <span class="hljs-string">e.g.</span> <span class="hljs-number">6650</span><span class="hljs-string">&gt;
  dependencies:
    msgStreamType: pulsar
</span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">kubectl patch -f change_configmap.yaml --patch-file change_configmap.yaml --type merge
<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь, пока все поды будут готовы, затем убедитесь, что конфигурация доступа к Pulsar была преобразована в конфигурацию Milvus.</p>
<p><strong>Шаг 3: Выполните переключение MQ.</strong></p>
<div class="alert note">
<p>Убедитесь, что целевой Pulsar не содержит тем Milvus из предыдущей конфигурации. Если это ваш первый переход на Pulsar, пропустите это примечание; в противном случае сначала удалите оставшиеся темы Milvus с такими же именами.</p>
</div>
<pre><code translate="no" class="language-shell">kubectl exec -it &lt;mixcoord-pod&gt; -- \
  curl -X POST http://localhost:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><strong>Шаг 4: Убедитесь, что переход завершён.</strong></p>
<pre><code translate="no" class="language-shell">kubectl logs &lt;mixcoord-pod&gt; | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>В случае успешного переключения в журнале регистрируется сообщение « <code translate="no">[mqTypeValue=pulsar]</code> ».</p>
<p><strong>Шаг 5: (Необязательно) Удалите данные Woodpecker.</strong> Удалите данные Woodpecker на MinIO/S3 (в каталоге <code translate="no">&lt;rootPath&gt;/wp/...</code>, обычно <code translate="no">files/wp/...</code>) и метаданные Woodpecker в etcd (<code translate="no">etcdctl get woodpecker --prefix</code>). Если вы планируете позже вернуться к Woodpecker, сначала удалите эти файлы.</p>
<h2 id="Supported-scenarios" class="common-anchor-header">Поддерживаемые сценарии<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Источник MQ</th><th>Целевой MQ</th><th>Helm</th><th>Оператор Milvus</th></tr>
</thead>
<tbody>
<tr><td>Встроенный Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>Поддерживается</strong></td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Внешний Pulsar</td><td>Woodpecker (MinIO)</td><td><strong>Поддерживается</strong></td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Внешний Pulsar</td><td><strong>Поддерживается</strong></td><td><strong>Поддерживается</strong></td></tr>
<tr><td>Pulsar</td><td>Woodpecker (локальный)</td><td><strong>Поддерживается, но не рекомендуется</strong> (все модули требуют общей файловой системы)</td><td><strong>Не поддерживается</strong></td></tr>
</tbody>
</table>
