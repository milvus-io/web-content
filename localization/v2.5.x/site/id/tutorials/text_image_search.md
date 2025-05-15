---
id: text_image_search.md
summary: >-
  Dalam tutorial ini, kita akan mengeksplorasi cara mengimplementasikan
  pengambilan gambar berbasis teks menggunakan model CLIP (Contrastive
  Language-Image Pretraining) dari OpenAI dan Milvus. Kita akan membuat
  penyematan gambar dengan CLIP, menyimpannya di Milvus, dan melakukan pencarian
  kemiripan yang efisien.
title: Pencarian Teks-ke-Gambar dengan Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Pencarian Teks-ke-Gambar dengan Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian teks-ke-gambar adalah teknologi canggih yang memungkinkan pengguna mencari gambar menggunakan deskripsi teks bahasa alami. Teknologi ini memanfaatkan model multimodal yang telah terlatih untuk mengubah teks dan gambar menjadi sematan dalam ruang semantik bersama, sehingga memungkinkan perbandingan berbasis kemiripan.</p>
<p>Dalam tutorial ini, kita akan mengeksplorasi cara mengimplementasikan pengambilan gambar berbasis teks menggunakan model CLIP (Contrastive Language-Image Pretraining) dari OpenAI dan Milvus. Kita akan membuat penyematan gambar dengan CLIP, menyimpannya di Milvus, dan melakukan pencarian kemiripan yang efisien.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai, pastikan Anda sudah menyiapkan semua paket yang diperlukan dan data contoh.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Instal ketergantungan</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> untuk berinteraksi dengan basis data Milvus</li>
<li><strong>clip</strong> untuk bekerja dengan model CLIP</li>
<li><strong>pillow</strong> untuk pemrosesan gambar dan visualisasi</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda menggunakan Google Colab, Anda mungkin perlu <strong>memulai ulang runtime</strong> (Arahkan ke menu "Runtime" di bagian atas antarmuka, dan pilih "Restart session" dari menu tarik-turun).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Mengunduh data contoh</h3><p>Kami akan menggunakan subset dari dataset <a href="https://www.image-net.org">ImageNet</a> (100 kelas, 10 gambar untuk setiap kelas) sebagai gambar contoh. Perintah berikut ini akan mengunduh data contoh dan mengekstraknya ke folder lokal <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Menyiapkan Milvus</h3><p>Sebelum melanjutkan, siapkan server Milvus Anda dan sambungkan dengan menggunakan URI Anda (dan secara opsional, token):</p>
<ul>
<li><p><strong>Milvus Lite (Disarankan untuk kenyamanan)</strong>: Atur URI ke berkas lokal, seperti ./milvus.db. Ini secara otomatis memanfaatkan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam satu berkas.</p></li>
<li><p><strong>Docker atau Kubernetes (Untuk Data Berskala Besar)</strong>: Untuk menangani kumpulan data yang lebih besar, gunakan server Milvus yang lebih berkinerja dengan menggunakan <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>. Dalam hal ini, gunakan URI server, seperti http://localhost:19530, untuk terhubung.</p></li>
<li><p><strong>Zilliz Cloud (Layanan Terkelola)</strong>: Jika Anda menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud terkelola Milvus, tetapkan Public Endpoint sebagai URI dan API Key sebagai token.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Memulai<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang setelah Anda memiliki dependensi dan data yang diperlukan, saatnya untuk menyiapkan ekstraktor fitur dan mulai bekerja dengan Milvus. Bagian ini akan memandu Anda melalui langkah-langkah penting dalam membangun sistem pencarian teks-ke-gambar. Terakhir, kami akan mendemonstrasikan cara mengambil dan memvisualisasikan gambar berdasarkan kueri teks.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Menentukan ekstraktor fitur</h3><p>Kita akan menggunakan model CLIP yang telah dilatih untuk menghasilkan penyematan gambar dan teks. Pada bagian ini, kita akan memuat varian <strong>ViT-B/32</strong> yang telah dilatih dari CLIP dan mendefinisikan fungsi-fungsi pembantu untuk menyandikan gambar dan teks:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Memproses dan menyandikan gambar menjadi vektor fitur</li>
<li><code translate="no">encode_text(text)</code>: Menyandikan kueri teks menjadi vektor fitur</li>
</ul>
<p>Kedua fungsi tersebut menormalkan fitur keluaran untuk memastikan perbandingan yang konsisten dengan mengubah vektor menjadi satuan panjang, yang sangat penting untuk penghitungan kemiripan kosinus yang akurat.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">Konsumsi Data</h3><p>Untuk mengaktifkan pencarian gambar semantik, pertama-tama kita perlu menghasilkan penyematan untuk semua gambar dan menyimpannya dalam basis data vektor untuk pengindeksan dan pengambilan yang efisien. Bagian ini memberikan panduan langkah demi langkah untuk memasukkan data gambar ke dalam Milvus.</p>
<p><strong>1. Membuat Koleksi Milvus</strong></p>
<p>Sebelum menyimpan penyematan gambar, Anda perlu membuat koleksi Milvus. Kode berikut ini menunjukkan cara membuat koleksi dalam mode penyiapan cepat dengan tipe metrik COSINE default. Koleksi ini mencakup bidang-bidang berikut ini:</p>
<ul>
<li><p><code translate="no">id</code>: Bidang utama dengan ID otomatis diaktifkan.</p></li>
<li><p><code translate="no">vector</code>: Bidang untuk menyimpan penyematan vektor floating-point.</p></li>
</ul>
<p>Jika Anda memerlukan skema khusus, lihat <a href="https://milvus.io/docs/create-collection.md">dokumentasi Milvus</a> untuk instruksi terperinci.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Memasukkan Data ke dalam Milvus</strong></p>
<p>Pada langkah ini, kita menggunakan penyandi gambar yang sudah ditentukan untuk menghasilkan penyematan untuk semua gambar JPEG dalam direktori data contoh. Embedding ini kemudian dimasukkan ke dalam koleksi Milvus, bersama dengan jalur file yang sesuai. Setiap entri dalam koleksi terdiri dari:</p>
<ul>
<li><strong>Vektor penyematan</strong>: Representasi numerik dari gambar. Disimpan di bidang <code translate="no">vector</code>.</li>
<li><strong>Jalur file</strong>: Lokasi file gambar untuk referensi. Disimpan di bidang <code translate="no">filepath</code> sebagai bidang dinamis.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">Melakukan Pencarian</h3><p>Sekarang, mari kita jalankan pencarian menggunakan contoh kueri teks. Ini akan mengambil gambar yang paling relevan berdasarkan kemiripan semantik dengan deskripsi teks yang diberikan.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Memvisualisasikan hasil:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
