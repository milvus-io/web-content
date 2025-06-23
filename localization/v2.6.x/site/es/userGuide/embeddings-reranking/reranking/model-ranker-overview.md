---
id: model-ranker-overview.md
title: Visión general del clasificador de modelosCompatible with Milvus 2.6.x
summary: >-
  La búsqueda vectorial tradicional clasifica los resultados exclusivamente por
  similitud matemática, es decir, por la coincidencia de los vectores en un
  espacio de alta dimensión. A pesar de su eficacia, este enfoque suele pasar
  por alto la verdadera relevancia semántica. Considere la posibilidad de buscar
  "mejores prácticas para la optimización de bases de datos": es posible que
  reciba documentos con una alta similitud vectorial que mencionen estos
  términos con frecuencia, pero que en realidad no proporcionen estrategias de
  optimización prácticas.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Visión general del clasificador de modelos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda vectorial tradicional clasifica los resultados exclusivamente por similitud matemática, es decir, por la coincidencia de los vectores en un espacio de alta dimensión. A pesar de su eficacia, este enfoque suele pasar por alto la verdadera relevancia semántica. Considere la búsqueda de <strong>"mejores prácticas para la optimización de bases de datos":</strong> podría recibir documentos con alta similitud vectorial que mencionan estos términos con frecuencia, pero que en realidad no proporcionan estrategias de optimización procesables.</p>
<p>Model Ranker transforma la búsqueda en Milvus al integrar modelos lingüísticos avanzados que comprenden las relaciones semánticas entre las consultas y los documentos. En lugar de basarse únicamente en la similitud vectorial, evalúa el significado del contenido y el contexto para ofrecer resultados más inteligentes y relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Los clasificadores por modelos no pueden utilizarse con búsquedas agrupadas.</p></li>
<li><p>Los campos utilizados para el reranking de modelos deben ser de tipo texto (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Cada clasificador de modelos sólo puede utilizar un campo <code translate="no">VARCHAR</code> a la vez para la evaluación.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Funcionamiento<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Los clasificadores de modelos integran las capacidades de comprensión de modelos lingüísticos en el proceso de búsqueda de Milvus a través de un flujo de trabajo bien definido:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Visión general del clasificador de modelos</span> </span></p>
<ol>
<li><p><strong>Consulta inicial</strong>: Su aplicación envía una consulta a Milvus</p></li>
<li><p><strong>Búsqueda vectorial</strong>: Milvus realiza una búsqueda vectorial estándar para identificar los documentos candidatos</p></li>
<li><p><strong>Recuperación</strong> de<strong>candidatos</strong>: El sistema identifica el conjunto inicial de documentos candidatos basándose en la similitud vectorial</p></li>
<li><p><strong>Evaluación de modelos</strong>: La función de clasificación de modelos procesa los pares consulta-documento:</p>
<ul>
<li><p>Envía la consulta original y los documentos candidatos a un servicio de modelos externo</p></li>
<li><p>El modelo lingüístico evalúa la relevancia semántica entre la consulta y cada documento.</p></li>
<li><p>Cada documento recibe una puntuación de relevancia basada en la comprensión semántica.</p></li>
</ul></li>
<li><p><strong>Reordenación inteligente</strong>: Los documentos se reordenan en función de las puntuaciones de relevancia generadas por el modelo.</p></li>
<li><p><strong>Resultados mejorados</strong>: Su aplicación recibe resultados clasificados por relevancia semántica en lugar de sólo por similitud vectorial.</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Elija un proveedor de modelos que se adapte a sus necesidades<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite los siguientes proveedores de servicios de modelos para la reordenación, cada uno con características distintas:</p>
<table>
   <tr>
     <th><p>Proveedor</p></th>
     <th><p>Mejor para</p></th>
     <th><p>Características</p></th>
     <th><p>Ejemplo de uso</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Aplicaciones complejas que requieren una profunda comprensión semántica y personalización</p></td>
     <td><ul>
<li><p>Admite varios modelos lingüísticos de gran tamaño</p></li>
<li><p>Opciones de despliegue flexibles</p></li>
<li><p>Mayores requisitos computacionales</p></li>
<li><p>Mayor potencial de personalización</p></li>
</ul></td>
     <td><p>Plataforma de investigación jurídica que despliega modelos específicos de dominio que comprenden la terminología jurídica y las relaciones jurisprudenciales</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Implementación rápida con un uso eficiente de los recursos</p></td>
     <td><ul>
<li><p>Servicio ligero optimizado para operaciones de texto</p></li>
<li><p>Despliegue más sencillo con menores requisitos de recursos</p></li>
<li><p>Modelos de reordenación preoptimizados</p></li>
<li><p>Gastos de infraestructura mínimos</p></li>
</ul></td>
     <td><p>Sistema de gestión de contenidos que necesita funciones de reordenación eficientes con requisitos estándar</p></td>
   </tr>
</table>
<p>Para obtener información detallada sobre la implementación de cada modelo de servicio, consulte la documentación correspondiente:</p>
<ul>
<li><p><a href="/docs/es/v2.6.x/vllm-ranker.md">Clasificador vLLM</a></p></li>
<li><p><a href="/docs/es/v2.6.x/tei-ranker.md">Clasificador TEI</a></p></li>
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
    </button></h2><p>Antes de implementar Model Ranker, asegúrese de que dispone de:</p>
<ul>
<li><p>Una colección Milvus con un campo <code translate="no">VARCHAR</code> que contenga el texto que se va a clasificar.</p></li>
<li><p>Un servicio de modelo externo en ejecución (vLLM o TEI) accesible a su instancia de Milvus</p></li>
<li><p>Una conectividad de red adecuada entre Milvus y el servicio de modelos elegido.</p></li>
</ul>
<p>Los clasificadores de modelos se integran perfectamente tanto con la búsqueda vectorial estándar como con las operaciones de búsqueda híbrida. La implementación implica crear un objeto Function que defina su configuración de reordenación y pasarlo a las operaciones de búsqueda.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Creación de un clasificador de modelos</h3><p>Para implementar la reordenación de modelos, defina primero un objeto Function con la configuración adecuada:</p>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>¿Parámetro requerido?</p></th>
     <th><p>Descripción</p></th>
     <th><p>Valor / Ejemplo</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Identificador de su función utilizado al ejecutar búsquedas.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Nombre del campo de texto a utilizar para la reordenación. Debe ser un campo de tipo <code translate="no">VARCHAR</code>.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Especifica el tipo de función que se está creando. Debe establecerse en <code translate="no">RERANK</code> para todos los clasificadores de modelos.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Diccionario que contiene la configuración de la función de reordenación basada en modelos. Los parámetros disponibles (claves) varían en función del proveedor (<code translate="no">tei</code> o <code translate="no">vllm</code>). Consulte <a href="/docs/es/v2.6.x/vllm-ranker.md">vLLM Ranker</a> o <a href="/docs/es/v2.6.x/tei-ranker.md">TEI Ranker</a> para obtener más detalles.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Debe establecerse en <code translate="no">"model"</code> para activar la reordenación basada en modelos.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Sí</p></td>
     <td><p>El proveedor de servicios de modelos que se utilizará para la reordenación.</p></td>
     <td><p><code translate="no">"tei"</code> o <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Lista de cadenas de consulta utilizadas por el modelo reranking para calcular las puntuaciones de relevancia. El número de cadenas de consulta debe coincidir exactamente con el número de consultas en su operación de búsqueda (incluso cuando se utilizan vectores de consulta en lugar de texto), de lo contrario se informará de un error.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Sí</p></td>
     <td><p>URL del servicio del modelo.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>No</p></td>
     <td><p>Número máximo de documentos a procesar en un único lote. Los valores más altos aumentan el rendimiento pero requieren más memoria.</p></td>
     <td><p><code translate="no">32</code> (por defecto)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar a la búsqueda vectorial estándar</h3><p>Después de definir su modelo de clasificación, puede aplicarlo durante las operaciones de búsqueda pasándolo al parámetro de clasificación:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar a la búsqueda híbrida</h3><p>Los clasificadores de modelos también pueden aplicarse a las operaciones de búsqueda híbrida que combinan varios campos vectoriales:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
