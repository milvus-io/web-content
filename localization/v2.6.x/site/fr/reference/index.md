---
id: index.md
related_key: index
summary: Mécanisme d'indexation à Milvus.
title: Index en mémoire
---
<h1 id="In-memory-Index" class="common-anchor-header">Index en mémoire<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><div class="alert warning">
<p>Cette page est obsolète. Pour le contenu le plus récent, veuillez vous référer à <a href="/docs/fr/index-explained.md">Index Explained</a>.</p>
</div>
<p>Cette rubrique répertorie les différents types d'index en mémoire pris en charge par Milvus, les scénarios les mieux adaptés à chacun d'entre eux et les paramètres que les utilisateurs peuvent configurer pour obtenir de meilleures performances de recherche. Pour les index sur disque, voir <strong><a href="/docs/fr/disk_index.md">Index sur disque</a></strong>.</p>
<p>L'indexation est le processus d'organisation efficace des données et joue un rôle majeur dans l'utilité de la recherche par similarité en accélérant considérablement les requêtes fastidieuses sur de grands ensembles de données.</p>
<p>Pour améliorer les performances des requêtes, vous pouvez <a href="/docs/fr/index-vector-fields.md">spécifier un type d'index</a> pour chaque champ vectoriel.</p>
<div class="alert note">
Actuellement, un champ vectoriel ne prend en charge qu'un seul type d'index. Milvus supprime automatiquement l'ancien index lors du changement de type d'index.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">Index vectoriels ANNS<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>La plupart des types d'index vectoriels pris en charge par Milvus utilisent des algorithmes de recherche approximative des plus proches voisins (ANNS). Par rapport à la recherche précise, qui prend généralement beaucoup de temps, l'idée centrale de l'ANNS n'est plus de renvoyer le résultat le plus précis, mais de rechercher uniquement les voisins de la cible. L'ANNS améliore l'efficacité de la recherche en sacrifiant la précision dans une fourchette acceptable.</p>
<p>Selon les méthodes de mise en œuvre, l'index vectoriel ANNS peut être classé en quatre catégories : basé sur les arbres, basé sur les graphes, basé sur le hachage et basé sur la quantification.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Index pris en charge par Milvus<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge différents types d'index, classés en fonction du type d'intégration vectorielle qu'ils traitent : <strong>intégrations à virgule flottante</strong> (également appelées vecteurs à virgule flottante ou vecteurs denses), <strong>intégrations binaires</strong> (également appelées vecteurs binaires) et <strong>intégrations clairsemées</strong> (également appelées vecteurs clairsemés).</p>
<div class="filter">
 <a href="#floating">Encastrements en virgule flottante</a> <a href="#binary">Encastrements binaires</a> <a href="#sparse">Encastrements épars</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">Indices pour les intégrations en virgule flottante<button data-href="#Indexes-for-floating-point-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les encastrements en virgule flottante à 128 dimensions (vecteurs), l'espace de stockage qu'ils occupent est de 128 * la taille de la virgule flottante = 512 octets. Les <a href="/docs/fr/metric.md">mesures de distance</a> utilisées pour les enregistrements en virgule flottante sont la distance euclidienne (<code translate="no">L2</code>) et le produit intérieur (<code translate="no">IP</code>).</p>
<p>Ces types d'index comprennent <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, et <code translate="no">SCANN</code> pour les recherches ANN basées sur l'unité centrale.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">Index pour les encastrements binaires<button data-href="#Indexes-for-binary-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les encastrements binaires à 128 dimensions, l'espace de stockage qu'ils occupent est de 128 / 8 = 16 octets. Les mesures de distance utilisées pour les encastrements binaires sont <code translate="no">JACCARD</code> et <code translate="no">HAMMING</code>.</p>
<p>Ce type d'index comprend <code translate="no">BIN_FLAT</code> et <code translate="no">BIN_IVF_FLAT</code>.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">Index pour les encastrements épars<button data-href="#Indexes-for-sparse-embeddings" class="anchor-icon" translate="no">
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
    </button></h3><p>Les index pour les encastrements épars ne prennent en charge que les métriques <code translate="no">IP</code> et <code translate="no">BM25</code> (pour la recherche en texte intégral).</p>
<p>Type d'index pris en charge pour les encastrements épars : <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>À partir de la version 2.5.4 de Milvus, <code translate="no">SPARSE_WAND</code> est obsolète. Il est recommandé d'utiliser <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> par souci d'équivalence tout en maintenant la compatibilité. Pour plus d'informations, reportez-vous à <a href="/docs/fr/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a>.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>Index pris en charge</th>
    <th>Classification</th>
    <th>Scénario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>PLAT</td>
    <td>SANS OBJET</td>
    <td>
      <ul>
        <li>Ensemble de données relativement restreint</li>
        <li>Nécessite un taux de rappel de 100%.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>SANS OBJET</td>
    <td>
      <ul>
        <li>Requête à grande vitesse</li>
        <li>Requiert un taux de rappel aussi élevé que possible</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à très grande vitesse</li>
        <li>Ressources mémoire limitées</li>
        <li>Accepte un compromis mineur sur le taux de rappel</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à grande vitesse</li>
        <li>Ressources mémoire limitées</li>
        <li>Accepte un compromis mineur sur le taux de rappel</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Index basé sur les graphes</td>
    <td>
      <ul>
        <li>Requête à très haut débit</li>
        <li>Exige un taux de rappel aussi élevé que possible</li>
        <li>Grandes ressources de mémoire</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à très haut débit</li>
        <li>Ressources mémoire limitées</li>
        <li>Accepte un compromis mineur sur le taux de rappel</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à vitesse moyenne</li>
        <li>Ressources mémoire très limitées</li>
        <li>Accepte un compromis mineur sur le taux de rappel</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à vitesse moyenne</li>
        <li>Ressources mémoire très limitées</li>
        <li>Accepte un compromis mineur sur le taux de rappel</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Index basé sur la quantification</td>
    <td>
      <ul>
        <li>Requête à très grande vitesse</li>
        <li>Exige un taux de rappel aussi élevé que possible</li>
        <li>Grandes ressources de mémoire</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>Index pris en charge</th>
    <th>Classification</th>
    <th>Scénario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Index basé sur la quantification</td>
    <td><ul>
      <li>Dépend d'ensembles de données relativement petits.</li>
      <li>Exige une précision parfaite.</li>
      <li>Aucune compression n'est appliquée.</li>
      <li>Garantit des résultats de recherche exacts.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Index basé sur la quantification</td>
    <td><ul>
      <li>Requête à grande vitesse</li>
      <li>Exige un taux de rappel aussi élevé que possible</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>Index pris en charge</th>
    <th>Classification</th>
    <th>Scénario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>INDEX_INVERSÉ_PAUVRE</td>
    <td>Index inversé</td>
    <td><ul>
      <li>Dépend d'ensembles de données relativement petits.</li>
      <li>Nécessite un taux de rappel de 100 %.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT<button data-href="#FLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les applications de recherche de similarités vectorielles qui exigent une précision parfaite et dépendent d'ensembles de données relativement petits (à l'échelle du million), l'index FLAT est un bon choix. FLAT ne compresse pas les vecteurs et est le seul index qui peut garantir des résultats de recherche exacts. Les résultats de FLAT peuvent également servir de point de comparaison pour les résultats produits par d'autres index dont le taux de rappel est inférieur à 100 %.</p>
<p>FLAT est précis parce qu'il adopte une approche exhaustive de la recherche, ce qui signifie que pour chaque requête, l'entrée cible est comparée à tous les vecteurs d'un ensemble de données. Cela fait de FLAT l'index le plus lent de notre liste, et il est mal adapté à l'interrogation de données vectorielles massives. Aucun paramètre n'est requis pour l'index FLAT dans Milvus, et son utilisation ne nécessite pas de construction d'index supplémentaire.</p>
<ul>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Distance</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Facultatif] La métrique de distance choisie.</td><td>Voir <a href="/docs/fr/metric.md">Métriques prises en charge</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF_FLAT divise les données vectorielles en <code translate="no">nlist</code> unités de grappes, puis compare les distances entre le vecteur d'entrée cible et le centre de chaque grappe. En fonction du nombre de grappes que le système est configuré pour interroger (<code translate="no">nprobe</code>), les résultats de la recherche de similarité sont renvoyés sur la base des comparaisons entre l'entrée cible et les vecteurs dans la ou les grappes les plus similaires uniquement - ce qui réduit considérablement le temps d'interrogation.</p>
<p>En ajustant <code translate="no">nprobe</code>, un équilibre idéal entre la précision et la vitesse peut être trouvé pour un scénario donné. Les résultats du <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">test de performance IVF_FLAT</a> montrent que le temps d'interrogation augmente fortement à mesure que le nombre de vecteurs d'entrée cibles (<code translate="no">nq</code>) et le nombre de grappes à rechercher (<code translate="no">nprobe</code>) augmentent.</p>
<p>IVF_FLAT est l'index IVF le plus basique, et les données encodées stockées dans chaque unité sont cohérentes avec les données originales.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'indice</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Recherche par plage</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la plage</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Nombre maximal de godets ne donnant aucun résultat de recherche.<br/>Il s'agit d'un paramètre de recherche par plage et il met fin au processus de recherche lorsque le nombre de godets vides consécutifs atteint la valeur spécifiée.<br/>L'augmentation de cette valeur peut améliorer le taux de rappel au prix d'un allongement du temps de recherche.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF_FLAT n'effectue aucune compression, de sorte que les fichiers d'index qu'il produit sont à peu près de la même taille que les données vectorielles brutes non indexées d'origine. Par exemple, si l'ensemble de données SIFT 1B d'origine pèse 476 Go, les fichiers d'index IVF_FLAT seront légèrement plus petits (~470 Go). Le chargement de tous les fichiers d'index en mémoire consommera 470 Go d'espace de stockage.</p>
<p>Lorsque les ressources disque, CPU ou mémoire GPU sont limitées, IVF_SQ8 est une meilleure option qu'IVF_FLAT. Ce type d'index peut convertir chaque FLOAT (4 octets) en UINT8 (1 octet) en effectuant une quantification scalaire (SQ). Cela permet de réduire la consommation de mémoire du disque, du CPU et du GPU de 70 à 75 %. Pour l'ensemble de données 1B SIFT, les fichiers d'index IVF_SQ8 ne nécessitent que 140 Go de stockage.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'indice</th><th>Fourchette</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Recherche par plage</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la plage</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Nombre maximal de godets ne donnant aucun résultat de recherche.<br/>Il s'agit d'un paramètre de recherche par plage et il met fin au processus de recherche lorsque le nombre de godets vides consécutifs atteint la valeur spécifiée.<br/>L'augmentation de cette valeur peut améliorer le taux de rappel au prix d'un allongement du temps de recherche.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">PQ</code> (Product Quantization) décompose uniformément l'espace vectoriel haute dimension original en produits cartésiens d'espaces vectoriels basse dimension <code translate="no">m</code>, puis quantifie les espaces vectoriels basse dimension décomposés. Au lieu de calculer les distances entre le vecteur cible et le centre de toutes les unités, la quantification par produit permet de calculer les distances entre le vecteur cible et le centre de regroupement de chaque espace à faible dimension, ce qui réduit considérablement la complexité temporelle et spatiale de l'algorithme.</p>
<p>IVF_PQ effectue le regroupement de l'index IVF avant de quantifier le produit des vecteurs. Son fichier d'index est encore plus petit que IVF_SQ8, mais il entraîne également une perte de précision lors de la recherche de vecteurs.</p>
<div class="alert note">
<p>Les paramètres de construction de l'index et les paramètres de recherche varient en fonction de la distribution Milvus. Sélectionnez d'abord votre distribution Milvus.</p>
</div>
<ul>
<li><p>Paramètres de construction d'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Fourchette</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>Nombre de facteurs de quantification du produit</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Facultatif] Nombre de bits dans lesquels chaque vecteur de faible dimension est stocké.</td><td>[1, 24] (8 par défaut)</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Recherche par plage</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la plage</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Nombre maximal de godets ne donnant aucun résultat de recherche.<br/>Il s'agit d'un paramètre de recherche par plage et il met fin au processus de recherche lorsque le nombre de godets vides consécutifs atteint la valeur spécifiée.<br/>L'augmentation de cette valeur peut améliorer le taux de rappel au prix d'un allongement du temps de recherche.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h3><p>ScaNN (Scalable Nearest Neighbors) est similaire à IVF_PQ en termes de regroupement de vecteurs et de quantification de produits. Ce qui les différencie, ce sont les détails de la mise en œuvre de la quantification du produit et l'utilisation de SIMD (Single-Instruction / Multi-data) pour un calcul efficace.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'indice</th><th>Fourchette</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>Inclure ou non les données brutes dans l'index</td><td><code translate="no">True</code> ou <code translate="no">False</code>. La valeur par défaut est <code translate="no">True</code>.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Contrairement à IVF_PQ, les valeurs par défaut s'appliquent à <code translate="no">m</code> et <code translate="no">nbits</code> pour optimiser les performances.</p>
  </div>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>Nombre d'unités candidates à interroger</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>Plage de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Nombre maximal de godets ne donnant aucun résultat de recherche.<br/>Il s'agit d'un paramètre de recherche par plage et il met fin au processus de recherche lorsque le nombre de godets vides consécutifs atteint la valeur spécifiée.<br/>L'augmentation de cette valeur peut améliorer le taux de rappel au prix d'un allongement du temps de recherche.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW (Hierarchical Navigable Small World Graph) est un algorithme d'indexation basé sur les graphes. Il construit une structure de navigation multicouche pour une image selon certaines règles. Dans cette structure, les couches supérieures sont plus clairsemées et les distances entre les nœuds sont plus grandes ; les couches inférieures sont plus denses et les distances entre les nœuds sont plus étroites. La recherche commence par la couche la plus haute, trouve le nœud le plus proche de la cible dans cette couche, puis passe à la couche suivante pour commencer une nouvelle recherche. Après plusieurs itérations, elle peut rapidement s'approcher de la position de la cible.</p>
<p>Afin d'améliorer les performances, HNSW limite le degré maximal des nœuds de chaque couche du graphe à <code translate="no">M</code>. En outre, vous pouvez utiliser <code translate="no">efConstruction</code> (lors de la construction de l'index) ou <code translate="no">ef</code> (lors de la recherche des cibles) pour spécifier une plage de recherche.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'index</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M définit le nombre maximal de connexions sortantes dans le graphique. Un M plus élevé entraîne une plus grande précision/temps d'exécution à ef/efConstruction fixe.</td><td>[2, 2048]</td><td>Aucune</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction contrôle le compromis entre la vitesse de recherche et la vitesse de construction de l'index. L'augmentation du paramètre efConstruction peut améliorer la qualité de l'index, mais elle tend également à allonger le temps d'indexation.</td><td>[1, int_max]</td><td>Aucun</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Paramètre contrôlant le compromis temps de recherche/précision. Une valeur plus élevée ( <code translate="no">ef</code> ) permet une recherche plus précise mais plus lente.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Aucune</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h3><p>La quantification scalaire (SQ) est une technique utilisée pour diviser des données en virgule flottante en un ensemble fini de valeurs basées sur leur magnitude. Par exemple, <strong>SQ6</strong> représente la quantification en (2^6 = 64) valeurs discrètes, où chaque nombre à virgule flottante est codé sur 6 bits. De même, <strong>SQ8</strong> quantifie les données en (2^8 = 256) valeurs discrètes, chaque nombre à virgule flottante étant représenté par 8 bits. Cette quantification réduit l'empreinte mémoire tout en préservant la structure essentielle des données pour un traitement efficace.</p>
<p>Combiné à SQ, HNSW_SQ offre un compromis contrôlable entre la taille de l'index et la précision, tout en maintenant des performances élevées en termes de nombre de requêtes par seconde (QPS). Par rapport à la méthode HNSW standard, il en résulte une augmentation modeste du temps de construction de l'index.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'index</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M définit le nombre maximal de connexions sortantes dans le graphique. Un M plus élevé entraîne une plus grande précision/temps d'exécution à ef/efConstruction fixe.</td><td>[2, 2048]</td><td>Aucune</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction contrôle le compromis entre la vitesse de recherche et la vitesse de construction de l'index. L'augmentation du paramètre efConstruction peut améliorer la qualité de l'index, mais elle tend également à allonger le temps d'indexation.</td><td>[1, int_max]</td><td>Aucun</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>Type de quantificateur scalaire.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>Si les données affinées sont réservées pendant la construction de l'index.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Le type de données de l'index affiné.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Aucun</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Paramètre contrôlant le compromis temps de recherche/précision. Une valeur plus élevée ( <code translate="no">ef</code> ) permet une recherche plus précise mais plus lente.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Aucune</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Le facteur d'agrandissement de refine par rapport à <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h3><p>L'idée de base de PQ est de diviser le vecteur en <code translate="no">m</code> sous-vecteurs, dont chacun trouvera <em>2^{nbits}</em> centroïdes sur la base de kmeans, et chaque sous-vecteur sélectionnera le centroïde le plus proche comme son sous-vecteur approximatif. Nous enregistrons ensuite tous les centriodes, de sorte que chaque sous-vecteur peut être codé sous la forme <code translate="no">nbits</code>, et un vecteur flottant de longueur <code translate="no">dim</code> peut être codé sous la forme de <em>m ⋅ nbits</em> bits.</p>
<p>Combiné avec PQ, HNSW_PQ offre un compromis contrôlable entre la taille de l'index et la précision, mais il a une valeur QPS plus faible et un taux de rappel plus élevé que HNSW_SQ pour le même taux de compression. Par rapport à HNSW_SQ, la construction de l'index prend plus de temps.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M définit le nombre maximal de connexions sortantes dans le graphique. Un M plus élevé entraîne une plus grande précision/temps d'exécution à ef/efConstruction fixe.</td><td>[2, 2048]</td><td>Aucune</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction contrôle le compromis entre la vitesse de recherche et la vitesse de construction de l'index. L'augmentation du paramètre efConstruction peut améliorer la qualité de l'index, mais elle tend également à allonger le temps d'indexation.</td><td>[1, int_max]</td><td>Aucun</td></tr>
<tr><td><code translate="no">m</code></td><td>Le nombre de groupes de sous-vecteurs à diviser le vecteur.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Le nombre de bits dans lesquels chaque groupe de sous-vecteurs est quantifié.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>Si les données affinées sont réservées lors de la construction de l'index.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Le type de données de l'index affiné.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Aucun</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Paramètre contrôlant le compromis temps de recherche/précision. Une valeur plus élevée ( <code translate="no">ef</code> ) permet une recherche plus précise mais plus lente.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Aucun</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Le facteur d'agrandissement de refine par rapport à <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ est similaire à PQ et divise également le vecteur en groupes <code translate="no">m</code>. Chaque sous-vecteur sera codé comme <code translate="no">nbits</code>. Après avoir effectué une quantification pq, il calcule le résidu entre le vecteur et le vecteur quantifié pq, et applique une quantification pq au vecteur résiduel. Un total de <code translate="no">nrq</code> quantifications pq complètes sera effectué, de sorte qu'un vecteur flottant de longueur <code translate="no">dim</code> sera codé comme <em>m ⋅ nbits ⋅ nrq</em> bits.</p>
<p>Combiné à un quantificateur résiduel de produit (PRQ), le HNSW_PRQ offre un compromis contrôlable encore plus élevé entre la taille de l'index et la précision. Il a une valeur QPS presque équivalente et un taux de rappel plus élevé que HNSW_PQ pour le même taux de compression. Par rapport à HNSW_PQ, le temps de construction de l'index peut être multiplié par plusieurs fois.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M définit le nombre maximal de connexions sortantes dans le graphique. Un M plus élevé entraîne une plus grande précision/temps d'exécution à ef/efConstruction fixe.</td><td>[2, 2048]</td><td>Aucune</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction contrôle le compromis entre la vitesse de recherche et la vitesse de construction de l'index. L'augmentation du paramètre efConstruction peut améliorer la qualité de l'index, mais elle tend également à allonger le temps d'indexation.</td><td>[1, int_max]</td><td>Aucun</td></tr>
<tr><td><code translate="no">m</code></td><td>Le nombre de groupes de sous-vecteurs à diviser le vecteur.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>Le nombre de bits dans lesquels chaque groupe de sous-vecteurs est quantifié.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>Le nombre de sous-quantificateurs résiduels.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>Si les données raffinées sont réservées lors de la construction de l'index.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>Le type de données de l'index affiné.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>Aucun</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>Paramètre contrôlant le compromis temps de recherche/précision. Une valeur plus élevée ( <code translate="no">ef</code> ) permet une recherche plus précise mais plus lente.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>Aucune</td></tr>
<tr><td><code translate="no">refine_k</code></td><td>Le facteur d'agrandissement de refine par rapport à <em>k</em>.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT<button data-href="#BINFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Cet indice est exactement le même que FLAT, sauf qu'il ne peut être utilisé que pour les encastrements binaires.</p>
<p>Pour les applications de recherche de similarité vectorielle qui exigent une précision parfaite et dépendent d'ensembles de données relativement petits (à l'échelle du million), l'indice BIN_FLAT est un bon choix. BIN_FLAT ne compresse pas les vecteurs et est le seul index qui peut garantir des résultats de recherche exacts. Les résultats de BIN_FLAT peuvent également être utilisés comme point de comparaison pour les résultats produits par d'autres index dont le taux de rappel est inférieur à 100 %.</p>
<p>BIN_FLAT est précis parce qu'il adopte une approche exhaustive de la recherche, ce qui signifie que pour chaque requête, l'entrée cible est comparée aux vecteurs d'un ensemble de données. Cela fait de BIN_FLAT l'index le plus lent de notre liste, et il est mal adapté à l'interrogation de données vectorielles massives. Il n'y a pas de paramètres pour l'index BIN_FLAT dans Milvus, et son utilisation ne nécessite pas d'apprentissage des données ni de stockage supplémentaire.</p>
<ul>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Distance</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[Facultatif] La métrique de distance choisie.</td><td>Voir <a href="/docs/fr/metric.md">Métriques prises en charge</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT<button data-href="#BINIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h3><p>Cet index est exactement le même que IVF_FLAT, sauf qu'il ne peut être utilisé que pour les encastrements binaires.</p>
<p>BIN_IVF_FLAT divise les données vectorielles en <code translate="no">nlist</code> unités de grappes, puis compare les distances entre le vecteur d'entrée cible et le centre de chaque grappe. En fonction du nombre de grappes que le système est configuré pour interroger (<code translate="no">nprobe</code>), les résultats de la recherche de similarité sont renvoyés sur la base des comparaisons entre l'entrée cible et les vecteurs dans la ou les grappes les plus similaires uniquement - ce qui réduit considérablement le temps d'interrogation.</p>
<p>En ajustant <code translate="no">nprobe</code>, un équilibre idéal entre la précision et la vitesse peut être trouvé pour un scénario donné. Le temps d'interrogation augmente fortement à mesure que le nombre de vecteurs d'entrée cibles (<code translate="no">nq</code>) et le nombre de grappes à rechercher (<code translate="no">nprobe</code>) augmentent.</p>
<p>BIN_IVF_FLAT est l'index BIN_IVF le plus basique, et les données encodées stockées dans chaque unité sont cohérentes avec les données originales.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'indice</th><th>Plage de valeurs</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>Recherche par plage</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la plage</th><th>Plage</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>Nombre maximal de godets ne donnant aucun résultat de recherche.<br/>Il s'agit d'un paramètre de recherche par plage et il met fin au processus de recherche lorsque le nombre de godets vides consécutifs atteint la valeur spécifiée.<br/>L'augmentation de cette valeur peut améliorer le taux de rappel au prix d'un allongement du temps de recherche.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">INDEX_INVERSÉ_SPARSE<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Chaque dimension conserve une liste de vecteurs dont la valeur n'est pas nulle à cette dimension. Pendant la recherche, Milvus parcourt chaque dimension du vecteur de la requête et calcule les scores des vecteurs qui ont des valeurs non nulles dans ces dimensions.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Portée</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>L'algorithme utilisé pour construire et interroger l'index. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/sparse_vector.md#Set-index-params-for-vector-field">Vecteur épars</a>.</td><td><code translate="no">DAAT_MAXSCORE</code> (par défaut), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>Contrôle la saturation de la fréquence des termes. Des valeurs élevées augmentent l'importance de la fréquence des termes dans le classement des documents.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>Contrôle le degré de normalisation de la longueur des documents. La valeur par défaut est 0,75.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Le paramètre <code translate="no">drop_ratio_build</code> est obsolète depuis Milvus v2.5.4. Il peut toujours être accepté pendant la construction de l'index, mais n'aura plus d'effet réel sur l'index.</p>
  </div>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>La proportion de petites valeurs vectorielles qui sont exclues pendant le processus de recherche. Cette option permet d'affiner le processus de recherche en spécifiant le ratio des plus petites valeurs du vecteur de la requête à ignorer. Elle permet d'équilibrer la précision de la recherche et les performances. Plus la valeur définie pour <code translate="no">drop_ratio_search</code> est petite, moins ces petites valeurs contribuent au résultat final. En ignorant certaines petites valeurs, les performances de la recherche peuvent être améliorées avec un impact minimal sur la précision.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">Quelle est la différence entre l'indice FLAT et l'indice IVF_FLAT ?</font></summary></p>
<p>L'index IVF_FLAT divise un espace vectoriel en <code translate="no">nlist</code> clusters. Si la valeur par défaut de <code translate="no">nlist</code> est 16384, Milvus compare les distances entre le vecteur cible et les centres des 16384 clusters pour obtenir <code translate="no">nprobe</code> clusters les plus proches. Milvus compare ensuite les distances entre le vecteur cible et les vecteurs des clusters sélectionnés pour obtenir les vecteurs les plus proches. Contrairement à IVF_FLAT, FLAT compare directement les distances entre le vecteur cible et chaque vecteur.</p>
<p>
Par conséquent, lorsque le nombre total de vecteurs est approximativement égal à <code translate="no">nlist</code>, IVF_FLAT et FLAT présentent peu de différences en termes de calcul et de performances de recherche. Mais lorsque le nombre de vecteurs devient deux fois, trois fois ou n fois supérieur à <code translate="no">nlist</code>, l'index IVF_FLAT commence à présenter des avantages de plus en plus importants.</p>
<p>
Voir <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Comment choisir un index dans Milvus</a> pour plus d'informations.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>En savoir plus sur les <a href="/docs/fr/metric.md">métriques de similarité</a> prises en charge dans Milvus.</li>
</ul>
