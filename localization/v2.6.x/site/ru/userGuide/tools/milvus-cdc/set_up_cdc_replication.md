---
id: set_up_cdc_replication.md
summary: >-
  Узнайте, как развернуть два кластера Milvus и настроить CDC-репликацию между
  ними.
title: Настройка CDC-репликации
---
<h1 id="Set-Up-CDC-Replication" class="common-anchor-header">Настройка CDC-репликации<button data-href="#Set-Up-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве показано, как развернуть два автономных кластера Milvus с помощью Milvus Operator и настроить CDC-репликацию с исходного кластера на целевой.</p>
<p>В примерах используется:</p>
<ul>
<li><code translate="no">source-cluster</code> в качестве основного кластера.</li>
<li><code translate="no">target-cluster</code> в качестве резервного кластера.</li>
<li><code translate="no">milvus</code> в качестве пространства имен для кластеров Milvus.</li>
<li><code translate="no">milvus-operator</code> в качестве пространства имен для Milvus Operator.</li>
</ul>
<p>Прежде чем приступить к работе, прочитайте статью <a href="/docs/ru/v2.6.x/milvus_cdc_overview.md">Milvus CDC</a>, чтобы понять модель основного и резервного кластеров и варианты обхода отказа.</p>
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
<li>Milvus v2.6.16 или более поздняя версия.</li>
<li>Milvus Operator v1.3.4 или более поздняя версия.</li>
<li>Доступен кластер Kubernetes.</li>
<li>Исходный и целевой кластеры могут подключаться друг к другу по сети.</li>
<li>У вас есть учетные данные администратора для обоих кластеров Milvus.</li>
<li>Вы знаете количество физических каналов для каждого кластера.</li>
</ul>
<h2 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">Шаг 1: Обновление Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Добавьте репозиторий Milvus Operator Helm:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
<button class="copy-code-btn"></button></code></pre>
<p>Обновите репозиторий:</p>
<pre><code translate="no" class="language-bash">helm repo update zilliztech-milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Установите или обновите Milvus Operator:</p>
<pre><code translate="no" class="language-bash">helm -n milvus-operator upgrade --install milvus-operator \
  zilliztech-milvus-operator/milvus-operator \
  --create-namespace
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что операторская капсула запущена:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Пример вывода:</p>
<pre><code translate="no" class="language-text">NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-6f7d8c9c7d-xm4tj   1/1     Running   0          54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Deploy-the-Source-Cluster" class="common-anchor-header">Шаг 2: Развертывание исходного кластера<button data-href="#Step-2-Deploy-the-Source-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте файл с именем <code translate="no">milvus_source_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">source-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Примените конфигурацию:</p>
<pre><code translate="no" class="language-bash">kubectl create namespace milvus
kubectl apply -f milvus_source_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Проверьте, что стручки исходного кластера запущены:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p>Пример вывода:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
source-cluster-etcd-0                                  1/1     Running   0          3m
source-cluster-minio-6d8f7d9b9f-9t7j2                  1/1     Running   0          3m
source-cluster-milvus-standalone-7f8d9c8f6d-r2m5x      1/1     Running   0          2m
source-cluster-milvus-cdc-66d64747bd-sckxj             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что стручок CDC, например <code translate="no">source-cluster-milvus-cdc-...</code>, находится в состоянии <code translate="no">Running</code>.</p>
<h2 id="Step-3-Deploy-the-Target-Cluster" class="common-anchor-header">Шаг 3: Развертывание целевого кластера<button data-href="#Step-3-Deploy-the-Target-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте файл с именем <code translate="no">milvus_target_cluster.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">target-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Компонент CDC включен и на целевом кластере. Он бездействует, пока целевой кластер является резервным, но он необходим, если целевой кластер впоследствии станет основным после переключения.</p>
<p>Примените конфигурацию:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_target_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что капсулы целевого кластера запущены:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus | grep -E <span class="hljs-string">&#x27;NAME|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Пример вывода:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
target-cluster-etcd-0                                  1/1     Running   0          3m
target-cluster-minio-5f7c8d9b6f-k8s2q                  1/1     Running   0          3m
target-cluster-milvus-standalone-66dc8d9f7f-5n6bp      1/1     Running   0          2m
target-cluster-milvus-cdc-7f8c9d6b8c-q4t9m             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-Cluster-Information" class="common-anchor-header">Шаг 4: Подготовка информации о кластере<button data-href="#Step-4-Prepare-Cluster-Information" class="anchor-icon" translate="no">
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
    </button></h2><p>Получите адреса служб Milvus для обоих кластеров:</p>
<pre><code translate="no" class="language-bash">kubectl get svc -n milvus | grep -E <span class="hljs-string">&#x27;NAME|source-cluster|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Пример вывода:</p>
<pre><code translate="no" class="language-text">NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
source-cluster-milvus                 ClusterIP   10.98.124.90     &lt;none&gt;        19530/TCP,9091/TCP   8m
target-cluster-milvus                 ClusterIP   10.109.234.172   &lt;none&gt;        19530/TCP,9091/TCP   3m
<button class="copy-code-btn"></button></code></pre>
<p>Подготовьте два типа адресов:</p>
<ul>
<li>Адреса кластеров записываются в конфигурацию репликации и используются компонентами CDC. Эти адреса должны быть достижимы из стручков CDC.</li>
<li>Адреса клиентов используются только вашим Python-клиентом при вызове Milvus API. Если вы запускаете Python-клиент вне кластера Kubernetes, откройте сервисы Milvus через обычный метод доступа, например, через балансировщик нагрузки, ингресс или порт-форвард.</li>
</ul>
<p>Подготовьте информацию о подключении и списки pchannel для обоих кластеров:</p>
<pre><code translate="no" class="language-python">source_cluster_addr = <span class="hljs-string">&quot;http://source-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>
target_cluster_addr = <span class="hljs-string">&quot;http://target-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>

source_client_addr = source_cluster_addr
target_client_addr = target_cluster_addr

<span class="hljs-comment"># If your Python client runs outside the Kubernetes cluster, replace only</span>
<span class="hljs-comment"># source_client_addr and target_client_addr with externally reachable addresses.</span>
<span class="hljs-comment"># Keep source_cluster_addr and target_cluster_addr reachable from CDC pods.</span>
<span class="hljs-comment"># For example:</span>
<span class="hljs-comment"># source_client_addr = &quot;http://127.0.0.1:19530&quot;</span>
<span class="hljs-comment"># target_client_addr = &quot;http://127.0.0.1:19531&quot;</span>

source_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>
target_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>

source_cluster_id = <span class="hljs-string">&quot;source-cluster&quot;</span>
target_cluster_id = <span class="hljs-string">&quot;target-cluster&quot;</span>

pchannel_num = <span class="hljs-number">16</span>
source_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{source_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
target_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{target_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
<button class="copy-code-btn"></button></code></pre>
<p>Замените адреса на реальные адреса служб Milvus в вашей среде. Не устанавливайте <code translate="no">source_cluster_addr</code> или <code translate="no">target_cluster_addr</code> на локальный адрес переадресации, если только стручки CDC не могут также обращаться к этому адресу. Список pchannel должен соответствовать вашему развертыванию Milvus. Не копируйте значения из примера, не проверив конфигурацию своего кластера.</p>
<h2 id="Step-5-Create-the-Replication-Configuration" class="common-anchor-header">Шаг 5: Создание конфигурации репликации<button data-href="#Step-5-Create-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте конфигурацию репликации с <code translate="no">source-cluster</code> на <code translate="no">target-cluster</code>:</p>
<pre><code translate="no" class="language-python">replicate_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: source_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: source_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: source_cluster_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: target_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: target_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: target_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: target_cluster_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: target_cluster_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-6-Apply-the-Replication-Configuration" class="common-anchor-header">Шаг 6: Примените конфигурацию репликации<button data-href="#Step-6-Apply-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Примените одну и ту же конфигурацию к обоим кластерам:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

source_client = MilvusClient(
    uri=source_client_addr,
    token=source_cluster_token,
)
target_client = MilvusClient(
    uri=target_client_addr,
    token=target_cluster_token,
)

<span class="hljs-keyword">try</span>:
    source_client.update_replicate_configuration(**replicate_config)
    target_client.update_replicate_configuration(**replicate_config)
<span class="hljs-keyword">finally</span>:
    source_client.close()
    target_client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Для автоматизации производства используйте отдельные короткоживущие клиенты для этой операции в плоскости управления. Это позволит избежать совместного использования одного и того же канала gRPC с трафиком DML приложений во время смены роли кластера.</p>
<p>После применения конфигурации изменения, записанные на <code translate="no">source-cluster</code>, реплицируются на <code translate="no">target-cluster</code>.</p>
<h2 id="Step-7-Verify-Data-Replication" class="common-anchor-header">Шаг 7: Проверка репликации данных<button data-href="#Step-7-Verify-Data-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы проверить, что репликация работает:</p>
<ol>
<li>Подключитесь к <code translate="no">source-cluster</code>.</li>
<li>Создайте коллекцию.</li>
<li>Вставьте данные в коллекцию.</li>
<li>Загрузите коллекцию и выполните запрос или поиск на <code translate="no">source-cluster</code>.</li>
<li>Подключитесь к <code translate="no">target-cluster</code>.</li>
<li>Запустите тот же запрос или поиск на <code translate="no">target-cluster</code> без ручной загрузки коллекции на резервном кластере.</li>
<li>Убедитесь, что ожидаемые данные видны на обоих кластерах.</li>
</ol>
<p>В этой топологии целевой кластер является резервным. Не выполняйте ручные операции DDL или DCL, такие как <code translate="no">load_collection</code>, на резервном кластере. Эти операции должны выполняться на исходном кластере и реплицироваться на целевой кластер.</p>
<p>Точный код проверки зависит от схемы коллекции. Базовый рабочий процесс создания коллекции Milvus см. в документации по быстрому запуску Milvus.</p>
<h2 id="CDC-Lag" class="common-anchor-header">Задержка CDC<button data-href="#CDC-Lag" class="anchor-icon" translate="no">
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
    </button></h2><p>Задержка CDC - это окно данных между основным и резервным кластерами. Его необходимо постоянно контролировать после настройки репликации.</p>
<p>Задержка CDC может увеличиться, если:</p>
<ul>
<li>Высокая скорость записи в основной кластер.</li>
<li>Между кластерами увеличивается сетевая задержка или потеря пакетов.</li>
<li>Резервный кластер перегружен.</li>
<li>Узлы CDC недостаточно обеспечены ресурсами.</li>
<li>Выполняются большие операции DDL или импорта.</li>
</ul>
<p>Используйте задержку CDC для принятия оперативных решений:</p>
<ul>
<li>Если задержка низкая, переключение должно происходить быстрее.</li>
<li>Если задержка велика, при обходе отказа может быть потеряно больше данных.</li>
</ul>
<p>Оценить задержку CDC можно с помощью следующего запроса PromQL:</p>
<pre><code translate="no" class="language-promql">clamp_min(
  max by (channel_name) (
    milvus_wal_last_confirmed_time_tick
  )
  -
  min by (channel_name) (
    milvus_cdc_last_replicated_time_tick
  ),
  0
)
</code></pre>
<p>Результат выражается в секундах. Для каждого канала источника запрос сравнивает последний подтвержденный временной интервал WAL с последним временным интервалом, реплицированным CDC. Если основной канал реплицируется на несколько резервных кластеров, выражение <code translate="no">min by (channel_name)</code> сообщает о самом медленном прогрессе репликации для этого канала.</p>
<p>Если Prometheus обследует несколько кластеров Milvus, добавьте фильтры меток, соответствующие вашему развертыванию, например <code translate="no">namespace</code> или <code translate="no">app_kubernetes_io_instance</code>, чтобы избежать смешивания метрик из разных кластеров.</p>
<h2 id="FAQ" class="common-anchor-header">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="common-anchor-header">Нужно ли вызывать <code translate="no">update_replicate_configuration</code> на обоих кластерах?<button data-href="#Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Да. Примените одинаковую топологию ко всем участвующим кластерам. Если один из кластеров не является основным на момент вызова, он подождет, пока топология не будет применена через CDC.</p>
<h3 id="How-should-I-choose-clusterid" class="common-anchor-header">Как выбрать <code translate="no">cluster_id</code>?<button data-href="#How-should-I-choose-clusterid" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте стабильный, уникальный идентификатор для каждого кластера. Идентификатор также используется в именах pchannel и ссылках на топологию репликации.</p>
<h3 id="Can-I-change-pchannels-after-replication-is-configured" class="common-anchor-header">Можно ли изменить pchannels после настройки репликации?<button data-href="#Can-I-change-pchannels-after-replication-is-configured" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы можете обновлять топологию, но список pchannel должен соответствовать схеме кластера. Относитесь к изменению pchannel как к продвинутой операции и тщательно проверяйте репликацию после этого.</p>
