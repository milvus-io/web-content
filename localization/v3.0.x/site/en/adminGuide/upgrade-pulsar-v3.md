---
id: upgrade-pulsar-v3.md
related_key: upgrade pulsar v3
summary: >-
  Learn how to upgrade Pulsar from V2 to V3 in Milvus so that you can use the
  latest version of Milvus v2.5.x.
title: Upgrade Pulsar in Milvus from V2 to V3
---
<h1 id="Upgrading-Pulsar-​" class="common-anchor-header">Upgrading Pulsar ​<button data-href="#Upgrading-Pulsar-​" class="anchor-icon" translate="no">
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
    </button></h1><p>This article describes the proceure for you to upgrade your Pulsar component from V2 to V3 if you already have a working Milvus deployment with Pulsar V2.​</p>
<p>Since Milvus v2.5, <strong>milvus-helm</strong> and <strong>milvus-operator</strong> will use Pulsar V3 by default to fix some bugs and security vulnerabilities.​ While Milvus 2.5 is compatible with Pulsar 2.x, upgrading to Pulsar V3 is optional. For enhanced stability and performance, we recommend upgrading to Pulsar V3.</p>
<p>If you prefer to use Pulsar V2 with Milvus v2.5.x, read <a href="/docs/use-pulsar-v2.md">Use Pulsar V2 with Milvus v2.5.x</a>.</p>
<div class="alert note">
<ol>
<li><p>The upgrade process requires a brief service outage (usually takes about a few minutes to more than ten minutes, depending on the amount of data).​</p></li>
<li><p>Before the operation, you need to stop all running clients from writing data to Milvus. Otherwise, the written data may be lost.​</p></li>
<li><p>This article assumes that Milvus is installed in namespace <code translate="no">default</code> and named <code translate="no">my-release</code>. Please change the parameters to your own namespace and release name while executing the commands copied from this page.​</p></li>
<li><p>Ensure that your work environment has permissions under the above-mentioned namespace in the Kubernetes cluster and the following commands are installed:​</p>
<p>a. <code translate="no">kubectl</code> >= 1.20​</p>
<p>b. <code translate="no">helm</code> >= 3.14.0​</p>
<p>c. <code translate="no">cat</code>, <code translate="no">grep</code>, <code translate="no">awk</code> for string manipulate operations​</p>
<p>d. <code translate="no">curl</code> or <strong>Attu v2.4+</strong> to interact with milvus management API​</p></li>
</ol>
</div>
<h2 id="Roadmap" class="common-anchor-header">Roadmap<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>The upgrade process includes the following steps:</p>
<ol>
<li><p><a href="#Persist-data-not-consumed-in-Pulsar">Persist data not consumed in pulsar​.</a></p></li>
<li><p><a href="#Stop-Milvus-and-delete-Pulsar-V2">Stop Milvus and delete pulsar V2​.</a></p></li>
<li><p><a href="#Start-Pulsar-V3-and-Milvus">Start Pulsar V3 and Milvus​.</a></p></li>
</ol>
<h2 id="Procedures" class="common-anchor-header">Procedures<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>This section provides the detailed procedures for upgrading Pulsar from V2 to V3 in Milvus.​</p>
<h3 id="Persist-data-not-consumed-in-Pulsar" class="common-anchor-header">Persist data not consumed in Pulsar<button data-href="#Persist-data-not-consumed-in-Pulsar" class="anchor-icon" translate="no">
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
    </button></h3><p>In this step, you need to ensure that the existing data in Pulsar has been persisted to the object storage service.​ There are two approaches available, and you can choose the one that suits your needs.​</p>
<h4 id="Approach-1-Using-Attu" class="common-anchor-header">Approach 1: Using Attu</h4><p>If you have only a small number of collections in your working Milvus deployment with not many segments, you can use Attu to persist the data to the object storage service.​</p>
<ol>
<li><p>Select every collection in all your databases, get into the <code translate="no">Segments</code> panel, Click the <code translate="no">Flush</code> button​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/attu-select-collection.png" alt="Segment panel of a collection" class="doc-image" id="segment-panel-of-a-collection" />
    <span>Segment panel of a collection</span>
  </span>
</p></li>
<li><p>Then upon the popup, Click <code translate="no">Flush</code> again.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data-flush-prompt.png" alt="Data flush prompt in Attu" class="doc-image" id="data-flush-prompt-in-attu" />
    <span>Data flush prompt in Attu</span>
  </span>
</p></li>
<li><p>Then wait until all collections’ Persistent Segment States are <code translate="no">Flushed</code>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/view-data-peristent-process.png" alt="View data flush status in Attu" class="doc-image" id="view-data-flush-status-in-attu" />
    <span>View data flush status in Attu</span>
  </span>
</p></li>
</ol>
<h4 id="Approach-2-Using-management-API" class="common-anchor-header">Approach 2: Using management API</h4><ol>
<li><p>Proxy port 9091 of Milvus proxy to the local host for subsequent operations.​</p>
<pre><code translate="no" class="language-bash">kubectl -n default port-forward deploy/my-release-milvus-proxy 9091:9091 &amp;​
<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>] <span class="hljs-number">8116</span><span class="hljs-string">​</span>
<span class="hljs-string">Forwarding</span> <span class="hljs-string">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span><span class="hljs-string">:9091</span> <span class="hljs-string">-&gt;</span> <span class="hljs-number">9091</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Save Pid for later cleanup.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">pid=8116​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Trigger the action of persisting all inserted data from Pulsar to Ojbect Storage​.</p>
<pre><code translate="no" class="language-bash">curl 127.0.0.1:9091/api/v1/collections \​
|curl 127.0.0.1:9091/api/v1/persist -d @/dev/stdin\​
|jq <span class="hljs-string">&#x27;.flush_coll_segIDs&#x27;</span>| jq <span class="hljs-string">&#x27;[.[] | .data[]]&#x27;</span> | jq <span class="hljs-string">&#x27;{segmentIDs: (.)}&#x27;</span> \​
&gt; flushing_segments.json​
<span class="hljs-built_in">cat</span> flushing_segments.json​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">{<span class="hljs-string">​</span>
  <span class="hljs-attr">&quot;segmentIDs&quot;:</span> [<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998181000</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953999383600</span>,<span class="hljs-string">​</span>
    <span class="hljs-number">454097953998180800</span><span class="hljs-string">​</span>
  ]<span class="hljs-string">​</span>
}<span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check All segments flushed.​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> flushing_segments.json|  curl -X GET 127.0.0.1:9091/api/v1/persist/state -d @/dev/stdin ​

<button class="copy-code-btn"></button></code></pre>
<p>When it is finished, you should see the following output​</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span><span class="hljs-attr">&quot;flushed&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">}</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Stop the backendground <code translate="no">kubectl port-forward</code> process​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kill</span> <span class="hljs-string">$pid​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml">[<span class="hljs-number">1</span>]  <span class="hljs-string">+</span> <span class="hljs-number">8116 </span><span class="hljs-string">terminated</span>  <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">port-forward</span> <span class="hljs-string">deploy/my-release-milvus-proxy</span> <span class="hljs-number">9091</span><span class="hljs-string">:9091</span>                      <span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Stop-Milvus-and-delete-Pulsar-V2" class="common-anchor-header">Stop Milvus and delete Pulsar V2<button data-href="#Stop-Milvus-and-delete-Pulsar-V2" class="anchor-icon" translate="no">
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
    </button></h3><p>In this step, you need to stop the Milvus pod and delete the Pulsar V2 deployment.​ There are two separate sections available:</p>
<ul>
<li><p>For Milvus Helm users</p>
<p>If you have installed Milvus using the Milvus Helm chart, go to <a href="#Delete-Pulsar-V2-using-Helm">Delete Pulsar v2 using Helm</a>.</p></li>
<li><p>For Milvus Operator users</p>
<p>If you have installed Milvus using the Milvus Operator, go to <a href="#Delete-Pulsar-V2-using-Milvus-Operator">Delete Pulsar v2 using Milvus Operator</a>.</p></li>
</ul>
<h4 id="Delete-Pulsar-V2-using-Helm" class="common-anchor-header">Delete Pulsar V2 using Helm</h4><p>If you have installed Milvus using the Milvus Helm chart, following the steps below to stop the Milvus pod and delete the Pulsar V2 deployment.</p>
<ol>
<li><p>Save the current Milvus release values to <code translate="no">values.yaml</code> for later recover:​</p>
<pre><code translate="no" class="language-bash">helm -n default get values my-release -o yaml &gt; values.yaml​
<span class="hljs-built_in">cat</span> values.yaml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use the command to stop Milvus and all the dependencies. Don’t worry about the data volumes, they will be kept by default.​</p>
<pre><code translate="no" class="language-bash">helm -n default uninstall my-release​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash">These resources were kept due to the resource policy:​
[PersistentVolumeClaim] my-release-minio​
​
release <span class="hljs-string">&quot;my-release&quot;</span> uninstalled​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>List pulsar PVCs & PVs (Persistent Volume Claims & Persistent Volume) needs to be cleared​</p>
<pre><code translate="no" class="language-bash">kubectl -n default get pvc -lapp=pulsar,release=my-release |grep -v NAME |awk <span class="hljs-string">&#x27;{print $1}&#x27;</span> &gt; pulsar-pvcs.txt​
kubectl -n default get pvc -lapp=pulsar,release=my-release -o custom-columns=VOL:.spec.volumeName|grep -v VOL &gt; pulsar-pvs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volume Claims:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvcs.txt​
<span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;Volumes:&quot;</span>​
<span class="hljs-built_in">cat</span> pulsar-pvs.txt​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">Volume</span> <span class="hljs-string">Claims:​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0​</span>
<span class="hljs-string">my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0​</span>
<span class="hljs-string">Volumes:​</span>
<span class="hljs-string">pvc-f590a4de-df31-4ca8-a424-007eac3c619a​</span>
<span class="hljs-string">pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3​</span>
<span class="hljs-string">pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b​</span>
<span class="hljs-string">pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf​</span>
<span class="hljs-string">pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check if the PVC list of <code translate="no">pulsar-pvcs.txt</code> is all for Pulsar.​ Once you have confirmed that there is no error, delete the PVCs.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> pulsar-pvcs.txt |xargs -I {} kubectl -n default delete pvc {} --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-journal-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-0&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-bookie-ledgers-my-release-pulsar-bookie-1&quot;</span> <span class="hljs-string">deleted​</span>
<span class="hljs-string">persistentvolumeclaim</span> <span class="hljs-string">&quot;my-release-pulsar-zookeeper-data-my-release-pulsar-zookeeper-0&quot;</span> <span class="hljs-string">deleted​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>(Optional) Depending on the storage class providing the PVC, you may also need to manually remove the PV.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">cat</span> <span class="hljs-string">pulsar-pvs.txt</span> <span class="hljs-string">|xargs</span> <span class="hljs-string">-I</span> {} <span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">delete</span> <span class="hljs-string">pvc</span> {} <span class="hljs-string">--wait=false​</span>

<button class="copy-code-btn"></button></code></pre>
<p>It’s OK if it outputs NotFound errors. It’s already deleted by kubernetes controllers.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-f590a4de-df31-4ca8-a424-007eac3c619a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-17b0e215-3e14-4d14-901e-1a1dda9ff5a3&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-72f83c25-6ea1-45ee-9559-0b783f2c530b&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-60dcb6e4-760d-46c7-af1a-d1fc153b0caf&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>
<span class="hljs-attr">Error from server (NotFound):</span> <span class="hljs-string">persistentvolumeclaims</span> <span class="hljs-string">&quot;pvc-2da33f64-c053-42b9-bb72-c5d50779aa0a&quot;</span> <span class="hljs-string">not</span> <span class="hljs-string">found​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Delete-Pulsar-V2-using-Milvus-Operator" class="common-anchor-header">Delete Pulsar V2 using Milvus Operator</h4><p>If you have installed Milvus using the Milvus Operator, following the steps below to stop the Milvus pod and delete the Pulsar V2 deployment.</p>
<ol>
<li><p>Save current Milvus Manifest to <code translate="no">milvus.yaml</code> for later use​.</p>
<pre><code translate="no" class="language-bash">kubectl -n default get milvus my-release -o yaml &gt; milvus.yaml​
<span class="hljs-built_in">head</span> milvus.yaml -n 20​

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-string">annotations:​</span>
    <span class="hljs-attr">milvus.io/dependency-values-merged:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/pod-service-label-added:</span> <span class="hljs-string">&quot;true&quot;</span><span class="hljs-string">​</span>
    <span class="hljs-attr">milvus.io/querynode-current-group-id:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-attr">creationTimestamp:</span> <span class="hljs-string">&quot;2024-11-22T08:06:59Z&quot;</span><span class="hljs-string">​</span>
  <span class="hljs-string">finalizers:​</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus.milvus.io/finalizer​</span>
  <span class="hljs-attr">generation:</span> <span class="hljs-number">3</span><span class="hljs-string">​</span>
  <span class="hljs-string">labels:​</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus​</span>
    <span class="hljs-attr">milvus.io/operator-version:</span> <span class="hljs-number">1.1</span><span class="hljs-number">.2</span><span class="hljs-string">​</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">my-release​</span>
<span class="hljs-attr">namespace:</span> <span class="hljs-string">default​</span>
<span class="hljs-attr">resourceVersion:</span> <span class="hljs-string">&quot;692217324&quot;</span><span class="hljs-string">​</span>
<span class="hljs-attr">uid:</span> <span class="hljs-string">7a469ed0-9df1-494e-bd9a-340fac4305b5​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">components:​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Create an <code translate="no">patch.yaml</code> File with following content.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># a patch to retain etcd &amp; storage data and delete pulsar data while delete milvus​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">etcd:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">storage:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Retain​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">false</span><span class="hljs-string">​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete​</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Use <code translate="no">kubectl patch</code> to retain etcd & storage data and delete pulsar data while delete milvus​.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">patch</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release</span> <span class="hljs-string">--patch-file</span> <span class="hljs-string">patch.yaml</span> <span class="hljs-string">--type=merge​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Output:​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io/my-release patched​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Stop Milvus and delete pulsar V2. Don’t worry about the etcd & object storage data volumes, they will be kept by default.​</p>
<pre><code translate="no" class="language-bash">kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">false</span>​
kubectl -n default get milvus my-release​
kubectl -n default delete milvus my-release --<span class="hljs-built_in">wait</span>=<span class="hljs-literal">true</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Output: Note it might take a few minutes for milvus to graceful stop & for operator to delete pulsar volumes.​</p>
<pre><code translate="no" class="language-bash">milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​
NAME         MODE      STATUS     UPDATED   AGE​
my-release   cluster   Deleting   True      41m​
milvus.milvus.io <span class="hljs-string">&quot;my-release&quot;</span> deleted​

<button class="copy-code-btn"></button></code></pre>
<p>Wait until the command finished.​</p></li>
<li><p>Check again to see the Milvus Resource is gone​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">-n</span> <span class="hljs-string">default</span> <span class="hljs-string">get</span> <span class="hljs-string">milvus</span> <span class="hljs-string">my-release​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Output should be like:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-literal">No</span> <span class="hljs-string">resources</span> <span class="hljs-string">found</span> <span class="hljs-string">in</span> <span class="hljs-string">default</span> <span class="hljs-string">namespace.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Start-Pulsar-V3-and-Milvus" class="common-anchor-header">Start Pulsar V3 and Milvus<button data-href="#Start-Pulsar-V3-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>In this step, you need to start the Pulsar V3 and Milvus pods.​ There are two separate sections available:</p>
<ul>
<li><p>For Helm User</p>
<p>If you have installed Milvus using the Milvus Helm chart, go to <a href="#For-Helm-User">For Helm User</a>.</p></li>
<li><p>For Milvus Operator users</p>
<p>If you have installed Milvus using the Milvus Operator, go to <a href="#For-Milvus-Operator-User">For Milvus Operator User</a>.</p></li>
</ul>
<h4 id="Start-Pulsar-V3-and-using-Helm" class="common-anchor-header">Start Pulsar V3 and using Helm</h4><ol>
<li><p>Edit the <code translate="no">values.yaml</code> saved in previous Step.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the following:​</span>
<span class="hljs-string">pulsar:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># set to false​</span>
  <span class="hljs-comment"># you may also clean up rest fields under pulsar field​</span>
  <span class="hljs-comment"># it&#x27;s ok to keep them though.​</span>
<span class="hljs-string">pulsarv3:​</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span><span class="hljs-string">​</span>
  <span class="hljs-comment"># append other values for pulsar v3 chart if needs​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Update your local helm repo​</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm​
helm repo update zilliztech​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash"><span class="hljs-string">&quot;zilliztech&quot;</span> already exists with the same configuration, skipping​
Hang tight <span class="hljs-keyword">while</span> we grab the latest from your chart repositories...​
...Successfully got an update from the <span class="hljs-string">&quot;zilliztech&quot;</span> chart repository​
Update Complete. ⎈Happy Helming!⎈​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Install your milvus release with the newest helm chart version using the edited <code translate="no">values.yaml</code> ​</p>
<pre><code translate="no" class="language-bash">helm -n default install my-release zilliztech/milvus --reset-values -f values.yaml​

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-bash">NAME: my-release​
LAST DEPLOYED: Fri Nov 22 15:31:27 2024​
NAMESPACE: default​
STATUS: deployed​
REVISION: 1​
TEST SUITE: None​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check the pods to see if all of them get scheduled and running​ with <code translate="no">kubectl -n default get pods</code>.</p>
<p>It may take a few minutes for all pods to get started​</p>
<p>Output is like:​</p>
<pre><code translate="no" class="language-bash">NAME                                          READY   STATUS      RESTARTS   AGE​
my-release-etcd-0                             1/1     Running     0          4m3s​
my-release-milvus-datanode-56487bc4bc-s6mbd   1/1     Running     0          4m5s​
my-release-milvus-indexnode-6476894d6-rv85d   1/1     Running     0          4m5s​
my-release-milvus-mixcoord-6d8875cb9c-67fcq   1/1     Running     0          4m4s​
my-release-milvus-proxy-7bc45d57c5-2qf8m      1/1     Running     0          4m4s​
my-release-milvus-querynode-77465747b-kt7f4   1/1     Running     0          4m4s​
my-release-minio-684ff4f5df-pnc97             1/1     Running     0          4m5s​
my-release-pulsarv3-bookie-0                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-1                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-2                  1/1     Running     0          4m3s​
my-release-pulsarv3-bookie-init-6z4tk         0/1     Completed   0          4m1s​
my-release-pulsarv3-broker-0                  1/1     Running     0          4m2s​
my-release-pulsarv3-broker-1                  1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-0                   1/1     Running     0          4m2s​
my-release-pulsarv3-proxy-1                   1/1     Running     0          4m2s​
my-release-pulsarv3-pulsar-init-wvqpc         0/1     Completed   0          4m1s​
my-release-pulsarv3-recovery-0                1/1     Running     0          4m3s​
my-release-pulsarv3-zookeeper-0               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-1               1/1     Running     0          4m2s​
my-release-pulsarv3-zookeeper-2               1/1     Running     0          4m2s​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h4 id="Start-Pulsar-V3-and-using-Milvus-Operator" class="common-anchor-header">Start Pulsar V3 and using Milvus Operator</h4><ol>
<li><p>Edit the <code translate="no">milvus.yaml</code> saved in previous Step.​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># change the followings fields:​</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1​</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus​</span>
<span class="hljs-string">metadata:​</span>
  <span class="hljs-attr">annotations:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">resourceVersion:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
  <span class="hljs-attr">uid:</span> <span class="hljs-literal">null</span> <span class="hljs-comment"># this field should be removed or set to null​</span>
<span class="hljs-string">spec:​</span>
  <span class="hljs-string">dependencies:​</span>
    <span class="hljs-string">pulsar:​</span>
      <span class="hljs-string">inCluster:​</span>
        <span class="hljs-attr">chartVersion:</span> <span class="hljs-string">pulsar-v3​</span>
        <span class="hljs-comment"># delete all previous values for pulsar v2 and set it to null.​</span>
        <span class="hljs-comment"># you may add additional values here for pulsar v3 if you&#x27;re sure about it.​</span>
        <span class="hljs-attr">values:</span> <span class="hljs-literal">null</span><span class="hljs-string">​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ensure your Milvus Operator is upgraded to v1.1.2 or later version​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">add</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">https://zilliztech.github.io/milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">repo</span> <span class="hljs-string">update</span> <span class="hljs-string">milvus-operator​</span>
<span class="hljs-string">helm</span> <span class="hljs-string">-n</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">upgrade</span> <span class="hljs-string">milvus-operator</span> <span class="hljs-string">milvus-operator/milvus-operator​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Use command to start milvus with pulsar v3​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">-f</span> <span class="hljs-string">milvus.yaml​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Output​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">milvus.milvus.io/my-release</span> <span class="hljs-string">created​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check the pods to see if all of them get scheduled and running​ with <code translate="no">kubectl -n default get pods</code>. ​</p>
<p>It may take a few minutes for all pods to get started.​</p>
<p>Output is like:​</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">NAME</span>                                            <span class="hljs-string">READY</span>   <span class="hljs-string">STATUS</span>      <span class="hljs-string">RESTARTS</span>   <span class="hljs-string">AGE​</span>
<span class="hljs-string">my-release-etcd-0</span>                               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-milvus-datanode-57fd59ff58-5mdrk</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-indexnode-67867c6b9b-4wsbw</span>    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-mixcoord-797849f9bb-sf8z5</span>     <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-proxy-5d5bf98445-c55m6</span>        <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">93s​</span>
<span class="hljs-string">my-release-milvus-querynode-0-64797f5c9-lw4rh</span>   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">92s​</span>
<span class="hljs-string">my-release-minio-79476ccb49-zvt2h</span>               <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">65m​</span>
<span class="hljs-string">my-release-pulsar-bookie-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-2</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-bookie-init-v8fdj</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-0</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-broker-1</span>                      <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-proxy-0</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-proxy-1</span>                       <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-pulsar-init-5lhx7</span>             <span class="hljs-number">0</span><span class="hljs-string">/1</span>     <span class="hljs-string">Completed</span>   <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-recovery-0</span>                    <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-0</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m11s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-1</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>
<span class="hljs-string">my-release-pulsar-zookeeper-2</span>                   <span class="hljs-number">1</span><span class="hljs-string">/1</span>     <span class="hljs-string">Running</span>     <span class="hljs-number">0</span>          <span class="hljs-string">5m10s​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>​</p>
