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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Vous trouverez dans cette section les notes de version pour chaque version publiée après la v2.6.0. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des mises à jour.</p>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 4 janvier 2026</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer la sortie de Milvus 2.6.8 ! Cette version introduit la mise en évidence des résultats de recherche, ce qui améliore considérablement l'expérience de recherche. Sous le capot, nous avons optimisé le traitement des requêtes, la planification des ressources et les mécanismes de mise en cache afin d'offrir des performances et une stabilité supérieures. En outre, cette version corrige des bogues critiques liés à la sécurité des données, à la gestion du stockage et à la concurrence. Nous recommandons vivement à tous les utilisateurs de passer à cette version pour bénéficier d'un environnement de production plus efficace et plus fiable.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Prise en charge de la recherche avec surligneur. Pour plus de détails, voir <a href="/docs/fr/text-highlighter.md">surligneur de texte</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Déplacement de la logique d'optimisation des requêtes vers le Proxy pour améliorer les performances<a href="https://github.com/milvus-io/milvus/pull/46549">(#46549</a>)</li>
<li>Optimisation des performances de l'opérateur <code translate="no">LIKE</code> en utilisant le tri STL<a href="https://github.com/milvus-io/milvus/pull/46535">(#46535</a>)</li>
<li>Possibilité d'exécution simultanée de tâches d'indexation de texte pour plusieurs champs<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>Prise en charge de la mise en pause du GC au niveau de la collection<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>Implémentation d'une politique de pénalité pour les QueryNodes afin de gérer l'épuisement des ressources<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>Optimisation de la mise en cache des données en faisant correspondre plusieurs groupes de lignes à une seule cellule de cache<a href="https://github.com/milvus-io/milvus/pull/46542">(#46542</a>)</li>
<li>Réduction de l'utilisation du CPU dans QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(#46615</a>)</li>
<li>Amélioration des performances de comparaison des données de <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46655">(#46655</a>)</li>
<li>Prise en charge des champs dynamiques nullables avec un objet JSON vide comme valeur par défaut<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>Prévention du scellement inutile de segments lors de la modification des propriétés d'une collection<a href="https://github.com/milvus-io/milvus/pull/46489">(#46489</a>)</li>
<li>Prise en charge du transfert DML et DQL dans le proxy pour RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Ajout d'un mécanisme de réessai pour les lectures de stockage d'objets en cas d'erreurs de limite de taux<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>Amélioration de la journalisation pour les méta-tables Proxy et RootCoord<a href="https://github.com/milvus-io/milvus/pull/46701">(#46701</a>)</li>
<li>Ajout d'une validation pour l'intégration de modèles et de types de champs de schéma<a href="https://github.com/milvus-io/milvus/pull/46422">(#46422</a>)</li>
<li>Introduction d'une durée de tolérance pour retarder les opérations d'abandon de collection<a href="https://github.com/milvus-io/milvus/pull/46252">(#46252</a>)</li>
<li>Amélioration de la planification des tâches d'indexation en estimant les créneaux basés sur la taille et le type des champs<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Ajout d'un mécanisme de repli pour les chemins d'écriture lors de l'accès au stockage d'objets sans support d'écriture conditionnelle<a href="https://github.com/milvus-io/milvus/pull/46022">(#46022</a>)</li>
<li>Optimisation de la logique de synchronisation de l'oracle IDF<a href="https://github.com/milvus-io/milvus/pull/46079">(#46079</a>)</li>
<li>Modification du port par défaut de RootCoord pour un port non éphémère<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>)</li>
<li>Ajout de métriques pour surveiller la mémoire en cache de Jemalloc<a href="https://github.com/milvus-io/milvus/pull/45973">(#45973</a>)</li>
<li>Amélioration de la précision de la métrique de quota de disque lorsque le quota du cluster change<a href="https://github.com/milvus-io/milvus/pull/46304">(#46304</a>)</li>
<li>Amélioration de l'observabilité des traces pour les expressions scalaires<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>Rejet des clés primaires dupliquées dans les requêtes de lot d'insertion<a href="https://github.com/milvus-io/milvus/pull/46035">(#46035</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Correction de la correspondance des préfixes RBAC ETCD pour éviter les fuites de données potentielles<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>Correction de la gestion incorrecte du chemin racine pour le mode de stockage local<a href="https://github.com/milvus-io/milvus/pull/46693">(#46693</a>)</li>
<li>Correction de la gestion des types mixtes <code translate="no">int64</code>/<code translate="no">float</code> dans les champs JSON<a href="https://github.com/milvus-io/milvus/pull/46682">(#46682</a>)</li>
<li>Correction des échecs de chargement des journaux de texte lors de la mise à niveau du cluster<a href="https://github.com/milvus-io/milvus/pull/46698">(#46698</a>)</li>
<li>Prévention de la suppression d'autres champs pendant le nettoyage des données brutes<a href="https://github.com/milvus-io/milvus/pull/46689">(#46689</a>)</li>
<li>Correction d'un échec lors de l'utilisation de la mise en évidence avec plusieurs analyseurs<a href="https://github.com/milvus-io/milvus/pull/46664">(#46664</a>)</li>
<li>Vérification que les journaux sont vidés lorsque le système d'exploitation quitte<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>Correction de l'erreur ETCD RPC size limit exceeded lors de l'abandon de collections<a href="https://github.com/milvus-io/milvus/pull/46645">(#46645</a>)</li>
<li>Correction des problèmes de réplication lorsque le serveur est inactif<a href="https://github.com/milvus-io/milvus/pull/46612">(#46612</a>)</li>
<li>Correction de la validation des valeurs par défaut invalides de <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46556">(#46556</a>)</li>
<li>Correction de la restauration des tâches de compactage pour assurer un nettoyage correct<a href="https://github.com/milvus-io/milvus/pull/46578">(#46578</a>)</li>
<li>Gestion unifiée des noeuds en lecture seule pour éviter de bloquer les tâches du canal d'équilibrage<a href="https://github.com/milvus-io/milvus/pull/46513">(#46513</a>)</li>
<li>Prévention des chutes de données de champ pour les groupes de colonnes à champs multiples<a href="https://github.com/milvus-io/milvus/pull/46425">(#46425</a>)</li>
<li>Suppression des clients proxy périmés lors de la réobservation d'ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>Correction de l'ordre de fusion de l'itérateur de chunk<a href="https://github.com/milvus-io/milvus/pull/46462">(#46462</a>)</li>
<li>Prévention de la création de groupes de consommateurs Kafka en désactivant l'auto-commit<a href="https://github.com/milvus-io/milvus/pull/46509">(#46509</a>)</li>
<li>Interdiction du rechargement à chaud des paramètres de stockage en niveaux<a href="https://github.com/milvus-io/milvus/pull/46438">(#46438</a>)</li>
<li>Activation de l'itérateur de recherche pour les vecteurs binaires<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>Correction d'une condition de course dans l'initialisation du stockage<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>Correction des requêtes de mise en évidence ne fonctionnant pas pour les recherches non-BM25<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>Correction d'un débordement de pile pendant le ramassage des ordures JSON<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>Garantie de tentatives lors de l'écriture de binlogs<a href="https://github.com/milvus-io/milvus/pull/46310">(#46310</a>)</li>
<li>Correction de la vérification de l'utilisation de l'index pour les champs JSON<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>Prévention du blocage de la mise à jour de la cible lorsque les répliques manquent de noeuds lors de la mise à l'échelle<a href="https://github.com/milvus-io/milvus/pull/46291">(#46291</a>)</li>
<li>Restriction du tokenizer <code translate="no">char_group</code> pour supporter uniquement les délimiteurs d'un octet<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>Suppression de l'utilisation de l'index de chemin JSON si le chemin de la requête inclut des nombres<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>Correction des erreurs de concaténation de chemin dans MinIO lorsque le chemin racine est "."<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>Correction des contrôles de santé faussement positifs en corrigeant le calcul de la métrique de retard de réplication<a href="https://github.com/milvus-io/milvus/pull/46122">(#46122</a>)</li>
<li>Correction de l'analyse RESTful v2 et des valeurs par défaut du schéma avec <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>Correction de la panique lors de la recherche de résultats vides avec des champs de géométrie de sortie<a href="https://github.com/milvus-io/milvus/pull/46231">(#46231</a>)</li>
<li>Ajout d'une validation de l'alignement des données des champs pour éviter les paniques lors des mises à jour partielles<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>Correction du problème de perte de base de données dans RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>Correction de l'utilisation incorrecte du contexte dans les sessions client gRPC<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>Correction d'un transfert d'autorisation incorrect dans RESTful v2 pendant les mises à jour<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>Correction d'une logique de réduction de structure incorrecte<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151</a>)</li>
<li>Correction du retour d'erreur du surligneur lorsque les résultats de la recherche sont vides<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111</a>)</li>
<li>Correction de la logique de chargement des données brutes pour les champs<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>Correction du problème de déplacement du curseur après avoir sauté des morceaux dans l'index<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>Correction de la logique de boucle pour <code translate="no">TIMESTAMPTZ</code> sortie d'index scalaire<a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>Correction de la définition des valeurs par défaut pour les champs géométriques via l'API RESTful<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>Implémentation de l'échec rapide si un composant n'est pas prêt au démarrage<a href="https://github.com/milvus-io/milvus/pull/46070">(#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 4 décembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version du SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 est une mise à jour de stabilisation critique pour la série 2.6.x. Cette version se concentre sur le renforcement du système contre les défaillances distribuées et sur l'optimisation de l'utilisation des ressources en cas de charge élevée. Avec des améliorations significatives dans le traitement des E/S, la gestion de la mémoire et l'intégration de Kubernetes, nous recommandons vivement à tous les utilisateurs de production de passer à cette version pour garantir une plus grande fiabilité et un fonctionnement plus fluide à l'échelle.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Ajout d'un point de terminaison <code translate="no">/livez</code> pour prendre en charge les sondes natives de liveness de Kubernetes, ce qui améliore la stabilité de l'orchestration des conteneurs<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>Ajout de la prise en charge des opérations <strong>GroupBy</strong> sur les champs <code translate="no">TIMESTAMPTZ</code>, améliorant les capacités d'analyse des séries temporelles<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>).</li>
<li>Prise en charge de <code translate="no">mmap</code> pour les indices de clés partagées du déchiquetage JSON afin de réduire l'empreinte RAM<a href="https://github.com/milvus-io/milvus/pull/45861">(#45861</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Prise en charge du transfert des requêtes DML dans le Proxy pour améliorer la disponibilité en écriture et la résilience du routage<a href="https://github.com/milvus-io/milvus/pull/45922">(#45922</a>).</li>
<li>Mise à jour d'etcd vers la version 3.5.23 pour résoudre les problèmes de stabilité et de performance<a href="https://github.com/milvus-io/milvus/pull/45953">(#45953</a>).</li>
<li>Ajout d'une gestion d'erreur robuste pour les crashs du serveur Etcd afin de prévenir les défaillances en cascade des composants<a href="https://github.com/milvus-io/milvus/pull/45633">(#45633</a>).</li>
<li>Réduction de la charge de Etcd en supprimant les observateurs coûteux pour les vérifications simples de la vivacité des sessions<a href="https://github.com/milvus-io/milvus/pull/45974">(#45974</a>).</li>
<li>Amélioration de la stratégie de rétention WAL pour mieux équilibrer l'utilisation du disque avec la sécurité de récupération des données<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>Prise en charge de la synchronisation d'écriture asynchrone pour les journaux afin d'éviter que le blocage des E/S disque n'affecte le chemin d'exécution principal<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>Utilisation forcée des E/S tamponnées pour les tâches de charge à haute priorité afin d'optimiser l'utilisation du cache de page du système d'exploitation et le débit<a href="https://github.com/milvus-io/milvus/pull/45958">(#45958</a>).</li>
<li>Optimisation de la stratégie <code translate="no">mmap</code> pour mapper des groupes de morceaux en un seul appel système, réduisant la surcharge du noyau pendant le chargement des segments<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>Amélioration de la précision de l'estimation de la mémoire pour le déchiquetage JSON afin d'éviter les OOM kills ou la sous-utilisation<a href="https://github.com/milvus-io/milvus/pull/45876">(#45876</a>).</li>
<li>Amélioration de l'estimation du chargement des segments pour prendre en compte les états d'éviction et d'échauffement<a href="https://github.com/milvus-io/milvus/pull/45891">(#45891</a>).</li>
<li>Ajout de contrôles d'annulation granulaires dans les opérateurs de requête pour permettre une terminaison plus rapide des requêtes interrompues ou temporisées<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>Suppression des vérifications redondantes du type de ressource dans la configuration des ressources de fichiers<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Interleaved Go et C++ logs into a unified stream to provide a correct chronological view for debugging<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>Résolution d'une condition de course où <code translate="no">LastConfirmedMessageID</code> pouvait être incorrect en cas d'écritures très concurrentielles<a href="https://github.com/milvus-io/milvus/pull/45874">(#45874</a>).</li>
<li>Correction d'une erreur de calcul dans l'agrégation de <code translate="no">allsearchcount</code> à partir de plusieurs résultats de recherche<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>Correction des expressions Term pour gérer correctement la logique de confinement des chaînes dans les tableaux JSON<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>Remplacement de <code translate="no">json.doc()</code> par <code translate="no">json.dom_doc()</code> dans <code translate="no">JSONContainsExpr</code> pour corriger les comportements d'analyse et améliorer les performances<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>Correction d'une panique dans les composants MixCoord en attente pendant la séquence d'arrêt<a href="https://github.com/milvus-io/milvus/pull/45898">(#45898</a>).</li>
<li>Correction du vérificateur de leader pour s'assurer que la distribution des segments est correctement synchronisée avec les nœuds en lecture seule<a href="https://github.com/milvus-io/milvus/pull/45991">(#45991</a>).</li>
<li>Assurer que <code translate="no">HandleNodeUp</code> est déclenché pendant la réobservation des nœuds pour maintenir une topologie d'équilibrage de charge correcte<a href="https://github.com/milvus-io/milvus/pull/45963">(#45963</a>).</li>
<li>Implémentation du repli vers le stockage WAL distant si le stockage WAL local devient indisponible<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li>Ajout de <code translate="no">EmptySessionWatcher</code> pour éviter les paniques lors de l'exécution en mode de liaison IndexNode<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>Garantie de la cohérence de l'état de la mémoire lors de la récupération des tâches de diffusion à partir des tampons de protocole<a href="https://github.com/milvus-io/milvus/pull/45788">(#45788</a>).</li>
<li>Résolution des problèmes de sécurité des threads dans les mises à jour du schéma de collection SegCore<a href="https://github.com/milvus-io/milvus/pull/45618">(#45618</a>).</li>
<li>Renforcement des contrôles d'accès (RBAC) pour <code translate="no">ListImport</code> et <code translate="no">GetImportProgress</code> APIs<a href="https://github.com/milvus-io/milvus/pull/45862">(#45862</a>).</li>
<li>Correction d'un bogue où BulkImport échouait si l'entrée contenait une liste de structures vide<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : November 21, 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer la sortie de Milvus 2.6.6, qui présente une série de nouvelles fonctionnalités puissantes, d'améliorations des performances et de corrections de bogues essentielles. Cette mise à jour introduit des fonctionnalités importantes telles que les types de données Geospatial et Timestampz, Boost ranker pour le rescoring, etc. Cette version comporte également de nombreuses améliorations cruciales des performances du filtrage scalaire. Plusieurs bogues critiques ont également été corrigés afin d'assurer une plus grande stabilité et fiabilité. Avec cette version, Milvus continue d'offrir une expérience plus robuste et plus efficace à tous les utilisateurs. Vous trouverez ci-dessous les principales caractéristiques de cette version.</p>
<ul>
<li>Type de données géospatiales : Milvus introduit la prise en charge du type de données <code translate="no">Geometry</code>, qui représente des objets géométriques conformes à l'OGC tels que <code translate="no">POINT</code>, <code translate="no">LINESTRING</code> et <code translate="no">POLYGON</code>. Ce type prend en charge plusieurs opérateurs de relations spatiales (st_contains, st_intersects, st_within, st_dwithin, ...) et fournit un index spatial <code translate="no">RTREE</code> pour accélérer le filtrage spatial et l'exécution des requêtes. Cela permet un stockage et une interrogation efficaces des formes géospatiales pour les services de base de données, la cartographie et d'autres charges de travail spatiales.</li>
<li>Type de données Timestamptz : Milvus introduit le type de données TIMESTAMPTZ, qui tient compte du fuseau horaire pour toutes les données temporelles. Cette fonctionnalité permet une gestion cohérente des données dans les déploiements mondiaux en permettant aux utilisateurs de définir un contexte temporel par défaut à l'aide de la propriété de fuseau horaire sur les bases de données et les collections. De plus, les opérations d'extraction (requête et recherche) prennent en charge un paramètre de fuseau horaire pour une conversion instantanée et à la volée des horodatages dans le format local requis lors de la sortie.</li>
<li>Boost Ranker : Au lieu de s'appuyer uniquement sur la similarité sémantique calculée sur la base des distances vectorielles, Boost Ranker permet à Milvus d'utiliser la condition de filtrage facultative dans la fonction pour trouver des correspondances parmi les candidats aux résultats de recherche et augmente les scores de ces correspondances en appliquant le poids spécifié, ce qui contribue à promouvoir ou à rétrograder les classements des entités correspondantes dans le résultat final.</li>
<li>L'index STL_SORT prend désormais en charge les types de données VARCHAR et TIMESTAMPTZ.</li>
<li>Vous pouvez maintenant activer le champ dynamique d'une collection existante en la modifiant.</li>
<li>Correction de cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Ajout d'une nouvelle configuration et activation de la mise à jour dynamique des configurations<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Corrigé cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Suppression des tableaux d'identifiants de segments volumineux dans les journaux des querynodes<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Mise à jour de plusieurs endroits où l'expr copiait les valeurs d'entrée dans chaque boucle<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Optimisation des performances de term expr<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Préfixation des morceaux de vecteurs pour les segments scellés non indexés<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr : les morceaux ne sont préfétrés qu'une seule fois<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Ajout du support nullable pour les types geometry et timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Augmentation du ttl de session de 10s à 30s<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Ajout de métriques pour le framework ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Mise à jour de la version de configuration de maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Suppression de la vérification de l'identifiant de la source<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Prise en charge de la configuration max_connection pour le stockage à distance<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Prévention d'une panique en ajoutant une vérification du pointeur nul lors de l'effacement du pk2offset de l'insertrecord<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Optimisation de la récupération des champs scalaires dans les scénarios de stockage à plusieurs niveaux<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Correction d'une faute de frappe dans les paramètres de l'analyseur<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Annulation de index_type lors de la création d'un index de segment<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>Ajout du support rbac pour updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Augmentation de la version de go à 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Désactivation de jsonshredding pour la configuration par défaut<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Unification du tampon aligné pour les entrées/sorties directes et en mémoire tampon<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Renommer les paramètres de configuration utilisateur liés à jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Rendre la configuration du pool de threads knowhere rafraîchissable<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Correction du nouveau framework ddl et de cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Définir la version du schéma lors de la création d'une nouvelle collection<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Prise en charge des fichiers jsonl/ndjson pour bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Attente de la fin du client du flux de réplication<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Configuration optionnelle de geometrycache<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Patch de la nouvelle structure ddl et de cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>Ne pas démarrer cdc par défaut<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Correction du nouveau framework ddl et de cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Suppression de la limite maximale du nombre de champs vectoriels<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>Affichage du temps de création pour les travaux d'importation<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Optimisation de l'initialisation du bitmap scalarindexsort pour les requêtes d'intervalle<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Activation de la prise en charge de varchar par stl_sort<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Extraction de la logique client shard dans un package dédié<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Refonte de la gestion des privilèges en extrayant le cache des privilèges dans un package séparé<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Prise en charge des valeurs par défaut json dans fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Mise à jour de enabledynamicfield et schemaversion lors de la modification de la collection<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Correction d'une panique de mise à jour partielle avec timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Utilisation de la version 2.6.6 pour la mise à jour de milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Utilisation du dernier timetick pour l'expiration du cache<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Sortie du streamingnode en cas d'échec de l'initialisation<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Protection de l'emplacement de tbb concurrent_map pour éviter un blocage de la condition de course<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Prévention d'une panique lorsque la coordonnée de streaming s'arrête mais que la coordonnée de requête fonctionne toujours<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Définir l'initialisation de la tâche lorsque le travailleur n'a pas de tâche<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Prévention d'un blocage dans le composant d'exécution lorsque la préparation échouait<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Prévention d'une panique lors de la double fermeture d'un canal de diffusion d'ack<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Correction du remplissage de la valeur par défaut lors de l'ajout d'un champ<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Compactage de l'historique d'assignation du canal pour réduire la taille des informations de récupération d'assignation<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Gestion correcte des valeurs par défaut lors du compactage des champs ajoutés<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Suppression de validatefieldname dans dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Ignore la tâche de compactage lorsque le segment from n'est pas sain<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Définir les propriétés du schéma avant de diffuser alter collection<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Stockage d'un événement de base de données si la clé n'était pas valide<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Correction du bug de bulkimport pour le champ struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Échec de l'obtention des données brutes pour l'index hybride<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Rétention précoce de la collection pour éviter qu'elle ne soit libérée avant la fin de la requête<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Utilisation du bon verrou de clé de ressource pour le ddl et utilisation du nouveau ddl dans la réplique de transfert<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Correction de la compatibilité des index après la mise à jour<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Correction de l'erreur "channel not available" et libération du blocage de la collection<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Suppression de la méta-collection lors de l'abandon d'une partition<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Correction du segment cible marqué comme abandonné pour les résultats des statistiques de sauvegarde deux fois<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Mise à jour incorrecte du timetick des informations de collecte<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Ajout d'une dépendance tzdata pour permettre la reconnaissance du fuseau horaire iana<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Correction du calcul du décalage des données de champ dans les fonctions de rerank pour la recherche en masse<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Correction de la géométrie du filtre pour la croissance avec mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid ne prenait pas en compte la structure<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>La valeur du groupe était nulle<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Estimation précise de la taille des tableaux de flèches découpés en tranches lors du compactage<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Correction d'une course aux données dans le client de flux répliqué<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Suppression de la construction de l'index texte pour les colonnes nouvellement ajoutées<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Ignore accidentellement les segments scellés dans le compactage l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Déplacement du finishload avant la création de l'index texte pour assurer la disponibilité des données brutes<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>N'a pas utilisé json_shredding pour json path is null<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Correction des erreurs liées à timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>Correction de l'échec du segment de charge dû à l'erreur "get disk usage"<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Prise en charge de la valeur par défaut de json dans le compactage<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Calcul de la taille de lot correcte pour l'index géométrique du segment en croissance<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Application du correctif de bogue du cadre ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Correction de l'échec de l'alter collection avec le paramètre mmap pour la structure<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Initialisation de la plage d'horodatage dans le rédacteur composite de binlog<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Suppression de la création du répertoire tmp pour la croissance de l'index r-tree<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Evite les conditions de course potentielles lors de la mise à jour de l'exécuteur<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Autorise "[" et "]" dans le nom de l'index<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Correction d'un bug pour le déchiquetage de json lorsque le json est vide mais non nul<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>S'assurer que l'opération append ne peut être annulée que par le wal lui-même et non par le rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Résolution du problème d'accès au stockage cloud de wp gcp avec ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Correction de l'importation de données géométriques nulles<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Ajout d'une vérification de nullité pour packed_writer_ dans jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Échec du mmap emb_list_meta dans la liste d'intégration<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Mise à jour des métriques de nombre de querynodes lorsque la collection n'a pas de segments<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Prévention de la réessai lors de l'importation de chaînes utf-8 invalides<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Gestion des données de champs vides dans le scénario de requery de reduce/rerank<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Correction d'une panique lors de l'arrêt gracieux de cdc<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Correction de la contamination des jetons d'authentification, du support oss/cos, des journaux d'erreurs de synchronisation redondants<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Gestion des données nulles dans stringindexsort pour éviter les dépassements de temps de chargement<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Désactivation de la construction d'une ancienne version de jsonstats à partir d'une requête<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Correction d'un bug lors de l'importation de données géométriques<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Correction du bug d'importation de parquet dans la structure<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Ajout de getmetrics à indexnodeserver pour assurer la compatibilité<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Correction de l'échec de l'altération de la collecte pour les sous-champs de la structure<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Correction du mmap au niveau de la collection qui ne prend pas effet pour les structures<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Prévention d'une course aux données dans la mise à jour du notificateur de collection querycoord<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Gestion des valeurs par défaut des champs json dans la couche de stockage<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Double vérification pour éviter que l'iter soit effacé par un autre thread<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Correction d'un bug pour la fonction gis pour filtrer la géométrie<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 11 novembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes heureux d'annoncer la publication de Milvus 2.6.5, qui corrige une <strong>vulnérabilité de sécurité critique</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> et met à niveau vers Go 1.24.9. Nous encourageons vivement <strong>tous les utilisateurs de Milvus 2.6.x à passer à la version 2.6.5</strong> dès que possible. Cette mise à jour comprend également plusieurs autres améliorations et corrections de bogues, et offre aux utilisateurs une expérience plus robuste et plus efficace.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Mise à jour de la balise builder image pour la mise à jour de go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Suppression de la vérification de l'identifiant de la source<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bugs<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>La valeur du groupe est nulle<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Initialisation de la plage d'horodatage dans le rédacteur composite de binlog (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Gestion des données de champs vides dans reduce/rerank pour les scénarios de requêtes (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Ajout d'une vérification de nullité pour packed_writer_ dans jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Suppression de la construction de l'index texte pour les colonnes nouvellement ajoutées<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Ignore accidentellement les segments scellés dans le compactage l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Déplacement du finishload avant la création de l'index texte pour assurer la disponibilité des données brutes<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Prise en charge de la valeur par défaut json dans le compactage<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Mise à jour de milvus-storage pour corriger la duplication de l'initialisation aws sdk (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 21 octobre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version de Milvus</th><th style="text-align:left">Version du SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.6.4, qui présente une série de nouvelles fonctionnalités puissantes, d'améliorations des performances et de corrections de bogues essentielles. Cette mise à jour introduit des fonctionnalités importantes telles que Struct in ARRAY pour une modélisation avancée des données. En outre, nous avons activé le déchiquetage JSON par défaut, ce qui améliore encore les performances et l'efficacité des requêtes. Plusieurs bogues critiques ont également été corrigés afin d'assurer une plus grande stabilité et fiabilité. Avec cette version, Milvus continue d'offrir une expérience plus robuste et plus efficace à tous les utilisateurs. Vous trouverez ci-dessous les principales caractéristiques de cette version.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Struct dans ARRAY : Milvus a introduit le nouveau type de données, Struct, qui permet aux utilisateurs d'organiser et de gérer plusieurs champs liés au sein d'une même entité. Actuellement, Struct ne peut être utilisé qu'en tant qu'élément sous DataType.ARRAY, permettant des fonctionnalités telles que Array of Vector, où chaque ligne contient plusieurs vecteurs, ouvrant de nouvelles possibilités pour la modélisation et la recherche de données complexes.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Prise en charge du modèle Qwen GTE-rerank-v2 dans DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Mise à jour de la version Go vers 1.24.6</strong> avec le constructeur d'images<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Activation du déchiquetage JSON par défaut<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Ajout d'un quota de disque pour la taille du binlog chargé afin d'éviter les échecs de chargement du noeud de requête<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Activation du support mmap pour struct array dans MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Ajout de la gestion de la couche de cache pour TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Optimisation des performances de la recherche inversée de bitmap (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Mise à jour de la version de Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Suppression des vérifications de l'utilisation logique lors du chargement des segments<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Ajout d'un champ dans le journal d'accès pour l'information sur la longueur de la valeur du modèle<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Permet d'écraser le type d'index actuel pendant la construction de l'index<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Ajout de paramètres de chargement pour l'index vectoriel<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Gestion unifiée de l'état des tâches de l'exécuteur de compactage<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Ajout de journaux raffinés pour le planificateur de tâches dans QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Assurer que accesslog.$consistency_level représente la valeur réelle utilisée (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Suppression du gestionnaire de canaux redondant du datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Suppression de GCC du fichier Docker de construction pour corriger la CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Assurer l'ordre déterministe des résultats de recherche lorsque les scores sont égaux<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Reranked avant requery si reranker n'a pas utilisé les données de champ<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Respect des promesses lorsque CreateArrowFileSystem lève une exception<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Correction de la configuration manquante du cryptage de disque<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Correction de la désactivation du vérificateur de solde causant un problème d'arrêt de solde<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Correction d'un problème où "not equal" n'incluait pas "none"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Prise en charge de la valeur par défaut JSON dans CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Utilisation d'une chaîne de débogage courte pour éviter les nouvelles lignes dans les journaux de débogage<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Correction de l'expression exists pour l'index plat JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Sémantique unifiée du chemin JSON exists<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Correction de la panique causée par un message d'insertion interne vide<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Mise à jour des paramètres AI/SAQ<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Suppression de la limite de déduplication lorsque l'autoindex est désactivé<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Evite les opérations simultanées de reset/add sur les métriques DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Correction d'un bug dans JSON_contains(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Evite l'éviction dans la couche de mise en cache pendant la manipulation de JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Correction des résultats erronés du filtre exp lorsqu'il est ignoré<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Vérification que le noeud de la requête est SQN avec label et liste de noeuds de streaming<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Correction de BM25 avec boost retournant des résultats non ordonnés<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Correction de l'importation en masse avec l'ID automatique<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Passage du système de fichiers via FileManagerContext lors du chargement de l'index<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Utilisation de "eventually" et correction de l'ID de la tâche apparaissant à la fois dans l'état en cours d'exécution et dans l'état terminé<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Suppression de la coche de l'heure de début incorrecte pour éviter de filtrer les DMLs avec des temps inférieurs à celle-ci<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Le fournisseur d'identifiants AWS est devenu un singleton<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Désactivation du déchiquetage pour les chemins JSON contenant des chiffres<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Correction d'un test unitaire valide pour TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Correction des tests unitaires et suppression de la logique de repli du système de fichiers<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 11 octobre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous avons le plaisir d'annoncer la sortie de Milvus 2.6.3, qui introduit une série de nouvelles fonctionnalités, d'améliorations et de corrections de bogues critiques. Cette version améliore les performances du système, étend les fonctionnalités et corrige les principaux problèmes, offrant ainsi une expérience plus stable à tous les utilisateurs. Voici les points forts de cette version :</p>
<h3 id="New-Features" class="common-anchor-header">Nouvelles fonctionnalités<button data-href="#New-Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Clé primaire avec AutoID activé : Les utilisateurs peuvent maintenant écrire le champ de clé primaire lorsque <code translate="no">autoid</code> est activé.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Compactage manuel pour les segments L0 : Ajout de la prise en charge du compactage manuel des segments L0.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Encodage de l'ID du cluster dans AutoID : Les ID générés automatiquement incluront désormais l'ID du cluster.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Prise en charge du tokenizer gRPC : Intégration du tokenizer gRPC pour une meilleure flexibilité des requêtes.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Amélioration du vérificateur d'équilibre en implémentant une file d'attente prioritaire, améliorant la distribution des tâches.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Préchargement des statistiques BM25 pour les segments scellés et optimisation de la sérialisation.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Les champs annulables peuvent maintenant être utilisés comme entrée pour les fonctions BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Ajout du support pour Azure Blob Storage dans Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Purge des petits fichiers juste après le compactage des segments de Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Activation de la fonctionnalité de score aléatoire pour les requêtes de boosting.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Nouvelles options de configuration pour le type de vecteur <code translate="no">int8</code> dans l'indexation automatique.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Ajout d'éléments de paramètres pour contrôler la politique de requêtes de la recherche hybride.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Ajout d'un support pour contrôler l'insertion des champs de sortie de fonction.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>La fonction de décroissance prend désormais en charge la fusion configurable des scores pour de meilleures performances.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Amélioration des performances de la recherche binaire sur les chaînes de caractères.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Introduction de la prise en charge des filtres épars dans les requêtes. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Diverses mises à jour pour améliorer la fonctionnalité de l'index par paliers.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Ajout du suivi de l'utilisation des ressources de stockage pour les recherches scalaires et vectorielles.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Ajout de l'utilisation du stockage pour delete/upsert/restful<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Activation des cibles de vidange granulaires pour les opérations <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Les noeuds de données utiliseront désormais un système de fichiers sans squelette pour une meilleure gestion des ressources.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Ajout d'options de configuration pour le traitement par lots dans les métadonnées. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>Les messages d'erreur incluent maintenant le nom de la base de données pour plus de clarté.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Déplacement du test de traceur vers le dépôt <code translate="no">milvus-common</code> pour une meilleure modularisation.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Déplacement des fichiers de tests unitaires de l'API C vers le répertoire <code translate="no">src</code> pour une meilleure organisation.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK permet maintenant aux utilisateurs d'insérer des données de clé primaire si <code translate="no">autoid</code> est activé.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Résolution des vulnérabilités CVE-2020-25576 et WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Correction d'un problème où les ressources logiques étaient utilisées pour les métriques dans le centre de quotas sur les nœuds de streaming.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Définir <code translate="no">mixcoord</code> dans <code translate="no">activatefunc</code> lors de l'activation de la mise en veille.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Suppression de l'initialisation redondante des composants de la V2 de stockage. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Correction du blocage de la tâche de compactage dû à la sortie de la boucle de l'exécuteur.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Remboursement de l'utilisation des ressources chargées dans le destructeur <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Correction d'un problème où le réplicateur ne pouvait pas s'arrêter et amélioration du validateur de configuration de réplication.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Définir <code translate="no">mmap_file_raii_</code> à <code translate="no">nullptr</code> lorsque mmap est désactivé.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Fait en sorte que <code translate="no">diskfilemanager</code> utilise le système de fichiers du contexte.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Hôte virtuel forcé pour OSS et COS dans le stockage V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Mise en place de la valeur par défaut de <code translate="no">report_value</code> lorsque <code translate="no">extrainfo</code> n'est pas <code translate="no">nil</code> pour des raisons de compatibilité.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Nettoyage des métriques de collection après l'abandon des collections dans rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Correction de l'échec du chargement d'un segment dû à la duplication des propriétés du champ <code translate="no">mmap.enable</code>.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Correction des erreurs d'analyse de la configuration de charge pour les répliques dynamiques.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Gestion de l'entrée ligne à colonne pour les colonnes dynamiques dans Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 19 septembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version du SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.6.2 ! Cette mise à jour introduit de nouvelles fonctionnalités puissantes, des améliorations significatives des performances et des corrections critiques qui rendent le système plus stable et prêt pour la production. Parmi les nouveautés, citons les mises à jour partielles de champs avec upsert, le déchiquetage JSON pour accélérer le filtrage dynamique des champs, l'indexation NGram pour des requêtes LIKE plus rapides et une évolution plus souple des schémas sur les collections existantes. Basée sur les commentaires de la communauté, cette version offre une base plus solide pour les déploiements dans le monde réel, et nous encourageons tous les utilisateurs à effectuer une mise à niveau pour profiter de ces améliorations.</p>
<h3 id="Features" class="common-anchor-header">Fonctionnalités<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Ajout de la prise en charge du déchiquetage JSON pour accélérer le filtrage dynamique des champs. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/json-shredding.md">Déchiquetage JSON</a>.</li>
<li>Ajout de la prise en charge de l'index NGRAM pour accélérer les opérations similaires. Pour plus de détails, voir <a href="/docs/fr/ngram.md">NGRAM</a>.</li>
<li>Ajout de la prise en charge des mises à jour partielles de champs avec l'API upsert. Pour plus d'informations, reportez-vous à <a href="/docs/fr/upsert-entities.md">Upsert Entities</a>.</li>
<li>Ajout de la prise en charge de la fonction Boost. Pour plus de détails, voir <a href="/docs/fr/boost-ranker.md">Boost Ranker</a>.</li>
<li>Ajout de la prise en charge du regroupement par champs JSON et champs dynamiques<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Ajout du support pour l'activation du schéma dynamique sur les collections existantes<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Ajout de la prise en charge de l'abandon des index sans libérer les collections<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>[StorageV2] Modification de la taille du fichier journal en taille compressée<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Ajout de champs enfants dans les informations de chargement<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Ajout de la prise en charge de l'inclusion des clés de partition et de clustering dans le groupe système<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Suppression du délai d'attente pour les tâches de compactage<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Activation de la construction avec Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Utilisation des informations de groupe pour estimer l'utilisation de la logique<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Utilisation des informations de division de groupe pour estimer l'utilisation<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Sauvegarde des résultats des groupes de colonnes dans le compactage<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Ajout de configurations pour la politique de fractionnement basée sur la taille<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Ajout de la prise en charge de la politique de fractionnement basée sur le schéma et la taille<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Ajout d'une politique de partage configurable<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Ajout de plus de métriques et de configurations<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Ajout de la prise en charge de l'attente que tous les index soient prêts avant de charger des segments<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Ajout d'une métrique de latence interne pour le noeud de rescore<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Optimisation du format du journal d'accès lors de l'impression des paramètres KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Ajout d'une configuration pour modifier la taille du lot d'instantanés de vidage<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Réduction de l'intervalle de nettoyage de la tâche de compactage<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Amélioration du tri par fusion pour prendre en charge plusieurs champs<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Ajout d'une estimation des ressources de charge pour l'indexation par paliers<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Ajout de la configuration de l'index automatique pour le cas de la déduplication<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Ajout de la configuration pour autoriser les caractères personnalisés dans les noms (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Ajout du support de cchannel pour les services de streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Ajout d'un mutex et d'une vérification de l'étendue pour protéger les suppressions simultanées<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correction de bugs<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Alignement du comportement des expressions exists entre brute force et index<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Correction d'une erreur lors du renommage vers une collection abandonnée<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Vérification de la longueur des champs enfants<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Activation d'Azure par défaut<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Correction du chemin de téléchargement des compactions L0 sous les datanodes de pooling<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>Désactivation du renommage si le cryptage de la base de données est activé<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Suppression de la propriété dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Marquage des tâches comme échouées lorsque l'ID pré-alloué est invalide<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Saut des vérifications MVCC sur les expressions de comparaison PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Correction du bug json_contains pour les statistiques<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Ajout d'une vérification de l'initialisation du système de fichiers pour le noeud de requête et le noeud de streaming<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Correction de la cible de compactage vide lorsque le segment a été ramassé<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Correction d'une condition de course lors de l'initialisation de l'index d'horodatage<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Vérification que arraydata est nil pour éviter une panique<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Correction du bug de construction des stats JSON pour les objets imbriqués<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Evite la réécriture de mmap par plusieurs champs JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Unification des formats de données valides<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Cachement des identifiants des fournisseurs d'embedding/reranking dans l'interface web<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Correction du chemin du statslog sous les datanodes de pooling<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Correction du chemin de l'oracle IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Utilisation du point de contrôle du snapshot de récupération si aucun vchannel n'est en cours de récupération<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Limitation du nombre de colonnes dans les statistiques JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Création d'un index n-gramme pour le comptage des ressources de charge<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Déduction du type de métrique à partir de résultats de recherche non vides<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Correction de l'écriture multi-segments n'écrivant qu'un seul segment<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Correction du tri par fusion hors plage<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Ajout d'une vérification UTF-8 avant d'exécuter la fonction BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Réessai d'une ancienne session si elle existe<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Ajout d'une limite de taille de tampon Kafka pour éviter les OOM de datanodes<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Correction d'une panique en étendant la plage de garde des verrous<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Correction des segments croissants qui ne sont pas vidés lors d'un changement de schéma<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Gestion des erreurs d'E/S<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Prévention d'une panique si le chemin de l'index Tantivy n'existe pas<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 3 septembre 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version du SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Nous sommes ravis d'annoncer la sortie de Milvus 2.6.1 ! Cette version s'appuie sur les avancées architecturales majeures des versions précédentes et apporte des améliorations critiques axées sur la stabilité de la production, les performances et la robustesse opérationnelle. Cette version tient compte des principaux commentaires de la communauté et renforce le système pour les déploiements à grande échelle. Nous encourageons vivement tous les utilisateurs à mettre à jour pour bénéficier d'un système plus stable, plus performant et plus fiable.</p>
<h3 id="Improvements" class="common-anchor-header">Améliorations<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Prise en charge des systèmes de fichiers compatibles POSIX pour le stockage à distance<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Introduction de rerankers basés sur des modèles<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Optimisation des performances des expressions de comparaison sur les champs de clé primaire<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Collecte le doc_id de la liste d'affichage directement pour accélérer la correspondance de texte<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Optimise les performances des requêtes en convertissant plusieurs conditions != en une seule clause NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Amélioration de la gestion des ressources pour la couche de mise en cache pendant le chargement des segments<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Améliore l'estimation de la mémoire pour les index intermédiaires pendant le chargement des données<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Configure le ratio de construction pour les index intermédiaires<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Ajoute une limite de vitesse d'écriture configurable au graveur de disque<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Les paramètres SegCore peuvent maintenant être mis à jour dynamiquement sans redémarrer le service Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Ajout de mesures unifiées de latence gRPC pour une meilleure observabilité<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Inclut les horodatages des requêtes client dans les en-têtes gRPC pour simplifier le débogage<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Supporte le niveau de journal de trace pour segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Ajout d'un commutateur configurable pour ajuster les garanties de cohérence pour une plus grande disponibilité<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Implémentation d'un mécanisme robuste de rewatch pour gérer les échecs de connexion etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Amélioration de la logique interne de vérification de la santé des noeuds<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Optimise l'accès aux métadonnées lors de l'énumération des collections<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Mise à jour du client Pulsar vers la version officielle v0.15.1 et ajout de plus de logs<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Mise à jour de aws-sdk de 1.9.234 à 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Prise en charge des mises à jour dynamiques des intervalles pour les composants de téléscripteur<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Amélioration de l'auto-détection des jeux d'instructions ARM SVE pour les opérations de bitset<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Amélioration du message d'erreur lorsqu'une correspondance de texte ou de phrase échoue<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Amélioration du message d'erreur en cas de non concordance des dimensions d'un vecteur<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Amélioration du rapport d'erreur pour les dépassements de délai d'ajout lorsque le magasin d'objets n'est pas disponible<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Corrections de bogues<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Correction d'un problème potentiel de sortie de mémoire (OOM) lors de l'importation de fichiers Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Correction d'un problème où les noeuds en attente ne pouvaient pas récupérer si leur bail avait expiré<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Gestion correcte de l'état de répétition du compactage<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Correction d'un blocage potentiel entre les requêtes de lecture continue et le chargement d'index qui pouvait empêcher le chargement d'index<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Correction d'un bogue pouvant entraîner l'échec des suppressions de données dans des scénarios à forte concomitance<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Correction d'une condition de course potentielle lors du chargement des index texte et JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Correction d'une incohérence d'état de noeud qui pouvait se produire après un redémarrage de QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Assure qu'un QueryNode "sale" est correctement nettoyé après un redémarrage<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Correction d'un problème où l'état de réessai n'était pas géré correctement pour les requêtes avec des charges utiles non vides<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Correction d'un problème où le bulk writer v2 n'utilisait pas le nom de bucket correct<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Améliore la sécurité en cachant les éléments sensibles du point de terminaison RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Assure que les téléchargements d'objets pour woodpecker sont idempotents pendant les tentatives de dépassement de délai<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Désapprouve l'importation d'éléments nuls dans les champs de tableaux à partir de fichiers Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Correction d'un bogue où le cache du proxy n'était pas invalidé après la création d'un alias de collection<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Amélioration du mécanisme de découverte des services internes pour les noeuds de streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Correction de la logique des groupes de ressources pour filtrer correctement les noeuds de streaming<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Ajout de l'étiquette databaseName aux métriques pour éviter les conflits de noms dans les environnements multi-bases de données<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Correction d'une erreur de logique dans la gestion de l'état des tâches internes<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Optimisation du timing d'initialisation des métriques internes pour éviter une panique potentielle<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Correction d'un rare crash potentiel dans le serveur HTTP interne<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 6 août 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Version Milvus</th><th style="text-align:left">Version SDK Python</th><th style="text-align:left">Version SDK Node.js</th><th style="text-align:left">Version SDK Java</th><th style="text-align:left">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 est officiellement publié ! S'appuyant sur les fondations architecturales posées dans la version <a href="#v260-rc1">2.6.0-rc1</a>, cette version prête pour la production résout de nombreux problèmes de stabilité et de performance tout en introduisant de nouvelles fonctionnalités puissantes, notamment le format de stockage V2, le traitement JSON avancé et des fonctions de recherche améliorées. Avec de nombreuses corrections de bogues et optimisations basées sur les commentaires de la communauté au cours de la phase RC, Milvus 2.6.0 est prêt pour que vous l'exploriez et l'adoptiez.</p>
<div class="alert warning">
<p>La mise à niveau directe à partir des versions antérieures à la version 2.6.0 n'est pas prise en charge en raison des modifications architecturales. Veuillez suivre notre <a href="/docs/fr/upgrade_milvus_cluster-operator.md">guide de mise à jour</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Nouveautés de la version 2.6.0 (depuis la RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Format de stockage optimisé v2</h4><p>Pour relever les défis du stockage mixte de données scalaires et vectorielles, en particulier les recherches de points sur des données non structurées, Milvus 2.6 introduit le format de stockage V2. Ce nouveau format de stockage adaptatif en colonnes adopte une stratégie de disposition "fusion de colonnes étroites + indépendance des colonnes larges", ce qui résout fondamentalement les goulets d'étranglement en matière de performances lors de la gestion des recherches de points et des récupérations par petits lots dans les bases de données vectorielles.</p>
<p>Le nouveau format prend désormais en charge l'accès aléatoire efficace sans amplification des E/S et permet de multiplier par 100 les performances par rapport au format Parquet vanille adopté précédemment, ce qui le rend idéal pour les charges de travail d'IA nécessitant à la fois un traitement analytique et une récupération vectorielle précise. En outre, il peut réduire le nombre de fichiers jusqu'à 98 % pour les charges de travail typiques. La consommation de mémoire pour le compactage majeur est réduite de 300 %, et les opérations d'E/S sont optimisées jusqu'à 80 % pour les lectures et plus de 600 % pour les écritures.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Index plat JSON (bêta)</h4><p>Milvus 2.6 introduit l'index plat JSON pour gérer les schémas JSON hautement dynamiques. Contrairement à JSON Path Index qui nécessite la prédéclaration de chemins spécifiques et de leurs types attendus, JSON Flat Index découvre et indexe automatiquement toutes les structures imbriquées sous un chemin donné. Lors de l'indexation d'un champ JSON, il aplatit récursivement l'ensemble du sous-arbre, créant des entrées d'index inversées pour chaque paire chemin-valeur qu'il rencontre, indépendamment de la profondeur ou du type. Cet aplatissement automatique rend JSON Flat Index idéal pour les schémas évolutifs dans lesquels de nouveaux champs apparaissent sans avertissement. Par exemple, si vous indexez un champ "metadata", le système traitera automatiquement les nouveaux champs imbriqués tels que "metadata.version2.features.experimental" au fur et à mesure qu'ils apparaissent dans les données entrantes, sans nécessiter de nouvelle configuration de l'index.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Rappel des fonctionnalités du Core 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Pour des informations détaillées sur les changements d'architecture et les fonctionnalités introduites dans la version 2.6.0-RC, voir la <a href="#v260-rc1">note de mise à jour 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Simplification de l'architecture</h4><ul>
<li>Streaming Node (GA) - Gestion centralisée du WAL</li>
<li>WAL natif avec Woodpecker - Suppression de la dépendance Kafka/Pulsar</li>
<li>Coordonnateurs unifiés (MixCoord) ; fusion de l'IndexNode et du DataNode - Réduction de la complexité des composants</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Recherche et analyse</h4><ul>
<li>RaBitQ Quantification sur 1 bit avec rappel élevé</li>
<li>Correspondance de phrases</li>
<li>MinHash LSH pour la déduplication</li>
<li>Fonctions de classement tenant compte du temps</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Expérience du développeur</h4><ul>
<li>Fonctions d'intégration pour le flux de travail "données entrantes, données sortantes".</li>
<li>Évolution du schéma en ligne</li>
<li>Prise en charge du vecteur INT8</li>
<li>Tronçonneurs améliorés pour une prise en charge globale des langues</li>
<li>Couche de cache avec chargement paresseux - Traitement des ensembles de données plus grands que la mémoire</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de publication : 18 juin 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Version Milvus</th><th style="text-align:center">Version du SDK Python</th><th style="text-align:center">Version SDK Node.js</th><th style="text-align:center">Version SDK Java</th><th style="text-align:center">Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 présente une architecture simplifiée, native dans le nuage, conçue pour améliorer l'efficacité opérationnelle, l'utilisation des ressources et le coût total de possession en réduisant la complexité du déploiement. Cette version ajoute de nouvelles fonctionnalités axées sur les performances, la recherche et le développement. Les principales caractéristiques comprennent la quantification 1 bit haute précision (RaBitQ) et une couche de cache dynamique pour des gains de performance, la détection de quasi-doublons avec MinHash et la correspondance précise des phrases pour une recherche avancée, et des fonctions d'intégration automatisées avec modification du schéma en ligne pour améliorer l'expérience du développeur.</p>
<div class="alert note">
<p>Il s'agit d'une version préliminaire de Milvus 2.6.0. Pour essayer les dernières fonctionnalités, installez cette version dans le cadre d'un nouveau déploiement. La mise à niveau de Milvus v2.5.x ou antérieure vers 2.6.0-rc1 n'est pas prise en charge.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Modifications de l'architecture<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Depuis la version 2.6, Milvus introduit d'importantes modifications architecturales visant à améliorer les performances, l'évolutivité et la facilité d'utilisation. Pour plus d'informations, voir la <a href="/docs/fr/architecture_overview.md">présentation de l'architecture Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Nœud de diffusion en continu (GA)</h4><p>Dans les versions précédentes, les données en continu étaient écrites dans le WAL par le proxy et lues par le QueryNode et le DataNode. Cette architecture rendait difficile l'obtention d'un consensus du côté de l'écriture et nécessitait une logique complexe du côté de la lecture. En outre, le délégateur de requêtes était situé dans le QueryNode, ce qui entravait l'évolutivité. Milvus 2.5.0 a introduit le nœud de streaming, qui devient GA dans la version 2.6.0. Ce composant est désormais responsable de toutes les opérations de lecture/écriture WAL au niveau du shard et sert également de délégateur de requête, ce qui résout les problèmes susmentionnés et permet de nouvelles optimisations.</p>
<p><strong>Avis de mise à jour important</strong>: Streaming Node est un changement architectural significatif, donc une mise à niveau directe vers Milvus 2.6.0-rc1 à partir des versions précédentes n'est pas prise en charge.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">WAL natif Woodpecker</h4><p>Milvus s'appuyait auparavant sur des systèmes externes tels que Kafka ou Pulsar pour son WAL. Bien que fonctionnels, ces systèmes ajoutaient une complexité opérationnelle significative et une surcharge de ressources, en particulier pour les déploiements de petite et moyenne taille. Dans Milvus 2.6, ces systèmes sont remplacés par Woodpecker, un système WAL conçu à cet effet et natif pour l'informatique en nuage. Woodpecker est conçu pour le stockage d'objets et prend en charge les modes zéro disque basés sur le stockage local et le stockage d'objets, ce qui simplifie les opérations tout en améliorant les performances et l'évolutivité.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Fusion du DataNode et de l'IndexNode</h4><p>Dans Milvus 2.6, les tâches telles que le compactage, l'importation en masse, la collecte de statistiques et la construction d'index sont désormais gérées par un planificateur unifié. La fonction de persistance des données précédemment gérée par le DataNode a été déplacée vers le Streaming Node. Pour simplifier le déploiement et la maintenance, l'IndexNode et le DataNode ont été fusionnés en un seul composant DataNode. Ce nœud consolidé exécute désormais toutes ces tâches critiques, réduisant ainsi la complexité opérationnelle et optimisant l'utilisation des ressources.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Fusion des coordinateurs en MixCoord</h4><p>La conception précédente, avec des modules RootCoord, QueryCoord et DataCoord séparés, introduisait une complexité dans la communication entre les modules. Pour simplifier la conception du système, ces composants ont été fusionnés en un seul coordinateur unifié appelé MixCoord. Cette consolidation réduit la complexité de la programmation distribuée en remplaçant la communication basée sur le réseau par des appels de fonctions internes, ce qui permet un fonctionnement plus efficace du système et simplifie le développement et la maintenance.</p>
<h3 id="Key-Features" class="common-anchor-header">Caractéristiques principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Quantification à 1 bit RaBitQ</h4><p>Pour traiter des ensembles de données à grande échelle, la quantification sur 1 bit est une technique efficace pour améliorer l'utilisation des ressources et les performances de recherche. Cependant, les méthodes traditionnelles peuvent avoir un impact négatif sur le rappel. En collaboration avec les auteurs de la recherche originale, Milvus 2.6 introduit RaBitQ, une solution de quantification 1 bit qui maintient une précision de rappel élevée tout en offrant les avantages de la compression 1 bit en termes de ressources et de performances.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Amélioration de la capacité JSON</h4><p>Milvus 2.6 améliore sa prise en charge du type de données JSON avec les améliorations suivantes :</p>
<ul>
<li><strong>Performance</strong>: L'indexation des chemins JSON est désormais officiellement prise en charge, ce qui permet de créer des index inversés sur des chemins spécifiques au sein des objets JSON (par exemple, <code translate="no">meta.user.location</code>). Cela permet d'éviter les balayages complets des objets et d'améliorer la latence des requêtes avec des filtres complexes.</li>
<li><strong>Fonctionnalité</strong>: Pour prendre en charge une logique de filtrage plus complexe, cette version ajoute la prise en charge des fonctions <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> et <code translate="no">CAST</code>. Pour l'avenir, notre travail sur la prise en charge de JSON se poursuit. Nous sommes heureux de vous annoncer que les prochaines versions officielles proposeront des fonctionnalités encore plus puissantes, telles que le <strong>déchiquetage JSON</strong> et un <strong>index JSON FLAT</strong>, conçu pour améliorer considérablement les performances sur les données JSON fortement imbriquées.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Amélioration de la fonction Analyseur/Tokéniseur</h4><p>Cette version améliore considérablement les capacités de traitement de texte grâce à plusieurs mises à jour de l'analyseur et du tokenizer :</p>
<ul>
<li>Une nouvelle syntaxe <a href="/docs/fr/analyzer-overview.md#Example-use">Run Analyzer</a> est disponible pour valider les configurations du tokenizer.</li>
<li>Le <a href="/docs/fr/lindera-tokenizer.md">tokenizer Lindera</a> est intégré pour une meilleure prise en charge des langues asiatiques telles que le japonais et le coréen.</li>
<li>La sélection du tokenizer au niveau de la ligne est désormais prise en charge, le <a href="/docs/fr/icu-tokenizer.md">tokenizer</a> polyvalent <a href="/docs/fr/icu-tokenizer.md">ICU</a> étant disponible comme solution de repli pour les scénarios multilingues.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Entrée et sortie des données avec les fonctions d'intégration</h4><p>Milvus 2.6 introduit une fonction "Entrée et sortie de données" qui simplifie le développement d'applications d'IA en s'intégrant directement aux modèles d'intégration tiers (par exemple, OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Les utilisateurs peuvent désormais insérer et interroger des données textuelles brutes, et Milvus appellera automatiquement le service de modèle spécifié pour convertir le texte en vecteurs en temps réel. Il n'est donc plus nécessaire de disposer d'un pipeline de conversion vectorielle distinct.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/embedding-function-overview.md">Vue d'ensemble de la fonction d'intégration</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Correspondance de phrases</h4><p>La correspondance de phrases est une fonction de recherche de texte qui renvoie des résultats uniquement lorsque la séquence exacte de mots d'une requête apparaît consécutivement et dans le bon ordre dans un document.</p>
<p><strong>Caractéristiques principales</strong>:</p>
<ul>
<li>Sensible à l'ordre : Les mots doivent apparaître dans le même ordre que dans la requête.</li>
<li>Correspondance consécutive : Les mots doivent apparaître l'un à côté de l'autre, à moins qu'une valeur d'inclinaison ne soit utilisée.</li>
<li>Slop (facultatif) : Paramètre ajustable qui autorise un petit nombre de mots intermédiaires, ce qui permet une correspondance floue entre les phrases.</li>
</ul>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/phrase-match.md">Correspondance de phrases</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Index MinHash LSH (Beta)</h4><p>Pour répondre au besoin de déduplication des données dans la formation des modèles, Milvus 2.6 ajoute la prise en charge des index MINHASH_LSH. Cette fonctionnalité fournit une méthode efficace en termes de calcul et évolutive pour estimer la similarité de Jaccard entre les documents afin d'identifier les quasi-doublons. Les utilisateurs peuvent générer des signatures MinHash pour leurs documents texte lors du prétraitement et utiliser l'index MINHASH_LSH dans Milvus pour trouver efficacement des contenus similaires dans des ensembles de données à grande échelle, améliorant ainsi le nettoyage des données et la qualité des modèles.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Fonctions de désintégration tenant compte du temps</h4><p>Milvus 2.6 introduit des fonctions de décroissance tenant compte du temps pour traiter les scénarios dans lesquels la valeur des informations change au fil du temps. Lors du reclassement des résultats, les utilisateurs peuvent appliquer des fonctions de décroissance exponentielle, gaussienne ou linéaire basées sur un champ d'horodatage pour ajuster le score de pertinence d'un document. Cela permet de donner la priorité aux contenus les plus récents, ce qui est essentiel pour des applications telles que les fils d'actualité, le commerce électronique et la mémoire d'un agent d'intelligence artificielle.</p>
<p>Pour plus d'informations, reportez-vous à la page <a href="/docs/fr/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Ajout d'un champ pour l'évolution du schéma en ligne</h4><p>Pour offrir une plus grande souplesse de schéma, Milvus 2.6 prend désormais en charge l'ajout d'un nouveau champ scalaire au schéma d'une collection existante en ligne. Cela évite de devoir créer une nouvelle collection et d'effectuer une migration de données perturbatrice lorsque les exigences de l'application changent.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/add-fields-to-an-existing-collection.md">Ajouter des champs à une collection existante</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Prise en charge des vecteurs INT8</h4><p>En réponse à l'utilisation croissante de modèles quantifiés qui produisent des incorporations d'entiers de 8 bits, Milvus 2.6 ajoute la prise en charge native des types de données pour les vecteurs INT8. Cela permet aux utilisateurs d'ingérer ces vecteurs directement sans déquantification, ce qui permet d'économiser des coûts de calcul, de bande passante de réseau et de stockage. Cette fonctionnalité est initialement prise en charge pour les index de la famille HNSW.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/dense-vector.md">Vecteur dense</a>.</p>
