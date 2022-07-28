---
id: deploy_etcd.md
title: Configure Meta Storage with Docker Compose/Helm
related_key: S3, storage
summary: Learn how to set up meta storage for Milvus using Docker Compose/Helm.
---

# Configure Meta Storage with Docker Compose/Helm

Milvus uses etcd for storing metadata. This topic introduces how to configure etcd with Docker Compose or Helm.

## Configure with Docker Compose

### 1. Configure etcd

To set up etcd with Docker Compose, provide your values for the `etcd` section in the `milvus.yaml` file on the milvus/configs path.

```
etcd:
  endpoints:
    - localhost:2379
  rootPath: by-dev # The root path where data is stored in etcd
  metaSubPath: meta # metaRootPath = rootPath + '/' + metaSubPath
  kvSubPath: kv # kvRootPath = rootPath + '/' + kvSubPath
  log:
    # path is one of:
    #  - "default" as os.Stderr,
    #  - "stderr" as os.Stderr,
    #  - "stdout" as os.Stdout,
    #  - file path to append server logs to.
    # please adjust in embedded Milvus: /tmp/milvus/logs/etcd.log
    path: stdout
    level: info # Only supports debug, info, warn, error, panic, or fatal. Default 'info'.
  use:
    # please adjust in embedded Milvus: true
    embed: false # Whether to enable embedded Etcd (an in-process EtcdServer).
  data:
    # Embedded Etcd only.
    # please adjust in embedded Milvus: /tmp/milvus/etcdData/
    dir: default.etcd
```

See [etcd-related Configurations](configure_etcd.md) for more information.

### 2. Run Milvus

Run the following command to start Milvus that uses the etcd configurations.

```
docker-compose up
```

<div class="alert note">Configurations only take effect after Milvus starts. See <a herf=https://milvus.io/docs/v2.0.0/install_cluster-docker.md#2-Start-Milvus>Start Milvus</a> for more information.</div>

## Set up on K8s

For Milvus clusters on K8s, you can configure etcd in the same command that starts Milvus. Alternatively, you can configure etcd using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring etcd in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>externaletcd.enabled</code>    | Enables or disables S3.     | <code>true</code>/<code>false</code> |
| <code>externalS3.endpoints</code>       | The endpoint to access S3.    |                                      |



### Using the YAML file

1. Configure the <code>externaletcd</code> section using your values in the <code>values.yaml</code> file.

```yaml
externalEtcd:
  enabled: true
  ## the endpoints of the external etcd
  ##
  endpoints:
    - localhost:2379
```

3. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the etcd configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
### Using a command

To install Milvus and configure etcd, run the following command using your values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set externaletcd.enabled=true 
```
