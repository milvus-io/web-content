---
id: how_to_enhance_your_rag.md
summary: >-
  Con la creciente popularidad de las aplicaciones RAG de Generación Aumentada
  de Recuperación, hay una preocupación cada vez mayor por mejorar su
  rendimiento. Este artículo presenta todas las formas posibles de optimizar las
  canalizaciones RAG y proporciona las ilustraciones correspondientes para
  ayudarle a comprender rápidamente las principales estrategias de optimización
  RAG.
title: Cómo mejorar el rendimiento de su canalización RAG
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Cómo mejorar el rendimiento de su canalización RAG<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>Con la creciente popularidad de las aplicaciones de Generación Aumentada de Recuperación<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(</a>RAG), hay una preocupación cada vez mayor por mejorar su rendimiento. Este artículo presenta todas las formas posibles de optimizar las canalizaciones RAG y proporciona las ilustraciones correspondientes para ayudarle a comprender rápidamente las principales estrategias de optimización RAG.</p>
<p>Es importante señalar que sólo proporcionaremos una exploración de alto nivel de estas estrategias y técnicas, centrándonos en cómo se integran en un sistema RAG. Sin embargo, no profundizaremos en detalles intrincados ni le guiaremos paso a paso en su implementación.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Un proceso estándar de GAR<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>El siguiente diagrama muestra el proceso RAG estándar más sencillo. En primer lugar, los trozos de documentos se cargan en un almacén de vectores (como <a href="https://milvus.io/docs">Milvus</a> o <a href="https://zilliz.com/cloud">Zilliz Cloud</a>). A continuación, el almacén de vectores recupera los K trozos más relevantes relacionados con la consulta. A continuación, estos fragmentos relevantes se inyectan en la consulta contextual <a href="https://zilliz.com/glossary/large-language-models-(llms)">del LLM</a> y, por último, el LLM devuelve la respuesta final.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Distintos tipos de técnicas de mejora de la GAR<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Podemos clasificar los distintos enfoques de mejora de la GAR en función de su función en las etapas del proceso de la GAR.</p>
<ul>
<li><strong>Mejora de la consulta</strong>: Modificación y manipulación del proceso de consulta de la entrada RAG para expresar o procesar mejor la intención de la consulta.</li>
<li><strong>Mejora de la indexación</strong>: Optimización de la creación de índices de fragmentación mediante técnicas como la fragmentación múltiple, la indexación por pasos o la indexación multidireccional.</li>
<li><strong>Mejora del recuperador</strong>: Aplicación de técnicas y estrategias de optimización durante el proceso de recuperación.</li>
<li><strong>Mejora del generador</strong>: Ajuste y optimización de las instrucciones al ensamblarlas para que el LLM proporcione mejores respuestas.</li>
<li><strong>Mejora del conducto RAG</strong>: Cambiar dinámicamente los procesos dentro de todo el canal de la GAR, incluyendo el uso de agentes o herramientas para optimizar los pasos clave del canal de la GAR.</li>
</ul>
<p>A continuación, presentaremos métodos específicos para cada una de estas categorías.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Mejora de las consultas<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Exploremos cuatro métodos eficaces para mejorar la experiencia de consulta: Preguntas hipotéticas, incrustación de documentos hipotéticos, subconsultas e instrucciones de retroceso.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Creación de preguntas hipotéticas</h3><p>La creación de preguntas hipotéticas implica la utilización de un LLM para generar múltiples preguntas que los usuarios podrían formular sobre el contenido de cada fragmento de documento. Antes de que la consulta real del usuario llegue al LLM, el almacén de vectores recupera las preguntas hipotéticas más relevantes relacionadas con la consulta real, junto con sus trozos de documentos correspondientes, y las reenvía al LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta metodología evita el problema de la asimetría entre dominios en el proceso de búsqueda vectorial, ya que realiza directamente búsquedas de consulta a consulta, lo que alivia la carga de las búsquedas vectoriales. Sin embargo, introduce una sobrecarga e incertidumbre adicionales en la generación de preguntas hipotéticas.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (incrustación de documentos hipotéticos)</h3><p>HyDE son las siglas de Hypothetical Document Embeddings. Aprovecha un LLM para elaborar un &quot;<strong><em>documento hipotético</em></strong>&quot; o una respuesta <strong><em>falsa</em></strong> en respuesta a una consulta del usuario desprovista de información contextual. A continuación, esta respuesta falsa se convierte en incrustaciones vectoriales y se emplea para consultar los trozos de documentos más relevantes dentro de una base de datos vectorial. Posteriormente, la base de datos vectorial recupera los K trozos de documentos más relevantes y los transmite al LLM y a la consulta original del usuario para generar la respuesta final.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este método es similar a la técnica de la pregunta hipotética a la hora de abordar la asimetría entre dominios en las búsquedas vectoriales. Sin embargo, también presenta inconvenientes, como los costes computacionales añadidos y la incertidumbre de generar respuestas falsas.</p>
<p>Para más información, consulte el documento <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Creación de subconsultas</h3><p>Cuando una consulta de usuario es demasiado complicada, podemos utilizar un LLM para descomponerla en subconsultas más sencillas antes de pasarlas a la base de datos vectorial y al LLM. Veamos un ejemplo.</p>
<p>Imaginemos que un usuario pregunta: &quot;<strong><em>¿Cuáles son las diferencias de características entre Milvus y Zilliz Cloud?</em></strong>&quot; Esta pregunta es bastante compleja y puede que no tenga una respuesta directa en nuestra base de conocimientos. Para abordar esta cuestión, podemos dividirla en dos subconsultas más sencillas:</p>
<ul>
<li>Subconsulta 1: "¿Cuáles son las características de Milvus?"</li>
<li>Subconsulta 2: "¿Cuáles son las características de Zilliz Cloud?"</li>
</ul>
<p>Una vez que tenemos estas subconsultas, las enviamos todas a la base de datos vectorial después de convertirlas en incrustaciones vectoriales. A continuación, la base de datos vectorial encuentra los trozos de documentos Top-K más relevantes para cada subconsulta. Por último, el LLM utiliza esta información para generar una respuesta mejor.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Al dividir la consulta del usuario en subconsultas, facilitamos a nuestro sistema la búsqueda de información relevante y la obtención de respuestas precisas, incluso para preguntas complejas.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Creación de subpreguntas</h3><p>Otra forma de simplificar las consultas complejas de los usuarios es crear <strong><em>mensajes de retroceso</em></strong>. Esta técnica consiste en abstraer las consultas complicadas de los usuarios en <em><em>&quot;</em>preguntas paso a paso</em>&quot;** mediante un LLM. A continuación, una base de datos vectorial utiliza estas preguntas retrospectivas para recuperar los fragmentos de documentos más relevantes. Por último, el LLM genera una respuesta más precisa a partir de los documentos recuperados.</p>
<p>Ilustremos esta técnica con un ejemplo. Consideremos la siguiente consulta, que es bastante compleja y cuya respuesta directa no es sencilla:</p>
<p><strong><em>Consulta original del usuario: "Tengo un conjunto de datos con 10.000 millones de registros y quiero almacenarlo en Milvus para consultarlo. ¿Es posible?"</em></strong></p>
<p>Para simplificar esta consulta de usuario, podemos utilizar un LLM para generar una pregunta paso a paso más directa:</p>
<p><strong><em>Pregunta paso a paso: "¿Cuál es el límite de tamaño del conjunto de datos que puede manejar Milvus?".</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este método puede ayudarnos a obtener respuestas mejores y más precisas a consultas complejas. Descompone la pregunta original en una forma más sencilla, lo que facilita a nuestro sistema la búsqueda de información relevante y la obtención de respuestas precisas.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Mejora de la indexación<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Mejorar la indexación es otra estrategia para mejorar el rendimiento de sus aplicaciones RAG. Exploremos tres técnicas de mejora de la indexación.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Fusión automática de fragmentos de documentos</h3><p>Al crear un índice, podemos emplear dos niveles de granularidad: los fragmentos hijos y sus correspondientes fragmentos padres. Inicialmente, buscamos los fragmentos hijos a un nivel de detalle más fino. A continuación, aplicamos una estrategia de fusión: si un número determinado, <strong><em>n</em></strong>, de trozos hijos de los primeros <strong><em>k</em></strong> trozos hijos pertenecen al mismo trozo padre, proporcionamos este trozo padre al LLM como información contextual.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Esta metodología se ha implementado en <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Construcción de índices jerárquicos</h3><p>Al crear índices para documentos, podemos establecer un índice de dos niveles: uno para los resúmenes de documentos y otro para los trozos de documentos. El proceso de búsqueda vectorial consta de dos etapas: inicialmente, filtramos los documentos relevantes basándonos en el resumen y, posteriormente, recuperamos los trozos de documentos correspondientes exclusivamente dentro de estos documentos relevantes.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este enfoque resulta beneficioso en situaciones que implican grandes volúmenes de datos o casos en los que los datos son jerárquicos, como la recuperación de contenidos dentro de una colección de biblioteca.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Recuperación y reordenación híbridas</h3><p>La técnica Hybrid Retrieval and Reranking integra uno o varios métodos de recuperación complementarios con la <a href="https://zilliz.com/learn/vector-similarity-search">recuperación por similitud vectorial</a>. A continuación, un <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">reordenador</a> clasifica los resultados obtenidos en función de su relevancia para la consulta del usuario.</p>
<p>Entre los algoritmos de recuperación complementaria más comunes se encuentran los basados en frecuencias léxicas, como <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a>, o los grandes modelos que utilizan incrustaciones dispersas, como <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Los algoritmos de reordenación incluyen RRF o modelos más sofisticados como <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, que se asemeja a arquitecturas tipo BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este enfoque aprovecha diversos métodos de recuperación para mejorar la calidad de la recuperación y abordar posibles lagunas en la recuperación de vectores.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Mejora del recuperador<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>El perfeccionamiento del componente recuperador dentro del sistema GAR también puede mejorar las aplicaciones GAR. Veamos algunos métodos eficaces para mejorar el recuperador.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Recuperación de la ventana de frases</h3><p>En un sistema GAR básico, el fragmento de documento que se entrega al LLM es una ventana más grande que abarca el fragmento de incrustación recuperado. Esto garantiza que la información proporcionada al LLM incluya una gama más amplia de detalles contextuales, minimizando la pérdida de información. La técnica Sentence Window Retrieval desvincula el fragmento de documento utilizado para la recuperación de la incrustación del fragmento proporcionado al LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Sin embargo, ampliar el tamaño de la ventana puede introducir información adicional que interfiera. Podemos ajustar el tamaño de la ampliación de la ventana en función de las necesidades específicas de la empresa.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Filtrado de metadatos</h3><p>Para garantizar respuestas más precisas, podemos refinar los documentos recuperados filtrando metadatos como la hora y la categoría antes de pasarlos al LLM. Por ejemplo, si se recuperan informes financieros que abarcan varios años, el filtrado basado en el año deseado refinará la información para satisfacer requisitos específicos. Este método resulta eficaz en situaciones con datos extensos y metadatos detallados, como la recuperación de contenidos en colecciones de bibliotecas.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Mejora del generador<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Exploremos más técnicas de optimización de la RAG mejorando el generador dentro de un sistema RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Compresión del mensaje LLM</h3><p>La información de ruido en los fragmentos de documentos recuperados puede afectar significativamente a la precisión de la respuesta final de RAG. Además, la limitada ventana de consulta de los LLM supone un obstáculo para obtener respuestas más precisas. Para hacer frente a este reto, podemos comprimir los detalles irrelevantes, enfatizar los párrafos clave y reducir la longitud total del contexto de los fragmentos de documentos recuperados.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este planteamiento es similar al método híbrido de recuperación y reordenación anteriormente descrito, en el que se utiliza un reordenador para filtrar los fragmentos de documentos irrelevantes.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Ajustar el orden de los trozos en la solicitud</h3><p>En el artículo &quot;<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>&quot;, los investigadores observaron que, durante el proceso de razonamiento, los LLM suelen pasar por alto la información que se encuentra en medio de los documentos. En su lugar, tienden a confiar más en la información presentada al principio y al final de los documentos.</p>
<p>Basándonos en esta observación, podemos ajustar el orden de los fragmentos recuperados para mejorar la calidad de la respuesta: cuando se recuperan múltiples fragmentos de conocimiento, los fragmentos con una confianza relativamente baja se colocan en el centro, y los fragmentos con una confianza relativamente alta se sitúan en ambos extremos.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">Mejora de la canalización RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>También podemos mejorar el rendimiento de sus aplicaciones RAG mejorando todo el proceso RAG.</p>
<h3 id="Self-reflection" class="common-anchor-header">Autorreflexión</h3><p>Este enfoque incorpora el concepto de autorreflexión dentro de los agentes de IA. Entonces, ¿cómo funciona esta técnica?</p>
<p>Algunos trozos de documentos Top-K recuperados inicialmente son ambiguos y pueden no responder directamente a la pregunta del usuario. En tales casos, podemos llevar a cabo una segunda ronda de reflexión para verificar si estos trozos pueden responder realmente a la consulta.</p>
<p>Podemos llevar a cabo la reflexión utilizando métodos de reflexión eficaces como los modelos de Inferencia del Lenguaje Natural (NLI) o herramientas adicionales como las búsquedas en Internet para la verificación.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este concepto de autorreflexión se ha explorado en varios artículos o proyectos, como <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, etc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Enrutamiento de consultas con un agente</h3><p>A veces, no necesitamos utilizar un sistema RAG para responder a preguntas sencillas, ya que podría dar lugar a más malentendidos e inferencias a partir de información engañosa. En tales casos, podemos utilizar un agente como enrutador en la fase de consulta. Este agente evalúa si es necesario que la consulta pase por la canalización RAG. En caso afirmativo, se inicia el subsiguiente proceso RAG; de lo contrario, el LLM responde directamente a la consulta.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>El agente puede adoptar diversas formas, como un LLM, un pequeño modelo de clasificación o incluso un conjunto de reglas.</p>
<p>Al enrutar las consultas en función de la intención del usuario, se puede redirigir una parte de las consultas, lo que supone un aumento significativo del tiempo de respuesta y una notable reducción del ruido innecesario.</p>
<p>Podemos extender la técnica de enrutamiento de consultas a otros procesos dentro del sistema GAR, como determinar cuándo utilizar herramientas como las búsquedas web, realizar subconsultas o buscar imágenes. Este planteamiento garantiza la optimización de cada paso del sistema GAR en función de los requisitos específicos de la consulta, lo que conduce a una recuperación de la información más eficaz y precisa.</p>
<h2 id="Summary" class="common-anchor-header">Resumen<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Aunque una canalización RAG sencilla puede parecer simple, para lograr un rendimiento empresarial óptimo a menudo se requieren técnicas de optimización más sofisticadas.</p>
<p>Este artículo resume varios enfoques populares para mejorar el rendimiento de sus aplicaciones RAG. También proporcionamos ilustraciones claras para ayudarle a comprender rápidamente estos conceptos y técnicas y agilizar su implementación y optimización.</p>
<p>Puede obtener las implementaciones sencillas de los principales enfoques enumerados en este artículo en este <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">enlace de GitHub</a>.</p>
