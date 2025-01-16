---
id: rbac.md
related_key: enable RBAC
summary: >-
  RBAC (Role-Based Access Control) adalah metode kontrol akses berdasarkan
  peran. Dengan RBAC, Anda dapat mengontrol dengan baik operasi yang dapat
  dilakukan pengguna di tingkat koleksi, basis data, dan instance, sehingga
  meningkatkan keamanan data. 
title: Penjelasan RBAC
---
<h1 id="RBAC-Explained​" class="common-anchor-header">Penjelasan RBAC<button data-href="#RBAC-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) adalah metode kontrol akses berdasarkan peran. Dengan RBAC, Anda dapat mengontrol dengan baik operasi yang dapat dilakukan pengguna di tingkat koleksi, basis data, dan instance, sehingga meningkatkan keamanan data. </p>
<p>Tidak seperti model kontrol akses pengguna tradisional, RBAC memperkenalkan konsep <strong>peran</strong>. Dalam model RBAC, Anda memberikan hak istimewa pada peran dan kemudian memberikan peran tersebut kepada pengguna. Kemudian pengguna dapat memperoleh hak istimewa. </p>
<p>Model RBAC dapat meningkatkan efisiensi manajemen kontrol akses. Misalnya, jika beberapa pengguna memerlukan serangkaian hak istimewa yang sama, Anda tidak perlu mengatur hak istimewa secara manual untuk setiap pengguna. Sebagai gantinya, Anda bisa membuat peran dan menetapkan peran tersebut kepada pengguna. Jika Anda ingin menyesuaikan hak istimewa pengguna ini, Anda cukup menyesuaikan hak istimewa peran dan modifikasi akan diterapkan ke semua pengguna dengan peran ini.</p>
<h2 id="RBAC-key-concepts​" class="common-anchor-header">Konsep-konsep utama RBAC<button data-href="#RBAC-key-concepts​" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/users_roles_privileges.png" alt="Users, roles, and privileges" class="doc-image" id="users,-roles,-and-privileges" />
   </span> <span class="img-wrapper"> <span>Pengguna, peran, dan hak istimewa</span> </span></p>
<p>Ada empat komponen utama dalam model RBAC.</p>
<ul>
<li><p>**Sumber daya: **Entitas sumber daya yang dapat diakses. Ada tiga tingkat sumber daya di Milvus - contoh, basis data, dan koleksi.</p></li>
<li><p>**Privilege: **Izin untuk melakukan operasi tertentu pada sumber daya Milvus (misalnya, membuat koleksi, menyisipkan data, dll). </p></li>
<li><p>**Kelompok hak istimewa: **Sekelompok beberapa hak istimewa.</p></li>
<li><p>**Peran: **Peran terdiri dari dua bagian - hak istimewa dan sumber daya. Privilege menentukan jenis operasi yang dapat dilakukan oleh role, sedangkan resource menentukan sumber daya target tempat operasi dapat dilakukan. Sebagai contoh, role administrator database dapat melakukan operasi membaca, menulis, dan mengelola database tertentu.</p></li>
<li><p>**Pengguna: **Pengguna adalah seseorang yang menggunakan Milvus. Setiap pengguna memiliki ID unik dan diberikan sebuah peran atau beberapa peran. </p></li>
</ul>
<h2 id="Procedures​" class="common-anchor-header">Prosedur<button data-href="#Procedures​" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mencapai kontrol akses melalui RBAC, anda perlu mengikuti langkah-langkah di bawah ini.</p>
<ol>
<li><p><a href="/docs/id/users_and_roles.md#Create-a-user">Membuat pengguna</a>: Selain pengguna default <code translate="no">root</code> di Milvus, Anda dapat membuat pengguna baru dan mengatur kata sandi untuk melindungi keamanan data.</p></li>
<li><p><a href="/docs/id/users_and_roles.md#Create-a-role">Membuat peran</a>: Anda dapat membuat peran yang disesuaikan berdasarkan kebutuhan Anda. Kemampuan spesifik peran ditentukan oleh hak istimewanya.</p></li>
<li><p><a href="/docs/id/privilege_group.md">Membuat grup hak istimewa</a>: Gabungkan beberapa hak istimewa ke dalam satu grup hak istimewa untuk menyederhanakan proses pemberian hak istimewa pada suatu peran.</p></li>
<li><p><a href="/docs/id/grant_privileges.md">Memberikan hak istimewa atau grup hak istimewa ke suatu peran</a>: Tentukan kemampuan peran dengan memberikan hak istimewa atau grup hak istimewa ke peran ini. </p></li>
<li><p><a href="/docs/id/grant_roles.md">Memberikan peran kepada pengguna</a>: Memberikan peran dengan hak istimewa tertentu kepada pengguna sehingga pengguna dapat memiliki hak istimewa peran. Satu peran dapat diberikan kepada beberapa pengguna.</p></li>
</ol>