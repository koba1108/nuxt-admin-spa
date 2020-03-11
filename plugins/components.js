import Vue from 'vue'
import TheButton from '~/components/atoms/TheButton'
import PasswordResetForm from '~/components/molecules/PasswordResetForm'
import DriverTop5 from '~/components/organisms/DriverTop5'
import GraphHeader from '~/components/organisms/GraphHeader'
import GraphWrapper from '~/components/organisms/GraphWrapper'
import TdtGraph from '~/components/organisms/TdtGraph'

Vue.mixin({
  components: {
    TheButton,
    PasswordResetForm,
    DriverTop5,
    GraphHeader,
    GraphWrapper,
    TdtGraph,
  },
})
