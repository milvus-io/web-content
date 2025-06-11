---
id: scale-dependencies.md
title: 規模依賴性
---

<h1 id="Scale-Milvus-Dependencies" class="common-anchor-header">擴充 Milvus 的相依性<button data-href="#Scale-Milvus-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 依賴各種依賴元件，例如 MinIO、Kafka、Pulsar 和 etcd。擴充這些元件可以增強 Milvus 對不同需求的適應性。</p>
<div class="alert note">
<p>Milvus Operator 使用者請參考使用 Milvus<a href="/docs/zh-hant/v2.5.x/object_storage_operator.md">Operator 配置物件儲存</a>、<a href="/docs/zh-hant/v2.5.x/meta_storage_operator.md">使用 Milvus Operator 配置元儲存</a>，以及<a href="/docs/zh-hant/v2.5.x/message_storage_operator.md">使用</a> Milvus Operator<a href="/docs/zh-hant/v2.5.x/message_storage_operator.md">配置訊息儲存</a>。</p>
</div>
<h2 id="Scale-MinIO" class="common-anchor-header">擴充 MinIO<button data-href="#Scale-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-MinIO-pod" class="common-anchor-header">增加每個 MinIO pod 的資源</h3><p>MinIO 是 Milvus 使用的物件儲存系統，可以增加每個 Pod 的 CPU 和記憶體資源。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
minio:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>您也可以手動變更每個 MioIO Persistent Volume Claim (PVC) 的<code translate="no">spec.resources.requests.storage</code> 值，以增加 MioIO 群集的磁碟容量。請注意，您的預設儲存類別應允許卷擴充。</p>
<h3 id="Add-an-extra-MinIO-server-pool-Recommended" class="common-anchor-header">新增一個額外的 MinIO 伺服器池 (建議)</h3><p>建議您為您的 Milvus 實例新增一個額外的 MioIO 伺服器池。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yam;</span>
minio:
  zones: <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>這會為您的 MinIO 群集新增一個額外的伺服器池，允許 Milvus 根據每個伺服器池的可用磁碟容量寫入 MinIO 伺服器池。舉例來說，如果一組有三個伺服器池，總共有 10 TiB 的可用空間，各伺服器池的分佈如下：</p>
<table>
<thead>
<tr><th></th><th>可用空間</th><th>寫入可能性</th></tr>
</thead>
<tbody>
<tr><td>池 A</td><td>3 TiB</td><td>30% (3/10)</td></tr>
<tr><td>資源池 B</td><td>2 TiB</td><td>20% (2/10)</td></tr>
<tr><td>池 C</td><td>5 TiB</td><td>50% (5/10)</td></tr>
</tbody>
</table>
<div class="alert note">
<p>MinIO 不會在新伺服器池中自動重新平衡物件。如果需要，您可以使用<code translate="no">mc admin rebalance</code> 手動啟動重新平衡程序。</p>
</div>
<h2 id="Kafka" class="common-anchor-header">Kafka<button data-href="#Kafka" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resource-per-Kafka-broker-pod" class="common-anchor-header">增加每個 Kafka 代理 pod 的資源</h3><p>透過調整每個 Kafka 代理 pod 的 CPU 和記憶體資源來增強 Kafka 代理的容量。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  resources:
     limits:
        cpu: <span class="hljs-number">2</span>
        memory: 12Gi
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>您也可以透過手動變更每個 Kafka Persistent Volume Claim (PVC) 的<code translate="no">spec.resources.requests.storage</code> 值來增加 Kafka 群組的磁碟容量。確保您的預設儲存類別允許卷擴充。</p>
<h2 id="Add-an-extra-Kafka-broker-pool-Recommended" class="common-anchor-header">新增額外的 Kafka 代理商池（建議）<button data-href="#Add-an-extra-Kafka-broker-pool-Recommended" class="anchor-icon" translate="no">
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
    </button></h2><p>建議您為 Milvus 實例新增一個額外的 Kafka 伺服器池。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  replicaCount: <span class="hljs-number">4</span>
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>這將會為您的 Kafka 集群新增一個額外的經紀人。</p>
<div class="alert note">
<p>Kafka 不會自動重新平衡所有經紀人的主題。如果需要，請在登入每個 Kafka 代理 pod 之後使用<code translate="no">bin/kafka-reassign-partitions.sh</code> 在所有 Kafka 代理之間手動重新平衡主題/分區。</p>
</div>
<h2 id="Pulsar" class="common-anchor-header">Pulsar<button data-href="#Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar 將計算和儲存分開。您可以獨立增加 Pulsar 代理伺服器（運算）和 Pulsar 帳戶（儲存）的容量。</p>
<h2 id="Increase-resources-per-Pulsar-broker-pod" class="common-anchor-header">增加每個 Pulsar 代理 pod 的資源<button data-href="#Increase-resources-per-Pulsar-broker-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Increase-resources-per-Pulsar-bookie-pod" class="common-anchor-header">增加每個 Pulsar 莊家 pod 的資源<button data-href="#Increase-resources-per-Pulsar-bookie-pod" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    resources:
       limits:
         cpu: <span class="hljs-number">4</span>
         memory: 16Gi
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>您也可以透過手動變更每個 Pulsar 書籤管理員的 Persistent Volume Claim (PVC) 的值<code translate="no">spec.resources.requests.storage</code> 來增加 Pulsar 叢集的磁碟容量。請注意，您的預設儲存類別應允許卷擴充。</p>
<p>Pulsar bookie pod 有兩種儲存類型：<code translate="no">journal</code> 和<code translate="no">legers</code> 。對於<code translate="no">journal</code> 儲存類型，請考慮使用<code translate="no">ssd</code> 或<code translate="no">gp3</code> 作為儲存類別。以下是為 Pulsar 日誌指定儲存類別的範例。</p>
<pre><code translate="no">pulsar:
  bookkeeper:
    volumes:
      journal:
        size: 20Gi
        storageClassName: gp3
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-broker-pod" class="common-anchor-header">新增額外的 Pulsar 代理 pod</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-bookie-pod-Recommended" class="common-anchor-header">新增一個額外的 Pulsar bookie pod (建議)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="etcd" class="common-anchor-header">etcd<button data-href="#etcd" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-etcd-pod-recommended" class="common-anchor-header">增加每個 etcd pod 的資源 (建議)</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-extra-etcd-pods" class="common-anchor-header">增加額外的 etcd pod</h3><p>etcd pod 的總數應為奇數。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  replicaCount: <span class="hljs-number">5</span>
<button class="copy-code-btn"></button></code></pre>
<p>儲存檔案後，使用下列指令套用變更：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
