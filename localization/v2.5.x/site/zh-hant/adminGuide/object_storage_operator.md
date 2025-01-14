---
id: object_storage_operator.md
title: 使用 Milvus Operator 設定物件儲存
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 瞭解如何使用 Milvus Operator 設定物件儲存。
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 設定物件儲存<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 MinIO 或 S3 作為物件儲存，以持久化大型檔案，例如索引檔案和二進位日誌。本主題介紹當您使用 Milvus Operator 安裝 Milvus 時，如何設定物件儲存的依賴性。如需詳細資訊，請參閱 Milvus Operator 資源庫中的<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Configure Object Storage with Milvus</a>Operator。</p>
<p>本主題假設您已部署 Milvus Operator。</p>
<div class="alert note">請參閱<a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">部署 Milvus Operator</a>以取得更多資訊。 </div>
<p>您需要指定使用 Milvus Operator 啟動 Milvus 叢集的設定檔。</p>
<pre><code translate="no" class="language-YAML">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您只需編輯<code translate="no">milvus_cluster_default.yaml</code> 中的程式碼模板，即可設定第三方依賴。以下各節將分別介紹如何設定物件儲存、etcd 及 Pulsar。</p>
<h2 id="Configure-object-storage" class="common-anchor-header">設定物件儲存<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 集群使用 MinIO 或 S3 作為物件儲存，以持久化大型檔案，例如索引檔案和二進位日誌。在<code translate="no">spec.dependencies.storage</code> 下添加必填字段以配置对象存储，可能的选项是<code translate="no">external</code> 和<code translate="no">inCluster</code> 。</p>
<h3 id="Internal-object-storage" class="common-anchor-header">內部物件儲存</h3><p>預設情況下，Milvus Operator 會為 Milvus 部署集群內 MinIO。以下是一個配置範例，示範如何使用此 MinIO 作為內部物件儲存。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    <span class="hljs-comment"># Omit other fields ...</span>
    storage:
      inCluster:
        values:
          mode: standalone
          resources:
            requests:
              memory: 100Mi
        deletionPolicy: Delete <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        pvcDeletion: true <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>應用上述配置後，叢集內 MinIO 將以獨立模式執行，記憶體上限為 100Mi。請注意</p>
<ul>
<li><p><code translate="no">deletionPolicy</code> 欄位指定集群內 MinIO 的刪除政策。它預設為<code translate="no">Delete</code> ，並有<code translate="no">Retain</code> 作為替代選項。</p>
<ul>
<li><code translate="no">Delete</code> 表示群集內物件儲存會在您停止 Milvus 範例時刪除。</li>
<li><code translate="no">Retain</code> 表示群集內物件儲存會保留為依賴服務，供您稍後啟動 Milvus 範例時使用。</li>
</ul></li>
<li><p><code translate="no">pvcDeletion</code> 欄位指定當叢集內 MinIO 刪除時，是否刪除 PVC(Persistent Volume Claim)。</p></li>
</ul>
<p><code translate="no">inCluster.values</code> 下的欄位與 Milvus Helm Chart 中的相同，您可以<a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">在這裡</a>找到。</p>
<h3 id="External-object-storage" class="common-anchor-header">外部物件儲存</h3><p>在模板 YAML 檔案中使用<code translate="no">external</code> 表示使用外部物件儲存服務。要使用外部物件儲存，您需要在 Milvus CRD 中正確設定<code translate="no">spec.dependencies.storage</code> 和<code translate="no">spec.config.minio</code> 下的欄位。</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">使用 Amazon Web Service (AWS) S3 作為外部物件儲存空間</h4><ul>
<li><p>透過 AK/SK 設定 AWS S3 存取權限</p>
<p>通常可透過存取金鑰和存取秘鑰的一對來存取 S3 儲存桶。您可以建立<code translate="no">Secret</code> 物件，將它們儲存在 Kubernetes 中，如下所示：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-s3-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>然後您可以設定 AWS S3 儲存桶作為外部物件儲存：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      <span class="hljs-comment"># your bucket name</span>
      bucketName: &lt;my-bucket&gt;
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      rootPath: milvus/my-release
      useSSL: true
  dependencies:
    storage:
      <span class="hljs-comment"># enable external object storage</span>
      external: true
      <span class="hljs-built_in">type</span>: S3 <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      endpoint: s3.amazonaws.com:<span class="hljs-number">443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      secretRef: <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>透過 AssumeRole 配置 AWS S3 存取權限</p>
<p>另外，您也可以讓 Milvus 使用<a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a> 存取您的 AWS S3 收件匣，如此一來，只涉及臨時憑證，而非您實際的 AK/SK。</p>
<p>如果這是您的選擇，您需要在 AWS 主控台上準備一個角色，並取得它的 ARN，通常是<code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code> 的形式。</p>
<p>然後建立<code translate="no">ServiceAccount</code> 物件，將它儲存在您的 Kubernetes 中，如下所示：</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    eks.amazonaws.com/role-arn: &lt;my-role-arn&gt;
<button class="copy-code-btn"></button></code></pre>
<p>一切就緒後，在範本 YAML 檔案中參考上述<code translate="no">ServiceAccount</code> ，並將<code translate="no">spec.config.minio.useIAM</code> 設為<code translate="no">true</code> ，以啟用 AssumeRole。</p>
<pre><code translate="no" class="language-YAML">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...</span>
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># Note: you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      endpoint: s3.&lt;my-bucket-region&gt;.amazonaws.com:<span class="hljs-number">443</span>
      secretRef: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">使用 Google Cloud Storage (GCS) 作為外部物件儲存</h4><p>AWS S3 物件儲存並非唯一的選擇。您也可以使用其他公有雲供應商的物件儲存服務，例如 Google Cloud。</p>
<ul>
<li><p>透過 AK/SK 設定 GCS 存取權限</p>
<p>配置大多與使用 AWS S3 相似。您仍需要建立<code translate="no">Secret</code> 物件，以便在 Kubernetes 中儲存憑證。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: v1
kind: Secret
metadata:
  name: my-release-gcp-secret
<span class="hljs-built_in">type</span>: Opaque
stringData:
  accesskey: &lt;my-access-key&gt;
  secretkey: &lt;my-secret-key&gt;
<button class="copy-code-btn"></button></code></pre>
<p>然後，您只需要將<code translate="no">endpoint</code> 改為<code translate="no">storage.googleapis.com:443</code> ，並將<code translate="no">spec.config.minio.cloudProvider</code> 設定為<code translate="no">gcp</code> ，如下所示：</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  config:
    minio:
      cloudProvider: gcp
  dependencies:
    storage:
      <span class="hljs-comment"># Omit other fields ...</span>
      endpoint: storage.googleapis.com:<span class="hljs-number">443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>透過 AssumeRole 設定 GCS 存取權限</p>
<p>與 AWS S3 相似，如果您使用 GKE 作為 Kubernetes 叢集，您也可以使用<a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a>以臨時憑證存取 GCS。</p>
<p><code translate="no">ServiceAccount</code> 的註解與 AWS EKS 不同。您需要指定 GCP 服務帳號名稱，而非角色 ARN。</p>
<pre><code translate="no" class="language-YAML">apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-release-sa
  annotations:
    iam.gke.io/gcp-service-account: &lt;my-gcp-service-account-name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>然後，您可以設定您的 Milvus 實例使用上述<code translate="no">ServiceAccount</code> ，並透過設定<code translate="no">spec.config.minio.useIAM</code> 至<code translate="no">true</code> 來啟用 AssumeRole，如下所示：</p>
<pre><code translate="no" class="language-YAML">labels:
    app: milvus
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
    <span class="hljs-comment"># use the above ServiceAccount</span>
    serviceAccountName: my-release-sa
  config:
    minio:
      cloudProvider: gcp
      <span class="hljs-comment"># enable AssumeRole</span>
      useIAM: true
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
<li><a href="/docs/zh-hant/meta_storage_operator.md">使用 Milvus Operator 配置元存儲</a></li>
<li><a href="/docs/zh-hant/message_storage_operator.md">使用 Milvus Operator 配置消息存儲</a></li>
</ul>
