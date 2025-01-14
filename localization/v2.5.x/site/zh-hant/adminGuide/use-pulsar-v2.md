---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus建議您為Milvus v2.5.x升級Pulsar到v3。然而，如果您喜歡使用Pulsar v2，這篇文章將引導您通過步驟繼續使用Pulsar
  v2與Milvus v2.5.x。
title: 使用 Pulsar v2 搭配 Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">使用 Pulsar v2 搭配 Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus建議您升級Pulsar到v3來執行Milvus v2.5.x。詳情請參考<a href="/docs/zh-hant/upgrade-pulsar-v3.md">升級Puls</a>ar。然而，如果你喜歡使用Pulsar v2與Milvus v2.5.x，這篇文章將指導你如何使用Pulsar v2執行Milvus v2.5.x。</p>
<p>如果你已經有一個正在運行的Milvus實例，並希望將它升級到v2.5.x，但繼續使用Pulsar v2，你可以按照本頁面的步驟進行。</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">在升級 Milvus v2.5.x 的同時繼續使用 Pulsar v2<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將引導你完成繼續使用Pulsar v2的步驟，同時升級你正在運行的Milvus實例到Milvus v2.5.x。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">適用於 Milvus Operator 使用者</h3><p>Milvus Operator 預設與 Pulsar v2 升級相容。您可以參考使用 Milvus<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">Operator 升級 Milvus Cluster</a>，將您的 Milvus 實例升級到 v2.5.x。</p>
<p>升級完成後，您可以繼續使用 Pulsar v2 與您的 Milvus 實例。</p>
<h3 id="For-Helm-users" class="common-anchor-header">針對 Helm 使用者</h3><p>在升級之前，請確認</p>
<ul>
<li><p>您的 Helm 版本在 v3.12 以上，建議使用最新版本。</p>
<p>如需詳細資訊，請參閱<a href="https://helm.sh/docs/intro/install/">安裝 Helm</a>。</p></li>
<li><p>您的 Kubernetes 版本為 v1.20 以上。</p></li>
</ul>
<p>本文中的作業假設</p>
<ul>
<li><p>Milvus 已安裝在<code translate="no">default</code> 命名空間。</p></li>
<li><p>Milvus 的發行版名稱是<code translate="no">my-release</code> 。</p></li>
</ul>
<p>在升級 Milvus 之前，您需要修改<code translate="no">values.yaml</code> 檔案，指定 Pulsar 版本為 v2。步驟如下</p>
<ol>
<li><p>獲取您的 Milvus 實例的當前<code translate="no">values.yaml</code> 檔案。</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>編輯<code translate="no">values.yaml</code> 檔案，指定 Pulsar 版本為 v2。</p>
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
<p>對於<code translate="no">image</code>, 將<code translate="no">tag</code> 改為所需的 Milvus 版本 (例如<code translate="no">v2.5.0-beta</code>)。</p></li>
<li><p>更新 Milvus Helm 圖表。</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>升級 Milvus 實例。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">使用 Pulsar v2 建立新的 Milvus 實例<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將引導您使用 Pulsar v2 建立新 Milvus 實例的步驟。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">對於 Milvus Operator 用戶</h3><p>在您部署Milvus v2.5.x之前，您需要下載和編輯Milvus Customer Resource Definition (CRD)檔案。有關如何使用 Milvus Operator 安裝 Milvus 的詳細資訊，請參閱<a href="/docs/zh-hant/install_cluster-milvusoperator.md">使用 Milvus Operator 安裝 Milvus Cluster</a>。</p>
<ol>
<li><p>下載 CRD 檔案。</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>編輯<code translate="no">milvus_cluster_default.yaml</code> 檔案，指定 Pulsar 版本為 v2。</p>
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
<p>對於<code translate="no">dependencies</code> ，將<code translate="no">pulsar.inCluster.chartVersion</code> 改為<code translate="no">pulsar-v2</code> 。</p></li>
<li><p>繼續<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">安裝 Mil</a>v<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">us Cluster 與 Milvus Operator 的</a>步驟，使用編輯後的 CRD 檔部署 Milvus v2.5.x 與 Pulsar v2。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">針對 Helm 使用者</h3><p>在部署 Milvus v2.5.x 之前，您可以準備一個<code translate="no">values.yaml</code> 檔案，或使用內嵌參數指定 Pulsar 版本。有關如何使用 Helm 安裝 Milvus 的詳細資訊，請參閱使用<a href="/docs/zh-hant/install_cluster-helm.md">Helm 安裝 Milvus Cluster</a>。</p>
<ul>
<li><p>使用內嵌參數指定 Pulsar 版本為 v2。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用<code translate="no">values.yaml</code> 檔案指定 Pulsar 版本為 v2。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>然後，使用<code translate="no">values.yaml</code> 檔案以 Pulsar v2 部署 Milvus v2.5.x。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
