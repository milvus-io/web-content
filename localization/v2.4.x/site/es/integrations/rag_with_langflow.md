---
id: rag_with_langflow.md
summary: >-
  Esta guía muestra cómo utilizar Langflow para construir una canalización de
  Generación Mejorada por Recuperación (RAG) con Milvus.
title: Construir un sistema RAG usando Langflow con Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Construir un sistema RAG usando Langflow con Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía muestra cómo utilizar <a href="https://www.langflow.org/">Langflow</a> para construir un sistema de generación mejorada por recuperación (RAG) con <a href="https://milvus.io/">Milvus</a>.</p>
<p>El sistema RAG mejora la generación de texto recuperando primero los documentos relevantes de una base de conocimientos y generando después nuevas respuestas basadas en este contexto. Milvus se utiliza para almacenar y recuperar incrustaciones de texto, mientras que Langflow facilita la integración de la recuperación y la generación en un flujo de trabajo visual.</p>
<p>Langflow permite construir fácilmente canalizaciones RAG, en las que se incrustan trozos de texto, se almacenan en Milvus y se recuperan cuando se realizan consultas relevantes. Esto permite que el modelo lingüístico genere respuestas contextualmente informadas.</p>
<p>Milvus funciona como una base de datos vectorial escalable que encuentra rápidamente textos semánticamente similares, mientras que Langflow permite gestionar el modo en que la línea de producción gestiona la recuperación de textos y la generación de respuestas. Juntos, proporcionan una forma eficaz de construir una canalización RAG robusta para aplicaciones mejoradas basadas en texto.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de ejecutar este cuaderno, asegúrese de tener instaladas las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutorial<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que todas las dependencias estén instaladas, inicie un dashboard Langflow escribiendo el siguiente comando:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, un tablero de instrumentos aparecerá como se muestra a continuación: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Queremos crear un proyecto <strong>Vector Store</strong>, así que primero tenemos que hacer clic en el botón <strong>Nuevo Proyecto</strong>. Aparecerá un panel y elegiremos la opción <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Una vez creado con éxito el proyecto Vector Store Rag, el almacén vectorial por defecto es AstraDB, mientras que nosotros queremos utilizar Milvus. Así que necesitamos reemplazar estos dos módulos astraDB con Milvus para usar Milvus como almacén de vectores. <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Pasos para reemplazar astraDB con Milvus:</h3><ol>
<li>Elimine las tarjetas existentes de Vector Store. Haga clic en dos tarjetas AstraDB marcadas en rojo en la imagen anterior, y pulse <strong>retroceso</strong> para eliminarlas.</li>
<li>Haga clic en la opción <strong>Vector</strong> Store de la barra lateral, elija Milvus y arrástrelo al lienzo. Haga esto dos veces ya que necesitamos 2 tarjetas Milvus, una para almacenar el flujo de trabajo de procesamiento de archivos y otra para el flujo de trabajo de búsqueda.</li>
<li>Vincule los módulos Milvus al resto de los componentes. Vea la imagen de abajo como referencia.</li>
<li>Configure las credenciales Milvus para ambos módulos Milvus. La forma más sencilla es utilizar Milvus Lite estableciendo Connection URI a milvus_demo.db. Si tiene un servidor Milvus autodesplegado o en Zilliz Cloud, establezca el URI de conexión al punto final del servidor y la contraseña de conexión al token (para Milvus es &quot;<username>:<password>&quot; concatenado, para Zilliz Cloud es la clave API). Véase la siguiente imagen como referencia:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Demostración de la estructura de Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Incrustar conocimientos en el sistema GAR</h3><ol>
<li>Sube un archivo como base de conocimiento de LLM a través del módulo de archivos en la parte inferior izquierda. Aquí subimos un archivo que contiene una breve introducción a Milvus</li>
<li>Ejecute el flujo de trabajo de inserción pulsando el botón de ejecución en el módulo Milvus en la parte inferior derecha. Esto insertará los conocimientos en el almacén vectorial de Milvus.</li>
<li>Compruebe si los conocimientos están en la memoria. Abra la zona de juegos y pregunte cualquier cosa relacionada con el archivo que ha cargado.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>por qué milvus</span> </span></p>
