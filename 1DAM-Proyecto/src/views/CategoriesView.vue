<template>
  <div class="categories-view-container">
    <h1>{{ componentTitle }}</h1>

    <div v-if="loading" class="alert alert-info">Cargando lista de categorías...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <ul v-if="!loading && !error && categories.length > 0">
      <li v-for="category in categories" :key="category.id">
        {{ category.nombre }}
      </li>
    </ul>
    <p v-if="!loading && !error && categories.length === 0 && !fetchCategoriesStartMessage">
      Aún no se ha intentado cargar categorías.
    </p>
    <p v-if="!loading && !error && categories.length === 0 && fetchCategoriesStartMessage">
      No hay categorías para mostrar (o la carga falló y la lista está vacía).
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

axios.get('/api/categorias') // SIN localhost:3000

console.log('LOG 1: <script setup> en CategoriesView.vue se está ejecutando.')

const componentTitle = ref('Vista de Categorías')
const initialSetupMessage = ref('LOG 1: <script setup> en CategoriesView.vue se está ejecutando.')
const onMountedMessage = ref('')
const fetchCategoriesStartMessage = ref('')

const categories = ref([])
const loading = ref(true) // Empezamos asumiendo que vamos a cargar
const error = ref(null)

console.log('LOG 2: Refs inicializadas en CategoriesView.vue.')

const fetchCategories = async () => {
  console.log('LOG 4: fetchCategories() iniciada.')
  fetchCategoriesStartMessage.value = 'LOG 4: fetchCategories() iniciada.'
  loading.value = true
  error.value = null
  categories.value = [] // Limpiamos por si acaso

  try {
    const apiUrl = 'http://localhost:3000/api/categorias' // Asegúrate que esta URL es correcta
    console.log('LOG 5: Intentando GET a', apiUrl)
    const response = await axios.get(apiUrl)
    console.log('LOG 6: Respuesta API:', response.data)
    categories.value = response.data // Asume que response.data es el array
    // Ajusta si es response.data.data o similar
    if (!Array.isArray(categories.value)) {
      console.error('LOG 7: categories.value NO es un array!', categories.value)
      error.value = 'Formato de datos incorrecto recibido del servidor.'
      categories.value = []
    } else {
      console.log('LOG 7: categories.value asignado:', categories.value)
    }
  } catch (err) {
    console.error('LOG 8: ERROR en fetchCategories:', err.response || err.message || err)
    error.value = `Error al cargar categorías: ${err.message}`
  } finally {
    loading.value = false
    console.log('LOG 9: fetchCategories() finalizada. Loading:', loading.value)
  }
}

onMounted(() => {
  console.log('LOG 3: onMounted() hook disparado en CategoriesView.vue.')
  onMountedMessage.value = 'LOG 3: onMounted() hook disparado.'
  fetchCategories()
})
</script>

<style scoped>
.categories-view-container {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
}
.alert {
  margin-top: 10px;
}
</style>
