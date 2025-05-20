---
id: roadmap.md
title: Feuille de route Milvus
related_key: Milvus roadmap
summary: >-
  Milvus est une base de données vectorielles open-source conçue pour alimenter
  les applications d'intelligence artificielle. Voici notre feuille de route
  pour guider notre développement.
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
            <th>Milvus 2.4.0 (récemment atteint)</th>
            <th>Milvus 2.5.0 (à venir au milieu de l'année 24)</th>
            <th>Feuille de route future (Milvus 3.0 prévu pour CY24)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>AI-developer Friendly</strong><br/> Une<i>pile technologique conviviale pour les développeurs, améliorée par les dernières innovations en matière d'IA</i></td>
            <td><strong>Multi-vecteurs et recherche hybride</strong><br/><i>Cadre pour le rappel et la fusion multiplex</i><br/><br/><strong>Accélération de l'indexation GPU</strong><br/><i>Prise en charge de QPS plus élevés et création d'index plus rapide</i><br/><br/><strong>Bibliothèque de modèles dans PyMilvus</strong><br/><i>Modèles d'intégration intégrés pour Milvus</i></td>
            <td><strong>Sparse Vector (GA)</strong><br/><i>Extraction de caractéristiques locales et recherche par mot-clé</i><br/><br/><strong>Milvus Lite (GA)</strong><br/><i>Version légère et en mémoire de Milvus</i><br/><br/><strong>Embedding Models Gallery</strong><br/><i>Prise en charge des modèles d'intégration d'images et multimodaux et des modèles de reranker dans les bibliothèques de modèles</i></td>
            <td><strong>Entrée et sortie de données originales</strong><br/><i>Prise en charge des types de données Blob</i><br/><br/><strong>Regroupement de données</strong><br/><i>Co-localité des données</i><br/><br/><strong>Recherche vectorielle orientée vers des scénarios</strong><br/> par exemple,<i>recherche multicible et filtrage NN</i><br/><br/><strong>Prise en charge de l'intégration et de l'extrémité du reranker</strong></td>
        </tr>
        <tr>
            <td><strong>Fonctionnalité riche</strong><br/><i>Fonctionnalités améliorées de recherche et de gestion des données</i></td>
            <td><strong>Prise en charge des types de données FP16, BF16</strong><br/><i>Ces types de données ML peuvent contribuer à réduire l'utilisation de la mémoire</i><br/><br/><strong>Grouping Search</strong><br/><i>Aggregate split embeddings</i><br/><br/><strong>Fuzzy Match and Inverted Index</strong><br/><i>Prise en charge de la correspondance floue et de l'indexation inversée pour les types scalaires tels que varchar et int</i></td>
            <td><strong>Index inversé pour les tableaux et JSON</strong><br/><i>Indexation pour les tableaux et prise en charge partielle de JSON</i><br/><br/><strong>Index</strong> Bitset<br/><i>Vitesse d'exécution améliorée et agrégation future des données</i><br/><br/><strong>Truncate Collection</strong><br/><i>Permet l'élimination des données tout en préservant les métadonnées</i><br/><br/><strong>Prise en charge des valeurs NULL et des valeurs par défaut</strong></td>
            <td><strong>Prise en charge d'un plus grand nombre de types de données</strong><br/> par exemple<i>Datetime, GIS</i><br/><br/><strong>Filtrage de texte avancé</strong><br/> par exemple<i>Match Phrase</i><br/><br/><strong>Dédoublonnage des clés primaires</strong></td>
        </tr>
        <tr>
            <td><strong>Rentabilité et architecture</strong><br/><i>Systèmes avancés mettant l'accent sur la stabilité, la rentabilité, l'évolutivité et les performances</i></td>
            <td><strong>Prise en charge d'un plus grand nombre de collections/partitions</strong><br/><i>Gère plus de 10 000 collections dans des clusters plus petits</i><br/><br/><strong>Optimisation des cartes mémoire</strong><br/><i>Équilibre entre la réduction de la consommation de mémoire et la latence</i><br/><br/><strong>Optimisation de l'insertion en bloc</strong><br/><i>Simplifie l'importation de grands ensembles de données.</i></td>
            <td><strong>Lazy Load</strong><br/><i>Les données sont chargées à la demande par le biais d'opérations de lecture</i><br/><br/><strong>Major Compaction</strong><br/><i>Redistribue les données en fonction de la configuration afin d'améliorer les performances de lecture</i><br/><br/><strong>Mmap for Growing Data</strong><br/><i>Fichiers Mmap pour l'expansion des segments de données</i></td>
            <td><strong>Contrôle de la mémoire</strong><br/><i>Réduit les problèmes de sortie de mémoire et assure une gestion globale de la mémoire</i><br/><br/><strong>LogNode Introduction</strong><br/><i>Assure la cohérence globale et s'attaque au goulot d'étranglement unique dans la coordination de la racine</i><br/><br/><strong>Format de stockage V2</strong><br/><i>La conception du format universel jette les bases de l'accès aux données sur disque.</i></td>
        </tr>
        <tr>
            <td><strong>Enterprise Ready</strong><br/><i>Conçu pour répondre aux besoins des environnements de production d'entreprise</i></td>
            <td><strong>Milvus CDC</strong><br/><i>Capacité de réplication des données</i><br/><br/><strong>Accesslog Enhancement</strong><br/><i>Enregistrement détaillé pour l'audit et le traçage</i></td>
            <td><strong>Nouveau groupe de ressources</strong><br/><i>Gestion améliorée des ressources</i><br/><br/><strong>Storage Hook</strong><br/><i>Prise en charge du cryptage BYOK (Bring Your Own Key)</i></td>
            <td><strong>Ajustement dynamique du nombre de répliques</strong><br/><i>Facilite les changements dynamiques du nombre de répliques</i><br/><br/><strong>Modification dynamique du schéma</strong><br/> par exemple<i>, ajout/suppression de champs, modification des longueurs varchar</i><br/><br/><strong>SDK</strong> Rust<strong>et C#</strong></td>
        </tr>
    </tbody>
</table>
<ul>
<li>Notre feuille de route est généralement structurée en trois parties : la version la plus récente, la prochaine version à venir et une vision à moyen et long terme pour l'année prochaine.</li>
<li>Au fur et à mesure que nous progressons, nous apprenons continuellement et nous ajustons occasionnellement notre objectif, en ajoutant ou en supprimant des éléments si nécessaire.</li>
<li>Ces plans sont indicatifs et sujets à modification, et peuvent varier en fonction des services d'abonnement.</li>
<li>Nous respectons scrupuleusement notre feuille de route, nos <a href="/docs/fr/v2.4.x/release_notes.md">notes de version</a> servant de référence.</li>
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
