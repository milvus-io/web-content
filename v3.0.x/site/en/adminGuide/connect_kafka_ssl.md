---
id: connect_kafka_ssl.md
title: Connecting to Kafka with SASL/SSL
related_key: kafka, sasl, tls
summary: This guide lists several ways to connect Milvus to Kafka, from the simplest one without SASL/SSL to the fully secured one with SASL/SSL.
---

# Connecting to Kafka with SASL/SSL

This guide lists several ways to connect Milvus to Kafka, from the simplest one without SASL/SSL to the fully secured one with SASL/SSL.

## Connect Milvus to Kafka Without SASL/SSL

To start Milvus and Kafka without SASL/SSL, you disable authentication and encryption for both Kafka and Milvus. Use them only in a trusted environment.

### 1. Start a Kafka service without SASL/SSL

You can use the following `docker-compose.yaml` file to start a Kafka service without SASL/SSL:

```yaml
version: '3'
services:
  zookeeper:
    image: wurstmeister/zookeeper:latest
    container_name: zookeeper
    ports:
      - 2181:2181
    restart: always

  kafka:
    image: wurstmeister/kafka:latest
    container_name: kafka
    ports:
      - 9092:9092
    environment:
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
      - KAFKA_LISTENERS=PLAINTEXT://:9092
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
```

Then you can start the Kafka service with the following command:

```shell
$ docker compose up -d
```

### 2. Start Milvus and Connect to Kafka

Once the Kafka service is started, you can start Milvus and connect to it. Use the following `docker-compose.yaml` file to start Milvus and connect to Kafka without SASL/SSL:

```yaml
version: '3.5'

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
```

Use the following command to download a Milvus configuration file template:

```shell
$ wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml
```

And set the following parameters:

```yaml
mq:
  type: kafka

kafka:
  brokerList: "127.0.0.1:9092"
  saslUsername:
  saslPassword:
  saslMechanisms:
  securityProtocol:
  readTimeout: 10 # read message timeout in seconds
  ssl:
    enabled: false # Whether to support kafka secure connection mode
    tlsCert: 
    tlsKey:
    tlsCACert:
    tlsKeyPassword:
```

Then you can start Milvus with the following command:

```shell
$ docker compose up -d
```

## Connect Milus to Kafka with SASL/PLAIN Alone

To start Kafka with SASL/PLAIN authentication, you need to add the `kafka_server_jass.conf` file with proper settings.

### 1. Start a Kafka service with SASL/PLAIN

Put the following `docker-compose.yaml` file and `kafka_server_jaas.conf` file in the same directory.

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 2181:2181

  kafka:
    image: confluentinc/cp-kafka:latest
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
      - 9093:9093
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      ZOOKEEPER_SASL_ENABLED: "false"
      KAFKA_ADVERTISED_LISTENERS: SASL_PLAINTEXT://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: SASL_PLAINTEXT:SASL_PLAINTEXT
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SASL_PLAINTEXT
      KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL: PLAIN
      KAFKA_SASL_ENABLED_MECHANISMS: PLAIN
      KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_OPTS: "-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf"
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf
```

In the `kafka_server_jass.conf` file, set the following parameters:

```conf
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="kafka"
    password="pass123"
    user_kafka="pass123";
};
```

Then you can start the Kafka service with the following command:

```shell
$ docker compose up -d
```

### 2. Start Milvus and Connect to Kafka

Once the Kafka service is started, you can start Milvus and connect to it. Use the following `docker-compose.yaml` file to start Milvus and connect to Kafka with SASL/PLAIN:

```yaml
version: '3.5'

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
```

Use the following command to download a Milvus configuration file template:

```shell
$ wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml
```

And set the following parameters:

```yaml
mq:
  type: kafka

kafka:
  brokerList: "127.0.0.1:9093"
  saslUsername: kafka
  saslPassword: pass123
  saslMechanisms: PLAIN
  securityProtocol: SASL_PLAINTEXT
  readTimeout: 10 # read message timeout in seconds
  ssl:
    enabled: false # Whether to support kafka secure connection mode
    tlsCert: # path to client's public key
    tlsKey: # path to client's private key
    tlsCACert: # file or directory path to CA certificate
    tlsKeyPassword: # private key passphrase for use with private key, if any
```

Then you can start Milvus with the following command:

```shell
$ docker compose up -d
```

## Connect Milvus to Kafka with SSL Alone

To start Kafka with SSL authentication, you need to obtain some certificates files or generate self-signed ones. In this example, we use self-signed certificates.

### 1. Generate Self-Signed Certificates

Create a folder named `my_secrets`, add a bash script named `gen-ssl-certs.sh` in it, and paste the following content into it:

```bash
#!/bin/bash
#
#
# This scripts generates:
#  - root CA certificate
#  - server certificate and keystore
#  - client keys
#
# https://cwiki.apache.org/confluence/display/KAFKA/Deploying+SSL+for+Kafka
#


if [[ "$1" == "-k" ]]; then
    USE_KEYTOOL=1
    shift
else
    USE_KEYTOOL=0
fi

OP="$1"
CA_CERT="$2"
PFX="$3"
HOST="$4"

C=NN
ST=NN
L=NN
O=NN
OU=NN
CN="kafka-ssl"
 

# Password
PASS="abcdefgh"

# Cert validity, in days
VALIDITY=365

set -e

export LC_ALL=C

if [[ $OP == "ca" && ! -z "$CA_CERT" && ! -z "$3" ]]; then
    CN="$3"
    openssl req -new -x509 -keyout ${CA_CERT}.key -out $CA_CERT -days $VALIDITY -passin "pass:$PASS" -passout "pass:$PASS" <<EOF
${C}
${ST}
${L}
${O}
${OU}
${CN}
$USER@${CN}
.
.
EOF



elif [[ $OP == "server" && ! -z "$CA_CERT" && ! -z "$PFX" && ! -z "$CN" ]]; then

    #Step 1
    echo "############ Generating key"
    keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}server.keystore.jks -alias localhost -validity $VALIDITY -genkey -keyalg RSA <<EOF
$CN
$OU
$O
$L
$ST
$C
yes
yes
EOF
        
    #Step 2
    echo "############ Adding CA"
    keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}server.truststore.jks -alias CARoot -import -file $CA_CERT <<EOF
yes
EOF
    
    #Step 3
    echo "############ Export certificate"
    keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}server.keystore.jks -alias localhost -certreq -file ${PFX}cert-file

    echo "############ Sign certificate"
    openssl x509 -req -CA $CA_CERT -CAkey ${CA_CERT}.key -in ${PFX}cert-file -out ${PFX}cert-signed -days $VALIDITY -CAcreateserial -passin "pass:$PASS"
    
    
    echo "############ Import CA"
    keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}server.keystore.jks -alias CARoot -import -file $CA_CERT <<EOF
yes
EOF
    
    echo "############ Import signed CA"
    keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}server.keystore.jks -alias localhost -import -file ${PFX}cert-signed    

    
elif [[ $OP == "client" && ! -z "$CA_CERT" && ! -z "$PFX" && ! -z "$CN" ]]; then

    if [[ $USE_KEYTOOL == 1 ]]; then
        echo "############ Creating client truststore"

        [[ -f ${PFX}client.truststore.jks ]] || keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}client.truststore.jks -alias CARoot -import -file $CA_CERT <<EOF
yes
EOF

        echo "############ Generating key"
        keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}client.keystore.jks -alias localhost -validity $VALIDITY -genkey -keyalg RSA <<EOF
$CN
$OU
$O
$L
$ST
$C
yes
yes
EOF
        echo "########### Export certificate"
        keytool -storepass "$PASS" -keystore ${PFX}client.keystore.jks -alias localhost -certreq -file ${PFX}cert-file

        echo "########### Sign certificate"
        openssl x509 -req -CA ${CA_CERT} -CAkey ${CA_CERT}.key -in ${PFX}cert-file -out ${PFX}cert-signed -days $VALIDITY -CAcreateserial -passin pass:$PASS        

        echo "########### Import CA"
        keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}client.keystore.jks -alias CARoot -import -file ${CA_CERT} <<EOF
yes
EOF

        echo "########### Import signed CA"
        keytool -storepass "$PASS" -keypass "$PASS" -keystore ${PFX}client.keystore.jks -alias localhost -import -file ${PFX}cert-signed

    else
        # Standard OpenSSL keys
        echo "############ Generating key"
        openssl genrsa -des3 -passout "pass:$PASS" -out ${PFX}client.key 2048 
        
        echo "############ Generating request"
        openssl req -passin "pass:$PASS" -passout "pass:$PASS" -key ${PFX}client.key -new -out ${PFX}client.req \
                <<EOF
$C
$ST
$L
$O
$OU
$CN
.
$PASS
.
EOF

        echo "########### Signing key"
        openssl x509 -req -passin "pass:$PASS" -in ${PFX}client.req -CA $CA_CERT -CAkey ${CA_CERT}.key -CAcreateserial -out ${PFX}client.pem -days $VALIDITY

    fi

    
    

else
    echo "Usage: $0 ca <ca-cert-file> <CN>"
    echo "       $0 [-k] server|client <ca-cert-file> <file_prefix> <hostname>"
    echo ""
    echo "       -k = Use keytool/Java Keystore, else standard SSL keys"
    exit 1
fi
```

In the above script, a default password `abcdefgh` applies. To change the password, create a text file named `cert_creds` and input the password in the first line.

Then run the following command to generate the certificates:

- Generate CA certificate:

    The following assumes the CA certificate file is named `ca-cert` and the hostname of the broker is `kafka-ssl`:

    ```shell
    $ ./gen-ssl-certs.sh ca ca-cert kafka-ssl
    ```

- Generate server certificate and keystore:

    The following assumes the CA certificate file is named `ca-cert`, the prefix for all output files is `kafka_ `, and the hostname of the broker is `kafka-ssl`:

    ```shell
    $ ./gen-ssl-certs.sh -k server ca-cert kafka_ kafka-ssl
    ```

- Generate client keys:

    The following assumes the CA certificate file is named `ca-cert`, the prefix for all output files is `kafka_ `, and the client name is `kafka-client`:

    ```shell
    $ ./gen-ssl-certs.sh client ca-cert kafka_ kafka-client
    ```

Once all necessary certificates are generated, you can see the following files in the `my_secrets` folder:

```shell
$ ls -l my_secrets
total 12
-rw-rw-r-- 1 1.4K Feb 26 11:53 ca-cert
-rw------- 1 1.9K Feb 26 11:53 ca-cert.key
-rw-rw-r-- 1   41 Feb 26 11:54 ca-cert.srl
-rw-rw-r-- 1    9 Feb 26 12:08 cert_creds
-rwxrwxr-x 1 3.9K Feb 26 17:26 gen-ssl-certs.sh
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_cert-file
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_cert-signed
-rw------- 1 1.8K Feb 26 11:54 kafka_client.key
-rw-rw-r-- 1 1.2K Feb 26 11:54 kafka_client.pem
-rw-rw-r-- 1 1013 Feb 26 11:54 kafka_client.req
-rw-rw-r-- 1 5.6K Feb 26 11:54 kafka_server.keystore.jks
-rw-rw-r-- 1 1.4K Feb 26 11:54 kafka_server.truststore.jks
```

### 2. Start a Kafka service with SSL

Use the following `docker-compose.yaml` file to start a Kafka service with SSL:

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    hostname: zookeeper
    ports:
      - 2181:2181
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka-ssl:
    image: confluentinc/cp-kafka:latest
    container_name: kafka-ssl
    hostname: kafka-ssl
    ports:
      - 9093:9093
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      ZOOKEEPER_SASL_ENABLED: "false"
      KAFKA_ADVERTISED_LISTENERS: SSL://kafka-ssl:9093
      KAFKA_SSL_KEYSTORE_FILENAME: kafka_server.keystore.jks
      KAFKA_SSL_KEYSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_KEY_CREDENTIALS: cert_creds
      KAFKA_SSL_TRUSTSTORE_FILENAME: kafka_server.truststore.jks
      KAFKA_SSL_TRUSTSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_CLIENT_AUTH: 'required'
      KAFKA_SECURITY_PROTOCOL: SSL
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SSL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/etc/kafka/secrets
```

Then start the Kafka service with the following command:

```shell
$ docker compose up -d
```

### 3. Start Milvus and Connect to Kafka with SSL

Once the Kafka service is started, you can start Milvus and connect to it. Use the following `docker-compose.yaml` file to start Milvus and connect to Kafka with SSL:

```yaml
version: '3.5'

services:
  etcd:
    ......
    
  minio:
    ......
      
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
      - ${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets
```

Use the following command to download a Milvus configuration file template:

```shell
$ wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml
```

And set the following parameters:

```yaml
mq:
  type: kafka

kafka:
  brokerList: "127.0.0.1:9093"
  saslUsername: 
  saslPassword: 
  saslMechanisms: 
  securityProtocol: SSL
  readTimeout: 10 # read message timeout in seconds
  ssl:
    enabled: true # Whether to support kafka secure connection mode
    tlsCert: /milvus/secrets/kafka_client.pem # path to client's public key
    tlsKey: /milvus/secrets/kafka_client.key # path to client's private key
    tlsCACert: /milvus/secrets/ca-cert # file or directory path to CA certificate
    tlsKeyPassword: abcdefgh # private key passphrase for use with private key, if any
```

Then start Milvus with the following command:

```shell
$ docker compose up -d
```

## Connect Milvus to Kafka with SASL/PLAIN and SSL

To connect Milvus to Kafka with SASL/PLAIN and SSL, you need to repeat the steps in [Connect Milus to Kafka with SASL/PLAIN Alone](#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone) and [Connect Milus to Kafka with SSL Alone](#Connect-Milus-to-Kafka-with-SSL-Alone).

### 1. Start a Kafka service with SASL/PLAIN and SSL

Use the `kafka_server_jass.conf` file mentioned in [Connect Milus to Kafka with SASL/PLAIN Alone](#Connect-Milus-to-Kafka-with-SASLPLAIN-Alone) and the `my_secrets` folder generated in [Connect Milus to Kafka with SSL Alone](#Connect-Milus-to-Kafka-with-SSL-Alone) to start a Kafka service with SASL/PLAIN and SSL.

The following `docker-compose.yaml` file can be used to start a Kafka service with SASL/PLAIN and SSL:

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: zookeeper
    hostname: zookeeper
    ports:
      - 2181:2181
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000


  kafka-ssl:
    image: confluentinc/cp-kafka:latest
    container_name: kafka-ssl
    hostname: kafka-ssl
    ports:
      - 9093:9093
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      ZOOKEEPER_SASL_ENABLED: "false"
      KAFKA_ADVERTISED_LISTENERS: SASL_SSL://kafka-ssl:9093
      KAFKA_SSL_KEYSTORE_FILENAME: kafka_server.keystore.jks
      KAFKA_SSL_KEYSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_KEY_CREDENTIALS: cert_creds
      KAFKA_SSL_TRUSTSTORE_FILENAME: kafka_server.truststore.jks
      KAFKA_SSL_TRUSTSTORE_CREDENTIALS: cert_creds
      KAFKA_SSL_CLIENT_AUTH: 'required'
      KAFKA_SECURITY_PROTOCOL: SASL_SSL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: SASL_SSL:SASL_SSL
      KAFKA_SECURITY_INTER_BROKER_PROTOCOL: SASL_SSL
      KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL: PLAIN
      KAFKA_SASL_ENABLED_MECHANISMS: PLAIN
      KAFKA_CONFLUENT_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
      KAFKA_OPTS: "-Djava.security.auth.login.config=/etc/kafka/configs/kafka_server_jass.conf"

    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/etc/kafka/secrets
      - ${DOCKER_VOLUME_DIRECTORY:-.}/kafka_server_jass.conf:/etc/kafka/configs/kafka_server_jass.conf
```

Then start the Kafka service with the following command:

```shell
$ docker compose up -d
```

### 2. Start Milvus and Connect to Kafka with SASL/PLAIN and SSL

Once the Kafka service is started, you can start Milvus and connect to it. Use the following `docker-compose.yaml` file to start Milvus and connect to Kafka with SASL/PLAIN and SSL:

```yaml
version: '3.5'

services:
  etcd:
    ......
    
  minio:
    ......
    
  standalone:
    container_name: milvus-standalone
    ......
    volumes:
      - ${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus
      - ${DOCKER_VOLUME_DIRECTORY:-.}/milvus.yaml:/milvus/configs/milvus.yaml
      - ${DOCKER_VOLUME_DIRECTORY:-.}/my_secrets:/milvus/secrets
```

Use the following command to download a Milvus configuration file template:

```shell
$ wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml -O milvus.yaml
```

And set the following parameters:

```yaml
mq:
  type: kafka

kafka:
  brokerList: "127.0.0.1:9093"
  saslUsername: kafka
  saslPassword: pass123
  saslMechanisms: PLAIN
  securityProtocol: SASL_SSL
  readTimeout: 10 # read message timeout in seconds
  ssl:
    enabled: true # Whether to support kafka secure connection mode
    tlsCert: /milvus/secrets/kafka_client.pem # path to client's public key
    tlsKey: /milvus/secrets/kafka_client.key # path to client's private key
    tlsCACert: /milvus/secrets/ca-cert # file or directory path to CA certificate
    tlsKeyPassword: abcdefgh # private key passphrase for use with private key, if any
```