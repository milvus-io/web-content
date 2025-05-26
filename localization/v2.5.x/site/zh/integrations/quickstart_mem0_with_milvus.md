---
id: quickstart_mem0_with_milvus.md
summary: >-
  在本教程中，我们将介绍基本的 Mem0 内存管理操作--添加、检索、更新、搜索、删除和跟踪内存历史记录--使用
  Milvus，这是一个高性能、开源的向量数据库，可支持高效的存储和检索。本实践介绍将指导您完成基础内存操作，帮助您利用 Mem0 和 Milvus
  构建个性化的人工智能交互。
title: 开始使用 Mem0 和 Milvus
---
<h1 id="Getting-Started-with-Mem0-and-Milvus" class="common-anchor-header">开始使用 Mem0 和 Milvus<button data-href="#Getting-Started-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://mem0.ai/">Mem0</a>是人工智能应用的智能记忆层，旨在通过保留用户偏好和随时间不断调整来提供个性化和高效的交互。Mem0 是聊天机器人和人工智能驱动工具的理想之选，它可以创建无缝、上下文感知的体验。</p>
<p>在本教程中，我们将介绍基本的 Mem0 内存管理操作--添加、检索、更新、搜索、删除和跟踪内存历史记录--使用高性能开源向量数据库<a href="https://milvus.io/">Milvus</a>，它为高效存储和检索提供了动力。本实践介绍将指导您完成基础内存操作，帮助您利用 Mem0 和 Milvus 构建个性化的人工智能交互。</p>
<h2 id="Preparation" class="common-anchor-header">准备工作<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">下载所需程序库</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install mem0ai pymilvus</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>如果您使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕顶部的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</blockquote>
<h3 id="Configure-Mem0-with-Milvus" class="common-anchor-header">用 Milvus 配置 Mem0</h3><p>在本例中，我们将使用 OpenAI 作为 LLM。您应将<a href="https://platform.openai.com/docs/quickstart">api 密钥</a> <code translate="no">OPENAI_API_KEY</code> 设置为环境变量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>现在，我们可以将 Mem0 配置为使用 Milvus 作为向量存储库</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define Config</span>
<span class="hljs-keyword">from</span> mem0 <span class="hljs-keyword">import</span> Memory

config = {
    <span class="hljs-string">&quot;vector_store&quot;</span>: {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>,
        <span class="hljs-string">&quot;config&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;quickstart_mem0_with_milvus&quot;</span>,
            <span class="hljs-string">&quot;embedding_model_dims&quot;</span>: <span class="hljs-string">&quot;1536&quot;</span>,
            <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># Use local vector database for demo purpose</span>
        },
    },
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;v1.1&quot;</span>,
}

m = Memory.from_config(config)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>如果你只需要一个本地向量数据库，用于小规模数据或原型设计，那么将 uri 设置为本地文件，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储到此文件中。</li>
<li>如果你有大规模数据，比如超过一百万个向量，你可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器地址和端口作为 uri，例如<code translate="no">http://localhost:19530</code> 。如果在 Milvus 上启用了身份验证功能，请使用 "<your_username>:<your_password>" 作为令牌，否则不要设置令牌。</li>
<li>如果您使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>相对应。</li>
</ul>
</blockquote>
</div>
<h2 id="Managing-User-Memories-with-Mem0-and-Milvus" class="common-anchor-header">使用 Mem0 和 Milvus 管理用户记忆库<button data-href="#Managing-User-Memories-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Adding-a-Memory" class="common-anchor-header">添加记忆库</h3><p><code translate="no">add</code> 函数将非结构化文本作为内存存储在 Milvus 中，并将其与特定用户和可选元数据关联。</p>
<p>在这里，我们将爱丽丝的记忆 "努力提高我的网球技术 "连同相关元数据一起添加到 Milvus 中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a memory to user: Working on improving tennis skills</span>
res = m.add(
    messages=<span class="hljs-string">&quot;I am working on improving my tennis skills.&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;hobbies&quot;</span>},
)

res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Working on improving tennis skills',
   'event': 'ADD'}],
 'relations': []}
</code></pre>
<h3 id="Update-a-Memory" class="common-anchor-header">更新记忆</h3><p>我们可以使用<code translate="no">add</code> 函数的返回值检索内存 ID，这样就可以通过<code translate="no">update</code> 用新信息更新内存。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get memory_id</span>
memory_id = res[<span class="hljs-string">&quot;results&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>]

<span class="hljs-comment"># Update this memory with new information: Likes to play tennis on weekends</span>
m.update(memory_id=memory_id, data=<span class="hljs-string">&quot;Likes to play tennis on weekends&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'message': 'Memory updated successfully!'}
</code></pre>
<h3 id="Get-All-Memory-For-a-User" class="common-anchor-header">获取用户的所有内存</h3><p>我们可以使用<code translate="no">get_all</code> 函数查看所有插入的内存，或通过 Milvus 中的<code translate="no">user_id</code> 进行筛选。</p>
<p>请注意，我们可以看到该记忆已从 "努力提高网球技能 "更改为 "喜欢在周末打网球"。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get all memory for the user Alice</span>
m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'}]}
</code></pre>
<h3 id="View-Memory-Update-History" class="common-anchor-header">查看记忆更新历史</h3><p>我们还可以通过<code translate="no">history</code> 函数指定我们感兴趣的内存_id，查看内存更新历史。</p>
<pre><code translate="no" class="language-python">m.history(memory_id=memory_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': None,
  'new_memory': 'Working on improving tennis skills',
  'event': 'ADD',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': None},
 {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': 'Working on improving tennis skills',
  'new_memory': 'Likes to play tennis on weekends',
  'event': 'UPDATE',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': '2024-11-01T19:33:47.619857-07:00'}]
</code></pre>
<h3 id="Search-Memory" class="common-anchor-header">搜索内存</h3><p>我们可以使用<code translate="no">search</code> 函数查找与用户最相关的内存。</p>
<p>让我们从为 Alice 添加另一个内存开始。</p>
<pre><code translate="no" class="language-python">new_mem = m.add(
    <span class="hljs-string">&quot;I have a linear algebra midterm exam on November 20&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;task&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>现在，我们调用<code translate="no">get_all</code> ，指定 user_id，以验证我们确实有 2 个用户 Alice 的内存条目。</p>
<pre><code translate="no" class="language-python">m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<p>现在我们可以通过提供<code translate="no">query</code> 和<code translate="no">user_id</code> 来执行<code translate="no">search</code> 。请注意，我们默认使用<code translate="no">L2</code> 指标进行相似性搜索，因此<code translate="no">score</code> 越小表示相似性越高。</p>
<pre><code translate="no" class="language-python">m.search(query=<span class="hljs-string">&quot;What are Alice&#x27;s hobbies&quot;</span>, user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'score': 1.2807445526123047,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'score': 1.728922724723816,
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<h3 id="Delete-Memory" class="common-anchor-header">删除内存</h3><p>我们还可以通过提供相应的<code translate="no">memory_id</code> 来<code translate="no">delete</code> 内存。</p>
<p>我们将删除内存 "喜欢在周末打网球"，因为它的<code translate="no">memory_id</code> 已被检索，并调用<code translate="no">get_all</code> 验证删除是否成功。</p>
<pre><code translate="no" class="language-python">m.delete(memory_id=memory_id)

m.get_all(<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
