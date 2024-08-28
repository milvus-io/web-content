---
id: troubleshooting.md
summary: >-
  Découvrez les problèmes courants que vous pouvez rencontrer avec Milvus et
  comment les résoudre.
title: Dépannage
---
<h1 id="Troubleshooting" class="common-anchor-header">Dépannage<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette page énumère les problèmes courants qui peuvent survenir lors de l'exécution de Milvus, ainsi que des conseils de dépannage possibles. Les problèmes présentés sur cette page sont classés dans les catégories suivantes :</p>
<ul>
<li><a href="#boot_issues">Problèmes d'amorçage</a></li>
<li><a href="#runtime_issues">Problèmes d'exécution</a></li>
<li><a href="#api_issues">Problèmes liés à l'API</a></li>
<li><a href="#etcd_crash_issues">Problèmes de crash d'etcd</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">Problèmes d'amorçage<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Les erreurs de démarrage sont généralement fatales. Exécutez la commande suivante pour afficher les détails de l'erreur :</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">Problèmes d'exécution<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Les erreurs qui se produisent au cours de l'exécution peuvent entraîner une interruption du service. Pour résoudre ce problème, vérifiez la compatibilité entre le serveur et votre client avant de continuer.</p>
<h2 id="API-issues" class="common-anchor-header">Problèmes liés à l'API<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Ces problèmes surviennent pendant les appels de méthode API entre le serveur Milvus et votre client. Ils seront renvoyés au client de manière synchrone ou asynchrone.</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">Problèmes de crash etcd<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. Pod etcd en attente</h3><p>Le cluster etcd utilise pvc par défaut. StorageClass doit être préconfiguré pour le cluster Kubernetes.</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcd pod crash</h3><p>Lorsqu'un pod etcd se plante avec <code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code>, vous pouvez vous connecter à ce pod et supprimer le fichier <code translate="no">/bitnami/etcd/data/member_id</code>.</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3. Plusieurs pods continuent à se planter alors que <code translate="no">etcd-0</code> est toujours en cours d'exécution</h3><p>Vous pouvez exécuter le code suivant si plusieurs pods continuent à se planter alors que <code translate="no">etcd-0</code> est toujours en cours d'exécution.</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4. Tous les pods se bloquent</h3><p>Lorsque tous les modules se bloquent, essayez de copier le fichier <code translate="no">/bitnami/etcd/data/member/snap/db</code>. Utilisez <code translate="no">https://github.com/etcd-io/bbolt</code> pour modifier les données de la base de données.</p>
<p>Toutes les métadonnées Milvus sont conservées dans le seau <code translate="no">key</code>. Sauvegardez les données dans ce bac et exécutez les commandes suivantes. Notez que les données du préfixe dans le fichier <code translate="no">by-dev/meta/session</code> ne nécessitent pas de sauvegarde.</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>Si vous avez besoin d'aide pour résoudre un problème, n'hésitez pas :</p>
<ul>
<li>Rejoindre notre <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">canal Slack</a> et demander l'aide de l'équipe Milvus.</li>
<li><a href="https://github.com/milvus-io/milvus/issues/new/choose">Déposer un dossier</a> sur GitHub en précisant les détails de votre problème.</li>
</ul>
