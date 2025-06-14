---
id: configure_etcd.md
related_key: configure
group: system_configuration.md
summary: Apprenez à configurer etcd pour Milvus.
---
<h1 id="etcd-related-Configurations" class="common-anchor-header">Configurations liées à etcd<button data-href="#etcd-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Configurations liées à etcd, utilisé pour stocker les métadonnées Milvus et la découverte de services.</p>
<h2 id="etcdendpoints" class="common-anchor-header"><code translate="no">etcd.endpoints</code><button data-href="#etcdendpoints" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.endpoints">
  <thead>
    <tr>
      <th class="width80">Description de la configuration</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Points d'extrémité utilisés pour accéder au service etcd. Vous pouvez modifier ce paramètre en fonction des points d'extrémité de votre propre cluster etcd.</li>      
        <li>Variable d'environnement : ETCD_ENDPOINTS</li>      
        <li>etcd acquiert de préférence les adresses valides de la variable d'environnement ETCD_ENDPOINTS au démarrage de Milvus.</li>      </td>
      <td>localhost:2379</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdrootPath" class="common-anchor-header"><code translate="no">etcd.rootPath</code><button data-href="#etcdrootPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.rootPath">
  <thead>
    <tr>
      <th class="width80">Description de l'adresse</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Préfixe racine de la clé dans laquelle Milvus stocke les données dans etcd.</li>      
        <li>Il est recommandé de modifier ce paramètre avant de démarrer Milvus pour la première fois.</li>      
        <li>Pour partager une instance etcd entre plusieurs instances Milvus, envisagez de modifier ce paramètre à une valeur différente pour chaque instance Milvus avant de les démarrer.</li>      
        <li>Définir un chemin racine facile à identifier pour Milvus si le service etcd existe déjà.</li>      
        <li>La modification de cette valeur pour une instance Milvus déjà en cours d'exécution peut entraîner des échecs de lecture des données héritées.</li>      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdmetaSubPath" class="common-anchor-header"><code translate="no">etcd.metaSubPath</code><button data-href="#etcdmetaSubPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.metaSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sous-préfixe de la clé où Milvus stocke les informations relatives aux métadonnées dans etcd.</li>      
        <li>Attention : La modification de ce paramètre après un certain temps d'utilisation de Milvus affectera l'accès aux anciennes données.</li>      
        <li>Il est recommandé de modifier ce paramètre avant de démarrer Milvus pour la première fois.</li>      </td>
      <td>méta</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdkvSubPath" class="common-anchor-header"><code translate="no">etcd.kvSubPath</code><button data-href="#etcdkvSubPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.kvSubPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sous-préfixe de la clé où Milvus stocke les horodatages dans etcd.</li>      
        <li>Attention : Modifier ce paramètre après avoir utilisé Milvus pendant un certain temps affectera l'accès aux anciennes données.</li>      
        <li>Il est recommandé de ne pas modifier ce paramètre sans raison particulière.</li>      </td>
      <td>kv</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdloglevel" class="common-anchor-header"><code translate="no">etcd.log.level</code><button data-href="#etcdloglevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.log.level">
  <thead>
    <tr>
      <th class="width80">Description du paramètre</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Prend uniquement en charge debug, info, warn, error, panic ou fatal. Valeur par défaut : "info".      </td>
      <td>info</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdlogpath" class="common-anchor-header"><code translate="no">etcd.log.path</code><button data-href="#etcdlogpath" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.log.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Le chemin d'accès est l'un des suivants :</li>      
        <li> - "default" comme os.Stderr,</li>      
        <li> - "stderr" comme os.Stderr,</li>      
        <li> - "stdout" comme os.Stdout,</li>      
        <li> - chemin d'accès au fichier dans lequel les journaux du serveur doivent être ajoutés.</li>      
        <li>veuillez ajuster dans Milvus intégré : /tmp/milvus/logs/etcd.log</li>      </td>
      <td>stdout</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdsslenabled" class="common-anchor-header"><code translate="no">etcd.ssl.enabled</code><button data-href="#etcdsslenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.enabled">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Prise en charge ou non du mode de connexion sécurisé ETCD    </td>
      <td>false (faux)</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsCert" class="common-anchor-header"><code translate="no">etcd.ssl.tlsCert</code><button data-href="#etcdssltlsCert" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsCert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Chemin d'accès à votre fichier cert    </td>
      <td>/chemin/vers/etcd-client.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsKey" class="common-anchor-header"><code translate="no">etcd.ssl.tlsKey</code><button data-href="#etcdssltlsKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsKey">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        chemin d'accès à votre fichier de clé    </td>
      <td>/chemin/vers/etcd-client-key.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsCACert" class="common-anchor-header"><code translate="no">etcd.ssl.tlsCACert</code><button data-href="#etcdssltlsCACert" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        chemin d'accès au fichier CACert      </td>
      <td>/chemin/vers/ca.pem</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdssltlsMinVersion" class="common-anchor-header"><code translate="no">etcd.ssl.tlsMinVersion</code><button data-href="#etcdssltlsMinVersion" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.ssl.tlsMinVersion">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Version TLS min</li>      
        <li>Valeurs optionnelles : 1.0, 1.1, 1.2, 1.3。</li>      
        <li>Nous recommandons d'utiliser la version 1.2 et plus.</li>      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdrequestTimeout" class="common-anchor-header"><code translate="no">etcd.requestTimeout</code><button data-href="#etcdrequestTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.requestTimeout">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Délai d'attente de l'opération Etcd en millisecondes      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="etcduseembed" class="common-anchor-header"><code translate="no">etcd.use.embed</code><button data-href="#etcduseembed" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.use.embed">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Permet d'activer l'Etcd intégré (un serveur EtcdServer en cours de traitement).      </td>
      <td>faux</td>
    </tr>
  </tbody>
</table>
<h2 id="etcddatadir" class="common-anchor-header"><code translate="no">etcd.data.dir</code><button data-href="#etcddatadir" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.data.dir">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Etcd intégré uniquement. Veuillez ajuster dans Milvus intégré : /tmp/milvus/etcdData/      </td>
      <td>default.etcd</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthenabled" class="common-anchor-header"><code translate="no">etcd.auth.enabled</code><button data-href="#etcdauthenabled" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.enabled">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Activer ou non l'authentification      </td>
      <td>faux</td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthuserName" class="common-anchor-header"><code translate="no">etcd.auth.userName</code><button data-href="#etcdauthuserName" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.userName">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Nom d'utilisateur pour l'authentification etcd    </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="etcdauthpassword" class="common-anchor-header"><code translate="no">etcd.auth.password</code><button data-href="#etcdauthpassword" class="anchor-icon" translate="no">
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
    </button></h2><table id="etcd.auth.password">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        mot de passe pour l'authentification etcd    </td>
      <td></td>
    </tr>
  </tbody>
</table>
