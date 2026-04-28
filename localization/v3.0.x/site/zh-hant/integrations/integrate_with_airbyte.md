---
id: integrate_with_airbyte.md
summary: >-
  Airbyte 是一套開放原始碼的資料移動基礎架構，用於建立抽取與載入 (EL) 資料管道。它的設計具有多功能性、可擴展性和易用性。Airbyte
  的連接器目錄「開箱即用」，包含 350 多個預先建立的連接器。這些連接器可用於在短短幾分鐘內將資料從來源複製到目的地。
title: Airbyte：開放原始碼資料移動基礎架構
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte：開放原始碼資料移動基礎架構<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte 是一套開放原始碼的資料移動基礎架構，用於建立抽取與載入 (EL) 資料管道。它的設計具有多功能性、可擴展性和易用性。Airbyte 的連接器目錄「開箱即用」，包含 350 多個預先建立的連接器。這些連接器可用於在短短幾分鐘內將資料從來源複製到目的地。</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Airbyte 的主要組成部分<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1.連接器目錄</h3><ul>
<li><strong>350+ 預建連接器</strong>：Airbyte 的連接器目錄 「開箱即用」，包含 350 多個預建連接器。這些連接器可用於在短短幾分鐘內將資料從來源複製到目的地。</li>
<li><strong>No-Code Connector Builder</strong>：您可以透過<a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">No-Code Connector Builder 等</a>工具輕鬆擴展 Airbyte 的功能，以支援您的自訂用例。</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2.平台</h3><p>Airbyte 的平台提供配置和擴展資料移動作業所需的所有水平服務，可選擇<a href="https://airbyte.com/product/airbyte-cloud">雲端管理</a>或<a href="https://airbyte.com/product/airbyte-enterprise">自我管理</a>。</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3.使用者介面</h3><p>Airbyte 具備使用者介面、<a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a>(Python 函式庫)、<a href="https://docs.airbyte.com/api-documentation">API</a> 和<a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a>，可與您偏好的工具和基礎架構管理方法整合。</p>
<p>透過 Airbyte 的能力，使用者可以將資料來源整合至 Milvus 叢集，進行相似性搜尋。</p>
<h2 id="Before-You-Begin" class="common-anchor-header">開始之前<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>您將需要</p>
<ul>
<li>Zendesk 帳戶 (或其他您想要同步資料的資料來源)</li>
<li>Airbyte 帳戶或本機實例</li>
<li>OpenAI API 金鑰</li>
<li>Milvus 集群</li>
<li>本機已安裝 Python 3.10</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">設定 Milvus 叢集<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您已經為生產部署了 K8s 集群，您可以跳過此步驟，直接<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">部署 Milvus Operator</a>。如果沒有，您可以按照<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">步驟</a>使用 Milvus Operator 部署 Milvus 集群。</p>
<p>個別實體 (在我們的例子中，支援票單和知識庫文章) 儲存在「集合」中 - 在您的群集設定完成後，您需要建立一個集合。選擇一個合適的名稱，並將 Dimension 設定為 1536，以符合 OpenAI embeddings 服務所產生的向量維度。</p>
<p>建立後，記錄端點和<a href="https://milvus.io/docs/authenticate.md?tab=docker">驗證</a>資訊。</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">在 Airbyte 中設定連線<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>我們的資料庫已準備就緒，讓我們移動一些資料過去！为此，我们需要在 Airbyte 中配置连接。您可以在<a href="https://cloud.airbyte.com">cloud.airbyte.com</a>註冊<a href="https://cloud.airbyte.com">Airbyte 雲端</a>帳戶，或按照<a href="https://docs.airbyte.com/using-airbyte/getting-started/">說明文件</a>所述啟動本地實例。</p>
<h3 id="Set-Up-Source" class="common-anchor-header">設定來源</h3><p>实例运行后，我们需要设置连接 - 单击 "New connection「（新建连接）并选择 」Zendesk Support "连接器作为源。单击 "Test and Save"（测试并保存）按钮后，Airbyte 将检查是否可以建立连接。</p>
<p>在 Airbyte 云上，您可以通过单击 「验证 」按钮轻松进行验证。使用本機 Airbyte 實例時，請遵循<a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">文件</a>頁面上概述的指示。</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">設定目的地</h3><p>如果一切運作正常，下一步就是設定要移動資料的目的地。在此，選擇「Milvus」連接器。</p>
<p>Milvus 連接器可做三件事：</p>
<ul>
<li><strong>分塊和格式化</strong>- 將 Zendesk 記錄分割為文字和元資料。如果文字大於指定的分塊大小，記錄會被分割成多個部分，並單獨載入資料集中。例如，分割文字（或分塊）可能發生在大型支援票單或知識文章的情況。透過分割文字，您可以確保搜尋總是能得到有用的結果。</li>
</ul>
<p>讓我們使用 1000 個標記的分塊大小，以及 body、title、description 和 subject 等文字欄位，因為這些都會出現在我們從 Zendesk 收到的資料中。</p>
<ul>
<li><strong>嵌入</strong>- 使用機器學習模型將處理部分產生的文字塊轉換為向量嵌入，然後您可以搜尋其語意相似性。若要建立嵌入，您必須提供 OpenAI API 金鑰。Airbyte 將傳送每個chunk 到 OpenAI，並將產生的向量加入載入您 Milvus 叢集的實體中。</li>
<li><strong>索引</strong>- 一旦您將小塊向量化，您就可以將它們載入資料庫。為此，請插入您在 Milvus 叢集中設定叢集和集合時所獲得的資訊。 <div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_1.png" width="40%"/></div>點選「測試並儲存」將檢查一切是否正確排列（有效憑證、集合存在且與設定的嵌入具有相同的向量維度等）。</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">設定串流同步流程</h3><p>資料準備好流動之前的最後一個步驟是選擇要同步的「串流」。流是來源中記錄的集合。由於 Zendesk 支援大量與我們的使用案例不相關的串流，讓我們只選擇「票單」和「文章」，禁用所有其他串流，以節省頻寬，並確保只有相關資訊會顯示在搜尋中：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_2.png" width="40%"/></div>您可以按一下串流名稱，選擇要從來源中萃取哪些欄位。Incremental | Append + Deduped "同步模式意味著後續的連接運行會保持 Zendesk 和 Milvus 同步，同時傳輸最少的資料（僅傳輸自上次運行後發生變化的文章和票單）。</p>
<p>連接一經建立，Airbyte 即會開始同步資料。它可能需要幾分鐘才能出現在您的 Milvus 收集中。</p>
<p>如果您選擇複製頻率，Airbyte 會定期執行，以保持您的 Milvus 收集與 Zendesk 文章和新建立問題的變更同步。</p>
<h3 id="Check-flow" class="common-anchor-header">檢查流程</h3><p>您可以在 Milvus 集群 UI 中检查数据在集合中的结构，方法是导航到 playground 并执行 "Query Data 「查询，过滤器设置为」_ab_stream == \"ticket/""。<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_3.png" width="40%"/></div>正如您在結果檢視中所看到的，來自 Zendesk 的每筆記錄都以獨立的實體儲存於 Milvus 中，並包含所有指定的元資料。嵌入所依據的文字區塊顯示為 "text "屬性 - 這是使用 OpenAI 嵌入的文字，也是我們要搜尋的內容。</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">建立 Streamlit 應用程式查詢資料集<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>我們的資料已經準備就緒 - 現在我們需要建立應用程式來使用它。在這種情況下，應用程式將會是一個簡單的支援表單，供使用者提交支援個案。當使用者按下提交時，我們會做兩件事：</p>
<ul>
<li>搜尋同一組織的使用者所提交的類似票單</li>
<li>搜尋可能與使用者相關的知識型文章</li>
</ul>
<p>在這兩種情況下，我們都會使用 OpenAI 內嵌利用語意搜尋。為此，使用者輸入的問題描述也會被嵌入，並用於從 Milvus 叢集中擷取相似的實體。如果有相關的結果，就會顯示在表單下方。</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">設定 UI 環境</h3><p>您需要本機安裝 Python，因為我們會使用 Streamlit 來實作應用程式。</p>
<p>首先，在本機安裝 Streamlit、Milvus 客戶端函式庫和 OpenAI 客戶端函式庫：</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>若要渲染基本的支援表單，請建立一個 python 檔案<code translate="no">basic_support_form.py</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>要執行應用程式，請使用 Streamlit run：</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>這將會渲染一個基本的表單：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>這個範例的程式碼也可以在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a> 上找到。</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">設定後端查詢服務</h3><p>接下來，讓我們檢查可能相關的現有開狀。為了做到這一點，我們使用 OpenAI 嵌入使用者輸入的文字，然後在我們的集合中進行相似性搜尋，過濾仍未結案的票單。如果有一個提供的票單與現有票單之間的距離很低，就會讓使用者知道，並且不要提交：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>這裡發生了幾件事情：</p>
<ul>
<li>與 Milvus 叢集的連線已建立。</li>
<li>使用 OpenAI 服務產生使用者輸入描述的嵌入。</li>
<li>執行相似性搜尋，依據票單狀態和組織 ID 篩選結果（因為只有同一組織的開放票單才相關）。</li>
<li>如果有結果，且現有票單的嵌入向量與新輸入文字的嵌入向量之間的距離低於某個臨界值，則會指出這個事實。</li>
</ul>
<p>要執行新的應用程式，需要先為 OpenAI 和 Milvus 設定環境變數：</p>
<pre><code translate="no" class="language-shell">export MILVUS_TOKEN=...
export MILVUS_URL=https://...
export OPENAI_API_KEY=sk-...

streamlit run app.py
<button class="copy-code-btn"></button></code></pre>
<p>當嘗試提交已經存在的票單，結果會是這樣：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_5.png" width="40%"/></div>這個範例的程式碼也可以在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a> 上找到。</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">顯示更多相關資訊</h3><p>正如您在隱藏於最終版本中的綠色除錯輸出中所看到的，有兩張票單符合我們的搜尋（狀態為新、來自目前的組織，且接近嵌入向量）。但是，第一張 (相關) 的排名高於第二張 (在此情況下不相關)，這反映在較低的距離值上。這種關係在嵌入向量中被捕捉到，而不會像一般全文檢索一樣直接匹配字詞。</p>
<p>總結一下，讓我們在提交票單之後顯示有用的資訊，儘可能在最前面提供使用者相關資訊。</p>
<p>為此，我們會在提交票單後進行第二次搜尋，以取得最匹配的知識庫文章：</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>如果沒有相似度高的開放支援票單，則會提交新票單，並在下方顯示相關的知識文章：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_6.png" width="40%"/></div>此範例的程式碼也可以在<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a> 上找到。</p>
<h2 id="Conclusion" class="common-anchor-header">總結<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>雖然這裡所顯示的 UI 並非實際的支援表單，而是用來說明使用個案的範例，但 Airbyte 與 Milvus 的結合是非常強大的 - 它可以輕鬆地從各種來源載入文字（從像 Postgres 之類的資料庫，到像 Zendesk 或 GitHub 之類的 API，再到使用 Airbyte 的 SDK 或視覺連接器建立器建立的完全自訂來源），並在 Milvus 中以內嵌的形式進行索引，Milvus 是一個強大的向量搜尋引擎，能夠擴展至龐大的資料量。</p>
<p>Airbyte 和 Milvus 是開放原始碼，可完全免費在您的基礎架構上使用，如果需要，還可透過雲端服務來卸載作業。</p>
<p>除了本文所說明的經典語意搜尋用例外，一般的設定也可用於使用 RAG 方法 (Retrieval Augmented Generation) 建立問題解答聊天機器人、推薦系統，或協助提高廣告的相關性與效率。</p>
