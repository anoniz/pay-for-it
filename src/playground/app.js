class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }
    // life cycle methods
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options)
            this.setState(() => ({options}))  // returning option object.
        } catch(e) {
           // if JSON.parse fails due to some bad data we do nothing..
           // it will autometically get the default options array
        }
        
    }


    // Options Component
    handleDeleteOptions() {
        this.setState(() => ({ options: []})) // returning obj cool syntx
    }
    // remove single options
    handleDeleteOption(optionToRemove) {
       this.setState((prevState) => {
          return {
            options: prevState.options.filter(option => {
                return optionToRemove !== option;
            })
          }
       })
    }
    // Actions Componetn
    handlePick() {
        this.setState((prevState) => {
            const randomNum = Math.floor(Math.random() * prevState.options.length);
            const option = prevState.options[randomNum];
            alert(option);
        })
    }
    // addOption Component
    handleAddOptions(option) {
        if(!option) {
            return 'Enter A Valid Option'
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'This Option Already Exits'
        }

        this.setState(prevState => {
            return {
                options: prevState.options.concat(option)
            }
        })
    }
    render() {
        let title = 'Indecision';
        let subtitle = 'Put Your Life In The Hand of Computer';
        return (
         <div>
            <Header title={title} subtitle={subtitle} />
            <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
            <Options handleDeleteOptions={this.handleDeleteOptions} 
                      options={this.state.options} 
                      handleDeleteOption={this.handleDeleteOption}
                      />
            <AddOption handleAddOptions={this.handleAddOptions} />
        </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
         <h1>{props.title}</h1>
         <h2>{props.subtitle}</h2>
        </div>
    ); 
}

const Action = (props) => {
    return (
        <div>
            <button disabled={!props.hasOptions} 
            onClick={props.handlePick}>
            What Should I do?</button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
          <button onClick={props.handleDeleteOptions}>Remove All</button>
          {props.options.length === 0 && <p>Please add an Option to get started!</p>}
          {props.options.map(option => <Option 
          key={option} 
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}  
          />)}
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
         {props.optionText}
         <button onClick={(e) => {
            props.handleDeleteOption(props.optionText);
         }}
         >
         remove</button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOptions(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOptions(option); 
        this.setState(() => ({ error }));
        if(!error) {
            e.target.elements.option.value = '';
        }
}
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <h1>Add Something </h1>
                <form onSubmit={this.handleAddOptions}>
                    <input type="text" name="option" />
                    <button>Add Options </button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />,document.getElementById('app'));

