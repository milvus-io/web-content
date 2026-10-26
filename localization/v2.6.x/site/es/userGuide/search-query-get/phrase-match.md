---
id: phrase-match.md
title: Coincidencia de fraseCompatible with Milvus 2.5.17+
summary: >-
  La búsqueda por frase te permite buscar documentos que contengan los términos
  de tu consulta como una frase exacta. Por defecto, las palabras deben aparecer
  en el mismo orden y una justo al lado de la otra. Por ejemplo, una consulta
  como «robótica aprendizaje automático» encuentra coincidencias en textos como
  «…modelos típicos de robótica y aprendizaje automático…», en los que las
  palabras «robótica», «automático» y «aprendizaje» aparecen en secuencia sin
  que haya otras palabras entre ellas.
beta: Milvus 2.5.17+
---
<h1 id="Phrase-Match" class="common-anchor-header">Coincidencia de frase<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.17+</span><button data-href="#Phrase-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda de frases te permite buscar documentos que contengan los términos de tu consulta como una frase exacta. Por defecto, las palabras deben aparecer en el mismo orden y estar directamente una al lado de la otra. Por ejemplo, una consulta como <strong>«robótica aprendizaje automático»</strong> encuentra coincidencias en textos como <em>«…modelos típicos de aprendizaje automático en robótica…»</em>, donde las palabras <strong>«robótica»</strong>, <strong>«automático»</strong> y <strong>«aprendizaje»</strong> aparecen en secuencia sin que haya otras palabras entre ellas.</p>
<p>Sin embargo, en situaciones reales, la coincidencia estricta de frases puede resultar demasiado rígida. Es posible que desees encontrar texto como <em>«…modelos de aprendizaje automático ampliamente adoptados en robótica…».</em> En este caso, las mismas palabras clave están presentes, pero no una al lado de la otra ni en el orden original. Para solucionar esto, la coincidencia de frases admite un parámetro « <code translate="no">slop</code> », que aporta flexibilidad. El valor de « <code translate="no">slop</code> » define cuántos desplazamientos posicionales se permiten entre los términos de la frase. Por ejemplo, con un « <code translate="no">slop</code> » de 1, una consulta de <strong>«machine learning»</strong> puede coincidir con un texto como <em>«…machine deep learning…»</em>, donde una palabra (<strong>«deep»</strong>) separa los términos originales.</p>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Gracias a la biblioteca del motor de búsqueda <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, la coincidencia de frases funciona analizando la información posicional de las palabras dentro de los documentos. El siguiente diagrama ilustra el proceso:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/phrase-match-workflow.png" alt="Phrase Match Workflow" class="doc-image" id="phrase-match-workflow" /> 
   <span>Flujo de trabajo de la coincidencia de frases</span>
  
 </span></p>
<ol>
<li><p><strong>Tokenización de documentos</strong>: Cuando se insertan documentos en Milvus, el texto se divide en tokens (palabras o términos individuales) mediante un analizador, y se registra la información posicional de cada token. Por ejemplo, <strong>doc_1</strong> se tokeniza en <strong>[«machine» (pos=0), «learning» (pos=1), «boosts» (pos=2), «efficiency» (pos=3)]</strong>. Para obtener más información sobre los analizadores, consulta <a href="/docs/es/v2.6.x/analyzer-overview.md">la Descripción general de los analizadores</a>.</p></li>
<li><p><strong>Creación del índice invertido</strong>: Milvus crea un índice invertido, asignando cada token al documento o documentos en los que aparece y a las posiciones del token en dichos documentos.</p></li>
<li><p><strong>Coincidencia de frases</strong>: Cuando se ejecuta una consulta de frase, Milvus busca cada token en el índice invertido y comprueba sus posiciones para determinar si aparecen en el orden y la proximidad correctos. El parámetro « <code translate="no">slop</code> » controla el número máximo de posiciones permitidas entre los tokens coincidentes:</p>
<ul>
<li><p><strong>slop = 0</strong> significa que los tokens deben aparecer <strong>en el orden exacto y estar inmediatamente adyacentes</strong> (es decir, sin palabras adicionales entre ellos).</p>
<ul>
<li>En el ejemplo, solo <strong>doc_1</strong> (<strong>«machine»</strong> en <strong>la posición 0</strong>, <strong>«learning»</strong> en <strong>la posición 1</strong>) coincide exactamente.</li>
</ul></li>
<li><p><strong>slop = 2</strong> permite hasta dos posiciones de flexibilidad o reordenaciones entre los tokens coincidentes.</p>
<ul>
<li><p>Esto permite el orden invertido (<strong>«learning machine»</strong>) o un pequeño espacio entre los tokens.</p></li>
<li><p>Por consiguiente, <strong>doc_1</strong>, <strong>doc_2</strong> (<strong>«learning»</strong> en <strong>la posición 0</strong>, <strong>«machine»</strong> en <strong>la posición 1</strong>) y <strong>doc_3</strong> (<strong>«learning»</strong> en <strong>la posición 1</strong>, <strong>«machine»</strong> en <strong>la posición 2</strong>) coinciden.</p></li>
</ul></li>
</ul></li>
</ol>
<h2 id="Enable-phrase-match" class="common-anchor-header">Habilitar la coincidencia de frases<button data-href="#Enable-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La coincidencia de frases funciona con el tipo de campo « <code translate="no">VARCHAR</code> », el tipo de datos de cadena en Milvus. Para habilitar la coincidencia de frases, configura el esquema de tu colección estableciendo los parámetros « <code translate="no">enable_analyzer</code> » y « <code translate="no">enable_match</code> » en « <code translate="no">True</code> », de forma similar a <a href="/docs/es/v2.6.x/keyword-match.md">la coincidencia de texto</a>.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Establece <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Para habilitar la coincidencia de frases para un campo « <code translate="no">VARCHAR</code> » específico, establece los parámetros « <code translate="no">enable_analyzer</code> » y « <code translate="no">enable_match</code> » en « <code translate="no">True</code> » al definir el esquema del campo. Esta configuración indica a Milvus que tokenice el texto y cree un índice invertido con la información posicional necesaria para una coincidencia de frases eficiente.</p>
<p>A continuación se muestra un ejemplo de definición de esquema para habilitar la coincidencia de frases:</p>
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
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis (tokenization)</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opcional: configurar un analizador<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>La precisión de la coincidencia de frases depende en gran medida del analizador utilizado para tokenizar los datos de texto. Los distintos analizadores se adaptan a diferentes idiomas y formatos de texto, lo que afecta a la tokenización y a la precisión posicional. Seleccionar un analizador adecuado para tu caso de uso específico optimizará los resultados de la coincidencia de frases.</p>
<p>De forma predeterminada, Milvus utiliza el analizador estándar, que tokeniza el texto basándose en los espacios en blanco y la puntuación, elimina los tokens de más de 40 caracteres y convierte el texto a minúsculas. No se requieren parámetros adicionales para el uso predeterminado. Consulta <a href="/docs/es/v2.6.x/standard-analyzer.md">Analizador estándar</a> para obtener más detalles.</p>
<p>Si su aplicación requiere un analizador específico, configúrelo utilizando el parámetro ` <code translate="no">analyzer_params</code> `. Por ejemplo, a continuación se explica cómo configurar el analizador ` <code translate="no">english</code> ` para la coincidencia de frases en texto en inglés:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define analyzer parameters for English-language tokenization</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Add the VARCHAR field with the English analyzer enabled</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,                 <span class="hljs-comment"># Name of the field</span>
    datatype=DataType.VARCHAR,         <span class="hljs-comment"># Field data type set as VARCHAR</span>
    max_length=<span class="hljs-number">1000</span>,                   <span class="hljs-comment"># Maximum length of the string in bytes</span>
    enable_analyzer=<span class="hljs-literal">True</span>,              <span class="hljs-comment"># Enables text analysis</span>
    analyzer_params=analyzer_params,   <span class="hljs-comment"># Specifies the analyzer configuration</span>
    enable_match=<span class="hljs-literal">True</span>                  <span class="hljs-comment"># Enables inverted indexing for phrase matching</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus admite varios analizadores adaptados a diferentes idiomas y casos de uso. Para obtener información detallada, consulta <a href="/docs/es/v2.6.x/analyzer-overview.md">la Descripción general de los analizadores</a>.</p>
<h2 id="Use-phrase-match" class="common-anchor-header">Utilizar la coincidencia de frases<button data-href="#Use-phrase-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya habilitado la coincidencia para un campo « <code translate="no">VARCHAR</code> » en el esquema de su colección, podrá realizar coincidencias de frases utilizando la expresión « <code translate="no">PHRASE_MATCH</code> ».</p>
<div class="alert note">
<p>La expresión « <code translate="no">PHRASE_MATCH</code> » no distingue entre mayúsculas y minúsculas. Puede utilizar tanto « <code translate="no">PHRASE_MATCH</code> » como « <code translate="no">phrase_match</code> ».</p>
</div>
<h3 id="PHRASEMATCH-expression-syntax" class="common-anchor-header">Sintaxis de la expresión PHRASE_MATCH<button data-href="#PHRASEMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice la expresión « <code translate="no">PHRASE_MATCH</code> » para especificar el campo, la frase y la flexibilidad opcional (<code translate="no">slop</code>) al realizar una búsqueda. La sintaxis es la siguiente:</p>
<pre><code translate="no" class="language-python">PHRASE_MATCH(field_name, phrase, slop)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code><strong>:</strong> El nombre del campo « <code translate="no">VARCHAR</code> » en el que se realizan las coincidencias de frase.</p></li>
<li><p><code translate="no">phrase</code><strong>:</strong> La frase exacta que se va a buscar.</p></li>
<li><p><code translate="no">slop</code> (opcional)<strong>:</strong> Un número entero que especifica el número máximo de posiciones permitidas en los tokens coincidentes.</p>
<ul>
<li><p><code translate="no">0</code> (por defecto): Solo busca coincidencias exactas de frases. Ejemplo: un filtro para <strong>«machine learning»</strong> coincidirá exactamente con <strong>«machine learning»</strong>, pero no con <strong>«machine boosts learning»</strong> ni con <strong>«learning machine».</strong></p></li>
<li><p><code translate="no">1</code>: Permite variaciones menores, como un término adicional o un ligero cambio de posición. Ejemplo: un filtro para <strong>«machine learning»</strong> coincidirá con <strong>«machine boosts learning»</strong> (un token entre <strong>«machine»</strong> y <strong>«learning»</strong>), pero no con <strong>«learning machine»</strong> (términos invertidos).</p></li>
<li><p><code translate="no">2</code>: Permite mayor flexibilidad, incluyendo el orden invertido de los términos o hasta dos tokens entre ellos. Ejemplo: un filtro para <strong>«machine learning»</strong> coincidirá con <strong>«learning machine»</strong> (términos invertidos) o <strong>«machine quickly boosts learning»</strong> (dos tokens entre <strong>«machine»</strong> y <strong>«learning»</strong>).</p></li>
</ul></li>
</ul>
<h3 id="Example-dataset" class="common-anchor-header">Conjunto de datos de ejemplo<button data-href="#Example-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>Supongamos que tienes una colección llamada <strong>tech_articles</strong> que contiene las siguientes cinco entidades:</p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«El aprendizaje automático mejora la eficiencia en el análisis de datos a gran escala»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«El aprendizaje de un enfoque basado en máquinas es fundamental para el progreso de la IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Las arquitecturas de aprendizaje profundo optimizan las cargas computacionales»</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>«La máquina mejora rápidamente el rendimiento del modelo para un aprendizaje continuo»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«El aprendizaje de algoritmos avanzados de máquinas amplía las capacidades de la IA»</p></td>
   </tr>
</table>
<h3 id="Query-with-phrase-match" class="common-anchor-header">Consulta con coincidencia de frases<button data-href="#Query-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>Al utilizar el método <code translate="no">query()</code>, <strong>PHRASE_MATCH</strong> actúa como un filtro escalar. Solo se devuelven los documentos que contienen la frase especificada (dentro del margen de tolerancia permitido).</p>
<h4 id="Example-slop--0-exact-match" class="common-anchor-header">Ejemplo: slop = 0 (coincidencia exacta)</h4><p>Este ejemplo devuelve documentos que contienen la frase exacta <strong>«machine learning»</strong> sin ningún token adicional entre medias.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match documents containing exactly &quot;machine learning&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;PHRASE_MATCH(text, &#x27;machine learning&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Resultados de coincidencia esperados:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«El aprendizaje automático aumenta la eficiencia en el análisis de datos a gran escala»</p></td>
   </tr>
</table>
<p>Solo el documento 1 contiene la frase exacta <strong>«machine learning»</strong> en el orden especificado, sin tokens adicionales.</p>
<h3 id="Search-with-phrase-match" class="common-anchor-header">Búsqueda con coincidencia de frase<button data-href="#Search-with-phrase-match" class="anchor-icon" translate="no">
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
    </button></h3><p>En las operaciones de búsqueda, <strong>PHRASE_MATCH</strong> se utiliza para filtrar documentos antes de aplicar la clasificación por similitud vectorial. Este enfoque en dos pasos reduce primero el conjunto de candidatos mediante la coincidencia textual y, a continuación, vuelve a clasificar dichos candidatos basándose en las representaciones vectoriales.</p>
<h4 id="Example-slop--1" class="common-anchor-header">Ejemplo: slop = 1</h4><p>En este caso, permitimos una tolerancia de 1. El filtro se aplica a los documentos que contienen la frase <strong>«learning machine»</strong> con una ligera flexibilidad.</p>
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
<p><strong>Resultados de la coincidencia:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«El aprendizaje de un enfoque basado en máquinas es vital para el progreso de la IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Las arquitecturas de aprendizaje profundo optimizan las cargas computacionales»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«El aprendizaje de algoritmos avanzados de máquinas amplía las capacidades de la IA»</p></td>
   </tr>
</table>
<h4 id="Example-slop--2" class="common-anchor-header">Ejemplo: holgura = 2</h4><p>Este ejemplo permite una holgura de 2, lo que significa que se permiten hasta dos tokens adicionales (o términos invertidos) entre las palabras <strong>«machine»</strong> y <strong>«learning».</strong></p>
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
<p><strong>Resultados de la búsqueda:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«El aprendizaje automático aumenta la eficiencia en el análisis de datos a gran escala»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Las arquitecturas de aprendizaje profundo optimizan las cargas computacionales»</p></td>
   </tr>
</table>
<h4 id="Example-slop--3" class="common-anchor-header">Ejemplo: slop = 3</h4><p>En este ejemplo, un valor de slop de 3 proporciona aún más flexibilidad. El filtro busca <strong>«aprendizaje automático»</strong> permitiendo hasta tres posiciones de token entre las palabras.</p>
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
<p><strong>Resultados de la búsqueda:</strong></p>
<table>
   <tr>
     <th><p><code translate="no">doc_id</code></p></th>
     <th><p><code translate="no">text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>«El aprendizaje automático aumenta la eficiencia en el análisis de datos a gran escala»</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>«Aprender un enfoque basado en máquinas es vital para el progreso de la IA moderna»</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>«Las arquitecturas de aprendizaje profundo optimizan las cargas computacionales»</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>«El aprendizaje de algoritmos avanzados de máquinas amplía las capacidades de la IA»</p></td>
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
<li><p>Al habilitar la coincidencia de frases para un campo, se activa la creación de un índice invertido, lo que consume recursos de almacenamiento. Ten en cuenta el impacto en el almacenamiento a la hora de decidir si habilitas esta función, ya que varía en función del tamaño del texto, los tokens únicos y el analizador utilizado.</p></li>
<li><p>Una vez que haya definido un analizador en su esquema, su configuración se vuelve permanente para esa colección. Si decide que otro analizador se adapta mejor a sus necesidades, puede plantearse eliminar la colección existente y crear una nueva con la configuración de analizador deseada.</p></li>
<li><p>El rendimiento de la coincidencia de frases depende de cómo se tokenice el texto. Antes de aplicar un analizador a toda la colección, utiliza el método <code translate="no">run_analyzer</code> para revisar el resultado de la tokenización. Para obtener más información, consulta <a href="/docs/es/v2.6.x/analyzer-overview.md#share-DYZvdQ2vUowWEwx1MEHcdjNNnqT">Descripción general del analizador</a>.</p></li>
<li><p>Reglas de escape en expresiones de « <code translate="no">filter</code> »:</p>
<ul>
<li><p>Los caracteres entre comillas dobles o simples dentro de las expresiones se interpretan como constantes de cadena. Si la constante de cadena incluye caracteres de escape, estos deben representarse mediante una secuencia de escape. Por ejemplo, utilice ` <code translate="no">\\</code> ` para representar ` <code translate="no">\</code>`, ` <code translate="no">\\t</code> ` para representar una tabulación ` <code translate="no">\t</code>` y ` <code translate="no">\\n</code> ` para representar un salto de línea.</p></li>
<li><p>Si una constante de cadena está entre comillas simples, una comilla simple dentro de la constante debe representarse como <code translate="no">\\'</code>, mientras que una comilla doble puede representarse como <code translate="no">&quot;</code> o <code translate="no">\\&quot;</code>. Ejemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Si una constante de cadena está entre comillas dobles, una comilla doble dentro de la constante debe representarse como <code translate="no">\\&quot;</code>, mientras que una comilla simple puede representarse como <code translate="no">'</code> o <code translate="no">\\'</code>. Ejemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
