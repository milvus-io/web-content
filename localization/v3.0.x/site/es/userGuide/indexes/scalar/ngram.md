---
id: ngram.md
title: NGRAM
summary: >-
  El índice NGRAM de Milvus acelera las consultas LIKE y los filtros de
  expresiones regulares compatibles en campos VARCHAR o en rutas JSON
  específicas dentro de campos JSON. Antes de crear el índice, Milvus divide el
  texto en subcadenas cortas y superpuestas de una longitud fija n, conocidas
  como n-gramas. En el momento de la consulta, Milvus utiliza estos n-gramas
  para reducir el número de entidades candidatas antes de verificar la condición
  de filtro original.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>El índice « <code translate="no">NGRAM</code> » de Milvus acelera las consultas de tipo « <code translate="no">LIKE</code> » y los filtros de expresiones regulares aplicables a los campos « <code translate="no">VARCHAR</code> » o a rutas JSON específicas dentro de los campos « <code translate="no">JSON</code> ». Antes de crear el índice, Milvus divide el texto en subcadenas cortas y superpuestas de una longitud fija <em>n</em>, conocidas como <em>n-gramas</em>. Por ejemplo, con <em>n = 3</em>, la palabra <em>«Milvus»</em> se divide en 3-gramas: <em>«Mil»</em>, <em>«ilv»</em>, <em>«lvu»</em> y <em>«vus».</em> A continuación, estos n-gramas se almacenan en un índice invertido que asocia cada grama a los ID de los documentos en los que aparece. En el momento de la consulta, este índice permite a Milvus reducir rápidamente la búsqueda a un pequeño conjunto de candidatos antes de verificar la condición de filtro original.</p>
<p>Úsalo cuando necesites un filtrado rápido por prefijo, sufijo, infijo, comodín o expresiones regulares válidas, como por ejemplo:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Para obtener más detalles sobre la sintaxis de las expresiones de filtro « <code translate="no">LIKE</code> » y de expresiones regulares, consulta <a href="/docs/es/pattern-matching.md">«Coincidencia de patrones</a>».</p>
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
    </button></h2><p>Milvus implementa el índice de « <code translate="no">NGRAM</code> » en un proceso de dos fases:</p>
<ol>
<li><p><strong>Creación del índice</strong>: se generan n-gramas para cada documento y se crea un índice invertido durante la ingesta.</p></li>
<li><p><strong>Aceleración de consultas</strong>: utiliza el índice para filtrar hasta obtener un pequeño conjunto de candidatos y, a continuación, verifica las coincidencias exactas.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: Creación del índice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Durante la ingesta de datos, Milvus crea el índice NGRAM siguiendo dos pasos principales:</p>
<ol>
<li><p><strong>Descomposición del texto en n-gramas</strong>: Milvus desplaza una ventana de <em>n</em> a lo largo de cada cadena del campo de destino y extrae las subcadenas superpuestas, o <em>n-gramas</em>. La longitud de estas subcadenas se encuentra dentro de un rango configurable, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: El n-gram más corto que se va a generar. Esto también define la longitud mínima de la subcadena de consulta que puede beneficiarse del índice.</p></li>
<li><p><code translate="no">max_gram</code>: El n-gram más largo que se va a generar. En el momento de la consulta, también se utiliza como tamaño máximo de la ventana al dividir cadenas de consulta largas.</p></li>
</ul>
<p>Por ejemplo, con <code translate="no">min_gram=2</code> y <code translate="no">max_gram=3</code>, la cadena <code translate="no">&quot;AI database&quot;</code> se desglosa de la siguiente manera:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>Crear un índice de n-gramas</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Crear un índice invertido</strong>: se crea un <strong>índice invertido</strong> que asocia cada n-gram generado a una lista de los ID de los documentos que lo contienen.</p>
<p>Por ejemplo, si el 2-gram <code translate="no">&quot;AI&quot;</code> aparece en documentos con los ID 1, 5, 6, 8 y 9, el índice registra <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Este índice se utiliza posteriormente en el momento de la consulta para reducir rápidamente el alcance de la búsqueda.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Crear índice de n-gramas 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
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
    </button></h3><p>Cuando se ejecuta un filtro « <code translate="no">LIKE</code> » o un filtro de expresiones regulares válido, Milvus utiliza el índice NGRAM para acelerar la consulta siguiendo estos pasos:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Acelerar las consultas</span>
  
 </span></p>
<ol>
<li><p><strong>Extraer el término de la consulta:</strong> Se extrae la subcadena contigua sin comodines de la expresión « <code translate="no">LIKE</code> » (por ejemplo, « <code translate="no">&quot;%database%&quot;</code> » se convierte en « <code translate="no">&quot;database&quot;</code> »). En el caso de los filtros de expresiones regulares, Milvus extrae subcadenas literales fijas del patrón de expresión regular siempre que sea posible. Por ejemplo, « <code translate="no">message =~ &quot;error.*timeout&quot;</code> » contiene los literales « <code translate="no">error</code> » y « <code translate="no">timeout</code> ».</p></li>
<li><p><strong>Descomposición del término de consulta:</strong> El término de consulta se descompone en <em>n-gramas</em> en función de su longitud (<code translate="no">L</code>) y de los parámetros « <code translate="no">min_gram</code> » y « <code translate="no">max_gram</code> ».</p>
<ul>
<li><p>Si <code translate="no">L &lt; min_gram</code>, no se puede utilizar el índice y la consulta recurre a un escaneo completo.</p></li>
<li><p>Si <code translate="no">min_gram ≤ L ≤ max_gram</code>, el término de consulta completo se trata como un único n-grama y no es necesaria ninguna descomposición adicional.</p></li>
<li><p>Si <code translate="no">L &gt; max_gram</code>, el término de la consulta se descompone en gramos superpuestos utilizando un tamaño de ventana igual a <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Por ejemplo, si el valor de « <code translate="no">max_gram</code> » se establece en « <code translate="no">3</code> » y el término de consulta es « <code translate="no">&quot;database&quot;</code> », que tiene una longitud de <strong>8</strong>, se descompone en subcadenas de 3-gramas como « <code translate="no">&quot;dat&quot;</code> », « <code translate="no">&quot;ata&quot;</code> », « <code translate="no">&quot;tab&quot;</code> », y así sucesivamente.</p></li>
<li><p><strong>Búsqueda de cada «gram» e intersección</strong>: Milvus busca cada uno de los «grams» de la consulta en el índice invertido y, a continuación, realiza la intersección de las listas de ID de documentos resultantes para encontrar un pequeño conjunto de documentos candidatos. Estos candidatos contienen todos los «grams» de la consulta.</p></li>
<li><p><strong>Verificar y devolver los resultados:</strong> A continuación, se aplica el filtro original « <code translate="no">LIKE</code> » o de expresiones regulares como comprobación final únicamente sobre el pequeño conjunto de candidatos para encontrar las coincidencias exactas.</p></li>
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
    </button></h2><p>Se puede crear un índice NGRAM en un campo « <code translate="no">VARCHAR</code> » o en una ruta específica dentro de un campo « <code translate="no">JSON</code> ».</p>
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
    </button></h3><p>Para un campo « <code translate="no">VARCHAR</code> », basta con especificar la ruta « <code translate="no">field_name</code> » y configurar « <code translate="no">min_gram</code> » y « <code translate="no">max_gram</code> ».</p>
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
<p>Esta configuración genera 2-gramas y 3-gramas para cada cadena de « <code translate="no">text</code> » y los almacena en el índice invertido.</p>
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
    </button></h3><p>Para un campo de <code translate="no">JSON</code>, además de la configuración de los gramas, también debe especificar:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – la ruta JSON que apunta al valor que se desea indexar.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – debe ser « <code translate="no">&quot;varchar&quot;</code> » (sin distinción entre mayúsculas y minúsculas), ya que la indexación NGRAM opera con cadenas de caracteres.</p></li>
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
<li><p>Solo se indexa el valor de <code translate="no">json_field[&quot;body&quot;]</code>.</p></li>
<li><p>El valor se convierte a <code translate="no">VARCHAR</code> antes de la tokenización de n-gramas.</p></li>
<li><p>Milvus genera subcadenas de longitud 2 a 4 y las almacena en el índice invertido.</p></li>
</ul>
<p>Para obtener más información sobre cómo indexar un campo JSON, consulta <a href="/docs/es/json-indexing.md">Indexación</a> de <a href="/docs/es/json-indexing.md">JSON</a>.</p>
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
<li><p>La consulta debe dirigirse a un campo « <code translate="no">VARCHAR</code> » (o ruta JSON) que cuente con un índice « <code translate="no">NGRAM</code> ».</p></li>
<li><p>La parte literal del patrón « <code translate="no">LIKE</code> » debe tener una longitud mínima de <code translate="no">min_gram</code> caracteres.
<em>(Por ejemplo, si el término de consulta más corto que se espera es de 2 caracteres, establezca min_gram=2 al crear el índice).</em></p></li>
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
<li><p><strong>Coincidencia de infijo</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Coincidencia con comodines</strong></p>
<p>Milvus admite tanto el « <code translate="no">%</code> » (cero o más caracteres) como el « <code translate="no">_</code> » (exactamente un carácter).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Consultas de ruta JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtro de expresiones regulares</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtro de expresiones regulares en una ruta JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Para obtener más información sobre la sintaxis de las expresiones de filtro, consulta <a href="/docs/es/pattern-matching.md">«Coincidencia de patrones</a>».</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminar un índice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza el método ` <code translate="no">drop_index()</code> ` para eliminar un índice existente de una colección.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
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
<li><p><strong>Tipos de campo</strong>: Compatible con los campos « <code translate="no">VARCHAR</code> » y « <code translate="no">JSON</code> ». Para JSON, especifica tanto « <code translate="no">params.json_path</code> » como « <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> ».</p></li>
<li><p><strong>Aceleración de expresiones regulares</strong>: « <code translate="no">NGRAM</code> » acelera los filtros de expresiones regulares solo cuando Milvus puede extraer subcadenas literales fijas del patrón de expresión regular. Los patrones como « <code translate="no">[a-z]+</code> » pueden recurrir al escaneo porque no contienen literales fijos.</p></li>
<li><p><strong>Expresiones regulares que no distinguen entre mayúsculas y minúsculas</strong>: se admiten los patrones de expresiones regulares con <code translate="no">(?i)</code>, pero pueden omitir la optimización de <code translate="no">NGRAM</code>, ya que el índice conserva las mayúsculas y minúsculas originales.</p></li>
<li><p><strong>Paso de verificación</strong>: en el caso de los filtros de expresiones regulares, <code translate="no">NGRAM</code> genera candidatos y Milvus los verifica con el patrón completo de expresiones regulares RE2, por lo que la aceleración del índice no altera los resultados de la coincidencia.</p></li>
<li><p><strong>Unicode</strong>: La descomposición NGRAM se basa en caracteres, es independiente del idioma e incluye espacios en blanco y signos de puntuación.</p></li>
<li><p><strong>Compromiso entre espacio y tiempo</strong>: Los rangos de gramas más amplios <code translate="no">[min_gram, max_gram]</code> producen más gramas e índices más grandes. Si la memoria es limitada, considera el modo <code translate="no">mmap</code> para listas de posting grandes. Para obtener más información, consulta <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">«Usar mmap</a>».</p></li>
<li><p><strong>Inmutabilidad</strong>: <code translate="no">min_gram</code> y <code translate="no">max_gram</code> no se pueden modificar in situ; para ajustarlos, hay que reconstruir el índice.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Prácticas recomendadas<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Elige min_gram y max_gram para que se adapten al comportamiento de la búsqueda</strong></p>
<ul>
<li><p>Empieza con <code translate="no">min_gram=2</code> y <code translate="no">max_gram=3</code>.</p></li>
<li><p>Establece <code translate="no">min_gram</code> en el literal más corto que esperes que los usuarios escriban.</p></li>
<li><p>Establece ` <code translate="no">max_gram</code> ` cerca de la longitud típica de las subcadenas significativas; un valor mayor de ` <code translate="no">max_gram</code> ` mejora el filtrado, pero aumenta el espacio necesario.</p></li>
</ul></li>
<li><p><strong>Evita los gramos de baja selectividad</strong></p>
<p>Los patrones muy repetitivos (p. ej., <code translate="no">&quot;aaaaaa&quot;</code>) ofrecen un filtrado débil y pueden aportar beneficios limitados.</p></li>
<li><p><strong>Normaliza de forma coherente</strong></p>
<p>Aplica la misma normalización al texto ingesto y a los literales de consulta (por ejemplo, poner en minúsculas, recortar) si tu caso de uso lo requiere.</p></li>
</ul>
