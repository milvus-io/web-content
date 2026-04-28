---
id: boolean.md
summary: Pelajari tentang aturan ekspresi boolean di Milvus.
title: Aturan Pemfilteran Skalar
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">Aturan Pemfilteran Skalar<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Ikhtisar<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Ekspresi predikat menghasilkan nilai boolean. Milvus melakukan pemfilteran skalar dengan mencari dengan predikat. Ekspresi predikat, ketika dievaluasi, mengembalikan TRUE atau FALSE. Lihat <a href="/api-reference/pymilvus/v2.4.x/About.md">Referensi API Python SDK</a> untuk instruksi penggunaan ekspresi predikat.</p>
<p>Aturan tata bahasa<a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> mendeskripsikan aturan ekspresi boolean:</p>
<pre><code translate="no">Expr = LogicalExpr | NIL
LogicalExpr = LogicalExpr BinaryLogicalOp LogicalExpr 
              | UnaryLogicalOp LogicalExpr
              | <span class="hljs-string">&quot;(&quot;</span> LogicalExpr <span class="hljs-string">&quot;)&quot;</span>
              | SingleExpr;
BinaryLogicalOp = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
UnaryLogicalOp = <span class="hljs-string">&quot;not&quot;</span>;
SingleExpr = TermExpr | CompareExpr;
TermExpr = IDENTIFIER <span class="hljs-string">&quot;in&quot;</span> ConstantArray;
Constant = INTEGER | FLOAT
ConstantExpr = Constant
               | ConstantExpr BinaryArithOp ConstantExpr
               | UnaryArithOp ConstantExpr;
                                                          
ConstantArray = <span class="hljs-string">&quot;[&quot;</span> ConstantExpr { <span class="hljs-string">&quot;,&quot;</span> ConstantExpr } <span class="hljs-string">&quot;]&quot;</span>;
UnaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
BinaryArithOp = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
CompareExpr = IDENTIFIER CmpOp IDENTIFIER
              | IDENTIFIER CmpOp ConstantExpr
              | ConstantExpr CmpOp IDENTIFIER
              | ConstantExpr CmpOpRestricted IDENTIFIER CmpOpRestricted ConstantExpr;
CmpOpRestricted = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
CmpOp = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
MatchOp = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
JsonArrayOps = JsonDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> JsonExpr | JsonArray <span class="hljs-string">&quot;)&quot;</span>;
JsonArrayDefs = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
JsonExpr =  Constant | ConstantArray | STRING | BOOLEAN;
JsonArray = <span class="hljs-string">&quot;[&quot;</span> JsonExpr { <span class="hljs-string">&quot;,&quot;</span> JsonExpr } <span class="hljs-string">&quot;]&quot;</span>;
ArrayOps = ArrayDefs <span class="hljs-string">&quot;(&quot;</span> IDENTIFIER <span class="hljs-string">&quot;,&quot;</span> ArrayExpr | Array <span class="hljs-string">&quot;)&quot;</span>;
ArrayDefs = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
ArrayExpr =  Constant | ConstantArray | STRING | BOOLEAN;
Array = <span class="hljs-string">&quot;[&quot;</span> ArrayExpr { <span class="hljs-string">&quot;,&quot;</span> ArrayExpr } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Tabel berikut mencantumkan deskripsi setiap simbol yang disebutkan dalam aturan ekspresi Boolean di atas.</p>
<table>
<thead>
<tr><th>Notasi</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>Definisi</td></tr>
<tr><td>,</td><td>Penggabungan.</td></tr>
<tr><td>;</td><td>Pengakhiran.</td></tr>
<tr><td>|</td><td>Pergantian.</td></tr>
<tr><td>{...}</td><td>Pengulangan.</td></tr>
<tr><td>(...)</td><td>Pengelompokan.</td></tr>
<tr><td>NIHIL</td><td>Kosong. Ekspresi dapat berupa string kosong.</td></tr>
<tr><td>INTEGER</td><td>Bilangan bulat seperti 1, 2, 3.</td></tr>
<tr><td>FLOAT</td><td>Bilangan mengambang seperti 1.0, 2.0.</td></tr>
<tr><td>CONST</td><td>Bilangan bulat atau angka mengambang.</td></tr>
<tr><td>IDENTIFIER</td><td>Pengenal. Dalam Milvus, IDENTIFIER mewakili nama field.</td></tr>
<tr><td>LogicalOp</td><td>LogicalOp adalah operator logika yang mendukung penggabungan lebih dari satu operasi relasional dalam satu perbandingan. Nilai yang dikembalikan dari LogicalOp adalah TRUE (1) atau FALSE (0). Ada dua jenis LogicalOps, termasuk BinaryLogicalOps dan UnaryLogicalOps.</td></tr>
<tr><td>UnaryLogicalOp</td><td>UnaryLogicalOp mengacu pada operator logis unary "tidak".</td></tr>
<tr><td>BinaryLogicalOp</td><td>Operator logika biner yang melakukan tindakan pada dua operan. Dalam ekspresi kompleks dengan dua atau lebih operand, urutan evaluasi tergantung pada aturan prioritas.</td></tr>
<tr><td>ArithmeticOp</td><td>ArithmeticOp, yaitu operator aritmatika, melakukan operasi matematika seperti penjumlahan dan pengurangan pada operan.</td></tr>
<tr><td>UnaryArithOp</td><td>UnaryArithOp adalah operator aritmatika yang melakukan operasi pada satu operan. UnaryArithOp negatif mengubah ekspresi positif menjadi negatif, atau sebaliknya.</td></tr>
<tr><td>BinaryArithOp</td><td>BinaryArithOp, yaitu operator biner, melakukan operasi pada dua operan. Dalam sebuah ekspresi kompleks dengan dua atau lebih operand, urutan evaluasi tergantung pada aturan prioritas.</td></tr>
<tr><td>CmpOp</td><td>CmpOp adalah operator relasional yang melakukan tindakan pada dua operan.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted dibatasi pada "Kurang dari" dan "Sama dengan".</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr dapat berupa Constant atau BinaryArithOp pada dua ConstExpr atau UnaryArithOp pada satu ConstantExpr. Ini didefinisikan secara rekursif.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray dibungkus dengan tanda kurung siku, dan ConstantExpr dapat diulang dalam tanda kurung siku. ConstArray harus menyertakan setidaknya satu ConstantExpr.</td></tr>
<tr><td>TermExpr</td><td>TermExpr digunakan untuk memeriksa apakah nilai IDENTIFIER muncul dalam ConstantArray. TermExpr diwakili oleh "in".</td></tr>
<tr><td>CompareExpr</td><td>Sebuah CompareExpr, yaitu ekspresi perbandingan dapat berupa operasi relasional pada dua IDENTIFIER, atau operasi relasional pada satu IDENTIFIER dan satu ConstantExpr, atau operasi terner pada dua ConstantExpr dan satu IDENTIFIER.</td></tr>
<tr><td>SingleExpr</td><td>SingleExpr, yaitu ekspresi tunggal, dapat berupa TermExpr atau CompareExpr.</td></tr>
<tr><td>LogicalExpr</td><td>Sebuah LogicalExpr dapat berupa BinaryLogicalOp pada dua LogicalExpr, atau UnaryLogicalOp pada sebuah LogicalExpr tunggal, atau LogicalExpr yang dikelompokkan di dalam tanda kurung, atau SingleExpr. LogicalExpr didefinisikan secara rekursif.</td></tr>
<tr><td>Expr</td><td>Expr, singkatan yang berarti ekspresi, dapat berupa LogicalExpr atau NIL.</td></tr>
<tr><td>MatchOp</td><td>MatchOp, yaitu operator pencocokan, membandingkan sebuah string dengan konstanta string atau awalan string, infiks, atau konstanta akhiran.</td></tr>
<tr><td>JsonArrayOp</td><td>JsonOp, yaitu operator JSON, memeriksa apakah pengenal yang ditentukan berisi elemen yang ditentukan.</td></tr>
<tr><td>ArrayOp</td><td>ArrayOp, yaitu operator larik, memeriksa apakah pengenal yang ditentukan berisi elemen yang ditentukan.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">Operator<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">Operator logika<button data-href="#Logical-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Operator logika melakukan perbandingan antara dua ekspresi.</p>
<table>
<thead>
<tr><th>Simbol</th><th>Operasi</th><th>Contoh</th><th>Keterangan</th></tr>
</thead>
<tbody>
<tr><td>'dan' &amp;&amp;</td><td>dan</td><td>expr1 &amp;&amp; expr2</td><td>Benar jika expr1 dan expr2 bernilai benar.</td></tr>
<tr><td>'atau' ||</td><td>atau</td><td>expr1 || expr2</td><td>Benar jika salah satu dari expr1 atau expr2 benar.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">Operator aritmatika biner<button data-href="#Binary-arithmetic-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Operator aritmatika biner berisi dua operan dan dapat melakukan operasi aritmatika dasar dan mengembalikan hasil yang sesuai.</p>
<table>
<thead>
<tr><th>Simbol</th><th>Operasi</th><th>Contoh</th><th>Keterangan</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>Penjumlahan</td><td>a + b</td><td>Menjumlahkan dua operan.</td></tr>
<tr><td>-</td><td>Pengurangan</td><td>a - b</td><td>Mengurangkan operan kedua dari operan pertama.</td></tr>
<tr><td>*</td><td>Perkalian</td><td>a * b</td><td>Mengalikan dua operan.</td></tr>
<tr><td>/</td><td>Pembagian</td><td>a / b</td><td>Membagi operan pertama dengan operan kedua.</td></tr>
<tr><td>**</td><td>Kekuatan</td><td>a ** b</td><td>Menaikkan operan pertama ke pangkat operan kedua.</td></tr>
<tr><td>%</td><td>Modulo</td><td>a % b</td><td>Membagi operan pertama dengan operan kedua dan menghasilkan bagian sisanya.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">Operator relasional<button data-href="#Relational-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Operator relasional menggunakan simbol untuk memeriksa kesetaraan, ketidaksetaraan, atau urutan relatif antara dua ekspresi.</p>
<table>
<thead>
<tr><th>Simbol</th><th>Operasi</th><th>Contoh</th><th>Keterangan</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>Kurang dari</td><td>a &lt; b</td><td>Benar jika a kurang dari b.</td></tr>
<tr><td>&gt;</td><td>Lebih besar dari</td><td>a &gt; b</td><td>Benar jika a lebih besar dari b.</td></tr>
<tr><td>==</td><td>Sama</td><td>a == b</td><td>Benar jika a sama dengan b.</td></tr>
<tr><td>!=</td><td>Tidak sama</td><td>a != b</td><td>Benar jika a tidak sama dengan b.</td></tr>
<tr><td>&lt;=</td><td>Kurang dari atau sama dengan</td><td>a &lt;= b</td><td>Benar jika a kurang dari atau sama dengan b.</td></tr>
<tr><td>&gt;=</td><td>Lebih besar dari atau sama dengan</td><td>a &gt;= b</td><td>Benar jika a lebih besar dari atau sama dengan b.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">Prioritas dan keterkaitan operator<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan prioritas dan keterkaitan operator. Operator dicantumkan dari atas ke bawah, dengan prioritas menurun.</p>
<table>
<thead>
<tr><th>Prioritas</th><th>Operator</th><th>Deskripsi</th><th>Keterkaitan</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>Kiri ke kanan</td></tr>
<tr><td>2</td><td>tidak</td><td>UnaryLogicOp</td><td>Kanan-ke-kiri</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>6</td><td>&lt; <= > &gt;=</td><td>CmpOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>8</td><td>seperti LIKE</td><td>MatchOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>11</td><td>json_berisi_apa saja JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>12</td><td>panjang_larik ARRAY_LENGTH</td><td>ArrayOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>13</td><td>&amp;&amp; dan</td><td>BinaryLogicOp</td><td>Kiri-ke-kanan</td></tr>
<tr><td>14</td><td>|| atau</td><td>BinaryLogicOp</td><td>Kiri-ke-kanan</td></tr>
</tbody>
</table>
<p>Ekspresi biasanya dievaluasi dari kiri ke kanan. Ekspresi kompleks dievaluasi satu per satu. Urutan evaluasi ekspresi ditentukan oleh prioritas operator yang digunakan.</p>
<p>Jika ekspresi berisi dua atau lebih operator dengan prioritas yang sama, operator di sebelah kiri dievaluasi terlebih dahulu.</p>
<div class="alert note">
<p>Sebagai contoh, 10/2 * 5 akan dievaluasi sebagai (10/2) dan hasilnya dikalikan dengan 5.</p>
</div>
<p>Ketika operasi dengan prioritas yang lebih rendah harus diproses terlebih dahulu, operasi tersebut harus diapit oleh tanda kurung.</p>
<div class="alert note">
<p>Misalnya, 30 / 2 + 8. Ini biasanya dievaluasi sebagai 30 dibagi dengan 2 kemudian 8 ditambahkan ke hasilnya. Jika Anda ingin membagi dengan 2 + 8, ini harus ditulis sebagai 30 / (2 + 8).</p>
</div>
<p>Tanda kurung dapat ditempatkan di dalam ekspresi. Ekspresi tanda kurung paling dalam akan dievaluasi terlebih dahulu.</p>
<h2 id="Usage" class="common-anchor-header">Penggunaan<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh-contoh dari semua penggunaan ekspresi boolean yang tersedia di Milvus adalah sebagai berikut (<code translate="no">int64</code> mewakili bidang skalar yang berisi data bertipe INT64, <code translate="no">float</code> mewakili bidang skalar yang berisi data bertipe floating-point, dan <code translate="no">VARCHAR</code> mewakili bidang skalar yang berisi data bertipe VARCHAR):</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-operator">&gt;</span> &quot;str1&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp dan tanda kurung</li>
</ol>
<pre><code translate="no">&quot;(int64 &gt; <span class="hljs-number">0</span> &amp;&amp; int64 &lt; <span class="hljs-number">400</span>) or (int64 &gt; <span class="hljs-number">500</span> &amp;&amp; int64 &lt; <span class="hljs-number">1000</span>)&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr dan UnaryLogicOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">VARCHAR not in <span class="hljs-selector-attr">[<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp, dan CmpOp (pada bidang yang berbeda)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp dan CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp dan UnaryArithOp atau BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>MatchOp</li>
</ol>
<pre><code translate="no"><span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;prefix%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%suffix&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;%middle%&quot;
<span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">like</span> &quot;_suffix&quot;
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p>Jika ekspresi JSON dari pernyataan <code translate="no">JSON_CONTAINS</code> (argumen kedua) adalah sebuah daftar, pengenal (argumen pertama) harus berupa daftar. Jika tidak, pernyataan tersebut akan selalu bernilai False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p>Ekspresi JSON dalam pernyataan <code translate="no">JSON_CONTAINS_ALL</code> harus selalu berupa daftar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p>Ekspresi JSON dalam pernyataan <code translate="no">JSON_CONTAINS_ANY</code> harus selalu berupa daftar. Jika tidak, maka akan berlaku sama seperti <code translate="no">JSON_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>ArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p>Jika ekspresi array dari pernyataan <code translate="no">ARRAY_CONTAINS</code> (argumen kedua) adalah daftar, pengenal (argumen pertama) harus berupa daftar. Jika tidak, pernyataan tersebut akan selalu bernilai False.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p>Ekspresi larik dalam pernyataan <code translate="no">ARRAY_CONTAINS_ALL</code> harus selalu berupa daftar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p>Ekspresi larik dalam pernyataan <code translate="no">ARRAY_CONTAINS_ANY</code> harus selalu berupa daftar. Jika tidak, maka akan berlaku sama seperti <code translate="no">ARRAY_CONTAINS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>Memeriksa jumlah elemen dalam sebuah larik.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
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
    </button></h2><p>Sekarang Anda sudah mengetahui bagaimana cara kerja bitset di Milvus, Anda mungkin juga ingin melakukannya:</p>
<ul>
<li>Mempelajari bagaimana melakukan <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a>.</li>
<li>Mempelajari cara <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">menggunakan string untuk memfilter</a> hasil pencarian Anda.</li>
<li>Mempelajari cara <a href="/docs/id/enable-dynamic-field.md">menggunakan bidang dinamis dalam membangun ekspresi boolean</a>.</li>
</ul>
