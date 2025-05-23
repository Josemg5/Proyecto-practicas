<!--


-->

<template>
  <div class="app">
    <h1>Bienvenido al Menú de Electrónica</h1>

    <div class="contenedor">
      <div class="opcion">
        <!-- ENLACE QUE ABRE categorias.html -->
        <a href="categorias.html" target="_self">Ver Categorías</a>
        <img src="/categoria.png" alt="Imagen Categorías" />
      </div>

      <div class="opcion">
        <!-- ENLACE QUE ABRE componentes.html -->
        <a href="componentes.html" target="_self">Ver Componentes</a>
        <img src="/componentes.png" alt="Imagen Componentes" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

body {
  background-image: url('imagen_fondo.png');
  background-repeat: repeat;
  background-size: auto;
  color: white;
  font-family: Arial, sans-serif;
}

body::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('imagen_fondo.png');
  background-repeat: repeat;
  background-size: auto;
  filter: blur(1.5px) brightness(0.7);
  z-index: -1;
}

.app {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0,0,0,0);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.9);
  text-align: center;
}

.contenedor {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
}

.opcion {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
}

.opcion a {
  display: block;
  margin-bottom: 10px;
  padding: 15px 30px;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  text-decoration: none;
  font-size: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  transition: background-color 0.3s;
  font-weight: bold;
  text-align: center;
}

.opcion a:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
  box-shadow: 2px 2px 12px rgba(255, 255, 255, 0.7);
}

.opcion img {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
}
</style>
