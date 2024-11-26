---
id: mmap.md
summary: MMap permet d'avoir plus de données dans un seul nœud.
title: Stockage de données avec mappage en mémoire
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Stockage de données avec mappage en mémoire<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, les fichiers mappés en mémoire permettent de mapper directement le contenu des fichiers dans la mémoire. Cette fonction améliore l'efficacité de la mémoire, en particulier dans les situations où la mémoire disponible est rare mais où le chargement complet des données est impossible. Ce mécanisme d'optimisation peut augmenter la capacité des données tout en garantissant les performances jusqu'à une certaine limite ; toutefois, lorsque la quantité de données dépasse trop la mémoire, les performances de recherche et d'interrogation risquent de se dégrader sérieusement.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Configurer le mappage de la mémoire<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>A partir de Milvus 2.4, vous avez la possibilité d'ajuster le fichier de configuration statique pour configurer les paramètres de mappage de la mémoire par défaut pour l'ensemble du cluster avant le déploiement. En outre, vous avez la possibilité de modifier dynamiquement les paramètres afin d'affiner les paramètres de mappage de la mémoire au niveau du cluster et de l'index. Les prochaines mises à jour étendront les capacités de mappage de la mémoire aux configurations au niveau des champs.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Avant le déploiement d'un cluster : configuration globale</h3><p>Avant de déployer un cluster, les paramètres <strong>au niveau du cluster</strong> appliquent le mappage de la mémoire à l'ensemble du cluster. Cela permet de s'assurer que tous les nouveaux objets respecteront automatiquement ces configurations. Il est important de noter que la modification de ces paramètres nécessite un redémarrage de la grappe pour être effective.</p>
<p>Pour ajuster les paramètres de mappage de la mémoire de votre cluster, modifiez le fichier <code translate="no">configs/milvus.yaml</code>. Dans ce fichier, vous pouvez indiquer si le mappage de la mémoire doit être activé par défaut et déterminer le chemin d'accès au répertoire de stockage des fichiers mappés en mémoire. Si le chemin d'accès (<code translate="no">mmapDirPath</code>) n'est pas spécifié, le système stocke par défaut les fichiers mappés en mémoire dans <code translate="no">{localStorage.path}/mmap</code>. Pour plus d'informations, reportez-vous à la section <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Configurations liées au stockage local</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Après <code translate="no">2.4.10</code>, la configuration <code translate="no">queryNode.mmap.mmapEnabled</code> se divise en quatre champs distincts, et toutes les valeurs par défaut sont <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, contrôle si les données vectorielles sont mmap ;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>contrôle si l'index du vecteur est mmap ; , contrôle si les données scalaires sont mmap ; , contrôle si les données scalaires sont mmap ;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, contrôle si les données scalaires sont mmap ;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, contrôle si l'index scalaire est mmap ;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>En outre, seuls l'index vectoriel et les données vectorielles peuvent être activés ou désactivés pour une collection donnée, mais pas pour les autres.</p>
<p>Compatibilité : Si la configuration originale <code translate="no">queryNode.mmap.mmapEnabled</code> est définie sur <code translate="no">true</code>, la configuration nouvellement ajoutée sera définie sur <code translate="no">true</code> à ce moment-là. Si <code translate="no">queryNode.mmap.mmapEnabled</code> est défini sur <code translate="no">false</code>, si la nouvelle configuration est définie sur <code translate="no">true</code>, la valeur finale sera <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Pendant le fonctionnement de la grappe : configuration dynamique</h3><p>Pendant l'exécution du cluster, vous pouvez ajuster dynamiquement les paramètres de mappage de la mémoire au niveau de la collection ou de l'index.</p>
<p>Au niveau de la <strong>collection</strong>, le mappage de la mémoire est appliqué à toutes les données brutes non indexées d'une collection, à l'exclusion des clés primaires, des horodatages et des identifiants de ligne. Cette approche est particulièrement adaptée à la gestion complète de grands ensembles de données.</p>
<p>Pour procéder à des ajustements dynamiques des paramètres de mappage de la mémoire au sein d'une collection, utilisez la méthode <code translate="no">set_properties()</code>. Ici, vous pouvez faire basculer <code translate="no">mmap.enabled</code> entre <code translate="no">True</code> et <code translate="no">False</code> selon vos besoins.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Après <code translate="no">2.4.10</code>, les paramètres de mappage de la mémoire dans une collection, utilisez la méthode <code translate="no">add_field</code>. Ici, vous pouvez faire basculer <code translate="no">mmap_enabled</code> entre <code translate="no">True</code> ou <code translate="no">False</code> selon vos besoins.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour les paramètres <strong>au niveau de l'index</strong>, le mappage de la mémoire peut être appliqué spécifiquement aux index vectoriels sans affecter les autres types de données. Cette fonctionnalité est inestimable pour les collections qui nécessitent des performances optimisées pour les recherches vectorielles.</p>
<p>Pour activer ou désactiver le mappage de la mémoire pour un index au sein d'une collection, appelez la méthode <code translate="no">alter_index()</code>, en spécifiant le nom de l'index cible dans <code translate="no">index_name</code> et en réglant <code translate="no">mmap.enabled</code> sur <code translate="no">True</code> ou <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Personnaliser le chemin de stockage dans différents déploiements<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>Les fichiers mappés en mémoire sont stockés par défaut dans le répertoire <code translate="no">/mmap</code> à l'intérieur de <code translate="no">localStorage.path</code>. Voici comment personnaliser ce paramètre en fonction des différentes méthodes de déploiement :</p>
<ul>
<li>Pour Milvus installé à l'aide de Helm Chart :</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Pour Milvus installé à l'aide de Milvus Operator :</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Pour Milvus installé à l'aide de Docker :</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Le mappage de mémoire ne peut pas être activé pour une collection chargée, assurez-vous que la collection a été libérée avant d'activer le mappage de mémoire.</p></li>
<li><p>Le mappage de mémoire n'est pas pris en charge pour les index DiskANN ou de classe GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Dans quels scénarios est-il recommandé d'activer le mappage de mémoire ? Quels sont les inconvénients liés à l'activation de cette fonctionnalité ?</strong></p>
<p>Le mappage de mémoire est recommandé lorsque la mémoire est limitée ou lorsque les exigences en matière de performances sont modérées. L'activation de cette fonctionnalité augmente la capacité de chargement des données. Par exemple, avec une configuration de 2 CPU et 8 Go de mémoire, l'activation du mappage de la mémoire peut permettre de charger jusqu'à 4 fois plus de données que si elle n'est pas activée. L'impact sur les performances varie :</p>
<ul>
<li><p>Si la mémoire est suffisante, les performances attendues sont similaires à celles de l'utilisation de la mémoire seule.</p></li>
<li><p>Si la mémoire est insuffisante, les performances attendues peuvent se dégrader.</p></li>
</ul></li>
<li><p><strong>Quelle est la relation entre les configurations au niveau de la collection et au niveau de l'index ?</strong></p>
<p>Le niveau de la collection et le niveau de l'index ne sont pas des relations inclusives, le niveau de la collection contrôle si les données d'origine sont compatibles avec le mode mmap ou non, tandis que le niveau de l'index concerne uniquement les index vectoriels.</p></li>
<li><p><strong>Existe-t-il un type d'index recommandé pour le mappage de la mémoire ?</strong></p>
<p>Oui, HNSW est recommandé pour activer mmap. Nous avons déjà testé les index des séries HNSW, IVF_FLAT, IVF_PQ/SQ. Les performances des index de la série IVF ont sérieusement chuté, alors que la baisse de performance due à l'activation de mmap pour les index HNSW reste dans les limites des attentes.</p></li>
<li><p><strong>Quel type de stockage local est nécessaire pour le mappage de la mémoire ?</strong></p>
<p>Un disque de haute qualité améliore les performances, les disques NVMe étant l'option préférée.</p></li>
<li><p><strong>Les données scalaires peuvent-elles être mappées en mémoire ?</strong></p>
<p>Le mappage de mémoire peut être appliqué aux données scalaires, mais il n'est pas applicable aux index construits sur des champs scalaires.</p></li>
<li><p><strong>Comment la priorité est-elle déterminée pour les configurations de mappage de mémoire à différents niveaux ?</strong></p>
<p>Dans Milvus, lorsque des configurations de mappage de mémoire sont explicitement définies sur plusieurs niveaux, les configurations au niveau de l'index et de la collection ont la priorité la plus élevée, suivie des configurations au niveau du cluster.</p></li>
<li><p><strong>Si je mets à niveau Milvus 2.3 et que j'ai configuré le chemin du répertoire de mappage de mémoire, que se passera-t-il ?</strong></p>
<p>Si vous mettez à niveau Milvus 2.3 et que vous avez configuré le chemin du répertoire de mappage de la mémoire (<code translate="no">mmapDirPath</code>), votre configuration sera conservée et le paramètre par défaut pour le mappage de la mémoire activé (<code translate="no">mmapEnabled</code>) sera <code translate="no">true</code>. Il est important de migrer les métadonnées pour synchroniser la configuration de vos fichiers mappés en mémoire existants. Pour plus de détails, voir <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrer les métadonnées</a>.</p></li>
</ul>
