---
id: length-filter.md
title: Panjang
summary: >-
  Filter panjang menghapus token yang tidak memenuhi persyaratan panjang yang
  ditentukan, sehingga Anda dapat mengontrol panjang token yang dipertahankan
  selama pemrosesan teks.
---
<h1 id="Length" class="common-anchor-header">Panjang<button data-href="#Length" class="anchor-icon" translate="no">
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
    </button></h1><p>Filter <code translate="no">length</code> menghapus token yang tidak memenuhi persyaratan panjang yang ditentukan, sehingga Anda dapat mengontrol panjang token yang dipertahankan selama pemrosesan teks.</p>
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
    </button></h2><p>Filter <code translate="no">length</code> adalah filter khusus di Milvus, yang ditentukan dengan mengatur <code translate="no">&quot;type&quot;: &quot;length&quot;</code> dalam konfigurasi filter. Anda dapat mengonfigurasinya sebagai kamus di dalam <code translate="no">analyzer_params</code> untuk menentukan batas panjang.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Specifies the filter type as length</span>
        <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Sets the maximum token length to 10 characters</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
            put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">10</span>);
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">cosnt analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, # <span class="hljs-title class_">Specifies</span> the filter type <span class="hljs-keyword">as</span> length
        <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">10</span>, # <span class="hljs-title class_">Sets</span> the maximum token length to <span class="hljs-number">10</span> characters
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">10</span>,
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;length&quot;,
      &quot;max&quot;: 10
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Filter <code translate="no">length</code> menerima parameter yang dapat dikonfigurasi berikut ini.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Deskripsi</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max</code></p></td>
     <td><p>Menetapkan panjang token maksimum. Token yang lebih panjang dari panjang ini akan dihapus.</p></td>
   </tr>
</table>
<p>Filter <code translate="no">length</code> beroperasi berdasarkan ketentuan yang dihasilkan oleh tokenizer, sehingga harus digunakan bersama dengan tokenizer. Untuk daftar tokenizer yang tersedia di Milvus, lihat <a href="/docs/id/standard-tokenizer.md">Tokenizer Standar</a> dan halaman saudaranya.</p>
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
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Specifies the filter type as length</span>
        <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Sets the maximum token length to 10 characters</span>
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
            put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;length&quot;</span>);
            put(<span class="hljs-string">&quot;max&quot;</span>, <span class="hljs-number">10</span>);
        }}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
        <span class="hljs-string">&quot;max&quot;</span>:  <span class="hljs-number">10</span>,
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer--Milvus-2511+" class="common-anchor-header">Verifikasi menggunakan <code translate="no">run_analyzer</code><span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
)

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The length filter allows control over token length requirements for text processing.&quot;</span>

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
texts.add(<span class="hljs-string">&quot;The length filter allows control over token length requirements for text processing.&quot;</span>);

<span class="hljs-type">RunAnalyzerResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.runAnalyzer(RunAnalyzerReq.builder()
        .texts(texts)
        .analyzerParams(analyzerParams)
        .build());
List&lt;RunAnalyzerResp.AnalyzerResult&gt; results = resp.getResults();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
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
texts := []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;The length filter allows control over token length requirements for text processing.&quot;</span>}
option := milvusclient.NewRunAnalyzerOption(texts).
    WithAnalyzerParams(<span class="hljs-type">string</span>(bs))

result, err := client.RunAnalyzer(ctx, option)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Keluaran yang diharapkan</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;The&#x27;</span>, <span class="hljs-string">&#x27;length&#x27;</span>, <span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-string">&#x27;allows&#x27;</span>, <span class="hljs-string">&#x27;control&#x27;</span>, <span class="hljs-string">&#x27;over&#x27;</span>, <span class="hljs-string">&#x27;token&#x27;</span>, <span class="hljs-string">&#x27;length&#x27;</span>, <span class="hljs-string">&#x27;for&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;processing&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
