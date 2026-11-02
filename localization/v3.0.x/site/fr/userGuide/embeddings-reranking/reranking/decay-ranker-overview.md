---
id: decay-ranker-overview.md
title: Présentation de Decay RankerCompatible with Milvus 2.6.x
summary: >-
  Dans la recherche vectorielle traditionnelle, les résultats sont classés
  uniquement en fonction de la similarité vectorielle, c'est-à-dire du degré de
  correspondance entre les vecteurs dans l'espace mathématique. Or, dans les
  applications concrètes, la pertinence réelle d'un contenu ne dépend souvent
  pas uniquement de la similarité sémantique.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Présentation de Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans la recherche vectorielle traditionnelle, les résultats sont classés uniquement en fonction de la similarité vectorielle, c'est-à-dire du degré de correspondance entre les vecteurs dans l'espace mathématique. Mais dans les applications concrètes, ce qui rend un contenu véritablement pertinent ne se résume souvent pas à la seule similarité sémantique.</p>
<p>Prenons ces scénarios courants :</p>
<ul>
<li><p>Une recherche d’actualités où l’article d’hier devrait être mieux classé qu’un article similaire datant d’il y a trois ans</p></li>
<li><p>Un moteur de recherche de restaurants qui privilégie les établissements situés à 5 minutes plutôt que ceux nécessitant 30 minutes de route</p></li>
<li><p>Une plateforme de commerce en ligne qui met en avant les produits tendance, même s’ils sont légèrement moins similaires à la requête de recherche</p></li>
</ul>
<p>Ces scénarios partagent tous un besoin commun : trouver un équilibre entre la similarité vectorielle et d’autres facteurs numériques tels que le temps, la distance ou la popularité.</p>
<p>Les classements par décroissance (decay rankers) de Milvus répondent à ce besoin en ajustant les classements de recherche en fonction des valeurs des champs numériques. Ils vous permettent d’équilibrer la similarité vectorielle avec la « fraîcheur », la « proximité » ou d’autres propriétés numériques de vos données, créant ainsi des expériences de recherche plus intuitives et plus pertinentes sur le plan contextuel.</p>
<h2 id="Usage-notes" class="common-anchor-header">Remarques d’utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Le classement par décroissance ne peut pas être utilisé avec les recherches groupées.</p></li>
<li><p>Le champ utilisé pour le classement par décroissance doit être numérique (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code> ou <code translate="no">DOUBLE</code>).</p></li>
<li><p>Chaque système de classement par décroissance ne peut utiliser qu’un seul champ numérique.</p></li>
<li><p><strong>Cohérence des unités de temps</strong>: lorsque vous utilisez un classement par décroissance basé sur le temps, les unités des paramètres <code translate="no">origin</code>, <code translate="no">scale</code> et <code translate="no">offset</code> doivent correspondre à celles utilisées dans les données de votre collection :</p>
<ul>
<li><p>Si votre collection stocke les horodatages en <strong>secondes</strong>, utilisez les secondes pour tous les paramètres</p></li>
<li><p>Si votre collection stocke les horodatages en <strong>millisecondes</strong>, utilisez les millisecondes pour tous les paramètres</p></li>
<li><p>Si votre collection stocke les horodatages en <strong>microsecondes</strong>, utilisez les microsecondes pour tous les paramètres</p></li>
</ul></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Fonctionnement<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Le classement par décroissance améliore la recherche vectorielle traditionnelle en intégrant des facteurs numériques tels que le temps ou la distance géographique dans le processus de classement. L’ensemble du processus se déroule selon les étapes suivantes :</p>
<h3 id="Stage-1-Calculate-normalized-similarity-scores" class="common-anchor-header">Étape 1 : Calcul des scores de similarité normalisés<button data-href="#Stage-1-Calculate-normalized-similarity-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Tout d’abord, Milvus calcule et normalise les scores de similarité vectorielle afin de garantir une comparaison cohérente :</p>
<ul>
<li><p>Pour les mesures de distance <strong>L2</strong> et <strong>JACCARD</strong> (où des valeurs plus faibles indiquent une plus grande similarité) :</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Cela transforme les distances en scores de similarité compris entre 0 et 1, où une valeur élevée est préférable.</p></li>
<li><p>Pour les mesures <strong>IP</strong>, <strong>COSINE</strong> et <strong>BM25</strong> (où des scores plus élevés indiquent déjà de meilleures correspondances) : les scores sont utilisés directement sans normalisation.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Étape 2 : Calcul des scores de décroissance<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Ensuite, Milvus calcule un score de décroissance basé sur la valeur numérique du champ (comme un horodatage ou une distance) à l’aide du classement par décroissance que vous avez sélectionné :</p>
<ul>
<li><p>Chaque système de classement par décroissance transforme les valeurs numériques brutes en scores de pertinence normalisés compris entre 0 et 1</p></li>
<li><p>Le score de décroissance représente la pertinence d’un élément en fonction de sa « distance » par rapport au point idéal</p></li>
</ul>
<p>La formule de calcul spécifique varie en fonction du type de classificateur de décroissance. Pour plus de détails sur le calcul d’un score de décroissance, consultez les pages dédiées à <a href="/docs/fr/gaussian-decay.md#Formula">la décroissance gaussienne</a>, à <a href="/docs/fr/exponential-decay.md#Formula">la décroissance exponentielle</a> et à <a href="/docs/fr/linear-decay.md#Formula">la décroissance linéaire</a>.</p>
<h3 id="Stage-3-Compute-final-scores" class="common-anchor-header">Étape 3 : Calcul des scores finaux<button data-href="#Stage-3-Compute-final-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Enfin, Milvus combine le score de similarité normalisé et le score de décroissance pour produire le score de classement final :</p>
<pre><code translate="no" class="language-plaintext">final_score = normalized_similarity_score × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Dans le cas d’une recherche hybride (combinant plusieurs champs vectoriels), Milvus retient le score de similarité normalisé le plus élevé parmi les requêtes de recherche :</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Par exemple, si un article de recherche obtient un score de 0,82 pour la similarité vectorielle et de 0,91 pour la recherche textuelle basée sur BM25 dans le cadre d’une recherche hybride, Milvus utilise 0,91 comme score de similarité de base avant d’appliquer le facteur de décroissance.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Le classement par décroissance en pratique<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Voyons comment fonctionne le classement par décroissance dans un scénario pratique : la recherche d’ <strong>« articles de recherche sur l’IA »</strong> avec une décroissance en fonction du temps :</p>
<div class="alert note">
<p>Dans cet exemple, les scores de décroissance reflètent la façon dont la pertinence diminue avec le temps : les articles les plus récents obtiennent des scores proches de 1,0, tandis que les articles plus anciens obtiennent des scores plus faibles. Ces valeurs sont calculées à l’aide d’un algorithme de classement par décroissance spécifique. Pour plus de détails, consultez la section « <a href="/docs/fr/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choisir le bon algorithme de classement par décroissance</a> ».</p>
</div>
<table>
   <tr>
     <th><p>Article</p></th>
     <th><p>Similitude vectorielle</p></th>
     <th><p>Score de similarité normalisé</p></th>
     <th><p>Date de publication</p></th>
     <th><p>Score de décroissance</p></th>
     <th><p>Score final</p></th>
     <th><p>Classement final</p></th>
   </tr>
   <tr>
     <td><p>Article A</p></td>
     <td><p>Élevé</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Il y a 2 semaines</p></td>
     <td><p>0,80</p></td>
     <td><p>0,68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Épreuve B</p></td>
     <td><p>Très élevé</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Il y a 6 mois</p></td>
     <td><p>0,45</p></td>
     <td><p>0,41</p></td>
     <td>4</td>
   </tr>
   <tr>
     <td><p>Épreuve C</p></td>
     <td><p>Moyen</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Il y a 1 jour</p></td>
     <td><p>0,98</p></td>
     <td><p>0,74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Document D</p></td>
     <td><p>Moyen-élevé</p></td>
     <td><p>0,76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Il y a 3 semaines</p></td>
     <td><p>0,70</p></td>
     <td><p>0,53</p></td>
     <td>3</td>
   </tr>
</table>
<p>Sans le reclassement par décroissance, l’article B serait en tête du classement sur la base de la seule similarité vectorielle (0,92). Cependant, avec le reclassement par décroissance appliqué :</p>
<ul>
<li><p>l'article C se hisse à la première place malgré une similarité moyenne, car il est très récent (publié hier)</p></li>
<li><p>L'article B recule à la 4e place malgré une excellente similarité, car il est relativement ancien</p></li>
<li><p>L'article D utilise la similarité COSINE ; son score de 0,76 est donc utilisé directement avant l'application du classement par décroissance</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Choisissez le bon système de classement avec décroissance<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose différents classements avec décroissance : <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, chacun étant conçu pour des cas d’utilisation spécifiques :</p>
<table>
   <tr>
     <th><p>Classificateur à décroissance</p></th>
     <th><p>Caractéristiques</p></th>
     <th><p>Cas d'utilisation idéaux</p></th>
     <th><p>Exemple de scénario</p></th>
   </tr>
   <tr>
     <td><p>Gaussien (<code translate="no">gauss</code>)</p></td>
     <td><p>Baisse progressive et naturelle s’étendant modérément</p></td>
     <td><ul><li><p>Recherches générales nécessitant des résultats équilibrés</p></li><li><p>Applications dans lesquelles les utilisateurs ont une perception intuitive de la distance</p></li><li><p>Lorsque la distance modérée ne doit pas pénaliser fortement les résultats</p></li></ul></td>
     <td><p>Dans une recherche de restaurant, les établissements de qualité situés à 3 km restent visibles, bien qu’ils soient classés après les options plus proches</p></td>
   </tr>
   <tr>
     <td><p>Exponentielle (<code translate="no">exp</code>)</p></td>
     <td><p>Diminue rapidement au début mais conserve une longue traîne</p></td>
     <td><ul><li><p>Flux d’actualités où la fraîcheur des informations est essentielle</p></li><li><p>Les réseaux sociaux où le contenu récent doit dominer</p></li><li><p>Lorsque la proximité est fortement privilégiée, mais que certains éléments éloignés exceptionnels doivent rester visibles</p></li></ul></td>
     <td><p>Dans une application d'actualités, les articles d'hier sont bien mieux classés que ceux datant d'une semaine, mais des articles plus anciens très pertinents peuvent tout de même apparaître</p></td>
   </tr>
   <tr>
     <td><p>Linéaire (<code translate="no">linear</code>)</p></td>
     <td><p>Baisse régulière et prévisible avec une limite claire</p></td>
     <td><ul><li><p>Applications présentant des limites naturelles</p></li><li><p>Services avec des limites de distance</p></li><li><p>Contenus avec des dates d’expiration ou des seuils clairs</p></li></ul></td>
     <td><p>Dans un moteur de recherche d'événements, les événements situés au-delà d'une fenêtre de deux semaines ne s'affichent tout simplement pas</p></td>
   </tr>
</table>
<p>Pour plus d’informations sur la manière dont chaque système de classement par décroissance calcule les scores et sur les modèles de décroissance spécifiques, consultez la documentation dédiée :</p>
<ul>
<li><p><a href="/docs/fr/gaussian-decay.md">Déclin gaussien</a></p></li>
<li><p><a href="/docs/fr/exponential-decay.md">Déclin exponentiel</a></p></li>
<li><p><a href="/docs/fr/linear-decay.md">Déclin linéaire</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Exemple d'implémentation<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Les classements par décroissance peuvent être appliqués aussi bien aux opérations de recherche vectorielle standard qu’aux opérations de recherche hybride dans Milvus. Vous trouverez ci-dessous les principaux extraits de code permettant de mettre en œuvre cette fonctionnalité.</p>
<div class="alert note">
<p>Avant d’utiliser les fonctions de décroissance, vous devez d’abord créer une collection comportant les champs numériques appropriés (tels que des horodatages, des distances, etc.) qui seront utilisés pour les calculs de décroissance. Pour des exemples complets et fonctionnels, incluant la configuration de la collection, la définition du schéma et l’insertion des données, consultez <a href="/docs/fr/tutorial-implement-a-time-based-ranking-in-milvus.md">le tutoriel : « Implémenter un classement basé sur le temps dans Milvus</a> ».</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Créer un classificateur à décroissance<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour implémenter le classement par décroissance, définissez d’abord un objet ` <code translate="no">Function</code> ` avec la configuration appropriée :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType
<span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
rerank = Function(
    name=<span class="hljs-string">&quot;time_decay&quot;</span>,                  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;timestamp&quot;</span>],    <span class="hljs-comment"># Numeric field to use for decay</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK for decay rankers</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,            <span class="hljs-comment"># Specify decay reranker. Must be &quot;decay&quot;</span>
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,            <span class="hljs-comment"># Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
        <span class="hljs-string">&quot;origin&quot;</span>: <span class="hljs-built_in">int</span>(datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).timestamp()),    <span class="hljs-comment"># Reference point (seconds)</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,      <span class="hljs-comment"># 7 days in seconds (must match collection data unit)</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,         <span class="hljs-comment"># 1 day no-decay zone (must match collection data unit)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>                    <span class="hljs-comment"># Half score at scale distance</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.DecayRanker;
<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().getEpochSecond())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;time_decay&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function&quot;</span>, <span class="hljs-string">&quot;gauss&quot;</span>).
    WithParam(<span class="hljs-string">&quot;origin&quot;</span>, <span class="hljs-number">1735689600</span>).
    WithParam(<span class="hljs-string">&quot;scale&quot;</span>, <span class="hljs-number">7</span>*<span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;offset&quot;</span>, <span class="hljs-number">24</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>).
    WithParam(<span class="hljs-string">&quot;decay&quot;</span>, <span class="hljs-number">0.5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = DecayRerank::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">function</span>(Function::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .<span class="hljs-title function_ invoke__">input_fields</span>([<span class="hljs-string">&quot;timestamp&quot;</span>])
        .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
        .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;decay&quot;</span>))
    .<span class="hljs-title function_ invoke__">decay_function</span>(<span class="hljs-string">&quot;gauss&quot;</span>)
    .<span class="hljs-title function_ invoke__">origin</span>(<span class="hljs-number">1735689600</span>)
    .<span class="hljs-title function_ invoke__">scale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">offset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    .<span class="hljs-title function_ invoke__">decay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::DecayRerank&gt;(<span class="hljs-string">&quot;time_decay&quot;</span>);
rerank-&gt;<span class="hljs-built_in">AddInputFieldName</span>(<span class="hljs-string">&quot;timestamp&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFunction</span>(<span class="hljs-string">&quot;gauss&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetOrigin</span>(<span class="hljs-number">1735689600</span>);
rerank-&gt;<span class="hljs-built_in">SetScale</span>(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetOffset</span>(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>);
rerank-&gt;<span class="hljs-built_in">SetDecay</span>(<span class="hljs-number">0.5</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">15</span>) / <span class="hljs-number">1000</span>),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Create a decay function for timestamp-based decay</span>
<span class="hljs-comment">// Note: All time parameters must use the same unit as your collection data</span>
<span class="hljs-keyword">var</span> rerank = <span class="hljs-keyword">new</span> DecayRerank(<span class="hljs-string">&quot;time_decay&quot;</span>)     <span class="hljs-comment">// Function identifier</span>
    .WithInputField(<span class="hljs-string">&quot;timestamp&quot;</span>)                <span class="hljs-comment">// Numeric field to use for decay</span>
    .WithFunction(<span class="hljs-string">&quot;gauss&quot;</span>)                       <span class="hljs-comment">// Choose decay function type: &quot;gauss&quot;, &quot;exp&quot;, or &quot;linear&quot;</span>
    .WithOrigin(<span class="hljs-keyword">new</span> DateTimeOffset(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, TimeSpan.Zero).ToUnixTimeSeconds()) <span class="hljs-comment">// Reference point (seconds)</span>
    .WithScale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                 <span class="hljs-comment">// 7 days in seconds (must match collection data unit)</span>
    .WithOffset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)                    <span class="hljs-comment">// 1 day no-decay zone (must match collection data unit)</span>
    .WithDecay(<span class="hljs-number">0.5f</span>);                            <span class="hljs-comment">// Half score at scale distance</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
     <td><p>Identifiant de votre fonction utilisé lors des recherches. Choisissez un nom descriptif adapté à votre cas d'utilisation.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Champ numérique pour le calcul du score de décroissance. Détermine quel attribut de données sera utilisé pour calculer la décroissance (par exemple, les horodatages pour une décroissance basée sur le temps, les coordonnées pour une décroissance basée sur la localisation). </p><p>Doit correspondre à un champ de votre collection contenant des valeurs numériques pertinentes. Prend en charge les types INT8/16/32/64, FLOAT et DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le type de fonction en cours de création.</p><p>Doit être défini sur « <code translate="no">RERANK</code> » pour tous les classements par décroissance.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie la méthode de reclassement à utiliser.</p><p>Doit être défini sur « <code translate="no">"decay"</code> » pour activer la fonctionnalité de classement par décroissance.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le classificateur mathématique à appliquer. Détermine la forme de la courbe de déclin de la pertinence.</p><p>Reportez-vous à la section « <a href="/docs/fr/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choisir le bon algorithme de classement par décroissance</a> » pour obtenir des conseils sur le choix de la fonction appropriée.</p></td>
     <td><p><code translate="no">"gauss"</code>, « <code translate="no">"exp"</code> » ou <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Point de référence à partir duquel le score de décroissance est calculé. Les éléments ayant cette valeur reçoivent des scores de pertinence maximaux.</p><p>Pour une décroissance basée sur le temps, l’unité de temps doit correspondre à celle de vos données de collection.</p></td>
     <td><ul><li><p>Pour les horodatages : heure actuelle (par exemple, <code translate="no">int(time.time())</code>)</p></li><li><p>Pour la géolocalisation : les coordonnées actuelles de l’utilisateur</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Distance ou durée à partir de laquelle la pertinence chute à la valeur <code translate="no">decay</code>. Détermine la vitesse à laquelle la pertinence diminue.</p><p>Pour la décroissance basée sur le temps, l'unité de temps doit correspondre à vos données de collecte.</p><p>Des valeurs plus élevées entraînent une baisse plus progressive de la pertinence ; des valeurs plus faibles entraînent une baisse plus rapide.</p></td>
     <td><ul><li><p>Pour la durée : période en secondes (par exemple, <code translate="no">7 * 24 * 60 * 60</code> pour 7 jours)</p></li><li><p>Pour la distance : en mètres (par exemple, <code translate="no">5000</code> à 5 km)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Non</p></td>
     <td><p>Crée une « zone sans décroissance » autour de l’ <code translate="no">origin</code>, dans laquelle les éléments conservent leur score maximal (score de décroissance = 1,0).</p><p>Pour une décroissance basée sur le temps, l’unité de temps doit correspondre à celle de vos données de collecte.</p><p>Les éléments situés dans ce rayon autour de l’ <code translate="no">origin</code> conservent une pertinence maximale.</p></td>
     <td><ul><li><p>Pour la durée : période en secondes (par exemple, <code translate="no">24 * 60 * 60</code> pendant 1 jour)</p></li><li><p>Pour la distance : en mètres (par exemple, <code translate="no">500</code> pour 500 m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Non</p></td>
     <td><p>Valeur de score à la distance d’ <code translate="no">scale</code>, contrôle la pente de la courbe. Les valeurs faibles créent des courbes de déclin plus raides ; les valeurs élevées créent des courbes de déclin plus progressives.</p><p>Doit être comprise entre 0 et 1.</p></td>
     <td><p><code translate="no">0.5</code> (par défaut)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Appliquer à la recherche vectorielle standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Une fois votre classificateur de décroissance défini, vous pouvez l’appliquer lors des opérations de recherche en le transmettant au paramètre « <code translate="no">ranker</code> » :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=rerank,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

functionScore := entity.NewFunctionScore().AddFunction(rerank)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collection_name, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">10</span>,              <span class="hljs-comment">// limit</span>
    []entity.Vector{your_query_vector}, <span class="hljs-comment">// query vector</span>
).WithANNSField(<span class="hljs-string">&quot;vector_field&quot;</span>).
    WithFunctionScore(functionScore).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank);
<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(collection_name)
    .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[your_query_vector]))
    .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
    .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
    .<span class="hljs-title function_ invoke__">output_fields</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>])
    .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
    .<span class="hljs-title function_ invoke__">build</span>()?;
<span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = client.<span class="hljs-title function_ invoke__">search</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector_field&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;document&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;timestamp&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(your_query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collection_name,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector_field&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: rerank,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Use the decay function in standard vector search</span>
SearchResp results = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = collectionName,
    Vectors = [yourQueryVector], <span class="hljs-comment">// Replace with your query vector</span>
    VectorFieldName = <span class="hljs-string">&quot;vector_field&quot;</span>,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span> },  <span class="hljs-comment">// Include the decay field in outputs to see values</span>
        FunctionScoreReranker = rerank,              <span class="hljs-comment">// Apply the decay ranker here</span>
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
