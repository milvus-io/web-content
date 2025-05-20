---
id: use_milvus_in_anythingllm.md
summary: >-
  Ce guide vous aidera à configurer Milvus en tant que base de données
  vectorielle dans AnythingLLM, ce qui vous permettra d'intégrer, de stocker et
  de rechercher vos documents en vue d'une récupération et d'une discussion
  intelligentes.
title: Utiliser Milvus dans AnythingLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Utiliser Milvus dans AnythingLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> est une application de bureau IA puissante, axée sur la confidentialité et tout-en-un qui prend en charge divers LLM, types de documents et bases de données vectorielles. Elle vous permet de construire un assistant privé de type ChatGPT qui peut fonctionner localement ou être hébergé à distance, vous permettant de discuter intelligemment avec tous les documents que vous fournissez.</p>
<p>Ce guide vous guidera dans la configuration de Milvus en tant que base de données vectorielle dans AnythingLLM, vous permettant d'incorporer, de stocker et de rechercher vos documents pour une récupération intelligente et un chat.</p>
<blockquote>
<p>Ce tutoriel est basé sur la documentation officielle d'AnythingLLM et sur des étapes d'utilisation réelles. Si l'interface ou les étapes changent, veuillez vous référer à la dernière documentation officielle et n'hésitez pas à suggérer des améliorations.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Prérequis<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> installé localement ou un compte <a href="https://zilliz.com/cloud">Zilliz Cloud</a> </li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> installé</li>
<li>Documents ou sources de données prêts à être téléchargés et intégrés (PDF, Word, CSV, pages web, etc.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Configurer Milvus comme base de données vectorielle<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Ouvrez AnythingLLM et cliquez sur l'icône des <strong>paramètres</strong> dans le coin inférieur gauche.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Ouvrir les paramètres</span> </span></li>
</ol>
<ol start="2">
<li><p>Dans le menu de gauche, sélectionnez <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Sélectionnez Vector Database (Base de données vectorielle)</span> </span></p></li>
<li><p>Dans la liste déroulante Vector Database Provider, sélectionnez <strong>Milvus</strong> (ou Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Choisissez Milvus</span> </span></p></li>
<li><p>Remplissez les détails de votre connexion Milvus (pour Milvus local). Voici un exemple :</p>
<ul>
<li><strong>Adresse de la base de données Milvus</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Nom d'utilisateur Milvus</strong>: <code translate="no">root</code></li>
<li><strong>Mot de passe Milvus</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Connexion Milvus</span> </span></li>
</ul>
<blockquote>
<p>Si vous utilisez Zilliz Cloud, entrez votre point de terminaison de cluster et votre jeton API à la place :</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Connexion Zilliz Cloud</span> </span></p></li>
<li><p>Cliquez sur <strong>Enregistrer les modifications</strong> pour appliquer vos paramètres.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Créer un espace de travail et télécharger des documents<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Entrez dans votre espace de travail et cliquez sur l'icône de <strong>téléchargement</strong> pour ouvrir la boîte de dialogue de téléchargement des documents.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Ouvrir la boîte de dialogue de téléchargement</span> </span></p></li>
<li><p>Vous pouvez télécharger une grande variété de sources de données :</p>
<ul>
<li><strong>Fichiers locaux</strong>: PDF, Word, CSV, TXT, fichiers audio, etc.</li>
<li><strong>Pages web</strong>: Collez une URL et récupérez directement le contenu d'un site web.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Téléchargement de documents</span> </span></p></li>
<li><p>Après avoir téléchargé ou récupéré des documents, cliquez sur <strong>Déplacer vers l'espace de travail</strong> pour déplacer le document ou les données dans votre espace de travail actuel.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>Déplacer vers l'espace de travail</span> </span></p></li>
<li><p>Sélectionnez le document ou les données et cliquez sur <strong>Save and Embed</strong>. AnythingLLM se chargera automatiquement du découpage, de l'intégration et du stockage de votre contenu dans Milvus.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Enregistrer et incorporer</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Chat et récupération des réponses dans Milvus<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Retournez à l'interface de chat de l'espace de travail et posez des questions. AnythingLLM recherchera dans votre base de données vectorielle Milvus le contenu pertinent et utilisera le LLM pour générer des réponses.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Chat avec Docs</span> </span></li>
</ol>
<hr>
