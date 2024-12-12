---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: >-
  Milvus recommands you to upgrade Pulsar to v3 for Milvus v2.5.x. However, if
  you prefer to use Pulsar v2, this article will guide you through the steps to
  continue using Pulsar v2 with Milvus v2.5.x.
title: Use Pulsar v2 with Milvus v2.5.x
---
<h1 id="Use-Pulsar-v2-with-Milvus-v25x" class="common-anchor-header">Use Pulsar v2 with Milvus v2.5.x<button data-href="#Use-Pulsar-v2-with-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus recommands you to upgrade Pulsar to v3 for running Milvus v2.5.x. For details, refer to <a href="/docs/upgrade-pulsar-v3.md">Upgrade Pulsar</a>. However, if you prefer to use Pulsar v2 with Milvus v2.5.x, this article will guide you through the procedure for running Milvus v2.5.x with Pulsar v2.</p>
<p>If you already have a running Milvus instance and want to upgrade it to v2.5.x but continue using Pulsar v2, you can follow the steps on this page.</p>
<h2 id="Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="common-anchor-header">Continue using Pulsar v2 while upgrading Milvus v2.5.x<button data-href="#Continue-using-Pulsar-v2-while-upgrading-Milvus-v25x" class="anchor-icon" translate="no">
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
    </button></h2><p>This section will guide you through the steps to continue using Pulsar v2 while upgrading your running Milvus instance to Milvus v2.5.x.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">For Milvus Operator users</h3><p>Milvus Operator is compatible with Pulsar v2 upgrades by default. You can upgrade your Milvus instance to v2.5.x by referring to <a href="/docs/upgrade_milvus_cluster-operator.md">Upgrade Milvus Cluster with Milvus Operator</a>.</p>
<p>Once the upgrade is complete, you can continue using Pulsar v2 with your Milvus instance.</p>
<h3 id="For-Helm-users" class="common-anchor-header">For Helm users</h3><p>Before the upgrade, ensure that</p>
<ul>
<li><p>Your Helm version is above v3.12, and the latest version is recommanded.</p>
<p>For more information, refer to <a href="https://helm.sh/docs/intro/install/">Install Helm</a>.</p></li>
<li><p>Your Kubernetes veresion is above v1.20.</p></li>
</ul>
<p>Operations in this article assumes that:</p>
<ul>
<li><p>Milvus has been installed in the <code translate="no">default</code> namespace.</p></li>
<li><p>The release name of Milvus is <code translate="no">my-release</code>.</p></li>
</ul>
<p>You need to change the <code translate="no">values.yaml</code> file to specify the Pulsar version as v2 before upgrading Milvus. The steps are as follows:</p>
<ol>
<li><p>Get the current <code translate="no">values.yaml</code> file of your Milvus instance.</p>
<pre><code translate="no" class="language-bash">namespace=default
release=my-release
helm -n <span class="hljs-variable">${namespace}</span> get values <span class="hljs-variable">${release}</span> -o yaml &gt; values.yaml
<span class="hljs-built_in">cat</span> values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit the <code translate="no">values.yaml</code> file to specify the Pulsar version as v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># ... omit existing values</span>
pulsar:
  enabled: <span class="hljs-literal">true</span>
pulsarv3:
  enabled: <span class="hljs-literal">false</span>
image:
  all:
    repository: milvusdb/milvus
    tag: v2.5.0-beta 
<button class="copy-code-btn"></button></code></pre>
<p>For <code translate="no">image</code>, change the <code translate="no">tag</code> to the desired Milvus version (e.g. <code translate="no">v2.5.0-beta</code>).</p></li>
<li><p>Update Milvus Helm chart.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm</span>
helm repo update milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Upgrade Milvus instance.</p>
<pre><code translate="no" class="language-bash">helm -n <span class="hljs-variable">$namespace</span> upgrade <span class="hljs-variable">$releaase</span> milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Creating-a-new-Milvus-instance-with-Pulsar-v2" class="common-anchor-header">Creating a new Milvus instance with Pulsar v2<button data-href="#Creating-a-new-Milvus-instance-with-Pulsar-v2" class="anchor-icon" translate="no">
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
    </button></h2><p>This section will guide you through the steps to create a new Milvus instance with Pulsar v2.</p>
<h3 id="For-Milvus-Operator-users" class="common-anchor-header">For Milvus Operator users</h3><p>Before you deploy Milvus v2.5.x, you need to download and edit the Milvus Customer Resource Definition (CRD) file. For details on how to install Milvus using Milvus Operator, refer to <a href="/docs/install_cluster-milvusoperator.md">Install Milvus Cluster with Milvus Operator</a>.</p>
<ol>
<li><p>Download the CRD file.</p>
<pre><code translate="no" class="language-bash">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit the <code translate="no">milvus_cluster_default.yaml</code> file to specify the Pulsar version as v2.</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">apiVersion</span>: milvus.<span class="hljs-property">io</span>/v1beta1
 <span class="hljs-attr">kind</span>: <span class="hljs-title class_">Milvus</span>
 <span class="hljs-attr">metadata</span>:
   <span class="hljs-attr">name</span>: my-release
   <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
   <span class="hljs-attr">labels</span>:
     <span class="hljs-attr">app</span>: milvus
 <span class="hljs-attr">spec</span>:
   <span class="hljs-attr">mode</span>: cluster
   <span class="hljs-attr">dependencies</span>:
     <span class="hljs-attr">pulsar</span>:
       <span class="hljs-attr">inCluster</span>:
         <span class="hljs-attr">chartVersion</span>: pulsar-v2
<button class="copy-code-btn"></button></code></pre>
<p>For <code translate="no">dependencies</code>, change the <code translate="no">pulsar.inCluster.chartVersion</code> to <code translate="no">pulsar-v2</code>.</p></li>
<li><p>Continue with the steps in <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Install Milvus Cluster with Milvus Operator</a> to deploy Milvus v2.5.x with Pulsar v2 using the edited CRD file.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_cluster_default.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="For-Helm-users" class="common-anchor-header">For Helm users</h3><p>Before you deploy Milvus v2.5.x, you can either prepare a <code translate="no">values.yaml</code> file or use the inline parameters to specify the Pulsar version. For details on how to install Milvus using Helm, refer to <a href="/docs/install_cluster-helm.md">Install Milvus Cluster with Helm</a>.</p>
<ul>
<li><p>Use inline parameters to specify the Pulsar version as v2.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">true</span>,pulsarv3.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use a <code translate="no">values.yaml</code> file to specify the Pulsar version as v2.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
<span class="hljs-attr">pulsarv3</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Then, deploy Milvus v2.5.x with Pulsar v2 using the <code translate="no">values.yaml</code> file.</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
