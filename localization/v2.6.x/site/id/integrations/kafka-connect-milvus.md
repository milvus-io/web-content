---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka terintegrasi dengan Milvus dan Zilliz Cloud untuk melakukan
  streaming data vektor. Pelajari cara menggunakan konektor Kafka-Milvus untuk
  membangun pipeline waktu nyata untuk pencarian semantik, sistem rekomendasi,
  dan analisis berbasis AI.
title: >-
  Menghubungkan Apache Kafka® dengan Milvus/Zilliz Cloud untuk Konsumsi Data
  Vektor Secara Real-Time
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Menghubungkan Apache Kafka® dengan Milvus/Zilliz Cloud untuk Konsumsi Data Vektor Secara Real-Time<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>Dalam panduan awal yang cepat ini, kami menunjukkan cara menyiapkan kafka open source dan Zilliz Cloud untuk menelan data vektor.</p>
<p>Tutorial ini menjelaskan cara menggunakan Apache Kafka® untuk mengalirkan dan memasukkan data vektor ke dalam basis data vektor Milvus dan Zilliz Cloud (Milvus yang dikelola secara penuh), sehingga memungkinkan aplikasi-aplikasi real-time tingkat lanjut seperti pencarian semantik, sistem rekomendasi, dan analisis yang didukung oleh AI.</p>
<p>Apache Kafka adalah platform streaming acara terdistribusi yang dirancang untuk saluran pipa dengan throughput tinggi dan latensi rendah. Platform ini banyak digunakan untuk mengumpulkan, menyimpan, dan memproses aliran data waktu nyata dari sumber-sumber seperti basis data, perangkat IoT, aplikasi seluler, dan layanan cloud. Kemampuan Kafka untuk menangani data dalam jumlah besar menjadikannya sumber data penting bagi database vektor seperti Milvus atau Zilliz Cloud.</p>
<p>Sebagai contoh, Kafka dapat menangkap aliran data waktu nyata-seperti interaksi pengguna, pembacaan sensor, bersama dengan penyematannya dari model pembelajaran mesin-dan mempublikasikan aliran data ini secara langsung ke Milvus atau Zilliz Cloud. Setelah berada di basis data vektor, data ini dapat diindeks, dicari, dan dianalisis secara efisien.</p>
<p>Integrasi Kafka dengan Milvus dan Zilliz Cloud menyediakan cara yang mulus untuk membangun pipeline yang kuat untuk alur kerja data yang tidak terstruktur. Konektor ini berfungsi untuk penerapan Kafka sumber terbuka dan layanan yang di-host seperti <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> dan <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>Dalam tutorial ini kami menggunakan Zilliz Cloud sebagai demonstrasi:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Langkah 1: Unduh plugin kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Selesaikan langkah-langkah berikut untuk mengunduh plugin kafka-connect-milvus.</p>
<ol>
<li>unduh file zip plugin terbaru <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> dari <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">sini</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Langkah 2: Unduh Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li>Unduh kafka terbaru dari <a href="https://kafka.apache.org/downloads">sini</a>.</li>
<li>Buka zip file yang telah diunduh dan buka direktori kafka.</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">tar -xzf kafka_2.13-3.6.1.tgz</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> kafka_2.13-3.6.1</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">LANGKAH 3: Memulai Lingkungan Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
<p>CATATAN: Lingkungan lokal Anda harus sudah terinstal Java 8+.</p>
</div>
<p>Jalankan perintah berikut untuk memulai semua layanan dalam urutan yang benar:</p>
<ol>
<li><p>Mulai layanan ZooKeeper</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/zookeeper-server-start.sh config/zookeeper.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mulai layanan broker Kafka</p>
<p>Buka sesi terminal lain dan jalankan:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-server-start.sh config/server.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Setelah semua layanan berhasil dijalankan, Anda akan memiliki lingkungan dasar Kafka yang berjalan dan siap digunakan.</p>
<ul>
<li>periksa panduan memulai cepat resmi dari kafka untuk detailnya: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Langkah 4: Konfigurasikan Kafka dan Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan Anda telah menyiapkan Kafka dan Zilliz Cloud dan dikonfigurasi dengan benar.</p>
<ol>
<li><p>Jika Anda belum memiliki topik di Kafka, buatlah sebuah topik (contoh: <code translate="no">topic_0</code>) di Kafka.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Jika Anda belum memiliki koleksi di Zilliz Cloud, buatlah koleksi dengan bidang vektor (dalam contoh ini vektornya adalah <code translate="no">dimension=8</code>). Anda dapat menggunakan contoh skema berikut di Zilliz Cloud:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Catatan: Pastikan skema di kedua sisi cocok satu sama lain. Dalam skema tersebut, terdapat tepat satu bidang vektor. Nama setiap bidang di kedua sisi sama persis.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Langkah 5: Muatkan plugin kafka-connect-milvus ke Kafka Instance<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>unzip berkas <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> yang Anda unduh pada Langkah 1.</p></li>
<li><p>salin direktori <code translate="no">zilliz-kafka-connect-milvus</code> ke direktori <code translate="no">libs</code> pada instalasi Kafka Anda.</p></li>
<li><p>memodifikasi berkas <code translate="no">connect-standalone.properties</code> di direktori <code translate="no">config</code> pada instalasi Kafka Anda.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=false
value.converter.schemas.enable=false
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
</code></pre></li>
<li><p>buat dan konfigurasikan berkas <code translate="no">milvus-sink-connector.properties</code> di direktori <code translate="no">config</code> pada instalasi Kafka Anda.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.class=com.milvus.io.kafka.MilvusSinkConnector
public.endpoint=https://&lt;public.endpoint&gt;:port
token=*****************************************
collection.name=topic_0
topics=topic_0
</code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Langkah 6: Luncurkan konektor<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>Jalankan konektor dengan berkas konfigurasi sebelumnya</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Coba buat pesan ke topik Kafka yang baru saja Anda buat di Kafka</p>
<pre><code translate="no" class="language-shell">bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
<span class="hljs-meta prompt_">&gt;</span><span class="language-bash">{<span class="hljs-string">&quot;id&quot;</span>: 0, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Periksa apakah entitas telah dimasukkan ke dalam koleksi di Zilliz Cloud. Berikut adalah tampilannya di Zilliz Cloud jika penyisipan berhasil:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Dukungan</h3><p>Jika Anda memerlukan bantuan atau memiliki pertanyaan tentang Kafka Connect Milvus Connector, jangan ragu untuk menghubungi pengelola konektor: <strong>Email:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
