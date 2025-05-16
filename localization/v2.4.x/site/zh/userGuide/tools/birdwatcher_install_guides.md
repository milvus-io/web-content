---
id: birdwatcher_install_guides.md
summary: 了解如何安装 Birdwatcher 以调试 Milvus。
title: 安装 Birdwatcher
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">安装 Birdwatcher<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>本页演示如何安装 Birdwatcher。</p>
<h2 id="Local-install" class="common-anchor-header">本地安装<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您<a href="/docs/zh/v2.4.x/install_standalone-docker.md">使用 docker</a> 安装了 Milvus Standalone，最好下载并安装已构建的二进制文件，将 Birdwatcher 作为普通 Go 模块安装，或者从源代码构建 Birdwatcher。</p>
<ul>
<li><p>将其作为普通 Go 模块安装。</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>然后你就可以按如下方法运行 Birdwatcher：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>从源代码构建。</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>然后按以下步骤运行 Birdwatcher：</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>下载已构建的二进制文件</p>
<p>首先，打开<a href="https://github.com/milvus-io/birdwatcher/releases/latest">最新发布页面</a>，找到准备好的二进制文件。</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;<span class="hljs-built_in">arch</span>&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>然后解压压缩包，按如下方法使用 Birdwatcher：</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">作为 Kubernetes pod 安装<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您<a href="/docs/zh/v2.4.x/install_standalone-helm.md">使用 Helm 图表</a>或<a href="/docs/zh/v2.4.x/install_standalone-operator.md">Milvus Operator</a>安装了 Milvus Standalone 或<a href="/docs/zh/v2.4.x/install_cluster-helm.md">使用 Helm 图表</a>或 Milvus<a href="/docs/zh/v2.4.x/install_cluster-milvusoperator.md">Operator</a> 安装了 Milvus Cluster，建议您将 Birdwatcher 安装为 Kubernetes pod。</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">准备部署文件</h3><pre><code translate="no" class="language-yml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: birdwatcher
spec:
  selector:
    matchLabels:
      app: birdwatcher
  template:
    metadata:
      labels:
        app: birdwatcher
    spec:
      containers:
      - name: birdwatcher
        image: milvusdb/birdwatcher
        resources:
          limits:
            memory: <span class="hljs-string">&quot;128Mi&quot;</span>
            cpu: <span class="hljs-string">&quot;500m&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果 DockerHub 上提供的镜像不是最新的，您可以使用源代码提供的 Dockerfile 构建 Birdwatcher 的镜像，如下所示：</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>要部署本地构建的镜像，需要在上述规格中添加<code translate="no">imagePullPolicy</code> ，并将其设置为<code translate="no">Never</code> 。</p>
<pre><code translate="no" class="language-yaml">...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">应用 deployment.yml</h3><p>将上述 YAML 保存在一个文件中并命名为<code translate="no">deployment.yml</code> ，然后运行以下命令</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
