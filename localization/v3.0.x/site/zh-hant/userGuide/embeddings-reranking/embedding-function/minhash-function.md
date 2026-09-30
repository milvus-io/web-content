---
id: minhash-function.md
title: MinHash 函式Compatible with Milvus 3.0.x
summary: 使用 MinHash 將文字轉換為二進位向量，以進行基於 Jaccard 係數的相似度搜尋及近重複內容偵測。
beta: Milvus 3.0.x
---
<h1 id="MinHash-Function" class="common-anchor-header">MinHash 函式<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#MinHash-Function" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>MinHash 函式可</strong>將原始文字轉換為<strong>二進位向量，</strong>用以近似計算文件之間的<a href="https://en.wikipedia.org/wiki/Jaccard_index">雅卡德相似度</a>。該函式透過文字分片與多種雜湊函式，產生固定長度的簽名向量，從而實現快速近重複檢測及大規模文件去重。</p>
<p>作為內建函式，MinHash 在 Milvus 內部執行，無需外部模型推論或預處理。您只需輸入原始文字，Milvus 便會自動產生 MinHash 簽名向量。</p>
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
<li><p>輸出欄位必須為<code translate="no">BINARY_VECTOR</code> ，且其維度須滿足<code translate="no">dim % 32 == 0</code> ，因為每個 MinHash 簽名向量皆為 32 位元哈希值。</p></li>
<li><p>二進位向量欄位的<code translate="no">dim</code> 必須等於<code translate="no">32 * num_hashes</code> 。若不符，將導致錯誤。</p></li>
<li><p>當使用<code translate="no">MINHASH_LSH</code> 索引與MinHash函數的輸出時，<code translate="no">mh_element_bit_width</code> 必須設定為<code translate="no">32</code> 。</p></li>
</ul>
<h2 id="How-MinHash-works" class="common-anchor-header">MinHash 的運作原理<button data-href="#How-MinHash-works" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>展開以查看運作原理</summary></p>
<p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>是一種局部敏感哈希技術，用於估算集合之間的<a href="https://en.wikipedia.org/wiki/Jaccard_index">雅卡德相似度</a>。在 Milvus 中，MinHash 函數遵循以下處理流程：您提供原始文字作為輸入，Milvus 則產生二進位向量作為輸出——所有中間步驟均由系統內部處理。</p>
<p>整體工作流程包含一個由文件導入與查詢處理共同使用的<strong>共用文字處理管線，</strong>隨後是針對儲存與檢索各階段的特定操作。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/minhash-function.png" alt="Iaqkbfeh8oqggsx6nsocfosondo" class="doc-image" id="iaqkbfeh8oqggsx6nsocfosondo" /> 
   <span>Iaqkbfeh8oqggsx6nsocfosondo</span>
  
 </span></p>
<h3 id="Shared-text-processing-pipeline" class="common-anchor-header">共用文字處理流程<button data-href="#Shared-text-processing-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>無論是文件導入還是查詢處理，都會將原始文字通過相同的四階段轉換：</p>
<ol>
<li><p><strong>文字分析</strong>：文字會由<a href="/docs/zh-hant/analyzer-overview.md">分析器</a>進行處理（當<code translate="no">token_level</code> 為<code translate="no">&quot;word&quot;</code> 時），或直接使用（當<code translate="no">token_level</code> 為<code translate="no">&quot;char&quot;</code> 時）。詞級分詞會套用在輸入欄位上配置的分析器，將文字分割為術語——例如，<code translate="no">&quot;milvus is vector db&quot;</code> 會變成<code translate="no">[&quot;milvus&quot;, &quot;is&quot;, &quot;vector&quot;, &quot;db&quot;]</code> 。</p></li>
<li><p><strong>分片</strong>（<strong>Shingling</strong>）：將詞元分割為大小為<code translate="no">shingle_size</code> 的重疊 n-gram（分片）。例如，在詞級使用 3-gram 時，詞元<code translate="no">[&quot;information&quot;, &quot;retrieval&quot;, &quot;is&quot;, &quot;a&quot;, &quot;field&quot;]</code> 會變成類似<code translate="no">[&quot;information retrieval is&quot;, &quot;retrieval is a&quot;, &quot;is a field&quot;]</code> 的分片。</p></li>
<li><p><strong>MinHash 簽名生成</strong>：對片段集套用多個雜湊函數（H1、H2、…、Hn，其中 n =<code translate="no">num_hashes</code> ）。 針對每個哈希函數，會從所有片段中選取最小的哈希值。這些最小值的集合即構成 MinHash 簽名——一種固定長度的表示形式，用以近似原始文件的雅卡德相似度。</p></li>
<li><p><strong>二進位向量編碼</strong>：每個簽名值皆為 32 位元雜湊值，而完整的簽名則被封裝進一個維度為<code translate="no">32 * num_hashes</code> 的<code translate="no">BINARY_VECTOR</code> 中。</p></li>
</ol>
<h3 id="Document-ingestion" class="common-anchor-header">文件導入<button data-href="#Document-ingestion" class="anchor-icon" translate="no">
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
    </button></h3><p>在插入過程中，由共享管線產生的二進位向量會儲存於<code translate="no">MINHASH_LSH</code> 索引中。該索引維護一個LSH（局部敏感雜湊）表，將相似的簽名分組至相同的桶位中，從而能在查詢時快速檢索候選項目。</p>
<h3 id="Query-processing" class="common-anchor-header">查詢處理<button data-href="#Query-processing" class="anchor-icon" translate="no">
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
    </button></h3><p>在搜尋過程中，查詢文字會經過相同的共用管線以產生二進位向量。此向量用於在<code translate="no">MINHASH_LSH</code> 索引中執行 LSH 查詢，從而快速識別出可能相似的候選對。若未啟用 Jaccard 精細化，Milvus 會返回未依預估 Jaccard 相似度進行排序的 LSH 候選結果。 當啟用雅卡德（Jaccard）精細化時，Milvus 會利用儲存的原始 MinHash 簽名，根據估算的雅卡德相似度對候選結果進行排序，並返回前 K 項結果。</p>
<p>由於這兩條路徑採用相同的轉換邏輯，內容高度重疊的兩份文件會產生相似的 MinHash 簽名。這使得該功能即使在文件詞彙順序、格式或細微措辭有所不同時，仍能有效找出近似重複文件。</p>
<p></details></p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>在使用 MinHash 函式之前，請規劃您的資料集架構，使其包含以下項目：</p>
<ul>
<li><p><strong>用於儲存原始內容的文字欄位</strong></p>
<p>您的資料集必須包含一個 `<code translate="no">VARCHAR</code> ` 欄位，用以儲存原始文字。此欄位將作為 MinHash 函式的輸入。</p></li>
<li><p><strong>文字欄位的分析器</strong>（當使用字詞層級分詞時）</p>
<p>若<code translate="no">token_level</code> 設定為<code translate="no">&quot;word&quot;</code> （預設值），則該文字欄位必須啟用分析器。分析器定義了在進行分片處理前，文字應如何進行分詞。預設情況下，Milvus 會使用<code translate="no">standard</code> 分析器。若要設定其他分析器，請參閱《<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md">根據您的使用情境選擇合適的分析器》</a>。</p></li>
<li><p><strong>用於 MinHash 輸出的二進位向量欄位</strong></p>
<p>您的集合必須包含一個<code translate="no">BINARY_VECTOR</code> 欄位，用以儲存由 MinHash 函式所產生的二進位向量。該維度的數值必須等於<code translate="no">32 * num_hashes</code> 。</p></li>
</ul>
<h2 id="Step-1-Create-a-collection-with-a-MinHash-function" class="common-anchor-header">步驟 1：建立具有 MinHash 函式的集合<button data-href="#Step-1-Create-a-collection-with-a-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h2><p>若要使用 MinHash 函式，請在建立集合時進行定義。該函式將成為集合模式的一部分，並會在資料插入和搜尋過程中自動套用。</p>
<h3 id="Define-schema-fields" class="common-anchor-header">定義模式欄位<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>您的集合模式必須包含至少三個欄位：</p>
<ul>
<li><p><strong>主欄位</strong>：用於唯一識別集合中的每個實體。</p></li>
<li><p><strong>文字欄位</strong>（<code translate="no">VARCHAR</code> ）：儲存原始文字文件。請設定<code translate="no">enable_analyzer=True</code> ，以便 Milvus 能處理文字以產生 MinHash 簽名。預設情況下，Milvus 會使用<code translate="no">standard</code> 分析器進行文字分析。若要設定其他分析器，請參閱《<a href="/docs/zh-hant/choose-the-right-analyzer-for-your-use-case.md">根據您的使用情境選擇合適的分析器</a>》。</p></li>
<li><p><strong>二進位向量欄位</strong>(<code translate="no">BINARY_VECTOR</code>)：儲存由 MinHash 函式自動生成的二進位向量。其維數必須等於<code translate="no">32 * num_hashes</code> 。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;document_content&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">8192</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-MinHash-function" class="common-anchor-header">定義 MinHash 函式<button data-href="#Define-the-MinHash-function" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash 函式會將分析過的文字轉換為二進位向量，用以近似文件之間的 Jaccard 相似度。</p>
<p>定義該函式並將其新增至您的資料結構：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">minhash_function = Function(
    name=<span class="hljs-string">&quot;minhash_function&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document_content&quot;</span>], <span class="hljs-comment"># Name of the VARCHAR field containing raw text</span>
    output_field_names=[<span class="hljs-string">&quot;binary_vector&quot;</span>], <span class="hljs-comment"># Name of the BINARY_VECTOR field for generated signatures</span>
    function_type=FunctionType.MINHASH,
    params={
        <span class="hljs-string">&quot;num_hashes&quot;</span>: <span class="hljs-number">256</span>, <span class="hljs-comment"># Number of hash functions; produces dim = 32 * 256 = 8192</span>
        <span class="hljs-string">&quot;shingle_size&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-comment"># N-gram size for shingling</span>
    }
)

schema.add_function(minhash_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>設定選項</strong></p>
<p>MinHash 函式的 `<code translate="no">params</code> ` 字典接受以下參數。所有參數名稱<strong>均不區分大小寫</strong>。</p>
<table>
   <tr>
     <th><p><strong>參數</strong></p></th>
     <th><p><strong>類型</strong></p></th>
     <th><p><strong>預設值</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">num_hashes</code></p></td>
     <td><p>int</p></td>
     <td><p>源自<code translate="no">dim / 32</code></p></td>
     <td><p>用於簽名生成的哈希函數數量。輸出二進位向量的維度等於<code translate="no">32 &ast; num_hashes</code> 。較高的數值可降低相似度估計的變異性，但會增加運算量。建議值：<code translate="no">256</code> （dim = 8192）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">shingle_size</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">3</code></p></td>
     <td><p>用於分段（shingling）的 N-gram 大小。詞級：通常為 1-3。字元級：通常為 2-6。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">hash_function</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"xxhash"</code></p></td>
     <td><p>要使用的雜湊函數。選項： </p><ul><li><p><code translate="no">"xxhash"</code> (快速)</p></li><li><p><code translate="no">"sha1"</code> (較慢，抗碰撞能力較高)。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">token_level</code></p></td>
     <td><p>str</p></td>
     <td><p><code translate="no">"word"</code></p></td>
     <td><p>分詞層級。選項：</p><ul><li><p><code translate="no">"word"</code>：使用該欄位的分析器進行分詞，然後套用 n-gram 分段法。</p></li><li><p><code translate="no">"char"</code> /<code translate="no">"character"</code>: 直接對原始字元應用 n-gram 分片（不使用分析器）。</p><p>詞級提供更強的語義和更高效率，但取決於特定語言的詞元化。字元級則不受語言限制，但會產生高維度的切片，且語義較弱。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">seed</code></p></td>
     <td><p>int</p></td>
     <td><p><code translate="no">1234</code></p></td>
     <td><p>用於初始化 MinHash 函式的隨機種子。</p></td>
   </tr>
</table>
<h3 id="Configure-the-index" class="common-anchor-header">配置索引<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>MinHash 二進位向量建議的索引類型為 `<code translate="no">MINHASH_LSH</code>`，度量類型則為 `<code translate="no">MHJACCARD</code>`。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: <span class="hljs-number">32</span>,
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>若搜尋將使用 Jaccard 精細化，請將<code translate="no">with_raw_data</code> 設定為<code translate="no">True</code> 。這需要原始的 MinHash 簽名，才能針對 LSH 查詢所返回的候選項計算預估的 Jaccard 相似度。</p>
<h3 id="Create-the-collection" class="common-anchor-header">建立集合<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>使用上述定義的模式和索引參數建立集合：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-documents" class="common-anchor-header">步驟 2：插入文件<button data-href="#Step-2-Insert-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>設定完資料集後，請插入文字資料。您只需提供原始文字 — MinHash 函式會自動為每個文件產生二進位向量。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.insert(
    <span class="hljs-string">&quot;dedup_collection&quot;</span>,
    [
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study that helps users find relevant information in large datasets&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>},
        {<span class="hljs-string">&quot;document_content&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of research helping users search for relevant information in large datasets&quot;</span>},
    ],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-MinHash" class="common-anchor-header">步驟 3：使用 MinHash 進行搜尋<button data-href="#Step-3-Search-with-MinHash" class="anchor-icon" translate="no">
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
    </button></h2><p>資料插入完成後，透過提供原始文字查詢來搜尋近似重複的文件。Milvus 會自動將每個查詢轉換為 MinHash 二進位向量。啟用 Jaccard 精細化功能，即可根據估算的 Jaccard 相似度對 LSH 候選結果進行排序。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">3</span>,
    },
}

results = client.search(
    collection_name=<span class="hljs-string">&quot;dedup_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;information retrieval is a research field focused on helping users find relevant data in large collections&quot;</span>],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document_content&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;ID: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, Distance: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document_content&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>將 `<code translate="no">mh_search_with_jaccard</code> ` 設定為 `<code translate="no">True</code> ` 以啟用 Jaccard 精細化。`<code translate="no">refine_k</code> ` 控制用於精細化的候選集容量。Milvus 預設使用 `<code translate="no">max(refine_k, limit)</code> ` 作為容量，但若 LSH 查詢返回的匹配結果較少，則可能僅對較少候選項目進行精細化。增加 `<code translate="no">refine_k</code> ` 可提升結果品質，但會增加運算成本。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>：使用 BM25 進行詞彙相關性排序，而非近似重複檢測。</p></li>
<li><p><a href="/docs/zh-hant/analyzer-overview.md">分析器概述</a>：為文字分詞配置自訂分析器。</p></li>
<li><p><a href="/docs/zh-hant/minhash-lsh.md">MINHASH_LSH 索引</a>：瞭解如何調整 LSH 參數以優化召回率與效能。</p></li>
</ul>
