# Laravel and React Full-stack App Exercise

The exercise is based on the tutorial ["React + Laravel Full-stack Application | Build and Deploy"](https://youtu.be/qJq9ZMB2Was) provided by [TheCodeholic](https://thecodeholic.com/) on YouTube.

## Deploy the dependencies

### Get Composer

First [download](https://getcomposer.org/download/) `composer.phar`, then you can move it somewhere in your `$PATH` or use it as local executable, e.g. `php composer.phar` or `./composer.phar --version`. In my case I moved it to **`~/composer`**.

In order to get the list of [the global envvars of composer](https://stackoverflow.com/q/30664220/6543935), run `composer config --list --global`, of to get the location of the binaries run `composer global config bin-dir --absolute`.

### Install Laravel Installer and Check System Requirements

Run `composer global require laravel/installer` to install the [Laravel Installer](https://laravel.com/docs/installation#installing-laravel).

The Laravel framework has a few [system requirements](https://laravel.com/docs/deployment#server-requirements) you need to satisfy them before installing it.

## Install Laravel within the Project

Run **`laravel new laravel-app`** to install Laravel within the project. Note that the project name is `laravel-app` and it is not possible to install it in already existing directory which is not empty, but the current GitHub repository was previously initialized...

## MySQL Enable, Create or Remove Database

<details>

<summary>
In the directory [`scripts/sql`](scripts/sql/) are available two manual like SQL files. We can suppress the comments and use them as SQL scrips to create or remove the `db_name` and `db_admin` MySQL database and user used in this tutorial.
</summary>

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
-e 's/strong-password/strong-password/g' \
scripts/sql/mariadb_db_create.sql | sudo mysql # scripts/sql/mysql_db_create.sql | sudo mysql
```

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
scripts/sql/db_remove.sql | sudo mysql
```

</details>

## References

- [Laravel](https://laravel.com/)
- [Composer Download](https://getcomposer.org/download/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
