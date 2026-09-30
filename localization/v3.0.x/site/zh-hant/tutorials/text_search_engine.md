---
id: text_search_engine.md
summary: 使用 Milvus 建立文字搜尋引擎。
title: 文字搜尋引擎
---
<h1 id="Text-Search-Engine" class="common-anchor-header">文字搜尋引擎<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>在本教程中，您將學習如何使用開放原始碼向量資料庫 Milvus 來建立文字搜尋引擎。</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">開放式 Jupyter 記事本</a></li>
</ul>
<p>使用的 ML 模型和第三方軟體包括</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Milvus 在自然語言處理 (NLP) 領域的一個主要應用是文字搜尋引擎。它是一個很好的工具，可以幫助使用者找到他們正在尋找的資訊。它甚至可以浮現難以找到的資訊。文字搜尋引擎會將使用者輸入的關鍵字或語意與文字資料庫進行比較，然後傳回符合特定條件的結果。</p>
<p><br/></p>
<p>在本教程中，您將學習如何建立一個文字搜尋引擎。本教學使用 BERT 將文字轉換成定長向量。使用 Milvus 作為向量資料庫進行儲存和向量相似性搜尋。然後使用 MySQL 將 Milvus 產生的向量 ID 映射到文字資料。</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
