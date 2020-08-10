import React from 'react';
import { Row, Col } from 'react-flex-proto';
//import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from 'react-blur-admin';
import { Page, Panel, Input, Select, Textarea, Switch, Breadcrumbs, EditableSelect } from '../components/react-blur-admin/src';
import { Link } from 'react-router';   
import dataArmy  from './army.json';
import  dataBlackDC  from './blackDC.json';

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

      // Temp Variable
      jsonFull: {}
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


  renderPlaceholder() {
    if (! this.props.placeholder) {
      return <span />;
    }

    return (
      <span className='filter-option pull-left'>
        {this.state.value}
      </span>
    );
  }

  //// Start Adding Function

// Setting the Parameters by the Domain Name
setParamsByDomain(domain) {
  this.setState({ jsonName: "data"+ domain});
  this.setState({currentDomain: domain});
  this.setState({jsonFull: dataBlackDC})
  this.setSitesByJsonDomain( this.state.jsonFull );
}


// Settting the Parameters by VC
setSitesByJsonDomain(jsonDomain) {
  this.setState( { listSites : this.createListOfOptionsForJsons(Object.keys(jsonDomain['sites'])) } )
}

setVCsByJsonSites(jsonDomain, currentSite) {
  this.setState({ currentSite: currentSite})
  this.setState( { listVC : this.createListOfOptionsForJsons(Object.keys(jsonDomain['sites'][currentSite]['vc'])) } )
}


setParamsByJsonVC(jsonDomain, currentVC) {
  this.setState({ currentVC: currentVC})
  this.setState( { listDatastores : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][currentVC]['datastores']) } )
  this.setState( { listTemplates : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["templates"]) } ),
  this.setState( { listDatacenters : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["DataCenter"]) } ),
  this.setState( { listCluster : this.createListOfOptionsForJsons(jsonDomain['sites'][this.state.currentSite]['vc'][this.state.currentVC]["vmware_cluster"]) } )
}


// Create the pattern from option file
createListOfOptionsForJsons(arrayOfKeys){
  let newJson = {}
  let newArray = []
  for (let index = 0; index < arrayOfKeys.length; index++) {
    newJson = {'value': arrayOfKeys[index], 'label': arrayOfKeys[index]}
    newArray.push(newJson)
  }  
  return newArray
}



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
                 />
              <Select
                placeholder='Select Site'
                options= { this.state.listSites }
                onChange={value => this.setVCsByJsonSites(this.state.jsonFull ,value)}
                 />

              <Select
                placeholder='Select VC'
                options= {this.state.listVC}
                onChange={value => this.setParamsByJsonVC( this.state.jsonFull, value )}
                value={this.state.currentVC}
                 />

                <Select
                placeholder='Select Datastores'
                options= {this.state.listDatastores}
                onChange={value => this.setState({ currentDatastore: value })}
                value={this.state.currentVC}
                 />

                <Select
                placeholder='Select templates'
                options= {this.state.listTemplates}
                onChange={value => this.setState({ currentTemplate: value })}
                value={this.state.currentTemplate}
                 />

                <Select
                placeholder='Select Datacenter'
                options= {this.state.listDatacenters}
                onChange={value => this.setState({ currentDatacenter: value })}
                value={this.state.currentDatacenter}
                />

                <Select
                placeholder='Select vmware_cluster'
                options= {this.state.listCluster}
                onChange={value => this.setState({ curentCluster: value })}
                value={this.state.curentCluster}
                 />
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}

