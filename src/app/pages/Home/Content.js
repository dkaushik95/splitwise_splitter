import React, { Component } from 'react';
import AppStore from '../../stores/AppStore';
import { observer } from "mobx-react";
import Header from '../../components/Header/Header';
import { Typography, Card, CardHeader, Avatar, CardContent, Icon, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, CardActions, Button, Chip, Grid, Divider } from '@material-ui/core';


class Content extends Component {

    constructor(){
        super()
        this.state = {
            amount: 0,
            transactions: [],
            checked: this.getDefaultChecked()
        }
    }

    onChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    onCheckBoxChange = (e, name) => {
        let checked = this.state.checked
        checked[name] = !checked[name]
        this.setState({
            checked: checked
        })
        // this.state.checked[name] = !this.state.checked[name]
    }

    onCalculate = (e) => {
        e.preventDefault()
        if(this.state.amount === 0) {
            console.log('amount is zero')
            return
        }
        let numOfChecks = 0
        let peopleWhoOwe = []
        for(let key in this.state.checked){
            if(this.state.checked[key]){
                numOfChecks += 1
                peopleWhoOwe.push(key)
            }
        }
        if(numOfChecks === 0){
            console.log('no one is checked, free money')
            return
        }
        let eachAmount = this.state.amount / numOfChecks
        AppStore.addValues(this.state.checked, eachAmount)
        this.state.transactions.push({
            amount: this.state.amount,
            peopleWhoOwe: peopleWhoOwe
        })
        this.setState({
            amount: 0,
            checked: this.getDefaultChecked()
        })
    }

    getDefaultChecked = () => {
        let checked = {}
        AppStore.people.forEach(person => {
            checked[person.name] = false
        })
        return checked
    }

    generateChips = (peopleWhoOwe) => {
        return (
            <div>
                {peopleWhoOwe.map((person, i) => {
                    return (
                        <Chip 
                            key={i}
                            avatar={<Avatar>{person[0]}</Avatar>}
                            label={person}
                            style={{marginRight: '16px'}}
                        />
                    )
                })}
            </div>
        )
    }

    round = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0)
        return Math.round(value * multiplier) / multiplier
    }

    render() {
        return (
            <div>
                <Header>Splitwise Splitter</Header>
                <div style={{marginTop: '10px'}}>
                    <Typography align='center' variant='display1'>Totals</Typography>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        {AppStore.people.map((person, i) => {
                            return (
                                <Card key={i} style={{flex: 1}}>
                                    <CardHeader title={person.name} avatar={<Avatar>{person.name[0]}</Avatar>} />
                                    <CardContent>
                                        <Typography variant='h3'>${this.round(person.total, 2)}</Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                        <Card style={{flex: 1}}>
                            <CardHeader title='Total' avatar={<Avatar><Icon>shopping_cart</Icon></Avatar>} />
                            <CardContent>
                                <Typography variant='h3'>${this.round(AppStore.getTotal(), 2)}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                
                <Card style={{
                    width: '100%',
                    maxWidth: '500px',
                    margin: '1px auto'
                }}>
                    <form onSubmit={this.onCalculate}>
                    <CardHeader title='Add a transaction' />
                    <CardContent>
                        <TextField style={{width: '100%'}} type='number' value={this.state.amount} onChange={this.onChange} />
                        <List>
                            {AppStore.people.map((person, i) => {
                                return (
                                    <ListItem key={i}>
                                        <Avatar>{person.name[0]}</Avatar>
                                        <ListItemText primary={person.name} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                checked={this.state.checked[person.name]} 
                                                onChange={(e) => this.onCheckBoxChange(e,person.name)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' size='large' color='secondary'>
                            Add
                        </Button>
                    </CardActions>
                    </form>
                </Card>
                

                <div style={{
                    maxWidth: '700px',
                    width: '100%',
                    margin: '1px auto'
                }}>
                    <Typography align='center' style={{marginTop: '30px'}} variant='display1'>Transaction list</Typography>
                    {this.state.transactions.map((transaction,i) => {
                        return (
                            <Card key={i} style={{marginTop: '10px'}}>
                                <CardContent>
                                    <Grid  container alignItems='center'>
                                        <Grid item xs>
                                            <Typography gutterBottom variant='h4'>${transaction.amount}</Typography>
                                            <Divider variant='middle' />
                                            <div>
                                                <Typography gutterBottom variant='body1'>People Involved</Typography>
                                                {this.generateChips(transaction.peopleWhoOwe)}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default observer(Content);
