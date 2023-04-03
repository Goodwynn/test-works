<template>
  <div class="bg-black min-h-screen text-white p-4">
    <section class="mx-auto container flex flex-col-reverse md:flex-col">
      <div class="grid grid-cols-2 gap-4 items-center">
        <fieldset class="flex flex-wrap items-center gap-4">
          <input
            type="range"
            name="storage"
            min="1"
            max="1000"
            step="1"
            v-model="storageValue"
          >
          <label for="storage">Storage</label>
          <input type="number" min="1" max="1000" v-model="storageValue" class="bg-black text-white w-1/4">
        </fieldset>
        <fieldset class="flex flex-wrap items-center gap-4">
          <input
            type="range"
            name="transfer"
            min="1"
            max="1000"
            step="1"
            v-model="transferValue"
          >
          <label for="transfer">Transfer</label>
          <input type="number" min="1" max="1000" v-model="transferValue" class="bg-black text-white w-1/4">
        </fieldset>
      </div>
      <div class="border p-2 my-4">
        <p class="">Сравнение</p>
        <div class="grid grid-cols-4 gap-4 md:grid-cols-1">
          <GraphItem
            v-for="(provider, index) in providers"
            :key="index"
            :name="provider.name"
            :icon="provider.icon"
            :min-pay="provider.minPay"
            :max-pay="provider.maxPay"
            :storage-value="parseInt(storageValue)"
            :storage-price="provider.storagePrice"
            :transfer-value="parseInt(transferValue)"
            :transfer-price="provider.transferPrice"
            :free-limit="provider.freeLimit"
            :color="provider.color"
            :min-price-value="set_min_price_value"
            :max-price-value="set_max_price_value"
            :screen-width="screenWidth"
            @calcmaxprice="on_calc_max_price(index, $event)"
            @providerprice="on_calc_price(index, $event)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Test'
    }
  },
  data () {
    return {
      screenWidth: 0,
      storageValue: 500,
      transferValue: 500,
      providers: [
        {
          name: 'backblaze',
          icon: 'https://www.backblaze.com/blog/wp-content/uploads/2017/12/backblaze_icon_transparent.png',
          minPay: 7,
          storagePrice: 0.005,
          transferPrice: 0.01,
          color: 'red'
        },
        {
          name: 'bunny',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAx6WJNVLl02YWeIVgG7gAYoUSff9N-5AEqjLtORtpQA&s',
          maxPay: 10,
          storagePrice: [
            {
              priceLabel: 'HDD',
              priceValue: 0.01
            },
            {
              priceLabel: 'SSD',
              priceValue: 0.02
            }
          ],
          transferPrice: 0.01,
          color: 'orange'
        },
        {
          name: 'scaleway',
          icon: 'https://pcr.cloud-mercato.com/static/img/logos/scaleway.png',
          minPay: 0,
          storagePrice: [
            {
              priceLabel: 'Multi',
              priceValue: 0.06
            },
            {
              priceLabel: 'Single',
              priceValue: 0.03
            }
          ],
          transferPrice: 0.02,
          freeLimit: 75,
          color: 'purple'
        },
        {
          name: 'vultr',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABAlBMVEX///8Ae/xRuf/I9P////v///0Be/gAev1RufydyPvH9f3L8/7N9v2Z3f1Ht/7n+v4YiPoAdf3///cAdfYAeP38//z//Pv5//4Ae/X///QAdPj3////+f0Ad/UAcfvz/v8AgPlSvv7//+8Acuz/+vPU6/eu0vv1+vTb9/vz+v9KnvVUpvXM5fsQeesng+nx//Y+k/bK7/+93PuIwvaIuPiqz/Dh7v217/yi4vxysfyD0vthvfWy4fgghvzZ9vV4uf12w/Oo6fxrwPuU0PXA5/0tmfgkk/w0pvxbpf1jq+81iuTS5Pyg0+07kuRkq+tSmPWUxvOtxfq41u2CsvEAbf50qvxtBEsqAAAJP0lEQVR4nO2c+1vaSBfHE50Lgq8hk5lJCAnECyAKimjZ2tW33W3X2u2+a7fd/v//yjvBrgoJZNbbgM/5/NDLU2PnyzlzbjPRsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4LX8j0NzwTS2KERPqHHDCSzEdIfcUcsHocWeh5dd3FbzaduTTrSh3KVWj5lr/TabXX5tFudZjl5z//DETd3cpqubw6k3K5stu18k2oEKy1t81d3nDzaXDXJfstZJlSiJuV1UoqYyZKZKXSRHLG87Ve36U2Cegsgtjm/KCHTHmpv7tarlSUyjmoD2BXyPx9yA4PKCE2V7/MIP2nOBh0hHhubdc0y0frsz30xlMrjsg1IkbDkNrFJO4xU1/OnlldilOuaChUNnZyH8dojSekUKAy8nZLIp8Z2IxK4Zwoc6OwvFqp5z6PThrFAm3Cbb5fr/nRM6tLccpzA+lNPD2q7KqvzpgA1douLXZTypM4fFXrCAM2rFeUm6qEUCmX1yvrc3Ew9qcfx2IUaGzDMdURMrEPLadSPlotr66v//T6P3N5XREoo9AS6IRrKgxPLRNeGlm7ao+Vyz+9KZVKG3NYKf185u9knpf+YTXWU5h4wxmF0ZMiZXNdGbD8rrRSKq3MopSyWTrLLBBbHTYM9RRyen74/AJT6uX1/76Zre6uzCOmjDYpU/3tbUiJjquS+Jj5zJ9RHT0lu+uregI33ik/zTqaU401cqIKqHajVzNS2dR3f9nQUljaOGP1rELUbvBAo7KJibvnzyzhnxLcfK2hMGWj5MicnIauuIaXpvW5155Vwj8x65tpmCl0VWXFNyy7Qn9rN1H9k13gqeNP4aojTUhE9XcbGjtxrPFDtguSAq15gc5WtEOV9g0IlEhWNtNtpiPxVydbuiHRvbIDna3IqyNmQCKydsT7DU2FG++z+1BaaLhNQw0julddE7Wp6tuk86uWRJX3V9KJxMQqUVMKdvy3XVihEuqpNtHQOAN/GLtpaWVz5UcJk4ty5s2fhcw2/Myp2gXxlBNCB46xoRsSbzbSwm1z47eLi+o8Ln47q+U8z4Yxmb8RCbHDITM2kmLIGfvgxyCN+zOhNo29gZPTDQt82ShwURJ/wtLY2NRH+EwZ8WOf2HROxKDpRCL85GfbKHnYSua6qfq2xFF1qTGJYsdSSfF8rhl+GIO77ZqP2USzJ1RJ/iok7uyPh9Dwi8G5d+plVuvnDU+ngrbp745EkyW0Wjvu7rljK8+SeNnpGBL3Y4WI/fHR1VEY294pnor6WKbDYbs/R2HyGZnJhdcIKfzo8K1bLHAc9b0PzJo0ogohKinOGbyFx+r/MKRuTJrEaz1P1f/xHDtco2LGgRAs8zwSVRLkPU1jGl50BTKqcLxKsc8pLeoRxjROcpKi9Htxqi+rMYn5h+fXk8VnrYDzednixihJ0MruKd/aOnVV0MwoDCg/NTJJnAYJtrZNucYElPbjy0zaxwIj5yCvxeD8PP9U4LlBddTcC7lGF0Q5abQxmppKIT9if0yf1KgSgvPw1Vb+qYABPic0KVaYDs6SEWLZBMcuyZQPEELcU2HiUCYXjE50sn66cG/fqmWrNzwKyMQ3oEFin49QzjTZELI78IrljYNJY5gT/iO8NjkhJoQ31pCR6Uw+na1hmIb7gs2YFtnu7x2Jpy9pyJoYqIRz+3hCGv87FLJptCa9A/Yl+1NFfK0TpfCYqWZ42lO3zrwkue2kOA17C5EpfoBVk+Ccq4ivIZFw3lP16KQDIr/G3no8uTUiOTZfy9xB+VxUe+8mVCcp2slVc0tMpgxmRdHogty6qXfRXRQHvUaqklrsuzoZQ30I8Rckp8YSNWzVXt2p4ONhzhDZKGq98ogWzFz+sSJJuv7UJkMYC7bvpjmHB8T2/vSZzCYVwwj2Xuf+wdgHr3IPdp3gOhx79rmjmsLFclMrbWe7Az2BKmUMcybEmA09lTNV7o+/Kq9dlHLmFiRQT6cXTiEHTsZC0kKsfeC6wfZgaLEIIxPn93MRKty8DamnU4K77reaiKbHE8hi3eFffw27SKUfI0eGxThV3tfIGOcx3R7WZE5KX0TnnGRIA53ChnB7YHAI+hDk9/kz7Gs4V03GibHjlofA/NY5SefUBSZMZ2/prby08TK95n+H9GtfGnaiM9II3D0mZIQXqb7WQXneFU10LsrwfqPNFqm41qMua1YrsLUuyqiQOvKXTuKOL310rDPlV+E0pt+FWLQCWwemkqLmzUPVQXSWUKEUQ817h7ZbbS5caaYFPtVJiqmnht8WqpPXBCHcrepekPUWahqjCUYYfdW7lUdjPqgz38p/LWNxURKtPU50Gn5CvFcsyjmQWmx8tINGHkmKFXKa2KS1Y/YM9F5ghNY8nYDKecIvTdz/fRDjPSU7V+mIm8zP/SQdO4Xt2sIcwPwLMOp5gW3r7EXab9aWUKGI2EnaBeqMF91vy9gLC7HTrHLS1xBIbW9kern3QIVHdObRopuHY3i4Znq59wTtK4mFbkqIqt1ML/WesFZV4yCD8qRxYnqp90Ra7Uaxl1IaNHqml3pPBPP3i4fgJGnsLV9N8wOMjtJT04KsH/zdW8JkMUbUmThu2LxgphGfbi1jTZPCrEj6F0Xnwvy8s3zNxQ3YQl/7BTkxHCIRLakNLczU4j/x2YUNpzT8joXRO7IPZ5TM7vZ5kpy3TC/woQjWnjOWIuHaskaZG2qSXc7eiI3BsiaKG6SKIiM7rzwl49cwRmZegH1svrg5WT+gNA5PDL0c+th0LuJqxoiEUjpwohdhQgt/zoujhPY/4B1r6SNNiqidZCtw1VJ8Eygy8QMTnoCaM1B5f/I6P6dVJ8r5wSfLCUZfw+kBceB+NfUjkp4CKT55U29khAMWLX0y/AdlKtaMyUT1xokjX5INlcQvd4u32I7bbPEuHz4I3Nm7bYUDSq4W5l2RxyJivdvSLSDxsg6fZhPV2cmtn26fLOHRbwGYie4g5OMbXzatLtg99UcC98IktglJr16+SIEqnr5veIQrjrdy3lx/AeDIGl71A3uvh7D/Mo3ImNxqjpoqDyL24pLFGGwt6u1tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4LH4PxU9xOIPsvOhAAAAAElFTkSuQmCC',
          minPay: 5,
          storagePrice: 0.01,
          transferPrice: 0.01,
          color: 'blue'
        }
      ],
      providersMaxValues: [],
      providersValues: []
    }
  },
  mounted () {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },
  beforeDestroy () {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    }, false)
  },
  computed: {
    set_max_price_value () {
      return Math.max.apply(Math, this.providersMaxValues)
    },
    set_min_price_value () {
      return Math.min.apply(Math, this.providersValues)
    }
  },
  methods: {
    on_calc_max_price (index, data) {
      this.$set(this.providersMaxValues, index, data.value)
    },

    on_calc_price (index, data) {
      this.$set(this.providersValues, index, data.value)
    }
  }
}
</script>
