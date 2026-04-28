---
id: deploy_etcd.md
title: Настройка метахранилища с помощью Docker Compose или Helm
related_key: 'S3, storage'
summary: 'Узнайте, как настроить метахранилище для Milvus с помощью Docker Compose/Helm.'
---
<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Настройка метахранилища с помощью Docker Compose или Helm<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует etcd для хранения метаданных. В этой теме рассказывается о том, как настроить etcd с помощью Docker Compose или Helm.</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">Настройка etcd с помощью Docker Compose<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1. Настройка etcd</h3><p>Чтобы настроить etcd с помощью Docker Compose, укажите значения для секции <code translate="no">etcd</code> в файле <code translate="no">milvus.yaml</code> по пути milvus/configs.</p>
<pre><code translate="no"><span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">by-dev</span> <span class="hljs-comment"># The root path where data are stored in etcd</span>
  <span class="hljs-attr">metaSubPath:</span> <span class="hljs-string">meta</span> <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  <span class="hljs-attr">kvSubPath:</span> <span class="hljs-string">kv</span> <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  <span class="hljs-attr">log:</span>
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    <span class="hljs-attr">path:</span> <span class="hljs-string">stdout</span>
    <span class="hljs-attr">level:</span> <span class="hljs-string">info</span> <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  <span class="hljs-attr">use:</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    <span class="hljs-attr">embed:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  <span class="hljs-attr">data:</span>
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-attr">dir:</span> <span class="hljs-string">default.etcd</span>
<button class="copy-code-btn"></button></code></pre>
<p>Дополнительные сведения см. в разделе <a href="/docs/ru/configure_etcd.md">Конфигурации, связанные с etcd</a>.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Запустите Milvus</h3><p>Выполните следующую команду, чтобы запустить Milvus, который использует конфигурации etcd.</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Конфигурации вступают в силу только после запуска Milvus. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">Запуск Milvus</a>.</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">Настройка etcd на K8s<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>Для кластеров Milvus на K8s можно настроить etcd в той же команде, которая запускает Milvus. Также можно настроить etcd с помощью файла <code translate="no">values.yml</code> по пути /charts/milvus в репозитории <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> перед запуском Milvus.</p>
<p>В следующей таблице перечислены ключи для настройки etcd в файле YAML.</p>
<table>
<thead>
<tr><th>Ключ</th><th>Описание</th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>Включает или отключает etcd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>Включает или отключает внешние etcd.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>Конечная точка для доступа к etcd.</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">Использование файла YAML</h3><ol>
<li>Настройте секцию <code translate="no">etcd</code>, используя значения из файла <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Сконфигурируйте секцию <code translate="no">externaletcd</code>, используя значения из файла <code translate="no">values.yaml</code>.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalEtcd:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">&lt;your_etcd_IP&gt;:2379</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>После настройки предыдущих разделов и сохранения файла <code translate="no">values.yaml</code> выполните следующую команду, чтобы установить Milvus, использующий конфигурации etcd.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">Использование команды</h3><p>Чтобы установить Milvus и настроить etcd, выполните следующую команду, используя ваши значения.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true --set etcd.enabled=false --set externaletcd.enabled=true --set externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Docker Compose или Helm:</p>
<ul>
<li><a href="/docs/ru/deploy_s3.md">Настройка хранилища объектов с помощью Docker Compose или Helm</a></li>
<li><a href="/docs/ru/deploy_pulsar.md">Настройка хранилища сообщений с помощью Docker Compose или Helm</a></li>
</ul>
