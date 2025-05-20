---
id: scalar_index.md
related_key: scalar_index
summary: Índice escalar en Milvus.
title: Índice escalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Índice escalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus admite búsquedas filtradas que combinan campos escalares y vectoriales. Para mejorar la eficiencia de las búsquedas que implican campos escalares, Milvus introdujo la indexación de campos escalares a partir de la versión 2.1.0. Este artículo proporciona una visión general de la indexación de campos escalares en Milvus, ayudándole a comprender su significado e implementación.</p>
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
    </button></h2><p>Al realizar búsquedas de similitud vectorial en Milvus, puede utilizar operadores lógicos para organizar campos escalares en expresiones booleanas.</p>
<p>Cuando Milvus recibe una solicitud de búsqueda con una expresión booleana de este tipo, analiza la expresión booleana en un árbol de sintaxis abstracta (AST) para generar un plan físico para el filtrado de atributos. A continuación, Milvus aplica el plan físico en cada segmento para generar un <a href="/docs/es/v2.4.x/bitset.md">conjunto de bits</a> como resultado del filtrado e incluye el resultado como parámetro de búsqueda vectorial para acotar el ámbito de búsqueda. En este caso, la velocidad de las búsquedas vectoriales depende en gran medida de la velocidad del filtrado de atributos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Filtrado de atributos en un segmento</span> </span></p>
<p>La indexación de campos escalares es una forma de garantizar la velocidad del filtrado por atributos ordenando los valores de los campos escalares de una forma determinada para acelerar la recuperación de la información.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algoritmos de indexación de campos escalares<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus pretende conseguir un bajo uso de memoria, una alta eficacia de filtrado y un tiempo de carga corto con sus algoritmos de indexación de campos escalares. Estos algoritmos se clasifican en dos tipos principales: <a href="#auto-indexing">autoindización</a> e <a href="#inverted-indexing">indización invertida</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Indexación automática</h3><p>Milvus proporciona la opción <code translate="no">AUTOINDEX</code> para liberarle de tener que elegir manualmente un tipo de índice. Al llamar al método <code translate="no">create_index</code>, si no se especifica <code translate="no">index_type</code>, Milvus selecciona automáticamente el tipo de índice más adecuado en función del tipo de datos.</p>
<p>La siguiente tabla enumera los tipos de datos que soporta Milvus y sus correspondientes algoritmos de indexación automática.</p>
<table>
<thead>
<tr><th>Tipo de datos</th><th>Algoritmo de autoíndice</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Índice invertido</td></tr>
<tr><td>INT8</td><td>Índice invertido</td></tr>
<tr><td>INT16</td><td>Índice invertido</td></tr>
<tr><td>INT32</td><td>Índice invertido</td></tr>
<tr><td>INT64</td><td>Índice invertido</td></tr>
<tr><td>FLOAT</td><td>Índice invertido</td></tr>
<tr><td>DOUBLE</td><td>Índice invertido</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Índice invertido</h3><p>La indexación invertida ofrece una forma flexible de crear un índice para un campo escalar especificando manualmente los parámetros del índice. Este método funciona bien para varios escenarios, incluyendo consultas puntuales, consultas de coincidencia de patrones, búsquedas de texto completo, búsquedas JSON, búsquedas booleanas e incluso consultas de coincidencia de prefijos.</p>
<p>Los índices invertidos implementados en Milvus funcionan con <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, una biblioteca de motores de búsqueda de texto completo. Tantivy garantiza que la indexación invertida en Milvus sea eficiente y rápida.</p>
<p>Un índice invertido tiene dos componentes principales: un diccionario de términos y una lista invertida. El diccionario de términos incluye todas las palabras tokenizadas ordenadas alfabéticamente, mientras que la lista invertida contiene la lista de documentos donde aparece cada palabra. Esta configuración hace que las consultas puntuales y por rango sean mucho más rápidas y eficaces que las búsquedas por fuerza bruta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama del índice invertido</span> </span></p>
<p>Las ventajas de utilizar un índice invertido son especialmente evidentes en las siguientes operaciones:</p>
<ul>
<li><strong>Consultas puntuales</strong>: Por ejemplo, al buscar documentos que contengan la palabra <strong>Milvus</strong>, el proceso comienza comprobando si <strong>Milvus</strong> está presente en el diccionario de términos. Si no se encuentra, ningún documento contiene la palabra. Sin embargo, si se encuentra, se recupera la lista invertida asociada a <strong>Milvus</strong>, que indica los documentos que contienen la palabra. Este método es mucho más eficaz que una búsqueda por fuerza bruta en un millón de documentos, ya que el diccionario de términos ordenado reduce considerablemente la complejidad temporal de la búsqueda de la palabra <strong>Milvus</strong>.</li>
<li><strong>Consulta por rango</strong>: La eficacia de las consultas de rango, como la búsqueda de documentos con palabras alfabéticamente mayores que <strong>muy</strong>, también se ve mejorada por el diccionario de términos ordenados. Este enfoque es más eficaz que una búsqueda de fuerza bruta, ya que proporciona resultados más rápidos y precisos.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Resultados de las pruebas</h3><p>Para demostrar las mejoras de rendimiento proporcionadas por los índices escalares en Milvus, se realizó un experimento comparando el rendimiento de varias expresiones utilizando la indexación invertida y la búsqueda de fuerza bruta en datos brutos.</p>
<p>El experimento consistió en probar varias expresiones en dos condiciones: con un índice invertido y con una búsqueda de fuerza bruta. Para garantizar la equidad, se mantuvo la misma distribución de datos en todas las pruebas, utilizando la misma colección cada vez. Antes de cada prueba, se liberó la colección y se eliminó y reconstruyó el índice. Además, se realizó una consulta en caliente antes de cada prueba para minimizar el impacto de los datos fríos y calientes, y cada consulta se ejecutó varias veces para garantizar la precisión.</p>
<p>Para un conjunto de datos de <strong>1 millón de</strong> registros, el uso de un <strong>índice invertido</strong> puede proporcionar una mejora del rendimiento de hasta <strong>30 veces</strong> en las consultas puntuales. Las ganancias de rendimiento pueden ser incluso más significativas para conjuntos de datos de mayor tamaño.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Recomendaciones de rendimiento<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Para aprovechar al máximo la capacidad de Milvus en la indexación de campos escalares y dar rienda suelta a su potencia en las búsquedas de similitud vectorial, es posible que necesite un modelo para estimar el tamaño de la memoria necesaria en función de los datos de que disponga.</p>
<p>Las siguientes tablas enumeran las funciones de estimación para todos los tipos de datos que soporta Milvus.</p>
<ul>
<li><p>Campos numéricos</p>
<table>
<thead>
<tr><th>Tipo de datos</th><th>Función de estimación de memoria (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>númeroDeFilas * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Campos de cadena</p>
<table>
<thead>
<tr><th>Longitud de la cadena</th><th>Función de estimación de memoria (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>númeroDeFilas * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>númeroDeFilas * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>númeroDeFilas * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Siguiente paso<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Para indexar un campo escalar, lea <a href="/docs/es/v2.4.x/index-scalar-fields.md">Construir un índice sobre escalares</a>.</p></li>
<li><p>Para obtener más información sobre los términos y reglas mencionados anteriormente, lea</p>
<ul>
<li><a href="/docs/es/v2.4.x/bitset.md">Conjunto de bits</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda híbrida</a></li>
<li><a href="/docs/es/v2.4.x/boolean.md">Reglas de expresión booleana</a></li>
<li><a href="/docs/es/v2.4.x/schema.md#Supported-data-type">Tipos de datos admitidos</a></li>
</ul></li>
</ul>
