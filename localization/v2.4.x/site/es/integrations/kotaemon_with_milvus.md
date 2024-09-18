---
id: kotaemon_with_milvus.md
summary: >-
  Este tutorial le guiará sobre cómo personalizar su aplicación kotaemon
  utilizando Milvus.
title: Kotaemon RAG con Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG con Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> es una interfaz de usuario RAG de código abierto limpia y personalizable para chatear con tus documentos. Construido pensando tanto en los usuarios finales como en los desarrolladores.</p>
<p>Kotaemon proporciona una interfaz web de control de calidad de documentos personalizable y multiusuario que admite LLM locales y basados en API. Ofrece una canalización RAG híbrida con recuperación de texto completo y vectorial, control de calidad multimodal para documentos con figuras y tablas, y citas avanzadas con vistas previas de documentos. Es compatible con métodos de razonamiento complejos como ReAct y ReWOO, y proporciona ajustes configurables para la recuperación y la generación.</p>
<p>Este tutorial le guiará sobre cómo personalizar su aplicación kotaemon utilizando <a href="https://milvus.io/">Milvus</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Instalación</h3><p>Recomendamos instalar kotaemon de esta manera:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Además de esta manera, hay otras formas de instalar kotaemon. Puede consultar la <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">documentación oficial</a> para más detalles.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Establecer Milvus como almacenamiento de vectores por defecto</h3><p>Para cambiar el almacenamiento de vectores por defecto a Milvus, tiene que modificar el archivo <code translate="no">flowsettings.py</code> cambiando <code translate="no">KH_VECTORSTORE</code> a:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Establecer variables de entorno</h3><p>puedes configurar los modelos a través del fichero <code translate="no">.env</code> con la información necesaria para conectar con los LLMs y modelos de incrustación. por ejemplo OpenAI, Azure, Ollama, etc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Ejecutar Kotaemon</h3><p>Después de configurar las variables de entorno y cambiar el almacenamiento vectorial, puede ejecutar kotaemon ejecutando el siguiente comando:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>El nombre de usuario / contraseña por defecto son: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Iniciar RAG con kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Añade tus modelos de IA</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>En la pestaña <code translate="no">Resources</code>, puedes añadir y configurar tus LLMs y modelos de incrustación. Puedes añadir varios modelos y configurarlos como activos o inactivos. Sólo necesitas proporcionar al menos uno. También puede proporcionar varios modelos para permitir el cambio entre ellos.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Cargue sus documentos</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Para poder realizar el control de calidad de sus documentos, primero debe cargarlos en la aplicación. Vaya a la pestaña <code translate="no">File Index</code> y podrá cargar y gestionar sus documentos personalizados.</p>
<p>Por defecto, todos los datos de la aplicación se almacenan en la carpeta <code translate="no">./ktem_app_data</code>. Los datos de la base de datos de Milvus se almacenan en <code translate="no">./ktem_app_data/user_data/vectorstore</code>. Puede hacer una copia de seguridad o copiar esta carpeta para mover su instalación a una nueva máquina.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Chatee con sus documentos</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ahora vuelva a la pestaña <code translate="no">Chat</code>. La pestaña Chat consta de 3 regiones: el Panel de Configuración de la Conversación, donde se gestionan las conversaciones y las referencias a archivos; el Panel de Chat para interactuar con el chatbot; y el Panel de Información, que muestra las pruebas de apoyo, las puntuaciones de confianza y las calificaciones de relevancia de las respuestas.</p>
<p>Puede seleccionar sus documentos en el panel de configuración de la conversación. A continuación, sólo tiene que iniciar RAG con sus documentos escribiendo un mensaje en el cuadro de entrada y enviarlo al chatbot.</p>
<p>Si quieres profundizar en cómo utilizar kotaemon, puedes obtener una guía completa en la <a href="https://cinnamon.github.io/kotaemon/usage/">documentación oficial</a>.</p>
