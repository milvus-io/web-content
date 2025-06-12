---
id: image_deduplication_system.md
summary: Construire un système de déduplication d'images avec Milvus.
title: Déduplication d'images
---
<h1 id="Image-Deduplication" class="common-anchor-header">Déduplication d'images<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un système de déduplication d'images.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">Carnet de notes ouvert</a></li>
</ul>
<p>Le modèle ML et les logiciels tiers utilisés comprennent :</p>
<ul>
<li><p>ResNet-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">Towhee</a></p></li>
</ul>
<p>Ces dernières années ont été marquées par une explosion exponentielle du contenu généré par les utilisateurs. Les gens peuvent instantanément télécharger une photo qu'ils ont prise sur une plateforme de médias sociaux. Cependant, avec une telle abondance de données d'images, nous voyons beaucoup de contenu dupliqué. Afin d'améliorer l'expérience des utilisateurs, ces images dupliquées doivent être supprimées. Un système de déduplication d'images nous évite le travail manuel consistant à comparer les images de la base de données une par une pour en extraire les doublons. La sélection d'images exactement identiques n'est pas une tâche compliquée. Cependant, il arrive qu'une image soit zoomée, recadrée ou que la luminosité ou l'échelle de gris soient modifiées. Le système de déduplication d'images doit identifier ces images similaires et les éliminer.</p>
<p>Dans ce tutoriel, vous apprendrez à construire un système de déduplication d'images. Ce tutoriel utilise le modèle ResNet-50 pour extraire les caractéristiques des images et les convertir en vecteurs. Ces vecteurs d'images sont ensuite stockés dans la base de données vectorielle Milvus et une recherche de similarité vectorielle est également effectuée dans Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail pour la déduplication d'images</span> </span></p>
