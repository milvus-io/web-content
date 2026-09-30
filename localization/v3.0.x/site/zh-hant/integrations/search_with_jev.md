---
id: search_with_jev.md
summary: >-
  向量搜尋能找出與查詢相關的資訊。要建置一個實用的搜尋應用程式，還需做出以下決策：哪些段落確實能回答問題、是否可以重複使用先前的答案，以及代理程式是否擁有足夠的證據來停止搜尋。
title: 使用 Milvus + PII Masker 建構 RAG
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">使用 Jev 和 Milvus 進行搜尋<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>向量搜尋能找出與查詢相關的資訊。建構實用的搜尋應用程式還涉及多項決策：哪些段落真正回答了問題、是否能重複使用先前的答案，以及代理程式是否擁有足夠的證據來停止搜尋。</p>
<p>Milvus 和 Jev 分別負責此工作流程中的不同環節。<a href="https://milvus.io/">Milvus</a>負責儲存嵌入向量並檢索候選紀錄，並透過元資料篩選器來設定諸如產品版本或知識庫範圍等限制條件。<a href="https://docs.typesafe.ai/introduction">Jev</a>則會依據指示來評估檢索到的文字內容。您的應用程式可以利用其判斷結果來選取證據，或控制下一個搜尋步驟。</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Jev 究竟做什麼？<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>一個 Jev 請求會提供上下文以及一個或多個判斷問題。其<a href="https://docs.typesafe.ai/primitives">類型化的輸出</a>包含：固定選項中的選擇、排序分數，以及「是/否」的機率。這些輸出讓應用程式程式碼無需解析自由格式的解釋，即可做出決策。在需要時，生成模型仍可撰寫答案或後續搜尋查詢。</p>
<p>舉例來說，當使用者詢問如何安裝 Atlas v2 時，Milvus 可將檢索範圍限制在 v2 文件中，並回傳關於安裝、升級及疑難排解的相關段落。接著，Jev 會評估哪些段落解釋了初始設定。應用程式將選定的證據傳遞給答案生成模型。</p>
<p>各模組的職責非常明確：</p>
<ol>
<li><strong>使用 Milvus 檢索：</strong>在所需的元資料限制內尋找候選內容。</li>
<li><strong>由 Jev 進行判斷：</strong>根據問題及特定任務的標準來評估這些候選內容。</li>
<li><strong>在應用程式程式碼中執行：</strong>重新排序結果、過濾上下文、重複使用答案或繼續搜尋。</li>
</ol>
<p>部分決策在檢索前即已完成。Jev 可在文件進入收藏集之前，選擇搜尋範圍或評估傳入的文件。存取控制與精確篩選仍由應用程式負責。</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">探索搜尋情境<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p>「<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">使用 Jev 搜尋</a>」<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">系列</a>包含九個可執行的教學指南。每個教學指南皆使用小型合成資料集，並展示檢索到的記錄、判斷結果以及隨之執行的操作。</p>
<h3 id="Select-better-evidence" class="common-anchor-header">篩選更佳的證據<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">重新排序搜尋結果</a>：重新排列文件及編碼代理的記憶內容。關於筆記型電腦埠錯誤的記憶可能與容器連線問題相似；而更有用的記憶則記錄了實際的容器與主機修復方法。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">過濾檢索到的上下文</a>：在 Milvus 套用版本篩選器後，將初始安裝說明與升級及疑難排解段落區分開來。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">重新排序圖形關係</a>：透過同時選取「書籍至作者」的橋接關係與「作者至出生地」的關係，來回答關於書籍作者出生地的問題，並在擷取來源段落時保留該排序。</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">控制搜尋與答案的重用<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">決定何時停止搜尋</a>：生成模型根據累積的證據提出搜尋建議，而 Jev 則判斷原始問題是否可解答。範例涵蓋直接回答、兩跳問題，以及因觸及搜尋限制而無法獲得答案的事實。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">路由搜尋查詢</a>：選擇文件、帳單或記憶體搜尋，然後套用相應的 Milvus 篩選器。超出範圍的查詢則採取獨立路徑。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">驗證語義快取的重用</a>：檢索類似的快取請求，然後檢查其答案是否也滿足新請求的任務、語言和上下文要求。</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">優化並檢視知識處理流程<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">索引前審核文件</a>：透過獨立的索引、審查和排除操作，將實質性的操作指引與宣傳性或不完整的資料區分開來。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">篩選檢索到的段落</a>：識別試圖引導助理偏離主題的文字，同時保留一般性的安全建議。此為額外的篩選步驟，並非安全保證。</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">評估搜尋證據</a>：判斷段落相關性、證據是否充分，以及答案是否提出缺乏依據的主張。範例中刻意移除證據或添加缺乏依據的陳述，以凸顯此區別。</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">現成的重新排序介面<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a>提供應用端<code translate="no">JevRerankFunction</code> 介面：傳入查詢與候選文件文字，即可收到依相關性排序、附帶原始索引的分數結果。可利用這些索引重新排序 Milvus 返回的記錄。</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Jev 整合功能</a>已合併至主分支。請參<a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">閱實作與建構函式選項</a>以了解當前 API。該介面接受<code translate="no">TYPESAFE_API_KEY</code> 參數，預設值為<code translate="no">jev-latest</code> 。請使用包含此整合功能的套件版本。</p>
<p>當前的封裝程式採用「主張與證據」相關性提示。請確認此標準是否符合您的任務需求。若需進行自訂判斷（例如記憶體相容性、中止或路由），請參閱連結中的教學指南，直接使用 TypeSafe API。這些教學指南示範了如何從 Python 應用程式程式碼直接呼叫 API。</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">在 Milvus 上試試看<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">在 Colab 中開啟重新排序教學</a>，開始進行候選結果檢索與排序。有關本機設定及完整教學清單，請參閱<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">該合集的 README 文件</a>。</p>
<p>範例中使用<a href="https://aistudio.google.com/apikey">Gemini API 金鑰</a>進行嵌入處理，並使用<a href="https://console.typesafe.ai/">TypeSafe API 金鑰呼叫</a>Jev。agent-search 教學指南亦使用 Gemini 進行查詢與答案生成。範例文字將傳送至這些 API 供應商，且呼叫可能會消耗信用點數。</p>
<p>這些教學預設使用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>執行，並包含連接 Milvus 伺服器或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 的選項。無論採用何種部署方式，工作分工皆相同：Milvus 負責檢索候選答案，而應用程式則將相關文字傳送至 Jev 進行判斷。</p>
<p>請將這些範例視為制定您自身評分標準與閾值的起點。相關性分數並不能保證答案正確，且這些小型教學資料集無法代表實際生產環境的準確度或速度。</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">探索實作與評估結果<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>以下開源專案將這些概念應用於更大的搜尋工作流程中。其連結的報告詳細說明了各實驗的資料集、比較結果及限制。</p>
<table>
<thead>
<tr><th>專案</th><th>搜尋應用場景</th><th>Jev 專案</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>用於編碼代理的持久性 Markdown 記憶體</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Jev 實作</a>·<a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">評估</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">向量圖 RAG</a></td><td>多跳問題的向量與圖檢索</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Jev 實作</a>·<a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">評估</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>針對私有知識的迭代搜尋</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">實驗執行器</a>·<a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">搜尋終止評估</a>（獨立實驗）</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>重複使用對相容請求的回答</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Jev 實作</a>·<a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">評估</a></td></tr>
</tbody>
</table>
<p>DeepSearcher 的貢獻是一項獨立的「搜索終止」實驗。其餘的實作連結則展示針對特定任務的 Jev 整合方案。這些專案的結果應置於其自身的評估脈絡中解讀，而非視為共通的基準測試。</p>
