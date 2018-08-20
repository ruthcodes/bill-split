import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import config from './config.js';

import Receipt from "./Receipt"
import Divide from "./Divide"
import TaxAndTip from "./TaxAndTip"

class App extends Component {

  state = {
    imageFile: null,
    requestString: '',
    response: [],
    prices: [],
    divideBy: 1,
    divideBool: false,
    tip:0,
  }

  handleClick = (e) => {
    let price = e.target.getAttribute('data-value');
    e.target.classList.add("claimed")
    if(Number(price)){
      if (this.state.divideBool){
        this.setState({
          prices: [...this.state.prices, (parseFloat(price, 10)/this.state.divideBy).toFixed(2)]
        })
      } else {
        this.setState({
          prices: [...this.state.prices, parseFloat(price, 10).toFixed(2)]
        })
      }
    }

  }

  handleDivideChange = e => {
    this.setState({
      divideBy: e.target.value,
    })
  }

  toggleDivideBool = () => {
    this.setState(prevState => ({
      divideBool: !prevState.divideBool,
    }));
  }


  makeAPICall = (data) => {
    let self = this;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let obj = JSON.parse(this.responseText)
        //console.log(this.responseText)
        self.setState({
          response: obj.ParsedResults[0].TextOverlay.Lines,//obj.ParsedResults[0].ParsedText,
        })
      }
    });

    xhr.open("POST", "https://api.ocr.space/parse/image");
    xhr.setRequestHeader("apikey", config.API_KEY);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data)
  }


  exampleReceipt = () => {
    //make api call using local URL
    let data = new FormData();
    data.append("url", "https://i.imgur.com/FVPdwYs.jpg");
    data.append("isOverlayRequired", true);
    this.makeAPICall(data);
  }

  handleImageInput = e => {
    let self = this;
    //console.log(e.target.files[0].name)
    let file = e.target.files[0]
    let reader  = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      let data = new FormData();
      data.append("base64Image", reader.result);
      data.append("isOverlayRequired", true);
      self.makeAPICall(data)
    }
    this.setState({
      imageName: e.target.files[0].name
    })
  }

  addTip = (e) => {
    let percent = e.target.getAttribute('data-value');
    console.log(percent)
    this.setState({
      tip: percent,
    })
  }


  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Bill Splitter</h1>
            <p>Upload a photo of your receipt, and click on each price you want to add to your own total.<br/>
              To split the cost of an item, type in the number you would like to split by in the divide section and check the checkbox, then select the item price.<br/>
              <br/>For best results, make sure your photo is straight and taken up close.
            </p>

          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <input type="file" accept="image/*" id="userImage" onChange={this.handleImageInput}/>
            <button onClick={this.exampleReceipt}>Use Example Receipt</button>
          </div>
          <div className="userControls col-sm-12 col-md-6">
            <Divide divideBy={this.state.divideBy} handleDivideChange={this.handleDivideChange} toggleDivideBool={this.toggleDivideBool}/>
            <TaxAndTip addTip={this.addTip} />
          </div>
        </div>
        <Receipt tip={this.state.tip} response={this.state.response} prices={this.state.prices} handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;
