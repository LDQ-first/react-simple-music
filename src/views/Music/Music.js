import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loading from '../../components/Loading/Loading'
import {Container} from '../../styled'
import PropTypes from 'prop-types'
import {MusicDiv} from '../../styled/music.js'
import {musicApi} from '../../api/api.js' 
import {
   songListsIsLoadingSelector,
   songListsErrorMsgSelector,
   songListSelector,
   disListsIsLoadingSelector,
   disListsErrorMsgSelector,
   disListSelector,
   lyricStatusSelector,
   lyricIsLoadingSelector,
   lyricErrorMsgSelector,
   lyricSelector,

   isPlayingSelector,
   songIndexSelector,
   isAutoplaySelector,
   isMutedSelector,
   valueSelector,
   modeSelector,
   volumeSelector,
   playedSelector,
   loadedSelector,
   durationSelector,
   currentTimeSelector,
   currentSTimeSelector,
   isChangedSelector,
} from '../../selector/music.js'
import * as musicAction  from '../../redux/actions/music.js'
import Immutable from 'immutable'
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation'
import RestoreIcon from 'material-ui-icons/Restore'
import FavoriteIcon from 'material-ui-icons/Favorite'
import LocationOnIcon from 'material-ui-icons/LocationOn'
import FolderIcon from 'material-ui-icons/Folder'
import SongList from '../../components/SongList/SongList.js'
import IconButton from 'material-ui/IconButton'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import DisList from '../../components/DisList/DisList.js'
import Player from '../../components/Player/Player.js'


const mapStateToProps = (state) => ({
    songListsIsLoading: songListsIsLoadingSelector(state),
    songListsErrorMsg: songListsErrorMsgSelector(state),  
    songList: songListSelector(state),
    disListsIsLoading: disListsIsLoadingSelector(state),
    disListsErrorMsg: disListsErrorMsgSelector(state),  
    disList: disListSelector(state),
    lyricStatus: lyricStatusSelector(state),
    lyricIsLoading: lyricIsLoadingSelector(state),
    lyricError: lyricErrorMsgSelector(state),
    lyric: lyricSelector(state),
    isPlaying: isPlayingSelector(state),
    songIndex: songIndexSelector(state),
    isAutoplay: isAutoplaySelector(state),
    isMuted: isMutedSelector(state),
    value: valueSelector(state),
    mode: modeSelector(state),
    volume: volumeSelector(state),
    played: playedSelector(state),
    loaded: loadedSelector(state),
    currentTime: currentTimeSelector(state),
    currentSTime: currentSTimeSelector(state),
    duration: durationSelector(state),
    isChanged: isChangedSelector(state) 
})




class Music extends Component {
    static get propTypes() { 
        return { 
            songListsIsLoading: PropTypes.bool,
            songListsErrorMsg: PropTypes.string,
            songList: PropTypes.array,
            getSongLists: PropTypes.func,
            disListsIsLoading: PropTypes.bool,
            disListsErrorMsg: PropTypes.string,
            disList: PropTypes.array,
            getDisLists: PropTypes.func,

            lyricStatus: PropTypes.number,
            lyricIsLoading: PropTypes.string,
            lyricErrorMsg: PropTypes.string,
            lyric: PropTypes.array,
            getLyrics: PropTypes.func,

            isPlaying: PropTypes.bool,
            isAutoplay: PropTypes.bool,
            isMuted: PropTypes.bool,
            songIndex: PropTypes.number,
            value: PropTypes.number,
            volume: PropTypes.number,
            played: PropTypes.number,
            loaded: PropTypes.number,
            mode: PropTypes.string,
            currentTime: PropTypes.string,
            currentSTime: PropTypes.number,
            duration: PropTypes.string,
            isChanged: PropTypes.bool,

            play: PropTypes.func,
            pause: PropTypes.func,
            autoplay: PropTypes.func,
            mute: PropTypes.func,
            beforeSong: PropTypes.func,
            nextSong: PropTypes.func,
            chooseSong: PropTypes.func,
            changeValue: PropTypes.func,
            changeSong: PropTypes.func,
            changeMode: PropTypes.func,
            changeVolume: PropTypes.func,
            changePlayed: PropTypes.func,
            changeLoaded: PropTypes.func,
            changeDuration: PropTypes.func,
            changeCurrentTime: PropTypes.func,
            changeCurrentSTime: PropTypes.func,

        }
    }

    constructor(porps) {
        super(porps)
        this.state = {
            index: 0,
            open: true
        }
    }

    
    
    componentWillMount() {
        const {getSongLists, autoplay, isAutoplay, songList} = this.props
        if(!songList) {
            getSongLists()   
        }
        if(localStorage.isAutoplay === 'true' ) {
            autoplay()
        }
        
    }

    
    
    
    
    componentWillReceiveProps(nextProps) {
         const {isAutoplay, lyric, isPlaying, pause, changeSong, changeVolume} = nextProps
         const {lyricStatus} = this.props
         if(isAutoplay) {
             this._musicPlayer.autoplay = isAutoplay
         }

         changeVolume(this._musicPlayer.volume)
               
    }
    
    
    
    
    




    handleChange = (e, value) => {
        const {changeValue} = this.props
        changeValue(value)
    } 

    handleClick = () => {
        this.setState({ open: !this.state.open });
    }

    getSong = (list) => {
        const {isAutoplay , isPlaying, pause, changeSong} = this.props
        const { songid, albummid, songname, singer } = list
        const albumImgUrl = musicApi.albumImg(albummid)
        const songUrl = musicApi.song(songid)
      
        this.setState({
            albumImgUrl,
            songUrl,
            songname,
            singer,
            songid
        })
        if(!isAutoplay && isPlaying) {
             pause()
         }
        this.getLyric(songid)
    }

    formatNum(num) {
        return num < 10 ? `0${num}` : num + '' 
    }


    formatSongTime (time) {
        const min = this.formatNum(parseInt(time / 60))
        const sec = this.formatNum(parseInt(time - min * 60))
        return `${min}:${sec}`
    }


    getTime () {
        const duration = this.formatSongTime(this._musicPlayer.duration)
        const currentTime = this.formatSongTime(this._musicPlayer.currentTime)
        const played = this._musicPlayer.currentTime / this._musicPlayer.duration
        const {changePlayed , changeDuration, changeCurrentTime, changeCurrentSTime} = this.props
            changePlayed(played),
            changeDuration(duration),
            changeCurrentTime(currentTime)
            changeCurrentSTime(this._musicPlayer.currentTime)
    }

    upsateTime () {
        if(!this._musicPlayer.duration) return
        this.getTime ()
    }


    playSong = () => {
        const {songUrl} = this.state
        const {play} = this.props
        if(!songUrl) return
        this._musicPlayer.play()
        play()
        
    }

    pauseSong = () => {
        const {songUrl} = this.state
        const {pause} = this.props
        if(!songUrl) return
        this._musicPlayer.pause()
        pause()
    }

    toggleAutoPlay () {
        const {autoplay, isAutoplay} = this.props
        autoplay()
        this._musicPlayer.autoplay = !isAutoplay
        localStorage.isAutoplay = !isAutoplay
    }

    getProgress() {
        let spu = 0, loaded
        const audio = this._musicPlayer
        for (var i = 0; i < audio.buffered.length; i++) {
            spu += audio.buffered.end(i) - audio.buffered.start(i)
            loaded = spu / audio.duration
        }
        const {changeLoaded} = this.props
        changeLoaded(loaded)
        
    }

    changeVolume () {
       const {mute, isMuted, changeVolume} = this.props
        if(!isMuted && this._musicPlayer.muted) {
            mute()
        }
        else if(this._musicPlayer.volume === 0 && !isMuted ) {
            mute()
        } else if(this._musicPlayer.volume > 0 && isMuted && !this._musicPlayer.muted) {
            mute()
        }
        changeVolume(this._musicPlayer.volume)
    }


   

    mutePlayer () {
         const {mute, isMuted, changeVolume} = this.props
         mute()
         this._musicPlayer.muted = !isMuted
    }


    changeSong (status) {
        const {disList, songIndex, beforeSong, nextSong} = this.props
        const jsDisList = Immutable.List(disList).toJS()
        if(status === 'before' && songIndex > 0) {
            this.getSong(jsDisList[songIndex - 1])
            beforeSong()
        } else if (status === 'next' && songIndex < jsDisList.length - 1) {
            this.getSong(jsDisList[songIndex + 1])
            nextSong()
        }
    }


    getLyric (songid) {
        const {getLyrics, changeSong} = this.props
        changeSong(true)
        this.setState({
            lyric: ''
        })
        getLyrics(songid).then(() => {
            const {lyric} = this.props
            this.setState({
                lyric
            })
        }).then(() => {
             changeSong(false)
        })
    }

    changeMode () {
        const {mode, changeMode} = this.props
        
        switch(mode) {
            case 'loop':
                changeMode('repeatOne')
                this._musicPlayer.loop = true
                break;
            case 'repeatOne':
                changeMode('shuffle')
                this._musicPlayer.loop = false
                break;
           case 'shuffle':
                changeMode('order')
                this._musicPlayer.loop = false
                break;
           case 'order':
                changeMode('loop')
                this._musicPlayer.loop = false
                break;
          default:
               break;
        }
    }

    handleEnd () {
        const {mode, changeMode, isAutoplay, 
            songIndex, disList, chooseSong, nextSong} = this.props
        const jsDisList = Immutable.List(disList).toJS()

        switch(mode) {
            case 'loop':
                if(songIndex === jsDisList.length - 1) {
                    this.getSong(jsDisList[0])
                    chooseSong(0)
                } else {
                    this.getSong(jsDisList[songIndex + 1])
                    nextSong()
                }
                break;
            case 'repeatOne':
                
                break;
           case 'shuffle':
                const randomIndex = Math.round(Math.random() * jsDisList.length - 1)
                this.getSong(jsDisList[randomIndex])
                chooseSong(randomIndex)      
                break;
           case 'order':
                if(songIndex < jsDisList.length - 1) {
                    this.getSong(jsDisList[songIndex + 1])
                    nextSong()
                }
                break;
          default:
               break;
        }

    }


    clickVolumeBar (e, _this) {
        let obj = _this.volumeBar
        const clickX = e.pageX - obj.getBoundingClientRect().left
        let volumeRate = clickX / _this.volumeBar.offsetWidth
        if(volumeRate > 1) {
            volumeRate = 1
        }
        const {changeVolume} = this.props
        this._musicPlayer.volume = volumeRate
        changeVolume(volumeRate)  
    }

    clickBar (e, _this) {
        let obj = _this.bar
        const clickX = e.pageX - obj.getBoundingClientRect().left
        let timeRate = clickX / _this.bar.offsetWidth
        if(timeRate > 1) {
            timeRate = 1
        }
        this._musicPlayer.currentTime  = this._musicPlayer.duration * timeRate
        this.getTime()

    }


    dragThumb (e, _this) {
        let obj = e.target
        let allLeft = 0
        while(obj = obj.offsetParent) {
            allLeft += obj.offsetLeft
        }
        const clickX = e.pageX - 6 - allLeft
        if(clickX < 0) return
        if(clickX <= _this.bar.offsetWidth ) {
            const timeRate = clickX / _this.bar.offsetWidth
            this._musicPlayer.currentTime  = this._musicPlayer.duration * timeRate
            this.getTime()
        }
    }

   

    render() {
        const {open, songUrl, albumImgUrl, songname, singer, songid} = this.state
        const {
            songList, getDisLists, disList, lyricStatus, 
             isPlaying, play, pause, isAutoplay, isMuted, isChanged, changeSong, 
             volume, mode, duration, currentTime, currentSTime, played,loaded,
             chooseSong, songIndex, value
            } = this.props
        const jsSongList = Immutable.List(songList).toJS()
        const jsDisList = Immutable.List(disList).toJS()

        let lyric = ''
        if(isChanged) {
           lyric = this.state.lyric  
        }

        const SongLists = jsSongList.map((list, index) => {
            return (
                value === index && 
                <SongList img={list.picUrl}  songListDesc={list.songListDesc} 
                id={list.id} getDisLists={getDisLists}/>
            )
        })




        return (
            <Container>
                <MusicDiv>
                     <div className="music-player" 
                     ref={player => this.player = player}>
                          <audio controls ref={audio => this._musicPlayer = audio}
                          className="audio" src={songUrl}
                          onCanPlay = {() => {this.getTime();}}
                          onTimeUpdate = {() => { this.upsateTime()}}
                          onProgress = {() => { this.getProgress()}}
                          onVolumeChange = {() => {this.changeVolume()}}
                          onPlay = {() => {play()}}
                          onPause = {() => {pause()}}
                          onEnded ={() => {this.handleEnd()}}

                          >你的浏览器不支持喔！</audio>
                          <Player _this={this} albumImgUrl={albumImgUrl}  songname={songname} singer={singer}
                          duration={duration} currentTime={currentTime}   

                          isPlaying={isPlaying} play={play} pause={pause} isAutoplay = {isAutoplay} isMuted={isMuted} 
                          changeSong={changeSong} mode={mode}

                          played={played} loaded={loaded}   
                           volume={volume}  lyric={lyric ? lyric : this.state.lyric} currentSTime={currentSTime} isChanged={isChanged}
                          />
                          <IconButton color="primary" onClick={this.handleClick} className="song-lists-expand">
                            {open ? <ExpandMore /> : <ExpandLess />}
                          </IconButton >
                     </div>
                     <Collapse in={open} className="song-lists-wrapper">
                           {SongLists}
                           <DisList jsDisList={jsDisList} _this={this} value={value} songIndex={songIndex} 
                           chooseSong={chooseSong}/>
                        <BottomNavigation
                            className="song-lists-control"
                            value={value}
                            onChange={this.handleChange}
                            showLabels
                        >
                            <BottomNavigationButton label="经典" icon={<RestoreIcon />} />
                            <BottomNavigationButton label="日语" icon={<FavoriteIcon />} />
                            <BottomNavigationButton label="民谣" icon={<LocationOnIcon />} />
                            <BottomNavigationButton label="ACG" icon={<FolderIcon />} />
                        </BottomNavigation>

                     </Collapse>
                </MusicDiv>
            </Container>
        )
    }
}









export default connect(
    mapStateToProps,
    musicAction
)(Music)