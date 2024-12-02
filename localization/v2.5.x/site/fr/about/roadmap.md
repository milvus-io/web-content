---
id: roadmap.md
title: Feuille de route Milvus
related_key: Milvus roadmap
summary: >-
  Milvus est une base de données vectorielles open-source conçue pour alimenter
  les applications d'IA. Voici notre feuille de route pour guider notre
  développement.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Feuille de route Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Bienvenue sur la feuille de route de Milvus ! Rejoignez-nous dans notre démarche continue d'amélioration et d'évolution de Milvus. Nous sommes ravis de partager nos réalisations, nos projets futurs et notre vision de l'avenir. Notre feuille de route est plus qu'une liste de fonctionnalités à venir : elle reflète notre engagement en faveur de l'innovation et notre volonté de travailler avec la communauté. Nous vous invitons à consulter notre feuille de route, à nous faire part de vos commentaires et à contribuer à façonner l'avenir de Milvus !</p>
<h2 id="Roadmap" class="common-anchor-header">Feuille de route<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>Catégorie</th>
            <th>Milvus 2.5.0 (atteint dans les versions récentes)</th>
            <th>Prochaine version (milieu de CY25)</th>
            <th>Feuille de route future (d'ici un an)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Traitement des données non structurées piloté par l'IA</strong><br/><i>Renforcement de la capacité à traiter et à analyser les données non structurées à l'aide de modèles d'IA et de technologies avancées.</i></td>
            <td><strong>Recherche de texte intégral</strong><br/><i>Prise en charge de la recherche de texte intégral avec Sparse-BM25. La nouvelle API accepte le texte en entrée et génère automatiquement un vecteur clairsemé dans Milvus</i><br/><br/><strong>Vecteur</strong> clairsemé<strong>(GA)</strong><br/><i>Prise en charge d'une méthode efficace de stockage et d'indexation pour le vecteur clairsemé.</i><br/></td>
            <td><strong>Entrée et sortie de données</strong><br/><i>Prise en charge des principaux services de modèles pour l'ingestion des données d'origine</i><br/><br/><strong>Reranker avancé</strong><br/><i>Prise en charge des rerankers basés sur des modèles et de la fonction de notation définie par l'utilisateur</i><br/><br/><strong>Amélioration</strong> JSON<br/><i>Indexation et analyse syntaxique</i> JSON<i>pour accélérer le traitement</i></td>
            <td><strong>Entrée et sortie des données originales</strong><br/><strong>Prise en charge</strong><i>des références Blob et url pour le traitement des données originales</i><br/><br/><strong>Prise en charge d'un plus grand nombre de types de données</strong><br/>, par exemple<i>Datetime, Map, GIS</i><br/><br/><strong>Prise en charge des tenseurs</strong><br/><i>Prise en charge d'une liste de vecteurs, utilisation typique telle que Colbert, Copali, etc.</i></td>
        </tr>
        <tr>
            <td><strong>Qualité et performance de la recherche</strong><br/><i>Fournir des résultats précis, pertinents et rapides en optimisant l'architecture, les algorithmes et les API.</i></td>
            <td><strong>Fonction de correspondance de texte</strong><br/><i>Filtrez rapidement les mots-clés/tokens en texte/varchar</i><br/><br/><strong>Amélioration de la recherche par groupement</strong><br/><i>Introduisez group_size et ajoutez le support group by dans la recherche hybride</i><br/><br/><strong>Bitmap Index &amp; Inverted Index</strong><br/><i>Accélérez le filtrage sur les tags</i></td>
            <td><strong>Correspondance avancée</strong><br/> par exemple<i>, Correspondance de phrase, Correspondance floue, et plus d'outils de symbolisation</i><br/><br/><strong>Agrégations</strong><br/><i>Agrégations de champs scalaires, par exemple, min, max, count, distinct.</i><br/></td>
            <td><strong>Mise à jour partielle</strong><br/><i>Prise en charge des mises à jour de la valeur d'un champ spécifique</i><br/><br/><strong>Capacité de tri</strong><br/><i>Tri par champs scalaires pendant l'exécution</i><br/><br/><strong>Prise en charge du regroupement des données</strong><br/><i>Co-localité des données</i></td>
        </tr>
        <tr>
            <td><strong>Fonctionnalité et gestion riches</strong><br/><i>Fonctionnalités de gestion des données robustes et conviviales pour les développeurs</i></td>
            <td><strong>Prise en charge des fichiers CSV dans l'importation de données</strong><br/><i>Bulkinsert prend en charge le format CSV</i><br/><br/><strong>Prise en charge des valeurs nulles et par défaut</strong><br/><i>Les types</i> nul<i>et par défaut facilitent l'importation de données à partir d'autres SGBD</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Outils de gestion visuelle pour les administrateurs de bases de données</i></td>
            <td><strong>Déduplication des clés primaires</strong><br/><i>En utilisant l'index pk global</i><br/><br/><strong>Modification du schéma en ligne</strong><br/> p. ex.<i>ajouter/supprimer un champ, modifier la longueur varchar</i><br/><br/><strong>Versionnement et restauration des données</strong><br/><i>Prise en charge du versionnement des données par instantané</i></td>
            <td><strong>SDK Rust et C++</strong><br/><i>Prise en charge d'un plus grand nombre de clients</i><br/><br/><strong>Prise en charge de l'UDF </strong><br/><i>Fonction définie par l'utilisateur</i></td>
        </tr>
        <tr>
            <td><strong>Rentabilité et architecture</strong><br/><i>Systèmes de pointe, privilégiant la stabilité, la rentabilité et l'évolutivité. </i></td>
            <td><strong>Chargement par champ</strong><br/><i>Choisissez une partie de la collection à charger</i><br/><br/><strong>Optimisation de la mémoire</strong><br/><i>Réduire l'OOM et améliorer la charge</i><br/><br/><strong>Streaming Node (Beta)</strong><br/><i>Fournir une cohérence globale et résoudre le goulot d'étranglement des performances sur le coordinateur racine</i><br/><br/><strong>Storage Format V2 (Beta</strong><i>)</i><br/><i>Conception de formats universels et base pour l'accès aux données sur disque</i><br/><br/><strong>Clustering Compaction</strong><br/><i>Redistribution des données en fonction de la configuration pour accélérer les performances de lecture</i></td>
            <td><strong>Lazy Load</strong><br/><i>La charge peut être initiée par la première opération de lecture sans appeler explicitement load()</i><br/><br/> Tiered<strong>Storage</strong><br/><i>Support hot and cold storage for cost optimization</i><br/><br/><strong>Release by Field</strong><br/><i>Release part of collection to reduce memory use</i><br/><br/><strong>Streaming Node (GA)</strong><br/><i>Traiter les données en continu et simplifier l'architecture</i></td>
            <td><strong>Supprimer les dépendances</strong><br/><i>Réduire ou éliminer les dépendances sur les composants externes tels que pulsar, etcd</i><br/><br/><strong>Fusionner la logique de coordination dans MixCoord</strong><br/><i>Simplifier l'architecture</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Notre feuille de route est généralement structurée en trois parties : la version la plus récente, la prochaine version à venir et une vision à moyen et long terme pour l'année prochaine.</li>
<li>Au fur et à mesure que nous progressons, nous apprenons continuellement et nous ajustons occasionnellement notre objectif, en ajoutant ou en supprimant des éléments selon les besoins.</li>
<li>Ces plans sont indicatifs et sujets à modification, et peuvent varier en fonction des services d'abonnement.</li>
<li>Nous respectons scrupuleusement notre feuille de route, nos <a href="/docs/fr/release_notes.md">notes de version</a> servant de référence.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Comment contribuer<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>En tant que projet open-source, Milvus se nourrit des contributions de la communauté. Voici comment vous pouvez participer à notre aventure.</p>
<h3 id="Share-feedback" class="common-anchor-header">Partager le retour d'information</h3><ul>
<li><p>Signalement de problèmes : Vous rencontrez un bogue ou vous avez une suggestion ? Ouvrez un problème sur notre <a href="https://github.com/milvus-io/milvus/issues">page GitHub</a>.</p></li>
<li><p>Suggestions de fonctionnalités : Vous avez des idées de nouvelles fonctionnalités ou d'améliorations ? <a href="https://github.com/milvus-io/milvus/discussions">Nous serions ravis de les entendre !</a></p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contributions au code</h3><ul>
<li><p>Demandes d'extension : Contribuez directement à notre <a href="https://github.com/milvus-io/milvus/pulls">base de code</a>. Qu'il s'agisse de corriger des bogues, d'ajouter des fonctionnalités ou d'améliorer la documentation, vos contributions sont les bienvenues.</p></li>
<li><p>Guide de développement : Consultez notre <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">guide du contributeur</a> pour connaître les lignes directrices relatives aux contributions au code.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Faites passer le mot</h3><ul>
<li><p>Partage social : Vous aimez Milvus ? Partagez vos cas d'utilisation et vos expériences sur les médias sociaux et les blogs technologiques.</p></li>
<li><p>Mettez-nous en vedette sur GitHub : Montrez votre soutien en étoilant notre <a href="https://github.com/milvus-io/milvus">dépôt GitHub</a>.</p></li>
</ul>