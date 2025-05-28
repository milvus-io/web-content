---
id: phrase-match.md
title: Concordancia de frases
summary: >-
  La concordancia de frases permite buscar documentos que contengan los términos
  de la consulta como una frase exacta. Por defecto, las palabras deben aparecer
  en el mismo orden y directamente adyacentes entre sí. Por ejemplo, una
  búsqueda de "aprendizaje automático de robótica" coincide con texto como
  "...modelos típicos de aprendizaje automático de robótica...", donde las
  palabras "robótica", "máquina" y "aprendizaje" aparecen en secuencia sin
  ninguna otra palabra entre ellas.
---
<h1 id="Phrase-Match" class="common-anchor-header">Concordancia de frases<button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La concordancia de frases permite buscar documentos que contengan los términos de la consulta como una frase exacta. Por defecto, las palabras deben aparecer en el mismo orden y directamente adyacentes entre sí. Por ejemplo, una búsqueda de <strong>"robótica y aprendizaje automático"</strong> coincide con texto como <em>"...modelos típicos de robótica y aprendizaje automático...",</em> donde las palabras <strong>"robótica",</strong> <strong>"máquina"</strong> y <strong>"aprendizaje"</strong> aparecen en secuencia sin ninguna otra palabra entre ellas.</p>
<p>Sin embargo, en situaciones reales, la concordancia estricta de frases puede ser demasiado rígida. Por ejemplo, puede buscar un texto como <em>"...modelos de aprendizaje automático ampliamente adoptados en robótica...".</em> En este caso, las mismas palabras clave están presentes pero no una al lado de la otra ni en el orden original. Para ello, la concordancia de frase admite el parámetro <code translate="no">slop</code>, que introduce flexibilidad. El valor <code translate="no">slop</code> define cuántos cambios de posición se permiten entre los términos de la frase. Por ejemplo, con un valor de 1 en <code translate="no">slop</code>, una consulta sobre <strong>"aprendizaje automático"</strong> puede coincidir con un texto como <em>"...aprendizaje automático profundo...", en</em> el que una palabra (<strong>"profundo")</strong> separa los términos originales.</p>
<h2 id="Overview" class="common-anchor-header">Resumen<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Gracias a la biblioteca del motor de búsqueda <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, la concordancia de frases funciona analizando la información posicional de las palabras dentro de los documentos. El diagrama siguiente ilustra el proceso:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de la concordancia de frases</span> </span></p>
<ol>
<li><p><strong>Tokenización de documentos</strong>: Cuando inserta documentos en Milvus, el texto se divide en tokens (palabras o términos individuales) utilizando un analizador, con información posicional registrada para cada token. Por ejemplo, <strong>doc_1</strong> se tokeniza en <strong>["máquina" (pos=0), "aprendizaje" (pos=1), "potencia" (pos=2), "eficiencia" (pos=3)]</strong>. Para obtener más información sobre los analizadores, consulte <a href="/docs/es/analyzer-overview.md">Visión general de los analizadores</a>.</p></li>
<li><p><strong>Creación de índices invertidos</strong>: Milvus construye un índice invertido, asignando cada token al documento o documentos en los que aparece y las posiciones del token en esos documentos.</p></li>
<li><p><strong>Correspondencia de frases</strong>: Cuando se ejecuta una consulta de frases, Milvus busca cada token en el índice invertido y comprueba sus posiciones para determinar si aparecen en el orden y la proximidad correctos. El parámetro <code translate="no">slop</code> controla el número máximo de posiciones permitidas entre tokens coincidentes:</p>
<ul>
<li><p><strong>slop = 0</strong> significa que los tokens deben aparecer <strong>en el orden exacto e inmediatamente adyacentes</strong> (es decir, sin palabras extra entre ellos).</p>
<ul>
<li>En el ejemplo, sólo <strong>doc_1</strong> (<strong>"máquina"</strong> en <strong>pos=0</strong>, <strong>"aprendizaje"</strong> en <strong>pos=1</strong>) coincide exactamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> permite hasta dos posiciones de flexibilidad o reordenación entre los tokens coincidentes.</p>
<ul>
<li><p>Esto permite invertir el orden ("<strong>learning machine")</strong> o dejar un pequeño espacio entre las palabras.</p></li>
<li><p>En consecuencia, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>"aprendizaje"</strong> en <strong>pos=0</strong>, <strong>"máquina"</strong> en <strong>pos=1</strong>) y <strong>doc_3</strong> (<strong>"aprendizaje"</strong> en <strong>pos=1</strong>, <strong>"máquina"</strong> en <strong>pos=2</strong>) coinciden.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Activar la concordancia de frases<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La concordancia de frase funciona con el tipo de campo <code translate="no">VARCHAR</code>, el tipo de datos de cadena en Milvus. Para activar la concordancia de frases, configure el esquema de su colección estableciendo los parámetros <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code> en <code translate="no">True</code>, de forma similar a la concordancia <a href="/docs/es/keyword-match.md">de texto</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Configure <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code></h3><p>Para habilitar la concordancia de frases para un campo <code translate="no">VARCHAR</code> específico, establezca los parámetros <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code> en <code translate="no">True</code> al definir el esquema del campo. Esta configuración indica a Milvus que tokenice el texto y cree un índice invertido con la información posicional necesaria para una concordancia de frase eficaz.</p>
<p>A continuación se muestra un ejemplo de definición de esquema para activar la concordancia de frases:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a schema for a new collection</span>
schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
<span class="hljs-comment"># Add a VARCHAR field configured for phrase matching</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR (string)</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opcional: Configurar un analizador</h3><p>La precisión de la concordancia de frases depende en gran medida del analizador utilizado para tokenizar sus datos de texto. Diferentes analizadores se adaptan a diferentes idiomas y formatos de texto, lo que afecta a la tokenización y a la precisión posicional. La selección de un analizador adecuado para su caso de uso específico optimizará los resultados de la concordancia de frases.</p>
<p>Por defecto, Milvus utiliza el analizador estándar, que tokeniza el texto basándose en los espacios en blanco y la puntuación, elimina los tokens de más de 40 caracteres y convierte el texto a minúsculas. No se requieren parámetros adicionales para el uso por defecto. Consulte <a href="/docs/es/standard-analyzer.md">Analizador estándar</a> para obtener más información.</p>
<p>Si su aplicación requiere un analizador específico, configúrelo utilizando el parámetro <code translate="no">analyzer_params</code>. Por ejemplo, aquí se explica cómo configurar el analizador <code translate="no">english</code> para la concordancia de frases en texto inglés:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus admite varios analizadores adaptados a diferentes idiomas y casos de uso. Para obtener información detallada, consulte <a href="/docs/es/analyzer-overview.md">Visión general de los analizadores</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utilizar la concordancia de frases<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya habilitado la concordancia para un campo <code translate="no">VARCHAR</code> en su esquema de recopilación, puede realizar concordancias de frases utilizando la expresión <code translate="no">PHRASE_MATCH</code>.</p>
<div class="alert note">
<p>La expresión <code translate="no">PHRASE_MATCH</code> no distingue entre mayúsculas y minúsculas. Puede utilizar <code translate="no">PHRASE_MATCH</code> o <code translate="no">phrase_match</code>.</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintaxis de la expresión PHRASE_MATCH</h3><p>Utilice la expresión <code translate="no">PHRASE_MATCH</code> para especificar el campo, la frase y la flexibilidad opcional (<code translate="no">slop</code>) durante la búsqueda. La sintaxis es</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> El nombre del campo <code translate="no">VARCHAR</code> en el que se realizan las coincidencias de frase.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> La frase exacta que se va a buscar.</p></li>
<li><p><code translate="no">slop</code> (opcional)<strong>:</strong> Un número entero que especifica el número máximo de posiciones permitidas en los tokens coincidentes.</p>
<ul>
<li><p><code translate="no">0</code> (por defecto): Coincide sólo con frases exactas. Ejemplo: Un filtro para <strong>"machine learning"</strong> coincidirá exactamente con <strong>"machine learning"</strong>, pero no con <strong>"machine boosts learning"</strong> o <strong>"learning machine".</strong></p></li>
<li><p><code translate="no">1</code>: Permite pequeñas variaciones, como un término adicional o un pequeño cambio de posición. Ejemplo: Un filtro para <strong>"machine learning</strong> " coincidirá con <strong>"machine boosts learning"</strong> (un token entre <strong>"machine"</strong> y <strong>"learning")</strong> pero no con " <strong>learning machine"</strong> (términos invertidos).</p></li>
<li><p><code translate="no">2</code>: Permite una mayor flexibilidad, incluido el orden inverso de los términos o hasta dos tokens entre ellos. Ejemplo: Un filtro para <strong>"machine learning"</strong> coincidirá con <strong>"learning machine"</strong> (términos invertidos) o <strong>"machine quickly boosts learning"</strong> (dos tokens entre <strong>"machine"</strong> y <strong>"learning")</strong>.</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Ejemplo de conjunto de datos</h3><p>Suponga que tiene una colección llamada <strong>tech_articles</strong> que contiene las cinco entidades siguientes:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"El aprendizaje automático potencia la eficiencia en el análisis de datos a gran escala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"El aprendizaje automático es vital para el progreso moderno de la IA"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Las arquitecturas de máquinas de aprendizaje profundo optimizan las cargas computacionales"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"La máquina mejora rápidamente el rendimiento del modelo para el aprendizaje continuo"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"El aprendizaje de algoritmos de máquina avanzados amplía las capacidades de la IA"</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Consulta con concordancia de frase</h3><p>Cuando se utiliza el método <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> actúa como un filtro escalar. Sólo se devuelven los documentos que contienen la frase especificada (con el margen de error permitido).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Ejemplo: slop = 0 (coincidencia exacta)</h4><p>Este ejemplo devuelve los documentos que contengan la frase exacta <strong>"aprendizaje automático"</strong> sin ningún token adicional en medio.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados esperados:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"El aprendizaje automático aumenta la eficacia del análisis de datos a gran escala"</p></td>
   </tr>
</table>
<p>Sólo el documento 1 contiene la frase exacta <strong>"aprendizaje automático"</strong> en el orden especificado, sin elementos adicionales.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Búsqueda con concordancia de frase</h3><p>En las operaciones de búsqueda, <strong>PHRASE_MATCH</strong> se utiliza para filtrar los documentos antes de aplicar la clasificación por similitud vectorial. Este enfoque en dos pasos reduce primero el conjunto de candidatos mediante la concordancia textual y, a continuación, vuelve a clasificar esos candidatos basándose en la incrustación vectorial.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Ejemplo: inclinación = 1</h4><p>Aquí permitimos un slop de 1. El filtro se aplica a los documentos que contienen la frase <strong>"learning machine"</strong> con una ligera flexibilidad.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;learning machine&quot; with slop=1</span>
filter_slop1 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;learning machine&#x27;, 1)&quot;</span>

result_slop1 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,
    data=[query_vector],
    <span class="hljs-built_in">filter</span>=filter_slop1,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"El aprendizaje de una máquina es vital para el progreso moderno de la IA"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Las arquitecturas de máquinas de aprendizaje profundo optimizan las cargas computacionales"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"El aprendizaje de algoritmos de máquina avanzados amplía las capacidades de la IA"</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Ejemplo: slop = 2</h4><p>Este ejemplo permite un slop de 2, lo que significa que se permiten hasta dos tokens adicionales (o términos invertidos) entre las palabras <strong>"máquina"</strong> y <strong>"aprendizaje".</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=2</span>
filter_slop2 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 2)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop2,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultado:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"El aprendizaje automático aumenta la eficiencia en el análisis de datos a gran escala"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Las arquitecturas de máquinas de aprendizaje profundo optimizan las cargas computacionales"</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Ejemplo: slop = 3</h4><p>En este ejemplo, un slop de 3 proporciona aún más flexibilidad. El filtro busca <strong>"aprendizaje automático"</strong> con un máximo de tres posiciones de token permitidas entre las palabras.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: Filter documents containing &quot;machine learning&quot; with slop=3</span>
filter_slop3 = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;, 3)&quot;</span>

result_slop2 = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>,             <span class="hljs-comment"># Vector field name</span>
    data=[query_vector],                 <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=filter_slop3,                 <span class="hljs-comment"># Filter expression</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>,                            <span class="hljs-comment"># Maximum results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultado de la búsqueda:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"El aprendizaje automático aumenta la eficiencia en el análisis de datos a gran escala"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"El aprendizaje automático es vital para el progreso moderno de la IA"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Las arquitecturas de máquinas de aprendizaje profundo optimizan las cargas computacionales"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"El aprendizaje de algoritmos de máquina avanzados amplía las capacidades de la IA"</p></td>
   </tr>
</table>
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
<li><p>La activación de la concordancia de frases para un campo desencadena la creación de un índice invertido, que consume recursos de almacenamiento. Tenga en cuenta el impacto en el almacenamiento cuando decida activar esta función, ya que varía en función del tamaño del texto, los tokens únicos y el analizador utilizado.</p></li>
<li><p>Una vez que haya definido un analizador en su esquema, su configuración será permanente para esa colección. Si decide que un analizador diferente se adapta mejor a sus necesidades, puede considerar eliminar la colección existente y crear una nueva con la configuración de analizador deseada.</p></li>
<li><p>El rendimiento de la concordancia de frases depende de cómo se tokenice el texto. Antes de aplicar un analizador a toda la colección, utilice el método <code translate="no">run_analyzer</code> para revisar el resultado de la tokenización. Para obtener más información, consulte <a href="/docs/es/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Descripción general del analizador</a>.</p></li>
<li><p>Reglas de escape en expresiones <code translate="no">filter</code>:</p>
<ul>
<li><p>Los caracteres entre comillas dobles o simples dentro de expresiones se interpretan como constantes de cadena. Si la constante de cadena incluye caracteres de escape, éstos deben representarse con una secuencia de escape. Por ejemplo, utilice <code translate="no">\\</code> para representar <code translate="no">\</code>, <code translate="no">\\t</code> para representar un tabulador <code translate="no">\t</code> y <code translate="no">\\n</code> para representar una nueva línea.</p></li>
<li><p>Si una constante de cadena está encerrada entre comillas simples, una comilla simple dentro de la constante debe representarse como <code translate="no">\\'</code> mientras que una comilla doble puede representarse como <code translate="no">&quot;</code> o <code translate="no">\\&quot;</code>. Ejemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Si una constante de cadena está entre comillas dobles, una comilla doble dentro de la constante debe representarse como <code translate="no">\\&quot;</code> mientras que una comilla simple puede representarse como <code translate="no">'</code> o <code translate="no">\\'</code>. Ejemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
