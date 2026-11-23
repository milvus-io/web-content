---
id: rbac.md
title: Penjelasan RBAC
summary: >-
  RBAC (Role-Based Access Control) mengatur operasi yang dapat dilakukan
  pengguna pada tingkat koleksi, basis data, dan instans berdasarkan peran.
---
<h1 id="RBAC-Explained" class="common-anchor-header">Penjelasan RBAC<button data-href="#RBAC-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>RBAC (Role-Based Access Control) adalah metode kontrol akses yang didasarkan pada peran. Dengan RBAC, Anda dapat mengontrol secara terperinci operasi yang dapat dilakukan pengguna pada tingkat koleksi, basis data, dan instance, sehingga meningkatkan keamanan data.</p>
<p>Berbeda dengan model kontrol akses pengguna tradisional, RBAC memperkenalkan konsep <strong>peran</strong>. Dalam model RBAC, Anda memberikan hak akses kepada peran, lalu menugaskan peran tersebut kepada pengguna. Dengan demikian, pengguna dapat memperoleh hak akses.</p>
<p>Model RBAC dapat meningkatkan efisiensi pengelolaan kontrol akses. Misalnya, jika beberapa pengguna memerlukan kumpulan hak akses yang sama, Anda tidak perlu mengatur hak akses tersebut secara manual untuk setiap pengguna. Sebagai gantinya, Anda dapat membuat peran dan menugaskan peran tersebut kepada pengguna. Jika Anda ingin menyesuaikan hak akses pengguna-pengguna tersebut, Anda cukup menyesuaikan hak akses peran, dan perubahan tersebut akan diterapkan kepada semua pengguna yang memiliki peran tersebut.</p>
<h2 id="RBAC-key-concepts" class="common-anchor-header">Konsep-konsep utama RBAC<button data-href="#RBAC-key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/users-roles-privileges.png" alt="Users Roles Privileges" class="doc-image" id="users-roles-privileges" /> 
   <span>Pengguna Peran Hak Akses</span>
  
 </span></p>
<p>Ada lima komponen utama dalam model RBAC.</p>
<ul>
<li><p><strong>Sumber Daya:</strong> Entitas sumber daya yang dapat diakses. Terdapat tiga tingkatan sumber daya di Milvus - instance, database, dan koleksi.</p></li>
<li><p><strong>Hak Akses:</strong> Izin untuk melakukan operasi tertentu pada sumber daya Milvus (mis. membuat koleksi, memasukkan data, dll).</p></li>
<li><p><strong>Grup hak akses:</strong> Sekelompok hak akses.</p></li>
<li><p><strong>Peran:</strong> Sebuah peran terdiri dari dua bagian—hak akses dan sumber daya. Hak akses menentukan jenis operasi yang dapat dilakukan oleh suatu peran, sedangkan sumber daya menentukan sumber daya target yang dapat dioperasikan. Misalnya, peran administrator basis data dapat melakukan operasi baca, tulis, dan kelola pada basis data tertentu.</p></li>
<li><p><strong>Pengguna:</strong> Pengguna adalah seseorang yang menggunakan Milvus. Setiap pengguna memiliki ID unik dan diberikan satu atau beberapa peran.</p></li>
</ul>
<h2 id="Procedures" class="common-anchor-header">Prosedur<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menerapkan kontrol akses melalui RBAC, Anda perlu mengikuti langkah-langkah berikut:</p>
<ol>
<li><p><strong><a href="/docs/id/users_and_roles.md#Create-a-user">Buat pengguna</a></strong>: Selain pengguna default <code translate="no">root</code> di Milvus, Anda dapat membuat pengguna baru dan mengatur kata sandi untuk melindungi keamanan data.</p></li>
<li><p><strong><a href="/docs/id/users_and_roles.md#Create-a-role">Buat peran</a></strong>: Anda dapat membuat peran yang disesuaikan berdasarkan kebutuhan Anda. Kemampuan spesifik dari suatu peran ditentukan oleh hak istimewanya.</p></li>
<li><p><strong><a href="/docs/id/privilege_group.md">Buat grup hak istimewa</a></strong>: Gabungkan beberapa hak istimewa ke dalam satu grup hak istimewa untuk mempermudah proses pemberian hak istimewa kepada suatu peran.</p></li>
<li><p><strong><a href="/docs/id/grant_privileges.md">Berikan hak akses atau grup hak akses ke suatu peran</a></strong>: Tentukan kemampuan suatu peran dengan memberikan hak akses atau grup hak akses kepada peran tersebut.</p></li>
<li><p><strong><a href="/docs/id/grant_roles.md">Memberikan peran kepada pengguna</a></strong>: Berikan peran dengan hak akses tertentu kepada pengguna agar pengguna dapat memiliki hak akses dari peran tersebut. Satu peran dapat diberikan kepada beberapa pengguna.</p></li>
</ol>
