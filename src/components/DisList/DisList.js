import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'
import AudiotrackIcon from 'material-ui-icons/Audiotrack'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {musicApi} from '../../api/api.js' 
import IconButton from 'material-ui/IconButton'


export default class DisList extends Component {
    static get propTypes() { 
        return { 
            jsDisList: PropTypes.array,
            _this: PropTypes.object,
            value: PropTypes.number,
            index: PropTypes.number,
            songIndex: PropTypes.number,
            chooseSong: PropTypes.func,
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            isFirst: false
        }
    }

    
    componentWillMount() {
        this.setState({
            isFirst: true
        })
    }

     
    
    componentWillReceiveProps(nextProps) {
        const {isFirst} = this.state
        const {jsDisList, _this, songIndex, value, chooseSong} = nextProps


        if(isFirst && jsDisList.length && jsDisList[0]) {
            _this.getSong(jsDisList[0], 0)
            this.setState({
                isFirst: false
            })
        }

        if( value === this.props.value)  return     
        chooseSong(0)
        const scrollTimer = setInterval(() => {
            if(this._disListsWrapper.scrollTop === 0 ) {
                clearInterval(scrollTimer)
            }
            else {
                this._disListsWrapper.scrollTop -= this._disListsWrapper.scrollTop * 0.2
            }
        }, 100)
        
    }
    

    chooseSong (songIndex, list) {
        const { _this} = this.props
        const {chooseSong} = this.props
        chooseSong(songIndex)
        _this.getSong(list)
    }
    


    render() {

        const {jsDisList, _this, songIndex} = this.props
        const className = (index) => {
            return classNames("disList", {'active': index === songIndex})
        } 

       

        const disLists = jsDisList.map((list, index) => {
            return (
                <ListItem key={index} className={className(index)} 
                ref={list => this._dislist = list}
                >
                    <span className="disList-cur"></span>
                    <ListItemIcon>
                        <AudiotrackIcon />
                    </ListItemIcon>
                    <ListItemText inset disableTypography
                            onClick={() => { 
                            this.chooseSong(index, list)
                        }}
                     primary={
                        <div className="disList-content">
                            <h3 className="disList-title">{list.songname}</h3>
                            <h4 className="disList-subtitle">{list.singer} - {list.albumname}</h4>
                        </div>
                    } />
                    <IconButton className="downloadbtn" 
                        >
                        <a  
                            rel="noopener noreferrer"
                            href={musicApi.song(list.songid)}
                            download>
                            <FileDownloadIcon />
                        </a>
                    </IconButton>
                </ListItem>
            )
        })


        return (
            <List className="disLists" 
            subheader={<ListSubheader className="disLists-header">歌曲列表 ( 共 {jsDisList.length} 首 )</ListSubheader>}>
                <div className="disLists-wrapper" 
                ref={wrapper => this._disListsWrapper = wrapper}>
                    {disLists}
                </div>
            </List>
        )
    }
}
