---
id: english-analyzer.md
title: Analizador de inglés
related_key: 'english, analyzer'
summary: >-
  El analizador `english` de Milvus está diseñado para procesar texto en inglés,
  aplicando reglas específicas del idioma para la tokenización y el filtrado.
---
<h1 id="English​" class="common-anchor-header">Inglés<button data-href="#English​" class="anchor-icon" translate="no">
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
    </button></h1><p>El analizador <code translate="no">english</code> de Milvus está diseñado para procesar texto en inglés, aplicando reglas específicas del idioma para la tokenización y el filtrado.</p>
<h3 id="Definition​" class="common-anchor-header">Definición</h3><p>El analizador <code translate="no">english</code> utiliza los siguientes componentes.</p>
<ul>
<li><p><strong>Tokenizador</strong>: Utiliza el <a href="/docs/es/standard-tokenizer.md"><code translate="no">standard tokenizer</code></a> para dividir el texto en unidades discretas de palabras.</p></li>
<li><p>Filtros: Incluye varios filtros para el tratamiento exhaustivo del texto.</p>
<ul>
<li><p><a href="/docs/es/lowercase-filter.md"><code translate="no">lowercase</code></a>: Convierte todos los tokens a minúsculas, lo que permite realizar búsquedas sin distinguir mayúsculas de minúsculas.</p></li>
<li><p><a href="/docs/es/stemmer-filter.md"><code translate="no">stemmer</code></a>: Reduce las palabras a su raíz para permitir una búsqueda más amplia (por ejemplo, "correr" se convierte en "correr").</p></li>
<li><p><a href="/docs/es/stop-filter.md"><code translate="no">stop_words</code></a>: Elimina las palabras de parada comunes en inglés para centrarse en los términos clave del texto.</p></li>
</ul></li>
</ul>
<p>La funcionalidad del analizador <code translate="no">english</code> es equivalente a la siguiente configuración personalizada del analizador.</p>
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
<h3 id="Configuration​" class="common-anchor-header">Configuración</h3><p>Para aplicar el analizador <code translate="no">english</code> a un campo, basta con configurar <code translate="no">type</code> en <code translate="no">english</code> en <code translate="no">analyzer_params</code>, e incluir los parámetros opcionales que sean necesarios.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<p>El analizador <code translate="no">english</code> acepta los siguientes parámetros opcionales: </p>
<table data-block-token="YMmUdQtabozHZnxC09QcajU0nvd"><thead><tr><th data-block-token="N1Qfdbd9Vok7mkx0OGpcx49cnUM" colspan="1" rowspan="1"><p data-block-token="PxYUdGyrMoa4x5x3sCpcF7JLn1e">Parámetro</p>
</th><th data-block-token="WIQKdcE3coxEirxwmpucXGuin7f" colspan="1" rowspan="1"><p data-block-token="VAHCdZFTkoeSJNxgPmicGnOZnWh">Descripción</p>
</th></tr></thead><tbody><tr><td data-block-token="NzThd1pxQoektPxhqrQc7Oxcnhl" colspan="1" rowspan="1"><p data-block-token="SW6SdE2iyohhGaxQIfpcjZfCnBx"><code translate="no">stop_words</code></p>
</td><td data-block-token="KSAbdmKPCowsR7x7UO8c8ngFnnh" colspan="1" rowspan="1"><p data-block-token="F3E1dFjL3oUrl5xWq3ucpVPon7c">Matriz que contiene una lista de palabras vacías que se eliminarán de la tokenización. El valor predeterminado es <code translate="no">_english_</code>, un conjunto integrado de palabras reservadas comunes en inglés.</p>
</td></tr></tbody></table>
<p>Ejemplo de configuración con palabras reservadas personalizadas.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>,​
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;the&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<p>Después de definir <code translate="no">analyzer_params</code>, puede aplicarlas a un campo <code translate="no">VARCHAR</code> al definir un esquema de recopilación. Esto permite a Milvus procesar el texto en ese campo utilizando el analizador especificado para una tokenización y filtrado eficientes. Para más detalles, consulte <a href="/docs/es/analyzer-overview.md#Example-use">Ejemplo de uso</a>.</p>
<h3 id="Example-output​" class="common-anchor-header">Ejemplo de salida</h3><p>A continuación se muestra cómo procesa el texto el analizador <code translate="no">english</code>.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Salida esperada</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;databas&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
