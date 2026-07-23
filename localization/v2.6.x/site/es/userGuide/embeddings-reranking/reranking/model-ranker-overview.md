---
id: model-ranker-overview.md
title: Descripción general de Model RankerCompatible with Milvus 2.6.x
summary: >-
  La búsqueda vectorial tradicional clasifica los resultados basándose
  únicamente en la similitud matemática, es decir, en el grado de coincidencia
  entre los vectores en un espacio de alta dimensión. Aunque es un método
  eficaz, este enfoque suele pasar por alto la verdadera relevancia semántica.
  Imaginemos que buscamos «mejores prácticas para la optimización de bases de
  datos»: es posible que obtengamos documentos con una alta similitud vectorial
  que mencionen estos términos con frecuencia, pero que en realidad no ofrezcan
  estrategias de optimización aplicables.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Descripción general de Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda vectorial tradicional clasifica los resultados basándose exclusivamente en la similitud matemática, es decir, en el grado de coincidencia entre los vectores en un espacio de alta dimensión. Aunque es un método eficaz, a menudo pasa por alto la verdadera relevancia semántica. Imaginemos que buscamos <strong>«mejores prácticas para la optimización de bases de datos»:</strong> es posible que obtengamos documentos con una alta similitud vectorial que mencionen estos términos con frecuencia, pero que en realidad no ofrezcan estrategias de optimización aplicables.</p>
<p>Model Ranker transforma la búsqueda de Milvus al integrar modelos lingüísticos avanzados que comprenden las relaciones semánticas entre las consultas y los documentos. En lugar de basarse únicamente en la similitud vectorial, evalúa el significado y el contexto del contenido para ofrecer resultados más inteligentes y relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Limitaciones<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Los clasificadores de modelos no se pueden utilizar con búsquedas agrupadas.</p></li>
<li><p>Los campos utilizados para la reordenación por modelo deben ser de tipo texto (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Cada «Model Ranker» solo puede utilizar un campo de tipo « <code translate="no">VARCHAR</code> » a la vez para la evaluación.</p></li>
</ul>
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
    </button></h2><p>Los clasificadores de modelos integran capacidades de comprensión de modelos lingüísticos en el proceso de búsqueda de Milvus a través de un flujo de trabajo bien definido:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Descripción general del clasificador de modelos</span>
  
 </span></p>
<ol>
<li><p><strong>Consulta inicial</strong>: tu aplicación envía una consulta a Milvus</p></li>
<li><p><strong>Búsqueda vectorial</strong>: Milvus realiza una búsqueda vectorial estándar para identificar los documentos candidatos</p></li>
<li><p><strong>Recuperación de candidatos</strong>: el sistema identifica el conjunto inicial de documentos candidatos basándose en la similitud vectorial</p></li>
<li><p><strong>Evaluación del modelo</strong>: la función «Model Ranker» procesa los pares de consulta-documento:</p>
<ul>
<li><p>Envía la consulta original y los documentos candidatos a un servicio de modelos externo</p></li>
<li><p>El modelo de lenguaje evalúa la relevancia semántica entre la consulta y cada documento</p></li>
<li><p>Cada documento recibe una puntuación de relevancia basada en la comprensión semántica</p></li>
</ul></li>
<li><p><strong>Reordenación inteligente</strong>: los documentos se reordenan en función de las puntuaciones de relevancia generadas por el modelo</p></li>
<li><p><strong>Resultados mejorados</strong>: tu aplicación recibe resultados ordenados por relevancia semántica, en lugar de solo por similitud vectorial</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Elige un proveedor de modelos que se adapte a tus necesidades<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es compatible con los siguientes proveedores de servicios de modelos para la reordenación, cada uno con características distintas:</p>
<table>
   <tr>
     <th><p>Proveedor</p></th>
     <th><p>Ideal para</p></th>
     <th><p>Características</p></th>
     <th><p>Ejemplo de caso de uso</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplicaciones complejas que requieren una comprensión semántica profunda y personalización</p></td>
     <td><ul><li><p>Compatible con diversos modelos de lenguaje a gran escala</p></li><li><p>Opciones de implementación flexibles</p></li><li><p>Mayores requisitos computacionales</p></li><li><p>Mayor potencial de personalización</p></li></ul></td>
     <td><p>Plataforma de investigación jurídica que utiliza modelos específicos del ámbito jurídico capaces de comprender la terminología jurídica y las relaciones entre la jurisprudencia</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Rápida implementación con un uso eficiente de los recursos</p></td>
     <td><ul><li><p>Servicio ligero optimizado para operaciones con texto</p></li><li><p>Implementación más sencilla con menores requisitos de recursos</p></li><li><p>Modelos de reordenación preoptimizados</p></li><li><p>Carga mínima de infraestructura</p></li></ul></td>
     <td><p>Sistema de gestión de contenidos que requiere capacidades de reordenación eficientes con requisitos estándar</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Aplicaciones empresariales que dan prioridad a la fiabilidad y la facilidad de integración</p></td>
     <td><ul><li><p>Fiabilidad y escalabilidad de nivel empresarial</p></li><li><p>Servicio gestionado sin mantenimiento de infraestructura</p></li><li><p>Funciones multilingües de reordenación</p></li><li><p>Limitación de tasa y gestión de errores integradas</p></li></ul></td>
     <td><p>Plataforma de comercio electrónico que requiere una búsqueda de alta disponibilidad con un rendimiento constante de la API y catálogos de productos multilingües</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>Aplicaciones RAG con requisitos específicos de rendimiento y contexto</p></td>
     <td><ul><li><p>Modelos entrenados específicamente para tareas de reordenación</p></li><li><p>Controles de truncamiento granulares para documentos de diversa longitud</p></li><li><p>Inferencia optimizada para cargas de trabajo en producción</p></li><li><p>Múltiples variantes de modelos (rerank-2, rerank-lite, etc.)</p></li></ul></td>
     <td><p>Base de datos de investigación con documentos de longitudes variables que requieren un control de rendimiento ajustado y una comprensión semántica especializada</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Aplicaciones que procesan documentos largos con prioridades de rentabilidad</p></td>
     <td><ul><li><p>División avanzada de documentos en fragmentos con solapamiento configurable</p></li><li><p>Puntuación basada en fragmentos (el fragmento con mayor puntuación representa el documento)</p></li><li><p>Compatibilidad con diversos modelos de reordenación</p></li><li><p>Rentable, con variantes de modelo estándar y pro</p></li></ul></td>
     <td><p>Sistema de búsqueda de documentación técnica que procesa manuales y artículos extensos que requieren una segmentación inteligente y un control de solapamiento</p></td>
   </tr>
</table>
<p>Para obtener información detallada sobre la implementación de cada servicio de modelo, consulta la documentación específica:</p>
<ul>
<li><p><a href="/docs/es/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/es/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/es/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/es/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/es/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Implementación<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de implementar Model Ranker, asegúrate de que dispones de:</p>
<ul>
<li><p>Una colección de Milvus con un campo « <code translate="no">VARCHAR</code> » que contenga el texto que se va a volver a clasificar</p></li>
<li><p>Un servicio de modelos externo en funcionamiento al que pueda acceder su instancia de Milvus</p></li>
<li><p>Una conectividad de red adecuada entre Milvus y el servicio de modelos elegido</p></li>
</ul>
<p>Los «Model Rankers» se integran a la perfección tanto con las operaciones de búsqueda vectorial estándar como con las de búsqueda híbrida. La implementación consiste en crear un objeto «Function» que defina su configuración de reordenación y pasarlo a las operaciones de búsqueda.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Crear un clasificador de modelos<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Para implementar la reclasificación mediante modelos, primero defina un objeto Function con la configuración adecuada. En este ejemplo, utilizamos TEI como proveedor de servicios:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Es obligatorio?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor / Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador de tu función que se utiliza al realizar búsquedas.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Nombre del campo de texto que se utilizará para la reclasificación.</p><p>Debe ser un campo de tipo « <code translate="no">VARCHAR</code> ».</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo de función que se está creando.</p><p>Debe establecerse en « <code translate="no">RERANK</code> » para todos los clasificadores de modelos.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Un diccionario que contiene la configuración de la función de reordenación basada en modelos. Los parámetros disponibles (claves) varían en función del proveedor de servicios.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Debe establecerse en « <code translate="no">"model"</code> » para habilitar la reclasificación basada en modelos.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sí</p></td>
     <td><p>El proveedor de servicios de modelos que se utilizará para la reclasificación.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Lista de cadenas de consulta utilizadas por el modelo de reordenación para calcular las puntuaciones de relevancia.</p><p>El número de cadenas de consulta debe coincidir exactamente con el número de consultas de la operación de búsqueda (incluso cuando se utilicen vectores de consulta en lugar de texto); de lo contrario, se generará un error.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sí</p></td>
     <td><p>URL del servicio del modelo.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>Número máximo de documentos que se pueden procesar en un solo lote. Los valores más altos aumentan el rendimiento, pero requieren más memoria.</p></td>
     <td><p><code translate="no">32</code> (por defecto)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar a la búsqueda vectorial estándar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Una vez definido el clasificador del modelo, puedes aplicarlo durante las operaciones de búsqueda pasándolo al parámetro «ranker»:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
