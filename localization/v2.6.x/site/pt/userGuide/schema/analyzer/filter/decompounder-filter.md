---
id: decompounder-filter.md
title: Descompactador
summary: >-
  O filtro decompounder divide as palavras compostas em componentes individuais
  com base num dicionário especificado, facilitando a pesquisa de partes de
  termos compostos. Este filtro é particularmente útil para línguas que utilizam
  frequentemente palavras compostas, como o alemão.
---
<h1 id="Decompounder" class="common-anchor-header">Descompactador<button data-href="#Decompounder" class="anchor-icon" translate="no">
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
    </button></h1><p>O filtro <code translate="no">decompounder</code> divide as palavras compostas em componentes individuais com base num dicionário especificado, facilitando a pesquisa de partes de termos compostos. Este filtro é particularmente útil para línguas que utilizam frequentemente palavras compostas, como o alemão.</p>
<h2 id="Configuration" class="common-anchor-header">Configuração<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>O filtro <code translate="no">decompounder</code> é um filtro personalizado no Milvus. Para o utilizar, especifique <code translate="no">&quot;type&quot;: &quot;decompounder&quot;</code> na configuração do filtro, juntamente com um parâmetro <code translate="no">word_list</code> que fornece o dicionário de componentes de palavras a reconhecer.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment">// Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<p>O filtro <code translate="no">decompounder</code> aceita os seguintes parâmetros configuráveis.</p>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">word_list</code></p></td>
     <td><p>Uma lista de componentes de palavras usadas para dividir termos compostos. Este dicionário determina como as palavras compostas são decompostas em termos individuais.</p></td>
   </tr>
</table>
<p>O filtro <code translate="no">decompounder</code> opera nos termos gerados pelo tokenizador, portanto deve ser usado em combinação com um tokenizador. Para obter uma lista de tokenizadores disponíveis no Milvus, consulte <a href="/docs/pt/standard-tokenizer.md">Tokenizador padrão</a> e suas páginas irmãs.</p>
<p>Depois de definir <code translate="no">analyzer_params</code>, pode aplicá-los a um campo <code translate="no">VARCHAR</code> ao definir um esquema de coleção. Isso permite que o Milvus processe o texto nesse campo usando o analisador especificado para uma tokenização e filtragem eficientes. Para obter detalhes, consulte <a href="/docs/pt/analyzer-overview.md#Example-use">Exemplo de uso</a>.</p>
<h2 id="Examples" class="common-anchor-header">Exemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de aplicar a configuração do analisador ao seu esquema de coleção, verifique o seu comportamento utilizando o método <code translate="no">run_analyzer</code>.</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Configuração do analisador</h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>:[{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;decompounder&quot;</span>, <span class="hljs-comment"># Specifies the filter type as decompounder</span>
        <span class="hljs-string">&quot;word_list&quot;</span>: [<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>],
    }],
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;tokenizer&quot;</span>, <span class="hljs-string">&quot;standard&quot;</span>);
analyzerParams.put(<span class="hljs-string">&quot;filter&quot;</span>,
        Collections.singletonList(
                <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;String, Object&gt;() {{
                    put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;decompounder&quot;</span>);
                    put(<span class="hljs-string">&quot;word_list&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>));
                }}
        )
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: []any{<span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
        <span class="hljs-string">&quot;type&quot;</span>:       <span class="hljs-string">&quot;decompounder&quot;</span>,
        <span class="hljs-string">&quot;word_list&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;dampf&quot;</span>, <span class="hljs-string">&quot;schiff&quot;</span>, <span class="hljs-string">&quot;fahrt&quot;</span>, <span class="hljs-string">&quot;brot&quot;</span>, <span class="hljs-string">&quot;backen&quot;</span>, <span class="hljs-string">&quot;automat&quot;</span>},
    }}}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
analyzerParams=<span class="hljs-string">&#x27;{
  &quot;tokenizer&quot;: &quot;standard&quot;,
  &quot;filter&quot;: [
    {
      &quot;type&quot;: &quot;decompounder&quot;,
      &quot;word_list&quot;: [
        &quot;dampf&quot;,
        &quot;schiff&quot;,
        &quot;fahrt&quot;,
        &quot;brot&quot;,
        &quot;backen&quot;,
        &quot;automat&quot;
      ]
    }
  ]
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer--Milvus-2511+" class="common-anchor-header">Verificação usando <code translate="no">run_analyzer</code><span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;dampfschifffahrt brotbackautomat&quot;</span>

<span class="hljs-comment"># Run the standard analyzer with the defined configuration</span>
result = MilvusClient.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// javascript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Saída esperada</h3><pre><code translate="no" class="language-python">[<span class="hljs-string">&#x27;dampf&#x27;</span>, <span class="hljs-string">&#x27;schiff&#x27;</span>, <span class="hljs-string">&#x27;fahrt&#x27;</span>, <span class="hljs-string">&#x27;brotbackautomat&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
