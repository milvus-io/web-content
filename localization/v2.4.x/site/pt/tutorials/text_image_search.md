---
id: text_image_search.md
summary: Crie um motor de pesquisa de texto para imagem com o Milvus.
title: Motor de pesquisa de texto para imagem
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Motor de pesquisa de texto para imagem<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como utilizar o Milvus, a base de dados vetorial de código aberto, para criar um motor de pesquisa de texto para imagem.</p>
<p>Pode construir rapidamente um motor de pesquisa texto-imagem mínimo viável seguindo o tutorial básico. Em alternativa, pode também ler o tutorial aprofundado que abrange tudo, desde a seleção de modelos à implementação de serviços. Pode criar um motor de pesquisa de texto para imagem mais avançado que satisfaça as suas necessidades comerciais, seguindo as instruções do tutorial aprofundado.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Tutorial básico no bloco de notas</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Tutorial de aprofundamento no bloco de notas</a></p></li>
</ul>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>Hoje em dia, os motores de pesquisa de texto tradicionais estão a perder o seu encanto, com cada vez mais pessoas a recorrerem ao TikTok como o seu motor de pesquisa preferido. Durante uma pesquisa de texto tradicional, as pessoas introduzem palavras-chave e são-lhes mostrados todos os textos que contêm a palavra-chave. No entanto, as pessoas queixam-se de que nem sempre conseguem encontrar o que pretendem numa pesquisa deste tipo. Para além disso, os resultados não são suficientemente intuitivos. As pessoas dizem que consideram as imagens e os vídeos muito mais intuitivos e agradáveis do que ter de percorrer linhas de texto. O motor de pesquisa multimodal de texto para imagem surgiu como resultado. Com este novo tipo de motor de busca, as pessoas podem encontrar imagens relevantes introduzindo um pedaço de texto com algumas palavras-chave.</p>
<p>Neste tutorial, aprenderá a construir um motor de pesquisa de texto para imagem. Este tutorial utiliza o modelo CLIP para extrair caraterísticas de imagens e convertê-las em vectores. Em seguida, estes vectores de imagens são armazenados na base de dados de vectores Milvus. Quando os utilizadores introduzem textos de consulta, estes textos são também convertidos em vectores de incorporação utilizando o mesmo modelo ML CLIP. Posteriormente, é efectuada uma pesquisa de semelhança de vectores no Milvus para obter os vectores de imagens mais semelhantes ao vetor de texto de entrada.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Pesquisa_de_imagem_de_texto</span> </span></p>
