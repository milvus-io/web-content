---
id: aws_layer7.md
title: Mise en place d'un équilibreur de charge de couche 7 pour Milvus sur AWS
related_key: cluster
summary: >-
  Découvrez comment déployer un cluster Milvus derrière un équilibreur de charge
  Layer-7 sur AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Configurer un équilibreur de charge de couche 7 pour Milvus sur AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>Comparé à un équilibreur de charge de couche 4, un équilibreur de charge de couche 7 offre des capacités intelligentes d'équilibrage de charge et de mise en cache et constitue un excellent choix pour les services natifs dans le nuage.</p>
<p>Ce guide vous guide dans la configuration d'un équilibreur de charge de couche 7 pour un cluster Milvus fonctionnant déjà derrière un équilibreur de charge de couche 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Avant de commencer</h3><ul>
<li>Vous avez <a href="/docs/fr/v2.4.x/eks.md">déployé un cluster Milvus derrière un équilibreur de charge de niveau 4 sur AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Modifier les configurations de Milvus</h3><p>Ce guide suppose que vous avez déjà <a href="/docs/fr/v2.4.x/eks.md">déployé un cluster Milvus derrière un équilibreur de charge de niveau 4 sur AWS</a>.</p>
<p>Avant de configurer un équilibreur de charge de couche 7 pour ce cluster Milvus, exécutez la commande suivante pour supprimer l'équilibreur de charge de couche 4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Préparer les certificats TLS</h3><p>TLS nécessite des certificats pour fonctionner. Nous utilisons <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> pour gérer les certificats et devons importer un certificat existant dans ACM. Reportez-vous à la section <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Importer un certificat</a>. Voici un exemple.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Créer un fichier d'entrée pour générer un équilibreur de charge de couche 7</h3><p>Préparez le fichier d'entrée comme suit et nommez-le <code translate="no">ingress.yaml</code>. <strong>Remplacez l'arn et l'hôte du certificat par les vôtres.</strong></p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    alb.ingress.kubernetes.io/certificate-arn: <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

spec:
  ingressClassName: alb
  rules:
    - host: milvus-demo.milvus.io
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: milvus-demo
              port:
                number: 19530
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez ensuite créer l'Ingress en appliquant le fichier à votre cluster EKS.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Attendez maintenant qu'AWS configure l'équilibreur de charge Layer-7. Vous pouvez vérifier la progression en exécutant</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>La sortie devrait être similaire à ce qui suit :</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Une fois qu'une adresse s'affiche dans le champ <strong>ADDRESS</strong>, l'équilibreur de charge Layer-7 est prêt à être utilisé.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>L'<strong>hôte</strong> et le <strong>nom du serveur</strong> doivent être remplacés par les vôtres.</li>
<li>Si vous avez configuré un enregistrement DNS pour faire correspondre le nom de domaine à l'alb, remplacez l'<strong>hôte</strong> par le nom de domaine et omettez <strong>nom_serveur.</strong></li>
</ul>
</div>
