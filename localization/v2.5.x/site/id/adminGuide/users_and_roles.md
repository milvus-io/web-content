---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  Milvus mencapai kontrol akses yang halus melalui RBAC. Anda bisa mulai dengan
  membuat pengguna dan peran, kemudian menetapkan hak istimewa atau grup hak
  istimewa untuk peran, dan akhirnya mengelola kontrol akses dengan memberikan
  peran kepada pengguna. Metode ini memastikan efisiensi dan keamanan manajemen
  akses. Halaman ini memperkenalkan cara membuat pengguna dan peran di Milvus.
title: Membuat Pengguna & Peran
---
<h1 id="Create-Users--Roles​" class="common-anchor-header">Membuat Pengguna &amp; Peran<button data-href="#Create-Users--Roles​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mencapai kontrol akses yang halus melalui RBAC. Anda bisa mulai dengan membuat pengguna dan peran, kemudian menetapkan hak istimewa atau grup hak istimewa untuk peran, dan akhirnya mengelola kontrol akses dengan memberikan peran kepada pengguna. Metode ini memastikan efisiensi dan keamanan manajemen akses. Halaman ini memperkenalkan cara membuat pengguna dan peran di Milvus.</p>
<h2 id="User​" class="common-anchor-header">Pengguna<button data-href="#User​" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah menginisialisasi instans Milvus, pengguna root secara otomatis dibuat untuk autentikasi saat terhubung ke Milvus untuk pertama kalinya. Nama pengguna root adalah <code translate="no">root</code> dan kata sandinya adalah <code translate="no">Milvus</code>. Peran default dari pengguna root adalah <code translate="no">admin</code>, yang memiliki akses ke semua sumber daya. Untuk memastikan keamanan data, simpanlah kredensial pengguna root Anda dengan aman untuk mencegah akses yang tidak sah.</p>
<p>Untuk operasi harian, kami sarankan untuk membuat pengguna daripada menggunakan pengguna root.</p>
<h3 id="Create-a-user​" class="common-anchor-header">Membuat pengguna</h3><p>Contoh berikut ini menunjukkan cara membuat pengguna dengan nama pengguna <code translate="no">user_1</code> dan kata sandi <code translate="no">P@ssw0rd</code>. Nama pengguna dan kata sandi untuk pengguna harus mengikuti aturan berikut.</p>
<ul>
<li><p>Nama pengguna: Harus dimulai dengan huruf dan hanya boleh terdiri dari huruf besar atau huruf kecil, angka, dan garis bawah.</p></li>
<li><p>Kata sandi: Harus terdiri dari 8-64 karakter dan harus menyertakan tiga hal berikut ini: huruf besar, huruf kecil, angka, dan karakter khusus.</p></li>
</ul>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client = <span class="hljs-title class_">MilvusClient</span>(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
client.<span class="hljs-title function_">create_user</span>(user_name=<span class="hljs-string">&quot;user_1&quot;</span>, password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateUserReq;​
​
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build();​
        ​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">CreateUserReq</span> <span class="hljs-variable">createUserReq</span> <span class="hljs-operator">=</span> CreateUserReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .build();​
        ​
client.createUser(createUserReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
 });​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Update-password​" class="common-anchor-header">Memperbarui kata sandi</h3><p>Setelah membuat pengguna, Anda dapat memperbarui kata sandi jika Anda lupa.</p>
<p>Kata sandi yang baru juga harus mengikuti aturan berikut.</p>
<ul>
<li>Harus terdiri dari 8-64 karakter dan mencakup tiga hal berikut ini: huruf besar, huruf kecil, angka, dan karakter khusus. </li>
</ul>
<p>Contoh berikut ini menunjukkan cara memperbarui kata sandi untuk pengguna <code translate="no">user_1</code> menjadi <code translate="no">NewP@ssw0rd</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">update_password</span>(​
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,​
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,​
    new_password=<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.UpdatePasswordReq;​
​
<span class="hljs-type">UpdatePasswordReq</span> <span class="hljs-variable">updatePasswordReq</span> <span class="hljs-operator">=</span> UpdatePasswordReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .newPassword(<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>)​
        .build();​
client.updatePassword(updatePasswordReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">updateUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">newPassword</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
   <span class="hljs-attr">oldPassword</span>: <span class="hljs-string">&#x27;NewP@ssw0rd&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/update_password&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;newPassword&quot;: &quot;P@ssw0rd!&quot;,​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-users​" class="common-anchor-header">Membuat daftar pengguna</h3><p>Setelah membuat beberapa pengguna, Anda dapat membuat daftar dan melihat semua pengguna yang ada.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_users</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; resp = client.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Di bawah ini adalah contoh keluaran. <code translate="no">root</code> adalah pengguna default yang dibuat secara otomatis di Milvus. <code translate="no">user_1</code> adalah pengguna baru yang baru saja dibuat.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;root&#x27;</span>, <span class="hljs-string">&#x27;user_1&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Role​" class="common-anchor-header">Peran<button data-href="#Role​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan sebuah role bawaan yang disebut <code translate="no">admin</code>, yang merupakan role administrator yang dapat mengakses sumber daya di bawah semua instans dan memiliki hak istimewa untuk semua operasi. Untuk manajemen akses yang lebih baik dan keamanan data yang lebih baik, Anda disarankan untuk membuat role khusus berdasarkan kebutuhan Anda.</p>
<h3 id="Create-a-role​" class="common-anchor-header">Membuat peran</h3><p>Contoh berikut ini menunjukkan cara membuat peran bernama <code translate="no">role_a</code>. </p>
<p>Nama peran harus mengikuti aturan berikut ini.</p>
<ul>
<li>Harus dimulai dengan huruf dan hanya boleh menyertakan huruf besar atau huruf kecil, angka, dan garis bawah.&quot;</li>
</ul>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_role</span>(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateRoleReq;​
<span class="hljs-type">CreateRoleReq</span> <span class="hljs-variable">createRoleReq</span> <span class="hljs-operator">=</span> CreateRoleReq.builder()​
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)​
        .build();​
       ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createRole</span>(createRoleReq);​
<span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createRole</span>({​
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;roleName&quot;: &quot;role_a&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-roles​" class="common-anchor-header">Membuat daftar peran</h3><p>Setelah membuat beberapa peran, Anda dapat membuat daftar dan melihat semua peran yang ada.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_roles</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; roles = client.<span class="hljs-title function_">listRoles</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listRoles</span>(​
    <span class="hljs-attr">includeUserInfo</span>: <span class="hljs-title class_">True</span>​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Di bawah ini adalah contoh keluaran. <code translate="no">admin</code> adalah peran default di Milvus. <code translate="no">role_a</code> adalah peran baru yang baru saja dibuat.</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;role_a&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
