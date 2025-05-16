---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: 學習如何使用 Helm Chart 升級 Milvus 集群。
title: 使用 Helm 圖表升級 Milvus 集群
---
<div class="tab-wrapper"><a href="/docs/zh-hant/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/zh-hant/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">使用 Helm 圖表升級 Milvus 集群<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南描述如何使用 Milvus Helm 圖表升級你的 Milvus 集群。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Helm 版本 &gt;= 3.14.0</li>
<li>Kubernetes 版本 &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>自 Milvus Helm 圖表版本 4.2.21 起，我們引入 pulsar-v3.x 圖表作為依賴。為了向下相容性，請升級您的 helm 到 v3.14 或更高版本，並確保在使用<code translate="no">helm upgrade</code> 時加入<code translate="no">--reset-then-reuse-values</code> 選項。</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">檢查 Milvus Helm 海圖<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>執行下列指令來檢查新的 Milvus 版本。</p>
<pre><code translate="no">$ helm repo update zilliztech
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>位於<code translate="no">https://milvus-io.github.io/milvus-helm/</code> 的 Milvus Helm Charts repo 已經歸檔，您可以從<code translate="no">https://zilliztech.github.io/milvus-helm/</code> 取得進一步的更新，如下所示：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>存檔的 repo 仍可使用於 4.0.31 之前的圖表。對於之後的版本，請使用新的 repo。</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>您可以為您的 Milvus 選擇升級路徑，如下所示：</p>
<div style="display: none;">- 進行滾動升級](#conduct-a-rolling-upgrade) 從 Milvus v2.2.3 及以後的版本升級到 v2.4.23。</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">使用 Helm 升級 Milvus</a>，從 v2.2.3 之前的次要版本升級到 v2.4.23。</p></li>
<li><p>在從 Milvus v2.1.x 升級到 v2.4.23 之前<a href="#Migrate-the-metadata">遷移元資料</a>。</p></li>
</ul>
<div style="display: none;">
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
    </button></h2><p>自 Milvus 2.2.3 起，您可以設定 Milvus 協調器工作在主動待命模式，並啟用它們的滾動升級功能，以便 Milvus 可以在協調器升級期間回應傳入的請求。在之前的版本中，協調器需要在升級過程中移除然後再創建，這可能會導致服務出現一定的停機時間。</p>
<p>滾動升級需要協調器在主動待命模式下工作。您可以使用我們提供的<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">腳本</a>，設定協調器在主動待命模式下工作，並開始滾動升級。</p>
<p>基於 Kubernetes 提供的滾動更新功能，上述腳本會根據部署的依賴關係強制執行有序更新。此外，Milvus 實作了一套機制，以確保其元件在升級期間仍能與那些依賴它們的元件相容，大幅減少潛在的服務停機時間。</p>
<p>該腳本只適用於與 Helm 一起安裝的 Milvus 的升級。下表列出了腳本中可用的命令旗標。</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>預設值</th><th>需要</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 實例名稱</td><td><code translate="no">None</code></td><td>真實</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus 安裝的命名空間</td><td><code translate="no">default</code></td><td>假</td></tr>
<tr><td><code translate="no">t</code></td><td>目標 Milvus 版本</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">w</code></td><td>新的 Milvus 圖片標籤</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>真</td></tr>
<tr><td><code translate="no">o</code></td><td>操作</td><td><code translate="no">update</code></td><td>假</td></tr>
</tbody>
</table>
<p>一旦您確保 Milvus 實例中的所有部署都處於正常狀態。您可以執行以下指令，將 Milvus 實例升級至 2.4.23。</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>腳本硬體編碼了部署的升級順序，無法變更。</li>
<li>腳本使用<code translate="no">kubectl patch</code> 更新部署，並使用<code translate="no">kubectl rollout status</code> 觀察其狀態。</li>
<li>腳本使用<code translate="no">kubectl patch</code> 將部署的<code translate="no">app.kubernetes.io/version</code> 標籤更新為指令中<code translate="no">-t</code> 旗標之後指定的標籤。</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">使用 Helm 升級 Milvus<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>要將 Milvus 從 v2.2.3 之前的次要版本升級到最新版本，請執行下列指令：</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>使用前面命令中的 Helm 圖表版本。有關如何取得 Helm 圖表版本的詳細資訊，請參閱<a href="#Check-the-Milvus-version">檢查 Milvus 版本</a>。</p>
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
    </button></h2><p>自 Milvus 2.2.0 起，元資料與先前版本的元資料不相容。以下示例片段假設從 Milvus 2.1.4 升級到 Milvus 2.2.0。</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1.檢查 Milvus 版本</h3><p>執行<code translate="no">$ helm list</code> 檢查您的 Milvus 應用程式版本。您可以看到<code translate="no">APP VERSION</code> 是 2.1.4。</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>    
<span class="hljs-keyword">new</span>-release         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2.檢查正在運行的 pod</h3><p>執行<code translate="no">$ kubectl get pods</code> 檢查執行中的 Pod。您可以看到以下輸出。</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my-release-etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datacoord<span class="hljs-number">-664</span>c58798d-fl75s    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-datanode<span class="hljs-number">-5f</span>75686c55-xfg2r     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexcoord<span class="hljs-number">-5f</span>98b97589<span class="hljs-number">-2l</span>48r   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-indexnode<span class="hljs-number">-857b</span>4ddf98-vmd75    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp        <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querycoord-c454f44cd-dwmwq    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-querynode<span class="hljs-number">-76b</span>b4946d-lbrz6     <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-milvus-rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-bookie-<span class="hljs-keyword">init</span>-tjxpj             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-pulsar-<span class="hljs-keyword">init</span>-c8vvc             <span class="hljs-number">0</span>/<span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my-release-pulsar-zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span>/<span class="hljs-number">1</span>     Running     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3.檢查影像標籤</h3><p>檢查 pod 的 image 標籤<code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code> 。您可以看到您的 Milvus 集群的版本是 v2.1.4。</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4.遷移元資料</h3><p>Milvus 2.2 的一個主要改變是段索引的 metadata 結構。因此，當您將 Milvus 從 v2.1.x 升級到 v2.2.0 時，您需要使用 Helm 來遷移 metadata。這裡有<a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">一個腳本</a>可以讓您安全地遷移 metadata。</p>
<p>這個腳本只適用於安裝在 K8s 集群上的 Milvus。如果在過程中發生錯誤，請先用回滾操作回滾到之前的版本。</p>
<p>下表列出了您可以進行的元資料遷移操作。</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>預設值</th><th>需要</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus 實例名稱。</td><td><code translate="no">None</code></td><td>真實</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvus 安裝的命名空間。</td><td><code translate="no">default</code></td><td>假</td></tr>
<tr><td><code translate="no">s</code></td><td>Milvus 原始版本。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">t</code></td><td>目標 Milvus 版本。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">r</code></td><td>Milvus 元的根目錄。</td><td><code translate="no">by-dev</code></td><td>假</td></tr>
<tr><td><code translate="no">w</code></td><td>新的 Milvus 圖片標籤。</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>假</td></tr>
<tr><td><code translate="no">m</code></td><td>meta 遷移圖片標籤。</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>錯誤</td></tr>
<tr><td><code translate="no">o</code></td><td>元移轉操作。</td><td><code translate="no">migrate</code></td><td>錯誤</td></tr>
<tr><td><code translate="no">d</code></td><td>是否在移轉完成後刪除移轉 pod。</td><td><code translate="no">false</code></td><td>否</td></tr>
<tr><td><code translate="no">c</code></td><td>元遷移 pvc 的儲存類別。</td><td><code translate="no">default storage class</code></td><td>錯誤</td></tr>
<tr><td><code translate="no">e</code></td><td>milvus 使用的 etcd enpoint。</td><td><code translate="no">etcd svc installed with milvus</code></td><td>錯誤</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1.遷移元資料</h4><ol>
<li>下載<a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">遷移腳本</a>。</li>
<li>停止 Milvus 元件。Milvus etcd 中的任何活動會話都可能導致遷移失敗。</li>
<li>為 Milvus 元資料建立備份。</li>
<li>遷移 Milvus 元資料。</li>
<li>使用新的映像啟動 Milvus 元件。</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2.將 Milvus 從 v2.1.x 升級到 2.2.0</h4><p>以下命令假設你將 Milvus 從 v2.1.4 升級到 2.2.0。將它們改成適合你需要的版本。</p>
<ol>
<li><p>指定 Milvus 實例名稱、源 Milvus 版本和目標 Milvus 版本。</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果你的 Milvus 沒有安裝在預設的 K8s 命名空間，用<code translate="no">-n</code> 指定命名空間。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果您的 Milvus 安裝在自訂的<code translate="no">rootpath</code> ，請用<code translate="no">-r</code> 指定根目錄。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果你的 Milvus 安裝了自訂的<code translate="no">image</code> ，用<code translate="no">-w</code> 指定圖片標籤。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果您想在遷移完成後自動移除遷移 Pod，請設定<code translate="no">-d true</code> 。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果遷移失敗，請回滾並重新遷移。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
