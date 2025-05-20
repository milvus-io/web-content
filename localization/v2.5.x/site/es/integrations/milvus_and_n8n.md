---
id: milvus_and_n8n.md
summary: >-
  n8n es una potente plataforma de automatización de flujos de trabajo de código
  abierto que permite conectar varias aplicaciones, servicios y API para crear
  flujos de trabajo automatizados sin codificación. Con su interfaz visual
  basada en nodos, n8n permite a los usuarios crear procesos de automatización
  complejos simplemente conectando nodos que representan diferentes servicios o
  acciones. Es autoalojable, muy ampliable y admite licencias de código justo y
  de empresa.
title: Primeros pasos con Milvus y n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Introducción a Milvus y n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Introducción a n8n y al nodo Milvus Vector Store<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> es una potente plataforma de automatización de flujos de trabajo de código abierto que le permite conectar varias aplicaciones, servicios y API para crear flujos de trabajo automatizados sin codificación. Con su interfaz visual basada en nodos, n8n permite a los usuarios crear procesos de automatización complejos simplemente conectando nodos que representan diferentes servicios o acciones. Es autoalojable, muy ampliable y admite licencias de código justo y de empresa.</p>
<p>El nodo <strong>Milvus Vector Store</strong> de n8n integra <a href="https://milvus.io/">Milvus</a> en sus flujos de trabajo de automatización. Esto le permite realizar búsquedas semánticas, alimentar sistemas de generación de recuperación aumentada (RAG) y crear aplicaciones inteligentes de IA, todo ello dentro del ecosistema n8n.</p>
<p>Esta documentación se basa principalmente en la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentación</a> oficial de <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store</a>. Si encuentra algún contenido obsoleto o incoherente, por favor, dé prioridad a la documentación oficial y no dude en plantearnos un problema.</p>
<h2 id="Key-Features" class="common-anchor-header">Características principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Con el nodo Milvus Vector Store en n8n, usted puede:</p>
<ul>
<li>Interactuar con su base de datos Milvus como un <a href="https://docs.n8n.io/glossary/#ai-vector-store">almacén de vectores</a></li>
<li>Insertar documentos en Milvus</li>
<li>Obtener documentos de Milvus</li>
<li>Recuperar documentos para proporcionárselos a un recuperador conectado a una <a href="https://docs.n8n.io/glossary/#ai-chain">cadena</a></li>
<li>Conectarse directamente a un <a href="https://docs.n8n.io/glossary/#ai-agent">agente</a> como <a href="https://docs.n8n.io/glossary/#ai-tool">herramienta</a></li>
<li>Filtrar documentos basándose en metadatos</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Patrones de uso de los nodos<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede utilizar el nodo Milvus Vector Store en n8n según los siguientes patrones.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Uso como nodo normal para insertar y recuperar documentos</h3><p>Puede utilizar Milvus Vector Store como un nodo normal para insertar u obtener documentos. Este patrón coloca el Milvus Vector Store en el flujo de conexión regular sin utilizar un agente.</p>
<p>Consulte esta <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">plantilla de ejemplo</a> para saber cómo construir un sistema que almacene documentos en Milvus y los recupere para dar soporte a respuestas citadas basadas en chat.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Conectarse directamente a un agente de IA como herramienta</h3><p>Puede conectar el nodo Milvus Vector Store directamente al conector de herramientas de un <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">agente de IA</a> para utilizar un almacén de vectores como recurso al responder consultas.</p>
<p>En este caso, la conexión sería Agente AI (conector de herramientas) -&gt; nodo Milvus Vector Store. Véase esta <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">plantilla de ejemplo</a> en la que los datos están incrustados e indexados en Milvus, y el agente de IA utiliza el almacén de vectores como herramienta de conocimiento para responder a preguntas.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Utilizar un recuperador para obtener documentos</h3><p>Puede utilizar el nodo <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> con el nodo Milvus Vector Store para obtener documentos del nodo Milvus Vector Store. Esto se utiliza a menudo con el nodo <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Cadena de Preguntas y Respuestas</a> para obtener documentos del almacén vectorial que coincidan con la entrada del chat.</p>
<p>Un flujo típico de conexión de nodos es el siguiente: Cadena de Preguntas y Respuestas (conector Retriever) -&gt; Vector Store Retriever (conector Vector Store) -&gt; Milvus Vector Store.</p>
<p>Eche un vistazo a este <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">ejemplo de flujo de trabajo</a> para ver cómo ingerir datos externos en Milvus y construir un sistema semántico de preguntas y respuestas basado en chat.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Utilice la herramienta de respuesta a preguntas de Vector Store para responder preguntas</h3><p>Otro patrón utiliza la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Herramienta</a> de <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">respuesta a preguntas</a> del <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">almacén vectorial</a> para resumir los resultados y responder a las preguntas del nodo del almacén vectorial Milvus. En lugar de conectar el Milvus Vector Store directamente como una herramienta, este patrón utiliza una herramienta diseñada específicamente para resumir datos en el almacén de vectores.</p>
<p>El flujo de conexiones sería el siguiente Agente AI (conector de herramientas) -&gt; Herramienta de respuesta a preguntas del almacén vectorial (conector del almacén vectorial) -&gt; Almacén vectorial Milvus.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Modos de funcionamiento del nodo<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>El nodo Milvus Vector Store admite múltiples modos de funcionamiento, cada uno adaptado a diferentes casos de uso del flujo de trabajo. Comprender estos modos ayuda a diseñar flujos de trabajo más eficaces.</p>
<p>A continuación le ofrecemos una visión general de los modos de funcionamiento y opciones disponibles. Para obtener una lista completa de los parámetros de entrada y las opciones de configuración de cada modo, consulte la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentación oficial</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Descripción general de los modos de funcionamiento</h3><p>El nodo Milvus Vector Store admite cuatro modos distintos:</p>
<ul>
<li><strong>Obtener muchos</strong>: Recuperar varios documentos basándose en la similitud semántica con una solicitud.</li>
<li><strong>Insertar documentos</strong>: Inserte nuevos documentos en su colección Milvus.</li>
<li><strong>Recuperar documentos (como almacén vectorial para cadena/herramienta)</strong>: Utilice el nodo como recuperador dentro de un sistema basado en cadenas.</li>
<li><strong>Recuperar Documentos (Como Herramienta para Agente AI)</strong>: Utilice el nodo como una herramienta para un agente de inteligencia artificial durante las tareas de respuesta a preguntas.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Opciones adicionales del nodo</h3><ul>
<li><strong>Filtro de metadatos</strong> (sólo en modo Obtener muchos): Filtra los resultados basándose en claves de metadatos personalizadas. Los campos múltiples aplican una condición AND.</li>
<li><strong>Borrar colección</strong> (sólo en el modo Insertar documentos): Elimine los documentos existentes de la colección antes de insertar otros nuevos.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Recursos relacionados</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Documentación de la integración n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Documentación de LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Documentación de n8n Advanced AI</a></li>
</ul>
