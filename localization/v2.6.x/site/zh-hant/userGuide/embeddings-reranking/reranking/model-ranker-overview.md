---
id: model-ranker-overview.md
title: 模型排名器概述Compatible with Milvus 2.6.x
summary: >-
  傳統向量搜尋純粹依據數學相似度來排列結果 -
  向量在高維空間中的匹配程度。這種方法雖然有效率，但往往會遺漏真正的語意相關性。考慮搜尋「資料庫最佳優化實務」：您可能會收到高向量相似度的文件，這些文件會經常提到這些詞彙，但實際上卻沒有提供可行的優化策略。
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
    </button></h1><p>傳統的向量搜尋純粹是透過數學相似性來排列結果，也就是向量在高維空間中的匹配程度。這種方法雖然有效率，但往往會忽略真正的語意相關性。考慮搜尋<strong>「資料庫最佳優化實務」：</strong>您可能會收到高向量相似度的文件，這些文件會經常提到這些詞彙，但實際上卻沒有提供可行的優化策略。</p>
<p>Model Ranker 整合了先進的語言模型，能夠理解查詢與文件之間的語義關係，從而改變 Milvus 的搜尋方式。它不只依賴向量相似度，還會評估內容意義和上下文，以提供更智慧、更相關的搜尋結果。</p>
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
<li><p>模型排名器不能用於群組搜尋。</p></li>
<li><p>用於模型排序的欄位必須是文字類型 (<code translate="no">VARCHAR</code>)。</p></li>
<li><p>每個模型排名器一次只能使用一個<code translate="no">VARCHAR</code> 欄位進行評估。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">如何運作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>模型排序器通過明確的工作流程將語言模型理解能力整合到 Milvus 搜索流程中：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>模型排序器概述</span> </span></p>
<ol>
<li><p><strong>初始查詢</strong>：您的應用程式發送查詢至 Milvus</p></li>
<li><p><strong>向量搜尋</strong>：Milvus 執行標準向量搜索來識別候選文件</p></li>
<li><p><strong>候選檢索</strong>：系統根據向量相似性識別初始候選文件集</p></li>
<li><p><strong>模型評估</strong>：Model Ranker 功能處理查詢-文件對：</p>
<ul>
<li><p>將原始查詢和候選文件傳送至外部模型服務</p></li>
<li><p>語言模型評估查詢和每個文件之間的語義相關性</p></li>
<li><p>每個文件都會根據語義理解獲得相關性分數</p></li>
</ul></li>
<li><p><strong>智慧型重新排序</strong>：根據模型產生的相關性分數對文件重新排序</p></li>
<li><p><strong>增強的結果</strong>：您的應用程式會收到以語義相關性來排序的結果，而不只是向量相似性。</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">根據您的需求選擇模型提供商<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援下列模型服務供應商進行重新排序，每個供應商都有其獨特之處：</p>
<table>
   <tr>
     <th><p>提供商</p></th>
     <th><p>最適合</p></th>
     <th><p>特性</p></th>
     <th><p>使用範例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>需要深入瞭解語意和客制化的複雜應用程式</p></td>
     <td><ul><li><p>支援各種大型語言模型</p></li><li><p>靈活的部署選項</p></li><li><p>較高的計算需求</p></li><li><p>更大的客製化潛力</p></li></ul></td>
     <td><p>部署特定領域模型的法律研究平台，可理解法律術語和判例法關係</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>快速實作，資源使用效率高</p></td>
     <td><ul><li><p>針對文字作業最佳化的輕量級服務</p></li><li><p>部署更輕鬆，資源需求更低</p></li><li><p>預先最佳化的重排模型</p></li><li><p>基礎架構開銷最小化</p></li></ul></td>
     <td><p>內容管理系統需要具備標準需求的高效重排功能</p></td>
   </tr>
   <tr>
     <td><p>一致性</p></td>
     <td><p>以可靠性和易整合性為優先考量的企業應用程式</p></td>
     <td><ul><li><p>企業級的可靠性與擴充性</p></li><li><p>無需基礎架構維護的管理式服務</p></li><li><p>多語言重排功能</p></li><li><p>內建速率限制與錯誤處理</p></li></ul></td>
     <td><p>需要高可用性搜尋與一致 API 效能和多語言產品目錄的電子商務平台</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>具有特定效能與情境需求的 RAG 應用程式</p></td>
     <td><ul><li><p>專為重排任務訓練的模型</p></li><li><p>針對不同文件長度的細膩截斷控制</p></li><li><p>針對生產工作負載進行最佳化推論</p></li><li><p>多種模型變體 (rerank-2、rerank-lite 等)</p></li></ul></td>
     <td><p>具有不同文件長度的研究資料庫，需要微調的效能控制和專門的語意理解</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>以成本效益為優先處理長文件的應用程式</p></td>
     <td><ul><li><p>可設定重疊的進階文件分塊</p></li><li><p>基於分塊的評分（得分最高的分塊代表文件）</p></li><li><p>支援多種重排模型</p></li><li><p>具成本效益的標準和專業模式變體</p></li></ul></td>
     <td><p>技術文件搜尋系統處理需要智慧分割與重疊控制的冗長手冊與文件</p></td>
   </tr>
</table>
<p>有關各模型服務實施的詳細資訊，請參閱專用文件：</p>
<ul>
<li><p><a href="/docs/zh-hant/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/tei-ranker.md">TEI 排序器</a></p></li>
<li><p><a href="/docs/zh-hant/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/zh-hant/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">執行<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>在實作 Model Ranker 之前，請確保您擁有</p>
<ul>
<li><p>具有<code translate="no">VARCHAR</code> 欄位的 Milvus 集合，其中包含要重新排名的文字</p></li>
<li><p>可存取您的 Milvus 實例的執行中外部模型服務</p></li>
<li><p>在 Milvus 和您選擇的模型服務之間有適當的網路連線</p></li>
</ul>
<p>模型排序器與標準向量搜尋和混合搜尋操作無縫整合。實作包括建立一個 Function 物件，定義您的排序配置，並將它傳給搜尋作業。</p>
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
    </button></h3><p>要實作模型重排，首先要定義一個具有適當配置的 Function 物件。在本範例中，我們使用 TEI 作為服務提供者：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
     <th><p>需要嗎？</p></th>
     <th><p>說明</p></th>
     <th><p>值/範例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>是</p></td>
     <td><p>執行搜尋時使用的功能識別碼。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用於重新排序的文字欄位名稱。</p><p>必須是<code translate="no">VARCHAR</code> 類型的欄位。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定正在建立的函式類型。</p><p>對於所有模型排名器，必須設定為<code translate="no">RERANK</code> 。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>是</p></td>
     <td><p>包含基於模型的重新排序函式設定的辭典。可用參數 (鍵) 依服務供應商而有所不同。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必須設定為<code translate="no">"model"</code> ，才能啟用模型重排功能。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用於重排的模型服務提供者。</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排模型用來計算相關性分數的查詢字串清單。</p><p>查詢字串的數量必須與搜尋作業中的查詢字串數量完全相同 (即使使用查詢向量來取代文字)，否則會報錯。</p></td>
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
     <td><p>單一批次中要處理的最大文件數量。較大值會增加吞吐量，但需要較多記憶體。</p></td>
     <td><p><code translate="no">32</code> (預設值)</p></td>
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
    </button></h3><p>定義模型排序器之後，您可以將它傳給排序器參數，在搜尋作業時套用：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
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
