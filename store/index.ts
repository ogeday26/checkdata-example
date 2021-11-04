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

export const state = () => ({
  policyList: [{
    policyNumber: 56712365,
    plateNumber: '26CV5678',
    driverName: 'Halil Safa',
    driverSurname: 'SAĞLIK',
    country: 'Turkey',
    city: 'Eskişehir',
    policyStartDate: '2021-01-01',
    policyEndDate: '2022-01-01',
  }, {
    policyNumber: 46722165,
    plateNumber: '26CV5678',
    driverName: 'Halil Safa',
    driverSurname: 'SAĞLIK',
    country: 'Turkey',
    city: 'Eskişehir',
    policyStartDate: '2020-01-01',
    policyEndDate: '2021-01-01',
  }, {
    policyNumber: 58722132,
    plateNumber: '34DR349',
    driverName: 'Ahmet',
    driverSurname: 'Şen',
    country: 'Turkey',
    city: 'İstanbul',
    policyStartDate: '2021-01-01',
    policyEndDate: '2022-01-01',
  }] as Array<IPolicy>
})

export const getters = {
  findPolicy: (state: { policyList: Array<IPolicy> }) => (policyNumber: number, plateNumber: string) => {
    return state.policyList
      .filter((item: IPolicy) => item.policyNumber === +policyNumber)
      .filter((item) => item.plateNumber === plateNumber)[0]
  }
}