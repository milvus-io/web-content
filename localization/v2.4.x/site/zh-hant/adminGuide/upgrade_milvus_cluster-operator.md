---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 學習如何使用 Milvus Operator 升級 Milvus 集群。
title: 使用 Milvus Operator 升級 Milvus 集群
---
<div class="tab-wrapper"><a href="/docs/zh-hant/v2.4.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/zh-hant/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">使用 Milvus Operator 升級 Milvus 集群<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南描述如何使用 Milvus Operator 升級您的 Milvus 集群。</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">升級你的 Milvus 操作員<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>執行以下指令，將您的 Milvus Operator 版本升級至 v1.1.9。</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>將您的 Milvus 操作員升級到最新版本後，您有以下選擇：</p>
<ul>
<li>要將 Milvus 從 v2.2.3 或更高版本升級到 2.4.23，您可以<a href="#Conduct-a-rolling-upgrade">進行滾動升級</a>。</li>
<li>要將 Milvus 從 v2.2.3 之前的次要版本升級到 2.4.23，建議您<a href="#Upgrade-Milvus-by-changing-its-image">通過更改映像版本來升級 Milvus</a>。</li>
<li>要將 Milvus 從 v2.1.x 升級到 2.4.23，您需要在實際升級前<a href="#Migrate-the-metadata">遷移 metadata</a>。</li>
</ul>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">進行滾動升級<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.3 起，您可以設定 Milvus 協調器工作在主動待命模式，並啟用它們的滾動升級功能，以便 Milvus 可以在協調器升級期間回應傳入的請求。在之前的版本中，協調器需要在升級過程中移除，然後再建立，這可能會導致服務出現一定的停機時間。</p>
<p>基於 Kubernetes 提供的滾動更新功能，Milvus 操作者會根據部署的依賴關係，強制執行部署的有序更新。此外，Milvus 實作了一套機制，以確保其元件在升級過程中與依賴元件的系統保持相容，大幅減少潛在的服務停機時間。</p>
<p>預設關閉了滾動升級功能。您需要通過配置文件明確地啟用它。</p>
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
<p>在上述配置文件中，將<code translate="no">spec.components.enableRollingUpdate</code> 設定為<code translate="no">true</code> ，並將<code translate="no">spec.components.image</code> 設定為所需的 Milvus 版本。</p>
<p>預設情況下，Milvus 會以有序的方式為協調器執行滾動升級，其中會逐一取代協調器 pod 映像檔。若要減少升級時間，請考慮將<code translate="no">spec.components.imageUpdateMode</code> 設為<code translate="no">all</code> ，讓 Milvus 在同一時間取代所有 Pod 影像。</p>
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
<p>您可以將<code translate="no">spec.components.imageUpdateMode</code> 設為<code translate="no">rollingDowngrade</code> ，讓 Milvus 以較低的版本取代協調器 Pod 影像。</p>
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
<p>然後將您的設定儲存為 YAML 檔案 (例如<code translate="no">milvusupgrade.yaml</code>)，並將此設定檔修補到您的 Milvus 實例，如下所示：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">透過變更 Milvus 的映像來升級它<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>在一般情況下，您可以簡單地透過改變映像檔，將您的 Milvus 更新到最新版本。然而，請注意，以這種方式升級 Milvus 時會有一定的停機時間。</p>
<p>編譯如下配置檔，並將其保存為<strong>milvusupgrade.yaml</strong>：</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre>
<p>然後執行以下步驟來執行升級：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">遷移元資料<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.0 起，元資料與先前版本不相容。以下示例片段假設從 Milvus 2.1.4 升級到 Milvus 2.4.23。</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1.建立<code translate="no">.yaml</code> 檔案進行元資料遷移</h3><p>建立一個元資料遷移檔案。以下是一個範例。您需要在設定檔中指定<code translate="no">name</code>,<code translate="no">sourceVersion</code>, 和<code translate="no">targetVersion</code> 。以下範例將<code translate="no">name</code> 設定為<code translate="no">my-release-upgrade</code>,<code translate="no">sourceVersion</code> 設定為<code translate="no">v2.1.4</code>,<code translate="no">targetVersion</code> 設定為<code translate="no">v2.4.23</code> 。這表示您的 Milvus 集群將從 v2.1.4 升級到 v2.4.23。</p>
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
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2.套用新設定</h3><p>執行下列指令建立新的配置。</p>
<pre><code translate="no">$ kubectl create -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3.檢查元資料遷移的狀態</h3><p>執行下列指令檢查元資料遷移的狀態。</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>輸出中的狀態<code translate="no">ready</code> 表示元資料遷移成功。</p>
<p>或者，您也可以執行<code translate="no">kubectl get pod</code> 來檢查所有的 Pod。如果所有的 pod 都是<code translate="no">ready</code> ，則表示元資料遷移成功。</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4.刪除<code translate="no">my-release-upgrade</code></h3><p>升級成功後，刪除 YAML 檔案中的<code translate="no">my-release-upgrade</code> 。</p>
