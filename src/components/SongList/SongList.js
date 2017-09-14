import React, { Component } from 'react'
import PropTypes from 'prop-types'




export default class SongList extends Component {
    static get propTypes() { 
        return { 
            img: PropTypes.string.isRequired,
            songListDesc: PropTypes.string.isRequired,
            getDisLists: PropTypes.func,
            id: PropTypes.string,
        }
    }


    
    componentWillMount() {
        const {getDisLists, id} = this.props
        getDisLists(id)
    }
    


    render() {

        const {img, songListDesc} = this.props
        

        return (
            <div className="song-lists">
                <header className="song-lists-header">
                    <div className="song-lists-content">
                        img ? <img src={img} className="song-lists-img"/> : null
                        <h2 className="song-lists-title">{songListDesc}</h2>
                    </div>
                    <div className="song-lists-bg" style={{
                        background: `url(${img}) no-repeat center/ cover`
                    }}>  
                    </div>
                </header>
                
            </div>
        )
    }
}
