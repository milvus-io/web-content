---
id: search_with_jev.md
summary: >-
  La recherche vectorielle permet de trouver des informations en rapport avec
  une requête. La conception d'une application de recherche efficace implique
  également de prendre des décisions : déterminer quels passages répondent
  réellement à la question, décider si une réponse antérieure peut être
  réutilisée, et évaluer si un agent dispose de suffisamment d'éléments pour
  mettre fin à la recherche.
title: Créer un modèle RAG avec Milvus et PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Recherche avec Jev et Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche vectorielle permet de trouver des informations en rapport avec une requête. La création d’une application de recherche utile implique également de prendre des décisions : quels passages répondent réellement à la question, si une réponse antérieure peut être réutilisée, et si un agent dispose de suffisamment d’éléments pour mettre fin à la recherche.</p>
<p>Milvus et Jev interviennent à différentes étapes de ce processus. <a href="https://milvus.io/">Milvus</a> stocke les représentations vectorielles et récupère les enregistrements candidats, à l'aide de filtres de métadonnées permettant d'appliquer des contraintes telles que la version du produit ou le périmètre de la base de connaissances. <a href="https://docs.typesafe.ai/introduction">Jev</a> évalue la pertinence du texte récupéré par rapport aux instructions. Votre application peut utiliser ses évaluations pour sélectionner des éléments probants ou contrôler l'étape suivante de la recherche.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Que fait Jev ?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Une requête Jev fournit un contexte et une ou plusieurs questions d’évaluation. Ses <a href="https://docs.typesafe.ai/primitives">résultats structurés</a> comprennent un choix parmi des options fixes, un score classé par ordre d’importance et une probabilité « oui/non ». Ces résultats permettent au code de l’application de prendre une décision sans avoir à analyser une explication en format libre. Un modèle de génération peut toujours rédiger une réponse ou une requête de recherche complémentaire si nécessaire.</p>
<p>Par exemple, un utilisateur demande comment installer Atlas v2. Milvus peut limiter la recherche à la documentation de la version 2 et renvoyer des passages pertinents concernant l’installation, les mises à jour et le dépannage. Jev évalue ensuite quels passages expliquent la configuration initiale. L’application transmet les éléments de preuve sélectionnés à un modèle de génération de réponses.</p>
<p>Les responsabilités sont claires :</p>
<ol>
<li><strong>Récupération avec Milvus :</strong> trouver des candidats en respectant les contraintes de métadonnées requises.</li>
<li><strong>Évaluation avec Jev :</strong> évaluer ces résultats par rapport à la question et à un critère spécifique à la tâche.</li>
<li><strong>Agir dans le code de l’application :</strong> réorganiser les résultats, filtrer le contexte, réutiliser une réponse ou poursuivre la recherche.</li>
</ol>
<p>Certaines décisions sont prises avant la recherche. Jev peut choisir un périmètre de recherche ou évaluer les documents entrants avant qu’ils n’intègrent une collection. Le contrôle d’accès et les filtres précis restent de la responsabilité de l’application.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Découvrez les scénarios de recherche<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">La collection</a> « <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Recherche avec Jev</a> » contient neuf tutoriels exécutables. Chacun utilise un petit ensemble de données synthétiques et présente les enregistrements extraits, les évaluations et l’action qui en résulte.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Sélectionner de meilleures preuves<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Réclasser les résultats de recherche</a>: réorganiser la documentation et les mémoires des agents de codage. Un souvenir concernant une erreur de port sur un ordinateur portable peut ressembler à un problème de connexion de conteneur ; un souvenir plus utile consigne la solution réelle au niveau de l’hôte du conteneur.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Filtrer le contexte récupéré</a>: distinguer les instructions d’installation initiale des passages relatifs à la mise à jour et au dépannage après que Milvus a appliqué le filtre de version.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Réorganiser les relations du graphe</a>: répondez à une question sur le lieu de naissance de l’auteur d’un livre en sélectionnant à la fois le lien « livre-auteur » et la relation « auteur-lieu de naissance », puis conservez ce classement lors de la récupération des passages sources.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Contrôler la recherche et la réutilisation des réponses<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Décider quand arrêter la recherche</a>: un modèle de génération propose des recherches à partir des preuves accumulées, tandis que Jev détermine si la question initiale peut recevoir une réponse. Les exemples couvrent une réponse directe, une question à deux sauts et un fait indisponible qui atteint la limite de recherche sans réponse.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Acheminement des requêtes de recherche</a>: sélectionnez la recherche dans la documentation, la facturation ou la mémoire, puis appliquez le filtre Milvus correspondant. Une requête hors champ suit un chemin distinct.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Valider la réutilisation du cache sémantique</a>: récupérer une requête similaire mise en cache, puis vérifier si sa réponse répond également aux exigences de la nouvelle requête en termes de tâche, de langue et de contexte.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Améliorer et inspecter le pipeline de connaissances<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Sélectionner les documents avant l’indexation</a>: distinguer les conseils opérationnels de fond des contenus promotionnels ou incomplets, à l’aide d’actions distinctes d’indexation, de révision et d’exclusion.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Filtrer les passages extraits</a>: identifier les textes qui tentent de détourner un assistant, tout en conservant les conseils de sécurité courants. Il s’agit d’une étape de filtrage supplémentaire, et non d’une garantie de sécurité.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Évaluer les éléments probants de la recherche</a>: juger de la pertinence des passages, déterminer si les éléments probants sont suffisants et si une réponse avance des affirmations non étayées. Les exemples suppriment délibérément des éléments probants ou ajoutent une affirmation non étayée afin de rendre la distinction visible.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Une interface de reclassement prête à l’emploi<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> fournit une interface côté application <code translate="no">JevRerankFunction</code>: transmettez une requête et les textes des documents candidats, et recevez des résultats notés avec leurs indices d’origine, triés par pertinence. Utilisez ces indices pour réorganiser les enregistrements renvoyés par Milvus.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">L’intégration Jev</a> a été fusionnée. Consultez les <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">options d’implémentation et de constructeur</a> de l’API actuelle. Elle accepte l’ <code translate="no">TYPESAFE_API_KEY</code> et utilise par défaut <code translate="no">jev-latest</code>. Utilisez une version du package qui inclut cette intégration.</p>
<p>Le wrapper actuel utilise une invite de pertinence de type « affirmation et preuve ». Vérifiez que ce critère correspond à votre tâche. Pour les évaluations personnalisées telles que la compatibilité de mémoire, l’arrêt ou le routage, suivez les tutoriels liés en utilisant directement l’API TypeSafe. Les tutoriels montrent des appels directs à l’API à partir du code d’une application Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Essayez-le avec Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Ouvrez le tutoriel de reclassement dans Colab</a> pour commencer par la récupération et le classement des candidats. Pour la configuration locale et la liste complète des tutoriels, consultez le fichier <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README de la collection</a>.</p>
<p>Les exemples utilisent une <a href="https://aistudio.google.com/apikey">clé API Gemini</a> pour les représentations et une <a href="https://console.typesafe.ai/">clé API TypeSafe</a> pour Jev. Le tutoriel sur la recherche agentique utilise également Gemini pour la génération de requêtes et de réponses. Des exemples de texte sont envoyés à ces fournisseurs d’API, et les appels peuvent consommer des crédits.</p>
<p>Les tutoriels s’exécutent par défaut avec <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> et incluent des options de connexion à un serveur Milvus ou à <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. La même répartition des tâches s’applique à tous les déploiements : Milvus récupère les candidats, et l’application envoie le texte pertinent à Jev pour évaluation.</p>
<p>Considérez ces exemples comme des points de départ pour définir vos propres critères et seuils. Un score de pertinence ne garantit pas qu’une réponse soit correcte, et ces petits ensembles de données d’apprentissage ne permettent pas d’établir la précision ou la vitesse en conditions de production.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Découvrez les implémentations et les résultats d’évaluation<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Les projets open source suivants appliquent ces concepts à des workflows de recherche à plus grande échelle. Les rapports associés expliquent les ensembles de données, les comparaisons et les limites de chaque expérience.</p>
<table>
<thead>
<tr><th>Projet</th><th>Cas d’utilisation de la recherche</th><th>Travaux de Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Mémoire Markdown persistante pour les agents de codage</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Implémentation Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Évaluation</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Graphique vectoriel RAG</a></td><td>Récupération de vecteurs et de graphes pour les questions à plusieurs sauts</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Implémentation Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Évaluation</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Recherche itérative sur des connaissances privées</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Exécuteur d’expériences</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Évaluation par arrêt de la recherche</a> (expérience autonome)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Réutilisation des réponses aux requêtes compatibles</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Implémentation Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Évaluation</a></td></tr>
</tbody>
</table>
<p>La contribution de DeepSearcher consiste en une expérience autonome d’arrêt de la recherche. Les autres liens vers des implémentations présentent des intégrations de Jev spécifiques à certaines tâches. Les résultats de ces projets doivent être interprétés dans leur propre contexte d’évaluation, plutôt que d’être considérés comme une référence commune.</p>
