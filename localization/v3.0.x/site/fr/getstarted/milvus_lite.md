---
id: milvus_lite.md
summary: >-
  Installez Milvus Lite et lancez une recherche vectorielle locale en indiquant
  un chemin d'accès permanent à la base de données.
title: Exécuter Milvus Lite en local
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Exécuter Milvus Lite en local<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page explique comment effectuer une recherche vectorielle en local avec Milvus Lite. Elle aborde l'installation, la persistance des données, le filtrage et l'exportation des données vers un autre déploiement Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite est un backend local léger pour le <a href="https://github.com/milvus-io/pymilvus">SDK Python de Milvus</a>. Installez-le à l’aide du module optionnel « <code translate="no">milvus-lite</code> » ; l’installation de « <code translate="no">pymilvus</code> » seule ne suffit pas à installer ce backend dans la version du SDK utilisée ci-dessous.</p>
<p>Milvus Lite est adapté au développement local et aux charges de travail à petite échelle dans des environnements tels que :</p>
<ul>
<li>Jupyter Notebook ou Google Colab</li>
<li>Ordinateurs portables</li>
<li>Appareils en périphérie disposant des dépendances Python compatibles</li>
</ul>
<p>Milvus Lite utilise l’API <code translate="no">MilvusClient</code> pour les opérations prises en charge, notamment la persistance des données vectorielles, l’insertion et la suppression, la recherche vectorielle et le filtrage des métadonnées. Pour migrer un workflow d’application pris en charge vers un déploiement distant, modifiez l’URI de connexion et les identifiants, puis vérifiez les différences au niveau des fonctionnalités prises en charge. Pour les charges de travail de production à grande échelle, utilisez <a href="/docs/fr/install-overview.md">Milvus Standalone ou Distributed</a>, ou Milvus entièrement géré sur <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide utilise PyMilvus <strong>3.0.2</strong> et Milvus Lite <strong>3.2.2</strong>. Préparez l’environnement suivant :</p>
<ul>
<li>Python 3.10 ou version plus récente. Le backend Lite local requiert une version minimale de Python supérieure à celle du client PyMilvus distant.</li>
<li>macOS, Linux ou Windows, avec des paquets « wheels » compatibles pour les dépendances telles que <code translate="no">faiss-cpu</code> et <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 est un paquet entièrement en Python ; le système d’exploitation et l’architecture doivent donc satisfaire ces dépendances plutôt que le paquet Lite lui-même.</li>
<li>Un répertoire local accessible en écriture pour le stockage de la base de données.</li>
</ul>
<p>Sous Windows, pip ignore le module supplémentaire « <code translate="no">milvus-lite</code> » de PyMilvus 3.0.2 en raison de son marqueur de plateforme ; il faut donc spécifier explicitement « <code translate="no">milvus-lite</code> ». La commande d’installation ci-dessous le fait déjà. Pour d’autres combinaisons de paquets et de plateformes, consultez les <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">exigences de version de Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Configurer Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Créez un environnement Python isolé et installez les deux paquets :</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Mettez l’expression « extras » entre guillemets afin que les shells tels que zsh n’interprètent pas les crochets. Sous Windows PowerShell, activez l’environnement avec ` <code translate="no">.venv\Scripts\Activate.ps1</code> ` au lieu de ` <code translate="no">source .venv/bin/activate</code>`. Les versions explicites permettent de maintenir la cohérence entre le SDK et le backend local, conformément à ce guide.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x utilise un moteur de stockage différent de celui du paquet 2.x d’origine. Il ne peut pas ouvrir en place un fichier « <code translate="no">.db</code> » existant de la version 2.x. Conservez la base de données d’origine et un environnement capable de l’ouvrir, exportez-y vos données, puis importez-les dans une nouvelle base de données. L’installation d’un nouveau paquet ne migre pas l’ancien format de stockage. Voir <a href="#Migrating-data-from-Milvus-Lite">Migration des données depuis Milvus Lite</a>.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Connexion à Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Transmettez un chemin d’accès local se terminant par <code translate="no">.db</code> à <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour Milvus Lite 3.2.2, cela crée un <strong>répertoire milvus_demo.db</strong> dans le répertoire de travail. Ce répertoire contient les fichiers de stockage de la base de données ; le suffixe <code translate="no">.db</code> ne signifie pas qu’il s’agit d’un fichier portable unique. Réutilisez le même chemin d’accès pour rouvrir la base de données après avoir fermé le client ou redémarré l’application.</p>
<p>Utilisez un autre chemin d’accès pour une nouvelle base de données. Pour vous connecter à un serveur Milvus distant, indiquez son point de terminaison et ses identifiants :</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Exécuter un exemple de recherche locale<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>L’exemple suivant illustre le flux de travail de l’API avec des vecteurs générés. Ces vecteurs ne codent pas la signification du texte ; utilisez un modèle d’embedding lors de la création d’une recherche sémantique. Exécutez l’exemple avec un nouveau chemin d’accès à la base de données, ou supprimez le fichier « <code translate="no">demo_collection</code> » existant avant de le relancer.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Pour une application générant des plongées à partir de texte, passez à <a href="/docs/fr/quickstart.md">la section « Démarrage rapide</a> ». Vous pouvez également explorer les <a href="https://github.com/milvus-io/bootcamp">exemples du Bootcamp Milvus</a> consacrés au RAG, à la recherche d’images et aux intégrations de frameworks.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Fonctionnalités prises en charge et limites<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 implémente un sous-ensemble des opérations Milvus via son adaptateur PyMilvus local. Sa <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">référence des fonctionnalités, mise à jour régulièrement</a>, décrit les capacités suivantes :</p>
<table>
<thead>
<tr><th>Domaine</th><th>Prise en charge dans cette version Lite</th></tr>
</thead>
<tbody>
<tr><td>Vecteurs denses et clairsemés</td><td><code translate="no">FLOAT_VECTOR</code> et <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Index vectoriels</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, et <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>les index scalaires et clairsemés</td><td><code translate="no">INVERTED</code> index scalaires et <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Opérations sur les données</td><td>Insertion, mise à jour, récupération, requête, recherche vectorielle et suppression</td></tr>
<tr><td>Recherche</td><td>Recherche dense et clairsemée, filtres de métadonnées, champs vectoriels multiples et recherche hybride</td></tr>
<tr><td>Organisation des collections</td><td>Collections, bases de données nommées, alias et partitions, dans le cadre des opérations prises en charge par l’adaptateur local</td></tr>
</tbody>
</table>
<p>Cette version n’est pas limitée aux index « <code translate="no">FLAT</code> ». La disponibilité et le comportement des index dépendent de la version Lite ; n’appliquez pas les limites du backend 2.x d’origine au moteur 3.x.</p>
<p>Vérifiez ces limites avant de choisir Lite pour une application :</p>
<ul>
<li>Un seul processus à la fois peut être propriétaire d’un répertoire de stockage de base de données. Le moteur protège le répertoire à l’aide d’un verrou de fichier.</li>
<li>Sérialisez les écritures sur une même collection. Les écritures simultanées ne sont pas prises en charge en toute sécurité.</li>
<li>L’adaptateur local n’implémente pas tous les appels RPC de Milvus. Les opérations non prises en charge renvoient « <code translate="no">UNIMPLEMENTED</code> » ; la modification du schéma ainsi que le chargement ou la libération au niveau des partitions ne sont pas disponibles.</li>
<li>L’authentification, les utilisateurs, les rôles, le RBAC et le protocole TLS ne sont pas pris en charge. N’exposez pas le serveur local à un réseau non fiable.</li>
<li>Les champs vectoriels de type binaire, float16, bfloat16 et int8, ainsi que les index de quantification de produit, ne sont pas pris en charge.</li>
<li>La version Lite est conçue pour les charges de travail locales. La compatibilité avec l’API locale n’offre pas la scalabilité distribuée ni l’isolation et la disponibilité en production d’un déploiement à distance.</li>
</ul>
<p>Consultez la liste <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">des limitations connues par version</a> avant de vous fier à une fonctionnalité du serveur qui n’est pas mise en œuvre dans l’exemple local.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migration des données depuis Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez <code translate="no">milvus-lite dump</code> pour exporter une collection sous forme de fichiers JSON Milvus BulkWriter. Ces fichiers peuvent être importés dans un déploiement Milvus auto-hébergé ou dans Zilliz Cloud.</p>
<p>Installez les dépendances du BulkWriter du SDK dans l’environnement qui ouvre la base de données source :</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Fermez l’application Python qui gère la base de données locale avant d’exécuter la commande dans un autre processus. Exportez la collection de l’exemple précédent :</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>La commande lit le fichier « <code translate="no">demo_collection</code> » dans <strong>le répertoire de stockage « milvus_demo.db »</strong> et écrit les fichiers d’exportation dans le répertoire « <strong>data_dir</strong> ». Importez ces fichiers à l’aide de <a href="/docs/fr/import-data.md">Bulk Insert</a> ou de <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Pour exporter un fichier de base de données 2.x d’origine, exécutez l’outil de sauvegarde dans un environnement équipé de la version Lite d’origine capable d’ouvrir ce fichier. L’outil de sauvegarde 3.x ne convertit pas l’ancien format de stockage en l’ouvrant directement. Conservez la base de données source jusqu’à ce que vous ayez vérifié le nombre de lignes importées et les résultats de recherche.</p>
</blockquote>
</div>
<p>Pour connaître les options de sauvegarde prises en charge et les restrictions relatives au format de stockage, consultez la <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">référence d’exportation de Milvus Lite</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">Étapes suivantes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Poursuivez avec les tâches suivantes :</p>
<ul>
<li><a href="/docs/fr/quickstart.md">Guide de démarrage rapide</a>: générez des représentations et exécutez un workflow de recherche.</li>
<li><a href="/docs/fr/single-vector-search.md">Recherche à vecteur unique</a> et <a href="/docs/fr/multi-vector-search.md">recherche hybride</a>: concevez des requêtes pour votre application.</li>
<li><a href="/docs/fr/install-overview.md">Choisissez un déploiement</a>: allez au-delà du développement local.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: découvrez l'interface graphique de Milvus pour un déploiement à distance.</li>
</ul>
