---
id: keyword-match.md
summary: >-
  La concordancia de palabras clave en Milvus permite una recuperación precisa
  de documentos basada en términos específicos. Esta función se utiliza
  principalmente para la búsqueda filtrada para satisfacer condiciones
  específicas y puede incorporar el filtrado escalar para refinar los resultados
  de la consulta, lo que permite búsquedas de similitud dentro de vectores que
  cumplen criterios escalares.
title: Concordancia de palabras clave
---
<h1 id="Keyword-Match​" class="common-anchor-header">Concordancia de palabras clave<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>La concordancia de palabras clave en Milvus permite una recuperación precisa de documentos basada en términos específicos. Esta función se utiliza principalmente para la búsqueda filtrada para satisfacer condiciones específicas y puede incorporar el filtrado escalar para refinar los resultados de la consulta, permitiendo búsquedas de similitud dentro de vectores que cumplen criterios escalares.</p>
<div class="alert note">
<p>La concordancia de palabras clave se centra en la búsqueda de apariciones exactas de los términos de la consulta, sin puntuar la relevancia de los documentos coincidentes. Si desea recuperar los documentos más relevantes basándose en el significado semántico y la importancia de los términos de la consulta, le recomendamos que utilice <a href="/docs/es/full-text-search.md">la búsqueda de texto completo</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus integra <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para potenciar su índice invertido subyacente y la búsqueda por palabras clave. Para cada entrada de texto, Milvus lo indexa siguiendo el procedimiento.</p>
<ol>
<li><p><a href="/docs/es/analyzer-overview.md">Analizador</a>: El analizador procesa el texto de entrada convirtiéndolo en palabras individuales, o tokens, y aplicando los filtros necesarios. Esto permite a Milvus construir un índice basado en estos tokens.</p></li>
<li><p><a href="/docs/es/index-scalar-fields.md">Indexación</a>: Tras el análisis del texto, Milvus crea un índice invertido que asigna cada token único a los documentos que lo contienen.</p></li>
</ol>
<p>Cuando un usuario realiza una búsqueda de palabras clave, el índice invertido se utiliza para recuperar rápidamente todos los documentos que las contienen. Esto es mucho más rápido que escanear cada documento individualmente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Concordancia de palabras clave</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">Activar la concordancia de palabras clave<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La concordancia de palabras clave funciona en el tipo de campo <code translate="no">VARCHAR</code>, que es esencialmente el tipo de datos de cadena en Milvus. Para activar la concordancia de palabras clave, configure tanto <code translate="no">enable_analyzer</code> como <code translate="no">enable_match</code> en <code translate="no">True</code> y, a continuación, configure opcionalmente un analizador para el análisis de texto al definir el esquema de su colección.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Establezca <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code></h3><p>Para habilitar la concordancia de palabras clave para un campo <code translate="no">VARCHAR</code> específico, establezca los parámetros <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code> en <code translate="no">True</code> al definir el esquema del campo. Esto indica a Milvus que tokenice el texto y cree un índice invertido para el campo especificado, lo que permite una comparación rápida y eficaz de las palabras clave.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Opcional: Configurar un analizador</h3><p>El rendimiento y la precisión de la concordancia de palabras clave dependen del analizador seleccionado. Los diferentes analizadores se adaptan a varios idiomas y estructuras de texto, por lo que elegir el adecuado puede afectar significativamente a los resultados de búsqueda para su caso de uso específico.</p>
<p>Por defecto, Milvus utiliza el analizador <code translate="no">standard</code>, que tokeniza el texto basándose en los espacios en blanco y la puntuación, elimina los tokens de más de 40 caracteres y convierte el texto a minúsculas. No se necesitan parámetros adicionales para aplicar esta configuración por defecto. Para más información, consulte <a href="/docs/es/standard-analyzer.md">Estándar</a>.</p>
<p>En los casos en que se requiera un analizador diferente, puede configurarlo utilizando el parámetro <code translate="no">analyzer_params</code>. Por ejemplo, para aplicar el analizador <code translate="no">english</code> para procesar texto en inglés.</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus también proporciona otros analizadores adaptados a diferentes idiomas y escenarios. Para más detalles, consulte <a href="/docs/es/analyzer-overview.md">Visión general</a>.</p>
<h2 id="Use-keyword-match" class="common-anchor-header">Utilizar la concordancia de palabras clave<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya activado la concordancia de palabras clave para un campo VARCHAR en el esquema de su colección, puede realizar concordancias de palabras clave utilizando la expresión <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Sintaxis de la expresión TEXT_MATCH</h3><p>La expresión <code translate="no">TEXT_MATCH</code> se utiliza para especificar el campo y las palabras clave que se van a buscar. Su sintaxis es la siguiente</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: El nombre del campo VARCHAR que se va a buscar.</p></li>
<li><p><code translate="no">text</code>: Las palabras clave a buscar. Las palabras clave múltiples pueden separarse por espacios u otros delimitadores apropiados según el idioma y el analizador configurado.</p></li>
</ul>
<p>Por defecto, <code translate="no">TEXT_MATCH</code> utiliza la lógica de búsqueda <strong>OR</strong>, lo que significa que devolverá los documentos que contengan cualquiera de las palabras clave especificadas. Por ejemplo, para buscar documentos que contengan las palabras clave <code translate="no">machine</code> o <code translate="no">deep</code> en el campo <code translate="no">text</code>, utilice la siguiente expresión.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>También puede combinar varias expresiones <code translate="no">TEXT_MATCH</code> utilizando operadores lógicos para realizar una búsqueda <strong>AND</strong>. Por ejemplo, para buscar documentos que contengan <code translate="no">machine</code> y <code translate="no">deep</code> en el campo <code translate="no">text</code>, utilice la siguiente expresión.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">Búsqueda con coincidencia de palabra clave</h3><p>La concordancia de palabras clave puede utilizarse en combinación con la búsqueda de similitud vectorial para restringir el alcance de la búsqueda y mejorar el rendimiento de la misma. Al filtrar la colección mediante la concordancia de palabras clave antes de la búsqueda por similitud vectorial, puede reducir el número de documentos en los que es necesario buscar, lo que se traduce en tiempos de consulta más rápidos.</p>
<p>En este ejemplo, la expresión <code translate="no">filter</code> filtra los resultados de la búsqueda para incluir sólo los documentos que coinciden con las palabras clave especificadas <code translate="no">keyword1</code> o <code translate="no">keyword2</code>. A continuación, la búsqueda por similitud vectorial se realiza en este subconjunto filtrado de documentos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">Consulta con concordancia de palabras clave</h3><p>La concordancia de palabras clave también puede utilizarse para el filtrado escalar en las operaciones de consulta. Especificando una expresión <code translate="no">TEXT_MATCH</code> en el parámetro <code translate="no">expr</code> del método <code translate="no">query()</code>, puede recuperar documentos que coincidan con las palabras clave dadas.</p>
<p>El ejemplo siguiente recupera documentos cuyo campo <code translate="no">text</code> contiene las palabras clave <code translate="no">keyword1</code> y <code translate="no">keyword2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Consideraciones<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>La activación de la concordancia de palabras clave para un campo desencadena la creación de un índice invertido, que consume recursos de almacenamiento. Tenga en cuenta el impacto en el almacenamiento cuando decida activar esta función, ya que varía en función del tamaño del texto, los tokens únicos y el analizador utilizado.</p></li>
<li><p>Una vez que haya definido un analizador en su esquema, su configuración será permanente para esa colección. Si decide que un analizador diferente se adaptaría mejor a sus necesidades, puede considerar eliminar la colección existente y crear una nueva con la configuración de analizador deseada.</p></li>
</ul>
