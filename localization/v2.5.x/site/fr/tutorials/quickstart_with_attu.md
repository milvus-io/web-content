---
id: quickstart_with_attu.md
summary: >-
  Attu est un outil d'administration tout-en-un et open-source pour Milvus. Il
  est doté d'une interface graphique intuitive qui vous permet d'interagir
  facilement avec vos bases de données. En quelques clics, vous pouvez
  visualiser l'état de votre cluster, gérer les métadonnées, effectuer des
  requêtes de données, et bien plus encore.
title: Système de réponse aux questions
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Démarrage rapide avec Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Introduction<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> est un outil d'administration tout-en-un et open-source pour Milvus. Il est doté d'une interface utilisateur graphique (GUI) intuitive qui vous permet d'interagir facilement avec vos bases de données. En quelques clics, vous pouvez visualiser l'état de votre cluster, gérer les métadonnées, effectuer des requêtes de données et bien plus encore.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Installer l'application de bureau<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Téléchargez la version desktop d'Attu en visitant la <a href="https://github.com/zilliztech/attu/releases">page Attu GitHub Releases</a>. Sélectionnez la version appropriée pour votre système d'exploitation et suivez les étapes d'installation.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Note pour macOS (puce de la série M) :</h3><p>Si vous rencontrez l'erreur :</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez la commande suivante dans le terminal pour contourner ce problème :</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Connexion à Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu prend en charge la connexion à <strong>Milvus Standalone</strong> et à <strong>Zilliz Cloud</strong>, ce qui permet de travailler avec des bases de données locales ou hébergées dans le nuage.</p>
<p>Pour utiliser Milvus Standalone localement :</p>
<ol>
<li>Démarrez Milvus Standalone en suivant le <a href="https://milvus.io/docs/install_standalone-docker.md">guide d'installation de Milvus</a>.</li>
<li>Ouvrez Attu et saisissez les informations de connexion :<ul>
<li>Adresse Milvus : L'URI de votre serveur Milvus Standalone, par exemple http://localhost:19530</li>
<li>Autres paramètres facultatifs : Vous pouvez les définir en fonction de vos configurations Milvus ou les laisser par défaut.</li>
</ul></li>
<li>Cliquez sur Connecter pour accéder à votre base de données.</li>
</ol>
<blockquote>
<p>Vous pouvez également connecter Milvus entièrement géré sur <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Il vous suffit de définir <code translate="no">Milvus Address</code> et <code translate="no">token</code> sur le <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">point de terminaison public et la clé API</a> de votre instance Zilliz Cloud.</p>
</blockquote>
<ol start="4">
<li>Cliquez sur pour accéder à votre base de données.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Préparer les données, créer une collection et insérer des données<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Préparer les données</h3><p>Nous utilisons les pages FAQ de la <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">documentation Milvus 2.4.x</a> comme ensemble de données pour cet exemple.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Télécharger et extraire les données :</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Traiter les fichiers Markdown :</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Générer des embeddings</h3><p>Définir un modèle d'incorporation pour générer des incorporations de texte à l'aide du modèle <code translate="no">milvus_model</code>. Nous utilisons le modèle <code translate="no">DefaultEmbeddingFunction</code> comme exemple, qui est un modèle d'incorporation pré-entraîné et léger.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Résultat :</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Créer une collection</h3><p>Connectez-vous à Milvus et créez une collection :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Insérer des données</h3><p>Interroger les lignes de texte, créer des enchâssements et insérer les données dans Milvus :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Visualiser les données et le schéma</h3><p>Nous pouvons maintenant visualiser le schéma de données et les entités insérées à l'aide de l'interface d'Attu. Le schéma affiche les champs définis, y compris un champ <code translate="no">id</code> de type <code translate="no">Int64</code> et un champ <code translate="no">vector</code> de type <code translate="no">FloatVector(768)</code> avec une métrique <code translate="no">Inner Product (IP)</code>. La collection est chargée avec <strong>72 entités</strong>.</p>
<p>En outre, nous pouvons voir les données insérées, y compris l'ID, les encastrements vectoriels et les champs dynamiques stockant des métadonnées telles que le contenu textuel. L'interface prend en charge le filtrage et l'interrogation sur la base de conditions spécifiées ou de champs dynamiques.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Visualisation des résultats de recherche et des relations<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu fournit une interface puissante pour visualiser et explorer les relations entre les données. Pour examiner les points de données insérés et leurs relations de similarité, suivez les étapes suivantes :</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Effectuer une recherche</strong></h3><p>Naviguez jusqu'à l'onglet <strong>Recherche vectorielle</strong> dans Attu.</p>
<ol>
<li>Cliquez sur le bouton <strong>Générer des données aléatoires</strong> pour créer des requêtes de test.</li>
<li>Cliquez sur <strong>Rechercher</strong> pour obtenir des résultats basés sur les données générées.</li>
</ol>
<p>Les résultats sont affichés dans un tableau, avec les identifiants, les scores de similarité et les champs dynamiques pour chaque entité correspondante.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Explorer les relations entre les données</strong></h3><p>Cliquez sur le bouton <strong>Explorer</strong> dans le panneau des résultats pour visualiser les relations entre le vecteur de la requête et les résultats de la recherche dans une <strong>structure de type graphe de connaissances</strong>.</p>
<ul>
<li>Le <strong>nœud central</strong> représente le vecteur de recherche.</li>
<li>Les <strong>nœuds connectés</strong> représentent les résultats de la recherche. En cliquant sur ces nœuds, vous obtiendrez des informations détaillées sur le nœud correspondant.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Développer le graphe</strong></h3><p>Double-cliquez sur n'importe quel nœud de résultat pour développer ses connexions. Cette action révèle des relations supplémentaires entre le nœud sélectionné et d'autres points de données de la collection, créant ainsi un <strong>graphique de connaissances plus large et interconnecté</strong>.</p>
<p>Cette vue élargie permet une exploration plus approfondie de la manière dont les points de données sont liés, sur la base de la similarité vectorielle.</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Conclusion<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu simplifie la gestion et la visualisation des données vectorielles stockées dans Milvus. De l'insertion des données à l'exécution des requêtes et à l'exploration interactive, il fournit une interface intuitive pour traiter les tâches complexes de recherche vectorielle. Grâce à des fonctionnalités telles que la prise en charge des schémas dynamiques, les visualisations de recherche graphique et les filtres de requête flexibles, Attu permet aux utilisateurs d'analyser efficacement des ensembles de données à grande échelle.</p>
<p>En exploitant les outils d'exploration visuelle d'Attu, les utilisateurs peuvent mieux comprendre leurs données, identifier les relations cachées et prendre des décisions basées sur les données. Commencez à explorer vos propres ensembles de données dès aujourd'hui avec Attu et Milvus !</p>
<hr>
