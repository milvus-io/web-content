---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  El índice NGRAM de Milvus se construye para acelerar las consultas LIKE en
  campos VARCHAR o rutas JSON específicas dentro de campos JSON. Antes de
  construir el índice, Milvus divide el texto en subcadenas cortas y
  superpuestas de una longitud fija n, conocidas como n-gramas. Por ejemplo, con
  n = 3, la palabra "Milvus" se divide en 3gramas: "Mil", "ilv", "lvu" y "vus".
  Estos n-gramas se almacenan en un índice invertido que relaciona cada gramo
  con el ID del documento en el que aparece. En el momento de la consulta, este
  índice permite a Milvus limitar rápidamente la búsqueda a un pequeño conjunto
  de candidatos, lo que se traduce en una ejecución mucho más rápida de la
  consulta.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice <code translate="no">NGRAM</code> en Milvus se construye para acelerar las consultas <code translate="no">LIKE</code> en campos <code translate="no">VARCHAR</code> o rutas JSON específicas dentro de campos <code translate="no">JSON</code>. Antes de construir el índice, Milvus divide el texto en subcadenas cortas y superpuestas de una longitud fija <em>n</em>, conocidas como <em>n-gramas</em>. Por ejemplo, con <em>n = 3</em>, la palabra <em>"Milvus"</em> se divide en 3gramas: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu</em>" y <em>"vus".</em> Estos n-gramas se almacenan en un índice invertido que relaciona cada gramo con el ID del documento en el que aparece. En el momento de la consulta, este índice permite a Milvus limitar rápidamente la búsqueda a un pequeño conjunto de candidatos, lo que se traduce en una ejecución mucho más rápida de la consulta.</p>
<p>Utilícelo cuando necesite un filtrado rápido mediante prefijos, sufijos, infijos o comodines, por ejemplo:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Para más detalles sobre la sintaxis de las expresiones de filtrado, consulte <a href="/docs/es/basic-operators.md#Range-operators">Operadores básicos</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementa el índice <code translate="no">NGRAM</code> en un proceso de dos fases:</p>
<ol>
<li><p><strong>Construir el índice</strong>: Genera n-gramas para cada documento y construye un índice invertido durante la ingesta.</p></li>
<li><p><strong>Acelerar las consultas</strong>: Utiliza el índice para filtrar un pequeño conjunto de candidatos y, a continuación, verifica las coincidencias exactas.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: Construir el índice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Durante la ingesta de datos, Milvus construye el índice NGRAM realizando dos pasos principales:</p>
<ol>
<li><p><strong>Descomponer el texto en n-gramas</strong>: Milvus desliza una ventana de <em>n</em> por cada cadena del campo de destino y extrae las subcadenas superpuestas, o <em>n-gramas</em>. La longitud de estas subcadenas cae dentro de un rango configurable, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: El n-grama más corto a generar. Esto también define la longitud mínima de la subcadena de consulta que puede beneficiarse del índice.</p></li>
<li><p><code translate="no">max_gram</code>: El n-grama más largo a generar. En el momento de la consulta, también se utiliza como tamaño máximo de ventana al dividir cadenas de consulta largas.</p></li>
</ul>
<p>Por ejemplo, con <code translate="no">min_gram=2</code> y <code translate="no">max_gram=3</code>, la cadena <code translate="no">&quot;AI database&quot;</code> se divide como sigue:</p>
<ul>
<li><strong>2-gramas:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, ...</li>
<li><strong>3-gramas:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Construir índice de ngramas</span> </span></p>
<blockquote>
<p><strong>Nota</strong></p>
<ul>
<li><p>Para un rango <code translate="no">[min_gram, max_gram]</code>, Milvus genera todos los n-gramas para cada longitud entre los dos valores (inclusive).<br>
Ejemplo: con <code translate="no">[2,4]</code> y la palabra <code translate="no">&quot;text&quot;</code>, Milvus genera</p>
<ul>
<li><strong>2-gramas:</strong> <code translate="no">te</code> <code translate="no">ex</code> , <code translate="no">xt</code></li>
<li><strong>3-gramas:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-gramas</strong>: <code translate="no">text</code></li>
</ul></li>
<li><p>La descomposición de N-gramas se basa en caracteres y es independiente del idioma. Por ejemplo, en chino, <code translate="no">&quot;向量数据库&quot;</code> con <code translate="no">min_gram = 2</code> se descompone en: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Los espacios y los signos de puntuación se tratan como caracteres durante la descomposición.</p></li>
<li><p>La descomposición conserva las mayúsculas y minúsculas originales, y las coincidencias distinguen entre mayúsculas y minúsculas. Por ejemplo, <code translate="no">&quot;Database&quot;</code> y <code translate="no">&quot;database&quot;</code> generarán n-gramas diferentes y requerirán la coincidencia exacta de mayúsculas y minúsculas durante las consultas.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Crear un índice invertido</strong>: Se crea un <strong>índice invertido</strong> que asigna cada n-grama generado a una lista de ID de documentos que lo contienen.</p>
<p>Por ejemplo, si el 2-grama <code translate="no">&quot;AI&quot;</code> aparece en documentos con ID 1, 5, 6, 8 y 9, el índice registra <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Este índice se utiliza en el momento de la consulta para limitar rápidamente el ámbito de la búsqueda.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Creación del índice de ngramas 2</span> </span></p>
<div class="alert note">
<p>Un ámbito <code translate="no">[min_gram, max_gram]</code> más amplio crea más gramos y listas de mapeo más grandes. Si la memoria es escasa, considere el modo mmap para listas de contabilización muy grandes. Para más detalles, consulte <a href="/docs/es/mmap.md">Utilizar mmap</a>.</p>
</div>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: Acelerar las consultas<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Cuando se ejecuta un filtro <code translate="no">LIKE</code>, Milvus utiliza el índice NGRAM para acelerar la consulta en los siguientes pasos:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Acelerar consultas</span> </span></p>
<ol>
<li><p><strong>Extraer el término de la consulta:</strong> La subcadena contigua sin comodines se extrae de la expresión <code translate="no">LIKE</code> (por ejemplo, <code translate="no">&quot;%database%&quot;</code> se convierte en <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Descomponer el término de la consulta:</strong> El término de la consulta se descompone en <em>n-gramas</em> en función de su longitud (<code translate="no">L</code>) y de los índices <code translate="no">min_gram</code> y <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Si <code translate="no">L &lt; min_gram</code>, el índice no puede utilizarse y la consulta vuelve a una búsqueda completa.</p></li>
<li><p>Si <code translate="no">min_gram ≤ L ≤ max_gram</code>, todo el término de la consulta se trata como un único n-grama y no es necesaria ninguna otra descomposición.</p></li>
<li><p>Si <code translate="no">L &gt; max_gram</code>, el término de la consulta se descompone en gramos superpuestos utilizando un tamaño de ventana igual a <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Por ejemplo, si <code translate="no">max_gram</code> se fija en <code translate="no">3</code> y el término de la consulta es <code translate="no">&quot;database&quot;</code>, que tiene una longitud de <strong>8</strong>, se descompone en subcadenas de 3 gramos como <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, etc.</p></li>
<li><p><strong>Buscar cada gramo e intersecar</strong>: Milvus busca cada uno de los gramos de la consulta en el índice invertido y luego interseca las listas de ID de documentos resultantes para encontrar un pequeño conjunto de documentos candidatos. Estos candidatos contienen todos los gramos de la consulta.</p></li>
<li><p><strong>Verifica y devuelve los resultados:</strong> El filtro original <code translate="no">LIKE</code> se aplica entonces como comprobación final sólo en el pequeño conjunto de candidatos para encontrar las coincidencias exactas.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Crear un índice NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede crear un índice NGRAM en un campo <code translate="no">VARCHAR</code> o en una ruta específica dentro de un campo <code translate="no">JSON</code>.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Ejemplo 1: Creación en un campo VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Para un campo <code translate="no">VARCHAR</code>, basta con especificar el <code translate="no">field_name</code> y configurar <code translate="no">min_gram</code> y <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuración genera 2-gramas y 3-gramas para cada cadena en <code translate="no">text</code> y los almacena en el índice invertido.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Ejemplo 2: Creación en una ruta JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Para un campo <code translate="no">JSON</code>, además de la configuración de gramos, también debe especificar</p>
<ul>
<li><p><code translate="no">params.json_path</code> - la ruta JSON que apunta al valor que desea indexar.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - debe ser <code translate="no">&quot;varchar&quot;</code> (no distingue mayúsculas de minúsculas), porque la indexación NGRAM opera sobre cadenas.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>En este ejemplo:</p>
<ul>
<li><p>Sólo se indexa el valor en <code translate="no">json_field[&quot;body&quot;]</code>.</p></li>
<li><p>El valor se convierte a <code translate="no">VARCHAR</code> antes de la tokenización n-gram.</p></li>
<li><p>Milvus genera subcadenas de longitud 2 a 4 y las almacena en el índice invertido.</p></li>
</ul>
<p>Para más información sobre cómo indexar un campo JSON, consulte <a href="/docs/es/use-json-fields.md">Campo JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Consultas aceleradas por NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Para que se aplique el índice NGRAM:</p>
<ul>
<li><p>La consulta debe tener como objetivo un campo <code translate="no">VARCHAR</code> (o ruta JSON) que tenga un índice <code translate="no">NGRAM</code>.</p></li>
<li><p>La parte literal del patrón <code translate="no">LIKE</code> debe tener al menos <code translate="no">min_gram</code> caracteres.<em>(Por ejemplo, si el término de consulta más corto que espera es de 2 caracteres, establezca min_gram=2 al crear el índice).</em></p></li>
</ul>
<p>Tipos de consulta admitidos:</p>
<ul>
<li><p><strong>Coincidencia de prefijo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia de sufijo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia infija</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia con comodín</strong></p>
<p>Milvus admite tanto <code translate="no">%</code> (cero o más caracteres) como <code translate="no">_</code> (exactamente un carácter).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Consultas de rutas JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para más información sobre la sintaxis de las expresiones de filtrado, consulte <a href="/docs/es/basic-operators.md">Operadores básicos</a>.</p>
<h2 id="Usage-notes" class="common-anchor-header">Notas de uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipos de campo</strong>: Compatible con los campos <code translate="no">VARCHAR</code> y <code translate="no">JSON</code>. Para JSON, proporcione tanto <code translate="no">params.json_path</code> como <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: La descomposición NGRAM se basa en caracteres y es independiente del idioma, e incluye los espacios en blanco y la puntuación.</p></li>
<li><p><strong>Compromiso espacio-tiempo</strong>: los rangos de gramos más amplios <code translate="no">[min_gram, max_gram]</code> producen más gramos e índices más grandes. Si la memoria es escasa, considere el modo <code translate="no">mmap</code> para listas de contabilización grandes. Para más información, consulte <a href="/docs/es/mmap.md">Uso de mmap</a>.</p></li>
<li><p><strong>Inmutabilidad</strong>: <code translate="no">min_gram</code> y <code translate="no">max_gram</code> no se pueden cambiar in situ: reconstruya el índice para ajustarlos.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Buenas prácticas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Elija min_gram y max_gram para que coincidan con el comportamiento de búsqueda</strong></p>
<ul>
<li><p>Empezar con <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Establezca <code translate="no">min_gram</code> en el literal más corto que espera que escriban los usuarios.</p></li>
<li><p>Establezca <code translate="no">max_gram</code> cerca de la longitud típica de las subcadenas significativas; un <code translate="no">max_gram</code> mayor mejora el filtrado pero aumenta el espacio.</p></li>
</ul></li>
<li><p><strong>Evite los gramos de baja selectividad</strong></p>
<p>Los patrones muy repetitivos (por ejemplo, <code translate="no">&quot;aaaaaa&quot;</code>) proporcionan un filtrado débil y pueden aportar beneficios limitados.</p></li>
<li><p><strong>Normalización coherente</strong></p>
<p>Aplique la misma normalización al texto ingestado y a los literales de consulta (por ejemplo, minúsculas, recorte) si su caso de uso lo requiere.</p></li>
</ul>
