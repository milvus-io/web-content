---
id: english-analyzer.md
title: Analisador de inglês
related_key: 'english, analyzer'
summary: >-
  O analisador `english` do Milvus foi concebido para processar texto em inglês,
  aplicando regras específicas da língua para tokenização e filtragem.
---
<h1 id="English​" class="common-anchor-header">Inglês<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>O analisador <code translate="no">english</code> do Milvus foi concebido para processar texto em inglês, aplicando regras específicas da língua para tokenização e filtragem.</p>
<h3 id="Definition​" class="common-anchor-header">Definição</h3><p>O analisador <code translate="no">english</code> utiliza os seguintes componentes.</p>
<ul>
<li><p><strong>Tokenizador</strong>: Usa o <a href="/docs/pt/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> para dividir o texto em unidades discretas de palavras.</p></li>
<li><p>Filtros: Inclui vários filtros para um processamento de texto abrangente.</p>
<ul>
<li><p><a href="/docs/pt/lowercase-filter.md"><code translate="no">lowercase</code></a>: Converte todos os tokens para minúsculas, permitindo pesquisas sem distinção entre maiúsculas e minúsculas.</p></li>
<li><p><a href="/docs/pt/stemmer-filter.md"><code translate="no">stemmer</code></a>: Reduz as palavras à sua forma de raiz para suportar uma correspondência mais ampla (por exemplo, "running" torna-se "run").</p></li>
<li><p><a href="/docs/pt/stop-filter.md"><code translate="no">stop_words</code></a>: Remove palavras de paragem comuns em inglês para se concentrar em termos-chave no texto.</p></li>
</ul></li>
</ul>
<p>A funcionalidade do analisador <code translate="no">english</code> é equivalente à seguinte configuração de analisador personalizado.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,​
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
        }，{​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: <span class="hljs-string">&quot;_english_&quot;</span>,​
        }​
    ]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Configuração</h3><p>Para aplicar o analisador <code translate="no">english</code> a um campo, basta definir <code translate="no">type</code> para <code translate="no">english</code> em <code translate="no">analyzer_params</code>, e incluir parâmetros opcionais conforme necessário.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>O analisador <code translate="no">english</code> aceita os seguintes parâmetros opcionais: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parâmetro</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Uma matriz que contém uma lista de palavras de paragem, que serão removidas da tokenização. A predefinição é <code translate="no">_english_</code>, um conjunto incorporado de palavras de paragem comuns em inglês.</p>
</td></tr></tbody></table>
<p>Exemplo de configuração com palavras de paragem personalizadas.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Depois de definir <code translate="no">analyzer_params</code>, pode aplicá-las a um campo <code translate="no">VARCHAR</code> ao definir um esquema de coleção. Isto permite que o Milvus processe o texto nesse campo utilizando o analisador especificado para uma tokenização e filtragem eficientes. Para mais pormenores, consulte <a href="/docs/pt/analyzer-overview.md#Example-use">Exemplo de utilização</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Exemplo de saída</h3><p>Veja como o analisador <code translate="no">english</code> processa o texto.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Saída esperada</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
