---
id: configure_localstorage.md
related_key: configure
group: system_configuration.md
summary: Pelajari cara mengonfigurasi localStorage untuk Milvus.
---
<h1 id="localStorage-related-Configurations" class="common-anchor-header">Konfigurasi yang terkait dengan localStorage<button data-href="#localStorage-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="localStoragepath" class="common-anchor-header"><code translate="no">localStorage.path</code><button data-href="#localStoragepath" class="anchor-icon" translate="no">
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
    </button></h2><table id="localStorage.path">
  <thead>
    <tr>
      <th class="width80">Deskripsi</th>
      <th class="width20">Nilai Default</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Jalur lokal ke tempat penyimpanan data vektor selama pencarian atau kueri untuk menghindari akses berulang ke layanan MinIO atau S3.</li>      
        <li>Perhatian: Mengubah parameter ini setelah menggunakan Milvus untuk jangka waktu tertentu akan mempengaruhi akses Anda ke data lama.</li>      
        <li>Disarankan untuk mengubah parameter ini sebelum memulai Milvus untuk pertama kalinya.</li>      </td>
      <td>/var/lib/milvus/data/</td>
    </tr>
  </tbody>
</table>
