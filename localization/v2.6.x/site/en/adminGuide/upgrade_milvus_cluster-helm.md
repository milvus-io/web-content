---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Helm Chart.
title: Upgrade Milvus Cluster with Helm Chart
---
<div class="tab-wrapper"><a href="/docs/upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="/docs/upgrade_milvus_cluster-helm.md" class='active '>Helm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Upgrade Milvus Cluster with Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to upgrade your Milvus cluster from v2.5.x to v2.6.0 using Helm Chart.</p>
<h2 id="Before-you-start" class="common-anchor-header">Before you start<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v260" class="common-anchor-header">What’s new in v2.6.0</h3><p>Upgrading from Milvus 2.5.x to 2.6.0 involves significant architectural changes:</p>
<ul>
<li><strong>Coordinator consolidation</strong>: Legacy separate coordinators (<code translate="no">dataCoordinator</code>, <code translate="no">queryCoordinator</code>, <code translate="no">indexCoordinator</code>) have been consolidated into a single <code translate="no">mixCoordinator</code></li>
<li><strong>New components</strong>: Introduction of Streaming Node and other new components</li>
<li><strong>Component removal</strong>: Certain legacy components including <code translate="no">indexNode</code> have been removed</li>
</ul>
<div class="alert note">
This upgrade is <strong>irreversible</strong>. You cannot roll back to a previous version once the upgrade is completed. For details on architectural changes, refer to <a href="/docs/architecture_overview.md">Milvus Architecture Overview</a>.
</div>
<h3 id="Requirements" class="common-anchor-header">Requirements</h3><p><strong>System requirements:</strong></p>
<ul>
<li>Helm version >= 3.14.0</li>
<li>Kubernetes version >= 1.20.0</li>
<li>Milvus cluster deployed via Helm Chart</li>
</ul>
<p><strong>Compatibility requirements:</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 is <strong>not compatible</strong> with v2.6.0. Direct upgrades from release candidates are not supported.</li>
<li>You <strong>must</strong> upgrade to v2.5.16 with <code translate="no">mixCoordinator</code> enabled before upgrading to v2.6.0.</li>
</ul>
<div class="alert note">
Since Milvus Helm chart version 4.2.21, we introduced pulsar-v3.x chart as dependency. For backward compatibility, please upgrade your Helm to v3.14 or later version, and be sure to add the <code translate="no">--reset-then-reuse-values</code> option whenever you use <code translate="no">helm upgrade</code>.
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Upgrade process<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Upgrade-Helm-Chart" class="common-anchor-header">Step 1: Upgrade Helm Chart</h3><p>First, upgrade your Milvus Helm chart to version 5.0.0:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
The Milvus Helm Charts repo at <code translate="no">https://milvus-io.github.io/milvus-helm/</code> has been archived. Use the new repo <code translate="no">https://zilliztech.github.io/milvus-helm/</code> for chart versions 4.0.31 and later.
</div>
<h3 id="Step-2-Upgrade-to-v2516-with-mixCoordinator" class="common-anchor-header">Step 2: Upgrade to v2.5.16 with mixCoordinator</h3><p>Check if your cluster currently uses separate coordinators:</p>
<pre><code translate="no" class="language-bash">kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>If you see separate coordinator pods (<code translate="no">datacoord</code>, <code translate="no">querycoord</code>, <code translate="no">indexcoord</code>), upgrade to v2.5.16 and enable <code translate="no">mixCoordinator</code>:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --<span class="hljs-built_in">set</span> mixCoordinator.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> rootCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> indexCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> queryCoordinator.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> dataCoordinator.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
<div class="alert-note">
<p>If your cluster already uses <code translate="no">mixCoordinator</code>, simply upgrade the image:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.5.16&quot;</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Wait for the upgrade to complete:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Monitor the upgrade progress  </span>
kubectl get pods -l app.kubernetes.io/name=milvus -w

<span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods -l app.kubernetes.io/name=milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Upgrade-to-v260" class="common-anchor-header">Step 3: Upgrade to v2.6.0</h3><p>Once v2.5.16 is running successfully with <code translate="no">mixCoordinator</code>, upgrade to v2.6.0:</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v2.6.0&quot;</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span> \
  --reset-then-reuse-values \
  --version=5.0.0
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verify the upgrade<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Confirm your cluster is running the new version:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods -l app.kubernetes.io/name=milvus

<span class="hljs-comment"># Verify Helm release</span>
helm list
<button class="copy-code-btn"></button></code></pre>
<p>For additional support, consult the <a href="https://milvus.io/docs">Milvus documentation</a> or <a href="https://github.com/milvus-io/milvus/discussions">community forum</a>.</p>
