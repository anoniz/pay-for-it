class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.state = {
            count: 0
        }
    }
       // life cycle methods..
    componentDidMount() {
        try {
            const countStr = localStorage.getItem('count');
            const count = parseInt(countStr, 10);
            this.setState(() => ({count})); // returning obj to state
        } catch (e) {
          // do nothing 
        }    
    }    
    componentDidUpdate(prevState) {
        if(prevState.count !== this.state.count) {
            localStorage.setItem('count',this.state.count);
        }
    } 


    addOne() {
        this.setState(prevState => ({ count: prevState.count + 1}))
    }
    removeOne() {
        this.setState(prevState => ({ count: prevState.count - 1}))
    }
    resetAll() {
        this.setState( () => ({ count: 0})) // returning object cool syntx
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count} </h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.removeOne}>-1</button>
                <button onClick={this.resetAll}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById("app"));

