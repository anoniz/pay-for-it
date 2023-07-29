const appRoot = document.getElementById("app");


const details = "They Here Are Few Details  ";

let state = false;
const showDetail = () => {
    if(!state) {
        state = true;
    }
    else if(state) {
        state = false;
    }
    render();
}



const render = () => {
const template = (
    <div>
      <h1>Visiblity Toggle</h1>
      <button onClick={showDetail}>{state ? "hide details" : "show details"}</button>
      {state ? <p>{details}</p> : <p></p>}
      {}
    </div>
     

);

ReactDOM.render(template,appRoot);

}

render();