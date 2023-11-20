<template>
  <div class="register-page">
    <div class="register-container">
      <div class="header-container">
        <h2>Registrarse</h2>
      </div>
      <form @submit.prevent="registerUser" class="register-form">
        <div class="form-group">
          <input type="text" v-model="user.firstName" required placeholder="Nombres">
          <input type="text" v-model="user.lastName" required placeholder="Apellidos">
        </div>
        <div class="input-email">
          <input type="email" v-model="user.email" required placeholder="Correo">
        </div>
        <div class="form-group">
          <input type="password" v-model="user.password" required placeholder="Contraseña">
          <input type="password" v-model="user.confirmPassword" required placeholder="Confirmar Contraseña">
        </div>
        <button type="submit" class="register-button">Registrarse</button>
      </form>
      <div class="login-link">
        <p>Ya tienes cuenta? <router-link to="/login">Iniciar Sesión</router-link></p>
      </div>
      <div class="welcome-text">
        <h1>Hola!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    registerUser() {
      if (this.user.password !== this.user.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      axios.post('http://localhost:3000/accounts', {
        email: this.user.email,
        password: this.user.password,
        name: `${this.user.firstName} ${this.user.lastName}`,
      })
          .then(response => {
            console.log('Usuario registrado:', response.data);
            // Redirigir al usuario a la página de inicio de sesión o al dashboard
            this.$router.push('/home');
          })
          .catch(error => {
            console.error('Error al registrar usuario:', error);
            // Manejar los errores de registro, como email ya registrado
          });
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #A4C639; /* Color de fondo verde */
}

.register-container {
  background: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para el formulario */
  padding: 50px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}


.header-container {
  background: #FF6347; /* Color del encabezado rojo */
  border-radius: 20px 20px 0 0;
  padding: 10px 20px;
  text-align: center;
  color: white;
}

.form-group {
  display: flex;
  justify-content: space-between;
}

.form-group input {
  width: 43%; /* Ajuste para el espacio entre los campos de nombre y apellido */
}
.input-email input {
  width: 95%; /* Ajuste para el espacio entre los campos de nombre y apellido */
}

.register-form input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc; /* Color para las líneas inferiores de los campos */
  margin: 10px 0;
  padding: 10px;
  color: white;
}

.register-button {
  background: #FF6347; /* Color del botón rojo */
  border: none;
  padding: 10px;
  margin-top: 20px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.register-button:hover {
  opacity: 0.8;
}

.login-link p {
  text-align: center;
  margin-top: 20px;
  color: white;
}

.login-link a {
  color: #FF6347; /* Color para el enlace de inicio de sesión */
  text-decoration: none;
}

.welcome-text {
  position: absolute;
  top: 150px;
  right: -200px;
  background: #A4C639; /* Color de fondo verde para el texto de bienvenida */
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-size: 2em;
}

/* Añadir cualquier otro estilo necesario */
</style>
