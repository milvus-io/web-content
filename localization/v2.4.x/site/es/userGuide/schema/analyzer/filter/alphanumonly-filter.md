---
id: alphanumonly-filter.md
title: Filtro alfanumérico
summary: >-
  El filtro `alphanumonly` elimina los tokens que contienen caracteres no ASCII,
  manteniendo sólo los términos alfanuméricos. Este filtro es útil para procesar
  texto en el que sólo son relevantes las letras y números básicos, excluyendo
  cualquier carácter especial o símbolo.
---
<h1 id="Alphanumonly​" class="common-anchor-header">Sólo alfanuméricos<button data-href="#Alphanumonly​" class="anchor-icon" translate="no">
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
    </button></h1><p>El filtro <code translate="no">alphanumonly</code> elimina los tokens que contienen caracteres no ASCII, manteniendo sólo los términos alfanuméricos. Este filtro es útil para procesar texto en el que sólo son relevantes las letras y números básicos, excluyendo cualquier carácter especial o símbolo.</p>
<h2 id="Configuration​" class="common-anchor-header">Configuración<button data-href="#Configuration​" class="anchor-icon" translate="no">
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
    </button></h2><p>El filtro <code translate="no">alphanumonly</code> está integrado en Milvus. Para utilizarlo, basta con especificar su nombre en la sección <code translate="no">filter</code> dentro de <code translate="no">analyzer_params</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;alphanumonly&quot;</span>],​
}​
<button class="copy-code-btn"></button></code></pre>
<p>El filtro <code translate="no">alphanumonly</code> funciona con los términos generados por el tokenizador, por lo que debe utilizarse en combinación con un tokenizador.</p>
<p>Después de definir <code translate="no">analyzer_params</code>, puede aplicarlos a un campo <code translate="no">VARCHAR</code> al definir un esquema de colección. Esto permite a Milvus procesar el texto de ese campo utilizando el analizador especificado para una tokenización y filtrado eficientes. Para más detalles, consulte <a href="/docs/es/analyzer-overview.md#Example-use">Ejemplo de uso</a>.</p>
<h2 id="Example-output​" class="common-anchor-header">Ejemplo de salida<button data-href="#Example-output​" class="anchor-icon" translate="no">
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
    </button></h2><p>A continuación se muestra un ejemplo de cómo procesa el texto el filtro <code translate="no">alphanumonly</code>.</p>
<p><strong>Texto original</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;Milvus 2.0 @ Scale! #AI #Vector_Databasé&quot;</span>​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Salida esperada</strong>.</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;Milvus&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>, <span class="hljs-string">&quot;AI&quot;</span>, <span class="hljs-string">&quot;Vector&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
