import apollo from '@/plugins/apollo'
import moment from 'moment'

import RecordQuery from './../graphql/Records.gql'
import TotalBalanceQuery from './../graphql/TotalBalance.gql'

const records = async variables => {
  const response = await apollo.query({
    query: RecordQuery,
    variables
  })

  return response.data.records
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables: {
      date: moment().format('YYYY-MM-DD')
    }
  })

  return response.data.totalBalance
}

export default {
  records,
  totalBalance
}
