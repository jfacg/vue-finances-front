import apollo from '@/plugins/apollo'
import moment from 'moment'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'

import RecordsQuery from './../graphql/Records.gql'
import RecordCreateMutation from './../graphql/RecordCreate.gql'
import TotalBalanceQuery from './../graphql/TotalBalance.gql'

const createRecord = async variables => {
  const response = await apollo.mutate({
    mutation: RecordCreateMutation,
    variables,
    update: (proxy, { data: { createRecord } }) => {
      const month = moment(createRecord.date).utc().format('MM-YYYY')
      const variables = { month }

      try {
        const recordsData = proxy.readQuery({
          query: RecordsQuery,
          variables
        })

        recordsData.records = [...recordsData.records, createRecord]

        proxy.writeQuery({
          query: RecordsQuery,
          variables,
          data: recordsData
        })
      } catch (e) {
        console.log('Query "records" has not been read yet!', e)
      }

      try {
        const currentDate = moment().utc().endOf('dat')
        const recordDate = moment(createRecord.date).utc()
        const variables = { date: currentDate.format('YYYY-MM-DD') }

        if (recordDate.isBefore(currentDate)) {
          const totalBalanceData = proxy.readQuery({
            query: TotalBalanceQuery,
            variables
          })

          totalBalanceData.totalBalance = +(totalBalanceData.totalBalance + createRecord.amount).toFixed(2)

          proxy.writeQuery({
            query: TotalBalanceQuery,
            variables,
            data: totalBalanceData
          })
        }
      } catch (e) {
        console.log('Query "TotalBalance" has not been read yet!', e)
      }
    }

  })
  return response.data.createRecord
}

const records = variables => {
  const queryRef = apollo.watchQuery({
    query: RecordsQuery,
    variables
  })
  return from(queryRef)
    .pipe(
      map(res => res.data.records)
    )
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
  createRecord,
  records,
  totalBalance
}
