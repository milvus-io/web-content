---
id: config_jaeger_tracing.md
title: Configure Trace
related_key: 'Jaeger, Milvus, Trace'
summary: >-
  This guide provides instructions on how to configure Jaeger to collect traces
  for Milvus.
---
<h1 id="Configure-Trace" class="common-anchor-header">Configure Trace<button data-href="#Configure-Trace" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide provides instructions on how to configure Jaeger to collect traces for Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>You have installed necessary tools, including <a href="https://helm.sh/docs/intro/install/">Helm</a> and <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
<li>Cert-manager version 1.6.1 or higher must be installed. An installation guide can be found <a href="https://cert-manager.io/v1.6-docs/installation/#default-static-install">here</a>.</li>
</ul>
<h2 id="Deply-Jaeger" class="common-anchor-header">Deply Jaeger<button data-href="#Deply-Jaeger" class="anchor-icon" translate="no">
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
    </button></h2><p>Jaeger is a distributed tracing platform released as open source by <a href="http://uber.github.io/">Uber Technologies</a>.</p>
<h3 id="1-Installing-the-Jaeger-Operator-on-Kubernetes" class="common-anchor-header">1. Installing the Jaeger Operator on Kubernetes</h3><p>To install the operator, run:</p>
<pre><code translate="no" class="language-shell">$ kubectl create namespace observability
$ kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.62.0/jaeger-operator.yaml -n observability
<button class="copy-code-btn"></button></code></pre>
<p>At this point, there should be a <code translate="no">jaeger-operator</code> deployment available. You can view it by running the following command:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> deployment jaeger-<span class="hljs-keyword">operator</span> -n observability

NAME              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jaeger-<span class="hljs-keyword">operator</span>   <span class="hljs-number">1</span>         <span class="hljs-number">1</span>         <span class="hljs-number">1</span>            <span class="hljs-number">1</span>           <span class="hljs-number">48</span>s
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Deploy-Jager" class="common-anchor-header">2. Deploy Jager</h3><p>The simplest possible way to create a Jaeger instance is by creating a YAML file like the following example. This will install the default AllInOne strategy, which deploys the <strong>all-in-one</strong> image (combining <strong>jaeger-agent</strong>, <strong>jaeger-collector</strong>, <strong>jaeger-query</strong>, and Jaeger UI) in a single pod, using <strong>in-memory storage</strong> by default.</p>
<p>If you want to store traces for a long time, please refer to <a href="https://www.jaegertracing.io/docs/1.62/operator/#production-strategy">production-strategy</a>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
<button class="copy-code-btn"></button></code></pre>
<p>The YAML file can then be used with <code translate="no">kubectl</code>:</p>
<pre><code translate="no" class="language-shell">$ kubectl apply -f simplest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>In a few seconds, a new in-memory all-in-one instance of Jaeger will be available, suitable for quick demos and development purposes. To check the instances that were created, list the jaeger objects:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> jaegers

NAME     STATUS    VERSION   STRATEGY   STORAGE   AGE
jaeger   Running   <span class="hljs-number">1.62</span><span class="hljs-number">.0</span>    allinone   memory    <span class="hljs-number">13</span>s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-with-Helm-Chart" class="common-anchor-header">Install Milvus with Helm Chart<button data-href="#Install-Milvus-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>You can install or upgrade Milvus with Helm Chart with the following settings:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraConfigFiles</span>:
  user.<span class="hljs-property">yaml</span>: |+
    <span class="hljs-attr">trace</span>:
      <span class="hljs-attr">exporter</span>: jaeger
      <span class="hljs-attr">sampleFraction</span>: <span class="hljs-number">1</span>
      <span class="hljs-attr">jaeger</span>:
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://jaeger-collector:14268/api/traces&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To apply the above settings to a new Milvus deployment , you can run the following command:</p>
<pre><code translate="no" class="language-shell">$ helm repo add zilliztech https://zilliztech.github.io/milvus-helm
$ helm repo update
$ helm upgrade --install -f values.yaml my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>To apply the above settings to an existing Milvus deployment, you can run the following command:</p>
<pre><code translate="no" class="language-shell">$ helm upgrade my-release -f values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="View-Traces" class="common-anchor-header">View Traces<button data-href="#View-Traces" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have deployed Jaeger and Milvus with Helm Chart, an ingress has been enabled by dfault. You can view the ingress by running the following command:</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> ingress

NAME           CLASS    HOSTS   ADDRESS         PORTS   AGE
jaeger-query   &lt;none&gt;   *       <span class="hljs-number">192.168</span><span class="hljs-number">.122</span><span class="hljs-number">.34</span>  <span class="hljs-number">80</span>      <span class="hljs-number">14</span>m
<button class="copy-code-btn"></button></code></pre>
<p>Once the ingress is available, you can access the Jaeger UI by navigating to <code translate="no">http://${ADDRESS}</code>. Replace <code translate="no">${ADDRESS}</code> with the actual IP address of the ingress.</p>
<p>The following screenshot shows the Jaeger UI with the traces of Milvus during a search operation and a load-collection operation:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/jaeger-trace-search.PNG" alt="Trace Search Request" class="doc-image" id="trace-search-request" />
    <span>Trace Search Request</span>
  </span>
</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/jaeger-trace-load.png" alt="Trace Load Collection Request" class="doc-image" id="trace-load-collection-request" />
    <span>Trace Load Collection Request</span>
  </span>
</p>
