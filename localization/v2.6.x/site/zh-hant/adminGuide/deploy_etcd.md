---
id: deploy_etcd.md
title: 使用 Docker Compose 或 Helm 設定元資料儲存空間
related_key: 'S3, storage'
summary: 學習如何使用 Docker Compose/Helm 為 Milvus 設定元儲存。
---
<h1 id="Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">使用 Docker Compose 或 Helm 設定元資料儲存空間<button data-href="#Configure-Meta-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 etcd 來儲存元資料。本主題介紹如何使用 Docker Compose 或 Helm 配置 etcd。</p>
<h2 id="Configure-etcd-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 配置 etcd<button data-href="#Configure-etcd-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-etcd" class="common-anchor-header">1.配置 etcd</h3><p>要使用 Docker Compose 配置 etcd，請在 milvus/configs 路徑上的<code translate="no">milvus.yaml</code> 檔案中的<code translate="no">etcd</code> 部分提供您的值。</p>
<pre><code translate="no"><span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">by-dev</span> <span class="hljs-comment"># The root path where data are stored in etcd</span>
  <span class="hljs-attr">metaSubPath:</span> <span class="hljs-string">meta</span> <span class="hljs-comment"># metaRootPath = rootPath + &#x27;/&#x27; + metaSubPath</span>
  <span class="hljs-attr">kvSubPath:</span> <span class="hljs-string">kv</span> <span class="hljs-comment"># kvRootPath = rootPath + &#x27;/&#x27; + kvSubPath</span>
  <span class="hljs-attr">log:</span>
    <span class="hljs-comment"># path is one of:</span>
    <span class="hljs-comment">#  - &quot;default&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stderr&quot; as os.Stderr,</span>
    <span class="hljs-comment">#  - &quot;stdout&quot; as os.Stdout,</span>
    <span class="hljs-comment">#  - file path to append server logs to.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log</span>
    <span class="hljs-attr">path:</span> <span class="hljs-string">stdout</span>
    <span class="hljs-attr">level:</span> <span class="hljs-string">info</span> <span class="hljs-comment"># Only supports debug, info, warn, error, panic, or fatal. Default &#x27;info&#x27;.</span>
  <span class="hljs-attr">use:</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: true</span>
    <span class="hljs-attr">embed:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># Whether to enable embedded Etcd (an in-process EtcdServer).</span>
  <span class="hljs-attr">data:</span>
    <span class="hljs-comment"># Embedded Etcd only.</span>
    <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/etcdData/</span>
    <span class="hljs-attr">dir:</span> <span class="hljs-string">default.etcd</span>
<button class="copy-code-btn"></button></code></pre>
<p>更多資訊請參閱<a href="/docs/zh-hant/configure_etcd.md">etcd 相關組態</a>。</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2.執行 Milvus</h3><p>執行下列指令啟動使用 etcd 設定的 Milvus。</p>
<pre><code translate="no"><span class="hljs-attribute">docker</span> compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置只在 Milvus 啟動後生效。更多資訊請參閱<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">啟動 Milvus</a>。</div>
<h2 id="Configure-etcd-on-K8s" class="common-anchor-header">在 K8s 上配置 etcd<button data-href="#Configure-etcd-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 K8s 上的 Milvus 集群，您可以在啟動 Milvus 的相同命令中配置 etcd。另外，您也可以在啟動 Milvus 之前，使用<code translate="no">values.yml</code> 檔案在<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>套件庫的 /charts/milvus 路徑上設定 etcd。</p>
<p>下表列出在 YAML 檔案中設定 etcd 的關鍵。</p>
<table>
<thead>
<tr><th>鍵</th><th>說明</th><th>值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">etcd.enabled</code></td><td>啟用或停用 etcd。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.enabled</code></td><td>啟用或停用外部 etcd。</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalEtcd.endpoints</code></td><td>存取 etcd 的端點。</td><td></td></tr>
</tbody>
</table>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 檔案</h3><ol>
<li>使用<code translate="no">values.yaml</code> 檔案中的值設定<code translate="no">etcd</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>使用<code translate="no">values.yaml</code> 檔案中的值配置<code translate="no">externaletcd</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalEtcd:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-comment">## the endpoints of the external etcd</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">&lt;your_etcd_IP&gt;:2379</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>配置完前面的部分並儲存<code translate="no">values.yaml</code> 檔案後，執行下列命令安裝使用 etcd 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-a-command" class="common-anchor-header">使用命令</h3><p>要安裝 Milvus 並配置 etcd，請使用您的值執行下列命令。</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --set cluster.enabled=true --set etcd.enabled=false --set externaletcd.enabled=true --set externalEtcd.endpoints={&lt;your_etcd_IP&gt;:2379}
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
    </button></h2><p>學習如何使用 Docker Compose 或 Helm 配置其他 Milvus 的相依性：</p>
<ul>
<li><a href="/docs/zh-hant/deploy_s3.md">使用 Docker Compose 或 Helm 配置物件儲存空間</a></li>
<li><a href="/docs/zh-hant/deploy_pulsar.md">使用 Docker Compose 或 Helm 設定訊息儲存空間</a></li>
</ul>
