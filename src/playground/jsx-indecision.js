console.log("JavaScript is runnig fine ");

// JSX JavaScript XML
// it's language extension for JS Provided by react 
// to make template easily.. its not part of js
// just an extension extra features you can say kind of...

const app = {
    title: "Indecision app",
    subtitle: "Put Your Life in the Hand of computer.. ",
    options: []
}


const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value; // getting input value
    if(option) {
        app.options.push(option);
        // clearing input feild value,, emptying box
        e.target.elements.option.value = '';
    }
    render();
}

const removeAll = () => {
    app.options = [];
    render();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
    
}

const appRoot = document.getElementById('app');
const render = () => {

const template = ( 
   <div>
   <h1> {app.title} </h1>
   {app.subtitle && <p>{app.subtitle}</p>}
   {app.options.length ? <p>Here are your options</p>: <p>No options</p>} 
   <button disabled={app.options.length ===0} onClick={onMakeDecision}>What Should I Do? </button>
   <button onClick={removeAll}>Remove all</button>
   
   <ol>
    {
        app.options.map(option => {
            return <li key={option}>{option}</li>
        })
    }
   </ol>
   <form onSubmit= {onFormSubmit}>
    <input type="text" name="option" />
    <button>Add Options</button>
   </form>
   </div>
);    

ReactDOM.render(template,appRoot);

}

render();