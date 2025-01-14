---
id: integrate_with_dspy.md
summary: >-
  Panduan ini mendemonstrasikan cara menggunakan MilvusRM, salah satu modul
  retriever DSPy, untuk mengoptimalkan program RAG.
title: Mengintegrasikan Milvus dengan DSPy
---
<h1 id="Integrate-Milvus-with-DSPy" class="common-anchor-header">Mengintegrasikan Milvus dengan DSPy<button data-href="#Integrate-Milvus-with-DSPy" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="What-is-DSPy" class="common-anchor-header">Apa itu DSPy<button data-href="#What-is-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy, yang diperkenalkan oleh Stanford NLP Group, merupakan kerangka kerja terobosan yang dirancang untuk mengoptimalkan permintaan dan bobot dalam model bahasa, terutama yang sangat berguna dalam skenario di mana model bahasa besar (LLM) diintegrasikan di berbagai tahap pipeline. Tidak seperti teknik rekayasa prompting konvensional yang bergantung pada pembuatan dan penyesuaian manual, DSPy mengadopsi pendekatan berbasis pembelajaran. Dengan mengasimilasi contoh-contoh pertanyaan-jawaban, DSPy menghasilkan prompt yang dioptimalkan secara dinamis, disesuaikan dengan tugas-tugas tertentu. Metodologi inovatif ini memungkinkan pemasangan kembali seluruh pipeline tanpa hambatan, sehingga tidak perlu lagi melakukan penyesuaian prompt secara manual. Sintaks Python DSPy menawarkan berbagai modul yang dapat dikomposisikan dan deklaratif, menyederhanakan instruksi LLM.</p>
<h2 id="Benefits-of-using-DSPy" class="common-anchor-header">Manfaat menggunakan DSPy<button data-href="#Benefits-of-using-DSPy" class="anchor-icon" translate="no">
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
<li>Pendekatan Pemrograman: DSPy menyediakan pendekatan pemrograman sistematis untuk pengembangan pipeline LM dengan mengabstraksikan pipeline sebagai grafik transformasi teks, bukan hanya memerintahkan LLM. Modul deklaratifnya memungkinkan desain dan pengoptimalan terstruktur, menggantikan metode coba-coba pada templat prompt tradisional.</li>
<li>Peningkatan Kinerja: DSPy menunjukkan peningkatan kinerja yang signifikan dibandingkan metode yang ada. Melalui studi kasus, DSPy mengungguli prompt standar dan demonstrasi yang dibuat oleh para ahli, menunjukkan keserbagunaan dan keefektifannya bahkan ketika dikompilasi ke model LM yang lebih kecil.</li>
<li>Abstraksi termodulasi: DSPy secara efektif mengabstraksikan aspek-aspek rumit dari pengembangan pipeline LM, seperti dekomposisi, fine-tuning, dan pemilihan model. Dengan DSPy, program yang ringkas dapat diterjemahkan dengan mulus ke dalam instruksi untuk berbagai model, seperti GPT-4, Llama2-13b, atau T5-base, sehingga merampingkan pengembangan dan meningkatkan kinerja.</li>
</ul>
<h2 id="Modules" class="common-anchor-header">Modul<button data-href="#Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada banyak komponen yang berkontribusi dalam membangun pipeline LLM. Di sini, kami akan menjelaskan beberapa komponen utama untuk memberikan pemahaman tingkat tinggi tentang cara kerja DSPy.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dspy-01.png" alt="DSPy Modules" class="doc-image" id="dspy-modules" />
   </span> <span class="img-wrapper"> <span>Modul DSPy</span> </span></p>
<p>Tanda tangan: Signature dalam DSPy berfungsi sebagai spesifikasi deklaratif, yang menguraikan perilaku input/output modul, memandu model bahasa dalam eksekusi tugas. Modul: Modul DSPy berfungsi sebagai komponen fundamental untuk program yang memanfaatkan model bahasa (LM). Modul ini mengabstraksikan berbagai teknik prompt, seperti rantai pemikiran atau ReAct, dan dapat beradaptasi untuk menangani DSPy Signature apa pun. Dengan parameter yang dapat dipelajari dan kemampuan untuk memproses input dan menghasilkan output, modul-modul ini dapat dikombinasikan untuk membentuk program yang lebih besar, mengambil inspirasi dari modul NN di PyTorch tetapi disesuaikan untuk aplikasi LM. Pengoptimal: Pengoptimal dalam DSPy menyempurnakan parameter program DSPy, seperti petunjuk dan bobot LLM, untuk memaksimalkan metrik yang ditentukan seperti akurasi, meningkatkan efisiensi program.</p>
<h2 id="Why-Milvus-in-DSPy" class="common-anchor-header">Mengapa Milvus di DSPy<button data-href="#Why-Milvus-in-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy adalah kerangka kerja pemrograman yang kuat yang meningkatkan aplikasi RAG. Aplikasi tersebut perlu mengambil informasi yang berguna untuk meningkatkan kualitas jawaban, yang membutuhkan basis data vektor. Milvus adalah basis data vektor sumber terbuka yang terkenal untuk meningkatkan kinerja dan skalabilitas. Dengan MilvusRM, sebuah modul retriever di DSPy, mengintegrasikan Milvus menjadi sangat mudah. Sekarang, pengembang dapat dengan mudah mendefinisikan dan mengoptimalkan program RAG menggunakan DSPy, dengan memanfaatkan kemampuan pencarian vektor yang kuat dari Milvus. Kolaborasi ini membuat aplikasi RAG menjadi lebih efisien dan terukur, menggabungkan kemampuan pemrograman DSPy dengan fitur pencarian Milvus.</p>
<h2 id="Examples" class="common-anchor-header">Contoh<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang, mari kita lihat contoh singkat untuk mendemonstrasikan cara memanfaatkan Milvus dalam DSPy untuk mengoptimalkan aplikasi RAG.</p>
<h3 id="Prerequisites" class="common-anchor-header">Prasyarat</h3><p>Sebelum membuat aplikasi RAG, instal DSPy dan PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;dspy-ai[milvus]&quot;</span>
$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Jika Anda menggunakan Google Colab, untuk mengaktifkan dependensi yang baru saja diinstal, Anda mungkin perlu **memulai ulang runtime** (Klik menu "Runtime" di bagian atas layar, dan pilih "Restart session" dari menu tarik-turun).</div>
<h3 id="Loading-the-dataset" class="common-anchor-header">Memuat dataset</h3><p>Dalam contoh ini, kita menggunakan HotPotQA, sebuah kumpulan pasangan pertanyaan-jawaban yang kompleks, sebagai kumpulan data latihan. Kita dapat memuatnya melalui kelas HotPotQA.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

<span class="hljs-comment"># Load the dataset.</span>
dataset = HotPotQA(
    train_seed=<span class="hljs-number">1</span>, train_size=<span class="hljs-number">20</span>, eval_seed=<span class="hljs-number">2023</span>, dev_size=<span class="hljs-number">50</span>, test_size=<span class="hljs-number">0</span>
)

<span class="hljs-comment"># Tell DSPy that the &#x27;question&#x27; field is the input. Any other fields are labels and/or metadata.</span>
trainset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.train]
devset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.dev]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Ingest-data-into-the-Milvus-vector-database" class="common-anchor-header">Memasukkan data ke dalam basis data vektor Milvus</h3><p>Masukkan informasi konteks ke dalam koleksi Milvus untuk pengambilan vektor. Koleksi ini harus memiliki bidang <code translate="no">embedding</code> dan bidang <code translate="no">text</code>. Kami menggunakan model <code translate="no">text-embedding-3-small</code> dari OpenAI sebagai fungsi penyematan kueri default dalam kasus ini.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>
MILVUS_URI = <span class="hljs-string">&quot;example.db&quot;</span>
MILVUS_TOKEN = <span class="hljs-string">&quot;&quot;</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection
<span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> openai_embedding_function

client = MilvusClient(uri=MILVUS_URI, token=MILVUS_TOKEN)

<span class="hljs-keyword">if</span> <span class="hljs-string">&quot;dspy_example&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> client.list_collections():
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,
        dimension=<span class="hljs-number">1536</span>,
        primary_field_name=<span class="hljs-string">&quot;id&quot;</span>,
        vector_field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_type=<span class="hljs-string">&quot;int&quot;</span>,
        metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
        max_length=<span class="hljs-number">65535</span>,
        enable_dynamic=<span class="hljs-literal">True</span>,
    )
text = requests.get(
    <span class="hljs-string">&quot;https://raw.githubusercontent.com/wxywb/dspy_dataset_sample/master/sample_data.txt&quot;</span>
).text

<span class="hljs-keyword">for</span> idx, passage <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(text.split(<span class="hljs-string">&quot;\n&quot;</span>)):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(passage) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">continue</span>
    client.insert(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        data=[
            {
                <span class="hljs-string">&quot;id&quot;</span>: idx,
                <span class="hljs-string">&quot;embedding&quot;</span>: openai_embedding_function(passage)[<span class="hljs-number">0</span>],
                <span class="hljs-string">&quot;text&quot;</span>: passage,
            }
        ],
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-MilvusRM" class="common-anchor-header">Mendefinisikan MilvusRM.</h3><p>Sekarang, Anda perlu mendefinisikan MilvusRM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> MilvusRM
<span class="hljs-keyword">import</span> dspy

retriever_model = MilvusRM(
    collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
    uri=MILVUS_URI,
    token=MILVUS_TOKEN,  <span class="hljs-comment"># ignore this if no token is required for Milvus connection</span>
    embedding_function=openai_embedding_function,
)
turbo = dspy.OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
dspy.settings.configure(lm=turbo)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Building-signatures" class="common-anchor-header">Membangun tanda tangan</h3><p>Setelah kita memuat data, mari kita mulai mendefinisikan tanda tangan untuk sub-tugas pipeline kita. Kita dapat mengidentifikasi masukan sederhana kita <code translate="no">question</code> dan keluaran <code translate="no">answer</code>, tetapi karena kita sedang membangun pipeline RAG, kita akan mengambil informasi kontekstual dari Milvus. Jadi mari kita definisikan tanda tangan kita sebagai <code translate="no">context, question --&gt; answer</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenerateAnswer</span>(dspy.Signature):
    <span class="hljs-string">&quot;&quot;&quot;Answer questions with short factoid answers.&quot;&quot;&quot;</span>

    context = dspy.InputField(desc=<span class="hljs-string">&quot;may contain relevant facts&quot;</span>)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=<span class="hljs-string">&quot;often between 1 and 5 words&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Kami menyertakan deskripsi singkat untuk bidang <code translate="no">context</code> dan <code translate="no">answer</code> untuk mendefinisikan panduan yang lebih jelas tentang apa yang akan diterima dan dihasilkan oleh model.</p>
<h3 id="Building-the-pipeline" class="common-anchor-header">Membangun pipeline</h3><p>Sekarang, mari kita mendefinisikan pipeline RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>(dspy.Module):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rm</span>):
        <span class="hljs-built_in">super</span>().__init__()
        <span class="hljs-variable language_">self</span>.retrieve = rm

        <span class="hljs-comment"># This signature indicates the task imposed on the COT module.</span>
        <span class="hljs-variable language_">self</span>.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self, question</span>):
        <span class="hljs-comment"># Use milvus_rm to retrieve context for the question.</span>
        context = <span class="hljs-variable language_">self</span>.retrieve(question).passages
        <span class="hljs-comment"># COT module takes &quot;context, query&quot; and output &quot;answer&quot;.</span>
        prediction = <span class="hljs-variable language_">self</span>.generate_answer(context=context, question=question)
        <span class="hljs-keyword">return</span> dspy.Prediction(
            context=[item.long_text <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> context], answer=prediction.answer
        )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Executing-the-pipeline-and-getting-the-results" class="common-anchor-header">Menjalankan pipeline dan mendapatkan hasilnya</h3><p>Sekarang, kita telah membuat pipeline RAG ini. Mari kita coba dan dapatkan hasilnya.</p>
<pre><code translate="no" class="language-python">rag = RAG(retriever_model)
<span class="hljs-built_in">print</span>(rag(<span class="hljs-string">&quot;who write At My Window&quot;</span>).answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Townes Van Zandt
</code></pre>
<p>Kita dapat mengevaluasi hasil kuantitatif pada dataset.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.evaluate.evaluate <span class="hljs-keyword">import</span> Evaluate
<span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

evaluate_on_hotpotqa = Evaluate(
    devset=devset, num_threads=<span class="hljs-number">1</span>, display_progress=<span class="hljs-literal">False</span>, display_table=<span class="hljs-number">5</span>
)

metric = dspy.evaluate.answer_exact_match
score = evaluate_on_hotpotqa(rag, metric=metric)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optimizing-the-pipeline" class="common-anchor-header">Mengoptimalkan pipeline</h3><p>Setelah mendefinisikan program ini, langkah selanjutnya adalah kompilasi. Proses ini memperbarui parameter dalam setiap modul untuk meningkatkan kinerja. Proses kompilasi bergantung pada tiga faktor penting:</p>
<ul>
<li>Training Set: Kami akan menggunakan 20 contoh pertanyaan-jawaban dari kumpulan data pelatihan kami untuk demonstrasi ini.</li>
<li>Metrik Validasi: Kami akan membuat metrik sederhana <code translate="no">validate_context_and_answer</code>. Metrik ini memverifikasi keakuratan jawaban yang diprediksi dan memastikan bahwa konteks yang diambil mencakup jawabannya.</li>
<li>Pengoptimal Khusus (Teleprompter): Kompiler DSPy menggabungkan beberapa teleprompter yang dirancang untuk mengoptimalkan program Anda secara efektif.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.teleprompt <span class="hljs-keyword">import</span> BootstrapFewShot

<span class="hljs-comment"># Validation logic: check that the predicted answer is correct.# Also check that the retrieved context does contain that answer.</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">validate_context_and_answer</span>(<span class="hljs-params">example, pred, trace=<span class="hljs-literal">None</span></span>):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    <span class="hljs-keyword">return</span> answer_EM <span class="hljs-keyword">and</span> answer_PM


<span class="hljs-comment"># Set up a basic teleprompter, which will compile our RAG program.</span>
teleprompter = BootstrapFewShot(metric=validate_context_and_answer)

<span class="hljs-comment"># Compile!</span>
compiled_rag = teleprompter.<span class="hljs-built_in">compile</span>(rag, trainset=trainset)

<span class="hljs-comment"># Now compiled_rag is optimized and ready to answer your new question!</span>
<span class="hljs-comment"># Now, let’s evaluate the compiled RAG program.</span>
score = evaluate_on_hotpotqa(compiled_rag, metric=metric)
<span class="hljs-built_in">print</span>(score)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;compile_rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<p>Skor Ragas telah meningkat dari nilai sebelumnya 50.0 menjadi 52.0, yang menunjukkan peningkatan kualitas jawaban.</p>
<h2 id="Summary" class="common-anchor-header">Ringkasan<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy menandai lompatan dalam interaksi model bahasa melalui antarmuka yang dapat diprogram, yang memfasilitasi pengoptimalan algoritmik dan otomatis dari permintaan dan bobot model. Dengan memanfaatkan DSPy untuk implementasi RAG, kemampuan beradaptasi terhadap berbagai model bahasa atau kumpulan data menjadi mudah, secara drastis mengurangi kebutuhan akan intervensi manual yang membosankan.</p>
