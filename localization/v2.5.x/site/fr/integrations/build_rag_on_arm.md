---
id: build_rag_on_arm.md
summary: >-
  Dans ce tutoriel, vous apprendrez à construire une application RAG
  (Retrieval-Augmented Generation) sur des infrastructures basées sur Arm. Pour
  le stockage des vecteurs, nous utilisons Zilliz Cloud, la base de données
  vectorielle Milvus entièrement gérée. Zilliz Cloud est disponible sur les
  principaux clouds tels que AWS, GCP et Azure. Dans cette démonstration, nous
  utilisons Zilliz Cloud déployé sur AWS avec des machines Arm. Pour LLM, nous
  utilisons le modèle Llama-3.1-8B sur le serveur AWS Arm CPU en utilisant
  llama.cpp.
title: Construire RAG sur l'architecture Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Construire RAG sur l'architecture Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>Les processeurs<a href="https://www.arm.com/">Arm</a> sont largement utilisés dans une large gamme d'applications, y compris les cas d'utilisation traditionnels de l'apprentissage automatique (ML) et de l'intelligence artificielle (AI).</p>
<p>Dans ce tutoriel, vous apprendrez à construire une application RAG (Retrieval-Augmented Generation) sur des infrastructures basées sur l'architecture Arm. Pour le stockage des vecteurs, nous utilisons <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, la base de données vectorielle Milvus entièrement gérée. Zilliz Cloud est disponible sur les principaux clouds tels que AWS, GCP et Azure. Dans cette démonstration, nous utilisons Zilliz Cloud déployé sur AWS avec des machines Arm. Pour le LLM, nous utilisons le modèle <code translate="no">Llama-3.1-8B</code> sur l'unité centrale du serveur AWS basé sur Arm en utilisant <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Prérequis<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour exécuter cet exemple, nous vous recommandons d'utiliser <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, qui offre un moyen rentable d'exécuter des charges de travail de ML sur des serveurs basés sur Arm. Ce cahier a été testé sur une instance AWS Graviton3 <code translate="no">c7g.2xlarge</code> avec le système Ubuntu 22.04 LTS.</p>
<p>Vous avez besoin d'au moins quatre cœurs et 8 Go de RAM pour exécuter cet exemple. Configurez un espace de stockage sur disque d'au moins 32 Go. Nous vous recommandons d'utiliser une instance ayant des spécifications identiques ou supérieures.</p>
<p>Après avoir lancé l'instance, connectez-vous à elle et exécutez les commandes suivantes pour préparer l'environnement.</p>
<p>Installez python sur le serveur :</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Créez et activez un environnement virtuel :</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Installer les dépendances python requises :</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Chargement des données hors ligne<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Créer la collection</h3><p>Nous utilisons <a href="https://zilliz.com/cloud">Zilliz Cloud</a> déployé sur AWS avec des machines basées sur Arm pour stocker et récupérer les données vectorielles. Pour démarrer rapidement, il suffit d'<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">ouvrir un compte</a> sur Zilliz Cloud gratuitement.</p>
<div class="alert note">
<p>En plus de Zilliz Cloud, Milvus auto-hébergé est également une option (plus compliquée à mettre en place). Nous pouvons également déployer <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> et <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> sur des machines basées sur ARM. Pour plus d'informations sur l'installation de Milvus, veuillez vous référer à la <a href="https://milvus.io/docs/install-overview.md">documentation d'installation</a>.</p>
</div>
<p>Nous définissons les adresses <code translate="no">uri</code> et <code translate="no">token</code> comme <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">point de terminaison public et clé Api</a> dans Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Vérifier si la collection existe déjà et la supprimer si c'est le cas.</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Créer une nouvelle collection avec les paramètres spécifiés.</p>
<p>Si nous ne spécifions aucune information de champ, Milvus créera automatiquement un champ par défaut <code translate="no">id</code> pour la clé primaire et un champ <code translate="no">vector</code> pour stocker les données vectorielles. Un champ JSON réservé est utilisé pour stocker les champs non définis par le schéma et leurs valeurs.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  # Inner product distance
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  # Supported values are (<span class="hljs-string">`&quot;Strong&quot;`</span>, <span class="hljs-string">`&quot;Session&quot;`</span>, <span class="hljs-string">`&quot;Bounded&quot;`</span>, <span class="hljs-string">`&quot;Eventually&quot;`</span>). See https:<span class="hljs-comment">//milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nous utilisons la distance du produit intérieur comme type métrique par défaut. Pour plus d'informations sur les types de distance, vous pouvez vous référer à la <a href="https://milvus.io/docs/metric.md?tab=floating">page Métriques de similarité.</a></p>
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
<h3 id="Insert-data" class="common-anchor-header">Insérer des données</h3><p>Nous préparons un modèle d'intégration simple mais efficace, <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a>, qui peut convertir le texte en vecteurs d'intégration.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbeddings</span>

embedding_model = <span class="hljs-title class_">HuggingFaceEmbeddings</span>(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Nous parcourons les lignes de texte, créons des vecteurs d'intégration, puis insérons les données dans Milvus.</p>
<p>Voici un nouveau champ <code translate="no">text</code>, qui est un champ non défini dans le schéma de la collection. Il sera automatiquement ajouté au champ dynamique JSON réservé, qui peut être traité comme un champ normal à un niveau élevé.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Lancement du service LLM sur Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cette section, nous allons construire et lancer le service <code translate="no">llama.cpp</code> sur l'unité centrale basée sur Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Modèle Llama 3.1 et llama.cpp</h3><p>Le <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">modèle Llama-3.1-8B</a> de Meta appartient à la famille des modèles Llama 3.1 et est libre d'utilisation pour la recherche et à des fins commerciales. Avant d'utiliser le modèle, visitez le <a href="https://llama.meta.com/llama-downloads/">site web</a> Llama et remplissez le formulaire de demande d'accès.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> est un projet C/C++ open source qui permet une inférence LLM efficace sur une variété de matériel - à la fois localement et dans le nuage. Vous pouvez facilement héberger un modèle Llama 3.1 en utilisant <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Téléchargez et compilez llama.cpp</h3><p>Exécutez les commandes suivantes pour installer make, cmake, gcc, g++ et d'autres outils essentiels requis pour construire llama.cpp à partir des sources :</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Vous êtes maintenant prêt à construire <code translate="no">llama.cpp</code>.</p>
<p>Clonez le dépôt des sources de llama.cpp :</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Par défaut, <code translate="no">llama.cpp</code> ne construit pour le CPU que sous Linux et Windows. Vous n'avez pas besoin de fournir de commutateurs supplémentaires pour le construire pour le processeur Arm sur lequel vous l'exécutez.</p>
<p>Exécutez <code translate="no">make</code> pour le compiler :</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Vérifiez que <code translate="no">llama.cpp</code> a été compilé correctement en exécutant la commande help :</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">llama.cpp</code> a été construit correctement, vous verrez l'option help s'afficher. L'extrait de sortie ressemble à ceci :</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Vous pouvez maintenant télécharger le modèle à l'aide de la commande huggingface cli :</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-gguf dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-Q4_0.gguf --local-<span class="hljs-built_in">dir</span> . --local-<span class="hljs-built_in">dir</span>-use-symlinks <span class="hljs-literal">False</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le format de modèle GGUF, introduit par l'équipe llama.cpp, utilise la compression et la quantification pour réduire la précision des poids à des entiers de 4 bits, réduisant de manière significative les exigences de calcul et de mémoire et rendant les CPU Arm efficaces pour l'inférence LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Re-quantifier les poids du modèle</h3><p>Pour quantifier à nouveau, exécutez</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Ceci produira un nouveau fichier, <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, qui contient des poids reconfigurés qui permettent à <code translate="no">llama-cli</code> d'utiliser SVE 256 et le support MATMUL_INT8.</p>
<div class="alert note">
<p>Cette requantification est optimale spécifiquement pour Graviton3. Pour Graviton2, la requantification optimale doit être effectuée au format <code translate="no">Q4_0_4_4</code>, et pour Graviton4, le format <code translate="no">Q4_0_4_8</code> est le plus approprié pour la requantification.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Démarrer le service LLM</h3><p>Vous pouvez utiliser le programme serveur llama.cpp et envoyer des requêtes via une API compatible avec l'OpenAI. Cela vous permet de développer des applications qui interagissent avec le LLM plusieurs fois sans avoir à le démarrer et à l'arrêter de manière répétée. En outre, vous pouvez accéder au serveur à partir d'une autre machine où le LLM est hébergé sur le réseau.</p>
<p>Démarrez le serveur à partir de la ligne de commande, et il écoute sur le port 8080 :</p>
<pre><code translate="no" class="language-shell">$ ./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>Vous pouvez également ajuster les paramètres du LLM lancé pour l'adapter au matériel de votre serveur et obtenir des performances optimales. Pour plus d'informations sur les paramètres, voir la commande <code translate="no">llama-server --help</code>.</p>
<p>Si vous avez du mal à réaliser cette étape, vous pouvez vous référer aux <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">documents officiels</a> pour plus d'informations.</p>
<p>Vous avez démarré le service LLM sur votre processeur Arm. Nous allons maintenant interagir directement avec le service en utilisant le SDK OpenAI.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG en ligne<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Client LLM et modèle d'intégration</h3><p>Nous initialisons le client LLM et préparons le modèle d'intégration.</p>
<p>Pour le LLM, nous utilisons le SDK OpenAI pour demander le service Llama lancé précédemment. Nous n'avons pas besoin d'utiliser de clé API car il s'agit en fait de notre service local llama.cpp.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm_client = <span class="hljs-title class_">OpenAI</span>(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Générer un embedding de test et imprimer sa dimension et ses premiers éléments.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Récupérer des données pour une requête</h3><p>Spécifions une question fréquente sur Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Recherchez la question dans la collection et récupérez les 3 meilleures réponses sémantiques.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Jetons un coup d'œil aux résultats de la recherche de la requête</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utiliser LLM pour obtenir une réponse RAG</h3><p>Convertissez les documents récupérés dans un format de chaîne.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Utilisez LLM pour générer une réponse basée sur les invites. Nous avons défini le paramètre <code translate="no">model</code> à <code translate="no">not-used</code> car il s'agit d'un paramètre redondant pour le service llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>Félicitations ! Vous avez construit une application RAG sur les infrastructures basées sur Arm.</p>
