---
id: integration_with_mindsdb.md
summary: >-
  Ce tutoriel montre comment intégrer Milvus à MindsDB, ce qui vous permet
  d'exploiter les capacités d'IA de MindsDB avec la fonctionnalité de base de
  données vectorielle de Milvus par le biais d'opérations de type SQL pour la
  gestion et l'interrogation d'embeddings vectoriels.
title: Intégrer Milvus à MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Intégrer Milvus à MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> est un outil puissant permettant d'intégrer des applications d'IA à diverses sources de données d'entreprise. Il agit comme un moteur de requête fédéré qui met de l'ordre dans la prolifération des données en répondant méticuleusement aux requêtes sur les données structurées et non structurées. Que vos données soient dispersées dans des applications SaaS, des bases de données ou des entrepôts de données, MindsDB peut les connecter et les interroger à l'aide de SQL standard. Il dispose de systèmes RAG autonomes de pointe grâce à des bases de connaissances, prend en charge des centaines de sources de données et offre des options de déploiement flexibles, du développement local aux environnements en nuage.</p>
<p>Ce tutoriel montre comment intégrer Milvus à MindsDB, vous permettant d'exploiter les capacités d'IA de MindsDB avec la fonctionnalité de base de données vectorielle de Milvus par le biais d'opérations de type SQL pour la gestion et l'interrogation d'embeddings vectoriels.</p>
<div class="alert note">
<p>Ce tutoriel se réfère principalement à la documentation officielle de <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Si vous trouvez des parties obsolètes dans ce tutoriel, vous pouvez suivre en priorité la documentation officielle et créer un problème pour nous.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Installer MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant de commencer, installez MindsDB localement via <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> ou <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Avant de continuer, assurez-vous d'avoir une solide compréhension des concepts fondamentaux et des opérations de MindsDB et de Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Introduction des arguments<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Les arguments requis pour établir une connexion sont les suivants :</p>
<ul>
<li><code translate="no">uri</code>uri pour la base de données Milvus, peut être défini sur le fichier local ".db" ou sur le service docker ou cloud</li>
<li><code translate="no">token</code>: token pour prendre en charge le service docker ou cloud en fonction de l'option uri</li>
</ul>
<p>Les arguments optionnels pour établir une connexion sont les suivants :</p>
<p>Ils sont utilisés pour les requêtes <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: limite par défaut à passer dans les instructions select (default=100)</li>
<li><code translate="no">search_metric_type</code>: type de métrique utilisé pour les recherches (default=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>: si les segments en croissance doivent être ignorés lors des recherches de similarité (default=False)</li>
<li><code translate="no">search_params</code>: spécifique au site <code translate="no">search_metric_type</code> (default={&quot;nprobe&quot; : 10})</li>
</ul>
<p>Ces paramètres sont utilisés pour les requêtes <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: la génération automatique de l'identifiant lors de l'insertion d'enregistrements sans identifiant (default=False)</li>
<li><code translate="no">create_id_max_len</code>: longueur maximale du champ id lors de la création d'une table (default=64)</li>
<li><code translate="no">create_embedding_dim</code>: dimension d'intégration pour la création d'une table (default=8)</li>
<li><code translate="no">create_dynamic_field</code>: si les tables créées ont des champs dynamiques ou non (default=True)</li>
<li><code translate="no">create_content_max_len</code>: longueur maximale de la colonne de contenu (default=200)</li>
<li><code translate="no">create_content_default_value</code>: valeur par défaut de la colonne de contenu (default='')</li>
<li><code translate="no">create_schema_description</code>: description des schémas créés (default='')</li>
<li><code translate="no">create_alias</code>: alias des schémas créés (default='default')</li>
<li><code translate="no">create_index_params</code>: paramètres de l'index créé sur la colonne embeddings (default={})</li>
<li><code translate="no">create_index_metric_type</code>: la métrique utilisée pour créer l'index (default='L2')</li>
<li><code translate="no">create_index_type</code>: le type d'index (default='AUTOINDEX')</li>
</ul>
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
    </button></h2><p>Avant de continuer, assurez-vous que la version <code translate="no">pymilvus</code> est identique à cette <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">version épinglée</a>. Si vous rencontrez des problèmes de compatibilité de version, vous pouvez revenir en arrière dans votre version de pymilvus, ou la personnaliser dans ce <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">fichier d'exigences</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Création d'une connexion</h3><p>Pour utiliser ce gestionnaire et se connecter à un serveur Milvus dans MindsDB, la syntaxe suivante peut être utilisée :</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Si vous n'avez besoin d'une base de données vectorielle locale que pour des données à petite échelle ou pour du prototypage, définir l'uri comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</li>
<li>Pour les données à plus grande échelle et le trafic en production, vous pouvez configurer un serveur Milvus sur <a href="https://milvus.io/docs/install-overview.md">Docker ou Kubernetes</a>. Dans cette configuration, veuillez utiliser l'adresse et le port du serveur comme votre <code translate="no">uri</code>, par exemple<code translate="no">http://localhost:19530</code>. Si vous activez la fonction d'authentification sur Milvus, définissez <code translate="no">token</code> comme <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, sinon il n'est pas nécessaire de définir le jeton.</li>
<li>Vous pouvez également utiliser Milvus entièrement géré sur <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Il vous suffit de définir <code translate="no">uri</code> et <code translate="no">token</code> comme étant le <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et la clé API de</a> votre instance Zilliz Cloud.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Abandon de la connexion</h3><p>Pour interrompre la connexion, utilisez la commande suivante</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Création de tables</h3><p>Pour insérer des données à partir d'une table préexistante, utilisez la commande suivante <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Abandon de collections</h3><p>L'abandon d'une collection n'est pas pris en charge.</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Interrogation et sélection</h3><p>Pour interroger une base de données à l'aide d'un vecteur de recherche, vous pouvez utiliser <code translate="no">search_vector</code> dans la clause <code translate="no">WHERE</code>.</p>
<p>Attention :</p>
<ul>
<li>Si vous omettez <code translate="no">LIMIT</code>, la clause <code translate="no">search_default_limit</code> est utilisée car Milvus l'exige.</li>
<li>La colonne des métadonnées n'est pas prise en charge, mais si le schéma dynamique de la collection est activé, vous pouvez effectuer des requêtes comme d'habitude (voir l'exemple ci-dessous).</li>
<li>Les champs dynamiques ne peuvent pas être affichés mais peuvent être interrogés.</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Si vous omettez la clause <code translate="no">search_vector</code>, il s'agit d'une recherche de base et la quantité d'entrées dans la collection est renvoyée par <code translate="no">LIMIT</code> ou <code translate="no">search_default_limit</code>.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez utiliser la clause <code translate="no">WHERE</code> sur les champs dynamiques comme une requête SQL normale.</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Suppression d'enregistrements</h3><p>Vous pouvez supprimer des entrées en utilisant <code translate="no">DELETE</code> comme en SQL.</p>
<p>Attention :</p>
<ul>
<li>Milvus ne prend en charge que la suppression d'entités avec des clés primaires clairement spécifiées.</li>
<li>Vous ne pouvez utiliser que l'opérateur <code translate="no">IN</code>.</li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Insertion d'enregistrements</h3><p>Vous pouvez également insérer des lignes individuelles comme suit :</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Mise à jour</h3><p>La mise à jour des enregistrements n'est pas prise en charge par l'API Milvus. Vous pouvez essayer d'utiliser une combinaison des opérateurs <code translate="no">DELETE</code> et <code translate="no">INSERT</code></p>
<hr>
<p>Pour plus de détails et d'exemples, veuillez vous référer à la <a href="https://docs.mindsdb.com/what-is-mindsdb">documentation officielle de MindsDB</a>.</p>
