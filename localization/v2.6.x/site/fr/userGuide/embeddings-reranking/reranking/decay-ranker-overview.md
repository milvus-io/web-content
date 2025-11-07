---
id: decay-ranker-overview.md
title: Aperçu de Decay RankerCompatible with Milvus 2.6.x
summary: >-
  Dans la recherche vectorielle traditionnelle, les résultats sont classés
  uniquement en fonction de la similarité vectorielle, c'est-à-dire de la
  proximité des vecteurs dans l'espace mathématique. Mais dans les applications
  du monde réel, la pertinence d'un contenu ne dépend pas uniquement de la
  similarité sémantique.
beta: Milvus 2.6.x
---
<h1 id="Decay-Ranker-Overview" class="common-anchor-header">Aperçu de Decay Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Decay-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans la recherche vectorielle traditionnelle, les résultats sont classés uniquement en fonction de la similarité vectorielle, c'est-à-dire de la proximité des vecteurs dans l'espace mathématique. Mais dans les applications du monde réel, la pertinence d'un contenu ne dépend pas uniquement de la similarité sémantique.</p>
<p>Prenons l'exemple de ces scénarios quotidiens :</p>
<ul>
<li><p>Une recherche d'actualités où l'article d'hier devrait être mieux classé qu'un article similaire datant d'il y a trois ans.</p></li>
<li><p>Un moteur de recherche de restaurants qui donne la priorité aux établissements situés à 5 minutes de chez vous plutôt qu'à ceux qui nécessitent 30 minutes de route.</p></li>
<li><p>Une plateforme de commerce électronique qui met en avant les produits en vogue même s'ils sont légèrement moins similaires à la requête de recherche.</p></li>
</ul>
<p>Ces scénarios ont tous un besoin commun : équilibrer la similarité vectorielle avec d'autres facteurs numériques tels que le temps, la distance ou la popularité.</p>
<p>Les classeurs de décroissance de Milvus répondent à ce besoin en ajustant les classements de recherche sur la base des valeurs des champs numériques. Ils vous permettent d'équilibrer la similarité vectorielle avec la "fraîcheur", la "proximité" ou d'autres propriétés numériques de vos données, créant ainsi des expériences de recherche plus intuitives et contextuellement pertinentes.</p>
<h2 id="Usage-notes" class="common-anchor-header">Notes d'utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p>Le classement par décroissance ne peut pas être utilisé avec les recherches par regroupement.</p></li>
<li><p>Le champ utilisé pour le classement par ordre de décroissance doit être numérique (<code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, ou <code translate="no">DOUBLE</code>).</p></li>
<li><p>Chaque classificateur ne peut utiliser qu'un seul champ numérique.</p></li>
<li><p><strong>Cohérence des unités de temps</strong>: Lorsque vous utilisez un classement par ordre de décroissance basé sur le temps, les unités des paramètres <code translate="no">origin</code>, <code translate="no">scale</code> et <code translate="no">offset</code> doivent correspondre aux unités utilisées dans les données de votre collection :</p>
<ul>
<li><p>Si votre collection stocke les horodatages en <strong>secondes</strong>, utilisez les secondes pour tous les paramètres.</p></li>
<li><p>Si votre collection stocke les horodatages en <strong>millisecondes</strong>, utilisez les millisecondes pour tous les paramètres.</p></li>
<li><p>Si votre collection stocke des horodatages en <strong>microsecondes</strong>, utilisez les microsecondes pour tous les paramètres.</p></li>
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
    </button></h2><p>Le classement par décroissance améliore la recherche vectorielle traditionnelle en incorporant des facteurs numériques tels que le temps ou la distance géographique dans le processus de classement. L'ensemble du processus suit les étapes suivantes :</p>
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
    </button></h3><p>Tout d'abord, Milvus calcule et normalise les scores de similarité des vecteurs afin de garantir une comparaison cohérente :</p>
<ul>
<li><p>Pour les mesures de distance <strong>L2</strong> et <strong>JACCARD</strong> (où des valeurs plus faibles indiquent une plus grande similarité) :</p>
<pre><code translate="no" class="language-plaintext">normalized_score = 1.0 - (2 × arctan(score))/π
<button class="copy-code-btn"></button></code></pre>
<p>Les distances sont transformées en scores de similarité compris entre 0 et 1, la valeur la plus élevée étant la meilleure.</p></li>
<li><p>Pour les mesures <strong>IP</strong>, <strong>COSINE</strong> et <strong>BM25</strong> (où des scores plus élevés indiquent déjà de meilleures correspondances) : Les scores sont utilisés directement sans normalisation.</p></li>
</ul>
<h3 id="Stage-2-Calculate-decay-scores" class="common-anchor-header">Étape 2 : Calcul des scores de dégradation<button data-href="#Stage-2-Calculate-decay-scores" class="anchor-icon" translate="no">
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
    </button></h3><p>Ensuite, Milvus calcule un score de dégradation basé sur la valeur de champ numérique (comme l'horodatage ou la distance) à l'aide du classificateur de dégradation sélectionné :</p>
<ul>
<li><p>Chaque classificateur de dégradation transforme les valeurs numériques brutes en scores de pertinence normalisés compris entre 0 et 1</p></li>
<li><p>Le score de décroissance représente le degré de pertinence d'un élément en fonction de sa "distance" par rapport au point idéal.</p></li>
</ul>
<p>La formule de calcul spécifique varie en fonction du type de classificateur de décroissance. Pour plus de détails sur le calcul d'un score de décroissance, reportez-vous aux pages consacrées à la <a href="/docs/fr/gaussian-decay.md#Formula">décroissance gaussienne</a>, à la <a href="/docs/fr/exponential-decay.md#Formula">décroissance exponentielle</a> et à la <a href="/docs/fr/linear-decay.md#Formula">décroissance linéaire</a>.</p>
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
<p>En cas de recherche hybride (combinaison de plusieurs champs vectoriels), Milvus prend le score de similarité normalisé maximal parmi les requêtes de recherche :</p>
<pre><code translate="no" class="language-plaintext">final_score = max([normalized_score₁, normalized_score₂, ..., normalized_scoreₙ]) × decay_score
<button class="copy-code-btn"></button></code></pre>
<p>Par exemple, si un document de recherche obtient un score de 0,82 pour la similarité vectorielle et un score de 0,91 pour la recherche de texte basée sur BM25 dans une recherche hybride, Milvus utilise 0,91 comme score de similarité de base avant d'appliquer le facteur de décroissance.</p>
<h3 id="Decay-ranking-in-action" class="common-anchor-header">Le classement par décroissance en action<button data-href="#Decay-ranking-in-action" class="anchor-icon" translate="no">
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
    </button></h3><p>Voyons le classement par décroissance dans un scénario pratique : la recherche de <strong>"documents de recherche sur l'IA"</strong> avec une décroissance basée sur le temps :</p>
<div class="alert note">
<p>Dans cet exemple, les scores de décroissance reflètent la manière dont la pertinence diminue avec le temps - les articles plus récents obtiennent des scores plus proches de 1,0, tandis que les articles plus anciens obtiennent des scores plus faibles. Ces valeurs sont calculées à l'aide d'un classificateur de décroissance spécifique. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choisir le bon classificateur de décroissance</a>.</p>
</div>
<table>
   <tr>
     <th><p>Article</p></th>
     <th><p>Similitude vectorielle</p></th>
     <th><p>Score de similarité normalisé</p></th>
     <th><p>Date de publication</p></th>
     <th><p>Score de décroissance</p></th>
     <th><p>Score final</p></th>
     <th><p>Rang final</p></th>
   </tr>
   <tr>
     <td><p>Papier A</p></td>
     <td><p>Élevé</p></td>
     <td><p>0,85 (<code translate="no">COSINE</code>)</p></td>
     <td><p>il y a 2 semaines</p></td>
     <td><p>0.80</p></td>
     <td><p>0.68</p></td>
     <td>2</td>
   </tr>
   <tr>
     <td><p>Papier B</p></td>
     <td><p>Très élevé</p></td>
     <td><p>0,92 (<code translate="no">COSINE</code>)</p></td>
     <td><p>Il y a 6 mois</p></td>
     <td><p>0.45</p></td>
     <td><p>0.41</p></td>
     <td>3</td>
   </tr>
   <tr>
     <td><p>Papier C</p></td>
     <td><p>Moyen</p></td>
     <td><p>0,75 (<code translate="no">COSINE</code>)</p></td>
     <td><p>1 jour ago</p></td>
     <td><p>0.98</p></td>
     <td><p>0.74</p></td>
     <td>1</td>
   </tr>
   <tr>
     <td><p>Papier D</p></td>
     <td><p>Moyenne-élevée</p></td>
     <td><p>0.76 (<code translate="no">COSINE</code>)</p></td>
     <td><p>il y a 3 semaines</p></td>
     <td><p>0.70</p></td>
     <td><p>0.53</p></td>
     <td>4</td>
   </tr>
</table>
<p>Sans le classement par décroissance, le document B serait le mieux classé sur la base de la similarité vectorielle pure (0,92). Cependant, avec l'application du decay reranking :</p>
<ul>
<li><p>l'article C passe en première position malgré une similarité moyenne parce qu'il est très récent (publié hier)</p></li>
<li><p>L'article B passe en troisième position malgré une excellente similarité, car il est relativement ancien.</p></li>
<li><p>L'article D utilise la distance L2 (plus elle est faible, mieux c'est), et son score est donc normalisé de 1,2 à 0,76 avant l'application de la décroissance.</p></li>
</ul>
<h2 id="Choose-the-right-decay-ranker" class="common-anchor-header">Choisir le bon classificateur de désintégration<button data-href="#Choose-the-right-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose différents classeurs de décroissance - <code translate="no">gauss</code>, <code translate="no">exp</code>, <code translate="no">linear</code>, chacun conçu pour des cas d'utilisation spécifiques :</p>
<table>
   <tr>
     <th><p>Classeur de désintégration</p></th>
     <th><p>Caractéristiques</p></th>
     <th><p>Cas d'utilisation idéaux</p></th>
     <th><p>Exemple de scénario</p></th>
   </tr>
   <tr>
     <td><p>Gaussien (<code translate="no">gauss</code>)</p></td>
     <td><p>Déclin progressif et naturel qui s'étend modérément</p></td>
     <td><ul><li><p>Recherches générales nécessitant des résultats équilibrés</p></li><li><p>Applications où les utilisateurs ont un sens intuitif de la distance</p></li><li><p>Lorsque la distance modérée ne doit pas pénaliser gravement les résultats</p></li></ul></td>
     <td><p>Dans une recherche de restaurant, les établissements de qualité situés à 3 km restent accessibles, bien qu'ils soient moins bien classés que les établissements situés à proximité.</p></td>
   </tr>
   <tr>
     <td><p>Exponentiel (<code translate="no">exp</code>)</p></td>
     <td><p>Diminue rapidement au début, mais conserve une longue traîne</p></td>
     <td><ul><li><p>Fils d'actualité où la récence est essentielle</p></li><li><p>Médias sociaux où le contenu frais doit dominer</p></li><li><p>Lorsque la proximité est fortement privilégiée mais que des articles exceptionnellement éloignés doivent rester visibles</p></li></ul></td>
     <td><p>Dans une application d'actualités, les articles d'hier se classent beaucoup mieux que le contenu de la semaine précédente, mais des articles plus anciens très pertinents peuvent encore apparaître.</p></td>
   </tr>
   <tr>
     <td><p>Linéaire (<code translate="no">linear</code>)</p></td>
     <td><p>Déclin cohérent et prévisible avec une limite claire.</p></td>
     <td><ul><li><p>Applications avec des frontières naturelles</p></li><li><p>Services avec des limites de distance</p></li><li><p>Contenu avec des dates d'expiration ou des seuils clairs</p></li></ul></td>
     <td><p>Dans un outil de recherche d'événements, les événements au-delà d'une fenêtre future de deux semaines n'apparaissent tout simplement pas.</p></td>
   </tr>
</table>
<p>Pour obtenir des informations détaillées sur la manière dont chaque outil de classement calcule les scores et les modèles de déclin spécifiques, reportez-vous à la documentation correspondante :</p>
<ul>
<li><p><a href="/docs/fr/gaussian-decay.md">Décroissance gaussienne</a></p></li>
<li><p><a href="/docs/fr/exponential-decay.md">Décroissance exponentielle</a></p></li>
<li><p><a href="/docs/fr/linear-decay.md">Décroissance linéaire</a></p></li>
</ul>
<h2 id="Implementation-example" class="common-anchor-header">Exemple de mise en œuvre<button data-href="#Implementation-example" class="anchor-icon" translate="no">
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
    </button></h2><p>Les classificateurs de décroissance peuvent être appliqués aux opérations de recherche vectorielle standard et de recherche hybride dans Milvus. Vous trouverez ci-dessous les principaux extraits de code pour la mise en œuvre de cette fonctionnalité.</p>
<div class="alert note">
<p>Avant d'utiliser les fonctions de décroissance, vous devez d'abord créer une collection avec les champs numériques appropriés (comme les horodatages, les distances, etc.) qui seront utilisés pour les calculs de décroissance. Pour des exemples de travail complets comprenant la configuration de la collection, la définition du schéma et l'insertion de données, reportez-vous au <a href="/docs/fr/tutorial-implement-a-time-based-ranking-in-milvus.md">didacticiel : Mise en œuvre du classement basé sur le temps dans Milvus</a>.</p>
</div>
<h3 id="Create-a-decay-ranker" class="common-anchor-header">Création d'un classeur de décroissance<button data-href="#Create-a-decay-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour mettre en œuvre le classement par décroissance, définissez d'abord un objet <code translate="no">Function</code> avec la configuration appropriée :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

<span class="hljs-comment"># Create a decay function for timestamp-based decay</span>
<span class="hljs-comment"># Note: All time parameters must use the same unit as your collection data</span>
decay_ranker = Function(
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

<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">zdt</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ZoneId.systemDefault());

<span class="hljs-type">DecayRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> DecayRanker.builder()
        .name(<span class="hljs-string">&quot;time_decay&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;timestamp&quot;</span>))
        .function(<span class="hljs-string">&quot;gauss&quot;</span>)
        .origin(zdt.toInstant().toEpochMilli())
        .scale(<span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .offset(<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        .decay(<span class="hljs-number">0.5</span>)
        .build();

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> decayRanker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;time_decay&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">function_type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;decay&quot;</span>,
    <span class="hljs-attr">function</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
    <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">15</span>).<span class="hljs-title function_">getTime</span>(),
    <span class="hljs-attr">scale</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">offset</span>: <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">decay</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Paramètres</p></th>
     <th><p>Nécessaire ?</p></th>
     <th><p>Description de l'objet</p></th>
     <th><p>Valeur/Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Identifiant de la fonction utilisée lors de l'exécution des recherches. Choisissez un nom descriptif correspondant à votre cas d'utilisation.</p></td>
     <td><p><code translate="no">"time_decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Champ numérique pour le calcul du score de décroissance. Détermine l'attribut de données qui sera utilisé pour le calcul de la dégradation (par exemple, les horodatages pour la dégradation basée sur le temps, les coordonnées pour la dégradation basée sur l'emplacement). </p><p>Il doit s'agir d'un champ de votre collection qui contient des valeurs numériques pertinentes. Prend en charge INT8/16/32/64, FLOAT, DOUBLE.</p></td>
     <td><p><code translate="no">["timestamp"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le type de fonction créée.</p><p>Doit être défini sur <code translate="no">RERANK</code> pour tous les classeurs de désintégration.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie la méthode de reclassement à utiliser.</p><p>Doit être défini sur <code translate="no">"decay"</code> pour activer la fonctionnalité de classement par décroissance.</p></td>
     <td><p><code translate="no">"decay"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Spécifie le classeur mathématique de décroissance à appliquer. Détermine la forme de la courbe de décroissance de la pertinence.</p><p>Voir la section <a href="/docs/fr/decay-ranker-overview.md#Choose-the-right-decay-ranker">Choisir le bon classificateur de décroissance</a> pour obtenir des conseils sur la sélection de la fonction appropriée.</p></td>
     <td><p><code translate="no">"gauss"</code> <code translate="no">"exp"</code>, ou <code translate="no">"linear"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.origin</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Point de référence à partir duquel le score de décroissance est calculé. Les éléments situés à cette valeur reçoivent des scores de pertinence maximums.</p><p>Pour la désintégration basée sur le temps, l'unité de temps doit correspondre à vos données de collecte.</p></td>
     <td><ul><li><p>Pour les horodatages : l'heure actuelle (par exemple, <code translate="no">int(time.time())</code>).</p></li><li><p>Pour la géolocalisation : les coordonnées actuelles de l'utilisateur.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.scale</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Distance ou temps à partir duquel la pertinence chute jusqu'à la valeur <code translate="no">decay</code>. Contrôle la vitesse à laquelle la pertinence diminue.</p><p>Dans le cas d'un déclin basé sur le temps, l'unité de temps doit correspondre à vos données de collecte.</p><p>Des valeurs plus élevées entraînent une baisse plus progressive de la pertinence ; des valeurs plus faibles entraînent une baisse plus marquée.</p></td>
     <td><ul><li><p>Pour le temps : période en secondes (par exemple, <code translate="no">7 * 24 * 60 * 60</code> pendant 7 jours).</p></li><li><p>Pour la distance : mètres (par exemple, <code translate="no">5000</code> pour 5 km).</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.offset</code></p></td>
     <td><p>Non</p></td>
     <td><p>Crée une "zone de non-décroissance" autour de <code translate="no">origin</code> où les éléments conservent leur score complet (score de décroissance = 1,0).</p><p>Pour la désintégration basée sur le temps, l'unité de temps doit correspondre à vos données de collecte.</p><p>Les éléments situés dans cette zone du site <code translate="no">origin</code> conservent une pertinence maximale.</p></td>
     <td><ul><li><p>Pour le temps : période en secondes (par exemple, <code translate="no">24 * 60 * 60</code> pour 1 jour).</p></li><li><p>Pour la distance : mètres (par exemple, <code translate="no">500</code> pour 500m)</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.decay</code></p></td>
     <td><p>Non</p></td>
     <td><p>Valeur du score à la distance <code translate="no">scale</code>, contrôle l'inclinaison de la courbe. Des valeurs plus faibles créent des courbes de déclin plus raides ; des valeurs plus élevées créent des courbes de déclin plus progressives.</p><p>Doit être compris entre 0 et 1.</p></td>
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
    </button></h3><p>Après avoir défini votre classificateur de décroissance, vous pouvez l'appliquer lors des opérations de recherche en le passant au paramètre <code translate="no">ranker</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the decay function in standard vector search</span>
results = milvus_client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],  <span class="hljs-comment"># Include the decay field in outputs to see values</span>
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Apply the decay ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [your_query_vector], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Appliquer à la recherche hybride<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Les classificateurs de décroissance peuvent également être appliqués aux opérations de recherche hybride qui combinent plusieurs champs de vecteurs :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[your_query_vector_1], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[your_query_vector_2], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply decay ranker to hybrid search</span>
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=decay_ranker,                      <span class="hljs-comment"># Same decay ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding)))
        .limit(<span class="hljs-number">20</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .vectors(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;search query&quot;</span>)))
        .limit(<span class="hljs-number">20</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">10</span>)
                .outputFields(Arrays.asList(<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> denseRequest = {
  <span class="hljs-attr">data</span>: [your_query_vector_1], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">20</span>,
};

<span class="hljs-keyword">const</span> sparseRequest = {
  <span class="hljs-attr">data</span>: [your_query_vector_2], <span class="hljs-comment">// Replace with your query vector</span>
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
  <span class="hljs-attr">param</span>: {},
  <span class="hljs-attr">limit</span>: <span class="hljs-number">20</span>,
};

<span class="hljs-keyword">const</span> hybridResults = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">hybrid_search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [denseRequest, sparseRequest],
  <span class="hljs-attr">ranker</span>: decayRanker,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>, <span class="hljs-string">&quot;timestamp&quot;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans la recherche hybride, Milvus trouve d'abord le score de similarité maximal à partir de tous les champs vectoriels, puis applique le facteur de décroissance à ce score.</p>
