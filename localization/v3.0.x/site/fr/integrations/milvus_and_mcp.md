---
id: milvus_and_mcp.md
summary: >-
  Ce tutoriel vous guide dans la configuration d'un serveur MCP pour Milvus,
  permettant aux applications d'intelligence artificielle d'effectuer des
  recherches vectorielles, de gérer des collections et d'extraire des données à
  l'aide de commandes en langage naturel, sans avoir à écrire des requêtes de
  base de données personnalisées.
title: 'MCP + Milvus : Connecter l''IA aux bases de données vectorielles'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus : Connecter l'IA aux bases de données vectorielles<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Introduction<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Le <strong>Model Context Protocol (MCP)</strong> est un protocole ouvert qui permet aux applications d'IA, telles que Claude et Cursor, d'interagir avec des sources de données et des outils externes de manière transparente. Que vous construisiez des applications d'IA personnalisées, que vous intégriez des flux de travail d'IA ou que vous amélioriez des interfaces de chat, le MCP fournit un moyen standardisé de connecter de grands modèles de langage (LLM) à des données contextuelles pertinentes.</p>
<p>Ce didacticiel vous guide dans la <strong>configuration d'un serveur MCP pour Milvus</strong>, permettant aux applications d'IA d'effectuer des recherches vectorielles, de gérer des collections et d'extraire des données à l'aide de <strong>commandes en langage naturel, sans</strong>écrire de requêtes de base de données personnalisées.</p>
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
    </button></h2><p>Avant de configurer le serveur MCP, assurez-vous que vous disposez des éléments suivants</p>
<ul>
<li>Python 3.10 ou supérieur</li>
<li>Une instance <a href="https://milvus.io/">Milvus</a> en cours d'exécution</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (recommandé pour l'exécution du serveur)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Mise en route<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>La manière recommandée d'utiliser ce serveur MCP est de l'exécuter directement avec uv sans installation. C'est ainsi que Claude Desktop et Cursor sont configurés pour l'utiliser dans les exemples ci-dessous.</p>
<p>Si vous voulez cloner le dépôt :</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez alors exécuter le serveur directement :</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Applications supportées<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce serveur MCP peut être utilisé avec diverses applications d'intelligence artificielle qui prennent en charge le Model Context Protocol, telles que :</p>
<ul>
<li><strong>Claude Desktop</strong>: L'application de bureau d'Anthropic pour Claude</li>
<li><strong>Cursor</strong>: Editeur de code alimenté par l'IA avec support MCP dans sa fonction Composer</li>
<li><strong>Autres clients MCP personnalisés</strong> Toute application implémentant la spécification client MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Utilisation de MCP avec Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
<li>Installez <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Ouvrez le fichier de configuration de Claude :<ul>
<li>Sur macOS : <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Ajoutez la configuration suivante :</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Redémarrez Claude Desktop pour appliquer les changements.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Utiliser MCP avec Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> prend également en charge les outils MCP par le biais de sa fonction Agent dans Composer. Vous pouvez ajouter le serveur Milvus MCP à Cursor de deux manières :</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Option 1 : Utilisation de l'interface de configuration de Cursor</h3><ol>
<li>Ouvrez <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Cliquez sur <code translate="no">+ Add New MCP Server</code>.</li>
<li>Remplissez :<ul>
<li>Type : <code translate="no">stdio</code></li>
<li>Nom : <code translate="no">milvus</code></li>
<li>Commande :<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Conseil : Utilisez <code translate="no">127.0.0.1</code> au lieu de <code translate="no">localhost</code> pour éviter d'éventuels problèmes de résolution DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Option 2 : Utilisation d'une configuration spécifique au projet (recommandée)</h3><ol>
<li>Créez un fichier <code translate="no">.cursor/mcp.json</code> dans le <strong>répertoire racine de votre projet</strong>:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Redémarrez Cursor pour appliquer la configuration.</li>
</ol>
<p>Après avoir ajouté le serveur, vous devrez peut-être appuyer sur le bouton d'actualisation dans les paramètres MCP pour remplir la liste d'outils. L'agent de composition utilisera automatiquement les outils Milvus lorsqu'ils sont pertinents pour vos requêtes.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Vérification de l'intégration<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour s'assurer que le serveur MCP est correctement configuré :</p>
<h3 id="For-Cursor" class="common-anchor-header">Pour le curseur</h3><ol>
<li>Allez sur <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Confirmer que <code translate="no">&quot;Milvus&quot;</code> apparaît dans la liste des serveurs MCP.</li>
<li>Vérifiez si les outils Milvus (par exemple, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) sont répertoriés.</li>
<li>Si des erreurs apparaissent, voir la section <strong>Dépannage</strong> ci-dessous.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Outils du serveur MCP pour Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce serveur MCP fournit plusieurs outils pour <strong>rechercher, interroger et gérer les données vectorielles dans Milvus</strong>. Pour plus de détails, veuillez vous référer à la documentation <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Outils de recherche et d'interrogation</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Recherche de documents à l'aide de la recherche plein texte.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Effectuer une recherche de similarité vectorielle sur une collection.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Effectuer une recherche hybride combinant la similarité vectorielle et le filtrage d'attributs.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Effectuer une recherche de similarité vectorielle avec plusieurs vecteurs de requête.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Interroger une collection à l'aide d'expressions de filtrage.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Compter les entités d'une collection.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Gestion des collections</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Dresser la liste de toutes les collections de la base de données.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Obtenir des informations détaillées sur une collection.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Obtenir des statistiques sur une collection.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Créer une nouvelle collection avec le schéma spécifié.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Charger une collection en mémoire pour la recherche et l'interrogation.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Libérer une collection de la mémoire.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Obtenir des informations sur les segments de requête.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Obtenir la progression du chargement d'une collection.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Opérations sur les données</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Insérer des données dans une collection.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Insérer des données par lots pour de meilleures performances.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Remonter des données dans une collection (insérer ou mettre à jour si elles existent).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Supprimer des entités d'une collection en fonction d'une expression de filtre.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Ajouter un champ dynamique à une collection existante.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Gestion de l'index</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Créer un index sur un champ vectoriel.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Obtenir des informations sur les index d'une collection.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Variables d'environnement<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI du serveur Milvus (peut être défini à la place de <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Jeton d'authentification optionnel.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Nom de la base de données (par défaut "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Développement<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour exécuter le serveur directement :</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Exemples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Utilisation de Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Exemple 1 : Liste des collections</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilisera ensuite MCP pour vérifier ces informations dans notre base de données Milvus.</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Exemple 2 : Recherche de documents</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilisera les capacités de recherche en texte intégral de Milvus pour trouver les documents pertinents :</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Utilisation du curseur</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Exemple : Création d'une collection</h4><p>Dans le compositeur de Cursor, vous pouvez demander à Claude de créer une collection :</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor utilisera le serveur MCP pour exécuter cette opération :</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Dépannage<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Problèmes courants</h3><h4 id="Connection-Errors" class="common-anchor-header">Erreurs de connexion</h4><p>Si vous voyez des erreurs telles que "Failed to connect to Milvus server" (Échec de la connexion au serveur Milvus) :</p>
<ol>
<li>Vérifiez que votre instance Milvus est en cours d'exécution : <code translate="no">docker ps</code> (si vous utilisez Docker)</li>
<li>Vérifiez que l'URI est correct dans votre configuration</li>
<li>Assurez-vous qu'aucune règle de pare-feu ne bloque la connexion.</li>
<li>Essayez d'utiliser <code translate="no">127.0.0.1</code> au lieu de <code translate="no">localhost</code> dans l'URI.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Problèmes d'authentification</h4><p>Si vous voyez des erreurs d'authentification :</p>
<ol>
<li>Vérifier que votre <code translate="no">MILVUS_TOKEN</code> est correct</li>
<li>Vérifiez si votre instance Milvus nécessite une authentification.</li>
<li>Vérifiez que vous disposez des autorisations correctes pour les opérations que vous essayez d'effectuer.</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Outil introuvable</h4><p>Si les outils MCP n'apparaissent pas sur le bureau ou le curseur de Claude :</p>
<ol>
<li>Redémarrer l'application</li>
<li>Vérifiez que les journaux du serveur ne contiennent pas d'erreurs</li>
<li>Vérifiez que le serveur MCP fonctionne correctement</li>
<li>Appuyez sur le bouton d'actualisation dans les paramètres MCP (pour Cursor).</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Obtenir de l'aide</h3><p>Si vous continuez à rencontrer des problèmes :</p>
<ol>
<li>Vérifiez les <a href="https://github.com/zilliztech/mcp-server-milvus/issues">problèmes GitHub</a> pour des problèmes similaires.</li>
<li>Rejoignez le <a href="https://discord.gg/zilliz">Discord de la communauté Zilliz</a> pour obtenir de l'aide</li>
<li>Déposez un nouveau problème avec des informations détaillées sur votre problème.</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>En suivant ce tutoriel, vous avez maintenant un <strong>serveur MCP</strong> en cours d'exécution, permettant la recherche vectorielle assistée par ordinateur dans Milvus. Que vous utilisiez <strong>Claude Desktop</strong> ou <strong>Cursor</strong>, vous pouvez désormais interroger, gérer et rechercher votre base de données Milvus à l'aide de <strong>commandes en langage naturel, sans</strong>écrire de code de base de données !</p>
