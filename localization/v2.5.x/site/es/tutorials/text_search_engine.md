---
id: text_search_engine.md
summary: Construya un motor de búsqueda de texto con Milvus.
title: Motor de búsqueda de texto
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Motor de búsqueda de texto<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tutorial, aprenderá a utilizar Milvus, la base de datos vectorial de código abierto, para construir un motor de búsqueda de texto.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Cuaderno Jupyter abierto</a></li>
</ul>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Una de las principales aplicaciones de Milvus en el campo del procesamiento del lenguaje natural (PLN) es el motor de búsqueda de texto. Es una gran herramienta que puede ayudar a los usuarios a encontrar la información que buscan. Incluso puede sacar a la superficie información difícil de encontrar. Los motores de búsqueda de texto comparan las palabras clave o la semántica que introducen los usuarios con una base de datos de textos y, a continuación, devuelven los resultados que cumplen determinados criterios.</p>
<p><br/></p>
<p>En este tutorial, aprenderás a construir un motor de búsqueda de texto. Este tutorial utiliza BERT para convertir textos en vectores de longitud fija. Se utiliza Milvus como base de datos vectorial para el almacenamiento y la búsqueda de similitud vectorial. A continuación, se utiliza MySQL para asignar los ID de vectores generados por Milvus a los datos de texto.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>text_search_engine</span> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>text_search_engine</span> </span></p>
