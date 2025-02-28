---
id: recommendation_system.md
summary: Construire un système de recommandation personnalisé avec Milvus.
title: Système de recommandation
---
<h1 id="Recommender-System" class="common-anchor-header">Système de recommandation<button data-href="#Recommender-System" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce tutoriel montre comment utiliser Milvus, la base de données vectorielle open-source, pour construire un système de recommandation.</p>
<p>Le modèle ML et les logiciels tiers utilisés sont les suivants :</p>
<ul>
<li>PaddlePaddle</li>
<li>Redis ou MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p></br></p>
<p>Le système de recommandation est un sous-ensemble du système de filtrage de l'information, qui peut être utilisé dans divers scénarios, notamment la recommandation personnalisée de films, de musique, de produits et de flux d'informations. Contrairement aux moteurs de recherche, les systèmes de recommandation ne demandent pas aux utilisateurs de décrire précisément leurs besoins, mais découvrent les besoins et les intérêts des utilisateurs en analysant leur comportement.</p>
<p></br></p>
<p>Dans ce tutoriel, vous apprendrez à construire un système de recommandation de films qui peut suggérer des films répondant aux intérêts de l'utilisateur. Pour construire un tel système de recommandation, téléchargez d'abord un ensemble de données relatives aux films. Ce tutoriel utilise MovieLens 1M. Vous pouvez également préparer vos propres ensembles de données, qui devraient inclure des informations telles que les évaluations des films par les utilisateurs, les caractéristiques démographiques des utilisateurs et la description des films. Utilisez PaddlePaddle pour combiner les identifiants et les caractéristiques des utilisateurs et les convertir en vecteurs à 256 dimensions. Convertissez les identifiants et les caractéristiques des films en vecteurs de la même manière. Stocker les vecteurs de films dans Milvus et utiliser les vecteurs d'utilisateurs pour la recherche de similarités. Si le vecteur utilisateur est similaire à un vecteur film, Milvus renvoie le vecteur film et son ID comme résultat de la recommandation. Il est ensuite possible d'interroger les informations sur les films à l'aide de l'ID du vecteur de film stocké dans Redis ou MySQL.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/recommendation_system.png" alt="recommender_system" class="doc-image" id="recommender_system" />
   </span> <span class="img-wrapper"> <span>système_de_recommandation</span> </span></p>
