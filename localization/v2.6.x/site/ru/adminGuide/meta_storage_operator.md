---
id: meta_storage_operator.md
title: Настройка хранения метаданных с помощью Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 'Узнайте, как настроить метахранилище с помощью Milvus Operator.'
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Настройка хранения метаданных с помощью Milvus Operator<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует etcd для хранения метаданных. В этой теме рассказывается о том, как настроить зависимость от метахранилища при установке Milvus с Milvus Operator. Для получения дополнительной информации см. раздел <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Настройка метахранилища с Milvus Operator</a> в репозитории Milvus Operator.</p>
<p>В этой теме предполагается, что вы развернули Milvus Operator.</p>
<div class="alert note">Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Развертывание Milvus Operator</a>. </div>
<p>Вам нужно указать файл конфигурации для использования Milvus Operator для запуска кластера Milvus.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Для настройки сторонних зависимостей достаточно отредактировать шаблон кода в <code translate="no">milvus_cluster_default.yaml</code>. В следующих разделах описана настройка объектного хранилища, etcd и Pulsar соответственно.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Настройка etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Добавьте необходимые поля в разделе <code translate="no">spec.dependencies.etcd</code>, чтобы настроить etcd.</p>
<p><code translate="no">etcd</code> поддерживает <code translate="no">external</code> и <code translate="no">inCluster</code>.</p>
<p>Поля, используемые для настройки внешней службы etcd, включают:</p>
<ul>
<li><code translate="no">external</code>: Значение <code translate="no">true</code> указывает на то, что Milvus использует внешнюю службу etcd.</li>
<li><code translate="no">endpoints</code>: Конечные точки etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">Внешний etcd</h3><h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внешняя служба etcd.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">etcd:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:2379</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">Внутренний etcd</h3><p><code translate="no">inCluster</code> указывает, что при запуске кластера Milvus в нем автоматически запускается служба etcd.</p>
<h4 id="Example" class="common-anchor-header">Пример</h4><p>В следующем примере настраивается внутренняя служба etcd.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">etcd:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">5</span>
          <span class="hljs-attr">resources:</span>
            <span class="hljs-attr">limits:</span> 
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">В предыдущем примере указано количество реплик <code translate="no">5</code> и ограничены вычислительные ресурсы для etcd.</div>
<div class="alert note">Полный набор элементов конфигурации для настройки внутренней службы etcd находится в файле <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Добавьте необходимые элементы конфигурации в файл <code translate="no">etcd.inCluster.values</code>, как показано в предыдущем примере.</div>
<p>Предполагая, что файл конфигурации имеет имя <code translate="no">milvuscluster.yaml</code>, выполните следующую команду, чтобы применить конфигурацию.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
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
    </button></h2><p>Узнайте, как настроить другие зависимости Milvus с помощью Milvus Operator:</p>
<ul>
<li><a href="/docs/ru/object_storage_operator.md">Настройка хранилища объектов с помощью Milvus Operator</a></li>
<li><a href="/docs/ru/message_storage_operator.md">Настройка хранилища сообщений с помощью Milvus Operator</a></li>
</ul>
