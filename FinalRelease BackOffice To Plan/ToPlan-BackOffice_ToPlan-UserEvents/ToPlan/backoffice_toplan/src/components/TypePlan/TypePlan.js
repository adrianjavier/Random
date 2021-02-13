import React, {Component, useState} from "react";
import axios from "axios";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import "../Events/StyleEvents.css";
import {TabPanel, TabView} from "primereact/tabview";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputTextarea} from "primereact/inputtextarea";
import {InputMask} from "primereact/inputmask";


export class TypePlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TypePlans: [],
            Data: '',
            isHidden: false,
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        axios.get("http://54.234.64.228:44360/api/TypePlan/List", {}, {headers: {'Access-Control-Allow-Origin': '*'}}).then((response => {
            this.setState({TypePlans: response.data})
            console.log(response);
        })).catch((error => {
            console.log(error)
        }));
    }

    onInputTypeFilter = (event) => {
        this.setState({Data: event.target.value});
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitUpdate = () => {

        const promiseUpdate = axios.put("http://54.234.64.228:44360/api/TypesPlan/id?=" + this.state.IdTypePlan + "&n=" + this.state.TypeName + "+&s=" + this.state.Subtype, {headers: {'Access-Control-Allow-Origin': '*'}}
        ).then(response => {
            console.log("Update succesfully: " + response)
        }).catch(e => {
            console.log(e);
        });

    }

    onSubmitDelete = () => {
        const promiseUpdate = axios.delete("http://54.234.64.228:44360/api/TypesPlan/id?=" + this.state.IdTypePlan, {headers: {'Access-Control-Allow-Origin': '*'}}
        ).then(response => {
            console.log("Update succesfully: " + response)
        }).catch(e => {
            console.log(e);
        });
    }

    onSubmitInsert = () => {
        axios.get('http://54.234.64.228:44360/api/Event/CheckType?id=' + this.state.TypeName, {headers: {'Access-Control-Allow-Origin': '*'}}).then(
            (response) => {
                if (response.data === true) {
                    axios.post('http://3.95.8.159:44360/api/TypePlan', {
                        Name: this.state.NameType,
                        Subtype: this.state.Subtype
                    }).catch(e => {
                        console.log(e);
                    });
                } else {
                    alert("No existe ese Tipo de Plan");
                }
            }).catch(e => {
                console.log(e);
            }
        )
    }

    checkerType = () => {

        const promise = axios.get('http://54.234.64.228:44360/api/TypePlan/Check?id=' + this.state.IdTypePlan, {headers: {'Access-Control-Allow-Origin': '*'}})
        const promiseResult = promise.then((resolveResult) => {
                if (resolveResult.data === true) {
                    console.log(resolveResult.data);
                    this.setState({isHidden: !this.state.isHidden});
                } else {
                    alert("No existe ese evento id");
                }
            }
            , (rejectedResult) => {
                console.error(rejectedResult.statusText)
            });
    }

    render() {
        return (
            <div>
                <div className="groupUpdate">
                    <div className="tabview-demo">
                        <div className="card">
                            <TabView>
                                <TabPanel header="Modificar">
                                    <div className="update">
                                        <h5>Update TypePlan</h5>
                                        <InputText placeholder={"TypeId"} type={'number'}
                                                   name="IdTypePlan"
                                                   onChange={this.onInputChange}
                                        />
                                        <Button style={{marginLeft: 10}} onClick={this.checkerType}
                                                icon={'pi pi-check'}/>
                                        <div hidden={!this.state.isHidden}>
                                            <InputText placeholder={"Type Name"} type={'text'}
                                                       name="TypeName"
                                                       onChange={this.onInputChange}
                                            />
                                            <InputText placeholder={"Type Subtype"} type={'text'}
                                                       name="Subtype"
                                                       onChange={this.onInputChange}
                                            />
                                            <br/>
                                            <Button style={{margin: 15}} label={"Update Type"}
                                                    onClick={this.onSubmitUpdate}/>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Insertar">
                                    <div className="update">
                                        <h5>Insert TypePlan</h5>
                                        <InputText placeholder={"Type Name"} type={'text'}
                                                   name="NameType"
                                                   onChange={this.onInputChange}
                                        />
                                        <InputText placeholder={"Type Subtype"} type={'text'}
                                                   name="TypeSub"
                                                   onChange={this.onInputChange}
                                        />
                                        <br/>
                                        <Button style={{margin: 15}} label={"Insert TypePlan"}
                                                onClick={this.onSubmitInsert}/>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Eliminar">
                                    <div className="update">
                                        <h5>Delete Event</h5>
                                        <InputText placeholder={"TypeId"} type={'number'}
                                                   name="IdTypePlan"
                                                   onChange={this.onInputChange}
                                        />
                                        <br/>
                                        <Button style={{margin: 15}} label={"Delete Type"}
                                                onClick={this.onSubmitDelete}/>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Filtrar">
                                    <div className="DataTable">
                                        <DataTable value={this.state.TypePlans}>
                                            <Column field="TypePlanId" header="TypeId"/>
                                            <Column field="Name" header="Name"/>
                                            <Column field="Subtype" header="Subtype"/>
                                        </DataTable>
                                    </div>
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}