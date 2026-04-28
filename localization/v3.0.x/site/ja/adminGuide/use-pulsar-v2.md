---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvusでは、Milvus v2.5.x用にPulsarをv3にアップグレードすることを推奨しています。しかし、Pulsar
  v2を使いたい場合、この記事ではMilvus v2.5.xでPulsar v2を使い続けるための手順を説明します。
title: Milvus v2.5.xとPulsar v2の併用
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Milvus v2.5.xとPulsar v2の併用<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、Milvus v2.5.xを動作させるためにPulsarをv3にアップグレードすることを推奨しています。詳細は<a href="/docs/ja/upgrade-pulsar-v3.md">Pulsarのアップグレードを</a>ご参照ください。しかし、Milvus v2.5.xでPulsar v2を使用したい場合、この記事ではPulsar v2でMilvus v2.5.xを実行する手順をご案内します。</p>
<p>すでに稼働中のMilvusインスタンスがあり、v2.5.xにアップグレードしたいがPulsar v2は使い続けたいという場合は、このページの手順に従ってください。</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Milvus v2.5.xをアップグレードしながらPulsar v2を使い続ける<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、稼働中のMilvusインスタンスをMilvus v2.5.xにアップグレードしながらPulsar v2を使い続けるための手順をご紹介します。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Milvus Operatorユーザの方へ</h3><p>Milvus OperatorはデフォルトでPulsar v2のアップグレードに対応しています。Milvus<a href="/docs/ja/upgrade_milvus_cluster-operator.md">OperatorによるMilvusクラスタのアップグレードを</a>参照し、Milvusインスタンスをv2.5.xにアップグレードすることができます。</p>
<p>アップグレードが完了したら、MilvusインスタンスでPulsar v2を使い続けることができます。</p>
<h3 id="For-Helm-users" class="common-anchor-header">Helmユーザの場合</h3><p>アップグレードの前に、以下を確認してください。</p>
<ul>
<li><p>Helmのバージョンがv3.12以上であることを確認してください。</p>
<p>詳細については、<a href="https://helm.sh/docs/intro/install/">Helmのインストールを</a>参照してください。</p></li>
<li><p>Kubernetesのバージョンがv1.20以上であること。</p></li>
</ul>
<p>本記事の操作は以下を前提としています：</p>
<ul>
<li><p>Milvusが<code translate="no">default</code> ネームスペースにインストールされている。</p></li>
<li><p>Milvusのリリース名は<code translate="no">my-release</code> です。</p></li>
</ul>
<p>Milvusをアップグレードする前に、<code translate="no">values.yaml</code> ファイルを変更し、Pulsarのバージョンをv2に指定する必要があります。手順は以下の通りです：</p>
<ol>
<li><p>Milvusインスタンスの現在の<code translate="no">values.yaml</code> 。</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">values.yaml</code> ファイルを編集し、Pulsarのバージョンをv2に指定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
<span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">image:</span>
  <span class="hljs-attr">all:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">milvusdb/milvus</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">v2.5.0-beta</span> 
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">image</code> の場合、<code translate="no">tag</code> を希望のMilvusバージョンに変更します（例:<code translate="no">v2.5.0-beta</code> ）。</p></li>
<li><p>Milvus Helmチャートを更新する。</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusインスタンスをアップグレードする。</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Pulsar v2を使った新しいMilvusインスタンスの作成<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Pulsar v2で新しいMilvusインスタンスを作成する手順を説明します。</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">Milvus Operatorユーザの方へ</h3><p>Milvus v2.5.xを展開する前に、Milvus Customer Resource Definition (CRD)ファイルをダウンロードし、編集する必要があります。Milvus Operatorを使用したMilvusのインストール方法の詳細については、<a href="/docs/ja/install_cluster-milvusoperator.md">Milvus Operatorを使用したMilvusクラスタのインストールを</a>参照してください。</p>
<ol>
<li><p>CRDファイルをダウンロードします。</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">milvus_cluster_default.yaml</code> ファイルを編集し、Pulsarのバージョンをv2に指定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v2</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">dependencies</code> の場合、<code translate="no">pulsar.inCluster.chartVersion</code> を<code translate="no">pulsar-v2</code> に変更してください。</p></li>
<li><p><a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Install Milvus Cluster with Milvus Operatorの</a>手順に進み、編集したCRDファイルを使用してMilvus v2.5.xとPulsar v2を展開します。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">Helmユーザの場合</h3><p>Milvus v2.5.xをデプロイする前に、<code translate="no">values.yaml</code> ファイルを用意するか、インライン・パラメータを使ってPulsarのバージョンを指定してください。Helmを使用したMilvusのインストール方法については、「<a href="/docs/ja/install_cluster-helm.md">Helmを使用したMilvusクラスタのインストール</a>」をご参照ください。</p>
<ul>
<li><p>インライン・パラメータを使用して、Pulsarのバージョンをv2に指定します。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">values.yaml</code> 、Pulsarのバージョンをv2に指定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>その後、<code translate="no">values.yaml</code> ファイルを使用して、Milvus v2.5.xをPulsar v2と共にデプロイします。</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
