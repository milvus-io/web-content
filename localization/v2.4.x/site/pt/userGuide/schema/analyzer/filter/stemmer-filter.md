---
id: stemmer-filter.md
title: Filtro Stemmer
summary: >-
  O filtro `stemmer` reduz as palavras à sua forma básica ou raiz (conhecida
  como stemming), facilitando a correspondência de palavras com significados
  semelhantes em diferentes inflexões.
---
<h1 id="Stemmer​" class="common-anchor-header">Formador de caule<button data-href="#Stemmer​" class="anchor-icon" translate="no">
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
    </button></h1><p>O filtro <code translate="no">stemmer</code> reduz as palavras à sua forma básica ou raiz (conhecida como stemming), facilitando a correspondência de palavras com significados semelhantes em diferentes inflexões. O filtro <code translate="no">stemmer</code> suporta várias línguas, permitindo uma pesquisa e indexação eficazes em vários contextos linguísticos.</p>
<h2 id="Configuration​" class="common-anchor-header">Configuração<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>O filtro <code translate="no">stemmer</code> é um filtro personalizado no Milvus. Para o utilizar, especifique <code translate="no">&quot;type&quot;: &quot;stemmer&quot;</code> na configuração do filtro, juntamente com um parâmetro <code translate="no">language</code> para selecionar o idioma pretendido para o stemming.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>:[{​
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>, <span class="hljs-comment"># Specifies the filter type as stemmer​</span>
        <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>, <span class="hljs-comment"># Sets the language for stemming to English​</span>
    }],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>O filtro <code translate="no">stemmer</code> aceita os seguintes parâmetros configuráveis.</p>
<table data-block-token="CnsXd9Ej7ozbQixt3lzcMqoanUf"><thead><tr><th data-block-token="ASZldv4hso4KpYxws1LcIE6fnSb" colspan="1" rowspan="1"><p data-block-token="FgIodsPFMoIlfDxk0GLcnf6Cn3c">Parâmetro</p>
</th><th data-block-token="UwUpdXmE2oaLOjxYKpac4U4enUb" colspan="1" rowspan="1"><p data-block-token="S3g4d2pl3o1QfOxDrrCc0bHwn6l">Descrição</p>
</th></tr></thead><tbody><tr><td data-block-token="Qlg7d56pCo2leCxk3rkcZswhngb" colspan="1" rowspan="1"><p data-block-token="V7Ajd2RyToVjNTxbGEEcVHdYnxb"><code translate="no">language</code></p>
</td><td data-block-token="NTbNd7XeuoBsfsxzQ1Kc0jKonKb" colspan="1" rowspan="1"><p data-block-token="J4nPdCcSToFTGYx6Huhc7kpqnRd">Especifica o idioma para o processo de stemming. Os idiomas suportados incluem: <code translate="no">"arabic"</code>, <code translate="no">"danish"</code>, <code translate="no">"dutch"</code>, <code translate="no">"english"</code>, <code translate="no">"finnish"</code>, <code translate="no">"french"</code>, <code translate="no">"german"</code>, <code translate="no">"greek"</code>, <code translate="no">"hungarian"</code>, <code translate="no">"italian"</code>, <code translate="no">"norwegian"</code>, <code translate="no">"portuguese"</code>, <code translate="no">"romanian"</code>, <code translate="no">"russian"</code>, <code translate="no">"spanish"</code>, <code translate="no">"swedish"</code>, <code translate="no">"tamil"</code>, <code translate="no">"turkish"</code></p>
</td></tr></tbody></table>
<p>O filtro <code translate="no">stemmer</code> opera nos termos gerados pelo tokenizador, por isso deve ser usado em combinação com um tokenizador.</p>
<p>Depois de definir <code translate="no">analyzer_params</code>, pode aplicá-los a um campo <code translate="no">VARCHAR</code> ao definir um esquema de coleção. Isto permite que o Milvus processe o texto nesse campo utilizando o analisador especificado para uma tokenização e filtragem eficientes. Para mais pormenores, consulte <a href="/docs/pt/analyzer-overview.md#Example-use">Exemplo de utilização</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Exemplo de saída<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>Aqui está um exemplo de como o filtro <code translate="no">stemmer</code> processa o texto.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;running runs looked ran runner&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Saída esperada</strong> (com <code translate="no">language: &quot;english&quot;</code>).</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;look&quot;</span>, <span class="hljs-string">&quot;ran&quot;</span>, <span class="hljs-string">&quot;runner&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
