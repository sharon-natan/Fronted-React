import React from 'react';
import { Link } from 'react-router';   
import { Page, Breadcrumbs } from 'react-blur-admin';
import { VM_Deploy_Form } from './components/VM_Deploy_Form/VM_Deploy_Form';

export class ServerDeployForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        numberOfForms: 1
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

// Start Rendering
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Server Deploy Form'>
      <VM_Deploy_Form />
      </Page>
    );
  }
}

