---
id: recommendation_system.md
summary: Cree un sistema de recomendación personalizado con Milvus.
title: Sistema de recomendación
---
<h1 id="Recommender-System" class="common-anchor-header">Sistema de recomendación<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para crear un sistema de recomendación.</p>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis o MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>El sistema de recomendación es un subconjunto del sistema de filtrado de información, que puede utilizarse en varios escenarios, incluyendo la recomendación personalizada de películas, música, productos y feeds. A diferencia de los motores de búsqueda, los sistemas de recomendación no requieren que los usuarios describan con precisión sus necesidades, sino que descubren las necesidades e intereses de los usuarios analizando sus comportamientos.</p>
<p></br></p>
<p>En este tutorial, aprenderás a crear un sistema de recomendación de películas que pueda sugerir películas que se ajusten a los intereses del usuario. Para crear un sistema de recomendación de este tipo, descargue primero un conjunto de datos relacionados con películas. Este tutorial utiliza MovieLens 1M. También puede preparar sus propios conjuntos de datos, que deben incluir información como las valoraciones de las películas por parte de los usuarios, las características demográficas de los usuarios y la descripción de la película. Utilice PaddlePaddle para combinar los ID de usuario y las características y convertirlos en vectores de 256 dimensiones. Convierta los ID y las características de las películas en vectores de forma similar. Almacene los vectores de películas en Milvus y utilice los vectores de usuario para la búsqueda de similitudes. Si el vector de usuario es similar a un vector de película, Milvus devolverá el vector de película y su ID como resultado de la recomendación. A continuación, consulte la información de la película utilizando el ID del vector de película almacenado en Redis o MySQL.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>sistema_recomendador</span> </span></p>
