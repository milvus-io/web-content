---
id: scale-dependencies.md
title: 規模の依存
---
<h1 id="Scale-Milvus-Dependencies" class="common-anchor-header">Milvusのスケール依存関係<button data-href="#Scale-Milvus-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、MinIO、Kafka、Pulsar、etcdといった様々な依存関係に依存しています。これらのコンポーネントを拡張することで、Milvusの様々な要件への適応性を高めることができます。</p>
<div class="alert note">
<p>Milvus Operatorユーザの方は、<a href="/docs/ja/v2.4.x/object_storage_operator.md">Milvus Operatorによるオブジェクトストレージの構成</a>、<a href="/docs/ja/v2.4.x/meta_storage_operator.md">Milvus Operatorによるメタストレージの構成</a>、<a href="/docs/ja/v2.4.x/message_storage_operator.md">Milvus Operatorによるメッセージストレージの</a>構成を参照してください。</p>
</div>
<h2 id="Scale-MinIO" class="common-anchor-header">MinIOの拡張<button data-href="#Scale-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Increase-resources-per-MinIO-pod" class="common-anchor-header">MinIOポッドあたりのリソースの増加</h3><p>Milvusで使用されるオブジェクトストレージシステムであるMinIOは、ポッドごとにCPUとメモリのリソースを増やすことができます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
minio:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、次のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>また、各MioIO Persistent Volume Claim (PVC)の<code translate="no">spec.resources.requests.storage</code> の値を手動で変更することで、MioIOクラスタのディスク容量を増やすこともできます。デフォルトのストレージクラスでは、ボリュームの拡張を許可する必要があります。</p>
<h3 id="Add-an-extra-MinIO-server-pool-Recommended" class="common-anchor-header">追加のMinIOサーバープールを追加する（推奨）</h3><p>Milvusインスタンスに追加のMioIOサーバープールを追加することをお勧めします。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yam;</span>
minio:
  zones: <span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>これにより、MinIOクラスタに追加のサーバプールが追加され、Milvusは各サーバプールの空きディスク容量に基づいてMinIOサーバプールに書き込むことができるようになります。たとえば、3つのプールのグループに合計10TiBの空き容量があり、各プールに次のように配分されている場合、次のようになります：</p>
<table>
<thead>
<tr><th></th><th>空き容量</th><th>書き込み可能</th></tr>
</thead>
<tbody>
<tr><td>プールA</td><td>3 TiB</td><td>30% (3/10)</td></tr>
<tr><td>プールB</td><td>2 TiB</td><td>20% (2/10)</td></tr>
<tr><td>プールC</td><td>5ティービー</td><td>50% (5/10)</td></tr>
</tbody>
</table>
<div class="alert note">
<p>MinIOは、新しいサーバープール間でオブジェクトのバランスを自動的に調整しません。必要に応じて、<code translate="no">mc admin rebalance</code> 、手動でリバランス手順を開始できます。</p>
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
    </button></h2><h3 id="Increase-resource-per-Kafka-broker-pod" class="common-anchor-header">Kafkaブローカーポッドあたりのリソースの増加</h3><p>各ブローカーポッドのCPUリソースとメモリリソースを調整することで、Kafkaブローカーの容量を拡張します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  resources:
     limits:
        cpu: <span class="hljs-number">2</span>
        memory: 12Gi
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、次のコマンドで変更を適用する：</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>各Kafka Persistent Volume Claim (PVC)の<code translate="no">spec.resources.requests.storage</code> の値を手動で変更することで、Kafkaクラスタのディスク容量を増やすこともできます。デフォルトのストレージクラスがボリュームの拡張を許可していることを確認します。</p>
<h2 id="Add-an-extra-Kafka-broker-pool-Recommended" class="common-anchor-header">追加のKafkaブローカープールを追加する（推奨）<button data-href="#Add-an-extra-Kafka-broker-pool-Recommended" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusインスタンスに追加のKafkaサーバープールを追加することをお勧めします。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
kafka:
  replicaCount: <span class="hljs-number">4</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>これでKafkaクラスタに追加のブローカーが追加されます。</p>
<div class="alert note">
<p>Kafkaはすべてのブローカー間でトピックのバランスを自動的に調整しません。必要に応じて、各Kafkaブローカー・ポッドにログインした後、<code translate="no">bin/kafka-reassign-partitions.sh</code> 。</p>
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
    </button></h2><p>Pulsarは計算とストレージを分離します。Pulsarブローカー（計算）とPulsarブッキー（ストレージ）の容量を個別に増やすことができます。</p>
<h2 id="Increase-resources-per-Pulsar-broker-pod" class="common-anchor-header">Pulsarブローカー・ポッドごとにリソースを増やす<button data-href="#Increase-resources-per-Pulsar-broker-pod" class="anchor-icon" translate="no">
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
<p>ファイルを保存したら、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Increase-resources-per-Pulsar-bookie-pod" class="common-anchor-header">パルサー・ブッキー・ポッドあたりのリソースを増やす<button data-href="#Increase-resources-per-Pulsar-bookie-pod" class="anchor-icon" translate="no">
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
<p>ファイルを保存後、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>各Pulsarブッキーのパーシステント・ボリューム・クレーム（PVC）の<code translate="no">spec.resources.requests.storage</code> 値を手動で変更することで、Pulsarクラスタのディスク容量を増やすこともできます。デフォルトのストレージ・クラスでは、ボリュームの拡張が可能である必要があります。</p>
<p>Pulsarブッキー・ポッドには、<code translate="no">journal</code> と<code translate="no">legers</code> の2種類のストレージがあります。<code translate="no">journal</code> タイプのストレージの場合、ストレージ・クラスとして<code translate="no">ssd</code> または<code translate="no">gp3</code> 。以下は、パルサー・ジャーナルにストレージ・クラスを指定する例です。</p>
<pre><code translate="no">pulsar:
  bookkeeper:
    volumes:
      journal:
        size: 20Gi
        storageClassName: gp3
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-broker-pod" class="common-anchor-header">追加のPulsarブローカー・ポッドを追加する</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  broker:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存したら、以下のコマンドで変更を適用する：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-an-extra-Pulsar-bookie-pod-Recommended" class="common-anchor-header">追加のパルサー・ブッキー・ポッドを追加する（推奨）</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
pulsar:
  bookkeeper:
    replicaCount: <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、以下のコマンドで変更を適用する：</p>
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
    </button></h2><h3 id="Increase-resources-per-etcd-pod-recommended" class="common-anchor-header">etcdポッドあたりのリソースを増やす（推奨）</h3><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  resources:
     limits:
       cpu: <span class="hljs-number">2</span>
       memory: 8Gi
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-extra-etcd-pods" class="common-anchor-header">etcdポッドの追加</h3><p>etcdポッドの総数は奇数でなければなりません。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># new-values.yaml</span>
etcd:
  replicaCount: <span class="hljs-number">5</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイルを保存した後、以下のコマンドで変更を適用します：</p>
<pre><code translate="no" class="language-shell">helm upgrade &lt;milvus-release&gt; --reuse-values -f <span class="hljs-keyword">new</span>-values.<span class="hljs-property">yaml</span> milvus/milvus
<button class="copy-code-btn"></button></code></pre>
