let tasks = [
{	"id": "dayZero",
"title": "Start Date", 
"description": "First day on the job.",
"duration": 2, 
"depends": [],
"done": true,
},{
	"id": "joinSlackChannels", 
	"title": "Join Slack channels", 
	"description": "Join the Slack channels #product and #project-intake.",
	"duration": 1, 
	"depends": ["dayZero"],
	"done": false,
}]

let checklists = [
{
	title: 'Buddy of New Hire',
	description: 'TODO Items for the buddy of a new hire'
},{
	title: '18F New Hire Checklist',
	description: 'TODO Items for all new 18F employees'
}]

let users = [{
	name: 'Melody Kramer',
	due: '3/3/2016'
},{
	name: 'Anthony Garvan',
	due: '4/3/2016'
}]

let App = React.createClass({
	render() {
		return (
			<div>
				<Tasks data={this.props.tasks} />
				<Checklists data={this.props.checklists} />
				<Users data={this.props.users} />
			</div>
		);
	}
})

let Tasks = React.createClass({
	render() {
		return (
			<div>
				<h1>Tasks</h1>
				<TaskTable data={this.props.data}/>
			</div>
		);
	}
})

let Checklists = React.createClass({
	render() {
		return (
			<div>
				<h1>Checklists</h1>
				<ChecklistTable data={this.props.data}/>
			</div>
		);
	}
})

let Users = React.createClass({
	render() {
		return (
			<div>
				<h1>Users</h1>
				<UserTable data={this.props.data}/>
			</div>
		);
	}
})

let TaskTable = React.createClass({
	render() {
		let rows = this.props.data.map((t, i) => <TaskRow data={t} key={i} />)
		let head = header(['Task', 'Due Date', 'Description', 'Mark Down'])
		return (
			<table>
				<thead><tr>{head}</tr></thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
})

let TaskRow = React.createClass({
	render() {
		let data = this.props.data
		let date = new Date()
		date.setDate(date.getDate() + data.duration)
		return (
			<tr>
				<td>{data.title}</td>
				<td>{date.toDateString()} ({data.duration} day{(data.duration > 1) ? "s" : ""})</td>
				<td>{data.description}</td>
				<td><input type="checkbox" defaultChecked={data.done} /></td>
			</tr>
		);
	}
})

let ChecklistTable = React.createClass({
	render() {
		let rows = this.props.data.map((t, i) => <ChecklistRow data={t} key={i} />)
		let head = header(['Title', 'Description', 'Action'])
		return (
			<table>
				<thead><tr>{head}</tr></thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
})

let ChecklistRow = React.createClass({
	render() {
		let data = this.props.data
		return (
			<tr>
				<td>{data.title}</td>
				<td>{data.description}</td>
				<td><a>Assign to me </a></td>
			</tr>
		);
	}
})

let UserTable = React.createClass({
	render() {
		let rows = this.props.data.map((t, i) => <UserRow data={t} key={i} />)
		let head = header(['Name', 'Due'])
		return (
			<table>
				<thead><tr>{head}</tr></thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
})

let UserRow = React.createClass({
	render() {
		let data = this.props.data
		return (
			<tr>
				<td>{data.name}</td>
				<td>{data.due}</td>
			</tr>
		);
	}
})

function header(arr) {
	return arr.map((t,i) => <th key={i}>{t}</th>)
}

ReactDOM.render(
	<App tasks={tasks} checklists={checklists} users={users} />,
	document.getElementById('content'))