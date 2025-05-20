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
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.5.11 ! Cette version introduit de nouvelles fonctionnalités puissantes telles que la capacité multi-analyseur et la prise en charge élargie des tokenizers (Jieba, Lindera, ICU, Language Identifier). Nous avons également apporté plusieurs améliorations, notamment la mise à jour du pool de threads pour le chargement dynamique des segments et l'optimisation du filtrage des suppressions lors de l'importation de binlogs. Les principales corrections de bogues concernent les problèmes potentiels de chute de segments, les échecs de recherche BM25 et les erreurs de filtrage des statistiques JSON.</p>
<p>Nous vous encourageons à mettre à jour vers la version 2.5.11 pour profiter de ces améliorations et corrections !</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Ajout de la possibilité de configurer plusieurs analyseurs (tokenizers) pour la prise en charge de plusieurs langues et de sélectionner l'analyseur approprié en fonction de l'instruction des données d'entrée<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Amélioration de la fonctionnalité de l'analyseur BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Introduction d'une API <code translate="no">run_analyzer</code> pour les essais à blanc afin d'aider à analyser les résultats de la tokenisation. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble de l'analyseur</a>.</li>
<li>Tokenizers<ul>
<li>Ajout de la prise en charge de la personnalisation des paramètres du tokenizer Jieba.</li>
<li>Ajout de la prise en charge du tokenizer Lindera. Pour plus d'informations, reportez-vous à <a href="/docs/fr/lindera-tokenizer.md">Lindera</a>.</li>
<li>Ajout de la prise en charge du tokenizer ICU. Pour plus d'informations, voir <a href="/docs/fr/icu-tokenizer.md">ICU</a>.</li>
<li>Ajout d'un tokenizer Language Identifier pour la détection des langues.</li>
</ul></li>
<li>Filtres<ul>
<li>Extension de la prise en charge des langues pour le filtre intégré de mots vides. Pour plus d'informations, reportez-vous à <a href="/docs/fr/stop-filter.md">Stop</a>.</li>
<li>Ajout d'un filtre <code translate="no">remove_punct</code> pour supprimer les signes de ponctuation. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/removepunct-filter.md">Supprimer les signes de ponctuation</a>.</li>
<li>Ajout d'un filtre <code translate="no">regex</code> pour le filtrage de texte basé sur des motifs. Pour plus d'informations, voir <a href="/docs/fr/regex-filter.md">Regex.</a></li>
</ul></li>
</ul></li>
<li>Ajout de la prise en charge de la modification de la capacité maximale des champs de tableau<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Ajout de la prise en charge des expressions de plage binaire dans les index de chemin JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Ajout de la prise en charge des types de correspondance infixe et suffixe dans les statistiques JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Activation des mises à jour dynamiques de la taille du pool de threads de chargement de segments<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>Accélération du filtrage des suppressions lors de l'importation du binlog<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>Ajout de paramètres de surveillance pour le ratio du filtre d'expression<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Ajout d'une option de configuration pour forcer la reconstruction des index à la dernière version<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Amélioration du message d'erreur pour la politique de liste<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Adaptation de la gestion des traits d'union dans les en-têtes de métadonnées gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Mise à jour de la version Go vers 1.24.1 pour corriger les CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues</h3><ul>
<li>Correction d'un problème où les segments pouvaient ne pas être correctement abandonnés lors de l'abandon d'une partition<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Correction de l'insertion en masse pour utiliser la liste des champs d'entrée de l'exécuteur de fonction au lieu de la liste des champs du schéma<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>Correction des échecs de recherche BM25 survenant lorsque <code translate="no">avgdl</code> (longueur moyenne du document) est NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Correction des étiquettes inexactes dans les métriques QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Correction d'un problème où la création d'un index de statistiques JSON pouvait échouer si les données contenaient une carte vide<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Correction de l'API <code translate="no">AlterCollection</code> pour enregistrer correctement l'horodatage de la modification<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Correction d'une erreur de filtrage intermittente dans les statistiques JSON sous <code translate="no">ConjunctExpr</code> et amélioration de la logique de calcul du slot de tâche pour accélérer la construction des statistiques JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Correction d'une fuite de l'oracle IDF dans le calcul des statistiques BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Vérification que les sujets pré-créés sont vérifiés en premier lors de la validation du numéro du shard<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>Correction d'un rapport erroné de blocage survenant dans les tests unitaires<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 21 avril 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 offre de meilleures performances de recherche et de chargement, des rapports de mesures améliorés et une prise en charge étendue de SVE pour un calcul accéléré des mesures. Cette version comprend également de nombreuses corrections de bogues qui renforcent la stabilité et la correction. Nous vous encourageons à effectuer la mise à niveau ou à l'essayer : vos commentaires sont précieux pour nous aider à améliorer Milvus !</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Ignorer le rapport des métriques d'index pour les index inexistants<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Utilisation du mode de balayage pour LIKE même lorsqu'un index inversé existe<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Optimisation des performances pour les expressions LIKE<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>Optimisation du format d'index pour améliorer les performances de chargement<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful : rendre le timeout par défaut configurable<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>Activation du support SVE pour le calcul de la métrique L2 dans les fonctions FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bugs</h3><ul>
<li>Correction de l'index JSON qui ne fonctionne pas pour les filtres de chaînes<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Sauter la vérification de la dimension pour les champs non vectoriels dans la vérification préalable<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Modifier la collection met maintenant à jour le schéma correctement<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Mise à jour de la version de knowhere pour corriger la version macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Prévention d'une panique lors de l'énumération des index avant que l'initialisation de l'index de segment ne soit terminée<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Résolution d'une régression de performance en changeant un niveau de log<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Fermer le client avant de supprimer le client travailleur<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 11 avril 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer Milvus 2.5.9, qui améliore les performances des statistiques de clés JSON, les capacités d'indexation et plusieurs corrections de bogues critiques qui renforcent la stabilité et le traitement des données. Nous vous encourageons à mettre à niveau ou à essayer cette version et, comme toujours, vos commentaires sont très appréciés car nous continuons à affiner Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Prise en charge de l'omission de la normalisation des scores pour le reclassement pondéré<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Amélioration des performances de la construction de statistiques clés JSON en ajoutant des documents par lots<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Utilisation de <code translate="no">int32</code> lors de la création d'index de tableau pour les types d'éléments <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Alignement des résultats de la recherche brute avec le comportement de l'index JSON pour l'expression <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction d'un problème causant une confusion de traceID si le client envoie un traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Correction d'un crash potentiel dû à une utilisation incorrecte de <code translate="no">noexcept</code>, conduisant à des échecs IO<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Résolution d'une boucle infinie d'équilibre normal déclenchée après la suspension de l'équilibre<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>L'affichage des collections prend désormais en charge les objets accordés aux groupes de privilèges personnalisés<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Correction d'un échec de récupération des positions des canaux de réplication<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Correction d'une fuite potentielle de threads causée par les timeouts RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Ajout d'un bitmap clair pour le mode de saut de lot<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Correction d'un problème où la suppression d'un type d'index échouait dans le stockage distant en mode local<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Utilisation de <code translate="no">element_type</code> pour les opérateurs de tableau <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Suppression de la réinitialisation des métriques pour assurer un rapport précis<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Correction d'un bogue empêchant les données <code translate="no">null</code> d'être filtrées par des expressions <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Ignorer les segments croissants sans position de départ pour la politique de scellement<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>Evite la mise à jour des requêtes de recherche originales pendant les tentatives<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Correction d'une erreur de segmentation si <code translate="no">LoadArrowReaderFromRemote</code> s'exécute dans un chemin d'exception<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Correction des problèmes de balance manuelle et de vérification de la balance<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>Le schéma validé n'est pas <code translate="no">nil</code> pour les statistiques JSON avec <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Correction d'un bug de déplacement du curseur lors de la comparaison de deux colonnes<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Correction d'un crash lors de l'insertion de tableaux <code translate="no">null</code> et non nuls avec une mmap croissante ouverte<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Correction d'un problème de compilation pour arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Ajout d'un mode de contournement du pool de threads pour éviter de bloquer les opérations d'insertion/chargement en augmentant les index<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Correction des erreurs de format JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Correction d'une erreur 404 dans l'interface WebUI lorsque <code translate="no">http.enablepprof</code> est faux<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 1er avril 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer la sortie de Milvus 2.5.8, qui présente des améliorations au niveau des expressions JSON, de la validation UTF-8, de l'utilisation de la mémoire et de la logique d'équilibrage. Cette version inclut également de nombreuses corrections de bogues importantes pour améliorer la concurrence et le traitement des données. Nous vous encourageons à mettre à niveau ou à essayer Milvus, et comme toujours, vos commentaires nous aident à améliorer Milvus en permanence !</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li>Prise en charge des expressions JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Prise en charge de l'analyse de vecteurs épars à partir de structures Parquet dans les insertions en bloc<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Équilibre la collection avec le plus grand nombre de lignes en premier<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Prise en charge de la validation des chaînes UTF-8 lors de l'importation<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Ajout de la validation UTF-8 pour tous les champs VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Eviter les re-requêtes si la recherche hybride ne demande que le PK comme champ de sortie<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Amélioration des vues de tableaux pour optimiser l'utilisation de la mémoire<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>Ajout d'une configuration d'intervalle de déclenchement pour l'équilibrage automatique<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Conversion de plusieurs expressions OR en expressions IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Prise en charge de critères de compactage manuels détaillés<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Conservation des jetons bruts pour la journalisation d'audit<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Optimisation de l'utilisation du mutex de la méta DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Introduction des abonnements par lots dans <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction d'un crash impliquant une entrée nullable et des types de données mmap croissants<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Correction d'une perte potentielle de données lors d'opérations de suppression causée par des identifiants binlogs dupliqués<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Ajout de verrous d'index de champ pour <code translate="no">GetSegmentsIndexStates</code> afin d'éviter une panique potentielle lors de l'insertion pendant la création de la collection<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Correction des problèmes de concurrence dans l'enregistrement des consommateurs Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Récupération de tous les logs delta enfants pour le chargement des segments<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Correction des résultats erronés causés par l'utilisation de l'index JSON lorsque <code translate="no">iterative_filter</code> est spécifié<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Assurer une priorité plus élevée pour l'opération <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Correction de <code translate="no">WithGroupSize</code> lors de la réduction<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Augmentation du nombre de slots proportionnellement à l'augmentation de la taille du segment<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Définir le temps d'attente de la tâche avant la mise en file d'attente<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Correction du déséquilibre des canaux sur les DataNodes<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Mise en place de configurations par défaut correctes pour les slots de tâches<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK : Définir les drapeaux nullables selon FieldSchema pour l'insertion basée sur la ligne<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 21 mars 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.5.7, marquée par la nouvelle fonctionnalité JSON Path Index. Celle-ci vous permet de construire des index inversés sur des colonnes dynamiques ou JSON afin d'améliorer de manière significative les performances des requêtes. Parallèlement à cette nouvelle fonctionnalité, nous avons apporté de nombreuses améliorations et corrections de bogues pour une meilleure fiabilité, une gestion plus fine des erreurs et une plus grande facilité d'utilisation. Nous vous encourageons à effectuer la mise à niveau ou à l'essayer et, comme toujours, vos commentaires sont très appréciés car nous continuons à améliorer Milvus !</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités</h3><ul>
<li><strong>Index de chemin JSON</strong>: Pour répondre aux besoins des utilisateurs en matière de schémas dynamiques, Milvus 2.5.7 introduit la possibilité de créer des index sur les colonnes dynamiques et les colonnes JSON. Grâce à cette fonctionnalité, vous pouvez créer des index inversés pour des colonnes dynamiques ou des chemins JSON spécifiques, en contournant efficacement le processus de chargement JSON plus lent et en améliorant considérablement les performances des requêtes. Pour plus d'informations, voir <a href="/docs/fr/use-json-fields.md">Champ JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Réorganisation des sous-expressions pour les expressions conjonctives<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Ajout d'options de configuration pour <code translate="no">interimindex</code> afin de supporter les modes raffinés<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Utilisation des métriques de compteur correctes pour les calculs globaux de WA<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Rendre la configuration de l'élagage des segments rafraîchissable<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Ajouter une politique d'étanchéité des canaux basée sur le blocage de L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Affiner les métadonnées des tâches avec un verrouillage au niveau des clés<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Supprimer les étiquettes de collection et de partition inutiles des métriques<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Améliorer les messages d'erreur d'importation<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Éviter de convertir les tranches d'octets du corps en chaînes dans <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Enregistrer la position de départ des messages de suppression<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Prise en charge de la récupération des binlogs de segments avec la nouvelle interface <code translate="no">GetSegmentsInfo</code> <a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Utilisation de <code translate="no">newInsertDataWithFunctionOutputField</code> lors de l'importation de fichiers binlogs<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Correction d'un problème où les propriétés mmap ne s'appliquaient pas lors de la création d'une collection<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Ne pas supprimer le fichier des centroïdes lorsque l'échantillonnage échoue ; à la place, attendre le GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Correction des problèmes de perte de message pendant la recherche<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Suppression des cibles de retard après le répartiteur principal<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Ajout d'une entrée bitmap claire pour chaque boucle batch<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Protection de <code translate="no">GetSegmentIndexes</code> avec un RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Evite les erreurs de segmentation causées par la récupération d'ensembles de données vectorielles vides<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Correction du filtre "not-equal" de l'index JSON<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Correction du chargement de l'offset nul dans l'index inversé<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Correction de la logique de nettoyage des stats <code translate="no">jsonKey</code> et amélioration du filtre JSON key stats<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Correction des erreurs de pointeur JSON invalide<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>RBAC star privilege renvoie maintenant vide lors de l'énumération des politiques<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Evite la panique lorsqu'un champ n'existe pas dans le schéma dans QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Correction d'un problème de collection de référence pour la recherche/requête<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Gestion des lignes vides pour les vecteurs clairsemés<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Ajout d'une vérification des paramètres de type/index dupliqués lors de la création de collections<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Déplacement de <code translate="no">metaHeader</code> vers le client pour éviter les courses aux données<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 10 mars 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer la sortie de Milvus 2.5.6, qui présente de précieuses améliorations des chaînes d'outils, de la journalisation, des mesures et de la gestion des tableaux, ainsi que de nombreuses corrections de bogues pour une fiabilité et des performances accrues. Cette mise à jour comprend une gestion affinée de la concurrence, des tâches de compactage plus robustes et d'autres améliorations clés. Nous vous encourageons à la mettre à niveau ou à l'essayer, et comme toujours, nous apprécions vos commentaires pour nous aider à améliorer Milvus en permanence !</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><ul>
<li>Mise à jour de la chaîne d'outils Go vers 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Mise à jour de la version de Rust à 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Passage de la version Etcd à 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Vérification du type d'élément uniquement pour les tableaux non nuls<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Suppression des logs de débogage dans le gestionnaire de groupe de ressources (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Amélioration de la journalisation pour le résolveur gRPC<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Ajout de métriques pour les composants CGO asynchrones<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Nettoyage du cache d'emplacement des tessons après la libération d'une collection<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues</h3><ul>
<li>Correction d'une corruption de tableau causée par l'ignorance de la validité<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Correction d'un problème où les expressions <code translate="no">null</code> ne fonctionnaient pas pour les champs JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Correction d'un problème qui stockait le mauvais offset lors de la construction de Tantivy avec un champ nullable<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Suppression de l'exécution des statistiques pour les segments nuls<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Correction de l'estimation de la taille de la mémoire pour les tableaux<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Passage d'un pointeur de sac à dos pour éviter les compactions multiples<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Correction d'un problème de crash avec l'insertion en masse<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>Prévention des fuites de flux de messages en terminant correctement le distributeur principal<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Correction des problèmes de concurrence pour <code translate="no">null</code> offsets<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Correction de l'analyse de <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Amélioration de la gestion des erreurs et des tests unitaires pour la fonction <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Ajout d'une vérification des paramètres dupliqués pour <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Résolution d'un problème empêchant les tâches de compactage lorsque la taille dépasse la limite maximale<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Correction de la consommation en double du flux pour les segments invisibles<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Modification de la variable CMake pour passer à <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Correction d'un problème où l'abandon des propriétés de la base de données via RESTful échouait<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Utilisation d'un type de message différent pour l'API <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Correction d'une course aux données dans le cache delta des tâches<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Résolution d'une fuite dans le cache delta des tâches causée par des ID de tâches dupliqués<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 26 février 2025</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 apporte des améliorations significatives dans le nombre de collections et de partitions qu'un seul cluster peut prendre en charge. Il est désormais tout à fait possible d'exécuter Milvus avec 10 000 collections et 100 000 partitions. Cette version corrige également plusieurs bogues critiques, notamment des statistiques de correspondance manquantes et un problème de blocage dans les requêtes en plusieurs étapes. En outre, elle comprend de nombreuses améliorations en matière d'observabilité et de sécurité. Nous recommandons vivement à tous les utilisateurs de Milvus 2.5.x de procéder à une mise à niveau dès que possible.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Mise à jour des dépendances</h3><p>Mise à jour vers ETCD 3.5.18 pour corriger plusieurs CVE.</p>
<ul>
<li>[2.5] Mise à jour de raft vers cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Mise à jour de la version de Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Bogues critiques</h3><ul>
<li>[2.5] Utilisation du préfixe <code translate="no">text_log</code> pour le fichier de décalage nul textmatchindex<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] Ajout d'un pool de sous-tâches pour les tâches à plusieurs étapes afin d'éviter les blocages<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Corrections de bogues</h3><ul>
<li>[2.5] Correction du blocage du planificateur de tâches<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] Correction d'une condition de concurrence entraînant la création de plusieurs index identiques<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Correction d'un problème où des collections avec des noms dupliqués pouvaient être créées<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Correction de l'échec de la recherche d'une expression nulle<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Correction d'un bogue où la correspondance des préfixes échouait lorsque des caractères génériques se trouvaient dans le préfixe<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Cascade de sous-contextes annulés lorsque la requête HTTP n'aboutissait pas<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Correction de la fuite du cache delta de la tâche sur la tâche de réduction<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] Correction de la panique de querycoord dans un cas particulier<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Amélioration de la fonction isbalanced pour compter correctement les paires de guillemets<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Correction de l'exécution de tâches de compactage avec une valeur négative de -1<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Correction d'un bogue où un segment peut ne jamais être transféré du scellé à la vidange<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Suppression de la création de l'index de clé primaire lors du chargement de l'index pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Suppression de la création de l'index texte lorsque le segment était nul après le tri<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Correction de l'échec de la recherche de la position la plus ancienne<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Ignore l'option de croissance perdue lors de la recherche hybride<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Correction de l'impossibilité pour altercollection de modifier le niveau de cohérence<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>Correction de l'échec de l'importation en raison d'un nombre de lignes nul<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] Correction d'un résultat de module erroné pour un type long<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Ajout et utilisation du contexte de durée de vie pour le déclenchement du compactage<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Vérification de la libération de la collection avant la vérification de la cible<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Correction de l'échec de l'arrêt gracieux de Rootcoord et des ressources limitées de CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Suppression de la vérification de la taille des champs de chargement et des colonnes du schéma<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Suppression du paramètre mmap.enable dans le paramètre type lors de la création d'un index<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Ne transmettait pas le nom de l'index lors de la suppression des propriétés<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Les segments renvoient des résultats croissants et scellés<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Correction d'un problème de carte simultanée<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Résolution d'un conflit sur le test de la tâche QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Correction du blocage du chargement de la collection en cas de compactage ou de GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Correction d'une distribution inégale causée par une fuite du cache delta d'une tâche d'exécution<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] Retour prématuré lors du saut de l'index pk de chargement<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] Correction de la possibilité pour l'utilisateur root de lister toutes les collections même si <code translate="no">common.security.rootShouldBindRole</code> a été défini<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Correction d'une fuite dans le graphe de flux<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Utilisation du formateur d'éléments param pour éviter la superposition de setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Vérification du nom de privilège Metastore avec le nom de privilège "all"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Ajout d'un limiteur de vitesse pour RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Suppression du numéro de partition codé en dur dans le gestionnaire RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations</h3><h4 id="Observability" class="common-anchor-header">Observabilité</h4><ul>
<li>Ajout de la métrique monitor pour récupérer les données brutes<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Ajout d'une mesure de latence pour le vecteur get et amélioration du message d'erreur de limite de requête<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Ajout de métriques pour la file d'attente du proxy<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Exposition de plus de données de métriques<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Ajout de métriques pour l'expression parse<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] Ajout d'un champ de log DSL pour hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Saut de la mise à jour des métriques de l'index si l'index a été supprimé<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Vidage des informations pprof si la progression de l'arrêt du composant a été interrompue<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Ajout d'une API de gestion pour vérifier l'état de l'équilibre des querycoord<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Stats/Compactage/Optimisation du planificateur de tâches d'indexation</h4><ul>
<li>Affinement de la politique du planificateur de tâches d'index<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Limitation de la vitesse de génération des tâches de statistiques<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Ajout de configurations pour la planification du compactage<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Vérification du compactage L0 uniquement avec le même canal lors de la déclaration<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Ajustement de l'estimation de la mémoire du chargeur de segments pour les index intermédiaires<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Utilisation des positions de départ pour les segments de scellés par la politique de durée de vie<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Suppression des méta-tâches lorsque la tâche n'est plus nécessaire<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Accélération de la liste des objets lors de l'importation de binlog<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Prise en charge de la création de collections avec description<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Exportation de l'intervalle de temps de requête d'index dans la configuration<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Synchronisation de la valeur par défaut de proxy.maxTaskNum à 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Diminution de la limite d'instantanés de dump de 10w à 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Évite la copie d'octets de la chaîne à la tranche pour les pk batch existants<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Prise en charge du retour des propriétés configurables lors de la description de l'index<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Optimisation des performances des expressions pour certains points<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Optimisation du format de résultat de getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] Activation de l'observation de l'amplification de l'écriture<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Renvoi des résultats top-k lors d'une recherche dans RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Ajout du sucre syntaxique withEnableMatch<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] L'index provisoire supporte différents types d'index et plus de types de données (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Synchronisation des commits GoSDK de la branche master<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Conserver la cohérence de la mémoire et des méta du diffuseur<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Diffusion avec notification basée sur les évènements<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Amélioration du message d'erreur pour la vérification du schéma et de l'index<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Réinitialisation du type d'index automatique par défaut pour les scalaires<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Remise en file d'attente de la tâche de compactage L0 en cas d'échec de la pré-vérification<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
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
<p>Alimenté par <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 dispose d'analyseurs intégrés et d'une extraction de vecteurs épars, étendant l'API de la simple réception de vecteurs en entrée à l'acceptation directe de texte. Les informations statistiques de l'algorithme BM25 sont mises à jour en temps réel au fur et à mesure de l'insertion des données, ce qui améliore la convivialité et la précision. En outre, les vecteurs épars basés sur les algorithmes de voisinage le plus proche (ANN) offrent des performances plus puissantes que les systèmes de recherche par mots clés standard.</p>
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
