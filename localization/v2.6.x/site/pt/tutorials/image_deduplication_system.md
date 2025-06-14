---
id: image_deduplication_system.md
summary: Criar um sistema de desduplicação de imagens com Milvus.
title: Deduplicação de imagens
---
<h1 id="Image-Deduplication" class="common-anchor-header">Deduplicação de imagens<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tutorial demonstra como utilizar o Milvus, a base de dados vetorial de código aberto, para construir um sistema de deduplicação de imagens.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Bloco de notas aberto</a></li>
</ul>
<p>O modelo ML e o software de terceiros utilizados incluem:</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>Nos últimos anos, assistiu-se a uma explosão exponencial de conteúdos gerados pelos utilizadores. As pessoas podem carregar instantaneamente uma fotografia que tenham tirado para uma plataforma de redes sociais. No entanto, com uma tal abundância de dados de imagem, vemos muitos conteúdos duplicados. Para melhorar a experiência do utilizador, estas imagens duplicadas têm de ser removidas. Um sistema de deduplicação de imagens poupa-nos ao trabalho manual de comparar imagens na base de dados, uma a uma, para eliminar imagens duplicadas. Escolher imagens exatamente idênticas não é uma tarefa complicada. No entanto, por vezes, uma imagem pode ser ampliada, cortada ou ter o brilho ou a escala de cinzentos ajustados. O sistema de deduplicação de imagens precisa de identificar estas imagens semelhantes e eliminá-las também.</p>
<p>Neste tutorial, aprenderá a construir um sistema de deduplicação de imagens. Este tutorial utiliza o modelo ResNet-50 para extrair caraterísticas de imagens e convertê-las em vectores. Em seguida, estes vectores de imagem são armazenados na base de dados de vectores Milvus e também é efectuada uma pesquisa de semelhança de vectores em Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Fluxo de trabalho de duplicação de imagens</span> </span></p>
