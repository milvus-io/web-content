---
id: best-practices-for-array-of-structs.md
title: Desain Model Data dengan Array StrukturCompatible with Milvus 2.6.4+
summary: >-
  Aplikasi AI modern, terutama di Internet of Things (IoT) dan mengemudi secara
  otonom, biasanya menalar peristiwa yang kaya dan terstruktur: pembacaan sensor
  dengan stempel waktu dan penyematan vektor, log diagnostik dengan kode
  kesalahan dan cuplikan audio, atau segmen perjalanan dengan lokasi, kecepatan,
  dan konteks pemandangan. Semua ini memerlukan database untuk mendukung
  konsumsi dan pencarian data bersarang.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">Desain Model Data dengan Array Struktur<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>Aplikasi AI modern, terutama di Internet of Things (IoT) dan pengemudian otonom, biasanya menalar peristiwa yang kaya dan terstruktur: pembacaan sensor dengan stempel waktu dan penyematan vektor, log diagnostik dengan kode kesalahan dan cuplikan audio, atau segmen perjalanan dengan lokasi, kecepatan, dan konteks pemandangan. Semua ini membutuhkan database untuk mendukung konsumsi dan pencarian data bersarang.</p>
<p>Alih-alih meminta pengguna untuk mengubah peristiwa struktural atomik mereka menjadi model data datar, Milvus memperkenalkan Array of Structs, di mana setiap Struct dalam larik dapat menyimpan skalar dan vektor, menjaga integritas semantik dan memungkinkan pemfilteran bertingkat yang kuat dan pencarian hibrida.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">Mengapa Array of Structs<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>Aplikasi AI modern, mulai dari pengemudian otonom hingga pencarian multimodal, semakin mengandalkan data yang bersarang dan heterogen. Model data datar tradisional kesulitan untuk merepresentasikan hubungan yang kompleks seperti<strong>"satu dokumen dengan banyak potongan yang dianotasi</strong>" atau<strong>"satu adegan mengemudi dengan beberapa manuver yang diamati</strong>". Di sinilah tipe data Array of Structs di Milvus bersinar.</p>
<p>Array of Structs memungkinkan Anda untuk menyimpan sekumpulan elemen terstruktur yang terurut, di mana setiap Struct berisi kombinasi bidang skalar dan penyematan vektornya sendiri. Ini membuatnya ideal untuk:</p>
<ul>
<li><p><strong>Data hirarkis</strong>: Entitas induk dengan beberapa catatan anak, seperti buku dengan banyak potongan teks, atau video dengan banyak bingkai beranotasi.</p></li>
<li><p><strong>Penyematan multimodal</strong>: Setiap Struct dapat menampung beberapa vektor, seperti penyematan teks plus penyematan gambar, di samping metadata.</p></li>
<li><p><strong>Data temporal atau sekuensial</strong>: Struktur dalam bidang Array secara alami mewakili deret waktu atau peristiwa langkah demi langkah.</p></li>
</ul>
<p>Tidak seperti solusi tradisional yang menyimpan gumpalan JSON atau membagi data di beberapa koleksi, Array of Structs menyediakan penegakan skema asli, pengindeksan vektor, dan penyimpanan yang efisien di dalam Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">Panduan desain skema<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>Selain semua panduan yang dibahas di <a href="/docs/id/schema-hands-on.md">Desain Model Data untuk Pencarian</a>, Anda juga harus mempertimbangkan hal-hal berikut ini sebelum mulai menggunakan Array of Structs dalam desain model data Anda.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">Tentukan skema Struktur<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum menambahkan bidang Array ke koleksi Anda, tentukan skema Struktur bagian dalam. Setiap field dalam struktur harus diketik secara eksplisit, skalar<strong>(VARCHAR</strong>, <strong>INT</strong>, <strong>BOOLEAN</strong>, dll.) atau vektor<strong>(FLOAT_VECTOR</strong>).</p>
<p>Anda disarankan untuk menjaga skema Struct tetap ramping dengan hanya menyertakan bidang yang akan Anda gunakan untuk pengambilan atau tampilan. Hindari membengkaknya metadata yang tidak terpakai.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">Tetapkan kapasitas maksimum dengan bijaksana<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>Setiap bidang Array memiliki atribut yang menentukan jumlah maksimum elemen yang dapat ditampung oleh bidang Array untuk setiap entitas. Tetapkan ini berdasarkan batas atas kasus penggunaan Anda. Misalnya, ada 1.000 potongan teks per dokumen, atau 100 manuver per adegan mengemudi.</p>
<p>Nilai yang terlalu tinggi akan memboroskan memori, dan Anda harus melakukan beberapa perhitungan untuk menentukan jumlah maksimum Structs dalam bidang Array.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">Mengindeks bidang vektor di Structs<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>Pengindeksan wajib dilakukan untuk bidang vektor, termasuk bidang vektor dalam koleksi dan bidang vektor yang didefinisikan dalam Struct. Untuk bidang vektor dalam sebuah Struct, Anda harus menggunakan <code translate="no">EMB_LIST_HNSW</code> sebagai tipe indeks dan <code translate="no">MAX_SIM</code> sebagai tipe metrik.</p>
<p>Untuk detail tentang semua batasan yang berlaku, lihat <a href="/docs/id/array-of-structs.md#Limits">batasan</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">Contoh dunia nyata: Memodelkan kumpulan data CoVLA untuk pengemudian otonom<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>Kumpulan data Comprehensive Vision-Language-Action (CoVLA), yang diperkenalkan oleh <a href="https://tur.ing/posts/s1QUA1uh">Turing Motors</a> dan diterima pada Konferensi Musim Dingin tentang Aplikasi Visi Komputer (WACV) 2025, memberikan dasar yang kaya untuk melatih dan mengevaluasi model Visi-Bahasa-Tindakan (VLA) dalam pengemudian otonom. Setiap titik data, yang biasanya berupa klip video, tidak hanya berisi input visual mentah tetapi juga teks terstruktur yang menjelaskan:</p>
<ul>
<li><p><strong>Perilaku kendaraan ego</strong> (misalnya, "Belok kiri sambil mengalah pada lalu lintas yang datang"),</p></li>
<li><p><strong>Objek yang terdeteksi</strong> hadir (misalnya, kendaraan terdepan, pejalan kaki, lampu lalu lintas), dan</p></li>
<li><p><strong>Keterangan</strong> tingkat bingkai dari pemandangan.</p></li>
</ul>
<p>Sifat hirarkis dan multi-modal ini membuatnya menjadi kandidat yang ideal untuk fitur Array of Structs. Untuk informasi lebih lanjut mengenai dataset CoVLA, lihat <a href="https://turingmotors.github.io/covla-ad/">Situs Web Dataset CoVLA</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">Langkah 1: Petakan dataset ke dalam skema koleksi<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Dataset CoVLA adalah dataset penggerak multimodal berskala besar yang terdiri dari 10.000 klip video, dengan total lebih dari 80 jam rekaman. Dataset ini mengambil sampel frame dengan kecepatan 20Hz dan memberi keterangan pada setiap frame dengan keterangan bahasa alami yang mendetail bersama dengan informasi mengenai status kendaraan dan koordinat objek yang terdeteksi.</p>
<p>Struktur kumpulan data adalah sebagai berikut:</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat melihat bahwa struktur dataset CoVLA sangat hirarkis, membagi data yang dikumpulkan ke dalam beberapa file <code translate="no">.jsonl</code>, bersama dengan klip video dalam format <code translate="no">.mp4</code>.</p>
<p>Di Milvus, Anda dapat menggunakan bidang JSON atau bidang Array-of-Structs untuk membuat struktur bersarang di dalam skema koleksi. Ketika penyematan vektor merupakan bagian dari format bersarang, hanya bidang Array-of-Structs yang didukung. Namun, sebuah Struktur di dalam Array tidak dapat berisi struktur bersarang lebih lanjut. Untuk menyimpan kumpulan data CoVLA dengan tetap mempertahankan hubungan yang penting, Anda perlu menghapus hierarki yang tidak perlu dan meratakan data agar sesuai dengan skema koleksi Milvus.</p>
<p>Diagram di bawah ini mengilustrasikan bagaimana kita dapat memodelkan dataset ini menggunakan skema yang diilustrasikan dalam skema berikut:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>Model Dataset</span> </span></p>
<p>Diagram di atas mengilustrasikan struktur klip video, yang terdiri dari bidang-bidang berikut:</p>
<ul>
<li><p><code translate="no">video_id</code> berfungsi sebagai kunci utama, yang menerima bilangan bulat bertipe INT64.</p></li>
<li><p><code translate="no">states</code> adalah badan JSON mentah yang berisi status kendaraan ego di setiap bingkai video saat ini.</p></li>
<li><p><code translate="no">captions</code> adalah Array Struktur dengan setiap Struktur memiliki bidang berikut:</p>
<ul>
<li><p><code translate="no">frame_id</code> mengidentifikasi bingkai tertentu dalam video saat ini.</p></li>
<li><p><code translate="no">plain_caption</code> adalah deskripsi frame saat ini tanpa lingkungan sekitar, seperti cuaca, kondisi jalan, dll., dan <code translate="no">plain_cap_vector</code> adalah penyematan vektor yang sesuai.</p></li>
<li><p><code translate="no">rich_caption</code> adalah deskripsi bingkai saat ini dengan lingkungan sekitar, dan <code translate="no">rich_cap_vector</code> adalah penyematan vektor yang sesuai.</p></li>
<li><p><code translate="no">risk</code> adalah deskripsi risiko yang dihadapi kendaraan ego pada frame saat ini, dan <code translate="no">risk_vector</code> adalah embeddings vektor yang sesuai, dan</p></li>
<li><p>Semua atribut lain dari frame, seperti <code translate="no">road</code>, <code translate="no">weather</code>, <code translate="no">is_tunnel</code>, <code translate="no">has_pedestrain</code>, dll...</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> adalah badan JSON yang berisi semua sinyal lampu lalu lintas yang diidentifikasi dalam bingkai saat ini.</p></li>
<li><p><code translate="no">front_cars</code> juga merupakan badan JSON yang berisi semua mobil terdepan yang diidentifikasi dalam bingkai saat ini.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">Langkah 2: Menginisialisasi skema<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk memulai, kita perlu menginisialisasi skema untuk Struktur keterangan dan koleksi.</p>
<ul>
<li><p>Inisialisasi skema untuk Struktur Keterangan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = MilvusClient.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inisialisasi skema untuk koleksi</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;states&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific state of the ego vehicle in the current video&quot;</span>
)

<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;captions&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.ARRAY,</span>
<span class="highlighted-comment-line">    element_type=DataType.STRUCT,</span>
<span class="highlighted-comment-line">    struct_schema=struct_for_caption,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">600</span>,</span>
<span class="highlighted-comment-line">    description=<span class="hljs-string">&quot;captions for the current video&quot;</span></span>
<span class="highlighted-comment-line">)</span>

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Langkah 3: Tetapkan parameter indeks<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Semua bidang vektor harus diindeks. Untuk mengindeks bidang vektor dalam elemen Struct, Anda perlu menggunakan <code translate="no">EMB_LIST_HNSW</code> sebagai tipe indeks dan tipe metrik <code translate="no">MAX_SIM</code> untuk mengukur kemiripan di antara penyematan vektor.</p>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Anda disarankan untuk mengaktifkan penghancuran JSON untuk bidang JSON untuk mempercepat pemfilteran di dalam bidang ini.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">Langkah 4: Membuat koleksi<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah skema dan indeks siap, Anda dapat membuat koleksi target sebagai berikut:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">Langkah 5: Masukkan data<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motos mengatur kumpulan data CoVLA dalam beberapa file, termasuk klip video mentah (<code translate="no">.mp4</code>), negara bagian (<code translate="no">states.jsonl</code>), keterangan (<code translate="no">captions.jsonl</code>), lampu lalu lintas (<code translate="no">traffic_lights.jsonl</code>), dan mobil depan (<code translate="no">front_cars.jsonl</code>).</p>
<p>Anda perlu menggabungkan potongan data untuk setiap klip video dari file-file ini dan menyisipkan datanya. Berikut ini adalah entitas yang digabungkan untuk referensi Anda.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;video_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;video_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;videos/0a0fc7a5db365174.mp4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;states&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;trajectory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;extrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">-0.016034273081459105</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.9998714384933313</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-8.280132118064406e-05</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;intrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">2648.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">964.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;captions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;plain_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow.&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rich_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow. It is cloudy. The car is driving on a wide road. No pedestrians appear to be present. What the driver of ego vehicle should be careful is to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_correct&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_yes_rate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.6062515935356961</span><span class="hljs-punctuation">,</span>
            ...
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
            ...
        <span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">599</span>
            ...
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;traffic_lights&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">485.9914855957031</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.18536376953125</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.1666259765625</span><span class="hljs-punctuation">,</span> <span class="hljs-number">360.3130798339844</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;right&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;2&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;straight&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;front_cars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;has_lead&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_prob&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.967777669429779</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_x&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5.26953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_y&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1.07421875</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_speed_kmh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">23.6953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.546875</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Setelah Anda memproses data yang sesuai, Anda dapat menyisipkan data sebagai berikut:</p>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;video_id&quot;</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>, ...}
    ...
]

client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
