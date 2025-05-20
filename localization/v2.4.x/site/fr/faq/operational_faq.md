---
id: operational_faq.md
summary: >-
  Trouvez les réponses aux questions les plus fréquemment posées sur les
  opérations à Milvus.
title: FAQ opérationnelle
---
<h1 id="Operational-FAQ" class="common-anchor-header">FAQ opérationnelle<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Que faire si je ne parviens pas à extraire l'image Docker Milvus de Docker Hub ?</h4><p>Si vous n'avez pas réussi à extraire l'image Docker Milvus de Docker Hub, essayez d'ajouter d'autres miroirs de registre.</p>
<p>Les utilisateurs de Chine continentale peuvent ajouter l'URL "https://registry.docker-cn.com" au tableau registry-mirrors dans <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Docker est-il le seul moyen d'installer et d'exécuter Milvus ?</h4><p>Docker est un moyen efficace de déployer Milvus, mais ce n'est pas le seul. Vous pouvez également déployer Milvus à partir du code source. Cela nécessite Ubuntu (18.04 ou supérieur) ou CentOS (7 ou supérieur). Voir <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Construire Milvus à partir du code source</a> pour plus d'informations.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Quels sont les principaux facteurs affectant le rappel ?</h4><p>Le rappel est principalement affecté par le type d'index et les paramètres de recherche.</p>
<p>Pour les index FLAT, Milvus effectue un balayage exhaustif dans une collection, avec un retour de 100 %.</p>
<p>Pour les index IVF, le paramètre nprobe détermine l'étendue d'une recherche dans la collection. L'augmentation de nprobe accroît la proportion de vecteurs recherchés et le rappel, mais diminue les performances de la requête.</p>
<p>Pour l'index HNSW, le paramètre ef détermine l'étendue de la recherche dans le graphe. L'augmentation de ef augmente le nombre de points recherchés dans le graphe et le rappel, mais diminue les performances de la requête.</p>
<p>Pour plus d'informations, voir <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Indexation vectorielle</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Pourquoi les modifications que j'ai apportées aux fichiers de configuration n'ont-elles pas été prises en compte ?</h4><p>Milvus ne prend pas en charge la modification des fichiers de configuration pendant l'exécution. Vous devez redémarrer Milvus Docker pour que les modifications des fichiers de configuration soient prises en compte.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Comment puis-je savoir si Milvus a démarré avec succès ?</h4><p>Si Milvus est démarré à l'aide de Docker Compose, exécutez <code translate="no">docker ps</code> pour observer le nombre de conteneurs Docker en cours d'exécution et vérifier si les services Milvus ont démarré correctement.</p>
<p>Pour Milvus standalone, vous devez pouvoir observer au moins trois conteneurs Docker en cours d'exécution, l'un étant le service Milvus et les deux autres étant le service de gestion et de stockage etcd. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/install_standalone-docker.md">Installation de Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Pourquoi l'heure dans les fichiers journaux est-elle différente de l'heure du système ?</h4><p>La différence d'heure est généralement due au fait que la machine hôte n'utilise pas le temps universel coordonné (UTC).</p>
<p>Les fichiers journaux contenus dans l'image Docker utilisent l'UTC par défaut. Si votre machine hôte n'utilise pas l'UTC, ce problème peut se produire.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Comment puis-je savoir si mon processeur prend en charge Milvus ?</h4><p>Les opérations de calcul de Milvus dépendent de la prise en charge par l'unité centrale du jeu d'instructions d'extension SIMD (instruction unique, données multiples). La prise en charge par votre unité centrale du jeu d'instructions d'extension SIMD est cruciale pour la construction d'index et la recherche de similarité vectorielle dans Milvus. Assurez-vous que votre unité centrale prend en charge au moins l'un des jeux d'instructions SIMD suivants :</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Exécutez la commande lscpu pour vérifier si votre processeur prend en charge les jeux d'instructions SIMD mentionnés ci-dessus :</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Pourquoi Milvus renvoie-t-il <code translate="no">illegal instruction</code> au démarrage ?</h4><p>Milvus exige que votre CPU prenne en charge un jeu d'instructions SIMD : SSE4.2, AVX, AVX2 ou AVX512. L'unité centrale doit prendre en charge au moins l'une de ces instructions pour que Milvus fonctionne normalement. Une erreur <code translate="no">illegal instruction</code> renvoyée lors du démarrage suggère que votre CPU ne prend pas en charge l'un des quatre jeux d'instructions ci-dessus.</p>
<p>Voir la <a href="/docs/fr/v2.4.x/prerequisite-docker.md">prise en charge du jeu d'instructions SIMD par</a> le <a href="/docs/fr/v2.4.x/prerequisite-docker.md">processeur</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Puis-je installer Milvus sous Windows ?</h4><p>Oui, vous pouvez installer Milvus sur Windows soit en compilant à partir du code source, soit à partir d'un package binaire.</p>
<p>Voir <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Exécuter Milvus sous Windows</a> pour savoir comment installer Milvus sous Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">J'ai obtenu une erreur lors de l'installation de pymilvus sur Windows. Que dois-je faire ?</h4><p>Il n'est pas recommandé d'installer PyMilvus sous Windows. Mais si vous devez installer PyMilvus sur Windows mais que vous avez obtenu une erreur, essayez de l'installer dans un environnement <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>. Voir <a href="/docs/fr/v2.4.x/install-pymilvus.md">Installer Milvus SDK</a> pour plus d'informations sur l'installation de PyMilvus dans l'environnement Conda.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Puis-je déployer Milvus lorsque je suis déconnecté d'Internet ?</h4><p>Oui, vous pouvez installer Milvus dans un environnement hors ligne. Voir <a href="/docs/fr/v2.4.x/install_offline-helm.md">Installer Milvus hors ligne</a> pour plus d'informations.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Où puis-je trouver les journaux générés par Milvus ?</h4><p>Le journal Milvus est imprimé sur stout (sortie standard) et stderr (erreur standard) par défaut, mais nous vous recommandons vivement de rediriger votre journal vers un volume persistant en production. Pour ce faire, mettez à jour <code translate="no">log.file.rootPath</code> dans <strong>milvus.yaml</strong>. Et si vous déployez Milvus avec le diagramme <code translate="no">milvus-helm</code>, vous devez également activer la persistance du journal via <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Si vous n'avez pas modifié la configuration, l'utilisation de kubectl logs &lt;pod-name&gt; ou de docker logs CONTAINER peut également vous aider à trouver le journal.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Puis-je créer un index pour un segment avant d'y insérer des données ?</h4><p>Oui, vous pouvez le faire. Mais nous recommandons d'insérer les données par lots, chacun ne devant pas dépasser 256 Mo, avant d'indexer chaque segment.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Puis-je partager une instance etcd entre plusieurs instances Milvus ?</h4><p>Oui, vous pouvez partager une instance etcd entre plusieurs instances Milvus. Pour ce faire, vous devez modifier <code translate="no">etcd.rootPath</code> en une valeur distincte pour chaque instance Milvus dans les fichiers de configuration de chacune d'entre elles avant de les démarrer.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Puis-je partager une instance Pulsar entre plusieurs instances Milvus ?</h4><p>Oui, vous pouvez partager une instance Pulsar entre plusieurs instances Milvus. Pour ce faire, vous pouvez</p>
<ul>
<li>Si le multi-tenant est activé sur votre instance Pulsar, envisagez d'allouer un locataire ou un espace de noms distinct pour chaque instance Milvus. Pour ce faire, vous devez modifier <code translate="no">pulsar.tenant</code> ou <code translate="no">pulsar.namespace</code> dans les fichiers de configuration de vos instances Milvus en une valeur unique pour chacune d'entre elles avant de les démarrer.</li>
<li>Si vous ne prévoyez pas d'activer le multi-tenant sur votre instance Pulsar, envisagez de modifier <code translate="no">msgChannel.chanNamePrefix.cluster</code> dans les fichiers de configuration de vos instances Milvus en une valeur unique pour chacune d'entre elles avant de les démarrer.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Puis-je partager une instance MinIO entre plusieurs instances Milvus ?</h4><p>Oui, vous pouvez partager une instance MinIO entre plusieurs instances Milvus. Pour ce faire, vous devez changer <code translate="no">minio.rootPath</code> en une valeur unique pour chaque instance Milvus dans les fichiers de configuration de chacune d'entre elles avant de les démarrer.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Comment traiter le message d'erreur <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>Le message d'erreur <code translate="no">Illegal uri [example.db]</code> indique que vous essayez de vous connecter à Milvus Lite à l'aide d'une version antérieure de PyMilvus qui ne prend pas en charge ce type de connexion. Pour résoudre ce problème, mettez à niveau votre installation PyMilvus vers au moins la version 2.4.2, qui inclut la prise en charge de la connexion à Milvus Lite.</p>
<p>Vous pouvez mettre à jour PyMilvus à l'aide de la commande suivante :</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Pourquoi est-ce que j'obtiens moins de résultats que les <code translate="no">limit</code> que j'ai définis dans ma recherche/requête ?</h4><p>Plusieurs raisons peuvent expliquer pourquoi vous obtenez moins de résultats que le site <code translate="no">limit</code> que vous avez spécifié :</p>
<ul>
<li><p><strong>Données limitées</strong>: Il se peut que la collection ne contienne pas suffisamment d'entités pour respecter la limite que vous avez demandée. Si le nombre total d'entités dans la collection est inférieur à la limite, vous obtiendrez naturellement moins de résultats.</p></li>
<li><p><strong>Doubles clés primaires</strong>: Milvus donne la priorité à des entités spécifiques lorsqu'il rencontre des clés primaires en double au cours d'une recherche. Ce comportement varie en fonction du type de recherche :</p></li>
<li><p><strong>Requête (correspondance exacte)</strong>: Milvus sélectionne l'entité la plus récente avec la clé primaire correspondante. Recherche ANN : Milvus sélectionne l'entité ayant le score de similarité le plus élevé, même si les entités partagent le même PK. Cette priorisation peut entraîner moins de résultats uniques que la limite si votre collection comporte de nombreuses clés primaires en double.</p></li>
<li><p><strong>Correspondances insuffisantes</strong>: Les expressions de filtrage de votre recherche peuvent être trop strictes, ce qui réduit le nombre d'entités répondant au seuil de similarité. Si les conditions définies pour la recherche sont trop restrictives, il n'y aura pas assez d'entités correspondantes, ce qui entraînera moins de résultats que prévu.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. Quelle est la cause de cette erreur et comment la résoudre ?</h4><p>Cette erreur se produit lorsque vous essayez d'utiliser Milvus Lite sur une plate-forme Windows. Milvus Lite est principalement conçu pour les environnements Linux et peut ne pas avoir de support natif pour Windows.</p>
<p>La solution consiste à utiliser un environnement Linux :</p>
<ul>
<li>Utilisez un système d'exploitation basé sur Linux ou une machine virtuelle pour exécuter Milvus Lite.</li>
<li>Cette approche garantira la compatibilité avec les dépendances et les fonctionnalités de la bibliothèque.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Quelles sont les erreurs "length exceeds max length" dans Milvus, et comment les comprendre et les traiter ?</h4><p>Les erreurs "Length exceeds max length" dans Milvus se produisent lorsque la taille d'un élément de données dépasse la taille maximale autorisée pour une collection ou un champ. Voici quelques exemples et explications :</p>
<ul>
<li><p>Erreur de champ JSON : <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Erreur de longueur de chaîne : <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Erreur de champ VarChar : <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Pour comprendre et traiter ces erreurs :</p>
<ul>
<li>Comprenez que <code translate="no">len(str)</code> en Python représente le nombre de caractères, et non la taille en octets.</li>
<li>Pour les types de données basés sur des chaînes comme VARCHAR et JSON, utilisez <code translate="no">len(bytes(str, encoding='utf-8'))</code> pour déterminer la taille réelle en octets, ce que Milvus utilise pour &quot;max-length&quot;.</li>
</ul>
<p>Exemple en Python :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Vous avez encore des questions ?</h4><p>Vous pouvez le faire :</p>
<ul>
<li>Consulter <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> sur GitHub. N'hésitez pas à poser des questions, à partager des idées et à aider les autres.</li>
<li>Rejoindre notre <a href="https://discord.com/invite/8uyFbECzPX">serveur Discord</a> pour trouver de l'aide et participer à notre communauté open-source.</li>
</ul>
