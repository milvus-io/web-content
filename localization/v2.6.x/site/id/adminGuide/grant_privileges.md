---
id: grant_privileges.md
title: Memberikan Hak Istimewa atau Grup Hak Istimewa ke Peran
summary: >-
  Setelah peran dibuat, Anda dapat memberikan hak istimewa pada peran tersebut.
  Panduan ini memperkenalkan cara memberikan hak istimewa atau grup hak istimewa
  ke peran.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">Memberikan Hak Istimewa atau Grup Hak Istimewa ke Peran<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>Setelah peran dibuat, Anda dapat memberikan hak istimewa pada peran tersebut. Panduan ini memperkenalkan cara memberikan hak istimewa atau grup hak istimewa ke peran.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">Memberikan hak istimewa atau grup hak istimewa ke peran<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.5 memperkenalkan versi baru API yang menyederhanakan operasi pemberian hak istimewa. Anda tidak perlu lagi mencari tipe objek ketika memberikan hak istimewa kepada sebuah role. Berikut ini adalah parameter dan penjelasan terkait.</p>
<ul>
<li><p><strong>role_name:</strong> Nama peran target yang perlu diberikan hak istimewa atau grup hak istimewa.</p></li>
<li><p><strong>Resource</strong>: Sumber daya target hak istimewa, yang dapat berupa instance, database, atau koleksi tertentu.</p></li>
</ul>
<p>Tabel berikut ini menjelaskan cara menentukan sumber daya dalam metode <code translate="no">client.grantV2()</code>.</p>
<table>
   <tr>
     <th><p><strong>Tingkat</strong></p></th>
     <th><p><strong>Sumber Daya</strong></p></th>
     <th><p><strong>Metode Pemberian</strong></p></th>
     <th><p><strong>Catatan</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Koleksi</strong></p></td>
     <td><p>Koleksi tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama koleksi target Anda dan nama pangkalan data tempat koleksi target berada.</p></td>
   </tr>
   <tr>
     <td><p>Semua koleksi di bawah pangkalan data tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama pangkalan data target Anda dan karakter pengganti <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>Basis data</strong></p></td>
     <td><p>Basis data tertentu</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>Masukkan nama basis data target Anda dan wildcard <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td><p>Semua basis data di bawah contoh saat ini</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Masukkan <code translate="no">*</code> sebagai nama basis data dan <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
   <tr>
     <td><p><strong>Instance</strong></p></td>
     <td><p>Instance saat ini</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>Masukkan <code translate="no">*</code> sebagai nama basis data dan <code translate="no">*</code> sebagai nama koleksi.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>Privilege</strong>: Hak istimewa atau <a href="/docs/id/privilege_group.md">kelompok hak istimewa</a> tertentu yang perlu Anda berikan kepada suatu peran. Saat ini, Milvus menyediakan 56 jenis privilese yang dapat Anda berikan. Tabel di bawah ini mencantumkan daftar hak istimewa di Milvus.</p>
<p><div class="alert note"></p>
<p>Kolom jenis pada tabel di bawah ini digunakan untuk memudahkan anda mencari hak istimewa dengan cepat dan hanya digunakan untuk tujuan klasifikasi. Ketika memberikan hak istimewa, anda tidak perlu memahami jenisnya. Anda hanya perlu memasukkan hak istimewa yang sesuai.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>Jenis</strong></p></th>
<th><p><strong>Hak istimewa</strong></p></th>
<th><p><strong>Deskripsi</strong></p></th>
<th><p><strong>Deskripsi API yang relevan di sisi klien</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>Hak Istimewa Basis Data</p></td>
<td><p>DaftarDatabase</p></td>
<td><p>Melihat semua database dalam instance saat ini</p></td>
<td><p><a href="/docs/id/manage_databases.md">DaftarDatabase</a></p></td>
</tr>
<tr>
<td><p>JelaskanDatabase</p></td>
<td><p>Melihat detail database</p></td>
<td><p><a href="/docs/id/manage_databases.md">JelaskanDatabase</a></p></td>
</tr>
<tr>
<td><p>CreateDatabase</p></td>
<td><p>Membuat basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">BuatDatabase</a></p></td>
</tr>
<tr>
<td><p>JatuhkanDatabase</p></td>
<td><p>Menjatuhkan basis data</p></td>
<td><p><a href="/docs/id/manage_databases.md">Jatuhkan basis data</a></p></td>
</tr>
<tr>
<td><p>UbahDatabase</p></td>
<td><p>Memodifikasi properti database</p></td>
<td><p><a href="/docs/id/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>Keistimewaan Koleksi</p></td>
<td><p>GetFlushState</p></td>
<td><p>Memeriksa status operasi flush koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>Memeriksa status pemuatan koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>Memeriksa kemajuan pemuatan koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>TampilkanKoleksi</p></td>
<td><p>Melihat semua koleksi dengan hak istimewa koleksi</p></td>
<td><p><a href="/docs/id/view-collections.md">TampilkanKoleksi</a></p></td>
</tr>
<tr>
<td><p>DaftarAlias</p></td>
<td><p>Melihat semua alias dari sebuah koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">DaftarAliases</a></p></td>
</tr>
<tr>
<td><p>JelaskanKoleksi</p></td>
<td><p>Melihat detail dari sebuah koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">JelaskanKoleksi</a></p></td>
</tr>
<tr>
<td><p>JelaskanAlias</p></td>
<td><p>Melihat detail sebuah alias</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">JelaskanAlias</a></p></td>
</tr>
<tr>
<td><p>DapatkanStatistik</p></td>
<td><p>Mendapatkan statistik koleksi (misalnya jumlah entitas dalam koleksi)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">GetCollectionStatistics</a></p></td>
</tr>
<tr>
<td><p>BuatKoleksi</p></td>
<td><p>Membuat koleksi</p></td>
<td><p><a href="/docs/id/create-collection.md">BuatKoleksi</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>Jatuhkan koleksi</p></td>
<td><p><a href="/docs/id/drop-collection.md">JatuhkanKoleksi</a></p></td>
</tr>
<tr>
<td><p>Memuat</p></td>
<td><p>Memuat koleksi</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">LoadCollection/GetLoadingProgress/GetLoadState</a></p></td>
</tr>
<tr>
<td><p>Melepaskan</p></td>
<td><p>Melepaskan koleksi</p></td>
<td><p><a href="/docs/id/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>Flush</p></td>
<td><p>Mempertahankan semua entitas dalam koleksi ke dalam segmen tertutup. Setiap entitas yang disisipkan setelah operasi flush akan disimpan dalam segmen baru.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">Flush/GetFlushState</a></p></td>
</tr>
<tr>
<td><p>Pemadatan</p></td>
<td><p>Memicu pemadatan secara manual</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">Memadatkan</a></p></td>
</tr>
<tr>
<td><p>Ganti NamaKoleksi</p></td>
<td><p>Mengganti nama koleksi</p></td>
<td><p><a href="/docs/id/modify-collection.md">Ubah NamaKoleksi</a></p></td>
</tr>
<tr>
<td><p>BuatAlias</p></td>
<td><p>Membuat alias untuk sebuah koleksi</p></td>
<td><p><a href="/docs/id/manage-aliases.md">BuatAlias</a></p></td>
</tr>
<tr>
<td><p>DropAlias</p></td>
<td><p>Menghilangkan alias dari sebuah koleksi</p></td>
<td><p><a href="/docs/id/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>Mengosongkan semua koleksi dalam basis data</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>Keistimewaan Partisi</p></td>
<td><p>HasPartition</p></td>
<td><p>Memeriksa apakah sebuah partisi ada</p></td>
<td><p><a href="/docs/id/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>TampilkanPartisi</p></td>
<td><p>Melihat semua partisi dalam sebuah koleksi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">TampilkanPartisi</a></p></td>
</tr>
<tr>
<td><p>BuatPartisi</p></td>
<td><p>Membuat partisi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">BuatPartisi</a></p></td>
</tr>
<tr>
<td><p>JatuhkanPartisi</p></td>
<td><p>Menghapus partisi</p></td>
<td><p><a href="/docs/id/manage-partitions.md">JatuhkanPartisi</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>Hak Istimewa Indeks</p></td>
<td><p>IndexDetail</p></td>
<td><p>Melihat detail indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">JelaskanIndeks / Dapatkan Status Indeks / Dapatkan Kemajuan Pembuatan Indeks</a></p></td>
</tr>
<tr>
<td><p>BuatIndeks</p></td>
<td><p>Membuat indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">BuatIndeks</a></p></td>
</tr>
<tr>
<td><p>JatuhkanIndeks</p></td>
<td><p>Jatuhkan indeks</p></td>
<td><p><a href="/docs/id/index-vector-fields.md">Jatuhkan Indeks</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Hak Istimewa Manajemen Sumber Daya</p></td>
<td><p>LoadBalance</p></td>
<td><p>Mencapai keseimbangan beban</p></td>
<td><p><a href="/docs/id/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>Buat Grup Sumber Daya</p></td>
<td><p>Membuat grup sumber daya</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">Membuat Grup Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>Menghapus Grup Sumber Daya</p></td>
<td><p>Menghapus grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">Jatuhkan Grup Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>Memperbarui Grup Sumber Daya</p></td>
<td><p>Memperbarui grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">Memperbarui Grup Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>JelaskanGrup Sumber Daya</p></td>
<td><p>Melihat detail grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">Jelaskan Grup Sumber Daya</a></p></td>
</tr>
<tr>
<td><p>DaftarGrupSumberDaya</p></td>
<td><p>Melihat semua grup sumber daya dari instance saat ini</p></td>
<td><p><a href="/docs/id/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>Mentransfer simpul di antara grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">TransferNode</a></p></td>
</tr>
<tr>
<td><p>TransferReplika</p></td>
<td><p>Mentransfer replika antar grup sumber daya</p></td>
<td><p><a href="/docs/id/resource_group.md">TransferReplika</a></p></td>
</tr>
<tr>
<td><p>Pencadangan RBAC</p></td>
<td><p>Membuat cadangan untuk semua operasi terkait RBAC dalam instance saat ini</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>PulihkanRBAC</p></td>
<td><p>Memulihkan cadangan semua operasi terkait RBAC dalam instans saat ini</p></td>
<td><p>PulihkanRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>Hak Istimewa Entitas</p></td>
<td><p>Kueri</p></td>
<td><p>Melakukan kueri</p></td>
<td><p><a href="/docs/id/get-and-scalar-query.md">Kueri</a></p></td>
</tr>
<tr>
<td><p>Pencarian</p></td>
<td><p>Melakukan pencarian</p></td>
<td><p><a href="/docs/id/single-vector-search.md">Cari</a></p></td>
</tr>
<tr>
<td><p>Menyisipkan</p></td>
<td><p>Menyisipkan entitas</p></td>
<td><p><a href="/docs/id/insert-update-delete.md">Menyisipkan</a></p></td>
</tr>
<tr>
<td><p>Menghapus</p></td>
<td><p>Menghapus entitas</p></td>
<td><p><a href="/docs/id/delete-entities.md">Menghapus</a></p></td>
</tr>
<tr>
<td><p>Menyisipkan</p></td>
<td><p>Menyisipkan entitas</p></td>
<td><p><a href="/docs/id/upsert-entities.md">Menyisipkan</a></p></td>
</tr>
<tr>
<td><p>Impor</p></td>
<td><p>Menyisipkan atau mengimpor entitas secara massal</p></td>
<td><p><a href="/docs/id/import-data.md">Sisipkan/Impor Massal</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>Hak Istimewa RBAC</p></td>
<td><p>BuatKepemilikan</p></td>
<td><p>Membuat pengguna atau peran</p></td>
<td><p><a href="/docs/id/users_and_roles.md">BuatPengguna/BuatPeran</a></p></td>
</tr>
<tr>
<td><p>PerbaruiPengguna</p></td>
<td><p>Memperbarui kata sandi pengguna</p></td>
<td><p><a href="/docs/id/users_and_roles.md">PerbaruiKredensial</a></p></td>
</tr>
<tr>
<td><p>HapusKepemilikan</p></td>
<td><p>Menghapus kata sandi pengguna atau peran</p></td>
<td><p><a href="/docs/id/drop_users_roles.md">HapusKredensial/JatuhkanPeran</a></p></td>
</tr>
<tr>
<td><p>PilihKepemilikan</p></td>
<td><p>Melihat semua pengguna yang diberikan peran tertentu</p></td>
<td><p><a href="/docs/id/grant_roles.md">PilihPeran/PilihHibah</a></p></td>
</tr>
<tr>
<td><p>KelolaKepemilikan</p></td>
<td><p>Mengelola pengguna atau peran atau memberikan peran kepada pengguna</p></td>
<td><p><a href="/docs/id/privilege_group.md">OperateUserRole/OperatePrivilege/OperatePrivilegeV2</a></p></td>
</tr>
<tr>
<td><p>PilihPengguna</p></td>
<td><p>Melihat semua peran yang diberikan kepada pengguna</p></td>
<td><p><a href="/docs/id/grant_roles.md">PilihPengguna</a></p></td>
</tr>
<tr>
<td><p>BuatKelompokKeistimewaan (CreatePrivilegeGroup)</p></td>
<td><p>Membuat grup hak istimewa</p></td>
<td><p><a href="/docs/id/privilege_group.md">Buat Grup Hak Istimewa (CreatePrivilegeGroup)</a></p></td>
</tr>
<tr>
<td><p>Hapus Grup Hak Istimewa</p></td>
<td><p>Menghapus grup hak istimewa</p></td>
<td><p><a href="/docs/id/privilege_group.md">Jatuhkan Grup Hak Istimewa</a></p></td>
</tr>
<tr>
<td><p>DaftarGrup Hak Istimewa</p></td>
<td><p>Melihat semua grup hak istimewa dalam instance saat ini</p></td>
<td><p><a href="/docs/id/privilege_group.md">Daftar Grup Hak Istimewa</a></p></td>
</tr>
<tr>
<td><p>OperatePrivilegeGroup</p></td>
<td><p>Menambahkan hak istimewa atau menghapus hak istimewa dari grup hak istimewa</p></td>
<td><p><a href="/docs/id/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>Contoh berikut ini menunjukkan cara memberikan hak istimewa <code translate="no">PrivilegeSearch</code> pada <code translate="no">collection_01</code> di bawah basis data <code translate="no">default</code> serta grup hak istimewa bernama <code translate="no">privilege_group_1</code> ke peran <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">Mendeskripsikan peran<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menunjukkan cara melihat hak istimewa yang diberikan kepada role <code translate="no">role_a</code> menggunakan metode <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Di bawah ini adalah contoh keluaran.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">Mencabut hak istimewa atau kelompok hak istimewa dari suatu peran<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menunjukkan cara mencabut hak istimewa <code translate="no">PrivilegeSearch</code> pada <code translate="no">collection_01</code> di bawah basis data <code translate="no">default</code> serta grup hak istimewa <code translate="no">privilege_group_1</code> yang telah diberikan kepada role <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
