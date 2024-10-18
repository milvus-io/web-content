---
id: config_jaeger_tracing.md
title: トレースの設定
related_key: 'Jaeger, Milvus, Trace'
summary: このガイドでは、Milvusのトレースを収集するためにJaegerを設定する方法を説明します。
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
    </button></h1><p>このガイドでは、Milvusのトレースを収集するためにJaegerを設定する方法を説明します。</p>
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
<li><a href="https://helm.sh/docs/intro/install/">Helmと</a> <a href="https://kubernetes.io/docs/tasks/tools/">Kubectlを</a>含む必要なツールがインストールされている。</li>
<li>Cert-managerのバージョン1.6.1以降がインストールされていること。インストールガイドは<a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">こちら</a>。</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Jaegerの導入<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaegerは<a href="http://uber.github.io/">Uber Technologiesが</a>オープンソースで公開している分散トレーシングプラットフォームです。</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1.KubernetesへのJaeger Operatorのインストール</h3><p>オペレータをインストールするには、以下を実行する：</p>
<pre><code translate="no" class="language-shell">$ kubectl create namespace observability
$ kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability
<button class="copy-code-btn"></button></code></pre>
<p>この時点で、<code translate="no">jaeger-operator</code> のデプロイが利用可能になっているはずです。以下のコマンドを実行することで表示できます：</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> deployment jaeger-<span class="hljs-keyword">operator</span> -n observability

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-<span class="hljs-keyword">operator</span>   <span class="hljs-number">1</span>         <span class="hljs-number">1</span>         <span class="hljs-number">1</span>            <span class="hljs-number">1</span>           <span class="hljs-number">48</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jager" class="common-anchor-header">2.Jagerのデプロイ</h3><p>Jagerインスタンスを作成する最も簡単な方法は、次の例のようなYAMLファイルを作成することです。これはデフォルトのAllInOneストラテジーをインストールし、<strong>オールインワン</strong>イメージ（<strong>jaeger-agent</strong>、<strong>jaeger-collector</strong>、<strong>jaeger-query</strong>、Jaeger UIを組み合わせたもの）を単一のポッドにデプロイします。</p>
<p>トレースを長期間保存したい場合は、<a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategyを</a>参照してください。</p>
<pre><code translate="no" class="language-yaml">apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
<button class="copy-code-btn"></button></code></pre>
<p>YAMLファイルは<code translate="no">kubectl</code> ：</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f simplest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>数秒で、Jaegerの新しいインメモリ・オールインワンインスタンスが利用可能になり、迅速なデモや開発目的に適しています。作成されたインスタンスを確認するには、jaegerオブジェクトをリストアップする：</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> jaegers

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   <span class="hljs-number">1.62</span><span class="hljs-number">.0</span>    allinone   memory    <span class="hljs-number">13</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">HelmチャートでMilvusをインストールする<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の設定で、Milvus with Helm Chartをインストールまたはアップグレードすることができます：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">trace</span>:
      <span class="hljs-attr">exporter</span>: jaeger
      <span class="hljs-attr">sampleFraction</span>: <span class="hljs-number">1</span>
      <span class="hljs-attr">jaeger</span>:
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://jaeger-collector:14268/api/traces&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の設定をMilvusの新規導入に適用するには、以下のコマンドを実行します：</p>
<pre><code translate="no" class="language-shell">$ helm repo add zilliztech https://zilliztech.github.io/milvus-helm
$ helm repo update
$ helm upgrade --install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>上記の設定を既存のMilvus展開に適用するには、次のコマンドを実行します：</p>
<pre><code translate="no" class="language-shell">$ helm upgrade my-release -f values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Helm ChartでJaegerとMilvusをデプロイすると、dfaultによってingressが有効になります。以下のコマンドを実行することでイングレスを表示できます：</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> ingress

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       <span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.34</span>  <span class="hljs-number">80</span>      <span class="hljs-number">14</span>m
<button class="copy-code-btn"></button></code></pre>
<p>イングレスが利用可能になったら、<code translate="no">http://${ADDRESS}</code> にナビゲートしてJaeger UIにアクセスできます。<code translate="no">${ADDRESS}</code> をイングレスの実際のIPアドレスに置き換えてください。</p>
<p>以下のスクリーンショットは、Jaeger UIでMilvusの検索操作時と負荷収集操作時のトレースを表示したものです：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
   </span> <span class="img-wrapper"> <span>トレース検索リクエスト</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
   </span> <span class="img-wrapper"> <span>トレース負荷収集リクエスト</span> </span></p>
