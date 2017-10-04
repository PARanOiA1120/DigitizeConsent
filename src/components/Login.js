import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent';
import { GoogleLogin } from 'react-google-login-component';
import NavBar from './NavBar'

class Login extends React.Component{
  constructor (props, context) {
    super(props, context);
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }

  render () {
    const google_logo = <span><span className='fa fa-google fa-2x' style={{color:'white', float:'left', marginLeft:20+'px'}}></span><span style={{float:'right', marginRight:40+'px'}}>Sign in with Google</span></span>;

    return (
      <div>
        <NavBar />

        <div className="container" style={{marginTop:30,}}>
          <div className="intro" style={{width:70+'%', float:'left'}}>
            <h2>Digitize Your Consent Form</h2>
          </div>

          <div className="signin" style={{width:30+'%', float:'right', paddingLeft:4+'%', paddingRight:4+'%', borderColor:'black', borderWidth:1}}>
            <h4 style={{color:'grey', textAlign:'center'}}>Please Sign In</h4>
            <br/>
            <GoogleLogin socialId="883714622208-doumj0pod3cursh149qjoj2pjt0ujgit.apps.googleusercontent.com"
                         className="google-login"
                         scope="profile"
                         responseHandler={this.responseGoogle}
                         children={google_logo}
                         style={{backgroundColor:'#ff6666', color:'white', borderColor:'#ff6666', borderWidth: 0.5, width:250+'px', height:40+'px', padding:3+'px'}}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
