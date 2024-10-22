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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Vous trouverez dans cette section les notes de version pour chaque version publiée après la v2.4.0. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des mises à jour.</p>
<h2 id="v2413-hotfix" class="common-anchor-header">v2.4.13-correction de bogues<button data-href="#v2413-hotfix" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 17 octobre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.13-hotfix</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus v2.4.13-hotfix corrige un problème critique spécifique à la v2.4.13, où Milvus peut échouer à récupérer les informations de collecte après un redémarrage si tous les instantanés MetaKV ont été ramassés<a href="https://github.com/milvus-io/milvus/pull/36933">(#36933</a>). <strong>Il est conseillé aux utilisateurs qui utilisent actuellement la version 2.4.13 de mettre à niveau vers la version 2.4.13-hotfix dès que possible afin d'éviter des perturbations potentielles</strong>.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Corrections critiques</h3><ul>
<li>Chargement de la clé originale si l'horodatage est MaxTimestamp<a href="https://github.com/milvus-io/milvus/pull/36935">(#36935</a>)</li>
</ul>
<h2 id="Deprecated-v2413" class="common-anchor-header">[Obsolète] v2.4.13<button data-href="#Deprecated-v2413" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 12 octobre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.13</td><td>2.4.8</td><td>2.4.5</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.13 introduit la charge de réplique dynamique, permettant aux utilisateurs d'ajuster le nombre de répliques de collection sans avoir à libérer et recharger la collection. Cette version corrige également plusieurs bogues critiques liés à l'importation en vrac, à l'analyse des expressions, à l'équilibrage de la charge et à la reprise sur panne. En outre, des améliorations significatives ont été apportées à l'utilisation des ressources MMAP et aux performances d'importation, améliorant ainsi l'efficacité globale du système. Nous recommandons vivement de passer à cette version pour améliorer les performances et la stabilité.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Ajustement dynamique des répliques pour les collections chargées<a href="https://github.com/milvus-io/milvus/pull/36417">(#36417</a>)</li>
<li>MMAP de vecteurs épars dans les types de segments croissants<a href="https://github.com/milvus-io/milvus/pull/36565">(#36565</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bugs</h3><ul>
<li>Correction d'un problème de performance du flush<a href="https://github.com/milvus-io/milvus/pull/36741">(#36741</a>)</li>
<li>Correction d'un bogue avec les expressions JSON dans &quot;[]&quot;<a href="https://github.com/milvus-io/milvus/pull/36722">(#36722</a>)</li>
<li>Suppression des voisins si la cible compacte n'est pas indexée<a href="https://github.com/milvus-io/milvus/pull/36694">(#36694</a>)</li>
<li>Amélioration des performances pour Rocksmq lorsque le canal est plein<a href="https://github.com/milvus-io/milvus/pull/36618">(#36618</a>)</li>
<li>Correction d'un problème où les erreurs pendant le désépinglage n'étaient pas reportées<a href="https://github.com/milvus-io/milvus/pull/36665">(#36665</a>)</li>
<li>Résolution d'une fuite de mémoire pour les segments importés dans le gestionnaire de segments<a href="https://github.com/milvus-io/milvus/pull/36631">(#36631</a>)</li>
<li>Suppression des contrôles de santé inutiles pour les noeuds de requête dans le proxy<a href="https://github.com/milvus-io/milvus/pull/36553">(#36553</a>)</li>
<li>Correction d'un problème de débordement avec les expressions de termes<a href="https://github.com/milvus-io/milvus/pull/36534">(#36534</a>)</li>
<li>Enregistrement de l'ID du noeud avant d'assigner des tâches pour éviter une mauvaise allocation des tâches<a href="https://github.com/milvus-io/milvus/pull/36493">(#36493</a>)</li>
<li>Résolution des problèmes de course de données dans le compactage de clustering<a href="https://github.com/milvus-io/milvus/pull/36499">(#36499</a>)</li>
<li>Ajout d'une vérification de la longueur maximale des tableaux de chaînes après la correspondance des types<a href="https://github.com/milvus-io/milvus/pull/36497">(#36497</a>)</li>
<li>Correction des conditions de course en mode mixte ou autonome<a href="https://github.com/milvus-io/milvus/pull/36459">(#36459</a>)</li>
<li>Correction du déséquilibre des segments après des opérations répétées de chargement et de déchargement<a href="https://github.com/milvus-io/milvus/pull/36543">(#36543</a>)</li>
<li>Correction d'un cas où les segments ne pouvaient pas être déplacés d'un noeud d'arrêt<a href="https://github.com/milvus-io/milvus/pull/36475">(#36475</a>)</li>
<li>Mise à jour correcte des informations sur les segments même si certains segments étaient manquants<a href="https://github.com/milvus-io/milvus/pull/36729">(#36729</a>)</li>
<li>Empêche les transactions etcd de dépasser la limite maximale dans le KV snapshot<a href="https://github.com/milvus-io/milvus/pull/36773">(#36773</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Amélioration de l'estimation des ressources MMAP :<ul>
<li>Amélioration du code relatif au MMAP dans column.h<a href="https://github.com/milvus-io/milvus/pull/36521">(#36521</a>)</li>
<li>Amélioration de l'estimation des ressources lors du chargement des collections<a href="https://github.com/milvus-io/milvus/pull/36728">(#36728</a>)</li>
</ul></li>
<li>Amélioration des performances :<ul>
<li>Amélioration de l'efficacité de l'analyse des expressions en convertissant l'Unicode en ASCII<a href="https://github.com/milvus-io/milvus/pull/36676">(#36676</a>)</li>
<li>Production parallèle de messages pour plusieurs sujets<a href="https://github.com/milvus-io/milvus/pull/36462">(#36462</a>)</li>
<li>Réduction de la surcharge du processeur lors du calcul de la taille du fichier d'index<a href="https://github.com/milvus-io/milvus/pull/36580">(#36580</a>)</li>
<li>Récupération du type de message à partir de l'en-tête pour minimiser l'unmarshalling<a href="https://github.com/milvus-io/milvus/pull/36454">(#36454</a>)</li>
<li>Optimisation de la politique de sélection des répliques en fonction de la charge de travail<a href="https://github.com/milvus-io/milvus/pull/36384">(#36384</a>)</li>
</ul></li>
<li>Fractionnement des messages de la tâche de suppression pour respecter les limites de taille maximale des messages<a href="https://github.com/milvus-io/milvus/pull/36574">(#36574</a>)</li>
<li>Ajout d'une nouvelle URL RESTful pour décrire les tâches d'importation<a href="https://github.com/milvus-io/milvus/pull/36754">(#36754</a>)</li>
<li>Optimisation de la planification des importations et ajout d'une mesure du coût du temps<a href="https://github.com/milvus-io/milvus/pull/36684">(#36684</a>)</li>
<li>Ajout d'un rapport d'équilibre pour l'équilibreur du coordinateur de requêtes<a href="https://github.com/milvus-io/milvus/pull/36749">(#36749</a>)</li>
<li>Utilisation de la configuration commune du GC<a href="https://github.com/milvus-io/milvus/pull/36670">(#36670</a>)</li>
<li>Ajout d'un commutateur de politique de streaming forward pour le délégateur<a href="https://github.com/milvus-io/milvus/pull/36712">(#36712</a>)</li>
<li>Activation du compactage manuel pour les collections sans index<a href="https://github.com/milvus-io/milvus/pull/36581">(#36581</a>)</li>
<li>Activation de l'équilibrage de charge sur les noeuds de requête avec différentes capacités de mémoire<a href="https://github.com/milvus-io/milvus/pull/36625">(#36625</a>)</li>
<li>Cas unifié pour les étiquettes entrantes en utilisant metrics.label<a href="https://github.com/milvus-io/milvus/pull/36616">(#36616</a>)</li>
<li>Rendre les opérations de canal de transfert/segment idempotentes<a href="https://github.com/milvus-io/milvus/pull/36552">(#36552</a>)</li>
<li>Ajout de métriques pour surveiller le débit d'importation et le nombre de lignes importées<a href="https://github.com/milvus-io/milvus/pull/36588">(#36588</a>)</li>
<li>Prévention de la création de plusieurs objets timer dans les cibles<a href="https://github.com/milvus-io/milvus/pull/36573">(#36573</a>)</li>
<li>Mise à jour de la version des expressions et de la réponse HTTP formatée pour les expressions<a href="https://github.com/milvus-io/milvus/pull/36467">(#36467</a>)</li>
<li>Amélioration du garbage collection dans le snapshot KV<a href="https://github.com/milvus-io/milvus/pull/36793">(#36793</a>)</li>
<li>Ajout de la prise en charge de l'exécution de méthodes avec des paramètres de contexte<a href="https://github.com/milvus-io/milvus/pull/36798">(#36798</a>)</li>
</ul>
<h2 id="v2412" class="common-anchor-header">v2.4.12<button data-href="#v2412" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 26 septembre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.12</td><td>2.4.7</td><td>2.4.4</td><td>2.4.9</td></tr>
</tbody>
</table>
<p>Milvus 2.4.12 apporte des améliorations significatives et des corrections de bogues critiques. Cette version résout les problèmes de duplication des données et améliore la vitesse de reprise sur panne, en particulier lors de la gestion d'un grand nombre de suppressions. Cependant, il subsiste un problème connu où la reprise sur panne peut être lente lors de la suppression de quantités massives de données. Nous travaillons activement à la résolution de ce problème.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Implémentation de l'arrêt en douceur pour le gestionnaire de graphe de flux<a href="https://github.com/milvus-io/milvus/pull/36358">(#36358</a>)</li>
<li>Désactivation des vérifications d'index pour les champs vectoriels non chargés<a href="https://github.com/milvus-io/milvus/pull/36280">(#36280</a>)</li>
<li>Filtrage des enregistrements de suppression non réussis pendant le chargement delta<a href="https://github.com/milvus-io/milvus/pull/36272">(#36272</a>)</li>
<li>Amélioration de la gestion des exceptions std::stoi<a href="https://github.com/milvus-io/milvus/pull/36296">(#36296</a>)</li>
<li>Désactivation des mots-clés comme noms de champs ou noms de champs dynamiques<a href="https://github.com/milvus-io/milvus/pull/36108">(#36108</a>)</li>
<li>Ajout de métriques pour les entrées de suppression dans les segments L0<a href="https://github.com/milvus-io/milvus/pull/36227">(#36227</a>)</li>
<li>Implémentation de la politique de transfert L0 pour supporter le chargement à distance<a href="https://github.com/milvus-io/milvus/pull/36208">(#36208</a>)</li>
<li>Ajout d'une vérification du chargement du champ ANN dans le proxy<a href="https://github.com/milvus-io/milvus/pull/36194">(#36194</a>)</li>
<li>Activation de la prise en charge des lignes vides<a href="https://github.com/milvus-io/milvus/pull/36061">(#36061</a>)</li>
<li>Correction d'une vulnérabilité de sécurité<a href="https://github.com/milvus-io/milvus/pull/36156">(#36156</a>)</li>
<li>Implémentation d'un gestionnaire de statistiques pour les mesures de taille des requêtes/réponses<a href="https://github.com/milvus-io/milvus/pull/36118">(#36118</a>)</li>
<li>Correction de l'estimation de la taille pour les données de tableau encodées<a href="https://github.com/milvus-io/milvus/pull/36379">(#36379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Résolution des erreurs de type de métrique pour les collections avec deux champs vectoriels<a href="https://github.com/milvus-io/milvus/pull/36473">(#36473</a>)</li>
<li>Correction des problèmes de mise en mémoire tampon longue causant des échecs de réception de la file d'attente des messages<a href="https://github.com/milvus-io/milvus/pull/36425">(#36425</a>)</li>
<li>Implémentation de la prise en charge du retour compact-to-segments après fractionnement<a href="https://github.com/milvus-io/milvus/pull/36429">(#36429</a>)</li>
<li>Résolution des problèmes de course aux données avec la goroutine de vérification de l'ID du noeud<a href="https://github.com/milvus-io/milvus/pull/36377">(#36377</a>)</li>
<li>Suppression de la vérification du type d'élément<a href="https://github.com/milvus-io/milvus/pull/36324">(#36324</a>)</li>
<li>Correction des problèmes d'accès concurrents pour les segments croissants et scellés<a href="https://github.com/milvus-io/milvus/pull/36288">(#36288</a>)</li>
<li>Implémentation d'un futur verrou à état<a href="https://github.com/milvus-io/milvus/pull/36333">(#36333</a>)</li>
<li>Correction de l'utilisation de l'offset dans HybridSearch<a href="https://github.com/milvus-io/milvus/pull/36287">(#36287</a>, <a href="https://github.com/milvus-io/milvus/pull/36253">#36253</a>)</li>
<li>Résolution des fuites de segments/canaux sales sur QueryNode<a href="https://github.com/milvus-io/milvus/pull/36259">(#36259</a>)</li>
<li>Correction de la gestion de la duplication de la clé primaire<a href="https://github.com/milvus-io/milvus/pull/36274">(#36274</a>)</li>
<li>Mise en place d'un type de métrique dans les requêtes de recherche<a href="https://github.com/milvus-io/milvus/pull/36279">(#36279</a>)</li>
<li>Correction du problème d'effacement de la métrique stored_index_files_size<a href="https://github.com/milvus-io/milvus/pull/36161">(#36161</a>)</li>
<li>Correction du comportement du groupe de privilèges de lecture-écriture pour l'accès global à l'API<a href="https://github.com/milvus-io/milvus/pull/36145">(#36145</a>)</li>
</ul>
<h2 id="v2411" class="common-anchor-header">v2.4.11<button data-href="#v2411" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 11 septembre 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.11</td><td>2.4.6</td><td>2.4.3</td><td>2.4.8</td></tr>
</tbody>
</table>
<p>Milvus 2.4.11 est une version de correction de bogues qui résout plusieurs problèmes critiques liés à l'index MARISA trie, au compactage et aux opérations de chargement. Cette version introduit de nouvelles fonctionnalités pour visualiser les expressions et améliorer la stabilité des suppressions. Nous recommandons à tous les utilisateurs de la série 2.4.x de passer à cette version pour bénéficier de ces améliorations et corrections.</p>
<h3 id="Features" class="common-anchor-header">Caractéristiques</h3><ul>
<li>Ajout d'une vue statique pour les expressions en 2.4<a href="https://github.com/milvus-io/milvus/pull/35954">(#35954</a>)</li>
<li>Implémentation de la logique de quota liée au tampon de suppression<a href="https://github.com/milvus-io/milvus/pull/35997">(#35997</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bugs</h3><ul>
<li>Résolution du problème d'opération de plage d'index Trie pour les comparaisons GreaterThan et GreaterThanEqual<a href="https://github.com/milvus-io/milvus/pull/36126">(#36126</a>)</li>
<li>Correction de l'utilisation de <code translate="no">marisa_label_order</code> dans la construction de l'index Trie<a href="https://github.com/milvus-io/milvus/pull/36060">(#36060</a>)</li>
<li>Amélioration de la vérification des valeurs pour <code translate="no">trie.predictive_search</code> <a href="https://github.com/milvus-io/milvus/pull/35999">(#35999</a>)</li>
<li>Activation du support des expressions arithmétiques binaires sur les index inversés<a href="https://github.com/milvus-io/milvus/pull/36097">(#36097</a>)</li>
<li>Correction d'une erreur de segment causée par Skipindex<a href="https://github.com/milvus-io/milvus/pull/35908">(#35908</a>)</li>
<li>Résolution d'une fuite de mémoire dans le méta-cache du proxy<a href="https://github.com/milvus-io/milvus/pull/36076">(#36076</a>)</li>
<li>Renommer le chemin du fichier mmap pour éviter les conflits de répertoire<a href="https://github.com/milvus-io/milvus/pull/35975">(#35975</a>)</li>
<li>Amélioration de la journalisation et du nettoyage pour les tâches échouées ou en retard dans le compactage du mélange<a href="https://github.com/milvus-io/milvus/pull/35967">(#35967</a>)</li>
<li>Correction d'un blocage logique lors d'une utilisation élevée de la mémoire par le délégateur<a href="https://github.com/milvus-io/milvus/pull/36066">(#36066</a>)</li>
<li>Implémentation de la création de segments vides lorsque le compactage supprime toutes les insertions<a href="https://github.com/milvus-io/milvus/pull/36045">(#36045</a>)</li>
<li>Correction de la population de la liste des champs de chargement à partir des informations de chargement de l'ancienne version dans la 2.4<a href="https://github.com/milvus-io/milvus/pull/36018">(#36018</a>)</li>
<li>Correction de la logique de mise à jour de la configuration de traçage dans la version 2.4<a href="https://github.com/milvus-io/milvus/pull/35998">(#35998</a>)</li>
<li>Résolution des échecs de recherche/requête lors de la libération de la partition dynamique<a href="https://github.com/milvus-io/milvus/pull/36019">(#36019</a>)</li>
<li>Prévention de l'annulation des paramètres de repli<a href="https://github.com/milvus-io/milvus/pull/36006">(#36006</a>)</li>
<li>Enregistrement correct des groupes de privilèges pour la validation<a href="https://github.com/milvus-io/milvus/pull/35938">(#35938</a>)</li>
<li>Prévention d'un nettoyage erroné des nœuds de limitation de la base de données<a href="https://github.com/milvus-io/milvus/pull/35992">(#35992</a>)</li>
<li>Résolution du problème avec les répliques ne participant pas aux requêtes après la récupération de l'échec<a href="https://github.com/milvus-io/milvus/pull/35925">(#35925</a>)</li>
<li>Résolution de la course aux données dans le compacteur de clustering<a href="https://github.com/milvus-io/milvus/pull/35958">(#35958</a>)</li>
<li>Correction de la référence de variable après l'opération de déplacement<a href="https://github.com/milvus-io/milvus/pull/35904">(#35904</a>)</li>
<li>Implémentation de la vérification du comportement de chargement du saut de clé de clustering<a href="https://github.com/milvus-io/milvus/pull/35899">(#35899</a>)</li>
<li>Garantie d'un démarrage unique des observateurs de querycoord en 2.4<a href="https://github.com/milvus-io/milvus/pull/35817">(#35817</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Mise à jour de Milvus et de la version proto vers 2.4.11<a href="https://github.com/milvus-io/milvus/pull/36069">(#36069</a>)</li>
<li>Correction de la fuite de mémoire dans les tests unitaires et activation de l'option use_asan pour les constructions unittest<a href="https://github.com/milvus-io/milvus/pull/35857">(#35857</a>)</li>
<li>Ajustement des limites de l0segmentsrowcount à des valeurs plus appropriées<a href="https://github.com/milvus-io/milvus/pull/36015">(#36015</a>)</li>
<li>Modification du facteur d'estimation de la mémoire de deltalog à un<a href="https://github.com/milvus-io/milvus/pull/36035">(#36035</a>)</li>
<li>Implémentation de slicesetequal pour les comparaisons de listes de champs de chargement<a href="https://github.com/milvus-io/milvus/pull/36062">(#36062</a>)</li>
<li>Réduction de la fréquence des journaux pour les opérations de suppression<a href="https://github.com/milvus-io/milvus/pull/35981">(#35981</a>)</li>
<li>Mise à jour de la version etcd vers 3.5.14<a href="https://github.com/milvus-io/milvus/pull/35977">(#35977</a>)</li>
<li>Optimisation de la réduction de mmap-rss après l'échauffement<a href="https://github.com/milvus-io/milvus/pull/35965">(#35965</a>)</li>
<li>Suppression de la période de refroidissement dans le limiteur de taux pour les requêtes de lecture<a href="https://github.com/milvus-io/milvus/pull/35936">(#35936</a>)</li>
<li>Amélioration de la vérification des champs de chargement pour les collections déjà chargées<a href="https://github.com/milvus-io/milvus/pull/35910">(#35910</a>)</li>
<li>Ajout de la prise en charge de l'abandon des rôles liés aux listes de privilèges dans la version 2.4<a href="https://github.com/milvus-io/milvus/pull/35863">(#35863</a>)</li>
<li>Implémentation des règles depguard pour interdire l'utilisation de la bibliothèque proto obsolète<a href="https://github.com/milvus-io/milvus/pull/35818">(#35818</a>)</li>
</ul>
<h3 id="Others" class="common-anchor-header">Autres</h3><ul>
<li>Mise à jour de la version de Knowhere<a href="https://github.com/milvus-io/milvus/pull/36067">(#36067</a>)</li>
</ul>
<h2 id="v2410" class="common-anchor-header">v2.4.10<button data-href="#v2410" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 30 août 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.10</td><td>2.4.6</td><td>2.4.3</td><td>2.4.6</td></tr>
</tbody>
</table>
<p>Milvus 2.4.10 apporte des améliorations significatives en termes de fonctionnalité et de stabilité. Les principales caractéristiques comprennent la prise en charge des opérations d'insertion ascendante sur les collections compatibles avec AutoID, les capacités de chargement de collections partielles et diverses configurations à mémoire mappée (MMAP) pour optimiser l'utilisation de la mémoire. Cette version corrige également plusieurs bogues provoquant des paniques, des vidages de noyau et des fuites de ressources. Nous recommandons une mise à jour pour profiter pleinement de ces améliorations.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li><strong>Upsert avec Auto ID</strong>: Prise en charge des opérations d'insertion avec génération automatique d'ID<a href="https://github.com/milvus-io/milvus/pull/34633">(#34633</a>)</li>
<li><strong>Chargement partiel des champs d'une collection</strong> [Beta Preview] : Permet de charger des champs spécifiques d'une collection<a href="https://github.com/milvus-io/milvus/pull/35696">(#35696</a>)</li>
<li><strong>Améliorations RBAC</strong>:<ul>
<li>Ajout de la prise en charge des messages RBAC pour la capture des données de changement (CDC)<a href="https://github.com/milvus-io/milvus/pull/35562">(#35562</a>)</li>
<li>Introduction des groupes de privilèges readonly/readwrite/admin pour simplifier le processus d'attribution RBAC<a href="https://github.com/milvus-io/milvus/pull/35543">(#35543</a>)</li>
<li>Nouvelle API pour sauvegarder et restaurer les configurations RBAC<a href="https://github.com/milvus-io/milvus/pull/35513">(#35513</a>)</li>
<li>Rafraîchissement du cache du proxy après la restauration des métadonnées RBAC<a href="https://github.com/milvus-io/milvus/pull/35636">(#35636</a>)</li>
</ul></li>
<li><strong>Configuration MMAP améliorée</strong>: Options de configuration plus générales pour contrôler le comportement de MMAP<a href="https://github.com/milvus-io/milvus/pull/35609">(#35609</a>)</li>
<li><strong>Restrictions d'accès aux bases de données</strong>: Nouvelles propriétés pour restreindre l'accès en lecture aux bases de données<a href="https://github.com/milvus-io/milvus/pull/35754">(#35754</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bugs</h3><ul>
<li>Correction de l'erreur Arrow Go client don't return<a href="https://github.com/milvus-io/milvus/pull/35820">(#35820</a>)</li>
<li>Correction de l'imprécision de la limitation de débit<a href="https://github.com/milvus-io/milvus/pull/35700">(#35700</a>)</li>
<li>Résolution de la panique du proxy après les échecs de l'API liés à l'importation<a href="https://github.com/milvus-io/milvus/pull/35559">(#35559</a>)</li>
<li>Correction des suppressions erronées potentielles pendant les points de contrôle du canal GC<a href="https://github.com/milvus-io/milvus/pull/35708">(#35708</a>)</li>
<li>Correction de la panique due à des segments d'importation candidats vides<a href="https://github.com/milvus-io/milvus/pull/35674">(#35674</a>)</li>
<li>Correction de la désallocation de mémoire mmap<a href="https://github.com/milvus-io/milvus/pull/35726">(#35726</a>)</li>
<li>Garantie d'une surveillance correcte des canaux pour les mises à niveau de 2.2 à 2.4<a href="https://github.com/milvus-io/milvus/pull/35695">(#35695</a>)</li>
<li>Correction de la fonction de libération de canal de DataNode sans surveillance<a href="https://github.com/milvus-io/milvus/pull/35657">(#35657</a>)</li>
<li>Correction du nombre de partitions dans les métadonnées RootCoord<a href="https://github.com/milvus-io/milvus/pull/35601">(#35601</a>)</li>
<li>Résolution des problèmes de mise à jour dynamique de la configuration pour certains paramètres<a href="https://github.com/milvus-io/milvus/pull/35637">(#35637</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><h4 id="Performance" class="common-anchor-header">Performance</h4><ul>
<li>Optimisation de la recherche sur les champs dynamiques<a href="https://github.com/milvus-io/milvus/pull/35602">(#35602</a>)</li>
<li>Amélioration des performances des bitset pour AVX512<a href="https://github.com/milvus-io/milvus/pull/35480">(#35480</a>)</li>
<li>Relecture de la valeur après l'initialisation de <code translate="no">once</code> pour une meilleure efficacité<a href="https://github.com/milvus-io/milvus/pull/35643">(#35643</a>)</li>
</ul>
<h4 id="Rolling-upgrade-improvements" class="common-anchor-header">Améliorations de la mise à jour continue</h4><ul>
<li>Marquage du noeud de requête en lecture seule après suspension<a href="https://github.com/milvus-io/milvus/pull/35586">(#35586</a>)</li>
<li>Prévention de la coexistence de l'ancien coordinateur avec le nouveau noeud/proxy<a href="https://github.com/milvus-io/milvus/pull/35760">(#35760</a>)</li>
</ul>
<h4 id="Others" class="common-anchor-header">Autres</h4><ul>
<li>Optimisation du processus de construction du noyau Milvus<a href="https://github.com/milvus-io/milvus/pull/35660">(#35660</a>)</li>
<li>Mise à jour vers protobuf-go v2<a href="https://github.com/milvus-io/milvus/pull/35555">(#35555</a>)</li>
<li>Amélioration du traçage avec encodage des chaînes hexagonales pour traceid et spanid<a href="https://github.com/milvus-io/milvus/pull/35568">(#35568</a>)</li>
<li>Ajout de la métrique "hit segment number" pour le "query hook"<a href="https://github.com/milvus-io/milvus/pull/35619">(#35619</a>)</li>
<li>Amélioration de la compatibilité avec l'ancien SDK pour la fonctionnalité configure load param<a href="https://github.com/milvus-io/milvus/pull/35573">(#35573</a>)</li>
<li>Ajout de la prise en charge de l'étranglement HTTP v1/v2<a href="https://github.com/milvus-io/milvus/pull/35504">(#35504</a>)</li>
<li>Correction de l'estimation de la mémoire de l'index<a href="https://github.com/milvus-io/milvus/pull/35670">(#35670</a>)</li>
<li>Possibilité d'écrire plusieurs segments dans le compacteur de mix pour éviter la génération de gros segments<a href="https://github.com/milvus-io/milvus/pull/35648">(#35648</a>)</li>
</ul>
<h2 id="v249" class="common-anchor-header">v2.4.9<button data-href="#v249" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 20 août 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.9</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.9 corrige un problème critique qui pouvait renvoyer des résultats inférieurs à la limite (topk) dans certains cas particuliers et inclut plusieurs améliorations clés pour améliorer les performances et la convivialité de la plateforme.</p>
<h3 id="Critical-fixes" class="common-anchor-header">Corrections critiques</h3><ul>
<li>Exclusion du segment l0 de l'instantané lisible<a href="https://github.com/milvus-io/milvus/pull/35510">(#35510</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Suppression de la création dupliquée de l'aide de schéma dans le proxy<a href="https://github.com/milvus-io/milvus/pull/35502">(#35502</a>).</li>
<li>Ajout de la prise en charge de la compilation de Milvus sur Ubuntu 20.04<a href="https://github.com/milvus-io/milvus/pull/35457">(#35457</a>).</li>
<li>Optimisation de l'utilisation des verrous et évitement du double flush du clustering buffer writer<a href="https://github.com/milvus-io/milvus/pull/35490">(#35490</a>).</li>
<li>Suppression du journal invalide<a href="https://github.com/milvus-io/milvus/pull/35473">(#35473</a>).</li>
<li>Ajout d'un guide d'utilisation du compactage en grappe<a href="https://github.com/milvus-io/milvus/pull/35428">(#35428</a>).</li>
<li>Ajout du support des champs dynamiques dans l'aide au schéma<a href="https://github.com/milvus-io/milvus/pull/35469">(#35469</a>).</li>
<li>Ajout de la section msgchannel dans le YAML généré<a href="https://github.com/milvus-io/milvus/pull/35466">(#35466</a>).</li>
</ul>
<h2 id="v248" class="common-anchor-header">v2.4.8<button data-href="#v248" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 14 août 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.8</td><td>2.4.5</td><td>2.4.3</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus 2.4.8 a apporté plusieurs améliorations significatives aux performances et à la stabilité du système. La caractéristique la plus notable est la mise en œuvre du compactage par regroupement, un mécanisme qui améliore l'efficacité des recherches et des requêtes en redistribuant les données dans de grandes collections sur la base d'une clé de regroupement désignée, réduisant ainsi la quantité de données analysées. Le compactage a également été découplé du DataNode, ce qui permet à n'importe quel DataNode d'effectuer le compactage indépendamment, améliorant ainsi la tolérance aux pannes, la stabilité, les performances et l'évolutivité. En outre, l'interface entre les composants Go et C++ a été remaniée pour utiliser des appels CGO asynchrones, ce qui a permis de résoudre des problèmes tels que les délais de session, tandis que plusieurs autres optimisations des performances ont été réalisées sur la base du profilage. Les dépendances de l'application ont également été mises à jour pour corriger les vulnérabilités de sécurité connues. De plus, cette version comprend également de nombreuses optimisations de performance et des corrections de bogues critiques.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Implémentation du clustering compaction, permettant aux données d'être redistribuées sur la base d'une clé de clustering désignée afin d'améliorer l'efficacité des requêtes<a href="https://github.com/milvus-io/milvus/pull/34326">(#34326</a>),<a href="https://github.com/milvus-io/milvus/pull/34363">(#34363</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Implémentation des capacités de recherche et d'extraction asynchrones dans CGO.<a href="https://github.com/milvus-io/milvus/pull/34200">(#34200</a>)</li>
<li>Séparation du processus de compaction du DataNode Shard pour améliorer la modularité du système.<a href="https://github.com/milvus-io/milvus/pull/34157">(#34157</a>)</li>
<li>Ajout du support pour le pooling client dans QueryNode au sein du proxy/délégateur pour améliorer les performances.<a href="https://github.com/milvus-io/milvus/pull/35195">(#35195</a>)</li>
<li>Intégration de Sonic pour minimiser la surcharge CPU pendant le marshaling JSON et le unmarshaling dans les handlers Gin et RestfulV1.<a href="https://github.com/milvus-io/milvus/pull/35018">(#35018</a>)</li>
<li>Introduction d'un cache en mémoire pour optimiser la récupération des résultats d'authentification.<a href="https://github.com/milvus-io/milvus/pull/35272">(#35272</a>)</li>
<li>Modification du type de métrique par défaut pour autoindex.<a href="https://github.com/milvus-io/milvus/pull/34277">[#34277</a>, <a href="https://github.com/milvus-io/milvus/pull/34479">#34479</a>]</li>
<li>Refonte du format de mémoire d'exécution pour les colonnes variables, conduisant à une réduction de l'utilisation de la mémoire.<a href="https://github.com/milvus-io/milvus/pull/34367">[#34367</a>, <a href="https://github.com/milvus-io/milvus/pull/35012">#35012</a>, <a href="https://github.com/milvus-io/milvus/pull/35041">#35041</a>]</li>
<li>Refonte des processus de compactage pour permettre le stockage de données persistantes.<a href="https://github.com/milvus-io/milvus/pull/34268">(#34268</a>)</li>
<li>Activation de la prise en charge des fichiers mappés en mémoire pour les segments croissants, ce qui améliore la gestion de la mémoire.<a href="https://github.com/milvus-io/milvus/pull/34110">(#34110</a>)</li>
<li>Amélioration des journaux d'accès en ajoutant la prise en charge de l'API RESTful, les niveaux de cohérence des journaux et la distinction entre les erreurs système et les erreurs utilisateur.<a href="https://github.com/milvus-io/milvus/pull/34295">[#34295</a>, <a href="https://github.com/milvus-io/milvus/pull/34352">#34352</a>, <a href="https://github.com/milvus-io/milvus/pull/34396">#34396</a>]</li>
<li>Utilisation du nouveau paramètre <code translate="no">range_search_k</code> dans Knowhere pour accélérer les recherches de portée.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Application de filtres de Bloom bloqués pour améliorer la vitesse de construction des filtres et des requêtes.<a href="https://github.com/milvus-io/milvus/pull/34377">[#34377</a>, <a href="https://github.com/milvus-io/milvus/pull/34922">#34922</a>]</li>
<li>Amélioration de l'utilisation de la mémoire :<ul>
<li>Espace pré-alloué pour les tampons d'insertion des DataNodes.<a href="https://github.com/milvus-io/milvus/pull/34205">(#34205</a>)</li>
<li>Pré-allocation de <code translate="no">FieldData</code> pour les opérations Reduce.<a href="https://github.com/milvus-io/milvus/pull/34254">(#34254</a>)</li>
<li>Libération des enregistrements dans le codec de suppression pour éviter les fuites de mémoire.<a href="https://github.com/milvus-io/milvus/pull/34506">(#34506</a>)</li>
<li>Contrôle du niveau de concurrence du gestionnaire de fichiers disque pendant le chargement des fichiers.<a href="https://github.com/milvus-io/milvus/pull/35282">(#35282</a>)</li>
<li>Optimisation de la logique de collecte des ordures en cours d'exécution de Go pour libérer la mémoire en temps voulu.<a href="https://github.com/milvus-io/milvus/pull/34950">(#34950</a>)</li>
<li>Implémentation d'une nouvelle politique de scellement pour les segments croissants.<a href="https://github.com/milvus-io/milvus/pull/34779">(#34779</a>)</li>
</ul></li>
<li>Améliorations de DataCoord :<ul>
<li>Réduction de l'utilisation du CPU.<a href="https://github.com/milvus-io/milvus/pull/34231">[#34231</a>, <a href="https://github.com/milvus-io/milvus/pull/34309">#34309</a>]</li>
<li>Implémentation d'une logique de sortie du ramasse-miettes plus rapide.<a href="https://github.com/milvus-io/milvus/pull/35051">(#35051</a>)</li>
<li>Amélioration des algorithmes de planification des noeuds de travail.<a href="https://github.com/milvus-io/milvus/pull/34382">(#34382</a>)</li>
<li>Amélioration de l'algorithme de contrôle de la taille des segments spécifiquement pour les opérations d'importation.<a href="https://github.com/milvus-io/milvus/pull/35149">(#35149</a>)</li>
</ul></li>
<li>Amélioration de l'algorithme d'équilibrage de charge :<ul>
<li>Réduction du facteur de surcharge de la mémoire sur le délégateur.<a href="https://github.com/milvus-io/milvus/pull/35164">(#35164</a>)</li>
<li>Allocation d'une taille de mémoire fixe pour le délégateur.<a href="https://github.com/milvus-io/milvus/pull/34600">(#34600</a>)</li>
<li>Evite l'allocation excessive de segments et de canaux pour les nouveaux noeuds de requête.<a href="https://github.com/milvus-io/milvus/pull/34245">(#34245</a>)</li>
<li>Réduction du nombre de tâches par cycle d'ordonnancement par le coordinateur de requêtes tout en augmentant la fréquence d'ordonnancement.<a href="https://github.com/milvus-io/milvus/pull/34987">(#34987</a>)</li>
<li>Amélioration de l'algorithme d'équilibrage des canaux sur le DataNode.<a href="https://github.com/milvus-io/milvus/pull/35033">(#35033</a>)</li>
</ul></li>
<li>Extension des métriques du système : Ajout de nouvelles mesures à travers divers composants pour surveiller des aspects spécifiques, y compris :<ul>
<li>Force-deny-writing state.<a href="https://github.com/milvus-io/milvus/pull/34989">(#34989</a>)</li>
<li>Latence de la file d'attente.<a href="https://github.com/milvus-io/milvus/pull/34788">(#34788</a>)</li>
<li>Quota de disque.<a href="https://github.com/milvus-io/milvus/pull/35306">(#35306</a>)</li>
<li>Temps d'exécution des tâches.<a href="https://github.com/milvus-io/milvus/pull/35141">(#35141</a>)</li>
<li>Taille du Binlog.<a href="https://github.com/milvus-io/milvus/pull/35235">(#35235</a>)</li>
<li>Taux d'insertion.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>Niveau d'eau élevé de la mémoire.<a href="https://github.com/milvus-io/milvus/pull/35188">(#35188</a>)</li>
<li>Métriques de l'API RESTful.<a href="https://github.com/milvus-io/milvus/pull/35083">(#35083</a>)</li>
<li>Latence de recherche.<a href="https://github.com/milvus-io/milvus/pull/34783">(#34783</a>)</li>
</ul></li>
</ul>
<h3 id="Changes" class="common-anchor-header">Changements</h3><ul>
<li><p>Pour les utilisateurs de logiciels libres, cette version modifie les types de métriques dans AutoIndex pour <code translate="no">FloatVector</code> et <code translate="no">BinaryVector</code> en <code translate="no">Cosine</code> et <code translate="no">Hamming</code>, respectivement.</p></li>
<li><p><strong>Versions de dépendances tierces corrigées</strong>:</p>
<ul>
<li>Cette version introduit des versions corrigées pour certaines bibliothèques de dépendances tierces, ce qui améliore considérablement la gestion de la chaîne d'approvisionnement logicielle de Milvus.</li>
<li>En isolant le projet des modifications en amont, elle protège les constructions quotidiennes des perturbations potentielles.</li>
<li>La mise à jour garantit la stabilité en hébergeant exclusivement des paquets tiers C++ validés sur JFrog Cloud et en utilisant les révisions de recettes Conan (RREV).</li>
<li>Cette approche atténue le risque de rupture des changements provenant des mises à jour dans ConanCenter.</li>
<li>Les développeurs utilisant Ubuntu 22.04 bénéficieront immédiatement de ces changements. Cependant, les développeurs utilisant d'autres systèmes d'exploitation devront peut-être mettre à jour leur version de <code translate="no">glibc</code> pour éviter les problèmes de compatibilité.</li>
</ul></li>
</ul>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Corrections de bugs critiques</h3><ul>
<li>Correction d'un problème où les données de suppression étaient perdues à cause de l'omission de segments pendant le compactage de L0.<a href="https://github.com/milvus-io/milvus/pull/33980">[#33980</a>, <a href="https://github.com/milvus-io/milvus/pull/34363">#34363</a>]</li>
<li>Correction d'un problème où les messages de suppression n'étaient pas transférés en raison d'une mauvaise gestion de l'étendue des données.<a href="https://github.com/milvus-io/milvus/pull/35313">(#35313</a>)</li>
<li>Résolution d'une exception SIGBUS survenant suite à une utilisation incorrecte de <code translate="no">mmap</code><a href="https://github.com/milvus-io/milvus/pull/34455">[#34455</a>, <a href="https://github.com/milvus-io/milvus/pull/34530">#34530</a>].</li>
<li>Correction des plantages causés par des expressions de recherche illégales.<a href="https://github.com/milvus-io/milvus/pull/35307">(#35307</a>)</li>
<li>Correction d'un problème où la surveillance d'un DataNode échouait à cause d'un réglage incorrect du délai d'attente dans le contexte de surveillance.<a href="https://github.com/milvus-io/milvus/pull/35017">(#35017</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction des vulnérabilités de sécurité en mettant à jour certaines dépendances.<a href="https://github.com/milvus-io/milvus/pull/33927">[#33927</a>, <a href="https://github.com/milvus-io/milvus/pull/34693">#34693</a>]</li>
<li>Correction d'une erreur d'analyse déclenchée par des expressions excessivement longues.<a href="https://github.com/milvus-io/milvus/pull/34957">(#34957</a>)</li>
<li>Résolution d'une fuite de mémoire qui se produisait lors de l'analyse du plan de requête.<a href="https://github.com/milvus-io/milvus/pull/34932">(#34932</a>)</li>
<li>Correction d'un problème où les modifications dynamiques du niveau du journal ne prenaient pas effet.<a href="https://github.com/milvus-io/milvus/pull/34777">(#34777</a>)</li>
<li>Résolution d'un problème où les requêtes group by sur des données croissantes échouaient à cause d'offsets de segments non initialisés.<a href="https://github.com/milvus-io/milvus/pull/34750">(#34750</a>)</li>
<li>Correction de la définition des paramètres de recherche lors de l'utilisation de l'itérateur Knowhere.<a href="https://github.com/milvus-io/milvus/pull/34732">(#34732</a>)</li>
<li>Révision de la logique de vérification de l'état du chargement de la partition.<a href="https://github.com/milvus-io/milvus/pull/34305">(#34305</a>)</li>
<li>Correction d'un problème où les mises à jour du cache des privilèges échouaient à cause d'erreurs de requête non gérées.<a href="https://github.com/milvus-io/milvus/pull/34697">(#34697</a>)</li>
<li>Résolution d'un échec dans la récupération de la collection chargée après le redémarrage de QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/35211">(#35211</a>)</li>
<li>Correction d'un problème d'idempotence de charge en supprimant la validation inutile des paramètres d'index.<a href="https://github.com/milvus-io/milvus/pull/35179">(#35179</a>)</li>
<li>S'assurer que <code translate="no">compressBinlog</code> est exécuté pour permettre à <code translate="no">reloadFromKV</code> de remplir correctement le <code translate="no">logID</code> de binlog après le redémarrage de DataCoord.<a href="https://github.com/milvus-io/milvus/pull/34062">(#34062</a>)</li>
<li>Correction d'un problème où les métadonnées de collecte n'étaient pas supprimées après le ramassage des ordures dans DataCoord.<a href="https://github.com/milvus-io/milvus/pull/34884">(#34884</a>)</li>
<li>Résolution d'une fuite de mémoire dans SegmentManager au sein de DataCoord en supprimant les segments vidés générés par les importations.<a href="https://github.com/milvus-io/milvus/pull/34651">(#34651</a>)</li>
<li>Correction d'un problème de panique lorsque le compactage était désactivé et qu'une collection était abandonnée.<a href="https://github.com/milvus-io/milvus/pull/34206">(#34206</a>)</li>
<li>Correction d'un problème de dépassement de mémoire dans DataNode en améliorant l'algorithme d'estimation de l'utilisation de la mémoire.<a href="https://github.com/milvus-io/milvus/pull/34203">(#34203</a>)</li>
<li>Prévention de l'utilisation de la mémoire en rafale lorsque plusieurs requêtes d'extraction de vecteurs ont un échec de cache en implémentant le vol unique pour le cache de morceaux.<a href="https://github.com/milvus-io/milvus/pull/34283">(#34283</a>)</li>
<li>Capture de <code translate="no">ErrKeyNotFound</code> pendant les opérations CAS (Compare and Swap) dans la configuration.<a href="https://github.com/milvus-io/milvus/pull/34489">(#34489</a>)</li>
<li>Correction d'un problème où les mises à jour de configuration échouaient à cause de l'utilisation par erreur de la valeur formatée dans une opération CAS.<a href="https://github.com/milvus-io/milvus/pull/34373">(#34373</a>)</li>
</ul>
<h3 id="Miscellaneous" class="common-anchor-header">Divers</h3><ul>
<li>Ajout de la prise en charge de l'exportateur HTTP OTLP, améliorant l'observabilité et les capacités de surveillance.<a href="https://github.com/milvus-io/milvus/pull/35073">[#35073</a>, <a href="https://github.com/milvus-io/milvus/pull/35299">#35299</a>]</li>
<li>Amélioration de la fonctionnalité de la base de données en introduisant des propriétés telles que "max collections" et "disk quota", qui peuvent maintenant être modifiées dynamiquement.<a href="https://github.com/milvus-io/milvus/pull/34511">[#34511</a>, <a href="https://github.com/milvus-io/milvus/pull/34386">#34386</a>]</li>
<li>Ajout de capacités de traçage pour les processus de compactage L0 dans DataNode afin d'améliorer les diagnostics et la surveillance.<a href="https://github.com/milvus-io/milvus/pull/33898">(#33898</a>)</li>
<li>Introduction d'une configuration de quotas pour le nombre d'entrées de segments L0 par collection, permettant un meilleur contrôle des taux de suppression en appliquant une rétropression.<a href="https://github.com/milvus-io/milvus/pull/34837">(#34837</a>)</li>
<li>Extension du mécanisme de limitation du taux pour les opérations d'insertion afin de couvrir également les opérations d'insertion ascendante, garantissant des performances constantes en cas de charge élevée.<a href="https://github.com/milvus-io/milvus/pull/34616">(#34616</a>)</li>
<li>Implémentation d'un pool CGO dynamique pour les appels CGO proxy, optimisant l'utilisation des ressources et les performances.<a href="https://github.com/milvus-io/milvus/pull/34842">(#34842</a>)</li>
<li>Activation de l'option de compilation DiskAnn pour les systèmes d'exploitation Ubuntu, Rocky et Amazon, ce qui améliore la compatibilité et les performances sur ces plateformes.<a href="https://github.com/milvus-io/milvus/pull/34244">(#34244</a>)</li>
<li>Mise à jour de Conan vers la version 1.64.1, assurant la compatibilité avec les dernières fonctionnalités et améliorations.<a href="https://github.com/milvus-io/milvus/pull/35216">(#35216</a>)</li>
<li>Mise à jour de Knowhere vers la version 2.3.7, apportant des améliorations de performance et de nouvelles fonctionnalités.<a href="https://github.com/milvus-io/milvus/pull/34709">(#34709</a>)</li>
<li>Correction de la révision de certains paquets tiers pour assurer des constructions cohérentes et réduire le risque de changements inattendus.<a href="https://github.com/milvus-io/milvus/pull/35316">(#35316</a>)</li>
</ul>
<h2 id="v246" class="common-anchor-header">v2.4.6<button data-href="#v246" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 16 juillet 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.6</td><td>2.4.4</td><td>2.4.2</td><td>2.4.4</td></tr>
</tbody>
</table>
<p>Milvus v2.4.6 est une version de correction de bogues qui résout des problèmes critiques tels que les paniques, les fuites de mémoire et la perte de données lors des suppressions. Elle introduit également plusieurs optimisations, notamment des améliorations des mesures de surveillance, la mise à niveau de la version Go vers 1.21 et l'amélioration de l'expérience utilisateur pour les requêtes RESTful count(*).</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Amélioration de la convivialité des requêtes RESTful API<a href="https://github.com/milvus-io/milvus/pull/34444">(#34444</a>).</li>
<li>Mise à jour de la version Go de 1.20 à 1.21<a href="https://github.com/milvus-io/milvus/pull/33940">(#33940</a>).</li>
<li>Optimisation de l'histogramme métrique pour une granularité plus fine<a href="https://github.com/milvus-io/milvus/pull/34592">(#34592</a>).</li>
<li>Mise à jour de la version de dépendance de Pulsar de 2.8.2 à 2.9.5. Il est recommandé de mettre à jour Pulsar vers la version 2.9.5 depuis Milvus 2.4.6.</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues</h3><ul>
<li>Correction d'un problème où l'API GetReplicas renvoyait un statut nul<a href="https://github.com/milvus-io/milvus/pull/34019">(#34019</a>).</li>
<li>Correction d'un problème où les requêtes pouvaient renvoyer des enregistrements supprimés<a href="https://github.com/milvus-io/milvus/pull/34502">(#34502</a>).</li>
<li>Résolution d'un problème où IndexNode se bloquait pendant l'arrêt à cause d'un contrôle incorrect de la durée de vie<a href="https://github.com/milvus-io/milvus/pull/34559">(#34559</a>).</li>
<li>Correction d'une fuite de mémoire des objets oracle de clé primaire lorsqu'un travailleur est hors ligne<a href="https://github.com/milvus-io/milvus/pull/34020">(#34020</a>).</li>
<li>Correction de ChannelManagerImplV2 pour notifier le bon Node, adressant les problèmes de capture de paramètres dans la fermeture de boucle<a href="https://github.com/milvus-io/milvus/pull/34004">(#34004</a>).</li>
<li>Correction d'une course aux données en lecture-écriture dans ImportTask segmentsInfo en implémentant une copie profonde<a href="https://github.com/milvus-io/milvus/pull/34126">(#34126</a>).</li>
<li>Correction des informations de version pour l'option de configuration "legacyVersionWithoutRPCWatch" pour éviter les erreurs lors des mises à jour<a href="https://github.com/milvus-io/milvus/pull/34185">(#34185</a>).</li>
<li>Correction de la métrique pour le nombre de partitions chargées<a href="https://github.com/milvus-io/milvus/pull/34195">(#34195</a>).</li>
<li>Passage de la configuration <code translate="no">otlpSecure</code> lors de la mise en place du traçage segcore<a href="https://github.com/milvus-io/milvus/pull/34210">(#34210</a>).</li>
<li>Correction d'un problème où les propriétés de DataCoord étaient écrasées par erreur<a href="https://github.com/milvus-io/milvus/pull/34240">(#34240</a>).</li>
<li>Résolution d'un problème de perte de données causé par la fusion erronée de deux flux de messages nouvellement créés<a href="https://github.com/milvus-io/milvus/pull/34563">(#34563</a>).</li>
<li>Correction d'une panique causée par msgstream essayant de consommer un pchannel invalide<a href="https://github.com/milvus-io/milvus/pull/34230">(#34230</a>).</li>
<li>Correction d'un problème où les importations pouvaient générer des fichiers orphelins<a href="https://github.com/milvus-io/milvus/pull/34071">(#34071</a>).</li>
<li>Correction des résultats de requête incomplets dus à la duplication des clés primaires dans un segment<a href="https://github.com/milvus-io/milvus/pull/34302">(#34302</a>).</li>
<li>Résolution d'un problème de segments scellés manquants dans le compactage L0<a href="https://github.com/milvus-io/milvus/pull/34566">(#34566</a>).</li>
<li>Correction du problème des données sales dans le méta channel-cp généré après le garbage collection<a href="https://github.com/milvus-io/milvus/pull/34609">(#34609</a>).</li>
<li>Correction des métriques où database_num était 0 après le redémarrage de RootCoord<a href="https://github.com/milvus-io/milvus/pull/34010">(#34010</a>).</li>
<li>Correction d'une fuite de mémoire dans SegmentManager dans DataCoord en supprimant les segments vidés générés par l'importation<a href="https://github.com/milvus-io/milvus/pull/34652">(#34652</a>).</li>
<li>Assurer que compressBinlog remplisse le logID des binlogs après le redémarrage de DataCoord, assurant un rechargement correct depuis KV<a href="https://github.com/milvus-io/milvus/pull/34064">(#34064</a>).</li>
</ul>
<h2 id="v245" class="common-anchor-header">v2.4.5<button data-href="#v245" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 18 juin 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.5</td><td>2.4.4</td><td>2.4.1</td><td>2.4.3</td></tr>
</tbody>
</table>
<p>La version 2.4.5 de Milvus apporte plusieurs améliorations et corrections de bogues pour améliorer les performances, la stabilité et les fonctionnalités. Milvus 2.4.5 simplifie la recherche vectorielle sparse, float16 et bfloat16 grâce à l'indexation automatique, accélère les recherches, les suppressions et les compactions grâce aux optimisations du filtre Bloom et s'attaque à la gestion des données grâce à des temps de chargement plus rapides et à la prise en charge des segments L0 importés. Elle introduit également l'index sparse HNSW pour une recherche efficace de données spares en haute dimension, améliore l'API RESTful avec la prise en charge des vecteurs flottants sparse, et corrige des bogues critiques pour une meilleure stabilité.</p>
<h3 id="New-Features" class="common-anchor-header">Nouvelles fonctionnalités</h3><ul>
<li>Ajout du support rbac à l'API de description/modification de base de données<a href="https://github.com/milvus-io/milvus/pull/33804">(#33804</a>)</li>
<li>Support de la construction de l'index HNSW pour les vecteurs sparse<a href="https://github.com/milvus-io/milvus/pull/33653">(#33653</a>, <a href="https://github.com/milvus-io/milvus/pull/33662">#33662</a>)</li>
<li>Prise en charge de la construction de l'index Disk pour les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/33575">(#33575</a>)</li>
<li>Prise en charge du type de vecteur sparse sur RESTful v2<a href="https://github.com/milvus-io/milvus/pull/33555">(#33555</a>)</li>
<li>Ajout de l'api RESTful /management/stop pour arrêter un composant<a href="https://github.com/milvus-io/milvus/pull/33799">(#33799</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Fixer la valeur par défaut de maxPartitionNum à 1024<a href="https://github.com/milvus-io/milvus/pull/33950">(#33950</a>)</li>
<li>Activation de la réinitialisation forcée de la connexion en cas d'erreur d'indisponibilité<a href="https://github.com/milvus-io/milvus/pull/33910">(#33910</a>)</li>
<li>Activation de la limitation du taux de vidange au niveau de la collection<a href="https://github.com/milvus-io/milvus/pull/33864">(#33864</a>)</li>
<li>Exécution en parallèle de l'application du filtre bloom pour accélérer la prédiction des segments<a href="https://github.com/milvus-io/milvus/pull/33793">(#33793</a>)</li>
<li>Utilisation de la librairie fastjson pour unmarshal delete log afin d'accélérer json.Unmarshal<a href="https://github.com/milvus-io/milvus/pull/33802">(#33802</a>)</li>
<li>Utilisation de BatchPkExist pour réduire le coût d'appel de la fonction bloom filter<a href="https://github.com/milvus-io/milvus/pull/33752">(#33752</a>)</li>
<li>Accélération du chargement des petites collections<a href="https://github.com/milvus-io/milvus/pull/33746">(#33746</a>)</li>
<li>Prise en charge de l'importation de données de suppression dans le segment L0 (<a href="https://github.com/milvus-io/milvus/pull/33712">#33712</a>)</li>
<li>Suppression des tâches de compactage de marque pour être temporisées afin d'éviter d'exécuter la même tâche encore et encore<a href="https://github.com/milvus-io/milvus/pull/33833">(#33833</a>)</li>
<li>Gestion des vecteurs float16 et bfloat16 comme des BinaryVector dans l'insertion en masse de numpy (<a href="https://github.com/milvus-io/milvus/pull/33788">#33788</a>)</li>
<li>Ajout du drapeau includeCurrentMsg pour la méthode seek<a href="https://github.com/milvus-io/milvus/pull/33743">(#33743</a>)</li>
<li>Ajout de mergeInterval, targetBufSize, maxTolerantLagde msgdispatcher dans les configurations<a href="https://github.com/milvus-io/milvus/pull/33680">(#33680</a>)</li>
<li>Amélioration de GetVectorByID pour les vecteurs épars<a href="https://github.com/milvus-io/milvus/pull/33652">(#33652</a>)</li>
<li>Suppression de StringPrimarykey pour réduire les copies inutiles et le coût des appels de fonction (<a href="https://github.com/milvus-io/milvus/pull/33649">#33649</a>)</li>
<li>Ajout de la correspondance autoindex pour le type de données binaire/sparse<a href="https://github.com/milvus-io/milvus/pull/33625">(#33625</a>)</li>
<li>Optimisation de certains caches pour réduire l'utilisation de la mémoire<a href="https://github.com/milvus-io/milvus/pull/33560">(#33560</a>)</li>
<li>Abstraction de l'interface d'exécution pour la tâche d'importation/préimportation (<a href="https://github.com/milvus-io/milvus/pull/33607">#33607</a>)</li>
<li>Utilisation de map pk pour l'horodatage dans l'insertion de tampon pour réduire les causes de bf<a href="https://github.com/milvus-io/milvus/pull/33582">(#33582</a>)</li>
<li>Evite les méta-opérations redondantes de l'import (<a href="https://github.com/milvus-io/milvus/pull/33519">#33519</a>)</li>
<li>Amélioration des journaux en enregistrant de meilleures informations sur les quotas de disque, en ajoutant le drapeau UseDefaultConsistency, en supprimant les journaux inutiles<a href="https://github.com/milvus-io/milvus/pull/33597">(#33597</a>, <a href="https://github.com/milvus-io/milvus/pull/33644">#33644</a>, <a href="https://github.com/milvus-io/milvus/pull/33670">#33670</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bugs</h3><ul>
<li>Correction d'un bug qui empêchait queryHook de reconnaître le type de vecteur<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Prévention de l'utilisation de la variable d'itération partitionID capturée<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Correction d'un bogue pouvant entraîner l'impossibilité pour Milvus de créer un index automatique sur des vecteurs binaires et épars<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Correction d'un bogue pouvant amener l'indexnode à réessayer de créer un index sur des paramètres d'index invalides de tous les vecteurs (<a href="https://github.com/milvus-io/milvus/pull/33878">#33878</a>)</li>
<li>Correction d'un bogue qui, lorsque des chargements et des libérations se produisent simultanément, peut faire planter le serveur<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Amélioration de la cohérence du cache pour les valeurs de configuration<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Prévention d'une éventuelle perte de données lors d'une suppression<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Garantie que le champ DroppedAt (horodatage probable de la suppression) est défini après l'abandon de collections<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Correction d'un problème qui aurait pu amener Milvus à gérer incorrectement la taille des données vectorielles binaires<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Prévention de l'enregistrement des informations d'identification Kafka sensibles en texte clair<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Milvus peut correctement importer des données avec plusieurs champs vectoriels<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>).</li>
<li>Amélioration de la fiabilité de l'importation en vérifiant si un travail d'importation existe avant de démarrer.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Amélioration de la gestion de l'index HNSW clairsemé (fonctionnalité interne)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Nettoyage de la mémoire vectorielle pour éviter les fuites de mémoire<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Garantie d'un échauffement asynchrone plus fluide en corrigeant un problème de verrouillage d'état<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Correction d'un bogue qui pouvait causer des résultats manquants dans les itérateurs de requêtes.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Correction d'un bogue pouvant entraîner une taille inégale des segments d'importation (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Correction d'une mauvaise gestion de la taille des données pour les types bf16, fp16 et les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Amélioration de la stabilité en corrigeant les problèmes potentiels avec le compacteur L0<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Garantie que les mises à jour de la configuration dynamique sont correctement reflétées dans le cache.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Amélioration de la précision de la métrique RootCoordQuotaStates (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Assurer un rapport précis du nombre d'entités chargées dans la métrique<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Fourniture d'informations plus complètes dans les journaux d'exception. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimisation du pipeline de requêtes en supprimant le vérificateur de groupe inutile<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Utilisation du chemin de stockage local pour une vérification plus précise de la capacité du disque sur le noeud d'index.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Correction hasMoreResult peut retourner false quand le nombre de hits est plus grand que la limite<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Retardement du chargement des bf dans le délégateur pour éviter que les bf soient chargés encore et encore lorsque le travailleur n'a plus de mémoire<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>) - Correction d'un bogue qui empêchait queryHook de reconnaître le type de vecteur<a href="https://github.com/milvus-io/milvus/pull/33911">(#33911</a>)</li>
<li>Prévention de l'utilisation de la variable d'itération capturée partitionID<a href="https://github.com/milvus-io/milvus/pull/33970">(#33970</a>)</li>
<li>Correction d'un bogue pouvant entraîner l'impossibilité pour Milvus de créer un index automatique sur des vecteurs binaires et épars<a href="https://github.com/milvus-io/milvus/pull/33867">(#33867</a>)</li>
<li>Correction d'un bogue pouvant amener l'indexnode à réessayer de créer un index sur des paramètres d'index invalides de tous les vecteurs (<a href="https://github.com/milvus-io/milvus/pull/33878">#33878</a>)</li>
<li>Correction d'un bogue qui, lorsque des chargements et des libérations se produisent simultanément, peut faire planter le serveur<a href="https://github.com/milvus-io/milvus/pull/33699">(#33699</a>)</li>
<li>Amélioration de la cohérence du cache pour les valeurs de configuration<a href="https://github.com/milvus-io/milvus/pull/33797">(#33797</a>)</li>
<li>Prévention d'une éventuelle perte de données lors d'une suppression<a href="https://github.com/milvus-io/milvus/pull/33821">(#33821</a>)</li>
<li>Garantie que le champ DroppedAt (horodatage probable de la suppression) est défini après l'abandon de collections<a href="https://github.com/milvus-io/milvus/pull/33767">(#33767</a>)</li>
<li>Correction d'un problème qui aurait pu amener Milvus à gérer incorrectement la taille des données vectorielles binaires<a href="https://github.com/milvus-io/milvus/pull/33751">(#33751</a>)</li>
<li>Prévention de l'enregistrement des informations d'identification Kafka sensibles en texte clair<a href="https://github.com/milvus-io/milvus/pull/33694">(#33694</a>, <a href="https://github.com/milvus-io/milvus/pull/33747">#33747</a>)</li>
<li>Milvus peut correctement importer des données avec plusieurs champs vectoriels<a href="https://github.com/milvus-io/milvus/pull/33724">(#33724</a>).</li>
<li>Amélioration de la fiabilité de l'importation en vérifiant si un travail d'importation existe avant de démarrer.<a href="https://github.com/milvus-io/milvus/pull/33673">(#33673</a>)</li>
<li>Amélioration de la gestion de l'index HNSW clairsemé (fonctionnalité interne)<a href="https://github.com/milvus-io/milvus/pull/33714">(#33714</a>)</li>
<li>Nettoyage de la mémoire vectorielle pour éviter les fuites de mémoire<a href="https://github.com/milvus-io/milvus/pull/33708">(#33708</a>)</li>
<li>Assurer un échauffement asynchrone plus fluide en corrigeant un problème de verrouillage d'état<a href="https://github.com/milvus-io/milvus/pull/33687">(#33687</a>)</li>
<li>Correction d'un bogue qui pouvait causer des résultats manquants dans les itérateurs de requêtes.<a href="https://github.com/milvus-io/milvus/pull/33506">(#33506</a>)</li>
<li>Correction d'un bogue pouvant entraîner une taille inégale des segments d'importation (<a href="https://github.com/milvus-io/milvus/pull/33634">#33634</a>)</li>
<li>Correction d'une mauvaise gestion de la taille des données pour les types bf16, fp16 et les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/33488">(#33488</a>)</li>
<li>Amélioration de la stabilité en corrigeant les problèmes potentiels avec le compacteur L0<a href="https://github.com/milvus-io/milvus/pull/33564">(#33564</a>)</li>
<li>Garantie que les mises à jour de la configuration dynamique sont correctement reflétées dans le cache.<a href="https://github.com/milvus-io/milvus/pull/33590">(#33590</a>)</li>
<li>Amélioration de la précision de la métrique RootCoordQuotaStates (<a href="https://github.com/milvus-io/milvus/pull/33601">#33601</a>)</li>
<li>Assurer un rapport précis du nombre d'entités chargées dans la métrique<a href="https://github.com/milvus-io/milvus/pull/33522">(#33522</a>)</li>
<li>Fourniture d'informations plus complètes dans les journaux d'exception. <a href="https://github.com/milvus-io/milvus/pull/33396">(#33396</a>)</li>
<li>Optimisation du pipeline de requêtes en supprimant le vérificateur de groupe inutile<a href="https://github.com/milvus-io/milvus/pull/33485">(#33485</a>)</li>
<li>Utilisation du chemin de stockage local pour une vérification plus précise de la capacité du disque sur le noeud d'index.<a href="https://github.com/milvus-io/milvus/pull/33505">(#33505</a>)</li>
<li>Correction hasMoreResult peut retourner false quand le nombre de hits est plus grand que la limite<a href="https://github.com/milvus-io/milvus/pull/33642">(#33642</a>)</li>
<li>Retardement du chargement des bf dans le délégateur pour éviter que les bf soient chargés encore et encore lorsque le travailleur n'a plus de mémoire<a href="https://github.com/milvus-io/milvus/pull/33650">(#33650</a>)</li>
</ul>
<h2 id="v244" class="common-anchor-header">v2.4.4<button data-href="#v244" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 31 mai 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.4</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>Milvus v2.4.4 comprend plusieurs corrections de bogues critiques et des améliorations visant à accroître les performances et la stabilité. Nous avons notamment <strong>résolu un problème critique dans lequel les journaux de statistiques d'insertion en masse étaient incorrectement collectés</strong>, ce qui pouvait affecter l'intégrité des données. <strong>Nous recommandons fortement à tous les utilisateurs de la version 2.4 de passer à cette version pour bénéficier de ces corrections.</strong></p>
<p><strong>Si vous utilisez l'insertion en bloc, mettez à jour vers la version 2.4.4 dès que possible pour garantir l'intégrité des données.</strong></p>
<h3 id="Critical-bug-fixes" class="common-anchor-header">Corrections de bogues critiques</h3><ul>
<li>Remplissage de l'ID du journal des statistiques et validation de son exactitude<a href="https://github.com/milvus-io/milvus/pull/33478">(#33478</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Mise à jour du jeu de bits pour ARM SVE<a href="https://github.com/milvus-io/milvus/pull/33440">(#33440</a>)</li>
<li>Activation de la compilation Milvus avec GCC-13<a href="https://github.com/milvus-io/milvus/pull/33441">(#33441</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Affichage de collections vides lorsque tous les privilèges sont accordés<a href="https://github.com/milvus-io/milvus/pull/33454">(#33454</a>)</li>
<li>S'assure que CMake se télécharge et s'installe pour la plateforme actuelle, et pas seulement pour x86_64<a href="https://github.com/milvus-io/milvus/pull/33439">(#33439</a>)</li>
</ul>
<h2 id="v243" class="common-anchor-header">v2.4.3<button data-href="#v243" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 29 mai 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.3</td><td>2.4.3</td><td>2.4.1</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>La version 2.4.3 de Milvus a introduit un grand nombre de fonctionnalités, d'améliorations et de corrections de bogues afin d'améliorer les performances et la fiabilité. Parmi les améliorations notables, citons la prise en charge de l'insertion en bloc de vecteurs flottants épars et l'accélération optimisée du filtre Bloom. Les améliorations couvrent différents domaines, des mises à jour dynamiques de la configuration à l'optimisation de l'utilisation de la mémoire. Les corrections de bogues ont permis de résoudre des problèmes critiques tels que des scénarios de panique et de garantir un fonctionnement plus fluide du système. Cette version souligne l'engagement continu de Milvus à améliorer les fonctionnalités, à optimiser les performances et à offrir une expérience utilisateur robuste.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Prise en charge de l'insertion en bloc de vecteurs flottants épars pour binlog/json/parquet<a href="https://github.com/milvus-io/milvus/pull/32649">(#32649</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Implémentation d'un canal de surveillance Datacoord/node basé sur RPC<a href="https://github.com/milvus-io/milvus/pull/32036">(#32036</a>)</li>
<li>Optimisation du filtre bloom pour accélérer le filtrage des suppressions<a href="https://github.com/milvus-io/milvus/pull/32642">(#32642</a>, <a href="https://github.com/milvus-io/milvus/pull/33329">#33329</a>, <a href="https://github.com/milvus-io/milvus/pull/33284">#33284</a>)</li>
<li>Chargement des données brutes via mmap si l'index scalaire n'a pas de données brutes<a href="https://github.com/milvus-io/milvus/pull/33317">(#33317</a>)</li>
<li>Synchronisation de la configuration de milvus avec milvus.yaml<a href="https://github.com/milvus-io/milvus/pull/33322">(#33322</a>, <a href="https://github.com/milvus-io/milvus/pull/32920">#32920</a>, <a href="https://github.com/milvus-io/milvus/pull/32857">#32857</a>, <a href="https://github.com/milvus-io/milvus/pull/32946">#32946</a>)</li>
<li>Mise à jour de la version de knowhere<a href="https://github.com/milvus-io/milvus/pull/33310">(#33310</a>, <a href="https://github.com/milvus-io/milvus/pull/32931">#32931</a>, <a href="https://github.com/milvus-io/milvus/pull/33043">#33043</a>)</li>
<li>Activation de la mise à jour dynamique de la politique d'équilibrage dans QueryCoord<a href="https://github.com/milvus-io/milvus/pull/33272">(#33272</a>)</li>
<li>Utilisation d'un logger pré-construit dans le tampon d'écriture pour minimiser l'allocation du logger<a href="https://github.com/milvus-io/milvus/pull/33304">(#33304</a>)</li>
<li>Amélioration de la vérification des paramètres<a href="https://github.com/milvus-io/milvus/pull/32777">(#32777</a>, <a href="https://github.com/milvus-io/milvus/pull/33271">#33271</a>, <a href="https://github.com/milvus-io/milvus/pull/33218">#33218</a>)</li>
<li>Ajout d'un paramètre pour ignorer les ID de messages incorrects dans le point de contrôle<a href="https://github.com/milvus-io/milvus/pull/33249">(#33249</a>)</li>
<li>Ajout d'une configuration pour contrôler la gestion des échecs d'initialisation pour les plugins<a href="https://github.com/milvus-io/milvus/pull/32680">(#32680</a>)</li>
<li>Ajout d'une configuration de cohérence de calcul de score pour knowhere<a href="https://github.com/milvus-io/milvus/pull/32997">(#32997</a>)</li>
<li>Introduction d'une option de configuration pour contrôler l'initialisation des permissions des rôles publics<a href="https://github.com/milvus-io/milvus/pull/33174">(#33174</a>)</li>
<li>Optimisation de l'utilisation de la mémoire lors de la lecture des champs<a href="https://github.com/milvus-io/milvus/pull/33196">(#33196</a>)</li>
<li>Amélioration de l'implémentation du Channel Manager v2<a href="https://github.com/milvus-io/milvus/pull/33172">(#33172</a>, <a href="https://github.com/milvus-io/milvus/pull/33121">#33121</a>, <a href="https://github.com/milvus-io/milvus/pull/33014">#33014</a>)</li>
<li>Ajout d'une fonctionnalité permettant de suivre la taille des données en mémoire pour binlog<a href="https://github.com/milvus-io/milvus/pull/33025">(#33025</a>)</li>
<li>Ajout de métriques pour la taille des fichiers d'index de segment<a href="https://github.com/milvus-io/milvus/pull/32979">(#32979</a>, <a href="https://github.com/milvus-io/milvus/pull/33305">#33305</a>)</li>
<li>Remplacement de Delete par DeletePartialMatch pour supprimer les métriques<a href="https://github.com/milvus-io/milvus/pull/33029">(#33029</a>)</li>
<li>Obtention de la taille des données liées en fonction du type de segment<a href="https://github.com/milvus-io/milvus/pull/33017">(#33017</a>)</li>
<li>Nettoyage des informations sur les noeuds de canaux dans le méta-magasin<a href="https://github.com/milvus-io/milvus/pull/32988">(#32988</a>)</li>
<li>Suppression du rootcoord du courtier de nœuds de données<a href="https://github.com/milvus-io/milvus/pull/32818">(#32818</a>)</li>
<li>Activation du téléchargement par lots<a href="https://github.com/milvus-io/milvus/pull/32788">(#32788</a>)</li>
<li>Modification du numéro de partition par défaut à 16 lors de l'utilisation de la clé de partition<a href="https://github.com/milvus-io/milvus/pull/32950">(#32950</a>)</li>
<li>Amélioration des performances de réduction sur les très grandes requêtes top-k<a href="https://github.com/milvus-io/milvus/pull/32871">(#32871</a>)</li>
<li>Utilisation de la capacité de TestLocations pour accélérer l'écriture et le compactage<a href="https://github.com/milvus-io/milvus/pull/32948">(#32948</a>)</li>
<li>Optimisation du pool d'analyseurs de plans pour éviter le recyclage inutile<a href="https://github.com/milvus-io/milvus/pull/32869">(#32869</a>)</li>
<li>Amélioration de la vitesse de chargement<a href="https://github.com/milvus-io/milvus/pull/32898">(#32898</a>)</li>
<li>Utilisation du niveau de cohérence par défaut de la collection pour restv2<a href="https://github.com/milvus-io/milvus/pull/32956">(#32956</a>)</li>
<li>Ajout d'une réponse au coût pour l'API rest<a href="https://github.com/milvus-io/milvus/pull/32620">(#32620</a>)</li>
<li>Activation de la politique d'équilibre exclusif des canaux<a href="https://github.com/milvus-io/milvus/pull/32911">(#32911</a>)</li>
<li>Exposition de l'API describedatabase dans le proxy<a href="https://github.com/milvus-io/milvus/pull/32732">(#32732</a>)</li>
<li>Utilisation du mapping coll2replica lors de l'obtention de RG par collection<a href="https://github.com/milvus-io/milvus/pull/32892">(#32892</a>)</li>
<li>Ajout de plus de traçage pour la recherche et la requête<a href="https://github.com/milvus-io/milvus/pull/32734">(#32734</a>)</li>
<li>Supporte la configuration dynamique pour la trace opentelemetry<a href="https://github.com/milvus-io/milvus/pull/32169">(#32169</a>)</li>
<li>Evite l'itération sur les résultats des canaux lors de la mise à jour du leaderview<a href="https://github.com/milvus-io/milvus/pull/32887">(#32887</a>)</li>
<li>Optimisation de la gestion des décalages de vecteurs pour parquet<a href="https://github.com/milvus-io/milvus/pull/32822">(#32822</a>)</li>
<li>Amélioration du filtrage des segments de datacoord avec la collecte<a href="https://github.com/milvus-io/milvus/pull/32831">(#32831</a>)</li>
<li>Ajustement du niveau et de la fréquence des journaux<a href="https://github.com/milvus-io/milvus/pull/33042">(#33042</a>, <a href="https://github.com/milvus-io/milvus/pull/32838">#32838</a>, <a href="https://github.com/milvus-io/milvus/pull/33337">#33337</a>)</li>
<li>Activation de l'arrêt de l'équilibrage après que l'équilibrage ait été suspendu<a href="https://github.com/milvus-io/milvus/pull/32812">(#32812</a>)</li>
<li>Mise à jour du cache du chef de file lorsque l'emplacement du chef de file a changé<a href="https://github.com/milvus-io/milvus/pull/32470">(#32470</a>)</li>
<li>Suppression d'API et de champs obsolètes<a href="https://github.com/milvus-io/milvus/pull/32808">(#32808</a>, <a href="https://github.com/milvus-io/milvus/pull/32704">#32704</a>)</li>
<li>Ajout de metautil.channel pour convertir les comparaisons de chaînes en int<a href="https://github.com/milvus-io/milvus/pull/32749">(#32749</a>)</li>
<li>Ajout d'informations sur le type pour le message d'erreur du rédacteur de la charge utile et le journal lorsque le querynode a trouvé une nouvelle collection<a href="https://github.com/milvus-io/milvus/pull/32522">(#32522</a>)</li>
<li>Vérification du numéro de partition lors de la création d'une collection avec une clé de partition<a href="https://github.com/milvus-io/milvus/pull/32670">(#32670</a>)</li>
<li>Suppression de l'ancien segment l0 en cas d'échec de la surveillance<a href="https://github.com/milvus-io/milvus/pull/32725">(#32725</a>)</li>
<li>Amélioration de l'impression du type de requête<a href="https://github.com/milvus-io/milvus/pull/33319">(#33319</a>)</li>
<li>Vérification que les données d'un champ de tableau sont nulles avant d'obtenir le type<a href="https://github.com/milvus-io/milvus/pull/33311">(#33311</a>)</li>
<li>Retour d'erreur en cas d'échec du démarrage de l'opération Delete/AddNode<a href="https://github.com/milvus-io/milvus/pull/33258">(#33258</a>)</li>
<li>Permet la mise à jour de l'ID du serveur du datanode<a href="https://github.com/milvus-io/milvus/pull/31597">(#31597</a>)</li>
<li>Nettoyage unifié des métriques des querynodes dans la version de collection<a href="https://github.com/milvus-io/milvus/pull/32805">(#32805</a>)</li>
<li>Correction de la version incorrecte de la configuration de l'index scalaire automatique<a href="https://github.com/milvus-io/milvus/pull/32795">(#32795</a>)</li>
<li>Amélioration de la vérification des paramètres d'index pour la création/modification d'index<a href="https://github.com/milvus-io/milvus/pull/32712">(#32712</a>)</li>
<li>Suppression de la récupération redondante des répliques<a href="https://github.com/milvus-io/milvus/pull/32985">(#32985</a>)</li>
<li>Activation de la table méta des canaux pour écrire plus de 200k segments<a href="https://github.com/milvus-io/milvus/pull/33300">(#33300</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bugs</h3><ul>
<li>Correction d'une panique lorsque la base de données n'existe pas dans l'intercepteur de limite de taux<a href="https://github.com/milvus-io/milvus/pull/33308">(#33308</a>)</li>
<li>Correction de l'échec de la collecte des métriques quotacenter en raison de paramètres incorrects<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
<li>Correction d'une panique si processactivestandby retournait une erreur<a href="https://github.com/milvus-io/milvus/pull/33372">(#33372</a>)</li>
<li>Correction de la troncature des résultats de recherche dans restful v2 lorsque nq &gt; 1<a href="https://github.com/milvus-io/milvus/pull/33363">(#33363</a>)</li>
<li>Ajout du champ nom de la base de données pour les opérations sur les rôles dans restful v2<a href="https://github.com/milvus-io/milvus/pull/33291">(#33291</a>)</li>
<li>Correction de la limite de taux globale qui ne fonctionne pas<a href="https://github.com/milvus-io/milvus/pull/33336">(#33336</a>)</li>
<li>Correction de la panique causée par l'échec de la construction de l'index<a href="https://github.com/milvus-io/milvus/pull/33314">(#33314</a>)</li>
<li>Ajout d'une validation pour le vecteur sparse dans segcore pour assurer la légalité<a href="https://github.com/milvus-io/milvus/pull/33312">(#33312</a>)</li>
<li>Suppression de la tâche de syncmgr après l'achèvement de la tâche<a href="https://github.com/milvus-io/milvus/pull/33303">(#33303</a>)</li>
<li>Correction de l'échec du filtrage de la clé de partition pendant l'importation de données<a href="https://github.com/milvus-io/milvus/pull/33277">(#33277</a>)</li>
<li>Correction de l'impossibilité de générer le traceID lors de l'utilisation de l'exportateur noop<a href="https://github.com/milvus-io/milvus/pull/33208">(#33208</a>)</li>
<li>Amélioration de la récupération des résultats des requêtes<a href="https://github.com/milvus-io/milvus/pull/33179">(#33179</a>)</li>
<li>Marquage de l'abandon du point de contrôle du canal pour éviter la fuite des métriques de décalage du point de contrôle<a href="https://github.com/milvus-io/milvus/pull/33201">(#33201</a>)</li>
<li>Correction du blocage du noeud de la requête pendant l'arrêt de la progression<a href="https://github.com/milvus-io/milvus/pull/33154">(#33154</a>)</li>
<li>Correction des segments manquants dans la réponse de rinçage<a href="https://github.com/milvus-io/milvus/pull/33061">(#33061</a>)</li>
<li>Rendre l'opération de soumission idempotente<a href="https://github.com/milvus-io/milvus/pull/33053">(#33053</a>)</li>
<li>Allocation d'une nouvelle tranche pour chaque lot dans le lecteur de flux<a href="https://github.com/milvus-io/milvus/pull/33360">(#33360</a>)</li>
<li>Nettoyage du noeud hors ligne du groupe de ressources après le redémarrage de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/33233">(#33233)</a></li>
<li>Suppression du compacteur l0 dans completedCompactor<a href="https://github.com/milvus-io/milvus/pull/33216">(#33216</a>)</li>
<li>Réinitialisation de la valeur du quota lors de l'initialisation du limiteur<a href="https://github.com/milvus-io/milvus/pull/33152">(#33152</a>)</li>
<li>Correction d'un problème où la limite etcd était dépassée<a href="https://github.com/milvus-io/milvus/pull/33041">(#33041</a>)</li>
<li>Résolution du dépassement de la limite des transactions etcd dû à un trop grand nombre de champs<a href="https://github.com/milvus-io/milvus/pull/33040">(#33040</a>)</li>
<li>Suppression de la réintroduction de RLock dans GetNumRowsOfPartition<a href="https://github.com/milvus-io/milvus/pull/33045">(#33045</a>)</li>
<li>Démarrage de LeaderCacheObserver avant SyncAll<a href="https://github.com/milvus-io/milvus/pull/33035">(#33035</a>)</li>
<li>Activation de l'équilibrage du canal de secours libéré<a href="https://github.com/milvus-io/milvus/pull/32986">(#32986</a>)</li>
<li>Initialisation de l'enregistreur d'accès avant l'initialisation du serveur<a href="https://github.com/milvus-io/milvus/pull/32976">(#32976</a>)</li>
<li>Rendre le compacteur capable d'effacer les segments vides<a href="https://github.com/milvus-io/milvus/pull/32821">(#32821</a>)</li>
<li>Remplissage du numéro d'entrée du deltalog et de l'intervalle de temps dans les compactions l0<a href="https://github.com/milvus-io/milvus/pull/33004">(#33004</a>)</li>
<li>Correction d'un crash de proxy dû à une course aux données du cache du leader du shard<a href="https://github.com/milvus-io/milvus/pull/32971">(#32971</a>)</li>
<li>Correction de l'unité de temps pour la métrique de l'index de charge<a href="https://github.com/milvus-io/milvus/pull/32935">(#32935</a>)</li>
<li>Correction d'un problème où un segment sur un noeud de requête s'arrêtant ne pouvait pas être libéré avec succès<a href="https://github.com/milvus-io/milvus/pull/32929">(#32929</a>)</li>
<li>Correction de l'estimation des ressources d'index<a href="https://github.com/milvus-io/milvus/pull/32842">(#32842</a>)</li>
<li>Définition du point de contrôle du canal à la position delta<a href="https://github.com/milvus-io/milvus/pull/32878">(#32878</a>)</li>
<li>Fait que syncmgr verrouille la clé avant de retourner le futur<a href="https://github.com/milvus-io/milvus/pull/32865">(#32865</a>)</li>
<li>S'assurer que l'index inversé n'a qu'un seul segment<a href="https://github.com/milvus-io/milvus/pull/32858">(#32858</a>)</li>
<li>Correction du déclenchement du compactage choisissant deux segments identiques<a href="https://github.com/milvus-io/milvus/pull/32800">(#32800</a>)</li>
<li>Correction d'un problème où le nom de la partition ne pouvait pas être spécifié dans l'importation de binlog<a href="https://github.com/milvus-io/milvus/pull/32730">(#32730</a>, <a href="https://github.com/milvus-io/milvus/pull/33027">#33027</a>)</li>
<li>Rendre la colonne dynamique optionnelle dans l'importation de parquet<a href="https://github.com/milvus-io/milvus/pull/32738">(#32738</a>)</li>
<li>Suppression de la vérification de l'auto ID lors de l'insertion de données<a href="https://github.com/milvus-io/milvus/pull/32775">(#32775</a>)</li>
<li>Validation du nombre de lignes pour les données des champs d'insertion avec le schéma<a href="https://github.com/milvus-io/milvus/pull/32770">(#32770</a>)</li>
<li>Ajout d'un wrapper et d'un keepalive pour les IDs de CTraceContext<a href="https://github.com/milvus-io/milvus/pull/32746">(#32746</a>)</li>
<li>Correction d'un problème où le nom de la base de données n'était pas trouvé dans l'objet méta datacoord<a href="https://github.com/milvus-io/milvus/pull/33412">(#33412</a>)</li>
<li>Synchronisation du segment abandonné pour la partition abandonnée<a href="https://github.com/milvus-io/milvus/pull/33332">(#33332</a>)</li>
<li>Correction de l'échec de la collecte des métriques de quotaCenter en raison de paramètres incorrects<a href="https://github.com/milvus-io/milvus/pull/33399">(#33399</a>)</li>
</ul>
<h2 id="v241" class="common-anchor-header">v2.4.1<button data-href="#v241" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 6 mai 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Java</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.1</td><td>2.4.1</td><td>2.4.0</td><td>2.4.2</td></tr>
</tbody>
</table>
<p>La version 2.4.1 de Milvus apporte de nombreuses améliorations et corrections de bogues qui visent à améliorer les performances, l'observabilité et la stabilité du logiciel. Ces améliorations comprennent une API déclarative pour les groupes de ressources, une fonctionnalité améliorée d'insertion en bloc qui prend en charge les types de données vectorielles Float16/BFloat16, un mécanisme affiné de collecte des ordures (GC) qui réduit les opérations de liste pour le stockage des objets, et d'autres changements liés à l'optimisation des performances. En outre, les corrections de bogues abordent des problèmes tels que les erreurs de compilation, l'échec des correspondances floues sur les caractères de nouvelle ligne, les types de données de paramètres incorrects pour les interfaces RESTful, et les erreurs soulevées par BulkInsert sur les fichiers numpy lorsque les champs dynamiques sont activés.</p>
<h3 id="Breaking-changes" class="common-anchor-header">Changements de rupture</h3><ul>
<li>Suppression de la prise en charge de la suppression avec une expression de filtre vide.<a href="https://github.com/milvus-io/milvus/pull/32472">(#32472</a>)</li>
</ul>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Ajout du support des types de données vectorielles Float16/BFloat16 dans l'insertion en bloc<a href="https://github.com/milvus-io/milvus/pull/32157">(#32157</a>)</li>
<li>Amélioration des vecteurs flottants épars pour supporter la recherche brute d'itérateur et la recherche d'intervalle<a href="https://github.com/milvus-io/milvus/pull/32635">(#32635</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Ajout d'une api déclarative pour les groupes de ressources<a href="https://github.com/milvus-io/milvus/pull/31930">(#31930</a>, <a href="https://github.com/milvus-io/milvus/pull/32297">#32297</a>, <a href="https://github.com/milvus-io/milvus/pull/32536">#32536</a>, <a href="https://github.com/milvus-io/milvus/pull/32666">#32666</a>)</li>
<li>Réécriture de l'observateur de collection dans QueryCoord pour le rendre orienté vers les tâches<a href="https://github.com/milvus-io/milvus/pull/32441">(#32441</a>)</li>
<li>Refonte de la structure de données utilisée dans le SyncManager de DataNode pour réduire l'utilisation de la mémoire et prévenir les erreurs<a href="https://github.com/milvus-io/milvus/pull/32673">(#32673</a>)</li>
<li>Révision de l'implémentation du garbage collection pour minimiser les opérations de liste associées au stockage des objets<a href="https://github.com/milvus-io/milvus/pull/31740">(#31740</a>)</li>
<li>Réduction de l'utilisation du processeur lorsque le nombre de collections est élevé<a href="https://github.com/milvus-io/milvus/pull/32245">(#32245</a>)</li>
<li>Amélioration de la gestion de milvus.yaml en générant automatiquement les éléments de configuration pertinents dans le fichier milvus.yaml par le biais du code<a href="https://github.com/milvus-io/milvus/pull/31832">(#31832</a>, <a href="https://github.com/milvus-io/milvus/pull/32357">#32357</a>)</li>
<li>Amélioration des performances de la requête en récupérant les données après avoir effectué une réduction locale<a href="https://github.com/milvus-io/milvus/pull/32346">(#32346</a>)</li>
<li>Ajout de l'option WithBlock pour la création de clients etcd<a href="https://github.com/milvus-io/milvus/pull/32641">(#32641</a>)</li>
<li>Utilisation de l'identifiant client_request_id spécifié par le client comme TraceID si le client le fournit<a href="https://github.com/milvus-io/milvus/pull/32264">(#32264</a>)</li>
<li>Ajout d'un label db aux métriques pour les opérations de suppression et d'insertion en masse<a href="https://github.com/milvus-io/milvus/pull/32611">(#32611</a>)</li>
<li>Ajout d'une logique permettant d'ignorer la vérification par la configuration pour les colonnes AutoID et PartitionKey<a href="https://github.com/milvus-io/milvus/pull/32592">(#32592</a>)</li>
<li>Amélioration des erreurs liées à l'authentification<a href="https://github.com/milvus-io/milvus/pull/32253">(#32253</a>)</li>
<li>Amélioration des journaux d'erreurs pour AllocSegmentID dans DataCoord<a href="https://github.com/milvus-io/milvus/pull/32351">(#32351</a>, <a href="https://github.com/milvus-io/milvus/pull/32335">#32335</a>)</li>
<li>Suppression des métriques en double<a href="https://github.com/milvus-io/milvus/pull/32380">(#32380</a>, <a href="https://github.com/milvus-io/milvus/pull/32308">#32308</a>) et nettoyage des métriques inutilisées<a href="https://github.com/milvus-io/milvus/pull/32404">(#32404</a>, <a href="https://github.com/milvus-io/milvus/pull/32515">#32515</a>)</li>
<li>Ajout d'une option de configuration pour contrôler l'activation ou non de la fonctionnalité partitionKey<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>Ajout d'une option de configuration pour contrôler la quantité maximale de données qui peuvent être insérées dans une seule requête<a href="https://github.com/milvus-io/milvus/pull/32433">(#32433</a>)</li>
<li>Paralléliser l'opération applyDelete au niveau du segment pour accélérer le traitement des messages Delete par le Delegator<a href="https://github.com/milvus-io/milvus/pull/32291">(#32291</a>)</li>
<li>Utilisation de l'index<a href="https://github.com/milvus-io/milvus/pull/32232">(#32232</a>, <a href="https://github.com/milvus-io/milvus/pull/32505">#32505</a>, <a href="https://github.com/milvus-io/milvus/pull/32533">#32533</a>, <a href="https://github.com/milvus-io/milvus/pull/32595">#32595</a>) et du cache d'ajout<a href="https://github.com/milvus-io/milvus/pull/32580">(#32580</a>) pour accélérer les opérations de filtrage fréquentes dans QueryCoord.</li>
<li>Réécriture de la structure des données<a href="https://github.com/milvus-io/milvus/pull/32273">(#32273</a>) et refactorisation du code<a href="https://github.com/milvus-io/milvus/pull/32389">(#32389</a>) pour accélérer les opérations courantes dans DataCoord.</li>
<li>Suppression d'openblas de conan<a href="https://github.com/milvus-io/milvus/pull/32002">(#32002</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction du build milvus dans rockylinux8<a href="https://github.com/milvus-io/milvus/pull/32619">(#32619</a>)</li>
<li>Correction des erreurs de compilation pour SVE sur ARM<a href="https://github.com/milvus-io/milvus/pull/32463">(#32463</a>, <a href="https://github.com/milvus-io/milvus/pull/32270">#32270</a>)</li>
<li>Correction du problème de crash sur les images GPU basées sur ARM<a href="https://github.com/milvus-io/milvus/pull/31980">(#31980</a>)</li>
<li>Correction de la requête regex qui ne peut pas gérer le texte avec une nouvelle ligne<a href="https://github.com/milvus-io/milvus/pull/32569">(#32569</a>)</li>
<li>Correction de la recherche obtenant un résultat vide causé par GetShardLeaders retournant une liste de noeuds vide<a href="https://github.com/milvus-io/milvus/pull/32685">(#32685</a>)</li>
<li>Correction de l'erreur soulevée par BulkInsert lors de la rencontre de champs dynamiques dans les fichiers numpy<a href="https://github.com/milvus-io/milvus/pull/32596">(#32596</a>)</li>
<li>Correction de bugs liés à l'interface RESTFulV2, y compris une correction importante qui permet aux paramètres numériques dans les requêtes d'accepter une entrée numérique au lieu d'une chaîne de caractères<a href="https://github.com/milvus-io/milvus/pull/32485">(#32485</a>, <a href="https://github.com/milvus-io/milvus/pull/32355">#32355</a>)</li>
<li>Correction d'une fuite de mémoire dans le proxy en supprimant l'événement "watching config" dans le limiteur de vitesse<a href="https://github.com/milvus-io/milvus/pull/32313">(#32313</a>)</li>
<li>Correction du problème où le limiteur de taux rapporte incorrectement que la partition ne peut pas être trouvée lorsque partitionName n'est pas spécifié<a href="https://github.com/milvus-io/milvus/pull/32647">(#32647</a>)</li>
<li>Ajout d'une détection entre les cas où la collection est dans l'état de récupération et où elle n'est pas chargée dans le type d'erreur.<a href="https://github.com/milvus-io/milvus/pull/32447">(#32447</a>)</li>
<li>Correction de la métrique négative du nombre d'entités interrogeables<a href="https://github.com/milvus-io/milvus/pull/32361">(#32361</a>)</li>
</ul>
<h2 id="v240" class="common-anchor-header">v2.4.0<button data-href="#v240" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 17 avril 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>2.4.0</td><td>2.4.0</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer le lancement officiel de Milvus 2.4.0. S'appuyant sur les bases solides de la version 2.4.0-rc.1, nous nous sommes concentrés sur la résolution des bogues critiques signalés par nos utilisateurs, tout en préservant les fonctionnalités existantes. En outre, Milvus 2.4.0 introduit une série d'optimisations visant à accroître les performances du système, à améliorer l'observabilité grâce à l'incorporation de diverses mesures et à rationaliser la base de code pour une plus grande simplicité.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Support des connexions MinIO TLS<a href="https://github.com/milvus-io/milvus/pull/31396">(#31396</a>, <a href="https://github.com/milvus-io/milvus/pull/31618">#31618</a>)</li>
<li>Support d'AutoIndex pour les champs scalaires<a href="https://github.com/milvus-io/milvus/pull/31593">(#31593</a>)</li>
<li>Refactorisation de la recherche hybride pour des chemins d'exécution cohérents avec la recherche régulière<a href="https://github.com/milvus-io/milvus/pull/31742">(#31742</a>, <a href="https://github.com/milvus-io/milvus/pull/32178">#32178</a>)</li>
<li>Filtrage accéléré grâce au refactoring de bitset et bitset_view<a href="https://github.com/milvus-io/milvus/pull/31592">(#31592</a>, <a href="https://github.com/milvus-io/milvus/pull/31754">#31754</a>, <a href="https://github.com/milvus-io/milvus/pull/32139">#32139</a>)</li>
<li>Les tâches d'importation prennent désormais en charge l'attente de l'achèvement de l'index des données<a href="https://github.com/milvus-io/milvus/pull/31733">(#31733</a>)</li>
<li>Amélioration de la compatibilité des importations<a href="https://github.com/milvus-io/milvus/pull/32121">(#32121</a>), de la planification des tâches<a href="https://github.com/milvus-io/milvus/pull/31475">(#31475</a>), et des limites sur la taille et le nombre de fichiers importés<a href="https://github.com/milvus-io/milvus/pull/31542">(#31542</a>)</li>
<li>Efforts de simplification du code incluant la standardisation de l'interface pour la vérification de type<a href="https://github.com/milvus-io/milvus/pull/31945">(#31945</a>, <a href="https://github.com/milvus-io/milvus/pull/31857">#31857</a>), la suppression du code et des métriques obsolètes<a href="https://github.com/milvus-io/milvus/pull/32079">(#32079</a>, <a href="https://github.com/milvus-io/milvus/pull/32134">#32134</a>, <a href="https://github.com/milvus-io/milvus/pull/31535">#31535</a>, <a href="https://github.com/milvus-io/milvus/pull/32211">#32211</a>, <a href="https://github.com/milvus-io/milvus/pull/31935">#31935</a>), et la normalisation des noms de constantes<a href="https://github.com/milvus-io/milvus/pull/31515">(#31515</a>).</li>
<li>Nouvelle métrique pour QueryCoord current target channel check point lag latency<a href="https://github.com/milvus-io/milvus/pull/31420">(#31420</a>)</li>
<li>Nouveau label db pour les métriques communes<a href="https://github.com/milvus-io/milvus/pull/32024">(#32024</a>)</li>
<li>Nouvelles métriques concernant le nombre d'entités supprimées, indexées et chargées, avec l'inclusion d'étiquettes telles que collectionName et dbName<a href="https://github.com/milvus-io/milvus/pull/31861">(#31861</a>)</li>
<li>Amélioration de la gestion des erreurs pour les types de vecteurs non concordants<a href="https://github.com/milvus-io/milvus/pull/31766">(#31766</a>)</li>
<li>Prise en charge de l'affichage d'erreurs au lieu d'un plantage lorsque l'index ne peut pas être construit<a href="https://github.com/milvus-io/milvus/pull/31845">(#31845</a>)</li>
<li>Prise en charge de l'invalidation du méta-cache de la base de données lors de l'abandon d'une base de données<a href="https://github.com/milvus-io/milvus/pull/32092">(#32092</a>)</li>
<li>Refonte de l'interface pour la distribution des canaux<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) et la gestion de la vue du leader<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Refactorisation de l'interface du gestionnaire de distribution des canaux<a href="https://github.com/milvus-io/milvus/pull/31814">(#31814</a>) et Refactorisation de l'interface du gestionnaire de vue du leader<a href="https://github.com/milvus-io/milvus/pull/32127">(#32127</a>)</li>
<li>Traitement par lots<a href="https://github.com/milvus-io/milvus/pull/31632">(#31632</a>), ajout d'informations de mappage<a href="https://github.com/milvus-io/milvus/pull/32234">(#32234</a>, <a href="https://github.com/milvus-io/milvus/pull/32249">#32249</a>), et éviter l'utilisation de verrou<a href="https://github.com/milvus-io/milvus/pull/31787">(#31787</a>) pour accélérer les opérations fréquemment invoquées.</li>
</ul>
<h3 id="Breaking-Changes" class="common-anchor-header">Ruptures</h3><ul>
<li>Abandon de la recherche de regroupement sur les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/31735">(#31735</a>)</li>
<li>Abandon de la recherche par regroupement avec la recherche hybride<a href="https://github.com/milvus-io/milvus/pull/31812">(#31812</a>)</li>
<li>Abandon de l'index HNSW sur les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/31883">(#31883</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Corrections de bugs</h3><ul>
<li>Amélioration des vérifications des types de données et des valeurs pour les requêtes et les insertions afin d'éviter les plantages<a href="https://github.com/milvus-io/milvus/pull/31478">(#31478</a>, <a href="https://github.com/milvus-io/milvus/pull/31653">#31653</a>, <a href="https://github.com/milvus-io/milvus/pull/31698">#31698</a>, <a href="https://github.com/milvus-io/milvus/pull/31842">#31842</a>, <a href="https://github.com/milvus-io/milvus/pull/32042">#32042</a>, <a href="https://github.com/milvus-io/milvus/pull/32251">#32251</a>, <a href="https://github.com/milvus-io/milvus/pull/32204">#32204</a>)</li>
<li>Correction des bogues de l'API RESTful<a href="https://github.com/milvus-io/milvus/pull/32160">(#32160</a>)</li>
<li>Amélioration de la prédiction de l'utilisation des ressources de l'index inversé<a href="https://github.com/milvus-io/milvus/pull/31641">(#31641</a>)</li>
<li>Résolution des problèmes de connexion avec etcd lorsque l'autorisation est activée<a href="https://github.com/milvus-io/milvus/pull/31668">(#31668</a>)</li>
<li>Mise à jour de sécurité pour le serveur nats<a href="https://github.com/milvus-io/milvus/pull/32023">(#32023</a>)</li>
<li>Stockage des fichiers d'index inversé dans un chemin de stockage local de QueryNode au lieu de /tmp<a href="https://github.com/milvus-io/milvus/pull/32210">(#32210</a>)</li>
<li>Correction des fuites de mémoire du datacoord pour collectionInfo<a href="https://github.com/milvus-io/milvus/pull/32243">(#32243</a>)</li>
<li>Correction de bogues liés à fp16/bf16 pouvant causer une panique du système<a href="https://github.com/milvus-io/milvus/pull/31677">(#31677</a>, <a href="https://github.com/milvus-io/milvus/pull/31841">#31841</a>, <a href="https://github.com/milvus-io/milvus/pull/32196">#32196</a>)</li>
<li>Résolution de problèmes avec la recherche de groupement renvoyant des résultats insuffisants<a href="https://github.com/milvus-io/milvus/pull/32151">(#32151</a>)</li>
<li>Ajustement de la recherche avec itérateurs pour gérer plus efficacement les décalages dans l'étape de réduction et garantir des résultats adéquats lorsque "reduceStopForBest" est activé<a href="https://github.com/milvus-io/milvus/pull/32088">(#32088</a>)</li>
</ul>
<h2 id="v240-rc1" class="common-anchor-header">v2.4.0-rc.1<button data-href="#v240-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 20 mars 2024</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th></tr>
</thead>
<tbody>
<tr><td>2.4.0-rc.1</td><td>2.4.0</td></tr>
</tbody>
</table>
<p>Cette version introduit plusieurs fonctionnalités basées sur des scénarios :</p>
<ul>
<li><p><strong>Nouvel index GPU - CAGRA</strong>: Grâce à la contribution de NVIDIA, ce nouvel index GPU offre un gain de performance de 10 fois, en particulier pour les recherches par lots. Pour plus de détails, voir <a href="/docs/fr/gpu_index.md">Index GPU</a>.</p></li>
<li><p><strong>Recherche</strong><strong>multi-vectorielle</strong> et <strong>hybride</strong>: Cette fonctionnalité permet de stocker des embeddings vectoriels provenant de plusieurs modèles et d'effectuer des recherches hybrides. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/multi-vector-search.md">Recherche hybride</a>.</p></li>
<li><p><strong>Vecteurs épars</strong>: Idéaux pour l'interprétation et l'analyse des mots-clés, les vecteurs épars sont désormais pris en charge pour le traitement dans votre collection. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/sparse_vector.md">Vecteurs épars</a>.</p></li>
<li><p><strong>Recherche par regroupement</strong>: L'agrégation catégorielle améliore la mémorisation au niveau des documents pour les applications de génération assistée par récupération (RAG). Pour plus d'informations, reportez-vous à la section <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Recherche par regroupement</a>.</p></li>
<li><p><strong>Index inversé</strong> et <strong>correspondance floue</strong>: ces fonctionnalités améliorent la recherche par mot-clé pour les champs scalaires. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/index-scalar-fields.md">Champs scalaires indexés</a> et <a href="/docs/fr/single-vector-search.md#filtered-search">recherche filtrée</a>.</p></li>
</ul>
<h3 id="New-Features" class="common-anchor-header">Nouvelles fonctionnalités</h3><h4 id="GPU-Index---CAGRA" class="common-anchor-header">Index GPU - CAGRA</h4><p>Nous tenons à exprimer notre sincère gratitude à l'équipe de NVIDIA pour sa contribution inestimable à CAGRA, un index de graphes basé sur le GPU à la pointe de la technologie (SoTA) qui peut être utilisé en ligne.</p>
<p>Contrairement aux index GPU précédents, CAGRA démontre une supériorité écrasante même dans les requêtes par petits lots, un domaine où les index CPU excellent traditionnellement. En outre, les performances de CAGRA dans les requêtes par lots importants et la vitesse de construction de l'index, domaines dans lesquels les index GPU brillent déjà, sont réellement inégalées.</p>
<p>Un exemple de code peut être trouvé dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py">example_gpu_cagra.py</a>.</p>
<h4 id="Sparse-Vector-Beta" class="common-anchor-header">Vecteur Sparse (Beta)</h4><p>Dans cette version, nous introduisons un nouveau type de champ vectoriel appelé vecteur clairsemé. Les vecteurs épars sont différents de leurs homologues denses car ils ont tendance à avoir un nombre de dimensions plus élevé de plusieurs magnitudes avec seulement une poignée de dimensions non nulles. Cette caractéristique offre une meilleure interprétabilité en raison de sa nature basée sur les termes et peut être plus efficace dans certains domaines. Les modèles peu denses appris, tels que SPLADEv2/BGE-M3, se sont révélés très utiles pour les tâches courantes de classement de première étape. Le principal cas d'utilisation de cette nouvelle fonctionnalité de Milvus est de permettre une recherche sémantique approximative efficace du plus proche voisin sur des vecteurs épars générés par des modèles neuronaux tels que SPLADEv2/BGE-M3 et des modèles statistiques tels que l'algorithme BM25. Milvus prend désormais en charge le stockage, l'indexation et la recherche efficaces et performants (MIPS, Maximum Inner Product Search) de vecteurs épars.</p>
<p>Un exemple de code se trouve dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py">hello_sparse.py</a>.</p>
<h4 id="Multi-Embedding---Hybrid-Search" class="common-anchor-header">Multi-intégration et recherche hybride</h4><p>La prise en charge des vecteurs multiples est la pierre angulaire des applications qui nécessitent le traitement de données multi-modèles ou un mélange de vecteurs denses et peu denses. Avec le support multi-vecteur, vous pouvez maintenant :</p>
<ul>
<li>Stocker les encastrements vectoriels générés pour des échantillons de texte, d'image ou de son non structurés à partir de plusieurs modèles.</li>
<li>Effectuer des recherches ANN qui incluent plusieurs vecteurs de chaque entité.</li>
<li>Personnaliser les stratégies de recherche en attribuant des poids aux différents modèles d'intégration.</li>
<li>Expérimenter divers modèles d'intégration pour trouver la combinaison de modèles optimale.</li>
</ul>
<p>La prise en charge de plusieurs vecteurs permet de stocker, d'indexer et d'appliquer des stratégies de reclassement à plusieurs champs de vecteurs de types différents, tels que FLOAT_VECTOR et SPARSE_FLOAT_VECTOR, dans une collection. Actuellement, deux stratégies de reclassement sont disponibles : <strong>Reciprocal Rank Fusion (RRF)</strong> et <strong>Average Weighted Scoring (notation moyenne pondérée</strong>). Ces deux stratégies combinent les résultats de recherche de différents champs vectoriels en un ensemble de résultats unifié. La première stratégie donne la priorité aux entités qui apparaissent systématiquement dans les résultats de recherche de différents champs vectoriels, tandis que l'autre stratégie attribue des poids aux résultats de recherche de chaque champ vectoriel afin de déterminer leur importance dans l'ensemble de résultats final.</p>
<p>Un exemple de code se trouve dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py">hybrid_search.py</a>.</p>
<h4 id="Inverted-Index-and-Fuzzy-Match" class="common-anchor-header">Index inversé et correspondance floue</h4><p>Dans les versions précédentes de Milvus, les index de recherche binaire basés sur la mémoire et les index Marisa Trie étaient utilisés pour l'indexation des champs scalaires. Cependant, ces méthodes étaient gourmandes en mémoire. La dernière version de Milvus utilise désormais l'index inversé basé sur Tantivy, qui peut être appliqué à tous les types de données numériques et de chaînes. Ce nouvel index améliore considérablement les performances des requêtes scalaires, en réduisant de dix fois les requêtes de mots-clés dans les chaînes de caractères. En outre, l'index inversé consomme moins de mémoire, grâce à des optimisations supplémentaires dans la compression des données et le mécanisme de stockage en mémoire (MMap) de la structure d'indexation interne.</p>
<p>Cette version prend également en charge les correspondances floues dans le filtrage scalaire en utilisant des préfixes, des infixes et des suffixes.</p>
<p>Des exemples de code peuvent être trouvés dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py">inverted_index_example.py</a> et <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py">fuzzy_match.py</a>.</p>
<h4 id="Grouping-Search" class="common-anchor-header">Regroupement de la recherche</h4><p>Vous pouvez maintenant regrouper les résultats de la recherche par les valeurs d'un champ scalaire spécifique. Cela permet aux applications RAG d'implémenter le rappel au niveau du document. Considérons une collection de documents, chaque document est divisé en plusieurs passages. Chaque passage est représenté par un vecteur intégré et appartient à un document. Pour trouver les documents les plus pertinents au lieu de disperser les passages, vous pouvez inclure l'argument group_by_field dans l'opération search() pour regrouper les résultats par l'ID du document.</p>
<p>Un exemple de code se trouve dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py">example_group_by.py.</a></p>
<h4 id="Float16-and-BFloat--Vector-DataType" class="common-anchor-header">Type de données vectorielles Float16 et BFloat</h4><p>L'apprentissage automatique et les réseaux neuronaux utilisent souvent des types de données de demi-précision, tels que Float16 et BFloat- Bien que ces types de données puissent améliorer l'efficacité des requêtes et réduire l'utilisation de la mémoire, ils s'accompagnent d'une réduction de la précision. Avec cette version, Milvus prend désormais en charge ces types de données pour les champs vectoriels.</p>
<p>Des exemples de code se trouvent dans <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py">float16_example.py</a> et <a href="https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py">bfloat16_example.py</a>.</p>
<h3 id="Upgraded-Architecture" class="common-anchor-header">Architecture améliorée</h3><h4 id="L0-Segment" class="common-anchor-header">Segment L0</h4><p>Cette version inclut un nouveau segment appelé segment L0, conçu pour enregistrer les données supprimées. Ce segment compacte périodiquement les enregistrements supprimés stockés et les divise en segments scellés, ce qui réduit le nombre de vidanges de données nécessaires pour les petites suppressions et laisse une faible empreinte de stockage. Grâce à ce mécanisme, Milvus sépare complètement les compactions de données des vidanges de données, ce qui améliore les performances des opérations de suppression et d'insertion.</p>
<h4 id="Refactored-BulkInsert" class="common-anchor-header">BulkInsert remanié</h4><p>Cette version introduit également une logique d'insertion en bloc améliorée. Cela vous permet d'importer plusieurs fichiers en une seule demande d'insertion en bloc. Avec la version remaniée, les performances et la stabilité de l'insertion en bloc ont été améliorées de manière significative. L'expérience de l'utilisateur a également été améliorée, notamment grâce à une limitation fine du débit et à des messages d'erreur plus conviviaux. En outre, vous pouvez facilement accéder aux points d'extrémité d'insertion en bloc via l'API RESTful de Milvus.</p>
<h4 id="Memory-mapped-Storage" class="common-anchor-header">Stockage en mémoire</h4><p>Milvus utilise le stockage en mémoire (MMap) pour optimiser son utilisation de la mémoire. Au lieu de charger le contenu du fichier directement dans la mémoire, ce mécanisme mappe le contenu du fichier dans la mémoire. Cette approche s'accompagne d'une dégradation des performances.  En activant le MMap pour une collection indexée par HNSW sur un hôte doté de 2 CPU et de 8 Go de RAM, vous pouvez charger 4 fois plus de données avec une dégradation des performances inférieure à 10 %.</p>
<p>En outre, cette version permet également un contrôle dynamique et précis de MMap sans qu'il soit nécessaire de redémarrer Milvus.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/mmap.md">Stockage MMap</a>.</p>
<h3 id="Others" class="common-anchor-header">Autres</h3><h4 id="Milvus-CDC" class="common-anchor-header">Milvus-CDC</h4><p>Milvus-CDC est un outil compagnon facile à utiliser pour capturer et synchroniser les données incrémentielles entre les instances Milvus, ce qui facilite la sauvegarde incrémentielle et la reprise après sinistre. Dans cette version, la stabilité de Milvus-CDC a été améliorée et sa fonctionnalité Change Data Capture (CDC) est désormais disponible de manière générale.</p>
<p>Pour en savoir plus sur Milvus-CDC, consultez le <a href="https://github.com/zilliztech/milvus-cdc">dépôt GitHub</a> et la <a href="/docs/fr/milvus-cdc-overview.md">présentation de Milvus-CDC</a>.</p>
<h4 id="Refined-MilvusClient-Interfaces" class="common-anchor-header">Interfaces MilvusClient affinées</h4><p>MilvusClient est une alternative facile à utiliser au module ORM. Il adopte une approche purement fonctionnelle pour simplifier les interactions avec le serveur. Au lieu de maintenir un pool de connexions, chaque MilvusClient établit une connexion gRPC avec le serveur. Le module MilvusClient a implémenté la plupart des fonctionnalités du module ORM. Pour en savoir plus sur le module MilvusClient, visitez <a href="https://github.com/milvus-io/pymilvus">pymilvus</a> et les <a href="/api-reference/pymilvus/v2.4.x/About.md">documents de référence</a>.</p>
