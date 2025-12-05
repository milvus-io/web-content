---
id: how_to_enhance_your_rag.md
summary: >-
  La popularité croissante des applications RAG (Retrieval Augmented Generation)
  s'accompagne d'une préoccupation grandissante pour l'amélioration de leurs
  performances. Cet article présente toutes les manières possibles d'optimiser
  les pipelines RAG et fournit les illustrations correspondantes pour vous aider
  à comprendre rapidement les principales stratégies d'optimisation RAG.
title: Comment améliorer les performances de votre pipeline RAG
---
<h1 id="How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="common-anchor-header">Comment améliorer les performances de votre pipeline RAG<button data-href="#How-to-Enhance-the-Performance-of-Your-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h1><p>La popularité croissante des applications<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">RAG (</a>Retrieval Augmented Generation) s'accompagne d'une préoccupation grandissante pour l'amélioration de leurs performances. Cet article présente toutes les façons possibles d'optimiser les pipelines RAG et fournit des illustrations correspondantes pour vous aider à comprendre rapidement les principales stratégies d'optimisation RAG.</p>
<p>Il est important de noter que nous ne fournirons qu'une exploration de haut niveau de ces stratégies et techniques, en nous concentrant sur la façon dont elles s'intègrent dans un système RAG. Cependant, nous n'entrerons pas dans les détails complexes et ne vous guiderons pas dans la mise en œuvre étape par étape.</p>
<h2 id="A-Standard-RAG-Pipeline" class="common-anchor-header">Un pipeline RAG standard<button data-href="#A-Standard-RAG-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme ci-dessous illustre le pipeline RAG vanille le plus simple. Tout d'abord, les morceaux de documents sont chargés dans un magasin de vecteurs (comme <a href="https://milvus.io/docs">Milvus</a> ou <a href="https://zilliz.com/cloud">Zilliz cloud</a>). Ensuite, le magasin de vecteurs récupère les K morceaux les plus pertinents par rapport à la requête. Ces morceaux pertinents sont ensuite injectés dans l'invite contextuelle du <a href="https://zilliz.com/glossary/large-language-models-(llms)">LLM</a>, et enfin, le LLM renvoie la réponse finale.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/vanilla_rag.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Various-Types-of-RAG-Enhancement-Techniques" class="common-anchor-header">Différents types de techniques d'amélioration des RAG<button data-href="#Various-Types-of-RAG-Enhancement-Techniques" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous pouvons classer les différentes approches d'amélioration des RAG en fonction de leur rôle dans les étapes du pipeline des RAG.</p>
<ul>
<li><strong>Amélioration des requêtes</strong>: Modifier et manipuler le processus d'interrogation de l'entrée RAG pour mieux exprimer ou traiter l'intention de l'interrogation.</li>
<li><strong>Amélioration de l'indexation</strong>: Optimisation de la création d'index de regroupement à l'aide de techniques telles que le regroupement multiple, l'indexation par étapes ou l'indexation multivoie.</li>
<li><strong>Amélioration de la recherche</strong>: Application de techniques et de stratégies d'optimisation au cours du processus de recherche.</li>
<li><strong>Amélioration du générateur</strong>: Ajustement et optimisation des messages-guides lors de l'assemblage des messages-guides pour le LLM afin de fournir de meilleures réponses.</li>
<li><strong>Amélioration du pipeline RAG</strong>: Changement dynamique des processus dans l'ensemble du pipeline RAG, y compris l'utilisation d'agents ou d'outils pour optimiser les étapes clés du pipeline RAG.</li>
</ul>
<p>Nous présenterons ensuite des méthodes spécifiques pour chacune de ces catégories.</p>
<h2 id="Query-Enhancement" class="common-anchor-header">Amélioration des requêtes<button data-href="#Query-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous allons explorer quatre méthodes efficaces pour améliorer l'expérience de la recherche : Les questions hypothétiques, l'intégration de documents hypothétiques, les sous-requêtes et les invitations à revenir en arrière.</p>
<h3 id="Creating-Hypothetical-Questions" class="common-anchor-header">Création de questions hypothétiques</h3><p>La création de questions hypothétiques implique l'utilisation d'un LLM pour générer plusieurs questions que les utilisateurs pourraient poser sur le contenu de chaque fragment de document. Avant que la requête réelle de l'utilisateur n'atteigne le LLM, le magasin de vecteurs récupère les questions hypothétiques les plus pertinentes liées à la requête réelle, ainsi que les morceaux de documents correspondants, et les transmet au LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hypothetical_question.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette méthodologie contourne le problème de l'asymétrie entre domaines dans le processus de recherche vectorielle en s'engageant directement dans des recherches de requête à requête, ce qui allège le fardeau des recherches vectorielles. Cependant, elle introduit une surcharge et une incertitude supplémentaires dans la génération de questions hypothétiques.</p>
<h3 id="HyDE-Hypothetical-Document-Embeddings" class="common-anchor-header">HyDE (Hypothetical Document Embeddings)</h3><p>HyDE est l'acronyme de Hypothetical Document Embeddings. Il s'appuie sur un LLM pour élaborer un &quot;<strong><em>document hypothétique</em></strong>&quot; ou une <strong><em>fausse</em></strong> réponse en réponse à une requête de l'utilisateur dépourvue d'informations contextuelles. Cette réponse fictive est ensuite convertie en vecteurs intégrés et utilisée pour interroger les morceaux de documents les plus pertinents dans une base de données vectorielle. Par la suite, la base de données vectorielle récupère les Top-K morceaux de documents les plus pertinents et les transmet au LLM et à la requête originale de l'utilisateur pour générer la réponse finale.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hyde.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette méthode est similaire à la technique de la question hypothétique pour traiter l'asymétrie entre domaines dans les recherches vectorielles. Cependant, elle présente également des inconvénients, tels que les coûts de calcul supplémentaires et les incertitudes liées à la génération de fausses réponses.</p>
<p>Pour plus d'informations, consultez le document <a href="https://arxiv.org/abs/2212.10496">HyDE</a>.</p>
<h3 id="Creating-Sub-Queries" class="common-anchor-header">Création de sous-requêtes</h3><p>Lorsqu'une requête d'utilisateur est trop compliquée, nous pouvons utiliser un LLM pour la décomposer en sous-requêtes plus simples avant de les transmettre à la base de données vectorielle et au LLM. Prenons un exemple.</p>
<p>Imaginons qu'un utilisateur demande :<strong><em>&quot;Quelles sont les différences de fonctionnalités entre Milvus et Zilliz Cloud ?</em></strong>&quot; Cette question est assez complexe et pourrait ne pas avoir de réponse directe dans notre base de connaissances. Pour répondre à cette question, nous pouvons la diviser en deux sous-questions plus simples :</p>
<ul>
<li>Sous-requête 1 : "Quelles sont les caractéristiques de Milvus ?"</li>
<li>Sous-requête 2 : "Quelles sont les caractéristiques de Zilliz Cloud ?"</li>
</ul>
<p>Une fois que nous disposons de ces sous-requêtes, nous les envoyons toutes à la base de données vectorielles après les avoir converties en encastrements vectoriels. La base de données vectorielle trouve ensuite les morceaux de documents Top-K les plus pertinents pour chaque sous-requête. Enfin, le LLM utilise ces informations pour générer une meilleure réponse.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>En décomposant la requête de l'utilisateur en sous-requêtes, nous permettons à notre système de trouver plus facilement des informations pertinentes et de fournir des réponses précises, même à des questions complexes.</p>
<h3 id="Creating-Stepback-Prompts" class="common-anchor-header">Création d'invites de retour en arrière</h3><p>Un autre moyen de simplifier les requêtes complexes des utilisateurs consiste à créer des <strong><em>invites de retour en arrière</em></strong>. Cette technique consiste à abstraire les requêtes complexes des utilisateurs en <em><em>&quot;</em>questions de retour en arrière</em>&quot;** à l'aide d'un LLM. Ensuite, une base de données vectorielle utilise ces questions pour extraire les morceaux de documents les plus pertinents. Enfin, le LLM génère une réponse plus précise sur la base de ces morceaux de documents récupérés.</p>
<p>Illustrons cette technique par un exemple. Considérons la requête suivante, qui est assez complexe et à laquelle il n'est pas facile de répondre directement :</p>
<p><strong><em>Requête originale de l'utilisateur : "J'ai un ensemble de données contenant 10 milliards d'enregistrements et je souhaite le stocker dans Milvus pour l'interroger. Est-ce possible ?"</em></strong></p>
<p>Pour simplifier cette demande de l'utilisateur, nous pouvons utiliser un LLM pour générer une question de retour en arrière plus simple :</p>
<p><strong><em>Question de retour en arrière : "Quelle est la taille limite de l'ensemble de données que Milvus peut traiter ?"</em></strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/stepback.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette méthode peut nous aider à obtenir des réponses meilleures et plus précises à des requêtes complexes. Elle décompose la question initiale en une forme plus simple, ce qui permet à notre système de trouver plus facilement des informations pertinentes et de fournir des réponses précises.</p>
<h2 id="Indexing-Enhancement" class="common-anchor-header">Amélioration de l'indexation<button data-href="#Indexing-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>L'amélioration de l'indexation est une autre stratégie pour améliorer les performances de vos applications RAG. Examinons trois techniques d'amélioration de l'indexation.</p>
<h3 id="Merging-Document-Chunks-Automatically" class="common-anchor-header">Fusionner automatiquement des morceaux de documents</h3><p>Lors de la construction d'un index, nous pouvons utiliser deux niveaux de granularité : les morceaux enfants et les morceaux parents correspondants. Dans un premier temps, nous recherchons les morceaux enfants à un niveau de détail plus fin. Ensuite, nous appliquons une stratégie de fusion : si un nombre spécifique, <strong><em>n</em></strong>, de morceaux enfants des <strong><em>k</em></strong> premiers morceaux enfants appartiennent au même morceau parent, nous fournissons ce morceau parent au LLM en tant qu'information contextuelle.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/merge_chunks.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette méthodologie a été mise en œuvre dans <a href="https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes.html">LlamaIndex</a>.</p>
<h3 id="Constructing-Hierarchical-Indices" class="common-anchor-header">Construction d'index hiérarchiques</h3><p>Lors de la création d'index pour les documents, nous pouvons établir un index à deux niveaux : un pour les résumés de documents et un autre pour les morceaux de documents. Le processus de recherche vectorielle comprend deux étapes : dans un premier temps, nous filtrons les documents pertinents sur la base du résumé et, dans un deuxième temps, nous récupérons les morceaux de documents correspondants exclusivement à l'intérieur de ces documents pertinents.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hierarchical_index.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette approche s'avère bénéfique dans les situations impliquant des volumes de données importants ou dans les cas où les données sont hiérarchisées, comme la recherche de contenu dans une collection de bibliothèque.</p>
<h3 id="Hybrid-Retrieval-and-Reranking" class="common-anchor-header">Recherche hybride et reclassement</h3><p>La technique de recherche hybride et de reclassement intègre une ou plusieurs méthodes de recherche supplémentaires à la <a href="https://zilliz.com/learn/vector-similarity-search">recherche par similarité vectorielle</a>. Ensuite, un <a href="https://zilliz.com/learn/optimize-rag-with-rerankers-the-role-and-tradeoffs#What-is-a-Reranker">reranker</a> classe les résultats récupérés en fonction de leur pertinence par rapport à la requête de l'utilisateur.</p>
<p>Les algorithmes de recherche supplémentaires courants comprennent des méthodes basées sur la fréquence lexicale, comme <a href="https://milvus.io/docs/embed-with-bm25.md">BM25</a>, ou des modèles de grande taille utilisant des encastrements épars, comme <a href="https://zilliz.com/learn/discover-splade-revolutionize-sparse-data-processing">Splade</a>. Les algorithmes de reclassement comprennent la méthode RRF ou des modèles plus sophistiqués tels que <a href="https://www.sbert.net/examples/applications/cross-encoder/README.html">Cross-Encoder</a>, qui s'apparente aux architectures de type BERT.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette approche s'appuie sur diverses méthodes de recherche pour améliorer la qualité de la recherche et combler les lacunes potentielles dans le rappel des vecteurs.</p>
<h2 id="Retriever-Enhancement" class="common-anchor-header">Amélioration du récupérateur<button data-href="#Retriever-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Le perfectionnement de l'élément de récupération au sein du système RAG peut également améliorer les applications RAG. Examinons quelques méthodes efficaces pour améliorer le récupérateur.</p>
<h3 id="Sentence-Window-Retrieval" class="common-anchor-header">Récupération de la fenêtre de phrase</h3><p>Dans un système RAG de base, le morceau de document donné au LLM est une fenêtre plus large qui englobe le morceau d'encastrement récupéré. Cela garantit que les informations fournies au LLM comprennent une gamme plus large de détails contextuels, minimisant ainsi la perte d'informations. La technique de récupération par fenêtre de phrase découple le morceau de document utilisé pour la récupération de l'intégration du morceau fourni au LLM.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/sentence_window.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cependant, l'extension de la taille de la fenêtre peut introduire des informations parasites supplémentaires. Nous pouvons ajuster la taille de l'expansion de la fenêtre en fonction des besoins spécifiques de l'entreprise.</p>
<h3 id="Meta-data-Filtering" class="common-anchor-header">Filtrage des métadonnées</h3><p>Pour garantir des réponses plus précises, nous pouvons affiner les documents récupérés en filtrant les métadonnées telles que l'heure et la catégorie avant de les transmettre au LLM. Par exemple, si des rapports financiers couvrant plusieurs années sont récupérés, un filtrage basé sur l'année souhaitée permettra d'affiner les informations pour répondre à des besoins spécifiques. Cette méthode s'avère efficace dans les situations où les données sont nombreuses et les métadonnées détaillées, telles que la recherche de contenu dans les collections de bibliothèques.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/metadata_filtering.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="Generator-Enhancement" class="common-anchor-header">Amélioration du générateur<button data-href="#Generator-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Explorons d'autres techniques d'optimisation des RAG en améliorant le générateur au sein d'un système RAG.</p>
<h3 id="Compressing-the-LLM-prompt" class="common-anchor-header">Compression de l'invite LLM</h3><p>Les informations parasites contenues dans les morceaux de documents récupérés peuvent avoir un impact significatif sur la précision de la réponse finale du RAG. La fenêtre d'invite limitée des LLM constitue également un obstacle à l'obtention de réponses plus précises. Pour relever ce défi, nous pouvons comprimer les détails non pertinents, mettre l'accent sur les paragraphes clés et réduire la longueur globale du contexte des morceaux de documents récupérés.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/compress_prompt.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Cette approche est similaire à la méthode hybride d'extraction et de reclassement discutée précédemment, dans laquelle un reclasseur est utilisé pour trier les morceaux de documents non pertinents.</p>
<h3 id="Adjusting-the-chunk-order-in-the-prompt" class="common-anchor-header">Ajustement de l'ordre des morceaux dans l'invite</h3><p>Dans l'article &quot;<a href="https://arxiv.org/abs/2307.03172">Lost in the middle</a>&quot;, les chercheurs ont observé que les LLM négligent souvent les informations au milieu des documents donnés pendant le processus de raisonnement. Au lieu de cela, ils ont tendance à s'appuyer davantage sur les informations présentées au début et à la fin des documents.</p>
<p>Sur la base de cette observation, nous pouvons ajuster l'ordre des morceaux extraits pour améliorer la qualité de la réponse : lors de l'extraction de plusieurs morceaux de connaissance, les morceaux dont la confiance est relativement faible sont placés au milieu, et les morceaux dont la confiance est relativement élevée sont placés aux deux extrémités.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/adjust_order.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<h2 id="RAG-Pipeline-Enhancement" class="common-anchor-header">Amélioration du pipeline RAG<button data-href="#RAG-Pipeline-Enhancement" class="anchor-icon" translate="no">
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
    </button></h2><p>Nous pouvons également améliorer les performances de vos applications RAG en améliorant l'ensemble du pipeline RAG.</p>
<h3 id="Self-reflection" class="common-anchor-header">Auto-réflexion</h3><p>Cette approche intègre le concept d'autoréflexion dans les agents d'intelligence artificielle. Comment cette technique fonctionne-t-elle ?</p>
<p>Certains morceaux de documents Top-K initialement récupérés sont ambigus et peuvent ne pas répondre directement à la question de l'utilisateur. Dans ce cas, nous pouvons procéder à un second tour de réflexion pour vérifier si ces morceaux peuvent réellement répondre à la requête.</p>
<p>Nous pouvons mener cette réflexion en utilisant des méthodes de réflexion efficaces telles que les modèles d'inférence du langage naturel (NLI) ou des outils supplémentaires tels que les recherches sur Internet pour la vérification.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/self_reflection.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Ce concept d'autoréflexion a été exploré dans plusieurs articles ou projets, notamment <a href="https://arxiv.org/pdf/2310.11511.pdf">Self-RAG</a>, <a href="https://arxiv.org/pdf/2401.15884.pdf">Corrective RAG</a>, <a href="https://github.com/langchain-ai/langgraph/blob/main/examples/reflexion/reflexion.ipynb">LangGraph</a>, etc.</p>
<h3 id="Query-Routing-with-an-Agent" class="common-anchor-header">Routage de requêtes avec un agent</h3><p>Parfois, il n'est pas nécessaire d'utiliser un système de RAG pour répondre à des questions simples, car cela pourrait entraîner davantage de malentendus et d'inférences à partir d'informations trompeuses. Dans ce cas, nous pouvons utiliser un agent comme routeur au stade de l'interrogation. Cet agent évalue si la requête doit passer par le pipeline RAG. Si c'est le cas, le pipeline RAG suivant est lancé ; dans le cas contraire, le LLM répond directement à la requête.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>


  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/advanced_rag/query_routing_with_sub_query.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>L'agent peut prendre différentes formes, notamment un LLM, un petit modèle de classification ou même un ensemble de règles.</p>
<p>En acheminant les requêtes en fonction de l'intention de l'utilisateur, vous pouvez rediriger une partie des requêtes, ce qui permet d'améliorer considérablement le temps de réponse et de réduire sensiblement les bruits inutiles.</p>
<p>Nous pouvons étendre la technique d'acheminement des requêtes à d'autres processus au sein du système RAG, par exemple en déterminant quand utiliser des outils tels que les recherches sur le web, en effectuant des sous-requêtes ou en recherchant des images. Cette approche garantit que chaque étape du système RAG est optimisée en fonction des exigences spécifiques de la requête, ce qui permet une recherche d'informations plus efficace et plus précise.</p>
<h2 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Bien qu'un pipeline RAG vanille puisse sembler simple, l'obtention de performances commerciales optimales nécessite souvent des techniques d'optimisation plus sophistiquées.</p>
<p>Cet article résume diverses approches populaires permettant d'améliorer les performances de vos applications RAG. Nous avons également fourni des illustrations claires pour vous aider à comprendre rapidement ces concepts et techniques et à accélérer leur mise en œuvre et leur optimisation.</p>
<p>Vous pouvez obtenir les implémentations simples des principales approches énumérées dans cet article sur ce <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">lien GitHub</a>.</p>
