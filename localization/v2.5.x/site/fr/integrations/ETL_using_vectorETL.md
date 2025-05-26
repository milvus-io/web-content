---
id: ETL_using_vectorETL.md
summary: >-
  Dans ce tutoriel, nous verrons comment charger efficacement des données dans
  Milvus à l'aide de [VectorETL] (https://github.com/ContextData/VectorETL), un
  cadre ETL léger conçu pour les bases de données vectorielles. VectorETL
  simplifie le processus d'extraction des données à partir de diverses sources,
  les transforme en encastrements vectoriels à l'aide de modèles d'IA et les
  stocke dans Milvus pour une récupération rapide et évolutive. À la fin de ce
  tutoriel, vous disposerez d'un pipeline ETL fonctionnel qui vous permettra
  d'intégrer et de gérer facilement des systèmes de recherche vectorielle.
  Plongeons dans l'aventure !
title: Chargement efficace des données dans Milvus avec VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Chargement efficace des données dans Milvus avec VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans ce tutoriel, nous verrons comment charger efficacement des données dans Milvus à l'aide de <a href="https://github.com/ContextData/VectorETL">VectorETL</a>, un cadre ETL léger conçu pour les bases de données vectorielles. VectorETL simplifie le processus d'extraction des données à partir de diverses sources, leur transformation en encastrements vectoriels à l'aide de modèles d'IA et leur stockage dans Milvus pour une récupération rapide et évolutive. À la fin de ce tutoriel, vous disposerez d'un pipeline ETL fonctionnel qui vous permettra d'intégrer et de gérer facilement des systèmes de recherche vectorielle. Plongeons dans l'aventure !</p>
<h2 id="Preparation" class="common-anchor-header">Préparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Dépendance et environnement</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade vector-etl pymilvus</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, pour activer les dépendances qui viennent d'être installées, vous devrez peut-être <strong>redémarrer le runtime</strong> (cliquez sur le menu "Runtime" en haut de l'écran, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<p>VectorETL supporte plusieurs sources de données, y compris Amazon S3, Google Cloud Storage, Local File, etc. Vous pouvez consulter la liste complète des sources prises en charge <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">ici</a>. Dans ce tutoriel, nous nous concentrerons sur Amazon S3 comme exemple de source de données.</p>
<p>Nous chargerons des documents à partir d'Amazon S3. Par conséquent, vous devez préparer <code translate="no">AWS_ACCESS_KEY_ID</code> et <code translate="no">AWS_SECRET_ACCESS_KEY</code> en tant que variables d'environnement pour accéder de manière sécurisée à votre panier S3. En outre, nous utiliserons le modèle d'intégration <code translate="no">text-embedding-ada-002</code> d'OpenAI pour générer des intégrations pour les données. Vous devez également préparer la <a href="https://platform.openai.com/docs/quickstart">clé api</a> <code translate="no">OPENAI_API_KEY</code> comme variable d'environnement.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Flux de travail<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Définition de la source de données (Amazon S3)</h3><p>Dans ce cas, nous extrayons des documents à partir d'un bac Amazon S3. VectorETL nous permet de spécifier le nom du panier, le chemin d'accès aux fichiers et le type de données avec lesquelles nous travaillons.</p>
<pre><code translate="no" class="language-python">source = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Configuration du modèle d'intégration (OpenAI)</h3><p>Une fois notre source de données configurée, nous devons définir le modèle d'intégration qui transformera nos données textuelles en intégrations vectorielles. Dans cet exemple, nous utilisons le modèle <code translate="no">text-embedding-ada-002</code> d'OpenAI.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Configuration de Milvus comme base de données cible</h3><p>Nous devons stocker les embeddings générés dans Milvus. Ici, nous définissons nos paramètres de connexion Milvus à l'aide de Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pour <code translate="no">host</code> et <code translate="no">api_key</code>:</p>
<ul>
<li><p>Définir <code translate="no">host</code> comme un fichier local, par exemple<code translate="no">./milvus.db</code>, et laisser <code translate="no">api_key</code> vide est la méthode la plus pratique, car elle utilise automatiquement <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans ce fichier.</p></li>
<li><p>Si vous avez des données à grande échelle, vous pouvez configurer un serveur Milvus plus performant sur <a href="https://milvus.io/docs/quickstart.md">docker ou kubernetes</a>. Dans cette configuration, veuillez utiliser l'uri du serveur, par exemple<code translate="no">http://localhost:19530</code>, comme votre <code translate="no">host</code> et laissez <code translate="no">api_key</code> vide.</p></li>
<li><p>Si vous souhaitez utiliser <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service cloud entièrement géré pour Milvus, ajustez les adresses <code translate="no">host</code> et <code translate="no">api_key</code>, qui correspondent au <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et à la clé Api</a> dans Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Spécification des colonnes pour l'intégration</h3><p>Nous devons maintenant spécifier quelles colonnes de nos fichiers CSV doivent être converties en embeddings. Cela permet de s'assurer que seuls les champs de texte pertinents sont traités, optimisant ainsi l'efficacité et le stockage.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Création et exécution du pipeline VectorETL</h3><p>Une fois toutes les configurations en place, nous pouvons maintenant initialiser le pipeline ETL, configurer le flux de données et l'exécuter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>En suivant ce tutoriel, nous avons réussi à construire un pipeline ETL de bout en bout pour déplacer des documents d'Amazon S3 vers Milvus à l'aide de VectorETL. VectorETL est flexible en ce qui concerne les sources de données, de sorte que vous pouvez choisir les sources de données que vous souhaitez en fonction des besoins spécifiques de votre application. Grâce à la conception modulaire de VectorETL, vous pouvez facilement étendre ce pipeline pour prendre en charge d'autres sources de données, en intégrant des modèles, ce qui en fait un outil puissant pour l'IA et les flux de travail d'ingénierie des données !</p>
