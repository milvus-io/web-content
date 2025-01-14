---
id: meta_storage_operator.md
title: 使用 Milvus Operator 設定元資料儲存
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 學習如何使用 Milvus Operator 設定元儲存。
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 設定元資料儲存<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 etcd 來儲存元資料。本主題介紹當安裝 Milvus 與 Milvus Operator 時，如何設定 meta 儲存的依賴性。如需詳細資訊，請參閱 Milvus Operator 套件庫中的<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Configure Meta Storage with Milvus</a>Operator。</p>
<p>本主題假設您已部署 Milvus Operator。</p>
<div class="alert note">請參閱<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">部署 Milvus Operator</a>以取得更多資訊。 </div>
<p>您需要指定使用 Milvus Operator 啟動 Milvus 叢集的設定檔。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您只需編輯<code translate="no">milvus_cluster_default.yaml</code> 中的程式碼模板，即可設定第三方依賴。以下各節將分別介紹如何設定物件儲存、etcd 和 Pulsar。</p>
<h2 id="Configure-etcd" class="common-anchor-header">設定 etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">spec.dependencies.etcd</code> 下新增必填欄位，以設定 etcd。</p>
<p><code translate="no">etcd</code> 支持 和 。<code translate="no">external</code> <code translate="no">inCluster</code></p>
<p>用於配置外部 etcd 服務的欄位包括：</p>
<ul>
<li><code translate="no">external</code>:<code translate="no">true</code> 值表示 Milvus 使用外部 etcd 服務。</li>
<li><code translate="no">endpoints</code>:etcd 的端點。</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">外部 etcd</h3><h4 id="Example" class="common-anchor-header">範例</h4><p>下面的示例配置了外部 etcd 服務。</p>
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
<h3 id="Internal-etcd" class="common-anchor-header">內部 etcd</h3><p><code translate="no">inCluster</code> 表示當 Milvus 集群啟動時，etcd 服務會在集群中自動啟動。</p>
<h4 id="Example" class="common-anchor-header">範例</h4><p>下面的示例配置了內部 etcd 服務。</p>
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
<div class="alert note">前面的示例指定了副本的數量為<code translate="no">5</code> ，並限制了 etcd 的計算資源。</div>
<div class="alert note">在<a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a> 中查找配置内部 etcd 服务的完整配置项。如上例所示，在<code translate="no">etcd.inCluster.values</code> 下按需要添加配置项。</div>
<p>假設配置檔名為<code translate="no">milvuscluster.yaml</code> ，執行下列指令套用配置。</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>學習如何使用 Milvus Operator 配置其他 Milvus 相依性：</p>
<ul>
<li><a href="/docs/zh-hant/object_storage_operator.md">使用 Milvus Operator 配置物件儲存</a></li>
<li><a href="/docs/zh-hant/message_storage_operator.md">使用 Milvus Operator 配置訊息儲存</a></li>
</ul>
