---
id: video_similarity_search.md
summary: Créez un système de recherche de similarités vidéo avec Milvus.
title: Recherche de similarité vidéo
---
<h1 id="Video-Similarity-Search" class="common-anchor-header">Recherche de similarité vidéo<button data-href="#Video-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un système de recherche de similarité vidéo.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/video/reverse_video_search">Bloc-notes Jupyter ouvert</a></li>
</ul>
<p>Les modèles ML et les logiciels tiers utilisés sont les suivants :</p>
<ul>
<li>OpenCV</li>
<li>ResNet-50</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>De nos jours, après avoir regardé un film ou une vidéo qu'ils aiment, les gens peuvent facilement faire des captures d'écran et partager leurs pensées en les publiant sur diverses plateformes de réseaux sociaux. Lorsque les internautes voient les captures d'écran, il peut être très difficile pour eux de savoir de quel film il s'agit si le nom du film n'est pas explicitement indiqué dans le message. Pour trouver le nom du film, les internautes peuvent utiliser un système de recherche de similitudes vidéo. Ce système permet aux utilisateurs de télécharger une image et d'obtenir des vidéos ou des films contenant des images clés similaires à l'image téléchargée.</p>
<p><br/></p>
<p>Dans ce tutoriel, vous apprendrez à construire un système de recherche par similarité vidéo. Ce tutoriel utilise environ 100 gifs animés sur Tumblr pour construire le système. Cependant, vous pouvez également préparer vos propres ensembles de données vidéo. Le système utilise d'abord OpenCV pour extraire les images clés des vidéos, puis obtient les vecteurs de caractéristiques de chaque image clé à l'aide de ResNet-50. Tous les vecteurs sont stockés et recherchés dans Milvus, qui renvoie les ID des vecteurs similaires. Les ID sont ensuite mis en correspondance avec la vidéo correspondante stockée dans MySQL.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search.png" alt="video_search" class="doc-image" id="video_search" />
   </span> <span class="img-wrapper"> <span>video_search</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/video_search_demo.gif" alt="video_search_demo" class="doc-image" id="video_search_demo" /><span>video_search_demo</span> </span></p>
