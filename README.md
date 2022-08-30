# Nueva Era Music Store

Proyecto integrador realizado en la escuela de programacion Digital House. El desarrollo de este proyecto estara dividido en 8 sprints que abarcarán la totalidad de las temáticas del curso.

## Integrantes

**Federico Nicolás Craviotto** - "Tengo 30 años, vivo en Buenos Aires, Argentina. Ejerzo como abogado desde hace ya unos años, y ahora me dedico tiempo completo a estudiar desarrollo web, con la intención de trabajar como FullStack en un futuro."

**Leonardo Turzi** - "Tengo 30 años, vivo en Buenos Aires, Argentina. Soy Ingeniero, siempre me gusto la idea de encontrar soluciones que posibiliten la automatizacion de tareas, siempre buscando la forma mas facil de lograr los mejores resultados."

## Contenido

- [Sprint 1](#sprint-1)
  - [Objetivos](#sprint-1---objetivos)
  - [Entrega](#sprint-1---entrega)
- [Sprint 2](#sprint-2)
  - [Objetivos](#sprint-2---objetivos)
  - [Entrega](#sprint-2---entrega)
- [Sprint 3](#sprint-3)
  - [Objetivos](#sprint-3---objetivos)
  - [Entrega](#sprint-3---entrega)
- [Sprint 4](#sprint-4)
- [Sprint 5](#sprint-5)
- [Sprint 6](#sprint-6)
- [Sprint 7](#sprint-7)
- [Sprint 8](#sprint-8)

## Sprint 1

### Sprint 1 - Objetivos

[![sprint-1.png](https://i.postimg.cc/tT8hpXMV/sprint-1.png)](https://postimg.cc/KkrK5yFZ)

#### Entregables

##### Informativo

- Temática del sitio y público objetivo.
- Listado de al menos 5 referentes.

##### Wireframes

- Home
- Detalle de producto
- Carrito de compras
- Formulario de registro
- Formulario de login

#### Opcional

- Boceto o diseño gráfico del sitio (logo, colores, tipografías, etc).

### Sprint 1 - Entrega

#### Tematica del sitio

Venta de intrumentos y accesorios musicales

#### Sitios de referencia

1. *https://musicplace.themerex.net/product-category/band-orchestra/*
2. *https://www.hoffmannmusica.com.ar/*
3. *https://www.bestmusic.com.ar/*
4. *https://www.mercadolibre.com.ar/*
5. &https://www.housemusic.com.ar/*

- El display de los desplegables del nav. Los filtros disponibles\*
- El modal que brinda la información del pago para cada tarjeta, cuotas, costo de financiación.\*
- La disposición y la claridad en el detalle del producto\*
- Lo completa y bien hecha que está la página del marketplace número 1 de Latino America\*
- La prolijidad, la estética y la onda rockera del sitio.\*

#### Wireframes

Los wireframes pueden ser visualizados en la carpeta [wireframes](https://github.com/leoturzi/proyecto_integrador/tree/dev/design/wireframes) dentro de la carpeta design, aca van a encontrar wireframes tanto para visualizacion mobile como desktop.

#### Opcional

En base a las ideas planteadas y los sitios de referencia, nos animamos a generar un boceto de como deberia verse nuestro sitio(version mobile). El mismo puede ser visualizado en el siguiente [link](https://www.figma.com/file/jNu47ClKdRs5qZmaQTREZY/Digital-House?node-id=0%3A1)

[![Screenshot-2022-07-26-065944.png](https://i.postimg.cc/CM7wMS0X/Screenshot-2022-07-26-065944.png)](https://postimg.cc/SjnBD0Jf)

-----------------------------------

## Sprint 2

### Sprint 2 - Objetivos

[![image.png](https://i.postimg.cc/mknRhXf0/image.png)](https://postimg.cc/jnyBFhjX)

#### Entregables

##### Informativo

- Archivo retro.md
- Enlace al tablero de trabajo en el archivo README.md.

##### Aplicacion Node.js+Express

- Home (index.html)
- Detalle del producto (productDetail.html)
- Carrito de compras (productCart.html)
- Formulario de registro (register.html)
- Formulario de login (login.html)

----------------------------------------

## Sprint 3

### Sprint 3 - Objetivos

[![Sprint-3-Template-engines-img.jpg](https://i.postimg.cc/d3bq92Vw/Sprint-3-Template-engines-img.jpg)](https://postimg.cc/1VKhmNFj)

- Reutilizar partials (header, menú, footer, nav, etc.)
- Mostrar el contenido dinámicamente a través de un motor de templates (Express + EJS)

### Entregables

##### Informativo

- Archivo retro.md
- Enlace al tablero de trabajo actualizado en el archivo README.md.

##### Motor de templates

- Sitio actualizado con todas las vistas y rutas implementando el template engine:
  - Implementar el módulo EJS, actualizar la extensión de los archivos de vistas;
  - Modificar los controladores para que utilicen el método *render()*;
  - Implementación de partials o áreas comunes del sitio.

##### Reestructuración de directorios y archivos de vistas (opcional)

- Separar las vistas en carpetas para una mejor organización y proyección de escalabilidad del sitio:
  - Usuarios: src/views/users
  - Productos: src/views/products

##### Páginas de creación y edición de productos

- Formulario al que accede el usuario administrador para cargar nuevos productos y
editar los existentes
- Ejemplo de estructura:
  - Nombre del producto ( name )
  - Descripción ( description )
  - Imagen ( image )
  - Categoría ( category )
  - Colores (o cualquier otro campo similar como: tamaños, talles, etc)
  - Precio ( price )


-------------------