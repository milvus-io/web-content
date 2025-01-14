---
id: architecture_overview.md
summary: >-
  Milvus menyediakan basis data vektor yang cepat, andal, dan stabil yang dibuat
  khusus untuk pencarian kemiripan dan kecerdasan buatan.
title: Gambaran Umum Arsitektur Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Gambaran Umum Arsitektur Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dibangun di atas pustaka pencarian vektor populer termasuk Faiss, HNSW, DiskANN, SCANN, dan banyak lagi, Milvus dirancang untuk pencarian kemiripan pada kumpulan data vektor padat yang berisi jutaan, miliaran, atau bahkan triliunan vektor. Sebelum melanjutkan, biasakan diri Anda dengan <a href="/docs/id/glossary.md">prinsip-prinsip dasar</a> pengambilan embedding.</p>
<p>Milvus juga mendukung pecahan data, konsumsi data streaming, skema dinamis, pencarian yang menggabungkan data vektor dan skalar, pencarian multi-vektor dan hibrida, vektor yang jarang, dan banyak fungsi lanjutan lainnya. Platform ini menawarkan kinerja sesuai permintaan dan dapat dioptimalkan agar sesuai dengan skenario pengambilan embedding apa pun. Kami merekomendasikan penerapan Milvus menggunakan Kubernetes untuk ketersediaan dan elastisitas yang optimal.</p>
<p>Milvus mengadopsi arsitektur penyimpanan bersama yang menampilkan penyimpanan dan pemilahan komputasi serta skalabilitas horizontal untuk node komputasinya. Mengikuti prinsip pemilahan bidang data dan bidang kontrol, Milvus terdiri dari <a href="/docs/id/four_layers.md">empat lapisan</a>: lapisan akses, layanan koordinator, simpul pekerja, dan penyimpanan. Lapisan-lapisan ini saling independen dalam hal penskalaan atau pemulihan bencana.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Arsitektur_diagram</span> </span></p>
<p>Menurut gambar tersebut, antarmuka dapat diklasifikasikan ke dalam kategori berikut:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Menghasilkan:</strong> menyisipkan / menghapus / meningkatkan</li>
<li><strong>DQL:</strong> pencarian / kueri</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari lebih lanjut tentang <a href="/docs/id/four_layers.md">Komputasi/Pemilahan Penyimpanan</a> di Milvus</li>
<li>Pelajari tentang <a href="/docs/id/main_components.md">Komponen Utama</a> di Milvus.</li>
</ul>
