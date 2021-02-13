import React, {Component, useState} from "react";
import axios from "axios";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import "./StyleEvents.css";
import {TabPanel, TabView} from "primereact/tabview";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputTextarea} from "primereact/inputtextarea";
import {InputMask} from "primereact/inputmask";
import {Toast} from 'primereact/toast';


export class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            EventId: '',
            Events: [],
            date: '',
            city: '',
            province: '',
            description: '',
            TypePlanName: '',
            Members: '',
            UserId: '',
            typeName: '',
            Data: '',
            isHidden: false,
            isHidden2: false,
            ListMembers: '',
            direction: '',
            TypePlanArray: [],
            TypePlanId: '',
            ListMembersPlan: [],
        }
        this.onInputChangeTypePlan = this.onInputChangeTypePlan.bind(this);
    }


    componentDidMount() {
        axios.get("http://54.234.64.228:44360/api/TypePlan/List", {}, {headers: {'Access-Control-Allow-Origin': '*'}}).then((response => {
            console.log(response)
            this.setState({TypePlanArray: response.data})
        })).catch((error => {
            console.log(error)
        }));
        this.getEvents();
    }


    getEvents = () => {
        axios.get('http://54.234.64.228:44360/api/Event').then((respuesta) => {
            this.setState({Events: respuesta.data});
        }).catch(e => {
            console.log("Error de conexion con la API");
        });
    }


    onSubmitInsertEvent = () => {
        const Type = this.state.TypePlanId[0];
        const TypePlanId = parseInt(Type);
        console.log(TypePlanId);

        axios.post('http://54.234.64.228:44360/api/Event', {
            UserId: this.state.UserId,
            EventDate: this.state.date,
            City: this.state.city,
            Province: this.state.province,
            Description: this.state.description,
            MaxMembers: this.state.Members,
            TypePlanId: TypePlanId,
            ListMembers: this.state.UserId,
            Direccion: this.state.direction
        })
            .then(() => {
                this.getEvents();
            }, (error) => {
                console.log(error);
            })
    }


    onSubmitUpdate = () => {

        const promiseUpdate = axios.put("http://54.234.64.228:44360/api/Event?id=" + this.state.EventId + "&dir=" + this.state.direction + "&f=" + this.state.date + "&c=" + this.state.city + "&p=" + this.state.province + "&d=" + this.state.description + "&max=" + this.state.Members, {}, {headers: {'Access-Control-Allow-Origin': '*'}}
        ).then(() => {
            this.getEvents();
        }).catch(e => {
            console.log(e);
        });
    }


    onInputEventId = (event) => {
        this.setState({
            EventId: event.target.value
        });
    }

    onInputDate = (event) => {
        this.setState({
            date: event.target.value
        });
    }

    onInputCity = (event) => {
        this.setState({
            city: event.target.value
        });
    }

    onInputProvince = (event) => {
        this.setState({
            province: event.target.value
        });
    }

    onInputDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    onInputUserId = (event) => {
        this.setState({
            UserId: event.target.value
        });
    }

    onInputMembers = (event) => {
        this.setState({
            Members: event.target.value
        });
    }

    onSubmitDeleteEvent = () => {

        let promisePost = axios.delete("http://54.234.64.228:44360/api/Event?id=" + this.state.EventId, {}, {headers: {'Access-Control-Allow-Origin': '*'}}
        ).then(() => {
            this.getEvents();
            console.log("Delete successfully");
        }).catch(e => {
            console.log(e);

        });
    }

    onSubmitPutEventType = () => {
        const Type = this.state.TypePlanId[0];
        const TypePlanId = parseInt(Type);
        console.log(TypePlanId);

        let promisePost = axios.put("http://54.234.64.228:44360/api/Event/Type?id=" + this.state.IdEvent + "&t=" + TypePlanId, {}, {headers: {'Access-Control-Allow-Origin': '*'}}
        ).then(() => {
            this.getEvents();
        }).catch(e => {
            console.log(e)

        });
    }


    onInputChange = (event) => {
        this.setState({
            EventId: event.target.value
        });
    }

    onInputChangeDirection = (event) => {
        this.setState({
            direction: event.target.value
        });
    }

    onInputChangeType = (event) => {
        this.setState({TypePlanId: event.target.value});
    }

    onInputTypeFilter = (event) => {
        let aux = event.target.value;
        let aux2 = aux.split(" ", 1).toString();

        this.setState({TypePlanName: aux2});
        this.setState({Data: event.target.value});
    }

    checkerEvent = () => {

        const promise = axios.get('http://54.234.64.228:44360/api/Event/Check?id=' + this.state.EventId, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                if (resolveResult.data === true) {
                    console.log(resolveResult.data);
                    this.setState({isHidden: !this.state.isHidden})
                } else {
                    alert("No existe ese evento id");
                }
            }
            , (rejectedResult) => {
                console.error(rejectedResult.statusText)
            });
    }

    checkerEvent2 = () => {

        const promise = axios.get('http://54.234.64.228:44360/api/Event/Check?id=' + this.state.IdEvent, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                if (resolveResult.data === true) {
                    console.log(resolveResult.data);
                    this.setState({isHidden2: !this.state.isHidden2})
                } else {
                    alert("No existe ese evento id");
                }
            }
            , (rejectedResult) => {
                console.error(rejectedResult.statusText)
            });
    }

    filterType = () => {
        axios.get('http://54.234.64.228:44360/api/Event/CheckType?id=' + this.state.TypePlanName, {headers: {'Access-Control-Allow-Origin': '*'}}).then((respuesta) => {
            if (respuesta.data === true) {
                axios.get('http://54.234.64.228:44360/api/Eventtype?id=' + this.state.TypePlanName, {headers: {'Access-Control-Allow-Origin': '*'}}).then
                (response => {
                        this.setState({Events: response.data})
                        console.log(response.data);
                    }
                )
            } else {
                alert("No existe ese Tipo de Plan");
            }
        }).catch(e => {
            console.log("Error de conexion con la API");
        });
    }

    onInputChangeTypePlan(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="groupUpdate">
                <TabView>
                    <TabPanel header="Modificar">
                        <div className="update">
                            <h5>Update Event</h5>
                            <InputText placeholder={"EventId"} type={'number'}
                                       name="EventId" value={this.state.EventId}
                                       onChange={this.onInputEventId}
                            />
                            <Button style={{marginLeft: 10}} onClick={this.checkerEvent}
                                    icon={'pi pi-check'}/>
                            <div hidden={!this.state.isHidden}>
                                <InputMask id="date" type={'text'} mask="9999-99-99" value={this.state.date}
                                           placeholder="yyyy/mm/dd" slotChar="yyyy/mm/dd"
                                           onChange={this.onInputDate}/>

                                <InputText placeholder={"EventCity"} type={'text'}
                                           name="EventDate" value={this.state.city}
                                           onChange={this.onInputCity}
                                />
                                <InputText placeholder={"Direction"} type={'text'}
                                           name="Direccion" value={this.state.direction}
                                           onChange={this.onInputChangeDirection}
                                />
                                <InputText placeholder={"EventProvince"} type={'text'}
                                           name="EventDate" value={this.state.province}
                                           onChange={this.onInputProvince}
                                />
                                <br/>
                                <InputTextarea placeholder={"EventDescription"} rows={5}
                                               cols={30} name="EventDate" value={this.state.description}
                                               onChange={this.onInputDescription}
                                />
                                <br/>
                                <InputText placeholder={"Event Members"} type={'number'}
                                           name="Event Members" value={this.state.Members}
                                           onChange={this.onInputMembers}
                                />
                                <br/>
                                <Button label={"Update Event"} onClick={this.onSubmitUpdate}/>
                                <br/>
                            </div>
                            <h5>Update EventType</h5>
                            <div>
                                <InputText placeholder={"EventId"} type={'number'}
                                           name="IdEvent"
                                           onChange={this.onInputChangeTypePlan}
                                />
                                <Button style={{marginLeft: 10}} onClick={this.checkerEvent2}
                                        icon={'pi pi-check'}/>
                                <div hidden={!this.state.isHidden2}>
                                    <Dropdown style={{margin: 10}} autoWidth={true}
                                              value={this.state.TypePlanId}
                                              options={this.state.TypePlanArray.map(elem => {
                                                  return elem.TypePlanId + " - " + elem.Subtype
                                              })}
                                              onChange={this.onInputChangeType}
                                              placeholder="Select a Subtype Plan"/>
                                    <br/>
                                    <Button label={"Update Event"} onClick={this.onSubmitPutEventType}/>
                                </div>
                            </div>
                            <DataTable className="p-datatable-gridlines" style={{marginTop: 15}}
                                       value={this.state.Events}>
                                <Column field="EventId" header="EventId"/>
                                <Column field="EventDate" header="Date"/>
                                <Column field="City" header="City"/>
                                <Column field="Direccion" header="Direction"/>
                                <Column field="Province" header="Province"/>
                                <Column field="Description" header="Description"/>
                                <Column field="UserId" header="UserId"/>
                                <Column field="TypePlanId" header="TypeId"/>
                                <Column field="MaxMembers" header="Max Members"/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header="Insertar">
                        <div className="update">
                            <h5>Insert Event</h5>
                            <div>
                                <InputText placeholder={"UserId"} type={'text'}
                                           name="UserId" value={this.state.UserId}
                                           onChange={this.onInputUserId}
                                />

                                <InputMask id="date" type={'text'} mask="9999-99-99" value={this.state.date}
                                           placeholder="Date Event" slotChar="yyyy/mm/dd"
                                           onChange={this.onInputDate}/>

                                <InputText placeholder={"Event Direction"} type={'text'}
                                           name="Direccion" value={this.state.direction}
                                           onChange={this.onInputChangeDirection}
                                />
                                <InputText placeholder={"EventCity"} type={'text'}
                                           name="EventDate" value={this.state.city}
                                           onChange={this.onInputCity}
                                />
                                <InputText placeholder={"EventProvince"} type={'text'}
                                           name="EventDate" value={this.state.province}
                                           onChange={this.onInputProvince}
                                />
                                <br/>
                                <InputTextarea placeholder={"EventDescription"} rows={5}
                                               cols={30}
                                               name="EventDate" value={this.state.description}
                                               onChange={this.onInputDescription}
                                />
                                <br/>


                                <InputText placeholder={"Event Members"} type={'number'}
                                           name="Event Members" value={this.state.Members}
                                           onChange={this.onInputMembers}
                                />
                                <Dropdown autoWidth={true} value={this.state.TypePlanId}
                                          options={this.state.TypePlanArray.map(elem => {
                                              return elem.TypePlanId + " - " + elem.Subtype
                                          })}
                                          onChange={this.onInputChangeType}
                                          placeholder="Select a Subtype Plan"/>
                            </div>
                            <br/>
                            <Button label={"Insert Event"} onClick={this.onSubmitInsertEvent}/>
                            <DataTable className="p-datatable-gridlines" style={{marginTop: 15}}
                                       value={this.state.Events}>
                                <Column field="EventId" header="EventId"/>
                                <Column field="EventDate" header="Date"/>
                                <Column field="City" header="City"/>
                                <Column field="Direccion" header="Direction"/>
                                <Column field="Province" header="Province"/>
                                <Column field="Description" header="Description"/>
                                <Column field="UserId" header="UserId"/>
                                <Column field="TypePlanId" header="TypeId"/>
                                <Column field="MaxMembers" header="Max Members"/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header="Eliminar">
                        <div className="update">
                            <h5>Delete Event</h5>
                            <div>
                                <InputText placeholder={"EventId"} type={'number'}
                                           name="eventIdDelete" value={this.state.EventId}
                                           onChange={this.onInputChange}/>

                            </div>
                            <br/>
                            <Button label={"Delete Event"} onClick={this.onSubmitDeleteEvent}/>
                            <DataTable className="p-datatable-gridlines" style={{marginTop: 15}}
                                       value={this.state.Events}>
                                <Column field="EventId" header="EventId"/>
                                <Column field="EventDate" header="Date"/>
                                <Column field="City" header="City"/>
                                <Column field="Direccion" header="Direction"/>
                                <Column field="Province" header="Province"/>
                                <Column field="Description" header="Description"/>
                                <Column field="UserId" header="UserId"/>
                                <Column field="TypePlanId" header="TypeId"/>
                                <Column field="MaxMembers" header="Max Members"/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header="Get Events">
                        <div className="update">
                            <div className="contentList">
                                <label>Get All Events </label>
                                <Button style={{margin: 10}} onClick={this.getEvents}
                                        icon={'pi pi-check'}/>
                                <label>Filter by type: </label>
                                <Dropdown autoWidth={true} value={this.state.Data}
                                          options={this.state.TypePlanArray.map(elem => (elem.Name + " - " + elem.Subtype))}
                                          onChange={this.onInputTypeFilter} placeholder="Select a Type Plan"/>
                                <Button style={{marginLeft: 10}} onClick={this.filterType}
                                        icon={'pi pi-check'}/>
                                <DataTable className="p-datatable-gridlines" style={{marginTop: 15}}
                                           value={this.state.Events}>
                                    <Column field="EventId" header="EventId"/>
                                    <Column field="EventDate" header="Date"/>
                                    <Column field="City" header="City"/>
                                    <Column field="Direccion" header="Direction"/>
                                    <Column field="Province" header="Province"/>
                                    <Column field="Description" header="Description"/>
                                    <Column field="UserId" header="UserId"/>
                                    <Column field="TypePlanId" header="TypeId"/>
                                    <Column field="MaxMembers" header="Max Members"/>
                                </DataTable>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="ListMembers">
                        <div className="update">
                            <div className="contentList">
                                <label>Get All Events </label>
                                <Button style={{marginLeft: 20}} onClick={this.getEvents}
                                        icon={'pi pi-check'}/>
                            </div>
                            <DataTable className="p-datatable-gridlines" value={this.state.Events}>
                                <Column style={{width: 80}} field="EventId" header="EventId"/>
                                <Column field="ListMembers" header="ListMembers"/>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}
