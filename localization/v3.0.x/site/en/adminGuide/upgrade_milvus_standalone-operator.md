---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Learn how to upgrade Milvus standalone with Milvus Operator.
title: Upgrade Milvus Standalone with Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/upgrade_milvus_standalone-operator.md" class='active '>Milvus Operator</a><a href="/docs/upgrade_milvus_standalone-helm.md" class=''>Helm</a><a href="/docs/upgrade_milvus_standalone-docker.md" class=''>Docker Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Upgrade Milvus Standalone with Milvus Operator<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to upgrade a Milvus 2.6.x standalone deployment to v3.0-beta with Milvus Operator.</p>
<div class="alert note">
<p>This procedure has been validated from Milvus 2.6.20 to Milvus v3.0-beta with Milvus Operator 1.3.0, Woodpecker, in-cluster etcd, and in-cluster MinIO. If you use another Milvus 2.6.x patch release, Operator version, message queue, or dependency configuration, validate the upgrade in a non-production environment first.</p>
</div>
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
<li>A Kubernetes cluster with a Milvus 2.6.x standalone deployment managed by Milvus Operator</li>
<li><code translate="no">kubectl</code> access to the cluster</li>
<li>The complete Milvus custom resource (CR) manifest used for the existing deployment</li>
<li>The installation method and manifests used for the existing Milvus Operator</li>
<li>A current backup of Milvus metadata and persistent data</li>
</ul>
<p><strong>Message Queue limitations</strong>: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.</p>
<div class="alert warning">
<p>This procedure does not validate a downgrade or rollback by changing the Milvus image back to 2.6.x. After v3.0-beta writes data, an image-only rollback can fail to read the updated state. If the upgrade fails, stop writes and use a recovery plan that restores the pre-upgrade metadata and persistent data backups. Validate the recovery plan in a non-production environment first.</p>
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">Step 1: Back up the current Milvus CR<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>Save the current CR before changing the deployment:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Use the source manifest for your existing deployment as the upgrade manifest. Do not apply the exported backup file directly without first removing server-managed metadata and status fields.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">Step 2: Confirm the Milvus Operator version<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>Check the image used by the installed Milvus Operator:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>The validated upgrade kept Milvus Operator at version 1.3.0. Keep the Operator version that currently manages your Milvus 2.6.x deployment unless your support policy requires a separate Operator upgrade. Do not downgrade a newer Operator to the tested version. If you need to change the Operator version, use the same Helm or <code translate="no">kubectl</code> installation method and the same release name and namespace as the existing installation, then validate the Operator change before updating the Milvus CR.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">Step 3: Update the Milvus image<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>In the complete Milvus CR manifest, change only <code translate="no">spec.components.image</code>. Keep the existing mode, component settings, message queue, etcd, storage, and other dependency settings. The following excerpt shows the field to change; do not replace your complete CR with this excerpt.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
<button class="copy-code-btn"></button></code></pre>
<p>Apply the complete CR manifest:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
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
    </button></h2><p>Check the CR status, Pod status, and container images:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verify that the Milvus CR reports <code translate="no">Healthy</code>, the current image is <code translate="no">milvusdb/milvus:v3.0-beta</code>, and the existing collections remain queryable and searchable. Complete these checks before you enable any v3.0-beta-specific feature.</p>
