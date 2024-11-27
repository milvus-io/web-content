---
id: build_rag_on_arm.md
summary: >-
  在本教程中，您将学习如何在基于 Arm 的基础架构上构建检索增强生成（RAG）应用程序。在向量存储方面，我们利用了全面管理的 Milvus 向量数据库
  Zilliz Cloud。Zilliz Cloud 可在 AWS、GCP 和 Azure 等主流云上使用。在本演示中，我们使用部署在 AWS 上的
  Zilliz Cloud 和 Arm 机器。对于 LLM，我们在 AWS 基于 Arm 的服务器 CPU 上使用 Llama-3.1-8B 模型，使用
  llama.cpp。
title: 在 Arm 架构上构建 RAG
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">在 Arm 架构上构建 RAG<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.arm.com/">Arm</a>CPU 广泛应用于各种应用，包括传统的机器学习 (ML) 和人工智能 (AI) 用例。</p>
<p>在本教程中，您将学习如何在基于 Arm 的基础架构上构建检索增强生成 (RAG) 应用程序。在向量存储方面，我们利用了全面管理的 Milvus 向量数据库<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。Zilliz Cloud 可在 AWS、GCP 和 Azure 等主流云上使用。在本演示中，我们使用部署在 AWS 上的 Zilliz Cloud 和 Arm 机器。对于 LLM，我们在基于 Arm 的 AWS 服务器 CPU 上使用<code translate="no">Llama-3.1-8B</code> 模型，<code translate="no">llama.cpp</code> 。</p>
<h2 id="Prerequisite" class="common-anchor-header">前提条件<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>要运行本示例，我们建议您使用<a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>，它为在基于 Arm 的服务器上运行 ML 工作负载提供了一种经济高效的方法。本笔记本在装有 Ubuntu 22.04 LTS 系统的 AWS Graviton3<code translate="no">c7g.2xlarge</code> 实例上进行了测试。</p>
<p>运行此示例至少需要四个内核和 8GB 内存。配置磁盘存储至少达到 32 GB。我们建议您使用规格相同或更高的实例。</p>
<p>启动实例后，连接并运行以下命令准备环境。</p>
<p>在服务器上安装 python：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>创建并激活虚拟环境：</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>安装所需的 python 依赖项：</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">离线数据加载<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">创建 Collections</h3><p>我们使用部署在 AWS 上的<a href="https://zilliz.com/cloud">Zilliz Cloud</a>与基于 Arm 的机器来存储和检索向量数据。要快速启动，只需在 Zilliz Cloud 上免费<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">注册一个账户</a>。</p>
<div class="alert note">
<p>除了 Zilliz Cloud，自托管 Milvus 也是一种选择（设置较为复杂）。我们还可以在基于 ARM 的机器上部署<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a>和<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>。有关 Milvus 安装的更多信息，请参阅<a href="https://milvus.io/docs/install-overview.md">安装文档</a>。</p>
</div>
<p>我们将<code translate="no">uri</code> 和<code translate="no">token</code> 设置为 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>检查 Collections 是否已存在，如果已存在，请将其删除。</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定参数创建新 Collections。</p>
<p>如果我们不指定任何字段信息，Milvus 会自动为主键创建一个默认的<code translate="no">id</code> 字段，并创建一个<code translate="no">vector</code> 字段来存储向量数据。保留的 JSON 字段用于存储非 Schema 定义的字段及其值。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>我们使用内积距离作为默认度量类型。有关距离类型的更多信息，请参阅 "<a href="https://milvus.io/docs/metric.md?tab=floating">相似度量 "页面。</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">准备数据</h3><p>我们使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文档 2.4.x</a>中的常见问题页面作为 RAG 中的私有知识，这对于简单的 RAG 管道来说是一个很好的数据源。</p>
<p>下载 zip 文件并将文档解压缩到<code translate="no">milvus_docs</code> 文件夹。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>我们从<code translate="no">milvus_docs/en/faq</code> 文件夹中加载所有标记文件。对于每个文件，我们只需简单地使用 &quot;#&quot;来分隔文件中的内容，这样就能大致分隔出 markdown 文件中每个主要部分的内容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">插入数据</h3><p>我们准备一个简单但高效的嵌入模型<a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a>，它可以将文本转换为嵌入向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbeddings</span>

embedding_model = <span class="hljs-title class_">HuggingFaceEmbeddings</span>(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>遍历文本行，创建嵌入，然后将数据插入 Milvus。</p>
<p>这里有一个新字段<code translate="no">text</code> ，它是 Collections Schema 中的一个未定义字段。它将自动添加到预留的 JSON 动态字段中，在高层次上可将其视为普通字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">在 Arm 上启动 LLM 服务<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将在基于 Arm 的 CPU 上构建并启动<code translate="no">llama.cpp</code> 服务。</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Llama 3.1 模型和 llama.cpp</h3><p>来自 Meta 的<a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Llama-3.1-8B 模型</a>属于 Llama 3.1 模型系列，可免费用于研究和商业用途。在使用该模型之前，请访问 Llama<a href="https://llama.meta.com/llama-downloads/">网站</a>并填写表格申请访问权限。</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a>是一个开源的C/C++项目，可在本地和云端的各种硬件上实现高效的LLM推理。您可以使用<code translate="no">llama.cpp</code> 方便地托管 Llama 3.1 模型。</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">下载并构建 llama.cpp</h3><p>运行以下命令安装 make、cmake、gcc、g++ 以及从源代码构建 llama.cpp 所需的其他基本工具：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>现在您可以开始构建<code translate="no">llama.cpp</code> 。</p>
<p>克隆 llama.cpp 的源码库：</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>默认情况下，<code translate="no">llama.cpp</code> 只在 Linux 和 Windows 上为 CPU 构建。您不需要提供任何额外的开关，就能为运行它的 Arm CPU 构建它。</p>
<p>运行<code translate="no">make</code> 进行编译：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>运行 help 命令检查<code translate="no">llama.cpp</code> 是否已正确编译：</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>如果<code translate="no">llama.cpp</code> 已正确编译，则会显示帮助选项。输出片段如下：</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>现在可以使用 HuggingFace cli 下载模型了：</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-gguf dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-Q4_0.gguf --local-<span class="hljs-built_in">dir</span> . --local-<span class="hljs-built_in">dir</span>-use-symlinks <span class="hljs-literal">False</span>
<button class="copy-code-btn"></button></code></pre>
<p>由 llama.cpp 团队推出的 GGUF 模型格式使用压缩和量化技术将权重精度降低到 4 位整数，大大降低了计算和内存需求，使 Arm CPU 有效用于 LLM 推理。</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">重新量化模型权重</h3><p>要重新量化，运行</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>这将输出一个新文件<code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> ，其中包含重新配置的权重，使<code translate="no">llama-cli</code> 可以使用 SVE 256 和 MATMUL_INT8 支持。</p>
<div class="alert note">
<p>这种重新量化专门针对 Graviton3 而优化。对于 Graviton2，最佳的重量化应在<code translate="no">Q4_0_4_4</code> 格式中进行，而对于 Graviton4，<code translate="no">Q4_0_4_8</code> 格式最适合重量化。</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">启动 LLM 服务</h3><p>您可以利用 llama.cpp 服务器程序，通过与 OpenAI 兼容的 API 发送请求。这样，您就可以开发与 LLM 进行多次交互的应用程序，而无需反复启动和停止 LLM。此外，您还可以从另一台通过网络托管 LLM 的机器上访问服务器。</p>
<p>通过命令行启动服务器，服务器会监听 8080 端口：</p>
<pre><code translate="no" class="language-shell">$ ./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>您还可以调整已启动 LLM 的参数，使其与服务器硬件相适应，从而获得理想的性能。有关更多参数信息，请参阅<code translate="no">llama-server --help</code> 命令。</p>
<p>如果在执行此步骤时遇到困难，可参阅<a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">官方文档</a>获取更多信息。</p>
<p>您已经在基于 Arm 的 CPU 上启动了 LLM 服务。接下来，我们直接使用 OpenAI SDK 与服务交互。</p>
<h2 id="Online-RAG" class="common-anchor-header">在线 RAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">LLM 客户端和 Embeddings 模型</h3><p>我们初始化 LLM 客户端并准备嵌入模型。</p>
<p>对于 LLM，我们使用 OpenAI SDK 请求之前启动的 Llama 服务。我们不需要使用任何 API 密钥，因为它实际上就是我们本地的 llama.cpp 服务。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm_client = <span class="hljs-title class_">OpenAI</span>(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>生成测试 Embeddings 并打印其尺寸和前几个元素。</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">为查询检索数据</h3><p>让我们指定一个关于 Milvus 的常见问题。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Collections 中搜索该问题，并检索语义前 3 个匹配项。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>让我们看看查询的搜索结果</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">使用 LLM 获取 RAG 响应</h3><p>将检索到的文档转换为字符串格式。</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>使用 LLM 根据提示生成响应。我们将<code translate="no">model</code> 参数设置为<code translate="no">not-used</code> ，因为它是 llama.cpp 服务的多余参数。</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>恭喜您您已经在基于 Arm 的基础架构之上构建了一个 RAG 应用程序。</p>
