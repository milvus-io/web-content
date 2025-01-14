---
id: configure_pulsar.md
related_key: configure
group: system_configuration.md
summary: Pelajari cara mengonfigurasi pulsar untuk Milvus.
---
<h1 id="pulsar-related-Configurations" class="common-anchor-header">Konfigurasi terkait pulsar<button data-href="#pulsar-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Konfigurasi terkait pulsar, digunakan untuk mengelola log Milvus dari operasi mutasi terbaru, log streaming keluaran, dan menyediakan layanan berlangganan-publikasi log.</p>
<h2 id="pulsaraddress" class="common-anchor-header"><code translate="no">pulsar.address</code><button data-href="#pulsaraddress" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.address">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Alamat IP layanan Pulsar.</li>      
        <li>Variabel lingkungan: PULSAR_ADDRESS</li>      
        <li>pulsar.address dan pulsar.port bersama-sama menghasilkan akses yang valid ke Pulsar.</li>      
        <li>Pulsar secara istimewa memperoleh alamat IP yang valid dari variabel lingkungan PULSAR_ADDRESS ketika Milvus dimulai.</li>      
        <li>Nilai default berlaku ketika Pulsar berjalan pada jaringan yang sama dengan Milvus.</li>      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarport" class="common-anchor-header"><code translate="no">pulsar.port</code><button data-href="#pulsarport" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.port">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port layanan Pulsar.      </td>
      <td>6650</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarwebport" class="common-anchor-header"><code translate="no">pulsar.webport</code><button data-href="#pulsarwebport" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.webport">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port web layanan Pulsar. Jika Anda terhubung langsung tanpa proxy, sebaiknya gunakan 8080.      </td>
      <td>80</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarmaxMessageSize" class="common-anchor-header"><code translate="no">pulsar.maxMessageSize</code><button data-href="#pulsarmaxMessageSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.maxMessageSize">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Ukuran maksimum setiap pesan dalam Pulsar. Unit: Byte.</li>      
        <li>Secara default, Pulsar dapat mengirimkan paling banyak 5 MB data dalam satu pesan. Ketika ukuran data yang dimasukkan lebih besar dari nilai ini, proxy akan memecah data menjadi beberapa pesan untuk memastikan data tersebut dapat dikirim dengan benar.</li>      
        <li>Jika parameter yang sesuai di Pulsar tetap tidak berubah, meningkatkan konfigurasi ini akan menyebabkan Milvus gagal, dan menguranginya tidak menghasilkan keuntungan.</li>      </td>
      <td>5242880</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsartenant" class="common-anchor-header"><code translate="no">pulsar.tenant</code><button data-href="#pulsartenant" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.tenant">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Pulsar dapat disediakan untuk penyewa tertentu dengan kapasitas yang sesuai yang dialokasikan untuk penyewa.</li>      
        <li>Untuk berbagi instance Pulsar di antara beberapa instance Milvus, Anda dapat mengubahnya menjadi penyewa Pulsar, bukan penyewa default untuk setiap instance Milvus sebelum Anda memulainya. Namun, jika Anda tidak menginginkan multi-tenancy Pulsar, Anda disarankan untuk mengubah msgChannel.chanNamePrefix.cluster ke nilai yang berbeda.</li>      </td>
      <td>public</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarnamespace" class="common-anchor-header"><code translate="no">pulsar.namespace</code><button data-href="#pulsarnamespace" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.namespace">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Ruang nama Pulsar adalah nomenklatur unit administratif dalam sebuah penyewa.      </td>
      <td>default</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarrequestTimeout" class="common-anchor-header"><code translate="no">pulsar.requestTimeout</code><button data-href="#pulsarrequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.requestTimeout">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        batas waktu permintaan global klien pulsar dalam detik     </td>
      <td>60</td>
    </tr>
  </tbody>
</table>
<h2 id="pulsarenableClientMetrics" class="common-anchor-header"><code translate="no">pulsar.enableClientMetrics</code><button data-href="#pulsarenableClientMetrics" class="anchor-icon" translate="no">
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
    </button></h2><table id="pulsar.enableClientMetrics">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Apakah akan mendaftarkan metrik klien pulsar ke dalam jalur metrik milvus.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
