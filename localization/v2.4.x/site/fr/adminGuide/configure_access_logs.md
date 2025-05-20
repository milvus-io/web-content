---
id: configure_access_logs.md
title: Configuration des journaux d'accès
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configuration des journaux d'accès<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>La fonction de journal des accès de Milvus permet aux gestionnaires de serveurs d'enregistrer et d'analyser le comportement des utilisateurs en matière d'accès, ce qui permet de comprendre des aspects tels que les taux de réussite des requêtes et les raisons des échecs.</p>
<p>Ce guide fournit des instructions détaillées sur la configuration des journaux d'accès dans Milvus.</p>
<p>La configuration des journaux d'accès dépend de la méthode d'installation de Milvus :</p>
<ul>
<li><strong>Installation de Helm</strong>: Configurer dans <code translate="no">values.yaml</code>. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/configure-helm.md">Configurer Milvus avec Helm Charts</a>.</li>
<li><strong>Installation Docker</strong>: Configurer à l'adresse <code translate="no">milvus.yaml</code>. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/configure-docker.md">Configurer Milvus avec Docker Compose</a>.</li>
<li><strong>Installation de l'opérateur</strong>: Modifier <code translate="no">spec.components</code> dans le fichier de configuration. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/configure_operator.md">Configurer Milvus avec Milvus Operator</a>.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Options de configuration<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez parmi trois options de configuration en fonction de vos besoins :</p>
<ul>
<li><strong>Configuration de base</strong>: Pour les besoins généraux.</li>
<li><strong>Config pour les fichiers journaux d'accès local</strong>: Pour stocker les journaux localement.</li>
<li><strong>Configuration pour le téléchargement des journaux d'accès locaux vers MinIO</strong>: Pour le stockage et la sauvegarde dans le nuage.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuration de base</h3><p>La configuration de base consiste à activer les journaux d'accès et à définir le nom du fichier journal ou à utiliser stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Activation ou non de la fonction de journal d'accès. La valeur par défaut est <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: Le nom du fichier journal d'accès. Si vous laissez ce paramètre vide, les journaux d'accès seront imprimés sur stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuration des fichiers journaux d'accès locaux</h3><p>Configurez le stockage local des fichiers journaux d'accès avec des paramètres tels que le chemin d'accès au fichier local, la taille du fichier et l'intervalle de rotation :</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ces paramètres sont spécifiés lorsque <code translate="no">filename</code> n'est pas vide.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Le chemin d'accès au fichier local où le fichier journal d'accès est stocké.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: La taille maximale en Mo autorisée pour un seul fichier journal d'accès. Si la taille du fichier journal atteint cette limite, un processus de rotation est déclenché. Ce processus scelle le fichier journal d'accès actuel, crée un nouveau fichier journal et efface le contenu du fichier journal d'origine.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Intervalle de temps maximum en secondes autorisé pour la rotation d'un seul fichier journal d'accès. Lorsque l'intervalle de temps spécifié est atteint, un processus de rotation est déclenché, ce qui entraîne la création d'un nouveau fichier journal d'accès et le scellement du précédent.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Nombre maximal de fichiers journaux d'accès scellés pouvant être conservés. Si le nombre de fichiers journaux d'accès scellés dépasse cette limite, le plus ancien sera supprimé.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuration du téléchargement des fichiers journaux d'accès locaux vers MinIO</h3><p>Activez et configurez les paramètres pour télécharger les fichiers journaux d'accès locaux vers MinIO :</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lors de la configuration des paramètres de MinIO, assurez-vous que vous avez défini <code translate="no">maxSize</code> ou <code translate="no">rotatedTime</code>. Si vous ne le faites pas, le téléchargement des fichiers journaux d'accès locaux vers MinIO risque d'échouer.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Indique si les fichiers journaux d'accès locaux doivent être téléchargés vers MinIO. La valeur par défaut est <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Le chemin d'accès au stockage d'objets pour le téléchargement des fichiers journaux d'accès.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: L'intervalle de temps autorisé pour le téléchargement des fichiers journaux d'accès. Si le temps de téléchargement d'un fichier journal dépasse cet intervalle, le fichier sera supprimé. La valeur 0 désactive cette fonctionnalité.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Formatter config<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Le format d'enregistrement par défaut utilisé pour toutes les méthodes est le format <code translate="no">base</code>, qui ne nécessite pas d'associations de méthodes spécifiques. Toutefois, si vous souhaitez personnaliser la sortie du journal pour des méthodes spécifiques, vous pouvez définir un format de journal personnalisé et l'appliquer aux méthodes associées.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Définit le format de journalisation avec des métriques dynamiques. Pour plus d'informations, voir <a href="#reference-supported-metrics">Métriques prises en charge</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Liste les opérations Milvus utilisant ce formateur. Pour obtenir les noms des méthodes, voir <strong>MilvusService</strong> dans <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Méthodes Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Référence : Métriques prises en charge<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Nom de la métrique</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nom de la méthode</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Statut de l'accès : <strong>OK</strong> ou <strong>Échec</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expression utilisée pour les opérations d'interrogation, de recherche ou de suppression</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID associé à l'accès</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Adresse IP de l'utilisateur</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nom de l'utilisateur</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Taille des données de la réponse</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Code d'erreur spécifique à Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Message d'erreur détaillé</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nom de la base de données Milvus cible</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nom de la collection Milvus cible</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nom de la ou des partition(s) Milvus cible(s)</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Temps nécessaire pour terminer l'accès</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Heure d'impression du journal d'accès (généralement équivalent à <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Heure de début de l'accès</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Heure de fin de l'accès</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Version du Milvus SDK utilisée par l'utilisateur</td></tr>
</tbody>
</table>
