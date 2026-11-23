---
id: configure_access_logs.md
title: Configurer les journaux d'accès
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurer les journaux d'accès<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>La fonctionnalité de journaux d'accès de Milvus permet aux administrateurs de serveurs d'enregistrer et d'analyser le comportement des utilisateurs en matière d'accès, ce qui aide à comprendre des aspects tels que les taux de réussite des requêtes et les causes d'échec.</p>
<p>Ce guide fournit des instructions détaillées sur la configuration des journaux d'accès dans Milvus.</p>
<p>La configuration des journaux d'accès dépend de la méthode d'installation de Milvus :</p>
<ul>
<li><strong>Installation via Helm</strong>: configurez-les dans <code translate="no">values.yaml</code>. Pour plus d’informations, consultez la section « <a href="/docs/fr/configure-helm.md">Configurer Milvus avec les Helm Charts</a> ».</li>
<li><strong>Installation via Docker</strong>: effectuez la configuration dans le fichier ` <code translate="no">milvus.yaml</code>`. Pour plus d’informations, consultez la section « <a href="/docs/fr/configure-docker.md">Configurer Milvus avec Docker Compose</a> ».</li>
<li><strong>Installation via l’opérateur</strong>: modifiez le fichier <code translate="no">spec.components</code> dans le fichier de configuration. Pour plus d’informations, consultez la section « <a href="/docs/fr/configure_operator.md">Configurer Milvus avec Milvus Operator</a> ».</li>
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
<li><strong>Configuration de base</strong>: pour une utilisation générale.</li>
<li><strong>Configuration pour les fichiers journaux d'accès locaux</strong>: pour stocker les journaux localement.</li>
<li><strong>Configuration pour le téléchargement des fichiers journaux d'accès locaux vers MinIO</strong>: pour le stockage et la sauvegarde dans le cloud.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuration de base<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>La configuration de base consiste à activer les journaux d'accès et à définir le nom du fichier journal ou à utiliser stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Indique s'il faut activer la fonctionnalité de journal d'accès. La valeur par défaut est « <strong>false</strong> ».</li>
<li><code translate="no">proxy.accessLog.filename</code>: Nom du fichier de journal d’accès. Si vous laissez ce paramètre vide, les journaux d’accès seront affichés sur stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuration des fichiers journaux d'accès locaux<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Configurez le stockage local des fichiers journaux d'accès à l'aide de paramètres tels que le chemin d'accès local, la taille du fichier et l'intervalle de rotation :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ces paramètres sont spécifiés lorsque ` <code translate="no">filename</code> ` n’est pas vide.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: Chemin d’accès local où le fichier de journal d’accès est stocké. La valeur par défaut est « <code translate="no">/tmp/milvus_access</code> ».</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: Taille maximale en Mo autorisée pour un fichier journal d’accès. Si la taille du fichier journal atteint cette limite, un processus de rotation est déclenché. Ce processus verrouille le fichier journal d’accès actuel, crée un nouveau fichier journal et efface le contenu du fichier journal d’origine. La valeur par défaut est <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: Intervalle de temps maximal, en secondes, autorisé pour la rotation d’un fichier journal d’accès. Une fois cet intervalle atteint, un processus de rotation est déclenché, entraînant la création d’un nouveau fichier journal d’accès et le verrouillage du fichier précédent. Valeur par défaut : <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: Nombre maximal de fichiers journaux d’accès scellés pouvant être conservés. Si le nombre de fichiers journaux d’accès scellés dépasse cette limite, le plus ancien sera supprimé. Valeur par défaut : <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuration pour le téléchargement des fichiers journaux d'accès locaux vers MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Activez et configurez les paramètres pour transférer les fichiers journaux d’accès locaux vers MinIO :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lors de la configuration des paramètres MinIO, assurez-vous d’avoir défini soit <code translate="no">maxSize</code>, soit <code translate="no">rotatedTime</code>. Si ce n’est pas le cas, le transfert des fichiers journaux d’accès locaux vers MinIO risque d’échouer.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Indique s’il faut transférer les fichiers journaux d’accès locaux vers MinIO. La valeur par défaut est « <strong>false</strong> ».</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Chemin d’accès au stockage d’objets destiné au transfert des fichiers journaux d’accès. La valeur par défaut est <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Intervalle de temps autorisé pour le transfert des fichiers journaux d’accès. Si la durée de transfert d’un fichier journal dépasse cet intervalle, le fichier sera supprimé. Définir la valeur sur 0 désactive cette fonctionnalité. La valeur par défaut est <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Configuration du formateur<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>Le format de journal par défaut utilisé pour toutes les méthodes est le format <code translate="no">base</code>, qui ne nécessite aucune association spécifique à une méthode. Toutefois, si vous souhaitez personnaliser la sortie du journal pour des méthodes spécifiques, vous pouvez définir un format de journal personnalisé et l’appliquer aux méthodes associées.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Définit le format de journalisation avec des métriques dynamiques. Pour plus d’informations, consultez la section <a href="#reference-supported-metrics">Métriques prises en charge</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Répertorie les opérations Milvus utilisant ce formateur. Pour obtenir les noms des méthodes, consultez la section <strong>MilvusService</strong> dans <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">les méthodes Milvus</a>.</li>
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
<tr><td><code translate="no">$method_status</code></td><td>Statut d'accès : <strong>OK</strong> ou <strong>Échec</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expression utilisée pour les opérations de requête, de recherche ou de suppression</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>ID de trace associé à l'accès</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Adresse IP de l'utilisateur</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nom de l'utilisateur</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Taille des données de réponse</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Code d'erreur spécifique à Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Message d'erreur détaillé</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nom de la base de données Milvus cible</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nom de la collection Milvus cible</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nom(s) de la ou des partitions Milvus cibles</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Temps nécessaire pour effectuer l'accès</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Heure à laquelle le journal d'accès est généré (généralement équivalente à <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Heure à laquelle l'accès commence</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Heure à laquelle l'accès se termine</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Version du SDK Milvus utilisée par l'utilisateur</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Type d'erreur : <strong>system_error</strong> ou <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Champs de sortie de la requête</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Préfixe du cluster défini dans <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Niveau de cohérence de la requête</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Champ vectoriel d’une requête de recherche ou de recherche hybride</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Nombre de vecteurs de requête d’une requête de recherche ou de recherche hybride</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Paramètres de recherche d’une requête de recherche ou de recherche hybride</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Paramètres de requête d’une requête de recherche</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Heure de la requête définie par le client dans les métadonnées gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Longueur de chaque valeur de modèle d’expression</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Indique si une requête « upsert » correspond à une mise à jour partielle</td></tr>
</tbody>
</table>
