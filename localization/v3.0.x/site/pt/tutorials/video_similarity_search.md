---
id: video_similarity_search.md
summary: Criar um sistema de pesquisa de semelhanças de vídeo com Milvus.
title: Pesquisa de similaridade de vídeo
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Pesquisa de similaridade de vídeo<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como utilizar o Milvus, a base de dados vetorial de código aberto, para criar um sistema de pesquisa de semelhanças de vídeo.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Bloco de notas Jupyter aberto</a></li>
</ul>
<p>Os modelos de ML e software de terceiros utilizados incluem:</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Hoje em dia, depois de verem um filme ou vídeo de que gostam, as pessoas podem facilmente fazer capturas de ecrã e partilhar as suas ideias publicando-as em várias plataformas de redes sociais. Quando os seguidores vêem as capturas de ecrã, pode ser muito difícil saberem de que filme se trata, se o nome do filme não estiver explicitamente escrito na publicação. Para descobrir o nome do filme, as pessoas podem tirar partido de um sistema de pesquisa de semelhanças de vídeo. Ao utilizar o sistema, os utilizadores podem carregar uma imagem e obter vídeos ou filmes que contenham fotogramas chave semelhantes à imagem carregada.</p>
<p><br/></p>
<p>Neste tutorial, aprenderá a criar um sistema de pesquisa de semelhança de vídeo. Este tutorial usa aproximadamente 100 gifs animados no Tumblr para construir o sistema. No entanto, você também pode preparar seus próprios conjuntos de dados de vídeo. O sistema primeiro usa o OpenCV para extrair quadros-chave em vídeos e, em seguida, obtém vetores de recursos de cada quadro-chave usando o ResNet-50. Todos os vectores são armazenados e pesquisados no Milvus, que devolverá os IDs de vectores semelhantes. Em seguida, os IDs são mapeados para o vídeo correspondente armazenado no MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
