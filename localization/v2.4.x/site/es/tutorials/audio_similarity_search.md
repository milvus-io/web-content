---
id: audio_similarity_search.md
summary: Construya un sistema de búsqueda de similitudes de audio con Milvus.
title: Búsqueda por similitud de audio
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Búsqueda por similitud de audio<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para crear un sistema de búsqueda de similitudes de audio.</p>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>PANNs (Redes neuronales de audio preentrenadas a gran escala)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>La búsqueda de voz, música, efectos de sonido y otros tipos de audio permite consultar rápidamente volúmenes masivos de datos de audio y sacar a la superficie sonidos similares. Las aplicaciones de los sistemas de búsqueda de similitudes de audio incluyen la identificación de efectos de sonido similares, la minimización de las infracciones de la propiedad intelectual, etc. La recuperación de audio puede utilizarse para buscar y supervisar medios en línea en tiempo real con el fin de reprimir las infracciones de los derechos de propiedad intelectual. También desempeña un papel importante en la clasificación y el análisis estadístico de datos de audio.</p>
<p></br></p>
<p>En este tutorial, aprenderás a construir un sistema de búsqueda de similitudes de audio que pueda devolver clips de sonido similares. Los clips de audio cargados se convierten en vectores utilizando PANNs. Estos vectores se almacenan en Milvus, que genera automáticamente un ID único para cada vector. A continuación, los usuarios pueden realizar una búsqueda de similitud vectorial en Milvus y consultar la ruta de datos del clip de audio correspondiente al ID de vector único devuelto por Milvus.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> <img translate="no" src="/docs/v2.4.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
