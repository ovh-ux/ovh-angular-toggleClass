![OVH components](githubBanner.png)

# ovh-angular-toggleClass [![Chat on gitter](https://img.shields.io/gitter/room/ovh/ux.svg)](https://gitter.im/ovh/ux) 

Simple service need to run ovh control panel

[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]() [![Build Status](https://travis-ci.org/ovh/ovh-angular-toggleClass.svg)](https://travis-ci.org/ovh/ovh-angular-toggleClass)

[![NPM](https://nodei.co/npm/ovh-angular-toggleclass.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ovh-angular-toggleclass/)

```javascript
angular.module("myApp", [" ovh-angular-toggleClass"]);
```
```HTML
<!-- SIDEBAR SHOW -->
<toggle-class class="navbar-button pull-left"
    data-toggle-class-group="navGroup"
    data-toggle-class-target="#sidebar-menu"
    data-toggle-class-target-backdrop="#full-overlay"
    data-toggle-class-name="nav-open"
    data-toggle-class-trigger-close="#full-overlay, .sideNavBtnClose">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
</toggle-class>
<!-- UNIVERSE CHOICES -->
<toggle-class class="navbar-button pull-right"
    data-toggle-class-group="navGroup"
    data-toggle-class-target="#navbar-account"
    data-toggle-class-target-backdrop="#full-overlay"
    data-toggle-class-name="nav-open"
    data-toggle-class-trigger-close="#full-overlay"
    data-toggle-class-click=toggleNavbarStatus("navbar-account")>
    <span class="glyphicon glyphicon-user"></span>
</toggle-class>
<!-- USER MENU -->
<toggle-class class="navbar-button pull-right"
    data-toggle-class-group="navGroup"
    data-toggle-class-target="#navbar-univers"
    data-toggle-class-target-backdrop="#full-overlay"
    data-toggle-class-name="nav-open"
    data-toggle-class-trigger-close="#full-overlay"
    data-toggle-class-click=toggleNavbarStatus("navbar-univers")>
    <span class="glyphicon glyphicon-globe"></span>
</toggle-class>
```

# Installation

## Bower

    bower install ovh-angular-toggleclass --save

## NPM

    npm install ovh-angular-toggleclass --save

## Get the sources

```bash
    git clone https://github.com/ovh/ovh-angular-toggleClass.git
    cd  ovh-angular-toggleClass
    npm install
    bower install
```

You've developed a new cool feature? Fixed an annoying bug? We'd be happy
to hear from you!

Have a look in [CONTRIBUTING.md](https://github.com/ovh-ux/ovh-angular-toggleClass/blob/master/CONTRIBUTING.md)

## Run the tests

```
npm test
```

# Related links

 * Contribute: https://github.com/ovh/ovh-angular-toggleClass
 * Report bugs: https://github.com/ovh/ovh-angular-toggleClass/issues
 * Get latest version: https://github.com/ovh-ux/ ovh-angular-toggleClass

# License

See https://github.com/ovh/ovh-angular-toggleClass/blob/master/LICENSE
