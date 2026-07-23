---
id: choose-an-embeddinglist-search-strategy.md
title: Choisissez une stratégie de recherche EmbeddingList
summary: >-
  Les stratégies de recherche EmbeddingList déterminent la manière dont Milvus
  construit un index approximatif de candidats pour la recherche EmbeddingList.
  La stratégie par défaut est « tokenann ». Vous pouvez passer à « muvera » ou «
  lemur » lorsque la liste d’embeddings est volumineuse, que « TokenANN » est
  trop coûteux en ressources, ou qu’une représentation apprise/compressée au
  niveau des lignes est plus adaptée. Le résultat final est toujours généré par
  le reclassement MaxSim lorsque l'option `emb_list_rerank` est activée.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Choisissez une stratégie de recherche EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>Les stratégies de recherche EmbeddingList déterminent la manière dont Milvus construit un index approximatif de candidats pour la recherche EmbeddingList. La stratégie par défaut est « <code translate="no">tokenann</code> ». Vous pouvez passer à « <code translate="no">muvera</code> » ou « <code translate="no">lemur</code> » lorsque la liste d’embeddings est volumineuse, que TokenANN est trop coûteux ou qu’une représentation apprise/compressée au niveau des lignes est plus adaptée. Le résultat final est toujours produit par le reclassement MaxSim lorsque l’option « <code translate="no">emb_list_rerank</code> » est activée.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Pourquoi existe-t-il des stratégies de recherche ?<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>La liste d’embeddings (EmbeddingList) est conçue pour les lignes contenant plusieurs vecteurs, tels que les embeddings de tokens dans un document texte, les embeddings de patches dans un document visuel ou les embeddings de clips dans une vidéo. Au lieu de comparer un vecteur de requête à un vecteur de ligne, MaxSim compare une liste d’embeddings de requête à une liste d’embeddings de document et agrège les meilleures correspondances.</p>
<p>Cela offre une meilleure capacité de représentation, mais l’application exacte de MaxSim est coûteuse à grande échelle. Une recherche MaxSim par force brute nécessiterait de comparer les vecteurs de requête à chaque vecteur de chaque ligne candidate. Cela s’avère généralement trop lent pour une recherche en production.</p>
<table>
<thead>
<tr><th>### Problème - Chaque ligne peut contenir de nombreux vecteurs. - L’application exacte de MaxSim sur toutes les lignes est coûteuse. - La taille de l’index et la latence de recherche peuvent augmenter rapidement.</th><th>### Stratégie - Utiliser une méthode de récupération approximative en première étape. - Récupérer plus de candidats que le topK demandé. - Reclasser les candidats à l’aide d’un MaxSim exact.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>En ce sens, la recherche « <code translate="no">emb_list_strategy</code> » est principalement une stratégie de construction d’index et de récupération de candidats. Elle est configurée lors de la construction de l’index et détermine comment l’ensemble de candidats ANN de première étape est généré. Des paramètres de recherche tels que ` <code translate="no">retrieval_ann_ratio</code> ` et ` <code translate="no">emb_list_rerank</code> ` contrôlent ensuite le nombre de candidats récupérés et l’application ou non du reclassement par MaxSim.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Stratégies disponibles<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Stratégie</th><th>Unité de recherche de candidats</th><th>Problématique résolue</th><th>Meilleur ajustement</th><th>Principal compromis</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Vecteurs individuels au sein de chaque ligne</td><td>Conserve les vecteurs d'origine et évite les pertes liées à la compression.</td><td>Recherche axée sur la qualité, listes d’embeddings courtes ou moyennes, embeddings à haut pouvoir de discrimination.</td><td>Index plus volumineux et coût de recherche des candidats plus élevé.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Un vecteur encodé par ligne</td><td>Compresse une liste d’embeddings en une représentation FDE de dimension fixe sans apprentissage.</td><td>Documents plus longs, vecteurs d’encodage à haut pouvoir de discrimination, cas où TokenANN est trop gourmand en ressources.</td><td>La projection aléatoire introduit une perte d’approximation ; la dimension FDE affecte la latence.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Un vecteur appris par ligne</td><td>Apprend une compression spécifique au corpus à partir de listes d’embeddings vers des vecteurs de ligne de dimension fixe.</td><td>Embeddings à faible pouvoir de discrimination, recherche multimodale ou de documents visuels, listes d’embeddings volumineuses.</td><td>Nécessite un apprentissage et peut être sensible à la distribution du corpus et au biais lié à la longueur des documents.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> indexe chaque vecteur de la liste d’embeddings. Lors de la recherche, chaque vecteur de requête effectue une recherche ANN ; les vecteurs correspondants sont regroupés dans leurs lignes respectives, et les lignes candidates résultantes sont reclassées à l’aide de MaxSim.</p>
<div class="alert note">
<p><strong>Utilisez TokenANN lorsque la qualité est la priorité absolue.</strong> Il s’agit de l’approximation la plus proche du calcul MaxSim d’origine, car il conserve tous les vecteurs disponibles dans l’index de première étape.</p>
</div>
<ul>
<li><p><strong>Convient particulièrement :</strong> aux fragments de texte courts, aux lignes comportant un nombre faible ou modéré de vecteurs, à une forte séparation sémantique au niveau des tokens, aux bases de référence sensibles à la qualité.</p></li>
<li><p><strong>Moins adapté :</strong> documents très longs, pages visuelles comportant des milliers de vecteurs de patch, contraintes strictes en matière de mémoire ou de latence.</p></li>
<li><p><strong>Comportement au niveau des éléments :</strong> TokenANN peut extraire des candidats à partir de vecteurs individuels avant de les regrouper en lignes. Le résultat final de la recherche dans l’EmbeddingList reste au niveau des lignes après le calcul du score MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> encode chaque liste d’embeddings en un vecteur de dimension fixe à l’aide de projections aléatoires. Cela transforme la recherche de première étape en une recherche vectorielle standard au niveau des lignes. Les candidats sont ensuite reclassés avec MaxSim.</p>
<div class="alert note">
<p><strong>Utilisez MUVERA lorsque TokenANN est trop gourmand en ressources mais que vous ne souhaitez pas passer par une étape d’entraînement.</strong> Il s’agit d’un compromis pratique entre qualité et coût.</p>
</div>
<ul>
<li><p><strong>Convient particulièrement :</strong> aux documents textuels longs, aux espaces d’embedding à haute discrimination, aux charges de travail nécessitant une taille d’index inférieure à celle de TokenANN.</p></li>
<li><p><strong>Moins adapté :</strong> aux espaces d’embedding à faible pouvoir de discrimination ou aux cas où la représentation FDE devient trop multidimensionnelle pour le budget de latence.</p></li>
<li><p><strong>Paramètres importants :</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code> et <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> entraîne un modèle pour compresser chaque liste d’embeddings en une représentation de dimension fixe. La recherche ANN de première étape s’effectue sur les vecteurs appris au niveau des lignes, et les candidats sont reclassés à l’aide de MaxSim.</p>
<div class="alert note">
<p><strong>Utilisez LEMUR lorsque la compression apprise justifie le coût de l’entraînement.</strong> Il peut donner de bons résultats pour les espaces d’embeddings à faible discrimination et la recherche multimodale, mais il doit être validé par rapport au corpus cible car il peut être sensible à la distribution de la longueur des documents.</p>
</div>
<ul>
<li><p><strong>Convient particulièrement :</strong> recherche de documents visuels, représentations de patches multimodaux, espaces d’embedding à faible discrimination, grandes listes d’embedding pour lesquelles TokenANN n’est pas pratique.</p></li>
<li><p><strong>Moins adapté :</strong> corpus changeant fréquemment, embeddings à forte discrimination avec des longueurs de documents très asymétriques, charges de travail pour lesquelles le coût d’entraînement est inacceptable.</p></li>
<li><p><strong>Paramètres importants :</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code> et <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Comportement et configuration par défaut<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>La stratégie EmbeddingList par défaut dans Knowhere est <code translate="no">tokenann</code>. Si vous ne spécifiez pas <code translate="no">emb_list_strategy</code>, Knowhere utilise TokenANN. Les valeurs par défaut au moment de la recherche incluent <code translate="no">retrieval_ann_ratio=3.0</code> et <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Éléments de configuration par stratégie<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie les éléments de configuration spécifiques à chaque stratégie. Dans Milvus, les éléments de configuration à la compilation sont généralement transmis dans le map <code translate="no">params</code> lors de la création d’un index. Si vous avez besoin de valeurs par défaut côté serveur, celles-ci doivent être définies dans le fichier de configuration de Milvus, sous la section <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>Stratégie</th><th>Élément de configuration</th><th>Étape</th><th>Valeur par défaut</th><th>Quand le modifier</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Création de l'index</td><td><code translate="no">tokenann</code></td><td>À utiliser explicitement lorsque vous souhaitez le comportement d'indexation par vecteur d'éléments par défaut ou lorsque DiskANN est utilisé.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Création d'index</td><td><code translate="no">tokenann</code></td><td>À utiliser lorsque vous souhaitez une récupération codée au niveau des lignes sans apprentissage.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Création d’index</td><td><code translate="no">4</code></td><td>Contrôle le nombre de projections SimHash. Des valeurs plus élevées créent davantage de compartiments et peuvent améliorer la qualité du codage, mais augmentent la dimensionnalité codée.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Création d’index</td><td><code translate="no">7</code></td><td>Contrôle le nombre de codages FDE indépendants qui sont concaténés. Des valeurs plus élevées peuvent améliorer la robustesse, mais augmentent le coût de l'indexation et de la recherche.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Création d'index</td><td><code translate="no">42</code></td><td>À définir pour obtenir des projections aléatoires reproductibles, notamment lors de tests et de comparaisons de performances.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Création d’index</td><td><code translate="no">tokenann</code></td><td>À utiliser lorsque la compression au niveau des lignes apprise est censée fonctionner mieux que la projection aléatoire fixe.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Création d’index</td><td><code translate="no">256</code></td><td>Contrôle la taille de la représentation compressée. Augmentez cette valeur pour plus de capacité ; diminuez-la pour réduire l'utilisation de mémoire et accélérer la récupération.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Création d’index</td><td><code translate="no">20000</code></td><td>Augmentez ce paramètre lorsque le corpus est varié et que la compression apprise est sous-adaptée ; ne le réduisez que pour les petits tests ou pour accélérer la création des index.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Création d’index</td><td><code translate="no">50</code></td><td>Augmentez si l'entraînement n'a pas convergé ; réduisez lorsque le temps de création est la principale contrainte.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Création d'index</td><td><code translate="no">512</code></td><td>Ajustez en fonction du débit d’entraînement et de l’utilisation de la mémoire.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Création d'index</td><td><code translate="no">0.001</code></td><td>Ajuster lorsque l'entraînement est instable ou converge trop lentement.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Création d'index</td><td><code translate="no">42</code></td><td>À définir pour obtenir des cycles d'entraînement reproductibles.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Création d'index</td><td><code translate="no">2</code></td><td>N'augmentez cette valeur que lorsque le corpus nécessite un extracteur de caractéristiques plus expressif et que vous pouvez vous permettre un coût d'entraînement supplémentaire.</td></tr>
<tr><td>Toutes les stratégies</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Recherche</td><td><code translate="no">3.0</code></td><td>Augmentez ce paramètre pour récupérer davantage de candidats de première étape et améliorer le rappel ; diminuez-le pour réduire la latence.</td></tr>
<tr><td>Toutes les stratégies</td><td><code translate="no">emb_list_rerank</code></td><td>Recherche</td><td><code translate="no">true</code></td><td>Laissez cette option activée pour le reclassement MaxSim. Désactivez-la uniquement pour les expériences contrôlées où la qualité du réseau neuronal artificiel (ANN) de première étape est mesurée directement.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Configurer la stratégie dans Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, la stratégie est transmise en tant que paramètre d’index lors de la création d’un index sur un champ EmbeddingList, tel qu’un sous-champ vectoriel StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Pour LEMUR, fournissez les paramètres d'entraînement de LEMUR dans la même carte d'<code translate="no">params</code>.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Configurer les valeurs par défaut côté serveur dans Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus peut également renseigner les paramètres d’index à partir de ` <code translate="no">milvus.yaml</code>`. La section concernée est ` <code translate="no">knowhere</code>`. Les paramètres sont organisés par type d’index et par étape, selon le modèle ` <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>`. Les paramètres d’index fournis par l’utilisateur ont priorité sur ces valeurs par défaut.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Privilégiez les paramètres par index pour la sélection de la stratégie.</strong> Une valeur par défaut du fichier de configuration de Milvus s’applique de manière générale aux index de ce type et de cette étape. Utilisez les paramètres de <code translate="no">create_index</code> lorsque différentes collections ou différents champs nécessitent des stratégies EmbeddingList différentes.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Configurer la récupération des candidats au moment de la recherche<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>La stratégie détermine la manière dont l’index est construit. Au moment de la recherche, utilisez <code translate="no">retrieval_ann_ratio</code> pour contrôler le nombre de candidats de première étape récupérés avant le reclassement MaxSim. Des valeurs plus élevées améliorent généralement le rappel, mais augmentent la latence.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Paramètre</th><th>Étape</th><th>Valeur par défaut</th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Construction de l'index</td><td><code translate="no">tokenann</code></td><td>Détermine la manière dont les candidats de la liste EmbeddingList sont indexés et récupérés.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Recherche</td><td><code translate="no">3.0</code></td><td>Facteur d’expansion des candidats pour le premier tour de l’ANN.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Recherche</td><td><code translate="no">true</code></td><td>Détermine s’il faut reclasser les candidats récupérés à l’aide de MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Remarques de compatibilité :</strong> MUVERA et LEMUR prennent actuellement en charge les données fp32 dans Knowhere. DiskANN ne prend en charge EmbeddingList qu’avec la stratégie TokenANN. Si vous utilisez des types de vecteurs autres que fp32 ou DiskANN, vérifiez la prise en charge de la stratégie avant de modifier la valeur par défaut.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Comment choisir une stratégie<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Il n’existe pas de stratégie universellement optimale. Faites votre choix en fonction de la longueur de la liste d’embedding, de la capacité de discrimination de l’espace d’embedding, du budget de latence, de la taille de l’index et de la possibilité ou non d’effectuer une étape d’entraînement.</p>
<table>
<thead>
<tr><th>Question</th><th>Signal</th><th>Point de départ recommandé</th></tr>
</thead>
<tbody>
<tr><td>Avez-vous besoin d’une base de référence de haute qualité ?</td><td>Vous souhaitez évaluer la meilleure approximation pratique avant d’optimiser le coût.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Le nombre de vecteurs par ligne est-il faible ou modéré ?</td><td>Chaque ligne contient un petit nombre de vecteurs de tokens, de patches ou de clips.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokANN est-il trop volumineux ou trop lent ?</td><td>La taille de l'index ou la latence de récupération au premier niveau constitue le goulot d'étranglement.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Souhaitez-vous une compression sans apprentissage ?</td><td>Vous avez besoin d’un modèle opérationnel plus simple et d’un encodage reproductible.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>L'espace d'embedding présente-t-il une faible capacité de discrimination ?</td><td>Les candidats ANN au niveau des tokens sont bruités, et la projection aléatoire ne préserve pas suffisamment le signal.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>La charge de travail est-elle visuelle ou multimodale ?</td><td>Les lignes contiennent de nombreux vecteurs de patchs, et TokenANN est trop coûteux.</td><td><code translate="no">lemur</code> ou <code translate="no">muvera</code></td></tr>
<tr><td>La longueur des documents est-elle très asymétrique ?</td><td>Certaines lignes contiennent bien plus de vecteurs que d’autres.</td><td>Commencez par <code translate="no">muvera</code>; validez soigneusement <code translate="no">lemur</code>.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Workflow d'évaluation suggéré<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Commencez par utiliser <code translate="no">tokenann</code> comme référence de qualité lorsque la taille de l'ensemble de données le permet.</p></li>
<li><p>Exécutez les mêmes requêtes avec <code translate="no">muvera</code> et comparez le rappel, le nDCG, la latence et la taille de l'index.</p></li>
<li><p>Essayez <code translate="no">lemur</code> lorsque la liste d’embeddings est volumineuse, que l’espace d’embedding est bruité ou que la charge de travail est visuelle ou multimodale.</p></li>
<li><p>Ajustez la valeur de « <code translate="no">retrieval_ann_ratio</code> » avant de modifier trop de paramètres de compilation. Augmentez-la si le rappel est faible ; réduisez-la si la latence est trop élevée.</p></li>
<li><p>Effectuez toujours des validations sur des requêtes représentatives et des distributions de longueur de documents représentatives. Une stratégie qui fonctionne sur des textes courts peut ne pas fonctionner sur des documents visuels ou des corpus à longue traîne.</p></li>
</ol>
<table>
<thead>
<tr><th>### Priorité à la qualité : commencez par « <code translate="no">tokenann</code> ». Utilisez-le comme référence pour évaluer la qualité de l’approximation MaxSim.</th><th>### Équilibré Essayez <code translate="no">muvera</code> lorsque vous avez besoin d’un coût moindre sans ajouter de pipeline d’entraînement.</th><th>### Compression : essayez <code translate="no">lemur</code> lorsque la compression apprise au niveau des lignes est susceptible de surpasser la projection aléatoire fixe.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Références utilisées pour ce projet<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>Tests Milvus pour <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> et <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Gestion des fichiers de configuration Milvus pour les valeurs par défaut des index côté serveur dans la section « <code translate="no">knowhere</code> ».</p></li>
<li><p>Définitions des paramètres Knowhere pour les valeurs par défaut et les noms de stratégies prises en charge.</p></li>
<li><p>Vérifications de compatibilité Knowhere pour MUVERA/LEMUR (fp32 uniquement) et la prise en charge de DiskANN (TokenANN uniquement).</p></li>
<li><p>Notes d’évaluation internes comparant TokenANN, MUVERA et LEMUR pour la recherche de candidats MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Remarque concernant la publication :</strong> avant toute publication externe, vérifiez quels paramètres sont officiellement pris en charge dans la version cible de Milvus et si le produit souhaite exposer l’ensemble des paramètres Knowhere de bas niveau ou seulement un sous-ensemble documenté plus restreint.</p>
</div>
