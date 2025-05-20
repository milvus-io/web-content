---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 'Узнайте, как обновить кластер Milvus с помощью Milvus Operator.'
title: Обновление кластера Milvus с помощью Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/ru/v2.4.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/ru/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Обновление кластера Milvus с помощью Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве описано, как обновить кластер Milvus с помощью Milvus Operator.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Обновление оператора Milvus<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Выполните следующую команду, чтобы обновить версию вашего Milvus Operator до v1.1.9.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>После обновления оператора Milvus до последней версии у вас будут следующие возможности:</p>
<ul>
<li>Чтобы обновить Milvus с версии 2.2.3 или более поздних выпусков до версии 2.4.23, вы можете <a href="#Conduct-a-rolling-upgrade">провести скользящее обновление</a>.</li>
<li>Чтобы обновить Milvus с минорного выпуска до v2.2.3 до 2.4.23, рекомендуется <a href="#Upgrade-Milvus-by-changing-its-image">обновить Milvus, изменив версию образа</a>.</li>
<li>Чтобы обновить Milvus с v2.1.x до 2.4.23, необходимо <a href="#Migrate-the-metadata">перенести метаданные</a> до фактического обновления.</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Проведение скользящего обновления<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Начиная с Milvus 2.2.3, вы можете настроить координаторы Milvus на работу в режиме активного ожидания и включить для них функцию скользящего обновления, чтобы Milvus мог отвечать на входящие запросы во время обновления координаторов. В предыдущих выпусках координаторы должны были удаляться, а затем создаваться во время обновления, что могло привести к некоторому простою службы.</p>
<p>Основываясь на возможностях скользящего обновления, предоставляемых Kubernetes, оператор Milvus обеспечивает упорядоченное обновление развертываний в соответствии с их зависимостями. Кроме того, Milvus реализует механизм, гарантирующий, что его компоненты останутся совместимыми с теми, которые зависят от них во время обновления, что значительно сокращает потенциальное время простоя сервиса.</p>
<p>По умолчанию функция скользящего обновления отключена. Вам необходимо явно включить ее через конфигурационный файл.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingUpgrade <span class="hljs-comment"># Default value, can be omitted</span>
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>В приведенном выше файле конфигурации установите <code translate="no">spec.components.enableRollingUpdate</code> на <code translate="no">true</code> и установите <code translate="no">spec.components.image</code> на нужную версию Milvus.</p>
<p>По умолчанию Milvus выполняет обновление координаторов в упорядоченном порядке, заменяя образы капсул координаторов один за другим. Чтобы сократить время обновления, установите <code translate="no">spec.components.imageUpdateMode</code> на <code translate="no">all</code>, чтобы Milvus заменял все образы стручков одновременно.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: all
    image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете установить <code translate="no">spec.components.imageUpdateMode</code> на <code translate="no">rollingDowngrade</code>, чтобы Milvus заменял образы координаторов более низкой версией.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-old-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Затем сохраните свою конфигурацию в виде YAML-файла (например, <code translate="no">milvusupgrade.yaml</code>) и подключите этот файл конфигурации к экземпляру Milvus следующим образом:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Обновление Milvus путем изменения его образа<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>В обычных случаях вы можете просто обновить свой Milvus до последней версии, изменив его образ. Однако учтите, что при обновлении Milvus таким способом будет наблюдаться определенное время простоя.</p>
<p>Создайте конфигурационный файл следующим образом и сохраните его под именем <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>Затем выполните следующие действия, чтобы выполнить обновление:</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Перенос метаданных<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Начиная с Milvus 2.2.0, метаданные несовместимы с метаданными предыдущих выпусков. Следующие фрагменты примеров предполагают обновление с Milvus 2.1.4 до Milvus 2.4.23.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Создание файла <code translate="no">.yaml</code> для миграции метаданных</h3><p>Создайте файл миграции метаданных. Ниже приведен пример. В файле конфигурации необходимо указать <code translate="no">name</code>, <code translate="no">sourceVersion</code> и <code translate="no">targetVersion</code>. Следующий пример устанавливает <code translate="no">name</code> в <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> в <code translate="no">v2.1.4</code>, а <code translate="no">targetVersion</code> в <code translate="no">v2.4.23</code>. Это означает, что ваш кластер Milvus будет обновлен с версии 2.1.4 до версии 2.4.23.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: <span class="hljs-string">&quot;v2.1.4&quot;</span>
  targetVersion: <span class="hljs-string">&quot;v2.4.23&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.4.23&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Примените новую конфигурацию</h3><p>Выполните следующую команду, чтобы создать новую конфигурацию.</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Проверьте состояние миграции метаданных</h3><p>Выполните следующую команду, чтобы проверить статус миграции метаданных.</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>Статус <code translate="no">ready</code> в выводе означает, что миграция метаданных прошла успешно.</p>
<p>Также можно выполнить команду <code translate="no">kubectl get pod</code>, чтобы проверить все поды. Если все капсулы имеют статус <code translate="no">ready</code>, миграция метаданных выполнена успешно.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Удалить <code translate="no">my-release-upgrade</code></h3><p>После успешного обновления удалите <code translate="no">my-release-upgrade</code> в YAML-файле.</p>
