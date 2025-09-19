---
id: language-identifier.md
title: Identificador lingüísticoCompatible with Milvus v2.5.15+
summary: >-
  El identificador_de_idioma es un tokenizador especializado diseñado para
  mejorar las capacidades de búsqueda de texto de Milvus automatizando el
  proceso de análisis del idioma. Su función principal es detectar el idioma de
  un campo de texto y, a continuación, aplicar dinámicamente un analizador
  preconfigurado que sea el más adecuado para ese idioma. Esto es especialmente
  valioso para las aplicaciones que manejan varios idiomas, ya que elimina la
  necesidad de asignar manualmente un idioma a cada entrada.
beta: Milvus v2.5.15+
---
<h1 id="Language-Identifier" class="common-anchor-header">Identificador lingüístico<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.5.15+</span><button data-href="#Language-Identifier" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">language_identifier</code> es un tokenizador especializado diseñado para mejorar las capacidades de búsqueda de texto de Milvus automatizando el proceso de análisis del idioma. Su función principal es detectar el idioma de un campo de texto y, a continuación, aplicar dinámicamente un analizador preconfigurado que sea el más adecuado para ese idioma. Esto es especialmente valioso para las aplicaciones que manejan varios idiomas, ya que elimina la necesidad de asignar manualmente un idioma a cada entrada.</p>
<p>Al dirigir de forma inteligente los datos de texto al proceso de procesamiento adecuado, <code translate="no">language_identifier</code> agiliza la entrada de datos multilingües y garantiza una tokenización precisa para las posteriores operaciones de búsqueda y recuperación.</p>
<h2 id="Language-detection-workflow" class="common-anchor-header">Flujo de trabajo de detección de idiomas<button data-href="#Language-detection-workflow" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">language_identifier</code> realiza una serie de pasos para procesar una cadena de texto, un flujo de trabajo que es fundamental para que los usuarios comprendan cómo configurarlo correctamente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/language-detection-workflow.png" alt="Language Detection Workflow" class="doc-image" id="language-detection-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de detección de idioma</span> </span></p>
<ol>
<li><p><strong>Entrada:</strong> El flujo de trabajo comienza con una cadena de texto como entrada.</p></li>
<li><p><strong>Detección del idioma:</strong> Esta cadena se pasa primero a un motor de detección de idioma, que intenta identificar el idioma. Milvus admite dos motores: <strong>whatlang</strong> y <strong>lingua</strong>.</p></li>
<li><p><strong>Selección del analizador:</strong></p>
<ul>
<li><p><strong>Éxito:</strong> Si el idioma se detecta correctamente, el sistema comprueba si el nombre del idioma detectado tiene un analizador correspondiente configurado en su diccionario <code translate="no">analyzers</code>. Si se encuentra una coincidencia, el sistema aplica el analizador especificado al texto de entrada. Por ejemplo, un texto "mandarín" detectado se enviaría a un tokenizador <code translate="no">jieba</code>.</p></li>
<li><p><strong>Fallback:</strong> Si la detección falla, o si se detecta correctamente un idioma pero no se ha proporcionado un analizador específico para él, el sistema utiliza por defecto un <strong>analizador</strong> preconfigurado. Este es un punto crucial de aclaración; el analizador <code translate="no">default</code> es una alternativa tanto para el fallo de detección como para la ausencia de un analizador adecuado.</p></li>
</ul></li>
</ol>
<p>Una vez elegido el analizador adecuado, el texto se tokeniza y se procesa, completando así el flujo de trabajo.</p>
<h2 id="Available-language-detection-engines" class="common-anchor-header">Motores de detección de idiomas disponibles<button data-href="#Available-language-detection-engines" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus permite elegir entre dos motores de detección de idiomas:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs">whatlang</a></p></li>
<li><p><a href="https://github.com/pemistahl/lingua">lingua</a></p></li>
</ul>
<p>La selección depende de los requisitos específicos de rendimiento y precisión de su aplicación.</p>
<table>
   <tr>
     <th><p>Motor</p></th>
     <th><p>Velocidad</p></th>
     <th><p>Precisión</p></th>
     <th><p>Formato de salida</p></th>
     <th><p>Lo mejor para</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">whatlang</code></p></td>
     <td><p>Rápido</p></td>
     <td><p>Bueno para la mayoría de los idiomas</p></td>
     <td><p>Nombres de idiomas (por ejemplo, <code translate="no">"English"</code>, <code translate="no">"Mandarin"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referencia:</strong> <a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">Columna de idiomas en la tabla de idiomas admitidos</a></p></td>
     <td><p>Aplicaciones en tiempo real donde la velocidad es crítica</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">lingua</code></p></td>
     <td><p>Más lento</p></td>
     <td><p>Mayor precisión, especialmente para textos cortos</p></td>
     <td><p>Nombres en inglés (por ejemplo, <code translate="no">"English"</code>, <code translate="no">"Chinese"</code>, <code translate="no">"Japanese"</code>)</p><p><strong>Referencia:</strong> <a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">Lista de idiomas admitidos</a></p></td>
     <td><p>Aplicaciones en las que la precisión es más importante que la velocidad</p></td>
   </tr>
</table>
<p>Una consideración crítica es la convención de nomenclatura del motor. Aunque ambos motores devuelven nombres de idiomas en inglés, utilizan términos diferentes para algunos idiomas (por ejemplo, <code translate="no">whatlang</code> devuelve <code translate="no">Mandarin</code>, mientras que <code translate="no">lingua</code> devuelve <code translate="no">Chinese</code>). La clave del analizador debe coincidir exactamente con el nombre devuelto por el motor de detección elegido.</p>
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
    </button></h2><p>Para utilizar correctamente el tokenizador <code translate="no">language_identifier</code>, es necesario seguir los siguientes pasos para definir y aplicar su configuración.</p>
<h3 id="Step-1-Choose-your-languages-and-analyzers" class="common-anchor-header">Paso 1: Elija sus idiomas y analizadores<button data-href="#Step-1-Choose-your-languages-and-analyzers" class="anchor-icon" translate="no">
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
    </button></h3><p>El núcleo de la configuración de <code translate="no">language_identifier</code> consiste en adaptar sus analizadores a los idiomas específicos que tiene previsto admitir. El sistema funciona emparejando el idioma detectado con el analizador correcto, por lo que este paso es crucial para un procesamiento de texto preciso.</p>
<p>A continuación se recomienda la asignación de idiomas a los analizadores Milvus adecuados. Esta tabla sirve de puente entre la salida del motor de detección de idiomas y la mejor herramienta para el trabajo.</p>
<table>
   <tr>
     <th><p>Idioma (salida del detector)</p></th>
     <th><p>Analizador recomendado</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">English</code></p></td>
     <td><p><code translate="no">type: english</code></p></td>
     <td><p>Tokenización del inglés estándar con stemming y filtrado de palabras vacías.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Mandarin</code> (vía whatlang) o <code translate="no">Chinese</code> (vía lingua)</p></td>
     <td><p><code translate="no">tokenizer: jieba</code></p></td>
     <td><p>Segmentación de palabras chinas para texto no delimitado por espacios.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">Japanese</code></p></td>
     <td><p><code translate="no">tokenizer: icu</code></p></td>
     <td><p>Un tokenizador robusto para alfabetos complejos, incluido el japonés.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">French</code></p></td>
     <td><p><code translate="no">type: standard</code>, <code translate="no">filter: ["lowercase", "asciifolding"]</code></p></td>
     <td><p>Configuración personalizada para acentos y caracteres franceses.</p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><strong>La concordancia es clave:</strong> El nombre de su analizador <strong>debe coincidir exactamente</strong> con el idioma de salida del motor de detección. Por ejemplo, si utiliza <code translate="no">whatlang</code>, la clave para el texto chino debe ser <code translate="no">Mandarin</code>.</p></li>
<li><p><strong>Mejores prácticas:</strong> La tabla anterior proporciona configuraciones recomendadas para algunos idiomas comunes, pero no es una lista exhaustiva. Para obtener una guía más completa sobre la elección de analizadores, consulte <a href="/docs/es/choose-the-right-analyzer-for-your-use-case.md">Elija el analizador adecuado para su caso de uso</a>.</p></li>
<li><p><strong>Salida del detector</strong>: Para obtener una lista completa de los nombres de los idiomas devueltos por los motores de detección, consulte la <a href="https://github.com/greyblake/whatlang-rs">tabla de idiomas compatibles con Whatlang</a> y la <a href="https://github.com/pemistahl/lingua-rs">lista de idiomas compatibles con Lingua</a>.</p></li>
</ul>
</div>
<h3 id="Step-2-Define-analyzerparams" class="common-anchor-header">Paso 2: Definir analyzer_params<button data-href="#Step-2-Define-analyzerparams" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar el tokenizador <code translate="no">language_identifier</code> en Milvus, cree un diccionario que contenga estos componentes clave:</p>
<p><strong>Componentes obligatorios:</strong></p>
<ul>
<li><p><code translate="no">analyzers</code> config set - Un diccionario que contiene todas las configuraciones del analizador, que deben incluir:</p>
<ul>
<li><p><code translate="no">default</code> - El analizador de reserva utilizado cuando falla la detección del idioma o no se encuentra ningún analizador coincidente.</p></li>
<li><p><strong>Analizadores específicos de idioma</strong> - Cada uno definido como <code translate="no">&lt;analyzer_name&gt;: &lt;analyzer_config&gt;</code>, donde:</p>
<ul>
<li><p><code translate="no">analyzer_name</code> coincide con la salida del motor de detección elegido (por ejemplo, <code translate="no">&quot;English&quot;</code>, <code translate="no">&quot;Japanese&quot;</code>)</p></li>
<li><p><code translate="no">analyzer_config</code> sigue el formato estándar de los parámetros del analizador (véase <a href="/docs/es/analyzer-overview.md#Analyzer-types">Descripción general del analizador</a>)</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Componentes opcionales:</strong></p>
<ul>
<li><p><code translate="no">identifier</code> - Especifica qué motor de detección de idiomas se va a utilizar (<code translate="no">whatlang</code> o <code translate="no">lingua</code>). Si no se especifica, el valor predeterminado es <code translate="no">whatlang</code> </p></li>
<li><p><code translate="no">mapping</code> - Crea alias personalizados para sus analizadores, lo que le permite utilizar nombres descriptivos en lugar del formato de salida exacto del motor de detección.</p></li>
</ul>
<p>El tokenizador funciona detectando primero el idioma del texto de entrada y, a continuación, seleccionando el analizador adecuado de su configuración. Si la detección falla o no existe ningún analizador que coincida, automáticamente vuelve a su analizador <code translate="no">default</code>.</p>
<h4 id="Recommended-Direct-name-matching" class="common-anchor-header">Recomendado: Coincidencia directa de nombres</h4><p>Los nombres de los analizadores deben coincidir exactamente con la salida del motor de detección de idiomas elegido. Este método es más sencillo y evita posibles confusiones.</p>
<p>Tanto para <code translate="no">whatlang</code> como para <code translate="no">lingua</code>, utilice los nombres de idioma que aparecen en sus respectivas documentaciones:</p>
<ul>
<li><p><a href="https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md">whatlang idiomas soportados</a> (utilice la columna<strong>"Idioma</strong>")</p></li>
<li><p><a href="https://github.com/pemistahl/lingua?tab=readme-ov-file#3-which-languages-are-supported">lingua idiomas soportados</a></p></li>
</ul>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,  <span class="hljs-comment"># Must be `language_identifier`</span>
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,  <span class="hljs-comment"># or `lingua`</span>
        <span class="hljs-string">&quot;analyzers&quot;</span>: {  <span class="hljs-comment"># A set of analyzer configs</span>
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>  <span class="hljs-comment"># fallback if language detection fails</span>
            },
            <span class="hljs-string">&quot;English&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {  <span class="hljs-comment"># Analyzer name that matches whatlang output</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Alternative-approach-Custom-names-with-mapping" class="common-anchor-header">Enfoque alternativo: Nombres personalizados con mapeo</h4><p>Si prefiere utilizar nombres de analizadores personalizados o necesita mantener la compatibilidad con configuraciones existentes, puede utilizar el parámetro <code translate="no">mapping</code>. De este modo, se crean alias para los analizadores, y funcionarán tanto los nombres originales del motor de detección como los nombres personalizados.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>
            },
            <span class="hljs-string">&quot;english_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
            },
            <span class="hljs-string">&quot;chinese_analyzer&quot;</span>: {  <span class="hljs-comment"># Custom analyzer name</span>
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>
            }
        },
        <span class="hljs-string">&quot;mapping&quot;</span>: {
            <span class="hljs-string">&quot;English&quot;</span>: <span class="hljs-string">&quot;english_analyzer&quot;</span>,   <span class="hljs-comment"># Maps detection output to custom name</span>
            <span class="hljs-string">&quot;Chinese&quot;</span>: <span class="hljs-string">&quot;chinese_analyzer&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Después de definir <code translate="no">analyzer_params</code>, puede aplicarlos a un campo <code translate="no">VARCHAR</code> cuando defina un esquema de colección. Esto permite a Milvus procesar el texto de ese campo utilizando el analizador especificado para una tokenización y filtrado eficientes. Para más detalles, consulte <a href="/docs/es/analyzer-overview.md#Example-use">Ejemplo de uso</a>.</p>
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
    </button></h2><p>Aquí hay algunas configuraciones listas para usar en escenarios comunes. Cada ejemplo incluye tanto la configuración como el código de verificación para que pueda probar la configuración inmediatamente.</p>
<h3 id="English-and-Chinese-detection" class="common-anchor-header">Detección de inglés y chino<button data-href="#English-and-Chinese-detection" class="anchor-icon" translate="no">
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

<span class="hljs-comment"># Configuration</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;whatlang&quot;</span>,
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;Mandarin&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;jieba&quot;</span>}
        }
    }
}

<span class="hljs-comment"># Test the configuration</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># English text</span>
result_en = client.run_analyzer(<span class="hljs-string">&quot;The Milvus vector database is built for scale!&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;English:&quot;</span>, result_en)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># English: [&#x27;The&#x27;, &#x27;Milvus&#x27;, &#x27;vector&#x27;, &#x27;database&#x27;, &#x27;is&#x27;, &#x27;built&#x27;, &#x27;for&#x27;, &#x27;scale&#x27;]</span>

<span class="hljs-comment"># Chinese text  </span>
result_cn = client.run_analyzer(<span class="hljs-string">&quot;Milvus向量数据库专为大规模应用而设计&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Chinese:&quot;</span>, result_cn)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># Chinese: [&#x27;Milvus&#x27;, &#x27;向量&#x27;, &#x27;数据&#x27;, &#x27;据库&#x27;, &#x27;数据库&#x27;, &#x27;专&#x27;, &#x27;为&#x27;, &#x27;大规&#x27;, &#x27;规模&#x27;, &#x27;大规模&#x27;, &#x27;应用&#x27;, &#x27;而&#x27;, &#x27;设计&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="European-languages-with-accent-normalization" class="common-anchor-header">Idiomas europeos con normalización de acentos<button data-href="#European-languages-with-accent-normalization" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Configuration for French, German, Spanish, etc.</span>
analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: {
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;language_identifier&quot;</span>,
        <span class="hljs-string">&quot;identifier&quot;</span>: <span class="hljs-string">&quot;lingua&quot;</span>, 
        <span class="hljs-string">&quot;analyzers&quot;</span>: {
            <span class="hljs-string">&quot;default&quot;</span>: {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>},
            <span class="hljs-string">&quot;English&quot;</span>: {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>},
            <span class="hljs-string">&quot;French&quot;</span>: {
                <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
                <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-string">&quot;asciifolding&quot;</span>]
            }
        }
    }
}

<span class="hljs-comment"># Test with accented text</span>
result_fr = client.run_analyzer(<span class="hljs-string">&quot;Café français très délicieux&quot;</span>, analyzer_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;French:&quot;</span>, result_fr)
<span class="hljs-comment"># Output: </span>
<span class="hljs-comment"># French: [&#x27;cafe&#x27;, &#x27;francais&#x27;, &#x27;tres&#x27;, &#x27;delicieux&#x27;]</span>
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
<li><p><strong>Un solo idioma por campo:</strong> Opera sobre un campo como una unidad de texto única y homogénea. Está diseñado para manejar diferentes idiomas en diferentes registros de datos, como por ejemplo un registro que contenga una frase en inglés y el siguiente una frase en francés.</p></li>
<li><p><strong>No admite cadenas de texto en varios idiomas:</strong> <strong>No</strong> está diseñado para manejar una única cadena que contenga texto de varias lenguas. Por ejemplo, un único campo <code translate="no">VARCHAR</code> que contenga tanto una frase en inglés como una frase entrecomillada en japonés se procesará como una única lengua.</p></li>
<li><p><strong>Procesamiento de la lengua dominante:</strong> En los casos de mezcla de idiomas, es probable que el motor de detección identifique el idioma dominante y aplique el analizador correspondiente a todo el texto. El resultado será una tokenización deficiente o nula del texto extranjero incrustado.</p></li>
</ul>
