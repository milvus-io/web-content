---
id: dna_sequence_classification.md
summary: Construire un système de classification des séquences d'ADN avec Milvus.
title: Classification des séquences d'ADN
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Classification des séquences d'ADN<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un modèle de classification des séquences d'ADN.</p>
<p>Le modèle ML et les logiciels tiers utilisés comprennent :</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>La séquence d'ADN est un concept populaire dans la traçabilité des gènes, l'identification des espèces, le diagnostic des maladies et bien d'autres domaines. Alors que toutes les industries sont à la recherche d'une méthode de recherche plus intelligente et plus efficace, l'intelligence artificielle a attiré beaucoup d'attention, en particulier dans les domaines biologique et médical. De plus en plus de scientifiques et de chercheurs contribuent à l'apprentissage automatique et à l'apprentissage profond dans le domaine de la bio-informatique. Pour rendre les résultats expérimentaux plus convaincants, une option courante consiste à augmenter la taille de l'échantillon. La collaboration avec les données massives (big data) en génomique offre davantage de possibilités d'application dans la réalité. Cependant, l'alignement traditionnel des séquences a ses limites, ce qui le rend inadapté aux grands ensembles de données. Afin de faire moins de compromis dans la réalité, la vectorisation est un bon choix pour un grand ensemble de données de séquences d'ADN.</p>
<p><br/></p>
<p>Dans ce tutoriel, vous apprendrez à construire un modèle de classification de séquences d'ADN. Ce tutoriel utilise CountVectorizer pour extraire les caractéristiques des séquences d'ADN et les convertir en vecteurs. Ensuite, ces vecteurs sont stockés dans Milvus et les classes d'ADN correspondantes sont stockées dans MySQL. Les utilisateurs peuvent effectuer une recherche de similarité vectorielle dans Milvus et rappeler la classification ADN correspondante dans MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>ADN</span> </span></p>
