import styled from 'styled-components'
import {blue, green} from 'material-ui/colors'
const titleBlue = blue[50]
const disListsGreen = green['A100']
const dHeaderBlue = blue[500]
const thumbBlue = blue[500]
const thumbborderBlue = blue[300]

const needleUrl = process.env.NODE_ENV === 'production' 
    ? '/react-allfamily/dist/static/img/needle.png'
    : '../../static/img/needle.png'

const discoUrl = process.env.NODE_ENV === 'production' 
    ? '/react-allfamily/dist/static/img/disco.png'
    : '../../static/img/disco.png'


const MusicDiv = styled.div`
    max-width: 600px;
    min-width: 300px;
    margin: 50px auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3),
                0 3px 1px -2px rgba(0, 0, 0, 0.2),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
    @media (max-width: 50em) {
        margin: 10px auto;
    }
    .music-player {
        position: relative;
        border-bottom: 2px solid #CCC;
        .song-lists-expand {
            position: absolute;
            right: 7px;
            bottom: 0;
            height: 40px;
            width: 30px;
        }
        .audio {
            display: none;
        }
        .player {
            display: flex;
            flex-direction: column;
            background: #FFF;
            .player-top {
                 display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .player-pic {
                width: 120px;
                height: 120px;
                position: relative;
                border: 4px solid #FFF;
                box-shadow: 0 0 10px #ff9090;
                overflow: hidden;
                background: ${dHeaderBlue};
                @media (max-width: 380px) {
                    width: 100px;
                    .player-disco-wrapper {
                        transform: scale(0.8);
                    }
                }
                @media (max-width: 360px) {
                    width: 72px;
                    .player-disco-wrapper {
                        transform: scale(0.64);
                    }
                }
                .player-disco-wrapper {
                    .player-needle {
                        position: absolute;
                        top: -4px;
                        left: 38%;
                        height: 78px;
                        width: 54px;
                        background: url(${needleUrl}) no-repeat center center;
                        background-size: cover;
                        z-index: 2;
                        transition: all 0.5s ease;
                        transform-origin: 12px 0;
                        transform: rotateZ(-35deg);
                        &.active {
                            transform: rotateZ(0deg);
                        }
                    }
                    .player-disco {
                        width: 100px;
                        height: 100px;
                        position: absolute;
                        left: 50%;
                        margin-left: -50px;
                        top: 10px;
                        background: url(${discoUrl}) no-repeat center center;
                        background-size: cover;
                        animation: discoRotate 20s linear forwards infinite;
                        animation-play-state: paused;
                        &.active {
                            animation-play-state: running;
                        }
                        @keyframes discoRotate{
                            0% {
                                transform: rotateZ(0deg);
                            }
                            100% {
                                transform: rotateZ(360deg);
                            }
                        }
                        .player-disco-cover {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 63%;
                                height: 63%;
                                margin-top: -31.5%;
                                margin-left: -31.5%;
                                border-radius: 50%;
                                background: #BBDEDF;
                        }
                        .player-disco-img {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 63%;
                                height: 63%;
                                margin-top: -31.5%;
                                margin-left: -31.5%;
                                border-radius: 50%;
                        }
                    }
                }   

            }
            .player-info {
                flex: 1;
                padding: 6px 7px 0 7px;
                height: 120px;
                display: flex;
                flex-direction: column;
                .player-info-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 25px;
                    .player-info-title {
                        width: 50%;
                        display: flex;
                        .player-info-song {
                            font-size: 1em;
                            margin-left: 4px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            max-width: 160px;
                        }
                        .player-info-singer {
                            font-size: 0.8em;
                            color: #41484e;
                            margin-left: 8px;
                            line-height: 25px;
                            white-space: nowrap;
                        }
                      
                    }
                    .player-info-header-control {
                        .player-info-formControlLabel {
                            height: 25px;
                            & p {
                                font-size: 12px;
                            }
                        }
                        .player-info-switch {
                            height: 25px;
                            width: 38px;
                            &>span {
                                height: 24px;
                                width: 24px;
                                &.MuiSwitch-checked-84 {
                                    color: ${dHeaderBlue};
                                }
                            }
                        }
                    }
                    
                }
                .player-info-lyric {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    background: #FFF;
                    &::before {
                        content: ' ';
                        position: absolute;
                        top: 0;
                        z-index: 11;
                        display: block;
                        overflow: hidden;
                        width: 100%;
                        height: 10%;
                        background: linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0) 100%);
                    }
                    &::after {
                        content: ' ';
                        position: absolute;
                        bottom: 0;
                        z-index: 11;
                        display: block;
                        overflow: hidden;
                        width: 100%;
                        height: 33%;
                        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
                    }
                    .player-lyrics-lines {
                        padding: 4px;
                        font-size: 14px;
                        position: relative;
                        z-index: 10;
                        .player-lyrics-line {
                            text-align: center;
                            &.active {
                                color: #0eb765;
                            }
                        }
                    }
                }
                .player-info-control {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    position: relative;
                    z-index: 20;
                    height: 26px;
                    margin-top: 4px;
                    .iconBtn {
                        width: 24px;
                        height: 26px;
                    }
                    
                    .player-changeSong-wrapper {
                        flex: 1; 
                        .player-changeSong {
                            display: flex;
                            justify-content: space-around;
                            height: 26px;
                            .player-changeSong-btn {
                                
                            }
                        }
                    }
                    .player-time {
                        font-size: 12px;
                        width: 70px;
                        @media (min-width: 500px) {
                            margin: 0 8px;
                        }
                        @media (min-width: 700px) {
                            margin: 0 1em;
                        }
                        @media (min-width: 1000px) {
                            margin: 0 1.5em;
                        }
                    }
                   
                    .player-mode {
                        display: inline-flex;
                        @media (min-width: 500px) {
                            margin: 0 8px;
                        }
                        @media (min-width: 700px) {
                            margin: 0 1em;
                        }
                        @media (min-width: 1000px) {
                            margin: 0 1.5em;
                        }
                    }
                }
            }
            .player-control {
                margin-top: 4px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(100% - 40px);
                .player-bar-wrapper {
                    flex: 1;
                    margin: 0 0.5em;
                    cursor: pointer;
                    .player-bar {
                        height: 4px;
                        position: relative;
                        background: #CCC;
                        .player-played {
                            top: 0;
                            left: 0;
                            width: 100%;
                            bottom: 0;
                            position: absolute;
                            transition: transform 0.2s linear;
                            transform-origin: left;
                            background: #2196f3;
                            z-index: 1;
                            }
                            .player-loaded {
                            top: 0;
                            left: 0;
                            width: 100%;
                            bottom: 0;
                            position: absolute;
                            transition: transform 0.2s linear;
                            transform-origin: left;
                            background: #bbdefb;
                            }
                            .player-played-thumb {
                                position: absolute;
                                top: 0;
                                right: -6px;
                                margin-top: -6px;
                                margin-right: -10px;
                                height: 16px;
                                width: 16px;
                                border-radius: 50%;
                                background: ${thumbBlue};
                                cursor: pointer;
                                border: 2px solid ${thumbborderBlue};
                            }
                    }
                }
                .player-volume-wrapper {   
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    @media (min-width: 500px) {
                        margin: 0 8px;
                    }
                    @media (min-width: 700px) {
                        margin: 0 1em;
                    }
                    @media (min-width: 1000px) {
                        margin: 0 1.5em;
                    }
                    .player-volume { 
                        .iconBtn {
                            height: 40px;
                        }
                    }
                    .player-volume-bar-wrapper {
                        width: 100px;
                        height: 4px;
                        .player-volume-bar {
                            height: 4px;
                            background: #aaa;
                            position: relative;
                            .aplayer-volume {
                                position: absolute;
                                top: 0;
                                left: 0;
                                height: 5px;
                                transition: all 0.1s ease;
                                background: ${dHeaderBlue}
                            }
                        }

                    }
                }
            }
        }
    }
    .song-lists-wrapper {
        .song-lists {
          .song-lists-header {
             position: relative;
             height: 100px;
             overflow: hidden;
              .song-lists-content {
                 position: relative;
                 z-index: 10;
                 padding: 0 1em;
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 background: rgba(0, 0, 0, 0.3);
              }
              .song-lists-img {
                    width: 100px;
                    margin-right: 1em;
                    border: 4px solid #FFF;
                    box-shadow: 0 0 10px #ff9090;
                }
              .song-lists-title {
                  font-size: 1.2em;
                  color: ${titleBlue}
              }
              .song-lists-bg {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  z-index: 1;
                  filter: blur(15px);
                  transform: scale(1.15);
              }
          }
          
        }
        .disLists {
            background: ${disListsGreen};
            overflow: hidden;
            padding: 0;
           
            .downloadbtn {
                position: relative;
                z-index: 10;
                cursor: pointer;
            }
            .disLists-header {
                background: ${dHeaderBlue};
                color: #FFF;
                box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
            }
            .disLists-wrapper {
                overflow: auto;
                height: calc(70px * 3);
            }
            .disList {
                position: relative;
                &.active {
                    .disList-cur {
                        display: block;
                    }
                }
                .disList-cur {
                    background: #f0749e;
                    width: 4px;
                    height: calc(100% - 24px);
                    position: absolute;
                    left: 0;
                    top: 12px;
                    display: none;
                }
                .disList-content {
                     cursor: pointer;
                    .disList-title {
                        font-size: 1em;
                    }
                    .disList-subtitle {
                        font-size: 0.8em;
                    }
                }
            }
        }
        .song-lists-control {
            box-shadow: 0px -2px 2px -1px rgba(0, 0, 0, 0.1),
                        0px -4px 3px 0px rgba(0, 0, 0, 0.07),
                        0px -1px 6px 0px rgba(0, 0, 0, 0.06);
        }
    }
    


`



export {
   MusicDiv
}