---
id: text_image_search.md
summary: >-
  Dans ce tutoriel, nous allons explorer comment mettre en œuvre la recherche
  d'images basée sur le texte en utilisant le modèle CLIP (Contrastive
  Language-Image Pretraining) d'OpenAI et Milvus. Nous allons générer des
  encastrements d'images avec CLIP, les stocker dans Milvus et effectuer des
  recherches de similarité efficaces.
title: Recherche texte-image avec Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Recherche texte-image avec Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La recherche texte-image est une technologie avancée qui permet aux utilisateurs de rechercher des images à l'aide de descriptions textuelles en langage naturel. Elle s'appuie sur un modèle multimodal pré-entraîné pour convertir à la fois le texte et les images en encastrements dans un espace sémantique partagé, permettant des comparaisons basées sur la similarité.</p>
<p>Dans ce tutoriel, nous allons explorer comment mettre en œuvre la recherche d'images basée sur le texte en utilisant le modèle CLIP (Contrastive Language-Image Pretraining) de l'OpenAI et Milvus. Nous allons générer des encastrements d'images avec CLIP, les stocker dans Milvus et effectuer des recherches de similarité efficaces.</p>
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
    </button></h2><p>Avant de commencer, assurez-vous que vous disposez de tous les paquets nécessaires et des données d'exemple.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Installer les dépendances</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> pour interagir avec la base de données Milvus</li>
<li><strong>clip</strong> pour travailler avec le modèle CLIP</li>
<li><strong>pillow</strong> pour le traitement et la visualisation d'images</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si vous utilisez Google Colab, vous devrez peut-être <strong>redémarrer le runtime</strong> (Naviguez vers le menu "Runtime" en haut de l'interface, et sélectionnez "Restart session" dans le menu déroulant).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Télécharger des données d'exemple</h3><p>Nous utiliserons un sous-ensemble du jeu de données <a href="https://www.image-net.org">ImageNet</a> (100 classes, 10 images pour chaque classe) comme images d'exemple. La commande suivante télécharge les données d'exemple et les extrait dans le dossier local <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Configuration de Milvus</h3><p>Avant de poursuivre, configurez votre serveur Milvus et connectez-vous à l'aide de votre URI (et éventuellement d'un jeton) :</p>
<ul>
<li><p><strong>Milvus Lite (recommandé pour des raisons de commodité)</strong>: Définissez l'URI sur un fichier local, tel que ./milvus.db. Cela permet de tirer automatiquement parti de <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> pour stocker toutes les données dans un seul fichier.</p></li>
<li><p><strong>Docker ou Kubernetes (pour les données à grande échelle)</strong>: Pour traiter des ensembles de données plus importants, déployez un serveur Milvus plus performant à l'aide de <a href="https://milvus.io/docs/quickstart.md">Docker ou Kubernetes</a>. Dans ce cas, utilisez l'URI du serveur, tel que http://localhost:19530, pour vous connecter.</p></li>
<li><p><strong>Zilliz Cloud (Managed Service)</strong>: Si vous utilisez <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, le service en nuage entièrement géré de Milvus, définissez le point de terminaison public comme URI et la clé API comme jeton.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Démarrage<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Maintenant que vous disposez des dépendances et des données nécessaires, il est temps de configurer les extracteurs de fonctionnalités et de commencer à travailler avec Milvus. Cette section vous guidera à travers les étapes clés de la construction d'un système de recherche texte-image. Enfin, nous montrerons comment récupérer et visualiser des images sur la base de requêtes textuelles.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Définir les extracteurs de caractéristiques</h3><p>Nous utiliserons un modèle CLIP pré-entraîné pour générer des encastrements d'images et de textes. Dans cette section, nous chargeons la variante <strong>ViT-B/32</strong> pré-entraînée de CLIP et définissons les fonctions d'aide pour encoder les images et le texte :</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Traite et encode les images en vecteurs de caractéristiques</li>
<li><code translate="no">encode_text(text)</code>: Encode les requêtes textuelles en vecteurs de caractéristiques</li>
</ul>
<p>Les deux fonctions normalisent les caractéristiques de sortie pour garantir des comparaisons cohérentes en convertissant les vecteurs en longueur unitaire, ce qui est essentiel pour des calculs de similarité en cosinus précis.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">Ingestion des données</h3><p>Pour permettre la recherche sémantique d'images, nous devons d'abord générer des embeddings pour toutes les images et les stocker dans une base de données vectorielle pour une indexation et une recherche efficaces. Cette section fournit un guide étape par étape pour l'ingestion de données d'images dans Milvus.</p>
<p><strong>1. Créer une collection Milvus</strong></p>
<p>Avant de stocker les incorporations d'images, vous devez créer une collection Milvus. Le code suivant montre comment créer une collection en mode installation rapide avec le type de métrique COSINE par défaut. La collection comprend les champs suivants :</p>
<ul>
<li><p><code translate="no">id</code>: Un champ primaire avec ID automatique activé.</p></li>
<li><p><code translate="no">vector</code>: Un champ pour stocker les intégrations de vecteurs en virgule flottante.</p></li>
</ul>
<p>Si vous avez besoin d'un schéma personnalisé, reportez-vous à la <a href="https://milvus.io/docs/create-collection.md">documentation Milvus</a> pour obtenir des instructions détaillées.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Insérer des données dans Milvus</strong></p>
<p>Dans cette étape, nous utilisons un encodeur d'images prédéfini pour générer des embeddings pour toutes les images JPEG dans le répertoire de données de l'exemple. Ces embeddings sont ensuite insérés dans la collection Milvus, avec les chemins d'accès aux fichiers correspondants. Chaque entrée de la collection se compose des éléments suivants</p>
<ul>
<li><strong>Vecteur d'intégration</strong>: La représentation numérique de l'image. Stockée dans le champ <code translate="no">vector</code>.</li>
<li><strong>Chemin d'accès au fichier</strong>: L'emplacement du fichier d'image pour référence. Stocké dans le champ <code translate="no">filepath</code> en tant que champ dynamique.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">Effectuer une recherche</h3><p>Lançons maintenant une recherche à l'aide d'un exemple de requête textuelle. Cette recherche permettra d'extraire les images les plus pertinentes en fonction de leur similarité sémantique avec la description textuelle donnée.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualiser les résultats :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
