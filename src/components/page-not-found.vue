<script>

export default {
  name:"page-not-found",
  methods: {
    redirectToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
}

</script>

<template>
  <div class="not-found">
    <label class="message">Ruta no encontrada</label>
    <button @click="redirectToHome" class="centered-button">Volver</button>
  </div>
</template>


<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.message {
  font-size: 24px;
  margin-bottom: 20px;
}

.centered-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
</style>