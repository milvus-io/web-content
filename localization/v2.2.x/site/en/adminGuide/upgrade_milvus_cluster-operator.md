---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Learn how to upgrade Milvus cluster with Milvus Operator.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.2.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus Operator</a><a href="/docs/v2.2.x/upgrade_milvus_cluster-helm.md" class=''>Helm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Upgrade Milvus Cluster with Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to upgrade your Milvus cluster with Milvus operator.</p>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Upgrade your Milvus operator<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Run the following command to upgrade the version of your Milvus Operator to v0.7.17.</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//milvus-io.github.io/milvus-operator/</span>
helm repo update milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Once you have upgraded your Milvus operator to the latest version, you have the following choices:</p>
<ul>
<li>To upgrade Milvus from v2.2.3 or later releases to 2.2.16, you can <a href="#Conduct-a-rolling-upgrade">conduct a rolling upgrade</a>.</li>
<li>To upgrade Milvus from a minor release before v2.2.3 to 2.2.16, you are advised to <a href="#Upgrade-Milvus-by-changing-its-image">upgrade Milvus by changing its image version</a>.</li>
<li>To upgrade Milvus from v2.1.x to 2.2.16, you need to <a href="#Migrate-the-metadata">migrate the metadata</a> before the actual upgrade.</li>
</ul>
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
<p>Based on the rolling update capabilities provided by Kubernetes, the Milvus operator enforces an ordered update of the deployments according to their dependencies. In addition, Milvus implements a mechanism to ensure that its components remain compatible with those depending on them during the upgrade, significantly reducing potential service downtime.</p>
<p>The rolling upgrade feature is disabled by default. You need to explicitly enable it through a configuration file.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingUpgrade <span class="hljs-comment"># Default value, can be omitted</span>
    image: milvusdb/milvus:v2.2.16
<button class="copy-code-btn"></button></code></pre>
<p>In this above configuration file, set <code translate="no">spec.components.enableRollingUpdate</code> to <code translate="no">true</code> and set <code translate="no">spec.components.image</code> to the desired Milvus version.</p>
<p>By default, Milvus performs rolling upgrade for coordinators in an ordered way, in which it replaces the coordinator pod images one after another. To reduce the upgrade time, consider setting <code translate="no">spec.components.imageUpdateMode</code> to <code translate="no">all</code> so that Milvus replaces all pod images at the same time.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: all
    image: milvusdb/milvus:v2.2.16
<button class="copy-code-btn"></button></code></pre>
<p>You can set <code translate="no">spec.components.imageUpdateMode</code> to <code translate="no">rollingDowngrade</code> to have Milvus replace coordinator pod images with a lower version.</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  components:
    enableRollingUpdate: <span class="hljs-literal">true</span>
    imageUpdateMode: rollingDowngrade
    image: milvusdb/milvus:&lt;some-old-version&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Then save your configuration as a YAML file (for example, <code translate="no">milvusupgrade.yml</code>) and apply this configuration file to your Milvus instance as follows:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvusupgrade.yml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Upgrade Milvus by changing its image<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>In normal cases, you can simply update your Milvus to the latest by changing its image. However, note that there will be a certain downtime when upgrading Milvus in this way.</p>
<p>Compose a configuration file as follows and save it as <strong>milvusupgrade.yaml</strong>:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
spec:
  <span class="hljs-comment"># Omit other fields ...</span>
  components:
   image: milvusdb/milvus:v2.2.16
<button class="copy-code-btn"></button></code></pre>
<p>Then run the following to perform the upgrade:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Since Milvus 2.2.0, the metadata is incompatible with that in previous releases. The following example snippets assume an upgrade from Milvus 2.1.4 to Milvus 2.2.16.</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1. Create a <code translate="no">.yaml</code> file for metadata migration</h3><p>Create a metadata migration file. The following is an example. You need to specify the <code translate="no">name</code>, <code translate="no">sourceVersion</code>, and <code translate="no">targetVersion</code> in the configuration file. The following example sets the <code translate="no">name</code> to <code translate="no">my-release-upgrade</code>, <code translate="no">sourceVersion</code> to <code translate="no">v2.1.4</code>, and <code translate="no">targetVersion</code> to <code translate="no">v2.2.16</code>. This means that your Milvus cluster will be upgraded from v2.1.4 to v2.2.16.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: MilvusUpgrade
metadata:
  name: my-release-upgrade
spec:
  milvus:
    namespace: default
    name: my-release
  sourceVersion: <span class="hljs-string">&quot;v2.1.4&quot;</span>
  targetVersion: <span class="hljs-string">&quot;v2.2.16&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.2.16&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2. Apply the new configuration</h3><p>Run the following command to apply the new configuration.</p>
<pre><code translate="no">$ kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/zilliztech/milvus-operator/blob/main/config/samples/beta/milvusupgrade.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3. Check the status of metadata migration</h3><p>Run the following command to check the status of your metadata migration.</p>
<pre><code translate="no">kubectl describe milvus release-name
<button class="copy-code-btn"></button></code></pre>
<p>The status of <code translate="no">ready</code> in the output means that the metadata migration is successful.</p>
<p>Or, you can also run <code translate="no">kubectl get pod</code> to check all the pods. If all the pods are <code translate="no">ready</code>, the metadata migration is successful.</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4. Delete <code translate="no">my-release-upgrade</code></h3><p>When the upgrade is successful, delete <code translate="no">my-release-upgrade</code> in the YAML file.</p>
