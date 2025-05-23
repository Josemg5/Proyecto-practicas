<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">{{ componentTitle }}</h1>

    <div v-if="loading" class="text-gray-700">Cargando componentes...</div>
    <div v-else-if="error" class="text-red-600">⚠️ {{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="comp in componentes"
        :key="comp.id"
        class="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
      >
        <h2 class="text-xl font-semibold text-green-600">{{ comp.nombre }}</h2>
        <p class="text-sm text-gray-500">ID: {{ comp.id }}</p>
        <p class="text-sm text-gray-600">Categoría ID: {{ comp.categoriaId }}</p>
        <p class="text-sm text-gray-700 mt-2">Descripción: {{ comp.descripcion }}</p>
        <p class="text-sm text-gray-700">Precio: {{ comp.precio }} €</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

console.log('✅ LOG 1: <script setup> en ComponentesView.vue ejecutado.');

const componentTitle = ref('Vista de Componentes');
const componentes = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchComponentes = async () => {
  console.log('🔄 LOG 2: Iniciando fetchComponentes()...');
  loading.value = true;
  error.value = null;
  componentes.value = [];

  try {
    const apiUrl = 'http://localhost:3000/api/componentes';
    console.log('🌐 LOG 3: Realizando petición GET a', apiUrl);
    const response = await axios.get(apiUrl);
    console.log('📦 LOG 4: Datos recibidos:', response.data);
    if (!Array.isArray(response.data)) {
      throw new Error('La respuesta no es un array.');
    }
    componentes.value = response.data;
  } catch (err) {
    console.error('❌ LOG 5: Error en fetchComponentes:', err);
    error.value = `Error al cargar los componentes: ${err.message}`;
  } finally {
    loading.value = false;
    console.log('✅ LOG 6: fetchComponentes finalizado.');
  }
};

onMounted(() => {
  console.log('🚀 LOG 7: onMounted() ejecutado.');
  fetchComponentes();
});
</script>

<style scoped>
/* Puedes personalizar más aquí si no usas Tailwind */
</style>
