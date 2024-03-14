---
id: deploy_etcd.md
title: Configure Meta Storage with Docker Compose or Helm
related_key: S3, storage
summary: Learn how to configure meta storage for Milvus with Docker Compose/Helm.
---

# Configure Meta Storage with Docker Compose or Helm

Milvus uses etcd for storing metadata. This topic introduces how to configure etcd with Docker Compose or Helm.

## Configure etcd with Docker Compose

### 1. Configure etcd

To configure etcd with Docker Compose, provide your values for the `etcd` section in the `milvus.yaml` file on the milvus/configs path.

```
etcd:
  endpoints:
    - localhost:2379
  rootPath: by-dev # The root path where data are stored in etcd
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
docker compose up
```

<div class="alert note">Configurations only take effect after Milvus starts. See <a href=https://milvus.io/docs/install_standalone-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>

## Configure etcd on K8s

For Milvus clusters on K8s, you can configure etcd in the same command that starts Milvus. Alternatively, you can configure etcd using the <code>values.yml</code> file on the /charts/milvus path in the [milvus-helm](https://github.com/milvus-io/milvus-helm) repository before you start Milvus.

 The following table lists the keys for configuring etcd in the YAML file.
| Key             | Description                          | Value                                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| <code>etcd.enabled</code>           | Enables or disables etcd.          | <code>true</code>/<code>false</code> |
| <code>externalEtcd.enabled</code>   | Enables or disables external etcd. | <code>true</code>/<code>false</code> |
| <code>externalEtcd.endpoints</code> | The endpoint to access etcd.       |                                      |



### Using the YAML file

1. Configure the <code>etcd</code> section using your values in the <code>values.yaml</code> file.

```yaml
etcd:
  enabled: false
```

2. Configure the <code>externaletcd</code> section using your values in the <code>values.yaml</code> file.

```yaml
externalEtcd:
  enabled: true
  ## the endpoints of the external etcd
  endpoints:
    - <your_etcd_IP>:2379
```

3. After configuring the preceding sections and saving the <code>values.yaml</code> file, run the following command to install Milvus that uses the etcd configurations.

```shell
helm install <your_release_name> milvus/milvus -f values.yaml
```
### Using a command

To install Milvus and configure etcd, run the following command using your values.

```shell
helm install <your_release_name> milvus/milvus --set cluster.enabled=true --set etcd.enabled=false --set externaletcd.enabled=true --set externalEtcd.endpoints={<your_etcd_IP>:2379}
```

## What's next

Learn how to configure other Milvus dependencies with Docker Compose or Helm:

- [Configure Object Storage with Docker Compose or Helm](deploy_s3.md)
- [Configure Message Storage with Docker Compose or Helm](deploy_pulsar.md)
