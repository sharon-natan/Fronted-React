import React from 'react';
import { Row, Col } from 'react-flex-proto';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
//import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect, Button } from '../components/react-blur-admin/src';
import { Link } from 'react-router';   
import dataArmy from './army.json';
import dataBlackDC from './blackDC.json';

export class ServerDeployForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listSites: [],
      listVC: [],
      listDatastores: [],
      listTemplates: [],
      listDatacenters: [],
      listCluster: [],

      // Saving Current Status
      currentDomain: "",
      currentSite: "",
      currentVC: "",
      currentDatastore: "",
      currentTemplate: "",
      currentDatacenter: "",
      currentCluster: "",
      jsonName: "",
      select_site_placeholder : 'Select Site',

      // Temp Variable
      jsonFull: {},
      list: []
      };
    }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Server Deploy Form
      </Breadcrumbs>
    );
  }

// Setting the Parameters by the Domain Name
async setParamsByDomain(domain) {
  this.resetParamsByDomain(domain);
  await  this.setState({currentDomain: domain});
  if (domain === 'Army'){
    await  this.setState({jsonFull: dataArmy});
  }
  else {
    await  this.setState({jsonFull: dataBlackDC});
  }
  this.setSitesByJsonDomain( this.state.jsonFull );
}


// Settting the Parameters by lists


async setSitesByJsonDomain(jsonDomain) {
  await this.setState( { listSites : this.createListOfOptionsForJsons(Object.keys(jsonDomain['sites'])) } )
}


async setVCsByJsonSites(jsonDomain, currentSite) {
  this.resetParamsBySites(currentSite)
  await this.setState({ currentSite: currentSite})
  await this.setState( { listVC : this.createListOfOptionsForJsons(Object.keys(jsonDomain['sites'][currentSite]['vc'])) } )
}


async setParamsByJsonVC(jsonDomain, currentVC) {
  this.resetParamsByVC(currentVC)
  await this.setState({ currentVC: currentVC})
  await this.setState( { listDatastores : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][currentVC]['datastores']) } )
  await this.setState( { listTemplates : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["templates"]) } ),
  await this.setState( { listDatacenters : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["DataCenter"]) } ),
  await this.setState( { listCluster : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["vmware_cluster"]) } )
}


// Reset after change functions

async resetParamsByDomain(domain){
  if ( this.state.currentDomain !== '' && this.state.currentDomain !== domain) {
    this.siteButton.setState({value: 'Select Site'})
    this.vcButton.setState({value: 'Select VC'})
    this.datastoreButton.setState({value: 'Select Datastore'})
    this.templateButton.setState({value: 'Select template'})
    this.datacenterButton.setState({value: 'Select Datacenter'})
    this.clusterButton.setState({value: 'Select vmware_cluster'})
  }
}

async resetParamsBySites(site){
  if ( this.state.currentSite !== '' && this.state.currentSite !== site) {
    this.vcButton.setState({value: 'Select VC'})
    this.datastoreButton.setState({value: 'Select Datastore'})
    this.templateButton.setState({value: 'Select template'})
    this.datacenterButton.setState({value: 'Select Datacenter'})
    this.clusterButton.setState({value: 'Select vmware_cluster'})
  }
}

async resetParamsByVC(vc){
  if ( this.state.currentVC !== '' && this.state.currentVC !== vc) {
    this.datastoreButton.setState({value: 'Select Datastore'})
    this.templateButton.setState({value: 'Select template'})
    this.datacenterButton.setState({value: 'Select Datacenter'})
    this.clusterButton.setState({value: 'Select vmware_cluster'})
  }
}

// Create the pattern from option file --- Exstra Functions
createListOfOptionsForJsons(arrayOfKeys){
  let newJson = {}
  let newArray = []
  for (let index = 0; index < arrayOfKeys.length; index++) {
    newJson = {'value': arrayOfKeys[index], 'label': arrayOfKeys[index]}
    newArray.push(newJson)
  }  
  return newArray
}


// Find third button value


// Start Rendering
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Server Deploy Form'>
        <Row>
          <Col>
          <Panel title='Create Server Deploy Form'>
              <Select 
                placeholder='Select Doamin'
                options={[
                  { value: 'Army', label: 'Army' },
                  { value: 'BlackDC', label: 'BlackDC' },
               ]}
                onChange={value => this.setParamsByDomain(value)}
                value={ this.state.currentDomain }
                ref={(button)=>{this.domainButton = button}}
                />
              <Select
                placeholder= {this.state.select_site_placeholder}
                options= { this.state.listSites }
                onChange={value => this.setVCsByJsonSites(this.state.jsonFull ,value)}
                value= {this.state.currentSite}
                ref={(button)=>{this.siteButton = button}}
                 />
              <Select
                placeholder='Select VC'
                options= {this.state.listVC}
                onChange={value => this.setParamsByJsonVC( this.state.jsonFull, value )}
                value={this.state.currentVC}
                ref={(button)=>{this.vcButton = button}}
                 />

                <Select
                placeholder='Select Datastore'
                options= {this.state.listDatastores}
                onChange={value => this.setState({ currentDatastore: value })}
                value={this.state.currentDatastore}
                ref={(button)=>{this.datastoreButton = button}}
                 />

                <Select
                placeholder='Select Template'
                options= {this.state.listTemplates}
                onChange={value => this.setState({ currentTemplate: value })}
                value={this.state.currentTemplate}
                ref={(button)=>{this.templateButton = button}}
                 />

                <Select
                placeholder='Select Datacenter'
                options= {this.state.listDatacenters}
                onChange={value => this.setState({ currentDatacenter: value })}
                value={this.state.currentDatacenter}
                ref={(button)=>{this.datacenterButton = button}}
                />

                <Select
                placeholder='Select vmware_cluster'
                options= {this.state.listCluster}
                onChange={value => this.setState({ curentCluster: value })}
                value={this.state.curentCluster}
                ref={(button)=>{this.clusterButton = button}}
                 />
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}

