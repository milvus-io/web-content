---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Découvrez les préparatifs nécessaires avant d'installer Milvus Standalone.
title: Configuration requise pour l'installation de Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Configuration requise pour l'installation de Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Avant d'installer une instance de Milvus Standalone, vérifiez que votre matériel et vos logiciels répondent aux exigences requises.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Configuration matérielle requise<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Composant</th><th>Configuration requise</th><th>Recommandation</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>Processeur</td><td><ul><li>Processeur Intel Core de 2e génération ou supérieur</li><li>Apple Silicon</li></ul></td><td><ul><li>Autonome : 4 cœurs ou plus</li><li>Cluster : 8 cœurs ou plus</li></ul></td><td></td></tr>
<tr><td>Jeu d'instructions du processeur</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La recherche de similarité vectorielle et la création d’index dans Milvus nécessitent que le processeur prenne en charge les jeux d’extensions SIMD (Single Instruction, Multiple Data). Assurez-vous que le processeur prend en charge au moins l’une des extensions SIMD répertoriées. Consultez la section « <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">Processeurs compatibles AVX</a> » pour plus d’informations.</td></tr>
<tr><td>Mémoire vive</td><td><ul><li>Configuration autonome : 8 Go</li><li>Cluster : 32 Go</li></ul></td><td><ul><li>Configuration autonome : 16 Go</li><li>Cluster : 128 Go</li></ul></td><td>La taille de la mémoire vive dépend du volume de données.</td></tr>
<tr><td>Disque dur</td><td>SSD SATA 3.0 ou supérieur</td><td>SSD NVMe ou supérieur</td><td>La capacité du disque dur dépend du volume de données.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Configuration logicielle requise<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Système d'exploitation</th><th>Logiciels</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>macOS pris en charge par Docker Desktop</td><td>Docker Desktop</td><td>Allouez au moins 8 Go de mémoire à la machine virtuelle (VM) Docker et dimensionnez ses cœurs de processeur conformément aux recommandations matérielles ci-dessus. <br/>Pour plus d’informations, consultez la section <a href="https://docs.docker.com/desktop/setup/install/mac-install/">Installer Docker Desktop sur Mac</a>.</td></tr>
<tr><td>Plateformes Linux</td><td><ul><li>Docker 19.03 ou version ultérieure</li><li>Plugin Docker Compose V2 ou version ultérieure (pour les déploiements Compose)</li></ul></td><td>Consultez les articles <a href="https://docs.docker.com/engine/install/">Installer Docker Engine</a> et <a href="https://docs.docker.com/compose/install/">Installer Docker Compose</a> pour plus d’informations.</td></tr>
<tr><td>Windows avec WSL 2 activé</td><td>Docker Desktop</td><td>Nous vous recommandons de stocker le code source et les autres données montées en bind dans les conteneurs Linux au sein du système de fichiers Linux plutôt que dans celui de Windows.<br/>Consultez les guides « <a href="https://docs.docker.com/desktop/features/wsl/">Installer Docker Desktop sur Windows avec WSL 2 en arrière-plan</a> » pour plus d’informations.</td></tr>
</tbody>
</table>
<p>Les guides Compose utilisent la commande « <code translate="no">docker compose</code> », et non l’ancienne commande « <code translate="no">docker-compose</code> V1 ». Vérifiez le plugin avant de suivre ces instructions :</p>
<pre><code translate="no" class="language-bash">docker compose version
<button class="copy-code-btn"></button></code></pre>
<p>La méthode d’installation détermine la manière dont les dépendances sont fournies. Utilisez les versions d’images spécifiées dans le script ou le fichier Compose téléchargé :</p>
<table>
<thead>
<tr><th>Composant</th><th>Script Docker</th><th>Docker Compose</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>Intégré au conteneur Milvus</td><td>Conteneur séparé ; voir <a href="#Additional-disk-requirements">les exigences supplémentaires en matière de disque</a>.</td></tr>
<tr><td>Stockage d'objets</td><td>Système de fichiers local ; pas de conteneur MinIO</td><td>Conteneur MinIO dont l’image est épinglée dans le fichier Compose</td></tr>
<tr><td>Woodpecker</td><td>Fourni avec Milvus ; backend WAL sur système de fichiers local</td><td>Intégré à Milvus ; backend WAL MinIO/stockage objet</td></tr>
<tr><td>Pulsar</td><td>Service externe facultatif ; non installé par défaut</td><td>Service externe facultatif ; non installé par défaut</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Exigences supplémentaires en matière de disque<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Les performances du disque sont essentielles pour etcd. Il est fortement recommandé d’utiliser des SSD NVMe locaux. Une réponse trop lente du disque peut entraîner des élections de cluster fréquentes, ce qui finira par dégrader le service etcd.</p>
<p>Pour vérifier si votre disque est conforme, utilisez <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idéalement, votre disque dédié à etcd devrait atteindre plus de 500 IOPS et afficher une latence fsync inférieure à 10 ms au 99e centile. Consultez la <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentation</a> d’etcd pour connaître les exigences plus détaillées.</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Si votre matériel et vos logiciels répondent aux exigences ci-dessus, vous pouvez</p>
<ul>
<li><a href="/docs/fr/install_standalone-docker.md">exécuter Milvus dans Docker</a></li>
<li><a href="/docs/fr/install_standalone-docker-compose.md">Exécuter Milvus avec Docker Compose</a></li>
</ul>
