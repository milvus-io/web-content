---
id: kafka-connect-milvus.md
summary: In this quick start guide we show how to setup open source kafka and Zilliz Cloud to ingest vector data. 
title: Integrate Milvus with WhyHow
---

# Connect Kafka with Milvus

In this quick start guide we show how to setup open source kafka and Zilliz Cloud to ingest vector data.

## Step 1: Download the kafka-connect-milvus plugin

Complete the following steps to download the kafka-connect-milvus plugin.

1. download the latest plugin zip file `zilliz-kafka-connect-milvus-xxx.zip` from [here](https://github.com/zilliztech/kafka-connect-milvus/releases).

## Step 2: Download Kafka 

1. Download the latest kafka from [here](https://kafka.apache.org/downloads).
2. Unzip the downloaded file and go to the kafka directory.

```shell
$ tar -xzf kafka_2.13-3.6.1.tgz
$ cd kafka_2.13-3.6.1
```

## STEP 3: Start the Kafka Environment

<div class="alert note">

NOTE: Your local environment must have Java 8+ installed.

</div>

Run the following commands in order to start all services in the correct order:

1. Start the ZooKeeper service

    ```shell
    $ bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

2. Start the Kafka broker service

    Open another terminal session and run:

    ```shell
    $ bin/kafka-server-start.sh config/server.properties
    ```

Once all services have successfully launched, you will have a basic Kafka environment running and ready to use.

- check the official quick start guide form kafka for details: https://kafka.apache.org/quickstart

## Step 4: Configure Kafka and Zilliz Cloud

Ensure you have Kafka and Zilliz Cloud setup and properly configured.

1. If you don't already have a topic in Kafka, create a topic (e.g. `topic_0`) in Kafka.

    ```shell
    $ bin/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:9092
    ```

2. If you don't already have a collection in Zilliz Cloud, create a collection with a vector field (in this example the vector has `dimension=8`). You can use the following example schema on Zilliz Cloud:

    <img src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/>

    <div class="alert note">

    Note: Make sure the schema on both sides match each other. In the schema, there is exactly one vector field. The names of each field on both sides are exactly the same.

    </div>

## Step 5: Load the kafka-connect-milvus plugin to Kafka Instance

1. unzip the `zilliz-kafka-connect-milvus-xxx.zip` file you downloaded in Step 1.
2. copy the `zilliz-kafka-connect-milvus` directories to the `libs` directory of your Kafka installation.
3. modify the `connect-standalone.properties` file in the `config` directory of your Kafka installation.

    ```properties
    key.converter.schemas.enable=false
    value.converter.schemas.enable=false
    plugin.path=libs/zilliz-kafka-connect-milvus-xxx
    ```

4. create and configure a `milvus-sink-connector.properties` file in the `config` directory of your Kafka installation.

    ```properties
    name=zilliz-kafka-connect-milvus
    connector.class=com.milvus.io.kafka.MilvusSinkConnector
    public.endpoint=https://<public.endpoint>:port
    token=*****************************************
    collection.name=topic_0
    topics=topic_0
    ``` 

## Step 6: Launch the connector

1. Start the connector with the previous configuration file

    ```shell
    $ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
    ```

2. Try produce a message to the Kafka topic you just created in Kafka

    ```shell
    bin/kafka-console-producer.sh --topic topic_0 --bootstrap-server localhost:9092                        
    >{"id": 0, "title": "The Reported Mortality Rate of Coronavirus Is Not Important", "title_vector": [0.041732933, 0.013779674, -0.027564144, -0.013061441, 0.009748648, 0.00082446384, -0.00071647146, 0.048612226], "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912"}
    ```

3. Check if the entity has been inserted into the collection in Zilliz Cloud. Here is what it looks like on Zilliz Cloud if the insertion succeeds:

    <img src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" />

### Support

If you require any assistance or have questions regarding the Kafka Connect Milvus Connector, please feel free to reach out to our support team: **Email:** [support@zilliz.com](mailto:support@zilliz.com)