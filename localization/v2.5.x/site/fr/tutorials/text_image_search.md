---
id: text_image_search.md
summary: Construire un moteur de recherche texte-image avec Milvus.
title: Moteur de recherche texte-image
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">Moteur de recherche texte-image<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielles open-source, pour construire un moteur de recherche texte-image.</p>
<p>Vous pouvez rapidement créer un moteur de recherche texte-image viable en suivant le tutoriel de base. Vous pouvez également lire le tutoriel d'approfondissement qui couvre tous les aspects, de la sélection du modèle au déploiement du service. Vous pouvez construire un moteur de recherche texte-image plus avancé répondant aux besoins de votre entreprise en suivant les instructions du tutoriel approfondi.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">Tutoriel de base dans le carnet</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">Tutoriel d'approfondissement dans le carnet de notes</a></p></li>
</ul>
<p>Le modèle ML et les logiciels tiers utilisés sont les suivants :</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">Towhee</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">Gradio</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>De nos jours, les moteurs de recherche textuels traditionnels perdent de leur charme et de plus en plus de personnes se tournent vers TikTok comme moteur de recherche favori. Lors d'une recherche de texte traditionnelle, les internautes saisissent des mots-clés et se voient proposer tous les textes contenant le mot-clé. Cependant, les gens se plaignent de ne pas toujours trouver ce qu'ils veulent dans une recherche de ce type. De plus, les résultats ne sont pas assez intuitifs. Les gens disent qu'ils trouvent les images et les vidéos beaucoup plus intuitives et agréables que de devoir parcourir des lignes de texte. C'est ainsi qu'est né le moteur de recherche multimodale texte-image. Grâce à ce nouveau type de moteur de recherche, les internautes peuvent trouver des images pertinentes en saisissant un morceau de texte contenant quelques mots-clés.</p>
<p>Dans ce tutoriel, vous apprendrez à construire un moteur de recherche texte-image. Ce tutoriel utilise le modèle CLIP pour extraire les caractéristiques des images et les convertir en vecteurs. Ces vecteurs d'images sont ensuite stockés dans la base de données vectorielles Milvus. Lorsque les utilisateurs saisissent des textes d'interrogation, ces textes sont également convertis en vecteurs d'intégration à l'aide du même modèle ML CLIP. Ensuite, une recherche de similarité vectorielle est effectuée dans Milvus pour récupérer les vecteurs d'images les plus similaires au vecteur de texte d'entrée.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>Recherche_image_texte</span> </span></p>
