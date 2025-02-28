---
id: text_image_search.md
summary: Construya un motor de búsqueda de texto a imagen con Milvus.
title: Motor de búsqueda de texto a imagen
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Motor de búsqueda de texto a imagen<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial muestra cómo utilizar Milvus, la base de datos vectorial de código abierto, para construir un motor de búsqueda de texto a imagen.</p>
<p>Puede construir rápidamente un motor de búsqueda de texto a imagen mínimamente viable siguiendo el tutorial básico. Alternativamente, también puede leer el tutorial de inmersión profunda que cubre todo, desde la selección del modelo hasta el despliegue del servicio. Puedes crear un motor de búsqueda texto-imagen más avanzado que se adapte a las necesidades de tu empresa siguiendo las instrucciones del tutorial en profundidad.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Tutorial básico en el cuaderno</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Tutorial en profundidad en el cuaderno</a></p></li>
</ul>
<p>El modelo ML y el software de terceros utilizados incluyen:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Hoy en día, los motores de búsqueda de texto tradicionales están perdiendo su encanto y cada vez más gente recurre a TikTok como su motor de búsqueda favorito. Durante una búsqueda de texto tradicional, los usuarios introducen palabras clave y se les muestran todos los textos que las contienen. Sin embargo, la gente se queja de que no siempre encuentra lo que quiere en una búsqueda de este tipo. Además, los resultados no son suficientemente intuitivos. La gente dice que las imágenes y los vídeos les resultan mucho más intuitivos y agradables que tener que rastrear líneas de texto. De ahí surgió el motor de búsqueda multimodal texto-imagen. Con este nuevo tipo de motor de búsqueda, la gente puede encontrar imágenes relevantes introduciendo un trozo de texto con algunas palabras clave.</p>
<p>En este tutorial, aprenderás a construir un motor de búsqueda texto-imagen. Este tutorial utiliza el modelo CLIP para extraer características de las imágenes y convertirlas en vectores. A continuación, estos vectores de imágenes se almacenan en la base de datos vectorial Milvus. Cuando los usuarios introducen textos de consulta, estos textos también se convierten en vectores de incrustación utilizando el mismo modelo ML CLIP. Posteriormente, se realiza una búsqueda de similitud vectorial en Milvus para recuperar los vectores de imagen más similares al vector de texto introducido.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Búsqueda_imagen_texto</span> </span></p>
