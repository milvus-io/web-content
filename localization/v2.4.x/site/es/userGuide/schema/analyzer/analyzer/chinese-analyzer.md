---
id: chinese-analyzer.md
title: Analizador chino
related_key: 'chinese, analyzer'
summary: >-
  El analizador `chinese` está diseñado específicamente para tratar texto chino
  y ofrece una segmentación y tokenización eficaces.
---
<h1 id="Chinese​" class="common-anchor-header">Chino<button data-href="#Chinese​" class="anchor-icon" translate="no">
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
    </button></h1><p>El analizador <code translate="no">chinese</code> se ha diseñado específicamente para tratar texto chino, proporcionando una segmentación y tokenización eficaces.</p>
<h3 id="Definition​" class="common-anchor-header">Definición</h3><p>El analizador <code translate="no">chinese</code> consta de</p>
<ul>
<li><p><strong>Tokenizador</strong>: Utiliza el tokenizador <code translate="no">jieba</code> para segmentar el texto chino en tokens basados en el vocabulario y el contexto. Para más información, consulte <a href="/docs/es/jieba-tokenizer.md">Jieba</a>.</p></li>
<li><p><strong>Filtro</strong>: Utiliza el filtro <code translate="no">cnalphanumonly</code> para eliminar los tokens que contienen caracteres no chinos. Para más información, consulte <a href="/docs/es/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
</ul>
<p>La funcionalidad del analizador <code translate="no">chinese</code> es equivalente a la siguiente configuración personalizada del analizador.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]​
}​
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuration​" class="common-anchor-header">Configuración</h3><p>Para aplicar el analizador <code translate="no">chinese</code> a un campo, basta con establecer <code translate="no">type</code> en <code translate="no">chinese</code> en <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>El analizador <code translate="no">chinese</code> no acepta ningún parámetro opcional.</p>
</div>
<h3 id="Example-output​" class="common-anchor-header">Ejemplo de salida</h3><p>A continuación se muestra cómo procesa el texto el analizador <code translate="no">chinese</code>.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 是一个高性能、可扩展的向量数据库！&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Salida esperada</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;是&quot;</span>, <span class="hljs-string">&quot;一个&quot;</span>, <span class="hljs-string">&quot;高性&quot;</span>, <span class="hljs-string">&quot;性能&quot;</span>, <span class="hljs-string">&quot;高性能&quot;</span>, <span class="hljs-string">&quot;可&quot;</span>, <span class="hljs-string">&quot;扩展&quot;</span>, <span class="hljs-string">&quot;的&quot;</span>, <span class="hljs-string">&quot;向量&quot;</span>, <span class="hljs-string">&quot;数据&quot;</span>, <span class="hljs-string">&quot;据库&quot;</span>, <span class="hljs-string">&quot;数据库&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
