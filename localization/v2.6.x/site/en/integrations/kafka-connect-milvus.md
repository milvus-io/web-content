---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka is integrated with Milvus and Zilliz Cloud to stream vector data.
  Learn how to use Kafka-Milvus connector to build real-time pipelines for
  semantic search, recommendation systems, and AI-driven analytics.
title: >-
  Connect Apache Kafka® with Milvus/Zilliz Cloud for Real-Time Vector Data
  Ingestion
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Connect Apache Kafka® with Milvus/Zilliz Cloud for Real-Time Vector Data Ingestion<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>In this quick start guide we show how to setup open source kafka and Zilliz Cloud to ingest vector data.</p>
<p>This tutorial explains how to use Apache Kafka® to stream and ingest vector data into Milvus vector database and Zilliz Cloud (fully-managed Milvus), enabling advanced real-time applications such as semantic search, recommendation systems, and AI-powered analytics.</p>
<p>Apache Kafka is a distributed event streaming platform designed for high-throughput, low-latency pipelines. It is widely used to collect, store, and process real-time data streams from sources like databases, IoT devices, mobile apps, and cloud services. Kafka’s ability to handle large volumes of data makes it an important data source of vector databases like Milvus or Zilliz Cloud.</p>
<p>For example, Kafka can capture real-time data streams—such as user interactions, sensor readings, together with their embeddings from machine learning models—and publish these streams directly to Milvus or Zilliz Cloud. Once in the vector database, this data can be indexed, searched, and analyzed efficiently.</p>
<p>The Kafka integration with Milvus and Zilliz Cloud provides a seamless way to build powerful pipelines for unstructured data workflows. The connector works for both open-source Kafka deployment and hosted services such as <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> and <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>In this tutorial we use Zilliz Cloud as a demostration:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Step 1: Download the kafka-connect-milvus plugin<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Complete the following steps to download the kafka-connect-milvus plugin.</p>
<ol>
<li>download the latest plugin zip file <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> from <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">here</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Step 2: Download Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li>Download the latest kafka from <a href="https://kafka.apache.org/downloads">here</a>.</li>
<li>Unzip the downloaded file and go to the kafka directory.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf kafka_2.13-3.6.1.tgz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kafka_2.13-3.6.1</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">STEP 3: Start the Kafka Environment<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
<p>NOTE: Your local environment must have Java 8+ installed.</p>
</div>
<p>Run the following commands in order to start all services in the correct order:</p>
<ol>
<li><p>Start the ZooKeeper service</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/zookeeper-server-start.sh config/zookeeper.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Start the Kafka broker service</p>
<p>Open another terminal session and run:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-server-start.sh config/server.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Once all services have successfully launched, you will have a basic Kafka environment running and ready to use.</p>
<ul>
<li>check the official quick start guide form kafka for details: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Step 4: Configure Kafka and Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensure you have Kafka and Zilliz Cloud setup and properly configured.</p>
<ol>
<li><p>If you don’t already have a topic in Kafka, create a topic (e.g. <code translate="no">topic_0</code>) in Kafka.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>If you don’t already have a collection in Zilliz Cloud, create a collection with a vector field (in this example the vector has <code translate="no">dimension=8</code>). You can use the following example schema on Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Note: Make sure the schema on both sides match each other. In the schema, there is exactly one vector field. The names of each field on both sides are exactly the same.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Step 5: Load the kafka-connect-milvus plugin to Kafka Instance<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>unzip the <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> file you downloaded in Step 1.</p></li>
<li><p>copy the <code translate="no">zilliz-kafka-connect-milvus</code> directories to the <code translate="no">libs</code> directory of your Kafka installation.</p></li>
<li><p>modify the <code translate="no">connect-standalone.properties</code> file in the <code translate="no">config</code> directory of your Kafka installation.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=false
value.converter.schemas.enable=false
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
</code></pre></li>
<li><p>create and configure a <code translate="no">milvus-sink-connector.properties</code> file in the <code translate="no">config</code> directory of your Kafka installation.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.class=com.milvus.io.kafka.MilvusSinkConnector
public.endpoint=https://&lt;public.endpoint&gt;:port
token=*****************************************
collection.name=topic_0
topics=topic_0
</code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Step 6: Launch the connector<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>Start the connector with the previous configuration file</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Try produce a message to the Kafka topic you just created in Kafka</p>
<pre><code translate="no" class="language-shell">bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">{<span class="hljs-string">&quot;id&quot;</span>: 0, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Check if the entity has been inserted into the collection in Zilliz Cloud. Here is what it looks like on Zilliz Cloud if the insertion succeeds:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Support</h3><p>If you require any assistance or have questions regarding the Kafka Connect Milvus Connector, please feel free to reach out to the maintainer of the connector: <strong>Email:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
