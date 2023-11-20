<template>
  <div class="login-page">
    <div class="login-container">
      <div class="header-container">
        <h2>Iniciar Sesión</h2>
      </div>
      <form @submit.prevent="loginUser" class="login-form" autocomplete="off">
        <div class="input-container">
          <input type="email" id="email" v-model="user.email" required placeholder="Correo">
          <input type="password" id="password" v-model="user.password" required placeholder="Contraseña">
        </div>
        <button type="submit" class="login-button">Iniciar Sesión</button>
        <p class="register-link">No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
      </form>
      <div class="welcome-text">
        <h1>Bienvenido</h1>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    loginUser() {
      axios.get('http://localhost:3000/accounts', {
        params: {
          email: this.user.email,
          password: this.user.password,
        },
      })
          .then(response => {
            if (response.data.length > 0) {
              // Cuenta encontrada con las credenciales correctas
              console.log('Inicio de sesión exitoso');
              this.$router.push('/home');
            } else {
              console.log('Credenciales inválidas');
            }
          })
          .catch(error => {
            console.error('Error al iniciar sesión:', error);
          });
    },
  },

};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #A4C639;
}

.login-container {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  position: relative;
}

.input-container {
  margin-bottom: 29px;
  width: 360px;
}

.login-form input {
  background: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  color: white;
  width: 100%;
}

.login-button {
  background: #FF6347;
  border: none;
  padding: 10px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.login-button:hover {
  opacity: 0.8;
}

.register-link {
  text-align: center;
  color: white;
  margin-top: 15px;
}

.register-link a {
  color: #FF6347;
  text-decoration: none;
}
.header-container {
  background: #FF6347;
  border-radius: 20px 20px 0 0;
  padding: 10px 20px;
  text-align: center;
  color: white;
}
.welcome-text {
  position: absolute;
  top: 100px;
  right: -400px;
  background: #A4C639;
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-size: 2em;
}
</style>
