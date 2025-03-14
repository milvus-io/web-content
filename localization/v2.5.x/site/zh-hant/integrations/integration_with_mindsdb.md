---
id: integration_with_mindsdb.md
summary: >-
  本教學示範了如何將 Milvus 與 MindsDB 整合，使您能夠透過類似 SQL 的操作來管理和查詢向量嵌入，從而利用 MindsDB 的 AI 功能與
  Milvus 的向量資料庫功能。
title: 整合 Milvus 與 MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">整合 Milvus 與 MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a>是一種功能強大的工具，可將 AI 應用程式與多種企業資料來源相整合。它可作為一個聯合查詢引擎，在仔細回答結構化和非結構化資料查詢的同時，為分散的資料帶來秩序。無論您的資料是否分散在 SaaS 應用程式、資料庫或資料倉庫中，MindsDB 都能使用標準 SQL 連接並查詢所有資料。它通過知識庫提供最先進的自主 RAG 系統，支持數百個數據源，並提供從本地開發到雲環境的靈活部署選項。</p>
<p>本教學示範了如何將Milvus與MindsDB整合，通過類似SQL的操作來管理和查詢向量嵌入，使您能夠利用MindsDB的AI功能和Milvus的向量資料庫功能。</p>
<div class="alert note">
<p>本教學主要參考<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>的官方文檔。如果您在本教程中發現任何過時的部分，可以優先按照官方文檔進行，並為我們創建一個問題。</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">安裝MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>在我們開始之前，通過<a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a>或<a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>在本地安裝MindsDB。</p>
<p>在繼續之前，請確保您對MindsDB和Milvus的基本概念和操作都有扎實的理解。</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">參數介紹<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>建立連接所需的參數如下</p>
<ul>
<li><code translate="no">uri</code>milvus資料庫的uri，可以設置為本機的".db "文件或docker或雲端服務。</li>
<li><code translate="no">token</code>: 令牌，根據 uri 選項來支援 docker 或雲端服務。</li>
</ul>
<p>建立連線的可選參數有</p>
<p>這些用於<code translate="no">SELECT</code> 查詢：</p>
<ul>
<li><code translate="no">search_default_limit</code>：在 select 語句中傳遞的預設限制 (default=100)</li>
<li><code translate="no">search_metric_type</code>：用於搜尋的度量類型 (預設=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>：相似性搜尋時是否忽略成長中的區段 (預設值=False)</li>
<li><code translate="no">search_params</code>：特定於<code translate="no">search_metric_type</code> (default={&quot;nprobe&quot;: 10})</li>
</ul>
<p>這些用於<code translate="no">CREATE</code> 查詢：</p>
<ul>
<li><code translate="no">create_auto_id</code>：插入沒有 ID 的記錄時，是否自動產生 ID (預設值=False)</li>
<li><code translate="no">create_id_max_len</code>在建立資料表時，id 欄位的最大長度 (default=64)</li>
<li><code translate="no">create_embedding_dim</code>：創建表時的嵌入維度 (預設值=8)</li>
<li><code translate="no">create_dynamic_field</code>：建立的資料表是否有動態欄位 (預設值=True)</li>
<li><code translate="no">create_content_max_len</code>：內容欄的最大長度 (預設值=200)</li>
<li><code translate="no">create_content_default_value</code>：內容欄的預設值 (default='')</li>
<li><code translate="no">create_schema_description</code>模式的描述 (default='')</li>
<li><code translate="no">create_alias</code>模式的別名 (default='default')</li>
<li><code translate="no">create_index_params</code>： 在 embeddings 列上建立索引的參數 (default={})</li>
<li><code translate="no">create_index_metric_type</code>： 用於創建索引的度量 (default='L2')</li>
<li><code translate="no">create_index_type</code>索引類型 (default='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>繼續之前，請確認<code translate="no">pymilvus</code> 版本與此<a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">pinned 版本</a>相同。如果您發現任何版本相容性問題，您可以回滾您的 pymilvus 版本，或在此<a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">需求檔案</a>中自訂。</p>
<h3 id="Creating-connection" class="common-anchor-header">建立連線</h3><p>為了使用此處理器並連接到MindsDB中的Milvus伺服器，可以使用以下語法：</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>如果你只需要一個本地的向量資料庫來進行小規模的數據或原型設計，將uri設置為一個本地文件，例如：<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有數據存儲在這個文件中。</li>
<li>對於生產中較大規模的資料和流量，您可以在<a href="https://milvus.io/docs/install-overview.md">Docker 或 Kubernetes</a> 上架設 Milvus 伺服器。在此設定中，請使用伺服器位址和連接埠作為您的<code translate="no">uri</code> ，例如<code translate="no">http://localhost:19530</code> 。如果您啟用 Milvus 的驗證功能，請將<code translate="no">token</code> 設定為<code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> ，否則不需要設定令牌。</li>
<li>您也可以在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上使用完全管理的 Milvus。只需將<code translate="no">uri</code> 和<code translate="no">token</code> 設定為 Zilliz Cloud 實例的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端點和 API 金鑰</a>。</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">放棄連線</h3><p>若要放棄連線，請使用此指令</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">建立表格</h3><p>若要從預先存在的資料表插入資料，請使用<code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">丟棄集合</h3><p>不支援刪除集合</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">查詢和選擇</h3><p>要使用搜尋向量查詢資料庫，可以在<code translate="no">WHERE</code> 子句中使用<code translate="no">search_vector</code> </p>
<p>注意事項：</p>
<ul>
<li>如果省略<code translate="no">LIMIT</code> ，會使用<code translate="no">search_default_limit</code> ，因為 Milvus 需要它</li>
<li>不支援 Metadata 欄位，但如果資料集已啟用動態模式，您可以像平常一樣查詢，請參閱下面的範例</li>
<li>動態欄位無法顯示，但可以查詢</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>如果您省略<code translate="no">search_vector</code> ，這會變成基本搜尋，並傳送<code translate="no">LIMIT</code> 或<code translate="no">search_default_limit</code> 資料集中的項目數量。</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以在動態欄位上使用<code translate="no">WHERE</code> 子句，就像一般的 SQL。</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">刪除記錄</h3><p>您可以使用<code translate="no">DELETE</code> 刪除詞條，就像在 SQL 中一樣。</p>
<p>注意事項：</p>
<ul>
<li>Milvus 只支援刪除具有明確指定主鍵的實體。</li>
<li>只能使用<code translate="no">IN</code> 運算符</li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">插入記錄</h3><p>您也可以像這樣插入單獨的記錄：</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">更新</h3><p>Milvus API 不支援更新記錄。您可以嘗試使用<code translate="no">DELETE</code> 和<code translate="no">INSERT</code></p>
<hr>
<p>更多的細節和例子，請參考<a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB官方文檔</a>。</p>
