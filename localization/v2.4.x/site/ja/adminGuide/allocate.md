---
id: allocate.md
title: Kubernetes上のMilvusにリソースを割り当てる
summary: Kubernetes上のMilvusにリソースを割り当てる方法を学ぶ。
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Kubernetes上でのリソースの割り当て<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Kubernetes上のMilvusクラスタにリソースを割り当てる方法について説明します。</p>
<p>一般的に、本番環境のMilvusクラスタに割り当てるリソースは、マシンのワークロードに比例する必要があります。また、リソースを割り当てる際にはマシンタイプも考慮する必要があります。クラスタの実行中に設定を更新することもできますが、<a href="/docs/ja/v2.4.x/install_cluster-helm.md">クラスタをデプロイする</a>前に値を設定することをお勧めします。</p>
<div class="alert note">
<p>Milvus Operatorを使用してリソースを割り当てる方法については、<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Milvus Operatorを使用してリソースを割り当てるを</a>参照してください。</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1.利用可能なリソースの表示<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">kubectl describe nodes</code> を実行して、プロビジョニングしたインスタンスで利用可能なリソースを表示します。</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2.リソースの割り当て<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Helmを使用して、MilvusコンポーネントにCPUとメモリのリソースを割り当てます。</p>
<div class="alert note">
Helmを使用してリソースをアップグレードすると、実行中のポッドがローリングアップデートを実行します。</div>
<p>リソースを割り当てるには2つの方法があります：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/allocate.md#Allocate-resources-with-commands">コマンドを使用する</a></li>
<li><a href="/docs/ja/v2.4.x/allocate.md#Allocate-resources-by-setting-configuration-file"> <code translate="no">YAML</code> ファイルでパラメータを設定する</a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">コマンドでリソースを割り当てる</h3><p><code translate="no">--set</code> を使用してリソース設定を更新する場合は、Milvus コンポーネントごとにリソース変数を設定する必要があります。</p>
<div class="filter">
<a href="#standalone">Milvus スタンドアロン</a> <a href="#cluster">Milvus クラスタ</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">設定ファイルによるリソース割り当て</h3><p><code translate="no">resources.yaml</code> ファイルのパラメータ<code translate="no">resources.requests</code> および<code translate="no">resources.limits</code> を指定して、CPU およびメモリリソースを割り当てることもできます。</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3.設定の適用<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行し、新しい設定をMilvusクラスタに適用します。</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<code translate="no">resources.limits</code> が指定されていない場合、ポッドは利用可能なすべてのCPUおよびメモリリソースを消費します。そのため、同じインスタンス上で他の実行タスクがより多くのメモリ消費を必要とする場合にリソースのオーバーオールロケーションを避けるために、<code translate="no">resources.requests</code> と<code translate="no">resources.limits</code> を必ず指定してください。</div>
<p>リソースの管理に関する詳細は、<a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">Kubernetesのドキュメントを</a>参照してください。</p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>次の方法についても学びましょう：<ul>
<li><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケール</a></li>
<li><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-operator.md">Milvusクラスタのアップグレード</a></li>
<li><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-operator.md">Milvusスタンドアロンのアップグレード</a></li>
</ul></li>
<li>クラウド上にクラスタをデプロイする準備ができたら<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Terraformを使ったAmazon EKSへのMilvusのデプロイ</a>方法</li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Kubernetesを使ってGCPにMilvusクラスタをデプロイ</a>する方法</li>
<li><a href="/docs/ja/v2.4.x/azure.md">Kubernetesを使ってMicrosoft AzureにMilvusをデプロイ</a>する方法</li>
</ul></li>
</ul>
