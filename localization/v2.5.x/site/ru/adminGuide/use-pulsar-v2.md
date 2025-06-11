---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus рекомендует обновить Pulsar до версии 3 для Milvus v2.5.x. Однако если
  вы предпочитаете использовать Pulsar v2, в этой статье мы расскажем вам о том,
  как продолжить работу с Pulsar v2 в Milvus v2.5.x.
title: Использование Pulsar v2 с Milvus v2.5.x
---

<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Использование Pulsar v2 с Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus рекомендует вам обновить Pulsar до версии 3 для работы с Milvus v2.5.x. Подробности см. в разделе <a href="/docs/ru/v2.5.x/upgrade-pulsar-v3.md">Обновление Pulsar</a>. Однако если вы предпочитаете использовать Pulsar v2 с Milvus v2.5.x, в этой статье мы расскажем вам о том, как запустить Milvus v2.5.x с Pulsar v2.</p>
<p>Если у вас уже есть работающий экземпляр Milvus и вы хотите обновить его до версии 2.5.x, но при этом продолжать использовать Pulsar v2, вы можете выполнить шаги, описанные на этой странице.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Продолжение использования Pulsar v2 при обновлении Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе описаны шаги по продолжению использования Pulsar v2 при обновлении запущенного экземпляра Milvus до Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Для пользователей Milvus Operator</h3><p>Milvus Operator по умолчанию совместим с обновлениями Pulsar v2. Вы можете обновить свой экземпляр Milvus до версии 2.5.x, обратившись к разделу <a href="/docs/ru/v2.5.x/upgrade_milvus_cluster-operator.md">Обновление кластера Milvus с помощью Milvus Operator</a>.</p>
<p>После завершения обновления вы сможете продолжить использовать Pulsar v2 с экземпляром Milvus.</p>
<h3 id="For-Helm-users" class="common-anchor-header">Для пользователей Helm</h3><p>Перед обновлением убедитесь, что</p>
<ul>
<li><p>Ваша версия Helm выше v3.12, рекомендуется использовать последнюю версию.</p>
<p>Для получения дополнительной информации см. раздел <a href="https://helm.sh/docs/intro/install/">Установка Helm</a>.</p></li>
<li><p>Ваша версия Kubernetes выше v1.20.</p></li>
</ul>
<p>Операции, описанные в этой статье, предполагают, что:</p>
<ul>
<li><p>Milvus был установлен в пространстве имен <code translate="no">default</code>.</p></li>
<li><p>Название релиза Milvus - <code translate="no">my-release</code>.</p></li>
</ul>
<p>Перед обновлением Milvus необходимо изменить файл <code translate="no">values.yaml</code>, чтобы указать версию Pulsar как v2. Для этого необходимо выполнить следующие действия:</p>
<ol>
<li><p>Получите текущий файл <code translate="no">values.yaml</code> вашего экземпляра Milvus.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Отредактируйте файл <code translate="no">values.yaml</code>, чтобы указать версию Pulsar как v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>Для <code translate="no">image</code> измените <code translate="no">tag</code> на желаемую версию Milvus (например, <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Обновите таблицу Milvus Helm.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Обновление экземпляра Milvus.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Создание нового экземпляра Milvus с помощью Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом разделе описаны шаги по созданию нового экземпляра Milvus с помощью Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Для пользователей Milvus Operator</h3><p>Перед развертыванием Milvus v2.5.x необходимо загрузить и отредактировать файл Milvus Customer Resource Definition (CRD). Подробнее о том, как установить Milvus с помощью Milvus Operator, читайте в разделе <a href="/docs/ru/v2.5.x/install_cluster-milvusoperator.md">Установка кластера Milvus с помощью Milvus Operator</a>.</p>
<ol>
<li><p>Загрузите файл CRD.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Отредактируйте файл <code translate="no">milvus_cluster_default.yaml</code>, чтобы указать версию Pulsar как v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
  <span class="hljs-attr">labels</span>:
    <span class="hljs-attr">app</span>: milvus
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">mode</span>: cluster
  <span class="hljs-attr">dependencies</span>:
    <span class="hljs-attr">pulsar</span>:
      <span class="hljs-attr">inCluster</span>:
        <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>Для <code translate="no">dependencies</code> измените <code translate="no">pulsar.inCluster.chartVersion</code> на <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Продолжите шаги в разделе <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">"Установка Milvus Cluster с Milvus Operator"</a>, чтобы развернуть Milvus v2.5.x с Pulsar v2, используя отредактированный CRD-файл.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Для пользователей Helm</h3><p>Перед развертыванием Milvus v2.5.x можно либо подготовить файл <code translate="no">values.yaml</code>, либо использовать встроенные параметры для указания версии Pulsar. Подробнее о том, как установить Milvus с помощью Helm, см. в разделе <a href="/docs/ru/v2.5.x/install_cluster-helm.md">Установка кластера Milvus с помощью Helm</a>.</p>
<ul>
<li><p>Используйте встроенные параметры, чтобы указать версию Pulsar как v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Используйте файл <code translate="no">values.yaml</code>, чтобы указать версию Pulsar как v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем разверните Milvus v2.5.x с Pulsar v2 с помощью файла <code translate="no">values.yaml</code>.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
