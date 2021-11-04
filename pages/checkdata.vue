<template>
  <div class="container">
    <div v-if="policy && Object.keys(policy).length > 0" class="row">
      <div class="text-container">
        <img v-if="validStatus" class="image"  src="~/assets/valid.png" alt="valid">
        <img v-else class="image"  src="~/assets/not-valid.png" alt="valid">
      </div>
      <div class="breakpoint"></div>
      <div class="text-container">
        <div class="left-text">
          <span>Poliçe Numarası: </span><span style="font-weight: 700;">{{ policy.policyNumber }}</span>
        </div>
        <div class="right-text">
          <span>Plaka Numarası: </span><span style="font-weight: 700;">{{ policy.plateNumber }}</span>
        </div>
      </div>
      <div class="text-container">
        <div class="left-text">
          <span>Sürücü Adı: </span><span style="font-weight: 700;">{{ policy.driverName }}</span>
        </div>
        <div class="right-text">
          <span>Sürücü Soyadı: </span><span style="font-weight: 700;">{{ policy.driverSurname }}</span>
        </div>
      </div>
      <div class="text-container">
        <div class="left-text">
          <span>Ülke: </span><span style="font-weight: 700;">{{ policy.country }}</span>
        </div>
        <div class="right-text">
          <span>Şehir: </span><span style="font-weight: 700;">{{ policy.city }}</span>
        </div>
      </div>
      <div class="text-container">
        <div class="left-text">
          <span>Poliçe Başlangıç Tarihi: </span><span style="font-weight: 700;">{{ policyStartDate() }}</span>
        </div>
        <div class="right-text">
          <span>Poliçe Bitiş Tarihi: </span><span style="font-weight: 700;">{{ policyEndDate() }}</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="text-container">
        <img class="image"  src="~/assets/question-mark.png" alt="valid">
      </div>
      <div class="breapoint"></div>
      <div class="text-container">
        <p style="font-size: 20px; font-weight: 900">Poliçe bilgisi bulunamadı.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'

interface IPolicy {
  policyNumber: number;
  plateNumber: string;
  driverName: string;
  driverSurname: string;
  country: string;
  city: string;
  policyStartDate: string;
  policyEndDate: string;
}

export default Vue.extend({
  data() {
    return {
      validStatus: false,
      policy: {} as IPolicy
    }
  },
  computed: {
    ...mapGetters([
      'findPolicy'
    ]),
  },
  mounted() {
    this.policy = this.findPolicy(this.$route.query.policyNumber, this.$route.query.plateNumber)
    this.validStatus = this.policyIsValid(this.policy)
  },
  methods: {
    policyIsValid(policy: IPolicy) {
      if (!policy?.policyStartDate || !policy?.policyEndDate) {
        return false
      }
      
      const policyStartDate = moment(policy.policyStartDate)
      const policyEndDate = moment(policy.policyEndDate)

      if(policyStartDate.isBefore(moment()) && policyEndDate.isAfter(moment())) {
        return true
      } return false
    },
    policyStartDate() {
      return moment(this.policy.policyStartDate).format('DD-MM-YYYY')
    },
    policyEndDate() {
      return moment(this.policy.policyEndDate).format('DD-MM-YYYY')
    }
  }
})

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  * {
    font-family: 'Roboto', sans-serif;
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: 100vh;
  }
  .row {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .breakpoint {
    height: 50px;
  }
  .text-container {
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content: space-around;
  }
  .image {
    width: 200px;
    text-align: center;
  }

</style>