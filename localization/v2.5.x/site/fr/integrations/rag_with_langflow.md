---
id: rag_with_langflow.md
summary: >-
  Ce guide montre comment utiliser Langflow pour construire un pipeline de
  Génération Assistée par Récupération (RAG) avec Milvus.
title: Construction d'un système RAG à l'aide de Langflow avec Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Construction d'un système RAG à l'aide de Langflow avec Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide montre comment utiliser <a href="https://www.langflow.org/">Langflow</a> pour construire un pipeline Retrieval-Augmented Generation (RAG) avec <a href="https://milvus.io/">Milvus</a>.</p>
<p>Le système RAG améliore la génération de texte en récupérant d'abord les documents pertinents d'une base de connaissances, puis en générant de nouvelles réponses basées sur ce contexte. Milvus est utilisé pour stocker et récupérer les enchâssements de texte, tandis que Langflow facilite l'intégration de la récupération et de la génération dans un flux de travail visuel.</p>
<p>Langflow permet de construire facilement des pipelines RAG, où des morceaux de texte sont intégrés, stockés dans Milvus et récupérés lorsque des requêtes pertinentes sont formulées. Cela permet au modèle linguistique de générer des réponses éclairées par le contexte.</p>
<p>Milvus sert de base de données vectorielle évolutive qui trouve rapidement des textes sémantiquement similaires, tandis que Langflow vous permet de gérer la manière dont votre pipeline traite la récupération de texte et la génération de réponses. Ensemble, ils fournissent un moyen efficace de construire un pipeline RAG robuste pour des applications textuelles améliorées.</p>
<h2 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'exécuter ce bloc-notes, assurez-vous que les dépendances suivantes sont installées :</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutoriel<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que toutes les dépendances sont installées, démarrez un tableau de bord Langflow en tapant la commande suivante :</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Un tableau de bord s'affichera alors comme indiqué ci-dessous : <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Nous voulons créer un projet <strong>Vector Store</strong>, nous devons donc d'abord cliquer sur le bouton <strong>Nouveau projet</strong>. Un tableau de bord s'affiche et nous choisissons l'option <strong>Vector Store RAG</strong>: <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Une fois le projet Vector Store Rag créé avec succès, le magasin de vecteurs par défaut est AstraDB, alors que nous voulons utiliser Milvus. Nous devons donc remplacer ces deux modules astraDB par Milvus afin d'utiliser Milvus comme magasin de vecteurs. <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Etapes pour remplacer astraDB par Milvus :</h3><ol>
<li>Supprimez les cartes existantes du magasin vectoriel. Cliquez sur les deux cartes AstraDB marquées en rouge dans l'image ci-dessus, et appuyez sur la <strong>touche d'effacement arrière</strong> pour les supprimer.</li>
<li>Cliquez sur l'option <strong>Vector Store</strong> dans la barre latérale, choisissez Milvus et faites-le glisser dans le canevas. Faites-le deux fois car nous avons besoin de deux cartes Milvus, l'une pour stocker le flux de traitement des fichiers et l'autre pour le flux de recherche.</li>
<li>Liez les modules Milvus au reste des composants. Voir l'image ci-dessous pour référence.</li>
<li>Configurer les informations d'identification Milvus pour les deux modules Milvus. La manière la plus simple est d'utiliser Milvus Lite en définissant l'URI de connexion à milvus_demo.db. Si vous disposez d'un serveur Milvus auto-déployé ou sur Zilliz Cloud, définissez l'URI de connexion sur le point d'extrémité du serveur et le mot de passe de connexion sur le jeton (pour Milvus, il s'agit de la concaténation &quot;<username>:<password>&quot;, pour Zilliz Cloud, il s'agit de la clé API). Voir l'image ci-dessous pour référence :</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Démonstration de la structure de Milvus</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Intégrer des connaissances dans le système RAG</h3><ol>
<li>Téléchargez un fichier dans la base de connaissances de LLM via le module de fichier en bas à gauche. Ici, nous avons téléchargé un fichier contenant une brève introduction à Milvus.</li>
<li>Exécuter le flux de travail d'insertion en appuyant sur le bouton d'exécution du module Milvus en bas à droite. Cette opération permet d'insérer les connaissances dans la base de données vectorielles de Milvus.</li>
<li>Tester si les connaissances sont en mémoire. Ouvrez l'aire de jeux et posez des questions sur le fichier que vous avez téléchargé.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>pourquoi milvus</span> </span></p>
