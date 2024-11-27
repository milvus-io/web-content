---
id: text_search_engine.md
summary: Construa um motor de pesquisa de texto com Milvus.
title: Motor de pesquisa de texto
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Motor de pesquisa de texto<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Neste tutorial, aprenderá a utilizar o Milvus, a base de dados vetorial de código aberto, para criar um motor de pesquisa de texto.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Bloco de notas Jupyter aberto</a></li>
</ul>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Uma das principais aplicações do Milvus no domínio do processamento da linguagem natural (PNL) é o motor de pesquisa de texto. Trata-se de uma excelente ferramenta que pode ajudar os utilizadores a encontrar a informação que procuram. Pode mesmo fazer emergir informações difíceis de encontrar. Os motores de pesquisa de texto comparam as palavras-chave ou a semântica introduzidas pelos utilizadores com uma base de dados de textos e, em seguida, devolvem os resultados que satisfazem determinados critérios.</p>
<p><br/></p>
<p>Neste tutorial, aprenderá a construir um motor de pesquisa de texto. Este tutorial utiliza o BERT para converter textos em vectores de comprimento fixo. O Milvus é utilizado como base de dados vetorial para armazenamento e pesquisa de semelhanças vectoriais. Em seguida, utilize o MySQL para mapear os IDs vectoriais gerados pelo Milvus para os dados de texto.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>motor_de_pesquisa_de_texto</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>motor_de_pesquisa_de_texto</span> </span></p>
