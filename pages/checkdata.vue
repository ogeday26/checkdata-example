<template>
  <div class="container">
    <div class="row" style="position: fixed; margin-top: 50px;">
      <div class="text-container">
        <el-button type="primary" @click="processType = 'VALIDATION'">Poliçe Kontrol</el-button>
        <el-button type="primary" @click="processType = 'DAMAGE'">Hasar Sorgulama</el-button>
        <el-button type="primary" @click="processType = 'COMPENSATION'">Tazminat Talep</el-button>
      </div>
    </div>
    <template v-if="processType === 'VALIDATION'">
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
    </template>
    <template v-else-if="processType === 'DAMAGE'">
      <div class="row">
        <div class="text-container">
          <p style="font-size: 20px; font-weight: 900">
            {{ damageProcess[Math.floor((Math.random() * 3) + 1) - 1] }}
          </p>
        </div>
      </div>
    </template>
    <template v-else-if="processType === 'COMPENSATION'">
      <div class="row">
        <p>
          <h1>Maddi Zararlı Kazalar Bilgilendirme Ve Tazminat Talep Formu</h1>
        </p>
        <el-form ref="form" :model="form" label-width="200px" size="mini">
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Ruhsat Sahibi">
                <el-input v-model="form.ruhsatSahibiAdSoyad"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="TC No:">
                <el-input v-model="form.tcNo"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="E-Posta:">
                <el-input v-model="form.eposta"></el-input>
              </el-form-item>
            </div>
            <div class="right-container">
              <el-form-item label="Telefon Numarası:">
                <el-input v-model="form.telefonNumarasi"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Araç Plakası:">
                <el-input v-model="form.aracPlakasi"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Iban No:">
                <el-input v-model="form.ibanNo"></el-input>
              </el-form-item>
            </div>
          </div>
          <p>Kaza İle İlgili Bilgiler:</p>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Kaza Tarihi:">
                <el-date-picker
                  v-model="form.kazaTarihi"
                  type="datetime"
                  format="dd-MM-yyyy HH:mm:ss"
                  placeholder="Tarih Ve Saat Seçiniz"
                  style="width: 150px;"
                />
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Kaza Yeri:">
                <el-input v-model="form.kazaYeri"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <el-form-item label="Kazaya Neden Olan Araç Plakası:" label-width="550px">
              <el-input v-model="form.kazayaNedenOlanArac"></el-input>
            </el-form-item>
          </div>
          <p>Servis Bilgileri:</p>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Servis Adı:">
                <el-input v-model="form.servisAdı"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Servis E-posta:">
                <el-input v-model="form.servisEPosta"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Telefon No:">
                <el-input v-model="form.telefonNo"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Cep Telefon No:">
                <el-input v-model="form.cepTelefonNo"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="Adres:">
                <el-input v-model="form.adres"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Şehir:">
                <el-input v-model="form.sehir"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-container">
            <div class="left-text">
              <el-form-item label="İlçe:">
                <el-input v-model="form.ilce"></el-input>
              </el-form-item>
            </div>
            <div class="right-text">
              <el-form-item label="Tahmini Hasar Tutarı:">
                <el-input-number v-model="form.tahminiHasarTutari" :controls="false" :min="1" :max="1000000" />
              </el-form-item>
            </div>
          </div>
          <p>Tarafımıza iletmek istediğiniz herhangi bir konuyu bu alana yazabilirsiniz:</p>
          <div class="form-container">
            <el-input v-model="form.description" type="textarea" :rows="2"></el-input>
          </div>
          <div class="form-container">
            <p>
              <el-button type="primary" @click="submitForm">Kaydet</el-button>
            </p>
          </div>
        </el-form>
      </div>
    </template>
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

enum ProcessType {
  EMPTY = "EMPTY",
  VALIDATION = "VALIDATION",
  DAMAGE = "DAMAGE",
  COMPENSATION = "COMPENSATION",
}

export default Vue.extend({
  data() {
    return {
      validStatus: false,
      policy: {} as IPolicy,
      processType: "EMPTY" as ProcessType,
      damageProcess: [
        "Exper atandı.",
        "Ödeme onayında.",
        "Dosya inceleniyor."
      ] as Array<string>,
      form: {
        ruhsatSahibiAdSoyad: "",
        name: "",
      }
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
    },
    submitForm() {
      this.$message({
        message: 'Form Kayıt Edildi.',
        type: 'success'
      });
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
  .form-container {
    display: flex;
    flex-direction: row;
    width: 700px;
    justify-content: space-around;
  }
  .image {
    width: 200px;
    text-align: center;
  }

</style>