---
id: chunk_cache.md
title: Configurer le cache Chunk
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Configuration du cache de morceaux<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>Le mécanisme de cache de morceaux permet à Milvus de précharger les données en cache sur le disque dur local des nœuds d'interrogation avant qu'elles ne soient nécessaires. Ce mécanisme améliore considérablement les performances de recherche vectorielle en réduisant le temps nécessaire au chargement des données du disque vers la mémoire.</p>
<h2 id="Background" class="common-anchor-header">Contexte<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'effectuer des requêtes pour récupérer des vecteurs, Milvus doit charger les données du stockage d'objets dans le cache de la mémoire sur le disque dur local des nœuds d'interrogation. Ce processus prend beaucoup de temps. Avant que toutes les données ne soient chargées, Milvus peut répondre à certaines demandes d'extraction de vecteurs avec un certain retard.</p>
<p>Pour améliorer les performances des requêtes, Milvus fournit un mécanisme de cache de morceaux pour précharger les données du stockage d'objets dans le cache sur le disque dur local avant qu'elles ne soient nécessaires. Lorsqu'une requête est reçue, le Segcore vérifie d'abord si les données se trouvent dans le cache, au lieu du stockage d'objets. Si les données sont dans le cache, le Segcore peut rapidement les extraire du cache et renvoyer le résultat au client.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Configurer le Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide fournit des instructions sur la manière de configurer le mécanisme de cache de morceaux pour une instance Milvus. La configuration varie en fonction du mode d'installation de l'instance Milvus.</p>
<ul>
<li><p>Pour les instances Milvus installées à l'aide de Helm Charts</p>
<p>Ajouter la configuration au fichier <code translate="no">values.yaml</code> dans la section <code translate="no">config</code>. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure-helm.md">Configurer Milvus avec Helm Charts</a>.</p></li>
<li><p>Pour les instances Milvus installées à l'aide de Docker Compose</p>
<p>Ajouter la configuration au fichier <code translate="no">milvus.yaml</code> que vous avez utilisé pour démarrer l'instance Milvus. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure-docker.md">Configurer Milvus avec Docker Compose</a>.</p></li>
<li><p>Pour les instances Milvus installées à l'aide de Operator</p>
<p>Ajouter la configuration à la section <code translate="no">spec.components</code> de la ressource personnalisée <code translate="no">Milvus</code>. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/configure_operator.md">Configurer Milvus avec Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Options de configuration</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le paramètre <code translate="no">warmup</code> détermine si Milvus précharge les données du stockage d'objets dans le cache du disque dur local des nœuds de requête avant qu'elles ne soient nécessaires. La valeur par défaut de ce paramètre est <code translate="no">disable</code>. Les options possibles sont les suivantes :</p>
<ul>
<li><code translate="no">async</code>: Milvus précharge les données de manière asynchrone en arrière-plan, ce qui n'affecte pas le temps de chargement d'une collection. Toutefois, les utilisateurs peuvent subir un retard lors de la récupération des vecteurs pendant une courte période après la fin du processus de chargement.  Il s'agit de l'option par défaut.</li>
<li><code translate="no">sync</code>: Milvus précharge les données de manière synchrone, ce qui peut affecter le temps de chargement d'une collection. Toutefois, les utilisateurs peuvent effectuer des requêtes immédiatement après la fin du processus de chargement, sans délai.</li>
<li><code translate="no">disable</code>: Milvus ne précharge pas les données dans le cache mémoire.</li>
</ul>
<p>Notez que les paramètres du cache de morceaux s'appliquent également lorsque de nouvelles données sont insérées dans les collections ou que les index des collections sont reconstruits.</p>
<h3 id="FAQ" class="common-anchor-header">FAQ</h3><ul>
<li><p><strong>Comment puis-je déterminer si le mécanisme de cache de morceaux fonctionne correctement ?</strong></p>
<p>Il est conseillé de vérifier la latence d'une recherche ou d'une requête après le chargement d'une collection. Si le temps de latence est beaucoup plus long que prévu (par exemple, plusieurs secondes), cela peut indiquer que le mécanisme de cache par morceaux fonctionne encore.</p>
<p>Si la latence de la requête reste élevée pendant une longue période. Vous pouvez vérifier le débit du stockage d'objets pour vous assurer que le cache de morceaux fonctionne toujours. Dans des cas normaux, le cache de morceaux qui fonctionne génère un débit élevé sur le stockage d'objets. Vous pouvez également essayer le cache de morceaux en mode <code translate="no">sync</code>.</p></li>
</ul>
