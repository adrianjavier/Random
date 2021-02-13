import * as React from "react";
import {TabPanel, TabView} from "primereact/tabview";
import axios from "axios";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/vela-orange/theme.css';
import 'primereact/resources/primereact.css';
import {InputMask} from "primereact/inputmask";
import {Checkbox} from "primereact/checkbox";


export class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            nameUser: '',
            birthDate: '',
            surnameUser: '',
            passwordUser: '',
            admin: false,
            visible: true,
            token: this.props.token,

            preferencesArr: [],
            preferences: [],


        }
        this.getAllUsers = this.getAllUsers.bind(this);
        this.checkerUser = this.checkerUser.bind(this);
        this.onInputchange = this.onInputchange.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.validUserId = this.validUserId.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUserByName = this.getUserByName.bind(this);

    }


    render() {
        const columns = [
            {field: 'UserId', header: 'Email'},
            {field: 'Name', header: 'nombre'},
            {field: 'Surname', header: 'Surname'},
            {field: 'Password', header: 'password'},
            {field: 'FechaNacimiento', header: 'birthDate'},
            {field: 'Admin', header: 'Admin'},

        ];


        const dynamicColumns = columns.map((col, i) => {
            return <Column className={'column'} key={col.field} field={col.field} header={col.header}/>;
        });
        return (
            <div className={'mainContainer'}>
                <TabView className={"TabView"}>

                    <TabPanel header={'Get'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>
                                <div className={"inputButton"}>
                                    <label>Get All User &nbsp;</label>

                                    <Button onClick={this.getAllUsers} icon={'pi pi-check'}></Button>
                                </div>

                                <DataTable value={this.state.users}>
                                    {dynamicColumns}

                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header={'Get by Id'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>

                                <div className={"inputButton"}>
                                    <label>Por Id&nbsp;</label>
                                    <InputText placeholder={"User Id"} className={'inputText'} name="userId"
                                               onChange={this.onInputchange}/>
                                    <Button onClick={this.getUserById} icon={'pi pi-check'}></Button>
                                </div>


                                <DataTable value={this.state.users}>
                                    {dynamicColumns}

                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header={'Get by Name'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>


                                <div className={"inputButton"}>
                                    <label>Por nombre&nbsp;</label>
                                    <InputText placeholder={"User Name"} className={'inputText'} name="name"
                                               onChange={this.onInputchange}/>
                                    <Button onClick={this.getUserByName} icon={'pi pi-check'}></Button>
                                </div>

                                <DataTable value={this.state.users}>
                                    {dynamicColumns}

                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header={'Update'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>
                                <div className={"inputButton"}>

                                    <label>Update User&nbsp;</label>
                                    <div hidden={!this.state.visible}>
                                        <InputText placeholder={"User Mail"} className={'inputText'} name="userId"
                                                   onChange={this.onInputchange}/>
                                        <Button style={{marginLeft: 10}} onClick={this.checkerUser}
                                                icon={'pi pi-check'}></Button>
                                    </div>

                                    <div className={"updateInputs"} hidden={this.state.visible}>


                                        <InputText placeholder={"User Name"} className={'inputText'} name="name"
                                                   onChange={this.onInputchange}/>
                                        <InputText placeholder={"User SurName"} className={'inputText'}
                                                   name="surname" onChange={this.onInputchange}/>
                                        <InputText placeholder={"User Password"} className={'inputText'}
                                                   name="password" onChange={this.onInputchange}/>


                                        <InputMask mask="9999-99-99" placeholder={"birthDate"} name={"birthDate"}
                                                   value={this.state.birthDate} slotChar={"yyyy-mm-dd"}
                                                   onChange={this.onInputchange}></InputMask>
                                        <Button style={{marginLeft: 10}} onClick={this.updateUser}
                                                icon={'pi pi-check'}></Button>
                                        <h5>Preferences</h5>
                                        <label>Sport</label>
                                        <Checkbox style={{marginLeft: 20, marginRight: 10}} name="preferences"
                                                  value="sport;" onChange={(e) => {
                                            this.setState({
                                                preferences: this.state.preferences + e.value,
                                                sportPreference: !this.state.sportPreference
                                            })
                                        }} checked={this.state.sportPreference == true}></Checkbox>
                                        <label>Gastronomy</label>

                                        <Checkbox style={{marginLeft: 20, marginRight: 10}} name="preferences"
                                                  value="gastronomy;" onChange={(e) => {
                                            this.setState({
                                                preferences: this.state.preferences + e.value,
                                                gastronomyPreference: !this.state.gastronomyPreference
                                            })
                                        }} checked={this.state.gastronomyPreference == true}></Checkbox>
                                        <label>Leisure</label>

                                        <Checkbox style={{marginLeft: 20, marginRight: 10}} name="preferences"
                                                  value="leisure;" onChange={(e) => {
                                            this.setState({
                                                preferences: this.state.preferences + e.value,
                                                leisurePreference: !this.state.leisurePreference
                                            })
                                        }} checked={this.state.leisurePreference == true}></Checkbox>


                                        <div className={"admin"}>
                                            <Button onClick={this.makeAdmin}
                                                    label={"Make Admin"}></Button>
                                            <Button style={{marginLeft: 10}} onClick={this.deleteAdmin}
                                                    label={"Remove Admin"}></Button>
                                        </div>
                                        <Button style={{marginTop: 50, width: 300}}
                                                label={"Update user with id " + this.state.userId}
                                                onClick={this.updateUser}/>


                                    </div>

                                </div>

                                <DataTable value={this.state.users}>
                                    {dynamicColumns}
                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header={'Delete'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>
                                <div className={"inputButton"}>

                                    <label>Delete User&nbsp;</label>
                                    <InputText placeholder={"User Mail"} className={'inputText'} name="userId"
                                               onChange={this.onInputchange}/>
                                    <Button style={{marginLeft: 10}} onClick={this.deleteUser}
                                            icon={'pi pi-ban'}></Button>
                                </div>

                                <DataTable value={this.state.users}>
                                    {dynamicColumns}
                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel header={'Create'}>
                        <div className={'grupo'}>
                            <div className={'separador'}>

                                <label>Create User&nbsp;</label>
                                <br/>
                                <InputText placeholder={"User Mail"} className={'inputText'} name="userId"
                                           onChange={this.onInputchange}/>


                                <InputText placeholder={"User Name"} className={'inputText'} name="name"
                                           onChange={this.onInputchange}/>
                                <InputText placeholder={"User SurName"} className={'inputText'}
                                           name="surname" onChange={this.onInputchange}/>
                                <InputText placeholder={"User Password"} className={'inputText'}
                                           name="password" onChange={this.onInputchange}/>


                                <InputMask mask="9999-99-99" placeholder={"birthDate"} name={"birthDate"}
                                           value={this.state.birthDate} slotChar={"yyyy-mm-dd"}
                                           onChange={this.onInputchange}></InputMask>
                                <label>&nbsp; &nbsp;Admin &nbsp;</label>


                                <Button style={{marginLeft: 10}} onClick={this.validUserId}
                                        icon={'pi pi-check'}></Button>


                                <DataTable value={this.state.users}>
                                    {dynamicColumns}
                                </DataTable>
                            </div>

                        </div>
                    </TabPanel>
                </TabView>


            </div>
        )
    }

    componentDidMount() {
        console.log(this.state.token)
        const promise = axios.get('http://54.234.64.228:44360/api/Users', {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            respuesta.data.forEach(m => {
                if (m.Admin === true) {
                    m.Admin = '✓';
                } else {
                    m.Admin = 'X';
                }
            })
            this.setState({users: respuesta.data});
        }).catch(e => {
            console.log(e);
        });
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getAllUsers = () => {
        console.log(this.state.token)
        const promise = axios.get('http://54.234.64.228:44360/api/Users', {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            respuesta.data.forEach(m => {
                if (m.Admin === true) {
                    m.Admin = '✓';
                } else {
                    m.Admin = 'X';
                }
            })
            this.setState({users: respuesta.data});
        }).catch(e => {
            console.log(e);
        });
    }
    getUserById = () => {
        const promise = axios.get('http://54.234.64.228:44360/api/User/GetUserId?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            respuesta.data.forEach(m => {
                if (m.Admin === true) {
                    m.Admin = '✓';
                } else {
                    m.Admin = 'X';
                }
            })
            console.log(respuesta.data)
            this.setState({users: respuesta.data});
        }).catch(e => {
            console.log(e);
        });


    }
    getUserByName = () => {
        const promise = axios.get('http://54.234.64.228:44360/api/User/GetUserName?n=' + this.state.name, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((respuesta) => {
            respuesta.data.forEach(m => {
                if (m.Admin === true) {
                    m.Admin = '✓';
                } else {
                    m.Admin = 'X';
                }
            })
            console.log(respuesta.data)
            this.setState({users: respuesta.data});
        }).catch(e => {
            console.log(e);
        });
    }
    checkerUser = () => {


        const promise = axios.get('http://54.234.64.228:44360//api/User/Check?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                this.setState({visible: false})

            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });


    }
    updateUser = () => {
        const promise = axios.put('http://54.234.64.228:44360/api/User?id=' + this.state.userId.toLocaleLowerCase() + '&n=' + this.state.name.toLocaleLowerCase() + '&s=' + this.state.surname.toLocaleLowerCase() + '&f=' + this.state.birthDate + '&p=' + this.state.password, {headers: {'Access-Control-Allow-Origin': '*'}})

        const promiseResult = promise.then((resolveResult) => {

                console.log(resolveResult);
                alert("el Usuario " + this.state.userId + " ha sido Modificado")


            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });


    }
    validUserId = () => {
        console.log(this.state.userId.toLocaleLowerCase())
        const promise = axios.get('http://54.234.64.228:44360/api/User/CheckMail?m=' + this.state.userId.toLocaleLowerCase(), {headers: {'Access-Control-Allow-Origin': '*'}})

        const promiseResult = promise.then((resolveResult) => {

                console.log(resolveResult.data)
                if (resolveResult.data == 1) {
                    this.createUser()
                } else {
                    alert("ID INCORRECTA")
                }
            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });
    }
    createUser = () => {

        const promise = axios.post('http://54.234.64.228:44360/api/User', {
            UserId: this.state.userId.toLocaleLowerCase(),
            Name: this.state.name.toLocaleLowerCase(),
            Surname: this.state.surname.toLocaleLowerCase(),
            Password: this.state.password,
            FechaNacimiento: this.state.birthDate,
            Preferences: "1234",
            Admin: this.state.admin,
            Events: null
        }, {headers: {'Access-Control-Allow-Origin': '*'}})

        const promiseResult = promise.then(() => {
                this.getAllUsers()
                alert("El Usuario " + this.state.userId + " ha sido Creado")

            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });

    }
    makeAdmin = () => {
        const promise = axios.put('http://54.234.64.228:44360/api/User/AdminT?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                console.log(resolveResult);
                alert("Ahora " + this.state.userId + " Es Admin")


            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });


    }
    deleteAdmin = () => {
        const promise = axios.put('http://54.234.64.228:44360/api/User/AdminF?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                resolveResult.data.forEach(m => {
                    if (m.Admin === true) {
                        m.Admin = '✓';
                    } else {
                        m.Admin = 'X';
                    }
                })
                console.log(resolveResult);
                alert("Ahora " + this.state.userId + " No es Admin")

            }
            , (rejectedResult) => {

                console.error(rejectedResult.statusText)
            });

    }
    deleteUser = () => {

        if (this.state.userId == '') {
            alert('Debes Introducir un Valor')

        } else {
            const promise = axios.get('http://54.234.64.228:44360/api/User/Check?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
            const promiseResult = promise.then((resolveResult) => {
                    if (resolveResult.data == true) {
                        const promise = axios.delete('http://3.95.8.159:44360/api/User?id=' + this.state.userId, {headers: {'Access-Control-Allow-Origin': '*'}})
                        const promiseResult = promise.then(() => {
                                this.getAllUsers()

                                console.log(resolveResult);
                                alert("Se ha borrado el usuario " + this.state.userId)
                            }
                        )


                    } else {
                        alert("La id Introducida incorrecta ")

                    }

                }
                , (rejectedResult) => {

                });
        }

    }


}
