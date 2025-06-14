---
id: video_similarity_search.md
summary: Cree un sistema de búsqueda de similitudes de vídeo con Milvus.
title: Búsqueda de similitudes en vídeo
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Búsqueda de similitudes en vídeo<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para crear un sistema de búsqueda de similitudes en vídeo.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Cuaderno Jupyter abierto</a></li>
</ul>
<p>Los modelos ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Hoy en día, después de ver una película o un vídeo que les gusta, la gente puede hacer fácilmente capturas de pantalla y compartir sus opiniones publicándolas en varias plataformas de redes sociales. Cuando los seguidores ven las capturas de pantalla, les puede resultar muy difícil saber de qué película se trata si el nombre de la película no se indica explícitamente en la publicación. Para averiguar el nombre de la película, se puede recurrir a un sistema de búsqueda de similitudes de vídeos. Mediante este sistema, los usuarios pueden subir una imagen y obtener vídeos o películas que contengan fotogramas clave similares a la imagen subida.</p>
<p><br/></p>
<p>En este tutorial, aprenderás a crear un sistema de búsqueda por similitud de vídeos. Este tutorial utiliza aproximadamente 100 gifs animados en Tumblr para construir el sistema. Sin embargo, también puedes preparar tus propios conjuntos de datos de vídeo. En primer lugar, el sistema utiliza OpenCV para extraer fotogramas clave en los vídeos y, a continuación, obtiene vectores de características de cada fotograma clave utilizando ResNet-50. Todos los vectores se almacenan y se buscan en Milvus, que devolverá los ID de vectores similares. A continuación, asigna los ID al vídeo correspondiente almacenado en MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> <img translate="no" src="/docs/v2.6.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
