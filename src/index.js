import React from 'react';
import {render} from 'react-dom';
import 'react-mdl/extra/css/material.blue-red.min.css';
import 'react-mdl/extra/material.js';
import {
    Grid,
    Cell,
    Layout,
    Header,
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
    ListItemContent,
    Spinner
} from 'react-mdl';
import 'whatwg-fetch';
import sanitizeHtml from 'sanitize-html';
import CustomSnackBar from './CustomSnackBar';
import FacebookButton from './FacebookButton';
import SelectableList from './SelectableList';
import s from './strings';
import './App.css';
const strings = s.strings.app;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            snackbar: undefined,
            selectedListItem: 0,
            posts: []
        }
    }

    componentDidMount() {
        this.handleTabOnChange(this.state.selectedTab);
        this.handleFetchPosts();
    }

    handleFetchPosts = () => {
        fetch('http://fcgomes.ddns.net/wp-json/wp/v2/posts', {method: 'GET'}).then(response => response.json()).then(response => {
            this.setState({posts: response})
        }).catch(error => {
            console.error(error);
        })
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

    renderPosts = () => {
        const {posts} = this.state;
        const prefix = "post-card";
        const postsLength = posts.length;
        if (postsLength === 0)
            return (
                <Grid noSpacing style={{
                    textAlign: 'center'
                }}>
                    <Cell col={12}>{strings.loading}</Cell>
                    <Cell col={12}><Spinner singleColor/></Cell>
                </Grid>
            )

        const columns = postsLength % 4 === 0 && postsLength > 3
            ? 3
            : 6
        return posts.map((item, index) => {
            return (
                <Cell col={columns} key={`${prefix}-${item.id}`} style={{
                    margin: "auto"
                }} className="card-post-cell">
                    <Card shadow={2} className="card-post">
                        <CardTitle expand style={{
                            backgroundImage: `url(${item.featured_image_src})`
                        }} className="card-post-title"/>
                        <CardActions>
                            <Grid noSpacing>
                                <Cell col={12}>
                                    <span dangerouslySetInnerHTML={{
                                        __html: sanitizeHtml(item.title.rendered)
                                    }}/>
                                </Cell>
                                <Cell col={12}>
                                    <span dangerouslySetInnerHTML={{
                                        __html: `${sanitizeHtml(item.excerpt.rendered).slice(0, 17)}...`
                                    }}/>
                                </Cell>
                                <Cell col={12}><hr/></Cell>
                                <Cell col={12}>
                                    <Button>{strings.readMore}</Button>
                                </Cell>
                            </Grid>
                        </CardActions>
                    </Card>
                </Cell>
            )
        })
    }

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
                        <CardTitle expand className="card-title"><img src="http://loremflickr.com/300/100" alt="card+title"/></CardTitle>
                        <CardTitle expand className="card-title-text">{strings.cardTitle}</CardTitle>
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
                    <Grid>
                        {this.renderPosts()}
                    </Grid>
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
