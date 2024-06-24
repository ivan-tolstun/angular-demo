# 1 Project initialization

Using "npm", create a new project with "routing" and "scss" for styles:

```
$ ng new angular-demo

Node.js version v21.2.0 detected.
Odd numbered Node.js versions will not enter LTS status and should not be used for production. For more information, please see https://nodejs.org/en/about/releases/.

? Would you like to add Angular routing? (y/N) y

? Which stylesheet format would you like to use?
CSS
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss              ]
Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
Less   [ http://lesscss.org                                             ]
```

<p>
  The project was created, but it uses an older version of Angular, version 16.
  However, this is a great opportunity to learn how to migrate Angular versions.
  I don't recommend manually changing the version in the "package.json" file.
  Instead, visit the website https://angular.dev/update-guide.
</p>

<p>
  By specifying the desired version there, you will find the migration commands and necessary changes.
  For example:
</p>

<p style="display: flex; flex-wrap: wrap; justify-content: flex-start;  align-items: start;">
  <img src="/readme-data/images/update-guide-1.png" width="400" alt="" style="border: 1px solid black; margin: 0.5rem;">
  <img src="/readme-data/images/update-guide-2.png" width="400" alt="" style="border: 1px solid black; margin: 0.5rem;">
</p>




---

# 2 Loading prime modules

<p> Here, we will use ready-made components from "primeng", "prim-icon", and "prim-flex". </p>

  <ul style="list-style-type: circle;">
    <li>
      Link to the <a href="https://primeng.org/installation">primeng website</a>
    </li>
    <li style="list-style-type: circle;">
      Link to the <a href="https://primeflex.org/installation">prime-flex website</a>
    </li>
    <li style="list-style-type: circle;">
      Link to the <a href="https://primeng.org/icons">primeng-icons website</a>
    </li>
  </ul>

  <p>
    Now we need to install these libraries and add styles for them to our project:
  </p>

  <p>Loading PrimeFlex modules</p>

  ```
  $ npm install primeflex
  ```

  <p>
    After installation you may include the library by importing from node_modules. <br>
    Add the following text to angular.json:
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    ...<br>
    "styles": [<br>
    "/node_modules/primeflex/primeflex.css",<br>
    ...<br>
    ]<br>
  </p>

  <p>Loading PrimeNG modules</p>

  ```
  $ npm install primeng
  ```

  <p>
    Theme and Core styles are the necessary css files of the components,
    visit the Themes section for the complete list of available themes to choose from.
    Styles can either be imported at angular.json file.
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    ...<br>
    "styles": [<br>
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",<br>
    "node_modules/primeng/resources/primeng.min.css",<br>
    ...<br>
    ]<br>
  </p>

  <p>Loading PrimeIcons modules</p>

  ```
  $ npm install primeicons
  ```

  <p>
    CSS file of the icon library needs to be imported in styles.scss of your application.
  </p>
  <p style="background: #dedfdf; padding: 2rem; border-radius: 10px;">
    @import "primeicons/primeicons.css";
  </p>




---

# 3 Core and shared modules

<h5> Core Module </h5>

  <p>
    The core module in Angular is typically used to house essential services that provide global functionalities
    throughout the application.
    It includes:
  </p>

  <ul style="list-style-type: circle;">
    <li>
      <span style="font-weight: bold;">Services: </span> Services that offer global functions, such as authentication, logging, data handling, and more.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">HTTP Interceptors: </span> Interceptors for intercepting and modifying HTTP requests and responses across the application.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Data Models: </span> Shared data models used by various components and services.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Guards: </span> Route guards that protect routes and provide permissions based on conditions like user authentication.
    </li>
  </ul>

  <h5> Shared Module </h5>

  <p>
    The shared module in Angular is designed to store components, directives, pipes,
    and other resources that can be used across different parts of the application, promoting code reusability
    and reducing duplication.
    It typically includes:
  </p>

  <ul style="list-style-type: circle;">
    <li>
      <span style="font-weight: bold;">Shared Components:</span> Components used in various parts of the application, such as buttons, modals, forms, etc.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Shared Directives: </span> Directives that add additional functionality to HTML elements,
      such as form validation directives, animations, etc.
    </li>
    <li style="list-style-type: circle;">
      <span style="font-weight: bold;">Shared Pipes: </span> Pipes that format data for display in different parts of the application.
    </li>
  </ul>

  <p>
    Core and shared modules in Angular help structure and organize application code, making it more maintainable,
    scalable, and reusable. These modules contribute to improved application architecture and reduced
    coupling between different parts of the application.
  </p>





---

