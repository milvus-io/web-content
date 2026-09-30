---
id: everos_with_milvus.md
summary: >-
  在本教學中，我們將建置一個專案助理，使其能夠在不同的對話中記住發佈決策。我們將加入關於 Project Atlas
  發布的對話，以及與其他專案相關的無關對話。EverOS 將使用大型語言模型（LLM）來提取這些記憶，而 Milvus 則負責儲存用於混合搜尋的 BM25
  和向量索引。
title: 運用 EverOS 與 Milvus 建立長期代理記憶體
---
<h1 id="Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="common-anchor-header">運用 EverOS 與 Milvus 建立長期代理記憶體<button data-href="#Build-Long-Term-Agent-Memory-with-EverOS-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/EverMind-AI/EverOS">EverOS</a>是一個專為 AI 代理設計、以 Markdown 為核心的記憶系統。它能從對話中提取持久的記憶，將 Markdown 作為權威來源，並建立可搜尋的衍生索引。</p>
<p>在本教學中，我們將打造一位能記住不同對話中發布決策的專案助理。我們會加入關於「Project Atlas」發布的對話，以及與其他專案無關的對話。EverOS 將使用大型語言模型（LLM）來提取記憶，而<a href="https://milvus.io/">Milvus</a>則負責儲存用於混合搜尋的 BM25 索引和向量索引。</p>
<pre><code translate="no" class="language-text">Conversations
      |
      v
EverOS + LLM ------&gt; Markdown memory files
      |
      | embedding model
      v
Milvus ------&gt; BM25 + vector hybrid search
<button class="copy-code-btn"></button></code></pre>
<p>大型語言模型（LLM）與嵌入模型各自承擔不同的職責。大型語言模型將對話轉化為結構化記憶；嵌入模型則將這些記憶以及後續的搜尋查詢轉換為向量。本教學中的基礎混合搜尋無需使用重新排序模型。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>您需要：</p>
<ul>
<li>Python 3.12 或更新版本</li>
<li><a href="https://docs.astral.sh/uv/"><code translate="no">uv</code></a></li>
<li>已運作的<a href="https://milvus.io/docs/install-overview.md">Milvus 伺服器</a></li>
<li>一個<a href="https://platform.openai.com/api-keys">OpenAI API 金鑰</a></li>
</ul>
<p>本教學將連線至<code translate="no">http://localhost:19530</code> 上的 Milvus 伺服器。EverOS 亦支援透過相同的 URI 和憑證設定連線至<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。其 Milvus 後端需指定遠端端點，且不接受 Milvus Lite 的檔案路徑。</p>
<h2 id="Install-EverOS" class="common-anchor-header">安裝 EverOS<button data-href="#Install-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>建立本機專案並安裝 EverOS 及其可選的 Milvus 依賴項：</p>
<pre><code translate="no" class="language-shell">mkdir everos-milvus-demo
cd everos-milvus-demo

uv init --bare --python 3.12
uv add &quot;everos[milvus]&quot;
<button class="copy-code-btn"></button></code></pre>
<p>此指令刻意未指定版本，因此新安裝時會自動取得最新相容的 EverOS 發行版。</p>
<p>為本教學初始化一個獨立的記憶體根目錄：</p>
<pre><code translate="no" class="language-shell">export EVEROS_ROOT=&quot;$PWD/everos-data&quot;
uv run everos init --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>EverOS 會在此目錄下建立<code translate="no">everos.toml</code> 和<code translate="no">ome.toml</code> 。它也會將解壓縮後的記憶體檔案寫入此處。</p>
<h2 id="Configure-OpenAI-and-Milvus" class="common-anchor-header">設定 OpenAI 與 Milvus<button data-href="#Configure-OpenAI-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>透過環境變數設定 OpenAI API 金鑰並配置 EverOS：</p>
<pre><code translate="no" class="language-shell">export OPENAI_API_KEY=&quot;YOUR_OPENAI_API_KEY&quot;
export MILVUS_URI=&quot;http://localhost:19530&quot;

export EVEROS_INDEX__BACKEND=&quot;milvus&quot;
export EVEROS_MILVUS__URI=&quot;$MILVUS_URI&quot;
export EVEROS_MILVUS__COLLECTION_PREFIX=&quot;everos_bootcamp&quot;

export EVEROS_LLM__MODEL=&quot;gpt-5.4-mini&quot;
export EVEROS_LLM__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_LLM__BASE_URL=&quot;https://api.openai.com/v1&quot;

export EVEROS_EMBEDDING__MODEL=&quot;text-embedding-3-small&quot;
export EVEROS_EMBEDDING__API_KEY=&quot;$OPENAI_API_KEY&quot;
export EVEROS_EMBEDDING__BASE_URL=&quot;https://api.openai.com/v1&quot;
export EVEROS_EMBEDDING__DIMENSIONS=&quot;1024&quot;

export EVEROS_MEMORIZE__MODE=&quot;chat&quot;
<button class="copy-code-btn"></button></code></pre>
<p>EverOS 同時使用 OpenAI 進行記憶體擷取與嵌入向量處理。<code translate="no">text-embedding-3-small</code> 預設會返回<code translate="no">1536</code> 維度的結果，但 EverOS 會將設定的<code translate="no">dimensions</code> 值轉發給 OpenAI。本教學中請求<code translate="no">1024</code> 維度的結果，以配合由 EverOS 管理的 Milvus 資料結構。</p>
<p><code translate="no">chat</code> 的記憶體模式使本範例能專注於使用者記憶體。EverOS 負責管理 Milvus 集合及其資料結構，因此您無需自行建立。</p>
<h2 id="Start-EverOS" class="common-anchor-header">啟動 EverOS<button data-href="#Start-EverOS" class="anchor-icon" translate="no">
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
    </button></h2><p>啟動 EverOS HTTP 伺服器：</p>
<pre><code translate="no" class="language-shell">uv run everos server start --root &quot;$EVEROS_ROOT&quot;
<button class="copy-code-btn"></button></code></pre>
<p>請保持此終端機開啟。EverOS 會在啟動時連線至 Milvus，並使用已設定的前綴建立七個衍生索引集合。</p>
<p>在同一專案目錄中開啟另一個終端機，並檢查服務狀態：</p>
<pre><code translate="no" class="language-shell">curl http://127.0.0.1:8000/health
<button class="copy-code-btn"></button></code></pre>
<p>參考輸出：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ok&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.3.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;capabilities&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;embed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;rerank&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;multimodal_llm&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;cascade&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;healthy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;pending&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>回應中包含額外的健康狀態欄位。本教學中重要的數值包括<code translate="no">status: &quot;ok&quot;</code> 、<code translate="no">llm: true</code> 、<code translate="no">embed: true</code> 以及<code translate="no">cascade.healthy: true</code> 。</p>
<h2 id="Add-project-conversations" class="common-anchor-header">新增專案對話<button data-href="#Add-project-conversations" class="anchor-icon" translate="no">
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
    </button></h2><p>以下 Python 程式會向 EverOS 傳送十個獨立的對話。Atlas 設有獨立的啟動與回滾討論。其中八個關於其他專案的對話會作為干擾項，使後續的搜尋必須辨識出正確的專案記憶。</p>
<p>將以下程式碼儲存為<code translate="no">add_memories.py</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


API_URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory&quot;</span>
NOW = <span class="hljs-built_in">int</span>(time.time() * <span class="hljs-number">1000</span>)

conversations = [
    (
        <span class="hljs-string">&quot;atlas-release&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Atlas, we decided to launch with a 10% canary &quot;</span>
                    <span class="hljs-string">&quot;on September 30. Promote to all users only after the checkout &quot;</span>
                    <span class="hljs-string">&quot;error rate stays below 1% for 30 minutes.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">1_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. I will remember the Atlas launch date, canary &quot;</span>
                    <span class="hljs-string">&quot;percentage, and promotion gate.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;atlas-rollback&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">10_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;The Atlas rollback owner is Priya. Roll back immediately if &quot;</span>
                    <span class="hljs-string">&quot;checkout errors exceed 2% for five minutes, and keep the &quot;</span>
                    <span class="hljs-string">&quot;previous container image available for 24 hours.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">11_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Got it. Priya owns rollback, with the 2% five-minute trigger &quot;</span>
                    <span class="hljs-string">&quot;and a 24-hour image retention window.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;orion-pricing&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">20_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Orion will test annual billing with the education &quot;</span>
                    <span class="hljs-string">&quot;segment. The pricing review is scheduled for October 12.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">21_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Orion&#x27;s annual billing experiment and October &quot;</span>
                    <span class="hljs-string">&quot;pricing review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;vega-mobile&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">30_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;For Project Vega, the mobile team chose offline drafts as the &quot;</span>
                    <span class="hljs-string">&quot;next milestone. Elena will review the interaction design on &quot;</span>
                    <span class="hljs-string">&quot;October 18.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">31_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Vega&#x27;s next milestone is offline drafts, followed by &quot;</span>
                    <span class="hljs-string">&quot;Elena&#x27;s design review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;nova-warehouse&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">40_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Nova will migrate the analytics warehouse to Iceberg. &quot;</span>
                    <span class="hljs-string">&quot;Marcus owns the checksum rehearsal scheduled for October 22.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">41_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Nova&#x27;s warehouse migration and Marcus&#x27;s &quot;</span>
                    <span class="hljs-string">&quot;checksum rehearsal.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;helios-support&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">50_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Helios needs weekend support coverage for the APAC &quot;</span>
                    <span class="hljs-string">&quot;region. Imani will publish the rotation schedule on November 1.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">51_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Helios needs APAC weekend coverage, and Imani owns the &quot;</span>
                    <span class="hljs-string">&quot;rotation schedule.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;luna-onboarding&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">60_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Luna will replace the onboarding tour with a checklist. &quot;</span>
                    <span class="hljs-string">&quot;The localized copy is due from the content team on October 25.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">61_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Luna&#x27;s checklist approach and the localization &quot;</span>
                    <span class="hljs-string">&quot;deadline.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;aurora-observability&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">70_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Aurora will retain detailed telemetry for 30 days. &quot;</span>
                    <span class="hljs-string">&quot;The operations team should alert after three consecutive &quot;</span>
                    <span class="hljs-string">&quot;heartbeat misses.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">71_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Understood. Aurora keeps 30 days of telemetry and alerts after &quot;</span>
                    <span class="hljs-string">&quot;three missed heartbeats.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;comet-invoices&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">80_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Comet will add downloadable invoice PDFs for enterprise &quot;</span>
                    <span class="hljs-string">&quot;accounts. Finance will approve the tax-field layout on October 28.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">81_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Noted. Comet covers enterprise invoice PDFs and an October tax &quot;</span>
                    <span class="hljs-string">&quot;layout review.&quot;</span>
                ),
            },
        ],
    ),
    (
        <span class="hljs-string">&quot;solstice-research&quot;</span>,
        [
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
                <span class="hljs-string">&quot;sender_name&quot;</span>: <span class="hljs-string">&quot;Maya&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">90_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;Project Solstice is prototyping voice notes for field researchers. &quot;</span>
                    <span class="hljs-string">&quot;The research team will interview 12 participants in November.&quot;</span>
                ),
            },
            {
                <span class="hljs-string">&quot;sender_id&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;assistant&quot;</span>,
                <span class="hljs-string">&quot;timestamp&quot;</span>: NOW + <span class="hljs-number">91_000</span>,
                <span class="hljs-string">&quot;content&quot;</span>: (
                    <span class="hljs-string">&quot;I will remember Solstice&#x27;s voice-note prototype and the planned &quot;</span>
                    <span class="hljs-string">&quot;participant interviews.&quot;</span>
                ),
            },
        ],
    ),
]


<span class="hljs-keyword">def</span> <span class="hljs-title function_">post</span>(<span class="hljs-params">path, payload</span>):
    request = Request(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{API_URL}</span>/<span class="hljs-subst">{path}</span>&quot;</span>,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>]


<span class="hljs-keyword">for</span> session_id, messages <span class="hljs-keyword">in</span> conversations:
    added = post(
        <span class="hljs-string">&quot;add&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
            <span class="hljs-string">&quot;messages&quot;</span>: messages,
            <span class="hljs-string">&quot;defer_extraction&quot;</span>: <span class="hljs-literal">True</span>,
        },
    )
    flushed = post(
        <span class="hljs-string">&quot;flush&quot;</span>,
        {
            <span class="hljs-string">&quot;session_id&quot;</span>: session_id,
            <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
            <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
        },
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{session_id}</span>: <span class="hljs-subst">{added[<span class="hljs-string">&#x27;status&#x27;</span>]}</span> -&gt; <span class="hljs-subst">{flushed[<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>從專案目錄執行該程式：</p>
<pre><code translate="no" class="language-shell">uv run python add_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>參考輸出：</p>
<pre><code translate="no" class="language-text">atlas-release: accumulated -&gt; extracted
atlas-rollback: accumulated -&gt; extracted
orion-pricing: accumulated -&gt; extracted
vega-mobile: accumulated -&gt; extracted
nova-warehouse: accumulated -&gt; extracted
helios-support: accumulated -&gt; extracted
luna-onboarding: accumulated -&gt; extracted
aurora-observability: accumulated -&gt; extracted
comet-invoices: accumulated -&gt; extracted
solstice-research: accumulated -&gt; extracted
<button class="copy-code-btn"></button></code></pre>
<p>將 `<code translate="no">defer_extraction</code> ` 設定為 `<code translate="no">true</code> `，即可將每段對話儲存至持久化緩衝區，而無需要求大型語言模型（LLM）偵測邊界。下列 `<code translate="no">/flush</code> ` 呼叫會標記該會話的結束，並觸發一次提取。隨後，EverOS 會將提取的片段寫入 Markdown 格式，並以非同步方式將其嵌入 Milvus 索引中。</p>
<h2 id="Inspect-the-Markdown-memory" class="common-anchor-header">檢視 Markdown 記憶體<button data-href="#Inspect-the-Markdown-memory" class="anchor-icon" translate="no">
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
    </button></h2><p>生成的片段檔案儲存於應用程式、專案及使用者範圍之下：</p>
<pre><code translate="no" class="language-shell">find &quot;$EVEROS_ROOT/project-assistant/launch-planning/users/maya/episodes&quot; \
  -type f -name &quot;*.md&quot;
<button class="copy-code-btn"></button></code></pre>
<p>參考輸出（檔案名稱中的日期反映您執行範例的時間）：</p>
<pre><code translate="no" class="language-text">everos-data/project-assistant/launch-planning/users/maya/episodes/episode-2026-09-08.md
<button class="copy-code-btn"></button></code></pre>
<p>開啟檔案即可查看由 LLM 提取的記憶片段。以下為節錄內容：</p>
<pre><code translate="no" class="language-markdown"><span class="hljs-section">## ep<span class="hljs-emphasis">_20260908_</span>00000001</span>

<span class="hljs-strong">**owner<span class="hljs-emphasis">_id**: maya
**session_</span>id**</span>: atlas-release
<span class="hljs-strong">**sender<span class="hljs-emphasis">_ids**: [maya, assistant]

### Subject
Maya&#x27;s Project Atlas Launch Decision: September 30 Canary and Promotion Criteria

### Content
Maya decided that Project Atlas would launch with a 10% canary on September 30.
The promotion to all users would occur only after the checkout error rate remained
below 1% for 30 minutes.
</span></span><button class="copy-code-btn"></button></code></pre>
<p>由於記憶片段是由 LLM 提取的，因此確切的措辭、識別碼和時間戳記可能會有所不同。原始的 Markdown 檔案仍是可信賴的權威來源；Milvus 索引可根據這些檔案重新建置。</p>
<h2 id="Search-the-memories" class="common-anchor-header">搜尋記憶片段<button data-href="#Search-the-memories" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Atlas 正式上線前，請使用混合搜尋來查詢應記住的內容。將以下程式碼儲存為<code translate="no">search_memories.py</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> Request, urlopen


URL = <span class="hljs-string">&quot;http://127.0.0.1:8000/api/v2/memory/search&quot;</span>
payload = {
    <span class="hljs-string">&quot;user_id&quot;</span>: <span class="hljs-string">&quot;maya&quot;</span>,
    <span class="hljs-string">&quot;app_id&quot;</span>: <span class="hljs-string">&quot;project-assistant&quot;</span>,
    <span class="hljs-string">&quot;project_id&quot;</span>: <span class="hljs-string">&quot;launch-planning&quot;</span>,
    <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;What should I remember before Atlas goes live?&quot;</span>,
    <span class="hljs-string">&quot;method&quot;</span>: <span class="hljs-string">&quot;hybrid&quot;</span>,
    <span class="hljs-string">&quot;top_k&quot;</span>: <span class="hljs-number">4</span>,
}


<span class="hljs-keyword">def</span> <span class="hljs-title function_">search</span>():
    request = Request(
        URL,
        data=json.dumps(payload).encode(),
        headers={<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>},
        method=<span class="hljs-string">&quot;POST&quot;</span>,
    )
    <span class="hljs-keyword">with</span> urlopen(request, timeout=<span class="hljs-number">300</span>) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> json.load(response)[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;episodes&quot;</span>]


expected_sessions = {<span class="hljs-string">&quot;atlas-release&quot;</span>, <span class="hljs-string">&quot;atlas-rollback&quot;</span>}

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">30</span>):
    episodes = search()
    top_results = episodes[:<span class="hljs-number">2</span>]
    <span class="hljs-keyword">if</span> {episode[<span class="hljs-string">&quot;session_id&quot;</span>] <span class="hljs-keyword">for</span> episode <span class="hljs-keyword">in</span> top_results} == expected_sessions:
        <span class="hljs-keyword">break</span>
    time.sleep(<span class="hljs-number">2</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-keyword">raise</span> RuntimeError(<span class="hljs-string">&quot;The expected Atlas memories were not indexed in time&quot;</span>)

<span class="hljs-keyword">for</span> rank, episode <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(top_results, start=<span class="hljs-number">1</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{rank}</span>. <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;session_id&#x27;</span>]}</span> | score=<span class="hljs-subst">{episode[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.3</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;   <span class="hljs-subst">{episode[<span class="hljs-string">&#x27;subject&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>執行搜尋：</p>
<pre><code translate="no" class="language-shell">uv run python search_memories.py
<button class="copy-code-btn"></button></code></pre>
<p>參考輸出結果（分數與措辭可能有所不同）：</p>
<pre><code translate="no" class="language-text">1. atlas-release | score=0.492
   Project Atlas Launch Plan: 10% Canary Rollout on September 30 with Error Rate Gate
2. atlas-rollback | score=0.400
   Atlas Rollback Plan Details: Priya as Owner, 2% Error Trigger, 24-Hour Image Retention
<button class="copy-code-btn"></button></code></pre>
<p>兩則 Atlas 對話皆排在八則無關對話之前。EverOS 會將查詢傳送至 OpenAI 嵌入端點，並要求 Milvus 在 Maya 的應用程式與專案範圍內提供 BM25 及向量候選結果，最後將這兩組結果清單進行融合。</p>
<h2 id="Inspect-the-Milvus-collections" class="common-anchor-header">檢視 Milvus 集合<button data-href="#Inspect-the-Milvus-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>EverOS 會針對每種受支援的衍生記憶體類型建立一個集合。使用<code translate="no">MilvusClient</code> 列出其行數：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


prefix = <span class="hljs-string">&quot;everos_bootcamp&quot;</span>
client = MilvusClient(uri=os.environ.get(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;http://localhost:19530&quot;</span>))

memory_kinds = [
    <span class="hljs-string">&quot;agent_case&quot;</span>,
    <span class="hljs-string">&quot;agent_skill&quot;</span>,
    <span class="hljs-string">&quot;atomic_fact&quot;</span>,
    <span class="hljs-string">&quot;episode&quot;</span>,
    <span class="hljs-string">&quot;foresight&quot;</span>,
    <span class="hljs-string">&quot;knowledge_topic&quot;</span>,
    <span class="hljs-string">&quot;user_profile&quot;</span>,
]

<span class="hljs-keyword">for</span> kind <span class="hljs-keyword">in</span> memory_kinds:
    name = <span class="hljs-string">f&quot;<span class="hljs-subst">{prefix}</span>_<span class="hljs-subst">{kind}</span>&quot;</span>
    <span class="hljs-keyword">if</span> client.has_collection(collection_name=name):
        result = client.query(
            collection_name=name,
            <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;&quot;</span>,
            output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>],
        )
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{kind}</span>: <span class="hljs-subst">{result[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;count(*)&#x27;</span>]}</span> rows&quot;</span>)

client.close()
<button class="copy-code-btn"></button></code></pre>
<p>參考已驗證執行結果：</p>
<pre><code translate="no" class="language-text">agent_case: 0 rows
agent_skill: 0 rows
atomic_fact: 50 rows
episode: 10 rows
foresight: 0 rows
knowledge_topic: 0 rows
user_profile: 1 rows
<button class="copy-code-btn"></button></code></pre>
<p>原子事實的確切數量可能因 LLM 輸出而異。這十筆事件記錄對應於十段已沖洗的對話。其餘集合則適用於本聚焦範例未涉及的 EverOS 記憶體模式與功能。</p>
<h2 id="Use-another-Milvus-deployment" class="common-anchor-header">使用其他 Milvus 部署<button data-href="#Use-another-Milvus-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>若要使用其他 Milvus Server 端點或<a href="https://zilliz.com/cloud">Zilliz Cloud，</a>請更新<code translate="no">EVEROS_MILVUS__URI</code> 。當端點需要驗證時，請設定<code translate="no">EVEROS_MILVUS__TOKEN</code> 。資料導入與搜尋程式碼保持不變。</p>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>透過將 EverOS 與 Milvus 結合，您可以將對話轉化為持久的記憶，並透過關鍵字和語義訊號進行檢索。您亦可套用相同的模式，為您的使用者、專案和工作流程，賦予助理及其他代理型應用程式長期記憶能力。</p>
