import React, { Component } from 'react'

export default class Todo extends Component {
	constructor() {
		super();
		this.state = {
			item: "",
			data: [],
			selected: false

		};


	}
	componentDidMount() {
		this.getData();
	}
	save = (payLoad) => {

		let data = JSON.parse(window.localStorage.getItem("todo"))
		if (!data) {
			data = []
		}
		data.push({
			item: payLoad,
			status: false,
			id: Date.now(),
			created: new Date().getDate(),
			deadline: (new Date().getDate() + 1) % 30
		})
		window.localStorage.setItem("todo", JSON.stringify(data))
		console.log(data);
		this.getData();
	}

	getData = () => {
		let data = JSON.parse(window.localStorage.getItem("todo"));
		console.log("in getdata", data)
		this.setState({
			data
		})
	}

	handleCheckbox = (payLoad) => {
		console.log("in handleCheckbox", payLoad);
		let data = this.state.data;
		data.map(item => {
			if (item.id == payLoad) {
				item.status = !item.status
				console.log("Selected Items", item);
			}
		})
		this.setState({ data })
		let data1 = JSON.parse(window.localStorage.getItem("todo"));
		data1 = data;
		window.localStorage.setItem("todo", JSON.stringify(data1));
	}

	handleRadioButton = (payLoad) => {
		console.log("in HandleRadio Button",payLoad);
		if (payLoad === false) {
			this.setState({selected: false})
		} else {
			this.setState({selected: true})
		}
	}

	render() {
		return (
			<div>
				<h1>

					To-Do List
        </h1>
				<div>

						<input 
							checked={this.state.selected === false} 
							type="radio" 
							id="contactChoice1" 
							name="contact" 
							value="pending" 
							onChange={() => this.handleRadioButton(false)} />
							<label htmlFor="contactChoice1">Pending</label>
						<input 
							checked={this.state.selected === true}
							type="radio" 
							id="contactChoice1" 
							name="contact" 
							value="completed" 
							onChange={() => this.handleRadioButton(true)}></input>
							<label htmlFor="contactChoice1">Completed</label>
				</div>
						<input className="input" value={this.state.item}
							onChange={e => this.setState({ item: e.target.value })}></input>
						<button onClick={() => this.save(this.state.item)}> click me</button>

						{this.state.data ?
							this.state.data.map(item => {
								return <div key={item.id}>
									{item.status == this.state.selected ?
										<div>
											<input
												type="checkbox"
												id="scales"
												name="scales"
												onClick={() => this.handleCheckbox(item.id)}
												checked={this.state.data.status} />
											<span> {item.item} </span>
											<span>|| Created - {item.created} ||</span>
											<span>Deadline - {item.deadline} ||</span>
										</div>

										: null}

								</div>
							})
							: null}
						{/* {this.state.data.map(item=>{return <div>
					<div>
					<input type="checkbox" id="scales" name="scales" key={item.id} 
					onClick={()=>this.handleCheckbox(item.id)}
         		checked={this.state.data.status} />
						<span> {item.item} </span>

					</div>
					</div>})} */}
				</div>

					)
				}
			}
			
