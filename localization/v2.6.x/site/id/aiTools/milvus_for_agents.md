---
id: milvus_for_agents.md
title: Milvus untuk Agen AI
summary: >-
  Pelajari bagaimana agen AI dapat menggunakan Milvus sebagai basis data vektor
  untuk RAG, pencarian semantik, dan memori jangka panjang.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus untuk Agen AI<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menyediakan antarmuka ramah agen yang memungkinkan agen pengkodean AI dan sistem agen otonom untuk berinteraksi dengan basis data vektor secara terprogram. Baik Anda membangun pipeline RAG, pencarian semantik, atau sistem memori agen, Milvus menawarkan banyak cara bagi agen untuk terhubung dan beroperasi.</p>
<h2 id="Agent-tools" class="common-anchor-header">Alat agen<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Keterampilan Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Keterampilan agen untuk Claude Code yang mengajarkan LLM untuk menggunakan PyMilvus untuk operasi basis data vektor.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Server MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Server Model Context Protocol yang memungkinkan agen yang kompatibel dengan MCP berinteraksi dengan Milvus secara langsung.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Server MCP yang dirancang untuk Claude Code, menyediakan akses dokumentasi Milvus yang sesuai dengan konteks.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/id/integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Kerangka Kerja Agen</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Integrasi dengan LangChain, LlamaIndex, OpenAI Agents, dan kerangka kerja orkestrasi agen lainnya.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Perintah AI<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Prompt yang dikurasi yang membantu asisten pengkodean AI menulis kode Milvus yang benar. Setiap prompt mengkodekan aturan dan pola yang mencegah kesalahan yang paling umum.</p>
<p><strong>Cara menggunakan:</strong></p>
<ol>
<li><strong>Salin</strong> prompt dari bagian "Prompt lengkap" pada halaman prompt mana pun.</li>
<li><strong>Simpan</strong> ke file yang diharapkan oleh alat AI Anda (lihat <a href="#use-in-different-environments">tabel lingkungan</a> di bawah).</li>
<li>Asisten AI Anda akan secara otomatis menerapkan aturan ketika menghasilkan atau meninjau kode Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Halaman prompt<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/id/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Aturan tingkat atas untuk agen pengkodean AI. Mulai di sini jika Anda hanya menginginkan satu file.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/id/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Pola koneksi yang benar, penggunaan MilvusClient, dan larangan API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/id/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Desain Skema</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Tipe field, kunci utama, keabadian skema, dan konfigurasi BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/id/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Pola Pencarian</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Pencarian ANN, hibrida, dan teks lengkap dengan aturan batasan kritis.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/id/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Pemilihan Indeks</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Pohon keputusan untuk AUTOINDEX, HNSW, DiskANN, dan IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/id/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Alur pengambilan end-to-end - aliran generasi yang ditingkatkan dengan Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Digunakan di lingkungan yang berbeda<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Lingkungan</th><th>Tempat meletakkan prompt</th><th>Petunjuk</th></tr>
</thead>
<tbody>
<tr><td>Kursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Mengonfigurasi aturan proyek</a></td></tr>
<tr><td>Kopilot GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Instruksi khusus</a></td></tr>
<tr><td>Kode Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Dokumen Kode Claude</a></td></tr>
<tr><td>IDE JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Menyesuaikan pedoman</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Codelab CLI Gemini</a></td></tr>
<tr><td>Kode VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Mengkonfigurasi .instructions.md</a></td></tr>
<tr><td>Selancar angin</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Mengkonfigurasi guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Penerapan yang disarankan untuk agen<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Memilih penerapan Milvus yang tepat tergantung pada tahap pengembangan Anda.</p>
<table>
<thead>
<tr><th>Tahap</th><th>Penerapan</th><th>Mengapa</th></tr>
</thead>
<tbody>
<tr><td>Pembuatan prototipe</td><td><a href="/docs/id/milvus_lite.md">Milvus Lite</a></td><td>Tanpa konfigurasi, dalam proses. Berjalan di mana pun Python berjalan - ideal untuk pembuatan prototipe agen yang cepat.</td></tr>
<tr><td>Pengembangan</td><td><a href="/docs/id/install_standalone-docker.md">Milvus Standalone</a></td><td>Penyebaran Docker satu node. Baik untuk pengembangan dan pengujian lokal dengan volume data yang realistis.</td></tr>
<tr><td>Produksi</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Milvus yang dikelola sepenuhnya tanpa server. Tidak ada infrastruktur yang perlu dikelola - agen hanya perlu terhubung dan beroperasi.</td></tr>
<tr><td>Produksi yang dihosting sendiri</td><td><a href="/docs/id/install_cluster-helm.md">Milvus Terdistribusi</a></td><td>Penerapan Kubernetes multi-node untuk tim yang membutuhkan kontrol penuh atas infrastruktur mereka.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Untuk beban kerja agen, <strong>Zilliz Cloud</strong> direkomendasikan untuk penggunaan produksi. Agen biasanya tidak mengelola infrastruktur, sehingga penerapan tanpa server menghilangkan biaya operasional dan menyediakan penskalaan otomatis.</p>
</div>
<h2 id="Quick-connection-examples" class="common-anchor-header">Contoh koneksi cepat<button data-href="#Quick-connection-examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Sambungkan ke Milvus dari kode agen Anda:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite (local, zero-config)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_agent.db&quot;</span>)

<span class="hljs-comment"># Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Zilliz Cloud</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_URI&quot;</span>,
    token=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_TOKEN&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><a href="/docs/id/quickstart.md">Mulai Cepat</a> - Jalankan pencarian Milvus pertama Anda dalam hitungan menit.</li>
<li><a href="/docs/id/integrations_overview.md">Integrasi Kerangka Kerja Agen</a> - Hubungkan Milvus dengan LangChain, LlamaIndex, Agen OpenAI, dan banyak lagi.</li>
</ul>
