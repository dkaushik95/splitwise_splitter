import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import { observer } from "mobx-react";
import Header from '../../components/Header/Header';
import { Link } from "react-router-dom";
import { Card, Button, Typography, CardContent, List, ListItem, ListItemAvatar, Avatar, Icon, ListItemText, ListItemSecondaryAction, IconButton, TextField, Fab } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentInput: ''
        }
    }
    

    remove = (person) => {
        AppStore.remove(person)
    }


    onChange = (event) => {
        this.setState({
            currentInput: event.target.value
        })
    }

    onAdd = (e) => {
        e.preventDefault()
        if(this.state.currentInput !== '') {
            AppStore.add(this.state.currentInput)
            this.setState({
                currentInput: ''
            })
        }
    }

    next = (e) => {
        console.log(e)
        if(AppStore.people.length === 0) {
            alert('Please enter at least 1 person to continue')
            e.preventDefault()
            return
        }
        AppStore.addToLocal()
        // this.props.history.replace({
        //     pathname: '/content'
        // })
    }

    generatePeopleList = () => {
        return AppStore.people.map((person, i) => {
            return (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Avatar>
                            {person.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={person.name}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.remove(person.name)} aria-label='Delete'>
                            <Icon>delete</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })
    }

    render() {
        return (
            <div>
                <Header>Welcome to Splitwise Splitter</Header>
                <div style={{
                    maxWidth: '800px',
                    margin: '30px auto'
                }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' color='textPrimary' gutterBottom>
                                Who all are involved?
                            </Typography>
                            <Typography variant='subheading' color='textSecondary'>
                                If you have been here before, previous participants will be present
                            </Typography>
                            <List>
                                {this.generatePeopleList()}
                            </List>
                            <form onSubmit={this.onAdd} style={{
                                margin: '1 auto',
                                textAlign: 'center'
                            }}>
                                <TextField
                                    type='text'
                                    value={this.state.currentInput}
                                    onChange={this.onChange}
                                    label="Enter a name"
                                />
                                <Fab type='submit' color='secondary' size='large'>
                                    <Icon>add</Icon>
                                </Fab>
                            </form>
                        </CardContent>
                    </Card>
                    <Link onClick={this.next} to='/content'>
                        <Button style={{maxWidth: '800px', width: '100%'}} variant='contained' color='primary' size='large'>Press here to start the splitter</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default observer(Home);
