---
id: dna_sequence_classification.md
summary: Construir um sistema de classificação de sequências de ADN com Milvus.
title: Classificação da sequência de ADN
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Classificação de seqüências de DNA<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como usar o Milvus, o banco de dados de vetores de código aberto, para criar um modelo de classificação de sequência de DNA.</p>
<p>O modelo ML e o software de terceiros utilizado incluem:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Torrão</a></li>
</ul>
<p><br/></p>
<p>A sequência de ADN é um conceito popular na rastreabilidade de genes, identificação de espécies, diagnóstico de doenças e muitas outras áreas. Enquanto todas as indústrias anseiam por um método de investigação mais inteligente e eficiente, a inteligência artificial tem atraído muita atenção, especialmente nos domínios biológico e médico. Cada vez mais cientistas e investigadores estão a contribuir para a aprendizagem automática e a aprendizagem profunda no domínio da bioinformática. Para tornar os resultados experimentais mais convincentes, uma opção comum é aumentar o tamanho da amostra. A colaboração com grandes volumes de dados em genómica traz mais possibilidades de aplicação na realidade. No entanto, o alinhamento tradicional de sequências tem limitações, o que o torna inadequado para grandes conjuntos de dados. A fim de reduzir as desvantagens na realidade, a vectorização é uma boa escolha para um grande conjunto de dados de sequências de ADN.</p>
<p><br/></p>
<p>Neste tutorial, aprenderá a construir um modelo de classificação de sequências de ADN. Este tutorial utiliza o CountVectorizer para extrair caraterísticas das sequências de ADN e convertê-las em vectores. Em seguida, estes vectores são armazenados no Milvus e as classes de ADN correspondentes são armazenadas no MySQL. Os utilizadores podem efetuar uma pesquisa de semelhança de vectores no Milvus e recuperar a classificação de ADN correspondente a partir do MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>ADN</span> </span></p>
