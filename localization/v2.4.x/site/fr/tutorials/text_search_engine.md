---
id: text_search_engine.md
summary: Créez un moteur de recherche textuel avec Milvus.
title: Moteur de recherche de texte
---
<h1 id="Text-Search-Engine" class="common-anchor-header">Moteur de recherche de texte<button data-href="#Text-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans ce tutoriel, vous apprendrez à utiliser Milvus, la base de données vectorielle open-source, pour construire un moteur de recherche textuel.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/text_search">Bloc-notes Jupyter ouvert</a></li>
</ul>
<p>Le modèle ML et les logiciels tiers utilisés comprennent :</p>
<ul>
<li>BERT</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>L'une des principales applications de Milvus dans le domaine du traitement du langage naturel (NLP) est le moteur de recherche textuel. C'est un outil formidable qui peut aider les utilisateurs à trouver les informations qu'ils recherchent. Il peut même faire remonter à la surface des informations difficiles à trouver. Les moteurs de recherche textuelle comparent les mots-clés ou la sémantique saisis par les utilisateurs à une base de données de textes, puis renvoient les résultats qui répondent à certains critères.</p>
<p><br/></p>
<p>Dans ce tutoriel, vous apprendrez à construire un moteur de recherche textuelle. Ce tutoriel utilise BERT pour convertir les textes en vecteurs de longueur fixe. Milvus est utilisé comme base de données vectorielle pour le stockage et la recherche de similarité vectorielle. MySQL est ensuite utilisé pour faire correspondre les ID de vecteurs générés par Milvus aux données textuelles.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_search_engine.png" alt="text_search_engine" class="doc-image" id="text_search_engine" />
   </span> <span class="img-wrapper"> <span>moteur_de_recherche_de_textes</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/text_search_engine_demo.png" alt="text_search_engine" class="doc-image" id="text_search_engine" /><span>moteur_de_recherche_de_textes</span> </span></p>
