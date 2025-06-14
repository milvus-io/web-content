---
id: knowledge_table_with_milvus.md
summary: >-
  Par défaut, Knowledge Table utilise la base de données Milvus pour stocker et
  récupérer les données extraites. Cela permet aux utilisateurs de rechercher,
  de filtrer et d'analyser facilement les données à l'aide des puissantes
  fonctionnalités de Milvus. Dans ce tutoriel, nous allons montrer comment
  démarrer avec Knowledge Table et Milvus.
title: Knowledge Table avec Milvus
---
<h1 id="Knowledge-Table-with-Milvus" class="common-anchor-header">Knowledge Table avec Milvus<button data-href="#Knowledge-Table-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/whyhow-ai/knowledge-table">Knowledge Table</a>, développé par <a href="https://www.whyhow.ai/">WhyHow AI</a>, est un logiciel libre conçu pour faciliter l'extraction et l'exploration de données structurées à partir de documents non structurés. Il offre aux utilisateurs une interface de type tableur et permet la création de représentations de connaissances, telles que des tableaux et des graphiques, par le biais d'une interface d'interrogation en langage naturel. Le logiciel comprend des règles d'extraction personnalisables, des options de formatage et la traçabilité des données par leur provenance, ce qui le rend adaptable à diverses applications. Il permet une intégration transparente dans les flux de travail RAG et s'adresse à la fois aux utilisateurs professionnels qui ont besoin d'une interface conviviale et aux développeurs qui ont besoin d'un backend flexible pour un traitement efficace des documents.</p>
<p>Par défaut, Knowledge Table utilise la base de données Milvus pour stocker et récupérer les données extraites. Cela permet aux utilisateurs de rechercher, de filtrer et d'analyser facilement les données à l'aide des puissantes fonctionnalités de Milvus. Dans ce tutoriel, nous allons montrer comment démarrer avec Knowledge Table et Milvus.</p>
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
    </button></h2><ul>
<li>Docker</li>
<li>Docker Compose</li>
</ul>
<h2 id="Cloning-the-project" class="common-anchor-header">Cloner le projet<button data-href="#Cloning-the-project" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/whyhow-ai/knowledge-table.git</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-the-environment" class="common-anchor-header">Configurer l'environnement<button data-href="#Set-up-the-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous trouverez le fichier <code translate="no">.env.example</code> dans le répertoire racine du projet. Copiez ce fichier sur <code translate="no">.env</code> et remplissez les variables d'environnement requises.</p>
<p>Pour Milvus, vous devez définir les variables d'environnement <code translate="no">MILVUS_DB_URI</code> et <code translate="no">MILVUS_DB_TOKEN</code>. Voici quelques conseils :</p>
<blockquote>
<ul>
<li>Définir <code translate="no">MILVUS_DB_URI</code> comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</li>
<li>Si vous avez des données à grande échelle, par exemple plus d'un million de vecteurs, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme uri, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, utilisez "<your_username>:<your_password>" comme jeton, sinon ne définissez pas le jeton.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré pour Milvus, adaptez les valeurs <code translate="no">MILVUS_DB_URI</code> et <code translate="no">MILVUS_DB_TOKEN</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point final public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
</blockquote>
<p>Outre Milvus, vous devez également définir d'autres environnements, par exemple <code translate="no">OPENAI_API_KEY</code>. Vous pouvez obtenir chacun de ces environnements sur les sites web respectifs.</p>
<h2 id="Starting-the-app" class="common-anchor-header">Démarrer l'application<button data-href="#Starting-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose up -d --build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Stopping-the-app" class="common-anchor-header">Arrêt de l'application<button data-href="#Stopping-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-the-project" class="common-anchor-header">Accès au projet<button data-href="#Accessing-the-project" class="anchor-icon" translate="no">
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
    </button></h2><p>Le frontend est accessible à l'adresse <code translate="no">http://localhost:3000</code>, et le backend à l'adresse <code translate="no">http://localhost:8000</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/knowlege_table.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Vous pouvez jouer avec l'interface utilisateur et essayer avec vos propres documents.</p>
<p>Pour plus de détails sur l'utilisation de la démonstration, vous pouvez vous référer à la <a href="https://github.com/whyhow-ai/knowledge-table/tree/main">documentation</a> officielle <a href="https://github.com/whyhow-ai/knowledge-table/tree/main">de Knowledge Table.</a></p>
