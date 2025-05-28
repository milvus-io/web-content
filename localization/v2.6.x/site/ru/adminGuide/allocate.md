---
id: allocate.md
title: Выделение ресурсов для Milvus на Kubernetes
summary: 'Узнайте, как выделять ресурсы для Milvus на Kubernetes.'
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Распределение ресурсов на Kubernetes<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается, как выделять ресурсы для кластера Milvus в Kubernetes.</p>
<p>Как правило, ресурсы, которые вы выделяете кластеру Milvus в производстве, должны быть пропорциональны рабочей нагрузке машины. При выделении ресурсов следует также учитывать тип машины. Хотя вы можете обновить конфигурацию во время работы кластера, мы рекомендуем установить значения перед <a href="/docs/ru/install_cluster-helm.md">развертыванием кластера</a>.</p>
<div class="alert note">
<p>Информацию о том, как распределять ресурсы с помощью Milvus Operator, см. в разделе <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Распределение ресурсов с помощью Milvus Operator</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. Просмотр доступных ресурсов<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Запустите <code translate="no">kubectl describe nodes</code>, чтобы просмотреть доступные ресурсы на экземплярах, которые вы выделили.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. Распределить ресурсы<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Используйте Helm для выделения ресурсов процессора и памяти компонентам Milvus.</p>
<div class="alert note">
Использование Helm для обновления ресурсов приведет к тому, что запущенные капсулы будут выполнять скользящее обновление.</div>
<p>Существует два способа выделения ресурсов:</p>
<ul>
<li><a href="/docs/ru/allocate.md#Allocate-resources-with-commands">Использовать команды</a></li>
<li><a href="/docs/ru/allocate.md#Allocate-resources-by-setting-configuration-file">Задать параметры в файле <code translate="no">YAML</code>.</a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">Распределение ресурсов с помощью команд</h3><p>Вам необходимо установить переменные ресурсов для каждого компонента Milvus, если вы используете <code translate="no">--set</code> для обновления конфигураций ресурсов.</p>
<div class="filter">
<a href="#standalone">Автономный Milvus</a> <a href="#cluster">Кластер Milvus</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set standalone.resources.limits.cpu=2 --set standalone.resources.limits.memory=4Gi --set standalone.resources.requests.cpu=0.1 --set standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set dataNode.resources.limits.cpu=2 --set dataNode.resources.limits.memory=4Gi --set dataNode.resources.requests.cpu=0.1 --set dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">Распределение ресурсов с помощью конфигурационного файла</h3><p>Вы также можете распределить ресурсы процессора и памяти, указав параметры <code translate="no">resources.requests</code> и <code translate="no">resources.limits</code> в файле <code translate="no">resources.yaml</code>.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. Применить конфигурации<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующую команду, чтобы применить новые конфигурации к кластеру Milvus.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Если параметр <code translate="no">resources.limits</code> не указан, поды будут потреблять все доступные ресурсы процессора и памяти. Поэтому убедитесь, что указаны <code translate="no">resources.requests</code> и <code translate="no">resources.limits</code>, чтобы избежать перераспределения ресурсов, когда другие задачи, выполняющиеся на том же экземпляре, требуют большего потребления памяти.</div>
<p>Дополнительные сведения об управлении ресурсами см. в <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">документации Kubernetes</a>.</p>
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
    </button></h2><ul>
<li>Вам также может быть интересно узнать, как:<ul>
<li><a href="/docs/ru/scaleout.md">Масштабировать кластер Milvus</a></li>
<li><a href="/docs/ru/upgrade_milvus_cluster-operator.md">Обновление кластера Milvus</a></li>
<li><a href="/docs/ru/upgrade_milvus_standalone-operator.md">Обновление Milvus Standalone</a></li>
</ul></li>
<li>Если вы готовы развернуть свой кластер в облаке:<ul>
<li>Узнайте, как <a href="/docs/ru/eks.md">развернуть Milvus на Amazon EKS с помощью Terraform</a>.</li>
<li>Узнайте, как <a href="/docs/ru/gcp.md">развернуть кластер Milvus на GCP с помощью Kubernetes</a></li>
<li>Узнайте, как <a href="/docs/ru/azure.md">развернуть Milvus на Microsoft Azure с помощью Kubernetes</a>.</li>
</ul></li>
</ul>
