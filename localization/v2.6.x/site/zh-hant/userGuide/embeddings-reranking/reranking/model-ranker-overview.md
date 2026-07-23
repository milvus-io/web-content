---
id: model-ranker-overview.md
title: 模型排名器概述Compatible with Milvus 2.6.x
summary: >-
  傳統的向量搜尋純粹根據數學上的相似度來排序結果——也就是向量在高維空間中的匹配程度。雖然這種方法很有效率，但往往會忽略真正的語義相關性。以搜尋「資料庫優化的最佳實務」為例：您可能會收到向量相似度很高、且頻繁提及這些術語的文件，但這些文件實際上並未提供可付諸實行的優化策略。
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">模型排名器概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>傳統的向量搜尋純粹依據數學上的相似度來排序結果——即向量在高維空間中的匹配程度。雖然這種方法效率很高，但往往會忽略真正的語義相關性。試想搜尋<strong>「資料庫優化的最佳實踐」：</strong>您可能會收到向量相似度很高、且頻繁提及這些術語的文件，但這些文件實際上並未提供可付諸實行的優化策略。</p>
<p>Model Ranker 透過整合能理解查詢與文件之間語義關係的先進語言模型，徹底革新了 Milvus 的搜尋方式。它不再僅依賴向量相似度，而是評估內容的意義與上下文，從而提供更智能、更相關的搜尋結果。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>模型排序器無法與分組搜尋功能併用。</p></li>
<li><p>用於模型重新排序的欄位必須為文字類型（<code translate="no">VARCHAR</code> ）。</p></li>
<li><p>每個模型重新排序器每次僅能使用一個<code translate="no">VARCHAR</code> 欄位進行評估。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">運作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>模型排序器透過一套明確定義的工作流程，將語言模型的理解能力整合至 Milvus 搜尋流程中：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>模型排名器概覽</span>
  
 </span></p>
<ol>
<li><p><strong>初始查詢</strong>：您的應用程式將查詢傳送至 Milvus</p></li>
<li><p><strong>向量搜尋</strong>：Milvus 執行標準向量搜尋以識別候選文件</p></li>
<li><p><strong>候選文件檢索</strong>：系統根據向量相似度識別出初始候選文件集</p></li>
<li><p><strong>模型評估</strong>：模型排序器函式處理查詢-文件配對：</p>
<ul>
<li><p>將原始查詢與候選文件傳送至外部模型服務</p></li>
<li><p>語言模型評估查詢與每份文件之間的語義相關性</p></li>
<li><p>每份文件會根據語義理解獲得相關性分數</p></li>
</ul></li>
<li><p><strong>智慧重新排序</strong>：根據模型產生的相關性分數，重新排列文件順序</p></li>
<li><p><strong>強化搜尋結果</strong>：您的應用程式將收到依語義相關性排序的結果，而非僅依向量相似度排序</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">根據您的需求選擇模型供應商<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援以下用於重新排序的模型服務供應商，各家皆具備獨特特性：</p>
<table>
   <tr>
     <th><p>供應商</p></th>
     <th><p>最適合</p></th>
     <th><p>特點</p></th>
     <th><p>應用範例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>需要深度語義理解與客製化的複雜應用</p></td>
     <td><ul><li><p>支援各種大型語言模型</p></li><li><p>靈活的部署選項</p></li><li><p>更高的運算需求</p></li><li><p>更大的客製化潛力</p></li></ul></td>
     <td><p>部署了能理解法律術語與判例法之間關係的領域專用模型之法律研究平台</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>快速實施且資源利用率高</p></td>
     <td><ul><li><p>針對文字處理進行優化的輕量級服務</p></li><li><p>部署更簡便，資源需求更低</p></li><li><p>預先優化的重新排序模型</p></li><li><p>基礎架構開銷極低</p></li></ul></td>
     <td><p>需要高效重新排序功能且符合標準要求的內容管理系統</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>優先考量可靠性與整合便利性的企業級應用程式</p></td>
     <td><ul><li><p>企業級的可靠性與可擴展性</p></li><li><p>無需維護基礎架構的託管服務</p></li><li><p>多語言重新排序功能</p></li><li><p>內建流量限制與錯誤處理機制</p></li></ul></td>
     <td><p>需要高可用性搜尋功能、穩定 API 效能及多語言產品目錄的電子商務平台</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>具有特定效能與語境需求的 RAG 應用程式</p></td>
     <td><ul><li><p>專為重新排序任務訓練的模型</p></li><li><p>針對不同文件長度的細粒度截斷控制</p></li><li><p>針對生產環境工作負載進行優化的推論</p></li><li><p>多種模型變體（rerank-2、rerank-lite 等）</p></li></ul></td>
     <td><p>包含不同文件長度的研究資料庫，需要精細調校的效能控制與專業的語義理解</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>以成本效益為優先考量，處理長篇文件之應用</p></td>
     <td><ul><li><p>具備可配置重疊度的進階文件分塊功能</p></li><li><p>基於區塊的評分（得分最高的區塊代表該文件）</p></li><li><p>支援多種重新排序模型</p></li><li><p>提供標準版與專業版兩種方案，兼具成本效益</p></li></ul></td>
     <td><p>技術文件檢索系統，用於處理需要智慧分割與重疊控制的長篇手冊及論文</p></td>
   </tr>
</table>
<p>有關各模型服務實作的詳細資訊，請參閱專用文件：</p>
<ul>
<li><p><a href="/docs/zh-hant/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">實作<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>在實作 Model Ranker 之前，請確保您已具備：</p>
<ul>
<li><p>一個 Milvus 集合，其中包含名為 `<code translate="no">VARCHAR</code> ` 的欄位，該欄位存有待重新排序的文字</p></li>
<li><p>一個可由您的 Milvus 實例存取且正在運行的外部模型服務</p></li>
<li><p>Milvus 與您選用的模型服務之間具備適當的網路連線</p></li>
</ul>
<p>模型排序器可與標準向量搜尋及混合搜尋操作無縫整合。實作過程涉及建立一個 Function 物件來定義您的重新排序設定，並將其傳遞給搜尋操作。</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">建立模型排序器<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>要實作模型重新排序，首先需定義一個具有適當配置的 Function 物件。在此範例中，我們使用 TEI 作為服務提供者：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>是否必填？</p></th>
     <th><p>說明</p></th>
     <th><p>值 / 範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>執行搜尋時用於識別您的函式的識別碼。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用於重新排序的文字欄位名稱。</p><p>必須為<code translate="no">VARCHAR</code> 類型的欄位。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定正在建立的函數類型。</p><p>對於所有模型排名器，此參數必須設定為「<code translate="no">RERANK</code> 」。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>是</p></td>
     <td><p>一個包含基於模型的重新排序函數配置的字典。可用的參數（鍵）會因服務提供者而異。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必須設定為 `<code translate="no">"model"</code> ` 才能啟用模型重新排序。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用於重新排序的模型服務提供者。</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重新排序模型用於計算相關性分數的查詢字串清單。</p><p>查詢字串的數量必須與搜尋操作中的查詢數量完全相符（即使使用查詢向量而非文字），否則將回報錯誤。</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>模型服務的 URL。</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>單批次中最多可處理的文件數量。較大的數值會提高吞吐量，但需要更多記憶體。</p></td>
     <td><p><code translate="no">32</code> (預設)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">套用至標準向量搜尋<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>定義模型排序器後，您可透過將其傳遞至 `ranker` 參數，在搜尋操作中套用該模型：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
