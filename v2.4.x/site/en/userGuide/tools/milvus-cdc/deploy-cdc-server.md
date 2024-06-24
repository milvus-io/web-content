---
id: deploy-cdc-server.md
order: 2
summary: This guide provides a step-by-step process for deploying a Milvus-CDC server.
title: Deploy CDC Server
---

# Deploy CDC Server

This guide provides a step-by-step process for deploying a Milvus-CDC server.

## Prerequisites

Ensure the following conditions are met before deploying a Milvus-CDC server:

- __Milvus Instances__: Both the source Milvus and at least one target Milvus should be deployed and operational.

    - Both the source and target Milvus versions must be 2.3.2 or higher, preferably 2.4.x. We recommend uisng the same version for the source and target Milvus to ensure compatibility.

    - Set the `common.ttMsgEnabled` configuration of the target Milvus to `false`.

    - Configure the source and target Milvus with distinct meta and message storage settings to prevent conflicts. For instance, avoid using the same etcd and rootPath configurations, as well as identical Pulsar services and `chanNamePrefix` in multiple Milvus instances.

- __Metastore__: Have an etcd or MySQL database ready for the Milvus-CDC metastore.

## Steps

### Obtain the Milvus-CDC config file

Clone the [Milvus-CDC repo](https://github.com/zilliztech/milvus-cdc) and navigate to the `milvus-cdc/server/configs` directory to access the `cdc.yaml` config file.

```bash
git clone https://github.com/zilliztech/milvus-cdc.git

cd milvus-cdc/server/configs
```

### Edit the config file

In the `milvus-cdc/server/configs` directory, modify the `cdc.yaml` file to customize configurations related to the Milvus-CDC metastore and connection details of the source Milvus.

- __Metastore Configuration__:

    - `metaStoreConfig.storeType`: Type of metastore for Milvus-CDC. Possible values are `etcd` or `mysql`.

    - `metaStoreConfig.etcdEndpoints`: Address for connecting to the etcd of Milvus-CDC. Required if `storeType` is set to `etcd`.

    - `metaStoreConfig.mysqlSourceUrl`: Connection address of the MySQL database for the Milvus-CDC server. Required if `storeType` is set to `mysql`.

    - `metaStoreConfig.rootPath`: Root path of the Milvus-CDC metastore. This configuration enables multi-tenancy, allowing multiple CDC services to utilize the same etcd or MySQL instance while achieving isolation through different root paths.

    Example configuration:

    ```yaml
    # cdc meta data config
    metaStoreConfig:
      # the metastore type, available value: etcd, mysql
      storeType: etcd
      # etcd address
      etcdEndpoints:
        - localhost:2379
      # mysql connection address
      # mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8
      # meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy
      rootPath: cdc
    ```

- __Source Milvus Configuration:__

    Specify the connection details of the source Milvus, including etcd and message storage, to establish a connection between the Milvus-CDC server and the source Milvus.

    - `sourceConfig.etcdAddress`: Address for connecting to the etcd of the source Milvus. For more information, refer to [etcd-related Configurations](https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations).

    - `sourceConfig.etcdRootPath`: Root prefix of the key where the source Milvus stores data in etcd. The value may vary based on the deployment method of the Milvus instance:

        - __Helm__ or __Docker Compose__: Defaults to `by-dev`.

        - __Operator__: Defaults to `<release_name>`.

    - `sourceConfig.pulsar`: Pulsar configurations for the source Milvus. If the source Milvus uses Kafka for message storage, remove all Pulsar-related configurations. For more information, refer to [Pulsar-related Configurations](https://milvus.io/docs/configure_pulsar.md).

    - `sourceConfig.kafka.address`: Kafka address for the source Milvus. Uncomment this configuration if the source Milvus uses Kafka for message storage. For more information, refer to [Kafka-related Configurations](https://milvus.io/docs/configure_kafka.md).

Example configuration:

```yaml
# milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.
sourceConfig:
  # etcd config
  etcdAddress:
    - localhost:2379
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  # default partition name
  defaultPartitionName: _default
  # read buffer length, mainly used for buffering if writing data to milvus-target is slow.
  readChanLen: 10
  # milvus-source mq config, which is pulsar or kafka
  pulsar:
    address: pulsar://localhost:6650
    webAddress: localhost:80
    maxMessageSize: 5242880
    tenant: public
    namespace: default
#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken
#    authParams: token:xxx
#  kafka:
#    address: 127.0.0.1:9092
```

### Compile the Milvus-CDC server

After saving the `cdc.yaml` file, navigate to the `milvus-cdc` directory and run one of the following commands to compile the server:

- For a binary file:

    ```bash
    make build
    ```

- For a Docker image:

    ```bash
    bash build_image.sh
    ```

    For a Docker image, mount the compiled file to `/app/server/configs/cdc.yaml` within the container.

### Start the server

- Using the binary

    Navigate to the directory containing the `milvus-cdc` binary and the `configs` directory with the `cdc.yaml` file, then start the server:

    ```bash
    # dir tree
    .
    ├── milvus-cdc # build from source code or download from release page
    ├── configs
    │   └── cdc.yaml # config for cdc and source milvus
    
    # start milvus cdc
    ./milvus-cdc server
    ```

- Using Docker Compose:

    ```bash
    docker-compose up -d
    ```

