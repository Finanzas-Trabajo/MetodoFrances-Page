<template>
  <div class="p-col-12 p-md-6 p-lg-4">
    <div class="card">
      <div class="p-card-header">
        <h2>Metodo Frances</h2>
      </div>
      <div class="p-card-body">
        <form @submit.prevent="submitForm">
          <div class="p-fluid">
            <!-- Datos del Préstamo -->
            <fieldset style="border: none; margin: 0; padding: 0;">
              <legend style="color: green; font-weight: bold; font-size: 22px; margin-bottom: 8px;">Datos del Préstamo</legend>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="precioVenta">Precio de Venta del Activo:</label>
                <InputNumber v-model="formData.precioVenta" mode="currency" currency="USD" :locale="locale" />
              </div>
              <div class="p-field" style="margin-bottom: 10px; ">
                <label for="tipoPlan">Tipo de plan de pagos:</label>
                <Dropdown v-model="formData.tipoPlan" :options="planOptions" placeholder="Seleccione un plan" @change="calcularCuotaFinal" style="background-color: greenyellow;" />
              </div>
              <div class="p-field p-grid p-nogutter" style="margin-bottom: 10px;">
                <div class="p-col">
                  <label for="cuotaInicial">% Cuota Inicial:</label>
                  <InputNumber v-model="formData.cuotaInicial" suffix="%" />
                </div>
              </div>
              <div class="p-field p-grid p-nogutter" style="margin-bottom: 10px;">
                <div class="p-col">
                  <label for="cuotaFinal">%Cuota final:</label>
                  <input v-model="formData.cuotaFinal" type="text" placeholder="Ingrese plan pagos" disabled />
                </div>
              </div>
              <div class="p-field p-grid p-nogutter" style="margin-bottom: 10px;">
                <div class="p-col">
                  <label for="numeroAnios">Número de años:</label>
                  <input v-model="formData.numeroAnios" type="text" placeholder="Ingrese plan pagos" disabled />
                </div>
              </div>
              <div class="p-field p-grid p-nogutter" style="margin-bottom: 10px;">
                <div class="p-col">
                  <label for="tasaInteres">Tasa de Interes:</label>
                  <InputNumber v-model="formData.tasaInteres" suffix="%" />
                </div>
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="tipoTasa">Tipo de tasa de interés:</label>
                <Dropdown v-model="formData.tipoTasa" :options="tipoTasaOptions" placeholder="Seleccione un tipo de tasa" style="background-color: greenyellow;" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="capitalizacion">Periodo de capitalización:</label>
                <Dropdown v-model="formData.capitalizacion" :options="capitalizacionOptions" placeholder="Seleccione un periodo" style="background-color: greenyellow;" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="frecuenciaPago">Frecuencia de pago:</label>
                <InputNumber v-model="formData.frecuenciaPago" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="diasPorAno">Número de días por año:</label>
                <InputNumber v-model="formData.diasPorAno" />
              </div>
            </fieldset>
            <!-- Datos de los costes / gastos iniciales -->
            <fieldset style="border: none; margin: 0; padding: 0; margin-top: 15px;">
              <legend style="color: green; font-weight: bold; font-size: 22px; margin-top: 15px; margin-bottom: 8px;">Datos de los costes / gastos iniciales</legend>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="costesNotariales">Costes Notariales:</label>
                <InputNumber v-model="formData.costesNotariales" mode="currency" currency="USD" :locale="locale" />
                <Dropdown v-model="formData.costesNotarialesTipo" :options="tipoOptions" placeholder="Tipo" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="costesRegistrales">Costes Registrales:</label>
                <InputNumber v-model="formData.costesRegistrales" mode="currency" currency="USD" :locale="locale" />
                <Dropdown v-model="formData.costesRegistralesTipo" :options="tipoOptions" placeholder="Tipo" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="tasacion">Tasación:</label>
                <InputNumber v-model="formData.tasacion" mode="currency" currency="USD" :locale="locale" />
                <Dropdown v-model="formData.tasacionTipo" :options="tipoOptions" placeholder="Tipo" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="comisionEstudio">Comisión de estudio:</label>
                <InputNumber v-model="formData.comisionEstudio" mode="currency" currency="USD" :locale="locale" />
                <Dropdown v-model="formData.comisionEstudioTipo" :options="tipoOptions" placeholder="Tipo" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="comisionActivacion">Comisión de activación:</label>
                <InputNumber v-model="formData.comisionActivacion" mode="currency" currency="USD" :locale="locale" />
                <Dropdown v-model="formData.comisionActivacionTipo" :options="tipoOptions" placeholder="Tipo" />
              </div>
            </fieldset>
            <!-- Datos de los costes/gastos periódicos -->
            <fieldset style="border: none; margin: 0; padding: 0; margin-top: 15px;">
              <legend style="color: green; font-weight: bold; font-size: 16px; margin-top: 15px; margin-bottom: 5px;">Datos de los costes/gastos periódicos</legend>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="gps">GPS:</label>
                <InputNumber v-model="formData.gps" mode="currency" currency="USD" :locale="locale" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="portes">Portes:</label>
                <InputNumber v-model="formData.portes" mode="currency" currency="USD" :locale="locale" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="gastosAdministracion">Gastos Administración:</label>
                <InputNumber v-model="formData.gastosAdministracion" mode="currency" currency="USD" :locale="locale" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="seguroDesgravamen">% de Seguro desgravamen:</label>
                <InputNumber v-model="formData.seguroDesgravamen" :mode="'decimal'" :locale="locale" />
              </div>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="seguroRiesgo">% de Seguro de Riesgo:</label>
                <InputNumber v-model="formData.seguroRiesgo" :mode="'decimal'" :locale="locale" />
              </div>
            </fieldset>
            <!-- Datos del costo de oportunidad -->
            <fieldset style="border: none; margin: 0; padding: 0; margin-top: 15px;">
              <legend style="color: green; font-weight: bold; font-size: 16px; margin-top: 15px; margin-bottom: 5px;">Datos del costo de oportunidad</legend>
              <div class="p-field" style="margin-bottom: 10px;">
                <label for="tasaDescuento">Tasa de Descuento:</label>
                <InputNumber v-model="formData.tasaDescuento" :mode="'decimal'" :locale="locale" />
              </div>
            </fieldset>
            <div class="p-mt-2">
              <Button @click="submitForm" :disabled="formSubmitted" type="submit" label="Calcular" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        formSubmitted: false,
        tipoPlan: null,
        tipoTasa: null,
        capitalizacion: null,
      },
      planOptions: ['Plan 36', 'Plan 24'],
      tipoTasaOptions: ['TNA', 'TEA'],
      capitalizacionOptions: ['Diaria', 'Mensual'],
      tipoOptions: ['Prestamo','Efectivo'],
    };
  },
  methods: {
    submitForm() {
      if (this.formSubmitted) {
        return;
      }
      this.formSubmitted = true;
      axios.post('http://localhost:3000/form', this.formData)
          .then(response => {
            console.log('Datos guardados exitosamente:', response.data);
            this.$router.push('/result');
          })
          .catch(error => {
            console.error('Error al guardar los datos:', error);
          });
    },
    calcularCuotaFinal() {
      const tipoPlan = this.formData.tipoPlan;
      if (tipoPlan === 'Plan 24') {
        this.formData.cuotaFinal = '50%';
        this.formData.numeroAnios = 2;
      } else if (tipoPlan === 'Plan 36') {
        this.formData.cuotaFinal = '40%';
        this.formData.numeroAnios = 3;
      } else {
        this.formData.cuotaFinal = '';
        this.formData.numeroAnios = '';
      }
    },
  },
};
</script>

<style>
.card {
  background-color: white;
  padding: 15px;
  border-radius: 5px;
}
.p-field {
  display: block;
}
</style>
