---
id: meta_storage_operator.md
title: Milvus Operatorでメタストレージを設定する
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Milvus Operatorでメタストレージを設定する方法をご紹介します。
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Milvus Operatorでメタストレージを設定する<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはメタデータの保存にetcdを使用します。本トピックでは、Milvus OperatorでMilvusをインストールする際のメタストレージの依存関係の設定方法を紹介します。詳細については、Milvus Operatorリポジトリの「<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Milvus Operatorでメタストレージを設定する</a>」を参照してください。</p>
<p>このトピックでは、Milvus Operatorをデプロイ済みであることを前提としています。</p>
<div class="alert note">詳細については、<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operatorのデプロイを</a>参照してください。 </div>
<p>Milvus Operatorを使用してMilvusクラスタを起動するには、設定ファイルを指定する必要があります。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>サードパーティの依存関係を設定するには、<code translate="no">milvus_cluster_default.yaml</code> のコードテンプレートを編集するだけです。以下のセクションでは、オブジェクト・ストレージ、etcd、Pulsarの設定方法をそれぞれ紹介します。</p>
<h2 id="Configure-etcd" class="common-anchor-header">etcdの構成<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">spec.dependencies.etcd</code> 、必須フィールドを追加してetcdを構成します。</p>
<p><code translate="no">etcd</code> <code translate="no">external</code> および をサポートしています。<code translate="no">inCluster</code></p>
<p>外部etcdサービスの構成に使用されるフィールドには、以下が含まれます：</p>
<ul>
<li><code translate="no">external</code>:<code translate="no">true</code> の値は、Milvus が外部 etcd サービスを使用していることを示します。</li>
<li><code translate="no">endpoints</code>:etcd のエンドポイント。</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">外部 etcd</h3><h4 id="Example" class="common-anchor-header">例</h4><p>次の例では、外部 etcd サービスを設定します。</p>
<pre><code translate="no" class="language-YAML">kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies: <span class="hljs-comment"># Optional</span>
    etcd: <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      external: true <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      endpoints:
      - <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span>:<span class="hljs-number">2379</span>
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">内部etcd</h3><p><code translate="no">inCluster</code> はMilvusクラスタが起動すると、クラスタ内でetcdサービスが自動的に起動することを示します。</p>
<h4 id="Example" class="common-anchor-header">例</h4><p>次の例は内部etcdサービスを設定します。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1alpha1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  dependencies:
    etcd:
      inCluster:
        values:
          replicaCount: 5
          resources:
            limits: 
              cpu: <span class="hljs-string">&#x27;4&#x27;</span>
              memory: 8Gi
            requests:
              cpu: 200m
              memory: 512Mi
  components: {}
  config: {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">前述の例では、レプリカの数を<code translate="no">5</code> 、etcd用の計算リソースを制限しています。</div>
<div class="alert note"><a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yamlで</a>内部etcdサービスを構成するための完全な構成項目を見つけます。<code translate="no">etcd.inCluster.values</code> の下に、前述の例のように必要に応じて構成項目を追加する。</div>
<p>設定ファイルの名前が<code translate="no">milvuscluster.yaml</code> であると仮定して、以下のコマンドを実行して設定を適用します。</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operatorを使用して他のMilvus依存関係を設定する方法については、こちらを参照してください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/object_storage_operator.md">Milvus Operatorによるオブジェクトストレージの設定</a></li>
<li><a href="/docs/ja/v2.4.x/message_storage_operator.md">Milvus Operatorによるメッセージストレージの設定</a></li>
</ul>
