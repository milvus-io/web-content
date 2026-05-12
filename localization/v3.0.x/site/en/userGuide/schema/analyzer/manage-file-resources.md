---
id: manage-file-resources.md
title: Manage File Resources
summary: >-
  Register and manage external dictionary files that Milvus text analyzers can
  load at runtime.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Manage File Resources<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>A <strong>file resource</strong> is a server-registered reference to an external dictionary file that text analyzers consume at runtime. In Milvus 3.0, four analyzer components can load their dictionaries from a file resource instead of from an inline array:</p>
<table>
   <tr>
     <th><p><strong>Analyzer component</strong></p></th>
     <th><p><strong>Parameter that accepts a file resource</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/jieba-tokenizer.md">Jieba tokenizer</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/stop-filter.md">Stop filter</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/decompounder-filter.md">Decompounder filter</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/synonym-filter.md">Synonym filter</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>File resources solve two practical problems with inline dictionary arrays:</p>
<ul>
<li><p>Real dictionaries are large. A Chinese Jieba vocabulary can be tens of thousands of lines; synonym tables are typically thousands of rules. Inlining them into analyzer configuration is impractical.</p></li>
<li><p>The same dictionary is usually shared across collections. Registering it once, then referencing it by name, keeps schemas small and makes dictionary updates a single operation.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">File resource types<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports two file resource types with different management responsibilities:</p>
<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Where the file lives</strong></p></th>
     <th><p><strong>Who manages the file</strong></p></th>
     <th><p><strong>Fit</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Remote</strong></p></td>
     <td><p>In the object store (MinIO / S3 / GCS / Azure) that your Milvus cluster is already configured to use</p></td>
     <td><p>Milvus, via the <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> client APIs</p></td>
     <td><p>Recommended for most deployments.</p></td>
   </tr>
   <tr>
     <td><p><strong>Local</strong></p></td>
     <td><p>At the same absolute path on the local filesystem of every Milvus component (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>You — mount the file yourself, for example via a Kubernetes volume</p></td>
     <td><p>Open-source / self-hosted scenarios where you prefer to manage dictionary files outside Milvus.</p></td>
   </tr>
</table>
<p>The rest of this page walks through both types, starting with the more common remote type.</p>
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
<li><p>For <strong>Remote</strong> file resources, your Milvus deployment must be configured with an object store. Most deployments already are — check the <code translate="no">minio:</code> section of your <code translate="no">milvus.yaml</code> (or the equivalent Helm chart values). Note the <code translate="no">bucketName</code> and <code translate="no">rootPath</code> values; you will need them when registering file resources.</p></li>
<li><p>For <strong>Local</strong> file resources, you must be able to place files on every Milvus pod / container at the same absolute path. How you do that depends on your deployment (bind mount, ConfigMap-backed volume, init container, etc.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Register a remote file resource<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Registering a remote file resource is a three-step workflow: <strong>upload</strong> the file to object storage, <strong>register</strong> it with Milvus under a chosen name, then <strong>reference</strong> it from any analyzer that needs it.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Step 1. Upload the dictionary file to object storage<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Use your own tooling (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, or any S3-compatible client) to put the file in the bucket that Milvus is configured to use.</p>
<p>For example, if <code translate="no">milvus.yaml</code> contains:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Uploading a file named <code translate="no">chinese_terms.txt</code> with <code translate="no">rootPath</code> as the prefix places the object at <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>The <code translate="no">path</code> argument you will pass to <code translate="no">add_file_resource</code> in Step 2 is the <strong>full object key, including the rootPath prefix</strong> — for the example above, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. A path without the prefix (for example, just <code translate="no">&quot;chinese_terms.txt&quot;</code>) is rejected with the error <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Step 2. Register the file with <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> validates synchronously: the call returns only after Milvus has confirmed that the object exists at <code translate="no">path</code> in the configured object store. If the object is missing, the call raises <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> — upload the file first, then retry.</p>
<p>The call is idempotent. Calling <code translate="no">add_file_resource</code> twice with the same <code translate="no">name</code> and <code translate="no">path</code> does not create duplicates.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Step 3. Reference the file resource from an analyzer<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Wherever an analyzer parameter accepts a file reference (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), use the canonical remote form:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>All four analyzer parameters use the same shape; only the surrounding analyzer key differs. For concrete per-analyzer examples, see Jieba tokenizer, Stop filter, Decompounder filter, and Synonym filter.</p>
<p>The parameter names are <code translate="no">resource_name</code> and <code translate="no">file_name</code> — not <code translate="no">name</code> and <code translate="no">file</code>. Using <code translate="no">name</code> / <code translate="no">file</code> (or <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> instead of <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) raises <code translate="no">MilvusException</code> at analyzer-creation time with a message like <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">List file resources<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> returns a list of <code translate="no">FileResourceInfo</code> objects, each with <code translate="no">.name</code> and <code translate="no">.path</code> attributes. The empty cluster returns <code translate="no">[]</code>. There is no per-resource <code translate="no">get</code>; <code translate="no">list_file_resources</code> is the only read API.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Remove a file resource<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> is idempotent: calling it for a name that does not exist returns <code translate="no">None</code> without raising.</p>
<p>Before removing a file resource, drop or alter any collections whose analyzer configurations reference it. Keeping a file resource around until no collection depends on it avoids the risk of analyzer lookups failing after the resource is gone.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Use a local file resource<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>A <strong>local</strong> file resource points directly at a path on the local filesystem of each Milvus component. There is no <code translate="no">add_file_resource</code> call — Milvus does not track local resources. You place the file at the same absolute path on every relevant pod or container yourself, then reference it by path:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Local file resources are only valid in deployments where you control the filesystems of DataNodes, QueryNodes, and StreamingNodes — typically self-hosted Milvus on bare-metal or on a Kubernetes cluster where you can add a volume mount. The file must exist at exactly the same absolute path on every component; otherwise some nodes fail when loading the analyzer.</p>
<p>The file is opened when the analyzer is first created. If the path does not exist at that point, the analyzer creation fails with <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Considerations<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>Cluster-wide availability is not instantaneous.</strong> After <code translate="no">add_file_resource</code> returns, Milvus synchronizes the file to every component that needs it. During this brief window, a collection that references the resource may fail to create on nodes that have not yet synced. The typical fix is to retry the create call after a few seconds.</p></li>
<li><p><strong>Remove only when no collection depends on the resource.</strong> Drop or alter any collection whose analyzer configuration references the resource before calling <code translate="no">remove_file_resource</code>, to avoid analyzer lookups that fail to find the file.</p></li>
<li><p><strong>Metadata only.</strong> <code translate="no">list_file_resources()</code> returns <code translate="no">name</code> and <code translate="no">path</code> — there is no size, checksum, upload time, or other metadata. Keep track of dictionary versions with your own naming convention if you need it.</p></li>
</ul>
