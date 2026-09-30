---
id: use-pulsar-v2.md
related_key: use pulsar v2 with milvus v2.5.x
summary: Milvus recommands you to upgrade Pulsar to v3 for Milvus v2.5.x. However, if you prefer to use Pulsar v2, this article will guide you through the steps to continue using Pulsar v2 with Milvus v2.5.x.
title: Use Pulsar v2 with Milvus v2.5.x
---

# Use Pulsar v2 with Milvus v2.5.x

Milvus recommands you to upgrade Pulsar to v3 for running Milvus v2.5.x. For details, refer to [Upgrade Pulsar](upgrade-pulsar-v3.md). However, if you prefer to use Pulsar v2 with Milvus v2.5.x, this article will guide you through the procedure for running Milvus v2.5.x with Pulsar v2.

If you already have a running Milvus instance and want to upgrade it to v2.5.x but continue using Pulsar v2, you can follow the steps on this page.

## Continue using Pulsar v2 while upgrading Milvus v2.5.x

This section will guide you through the steps to continue using Pulsar v2 while upgrading your running Milvus instance to Milvus v2.5.x.

### For Milvus Operator users

Milvus Operator is compatible with Pulsar v2 upgrades by default. You can upgrade your Milvus instance to v2.5.x by referring to [Upgrade Milvus Cluster with Milvus Operator](upgrade_milvus_cluster-operator.md).

Once the upgrade is complete, you can continue using Pulsar v2 with your Milvus instance.

### For Helm users

Before the upgrade, ensure that

- Your Helm version is above v3.12, and the latest version is recommanded.

  For more information, refer to [Install Helm](https://helm.sh/docs/intro/install/).

- Your Kubernetes veresion is above v1.20.

Operations in this article assumes that:

- Milvus has been installed in the `default` namespace.

- The release name of Milvus is `my-release`.

You need to change the `values.yaml` file to specify the Pulsar version as v2 before upgrading Milvus. The steps are as follows:

1. Get the current `values.yaml` file of your Milvus instance.

   ```bash
   namespace=default
   release=my-release
   helm -n ${namespace} get values ${release} -o yaml > values.yaml
   cat values.yaml
   ```

2. Edit the `values.yaml` file to specify the Pulsar version as v2.

    ```yaml
    # ... omit existing values
    pulsar:
      enabled: true
    pulsarv3:
      enabled: false
    image:
      all:
        repository: milvusdb/milvus
        tag: v2.5.0-beta 
    ``` 

    For `image`, change the `tag` to the desired Milvus version (e.g. `v2.5.0-beta`).

3. Update Milvus Helm chart.

   ```bash
   helm repo add milvus https://zilliztech.github.io/milvus-helm
   helm repo update milvus
   ```

4. Upgrade Milvus instance.

   ```bash
   helm -n $namespace upgrade $releaase milvus/milvus -f values.yaml
   ```

## Creating a new Milvus instance with Pulsar v2

This section will guide you through the steps to create a new Milvus instance with Pulsar v2.

### For Milvus Operator users

Before you deploy Milvus v2.5.x, you need to download and edit the Milvus Customer Resource Definition (CRD) file. For details on how to install Milvus using Milvus Operator, refer to [Install Milvus Cluster with Milvus Operator](install_cluster-milvusoperator.md).

1. Download the CRD file.

   ```bash
   wget https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
   ```

2. Edit the `milvus_cluster_default.yaml` file to specify the Pulsar version as v2.

   ```yaml
   apiVersion: milvus.io/v1beta1
   kind: Milvus
   metadata:
     name: my-release
     namespace: default
     labels:
       app: milvus
   spec:
     mode: cluster
     dependencies:
       pulsar:
         inCluster:
           chartVersion: pulsar-v2
   ```

    For `dependencies`, change the `pulsar.inCluster.chartVersion` to `pulsar-v2`.

3. Continue with the steps in [Install Milvus Cluster with Milvus Operator](https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus) to deploy Milvus v2.5.x with Pulsar v2 using the edited CRD file.

    ```bash
    kubectl apply -f milvus_cluster_default.yaml
    ```

### For Helm users

Before you deploy Milvus v2.5.x, you can either prepare a `values.yaml` file or use the inline parameters to specify the Pulsar version. For details on how to install Milvus using Helm, refer to [Install Milvus Cluster with Helm](install_cluster-helm.md).

- Use inline parameters to specify the Pulsar version as v2.

  ```bash
  helm install my-release milvus/milvus --set pulsar.enabled=true,pulsarv3.enabled=false
  ```

- Use a `values.yaml` file to specify the Pulsar version as v2.

  ```yaml
  pulsar:
    enabled: true
  pulsarv3:
    enabled: false
  ```

  Then, deploy Milvus v2.5.x with Pulsar v2 using the `values.yaml` file.

  ```bash
  helm install my-release milvus/milvus -f values.yaml
  ```   
