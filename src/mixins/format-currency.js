import { from } from 'apollo-boost'
import { currencyFormatter } from '@/utils'

export default {
  methods: {
    formatCurrency (value) {
      return currencyFormatter().format(value)
    }
  }
}
