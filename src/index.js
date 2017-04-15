import React from 'react';
import {render} from 'react-dom';
import 'react-mdl/extra/css/material.blue-red.min.css';
import 'react-mdl/extra/material.js';
import './App.css';
import {
    Grid,
    Cell,
    Layout,
    Header,
    HeaderRow,
    HeaderTabs,
    Tab,
    Drawer,
    Navigation,
    Content,
    Button,
    Card,
    CardTitle,
    CardActions,
    Textfield,
    List,
    ListItem,
    ListItemContent
} from 'react-mdl';
import CustomSnackBar from './CustomSnackBar';
import FacebookButton from './FacebookButton';
import SelectableList from './SelectableList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            snackbar: undefined,
            selectedListItem: 0
        }
    }

    componentDidMount() {
        this.handleTabOnChange(this.state.selectedTab);
    }

    handleSelectItem = (item) => {
        this.setState({selectedListItem: item})
    }

    handleTabOnChange = (tabId) => {
        this.setState({selectedTab: tabId});
    };

    handleTabContent = () => {
        return `Tab selected: ${this.state.selectedTab}`;
    };

    render() {
        return (
            <Layout fixedHeader fixedTabs>
                <Header></Header>
                <Drawer title="Title">
                    <Navigation>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                    </Navigation>
                </Drawer>
                <Content className="main-content">
                    <Card shadow={3} className="card">
                        <CardTitle expand className="card-title"><img src="http://loremflickr.com/300/100"/></CardTitle>
                        <CardTitle expand className="card-title-text">Acessar sua conta</CardTitle>
                        <form>
                            <Content>
                                <Grid>
                                    <Cell col={12}>
                                        <Textfield className="card-textfield" id="email" type="text" label="Email" floatingLabel/>
                                    </Cell>
                                    <Cell col={12}>
                                        <Textfield className="card-textfield" id="password" type="password" label="Password" floatingLabel/>
                                    </Cell>
                                    <Cell col={12}>
                                        <Button raised ripple primary onClick={e => {
                                            this.state.snackbar.showSnackbar(this.handleTabContent())
                                        }}>Entrar</Button>
                                    </Cell>
                                    <Cell col={12}>
                                        <hr/>
                                    </Cell>
                                    <Cell col={12}>
                                        <FacebookButton text={`Entrar com o Facebook`}/>
                                    </Cell>
                                    <Cell col={12}>
                                        <hr/>
                                    </Cell>
                                    <Cell col={12}>
                                        <span>Não possui uma conta?
                                            <a href="#">Registre-se AGORA!</a>
                                        </span>
                                    </Cell>
                                </Grid>
                            </Content>
                        </form>
                    </Card>
                    <SelectableList listWrapper={List} onSelectItem={(index, extra) => {
                        console.log(extra)
                    }} extraReturn="id">
                        <ListItem id={{
                            id: "batata-1"
                        }}>
                            <ListItemContent icon="person">Bryan Cranston</ListItemContent>
                        </ListItem>
                        <ListItem>
                            <ListItemContent icon="person">Aaron Paul</ListItemContent>
                        </ListItem>
                        <ListItem id={{
                            id: "batata-3"
                        }}>
                            <ListItemContent icon="person">Bob Odenkirk</ListItemContent>
                        </ListItem>
                    </SelectableList>
                </Content>
                <CustomSnackBar ref={(snackbar) => {
                    this.state.snackbar = snackbar
                }}/>
            </Layout>
        )
    }
}

render(
    <App/>, document.getElementById("root"));
