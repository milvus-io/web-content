---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: >-
  Apprenez les préparations nécessaires avant d'installer Milvus avec Docker
  Compose.
title: Conditions requises pour l'installation de Milvus avec Docker Compose
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Conditions requises pour l'installation de Milvus avec Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Avant d'installer une instance Milvus, vérifiez votre matériel et vos logiciels pour voir s'ils répondent aux exigences.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Exigences matérielles<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Composant</th><th>Exigences</th><th>Recommandation</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>UNITÉ CENTRALE</td><td><ul><li>Intel 2nd Gen Core CPU ou supérieur</li><li>Silicium Apple</li></ul></td><td><ul><li>Autonome : 4 cœurs ou plus</li><li>Cluster : 8 cœurs ou plus</li></ul></td><td></td></tr>
<tr><td>Jeu d'instructions du CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La recherche de similarités vectorielles et la construction d'index dans Milvus nécessitent la prise en charge par l'unité centrale d'ensembles d'extensions SIMD (instructions uniques, données multiples). Assurez-vous que l'unité centrale prend en charge au moins l'une des extensions SIMD répertoriées. Voir <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU avec AVX</a> pour plus d'informations.</td></tr>
<tr><td>RAM</td><td><ul><li>Autonome : 8G</li><li>Cluster : 32G</li></ul></td><td><ul><li>Autonome : 16G</li><li>Groupe de travail : 128G</li></ul></td><td>La taille de la RAM dépend du volume de données.</td></tr>
<tr><td>Disque dur</td><td>SATA 3.0 SSD ou supérieur</td><td>NVMe SSD ou supérieur</td><td>La taille du disque dur dépend du volume de données.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Exigences logicielles<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>Système d'exploitation</th><th>Logiciel</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 ou version ultérieure</td><td>Bureau Docker</td><td>Configurez la machine virtuelle (VM) Docker pour qu'elle utilise au moins 2 CPU virtuels (vCPU) et 8 Go de mémoire initiale. Dans le cas contraire, l'installation risque d'échouer. <br/>Voir <a href="https://docs.docker.com/desktop/mac/install/">Installer Docker Desktop sur Mac</a> pour plus d'informations.</td></tr>
<tr><td>Plateformes Linux</td><td><ul><li>Docker 19.03 ou version ultérieure</li><li>Docker Compose 1.25.1 ou version ultérieure</li></ul></td><td>Voir <a href="https://docs.docker.com/engine/install/">Installer Docker Engine</a> et <a href="https://docs.docker.com/compose/install/">Installer Docker Compose</a> pour plus d'informations.</td></tr>
<tr><td>Windows avec WSL 2 activé</td><td>Bureau Docker</td><td>Nous vous recommandons de stocker le code source et les autres données montées dans des conteneurs Linux dans le système de fichiers Linux plutôt que dans le système de fichiers Windows.<br/>Voir <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Installer Docker Desktop sur Windows avec le backend WSL 2</a> pour plus d'informations.</td></tr>
</tbody>
</table>
<p>Les dépendances suivantes seront obtenues et configurées automatiquement lorsque Milvus Standalone est installé à l'aide du script Docker ou de la configuration Docker Compose :</p>
<table>
<thead>
<tr><th>Logiciel</th><th>Version</th><th>Remarque</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Voir les <a href="#Additional-disk-requirements">exigences supplémentaires en matière de disque</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Exigences supplémentaires pour les disques</h3><p>Les performances des disques sont essentielles pour etcd. Il est fortement recommandé d'utiliser des disques SSD NVMe locaux. Une réponse plus lente du disque peut entraîner des élections fréquentes du cluster qui finiront par dégrader le service etcd.</p>
<p>Pour tester si votre disque est qualifié, utilisez <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idéalement, votre disque devrait atteindre plus de 500 IOPS et moins de 10 ms pour la latence fsync du 99e percentile. Lisez la <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentation</a> etcd pour plus de détails.</p>
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
    </button></h2><p>Si votre matériel et votre logiciel répondent aux exigences ci-dessus, vous pouvez</p>
<ul>
<li><a href="/docs/fr/v2.4.x/install_standalone-docker.md">Exécuter Milvus dans Docker</a></li>
<li><a href="/docs/fr/v2.4.x/install_standalone-docker-compose.md">Exécuter Milvus avec Docker Compose</a></li>
</ul>
