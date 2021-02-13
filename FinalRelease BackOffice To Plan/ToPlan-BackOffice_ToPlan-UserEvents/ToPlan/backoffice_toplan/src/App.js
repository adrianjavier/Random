import './App.css';
import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {Users} from "./components/Users/Users";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.css';
import {Events} from "./components/Events/Events";
import {TypePlan} from "./components/TypePlan/TypePlan";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputMask} from "primereact/inputmask";
import {InputText} from "primereact/inputtext";
import axios from "axios";
import logo from "./assets/circulos.png"
import {Password} from "primereact/password";


export class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
            displayModal: false,
            visible: true,
            token: 'tokentoken',

        }
        this.onHide = this.onHide.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onInputchange = this.onInputchange.bind(this);
        this.checkPassId = this.checkPassId.bind(this);


    }

    render() {
        return (
            <div className="App">
                <img hidden={!this.state.visible} src={logo}/>
                <p hidden={!this.state.visible}>ToPlan</p>


                <div hidden={this.state.visible}>


                    <Router>
                        <div className={"link"}>
                            <nav className={"navBar"}>
                                <Link className={"link"} to="/users">Users </Link><br/>
                                <Link className={"link"} to="/events">Events</Link>
                                <Link className={"link"} to="/typePlan">TypePlan</Link>
                            </nav>
                            <Switch>
                                <Route path="/users">
                                    <Users token={this.state.token}/>
                                </Route>
                                <Route path="/events">
                                    <Events/>
                                </Route>
                                <Route path="/typePlan">
                                    <TypePlan/>
                                </Route>


                            </Switch>
                        </div>
                    </Router>
                </div>
                {this.renderComponent()}


            </div>
        );
    }


    renderComponent = () => {

        return (
            <div className={"login"}>
                <Dialog header={"Login"} closable={false} visible={!this.state.displayModal} modal={false}
                        style={{width: '30vw'}} onHide={() => this.onHide('displayModal')}>
                    <div className={"inputLogin"}>
                        <div className={"inputs"}>
                            <InputText name="userId" placeholder={"User Mail"} onChange={this.onInputchange}/>
                            <br/>
                            <Password style={{marginTop: 10}} name="password" placeholder={"Password"}
                                      onChange={this.onInputchange}/>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: 10,
                        }}>

                            <Button label="Login" icon="pi pi-check" onClick={this.checkPassId} autoFocus/>
                        </div>
                    </div>
                </Dialog>
            </div>)
    }


    onHide = () => {
        this.setState({displayModal: false});
    }
    onClick = () => {
        this.setState({displayModal: true});

    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    checkerAdmin = async () => {

        let checker = false

        const promise = axios.get('http://54.234.64.228:44360/api/User/CheckAdmin?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            checker = respuesta.data

            if (checker == true) {
                console.log("El user es admin ")
                this.setState({checker: true},()=>this.login())
                return checker

            } else {
                this.setState({checker: false})
                return checker


            }
        }).catch(e => {
            console.log(e);
            return null

        });

    }
    checkerUser = async () => {

        let checker = false

        const promise = axios.get('http://54.234.64.228:44360/api/User/Check?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            checker = respuesta.data

            if (checker == true) {
                console.log("El user es admin ")
                this.setState({checkeruser: true},() => this.checkerAdmin())
                return checker


            } else {
                this.setState({checkeruser: false})
                return checker


            }
        }).catch(e => {
            console.log(e);
            return null

        });

    }
    checkPassId = async () => {

        let checker1, checker2
        checker1 = this.checkerUser()


    }

    login = async () => {
        console.log(this.state.checker, this.state.checkeruser)

        if (this.state.checker == true && this.state.checkeruser) {
            console.log("Entro")

            const promise = axios.get('http://54.234.64.228:44360/api/User/GetPassword?id=' + this.state.userId + "&p=" + this.state.password, {headers: {'Access-Control-Allow-Origin': '*'}})
            const promiseResult = promise.then((respuesta) => {
                console.log(respuesta.data)
                if (respuesta.data == true) {
                    alert('correct')

                    this.setState({visible: false, displayModal: true})
                } else {
                    alert('Login Incorrecto')

                    return false
                }
            }).catch(e => {
                console.log(e);
                return null

            });
        }
    }
}

export default App;

