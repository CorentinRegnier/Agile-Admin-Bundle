Agile Admin Bundle (SF3)
==================

## 1° - Install bundle
 
- Add in your composer.json my satis URL

```json
{
    "name": "Your project name",
    ...
    "repositories": [
        {
            "type": "composer",
            "url": "https://satis.corentinregnier.fr"
        }
    ],
    "require": {
      ...
    },
    ...
}
```


- Run this command to add the bundle:

```$ composer require cregnier/agile-admin-bundle```

- And add in your AppKernel the dependence:

```PHP
<?php
...

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = [
            ...
            new AgileAdminBundle\AgileAdminBundle(),
        ];
        ...
    }
    ...
}
```

## 2° - Configuration

- Create a controller in AppBundle/Controller/Admin and add in app/config/routing.yml

```PHP
<?php

namespace AppBundle\Controller\Admin;

use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DefaultController
 */
class DefaultController extends Controller
{
    /**
     * @Route("/", name="admin_homepage")
     * @Method({"GETROLE_SUPER_ADMIN"})
     *
     * @return Response
     */
    public function indexAction()
    {
        return $this->render('admin/default/index.html.twig');
    }
}

```
- Create the corresponding view to overwrite blocks in the layout

```twig
{% extends 'AgileAdminBundle::layout.html.twig' %}
```

```yaml
admin:
    resource: "@AppBundle/Controller/Admin"
    prefix: /admin
    type:     annotation
```

- In app/config/config.yml add a parameter and put it in global variable twig

```yaml
parameters:
   agile.project_title: Immo
twig:
    globals:
        agile:
            project_title: "%agile.project_title%"
```

- In your assets add the references of plugins and admin theme (js and sass) i advise you to use gulp for compile its

```yaml
assets:
    admin:
        - jquery-1.11.3.min.js
        - bootstrap.min.js
        - ../../../../../vendor/cregnier/agile-admin-bundle/Resources/plugins/jQueryUI/jquery-ui.js
        - ../../../../../vendor/cregnier/agile-admin-bundle/Resources/js/admin-theme.js
        - admin.js
#      And more plugins in ../../../../../vendor/cregnier/agile-admin-bundle/Resources/plugins/
```

```sass
//== Add theme and skin color 
//== Skins are in '../../../../vendor/cregnier/agile-admin-bundle/Resources/sass/skins/
@import '../../../../vendor/cregnier/agile-admin-bundle/Resources/sass/AdminLTE';
@import '../../../../vendor/cregnier/agile-admin-bundle/Resources/sass/skins/skin-black';
```
- For security add in app/config/security.yml

```yaml
access_control:
    - { path: ^/admin$, roles: YOUR_ROLE }
```   
