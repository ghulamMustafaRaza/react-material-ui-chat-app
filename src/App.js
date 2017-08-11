import React from 'react';
import { Paper, TextField, IconButton, RaisedButton } from "material-ui"
import Mic from 'material-ui/svg-icons/av/mic';
import ContentSend from 'material-ui/svg-icons/content/send';
import * as $ from 'jquery' 
import { database } from 'firebase'

const styles = {
    paper: {
        width: '80vw',
        height: '80vh',
        maxWidth: '400px',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
    },
    paper2: {
        width: '80vw',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
    },
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    record: {
        width: '95%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 10
    },
    record1: {
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        margin: 10
    },
    logOut: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    messagesBody: {
        width: 'calc( 100% - 20px )', 
        margin: 10,
        overflowY: 'scroll', 
        height: 'calc( 100% - 80px )'
    },
    message: {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export default class App extends React.Component{

    state = {
        messages: [],
        text: "",
        name: null,
        name1: ''
    }
    send = () => {
        this.ref.push({
            name: this.state.name,
            message: this.state.text
        }).then((data)=>{console.log(data)}).catch((err) => {console.log(err)})
    }
    
    setName = () => {
        localStorage.setItem('userName', this.state.name1)
        this.setState({name: this.state.name1})
    }

    logOut = () => {
        localStorage.removeItem('userName')
        this.setState({name: null})
    }

    ref = database().ref('messages')

    componentDidMount() {
        var name = localStorage.getItem('userName')
        console.log(name)
        this.setState({name})
        this.ref.limitToLast(40).on('value', snap => {
            var obj = snap.val();
            var arr = [];
            for(let a in obj) {
                arr.push(obj[a])
            }
            this.setState({messages: arr})
            setTimeout(() => {
                document.querySelector('#style-1').scrollTo(0,document.querySelector('#style-1').scrollHeight)
            }, 100)
        })
    }

    componentWillUnMount() {
        this.ref.of('value')
    }

    render(){
        return(
            <div style={styles.container}>
                {this.state.name !== null?
                    <div>
                    <RaisedButton style={styles.logOut} onClick={this.logOut} secondary label="Log Out"/>
                        <Paper style={styles.paper} zDepth={2} >
                            <Paper id="style-1" style={styles.messagesBody}>
                                {
                                    this.state.messages.map(el =>
                                        (
                                            <div style={styles.message}>
                                                <span>{el.message}</span>
                                                <sub>{el.name}</sub>
                                            </div>
                                        )
                                    )
                                }
                            </Paper>
                            <div style={styles.record}>
                                <TextField
                                    id="input"
                                    value={this.state.text}
                                    onChange={ev => {
                                        this.setState({text: ev.target.value})
                                    }}
                                    onKeyPress={(event) => {
                                        if (event.which === 13) {
                                            event.preventDefault();
                                            $('#btn').focus();
                                            $('#btn').click();
                                        }
                                    }}
                                    hintText="Full width"
                                    fullWidth={true}
                                />
                                <IconButton onClick={this.send} ref='send' id="btn" className="micBtn" style={styles.MicBtn}>
                                    <ContentSend/>
                                </IconButton>
                            </div>
                        </Paper>
                    </div>
                :
                    <Paper style={styles.paper2} zDepth={2} >
                        <div style={styles.record1}>
                            <TextField
                                id="input1"
                                value={this.state.name1}
                                onChange={ev => {
                                    this.setState({name1: ev.target.value})
                                }}
                                onKeyPress={(event) => {
                                    if (event.which == 13) {
                                        event.preventDefault();
                                        $('#btn1').focus();
                                        $('#btn1').click();
                                    }
                                }}
                                hintText="Enter Your Name"
                                fullWidth={true}
                            />
                            <IconButton onClick={this.setName} ref='send' id="btn1" className="micBtn" style={styles.MicBtn}>
                                <ContentSend/>
                            </IconButton>
                        </div>
                    </Paper>
                }
            </div>
        )
    }
}