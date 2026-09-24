---
id: search_with_jev.md
summary: >-
  La búsqueda vectorial encuentra información relacionada con una consulta.
  Crear una aplicación de búsqueda útil también implica tomar decisiones: qué
  fragmentos responden realmente a la pregunta, si se puede reutilizar una
  respuesta anterior y si un agente dispone de pruebas suficientes para dejar de
  buscar.
title: Crear un RAG con Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Búsqueda con Jev y Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda vectorial encuentra información relacionada con una consulta. Crear una aplicación de búsqueda útil también implica tomar decisiones: qué fragmentos responden realmente a la pregunta, si se puede reutilizar una respuesta anterior y si un agente tiene pruebas suficientes para detener la búsqueda.</p>
<p>Milvus y Jev se encargan de diferentes partes de este flujo de trabajo. <a href="https://milvus.io/">Milvus</a> almacena representaciones y recupera registros candidatos, con filtros de metadatos para restricciones como la versión del producto o el alcance de la base de conocimiento. <a href="https://docs.typesafe.ai/introduction">Jev</a> evalúa el significado del texto recuperado en función de las instrucciones. Tu aplicación puede utilizar sus valoraciones para seleccionar pruebas o controlar el siguiente paso de la búsqueda.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">¿Qué hace Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Una solicitud a Jev proporciona contexto y una o más preguntas de valoración. Sus <a href="https://docs.typesafe.ai/primitives">resultados tipificados</a> incluyen una elección entre opciones fijas, una puntuación ordenada y una probabilidad de «sí» o «no». Estos resultados permiten que el código de la aplicación tome una decisión sin necesidad de analizar una explicación de formato libre. Un modelo de generación puede seguir redactando una respuesta o una consulta de búsqueda de seguimiento cuando sea necesario.</p>
<p>Por ejemplo, un usuario pregunta cómo instalar Atlas v2. Milvus puede limitar la recuperación a la documentación de la v2 y devolver pasajes similares sobre la instalación, las actualizaciones y la resolución de problemas. A continuación, Jev evalúa qué pasajes explican la configuración inicial. La aplicación pasa la evidencia seleccionada a un modelo generador de respuestas.</p>
<p>Las responsabilidades son claras:</p>
<ol>
<li><strong>Recuperar con Milvus:</strong> encontrar candidatos dentro de las restricciones de metadatos requeridas.</li>
<li><strong>Evaluar con Jev:</strong> evaluar esos candidatos en función de la pregunta y de un criterio específico de la tarea.</li>
<li><strong>Actuar en el código de la aplicación:</strong> reordenar los resultados, filtrar el contexto, reutilizar una respuesta o continuar la búsqueda.</li>
</ol>
<p>Algunas decisiones se toman antes de la recuperación. Jev puede elegir un ámbito de búsqueda o evaluar los documentos entrantes antes de que pasen a formar parte de una colección. El control de acceso y los filtros exactos siguen siendo responsabilidad de la aplicación.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Explora los escenarios de búsqueda<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">La colección «Buscar con Jev»</a> contiene nueve tutoriales ejecutables. Cada uno utiliza un pequeño conjunto de datos sintéticos y muestra los registros recuperados, las valoraciones y la acción resultante.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Seleccionar mejores pruebas<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Reordenar los resultados de la búsqueda</a>: reordenar la documentación y los recuerdos del agente de codificación. Un recuerdo sobre un error en el puerto de un ordenador portátil puede parecerse a un problema de conexión de un contenedor; un recuerdo más útil registra la solución real del contenedor-host.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filtra el contexto recuperado</a>: distingue las instrucciones de instalación inicial de los pasajes sobre actualizaciones y resolución de problemas después de que Milvus aplique el filtro de versión.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Reordenar las relaciones del grafo</a>: responder a una pregunta sobre el lugar de nacimiento del autor de un libro seleccionando tanto el enlace «libro-autor» como la relación «autor-lugar de nacimiento», y luego conservar esa clasificación al recuperar los pasajes de las fuentes.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Controlar la búsqueda y la reutilización de respuestas<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Decidir cuándo detener la búsqueda</a>: un modelo de generación propone búsquedas a partir de la evidencia acumulada, mientras que Jev evalúa si la pregunta original tiene respuesta. Los ejemplos abarcan una respuesta directa, una pregunta de dos pasos y un dato no disponible que alcanza el límite de búsqueda sin obtener respuesta.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Enrutar las consultas de búsqueda</a>: selecciona la búsqueda en documentación, facturación o memoria y, a continuación, aplica el filtro Milvus correspondiente. Una consulta fuera de ámbito sigue una ruta independiente.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Validar la reutilización de la caché semántica</a>: recuperar una solicitud similar almacenada en caché y, a continuación, comprobar si su respuesta también cumple los requisitos de tarea, lenguaje y contexto de la nueva solicitud.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Mejorar e inspeccionar el flujo de conocimiento<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Seleccionar documentos antes de indexarlos</a>: distinguir las orientaciones operativas sustantivas del material promocional o incompleto, con acciones separadas de indexación, revisión y exclusión.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Filtrar los fragmentos recuperados</a>: identificar el texto que intenta desviar al asistente, conservando al mismo tiempo los consejos de seguridad habituales. Se trata de un paso de filtrado adicional, no de una garantía de seguridad.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Evaluar las pruebas de la búsqueda</a>: juzgar la relevancia de los fragmentos, si las pruebas son suficientes y si una respuesta formula afirmaciones sin fundamento. Los ejemplos eliminan deliberadamente pruebas o añaden una afirmación sin fundamento para que la distinción resulte evidente.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Una interfaz de reordenación lista para usar<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> proporciona un <code translate="no">JevRerankFunction</code> del lado de la aplicación: se pasa una consulta y los textos de los documentos candidatos, y se reciben resultados puntuados con sus índices originales, ordenados por relevancia. Utiliza esos índices para reordenar los registros devueltos por Milvus.</p>
<p>Se ha incorporado <a href="https://github.com/milvus-io/milvus-model/pull/90">la integración con Jev</a>. Consulta la <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">implementación y las opciones del constructor</a> para la API actual. Acepta ` <code translate="no">TYPESAFE_API_KEY</code> ` y, por defecto, utiliza ` <code translate="no">jev-latest</code>`. Utiliza una versión del paquete que incluya esta integración.</p>
<p>El envoltorio actual utiliza un prompt de relevancia de tipo «afirmación y evidencia». Comprueba que este criterio se adapte a tu tarea. Para evaluaciones personalizadas, como la compatibilidad de memoria, la detención o el enrutamiento, sigue los tutoriales enlazados utilizando directamente la API TypeSafe. Los tutoriales muestran llamadas directas a la API desde el código de una aplicación en Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Pruébalo con Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Abre el tutorial de reordenación en Colab</a> para empezar con la recuperación y clasificación de candidatos. Para la configuración local y la lista completa de tutoriales, consulta el <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">archivo README de la colección</a>.</p>
<p>Los ejemplos utilizan una <a href="https://aistudio.google.com/apikey">clave de API de Gemini</a> para las representaciones y una <a href="https://console.typesafe.ai/">clave de API de TypeSafe</a> para Jev. El tutorial de búsqueda agencial también utiliza Gemini para la generación de consultas y respuestas. Se envía texto de muestra a estos proveedores de API, y las llamadas pueden consumir créditos.</p>
<p>Los tutoriales se ejecutan con <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> de forma predeterminada e incluyen opciones de conexión para un servidor de Milvus o <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. La misma división del trabajo se aplica en todas las implementaciones: Milvus recupera los candidatos y la aplicación envía el texto relevante a Jev para su evaluación.</p>
<p>Considera los ejemplos como puntos de partida para establecer tus propios criterios y umbrales. Una puntuación de relevancia no garantiza que una respuesta sea correcta, y estos pequeños conjuntos de datos de entrenamiento no determinan la precisión ni la velocidad en entornos de producción.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Explora las implementaciones y los resultados de la evaluación<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Los siguientes proyectos de código abierto aplican estas ideas a flujos de trabajo de búsqueda más amplios. Los informes enlazados explican los conjuntos de datos, las comparaciones y las limitaciones de cada experimento.</p>
<table>
<thead>
<tr><th>Proyecto</th><th>Caso de uso de búsqueda</th><th>Trabajo de Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Memoria Markdown persistente para agentes de codificación</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Implementación de Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Evaluación</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Grafo vectorial RAG</a></td><td>Recuperación de vectores y grafos para preguntas de múltiples saltos</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Implementación en Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Evaluación</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Búsqueda iterativa sobre conocimiento privado</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Ejecutor de experimentos</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Evaluación de interrupción de la búsqueda</a> (experimento independiente)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Reutilización de respuestas a solicitudes compatibles</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Implementación de Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Evaluación</a></td></tr>
</tbody>
</table>
<p>La contribución de DeepSearcher consiste en un experimento independiente de detención de la búsqueda. Los demás enlaces de implementación muestran integraciones de Jev específicas para cada tarea. Los resultados de estos proyectos deben interpretarse en su propio contexto de evaluación, en lugar de considerarse como un punto de referencia común.</p>
