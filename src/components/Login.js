import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent';
import { GoogleLogin } from 'react-google-login-component';
import NavBar from './NavBar'
import axios from 'axios';

class Login extends React.Component{
  constructor (props, context) {
    super(props, context);
    this.state={
      profile: {},

    }
  }

  responseGoogle (googleUser) {
    var res = googleUser.getAuthResponse();
    var id_token = res.id_token;
    var access_token = res.access_token;

    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + access_token)
      .then((result) => {
        // save user login data to localStorage
        this.setUserProfile(result.data);
        this.setIdToken(id_token);
        this.props.setSingnInStatus(true);

        // check if user is our in the Database
        var googleid = result.data.id;
        superagent
          .get('/api/user/')
          .query({id: googleid})
          .set('Accept', 'application/json')
          .end((err, response) => {
            if(err){
              console.log("ERROR: " + err);
              return
            }

            // if it's the first login, store user profile into db
            if(response.body.results.length == 0) {
              superagent
                .post('/api/user')
                .send(result.data)
                .set('Accept', 'application/json')
                .end((err, response) => {
                  if(err){
                    alert('ERROR: '+err)
              		  return
              	  }
              		console.log("user added: " + JSON.stringify(response));
              })

            }
          })
      })
      .catch((error) => {
        alert("ERROR: " + error);
        return;
      });
  }

  setUserProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  setIdToken(token) {
    localStorage.setItem('id_token', token);
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
