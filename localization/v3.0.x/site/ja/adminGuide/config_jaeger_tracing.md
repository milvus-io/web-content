---
id: config_jaeger_tracing.md
title: トレースの設定
related_key: 'Jaeger, Milvus, Trace'
summary: このガイドでは、Milvus用のトレースを収集するようにJaegerを設定する方法について説明します。
---
<h1 id="Configure-Trace" class="common-anchor-header">トレースの設定<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus用のトレースを収集するようにJaegerを設定する方法について説明します。</p>
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
<li><a href="https://helm.sh/docs/intro/install/">Helm</a>や<a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a> を含む必要なツールがインストールされていること。</li>
</ul>
<h2 id="Deploy-Jaeger" class="common-anchor-header">Jaegerのデプロイ<button data-href="#Deploy-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaegerは、<a href="http://uber.github.io/">Uber Technologies</a>によってオープンソースとしてリリースされた分散トレーシングプラットフォームです。</p>
<p>このガイドでは、<a href="https://github.com/jaegertracing/helm-charts">Jaeger Helmチャート</a>を使用してJaeger v2をデプロイします。デフォルトでは、このチャートはオールインワンモデルとインメモリストレージを使用してJaegerをデプロイします。これはテストに適しています。Kubernetes上でJaegerを実行するその他の方法については、<a href="https://www.jaegertracing.io/docs/2.23/deployment/kubernetes/">「Kubernetesへのデプロイ」を</a>参照してください。</p>
<h3 id="1-Install-Jaeger" class="common-anchor-header">1. Jaegerのインストール<button data-href="#1-Install-Jaeger" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus をインストールするネームスペースに Jaeger をインストールします。次のセクションの Milvus 設定では、Jaeger サービスを短縮名「<code translate="no">jaeger</code> 」で参照していますが、Kubernetes はネームスペースを指定しないサービス名を、クエリを発行したポッドのネームスペース内でのみ解決します。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add jaegertracing https://jaegertracing.github.io/helm-charts</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm install jaeger jaegertracing/jaeger --version 4.19.0</span>
<button class="copy-code-btn"></button></code></pre>
<p>チャートの README には、このチャートが実験的であり、マイナーバージョンアップで互換性を損なう変更が発生する可能性があることが記載されているため、このコマンドではチャートのバージョンを固定しています。チャートバージョン 4.19.0 では、Jaeger 2.23.0 がデプロイされます。</p>
<h3 id="2-Check-the-Jaeger-pod" class="common-anchor-header">2. Jaeger ポッドの確認<button data-href="#2-Check-the-Jaeger-pod" class="anchor-icon" translate="no">
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
    </button></h3><p>Jaeger ポッドが実行されていることを確認するには、次のコマンドを実行します。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods -l app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=all-in-one</span>
<button class="copy-code-btn"></button></code></pre>
<p>このチャートは、<code translate="no">jaeger</code> という名前のサービスを作成します。このサービスは、ポート<code translate="no">4317</code> でOTLP gRPCレシーバーを、ポート<code translate="no">16686</code> でJaeger UIを公開します。</p>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Helmチャートを使用してMilvusをインストールする<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>OTLP経由でMilvusからJaegerへトレースを送信するには、以下の設定を<code translate="no">values.yaml</code> という名前のファイルに保存してください:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    trace:
      exporter: otlp
      sampleFraction: 1
      otlp:
        endpoint: &quot;jaeger:4317&quot;
        method: grpc
        secure: false
</span><button class="copy-code-btn"></button></code></pre>
<p>これらの設定により、Milvus はすべてのリクエストをサンプリングし（<code translate="no">sampleFraction: 1</code> ）、TLS を使用しない OTLP gRPC（<code translate="no">secure: false</code> ）経由で、<code translate="no">jaeger</code> サービスのポート<code translate="no">4317</code> へトレースをエクスポートします。</p>
<p>新しい Milvus デプロイメントに上記の設定を適用するには、次のコマンドを実行してください:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade --install my-release zilliztech/milvus --version 5.0.22 -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>既存のMilvusデプロイメントに上記の設定を適用するには、次のコマンドを実行します:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm upgrade my-release zilliztech/milvus --version &lt;current-chart-version&gt; --reset-then-reuse-values -f values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>このコマンドは `<code translate="no">--reset-then-reuse-values</code>` を使用します。これには Helm 3.14 以降が必要です。このオプションを使用すると、Helm は `<code translate="no">--version</code>` で設定されたチャートバージョンのデフォルト値にリセットし、現在のリリースの値を適用した後、`<code translate="no">-f</code>` の値を適用します。したがって、`<code translate="no">values.yaml</code> ` 内のすべての値が現在のリリースの値を上書きし、`<code translate="no">extraConfigFiles</code> ` にある `<code translate="no">user.yaml</code> ` エントリは全体として置き換えられます。<code translate="no">&lt;current-chart-version&gt;</code> を見つけるには、<code translate="no">helm list</code> を実行し、<code translate="no">CHART</code> 列の値から<code translate="no">milvus-</code> という接頭辞を削除します。<code translate="no">-f</code> または<code translate="no">--set</code> を含み、<code translate="no">--reset-then-reuse-values</code> または<code translate="no">--reuse-values</code> を含まない状態で<code translate="no">helm upgrade</code> を実行した場合、Helm はインストール時に設定した値を保持しません。</p>
</div>
<h2 id="View-Traces" class="common-anchor-header">トレースの表示<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">jaeger</code> サービスは<code translate="no">ClusterIP</code> タイプですが、このチャートではデフォルトで Ingress が作成されません。ローカルマシンから Jaeger UI を開くには、UI ポートを転送してください:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward svc/jaeger 16686:16686</span>
<button class="copy-code-btn"></button></code></pre>
<p>その後、ブラウザで<code translate="no">http://localhost:16686</code> を開きます。</p>
<p>次のスクリーンショットは、検索操作および負荷収集操作中のMilvusのトレースが表示されたJaeger UIを示しています：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" /> 
   <span>トレース検索リクエスト</span>
  
 </span></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" /> 
   <span>トレースのロード収集リクエスト</span>
  
 </span></p>
