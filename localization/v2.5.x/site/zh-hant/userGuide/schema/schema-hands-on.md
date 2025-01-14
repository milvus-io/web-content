---
id: schema-hands-on.md
title: 模式設計實作
summary: >-
  Milvus
  支援透過集合模式來定義資料模型。集合可組織文字和影像等非結構化資料，以及它們的向量表示，包括用於語意搜尋的各種精確度的密集向量和稀疏向量。此外，Milvus
  還支援儲存和過濾稱為「標量」的非向量資料類型。Scalar 類型包括
  BOOL、INT8/16/32/64、FLOAT/DOUBLE、VARCHAR、JSON 和 Array。
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">模式設計實作<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>資訊檢索 (IR) 系統，也稱為搜尋，對於各種 AI 應用程式來說是不可或缺的，例如檢索增生 (RAG)、圖像搜尋和產品推薦。開發 IR 系統的第一步是設計資料模型，這包括分析業務需求、決定如何組織資訊，以及為資料編制索引，使其在語意上可被搜尋。</p>
<p>Milvus 支援透過集合模式來定義資料模型。集合可組織文本和圖像等非結構化資料，以及它們的向量表示，包括用於語義搜索的各種精確度的密集和稀疏向量。此外，Milvus 還支援儲存和過濾稱為「標量」的非向量資料類型。Scalar 類型包括 BOOL、INT8/16/32/64、FLOAT/DOUBLE、VARCHAR、JSON 和 Array。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>為搜尋新聞文章而設計的資料模式範例</span> </span></p>
<p>搜尋系統的資料模式設計包括分析業務需求，並將資訊抽象為模式表達的資料模式。舉例來說，若要搜尋一段文字，就必須透過「嵌入」（embedding）將字面上的字串轉換成向量，使向量搜尋成為「索引」。除了這個基本要求之外，可能還需要儲存其他屬性，例如出版時間戳和作者。這些元資料允許透過篩選來精細語意搜尋，僅傳回在特定日期之後或由特定作者出版的文字。它們也可能需要與主要文字一起檢索，以便在應用程式中呈現搜尋結果。為了組織這些文字片段，應該為每個片段指定一個唯一的識別碼，以整數或字串表示。這些元素對於達成複雜的搜尋邏輯非常重要。</p>
<p>設計良好的模式非常重要，因為它可以抽象出資料模型，並決定是否可以透過搜尋來達成業務目標。此外，由於插入到資料集中的每一行資料都需要遵循模式，因此對維持資料一致性和長期品質大有幫助。從技術角度來看，定義良好的模式可帶來組織良好的列資料儲存和更乾淨的索引結構，進而提升搜尋效能。</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">舉例說明：新聞搜尋<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>假設我們想要為新聞網站建立搜尋功能，而且我們有一個包含文字、縮圖和其他元資料的新聞資料庫。首先，我們需要分析如何利用這些資料來支援搜尋的商業需求。假設需求是根據縮圖和內容摘要擷取新聞，並將作者資訊和發佈時間等元資料作為過濾搜尋結果的條件。這些需求可以進一步細分為</p>
<ul>
<li><p>若要透過文字搜尋圖片，我們可以透過多模態嵌入模型將圖片嵌入向量，該模型可以將文字和圖片資料映射到相同的潛在空間中。</p></li>
<li><p>透過文字嵌入模型，將文章的摘要文字嵌入向量中。</p></li>
<li><p>若要依據發表時間進行篩選，日期會儲存在標量欄位中，並且需要為標量欄位建立索引，以進行有效的篩選。其他更複雜的資料結構，例如 JSON，也可以儲存在標量中，並對其內容執行篩選搜尋 (JSON 索引是即將推出的功能)。</p></li>
<li><p>為了擷取圖片縮圖的位元組，並將其呈現在搜尋結果頁面上，圖片的 url 也會被儲存。同樣地，摘要文字和標題也是如此。(如果需要，我們也可以將原始文字和圖片檔案資料儲存為標量欄位）。</p></li>
<li><p>為了改善摘要文字的搜尋結果，我們設計了一種混合搜尋方法。對於其中一種檢索路徑，我們使用正規的嵌入模型來從文字產生密集向量，例如 OpenAI 的<code translate="no">text-embedding-3-large</code> 或開放原始碼的<code translate="no">bge-large-en-v1.5</code> 。這些模型善於表現文字的整體語意。另一種途徑是使用稀疏嵌入模型，例如 BM25 或 SPLADE 來產生稀疏向量，類似全文檢索，善於掌握文字中的細節和個別概念。由於 Milvus 的多向量功能，它支援在同一資料收集中使用兩者。對多個向量的搜尋可以在單一<code translate="no">hybrid_search()</code> 作業中完成。</p></li>
<li><p>最後，我們還需要一個 ID 欄位來識別每個個別的新聞頁面，在 Milvus 的術語中正式稱為「實體」。這個欄位會被用來做為主索引鍵 (或簡稱 "pk")。</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">欄位名稱</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (主鍵)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">標題</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">作者資訊</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">出版資訊</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">image_url</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">圖片向量</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">摘要</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">摘要密度向量</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">摘要稀疏向量</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">類型</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">稀疏浮點向量</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">需要索引</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (即將支援)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">如何實作範例模式<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">建立模式<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>首先，我們創建一個 Milvus 客戶端實例，用來連接 Milvus 伺服器並管理集合和資料。</p>
<p>要建立模式，我們使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>來建立模式物件，並使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>來新增欄位到模式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>您可能會注意到<code translate="no">MilvusClient</code> 中的參數<code translate="no">uri</code> ，它是用來連線到 Milvus 伺服器的。您可以如下設定這些參數。</p>
<ul>
<li><p>如果您只需要一個本機向量資料庫來進行小規模的資料或原型製作，將 uri 設定為一個本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</p></li>
<li><p>如果您有大規模的資料，例如超過一百萬個向量，您可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器位址和連接埠作為您的 uri，例如<code translate="no">http://localhost:19530</code> 。如果您啟用 Milvus 的驗證功能，請使用「&lt;your_username&gt;:&lt;your_password&gt;」作為令牌，否則請勿設定令牌。</p></li>
<li><p>如果您使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，它們對應於 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 API key</a>。</p></li>
</ul>
<p>至於<code translate="no">auto_id</code> 在<code translate="no">MilvusClient.create_schema</code> ，AutoID 是主要欄位的屬性，決定是否啟用主要欄位的自動遞增。  由於我們設定欄位<code translate="no">article_id</code> 為主索引鍵，並希望手動新增文章 id，因此我們設定<code translate="no">auto_id</code> False 來停用此功能。</p>
<p>將所有欄位加入模式物件後，我們的模式物件與上表中的項目一致。</p>
<h2 id="Define-Index​" class="common-anchor-header">定義索引<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>使用各種欄位定義模式之後，包括圖片和摘要資料的元資料和向量欄位，下一步就是準備索引參數。索引對於最佳化向量的搜尋和擷取、確保有效率的查詢效能至關重要。在下一節中，我們將為集合中指定的向量和標量欄位定義索引參數。</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>一旦設定並套用索引參數，Milvus 就能優化處理向量和標量資料的複雜查詢。此索引可增強資料集中類似性搜尋的效能與精確度，讓我們能根據影像向量與摘要向量有效率地檢索文章。透過利用 <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a>對於密集向量、 <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a>對稀疏向量和 <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a>for 標量，Milvus 可以快速識別並傳回最相關的結果，大幅改善資料擷取過程的整體使用者經驗與效能。</p>
<p>索引和指標有許多種類。關於它們的更多資訊，您可以參考<a href="https://milvus.io/docs/overview.md#Index-types">Milvus 索引類型</a>和<a href="https://milvus.io/docs/glossary.md#Metric-type">Milvus 度量類型</a>。</p>
<h2 id="Create-Collection​" class="common-anchor-header">建立資料庫<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>定義模式和索引後，我們使用這些參數建立一個「集合」。對 Milvus 來說，集合就像關係資料庫的資料表。</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>我們可以透過描述集合來驗證集合是否已成功建立。</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">其他注意事項<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">載入索引<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中建立資料集時，您可以選擇立即載入索引，或是延遲到大量擷取某些資料之後。通常情況下，您不需要對此做出明確的選擇，因為上面的示例顯示，索引會在集合創建後立即自動為任何擷取的資料建立。這樣就可以立即搜尋擷取的資料。但是，如果您在建立資料集後有大量的大量插入，並且在某一點之前不需要搜尋任何資料，您可以在建立資料集時省略 index_params 來延遲索引建立，並且在擷取所有資料後，明確呼叫 load 來建立索引。此方法對於在大型集合上建立索引更有效率，但在呼叫 load() 之前無法進行任何搜尋。</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">如何為多租戶定義資料模型<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>多租戶的概念常用於單一軟體應用程式或服務需要服務多個獨立使用者或組織的情況，每個使用者或組織都有自己獨立的環境。這種情況常見於雲端運算、SaaS (軟體即服務) 應用程式和資料庫系統。舉例來說，雲端儲存服務可能會利用多租用權，讓不同的公司在共用相同底層基礎架構的同時，分別儲存和管理他們的資料。此方法可最大化資源利用率和效率，同時確保每個租戶的資料安全性和隱私。</p>
<p>區分租戶的最簡單方法就是將他們的資料和資源彼此隔離。每個租戶可以獨佔存取特定資源，或與其他租戶共享資源，以管理 Milvus 實體，例如資料庫、集合和分割。有特定的方法與這些實體結盟，以實現 Milvus 多重租戶。您可以參考<a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">Milvus 多重租用頁面以</a>獲得更多資訊。</p>
