---
id: idempotent-import.md
order: 2
title: Impor Massal Idempoten
summary: >-
  Kirimkan kunci idempotensi agar upaya impor massal yang diulang akan dikaitkan
  dengan pekerjaan asli, bukan membuat pekerjaan baru.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Impor Massal Idempoten<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Permintaan impor massal dapat berhasil meskipun responsnya hilang: panggilan melebihi batas waktu, koneksi terputus, atau orkestrator Anda mati sebelum menyimpan <code translate="no">jobId</code> yang dikembalikan. Anda tidak dapat membedakan antara “belum selesai” dan “sudah selesai, respons hilang”. Melakukan percobaan ulang akan memulai tugas kedua dan setiap baris akan dimasukkan dua kali; tidak melakukan percobaan ulang dapat mengakibatkan impor gagal.</p>
<p>Kunci idempotensi menghilangkan dilema tersebut. Berikan tag pada permintaan dengan kunci tersebut, dan upaya ulang yang membawa kunci yang sama akan mengembalikan ` <code translate="no">jobId</code> ` asli alih-alih membuat tugas kedua.</p>
<p>Impor massal idempoten memerlukan Milvus 3.0.2 atau yang lebih baru, atau 2.6.24 atau yang lebih baru pada lini 2.6. Server yang lebih lama akan mengabaikan header tersebut dan setiap permintaan, baik yang dicoba ulang maupun tidak, akan memulai pekerjaan baru.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Mengirimkan kunci<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Kunci tersebut dikirim sebagai header HTTP ` <code translate="no">Idempotency-Key</code> `, bukan di badan permintaan.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> adalah ` <code translate="no">&quot;Idempotency-Key&quot;</code>`; string mentah juga berfungsi. Parameter ` <code translate="no">headers</code> ` dan ` <code translate="no">IDEMPOTENCY_KEY_HEADER</code> ` memerlukan pymilvus v3.0.3 atau yang lebih baru pada seri 3.x, atau v2.6.18 atau yang lebih baru pada seri 2.6. Pada pymilvus versi lama, baris <code translate="no">import</code> di atas akan gagal dengan pesan kesalahan " <code translate="no">ImportError</code> " saat mencari <code translate="no">IDEMPOTENCY_KEY_HEADER</code>, dan meneruskan <code translate="no">headers</code> ke <code translate="no">bulk_import</code> dapat menyebabkan perilaku yang tidak terduga — panggilan tersebut mungkin gagal, atau impor mungkin dikirim tanpa kunci.</p>
<p>Lakukan polling ke <code translate="no">/v2/vectordb/jobs/import/describe</code> dengan <code translate="no">jobId</code> yang dikembalikan seperti biasa. Upaya ulang yang tiba saat upaya asli masih dalam proses pendaftaran akan menunggunya, sehingga upaya ulang tidak akan pernah mendeteksi pekerjaan yang setengah terdaftar.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Memilih kunci<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Satu kunci per permintaan logis.</strong> Beri nama unit pekerjaan, seperti <code translate="no">orders-2026-09-07-batch-3</code>, atau buat UUID dan simpan bersama item pekerjaan sebelum mengirim permintaan. Sertakan nomor percobaan jika Anda mungkin perlu menjalankan ulang pekerjaan yang sama.</li>
<li><strong>Lakukan percobaan ulang dengan kunci yang sama.</strong> Membuat kunci baru pada percobaan ulang akan menyebabkan duplikasi data. Pengecualiannya tercantum di bagian <a href="#when-to-send-a-new-key">Kapan harus mengirim kunci baru</a>.</li>
<li><strong>Jangan pernah menggunakan kembali kunci untuk berkas yang berbeda.</strong> Milvus tidak membandingkan kedua permintaan tersebut. Anda akan mendapatkan kembali berkas asli <code translate="no">jobId</code>, dan berkas baru tidak akan diimpor.</li>
<li><strong>Jaga agar tetap singkat dan dapat dicetak.</strong> ASCII yang dapat dicetak, maksimal 256 byte secara default (<code translate="no">streaming.idempotency.maxKeyLength</code>). Apa pun selain itu akan ditolak dengan kesalahan <code translate="no">1100</code>.</li>
<li><strong>Jangan memasukkan informasi rahasia ke dalamnya.</strong> Kunci disimpan bersama data Anda.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Berapa lama kunci disimpan<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>Kunci ini berlaku untuk koleksi berdasarkan ID internalnya, sehingga mengganti nama koleksi tidak akan mengganggu proses percobaan ulang, selama proses percobaan ulang tersebut menyebut koleksi dengan nama barunya. Menghapus dan membuat ulang koleksi dengan nama yang sama akan mengganggu proses tersebut, dan menjalankan tugas baru adalah solusi yang tepat dalam hal ini.</p>
<p>Milvus menyimpan kunci impor selama sekitar satu hari. Anggaplah itu sebagai perkiraan, bukan jaminan: lalu lintas DDL atau impor yang padat akan memperpendek durasinya, sedangkan restart koordinator akan memperpanjangnya. Upaya ulang setelah kunci dilupakan akan memulai pekerjaan baru.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Kapan harus mengirim kunci baru<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada dua kasus, dan hanya dua:</p>
<ul>
<li><strong>Tugas asli gagal atau dibatalkan.</strong> Perintah `describe` mengembalikan ` <code translate="no">state: Failed</code> ` beserta alasannya. Melakukan percobaan ulang dengan kunci yang sama akan mengembalikan ` <code translate="no">jobId</code> ` yang sama selama kunci tersebut masih diingat. Perbaiki penyebabnya, lalu kirim kunci baru.</li>
<li><strong>Tugas asli telah dihapus.</strong> Milvus menyimpan tugas yang telah selesai selama <code translate="no">dataCoord.import.taskRetention</code> (48 jam secara default). Jika masa berlaku tersebut habis sementara kunci masih diingat, upaya ulang akan mengembalikan <code translate="no">jobId</code> lama, dan perintah `describe` akan menjawab dengan kesalahan <code translate="no">import job does not exist</code> alih-alih status tugas. Tugas tersebut mungkin telah berhasil. Pastikan data tersebut hilang sebelum Anda mengirim kunci baru.</li>
</ul>
<p>Upaya ulang yang ditolak, misalnya karena batas pekerjaan impor telah terpenuhi, bukanlah salah satu dari kasus-kasus ini. Coba lagi nanti dengan kunci yang sama.</p>
<h2 id="Configuration" class="common-anchor-header">Konfigurasi<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Empat parameter menentukan perilaku pada halaman ini. Tidak ada yang perlu diubah agar kunci tersebut berfungsi.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>Fungsinya</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Lamanya kunci impor disimpan. Nilai ini tidak tercantum dalam file konfigurasi default <code translate="no">milvus.yaml</code>; tambahkan secara eksplisit untuk mengubahnya. Penyimpanan yang sama juga menolak pengiriman DDL yang duplikat, jadi jangan kurangi nilainya hanya untuk mempersingkat jendela impor.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Berapa banyak kunci dan catatan DDL yang disimpan oleh penyimpanan yang sama sebelum yang tertua dihapus, terlepas dari usianya. Inilah yang memungkinkan lalu lintas DDL atau impor yang padat melupakan sebuah kunci sebelum <code translate="no">maxLifetime</code>. Tidak ada dalam pengaturan default <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 jam) sejak versi 2.6.24 dan 3.0.2; <code translate="no">10800</code> sebelumnya</td><td>Lamanya waktu pekerjaan impor yang telah selesai tetap dapat diakses melalui kueri. Tetapkan nilainya setidaknya dua kali lipat dari <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>Panjang kunci maksimum dalam byte. Kunci yang lebih panjang akan ditolak dengan pesan kesalahan <code translate="no">1100</code>. <code translate="no">0</code> menonaktifkan batasan ini. Tidak tersedia di <code translate="no">milvus.yaml</code> default.</td></tr>
</tbody>
</table>
<p><code translate="no">milvus.yaml</code> yang dirilis sebelum versi 2.6.24 dan 3.0.2 menetapkan <code translate="no">taskRetention: 10800</code> secara eksplisit, dan proses upgrade tidak akan menggantikan nilai yang ada di berkas Anda. Jika Anda melakukan upgrade menggunakan berkas tersebut, naikkan <code translate="no">taskRetention</code> menjadi setidaknya dua kali lipat dari <code translate="no">maxLifetime</code>. Nilai baru ini hanya berlaku untuk pekerjaan yang selesai setelah perubahan dilakukan.</p>
