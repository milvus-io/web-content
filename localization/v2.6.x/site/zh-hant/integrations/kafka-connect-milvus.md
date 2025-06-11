---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka 與 Milvus 和 Zilliz Cloud 整合以串流向量資料。瞭解如何使用 Kafka-Milvus
  連結器來建立語意搜尋、推薦系統和 AI 驅動分析的即時管道。
title: 連接 Apache Kafka® 與 Milvus/Zilliz Cloud 以進行即時向量資料擷取
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">連接 Apache Kafka® 與 Milvus/Zilliz Cloud 以進行即時向量資料擷取<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>在這份快速入門指南中，我們將介紹如何設定開放原始碼 kafka 和 Zilliz Cloud 來擷取向量資料。</p>
<p>本教學說明如何使用 Apache Kafka® 將向量資料串流並擷取至 Milvus 向量資料庫和 Zilliz Cloud (完全由 Milvus 管理)，以實現先進的即時應用程式，例如語意搜尋、推薦系統和 AI 驅動的分析。</p>
<p>Apache Kafka 是專為高吞吐量、低延遲管道設計的分散式事件串流平台。它被廣泛用於收集、儲存和處理來自資料庫、物聯網裝置、行動應用程式和雲端服務等來源的即時資料流。Kafka 處理大量資料的能力使其成為 Milvus 或 Zilliz Cloud 等向量資料庫的重要資料來源。</p>
<p>舉例來說，Kafka 可以擷取即時資料流，例如使用者互動、感測器讀數，以及來自機器學習模型的嵌入資料，並直接將這些資料流發佈到 Milvus 或 Zilliz Cloud。一旦進入向量資料庫，這些資料就能被有效率地索引、搜尋和分析。</p>
<p>Kafka 與 Milvus 和 Zilliz Cloud 的整合提供了一種無縫的方式，為非結構化資料工作流程建立強大的管道。該連接器既適用於開源 Kafka 部署，也適用於<a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a>和<a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a> 等託管服務。</p>
<p>在本教程中，我們使用 Zilliz Cloud 作為示範：</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">步驟 1：下載 kafka-connect-milvus 外掛程式<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>完成以下步驟下載 kafka-connect-milvus 外掛。</p>
<ol>
<li>從<a href="https://github.com/zilliztech/kafka-connect-milvus/releases">這裡</a>下載最新的外掛壓縮檔<code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> 。</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">步驟 2：下載 Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>從<a href="https://kafka.apache.org/downloads">這裡</a>下載最新的 kafka。</li>
<li>解壓縮下載的檔案，然後前往 kafka 目錄。</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf kafka_2.13-3.6.1.tgz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kafka_2.13-3.6.1</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">第 3 步：啟動 Kafka 環境<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>注意：您的本機環境必須安裝 Java 8 以上。</p>
</div>
<p>執行下列指令，以便以正確的順序啟動所有服務：</p>
<ol>
<li><p>啟動 ZooKeeper 服務</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/zookeeper-server-start.sh config/zookeeper.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>啟動 Kafka 代理服務</p>
<p>開啟另一個終端會話並執行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-server-start.sh config/server.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>當所有的服務都成功啟動後，您就可以擁有一個基本的 Kafka 環境，隨時可以使用。</p>
<ul>
<li>詳情請查看官方快速入門指南：https://kafka.apache.org/quickstart。</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">步驟 4：配置 Kafka 和 Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>確保您已經設定好 Kafka 和 Zilliz Cloud 並正確配置。</p>
<ol>
<li><p>如果您尚未在 Kafka 中建立主題，請在 Kafka 中建立主題 (例如<code translate="no">topic_0</code>)。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果您尚未在 Zilliz Cloud 中建立一個集合，請建立一個具有向量欄位的集合 (在本範例中，向量有<code translate="no">dimension=8</code>)。您可以在 Zilliz Cloud 上使用以下示例模式：</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>注意：請確保雙方的模式相互匹配。在模式中，正好有一個向量欄位。雙方每個欄位的名稱完全相同。</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">步驟 5：載入 kafka-connect-milvus 外掛程式到 Kafka Instance<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>解壓縮您在步驟 1 下載的<code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> 檔案。</p></li>
<li><p>複製<code translate="no">zilliz-kafka-connect-milvus</code> 目錄到您 Kafka 安裝的<code translate="no">libs</code> 目錄。</p></li>
<li><p>修改您 Kafka 安裝的<code translate="no">config</code> 目錄中的<code translate="no">connect-standalone.properties</code> 檔案。</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=false
value.converter.schemas.enable=false
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
</code></pre></li>
<li><p>在您 Kafka 安裝的<code translate="no">config</code> 目錄中建立並配置<code translate="no">milvus-sink-connector.properties</code> 檔案。</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.class=com.milvus.io.kafka.MilvusSinkConnector
public.endpoint=https://&lt;public.endpoint&gt;:port
token=*****************************************
collection.name=topic_0
topics=topic_0
</code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">步驟 6：啟動連接器<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>使用之前的配置文件啟動連接器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>嘗試製作一個訊息到您剛在 Kafka 中建立的 Kafka 主題</p>
<pre><code translate="no" class="language-shell">bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">{<span class="hljs-string">&quot;id&quot;</span>: 0, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>檢查該實體是否已插入到 Zilliz Cloud 的集合中。下面是插入成功後在 Zilliz Cloud 上的樣子：</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">支援</h3><p>如果您需要任何協助或有任何關於 Kafka Connect Milvus Connector 的問題，請隨時聯繫 Connector 的維護者：<strong>電子郵件:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
