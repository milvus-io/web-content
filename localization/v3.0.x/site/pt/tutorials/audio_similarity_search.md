---
id: audio_similarity_search.md
summary: Construir um sistema de pesquisa de semelhanças de áudio com o Milvus.
title: Pesquisa de similaridade de áudio
---
<h1 id="Audio-Similarity-Search" class="common-anchor-header">Pesquisa de similaridade de áudio<button data-href="#Audio-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como usar o Milvus, o banco de dados vetorial de código aberto, para criar um sistema de pesquisa de similaridade de áudio.</p>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li>PANNs (redes neurais de áudio pré-treinadas em grande escala)</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>A pesquisa de fala, música, efeitos sonoros e outros tipos de áudio permite consultar rapidamente volumes maciços de dados de áudio e fazer emergir sons semelhantes. As aplicações dos sistemas de pesquisa de similaridade de áudio incluem a identificação de efeitos sonoros semelhantes, minimizando a infração de IP, entre outras. A recuperação de áudio pode ser utilizada para pesquisar e monitorizar os meios de comunicação em linha em tempo real, a fim de reprimir a violação dos direitos de propriedade intelectual. Também assume um papel importante na classificação e análise estatística de dados de áudio.</p>
<p></br></p>
<p>Neste tutorial, vai aprender a construir um sistema de pesquisa de semelhança de áudio que pode devolver clips de som semelhantes. Os clips de áudio carregados são convertidos em vectores utilizando PANNs. Estes vectores são armazenados no Milvus, que gera automaticamente um ID único para cada vetor. Em seguida, os utilizadores podem efetuar uma pesquisa de semelhança de vectores no Milvus e consultar o caminho de dados do clip de áudio correspondente ao ID único do vetor devolvido pelo Milvus.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/audio_search.png" alt="Audio_search" class="doc-image" id="audio_search" />
   </span> <span class="img-wrapper"> <span>Audio_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/audio_search_demo.png" alt="Audio_search_demo" class="doc-image" id="audio_search_demo" /><span>Audio_search_demo</span> </span></p>
