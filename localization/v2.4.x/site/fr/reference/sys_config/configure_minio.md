---
id: configure_minio.md
related_key: configure
group: system_configuration.md
summary: Apprenez à configurer minio pour Milvus.
title: ''
---
<h1 id="minio-related-Configurations" class="common-anchor-header">Configurations liées à Minio<button data-href="#minio-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>La configuration liée à MinIO/S3/GCS ou à tout autre service prend en charge l'API S3, qui est responsable de la persistance des données pour Milvus.</p>
<p>Par souci de simplicité, nous appelons le service de stockage MinIO/S3 dans la description suivante.</p>
<h2 id="minioaddress" class="common-anchor-header"><code translate="no">minio.address</code><button data-href="#minioaddress" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.address">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Adresse IP du service MinIO ou S3.</li>      
        <li>Variable d'environnement : MINIO_ADDRESS</li>      
        <li>minio.address et minio.port génèrent ensemble l'accès valide au service MinIO ou S3.</li>      
        <li>MinIO acquiert de préférence l'adresse IP valide à partir de la variable d'environnement MINIO_ADDRESS au démarrage de Milvus.</li>      
        <li>La valeur par défaut s'applique lorsque MinIO ou S3 fonctionne sur le même réseau que Milvus.</li>      </td>
      <td>localhost</td>
    </tr>
  </tbody>
</table>
<h2 id="minioport" class="common-anchor-header"><code translate="no">minio.port</code><button data-href="#minioport" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.port">
  <thead>
    <tr>
      <th class="width80">Description de l'adresse IP</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Port du service MinIO ou S3.      </td>
      <td>9000</td>
    </tr>
  </tbody>
</table>
<h2 id="minioaccessKeyID" class="common-anchor-header"><code translate="no">minio.accessKeyID</code><button data-href="#minioaccessKeyID" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.accessKeyID">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>ID de la clé d'accès que MinIO ou S3 délivre à l'utilisateur pour un accès autorisé.</li>      
        <li>Variable d'environnement : MINIO_ACCESS_KEY_ID ou minio.accessKeyID</li>      
        <li>minio.accessKeyID et minio.secretAccessKey sont utilisés ensemble pour l'authentification de l'identité afin d'accéder au service MinIO ou S3.</li>      
        <li>Cette configuration doit être identique à la variable d'environnement MINIO_ACCESS_KEY_ID, qui est nécessaire pour démarrer MinIO ou S3.</li>      
        <li>La valeur par défaut s'applique au service MinIO ou S3 qui a démarré avec le fichier docker-compose.yml par défaut.</li>      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>
<h2 id="miniosecretAccessKey" class="common-anchor-header"><code translate="no">minio.secretAccessKey</code><button data-href="#miniosecretAccessKey" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.secretAccessKey">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Clé secrète utilisée pour chiffrer la chaîne de signature et vérifier la chaîne de signature sur le serveur. Elle doit rester strictement confidentielle et n'être accessible qu'au serveur MinIO ou S3 et aux utilisateurs.</li>      
        <li>Variable d'environnement : MINIO_SECRET_ACCESS_KEY ou minio.secretAccessKey</li>      
        <li>minio.accessKeyID et minio.secretAccessKey sont utilisés ensemble pour l'authentification de l'identité afin d'accéder au service MinIO ou S3.</li>      
        <li>Cette configuration doit être identique à la variable d'environnement MINIO_SECRET_ACCESS_KEY, qui est nécessaire pour démarrer MinIO ou S3.</li>      
        <li>La valeur par défaut s'applique au service MinIO ou S3 qui a démarré avec le fichier docker-compose.yml par défaut.</li>      </td>
      <td>minioadmin</td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseSSL" class="common-anchor-header"><code translate="no">minio.useSSL</code><button data-href="#miniouseSSL" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useSSL">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valeur du commutateur permettant de contrôler l'accès au service MinIO ou S3 via SSL.      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>
<h2 id="miniossltlsCACert" class="common-anchor-header"><code translate="no">minio.ssl.tlsCACert</code><button data-href="#miniossltlsCACert" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.ssl.tlsCACert">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Chemin d'accès à votre fichier CACert      </td>
      <td>/chemin/vers/public.crt</td>
    </tr>
  </tbody>
</table>
<h2 id="miniobucketName" class="common-anchor-header"><code translate="no">minio.bucketName</code><button data-href="#miniobucketName" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.bucketName">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Nom du bac dans lequel Milvus stocke les données dans MinIO ou S3.</li>      
        <li>Milvus 2.0.0 ne prend pas en charge le stockage des données dans plusieurs buckets.</li>      
        <li>Le seau portant ce nom sera créé s'il n'existe pas. S'il existe déjà et qu'il est accessible, il sera utilisé directement. Dans le cas contraire, une erreur se produira.</li>      
        <li>Pour partager une instance MinIO entre plusieurs instances Milvus, envisagez de modifier cette valeur pour chaque instance Milvus avant de les démarrer. Pour plus de détails, voir la FAQ sur les opérations.</li>      
        <li>Les données seront stockées dans le Docker local si Docker est utilisé pour démarrer le service MinIO localement. Assurez-vous que l'espace de stockage est suffisant.</li>      
        <li>Le nom d'un bucket est globalement unique dans une instance MinIO ou S3.</li>      </td>
      <td>a-bucket</td>
    </tr>
  </tbody>
</table>
<h2 id="miniorootPath" class="common-anchor-header"><code translate="no">minio.rootPath</code><button data-href="#miniorootPath" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.rootPath">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Préfixe racine de la clé dans laquelle Milvus stocke les données dans MinIO ou S3.</li>      
        <li>Il est recommandé de modifier ce paramètre avant de démarrer Milvus pour la première fois.</li>      
        <li>Pour partager une instance MinIO entre plusieurs instances Milvus, envisagez de modifier ce paramètre à une valeur différente pour chaque instance Milvus avant de les démarrer. Pour plus de détails, voir la FAQ sur les opérations.</li>      
        <li>Définir un préfixe de clé racine facile à identifier pour Milvus si le service etcd existe déjà.</li>      
        <li>La modification de cette valeur pour une instance Milvus déjà en cours d'exécution peut entraîner des échecs de lecture des données héritées.</li>      </td>
      <td>fichiers</td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseIAM" class="common-anchor-header"><code translate="no">minio.useIAM</code><button data-href="#miniouseIAM" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useIAM">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Utiliser ou non le rôle IAM pour accéder à S3/GCS au lieu des clés d'accès/secrètes.</li>      
        <li>Pour plus d'informations, voir</li>      
        <li>aws : https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html</li>      
        <li>gcp : https://cloud.google.com/storage/docs/access-control/iam</li>      
        <li>aliyun (ack) : https://www.alibabacloud.com/help/en/container-service-for-kubernetes/latest/use-rrsa-to-enforce-access-control</li>      
        <li>aliyun (ecs) : https://www.alibabacloud.com/help/en/elastic-compute-service/latest/attach-an-instance-ram-role</li>      </td>
      <td>faux</td>
    </tr>
  </tbody>
</table>
<h2 id="miniocloudProvider" class="common-anchor-header"><code translate="no">minio.cloudProvider</code><button data-href="#miniocloudProvider" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.cloudProvider">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Fournisseur de cloud pour S3. Prend en charge : "aws", "gcp", "aliyun".</li>      
        <li>Vous pouvez utiliser "aws" pour un autre fournisseur de cloud qui prend en charge l'API S3 avec la signature v4, par exemple : minio.</li>      
        <li>Vous pouvez utiliser "gcp" pour un autre fournisseur de cloud qui prend en charge l'API S3 avec la signature v2.</li>      
        <li>Vous pouvez utiliser "aliyun" pour un autre fournisseur de cloud qui utilise un bucket de type hôte virtuel.</li>      
        <li>Lorsque l'option useIAM est activée, seuls "aws", "gcp" et "aliyun" sont pris en charge pour l'instant.</li>      </td>
      <td>aws</td>
    </tr>
  </tbody>
</table>
<h2 id="minioiamEndpoint" class="common-anchor-header"><code translate="no">minio.iamEndpoint</code><button data-href="#minioiamEndpoint" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.iamEndpoint">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Point de terminaison personnalisé pour récupérer les informations d'identification du rôle IAM lorsque useIAM est vrai et que cloudProvider est "aws".</li>      
        <li>Laissez-le vide si vous voulez utiliser le point de terminaison par défaut d'AWS.</li>      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="miniologLevel" class="common-anchor-header"><code translate="no">minio.logLevel</code><button data-href="#miniologLevel" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.logLevel">
  <thead>
    <tr>
      <th class="width80">Description du point de terminaison</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Niveau de journalisation pour le journal du sdk d'aws. Niveaux pris en charge : off, fatal, error, warn, info, debug, trace     </td>
      <td>fatal</td>
    </tr>
  </tbody>
</table>
<h2 id="minioregion" class="common-anchor-header"><code translate="no">minio.region</code><button data-href="#minioregion" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.region">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Spécifier la région d'emplacement du système de stockage minio     </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="miniouseVirtualHost" class="common-anchor-header"><code translate="no">minio.useVirtualHost</code><button data-href="#miniouseVirtualHost" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.useVirtualHost">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Utiliser ou non le mode hôte virtuel pour le seau    </td>
      <td>faux</td>
    </tr>
  </tbody>
</table>
<h2 id="miniorequestTimeoutMs" class="common-anchor-header"><code translate="no">minio.requestTimeoutMs</code><button data-href="#miniorequestTimeoutMs" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.requestTimeoutMs">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        minio timeout pour le temps de requête en millisecondes      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>
<h2 id="miniolistObjectsMaxKeys" class="common-anchor-header"><code translate="no">minio.listObjectsMaxKeys</code><button data-href="#miniolistObjectsMaxKeys" class="anchor-icon" translate="no">
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
    </button></h2><table id="minio.listObjectsMaxKeys">
  <thead>
    <tr>
      <th class="width80">Description de la valeur par défaut</th>
      <th class="width20">Valeur par défaut</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Le nombre maximum d'objets demandés par lot dans le rpc minio ListObjects, </li>      
        <li>0 signifie l'utilisation du client oss par défaut, diminuer cette configration si ListObjects timeout</li>      </td>
      <td>0</td>
    </tr>
  </tbody>
</table>
