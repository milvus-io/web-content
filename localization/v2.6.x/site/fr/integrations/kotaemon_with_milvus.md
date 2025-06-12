---
id: kotaemon_with_milvus.md
summary: >-
  Ce tutoriel vous guidera dans la personnalisation de votre application
  kotaemon à l'aide de Milvus.
title: Kotaemon RAG avec Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG avec Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> est une interface RAG open-source propre et personnalisable pour dialoguer avec vos documents. Elle a été conçue pour les utilisateurs finaux et les développeurs.</p>
<p>Kotaemon fournit une interface web personnalisable et multi-utilisateurs pour l'assurance qualité des documents, prenant en charge les LLM locaux et basés sur l'API. Il offre un pipeline RAG hybride avec recherche plein texte et vectorielle, une AQ multimodale pour les documents avec figures et tableaux, et des citations avancées avec prévisualisation des documents. Il prend en charge des méthodes de raisonnement complexes telles que ReAct et ReWOO, et fournit des paramètres configurables pour l'extraction et la génération.</p>
<p>Ce tutoriel vous guidera dans la personnalisation de votre application kotaemon à l'aide de <a href="https://milvus.io/">Milvus</a>.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Installation de kotaemon</h3><p>Nous recommandons d'installer kotaemon de cette manière :</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">optional (setup <span class="hljs-built_in">env</span>)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git clone https://github.com/Cinnamon/kotaemon
cd kotaemon

pip install -e &quot;libs/kotaemon[all]&quot;
pip install -e &quot;libs/ktem&quot;
<button class="copy-code-btn"></button></code></pre>
<p>Outre cette méthode, il existe d'autres façons d'installer kotaemon. Vous pouvez vous référer à la <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">documentation officielle</a> pour plus de détails.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Définir Milvus comme stockage vectoriel par défaut</h3><p>Pour changer le stockage vectoriel par défaut en Milvus, vous devez modifier le fichier <code translate="no">flowsettings.py</code> en remplaçant <code translate="no">KH_VECTORSTORE</code> par :</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Définir les variables d'environnement</h3><p>vous pouvez configurer les modèles via le fichier <code translate="no">.env</code> avec les informations nécessaires pour se connecter aux LLM et aux modèles d'intégration, par exemple OpenAI, Azure, Ollama, etc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Exécuter Kotaemon</h3><p>Après avoir configuré les variables d'environnement et modifié le stockage des vecteurs, vous pouvez lancer kotaemon en exécutant la commande suivante :</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Le nom d'utilisateur et le mot de passe par défaut sont <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">Démarrer RAG avec kotaemon<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Ajoutez vos modèles d'IA</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dans l'onglet <code translate="no">Resources</code>, vous pouvez ajouter et définir vos LLM et vos modèles d'intégration. Vous pouvez ajouter plusieurs modèles et les définir comme actifs ou inactifs. Il vous suffit d'en fournir au moins un. Vous pouvez également fournir plusieurs modèles pour pouvoir passer de l'un à l'autre.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Téléchargez vos documents</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Afin d'effectuer l'assurance qualité sur vos documents, vous devez d'abord les télécharger dans l'application. Naviguez jusqu'à l'onglet <code translate="no">File Index</code>, et vous pourrez télécharger et gérer vos documents personnalisés.</p>
<p>Par défaut, toutes les données de l'application sont stockées dans le dossier <code translate="no">./ktem_app_data</code>. Les données de la base de données Milvus sont stockées dans le dossier <code translate="no">./ktem_app_data/user_data/vectorstore</code>. Vous pouvez sauvegarder ou copier ce dossier pour déplacer votre installation sur une nouvelle machine.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Chat avec vos documents</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Retournez maintenant à l'onglet <code translate="no">Chat</code>. L'onglet Chat se compose de trois parties : le panneau des paramètres de conversation, où vous gérez les conversations et les références de fichiers ; le panneau de chat pour interagir avec le chatbot ; et le panneau d'information, qui affiche les preuves, les notes de confiance et les notes de pertinence pour les réponses.</p>
<p>Vous pouvez sélectionner vos documents dans le panneau des paramètres de la conversation. Il vous suffit ensuite de lancer RAG avec vos documents en tapant un message dans le champ de saisie et de l'envoyer au chatbot.</p>
<p>Si vous souhaitez approfondir l'utilisation de kotaemon, vous pouvez obtenir des conseils complets dans la <a href="https://cinnamon.github.io/kotaemon/usage/">documentation officielle</a>.</p>
