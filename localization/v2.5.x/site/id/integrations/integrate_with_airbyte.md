---
id: integrate_with_airbyte.md
summary: >-
  Airbyte adalah infrastruktur pergerakan data sumber terbuka untuk membangun
  pipa data ekstrak dan beban (EL). Ini dirancang untuk keserbagunaan,
  skalabilitas, dan kemudahan penggunaan. Katalog konektor Airbyte hadir "di
  luar kotak" dengan lebih dari 350 konektor yang sudah jadi. Konektor-konektor
  ini dapat digunakan untuk mulai mereplikasi data dari sumber ke tujuan hanya
  dalam beberapa menit.
title: 'Airbyte: Infrastruktur Pergerakan Data Sumber Terbuka'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Infrastruktur Pergerakan Data Sumber Terbuka<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte adalah infrastruktur pergerakan data sumber terbuka untuk membangun pipa data ekstrak dan beban (EL). Infrastruktur ini dirancang untuk keserbagunaan, skalabilitas, dan kemudahan penggunaan. Katalog konektor Airbyte hadir "di luar kotak" dengan lebih dari 350 konektor yang sudah jadi. Konektor-konektor ini dapat digunakan untuk mulai mereplikasi data dari sumber ke tujuan hanya dalam beberapa menit.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Komponen-komponen Utama Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Katalog Konektor</h3><ul>
<li><strong>350+ Konektor yang Sudah Dibangun Sebelumnya</strong>: Katalog konektor Airbyte hadir "out-of-the-box" dengan lebih dari 350 konektor yang sudah jadi. Konektor-konektor ini dapat digunakan untuk mulai mereplikasi data dari sumber ke tujuan hanya dalam beberapa menit.</li>
<li><strong>Pembuat Konektor Tanpa Kode</strong>: Anda dapat dengan mudah memperluas fungsionalitas Airbyte untuk mendukung kasus penggunaan khusus Anda melalui alat <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">seperti No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. Platform</h3><p>Platform Airbyte menyediakan semua layanan horizontal yang diperlukan untuk mengonfigurasi dan menskalakan operasi perpindahan data, tersedia dalam bentuk <a href="https://airbyte.com/product/airbyte-cloud">cloud-managed</a> atau <a href="https://airbyte.com/product/airbyte-enterprise">self-managed</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. Antarmuka Pengguna</h3><p>Airbyte memiliki fitur UI, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (library Python), <a href="https://docs.airbyte.com/api-documentation">API</a>, dan <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> untuk berintegrasi dengan tooling dan pendekatan yang Anda inginkan untuk manajemen infrastruktur.</p>
<p>Dengan kemampuan Airbyte, pengguna dapat mengintegrasikan sumber data ke dalam cluster Milvus untuk pencarian kemiripan.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Sebelum Anda Memulai<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda akan membutuhkan</p>
<ul>
<li>Akun Zendesk (atau sumber data lain yang ingin Anda sinkronkan datanya)</li>
<li>Akun Airbyte atau instance lokal</li>
<li>Kunci API OpenAI</li>
<li>Milvus cluster</li>
<li>Python 3.10 yang terinstal secara lokal</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Menyiapkan Milvus Cluster<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda telah menggunakan cluster K8s untuk produksi, Anda dapat melewati langkah ini dan langsung menggunakan <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">Milvus Operator</a>. Jika belum, Anda dapat mengikuti <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">langkah-langkah</a> untuk menggunakan cluster Milvus dengan Milvus Operator.</p>
<p>Entitas individual (dalam kasus kami, tiket dukungan dan artikel basis pengetahuan) disimpan dalam sebuah "koleksi" - setelah cluster Anda disiapkan, Anda perlu membuat koleksi. Pilih nama yang sesuai dan atur Dimension ke 1536 untuk mencocokkan dimensi vektor yang dihasilkan oleh layanan penyematan OpenAI.</p>
<p>Setelah pembuatan, catat info titik akhir dan <a href="https://milvus.io/docs/authenticate.md?tab=docker">autentikasi</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Menyiapkan Koneksi di Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Basis data kita sudah siap, mari kita pindahkan beberapa data! Untuk melakukan ini, kita perlu mengonfigurasi koneksi di Airbyte. Daftar akun cloud Airbyte di <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> atau jalankan instance lokal seperti yang dijelaskan <a href="https://docs.airbyte.com/using-airbyte/getting-started/">dalam dokumentasi</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Mengatur Sumber</h3><p>Setelah instance Anda berjalan, kita perlu menyiapkan koneksi - klik "New connection" dan pilih konektor "Zendesk Support" sebagai sumber. Setelah mengklik tombol "Test and Save", Airbyte akan memeriksa apakah koneksi dapat dibuat.</p>
<p>Di Airbyte cloud, Anda dapat dengan mudah mengautentikasi dengan mengklik tombol Autentikasi. Saat menggunakan instance Airbyte lokal, ikuti petunjuk yang diuraikan pada halaman <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">dokumentasi</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Mengatur Tujuan</h3><p>Jika semuanya bekerja dengan benar, langkah selanjutnya adalah mengatur tujuan untuk memindahkan data. Di sini, pilih konektor "Milvus".</p>
<p>Konektor Milvus melakukan tiga hal:</p>
<ul>
<li><strong>Chunking and Formatting</strong> - Memisahkan catatan Zendesk menjadi teks dan metadata. Jika teks lebih besar dari ukuran chunk yang ditentukan, catatan akan dipecah menjadi beberapa bagian yang dimuat ke dalam koleksi satu per satu. Pemecahan teks (atau chunking) dapat, misalnya, terjadi pada kasus tiket dukungan yang besar atau artikel pengetahuan. Dengan memecah teks, Anda dapat memastikan bahwa pencarian selalu memberikan hasil yang berguna.</li>
</ul>
<p>Mari kita mulai dengan ukuran chunk 1000 token dan bidang teks body, judul, deskripsi, dan subjek, karena ini akan ada di data yang akan kita terima dari Zendesk.</p>
<ul>
<li><strong>Penyematan</strong> - Menggunakan model Machine Learning mengubah potongan teks yang dihasilkan oleh bagian pemrosesan menjadi penyematan vektor yang kemudian dapat Anda cari kesamaan semantiknya. Untuk membuat penyematan, Anda harus menyediakan kunci API OpenAI. Airbyte akan mengirimkan setiap potongan ke OpenAI dan menambahkan vektor yang dihasilkan ke entitas yang dimuat ke dalam cluster Milvus Anda.</li>
<li><strong>Pengindeksan</strong> - Setelah Anda membuat vektor potongan, Anda dapat memuatnya ke dalam database. Untuk melakukannya, masukkan informasi yang Anda dapatkan ketika menyiapkan klaster dan koleksi Anda di klaster Milvus. <div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Mengklik "Test and save" akan memeriksa apakah semuanya sudah tersusun dengan benar (kredensial yang valid, koleksi ada dan memiliki dimensi vektor yang sama dengan penyematan yang dikonfigurasi, dll.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Mengatur aliran sinkronisasi aliran</h3><p>Langkah terakhir sebelum data siap mengalir adalah memilih "stream" mana yang akan disinkronkan. Sebuah stream adalah kumpulan dari record-record yang ada di source. Karena Zendesk mendukung sejumlah besar stream yang tidak relevan dengan kasus penggunaan kita, mari kita hanya memilih "tiket" dan "artikel" dan menonaktifkan yang lainnya untuk menghemat bandwidth dan memastikan hanya informasi yang relevan yang akan muncul dalam pencarian:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> Anda dapat memilih bidang mana yang akan diekstrak dari sumbernya dengan mengeklik nama aliran. Mode sinkronisasi "Incremental | Append + Deduped" berarti bahwa proses koneksi selanjutnya akan membuat Zendesk dan Milvus tetap sinkron sembari mentransfer data yang minimal (hanya artikel dan tiket yang telah berubah sejak proses sebelumnya).</p>
<p>Segera setelah koneksi disiapkan, Airbyte akan mulai menyinkronkan data. Diperlukan waktu beberapa menit untuk muncul di koleksi Milvus Anda.</p>
<p>Jika Anda memilih frekuensi replikasi, Airbyte akan berjalan secara teratur untuk menjaga koleksi Milvus Anda tetap mutakhir dengan perubahan pada artikel Zendesk dan masalah yang baru dibuat.</p>
<h3 id="Check-flow" class="common-anchor-header">Alur pemeriksaan</h3><p>Anda dapat memeriksa di Milvus cluster UI bagaimana data terstruktur dalam koleksi dengan menavigasi ke taman bermain dan mengeksekusi kueri "Query Data" dengan filter yang disetel ke "_ab_stream == \"tickets\"".<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Seperti yang dapat Anda lihat pada tampilan Result, setiap record yang berasal dari Zendesk disimpan sebagai entitas yang terpisah di Milvus dengan semua metadata yang ditentukan. Potongan teks yang menjadi dasar penyematan ditampilkan sebagai properti "text" - ini adalah teks yang disematkan menggunakan OpenAI dan akan menjadi apa yang akan kita cari.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Membangun aplikasi Streamlit yang menanyakan koleksi<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Data kita sudah siap - sekarang kita perlu membangun aplikasi untuk menggunakannya. Dalam hal ini, aplikasi akan menjadi formulir dukungan sederhana bagi pengguna untuk mengirimkan kasus dukungan. Ketika pengguna menekan tombol kirim, kita akan melakukan dua hal:</p>
<ul>
<li>Mencari tiket serupa yang dikirimkan oleh pengguna dari organisasi yang sama</li>
<li>Mencari artikel berbasis pengetahuan yang mungkin relevan dengan pengguna</li>
</ul>
<p>Dalam kedua kasus tersebut, kita akan memanfaatkan pencarian semantik menggunakan sematan OpenAI. Untuk melakukan hal ini, deskripsi masalah yang dimasukkan pengguna juga disematkan dan digunakan untuk mengambil entitas yang serupa dari klaster Milvus. Jika ada hasil yang relevan, hasil tersebut akan ditampilkan di bawah formulir.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Menyiapkan lingkungan UI</h3><p>Anda akan membutuhkan instalasi Python lokal karena kita akan menggunakan Streamlit untuk mengimplementasikan aplikasi.</p>
<p>Pertama, instal Streamlit, pustaka klien Milvus, dan pustaka klien OpenAI secara lokal:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Untuk membuat formulir dukungan dasar, buatlah file python <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk menjalankan aplikasi Anda, gunakan Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Ini akan merender formulir dasar:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>Kode untuk contoh ini juga dapat ditemukan di <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Menyiapkan layanan kueri backend</h3><p>Selanjutnya, mari kita periksa tiket terbuka yang mungkin relevan. Untuk melakukan hal ini, kita menyematkan teks yang dimasukkan pengguna menggunakan OpenAI, lalu melakukan pencarian kemiripan pada koleksi kita, memfilter tiket yang masih terbuka. Jika ada satu dengan jarak yang sangat rendah antara tiket yang disediakan dan tiket yang ada, beri tahu pengguna dan jangan kirimkan:</p>
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
<p>Ada beberapa hal yang terjadi di sini:</p>
<ul>
<li>Koneksi ke cluster Milvus sudah diatur.</li>
<li>Layanan OpenAI digunakan untuk menghasilkan penyematan deskripsi yang dimasukkan pengguna.</li>
<li>Pencarian kemiripan dilakukan, memfilter hasil berdasarkan status tiket dan id organisasi (karena hanya tiket terbuka dari organisasi yang sama yang relevan).</li>
<li>Jika ada hasil dan jarak antara vektor penyematan tiket yang ada dan teks yang baru dimasukkan berada di bawah ambang batas tertentu, panggil fakta ini.</li>
</ul>
<p>Untuk menjalankan aplikasi baru, Anda perlu mengatur variabel lingkungan untuk OpenAI dan Milvus terlebih dahulu:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ketika mencoba mengirimkan tiket yang sudah ada, seperti inilah hasilnya:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> Kode untuk contoh ini juga dapat ditemukan di <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Tampilkan informasi yang lebih relevan</h3><p>Seperti yang dapat Anda lihat pada keluaran debug hijau yang tersembunyi di versi final, dua tiket cocok dengan pencarian kami (dalam status baru, dari organisasi saat ini, dan dekat dengan vektor penyematan). Namun, yang pertama (relevan) memiliki peringkat yang lebih tinggi daripada yang kedua (tidak relevan dalam situasi ini), yang tercermin dalam nilai jarak yang lebih rendah. Hubungan ini ditangkap dalam vektor penyematan tanpa mencocokkan kata secara langsung, seperti dalam pencarian teks lengkap biasa.</p>
<p>Sebagai penutup, mari kita tampilkan informasi yang berguna setelah tiket dikirimkan untuk memberikan informasi yang relevan kepada pengguna sebanyak mungkin.</p>
<p>Untuk melakukan hal ini, kita akan melakukan pencarian kedua setelah tiket dikirimkan untuk mengambil artikel basis pengetahuan yang paling cocok:</p>
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
<p>Jika tidak ada tiket dukungan terbuka dengan skor kemiripan yang tinggi, tiket baru akan dikirimkan dan artikel pengetahuan yang relevan akan ditampilkan di bawah ini:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> Kode untuk contoh ini juga dapat ditemukan di <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">Kesimpulan<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Meskipun UI yang ditampilkan di sini bukanlah formulir dukungan yang sebenarnya, melainkan sebuah contoh untuk mengilustrasikan kasus penggunaan, kombinasi Airbyte dan Milvus adalah kombinasi yang sangat kuat - ini memudahkan untuk memuat teks dari berbagai macam sumber (dari basis data seperti Postgres melalui API seperti Zendesk atau GitHub hingga sumber yang sepenuhnya dibuat khusus dengan menggunakan SDK Airbyte atau pembangun konektor visual) dan mengindeksnya dalam bentuk yang disematkan di Milvus, sebuah mesin pencari vektor yang kuat dan dapat menskalakan ke data dalam jumlah yang sangat besar.</p>
<p>Airbyte dan Milvus adalah open source dan sepenuhnya gratis untuk digunakan pada infrastruktur Anda, dengan penawaran cloud untuk membebani operasi jika diinginkan.</p>
<p>Di luar kasus penggunaan pencarian semantik klasik yang diilustrasikan dalam artikel ini, pengaturan umum juga dapat digunakan untuk membangun bot obrolan penjawab pertanyaan menggunakan metode RAG (Retrieval Augmented Generation), sistem pemberi rekomendasi, atau membantu membuat iklan menjadi lebih relevan dan efisien.</p>
