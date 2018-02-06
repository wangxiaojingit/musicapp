
import {mapGetters} from 'vuex'
export const playlistMixin = {
    computed: {
      ...mapGetters([
        'getPlayList'
      ])
    },
    mounted() {
      console.log("mounted")
      this.handlePlaylist(this.getPlayList)
    },
    activated() {
      console.log("activated")
      this.handlePlaylist(this.getPlayList)
    },
    watch: {
      getPlayList(newVal) {
        console.log("watch")
        this.handlePlaylist(newVal)
      }
    },
    methods: {
      handlePlaylist() {
        throw new Error('component must implement handlePlaylist method')
      }
    }
  }
  