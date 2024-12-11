---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  Dans ce tutoriel, nous allons vous montrer comment construire un pipeline RAG
  (Retrieval-Augmented Generation) avec Milvus et Cognee.
title: Construire un RAG avec Milvus et Cognee
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">Construire RAG avec Milvus et Cognee</h3><p><a href="https://www.cognee.ai">Cognee</a> est une plate-forme axée sur le développement qui rationalise le développement d'applications d'IA grâce à des pipelines ECL (Extract, Cognify, Load) modulaires et évolutifs. En s'intégrant de manière transparente à Milvus, Cognee permet une connexion et une récupération efficaces des conversations, des documents et des transcriptions, réduisant ainsi les hallucinations et optimisant les coûts opérationnels.</p>
<p>Grâce à une prise en charge solide des magasins vectoriels tels que Milvus, des bases de données de graphes et des LLM, Cognee offre un cadre flexible et personnalisable pour la création de systèmes de génération augmentée par récupération (RAG). Son architecture prête à la production garantit une précision et une efficacité accrues pour les applications alimentées par l'IA.</p>
<p>Dans ce tutoriel, nous allons vous montrer comment construire un pipeline RAG (Retrieval-Augmented Generation) avec Milvus et Cognee.</p>
<pre><code translate="no" class="language-shell">$ pip install pymilvus git+<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</blockquote>
<p>Par défaut, il utilise OpenAI comme LLM dans cet exemple. Vous devez préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> et la définir dans la fonction config <code translate="no">set_llm_api_key()</code>.</p>
<p>Pour configurer Milvus en tant que base de données vectorielle, définissez <code translate="no">VECTOR_DB_PROVIDER</code> sur <code translate="no">milvus</code> et spécifiez <code translate="no">VECTOR_DB_URL</code> et <code translate="no">VECTOR_DB_KEY</code>. Comme nous utilisons Milvus Lite pour stocker les données dans cette démo, seul le <code translate="no">VECTOR_DB_URL</code> doit être fourni.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.<span class="hljs-property">config</span>.<span class="hljs-title function_">set_llm_api_key</span>(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Quant aux variables d'environnement <code translate="no">VECTOR_DB_URL</code> et <code translate="no">VECTOR_DB_KEY</code>:</p>
<ul>
<li>Définir <code translate="no">VECTOR_DB_URL</code> comme un fichier local, par exemple<code translate="no">./milvus.db</code>, est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</li>
<li>Si vous avez des données à grande échelle, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Dans cette configuration, veuillez utiliser l'uri du serveur, par exemple<code translate="no">http://localhost:19530</code>, comme votre <code translate="no">VECTOR_DB_URL</code>.</li>
<li>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service cloud entièrement géré pour Milvus, ajustez les adresses <code translate="no">VECTOR_DB_URL</code> et <code translate="no">VECTOR_DB_KEY</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Préparer les données</h3><p>Nous utilisons les pages FAQ de la <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">documentation Milvus 2.4.x</a> comme connaissance privée dans notre RAG, qui est une bonne source de données pour un pipeline RAG simple.</p>
<p>Téléchargez le fichier zip et extrayez les documents dans le dossier <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>Nous chargeons tous les fichiers markdown à partir du dossier <code translate="no">milvus_docs/en/faq</code>. Pour chaque document, nous utilisons simplement &quot;# &quot; pour séparer le contenu du fichier, ce qui permet de séparer grossièrement le contenu de chaque partie principale du fichier markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Construire RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Réinitialisation des données de Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que nous avons fait table rase du passé, nous pouvons maintenant ajouter notre jeu de données et le traiter pour en faire un graphe de connaissances.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">Ajout de données et cognification</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>La méthode <code translate="no">add</code> charge l'ensemble de données (Milvus FAQs) dans Cognee et la méthode <code translate="no">cognify</code> traite les données pour extraire les entités, les relations et les résumés, construisant ainsi un graphe de connaissances.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">Recherche de résumés</h3><p>Maintenant que les données ont été traitées, interrogeons le graphe de connaissances.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>Cette requête recherche dans le graphe de connaissances un résumé lié au texte de la requête, et le candidat le plus lié est imprimé.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">Recherche de morceaux</h3><p>Les résumés offrent des informations de haut niveau, mais pour obtenir des détails plus précis, nous pouvons interroger des morceaux de données spécifiques directement à partir de l'ensemble de données traitées. Ces morceaux sont dérivés des données originales qui ont été ajoutées et analysées lors de la création du graphe de connaissances.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.<span class="hljs-property">api</span>.<span class="hljs-property">v1</span>.<span class="hljs-property">search</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">SearchType</span>

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchType</span>.<span class="hljs-property">CHUNKS</span>, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>Formatons et affichons-les pour une meilleure lisibilité !</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>Dans les étapes précédentes, nous avons interrogé l'ensemble de données Milvus FAQ pour obtenir à la fois des résumés et des morceaux de données spécifiques. Bien que cela ait permis d'obtenir des informations détaillées et granulaires, l'ensemble de données était volumineux, ce qui rendait difficile la visualisation claire des dépendances au sein du graphe de connaissances.</p>
<p>Pour résoudre ce problème, nous réinitialiserons l'environnement Cognee et travaillerons avec un ensemble de données plus petit et plus ciblé. Cela nous permettra de mieux mettre en évidence les relations et les dépendances extraites au cours du processus de cognification. En simplifiant les données, nous pouvons clairement voir comment Cognee organise et structure les informations dans le graphe de connaissances.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Réinitialiser Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">Ajout de l'ensemble de données ciblé</h3><p>Ici, un ensemble de données plus petit ne comportant qu'une seule ligne de texte est ajouté et traité pour garantir un graphe de connaissances ciblé et facilement interprétable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">Recherche d'informations</h3><p>En nous concentrant sur cet ensemble de données plus petit, nous pouvons maintenant analyser clairement les relations et la structure du graphe de connaissances.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = await cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text in search_results:
    <span class="hljs-built_in">print</span>(result_text)

# Example output:
# ({<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;natural language processing&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;</span>}, {<span class="hljs-string">&#x27;relationship_name&#x27;</span>: <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>, <span class="hljs-string">&#x27;source_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;target_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">15</span>, <span class="hljs-number">473137</span>, tzinfo=datetime.timezone.utc)}, {<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;computer science&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;The study of computation and information processing.&#x27;</span>})
# (...)
#
# It represents nodes and relationships in the knowledge graph:
# - The first element is the source node (e.g., <span class="hljs-string">&#x27;natural language processing&#x27;</span>).
# - The second element is the relationship between nodes (e.g., <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>).
# - The third element is the target node (e.g., <span class="hljs-string">&#x27;computer science&#x27;</span>).
<button class="copy-code-btn"></button></code></pre>
<p>Cette sortie représente les résultats d'une requête de graphe de connaissances, mettant en évidence les entités (nœuds) et leurs relations (arêtes) telles qu'elles ont été extraites de l'ensemble de données traité. Chaque tuple comprend une entité source, un type de relation et une entité cible, ainsi que des métadonnées telles que des identifiants uniques, des descriptions et des horodatages. Le graphique met en évidence les concepts clés et leurs connexions sémantiques, ce qui permet une compréhension structurée de l'ensemble de données.</p>
<p>Félicitations, vous avez appris l'utilisation de base de Cognee avec Milvus. Si vous souhaitez connaître l'utilisation plus avancée de Cognee, veuillez vous référer à sa <a href="https://github.com/topoteretes/cognee">page</a> officielle.</p>
