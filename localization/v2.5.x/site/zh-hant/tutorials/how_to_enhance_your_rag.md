---
id: how_to_enhance_your_rag.md
summary: >-
  隨著 Retrieval Augmented Generation RAG 應用程式的日益普及，提升其效能的問題也愈來愈受到關注。本文將介紹優化 RAG
  管道的所有可能方式，並提供相應的圖解，協助您快速瞭解主流的 RAG 優化策略。
title: 如何增強 RAG 管道的效能
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">如何增強 RAG 管道的效能<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>隨著 Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>) 應用程式的日益普及，提升其效能的問題也日益受到關注。本文將介紹優化 RAG 管道的所有可能方式，並提供相應的圖解，協助您快速瞭解主流的 RAG 優化策略。</p>
<p>需要注意的是，我們只會對這些策略和技術進行高層次的探討，著重於它們如何整合到 RAG 系統中。但是，我們不會深入探討複雜的細節，也不會引導您逐步實施。</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">標準的 RAG 管線<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>下圖顯示了最直接的 RAG 流水線。首先，文件塊會載入向量儲存庫 (例如<a href="https://milvus.io/docs">Milvus</a>或<a href="https://zilliz.com/cloud">Zilliz cloud</a>)。接著，向量儲存庫擷取與查詢最相關的 Top-K 文檔區。這些相關的文件塊會被注入到<a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a> 的上下文提示中，最後由 LLM 傳回最終的答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">各種類型的 RAG 增強技術<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>我們可以根據 RAG 管道階段中的角色，將不同的 RAG 增強方法分類。</p>
<ul>
<li><strong>查詢增強</strong>：修改和處理 RAG 輸入的查詢過程，以更好地表達或處理查詢意圖。</li>
<li><strong>索引增強</strong>：使用多重分塊（multi-chunking）、逐步索引（step-wise indexing）或多向索引（multi-way indexing）等技術優化分塊索引的建立。</li>
<li><strong>Retriever 增強</strong>：在檢索過程中應用最佳化技術與策略。</li>
<li><strong>生成器增強</strong>：在為 LLM 組合提示時調整和優化提示，以提供更好的回應。</li>
<li><strong>RAG Pipeline 增強功能</strong>：在整個 RAG 管道中動態切換流程，包括使用代理程式或工具來最佳化 RAG 管道中的關鍵步驟。</li>
</ul>
<p>接下來，我們將介紹每個類別下的特定方法。</p>
<h2 id="Query-Enhancement" class="common-anchor-header">查詢增強<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>讓我們探索四種有效的方法來增強您的查詢體驗：假設問題 (Hypothetical Questions)、假設文件嵌入 (Hypothetical Document Embeddings)、子查詢 (Sub-Queries) 和回溯提示 (Stepback Prompts)。</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">建立假設問題</h3><p>製作假設性問題是利用 LLM 來產生使用者可能針對每個文件區塊中的內容提出的多個問題。在使用者的實際查詢傳送至 LLM 之前，向量儲存器會擷取與實際查詢最相關的假設問題，以及其相對應的文件區塊，並將它們轉送至 LLM。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>這種方法繞過向量搜尋過程中的跨領域不對稱問題，直接進行查詢對查詢的搜尋，減輕向量搜尋的負擔。然而，它會在產生假設問題時引入額外的開銷和不確定性。</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (假設性文件嵌入)</h3><p>HyDE 是 Hypothetical Document Embeddings 的縮寫。它利用 LLM 來製作「<strong><em>假設</em></strong>文件」或<strong><em>虛假</em></strong>答案，以回應沒有上下文資訊的使用者查詢。此假答案隨後會轉換成向量嵌入，並用於查詢向量資料庫中最相關的文件塊。之後，向量資料庫會擷取 Top-K 最相關的文件塊，並將它們傳送給 LLM 和原始使用者查詢，以產生最終答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>在解決向量搜尋中的跨領域不對稱問題時，此方法與假設問題技術相似。不過，它也有缺點，例如增加了計算成本和產生假答案的不確定性。</p>
<p>如需詳細資訊，請參閱<a href="https://arxiv.org/abs/2212.10496">HyDE</a>論文。</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">建立子查詢</h3><p>當使用者的查詢太複雜時，我們可以使用 LLM 將它分解成較簡單的子查詢，然後再傳給向量資料庫和 LLM。讓我們來看看一個範例。</p>
<p>假設使用者詢問：「<strong><em>Milvus 和 Zilliz Cloud 的功能有何差異？</em></strong> 這個問題相當複雜，在我們的知識庫中可能沒有直接的答案。要解決這個問題，我們可以將它分割成兩個較簡單的子查詢：</p>
<ul>
<li>子查詢 1：「Milvus 有哪些功能？</li>
<li>子查詢 2：「Zilliz Cloud 有哪些功能？</li>
</ul>
<p>有了這些子查詢之後，我們將它們全部轉換成向量嵌入之後傳送給向量資料庫。向量資料庫會找出與每個子查詢最相關的 Top-K 文件塊。最後，LLM 會使用這些資訊來產生更好的答案。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>透過將用戶查詢分解為子查詢，我們可以讓系統更容易找到相關資訊並提供準確的答案，即使是複雜的問題也不例外。</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">建立回溯提示</h3><p>另一種簡化複雜使用者查詢的方法是建立<strong><em>回溯提示</em></strong>。此技術包括使用 LLM 將複雜的使用者查詢抽象為<em><em>「</em>回溯問題</em>」**。然後，向量資料庫會使用這些回溯問題來擷取最相關的文件區塊。最後，LLM 會根據這些擷取的文件區塊產生更精確的答案。</p>
<p>讓我們用一個例子來說明這項技術。考慮以下的查詢，這個查詢相當複雜，而且無法直接回答：</p>
<p><strong><em>原始使用者查詢："我有一個有 100 億筆記錄的資料集，想要將它儲存在 Milvus 中進行查詢。可以嗎？"</em></strong></p>
<p>為了簡化這個使用者查詢，我們可以使用 LLM 來產生一個更直接的回溯問題：</p>
<p><strong><em>回溯問題：「Milvus 可以處理的資料集大小限制是多少？」</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>這個方法可以幫助我們對複雜的查詢得到更好、更準確的答案。它可以將原始問題分解成更簡單的形式，讓我們的系統更容易找到相關資訊，並提供準確的回應。</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">強化索引<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>增強索引是增強 RAG 應用程式效能的另一項策略。讓我們探索三種索引增強技術。</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">自動合併文件塊</h3><p>在建立索引時，我們可以使用兩個粒度層級：子文件塊及其對應的父文件塊。一開始，我們以較細的細節層級搜尋子資料塊。接著，我們會使用合併策略：如果前<strong><em>k 個子</em></strong>資料塊中有特定數量（<strong><em>n</em></strong>）的子資料塊屬於相同的父資料塊，我們就會將此父資料塊提供給 LLM 作為上下文資訊。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>這個方法已經在<a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a> 中實施。</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">建構分層索引</h3><p>為文件建立索引時，我們可以建立兩層索引：一層是文件摘要索引，另一層是文件片段索引。向量搜尋過程分為兩個階段：首先，我們根據摘要篩選相關的文件，接著，我們在這些相關文件中檢索相對應的文件塊。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>這種方法在涉及大量資料或資料分層的情況下非常有用，例如圖書館館藏中的內容檢索。</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">混合擷取與重新排序</h3><p>混合檢索與重新排序技術將一種或多種輔助檢索方法與<a href="https://zilliz.com/learn/vector-similarity-search">向量相似性檢索</a>整合在一起。然後，<a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">重新排序器會</a>根據檢索結果與使用者查詢的相關性重新排序。</p>
<p>常見的補充檢索演算法包括以詞彙頻率為基礎的方法 (如<a href="https://milvus.io/docs/embed-with-bm25.md">BM25)</a>或利用稀疏嵌入 (sparse embeddings) 的大型模型 (如<a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>)。重新排序演算法包括 RRF 或更複雜的模型，例如<a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>，類似 BERT 架構。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>此方法利用不同的檢索方法來改善檢索品質，並處理向量召回中的潛在缺口。</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">強化擷取器<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>完善 RAG 系統中的 Retriever 元件也能改善 RAG 應用。讓我們來探討一些強化檢索器的有效方法。</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">句子視窗檢索</h3><p>在基本的 RAG 系統中，提供給 LLM 的文件塊是一個包含擷取嵌入塊的較大視窗。這可確保提供給 LLM 的資訊包含更廣泛的上下文細節，以減少資訊遺失。句子視窗擷取技術將嵌入擷取所使用的文件區塊與提供給 LLM 的區塊分離。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>然而，擴大視窗大小可能會引入額外的干擾資訊。我們可以根據具體的業務需求調整視窗擴展的大小。</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">元資料篩選</h3><p>為了確保更精確的答案，我們可以在將擷取的文件傳送給 LLM 之前，先過濾時間和類別等元資料，以精簡擷取的文件。舉例來說，如果要擷取跨越多年的財務報告，則根據所需年份進行篩選，即可精簡資訊以符合特定需求。這種方法在有大量資料和詳細元資料的情況下非常有效，例如圖書館館藏的內容檢索。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">生成器增強<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>讓我們透過改進 RAG 系統中的產生器，探索更多 RAG 優化技術。</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">壓縮 LLM 提示</h3><p>檢索到的文件塊中的雜訊資訊會對 RAG 最終答案的準確性造成重大影響。LLM 中有限的提示視窗也對更精確的答案造成障礙。為了解決這個難題，我們可以壓縮不相關的細節、強調關鍵段落，並減少擷取文件塊的整體上下文長度。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>此方法類似於先前討論過的混合擷取與重新排序 (Reranking) 方法，利用重新排序器 (Reranker) 來篩選出不相關的文件區塊。</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">調整提示中的文塊順序</h3><p>在論文「<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>」中，研究人員觀察到 LLMs 在推理過程中經常忽略給定文件中間的資訊。相反，他們傾向於更依賴文件開頭和結尾的資訊。</p>
<p>基於這個觀察，我們可以調整擷取知識區塊的順序來改善答案品質：當擷取多個知識區塊時，置信度相對較低的知識區塊會被放在中間，而置信度相對較高的知識區塊會被放在兩端。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">RAG Pipeline 強化<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>我們也可以透過強化整個 RAG Pipeline 來提升您的 RAG 應用程式效能。</p>
<h3 id="Self-reflection" class="common-anchor-header">自我反省</h3><p>此方法將自我反省的概念納入 AI 代理內。那麼，這項技術是如何運作的呢？</p>
<p>有些最初擷取的 Top-K 文件塊是模棱兩可的，可能無法直接回答使用者的問題。在這種情況下，我們可以進行第二輪反思，以驗證這些文件塊是否能真正回答查詢。</p>
<p>我們可以使用有效率的反省方法來進行反省，例如自然語言推論 (NLI) 模型或其他工具，例如網際網路搜尋來進行驗證。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>這個自我反省的概念已經在多篇論文或專案中被探討過，包括<a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>、<a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>、<a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a> 等。</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">使用代理進行查詢路由</h3><p>有時候，我們不必使用 RAG 系統來回答簡單的問題，因為這可能會造成更多的誤解和誤導資訊的推論。在這種情況下，我們可以在查詢階段使用代理作為路由器。這個代理會評估查詢是否需要經過 RAG 管道。如果需要，則啟動後續的 RAG 管道；否則，LLM 直接處理查詢。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>代理可以採取各種形式，包括 LLM、小型分類模型，甚至是一組規則。</p>
<p>透過根據使用者意圖來路由查詢，可以將部分查詢重新導向，從而大幅提升回應時間，並顯著減少不必要的雜訊。</p>
<p>我們可以將查詢路由技術擴展到 RAG 系統中的其他流程，例如決定何時使用網路搜尋等工具、進行子查詢或搜尋圖片。此方法可確保 RAG 系統中的每個步驟都能根據查詢的特定需求進行最佳化，從而提高資訊檢索的效率與精確度。</p>
<h2 id="Summary" class="common-anchor-header">總結<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>雖然一般的 RAG 管道看似簡單，但要達到最佳的業務效能，往往需要更複雜的最佳化技術。</p>
<p>本文總結了各種常用的方法，以增強 RAG 應用程式的效能。我們也提供了清晰的說明，以協助您快速瞭解這些概念和技術，並加速其實作和最佳化。</p>
<p>您可以從這個<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">GitHub 連結</a>取得本文所列主要方法的簡單實作。</p>
