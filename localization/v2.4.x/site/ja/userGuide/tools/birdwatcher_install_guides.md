---
id: birdwatcher_install_guides.md
summary: MilvusをデバッグするためにBirdwatchをインストールする方法をご紹介します。
title: Birdwatcherのインストール
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">Birdwatcherのインストール<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Birdwatcherのインストール方法を説明します。</p>
<h2 id="Local-install" class="common-anchor-header">ローカルインストール<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/v2.4.x/install_standalone-docker.md">Dockerを使って</a>Milvus Standaloneをインストールした場合、ビルドしたバイナリをダウンロードしてインストールするか、Birdwatcherを一般的なGoモジュールとしてインストールするか、Birdwatcherをソースからビルドする必要があります。</p>
<ul>
<li><p>一般的なGoモジュールとしてインストールする。</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>その後、以下の手順でBirdwatcherを実行できる：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ソースからビルドする。</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>次に、次のようにしてBirdwatcherを実行できます：</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ビルド済みのバイナリをダウンロードする。</p>
<p>まず、<a href="https://github.com/milvus-io/birdwatcher/releases/latest">最新のリリースページを</a>開き、用意されているバイナリを見つける。</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;<span class="hljs-built_in">arch</span>&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>そして、tarボールを解凍し、以下のようにBirdwatcherを使うことができる：</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">Kubernetesポッドとしてインストールする<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/v2.4.x/install_standalone-helm.md">Helmチャート</a>または<a href="/docs/ja/v2.4.x/install_standalone-operator.md">Milvus Operatorを</a> <a href="/docs/ja/v2.4.x/install_standalone-helm.md">使用して</a>Milvus Standaloneをインストールした場合、または<a href="/docs/ja/v2.4.x/install_cluster-helm.md">Helmチャート</a>または<a href="/docs/ja/v2.4.x/install_cluster-milvusoperator.md">Milvus Operatorを</a> <a href="/docs/ja/v2.4.x/install_cluster-helm.md">使用して</a>Milvus Clusterをインストールした場合は、Kubernetes podとしてBirdwatcherをインストールすることをお勧めします。</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">deployment.ymlの準備</h3><pre><code translate="no" class="language-yml">apiVersion: apps/v1
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
<p>DockerHubで公開されているイメージが最新でない場合、ソースコードと一緒に提供されているDockerfileを使って、以下のようにBirdwatcherのイメージをビルドすることができます：</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>ローカルでビルドしたイメージをデプロイするには、上記の仕様に<code translate="no">imagePullPolicy</code> を追加し、<code translate="no">Never</code> に設定する必要がある。</p>
<pre><code translate="no" class="language-yaml">...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">deployment.ymlを適用する</h3><p>上記のYAMLをファイルに保存し、名前を<code translate="no">deployment.yml</code> 、以下のコマンドを実行する。</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
