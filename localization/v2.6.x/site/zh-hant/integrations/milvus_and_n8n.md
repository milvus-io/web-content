---
id: milvus_and_n8n.md
summary: >-
  n8n 是一個功能強大的開放原始碼工作流程自動化平台，可讓您將各種應用程式、服務和 API 連結在一起，無需編碼即可建立自動化工作流程。n8n
  具備基於節點的視覺介面，使用者只需連結代表不同服務或動作的節點，即可建立複雜的自動化流程。n8n 可自行託管、高度可擴充，並支援公平碼和企業授權。
title: 開始使用 Milvus 和 n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">開始使用 Milvus 和 n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">n8n 與 Milvus Vector Store 節點簡介<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a>是一個功能強大的開放原始碼工作流程自動化平台，可讓您將各種應用程式、服務和 API 連結在一起，無需編碼即可建立自動化工作流程。n8n 具備基於節點的視覺介面，使用者只需連結代表不同服務或動作的節點，即可建立複雜的自動化流程。它可自行託管、高度可擴充，並支援公平碼和企業授權。</p>
<p>n8n 中的<strong>Milvus Vector Store</strong>節點可將<a href="https://milvus.io/">Milvus</a>整合到您的自動化工作流程中。這可讓您執行語意搜尋、強化檢索-增量生成 (RAG) 系統，以及建立智慧型 AI 應用程式 - 全都在 n8n 的生態系統中。</p>
<p>本文件主要以<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store</a> 官方<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">文件</a>為基礎。如果您發現任何過時或不一致的內容，請優先使用官方文件，並隨時向我們提出問題。</p>
<h2 id="Key-Features" class="common-anchor-header">主要功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 n8n 的 Milvus Vector Store 節點，您可以</p>
<ul>
<li>以<a href="https://docs.n8n.io/glossary/#ai-vector-store">向量儲存</a>的方式與您的 Milvus 資料庫互動</li>
<li>插入文件到Milvus</li>
<li>從Milvus取得文件</li>
<li>擷取文件提供<a href="https://docs.n8n.io/glossary/#ai-chain">給連</a>結到<a href="https://docs.n8n.io/glossary/#ai-chain">連鎖</a>的擷取器</li>
<li>直接連接<a href="https://docs.n8n.io/glossary/#ai-agent">代理</a>作為<a href="https://docs.n8n.io/glossary/#ai-tool">工具</a></li>
<li>根據元資料過濾文件</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">節點使用模式<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以在 n8n 中以下列模式使用 Milvus Vector Store 節點。</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">作為一般節點使用，插入和擷取文件</h3><p>你可以使用 Milvus Vector Store 作為一般節點來插入或取得文件。這個模式將 Milvus Vector Store 置於常規的連線流程中，不需要使用代理。</p>
<p>請參閱<a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">此範例範本</a>，瞭解如何建立一個在 Milvus 中儲存文件並擷取文件的系統，以支援引用、以聊天為基礎的答案。</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">直接連接 AI 代理作為工具</h3><p>您可以將 Milvus 向量儲存節點直接連接到<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">AI 代理</a>的工具連接器，以便在回答查詢時使用向量儲存作為資源。</p>
<p>這裡的連接方式如下AI 代理 (工具連接器) -&gt; Milvus Vector Store 節點。請參閱<a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">此範例範本</a>，其中資料已嵌入 Milvus 並建立索引，而 AI Agent 則使用向量儲存作為回答問題的知識工具。</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">使用擷取器擷取文檔</h3><p>您可以搭配 Milvus Vector Store 節點使用 Vector Store<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Retriever</a>節點，從 Milvus Vector Store 節點取得文件。這通常與<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">問答鍊</a>節點一起使用，從向量儲存中擷取符合給定聊天輸入的文件。</p>
<p>典型的節點連接流程如下：Question and Answer Chain (Retriever connector) -&gt; Vector Store Retriever (Vector Store connector) -&gt; Milvus Vector Store。</p>
<p>查看此<a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">工作流程範例</a>，瞭解如何將外部資料擷取至 Milvus，並建立一個以聊天為基礎的語意問答系統。</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">使用 Vector Store 問題解答工具來回答問題</h3><p>另一種模式是使用<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool</a>來總結結果，並回答來自 Milvus Vector Store 節點的問題。這種模式不是直接連接 Milvus Vector Store 作為工具，而是使用專門設計來總結向量商店資料的工具。</p>
<p>連線流程如下AI 代理 (工具連接器) -&gt; Vector Store 問題解答工具 (Vector Store 連接器) -&gt; Milvus Vector Store。</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">節點操作模式<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Vector Store 節點支援多種操作模式，每種模式都是針對不同的工作流程用例量身打造。瞭解這些模式有助於設計更有效的工作流程。</p>
<p>我們將在下面提供可用操作模式和選項的高階概述。如需每種模式的輸入參數和組態選項的完整清單，請參閱<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">官方說明文件</a>。</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">操作模式概述</h3><p>Milvus Vector Store 節點支援四種不同的模式：</p>
<ul>
<li><strong>取得多個</strong>：根據語意與提示的相似性擷取多個文件。</li>
<li><strong>插入文件</strong>：插入新的文件到您的 Milvus 收集。</li>
<li><strong>擷取文件 (As Vector Store for Chain/Tool)：</strong>在以鏈為基礎的系統中使用節點作為擷取器。</li>
<li><strong>擷取文件（作為 AI 代理的工具）</strong>：在回答問題的任務中，將該節點用作 AI 代理的工具資源。</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">其他節點選項</h3><ul>
<li><strong>Metadata 過濾器</strong>(僅限 Get Many 模式)：根據自訂的 metadata 關鍵篩選結果。多個欄位會套用 AND 條件。</li>
<li><strong>Clear Collection</strong>(僅限 Insert Documents 模式)：在插入新文件之前，從集合中移除現有文件。</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">相關資源</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus 整合文件</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus 文件</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n 進階 AI 文件</a></li>
</ul>
