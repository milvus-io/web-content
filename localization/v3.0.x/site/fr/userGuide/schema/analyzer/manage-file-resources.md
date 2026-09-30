---
id: manage-file-resources.md
title: Gérer les ressources de fichiers
summary: >-
  Enregistrer et gérer les fichiers de dictionnaires externes que les analyseurs
  de texte Milvus peuvent charger au moment de l'exécution.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Gérer les ressources de fichiers<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>Une <strong>ressource de fichier</strong> est une référence enregistrée par le serveur à un fichier de dictionnaire externe que les analyseurs de texte consomment au moment de l'exécution. Dans Milvus 3.0, quatre composants d'analyse peuvent charger leurs dictionnaires à partir d'une ressource de fichier plutôt qu'à partir d'un tableau en ligne :</p>
<table>
   <tr>
     <th><p><strong>Composant d'analyse</strong></p></th>
     <th><p><strong>Paramètre acceptant une ressource fichier</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/jieba-tokenizer.md">Jieba tokenizer</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/stop-filter.md">Filtre d'arrêt</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/decompounder-filter.md">Filtre de décompactage</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/synonym-filter.md">Filtre de synonyme</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Les ressources de fichiers résolvent deux problèmes pratiques avec les tableaux de dictionnaires en ligne :</p>
<ul>
<li><p>Les dictionnaires réels sont volumineux. Un vocabulaire chinois Jieba peut comporter des dizaines de milliers de lignes ; les tables de synonymes sont généralement composées de milliers de règles. Les intégrer dans la configuration de l'analyseur n'est pas pratique.</p></li>
<li><p>Le même dictionnaire est généralement partagé entre plusieurs collections. En l'enregistrant une fois, puis en le référençant par son nom, les schémas restent petits et les mises à jour du dictionnaire se font en une seule opération.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Types de ressources de fichiers<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge deux types de ressources de fichiers avec des responsabilités de gestion différentes :</p>
<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Où se trouve le fichier</strong></p></th>
     <th><p><strong>Qui gère le fichier</strong></p></th>
     <th><p><strong>En forme</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>A distance</strong></p></td>
     <td><p>Dans le magasin d'objets (MinIO / S3 / GCS / Azure) que votre cluster Milvus est déjà configuré pour utiliser.</p></td>
     <td><p>Milvus, via les API client <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Recommandé pour la plupart des déploiements.</p></td>
   </tr>
   <tr>
     <td><p><strong>Local</strong></p></td>
     <td><p>Au même chemin absolu sur le système de fichiers local de chaque composant Milvus (DataNode, QueryNode, StreamingNode).</p></td>
     <td><p>Vous - montez le fichier vous-même, par exemple via un volume Kubernetes.</p></td>
     <td><p>Scénarios open-source / auto-hébergés dans lesquels vous préférez gérer les fichiers de dictionnaire en dehors de Milvus.</p></td>
   </tr>
</table>
<p>Le reste de cette page présente les deux types, en commençant par le type distant le plus courant.</p>
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
<li><p>Pour les ressources de fichiers <strong>distants</strong>, votre déploiement Milvus doit être configuré avec un magasin d'objets. La plupart des déploiements le sont déjà - vérifiez la section <code translate="no">minio:</code> de votre <code translate="no">milvus.yaml</code> (ou les valeurs équivalentes du tableau Helm). Notez les valeurs <code translate="no">bucketName</code> et <code translate="no">rootPath</code>; vous en aurez besoin lors de l'enregistrement des ressources de fichiers.</p></li>
<li><p>Pour les ressources de fichiers <strong>locales</strong>, vous devez pouvoir placer des fichiers sur chaque pod/conteneur Milvus au même chemin absolu. La manière de procéder dépend de votre déploiement (montage bind, volume soutenu par ConfigMap, conteneur init, etc.)</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Enregistrer une ressource de fichier distante<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>L'enregistrement d'une ressource fichier distante est un flux de travail en trois étapes : <strong>télécharger</strong> le fichier vers le stockage d'objets, l'<strong>enregistrer</strong> avec Milvus sous un nom choisi, puis le <strong>référencer à</strong> partir de n'importe quel analyseur qui en a besoin.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Étape 1. Télécharger le fichier du dictionnaire vers le stockage d'objets<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez votre propre outil (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, ou tout client compatible S3) pour placer le fichier dans le seau que Milvus est configuré pour utiliser.</p>
<p>Par exemple, si <code translate="no">milvus.yaml</code> contient :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le téléchargement d'un fichier nommé <code translate="no">chinese_terms.txt</code> avec <code translate="no">rootPath</code> comme préfixe place l'objet à <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>L'argument <code translate="no">path</code> que vous transmettrez à <code translate="no">add_file_resource</code> à l'étape 2 est la <strong>clé complète de l'objet, y compris le préfixe rootPath</strong> - pour l'exemple ci-dessus, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Un chemin sans préfixe (par exemple, juste <code translate="no">&quot;chinese_terms.txt&quot;</code>) est rejeté avec l'erreur <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Étape 2. Enregistrer le fichier avec <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> valide de manière synchrone : l'appel ne revient que lorsque Milvus a confirmé que l'objet existe à l'adresse <code translate="no">path</code> dans le magasin d'objets configuré. Si l'objet est manquant, l'appel soulève <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - téléchargez d'abord le fichier, puis réessayez.</p>
<p>L'appel est idempotent. Appeler <code translate="no">add_file_resource</code> deux fois avec les mêmes <code translate="no">name</code> et <code translate="no">path</code> ne crée pas de doublons.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Étape 3. Faire référence à la ressource fichier à partir d'un analyseur<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Chaque fois qu'un paramètre d'analyseur accepte une référence de fichier (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), utilisez la forme distante canonique :</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Les quatre paramètres de l'analyseur utilisent la même forme ; seule la clé de l'analyseur qui les entoure diffère. Pour des exemples concrets par analyseur, voir Jieba tokenizer, Stop filter, Decompounder filter, et Synonym filter.</p>
<p>Les noms des paramètres sont <code translate="no">resource_name</code> et <code translate="no">file_name</code> - et non <code translate="no">name</code> et <code translate="no">file</code>. L'utilisation de <code translate="no">name</code> / <code translate="no">file</code> (ou <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> au lieu de <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) soulève <code translate="no">MilvusException</code> au moment de la création de l'analyseur avec un message comme <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Liste des ressources de fichiers<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> renvoie une liste d'objets <code translate="no">FileResourceInfo</code>, chacun avec les attributs <code translate="no">.name</code> et <code translate="no">.path</code>. Le groupe vide renvoie <code translate="no">[]</code>. Il n'y a pas de <code translate="no">get</code> par ressource ; <code translate="no">list_file_resources</code> est la seule API de lecture.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Supprimer une ressource fichier<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> est idempotente : l'appeler pour un nom qui n'existe pas renvoie <code translate="no">None</code> sans relance.</p>
<p>Avant de supprimer une ressource fichier, supprimez ou modifiez toutes les collections dont les configurations d'analyseur la référencent. Le fait de conserver une ressource fichier jusqu'à ce qu'aucune collection n'en dépende permet d'éviter que les recherches de l'analyseur échouent après la disparition de la ressource.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Utiliser une ressource fichier locale<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Une ressource de fichier <strong>locale</strong> pointe directement sur un chemin du système de fichiers local de chaque composant Milvus. Il n'y a pas d'appel <code translate="no">add_file_resource</code> - Milvus ne suit pas les ressources locales. Vous placez vous-même le fichier au même chemin absolu sur chaque pod ou conteneur concerné, puis vous y faites référence par le chemin :</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Les ressources de fichiers locaux ne sont valables que dans les déploiements où vous contrôlez les systèmes de fichiers des DataNodes, QueryNodes et StreamingNodes - généralement Milvus auto-hébergé sur bare-metal ou sur un cluster Kubernetes où vous pouvez ajouter un montage de volume. Le fichier doit exister exactement au même chemin absolu sur chaque composant ; sinon, certains nœuds échouent lors du chargement de l'analyseur.</p>
<p>Le fichier est ouvert lorsque l'analyseur est créé pour la première fois. Si le chemin n'existe pas à ce moment-là, la création de l'analyseur échoue avec <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Points à prendre en considération<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>La disponibilité à l'échelle du cluster n'est pas instantanée.</strong> Après le retour de <code translate="no">add_file_resource</code>, Milvus synchronise le fichier avec chaque composant qui en a besoin. Pendant cette brève fenêtre, la création d'une collection faisant référence à la ressource peut échouer sur les nœuds qui n'ont pas encore été synchronisés. La solution consiste généralement à réessayer l'appel de création après quelques secondes.</p></li>
<li><p><strong>Ne supprimer que si aucune collection ne dépend de la ressource.</strong> Supprimez ou modifiez toute collection dont la configuration de l'analyseur fait référence à la ressource avant d'appeler <code translate="no">remove_file_resource</code>, afin d'éviter que les recherches de l'analyseur ne parviennent pas à trouver le fichier.</p></li>
<li><p><strong>Métadonnées uniquement.</strong> <code translate="no">list_file_resources()</code> renvoie <code translate="no">name</code> et <code translate="no">path</code> - il n'y a pas de taille, de somme de contrôle, de temps de téléchargement ou d'autres métadonnées. Gardez une trace des versions du dictionnaire avec votre propre convention de nommage si vous en avez besoin.</p></li>
</ul>
