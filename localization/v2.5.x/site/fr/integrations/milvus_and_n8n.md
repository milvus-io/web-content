---
id: milvus_and_n8n.md
summary: >-
  n8n est une puissante plateforme open-source d'automatisation des flux de
  travail qui vous permet de connecter diverses applications, services et API
  afin de créer des flux de travail automatisés sans codage. Grâce à son
  interface visuelle basée sur les nœuds, n8n permet aux utilisateurs de
  construire des processus d'automatisation complexes en connectant simplement
  des nœuds qui représentent différents services ou actions. Il est
  auto-hébergeable, hautement extensible et prend en charge à la fois les
  licences fair-code et les licences d'entreprise.
title: Premiers pas avec Milvus et n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Démarrage avec Milvus et n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Introduction à n8n et au nœud de magasin vectoriel Milvus<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> est une puissante plateforme open-source d'automatisation des flux de travail qui vous permet de connecter diverses applications, services et API afin de créer des flux de travail automatisés sans codage. Grâce à son interface visuelle basée sur les nœuds, n8n permet aux utilisateurs de construire des processus d'automatisation complexes en connectant simplement des nœuds qui représentent différents services ou actions. Il est auto-hébergeable, hautement extensible et prend en charge à la fois les licences fair-code et les licences d'entreprise.</p>
<p>Le nœud <strong>Milvus Vector Store</strong> de n8n intègre <a href="https://milvus.io/">Milvus</a> dans vos processus d'automatisation. Cela vous permet d'effectuer des recherches sémantiques, d'alimenter des systèmes de génération augmentée par récupération (RAG) et de construire des applications d'IA intelligentes, le tout au sein de l'écosystème n8n.</p>
<p>Cette documentation est principalement basée sur la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentation</a> officielle <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">du Milvus Vector Store de n8n.</a> Si vous trouvez un contenu obsolète ou incohérent, veuillez donner la priorité à la documentation officielle et n'hésitez pas à nous faire part d'un problème.</p>
<h2 id="Key-Features" class="common-anchor-header">Caractéristiques principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Avec le nœud Milvus Vector Store dans n8n, vous pouvez :</p>
<ul>
<li>Interagir avec votre base de données Milvus en tant que <a href="https://docs.n8n.io/glossary/#ai-vector-store">magasin vectoriel</a></li>
<li>Insérer des documents dans Milvus</li>
<li>Obtenir des documents de Milvus</li>
<li>Récupérer des documents pour les fournir à un récupérateur connecté à une <a href="https://docs.n8n.io/glossary/#ai-chain">chaîne</a></li>
<li>Se connecter directement à un <a href="https://docs.n8n.io/glossary/#ai-agent">agent</a> en tant qu'<a href="https://docs.n8n.io/glossary/#ai-tool">outil</a></li>
<li>Filtrer les documents en fonction des métadonnées</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Modèles d'utilisation des nœuds<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser le nœud Milvus Vector Store dans n8n selon les modèles suivants.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Utilisation en tant que nœud normal pour insérer et récupérer des documents</h3><p>Vous pouvez utiliser le magasin virtuel Milvus comme un nœud ordinaire pour insérer ou récupérer des documents. Ce modèle place le magasin virtuel Milvus dans le flux de connexion normal sans utiliser d'agent.</p>
<p>Voir ce <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">modèle d'exemple</a> pour savoir comment construire un système qui stocke des documents dans Milvus et les récupère pour prendre en charge les réponses citées, basées sur le chat.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Connexion directe à un agent d'IA en tant qu'outil</h3><p>Vous pouvez connecter le nœud Milvus Vector Store directement au connecteur d'outil d'un <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">agent d'intelligence artificielle</a> pour utiliser un magasin de vecteurs comme ressource lors de la réponse à des requêtes.</p>
<p>Dans ce cas, la connexion serait la suivante : Agent d'IA (connecteur d'outils) -&gt; nœud de magasin vectoriel Milvus. Voir cet <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">exemple de modèle</a> où les données sont intégrées et indexées dans Milvus, et où l'agent d'IA utilise le magasin de vecteurs comme outil de connaissance pour répondre aux questions.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Utiliser un extracteur pour récupérer des documents</h3><p>Vous pouvez utiliser le nœud <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vector Store Retriever</a> avec le nœud Milvus Vector Store pour récupérer des documents à partir du nœud Milvus Vector Store. Cette fonction est souvent utilisée avec le nœud de <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">la chaîne de questions et réponses</a> pour extraire du magasin vectoriel les documents qui correspondent à l'entrée de chat donnée.</p>
<p>Le flux de connexion d'un nœud type se présente comme suit : Chaîne de questions et réponses (connecteur Retriever) -&gt; Magasin vectoriel Retriever (connecteur Magasin vectoriel) -&gt; Magasin vectoriel Milvus.</p>
<p>Consultez cet <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">exemple de flux de travail</a> pour voir comment ingérer des données externes dans Milvus et construire un système de questions-réponses sémantique basé sur le chat.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Utiliser l'outil de réponse aux questions du Vector Store pour répondre aux questions</h3><p>Un autre modèle utilise l'<a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">outil de réponse aux questions du magasin virtuel</a> pour résumer les résultats et répondre aux questions du nœud du magasin virtuel Milvus. Plutôt que de connecter le magasin vectoriel Milvus directement en tant qu'outil, ce schéma utilise un outil spécialement conçu pour résumer les données du magasin vectoriel.</p>
<p>Le flux de connexions se présenterait comme suit : Agent AI (connecteur d'outils) -&gt; Outil de réponse aux questions du magasin vectoriel (connecteur du magasin vectoriel) -&gt; Magasin vectoriel Milvus.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Modes de fonctionnement du nœud<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Le nœud du magasin virtuel Milvus prend en charge plusieurs modes de fonctionnement, chacun adapté à différents cas d'utilisation du flux de travail. La compréhension de ces modes permet de concevoir des flux de travail plus efficaces.</p>
<p>Nous présentons ci-dessous une vue d'ensemble des modes de fonctionnement et des options disponibles. Pour une liste complète des paramètres d'entrée et des options de configuration pour chaque mode, veuillez vous référer à la <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentation officielle</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Présentation des modes de fonctionnement</h3><p>Le nœud Milvus Vector Store prend en charge quatre modes distincts :</p>
<ul>
<li><strong>Obtenir plusieurs</strong>: Récupérer plusieurs documents en fonction de la similarité sémantique avec une invite.</li>
<li><strong>Insérer des documents</strong>: Insérer de nouveaux documents dans votre collection Milvus.</li>
<li><strong>Récupérer des documents (en tant que magasin vectoriel pour chaîne/outil)</strong>: Utiliser le nœud comme un récupérateur au sein d'un système basé sur une chaîne.</li>
<li><strong>Récupérer des documents (en tant qu'outil pour un agent IA)</strong>: Utilisez le nœud comme outil pour un agent d'intelligence artificielle lors des tâches de réponse aux questions.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Options supplémentaires pour les nœuds</h3><ul>
<li><strong>Filtre de métadonnées</strong> (mode "Obtenir beaucoup" uniquement) : Filtre les résultats en fonction de clés de métadonnées personnalisées. Plusieurs champs appliquent une condition ET.</li>
<li><strong>Effacer la collection</strong> (mode Insérer des documents uniquement) : Supprime les documents existants de la collection avant d'en insérer de nouveaux.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Ressources connexes</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Documentation sur l'intégration de n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Documentation LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Documentation sur l'IA avancée de n8n</a></li>
</ul>
