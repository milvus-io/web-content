---
id: analyzer-overview.md
title: Visión general del analizador
summary: >-
  En el tratamiento de textos, un analizador es un componente crucial que
  convierte el texto en bruto en un formato estructurado que permite realizar
  búsquedas. Cada analizador suele constar de dos elementos básicos: un
  tokenizador y un filtro. Juntos, transforman el texto de entrada en tokens,
  los refinan y los preparan para una indexación y recuperación eficaces.
---
<h1 id="Analyzer-Overview​" class="common-anchor-header">Visión general del analizador<button data-href="#Analyzer-Overview​" class="anchor-icon" translate="no">
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
    </button></h1><p>En el tratamiento de textos, un <strong>analizador</strong> es un componente crucial que convierte el texto en bruto en un formato estructurado que permite realizar búsquedas. Cada analizador suele constar de dos elementos básicos: <strong>un tokenizador</strong> y un <strong>filtro</strong>. Juntos, transforman el texto de entrada en tokens, refinan estos tokens y los preparan para una indexación y recuperación eficientes.</p>
<p>En Milvus, los analizadores se configuran durante la creación de la colección cuando se añaden los campos <code translate="no">VARCHAR</code> al esquema de la colección. Los tokens producidos por un analizador pueden utilizarse para construir un índice para la correspondencia de texto o convertirse en incrustaciones dispersas para la búsqueda de texto completo. Para obtener más información, consulte <a href="/docs/es/keyword-match.md">Coincidencia de texto</a> o <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<div class="alert note">
<p>El uso de analizadores puede afectar al rendimiento.</p>
<ul>
<li><p><strong>Búsqueda de texto completo:</strong> Para la búsqueda de texto completo, los canales DataNode y <strong>QueryNode</strong> consumen datos más lentamente porque deben esperar a que se complete la tokenización. Como resultado, los datos recién ingresados tardan más en estar disponibles para la búsqueda.</p></li>
<li><p><strong>Coincidencia de texto:</strong> Para la coincidencia de texto, la creación de índices también es más lenta, ya que la tokenización debe finalizar antes de que se pueda crear un índice.</p></li>
</ul>
</div>
<h2 id="Anatomy-of-an-analyzer​" class="common-anchor-header">Anatomía de un analizador<button data-href="#Anatomy-of-an-analyzer​" class="anchor-icon" translate="no">
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
    </button></h2><p>Un analizador en Milvus consiste exactamente en un <strong>tokenizador</strong> y <strong>cero o más</strong> filtros.</p>
<ul>
<li><p><strong>Tokenizador</strong>: El tokenizador divide el texto de entrada en unidades discretas llamadas tokens. Estos tokens pueden ser palabras o frases, dependiendo del tipo de tokenizador.</p></li>
<li><p><strong>Filtros</strong>: Se pueden aplicar filtros a los tokens para refinarlos aún más, por ejemplo, poniéndolos en minúsculas o eliminando palabras comunes.</p></li>
</ul>
<p>El siguiente flujo de trabajo muestra cómo procesa el texto un analizador.</p>
<p><img translate="no" src="/docs/v2.5.x/assets/analyzer-overview.png" alt="analyzer-overview" width="400"/></p>
<h2 id="Analyzer-types​" class="common-anchor-header">Tipos de analizadores<button data-href="#Analyzer-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus proporciona dos tipos de analizadores para satisfacer diferentes necesidades de procesamiento de texto.</p>
<ul>
<li><p><strong>Analizador incorporado</strong>: Se trata de configuraciones predefinidas que cubren tareas comunes de procesamiento de texto con una configuración mínima. Los analizadores integrados son ideales para búsquedas generales, ya que no requieren una configuración compleja.</p></li>
<li><p><strong>Analizador personalizado</strong>: Para requisitos más avanzados, los analizadores personalizados le permiten definir su propia configuración especificando tanto el tokenizador como cero o más filtros. Este nivel de personalización es especialmente útil para casos de uso especializados en los que se necesita un control preciso sobre el procesamiento del texto.</p></li>
</ul>
<div class="alert note">
<p>Si omite las configuraciones del analizador durante la creación de la colección, Milvus utiliza por defecto el analizador <code translate="no">standard</code> para todo el procesamiento de texto. Para más detalles, consulte <a href="/docs/es/standard-analyzer.md">Estándar</a>.</p>
</div>
<h3 id="Built-in-analyzer​" class="common-anchor-header">Analizador incorporado</h3><p>Los analizadores incorporados en Milvus están preconfigurados con tokenizadores y filtros específicos, lo que le permite utilizarlos inmediatamente sin necesidad de definir estos componentes usted mismo. Cada analizador incorporado sirve como plantilla que incluye un tokenizador y filtros preestablecidos, con parámetros opcionales para su personalización.</p>
<p>Por ejemplo, para utilizar el analizador incorporado <code translate="no">standard</code>, basta con especificar su nombre <code translate="no">standard</code> como <code translate="no">type</code> y, opcionalmente, incluir configuraciones adicionales específicas de este tipo de analizador, como <code translate="no">stop_words</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Uses the standard built-in analyzer​</span>
    <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>] <span class="hljs-comment"># Defines a list of common words (stop words) to exclude from tokenization​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<p>La configuración del analizador incorporado <code translate="no">standard</code> anterior es equivalente a configurar un analizador personalizado con los siguientes parámetros, donde las opciones <code translate="no">tokenizer</code> y <code translate="no">filter</code> se definen explícitamente para lograr la misma funcionalidad:</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>,​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>,​
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;an&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>]​
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus ofrece los siguientes analizadores incorporados, cada uno de los cuales puede utilizarse directamente especificando su nombre como parámetro <code translate="no">type</code>.</p>
<ul>
<li><p><code translate="no">standard</code>: Adecuado para el procesamiento de texto de uso general, aplicando la tokenización estándar y el filtrado de minúsculas.</p></li>
<li><p><code translate="no">english</code>: Optimizado para textos en inglés, con soporte para palabras vacías en inglés.</p></li>
<li><p><code translate="no">chinese</code>: Especializado para el tratamiento de texto chino, con tokenización adaptada a las estructuras del idioma chino.</p></li>
</ul>
<h3 id="Custom-analyzer​" class="common-anchor-header">Analizador personalizado</h3><p>Para un procesamiento de texto más avanzado, los analizadores personalizados de Milvus le permiten construir una cadena de procesamiento de texto a medida especificando tanto un <strong>tokenizador</strong> como filtros. Esta configuración es ideal para casos de uso especializado en los que se requiere un control preciso.</p>
<h4 id="Tokenizer​" class="common-anchor-header">Tokenizador</h4><p>El <strong>tokenizador</strong> es un componente <strong>obligatorio</strong> para un analizador personalizado, que inicia el proceso de análisis descomponiendo el texto de entrada en unidades discretas o <strong>tokens</strong>. La tokenización sigue reglas específicas, como la división por espacios en blanco o signos de puntuación, dependiendo del tipo de tokenizador. Este proceso permite un tratamiento más preciso e independiente de cada palabra o frase.</p>
<p>Por ejemplo, un tokenizador convertiría el texto <code translate="no">&quot;Vector Database Built for Scale&quot;</code> en tokens separados.</p>
<pre><code translate="no" class="language-Plain Text">[<span class="hljs-string">&quot;Vector&quot;</span>, <span class="hljs-string">&quot;Database&quot;</span>, <span class="hljs-string">&quot;Built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;Scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ejemplo de especificación de un tokenizador</strong>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;whitespace&quot;</span>,​
}​
<button class="copy-code-btn"></button></code></pre>
<h4 id="Filter​" class="common-anchor-header">Filtro</h4><p><strong>Los filtros</strong> son componentes <strong>opcionales</strong> que trabajan sobre los tokens producidos por el tokenizador, transformándolos o refinándolos según sea necesario. Por ejemplo, tras aplicar un filtro <code translate="no">lowercase</code> a los términos tokenizados <code translate="no">[&quot;Vector&quot;, &quot;Database&quot;, &quot;Built&quot;, &quot;for&quot;, &quot;Scale&quot;]</code>, el resultado podría ser.</p>
<pre><code translate="no" class="language-SQL">[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;database&quot;</span>, <span class="hljs-string">&quot;built&quot;</span>, <span class="hljs-string">&quot;for&quot;</span>, <span class="hljs-string">&quot;scale&quot;</span>]​
<button class="copy-code-btn"></button></code></pre>
<p>Los filtros de un analizador personalizado pueden ser <strong>integrados</strong> o <strong>personalizados</strong>, en función de las necesidades de configuración.</p>
<ul>
<li><p><strong>Filtros integrados</strong>: Preconfigurados por Milvus, requieren una configuración mínima. Puede utilizar estos filtros directamente especificando sus nombres. Los siguientes filtros están incorporados para su uso directo.</p>
<ul>
<li><p><code translate="no">lowercase</code>: Convierte el texto a minúsculas, asegurando una coincidencia insensible a mayúsculas y minúsculas. Para más detalles, consulte <a href="/docs/es/lowercase-filter.md">Minúsculas</a>.</p></li>
<li><p><code translate="no">asciifolding</code>: Convierte los caracteres no ASCII en equivalentes ASCII, lo que simplifica el tratamiento de textos multilingües. Para más información, consulte <a href="/docs/es/ascii-folding-filter.md">Plegado ASCII</a>.</p></li>
<li><p><code translate="no">alphanumonly</code>: Conserva sólo los caracteres alfanuméricos eliminando los demás. Para más detalles, consulte <a href="/docs/es/alphanumonly-filter.md">Sólo alfanuméricos</a>.</p></li>
<li><p><code translate="no">cnalphanumonly</code>: Elimina los tokens que contienen caracteres que no sean chinos, letras inglesas o dígitos. Para obtener más información, consulte <a href="/docs/es/cnalphanumonly-filter.md">Cnalphanumonly</a>.</p></li>
<li><p><code translate="no">cncharonly</code>: Elimina los tokens que contienen caracteres no chinos. Para más información, consulte <a href="/docs/es/cncharonly-filter.md">Cncharonly</a>.</p></li>
</ul>
<p><strong>Ejemplo de uso de un filtro integrado.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>], <span class="hljs-comment"># Optional: Built-in filter that converts text to lowercase​</span>
}​
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtros personalizados</strong>: Los filtros personalizados permiten configuraciones especializadas. Puede definir un filtro personalizado eligiendo un tipo de filtro válido (<code translate="no">filter.type</code>) y añadiendo configuraciones específicas para cada tipo de filtro. Ejemplos de tipos de filtro que admiten personalización.</p>
<ul>
<li><p><code translate="no">stop</code>: Elimina palabras comunes especificadas estableciendo una lista de palabras de detención (por ejemplo, <code translate="no">&quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]</code>). Para obtener más información, consulte <a href="/docs/es/stop-filter.md">Detener</a>.</p></li>
<li><p><code translate="no">length</code>: Excluye los tokens en función de criterios de longitud, como el establecimiento de una longitud máxima de token. Para obtener más información, consulte <a href="/docs/es/length-filter.md">Longitud</a>.</p></li>
<li><p><code translate="no">stemmer</code>: Reduce las palabras a su raíz para una búsqueda más flexible. Para más detalles, consulte <a href="/docs/es/stemmer-filter.md">Stemmer</a>.</p></li>
</ul>
<p><strong>Ejemplo de configuración de un filtro personalizado.</strong></p>
<pre><code translate="no" class="language-python">analyzer_params = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-comment"># Mandatory: Specifies tokenizer​</span>
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Specifies &#x27;stop&#x27; as the filter type​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>], <span class="hljs-comment"># Customizes stop words for this filter type​</span>
        }​
    ]​
}​

<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Example-use​" class="common-anchor-header">Ejemplo de uso<button data-href="#Example-use​" class="anchor-icon" translate="no">
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
    </button></h2><p>En este ejemplo, definimos un esquema de colección con un campo vectorial para incrustaciones y dos campos <code translate="no">VARCHAR</code> para capacidades de procesamiento de texto. Cada campo <code translate="no">VARCHAR</code> está configurado con sus propios ajustes de analizador para manejar diferentes necesidades de procesamiento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
<span class="hljs-comment"># Set up a Milvus client​</span>
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = client.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
<span class="hljs-comment"># Add fields to schema​</span>
​
<span class="hljs-comment"># Use a built-in analyzer​</span>
analyzer_params_built_in = {​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title_en`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title_en&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_built_in,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Configure a custom analyzer​</span>
analyzer_params_custom = {​
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,​
    <span class="hljs-string">&quot;filter&quot;</span>: [​
        <span class="hljs-string">&quot;lowercase&quot;</span>, <span class="hljs-comment"># Built-in filter​</span>
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>​
        },​
        {​
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-comment"># Custom filter​</span>
            <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]​
        }​
    ]​
}​
​
<span class="hljs-comment"># Add VARCHAR field `title`​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;title&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params_custom,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​
​
<span class="hljs-comment"># Add vector field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​
<span class="hljs-comment"># Add primary field​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
​
<span class="hljs-comment"># Set up index params for vector field​</span>
index_params = client.prepare_index_params()​
index_params.add_index(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
<span class="hljs-comment"># Create collection with defined schema​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​
<button class="copy-code-btn"></button></code></pre>
<p></p>
