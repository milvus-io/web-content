---
id: lindera-tokenizer.md
title: LinderaCompatible with Milvus 2.5.11+
summary: >-
  Lindera Tokenizer melakukan analisis morfologi berbasis kamus. Ini adalah
  pilihan yang baik untuk bahasa-seperti bahasa Jepang, Korea, dan Cina-yang
  kata-katanya tidak dipisahkan oleh spasi.
beta: Milvus 2.5.11+
---
<h1 id="Lindera" class="common-anchor-header">Lindera<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Lindera" class="anchor-icon" translate="no">
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
    </button></h1><p>Tokenizer <code translate="no">lindera</code> melakukan analisis morfologi berbasis kamus. Ini adalah pilihan yang baik untuk bahasa-seperti bahasa Jepang, Korea, dan Cina-yang kata-katanya tidak dipisahkan oleh spasi.</p>
<div class="alert note">
<p>Tokenizer <code translate="no">lindera</code> mempertahankan tanda baca sebagai token terpisah dalam output. Misalnya, <code translate="no">&quot;こんにちは！&quot;</code> menjadi <code translate="no">[&quot;こんにちは&quot;, &quot;！&quot;]</code>. Untuk menghapus token tanda baca yang berdiri sendiri ini, gunakan filter <a href="/docs/id/removepunct-filter.md"><code translate="no">removepunct</code></a> filter.</p>
</div>
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
    </button></h2><p>Untuk menggunakan tokenizer <code translate="no">lindera</code>, Anda harus menggunakan versi Milvus yang dikompilasi secara khusus. Semua kamus harus diaktifkan secara eksplisit selama kompilasi agar dapat digunakan.</p>
<p>Untuk mengaktifkan kamus tertentu, sertakan kamus tersebut dalam perintah kompilasi:</p>
<pre><code translate="no"><span class="hljs-built_in">make</span> milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ko-dic
<button class="copy-code-btn"></button></code></pre>
<p>Daftar lengkap kamus yang tersedia adalah: <code translate="no">lindera-ipadic</code>, <code translate="no">lindera-ipadic-neologd</code>, <code translate="no">lindera-unidic</code>, <code translate="no">lindera-ko-dic</code>, <code translate="no">lindera-cc-cedict</code>.</p>
<p>Sebagai contoh, untuk mengaktifkan semua kamus:</p>
<pre><code translate="no"><span class="hljs-built_in">make</span> milvus TANTIVY_FEATURES=lindera-ipadic,lindera-ipadic-neologd,lindera-unidic,lindera-ko-dic,lindera-cc-cedict
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configuration" class="common-anchor-header">Konfigurasi<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk mengonfigurasi penganalisis menggunakan <code translate="no">lindera</code> tokenizer, setel <code translate="no">tokenizer.type</code> ke <code translate="no">lindera</code> dan pilih kamus dengan <code translate="no">dict_kind</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
      <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
                    put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>);
                }});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>, <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">type</code></p></td>
     <td><p>Jenis tokenizer. Ini ditetapkan ke <code translate="no">"lindera"</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dict_kind</code></p></td>
     <td><p>Kamus yang digunakan untuk mendefinisikan kosakata. Nilai yang mungkin:</p>
<ul>
<li><p><code translate="no">ko-dic</code>: Bahasa Korea - Kamus morfologi bahasa Korea<a href="https://bitbucket.org/eunjeon/mecab-ko-dic">(MeCab Ko-dic</a>)</p></li>
<li><p><code translate="no">ipadic</code>: Bahasa Jepang - Kamus morfologi standar<a href="https://taku910.github.io/mecab/">(MeCab IPADIC</a>)</p></li>
<li><p><code translate="no">ipadic-neologd</code>: Bahasa Jepang dengan kamus neologisme (diperluas) - Mencakup kata-kata baru dan kata benda yang tepat<a href="https://github.com/neologd/mecab-ipadic-neologd">(IPADIC NEologd</a>)</p></li>
<li><p><code translate="no">unidic</code>: Bahasa Jepang UniDic (diperluas) - Kamus standar akademis dengan informasi linguistik yang terperinci<a href="https://clrd.ninjal.ac.jp/unidic/">(UniDic</a>)</p></li>
<li><p><code translate="no">cc-cedict</code>: Bahasa Mandarin (tradisional/sederhana) - Kamus bahasa Mandarin-Inggris yang dikelola oleh komunitas<a href="https://cc-cedict.org/wiki/">(CC-CEDICT</a>)</p>
<p><strong>Catatan:</strong> Semua kamus harus diaktifkan selama kompilasi Milvus agar dapat digunakan.</p></li>
</ul></td>
   </tr>
</table>
<p>Setelah mendefinisikan <code translate="no">analyzer_params</code>, Anda dapat menerapkannya ke bidang <code translate="no">VARCHAR</code> ketika mendefinisikan skema koleksi. Hal ini memungkinkan Milvus untuk memproses teks dalam bidang tersebut menggunakan penganalisis yang ditentukan untuk tokenisasi dan pemfilteran yang efisien. Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md#Example-use">Contoh penggunaan</a>.</p>
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
    </button></h2><p>Sebelum menerapkan konfigurasi penganalisis ke skema koleksi Anda, verifikasi perilakunya menggunakan metode <code translate="no">run_analyzer</code>.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Konfigurasi penganalisis</h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
      <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
      <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>,
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;lindera&quot;</span>);
                    put(<span class="hljs-string">&quot;dict_kind&quot;</span>, <span class="hljs-string">&quot;ipadic&quot;</span>);
                }});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>, <span class="hljs-string">&quot;dict_kind&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>}}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer--Milvus-2511+" class="common-anchor-header">Verifikasi menggunakan <code translate="no">run_analyzer</code><span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Standard analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.RunAnalyzerReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.RunAnalyzerResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

List&lt;String&gt; texts = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
texts.add(<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;encoding/json&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

bs, _ := json.Marshal(analyzerParams)
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;東京スカイツリーの最寄り駅はとうきょうスカイツリー駅で&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Keluaran yang diharapkan</h3><pre><code translate="no" class="language-plaintext">{tokens: [&#x27;東京&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;の&#x27;, &#x27;最寄り駅&#x27;, &#x27;は&#x27;, &#x27;とう&#x27;, &#x27;きょう&#x27;, &#x27;スカイ&#x27;, &#x27;ツリー&#x27;, &#x27;駅&#x27;, &#x27;で&#x27;]} 
<button class="copy-code-btn"></button></code></pre>
