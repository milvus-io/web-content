---
id: search_with_jev.md
summary: >-
  向量搜索用于查找与查询相关的信息。构建一个有用的搜索应用程序还涉及一些决策：哪些段落真正回答了问题，是否可以复用之前的答案，以及Agents是否拥有足够的证据来停止搜索。
title: 使用 Milvus + PII Masker 构建 RAG
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">使用 Jev 和 Milvus 进行搜索<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>向量搜索可查找与查询相关的信息。构建一个有用的搜索应用程序还涉及一系列决策：哪些段落真正回答了问题、是否可以复用之前的答案，以及Agents是否拥有足够的证据来停止搜索。</p>
<p>Milvus 和 Jev 分别负责该工作流的不同环节。<a href="https://milvus.io/">Milvus</a>负责存储 Embeddings 并检索候选记录，同时提供元数据过滤器以满足产品版本或知识库范围等约束条件。<a href="https://docs.typesafe.ai/introduction">Jev</a>则根据指令评估检索到的文本含义。您的应用程序可以利用其判断结果来筛选证据或控制后续的搜索步骤。</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Jev 具体做什么？<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>一个 Jev 请求会提供上下文以及一个或多个判断问题。其<a href="https://docs.typesafe.ai/primitives">类型化输出</a>包括固定选项中的选择、有序评分以及“是/否”的概率。这些输出使应用程序代码无需解析自由形式的解释即可做出决策。在需要时，生成模型仍可编写答案或后续搜索查询。</p>
<p>例如，用户询问如何安装 Atlas v2。Milvus 可以将检索范围限制在 v2 文档中，并返回关于安装、升级和故障排除的类似段落。随后，Jev 会评估哪些段落解释了初始设置。应用程序将选定的证据传递给答案生成模型。</p>
<p>职责分工非常明确：</p>
<ol>
<li><strong>使用 Milvus 检索：</strong>在所需的元数据约束范围内查找候选内容。</li>
<li><strong>由 Jev 进行判断：</strong>根据问题及特定任务的标准评估这些候选内容。</li>
<li><strong>在应用程序代码中执行：</strong>重新排序结果、过滤上下文、复用现有答案或继续搜索。</li>
</ol>
<p>部分决策在检索前即已完成。Jev 可在文档进入 Collection 前选择搜索范围或对其进行评估。访问控制和精确过滤仍由应用程序负责。</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">探索搜索场景<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">“使用 Jev 搜索”Collection</a>包含九个可运行的教程。每个教程都使用一个小型合成数据集，并展示检索到的记录、判断结果以及相应的操作。</p>
<h3 id="Select-better-evidence" class="common-anchor-header">筛选更优质的证据<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">重新排序搜索结果</a>：重新排列文档和编码代理的记忆。关于笔记本电脑端口错误的记忆可能与容器连接问题相似；而更有用的记忆则记录了实际的容器-主机修复方案。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">过滤检索到的上下文</a>：在 Milvus 应用版本过滤器后，将初始安装说明与升级及故障排除段落区分开来。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">重新排序图关系</a>：通过同时选择“书籍到作者”的桥梁关系和“作者到出生地”的关系，回答关于某本书作者出生地的问题，并在检索源段落时保留该排序。</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">控制搜索与答案复用<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">决定何时停止搜索</a>：生成模型根据累积证据提出搜索方案，而 Jev 则判断原始问题是否可解答。示例涵盖直接答案、两跳问题以及因达到搜索限制而无法获得答案的不可用事实。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">路由搜索查询</a>：选择文档、计费或内存搜索，然后应用相应的 Milvus 过滤器。超出范围的查询将走单独的路径。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">验证语义缓存复用</a>：检索一个相似的缓存请求，然后检查其答案是否也满足新请求的任务、语言和上下文要求。</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">优化并检查知识管道<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">索引前对文档进行筛选</a>：区分实质性的操作指南与宣传性或不完整的材料，并分别执行索引、审核和排除操作。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">筛选检索到的段落</a>：识别试图误导助手的文本，同时保留常规的安全建议。这是一项额外的筛选步骤，并非安全保证。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">评估搜索证据</a>：判断段落的相关性、证据是否充分，以及答案是否包含缺乏依据的论断。示例中故意移除证据或添加缺乏依据的陈述，以使区别显而易见。</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">现成的重新排序接口<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a>提供了一个应用端的<code translate="no">JevRerankFunction</code> 接口：传入查询和候选文档文本，即可获得按相关性排序、带有原始索引的评分结果。使用这些索引对 Milvus 返回的记录进行重新排序。</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Jev集成</a>已合并。请参阅当前 API 的<a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">实现和构造函数选项</a>。它接受<code translate="no">TYPESAFE_API_KEY</code> ，默认值为<code translate="no">jev-latest</code> 。请使用包含此集成的包版本。</p>
<p>当前的封装器采用“主张与证据”相关性提示。请确认此标准是否符合您的任务需求。对于自定义判断（如记忆兼容性、停止或路由），请直接参考链接中的教程，使用 TypeSafe API 进行操作。这些教程演示了如何从 Python 应用程序代码中直接调用 API。</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">在 Milvus 上试用<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">在 Colab 中打开重新排序教程</a>，开始进行候选结果检索和排序。有关本地配置和完整的教程列表，请参阅<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">Collection 的 README</a> 文件。</p>
<p>示例中使用<a href="https://aistudio.google.com/apikey">Gemini API 密钥进行</a>Embeddings 处理，使用<a href="https://console.typesafe.ai/">TypeSafe API 密钥调用</a>Jev。agent-search 教程还使用 Gemini 进行查询和答案生成。示例文本将发送至这些 API 提供商，调用可能消耗积分。</p>
<p>教程默认使用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>运行，并包含连接 Milvus 服务器或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 的选项。无论哪种部署方式，工作分工均保持一致：Milvus 负责检索候选答案，应用程序将相关文本发送至 Jev 进行判定。</p>
<p>请将这些示例视为制定您自身标准和阈值的起点。相关性评分并不能保证答案的正确性，且这些小型教学数据集无法体现生产环境中的准确性或速度。</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">探索实现方案与评估结果<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>以下开源项目将这些思路应用到了更大的搜索工作流中。其链接的报告详细说明了各实验的数据集、对比结果及局限性。</p>
<table>
<thead>
<tr><th>项目</th><th>搜索用例</th><th>Jev 项目</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>面向编码 Agents 的持久性 Markdown 记忆</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jev 实现</a>·<a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">评估</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">向量图 RAG</a></td><td>多跳问题的情境向量与图检索</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jev 实现</a>·<a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">评估</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>基于私有知识的迭代搜索</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">实验运行器</a>·<a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">搜索终止评估</a>（独立实验）</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>对兼容请求重复利用答案</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev 实现</a>·<a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">评估</a></td></tr>
</tbody>
</table>
<p>DeepSearcher 的贡献是一项独立的搜索终止实验。其他实现链接展示的是针对特定任务的 Jev 集成方案。这些项目的结果应结合其各自的评估背景来解读，而非将其视为通用的基准。</p>
