---
id: choose-the-right-analyzer-for-your-use-case.md
title: Elija el analizador adecuado para su caso de uso
summary: Notas
---
<h1 id="Choose-the-Right-Analyzer-for-Your-Use-Case" class="common-anchor-header">Elija el analizador adecuado para su caso de uso<button data-href="#Choose-the-Right-Analyzer-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert note">
<p>Esta guía se centra en la toma de decisiones prácticas para la selección del analizador. Para obtener detalles técnicos sobre los componentes del analizador y sobre cómo añadir parámetros del analizador, consulte <a href="/docs/es/analyzer-overview.md">Descripción general del analizador</a>.</p>
</div>
<h2 id="Understand-analyzers-in-2-minutes" class="common-anchor-header">Comprender los analizadores en 2 minutos<button data-href="#Understand-analyzers-in-2-minutes" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, un analizador procesa el texto almacenado en este campo para hacerlo consultable para funciones como <a href="/docs/es/full-text-search.md">la búsqueda de texto completo</a> (BM25), la <a href="/docs/es/phrase-match.md">concordancia de frase</a> o <a href="/docs/es/keyword-match.md">la concordancia de texto</a>. Piense en él como un procesador de texto que transforma su contenido sin procesar en tokens buscables.</p>
<p>Un analizador funciona en un proceso simple de dos etapas:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/analyzer-workflow.png" alt="Analyzer Workflow" class="doc-image" id="analyzer-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo del analizador</span> </span></p>
<ol>
<li><p><strong>Tokenización (obligatoria):</strong> Esta etapa inicial aplica un <strong>tokenizador</strong> para dividir una cadena continua de texto en unidades discretas y significativas llamadas tokens. El método de tokenización puede variar significativamente según el idioma y el tipo de contenido.</p></li>
<li><p><strong>Filtrado de tokens (opcional):</strong> Tras la tokenización, se aplican <strong>filtros</strong> para modificar, eliminar o refinar los tokens. Estas operaciones pueden incluir la conversión de todos los tokens a minúsculas, la eliminación de palabras comunes sin sentido (como stopwords) o la reducción de palabras a su forma raíz (stemming).</p></li>
</ol>
<p><strong>Ejemplo</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input: &quot;Hello World!&quot; 
       1. Tokenization → [&quot;Hello&quot;, &quot;World&quot;, &quot;!&quot;]
       2. Lowercase &amp; Punctuation Filtering → [&quot;hello&quot;, &quot;world&quot;]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Why-the-choice-of-analyzer-matters" class="common-anchor-header">Por qué es importante la elección del analizador<button data-href="#Why-the-choice-of-analyzer-matters" class="anchor-icon" translate="no">
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
    </button></h2><p>La elección de un analizador incorrecto puede hacer que no se puedan buscar documentos relevantes o que se obtengan resultados irrelevantes.</p>
<p>En la tabla siguiente se resumen los problemas más comunes causados por una selección incorrecta del analizador y se ofrecen soluciones prácticas para diagnosticar los problemas de búsqueda.</p>
<table>
   <tr>
     <th><p>Problema</p></th>
     <th><p>Síntoma</p></th>
     <th><p>Ejemplo (entrada y salida)</p></th>
     <th><p>Causa (mal analizador)</p></th>
     <th><p>Solución (buen analizador)</p></th>
   </tr>
   <tr>
     <td><p>Sobre-tokenización</p></td>
     <td><p>Las consultas de texto para términos técnicos, identificadores o URL no encuentran documentos relevantes.</p></td>
     <td><ul><li><p><code translate="no">"user_id"</code> → <code translate="no">['user', 'id']</code></p></li><li><p><code translate="no">"C++"</code> → <code translate="no">['c']</code></p></li></ul></td>
     <td><p><a href="/docs/es/standard-analyzer.md"><code translate="no">standard</code></a> analizador</p></td>
     <td><p>Utilice un <a href="/docs/es/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizer; combínelo con un <a href="/docs/es/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Subtokenización</p></td>
     <td><p>La búsqueda de un componente de una frase de varias palabras no devuelve documentos que contengan la frase completa.</p></td>
     <td><p><code translate="no">"state-of-the-art"</code> → <code translate="no">['state-of-the-art']</code></p></td>
     <td><p>Analizador con un <a href="/docs/es/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador</p></td>
     <td><p>Utilice un <a href="/docs/es/standard-tokenizer.md"><code translate="no">standard</code></a> tokenizer para dividir en puntuación y espacios; utilice un filtro <a href="/docs/es/regex-filter.md">regex</a> personalizado.</p></td>
   </tr>
   <tr>
     <td><p>Desajustes de idioma</p></td>
     <td><p>Los resultados de la búsqueda para un idioma específico no tienen sentido o no existen.</p></td>
     <td><p>Texto chino: <code translate="no">"机器学习"</code> → <code translate="no">['机器学习']</code> (un token)</p></td>
     <td><p><a href="/docs/es/english-analyzer.md"><code translate="no">english</code></a> analizador</p></td>
     <td><p>Utilice un analizador específico del idioma, como <a href="/docs/es/chinese-analyzer.md"><code translate="no">chinese</code></a>.</p></td>
   </tr>
</table>
<h2 id="First-question-Do-you-need-to-choose-an-analyzer" class="common-anchor-header">Primera pregunta: ¿Es necesario elegir un analizador?<button data-href="#First-question-Do-you-need-to-choose-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>En muchos casos no es necesario hacer nada especial. Determinemos si eres uno de ellos.</p>
<h3 id="Default-behavior-standard-analyzer" class="common-anchor-header">Comportamiento por defecto: <code translate="no">standard</code> analyzer<button data-href="#Default-behavior-standard-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Si no especifica un analizador al utilizar funciones de recuperación de texto como la búsqueda de texto completo, Milvus utiliza automáticamente el analizador <a href="/docs/es/standard-analyzer.md"><code translate="no">standard</code></a> analizador.</p>
<p>El analizador <code translate="no">standard</code>:</p>
<ul>
<li><p>Divide el texto en espacios y signos de puntuación</p></li>
<li><p>Convierte todos los tokens a minúsculas</p></li>
<li><p>Elimina un conjunto integrado de palabras de parada comunes en inglés y la mayoría de los signos de puntuación.</p></li>
</ul>
<p><strong>Ejemplo de transformación</strong>:</p>
<pre><code translate="no" class="language-plaintext">Input:  &quot;The Milvus vector database is built for scale!&quot;
Output: [&#x27;the&#x27;, &#x27;milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;scale&#x27;]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Decision-criteria-A-quick-check" class="common-anchor-header">Criterios de decisión: Comprobación rápida<button data-href="#Decision-criteria-A-quick-check" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice esta tabla para determinar rápidamente si el analizador por defecto de <code translate="no">standard</code> satisface sus necesidades. Si no lo hace, tendrá que elegir un camino diferente.</p>
<table>
   <tr>
     <th><p>Su contenido</p></th>
     <th><p>¿Está bien el analizador estándar?</p></th>
     <th><p>Por qué</p></th>
     <th><p>Qué necesita</p></th>
   </tr>
   <tr>
     <td><p>Entradas de blog en inglés</p></td>
     <td><p>✅ Sí</p></td>
     <td><p>El comportamiento por defecto es suficiente.</p></td>
     <td><p>Use el predeterminado (no necesita configuración).</p></td>
   </tr>
   <tr>
     <td><p>Documentos en chino</p></td>
     <td><p>❌ No</p></td>
     <td><p>Las palabras chinas no tienen espacios y se tratarán como un solo token.</p></td>
     <td><p>Utilice un <a href="/docs/es/chinese-analyzer.md"><code translate="no">chinese</code></a> integrado.</p></td>
   </tr>
   <tr>
     <td><p>Documentación técnica</p></td>
     <td><p>❌ No</p></td>
     <td><p>Se eliminan los signos de puntuación de términos como <code translate="no">C++</code>.</p></td>
     <td><p>Cree un analizador personalizado con un <a href="/docs/es/whitespace-tokenizer.md"><code translate="no">whitespace</code></a> tokenizador y un <a href="/docs/es/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a> filtro.</p></td>
   </tr>
   <tr>
     <td><p>Lenguas separadas por espacios como el texto francés/español</p></td>
     <td><p>⚠️ Tal vez</p></td>
     <td><p>Los caracteres acentuados (<code translate="no">café</code> vs. <code translate="no">cafe</code>) pueden no coincidir.</p></td>
     <td><p>Se recomienda utilizar un analizador personalizado con el <a href="/docs/es/ascii-folding-filter.md"><code translate="no">asciifolding</code></a> para obtener mejores resultados.</p></td>
   </tr>
   <tr>
     <td><p>Idiomas multilingües o desconocidos</p></td>
     <td><p>❌ No</p></td>
     <td><p>El analizador <code translate="no">standard</code> carece de la lógica específica del idioma necesaria para manejar diferentes conjuntos de caracteres y reglas de tokenización.</p></td>
     <td><p>Utilice un analizador personalizado con el <a href="/docs/es/icu-tokenizer.md"><code translate="no">icu</code></a> para la tokenización unicode. </p><p>Como alternativa, considere la posibilidad de configurar <a href="/docs/es/multi-language-analyzers.md">analizadores multilingües</a> o un <a href="/docs/es/language-identifier.md">identificador de idioma</a> para una gestión más precisa del contenido multilingüe.</p></td>
   </tr>
</table>
<p>Si el analizador predeterminado de <code translate="no">standard</code> no puede satisfacer sus necesidades, deberá implementar uno diferente. Tiene dos opciones:</p>
<ul>
<li><p><a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md#Path-A-Use-built-in-analyzers">Utilizar un analizador incorporado</a> o</p></li>
<li><p><a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md#Path-B-Create-a-custom-analyzer">Crear uno personalizado</a></p></li>
</ul>
<h2 id="Path-A-Use-built-in-analyzers" class="common-anchor-header">Ruta A: Utilizar analizadores integrados<button data-href="#Path-A-Use-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h2><p>Los analizadores integrados son soluciones preconfiguradas para los lenguajes más comunes. Son la forma más sencilla de empezar cuando el analizador estándar predeterminado no se adapta perfectamente.</p>
<h3 id="Available-built-in-analyzers" class="common-anchor-header">Analizadores integrados disponibles<button data-href="#Available-built-in-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Analizador</p></th>
     <th><p>Soporte de idiomas</p></th>
     <th><p>Componentes</p></th>
     <th><p>Notas</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/standard-analyzer.md"><code translate="no">standard</code></a></p></td>
     <td><p>La mayoría de los idiomas separados por espacios (inglés, francés, alemán, español, etc.)</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code></p></li></ul></td>
     <td><p>Analizador de uso general para el tratamiento inicial del texto. Para situaciones monolingües, los analizadores específicos por idioma (como <code translate="no">english</code>) ofrecen un mejor rendimiento.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/english-analyzer.md"><code translate="no">english</code></a></p></td>
     <td><p>Dedicado al inglés, que aplica stemming y eliminación de palabras vacías para una mejor correspondencia semántica en inglés.</p></td>
     <td><ul><li><p>Tokenizador: <code translate="no">standard</code></p></li><li><p>Filtros: <code translate="no">lowercase</code> <code translate="no">stemmer</code> , <code translate="no">stop</code></p></li></ul></td>
     <td><p>Recomendado para contenidos exclusivamente en inglés por encima de <code translate="no">standard</code>.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/chinese-analyzer.md"><code translate="no">chinese</code></a></p></td>
     <td><p>Chino</p></td>
     <td><ul><li><p>Tokenizer: <code translate="no">jieba</code></p></li><li><p>Filtros: <code translate="no">cnalphanumonly</code></p></li></ul></td>
     <td><p>Actualmente utiliza el diccionario de chino simplificado por defecto.</p></td>
   </tr>
</table>
<h3 id="Implementation-example" class="common-anchor-header">Ejemplo de implementación<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar un analizador incorporado, basta con especificar su tipo en <code translate="no">analyzer_params</code> al definir el esquema de campos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using built-in English analyzer</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para obtener información detallada sobre su uso, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>, <a href="/docs/es/keyword-match.md">Coincidencia de texto</a> o <a href="/docs/es/phrase-match.md">Coincidencia de frase</a>.</p>
</div>
<h2 id="Path-B-Create-a-custom-analyzer" class="common-anchor-header">Ruta B: Crear un analizador personalizado<button data-href="#Path-B-Create-a-custom-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Cuando <a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md#Available-built-in-analyzers">las opciones incorporadas</a> no satisfacen sus necesidades, puede crear un analizador personalizado combinando un tokenizador con un conjunto de filtros. De este modo, tendrá un control total sobre el procesamiento del texto.</p>
<h3 id="Step-1-Select-the-tokenizer-based-on-language" class="common-anchor-header">Paso 1: Seleccionar el tokenizador en función del idioma<button data-href="#Step-1-Select-the-tokenizer-based-on-language" class="anchor-icon" translate="no">
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
    </button></h3><p>Elija el tokenizador en función del idioma principal de su contenido:</p>
<h4 id="Western-languages" class="common-anchor-header">Lenguas occidentales</h4><p>Para las lenguas separadas por espacios, tiene estas opciones:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Lo mejor para</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/standard-tokenizer.md"><code translate="no">standard</code></a></p></td>
     <td><p>Divide el texto en función de los espacios y los signos de puntuación</p></td>
     <td><p>Texto general, puntuación mixta</p></td>
     <td><ul><li><p>Entrada <code translate="no">"Hello, world! Visit example.com"</code></p></li><li><p>Salida: <code translate="no">['Hello', 'world', 'Visit', 'example', 'com']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/whitespace-tokenizer.md"><code translate="no">whitespace</code></a></p></td>
     <td><p>Divide el texto sólo en función de los espacios en blanco</p></td>
     <td><p>Contenido preprocesado, texto formateado por el usuario</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"user_id = get_user_data()"</code></p></li><li><p>Salida: <code translate="no">['user_id', '=', 'get_user_data()']</code></p></li></ul></td>
   </tr>
</table>
<h4 id="East-Asian-languages" class="common-anchor-header">Lenguas de Asia oriental</h4><p>Las lenguas basadas en diccionarios requieren tokenizadores especializados para una segmentación adecuada de las palabras:</p>
<h5 id="Chinese" class="common-anchor-header">Chino</h5><table>
   <tr>
     <th><p>Tokenizador</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Lo mejor para</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/jieba-tokenizer.md"><code translate="no">jieba</code></a></p></td>
     <td><p>Segmentación basada en diccionario chino con algoritmo inteligente</p></td>
     <td><p><strong>Recomendado para contenidos en</strong> chino - combina diccionario con algoritmos inteligentes, específicamente diseñados para el chino</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习是人工智能的一个分支"</code></p></li><li><p>Salida: <code translate="no">['机器', '学习', '是', '人工', '智能', '人工智能', '的', '一个', '分支']</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p>Análisis morfológico puro basado en diccionario con diccionario chino<a href="https://cc-cedict.org/wiki/">(cc-cedict</a>)</p></td>
     <td><p>En comparación con <code translate="no">jieba</code>, procesa el texto chino de forma más genérica</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"机器学习算法"</code></p></li><li><p>Salida: <code translate="no">["机器", "学习", "算法"]</code></p></li></ul></td>
   </tr>
</table>
<h5 id="Japanese-and-Korean" class="common-anchor-header">Japonés y coreano</h5><table>
   <tr>
     <th><p>Idioma</p></th>
     <th><p>Tokenizador</p></th>
     <th><p>Opciones de diccionario</p></th>
     <th><p>Mejor para</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p>Japonés</p></td>
     <td><p><a href="/docs/es/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://taku910.github.io/mecab/">ipádico</a> (de uso general), <a href="https://github.com/neologd/mecab-ipadic-neologd">ipádico-neológico</a> (términos modernos), <a href="https://clrd.ninjal.ac.jp/unidic/">unídico</a> (académico)</p></td>
     <td><p>Análisis morfológico con tratamiento de nombres propios</p></td>
     <td><ul><li><p>Entrada <code translate="no">"東京都渋谷区"</code></p></li><li><p>Salida: <code translate="no">["東京", "都", "渋谷", "区"]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>Coreano</p></td>
     <td><p><a href="/docs/es/lindera-tokenizer.md"><code translate="no">lindera</code></a></p></td>
     <td><p><a href="https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/">ko-dic</a></p></td>
     <td><p>Análisis morfológico del coreano</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"안녕하세요"</code></p></li><li><p>Salida: <code translate="no">["안녕", "하", "세요"]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Multilingual-or-unknown-languages" class="common-anchor-header">Lenguas multilingües o desconocidas</h4><p>Para contenidos en los que los idiomas son impredecibles o están mezclados dentro de los documentos:</p>
<table>
   <tr>
     <th><p>Tokenizer</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Lo mejor para</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/icu-tokenizer.md"><code translate="no">icu</code></a></p></td>
     <td><p>Tokenización compatible con Unicode (International Components for Unicode)</p></td>
     <td><p>Escrituras mixtas, idiomas desconocidos o cuando basta con una simple tokenización.</p></td>
     <td><ul><li><p>Entrada: <code translate="no">"Hello 世界 مرحبا"</code></p></li><li><p>Salida: <code translate="no">['Hello', ' ', '世界', ' ', 'مرحبا']</code></p></li></ul></td>
   </tr>
</table>
<p><strong>Cuándo utilizar icu</strong>:</p>
<ul>
<li><p>Lenguajes mixtos en los que la identificación del idioma no es práctica.</p></li>
<li><p>No se desea la sobrecarga de <a href="/docs/es/multi-language-analyzers.md">los analizadores multilingües</a> o del <a href="/docs/es/language-identifier.md">identificador de idioma</a>.</p></li>
<li><p>El contenido tiene una lengua principal con palabras extranjeras ocasionales que contribuyen poco al significado global (por ejemplo, texto en inglés con nombres de marcas o términos técnicos esporádicos en japonés o francés).</p></li>
</ul>
<p><strong>Enfoques alternativos</strong>: Para un tratamiento más preciso del contenido multilingüe, considere la posibilidad de utilizar analizadores multilingües o el identificador de idioma. Para más información, consulte <a href="/docs/es/multi-language-analyzers.md">Analizadores multilingües</a> o <a href="/docs/es/language-identifier.md">Identificador de lengua</a>.</p>
<h3 id="Step-2-Add-filters-for-precision" class="common-anchor-header">Paso 2: Añadir filtros para mayor precisión<button data-href="#Step-2-Add-filters-for-precision" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez <a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md#Step-1-Select-the-tokenizer-based-on-language">seleccionado el tokenizador</a>, aplique filtros en función de sus requisitos de búsqueda específicos y de las características del contenido.</p>
<h4 id="Commonly-used-filters" class="common-anchor-header">Filtros de uso común</h4><p>Estos filtros son esenciales para la mayoría de las configuraciones de idiomas separados por espacios (inglés, francés, alemán, español, etc.) y mejoran significativamente la calidad de la búsqueda:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Cuándo utilizarlo</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/lowercase-filter.md"><code translate="no">lowercase</code></a></p></td>
     <td><p>Convertir todos los tokens a minúsculas</p></td>
     <td><p>Universal - se aplica a todos los idiomas con distinción entre mayúsculas y minúsculas</p></td>
     <td><ul><li><p>Entrada <code translate="no">["Apple", "iPhone"]</code></p></li><li><p>Salida: <code translate="no">[['apple'], ['iphone']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/stemmer-filter.md"><code translate="no">stemmer</code></a></p></td>
     <td><p>Reducir las palabras a su forma raíz</p></td>
     <td><p>Lenguas con inflexiones de palabras (inglés, francés, alemán, etc.)</p></td>
     <td><p>Para el inglés:</p><ul><li><p>Entrada: <code translate="no">["running", "runs", "ran"]</code></p></li><li><p>Salida: <code translate="no">[['run'], ['run'], ['ran']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/stop-filter.md"><code translate="no">stop</code></a></p></td>
     <td><p>Eliminar palabras comunes sin sentido</p></td>
     <td><p>Para la mayoría de las lenguas - especialmente eficaz para las lenguas separadas por espacios</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["the", "quick", "brown", "fox"]</code></p></li><li><p>Salida: <code translate="no">[[], ['quick'], ['brown'], ['fox']]</code></p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Para las lenguas de Asia Oriental (chino, japonés, coreano, etc.), utilice <a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md#Language-specific-filters">filtros específicos para cada lengua</a>. Estas lenguas suelen utilizar métodos distintos para procesar el texto y puede que no se beneficien significativamente de la normalización.</p>
</div>
<h4 id="Text-normalization-filters" class="common-anchor-header">Filtros de normalización de texto</h4><p>Estos filtros normalizan las variaciones de texto para mejorar la coherencia de las coincidencias:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Cuándo utilizarlo</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/ascii-folding-filter.md"><code translate="no">asciifolding</code></a></p></td>
     <td><p>Convertir caracteres acentuados en equivalentes ASCII</p></td>
     <td><p>Contenido internacional, contenido generado por el usuario</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["café", "naïve", "résumé"]</code></p></li><li><p>Salida: <code translate="no">[['cafe'], ['naive'], ['resume']]</code></p></li></ul></td>
   </tr>
</table>
<h4 id="Token-filtering" class="common-anchor-header">Filtrado de símbolos</h4><p>Controle qué tokens se conservan en función del contenido o la longitud de los caracteres:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Cómo funciona</p></th>
     <th><p>Cuándo utilizarlo</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/removepunct-filter.md"><code translate="no">removepunct</code></a></p></td>
     <td><p>Eliminar signos de puntuación independientes</p></td>
     <td><p>Limpia los resultados de los tokenizadores <code translate="no">jieba</code>, <code translate="no">lindera</code>, <code translate="no">icu</code>, que devuelven los signos de puntuación como tokens individuales.</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "!", "world"]</code></p></li><li><p>Salida: <code translate="no">[['Hello'], ['world']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/alphanumonly-filter.md"><code translate="no">alphanumonly</code></a></p></td>
     <td><p>Mantener sólo letras y números</p></td>
     <td><p>Contenido técnico, procesamiento de texto limpio</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["user123", "test@email.com"]</code></p></li><li><p>Salida: <code translate="no">[['user123'], ['test', 'email', 'com']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/length-filter.md"><code translate="no">length</code></a></p></td>
     <td><p>Elimina los tokens fuera del rango de longitud especificado</p></td>
     <td><p>Filtrar el ruido (tokens excesivamente largos)</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["a", "very", "extraordinarily"]</code></p></li><li><p>Salida: <code translate="no">[['a'], ['very'], []]</code> (si <strong>max=10</strong>)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/regex-filter.md"><code translate="no">regex</code></a></p></td>
     <td><p>Filtrado personalizado basado en patrones</p></td>
     <td><p>Requisitos de token específicos del dominio</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["test123", "prod456"]</code></p></li><li><p>Salida: <code translate="no">[[], ['prod456']]</code> (si <strong>expr="^prod"</strong>)</p></li></ul></td>
   </tr>
</table>
<h4 id="Language-specific-filters" class="common-anchor-header">Filtros específicos de idioma</h4><p>Estos filtros gestionan características específicas del idioma:</p>
<table>
   <tr>
     <th><p>Filtro</p></th>
     <th><p>Idioma</p></th>
     <th><p>Funcionamiento</p></th>
     <th><p>Ejemplos</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/decompounder-filter.md"><code translate="no">decompounder</code></a></p></td>
     <td><p>Alemán</p></td>
     <td><p>Divide palabras compuestas en componentes buscables</p></td>
     <td><ul><li><p>Entrada <code translate="no">["dampfschifffahrt"]</code></p></li><li><p>Salida: <code translate="no">[['dampf', 'schiff', 'fahrt']]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/cnalphanumonly-filter.md">cnalphanumonly</a></p></td>
     <td><p>Chino</p></td>
     <td><p>Mantiene caracteres chinos + alfanuméricos</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123", "!@#"]</code></p></li><li><p>Salida: <code translate="no">[['Hello'], ['世界'], ['123'], []]</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/cncharonly-filter.md"><code translate="no">cncharonly</code></a></p></td>
     <td><p>Chino</p></td>
     <td><p>Mantiene sólo caracteres chinos</p></td>
     <td><ul><li><p>Entrada: <code translate="no">["Hello", "世界", "123"]</code></p></li><li><p>Salida: <code translate="no">[[], ['世界'], []]</code></p></li></ul></td>
   </tr>
</table>
<h3 id="Step-3-Combine-and-implement" class="common-anchor-header">Paso 3: Combinar e implementar<button data-href="#Step-3-Combine-and-implement" class="anchor-icon" translate="no">
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
    </button></h3><p>Para crear su analizador personalizado, defina el tokenizador y una lista de filtros en el diccionario <code translate="no">analyzer_params</code>. Los filtros se aplican en el orden en que aparecen en la lista.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example: A custom analyzer for technical content</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;alphanumonly&quot;</span>]
}

<span class="hljs-comment"># Applying analyzer config to target VARCHAR field in your collection schema</span>
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    analyzer_params=analyzer_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Final-Test-with-runanalyzer" class="common-anchor-header">Final: Pruebe con <code translate="no">run_analyzer</code><button data-href="#Final-Test-with-runanalyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Valide siempre su configuración antes de aplicarla a una colección:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample text to analyze</span>
sample_text = <span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>

<span class="hljs-comment"># Run analyzer with the defined configuration</span>
result = client.run_analyzer(sample_text, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Analyzer output:&quot;</span>, result)
<button class="copy-code-btn"></button></code></pre>
<p>Problemas comunes a comprobar:</p>
<ul>
<li><p><strong>Exceso de símbolos</strong>: Términos técnicos divididos incorrectamente.</p></li>
<li><p><strong>Infra-tokenización</strong>: Frases mal separadas</p></li>
<li><p><strong>Ausencia de tokens</strong>: Filtrado de términos importantes</p></li>
</ul>
<p>Para más información, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md">run_analyzer</a>.</p>
<h2 id="Recommended-configurations-by-use-case" class="common-anchor-header">Configuraciones recomendadas por caso de uso<button data-href="#Recommended-configurations-by-use-case" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección proporciona configuraciones recomendadas de tokenizadores y filtros para casos de uso comunes cuando se trabaja con analizadores en Milvus. Elija la combinación que mejor se adapte a su tipo de contenido y a sus requisitos de búsqueda.</p>
<div class="alert note">
<p>Antes de aplicar un analizador a su colección, le recomendamos que utilice <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/CollectionSchema/run_analyzer.md"><code translate="no">run_analyzer</code></a> para probar y validar el rendimiento del análisis de texto.</p>
</div>
<h3 id="Languages-with-accent-marks-French-Spanish-German-etc" class="common-anchor-header">Idiomas con tildes (francés, español, alemán, etc.)<button data-href="#Languages-with-accent-marks-French-Spanish-German-etc" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice un tokenizador <code translate="no">standard</code> con conversión a minúsculas, stemming específico del idioma y eliminación de stopwords. Esta configuración también funciona para otros idiomas europeos modificando los parámetros <code translate="no">language</code> y <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># French example</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>, 
        <span class="hljs-string">&quot;asciifolding&quot;</span>,  <span class="hljs-comment"># Handle accent marks</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;french&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_french_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># For other languages, modify the language parameter:</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;spanish&quot; for Spanish</span>
<span class="hljs-comment"># &quot;language&quot;: &quot;german&quot; for German</span>
<span class="hljs-comment"># &quot;stop_words&quot;: [&quot;_spanish_&quot;] or [&quot;_german_&quot;] accordingly</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="English-content" class="common-anchor-header">Contenido en inglés<button data-href="#English-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Para el tratamiento de textos en inglés con filtrado exhaustivo. También puede utilizar el analizador <a href="/docs/es/english-analyzer.md"><code translate="no">english</code></a> integrado:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stemmer&quot;</span>,
            <span class="hljs-string">&quot;language&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
        },
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;_english_&quot;</span>]
        }
    ]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chinese-content" class="common-anchor-header">Contenido en chino<button data-href="#Chinese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice el tokenizador <code translate="no">jieba</code> y aplique un filtro de caracteres para conservar sólo los caracteres chinos, las letras latinas y los dígitos.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;cnalphanumonly&quot;</span>]
}

<span class="hljs-comment"># Equivalent built-in shortcut:</span>
analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;chinese&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para el chino simplificado, <code translate="no">cnalphanumonly</code> elimina todos los tokens excepto los caracteres chinos, el texto alfanumérico y los dígitos. Esto evita que la puntuación afecte a la calidad de la búsqueda.</p>
</div>
<h3 id="Japanese-content" class="common-anchor-header">Contenido en japonés<button data-href="#Japanese-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice el tokenizador <code translate="no">lindera</code> con el diccionario japonés y los filtros para limpiar la puntuación y controlar la longitud de los tokens:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;lindera&quot;</span>,
        <span class="hljs-string">&quot;dict&quot;</span>: <span class="hljs-string">&quot;ipadic&quot;</span>  <span class="hljs-comment"># Options: ipadic, ipadic-neologd, unidic</span>
    },
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;removepunct&quot;</span>,  <span class="hljs-comment"># Remove standalone punctuation</span>
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>,
            <span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">20</span>
        }
    ]
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Korean-content" class="common-anchor-header">Contenido en coreano<button data-href="#Korean-content" class="anchor-icon" translate="no">
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
    </button></h3><p>De forma similar al japonés, utilice el tokenizador <code translate="no">lindera</code> con el diccionario coreano:</p>
<pre><code translate="no" class="language-json">analyzer_params = <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tokenizer&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lindera&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;dict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ko-dic&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;filter&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;removepunct&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;length&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;min&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;max&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mixed-or-multilingual-content" class="common-anchor-header">Contenido mixto o multilingüe<button data-href="#Mixed-or-multilingual-content" class="anchor-icon" translate="no">
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
    </button></h3><p>Cuando trabaje con contenidos que abarquen varios idiomas o utilicen guiones de forma impredecible, comience con el analizador <code translate="no">icu</code>. Este analizador compatible con Unicode gestiona de forma eficaz la mezcla de guiones y símbolos.</p>
<p><strong>Configuración multilingüe básica (sin stemming)</strong>:</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;icu&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>Procesamiento multilingüe avanzado</strong>:</p>
<p>Para controlar mejor el comportamiento de los tokens en distintos idiomas:</p>
<ul>
<li><p>Utilice una configuración de <strong>analizador multilingüe</strong>. Para más detalles, consulte <a href="/docs/es/multi-language-analyzers.md">Analizadores multilingües</a>.</p></li>
<li><p>Implemente un <strong>identificador de idioma</strong> en su contenido. Para más información, consulte <a href="/docs/es/language-identifier.md">Identificador de idioma</a>.</p></li>
</ul>
<h2 id="Integrate-with-text-retrieval-features" class="common-anchor-header">Integración con funciones de recuperación de texto<button data-href="#Integrate-with-text-retrieval-features" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de seleccionar su analizador, puede integrarlo con las funciones de recuperación de texto proporcionadas por Milvus.</p>
<ul>
<li><p><strong>Búsqueda de texto completo</strong></p>
<p>Los analizadores influyen directamente en la búsqueda de texto completo basada en BM25 mediante la generación de vectores dispersos. Utilice el mismo analizador para la indexación y la consulta con el fin de garantizar una tokenización coherente. Los analizadores específicos de un idioma suelen proporcionar una mejor puntuación BM25 que los genéricos. Para más información, consulte la sección <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p></li>
<li><p><strong>Coincidencia de texto</strong></p>
<p>Las operaciones de concordancia de texto realizan una concordancia exacta de tokens entre las consultas y el contenido indexado basándose en los resultados del analizador. Para más información, consulte la sección <a href="/docs/es/keyword-match.md">Coincidencia de texto</a>.</p></li>
<li><p><strong>Coincidencia de frases</strong></p>
<p>La concordancia de frases requiere una tokenización coherente en expresiones de varias palabras para mantener los límites y el significado de las frases. Para obtener más información sobre la implementación, consulte <a href="/docs/es/phrase-match.md">Coincidencia de frases</a>.</p></li>
</ul>
