---
id: text_search_engine.md
summary: 使用 Milvus 建立文本搜索引擎。
title: 文本搜索引擎
---
<h1 id="Text-Search-Engine" class="common-anchor-header">文本搜索引擎<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>在本教程中，您将学习如何使用开源向量数据库 Milvus 构建文本搜索引擎。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">开放式 Jupyter 笔记本</a></li>
</ul>
<p>使用的 ML 模型和第三方软件包括</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Milvus 在自然语言处理（NLP）领域的一个主要应用是文本搜索引擎。它是一个伟大的工具，可以帮助用户找到他们正在寻找的信息。它甚至能让难以找到的信息浮出水面。文本搜索引擎将用户输入的关键词或语义与文本数据库进行比较，然后返回符合特定标准的结果。</p>
<p><br/></p>
<p>在本教程中，您将学习如何构建文本搜索引擎。本教程使用 BERT 将文本转换为固定长度的向量。Milvus 用作向量数据库，用于存储和向量相似性搜索。然后使用 MySQL 将 Milvus 生成的向量 ID 映射到文本数据。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>文本搜索引擎</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
