---
id: recommendation_system.md
summary: Construir um sistema de recomendação personalizado com Milvus.
title: Sistema de recomendação
---
<h1 id="Recommender-System" class="common-anchor-header">Sistema de recomendação<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como utilizar o Milvus, a base de dados vetorial de código aberto, para criar um sistema de recomendação.</p>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis ou MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>O sistema de recomendação é um subconjunto do sistema de filtragem de informações, que pode ser utilizado em vários cenários, incluindo a recomendação personalizada de filmes, músicas, produtos e fluxos de alimentação. Ao contrário dos motores de pesquisa, os sistemas de recomendação não exigem que os utilizadores descrevam com precisão as suas necessidades, mas descobrem as necessidades e os interesses dos utilizadores através da análise dos comportamentos dos utilizadores.</p>
<p></br></p>
<p>Neste tutorial, você aprenderá como criar um sistema de recomendação de filmes que pode sugerir filmes que atendam aos interesses do usuário. Para criar esse sistema de recomendação, primeiro descarregue um conjunto de dados relacionado com filmes. Este tutorial usa o MovieLens 1M. Em alternativa, pode preparar os seus próprios conjuntos de dados, que devem incluir informações como as classificações dos filmes pelos utilizadores, as caraterísticas demográficas dos utilizadores e a descrição do filme. Utilize o PaddlePaddle para combinar IDs de utilizadores e caraterísticas e convertê-los em vectores de 256 dimensões. Converta os IDs e as caraterísticas dos filmes em vectores de forma semelhante. Armazene os vectores de filmes no Milvus e utilize os vectores de utilizadores para a pesquisa de semelhanças. Se o vetor do utilizador for semelhante a um vetor de filme, o Milvus devolverá o vetor de filme e o seu ID como resultado da recomendação. Em seguida, consultar a informação do filme utilizando o ID do vetor de filme armazenado no Redis ou MySQL.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>sistema_de_recomendação</span> </span></p>
