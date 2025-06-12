---
id: configure_grafana_loki.md
title: Настройка Grafana Loki
summary: >-
  В этой теме описывается, как собирать журналы с помощью Loki и запрашивать
  журналы для кластера Milvus с помощью Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Настройка Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве приведены инструкции по настройке Loki для сбора журналов и Grafana для запроса и отображения журналов для кластера Milvus.</p>
<p>В этом руководстве вы узнаете, как:</p>
<ul>
<li>Развертывать <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> и <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> на кластере Milvus с помощью Helm.</li>
<li>Настраивать объектное хранилище для Loki.</li>
<li>Запрашивать журналы с помощью Grafana.</li>
</ul>
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
<li>Вы <a href="/docs/ru/install_cluster-helm.md">установили кластер Milvus на K8s</a>.</li>
<li>Вы установили необходимые инструменты, включая <a href="https://helm.sh/docs/intro/install/">Helm</a> и <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Развертывание Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki - это система агрегации логов, созданная по мотивам Prometheus. Разверните Loki с помощью Helm для сбора логов с вашего кластера Milvus.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Добавьте репозиторий диаграмм Grafana в Helm</h3><p>Добавьте репозиторий графиков Grafana в Helm и обновите его:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Настройте хранилище объектов для Loki</h3><p>Выберите один из следующих вариантов хранения и создайте файл конфигурации <code translate="no">loki.yaml</code>:</p>
<ul>
<li><p>Вариант 1: Использование MinIO для хранения данных</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Вариант 2: Использование AWS S3 для хранения данных.</p>
<p>В следующем примере замените <code translate="no">&lt;accessKey&gt;</code> и <code translate="no">&lt;keyId&gt;</code> на собственный ключ доступа и идентификатор S3, <code translate="no">s3.endpoint</code> - на конечную точку S3, а <code translate="no">s3.region</code> - на регион S3.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Установите Loki</h3><p>Выполните следующие команды для установки Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Развернуть Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail - это агент сбора логов для Loki. Он считывает журналы из капсул Milvus и отправляет их в Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Создание конфигурации Promtail</h3><p>Создайте файл конфигурации <code translate="no">promtail.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">config:</span>
  <span class="hljs-attr">clients:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">url:</span> <span class="hljs-string">http://loki-gateway/loki/api/v1/push</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Установить Promtail</h3><p>Установите Promtail с помощью Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Запрос журналов с помощью Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Разверните Grafana и настройте ее на подключение к Loki для запроса журналов.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Развертывание Grafana</h3><p>Установите Grafana с помощью следующих команд:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Прежде чем получить доступ к Grafana, необходимо получить пароль <code translate="no">admin</code>:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>Затем перенаправьте порт Grafana на вашу локальную машину:</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Добавьте Loki в качестве источника данных в Grafana</h3><p>После запуска Grafana необходимо добавить Loki в качестве источника данных для запроса журналов.</p>
<ol>
<li>Откройте веб-браузер и перейдите по адресу <code translate="no">127.0.0.1:3000</code>. Войдите в систему, используя имя пользователя <code translate="no">admin</code> и пароль, полученный ранее.</li>
<li>В левом боковом меню выберите <strong>Подключения</strong> &gt; <strong>Добавить новое подключение</strong>.</li>
<li>На появившейся странице выберите <strong>Loki</strong> в качестве типа источника данных. Вы можете ввести <strong>loki</strong> в строке поиска, чтобы найти источник данных.</li>
<li>В настройках источника данных Loki укажите <strong>Имя</strong> и <strong>URL</strong>, а затем нажмите <strong>Сохранить и проверить</strong>.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>Источник данных</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Запрос журналов Milvus</h3><p>После добавления Loki в качестве источника данных сделайте запрос к журналам Milvus в Grafana:</p>
<ol>
<li>В левом боковом меню нажмите <strong>Explore</strong>.</li>
<li>В левом верхнем углу страницы выберите источник данных loki.</li>
<li>С помощью <strong>браузера Label</strong> выберите метки и запросите журналы.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>Запрос</span> </span></p>
