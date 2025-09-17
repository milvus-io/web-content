---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Au lieu de s'appuyer uniquement sur la similarité sémantique calculée sur la
  base des distances vectorielles, les Boost Rankers vous permettent
  d'influencer les résultats de recherche de manière significative. Il est idéal
  pour ajuster rapidement les résultats de recherche en utilisant le filtrage
  des métadonnées.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Au lieu de s'appuyer uniquement sur la similarité sémantique calculée sur la base des distances vectorielles, les Boost Rankers vous permettent d'influencer les résultats de recherche de manière significative. Il est idéal pour ajuster rapidement les résultats de recherche à l'aide du filtrage des métadonnées.</p>
<p>Lorsqu'une demande de recherche inclut une fonction Boost Ranker, Milvus utilise la condition de filtrage facultative dans la fonction pour trouver des correspondances parmi les candidats aux résultats de recherche et augmente les scores de ces correspondances en appliquant le poids spécifié, ce qui permet de promouvoir ou de rétrograder les classements des entités correspondantes dans le résultat final.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Quand utiliser Boost Ranker ?<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Contrairement à d'autres outils de classement qui s'appuient sur des modèles d'encodage croisé ou des algorithmes de fusion, un Boost Ranker injecte directement des règles optionnelles basées sur les métadonnées dans le processus de classement, ce qui le rend plus approprié dans les scénarios suivants.</p>
<table>
   <tr>
     <th><p>Cas d'utilisation</p></th>
     <th><p>Exemples de cas d'utilisation</p></th>
     <th><p>Pourquoi Boost Ranker fonctionne bien</p></th>
   </tr>
   <tr>
     <td><p>Hiérarchisation du contenu en fonction de l'activité de l'entreprise</p></td>
     <td><ul><li><p>Mettre en avant les produits haut de gamme dans les résultats de recherche du commerce électronique</p></li><li><p>Augmenter la visibilité du contenu avec des métriques d'engagement utilisateur élevées (telles que les vues, les likes et les partages)</p></li><li><p>Mettre en avant les contenus récents dans les applications de recherche sensibles au temps</p></li><li><p>Donner la priorité au contenu provenant de sources vérifiées ou fiables</p></li><li><p>Renforcer les résultats correspondant à des expressions exactes ou à des mots-clés très pertinents</p></li></ul></td>
     <td rowspan="2"><p>Sans avoir à reconstruire les index ou à modifier les modèles d'intégration des vecteurs, opérations qui peuvent prendre beaucoup de temps, vous pouvez instantanément promouvoir ou rétrograder des éléments spécifiques dans les résultats de recherche en appliquant des filtres de métadonnées optionnels en temps réel. Ce mécanisme permet d'obtenir des classements de recherche flexibles et dynamiques qui s'adaptent facilement à l'évolution des besoins de l'entreprise.</p></td>
   </tr>
   <tr>
     <td><p>Rétrogradation stratégique du contenu</p></td>
     <td><ul><li><p>Réduction de la proéminence des éléments à faible inventaire sans les supprimer complètement</p></li><li><p>Abaisser le rang du contenu contenant des termes potentiellement répréhensibles sans le censurer.</p></li><li><p>Rétrograder la documentation plus ancienne tout en la gardant accessible dans les recherches techniques</p></li><li><p>Réduire subtilement la visibilité des produits concurrents dans les recherches sur la place de marché</p></li><li><p>Diminuer la pertinence du contenu avec des indications de qualité inférieure (telles que des problèmes de formatage, une longueur plus courte, etc.)</p></li></ul></td>
   </tr>
</table>
<p>Vous pouvez également combiner plusieurs Boost Rankers pour mettre en œuvre une stratégie de classement plus dynamique et plus robuste basée sur le poids.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Mécanisme de Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme suivant illustre le flux de travail principal des Boost Rankers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Mécanisme de Boost Ranker</span> </span></p>
<p>Lorsque vous insérez des données, Milvus les répartit entre les segments. Lors d'une recherche, chaque segment renvoie un ensemble de candidats et Milvus classe ces candidats à partir de tous les segments pour produire les résultats finaux. Lorsqu'une demande de recherche inclut un Boost Ranker, Milvus l'applique aux résultats des candidats de chaque segment afin d'éviter toute perte potentielle de précision et d'améliorer le rappel.</p>
<p>Avant de finaliser les résultats, Milvus traite ces candidats avec le Boost Ranker comme suit :</p>
<ol>
<li><p>Il applique l'expression de filtrage facultative spécifiée dans le Boost Ranker pour identifier les entités qui correspondent à l'expression.</p></li>
<li><p>Il applique la pondération spécifiée dans le Boost Ranker pour augmenter les scores des entités identifiées.</p></li>
</ol>
<div class="alert note">
<p>Vous ne pouvez pas utiliser Boost Ranker comme outil de classement dans une recherche hybride multi-vectorielle. Cependant, vous pouvez l'utiliser comme classificateur dans n'importe laquelle de ses sous-requêtes (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Exemples de Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant illustre l'utilisation d'un Boost Ranker dans une recherche à vecteur unique qui nécessite de renvoyer les cinq entités les plus pertinentes et d'ajouter des poids aux scores des entités ayant le type de document abstrait.</p>
<ol>
<li><p><strong>Rassembler les candidats aux résultats de la recherche par segments.</strong></p>
<p>Le tableau suivant suppose que Milvus distribue les entités en deux segments<strong>(0001</strong> et <strong>0002</strong>), chaque segment renvoyant cinq candidats.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Type de document</p></th>
<th><p>Score</p></th>
<th><p>Rang</p></th>
<th><p>segment</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstrait</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstrait</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corps</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titre</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corps</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corps</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corps</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstrait</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstrait</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstrait</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Appliquer l'expression de filtrage spécifiée dans le Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Comme l'indique le champ <code translate="no">DocType</code> dans le tableau suivant, Milvus marquera toutes les entités dont le champ <code translate="no">doctype</code> est défini sur <code translate="no">abstract</code> pour la suite du traitement.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Score</p></th>
<th><p>Rang</p></th>
<th><p>segment</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corps</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titre</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corps</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corps</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corps</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Appliquer le poids spécifié dans le Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Toutes les entités identifiées à l'étape précédente seront multipliées par le poids spécifié dans le Boost Ranker, ce qui modifiera leur classement.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Score</p></th>
<th><p>Score pondéré </p><p>(= score x poids)</p></th>
<th><p>Rang</p></th>
<th><p>segment</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>corps</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>titre</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>corps</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corps</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>corps</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>La pondération doit être un nombre à virgule flottante que vous choisissez. Dans des cas comme l'exemple ci-dessus, où un score plus faible indique une plus grande pertinence, utilisez une pondération inférieure à <strong>1</strong>. Dans le cas contraire, utilisez une pondération supérieure à <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Agrégez les candidats de tous les segments sur la base des scores pondérés pour finaliser les résultats.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Type de document</p></th>
<th><p>Score</p></th>
<th><p>Score pondéré</p></th>
<th><p>Rang</p></th>
<th><p>segment</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>corps</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrait</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Utilisation de Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cette section, vous verrez des exemples d'utilisation de Boost Ranker pour influencer les résultats d'une recherche sur un seul vecteur.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Créer un Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Avant de passer un Boost Ranker en tant que reranker d'une requête de recherche, vous devez définir correctement le Boost Ranker en tant que fonction de reranking comme suit :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Obligatoire ?</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur/Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Identifiant unique pour cette fonction</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Liste des champs vectoriels auxquels appliquer la fonction (doit être vide pour RRF Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Type de fonction à invoquer ; utiliser <code translate="no">RERANK</code> pour spécifier une stratégie de reclassement</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le type de reranker.</p><p>Doit être défini sur <code translate="no">boost</code> pour utiliser Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le poids qui sera multiplié par les scores de toutes les entités correspondantes dans les résultats de recherche bruts.</p><p>La valeur doit être un nombre à virgule flottante. </p><ul><li><p>Pour mettre l'accent sur l'importance des entités correspondantes, définissez une valeur qui augmente les scores.</p></li><li><p>Pour rétrograder les entités correspondantes, attribuez à ce paramètre une valeur qui diminue leur score.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>Non</p></td>
     <td><p>Spécifie l'expression de filtre qui sera utilisée pour faire correspondre les entités parmi les entités des résultats de la recherche. Il peut s'agir de n'importe quelle expression de filtre de base valide mentionnée dans <a href="/docs/fr/boolean.md">Filtering Explained (Le filtrage expliqué)</a>.</p><p><strong>Remarque</strong>: n'utilisez que des opérateurs de base, tels que <code translate="no">==</code>, <code translate="no">&gt;</code> ou <code translate="no">&lt;</code>. L'utilisation d'opérateurs avancés, tels que <code translate="no">text_match</code> ou <code translate="no">phrase_match</code>, dégradera les performances de la recherche.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>Non</p></td>
     <td><p>Spécifie la fonction aléatoire qui génère une valeur entre <code translate="no">0</code> et <code translate="no">1</code> de manière aléatoire. Elle possède les deux arguments facultatifs suivants :</p><ul><li><p><code translate="no">seed</code> (nombre) Spécifie une valeur initiale utilisée pour démarrer un générateur de nombres pseudo-aléatoires (PRNG).</p></li><li><p><code translate="no">field</code> (string) Spécifie le nom d'un champ dont la valeur sera utilisée comme facteur aléatoire dans la génération du nombre aléatoire. Un champ avec des valeurs uniques suffit.</p><p>Il est conseillé de définir à la fois <code translate="no">seed</code> et <code translate="no">field</code> pour garantir la cohérence entre les générations en utilisant les mêmes valeurs de graine et de champ.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Recherche avec un seul Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Une fois que la fonction Boost Ranker est prête, vous pouvez la référencer dans une requête de recherche. L'exemple suivant suppose que vous avez déjà créé une collection avec les champs suivants : <strong>id</strong>, <strong>vector</strong> et <strong>doctype</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Recherche avec plusieurs Boost Rankers<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Vous pouvez combiner plusieurs Boost Rankers dans une seule recherche afin d'influencer les résultats de la recherche. Pour ce faire, créez plusieurs Boost Rankers, référencez-les dans une instance de <strong>FunctionScore</strong> et utilisez l'instance de <strong>FunctionScore</strong> comme ranker dans la requête de recherche.</p>
<p>L'exemple suivant montre comment modifier les scores de toutes les entités identifiées en appliquant une pondération comprise entre <strong>0,8</strong> et <strong>1,2</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>Plus précisément, il existe deux classificateurs Boost : l'un applique un poids fixe à toutes les entités trouvées, tandis que l'autre leur attribue un poids aléatoire. Ensuite, nous référençons ces deux classificateurs dans une <strong>FunctionScore</strong>, qui définit également comment les poids influencent les scores des entités trouvées.</p>
<p>Le tableau suivant répertorie les paramètres nécessaires à la création d'une instance de <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Nécessaire ?</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur/Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie les noms des classeurs cibles dans une liste.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Non</p></td>
     <td><p>Indique comment les pondérations spécifiées influencent les scores des entités correspondantes.</p><p>Les valeurs possibles sont les suivantes :</p><ul><li><p><code translate="no">Multiple</code></p><p>Indique que la valeur pondérée est égale à la note initiale d'une entité correspondante multipliée par la pondération spécifiée. </p><p>Il s'agit de la valeur par défaut.</p></li><li><p><code translate="no">Sum</code></p><p>Indique que la valeur pondérée est égale à la somme du score original d'une entité correspondante et du poids spécifié.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Non</p></td>
     <td><p>Indique comment les valeurs pondérées des différents Boost Rankers sont traitées.</p><p>Les valeurs possibles sont les suivantes</p><ul><li><p><code translate="no">Multiplify</code></p><p>Indique que le score final d'une entité correspondante est égal au produit des valeurs pondérées de tous les Boost Rankers.</p><p>Il s'agit de la valeur par défaut.</p></li><li><p><code translate="no">Sum</code></p><p>Indique que le score final d'une entité correspondante est égal à la somme des valeurs pondérées de tous les Boost Rankers.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
