---
id: coordinator_ha.md
summary: >-
  Découvrez la motivation et la procédure des coordinateurs Milvus pour
  travailler en veille active.
title: Coordinateur HA
---
<h1 id="Coordinator-HA" class="common-anchor-header">Coordinateur HA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p>Comme le montre l'<a href="/docs/fr/architecture_overview.md">architecture</a> Milvus, Milvus est constitué de nombreux composants qui fonctionnent de manière distribuée. Parmi tous les composants, Milvus assure la haute disponibilité des travailleurs grâce à la <a href="/docs/fr/scaleout.md">mise à l'échelle des</a> nœuds, ce qui fait des coordinateurs le seul maillon faible de la chaîne.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans la version 2.2.3, Milvus met en œuvre la haute disponibilité pour les coordinateurs afin qu'ils fonctionnent en mode actif-standby, en atténuant les éventuels points de défaillance uniques (SPoF) qui peuvent entraîner l'indisponibilité du service.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>Coordinateur HA</span> </span></p>
<p>La figure ci-dessus illustre le fonctionnement des coordinateurs en mode actif-veille. Lorsqu'une paire de coordinateurs démarre, ils s'enregistrent auprès d'etcd en utilisant leur ID de serveur et sont en compétition pour le rôle actif. Le coordinateur qui réussit à louer le rôle actif auprès de l'etcd commencera à servir, et l'autre coordinateur de la paire restera en veille, surveillant le rôle actif et prêt à servir si le coordinateur actif meurt.</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">Activer le coordinateur HA<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">Avec Helm</h3><p>Pour démarrer plusieurs coordinateurs et les faire travailler en mode actif-standby, vous devez apporter les modifications suivantes à votre fichier <code translate="no">values.yaml</code>.</p>
<ul>
<li>Remplacez <code translate="no">xxxCoordinator.replicas</code> par <code translate="no">2</code>.</li>
<li>Remplacez <code translate="no">xxxCoordinator.activeStandby.enabled</code> par <code translate="no">true</code>.</li>
</ul>
<p>L'extrait de code suivant utilise RootCoord comme exemple. Vous pouvez faire de même pour les coordinateurs d'autres types.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoordinator:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  <span class="hljs-attr">resources:</span> {}
  <span class="hljs-attr">nodeSelector:</span> {}
  <span class="hljs-attr">affinity:</span> {}
  <span class="hljs-attr">tolerations:</span> []
  <span class="hljs-attr">extraEnv:</span> []
  <span class="hljs-attr">heaptrack:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">profiling:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>  <span class="hljs-comment"># Enable live profiling</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">Avec Docker</h3><p>Pour démarrer plusieurs coordinateurs et les faire travailler en mode actif-standby, vous pouvez ajouter quelques définitions au fichier <code translate="no">docker-compose</code> que vous utilisez pour démarrer votre cluster Milvus.</p>
<p>L'extrait de code suivant utilise RootCoord comme exemple. Vous pouvez faire de même pour les coordinateurs d'autres types.</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">rootcoord:</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-rootcoord</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.2.3</span>
    <span class="hljs-attr">command:</span> [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    <span class="hljs-attr">environment:</span>
      <span class="hljs-attr">ETCD_ENDPOINTS:</span> <span class="hljs-string">etcd:2379</span>
      <span class="hljs-attr">MINIO_ADDRESS:</span> <span class="hljs-string">minio:9000</span>
      <span class="hljs-attr">PULSAR_ADDRESS:</span> <span class="hljs-string">pulsar://pulsar:6650</span>
      <span class="hljs-attr">ROOT_COORD_ADDRESS:</span> <span class="hljs-string">rootcoord:53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      <span class="hljs-attr">ROOT_COORD_ENABLE_ACTIVE_STANDBY:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;etcd&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;pulsar&quot;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment">#   add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment">#   rootcoord-1:</span>
<span class="hljs-comment">#    container_name: milvus-rootcoord-1</span>
<span class="hljs-comment">#    image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment">#    command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment">#    environment:</span>
<span class="hljs-comment">#      ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment">#      MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment">#      PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment">#      ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment">#      # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment">#      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment">#    depends_on:</span>
<span class="hljs-comment">#      - &quot;etcd&quot;</span>
<span class="hljs-comment">#      - &quot;pulsar&quot;</span>
<span class="hljs-comment">#      - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-MacLinux-shell" class="common-anchor-header">Avec le shell Mac/Linux</h3><p>Pour démarrer plusieurs coordinateurs et les faire fonctionner en mode actif-veille, vous pouvez</p>
<ol>
<li><p>Télécharger le code source de Milvus sur votre disque local et <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">démarrer un cluster Milvus à partir du code source</a> comme suit :</p>
<pre><code translate="no" class="language-shell">sudo ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>Milvus fonctionne avec un seul coordinateur de chaque type à la fin de cette étape.</p></li>
<li><p>Mettez à jour <code translate="no">milvus.yaml</code> pour modifier le numéro de port du coordinateur de chaque type. Ce qui suit utilise <strong>rootCoord</strong> comme exemple.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Démarrez le coordinateur de secours.</p>
<pre><code translate="no" class="language-shell">sudo nohup ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.log 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>À la fin de cette étape, exécutez la commande suivante pour vérifier que deux processus de coordinateur existent.</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>La sortie doit être similaire à</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">&gt; </span><span class="language-bash">ps aux|grep milvus</span>
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>Et le coordinateur en attente produit une entrée de journal toutes les dix secondes, comme suit :</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [&quot;serverName: rootcoord is in STANDBY ...&quot;]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tuez le coordinateur actif d'une paire et observez le comportement du coordinateur en attente.</p>
<p>Vous pouvez constater qu'il faut 60 secondes au coordinateur en attente pour reprendre le rôle actif.</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [&quot;watch the ACTIVE key&quot;] [DELETE=&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [&quot;watch the ACTIVE key&quot;] [DELETE=&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [&quot;stop watching ACTIVE key&quot;]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [&quot;start retrying to register as ACTIVE service...&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [&quot;register ACTIVE service successfully&quot;] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [&quot;quit STANDBY mode, this node will become ACTIVE&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [&quot;rootcoord switch from standby to active, activating&quot;]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [&quot;RootCoord Register Finished&quot;]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [&quot;RootCoord start done ...&quot;]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [&quot;RootCoord successfully started&quot;]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">Éléments de configuration connexes<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>Coordinator HA est désactivé par défaut. Vous pouvez activer cette fonction manuellement en modifiant les éléments suivants dans votre fichier de configuration Milvus.</p>
<ul>
<li><a href="/docs/fr/configure_rootcoord.md#rootCoordactiveStandbyenabled">rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/fr/configure_querycoord.md#queryCoordactiveStandbyenabled">queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/fr/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
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
    </button></h2><p>Actuellement, il n'y a pas de garantie de cohérence forte entre le service actif et le service en attente. Par conséquent, le coordinateur en attente doit recharger les métadonnées lorsqu'il reprend le rôle actif.</p>
<p>Etcd ne libère un bail que lorsque la session en cours a expiré. Le délai d'expiration de la session est fixé par défaut à 60 secondes. Il s'écoule donc 60 secondes entre le moment où le coordinateur actif meurt et celui où le coordinateur en attente reprend le rôle actif.</p>
