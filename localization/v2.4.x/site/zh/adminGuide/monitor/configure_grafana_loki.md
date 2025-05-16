---
id: configure_grafana_loki.md
title: 配置 Grafana Loki
summary: 本主题介绍如何使用 Loki 收集日志，并使用 Grafana 查询 Milvus 集群的日志。
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">配置 Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南说明了如何配置 Loki 以收集日志，以及如何配置 Grafana 以查询和显示 Milvus 集群的日志。</p>
<p>在本指南中，您将学习如何</p>
<ul>
<li>使用 Helm 在 Milvus 集群上部署<a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a>和<a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a>。</li>
<li>为 Loki 配置对象存储。</li>
<li>使用 Grafana 查询日志。</li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>已<a href="/docs/zh/v2.4.x/install_cluster-helm.md">在 K8s 上安装 Milvus 集群</a>。</li>
<li>已安装必要的工具，包括<a href="https://helm.sh/docs/intro/install/">Helm</a>和<a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>。</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">部署洛基<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki 是受 Prometheus 启发而开发的日志聚合系统。使用 Helm 部署 Loki，从 Milvus 集群收集日志。</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1.添加 Grafana 的 Helm 图表存储库</h3><p>将 Grafana 的图表存储库添加到 Helm 并更新：</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2.为 Loki 配置对象存储</h3><p>从以下存储选项中选择一个，并创建<code translate="no">loki.yaml</code> 配置文件：</p>
<ul>
<li><p>选项 1：使用 MinIO 存储</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki</span>:
  <span class="hljs-attr">commonConfig</span>:
    <span class="hljs-attr">replication_factor</span>: <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled</span>: <span class="hljs-literal">false</span>

<span class="hljs-attr">minio</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>选项 2：使用 AWS S3 存储</p>
<p>在以下示例中，用自己的 S3 访问密钥和 ID 替换<code translate="no">&lt;accessKey&gt;</code> 和<code translate="no">&lt;keyId&gt;</code> ，用 S3 端点替换<code translate="no">s3.endpoint</code> ，用 S3 区域替换<code translate="no">s3.region</code> 。</p>
<pre><code translate="no" class="language-yaml">loki:
  commonConfig:
    replication_factor: 1
  auth_enabled: <span class="hljs-literal">false</span>
  storage:
    bucketNames:
      chunks: loki-chunks
      ruler: loki-ruler
      admin: loki-admin
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&#x27;s3&#x27;</span>
    s3:
      endpoint: s3.us-west-2.amazonaws.com
      region: us-west-2
      secretAccessKey: &lt;accessKey&gt;
      accessKeyId: &lt;keyId&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3.安装 Loki</h3><p>运行以下命令安装 Loki：</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">部署 Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail 是 Loki 的日志收集代理。它从 Milvus pod 中读取日志并将其发送到 Loki。</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1.创建 Promtail 配置</h3><p>创建<code translate="no">promtail.yaml</code> 配置文件：</p>
<pre><code translate="no" class="language-yaml">config:
  clients:
    - url: http://loki-gateway/loki/api/v1/push
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2.安装 Promtail</h3><p>使用 Helm 安装 Promtail：</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">使用 Grafana 查询日志<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>部署 Grafana 并将其配置为连接到 Loki 以查询日志。</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1.部署 Grafana</h3><p>使用以下命令安装 Grafana：</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>在访问 Grafana 之前，您需要获取<code translate="no">admin</code> 密码：</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=<span class="hljs-string">&quot;{.data.admin-password}&quot;</span> | <span class="hljs-built_in">base64</span> --decode ; <span class="hljs-built_in">echo</span>
<button class="copy-code-btn"></button></code></pre>
<p>然后，将 Grafana 端口转发到本地计算机：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">POD_NAME</span>=$(kubectl get pods --namespace monitoring -l <span class="hljs-string">&quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot;</span> -o jsonpath=<span class="hljs-string">&quot;{.items[0].metadata.name}&quot;</span>)
kubectl --namespace monitoring port-forward $POD_NAME <span class="hljs-number">3000</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2.在 Grafana 中将 Loki 添加为数据源</h3><p>Grafana 运行后，您需要将 Loki 添加为查询日志的数据源。</p>
<ol>
<li>打开网络浏览器并导航至<code translate="no">127.0.0.1:3000</code> 。使用之前获得的用户名<code translate="no">admin</code> 和密码登录。</li>
<li>在左侧菜单中选择<strong>连接</strong>&gt;<strong>添加新连接</strong>。</li>
<li>在出现的页面中，选择<strong>Loki</strong>作为数据源类型。您可以在搜索栏中输入<strong>loki</strong>查找数据源。</li>
<li>在 Loki 数据源设置中，指定<strong>名称</strong>和<strong>URL</strong>，然后单击<strong>保存并测试</strong>。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
   </span> <span class="img-wrapper"> <span>数据源</span> </span></p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3.查询 Milvus 日志</h3><p>将 Loki 添加为数据源后，在 Grafana 中查询 Milvus 日志：</p>
<ol>
<li>在左侧菜单中单击 "<strong>探索"</strong>。</li>
<li>在页面左上角，选择 loki 数据源。</li>
<li>使用<strong>标签浏览器</strong>选择标签并查询日志。</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
   </span> <span class="img-wrapper"> <span>查询</span> </span></p>
