---
id: manage-file-resources.md
title: 管理文件资源
summary: 注册和管理外部字典文件，Milvus 文本分析器可在运行时加载这些文件。
---
<h1 id="Manage-File-Resources" class="common-anchor-header">管理文件资源<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>文件资源</strong>是一个服务器注册的外部字典文件引用，文本分析器在运行时使用该引用。在 Milvus 3.0 中，四个分析器组件可以从文件资源而不是内联数组加载字典：</p>
<table>
   <tr>
     <th><p><strong>分析器组件</strong></p></th>
     <th><p><strong>接受文件资源的参数</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/jieba-tokenizer.md">Jieba 标记符号生成器</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/stop-filter.md">停止过滤器</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/decompounder-filter.md">反编译过滤器</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh/synonym-filter.md">同义词过滤器</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>文件资源解决了内联字典数组的两个实际问题：</p>
<ul>
<li><p>真正的字典很大。中文杰巴词汇可能有数万行；同义词表通常有数千条规则。将它们内联到分析器配置中是不切实际的。</p></li>
<li><p>同一词典通常在 Collections 中共享。只需注册一次，然后通过名称进行引用，就能使 Schema 保持较小的规模，并且只需进行一次字典更新操作。</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">文件资源类型<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持两种具有不同管理职责的文件资源类型：</p>
<table>
   <tr>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>文件存放位置</strong></p></th>
     <th><p><strong>谁管理文件</strong></p></th>
     <th><p><strong>适合</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>远程</strong></p></td>
     <td><p>在您的 Milvus 集群已配置使用的对象存储（MinIO / S3 / GCS / Azure）中</p></td>
     <td><p>Milvus，通过<code translate="no">add_file_resource</code> /<code translate="no">remove_file_resource</code> /<code translate="no">list_file_resources</code> 客户端 API</p></td>
     <td><p>建议用于大多数部署。</p></td>
   </tr>
   <tr>
     <td><p><strong>本地</strong></p></td>
     <td><p>在每个 Milvus 组件（数据节点、查询节点、流节点）的本地文件系统上的相同绝对路径上。</p></td>
     <td><p>你--自己挂载文件，例如通过 Kubernetes 卷</p></td>
     <td><p>开源/自托管方案，您更喜欢在 Milvus 之外管理字典文件。</p></td>
   </tr>
</table>
<p>本页其余部分将介绍这两种类型，从更常见的远程类型开始。</p>
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
<li><p>对于<strong>远程</strong>文件资源，Milvus 部署必须配置对象存储。大多数部署已经配置了对象存储，请查看<code translate="no">milvus.yaml</code> 的<code translate="no">minio:</code> 部分（或相应的 Helm 图表值）。请注意<code translate="no">bucketName</code> 和<code translate="no">rootPath</code> 值；注册文件资源时会用到它们。</p></li>
<li><p>对于<strong>本地</strong>文件资源，您必须能够以相同的绝对路径将文件放置在每个 Milvus pod / 容器上。具体方法取决于部署情况（绑定挂载、ConfigMap 支持卷、init 容器等）。</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">注册远程文件资源<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>注册远程文件资源的工作流程分为三步：<strong>将</strong>文件<strong>上传到</strong>对象存储，以选定的名称在 Milvus<strong>注册</strong>，然后从任何需要它的分析器中<strong>引用</strong>它。</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">步骤 1.将字典文件上传到对象存储<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>使用自己的工具（<code translate="no">mc</code>,<code translate="no">aws s3 cp</code>,<code translate="no">boto3</code> 或任何兼容 S3 的客户端）将文件放入 Milvus 配置使用的存储桶中。</p>
<p>例如，如果<code translate="no">milvus.yaml</code> 包含</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>上传一个以<code translate="no">rootPath</code> 为前缀、名为<code translate="no">chinese_terms.txt</code> 的文件，就会将对象放到<code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code> 。</p>
<p>在步骤 2 中，你将传递给<code translate="no">add_file_resource</code> 的<code translate="no">path</code> 参数是<strong>完整的对象密钥，包括 rootPath 前缀</strong>--在上面的例子中，是<code translate="no">path=&quot;file/chinese_terms.txt&quot;</code> 。没有前缀的路径（例如，只有<code translate="no">&quot;chinese_terms.txt&quot;</code> ）会被拒绝，错误信息是<code translate="no">file resource path not exist</code> 。</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">步骤 2.注册文件<code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
<p><code translate="no">add_file_resource</code> 同步验证：只有在 Milvus 确认对象存在于配置的对象存储空间<code translate="no">path</code> 后，调用才会返回。如果对象丢失，调用会引发<code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - 先上传文件，然后重试。</p>
<p>该调用具有惰性。使用相同的<code translate="no">name</code> 和<code translate="no">path</code> 调用<code translate="no">add_file_resource</code> 两次不会产生重复。</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">第 3 步从分析器引用文件资源<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>只要分析器参数接受文件引用（<code translate="no">extra_dict_file</code>,<code translate="no">stop_words_file</code>,<code translate="no">word_list_file</code>,<code translate="no">synonyms_file</code> ），就应使用规范远程形式：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>所有四个分析器参数都使用相同的形状，只有周围的分析器键不同。有关每个分析器的具体示例，请参见 Jieba tokenizer、Stop filter、Decompounder filter 和 Synonym filter。</p>
<p>参数名称是<code translate="no">resource_name</code> 和<code translate="no">file_name</code> ，而不是<code translate="no">name</code> 和<code translate="no">file</code> 。使用<code translate="no">name</code> /<code translate="no">file</code> （或<code translate="no">&quot;type&quot;: &quot;resource&quot;</code> 代替<code translate="no">&quot;type&quot;: &quot;remote&quot;</code> ）会在创建分析器时引发<code translate="no">MilvusException</code> ，并显示类似<code translate="no">resource name of remote file ... must be set</code> 的信息。</p>
<h2 id="List-file-resources" class="common-anchor-header">列出文件资源<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
<p><code translate="no">list_file_resources()</code> 返回<code translate="no">FileResourceInfo</code> 对象的列表，每个对象都有<code translate="no">.name</code> 和<code translate="no">.path</code> 属性。空簇返回<code translate="no">[]</code> 。<code translate="no">get</code> <code translate="no">list_file_resources</code> 是唯一的读取 API。</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">删除文件资源<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
<p><code translate="no">remove_file_resource</code> 是idempotent 的：为一个不存在的名称调用该函数，将返回<code translate="no">None</code> ，而不会引发任何问题。</p>
<p>删除文件资源前，请删除或更改分析器配置引用该资源的任何 Collections。将文件资源保留到不依赖该资源的 Collections 中，可避免分析器在资源消失后查找失败的风险。</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">使用本地文件资源<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>本地</strong>文件资源直接指向每个 Milvus 组件本地文件系统的路径。没有<code translate="no">add_file_resource</code> 调用 - Milvus 不会跟踪本地资源。你需要将文件放置在每个相关 pod 或容器的相同绝对路径上，然后通过路径引用它：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>本地文件资源只在你控制数据节点、查询节点和流节点的文件系统的部署中有效--通常是裸机上的自托管 Milvus 或 Kubernetes 集群上的自托管 Milvus，你可以在其中添加卷挂载。文件必须以完全相同的绝对路径存在于每个组件上，否则某些节点在加载分析器时会失败。</p>
<p>该文件在分析器首次创建时打开。如果此时路径不存在，则分析器创建失败，显示<code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code> 。</p>
<h2 id="Considerations" class="common-anchor-header">注意事项<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>整个集群的可用性不是即时的。</strong> <code translate="no">add_file_resource</code> 返回后，Milvus 会将文件同步到需要它的每个组件。在这个短暂的窗口期间，引用资源的 Collections 可能会在尚未同步的节点上创建失败。典型的解决方法是在几秒钟后重试创建调用。</p></li>
<li><p><strong>只有当没有 Collection 依赖于资源时才删除。</strong>在调用<code translate="no">remove_file_resource</code> 之前，删除或更改分析器配置引用该资源的任何 Collections，以避免分析器查找时找不到文件。</p></li>
<li><p><code translate="no">list_file_resources()</code> 返回<code translate="no">name</code> 和<code translate="no">path</code> - 没有大小、校验和、上传时间或其他元数据<strong>。</strong>如果需要，可使用自己的命名约定来跟踪字典版本。</p></li>
</ul>
