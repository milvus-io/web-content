---
id: authenticate.md
summary: Learn how to manage user authentication in Milvus.
title: Authenticate User Access
---

# Authenticate User Access

This guide explains how to manage user authentication in Milvus, including enabling authentication, connecting as a user, and modifying user credentials.

<div class="alert note">

- TLS and user authentication are two distinct security approaches. If you have enabled both user authentication and TLS in your Milvus system, you must provide a username, password, and certificate file paths. For information on how to enable TLS, refer to [Encryption in Transit](tls.md).

- The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Enable user authentication

<div class="filter">
  <a href="#docker">Docker Compose</a>
  <a href="#helm">Helm</a>
</div>

<div class="filter-docker">

To enable user authentication for your Milvus server, set common.security.authorizationEnabled to true in the Milvus config file `milvus.yaml`. For more information on configs, refer to [Configure Milvus with Docker Compose](https://milvus.io/docs/configure-docker.md?tab=component).

```yaml
...
common:
...
  security:
    authorizationEnabled: false
...
```

</div>

<div class="filter-helm">

To enable user authentication for your Milvus server, set authorizationEnabled to true in the Milvus config file `values.yaml`. For more information on configs, refer to [Configure Milvus with Helm Charts](https://milvus.io/docs/configure-helm.md?tab=component).

```yaml
...
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        authorizationEnabled: true
...
```

</div>

## Connect to Milvus with authentication

After enabling authentication, you need to connect to Milvus using a username and password. By default, the `root` user is created with the password `Milvus` when Milvus is initiated. Here is an example of how to connect to Milvus with authentication enabled using the default `root` user:

```python
# use default `root` user to connect to Milvus

from pymilvus import MilvusClient

client = MilvusClient(
    uri='http://localhost:19530', # replace with your own Milvus server address
    token="root:Milvus"
) 
```

<div class="alert note">
If you fail to provide a valid token when connecting to Milvus with authentication enabled, you will receive a gRPC error.
</div>


## Create a new user

Once connected as the default `root` user, you can create and authenticate a new user as follows:

```python
# create a user
client.create_user(
    user_name="user_1",
    password="P@ssw0rd",
)

# verify the user has been created

client.describe_user("user_1")

# output
# {'user_name': 'user_1', 'roles': ()}
```

For more information on creating users, refer to [create_user()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md).

    
## Connect to Milvus with a new user

Connect using the credentials of the newly created user:

```python
# connect to milvus with the newly created user

client = MilvusClient(
    uri="http://localhost:19530",
    token="user_1:P@ssw0rd"
)
```

## Update user password

Change the password for an existing user with the following code:

```python
# update password

client.update_password(
    user_name="user_1",
    old_password="P@ssw0rd",
    new_password="P@ssw0rd123"
)
```

For more information on updating user passwords, refer to [update_password()](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md).

If you forget your old password, Milvus provides a configuration item that allows you to designate certain users as super users. This eliminates the need for the old password when you reset the password.

By default, the `common.security.superUsers` field in the Milvus configuration file is empty, meaning that all users must provide the old password when resetting their password. However, you can designate specific users as super users who do not need to provide the old password. In the snippet below, `root` and `foo` are designated as super users.

You should add the below configuration item in the Milvus configuration file that governs the running of your Milvus instance.

```yaml
common:
    security:
        superUsers: root, foo
```

## Drop a user

To drop a user, use the `drop_user()` method.

```python
client.drop_user(user_name="user_1")
```

<div class="alert note">
To drop a user, you cannot be the user being dropped. Otherwise, an error will be raised.
</div>

## List all users

List all the users.

```python
# list all users

client.list_users()
```

## Limitations

1. Username must not be empty, and must not exceed 32 characters in length. It must start with a letter, and only contains underscores, letters, or numbers.
2. Password must have at least 6 characters and must not exceed 256 characters in length.

## What's next
- You might also want to learn how to:
  - [Scale a Milvus cluster](scaleout.md)
- If you are ready to deploy your cluster on clouds:
  - Learn how to [Deploy Milvus on AWS with Terraform and Ansible](aws.md)
  - Learn how to [Deploy Milvus on Amazon EKS with Terraform](eks.md)
  - Learn how to [Deploy Milvus Cluster on GCP with Kubernetes](gcp.md)
  - Learn how to [Deploy Milvus on Microsoft Azure With Kubernetes](azure.md)
