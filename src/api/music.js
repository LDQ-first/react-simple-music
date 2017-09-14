
//const songLists = 'https://qq-music-api.now.sh/'
const songLists = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&inCharset=utf-8
                    &outCharset=utf-8&notice=0&format=jsonp&_=1505281457943&platform=h5&uin=0&needNewCode=1&jsonpCallback=taogeDataCallback`

const disLists = (disstid) => {
    return `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?
    g_tk=101015950&inCharset=utf-8&outCharset=utf-8&notice=0
    &format=jsonp&_=1502722692890&uin=759996524
    &platform=h5&needNewCode=1&new_format=0&pic=500&disstid=${disstid}
    &type=1&json=1&utf8=1&onlysong=0&nosign=1&callback=taogeDataCallback`
}

const albumImg = (albummid) => {
    return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
}

const song = (songid) => {
    return `http://ws.stream.qqmusic.qq.com/${songid}.m4a?fromtag=46&crazycache=1`
}

const lyric = (songid) => {
    return `https://qq-music-api.now.sh/lyrics?id=${songid}`
}

/*const lyric = (songid) => {
    return `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=yqq&needNewCode=0&loginUin=0&hostUin=0&songmid=${songid}&callback=taogeDataCallback`

}*/

/*const lyric = (songid) => {
    return `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${songid}&songtype=0&format=jsonp&callback=taogeDataCallback`
}*/


export {
    songLists,
    disLists,
    albumImg,
    song,
    lyric
}