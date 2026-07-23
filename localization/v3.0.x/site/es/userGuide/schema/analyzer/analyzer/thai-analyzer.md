---
id: thai-analyzer.md
title: TailandésCompatible with Milvus 3.0.0+
summary: >-
  El analizador de tailandés integrado divide el texto tailandés en palabras,
  normaliza los dígitos decimales Unicode y elimina las palabras vacías
  tailandesas.
beta: Milvus 3.0.0+
---
<h1 id="Thai" class="common-anchor-header">Tailandés<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#Thai" class="anchor-icon" translate="no">
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
    </button></h1><p>El analizador « <code translate="no">thai</code> » es un analizador integrado para texto tailandés. Utiliza este analizador cuando necesites que Milvus segmente el texto tailandés en palabras, normalice los dígitos tailandeses, convierta a minúsculas el texto mixto en alfabeto latino y elimine las palabras vacías tailandesas.</p>
<h2 id="Configuration" class="common-anchor-header">Configuración<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Los analizadores integrados son plantillas de analizadores proporcionadas por Milvus. Para utilizar un analizador integrado, configura <code translate="no">type</code> con un nombre de analizador predefinido en <code translate="no">analyzer_params</code>.</p>
<p>Para utilizar el analizador tailandés integrado, establezca <code translate="no">type</code> en <code translate="no">thai</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>El analizador <code translate="no">thai</code> admite el siguiente parámetro opcional:</p>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Tipo</p></th>
     <th><p>Valor por defecto</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">stop_words</code></p></td>
     <td><p><code translate="no">list[str]</code></p></td>
     <td><p><code translate="no">_thai_</code></p></td>
     <td><p>Una lista de palabras vacías adicionales que se deben eliminar de la tokenización. Por defecto, el analizador « <code translate="no">thai</code> » utiliza el diccionario integrado « <code translate="no">_thai_</code> ». Para consultar el diccionario por defecto, véase la <a href="https://github.com/milvus-io/milvus/blob/1945ba399b4552fd0fd0b131f7c735ddde21e71c/internal/core/thirdparty/tantivy/tantivy-binding/src/analyzer/filter/stop_words/thai.txt">lista de palabras vacías tailandesas</a> de Milvus. La lista procede del <a href="https://github.com/apache/lucene/blob/main/lucene/analysis/common/src/resources/org/apache/lucene/analysis/th/stopwords.txt">archivo de palabras vacías tailandesas</a> de Apache Lucene.</p></td>
   </tr>
</table>
<p>Para añadir palabras vacías personalizadas, incluye <code translate="no">stop_words</code>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;มิลวัส&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<p>Milvus aplica palabras vacías personalizadas además del diccionario integrado « <code translate="no">_thai_</code> ».</p>
<p>El analizador integrado « <code translate="no">thai</code> » es equivalente a la siguiente configuración de analizador personalizado:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        <span class="hljs-string">&quot;decimaldigit&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_thai_&quot;</span>],
        },
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>Este analizador aplica los siguientes pasos de procesamiento:</p>
<ul>
<li><strong>Tokenización</strong>: utiliza el <a href="/docs/es/thai-tokenizer.md"><code translate="no">thai</code></a> tokenizador para segmentar el texto tailandés en tokens de palabras sin basarse en los espacios en blanco. El tokenizador filtra los espacios en blanco y los segmentos que solo contienen signos de puntuación.</li>
<li><strong>Normalización de mayúsculas y minúsculas</strong>: utiliza el filtro « <code translate="no">lowercase</code> », que afecta a las letras latinas en textos mixtos de tailandés e inglés.</li>
<li><strong>Normalización de dígitos</strong>: utiliza el filtro « <code translate="no">decimaldigit</code> » para convertir los dígitos tailandeses y otros dígitos decimales Unicode a dígitos ASCII.</li>
<li><strong>Eliminación de palabras vacías</strong>: utiliza el filtro « <code translate="no">stop</code> » con el diccionario integrado « <code translate="no">_thai_</code> ».</li>
<li><strong>Sin derivación</strong>: el analizador integrado « <code translate="no">thai</code> » no aplica el filtro « <code translate="no">stemmer</code> ».</li>
</ul>
<p>Una vez definido « <code translate="no">analyzer_params</code> », puede aplicar el analizador a un campo « <code translate="no">VARCHAR</code> » al definir un esquema de colección. Para obtener más detalles, consulte <a href="/docs/es/analyzer-overview.md#Example-use">«Ejemplo de uso</a>».</p>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de aplicar la configuración del analizador a su esquema de colección, compruebe su comportamiento utilizando el método « <code translate="no">run_analyzer</code> ».</p>
<h3 id="Analyzer-configuration" class="common-anchor-header">Configuración del analizador<button data-href="#Analyzer-configuration" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;thai&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Verification-using-runanalyzer" class="common-anchor-header">Verificación mediante <code translate="no">run_analyzer</code><button data-href="#Verification-using-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sample_text = <span class="hljs-string">&quot;ฉันรักการค้นหาข้อความใน Milvus ๑๒๓&quot;</span>

result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Expected-output" class="common-anchor-header">Resultado esperado<button data-href="#Expected-output" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no"><span class="hljs-selector-attr">[<span class="hljs-string">&#x27;ฉัน&#x27;</span>, <span class="hljs-string">&#x27;รัก&#x27;</span>, <span class="hljs-string">&#x27;ค้นหา&#x27;</span>, <span class="hljs-string">&#x27;ข้อความ&#x27;</span>, <span class="hljs-string">&#x27;milvus&#x27;</span>, <span class="hljs-string">&#x27;123&#x27;</span>]</span>
<button class="copy-code-btn"></button></code></pre>
