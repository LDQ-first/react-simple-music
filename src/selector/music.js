import { createSelector } from 'reselect'
import {selectGolbal} from './index'



export const musicSongActionSelector = createSelector(
    selectGolbal,
    appState => appState.get('musicSongAction')
)


export const isPlayingSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('isPlaying')
)

export const isAutoplaySelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('isAutoplay')
)

export const isMutedSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('isMuted')
)



export const songIndexSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('songIndex')
)


export const valueSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('value')
)

export const modeSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('mode')
)
export const volumeSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('volume')
)

export const playedSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('played')
)

export const loadedSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('loaded')
)

export const durationSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('duration')
)

export const currentTimeSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('currentTime')
)

export const currentSTimeSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('currentSTime')
)



export const isChangedSelector = createSelector(
    musicSongActionSelector,
    musicSongActionState => musicSongActionState.get('isChanged')
)







export const musicSongListsSelector = createSelector(
    selectGolbal,
    appState => appState.get('musicSongLists')
)

export const songListsIsLoadingSelector = createSelector(
    musicSongListsSelector,
    musicSongListsState => musicSongListsState.get('songListsIsLoading')
)

export const songListsErrorMsgSelector = createSelector(
    musicSongListsSelector,
    musicSongListsState => musicSongListsState.get('songListsErrorMsg')
)


export const songListsSelector = createSelector(
    musicSongListsSelector,
    musicSongListsState => musicSongListsState.get('songLists')
)


export const songListSelector = createSelector(
    songListsSelector,
    songListsState => {
        if(!songListsState) return
        return songListsState.get('songList')
    }
)






export const musicDisListsSelector = createSelector(
    selectGolbal,
    appState => appState.get('musicDisLists')
)

export const disListsIsLoadingSelector = createSelector(
    musicDisListsSelector,
    musicDisListsState => musicDisListsState.get('disListsIsLoading')
)

export const disListsErrorMsgSelector = createSelector(
    musicDisListsSelector,
    musicDisListsState => musicDisListsState.get('disListsErrorMsg')
)


export const disListsSelector = createSelector(
    musicDisListsSelector,
    musicDisListsState => musicDisListsState.get('disLists')
)

export const disListSelector = createSelector(
    disListsSelector,
    disListsState => {
        if(!disListsState) return
        return disListsState.get('disList')
    }
)






export const musicLyricsSelector = createSelector(
    selectGolbal,
    appState => appState.get('musicLyrics')
)

export const lyricStatusSelector = createSelector(
    musicLyricsSelector,
    musicLyricsState => musicLyricsState.get('lyricStatus')
)

export const lyricIsLoadingSelector = createSelector(
    musicLyricsSelector,
    musicLyricsState => musicLyricsState.get('lyricIsLoading')
)

export const lyricErrorMsgSelector = createSelector(
    musicLyricsSelector,
    musicLyricsState => musicLyricsState.get('lyricErrorMsg')
)


export const lyricsSelector = createSelector(
    musicLyricsSelector,
    musicLyricsState => musicLyricsState.get('lyrics')
)

export const lyricSelector = createSelector(
    lyricsSelector,
    lyricsState => {
        if(!lyricsState) return
        return lyricsState.get('lyric')
    }
)