---
id: llama_stack_with_milvus.md
title: Buat RAG dengan Llama Stack dengan Milvus
related_key: Llama Stack
summary: >-
  Tutorial ini memperkenalkan cara membuat Llama Stack Server yang dikonfigurasi
  dengan Milvus, yang memungkinkan Anda untuk mengimpor data pribadi Anda untuk
  digunakan sebagai basis pengetahuan. Kita kemudian akan melakukan query pada
  server, membuat aplikasi RAG yang lengkap.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Membangun RAG dengan Llama Stack dengan Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> adalah pendekatan yang berorientasi pada layanan dan mengutamakan API untuk membangun aplikasi AI produksi. Llama Stack menyediakan tumpukan universal yang memungkinkan pengembang untuk mengembangkan di mana saja, menerapkan di mana saja, dan memanfaatkan blok bangunan yang siap produksi dengan kemandirian penyedia yang sebenarnya. Llama Stack berfokus pada model Llama Meta, komposabilitas, kesiapan produksi, dan ekosistem kemitraan.</p>
<p>Dalam tutorial ini, kami akan memperkenalkan cara membangun Llama Stack Server yang dikonfigurasi dengan Milvus, yang memungkinkan Anda untuk mengimpor data pribadi Anda untuk digunakan sebagai basis pengetahuan. Kita kemudian akan melakukan kueri pada server, membuat aplikasi RAG yang lengkap.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Mempersiapkan Lingkungan<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada banyak cara untuk memulai server Llama Stack, seperti <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">sebagai perpustakaan</a>, <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">membangun distribusi</a>, dll. Untuk setiap komponen dalam Llama Stack, berbagai penyedia juga dapat dipilih. Oleh karena itu, ada banyak cara untuk meluncurkan server Llama Stack.</p>
<p>Tutorial ini menggunakan konfigurasi berikut sebagai contoh untuk memulai layanan. Jika Anda ingin memulainya dengan cara lain, silakan lihat Memulai <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Server Llama Stack</a>.</p>
<ul>
<li>Kita menggunakan Conda untuk membangun distribusi kustom dengan konfigurasi Milvus.</li>
<li>Kami menggunakan <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> sebagai penyedia LLM.</li>
<li>Kami menggunakan <code translate="no">all-MiniLM-L6-v2</code> default sebagai model penyematan.</li>
</ul>
<div class="alert note">
<p>Tutorial ini terutama mengacu pada panduan instalasi resmi dari <a href="https://llama-stack.readthedocs.io/en/latest/index.html">dokumentasi Llama Stack</a>. Jika Anda menemukan bagian yang sudah ketinggalan zaman dalam tutorial ini, Anda dapat memprioritaskan untuk mengikuti panduan resmi dan membuat masalah untuk kami.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Memulai Llama Stack Server<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Menyiapkan Lingkungan</h3><p>Karena kita perlu menggunakan Together AI sebagai layanan LLM, pertama-tama kita harus masuk ke situs web resminya untuk mengajukan permohonan <a href="https://api.together.xyz/settings/api-keys">API key</a> dan menetapkan API key <code translate="no">TOGETHER_API_KEY</code> sebagai variabel lingkungan.</p>
<p>Kloning kode sumber Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Buat lingkungan conda dan instal dependensi</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Ubah konten di <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, ubah bagian vector_io ke konfigurasi Milvus yang relevan. Sebagai contoh, tambahkan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vector_io:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">provider_id:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">provider_type:</span> <span class="hljs-string">inline::milvus</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">db_path:</span> <span class="hljs-string">~/.llama/distributions/together/milvus_store.db</span>

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Di Llama Stack, Milvus dapat dikonfigurasi dengan dua cara: konfigurasi lokal, yaitu <code translate="no">inline::milvus</code>, dan konfigurasi jarak jauh, yaitu <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>Metode yang paling sederhana adalah konfigurasi lokal, yang membutuhkan pengaturan <code translate="no">db_path</code>, jalur untuk menyimpan file <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a> secara lokal.</p></li>
<li><p>Konfigurasi jarak jauh cocok untuk penyimpanan data yang besar.</p>
<ul>
<li>Jika Anda memiliki data dalam jumlah besar, Anda dapat menyiapkan server Milvus yang berkinerja baik pada <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>. Dalam pengaturan ini, silakan gunakan URI server, misalnya, <code translate="no">http://localhost:19530</code>, sebagai <code translate="no">uri</code>. <code translate="no">token</code> default adalah <code translate="no">root:Milvus</code>.</li>
<li>Jika Anda ingin menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan kunci API</a> di Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Membangun distribusi dari templat</h3><p>Jalankan perintah berikut untuk membangun distribusi:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-type conda
<button class="copy-code-btn"></button></code></pre>
<p>Sebuah berkas akan dihasilkan di <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. Kemudian, jalankan perintah ini untuk memulai server:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~/.llama/distributions/together/together-run.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Jika semuanya berjalan lancar, Anda akan melihat server Llama Stack berhasil berjalan pada port 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">Melakukan RAG dari klien<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Anda memulai server, Anda dapat menulis kode klien untuk mengaksesnya. Berikut ini adalah contoh kodenya:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan kode ini untuk melakukan kueri RAG. Jika semuanya berjalan dengan baik, hasilnya akan terlihat seperti ini:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI's Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
</code></pre>
