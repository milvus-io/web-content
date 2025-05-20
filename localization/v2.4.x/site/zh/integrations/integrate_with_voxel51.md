---
id: integrate_with_voxel51.md
summary: 本页讨论与 voxel51 的集成
title: 与 Milvus 和 FiftyOne 一起进行视觉搜索
---
<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">使用 Milvus 和 FiftyOne 进行视觉搜索<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOne</a>是一款用于构建高质量数据集和计算机视觉模型的开源工具。本指南可帮助您将 Milvus 的相似性搜索功能集成到 FiftyOne 中，从而在自己的数据集上进行视觉搜索。</p>
<p>FiftyOne 提供了一个 API，用于创建 Milvus 数据集、上传向量和运行相似性查询，既可以用 Python<a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">编程</a>，也可以在应用程序中通过点击<a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">操作</a>来实现。本页的演示重点是编程集成。</p>
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
    </button></h2><p>开始之前，请确保具备以下条件：</p>
<ul>
<li>运行中的<a href="/docs/zh/v2.4.x/install_standalone-docker.md">Milvus 服务器</a>。</li>
<li>安装了<code translate="no">pymilvus</code> 和<code translate="no">fiftyone</code> 的 Python 环境。</li>
<li>要搜索的图像<a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">数据集</a>。</li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">安装要求<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>在本例中，我们将使用<code translate="no">pymilvus</code> 和<code translate="no">fiftyone</code> 。您可以通过运行以下命令来安装它们：</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">基本配方<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 Milvus 在 FiftyOne 数据集上创建相似性索引并以此查询数据的基本工作流程如下：</p>
<ol>
<li>将<a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">数据集</a>载入 FiftyOne</li>
<li>为数据集中的样本或斑块计算向量嵌入，或选择一个模型用于生成嵌入。</li>
<li>使用 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>方法，通过设置参数<code translate="no">backend=&quot;milvus&quot;</code> 和指定<code translate="no">brain_key</code> ，为数据集中的样本或对象补丁生成 Milvus 相似性指数。</li>
<li>使用此 Milvus 相似性索引查询数据时，请使用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>如果需要，可以删除该索引。</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">程序<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>下面的示例演示了上述工作流程。</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1.将数据集加载到 FiftyOne，并计算样本的嵌入度</h3><p>以下代码使用 FiftyOne 提供的样本图像集来演示集成。您可以参考<a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">这篇文章</a>准备自己的图像集。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
    dataset,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2.进行视觉相似性搜索</h3><p>现在，您可以使用 Milvus 相似性索引对数据集进行视觉相似性搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Delete-the-index" class="common-anchor-header">3.删除索引</h3><p>如果不再需要 Milvus 相似性索引，可使用以下代码将其删除：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">使用 Milvus 后台<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>默认情况下，调用 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>或<code translate="no">sort_by_similarity()</code> 将使用 sklearn 后端。</p>
<p>要使用 Milvus 后端，只需将可选的后端参数 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>的可选后台参数设置为<code translate="no">&quot;milvus&quot;</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.<span class="hljs-property">brain</span> <span class="hljs-keyword">as</span> fob

fob.<span class="hljs-title function_">compute_similarity</span>(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<p>或者，你也可以通过设置以下环境变量，将 FiftyOne 永久配置为使用 Milvus 后端：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>或通过设置位于<code translate="no">~/.fiftyone/brain_config.json</code> 的<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">大脑配置</a>中的<code translate="no">default_similarity_backend</code> 参数，永久<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">配置 FiftyOne</a>使用 Milvus 后端：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;default_similarity_backend&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">身份验证<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您使用的是自定义的 Milvus 服务器，您可以通过多种方式提供认证。</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">环境变量（推荐）</h3><p>配置 Milvus 认证的推荐方式是将其存储在以下所示的环境变量中，每当与 Milvus 建立连接时，FiftyOne 都会自动访问这些变量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>
<h3 id="FiftyOne-Brain-config" class="common-anchor-header">FiftyOne 大脑配置</h3><p>您也可以将凭据存储在位于<code translate="no">~/.fiftyone/brain_config.json</code> 的<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">大脑配置</a>中：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>请注意，这个文件在您创建之前并不存在。</p>
<h3 id="Keyword-arguments" class="common-anchor-header">关键字参数</h3><p>每次调用需要连接到 Milvus 的方法时，您可以手动提供 Milvus 认证作为关键字参数，例如 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>等需要连接 Milvus 的方法时，您可以手动提供 Milvus 凭据作为关键字参数：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>请注意，使用此策略时，您必须在以后通过 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-config-parameters" class="common-anchor-header">Milvus 配置参数</h3><p>Milvus 后端支持多种查询参数，可用于自定义相似性查询。这些参数包括</p>
<ul>
<li><p><strong>collection_</strong><em>name（无</em>）：要使用或创建的 Milvus 集合名称。如果没有提供，将创建一个新的集合</p></li>
<li><p><strong>metric</strong>（<em>"dotproduct"）</em>：创建新索引时使用的嵌入距离度量。支持的值是 (<code translate="no">&quot;dotproduct&quot;</code>,<code translate="no">&quot;euclidean&quot;</code>)</p></li>
<li><p><strong>consistency_</strong><em>level</em>（<em>"会话"）</em>：要使用的一致性级别。支持的值有 (<code translate="no">&quot;Strong&quot;</code>,<code translate="no">&quot;Session&quot;</code>,<code translate="no">&quot;Bounded&quot;</code>,<code translate="no">&quot;Eventually&quot;</code>)</p></li>
</ul>
<p>有关这些参数的详细信息，请参阅<a href="/docs/zh/v2.4.x/authenticate.md">Milvus 身份验证文档</a>和<a href="/docs/zh/v2.4.x/consistency.md">Milvus 一致性级别文档</a>。</p>
<p>你可以通过上一节描述的任何策略来指定这些参数。下面是一个包含所有可用参数的<a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">大脑配置</a>示例：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;your_collection&quot;</span>,
            <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;dotproduct&quot;</span>,
            <span class="hljs-string">&quot;consistency_level&quot;</span>: <span class="hljs-string">&quot;Strong&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>不过，通常这些参数会直接传递给 <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a>来配置特定的新索引：</p>
<pre><code translate="no" class="language-python">milvus_index = fob.<span class="hljs-title function_">compute_similarity</span>(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">管理大脑运行<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>FiftyOne 提供了多种管理大脑运行的方法。</p>
<p>例如，你可以调用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a>来查看数据集上可用的脑键：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
    <span class="hljs-built_in">type</span>=fob.Similarity,
    patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
    supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>或使用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a>检索有关大脑运行配置的信息：</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>使用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>加载 <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a>实例。</p>
<p>您可以使用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a>重命名与现有相似性结果运行相关的大脑密钥：</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>最后，可以使用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a>删除大脑运行：</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>调用 <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a>只会删除 FiftyOne 数据集中的大脑运行记录，而不会删除任何相关的 Milvus 数据集：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>有关使用 Milvus 后端在 FiftyOne 数据集上进行常见向量搜索的工作流程，请参阅<a href="https://docs.voxel51.com/integrations/milvus.html#examples">此处的示例</a>。</p>
