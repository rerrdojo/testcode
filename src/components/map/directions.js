import React, {Component} from 'react'
import { Grid, Input, Icon, Button, List, Modal, Header, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Addservice} from './../../actions'

class Directions extends Component {
    
    constructor(props){
        super(props)
        this.state  = {
            fee: 0,
            totaldistance: 0,
            popup: false,
            cod: false,
            roundtrip: false,
            bigpracel: false,
            modalOpen: false
        }
    }

    componentWillMount() {
        if(!this.props.direction.direction){
            this.props.history.push('/')
        } else {
            this.setState({ totaldistance: this.props.direction.direction.totaldistance, fee : this.props.direction.direction.totaldistance * 50})
        }
    }

    changeservice = (e, type) => {
        this.setState({ [type]: !this.state[type] })
    }

    popup = () => this.setState({ popup: !this.state.popup })
    
    close = () => this.setState({ popup: !this.state.popup })

    addservice = () => {
        let { cod, roundtrip, bigpracel} = this.state
//        let total = fee
        let fee = (this.props.direction.direction.totaldistance * 50)

            if(cod) fee += 50
            if(roundtrip) fee += 100
            if(bigpracel) fee += 200
                  
        this.setState({fee: fee, popup: !this.state.popup})
       
    }

    confirm = () => {
        let {cod, roundtrip, bigpracel, fee} = this.state
        this.props.dispatch(Addservice({
            cod: cod,
            roundtrip: roundtrip,
            bigpracel: bigpracel,
            fee: fee
        })) 

        this.setState({
            modalOpen: !this.state.modalOpen
        })

    }

    handleClose = () => this.setState({modalOpen : false})

    render(){
        let direction = ''

        if(!!this.props.direction.direction) 
        {
        direction = this.props.direction.direction.routes.map((value, key) => 
            <Grid.Column width={16} key={`directions${key}`} >
                <Grid >
                <Grid.Column width={8} >

                    <Input fluid  type='text' >
                        <Button color="blue" icon="marker" content={key +1}/>
                        <input value={value.value} />
                    </Input>
                    
                </Grid.Column>

                <Grid.Column width={8} >

                    <Input fluid  type='text' >
                        <input value='Mobile' />
                    </Input>
                    
                </Grid.Column>
                </Grid >
            </Grid.Column>
        )
        }

        let {cod, roundtrip, bigpracel, popup, fee, totaldistance} = this.state

        return (
            <Grid >
                {direction}

                <Grid.Column width={16} >

                <Grid >
                    <Grid.Column width={8} >
                        Extra Service
                    </Grid.Column>
                    <Grid.Column width={8} >

                        <Button basic content='Open popup' onClick={this.popup} icon='plus' labelPosition='left' />

                        <Modal size="tiny" open={popup} onClose={this.close} >
                            <Header icon='ellipsis vertical' content='Extra services' />


                            <Modal.Content>
                                <List divided verticalAlign='middle'>
                                    <List.Item>
                                    <List.Content floated='right'>
                                            <Checkbox onChange={e => this.changeservice(e, 'cod')} checked={cod}/>
                                    </List.Content>
                                    <Icon name="money" size="big" />
                                    <List.Content>
                                        COD + 50THB
                                    </List.Content>
                                    </List.Item>

                                    <List.Item>
                                    <List.Content floated='right'>
                                            <Checkbox onChange={e => this.changeservice(e, 'roundtrip')} checked={roundtrip}/>
                                    </List.Content>
                                    <Icon name="refresh" size="big" />
                                    <List.Content>
                                        Return trip + 100THB
                                    </List.Content>
                                    </List.Item>

                                    <List.Item>
                                    <List.Content floated='right'>
                                            <Checkbox onChange={e => this.changeservice(e, 'bigpracel')} checked={bigpracel}/>
                                    </List.Content>
                                    <Icon name="cube" size="big" />
                                    <List.Content>
                                        Big pracel + 200THB
                                    </List.Content>
                                    </List.Item>

                                </List>

                            </Modal.Content>

                            <Modal.Actions>
                            <Button color='red' onClick={this.close}>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' onClick={this.addservice}>
                                <Icon name='checkmark' /> Yes
                            </Button>
                            </Modal.Actions>
                        </Modal>
                        
                    </Grid.Column>

                    {cod ?
                    <Grid.Column >
                        <Icon name="money" size="large"/>
                    </Grid.Column>
                    : ''}

                    {roundtrip ? <Grid.Column  >
                        <Icon name="refresh" size="large"/>
                    </Grid.Column>
                    : ''}

                    {bigpracel ? <Grid.Column >
                        <Icon name="cube" size="large"/>
                    </Grid.Column> 
                    : ''}

                </Grid>
                
                </Grid.Column>

                <Grid style={{position:'absolute', bottom:'0',width:'100%', left:'15px'}}>

                    <Grid.Column width={8} >
                            Total distance 
                    </Grid.Column>    
                    <Grid.Column width={8} >
                            {totaldistance} KM
                    </Grid.Column>

                    <Grid.Column width={8} >
                            Fee 
                    </Grid.Column>    
                    <Grid.Column width={8} >
                            {fee} THB
                    </Grid.Column>

                    <Grid.Column width={8} >
                        <Button fluid basic >
                            <Link to="/">Back</Link>
                        </Button>
                    </Grid.Column>    
                    <Grid.Column width={8} >
                        <Button color='green' onClick={this.confirm} fluid>Confirm</Button>
                    </Grid.Column>

                </Grid>
                

                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        basic
                        size='small'
                    >
                        <Header icon='check' content='Confirm successful' />
                        <Modal.Content>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> OK
                        </Button>
                        </Modal.Actions>
                    </Modal>
            </Grid>
        )
    }
}

const directions = state => {
  return {
    direction: state.direction
  }
}

Directions = connect(directions)(Directions)

export default Directions