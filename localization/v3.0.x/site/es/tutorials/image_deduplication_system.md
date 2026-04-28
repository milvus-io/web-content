---
id: image_deduplication_system.md
summary: Cree un sistema de deduplicación de imágenes con Milvus.
title: Deduplicación de imágenes
---
<h1 id="Image-Deduplication" class="common-anchor-header">Deduplicación de imágenes<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para crear un sistema de deduplicación de imágenes.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Cuaderno abierto</a></li>
</ul>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>En los últimos años se ha producido una explosión exponencial de contenidos generados por los usuarios. La gente puede subir instantáneamente una foto que ha tomado a una plataforma de redes sociales. Sin embargo, con tal abundancia de datos de imágenes, vemos muchos contenidos duplicados. Para mejorar la experiencia del usuario, hay que eliminar estas imágenes duplicadas. Un sistema de deduplicación de imágenes nos ahorra el trabajo manual de comparar una a una las imágenes de la base de datos para eliminar las imágenes duplicadas. Seleccionar imágenes exactamente idénticas no es una tarea complicada en absoluto. Sin embargo, a veces una imagen puede estar ampliada, recortada o con el brillo o la escala de grises ajustados. El sistema de deduplicación de imágenes necesita identificar estas imágenes similares y eliminarlas también.</p>
<p>En este tutorial aprenderás a construir un sistema de deduplicación de imágenes. Este tutorial utiliza el modelo ResNet-50 para extraer características de las imágenes y convertirlas en vectores. A continuación, estos vectores de imágenes se almacenan en la base de datos vectorial Milvus y también se realiza una búsqueda de similitud vectorial en Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Flujo_de_trabajo_de_deduplicación_de_imágenes</span> </span></p>
