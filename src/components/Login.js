import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent';
import { GoogleLogin } from 'react-google-login-component';
import NavBar from './NavBar'

class Login extends React.Component{
  constructor (props, context) {
    super(props, context);
    this.state={
    }
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(googleUser.getAuthResponse());
    //anything else you want to do(save to localStorage)...
    this.props.updateSingnInStatus(true);
  }

  render () {
    const google_logo = <span><span className='fa fa-google fa-2x' style={{color:'white', float:'left', marginLeft:20+'px'}}></span><span style={{float:'right', marginRight:40+'px'}}>Sign in with Google</span></span>;

    return (
      <div style={{backgroundColor:'#f9f9f9', height:100+'%'}}>

        <div className="container" style={{marginTop:30, height: 'calc(100vh - 52px)'}}>
          <div className="intro" style={{width:70+'%', float:'left'}}>
            <h2>Digitize Your Consent Form</h2>
            <br/>

            <p><span className="fa fa-github fa-2x" style={{color: '#6e5494'}}></span><a href="https://github.com/nesl/DigitizeConsent" style={{fontSize:16+'px', color:'#666666'}}>&nbsp;&nbsp;Source Code</a></p>
            <p><span className="fa fa-slideshare fa-2x"></span><a href="https://docs.google.com/presentation/d/1ZfEp880_Ih8y8vWAyiAExVkn6fmBr3YiakLgA2aWwKI/edit?usp=sharing" style={{fontSize:16+'px', color:'#666666'}}>&nbsp;&nbsp;Presentation Slides</a></p>
            <p><span className="fa fa-youtube-play fa-2x" style={{color:'	#cc181e'}}></span><a href="https://drive.google.com/a/g.ucla.edu/file/d/0B43qfJfyhlkVNXNaWDY3MGRmMWc/view?usp=sharing" style={{fontSize:16+'px', color:'#666666'}}>&nbsp;&nbsp;Demo Video</a></p>
          </div>

          <div className="signin" style={{width:30+'%', float:'right', paddingLeft:4+'%', paddingRight:4+'%'}}>
            <br/>
            <h4 style={{color:'grey', textAlign:'center'}}>Please Sign In</h4>
            <br/>
            <GoogleLogin socialId="883714622208-doumj0pod3cursh149qjoj2pjt0ujgit.apps.googleusercontent.com"
                         className="google-login"
                         scope="profile email"
                         responseHandler={this.responseGoogle.bind(this)}
                         children={google_logo}
                         style={{backgroundColor:'#ff6666', color:'white', borderColor:'#ff6666', borderWidth: 0.5, width:250+'px', height:40+'px', padding:3+'px'}}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Login;
