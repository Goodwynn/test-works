<template>
  <div class="bg-black min-h-screen text-white p-4">
    <section class="container mx-auto">
      <div class="map relative">
        <div class="map__layout">
          <SvgIcon name="world" class="icon__world" />
        </div>
        <div class="map__marks absolute">
          <UserElement
            v-for="(user, index) in users"
            :key="'user-' + index"
            :name="user.name"
            :position="user.position"
            :ping="user.ping"
            :step="step"
            @chooselevel="on_choose_level(index, $event)"
          />
          <ServerElement
            v-for="(server, index) in servers"
            :key="'server-' + index"
            :name="server.name"
            :position="server.position"
            :step="step"
            @chooseserver="on_choose_server(index, $event)"
          />
        </div>
        <div class="steps__descr absolute">
          <div v-if="step === 1">
            What are your users? Choose the number for every region?
            <button
              v-if="users_checker"
              class="p-2 bg-green-500"
              @click="step++"
            >
              NEXT
            </button>
          </div>
          <div v-if="step === 2">
            Where is your data? Choose one spot for Object Storage system
          </div>
          <div v-if="step === 3">
            Choose minimum two additional spots for ByteCloud
            <button
              v-if="servers_checker"
              class="p-2 bg-green-500"
              @click="draw_lines"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-if="step === 5" class="compare__table">
      <button class="compare__close" @click="step = 4">
        <span />
        <span />
      </button>
      <div class="flex gap-4 container mx-auto">
        <div class="flex flex-col flex-1">
          <h5 class="text-center mb-2">
            ByteCloud
          </h5>
          <div
            v-for="(item, index) in tableDataOurs"
            :key="index"
            class="border border-white flex flex-col"
          >
            <div class="text-center border-b border-white p-2">
              {{ item[1] }}
            </div>
            <div class="flex">
              <div class="flex flex-col items-center p-2 border-r border-white flex-1">
                <span>
                  Latency
                </span>
                <span>
                  {{ item[2] }}
                </span>
              </div>
              <div class="flex flex-col items-center p-2 flex-1">
                <span>
                  Downloading Time
                </span>
                <span>
                  {{ item[2] * 10 }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-1">
          <h5 class="text-center mb-2">
            Object Storage
          </h5>
          <div
            v-for="(item, index) in tableDataOthers"
            :key="index"
            class="border border-white"
          >
            <div class="text-center border-b border-white p-2">
              {{ item[1] }}
            </div>
            <div class="flex">
              <div class="flex flex-col items-center p-2 border-r border-white flex-1">
                <span>
                  Latency
                </span>
                <span>
                  {{ item[2] }}
                </span>
              </div>
              <div class="flex flex-col items-center p-2 flex-1">
                <span>
                  Downloading Time
                </span>
                <span>
                  {{ item[2] * 10 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      users: [
        {
          name: 'Europe',
          position: {
            top: '20%',
            left: '52%'
          },
          ping: 0
        },
        {
          name: 'Asia',
          position: {
            top: '32%',
            left: '75%'
          },
          ping: 0
        },
        {
          name: 'Oceania',
          position: {
            top: '75%',
            left: '85%'
          },
          ping: 0
        },
        {
          name: 'North America',
          position: {
            top: '22%',
            left: '23%'
          },
          ping: 0
        },
        {
          name: 'South America',
          position: {
            top: '65%',
            left: '33%'
          },
          ping: 0
        }
      ],
      servers: [
        {
          name: 'Paris',
          position: {
            top: '27%',
            left: '48%'
          }
        },
        {
          name: 'Singapore',
          position: {
            top: '57%',
            left: '81%'
          }
        },
        {
          name: 'Washington',
          position: {
            top: '29%',
            left: '29%'
          }
        },
        {
          name: 'San Francisco',
          position: {
            top: '29%',
            left: '17%'
          }
        }
      ],
      compare: [
        ['Paris', 'Europe', 39],
        ['Paris', 'North America', 125],
        ['Paris', 'South America', 133],
        ['Paris', 'Asia', 254],
        ['Paris', 'Oceania', 239],

        ['San Francisco', 'Europe', 176],
        ['San Francisco', 'North America', 43],
        ['San Francisco', 'South America', 59],
        ['San Francisco', 'Asia', 92],
        ['San Francisco', 'Oceania', 94],

        ['Singapore', 'Europe', 205],
        ['Singapore', 'North America', 200],
        ['Singapore', 'South America', 245],
        ['Singapore', 'Asia', 91],
        ['Singapore', 'Oceania', 93],

        ['Washington', 'Europe', 121],
        ['Washington', 'North America', 39],
        ['Washington', 'South America', 67],
        ['Washington', 'Asia', 239],
        ['Washington', 'Oceania', 219]
      ],
      chosenUsers: [],
      mainServer: [],
      chosenServers: [],
      tableDataOurs: [],
      tableDataOthers: [],
      step: 1
    }
  },
  computed: {
    users_checker () {
      return this.chosenUsers.length > 1 && this.chosenUsers.length < this.users.length
    },
    servers_checker () {
      return this.chosenServers.length > 2 && this.chosenServers.length < this.servers.length
    }
  },
  watch: {
    users_checker () {
      if (this.chosenUsers.length > 4) {
        this.step = 2
      }
    },
    servers_checker () {
      if (this.chosenServers.length > 3) {
        this.step = 4
        this.draw_lines()
      }
    }
  },
  beforeDestroy () {
    document.querySelectorAll('svg').forEach((el) => {
      el.remove()
    })
  },
  methods: {
    on_choose_level (index, data) {
      this.chosenUsers.push(data)
    },
    on_choose_server (index, data) {
      if (this.step === 2) {
        this.mainServer.push(data)
        this.step++
      }
      if (this.step === 3) {
        this.chosenServers.push(data)
      }
    },
    draw_lines () {
      if (this.step < 4) {
        this.step = 4
      }
      const data = this.draw_lines_prepare()
      this.draw_lines_ours(data.usersLevelsCoords, data.serverCoords, data.layout)
      this.clear_canvas(data.layout)
      setTimeout(() => {
        this.draw_lines_others(data.usersLevelsCoords, data.layout)
      }, 5000)
      setTimeout(() => {
        this.step++
      }, 10000)
    },
    draw_straight_lines (usersLevelsCoords, serverCoords, layout) {
      usersLevelsCoords.forEach((obj, objIndex) => {
        obj.coords.forEach((coords, coordsIndex) => {
          const x1 = coords.x + coords.width / 2
          const y1 = coords.y + coords.height / 2
          const x2 = serverCoords[objIndex].coords.x + serverCoords[objIndex].coords.width / 2
          const y2 = serverCoords[objIndex].coords.y + serverCoords[objIndex].coords.height / 2
          const cx = (x1 + x2) / 2
          const cy = (y1 + y2) / 2
          const dx = (x2 - x1) / 2
          const dy = (y2 - y1) / 2
          const dd = Math.sqrt(dx * dx + dy * dy)
          let ex = 0
          let ey = 0
          if (((x1 < x2) && (y1 < y2)) || ((x1 < x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (obj.coords.length - coordsIndex)
            ey = cy - dx / dd * 30 * (obj.coords.length - coordsIndex)
          }
          if (((x1 > x2) && (y1 < y2)) || ((x1 > x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (coordsIndex + 1)
            ey = cy - dx / dd * 30 * (coordsIndex + 1)
          }
          layout.path('M' + x1 + ' ' + y1 + 'S' + ex + ' ' + ey + ' ' + x2 + ' ' + y2).attr({ 'stroke-width': 2, stroke: 'red' })
        })
      })
    },
    draw_lines_prepare () {
      const layout = this.$raphael(0, 0, '100%', '100%')
      layout.canvas.className.baseVal = 'raphael'

      const usersLevelsCoords = []
      const serverCoords = []

      this.chosenUsers.forEach((user) => {
        this.compare.forEach((el) => {
          if (el[0] === this.mainServer[0].name && el[1] === user.name) {
            this.tableDataOthers.push(el)
          }
        })

        const arr = []
        this.chosenServers.forEach((server) => {
          this.compare.forEach((el) => {
            if (el[0] === server.name && el[1] === user.name) {
              arr.push(el)
            }
          })
        })

        arr.sort((a, b) => {
          let res
          if (a[2] > b[2]) { res = 1 }
          if (a[2] === b[2]) { res = 0 }
          if (a[2] < b[2]) { res = -1 }
          return res
        })

        this.tableDataOurs.push(arr[0])
        usersLevelsCoords.push(this.chosenUsers.find(item => item.name === arr[0][1]))
        serverCoords.push(this.chosenServers.find(item => item.name === arr[0][0]))
      })

      return { usersLevelsCoords, serverCoords, layout }
    },
    draw_lines_ours (usersLevelsCoords, serverCoords, layout) {
      usersLevelsCoords.forEach((obj, objIndex) => {
        obj.coords.forEach((coords, coordsIndex) => {
          const x1 = coords.x + coords.width / 2
          const y1 = coords.y + coords.height / 2
          const x2 = serverCoords[objIndex].coords.x + serverCoords[objIndex].coords.width / 2
          const y2 = serverCoords[objIndex].coords.y + serverCoords[objIndex].coords.height / 2
          const cx = (x1 + x2) / 2
          const cy = (y1 + y2) / 2
          const dx = (x2 - x1) / 2
          const dy = (y2 - y1) / 2
          const dd = Math.sqrt(dx * dx + dy * dy)
          let ex = 0
          let ey = 0
          if (((x1 < x2) && (y1 < y2)) || ((x1 < x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (obj.coords.length - coordsIndex)
            ey = cy - dx / dd * 30 * (obj.coords.length - coordsIndex)
          }
          if (((x1 > x2) && (y1 < y2)) || ((x1 > x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (coordsIndex + 1)
            ey = cy - dx / dd * 30 * (coordsIndex + 1)
          }
          layout.path('M' + x1 + ' ' + y1 + 'S' + ex + ' ' + ey + ' ' + x2 + ' ' + y2)
            .attr({
              opacity: 0,
              'stroke-width': '2',
              'stroke-dasharray': '-',
              stroke: 'white'
            })
            .animate({
              opacity: 1
            }, 1000)
        })
      })

      this.tableDataOurs.forEach((tableEl) => {
        this.users.forEach((userEl) => {
          if (userEl.name === tableEl[1]) {
            userEl.ping = tableEl[2]
          }
        })
      })
    },
    draw_lines_others (usersLevelsCoords, layout) {
      const serverCoords = this.mainServer[0]
      usersLevelsCoords.forEach((obj, objIndex) => {
        obj.coords.forEach((coords, coordsIndex) => {
          const x1 = coords.x + coords.width / 2
          const y1 = coords.y + coords.height / 2
          const x2 = serverCoords.coords.x + serverCoords.coords.width / 2
          const y2 = serverCoords.coords.y + serverCoords.coords.height / 2
          const cx = (x1 + x2) / 2
          const cy = (y1 + y2) / 2
          const dx = (x2 - x1) / 2
          const dy = (y2 - y1) / 2
          const dd = Math.sqrt(dx * dx + dy * dy)
          let ex = 0
          let ey = 0
          if (((x1 < x2) && (y1 < y2)) || ((x1 < x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (obj.coords.length - coordsIndex)
            ey = cy - dx / dd * 30 * (obj.coords.length - coordsIndex)
          }
          if (((x1 > x2) && (y1 < y2)) || ((x1 > x2) && (y1 > y2))) {
            ex = cx + dy / dd * 30 * (coordsIndex + 1)
            ey = cy - dx / dd * 30 * (coordsIndex + 1)
          }
          layout.path('M' + x1 + ' ' + y1 + 'S' + ex + ' ' + ey + ' ' + x2 + ' ' + y2)
            .attr({
              opacity: 0,
              'stroke-width': '2',
              'stroke-dasharray': '-',
              stroke: 'white'
            })
            .animate({
              opacity: 1
            }, 1000)
        })

        this.tableDataOthers.forEach((tableEl) => {
          this.users.forEach((userEl) => {
            if (userEl.name === tableEl[1]) {
              userEl.ping = tableEl[2]
            }
          })
        })
      })
    },
    clear_canvas (layout) {
      setTimeout(() => {
        layout.canvas.querySelectorAll('path').forEach((path) => {
          path.remove()
        })
      }, 5000)
    }
  }
}
</script>

<style lang="sass">
  .map
    &__marks
      z-index: 2
      top: 0
      left: 0
      width: 100%
      height: 100%
  .steps
    &__descr
      z-index: 2
      top: 0
      left: 0
  .icon__world
    aspect-ratio: 16 / 7
    width: 100%
  .raphael
    pointer-events: none
  .compare
    &__table
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      background-color: rgba(0, 0, 0, .5)
      backdrop-filter: blur(10px)
      z-index: 10
    &__close
      position: absolute
      top: 50px
      right: 50px
      width: 50px
      height: 50px
      span
        position: absolute
        display: block
        width: 100%
        height: 2px
        background-color: white
        &:first-child
          top: 50%
          left: 50%
          transform: translate(-50%, -50%) rotate(45deg)
        &:last-child
          top: 50%
          left: 50%
          transform: translate(-50%, -50%) rotate(-45deg)
</style>
