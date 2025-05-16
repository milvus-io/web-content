---
id: gcp_layer7.md
title: Mise en place d'un équilibreur de charge de couche 7 pour Milvus sur GCP
related_key: cluster
summary: >-
  Découvrez comment déployer un cluster Milvus derrière un équilibreur de charge
  Layer-7 sur GCP.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Configurer un équilibreur de charge de couche 7 pour Milvus sur GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Comparé à un équilibreur de charge de couche 4, un équilibreur de charge de couche 7 offre des capacités intelligentes d'équilibrage de charge et de mise en cache et constitue un excellent choix pour les services natifs du nuage.</p>
<p>Ce guide vous guide dans la configuration d'un équilibreur de charge de couche 7 pour un cluster Milvus fonctionnant déjà derrière un équilibreur de charge de couche 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Avant de commencer</h3><ul>
<li><p>Un projet existe déjà dans votre compte GCP.</p>
<p>Pour créer un projet, reportez-vous à la section <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Création et gestion de projets</a>. Le nom du projet utilisé dans ce guide est <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Vous avez installé localement <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> et <a href="https://helm.sh/docs/intro/install/">Helm</a>, ou vous avez décidé d'utiliser le <a href="https://cloud.google.com/shell">Cloud Shell</a> basé sur le navigateur à la place.</p></li>
<li><p>Vous avez <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">initialisé le CLI gcloud</a> avec les informations d'identification de votre compte GCP.</p></li>
<li><p>Vous avez <a href="/docs/fr/v2.4.x/gcp.md">déployé un cluster Milvus derrière un équilibreur de charge de couche 4 sur GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Modifier les configurations Milvus</h3><p>Ce guide suppose que vous avez déjà <a href="/docs/fr/v2.4.x/gcp.md">déployé un cluster Milvus derrière un équilibreur de charge de couche 4 sur GCP</a>.</p>
<p>Avant de configurer un équilibreur de charge de couche 7 pour ce cluster Milvus, exécutez la commande suivante pour supprimer l'équilibreur de charge de couche 4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>En tant que service backend de l'équilibreur de charge de couche 7, Milvus doit répondre à <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">certaines exigences de cryptage</a> afin de pouvoir comprendre les requêtes HTTP/2 de l'équilibreur de charge. Par conséquent, vous devez activer TLS sur votre cluster Milvus comme suit.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Le contenu de tls.yaml :</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Configurer un point d'extrémité de contrôle de santé</h3><p>Pour assurer la disponibilité du service, l'équilibrage de charge de couche 7 sur GCP nécessite de sonder les conditions de santé du service backend. Par conséquent, nous devons configurer un BackendConfig pour envelopper le point final de contrôle de santé et associer le BackendConfig au service Milvus par le biais d'annotations.</p>
<p>L'extrait suivant représente les paramètres de BackendConfig. Enregistrez-le sous <code translate="no">backendconfig.yaml</code> pour une utilisation ultérieure.</p>
<pre><code translate="no" class="language-yaml">apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    <span class="hljs-built_in">type</span>: HTTP
<button class="copy-code-btn"></button></code></pre>
<p>Exécutez ensuite la commande suivante pour créer le point de terminaison du bilan de santé.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Enfin, mettez à jour les annotations du service Milvus pour demander à l'équilibreur de charge Layer-7 que nous créerons plus tard d'effectuer des contrôles de santé à l'aide du point de terminaison qui vient d'être créé.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>En ce qui concerne la première annotation,</p>
<p>Milvus est natif de gRPC, qui est construit sur HTTP/2. Par conséquent, nous pouvons utiliser HTTP/2 comme protocole de communication entre l'équilibreur de charge Layer-7 et Milvus.</p></li>
<li><p>Pour ce qui est de la deuxième annotation, Milvus ne propose que le bilan de santé,</p>
<p>Milvus n'offre que le point d'extrémité du bilan de santé via gRPC et HTTP/1. Nous devons configurer un BackendConfig pour envelopper le point d'extrémité du bilan de santé et l'associer au service Milvus afin que l'équilibreur de charge Layer-7 interroge ce point d'extrémité pour connaître l'état de santé de Milvus.</p></li>
<li><p>Quant à la troisième annotation,</p>
<p>Elle demande la création d'un groupe de points d'extrémité du réseau (NEG) après la création d'une entrée. Lorsque les NEG sont utilisés avec l'entrée GKE, le contrôleur d'entrée facilite la création de tous les aspects de l'équilibreur de charge. Cela inclut la création de l'adresse IP virtuelle, des règles de transfert, des contrôles de santé, des règles de pare-feu, etc. Pour plus de détails, consultez la <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">documentation de Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Préparer les certificats TLS</h3><p>Le protocole TLS nécessite des certificats pour fonctionner. <strong>Il existe deux façons de créer des certificats, à savoir les certificats autogérés et les certificats gérés par Google.</strong></p>
<p>Ce guide utilise <strong>my-release.milvus.io</strong> comme nom de domaine pour accéder à notre service Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Créer des certificats autogérés</h4><p>Exécutez les commandes suivantes pour créer un certificat.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>Créez ensuite un secret dans votre cluster GKE avec ces fichiers pour une utilisation ultérieure.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Créer des certificats gérés par Google</h4><p>L'extrait suivant est un paramètre ManagedCertificate. Enregistrez-le sous <code translate="no">managed-crt.yaml</code> pour une utilisation ultérieure.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Créez un certificat géré en appliquant le paramètre à votre cluster GKE comme suit :</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Cette opération peut durer un certain temps. Vous pouvez vérifier la progression en exécutant</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>La sortie devrait être similaire à ce qui suit :</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Une fois que <strong>certificateStatus</strong> devient <strong>actif</strong>, vous êtes prêt à configurer l'équilibreur de charge.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Créer un Ingress pour générer un équilibreur de charge de couche 7</h3><p>Créez un fichier YAML avec l'un des extraits suivants.</p>
<ul>
<li><p>Utilisation de certificats autogérés</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: networking.<span class="hljs-property">k8s</span>.<span class="hljs-property">io</span>/v1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Ingress</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release-milvus
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">tls</span>:
  - <span class="hljs-attr">hosts</span>:
    - my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">secretName</span>: my-release-milvus-tls
  <span class="hljs-attr">rules</span>:
  - <span class="hljs-attr">host</span>: my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">http</span>:
      <span class="hljs-attr">paths</span>:
      - <span class="hljs-attr">path</span>: /
        <span class="hljs-attr">pathType</span>: <span class="hljs-title class_">Prefix</span>
        <span class="hljs-attr">backend</span>:
          <span class="hljs-attr">service</span>:
            <span class="hljs-attr">name</span>: my-release-milvus
            <span class="hljs-attr">port</span>:
              <span class="hljs-attr">number</span>: <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Utilisation de certificats gérés par Google</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  namespace: default
  annotations:
    networking.gke.io/managed-certificates: <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
spec:
  rules:
  - host: my-release.milvus.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-release-milvus
            port:
              number: 19530
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Vous pouvez ensuite créer l'Ingress en appliquant le fichier à votre cluster GKE.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Attendez maintenant que Google configure l'équilibreur de charge Layer-7. Vous pouvez vérifier la progression en exécutant</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>La sortie devrait être similaire à ce qui suit :</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Une fois qu'une adresse IP s'affiche dans le champ <strong>ADDRESS</strong>, l'équilibreur de charge Layer-7 est prêt à être utilisé. Les ports 80 et 443 sont tous deux affichés dans la sortie ci-dessus. N'oubliez pas que vous devez toujours utiliser le port 443 pour votre propre bien.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Vérifier la connexion via l'équilibreur de charge Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide utilise PyMilvus pour vérifier la connexion au service Milvus derrière l'équilibreur de charge Layer-7 que nous venons de créer. Pour des étapes détaillées, <a href="https://milvus.io/docs/v2.3.x/example_code.md">lisez ceci</a>.</p>
<p>Notez que les paramètres de connexion varient en fonction de la manière dont vous choisissez de gérer les <a href="#prepare-tls-certificates">certificats</a> dans <a href="#prepare-tls-certificates">Prepare TLS certificates</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, server_pem_path=<span class="hljs-string">&quot;tls.crt&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)

<span class="hljs-comment"># For Google-managed certificates, there is not need to do so.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>L'adresse IP et le numéro de port dans <strong>host</strong> and <strong>port</strong> doivent correspondre à ceux indiqués à la fin de <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer (Créer une entrée pour générer un équilibreur de charge de niveau 7)</a>.</li>
<li>Si vous avez configuré un enregistrement DNS pour faire correspondre le nom de domaine à l'adresse IP de l'hôte, remplacez l'adresse IP dans <strong>host</strong> par le nom de domaine et omettez <strong>server_name</strong>.</li>
</ul>
</div>
