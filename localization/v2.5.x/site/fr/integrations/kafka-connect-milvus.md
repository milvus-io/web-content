---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka est intégré à Milvus et Zilliz Cloud pour diffuser des données
  vectorielles. Découvrez comment utiliser le connecteur Kafka-Milvus pour créer
  des pipelines en temps réel pour la recherche sémantique, les systèmes de
  recommandation et l'analyse pilotée par l'IA.
title: >-
  Connecter Apache Kafka® avec Milvus/Zilliz Cloud pour l'ingestion de données
  vectorielles en temps réel
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Connecter Apache Kafka® avec Milvus/Zilliz Cloud pour l'ingestion de données vectorielles en temps réel<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans ce guide de démarrage rapide, nous montrons comment configurer Apache Kafka® et Zilliz Cloud pour ingérer des données vectorielles.</p>
<p>Ce tutoriel explique comment utiliser Apache Kafka® pour diffuser et ingérer des données vectorielles dans la base de données vectorielle Milvus et Zilliz Cloud (Milvus entièrement géré), permettant ainsi des applications avancées en temps réel telles que la recherche sémantique, les systèmes de recommandation et l'analyse alimentée par l'IA.</p>
<p>Apache Kafka est une plateforme de streaming d'événements distribués conçue pour les pipelines à haut débit et à faible latence. Elle est largement utilisée pour collecter, stocker et traiter des flux de données en temps réel provenant de sources telles que des bases de données, des appareils IoT, des applications mobiles et des services cloud. La capacité de Kafka à gérer de grands volumes de données en fait une source de données importante pour les bases de données vectorielles comme Milvus ou Zilliz Cloud.</p>
<p>Par exemple, Kafka peut capturer des flux de données en temps réel, tels que des interactions d'utilisateurs, des relevés de capteurs, ainsi que leur intégration à partir de modèles d'apprentissage automatique, et publier ces flux directement dans Milvus ou Zilliz Cloud. Une fois dans la base de données vectorielle, ces données peuvent être indexées, recherchées et analysées efficacement.</p>
<p>L'intégration de Kafka avec Milvus et Zilliz Cloud permet de créer de manière transparente des pipelines puissants pour les flux de données non structurées. Le connecteur fonctionne à la fois pour le déploiement de Kafka open-source et pour les services hébergés tels que <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> et <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>Dans ce tutoriel, nous utilisons Zilliz Cloud comme démonstration :</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Étape 1 : Télécharger le plugin kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Suivez les étapes suivantes pour télécharger le plugin kafka-connect-milvus.</p>
<ol>
<li>Téléchargez le dernier fichier zip du plugin <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> à partir d'<a href="https://github.com/zilliztech/kafka-connect-milvus/releases">ici</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Étape 2 : Télécharger Kafka<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Téléchargez la dernière version de Kafka à partir d'<a href="https://kafka.apache.org/downloads">ici</a>.</li>
<li>Décompressez le fichier téléchargé et allez dans le répertoire kafka.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">ETAPE 3 : Démarrer l'environnement Kafka<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>NOTE : Votre environnement local doit avoir Java 8+ installé.</p>
</div>
<p>Exécutez les commandes suivantes afin de démarrer tous les services dans le bon ordre :</p>
<ol>
<li><p>Démarrer le service ZooKeeper</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Démarrer le service Kafka broker</p>
<p>Ouvrez une autre session de terminal et exécutez :</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Une fois que tous les services ont été lancés avec succès, vous disposez d'un environnement Kafka de base prêt à l'emploi.</p>
<ul>
<li>Pour plus de détails, consultez le guide officiel de démarrage rapide de Kafka : https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Étape 4 : Configurer Kafka et Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Assurez-vous que Kafka et Zilliz Cloud sont installés et correctement configurés.</p>
<ol>
<li><p>Si vous n'avez pas encore de sujet dans Kafka, créez un sujet (par exemple <code translate="no">topic_0</code>) dans Kafka.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Si vous n'avez pas encore de collection dans Zilliz Cloud, créez une collection avec un champ vectoriel (dans cet exemple, le vecteur a <code translate="no">dimension=8</code>). Vous pouvez utiliser l'exemple de schéma suivant sur Zilliz Cloud :</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Note : Assurez-vous que les schémas des deux côtés correspondent. Dans le schéma, il y a exactement un champ vectoriel. Les noms de chaque champ des deux côtés sont exactement les mêmes.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Étape 5 : Charger le plugin kafka-connect-milvus dans l'instance Kafka<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Décompressez le fichier <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> que vous avez téléchargé à l'étape 1.</p></li>
<li><p>copiez les répertoires <code translate="no">zilliz-kafka-connect-milvus</code> dans le répertoire <code translate="no">libs</code> de votre installation Kafka.</p></li>
<li><p>modifier le fichier <code translate="no">connect-standalone.properties</code> dans le répertoire <code translate="no">config</code> de votre installation Kafka.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>créer et configurer un fichier <code translate="no">milvus-sink-connector.properties</code> dans le répertoire <code translate="no">config</code> de votre installation Kafka.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Etape 6 : Lancer le connecteur<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Démarrez le connecteur avec le fichier de configuration précédent</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Essayez de produire un message vers le topic Kafka que vous venez de créer dans Kafka</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Vérifier si l'entité a été insérée dans la collection dans Zilliz Cloud. Voici ce que cela donne sur Zilliz Cloud si l'insertion a réussi :</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Support</h3><p>Si vous avez besoin d'aide ou si vous avez des questions concernant le connecteur Kafka Connect Milvus, n'hésitez pas à contacter le responsable du connecteur : <strong>Courriel :</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
