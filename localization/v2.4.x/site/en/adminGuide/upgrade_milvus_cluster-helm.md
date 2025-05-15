---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Helm Chart.
title: Upgrade Milvus Cluster with Helm Chart
---
<div class="tab-wrapper"><a href="/docs/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>Milvus Operator</a><a href="/docs/v2.4.x/upgrade_milvus_cluster-helm.md" class='active '>Helm</a></div>
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
    </button></h1><p>This guide describes how to upgrade your Milvus cluster with Milvus Helm charts.</p>
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
<li>Helm version >= 3.14.0</li>
<li>Kubernetes version >= 1.20.0</li>
</ul>
<div class="alert note">
<p>Since Milvus-Helm chart version 4.2.21, we introduced pulsar-v3.x chart as dependency. For backward compatibility, please upgrade your helm to v3.14 or later version, and be sure to add the <code translate="no">--reset-then-reuse-values</code> option whenever you use <code translate="no">helm upgrade</code>.</p>
</div>
<h2 id="Check-Milvus-Helm-Chart" class="common-anchor-header">Check Milvus Helm Chart<button data-href="#Check-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Run the following commands to check new Milvus versions.</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">helm repo update zilliztech</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">helm search repo zilliztech/milvus --versions</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>The Milvus Helm Charts repo at <code translate="no">https://milvus-io.github.io/milvus-helm/</code> has been archived and you can get further updates from <code translate="no">https://zilliztech.github.io/milvus-helm/</code> as follows:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>The archived repo is still available for the charts up to 4.0.31. For later releases, use the new repo instead.</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>You can choose the upgrade path for your Milvus as follows:</p>
<div style="display: none;">- [Conduct a rolling upgrade](#conduct-a-rolling-upgrade) from Milvus v2.2.3 and later releases to v2.4.23.</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Upgrade Milvus using Helm</a> for an upgrade from a minor release before v2.2.3 to v2.4.23.</p></li>
<li><p><a href="#Migrate-the-metadata">Migrate the metadata</a> before the upgrade from Milvus v2.1.x to v2.4.23.</p></li>
</ul>
<div style="display: none;">
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">Conduct a rolling upgrade<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Since Milvus 2.2.3, you can configure Milvus coordinators to work in active-standby mode and enable the rolling upgrade feature for them, so that Milvus can respond to incoming requests during the coordinator upgrades. In previous releases, coordinators are to be removed and then created during an upgrade, which may introduce certain downtime of the service.</p>
<p>Rolling upgrades requires coordinators to work in active-standby mode. You can use <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">the script</a> we provide to configure the coordinators to work in active-standby mode and start the rolling upgrade.</p>
<p>Based on the rolling update capabilities provided by Kubernetes, the above script enforces an ordered update of the deployments according to their dependencies. In addition, Milvus implements a mechanism to ensure that its components remain compatible with those depending on them during the upgrade, significantly reducing potential service downtime.</p>
<p>The script applies only to the upgrade of Milvus installed with Helm. The following table lists the command flags available in the scripts.</p>
<table>
<thead>
<tr><th>Parameters</th><th>Description</th><th>Default value</th><th>Required</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvus instance name</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>Namespace that Milvus is installed in</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">t</code></td><td>Target Milvus version</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">w</code></td><td>New Milvus image tag</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>True</td></tr>
<tr><td><code translate="no">o</code></td><td>Operation</td><td><code translate="no">update</code></td><td>False</td></tr>
</tbody>
</table>
<p>Once you have ensured that all deployments in your Milvus instance are in their normal status. You can run the following command to upgrade the Milvus instance to 2.4.23.</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.sh -n default -i my-release -o update -t 2.4.23 -w &#x27;milvusdb/milvus:v2.4.23&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>The script hard-codes the upgrade order of the deployments and cannot be changed.</li>
<li>The script uses <code translate="no">kubectl patch</code> to update the deployments and <code translate="no">kubectl rollout status</code> to watch their status.</li>
<li>The script uses <code translate="no">kubectl patch</code> to update the <code translate="no">app.kubernetes.io/version</code> label of the deployments to the one specified after the <code translate="no">-t</code> flag in the command.</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Upgrade Milvus using Helm<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>To upgrade Milvus from a minor release before v2.2.3 to the latest, run the following commands:</p>
<pre><code translate="no" class="language-shell">helm repo update zilliztech
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values --version=4.1.24 # use the helm chart version here
<button class="copy-code-btn"></button></code></pre>
<p>Use the Helm chart version in the preceding command. For details on how to obtain the Helm chart version, refer to <a href="#Check-the-Milvus-version">Check the Milvus version</a>.</p>
<h2 id="Migrate-the-metadata" class="common-anchor-header">Migrate the metadata<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus 2.2.0.</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1. Check the Milvus version</h3><p>Run <code translate="no">$ helm list</code> to check your Milvus app version. You can see the <code translate="no">APP VERSION</code> is 2.1.4.</p>
<pre><code translate="no">NAME                NAMESPACE   REVISION    UPDATED                                 STATUS      CHART           APP VERSION    
<span class="hljs-keyword">new</span><span class="hljs-operator">-</span><span class="hljs-keyword">release</span>         <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span><span class="hljs-number">-11</span><span class="hljs-number">-21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> <span class="hljs-operator">+</span><span class="hljs-number">0800</span> CST     deployed    milvus<span class="hljs-number">-3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span> 
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2. Check the running pods</h3><p>Run <code translate="no">$ kubectl get pods</code> to check the running pods. You can see the following output.</p>
<pre><code translate="no">NAME                                             READY   STATUS      RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datacoord<span class="hljs-number">-664</span>c58798d<span class="hljs-operator">-</span>fl75s    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-5</span>f75686c55<span class="hljs-operator">-</span>xfg2r     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexcoord<span class="hljs-number">-5</span>f98b97589<span class="hljs-number">-2</span>l48r   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-number">-857</span>b4ddf98<span class="hljs-operator">-</span>vmd75    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-6</span>c548f787f<span class="hljs-operator">-</span>scspp        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querycoord<span class="hljs-operator">-</span>c454f44cd<span class="hljs-operator">-</span>dwmwq    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-76</span>bb4946d<span class="hljs-operator">-</span>lbrz6     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>rootcoord<span class="hljs-number">-7764</span>c5b686<span class="hljs-number">-62</span>msm    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                              <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-1</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-number">-2</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>bookie<span class="hljs-operator">-</span>init<span class="hljs-operator">-</span>tjxpj             <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>broker<span class="hljs-number">-0</span>                      <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>proxy<span class="hljs-number">-0</span>                       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>init<span class="hljs-operator">-</span>c8vvc             <span class="hljs-number">0</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     Completed   <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>recovery<span class="hljs-number">-0</span>                    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-0</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">21</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-1</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>pulsar<span class="hljs-operator">-</span>zookeeper<span class="hljs-number">-2</span>                   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-number">20</span>m
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3. Check the image tag</h3><p>Check the image tag for the pod <code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code>. You can see the release of your Milvus cluster is v2.1.4.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl get pods my-release-milvus-proxy-6c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4. Migrate the metadata</h3><p>A major change in Milvus 2.2 is the metadata structure of segment indexes. Therefore, you need to use Helm to migrate the metadata while upgrading Milvus from v2.1.x to v2.2.0. Here is <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">a script</a> for you to safely migrate your metadata.</p>
<p>This script only applies to Milvus installed on a K8s cluster. Roll back to the previous version with the rollback operation first if an error occurs during the process.</p>
<p>The following table lists the operations you can do for meta migration.</p>
<table>
<thead>
<tr><th>Parameters</th><th>Description</th><th>Default value</th><th>Required</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>The Milvus instance name.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">n</code></td><td>The namespace that Milvus is installed in.</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">s</code></td><td>The source Milvus version.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">t</code></td><td>The target Milvus version.</td><td><code translate="no">None</code></td><td>True</td></tr>
<tr><td><code translate="no">r</code></td><td>The root path of Milvus meta.</td><td><code translate="no">by-dev</code></td><td>False</td></tr>
<tr><td><code translate="no">w</code></td><td>The new Milvus image tag.</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>The meta migration image tag.</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>The meta migration operation.</td><td><code translate="no">migrate</code></td><td>False</td></tr>
<tr><td><code translate="no">d</code></td><td>Whether to delete migration pod after the migration is completed.</td><td><code translate="no">false</code></td><td>False</td></tr>
<tr><td><code translate="no">c</code></td><td>The storage class for meta migration pvc.</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>The etcd enpoint used by milvus.</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1. Migrate the metadata</h4><ol>
<li>Download the <a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">migration script</a>.</li>
<li>Stop the Milvus components. Any live session in the Milvus etcd can cause a migration failure.</li>
<li>Create a backup for the Milvus metadata.</li>
<li>Migrate the Milvus metadata.</li>
<li>Start Milvus components with a new image.</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-220" class="common-anchor-header">2. Upgrade Milvus from v2.1.x to 2.2.0</h4><p>The following commands assume that you upgrade Milvus from v2.1.4 to 2.2.0. Change them to the versions that fit your needs.</p>
<ol>
<li><p>Specify Milvus instance name, source Milvus version, and target Milvus version.</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specify the namespace with <code translate="no">-n</code> if your Milvus is not installed in the default K8s namespace.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specify the root path with <code translate="no">-r</code> if your Milvus is installed with the custom <code translate="no">rootpath</code>.</p>
<pre><code translate="no">./migrate<span class="hljs-selector-class">.sh</span> -<span class="hljs-selector-tag">i</span> my-release -n milvus -s <span class="hljs-number">2.1</span>.<span class="hljs-number">4</span> -t <span class="hljs-number">2.2</span>.<span class="hljs-number">0</span> -<span class="hljs-attribute">r</span> by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Specify the image tag with <code translate="no">-w</code> if your Milvus is installed with a custom <code translate="no">image</code>.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Set <code translate="no">-d true</code> if you want to automatically remove the migration pod after the migration is completed.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -w milvusdb/milvus:v2.2.0 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Rollback and migrate again if the migration fails.</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o rollback -w milvusdb/milvus:v2.1.4
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.2.0 -r by-dev -o migrate -w milvusdb/milvus:v2.2.0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
