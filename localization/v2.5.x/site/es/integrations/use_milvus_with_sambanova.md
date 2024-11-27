---
id: use_milvus_with_sambanova.md
summary: >-
  Este tutorial aprovecha la integración de Milvus en SambaNova AI Starter Kits
  para construir un sistema de recuperación de conocimiento empresarial, similar
  a RAG (Retrieval-Augmented Generation), para la recuperación y respuesta
  basada en los documentos privados de la empresa.
title: Utilice Milvus con SambaNova
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">Utilice Milvus con SambaNova<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">SambaNova</a> es una innovadora plataforma tecnológica de IA que acelera el despliegue de capacidades avanzadas de IA y aprendizaje profundo. Diseñada para uso empresarial, permite a las organizaciones aprovechar la IA generativa para mejorar el rendimiento y la eficiencia. Al proporcionar soluciones de vanguardia como SambaNova Suite y DataScale, la plataforma permite a las empresas extraer información valiosa de sus datos, impulsando mejoras operativas y fomentando nuevas oportunidades en el panorama de la IA.</p>
<p><a href="https://github.com/sambanova/ai-starter-kit">Los SambaNova AI Starter Kits</a> son una colección de recursos de código abierto diseñados para ayudar a los desarrolladores y a las empresas a desplegar aplicaciones basadas en IA con SambaNova. Estos kits proporcionan ejemplos prácticos y guías que facilitan la implementación de varios casos de uso de IA, facilitando a los usuarios el aprovechamiento de la avanzada tecnología de SambaNova.</p>
<p>Este tutorial aprovecha la integración de Milvus en SambaNova AI Starter Kits para construir un sistema de recuperación de conocimiento empresarial, similar a RAG (Retrieval-Augmented Generation), para recuperar y responder basándose en los documentos privados de la empresa.</p>
<div class="alert note">
<p>Este tutorial se refiere principalmente a la guía oficial <a href="https://github.com/sambanova/ai-starter-kit/tree/main">de SambaNova AI Starter Kits</a>. Si usted encuentra que este tutorial tiene partes obsoletas, puede dar prioridad a seguir la guía oficial y crear un problema para nosotros.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerrequisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Recomendamos usar Python &gt;= 3.10 y &lt; 3.12.</p>
<p>Visita <a href="https://cloud.sambanova.ai/">SambaNova Cloud</a> para obtener una clave API de SambaNova.</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Clonar el repositorio<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git
$ d ai-starter-kit/enterprise_knowledge_retriever
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">Cambiar el tipo de almacén vectorial<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p>Cambie el almacén de vectores configurando <code translate="no">db_type='milvus'</code> en las funciones <code translate="no">create_vector_store()</code> y <code translate="no">load_vdb()</code> en <code translate="no">src/document_retrieval.py</code>.</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">Instalar dependencias<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Instale las dependencias necesarias ejecutando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
<span class="hljs-built_in">source</span> enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">Iniciar la aplicación<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice el siguiente comando para iniciar la aplicación:</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Después de eso, verá la interfaz de usuario en su navegador:<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Después de establecer su clave API SambaNova en la interfaz de usuario, puede jugar con la interfaz de usuario y hacer preguntas acerca de sus documentos.</p>
<p>Para más detalles, consulte la documentación oficial de <a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">Enterprise Knowledge Retrieval of SambaNova AI Starter Kits</a>.</p>
