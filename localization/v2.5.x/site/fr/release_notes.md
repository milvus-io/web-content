---
id: release_notes.md
summary: Notes de mise à jour de Milvus
title: Notes de mise à jour
---
<h1 id="Release-Notes" class="common-anchor-header">Notes de mise à jour<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Vous trouverez dans cette section les notes de version pour chaque version publiée après la v2.5.0. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des mises à jour.</p>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 23 janvier 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.5.4, qui introduit des optimisations de performances clés et de nouvelles fonctionnalités telles que l'isolation PartitionKey, Sparse Index avec DAAT MaxScore, et des mécanismes de verrouillage améliorés. L'un des points forts de cette version est la prise en charge de 10 000 collections et d'un million de partitions, ce qui constitue une étape importante pour les cas d'utilisation multi-locataires. Cette version corrige également de nombreux bogues qui améliorent la stabilité et la fiabilité générales, deux des bogues critiques pouvant entraîner une perte de données. Nous vous encourageons à mettre à niveau ou à essayer cette dernière version, et nous attendons avec impatience vos commentaires qui nous aideront à améliorer Milvus en permanence !</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Prise en charge de l'isolation des clés de partition pour améliorer les performances avec plusieurs clés de partition<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/use-partition-key.md">Utiliser une clé de partition</a>.</li>
<li>Sparse Index prend désormais en charge DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/sparse_vector.md">Vecteur épars</a>.</li>
<li>Ajout de la prise en charge de <code translate="no">is_null</code> dans les expressions<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Les privilèges de la racine peuvent être personnalisés<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Prise en charge de 10K collections et 1 million de partitions dans un cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Mise en cache des informations delta des segments pour accélérer le coordinateur de requêtes<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Lecture simultanée des métadonnées au niveau de la collection pour accélérer la reprise sur panne<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Affinement de la granularité des verrous dans QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Style unifié en utilisant CStatus pour gérer les appels CGO NewCollection<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Suppression de la génération du limiteur de partition si aucune partition n'est définie<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Ajout d'un meilleur support de l'API RESTful<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Suppression des filtres de Bloom inutiles dans QueryNode et DataNode pour réduire l'utilisation de la mémoire<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Accélération du chargement des données en accélérant la génération, la planification et l'exécution des tâches dans QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Réduction du verrouillage dans DataCoord pour accélérer les opérations de chargement et d'insertion<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Ajout de noms de champs primaires dans <code translate="no">SearchResult</code> et <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Utilisation de la taille du binlog et de la taille de l'index comme norme de limitation du quota disque<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Optimisation de l'utilisation de la mémoire pour la recherche plein texte knowhere/#1011</li>
<li>Ajout du contrôle de version pour les index scalaires<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Amélioration de la vitesse de récupération des informations de collection de RootCoord en évitant les copies inutiles<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Corrections de bogues critiques</h3><ul>
<li>Correction des échecs de recherche pour les clés primaires avec index<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Correction d'un problème potentiel de perte de données causé par le redémarrage de MixCoord et la vidange simultanée<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Correction d'un échec de suppression déclenché par une concurrence inappropriée entre les tâches de statistiques et le compactage L0 après le redémarrage de MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Correction de l'incompatibilité de l'index scalaire inversé lors de la mise à niveau de 2.4 à 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction des problèmes de lenteur des requêtes causés par la granularité grossière des verrous lors du chargement de plusieurs colonnes<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Correction d'un problème où l'utilisation d'alias pouvait amener un itérateur à parcourir la mauvaise base de données<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Correction d'un échec de la mise à jour d'un groupe de ressources lors de la modification de la base de données<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Correction d'un problème sporadique où l'index tantivy ne pouvait pas supprimer les fichiers d'index pendant la publication<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Correction d'une indexation lente causée par un trop grand nombre de threads<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Correction d'un problème empêchant les vérifications de quota de disque d'être ignorées lors de l'importation en masse<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>Résolution des problèmes de gel causés par un trop grand nombre de consommateurs de file d'attente de messages en limitant la concurrence<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Correction des dépassements de temps de requête causés par les redémarrages de MixCoord pendant les compactions à grande échelle<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Correction des problèmes de déséquilibre des canaux causés par les temps d'arrêt des noeuds<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Correction d'un problème qui pouvait bloquer l'équilibre des canaux.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Correction d'un problème où les vérifications des niveaux de privilèges des groupes personnalisés RBAC devenaient inefficaces<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Correction d'un problème de récupération du nombre de lignes dans les index vides<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Correction d'une estimation incorrecte de la mémoire pour les petits segments<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 13 janvier 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 apporte des corrections de bogues critiques et des améliorations de performances afin d'améliorer la stabilité, la fiabilité et la convivialité globales. Cette version affine la gestion de la concurrence, renforce l'indexation et la récupération des données et met à jour plusieurs composants clés pour une expérience utilisateur plus robuste.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues</h3><ul>
<li>Correction d'un problème où l'utilisation d'un filtre <code translate="no">IN</code> sur une clé primaire <code translate="no">VARCHAR</code> pouvait renvoyer des résultats vides.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Correction d'un problème de concurrence entre les opérations de requête et de suppression qui pouvait conduire à des résultats incorrects.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Correction d'un échec causé par le filtrage itératif lorsqu'un <code translate="no">expr</code> était vide dans une requête.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Correction d'un problème où une erreur de disque pendant les mises à jour de la configuration conduisait à l'utilisation des paramètres de configuration par défaut.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Correction d'une perte potentielle de données supprimées due à la compaction du clustering.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Correction d'une requête de correspondance de texte cassée dans les segments de données croissants.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Correction des échecs de récupération causés par l'index ne contenant pas les données originales pour les vecteurs épars.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Correction d'une possible condition de course de champ de colonne causée par des requêtes et des chargements de données simultanés.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Correction des échecs d'insertion en masse lorsque les champs nullables ou default_value n'étaient pas inclus dans les données.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Ajout d'une API de groupe de ressources pour l'interface RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Optimisation des performances de récupération en exploitant les méthodes SIMD de bitset.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Utilisation de l'horodatage MVCC comme horodatage de garantie lorsque cela est spécifié.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Ajout des métriques de suppression manquantes.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Mise à jour d'Etcd vers la version v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Création d'un nouveau paquet Go pour gérer les protos<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>).</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 3 janvier 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 prend en charge la modification de la longueur maximale des colonnes VARCHAR et résout plusieurs problèmes critiques liés à la concurrence, aux chutes de partition et à la gestion des stats BM25 pendant l'importation. Nous recommandons vivement la mise à niveau vers cette version pour améliorer la stabilité et les performances.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Génération des journaux d'utilisation du disque uniquement lorsque le chemin spécifié n'existe pas.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Ajout d'un paramètre pour régler la longueur maximale des VARCHAR et rétablissement de la limite à 65 535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Prise en charge de la conversion du type de paramètre pour les expressions.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction des blocages potentiels dans les scénarios de concurrence.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Génération du fichier index_null_offset uniquement pour les champs qui supportent les valeurs nulles.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Correction de l'utilisation du plan de récupération après free dans la phase de réduction.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Reconnaissance des expressions avec AND et OR en majuscules.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Autorise les abandons de partition réussis même si le chargement a échoué.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Correction des problèmes d'enregistrement du fichier de stats BM25 lors de l'importation.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 26 décembre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 se concentre sur une série de corrections de bogues concernant le chargement de la mémoire, les listes RBAC, l'équilibrage des nœuds de requête et l'indexation des segments scellés, tout en améliorant l'interface Web et les intercepteurs. Nous recommandons vivement la mise à jour vers la version 2.5.1 pour une stabilité et une fiabilité accrues.</p>
<h3 id="Improvement" class="common-anchor-header">Amélioration</h3><ul>
<li>Mise à jour des pages de collecte et de requête de l'interface web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bugs</h3><ul>
<li>Correction des problèmes OOM en ajoutant un facteur de mémoire aux estimations de chargement.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Correction de l'expansion des groupes de privilèges lors de l'énumération des politiques dans RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Correction des problèmes liés à l'énumération des groupes de privilèges et des collections.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Correction de l'équilibreur pour éviter la surcharge répétée du même noeud de requête.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Correction des tâches d'équilibrage inattendues déclenchées après le redémarrage de QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Correction des mises à jour de la configuration de chargement qui ne s'appliquent pas au chargement des collections.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Correction du comptage des lectures nulles lors de l'importation de données.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Correction du décodage Unicode pour les clés JSON dans les expressions.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Correction du nom de la base de données de l'intercepteur pour alterCollectionField dans la version 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Correction des paramètres d'index vides pour les segments scellés lors de l'utilisation de la recherche brute BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 23 décembre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 apporte des avancées significatives pour améliorer la convivialité, l'évolutivité et les performances pour les utilisateurs traitant de la recherche vectorielle et de la gestion de données à grande échelle. Avec cette version, Milvus intègre de nouvelles fonctionnalités puissantes telles que la recherche basée sur les termes, le compactage des grappes pour des requêtes optimisées et la prise en charge polyvalente des méthodes de recherche vectorielle dense et éparse. Les améliorations apportées à la gestion des clusters, à l'indexation et au traitement des données introduisent de nouveaux niveaux de flexibilité et de facilité d'utilisation, faisant de Milvus une base de données vectorielles encore plus robuste et conviviale.</p>
<h3 id="Key-Features" class="common-anchor-header">Caractéristiques principales</h3><h4 id="Full-Text-Search" class="common-anchor-header">Recherche en texte intégral</h4><p>Milvus 2.5 prend en charge la recherche plein texte mise en œuvre avec Sparse-BM25 ! Cette fonctionnalité est un complément important aux solides capacités de recherche sémantique de Milvus, en particulier dans les scénarios impliquant des mots rares ou des termes techniques. Dans les versions précédentes, Milvus prenait en charge les vecteurs épars pour faciliter les scénarios de recherche par mot-clé. Ces vecteurs épars étaient générés en dehors de Milvus par des modèles neuronaux tels que SPLADEv2/BGE-M3 ou des modèles statistiques tels que l'algorithme BM25.</p>
<p>Grâce à <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 dispose d'analyseurs intégrés et d'une extraction de vecteurs épars, étendant l'API de la réception de vecteurs en tant qu'entrée à l'acceptation directe de texte. Les informations statistiques de l'algorithme BM25 sont mises à jour en temps réel au fur et à mesure de l'insertion des données, ce qui améliore la convivialité et la précision. En outre, les vecteurs épars basés sur les algorithmes de voisinage le plus proche (ANN) offrent des performances plus puissantes que les systèmes de recherche par mots clés standard.</p>
<p>Pour plus d'informations, reportez-vous aux sections <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble de l'analyseur</a> et <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Interface Web de gestion des clusters (Beta)</h4><p>Pour mieux prendre en charge les données massives et les fonctionnalités riches, la conception sophistiquée de Milvus inclut diverses dépendances, de nombreux rôles de nœuds, des structures de données complexes, etc. Ces aspects peuvent poser des problèmes d'utilisation et de maintenance.</p>
<p>Milvus 2.5 introduit une interface Web intégrée de gestion des clusters, qui réduit les difficultés de maintenance du système en visualisant les informations complexes de l'environnement d'exécution de Milvus. Il s'agit notamment des détails des bases de données et des collections, des segments, des canaux, des dépendances, de l'état de santé des nœuds, des informations sur les tâches, des requêtes lentes, etc.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Correspondance de texte</h4><p>Milvus 2.5 exploite les analyseurs et l'indexation de <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> pour le prétraitement du texte et la création d'index, prenant en charge la correspondance précise en langage naturel des données textuelles basées sur des termes spécifiques. Cette fonction est principalement utilisée pour la recherche filtrée afin de satisfaire des conditions spécifiques et peut incorporer le filtrage scalaire pour affiner les résultats de la requête, permettant des recherches de similarité dans les vecteurs qui répondent aux critères scalaires.</p>
<p>Pour plus de détails, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble de l'analyseur</a> et à la section <a href="/docs/fr/keyword-match.md">Correspondance de texte</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Index Bitmap</h4><p>Un nouvel index de données scalaires a été ajouté à la famille Milvus. L'index BitMap utilise un tableau de bits, d'une longueur égale au nombre de lignes, pour représenter l'existence de valeurs et accélérer les recherches.</p>
<p>Les index Bitmap sont traditionnellement efficaces pour les champs à faible cardinalité, qui présentent un nombre modeste de valeurs distinctes - par exemple, une colonne contenant des informations sur le sexe avec seulement deux valeurs possibles : homme et femme.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/bitmap.md">Index bitmap</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Valeur nulle et valeur par défaut</h4><p>Milvus prend désormais en charge la définition de propriétés nullables et de valeurs par défaut pour les champs scalaires autres que le champ de clé primaire. Pour les champs scalaires marqués comme <code translate="no">nullable=True</code>, les utilisateurs peuvent omettre le champ lors de l'insertion de données ; le système le traitera comme une valeur nulle ou une valeur par défaut (si elle est définie) sans générer d'erreur.</p>
<p>Les valeurs par défaut et les propriétés nullables offrent une plus grande flexibilité à Milvus. Les utilisateurs peuvent utiliser cette fonctionnalité pour les champs dont les valeurs sont incertaines lors de la création de collections. Elles simplifient également la migration des données d'autres systèmes de base de données vers Milvus, en permettant de traiter des ensembles de données contenant des valeurs nulles tout en préservant les paramètres de valeur par défaut d'origine.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/nullable-and-default.md">Valeur nulle et valeur par défaut</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">SQ/PQ/PRQ de HNSW basé sur Faiss</h4><p>Grâce à une collaboration étroite avec la communauté Faiss, l'algorithme HNSW dans Faiss a connu des améliorations significatives à la fois en termes de fonctionnalité et de performance. Pour des raisons de stabilité et de maintenabilité, Milvus 2.5 a officiellement migré sa prise en charge de HNSW de hnswlib vers Faiss.</p>
<p>Basé sur Faiss, Milvus 2.5 prend en charge plusieurs méthodes de quantification sur HNSW pour répondre aux besoins de différents scénarios : SQ (Scalar Quantizers), PQ (Product Quantizer) et PRQ (Product Residual Quantizer). SQ et PQ sont les plus courants ; SQ offre de bonnes performances en matière d'interrogation et de vitesse de construction, tandis que PQ offre un meilleur rappel pour un même taux de compression. De nombreuses bases de données vectorielles utilisent couramment la quantification binaire, qui est une forme simple de quantification SQ.</p>
<p>PRQ est une fusion de PQ et d'AQ (Additive Quantizer). Par rapport au PQ, il nécessite des temps de construction plus longs pour offrir un meilleur rappel, en particulier à des taux de compression élevés, selon la compression binaire.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compaction par regroupement (Beta)</h4><p>Milvus 2.5 introduit le compactage par regroupement pour accélérer les recherches et réduire les coûts dans les grandes collections. En spécifiant un champ scalaire comme clé de compactage, les données sont redistribuées par plage afin d'optimiser le stockage et la récupération. Agissant comme un index global, cette fonctionnalité permet à Milvus d'élaguer efficacement les données lors des requêtes basées sur les métadonnées de clustering, améliorant ainsi les performances de recherche lorsque des filtres scalaires sont appliqués.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/clustering-compaction.md">Compaction de clustering</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Autres fonctionnalités</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nœud de streaming (Beta)</h4><p>Milvus 2.5 introduit un nouveau composant appelé nœud de streaming, qui fournit des services de journalisation en avance sur l'écriture (WAL). Cela permet à Milvus d'atteindre un consensus avant et après les canaux de lecture et d'écriture, ce qui débloque de nouvelles caractéristiques, fonctionnalités et optimisations. Cette fonctionnalité est désactivée par défaut dans Milvus 2.5 et sera officiellement disponible dans la version 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Prise en charge d'IPv6</h4><p>Milvus prend désormais en charge IPv6, ce qui permet d'étendre la connectivité et la compatibilité du réseau.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importation en masse CSV</h4><p>Outre les formats JSON et Parquet, Milvus prend désormais en charge l'importation directe en masse de données au format CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Modèles d'expression pour l'accélération des requêtes</h4><p>Milvus prend désormais en charge les modèles d'expression, ce qui améliore l'efficacité de l'analyse des expressions, en particulier dans les scénarios avec des expressions complexes.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/filtering-templating.md">Modèles de filtres</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Améliorations de GroupBy</h4><ul>
<li><strong>Taille de groupe personnalisable</strong>: Ajout de la prise en charge de la spécification du nombre d'entrées renvoyées pour chaque groupe.</li>
<li><strong>Recherche hybride par groupe</strong>: Prise en charge de la recherche hybride GroupBy basée sur plusieurs colonnes de vecteurs.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Améliorations de l'itérateur</h4><ul>
<li><strong>Support MVCC</strong>: Les utilisateurs peuvent désormais utiliser des itérateurs sans être affectés par les modifications ultérieures des données telles que les insertions et les suppressions, grâce au contrôle de concordance multi-version (MVCC).</li>
<li><strong>Curseur persistant</strong>: Milvus prend désormais en charge un curseur persistant pour QueryIterator, ce qui permet aux utilisateurs de reprendre l'itération à partir de la dernière position après un redémarrage de Milvus sans avoir à redémarrer l'ensemble du processus d'itération.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimisation de la suppression</h4><p>Amélioration de la vitesse et réduction de l'utilisation de la mémoire pour les suppressions à grande échelle en optimisant l'utilisation des verrous et la gestion de la mémoire.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Mise à jour des dépendances</h4><p>Mise à jour vers ETCD 3.5.16 et Pulsar 3.0.7 LTS, corrigeant les CVE existantes et améliorant la sécurité. Note : La mise à jour vers Pulsar 3.x n'est pas compatible avec les versions précédentes 2.x.</p>
<p>Pour les utilisateurs qui disposent déjà d'un déploiement Milvus fonctionnel, vous devez mettre à niveau les composants ETCD et Pulsar avant de pouvoir utiliser les nouvelles caractéristiques et fonctions. Pour plus de détails, voir <a href="/docs/fr/upgrade-pulsar-v3.md">Mise à niveau de Pulsar de 2.x à 3.x.</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Stockage local V2</h4><p>Introduction d'un nouveau format de fichier local dans Milvus 2.5, améliorant l'efficacité du chargement et des requêtes pour les données scalaires, réduisant la surcharge de mémoire et jetant les bases des optimisations futures.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Optimisation de l'analyse des expressions</h4><p>Amélioration de l'analyse des expressions par la mise en place d'un cache pour les expressions répétées, la mise à niveau d'ANTLR et l'optimisation des performances des clauses <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Amélioration des performances en matière de simultanéité des DDL</h4><p>Optimisation des performances de simultanéité des opérations DDL (Data Definition Language).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Alignement des fonctionnalités de l'API RESTful</h4><p>Alignement des fonctionnalités de l'API RESTful avec d'autres SDK pour plus de cohérence.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Mises à jour de la sécurité et de la configuration</h4><p>Prise en charge de TLS pour sécuriser les communications entre nœuds dans les environnements plus complexes ou d'entreprise. Pour plus de détails, voir <a href="/docs/fr/tls.md">Configuration de la sécurité</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Amélioration des performances de compactage</h4><p>Suppression des limites maximales de segments dans le compactage mixte et priorité aux segments plus petits, ce qui améliore l'efficacité et accélère les requêtes sur les ensembles de données volumineux ou fragmentés.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Équilibrage des canaux basé sur le score</h4><p>Introduction d'une politique qui équilibre dynamiquement les charges entre les canaux, ce qui améliore l'utilisation des ressources et la stabilité globale dans les déploiements à grande échelle.</p>
