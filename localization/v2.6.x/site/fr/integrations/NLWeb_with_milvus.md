---
id: NLWeb_with_milvus.md
summary: >-
  Apprenez à intégrer Microsoft NLWeb avec Milvus pour créer de puissantes
  interfaces en langage naturel pour les sites web. Ce tutoriel montre comment
  exploiter les capacités de la base de données vectorielles de Milvus pour une
  recherche sémantique efficace, le stockage de l'intégration et la récupération
  du contexte dans les applications NLWeb.
title: Utiliser NLWeb avec Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Utiliser NLWeb avec Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb de Microsoft</a> est un cadre proposé qui permet des interfaces en langage naturel pour les sites web, en utilisant <a href="https://schema.org/">Schema.org</a>, des formats tels que RSS et le protocole MCP émergent.</p>
<p><a href="https://milvus.io/">Milvus</a> est pris en charge en tant que base de données vectorielles dans NLWeb pour le stockage intégré et la recherche efficace de similarités vectorielles, permettant une récupération de contexte puissante pour les applications de traitement du langage naturel.</p>
<blockquote>
<p>Cette documentation est principalement basée sur la documentation officielle de <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">démarrage rapide</a>. Si vous trouvez du contenu obsolète ou incohérent, veuillez donner la priorité à la documentation officielle et n'hésitez pas à nous faire part d'un problème.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Utilisation<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb peut être configuré pour utiliser Milvus comme moteur de recherche. Vous trouverez ci-dessous un guide sur l'installation et l'utilisation de NLWeb avec Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Installation</h3><p>Clonez le repo et configurez votre environnement :</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Configuration de Milvus</h3><p>Pour utiliser <strong>Milvus</strong>, mettez à jour votre configuration.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Mettre à jour les fichiers de configuration dans <code translate="no">code/config</code></h4><p>Ouvrez le fichier <code translate="no">config_retrieval.yaml</code> et ajoutez la configuration Milvus :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Chargement des données</h3><p>Une fois configuré, chargez votre contenu à l'aide de flux RSS.</p>
<p>Depuis le répertoire <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Ceci ingérera le contenu dans votre collection Milvus, en stockant à la fois les données textuelles et les incorporations vectorielles.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Exécution du serveur</h3><p>Pour démarrer NLWeb, à partir du répertoire <code translate="no">code</code>, exécutez :</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez maintenant interroger votre contenu en langage naturel à l'aide de l'interface Web à l'adresse http://localhost:8000/ ou directement via l'API REST compatible MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">Pour en savoir plus<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Documentation Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Source NLWeb</a></li>
<li>Vie d'une requête de chat</li>
<li>Modifier le comportement en changeant les invites</li>
<li>Modifier le flux de contrôle</li>
<li>Modifier l'interface utilisateur</li>
</ul>
