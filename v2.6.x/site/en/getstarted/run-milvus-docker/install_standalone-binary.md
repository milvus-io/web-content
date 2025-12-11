---
id: install_standalone-binary.md
label: "RPM/DEB Package"
related_key: "RPM/DEB Package"
summary: Learn how to install Milvus standalone with a pre-built RPM/DEB package.
title: Install Milvus Standalone with RPM/DEB Package
---

# Install Milvus Standalone with RPM/DEB Package

This page illustrates how to install Milvus standalone with a pre-built RPM/DEB package.

## Prerequisites

- You have already installed libstdc++ 8.5.0 or a later version.
- [Check the requirements for hardware and software](prerequisite-docker.md) prior to your installation.

## Download the RPM/DEB Package

You can download the RPM/DEB package according to your system architecture from the [Milvus Releases page](https://github.com/milvus-io/milvus/releases/tag/v2.6.7).

- For x86_64/amd64, download the **milvus_2.6.6-1_amd64.deb** or **milvus_2.6.6-1_amd64.rpm** package.
- For ARM64, download the **milvus_2.6.6-1_arm64.deb** or **milvus_2.6.6-1_arm64.rpm** package.

The following command assumes that you are going to run Milvus Standalone on a x86_64/amd64 machine.

```shell
wget https://github.com/milvus-io/milvus/releases/download/v2.6.7/milvus_2.6.6-1_amd64.rpm -O milvus_2.6.6-1_amd64.rpm
```

## Install the RPM/DEB Package

To install the RPM/DEB package, you can use the package manager of your system.

For RPM-based systems (such as CentOS, Fedora, and RHEL), use the `yum` command to install the package.

```shell
yum install -y ./milvus_2.6.6-1_amd64.rpm
rpm -qa| grep milvus
```

For DEB-based systems (such as Ubuntu and Debian), use the `apt` command to install the package.

```shell
apt install -y  ./milvus_2.6.6-1_amd64.deb
dpkg -l | grep milvus
```

## Start Milvus Standalone

After the installation is complete, Milvus is installed as a systemd service and can be started using the following command:

```shell
systemctl start milvus
```

You can check the status of the Milvus service using the following command:

```shell
systemctl status milvus
```

If Milvus is running successfully, you should see the following output:

```
● milvus.service - Milvus Standalone Server
   Loaded: loaded (/lib/systemd/system/milvus.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2025-08-10 10:30:00 UTC; 5s ago
 Main PID: 1044122 (milvus)
    Tasks: 10 (limit: 4915)
   CGroup: /system.slice/milvus.service
           └─1044122 /usr/bin/milvus run standalone
```

You can find the Milvus binary at `/usr/bin/milvus`, the systemd service file at `/lib/systemd/system/milvus.service`, and the dependencies at `/usr/lib/milvus/`.

## (Optional) Update Milvus configurations

You can modify the Milvus configurations in the `/etc/milvus/configs/milvus.yaml` file. For example, to change the `proxy.healthCheckTimeout` to `1000` ms, you can search for the target parameter and modify accordingly. For applicable configuration items, refer to [System Configuration](system_configuration.md).

## Stop Milvus Standalone

To stop Milvus Standalone, you can use the following command:

```shell
systemctl stop milvus
```

## Uninstall Milvus Standalone

To uninstall Milvus Standalone, you can use the following command:

For RPM-based systems:

```shell
rpm -e milvus
```

For DEB-based systems:

```shell
apt remove milvus
```

## What's next

Having installed Milvus Standalone, you can:

- Check [Quickstart](quickstart.md) to see what Milvus can do.

- Learn the basic operations of Milvus:
  - [Manage Databases](manage_databases.md)
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- [Upgrade Milvus Using Helm Chart](upgrade_milvus_cluster-helm.md).
- [Scale your Milvus cluster](scaleout.md).
- Deploy your Milvu cluster on clouds:
  - [Amazon EKS](eks.md)
  - [Google Cloud](gcp.md)
  - [Microsoft Azure](azure.md)
- Explore [Milvus WebUI](milvus-webui.md), an intuitive web interface for Milvus observability and management.
- Explore [Milvus Backup](milvus_backup_overview.md), an open-source tool for Milvus data backups.
- Explore [Birdwatcher](birdwatcher_overview.md), an open-source tool for debugging Milvus and dynamic configuration updates.
- Explore [Attu](https://github.com/zilliztech/attu), an open-source GUI tool for intuitive Milvus management.
- [Monitor Milvus with Prometheus](monitor.md).